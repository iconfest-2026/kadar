<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use App\Services\Ocr\NutritionOcrService;
use App\Services\Ai\YoloFoodVisionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScannerController extends Controller
{
    public function __construct(
        protected NutritionOcrService $ocrService,
        protected YoloFoodVisionService $yoloService
    ) {}

    /**
     * Display the Live Open Cam Scanner page.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        // Check active membership tier
        $membership = $user->memberships()->where('status', 'ACTIVE')->with('tier')->first();
        $tierName = $membership?->tier?->name ?? 'Silver (Gratis)';
        $dailyLimit = $membership?->tier ? (int) ($membership->tier->max_scanner ?? 10) : 10;

        // Count today's scans
        $todayScansCount = HealthRecord::where('user_id', $user->id)
            ->where('source', 'SCANNER')
            ->whereDate('recorded_at', Carbon::today())
            ->count();

        return Inertia::render('Member/Scanner', [
            'profile' => $profile,
            'tier' => [
                'name' => $tierName,
                'daily_limit' => $dailyLimit,
                'scans_used_today' => $todayScansCount,
                'scans_remaining' => $dailyLimit === -1 ? 'Tanpa Batas' : max(0, $dailyLimit - $todayScansCount),
            ],
            'recentScans' => HealthRecord::where('user_id', $user->id)
                ->where('source', 'SCANNER')
                ->latest('recorded_at')
                ->take(5)
                ->get(),
        ]);
    }

    /**
     * Analyze image from live camera snapshot or uploaded file using AI Vision (Gemini / Groq / YOLO)
     * and automatically save the recognized food to user's daily health records.
     */
    public function analyze(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // Enforce dynamic scan quota based on active membership tier
        if (!$user->canScanFoodToday()) {
            return response()->json([
                'status' => 'quota_exhausted',
                'success' => false,
                'is_food' => false,
                'message' => 'Batas kuota pemindaian kamera harian Anda telah tercapai (' . $user->maxDailyScans() . 'x / hari). Silakan upgrade ke paket Gold atau Platinum untuk pemindaian bebas batas.',
            ], 429);
        }

        $input = $request->all();

        // 1. Process Vision & Nutritional AI
        $result = $this->yoloService->analyze($input);

        // Check if AI services had a connection or timeout error
        if (isset($result['status']) && $result['status'] === 'service_error') {
            return response()->json([
                'status' => 'service_error',
                'success' => false,
                'is_food' => false,
                'message' => $result['message'] ?? 'Layanan AI pemindai sedang sibuk atau koneksi internet tidak stabil. Silakan coba kembali beberapa saat lagi atau pilih dari menu sampel cepat.',
            ]);
        }

        // Check if not food or unrecognized
        if (
            (isset($result['status']) && in_array($result['status'], ['not_food', 'unrecognized'])) ||
            (isset($result['is_food']) && $result['is_food'] === false) ||
            (isset($result['success']) && $result['success'] === false)
        ) {
            return response()->json([
                'status' => 'not_food',
                'success' => false,
                'is_food' => false,
                'message' => $result['message'] ?? 'Objek tidak terdeteksi sebagai makanan atau informasi gizi. Silakan arahkan kamera ke makanan atau label gizi dengan jelas.',
            ]);
        }

        // 2. Extract food and nutritional parameters
        $resData = $result['result'] ?? $result;
        $productName = $resData['product_name'] ?? $resData['name'] ?? 'Pangan Nutrisi Terdeteksi';
        $calories = (float) ($resData['calories'] ?? 0);
        $sugarG = (float) ($resData['sugar_g'] ?? 0);
        $sodiumMg = (float) ($resData['sodium_mg'] ?? 0);
        $carbsG = (float) ($resData['carbs_g'] ?? 0);
        $proteinG = (float) ($resData['protein_g'] ?? 0);
        $fatG = (float) ($resData['fat_g'] ?? 0);
        $fiberG = (float) ($resData['fiber_g'] ?? 0);
        $bpom = (string) ($resData['bpom_number'] ?? $resData['bpom'] ?? '-');
        $category = $resData['category'] ?? 'Pangan & Nutrisi';
        $glScore = $resData['glycemic_load']['score'] ?? ($resData['glycemic_load_score'] ?? null);
        $glLevel = $resData['glycemic_load']['level'] ?? ($resData['glycemic_load_level'] ?? 'SEDANG');
        $clinicalNote = $resData['clinical_note'] ?? ($resData['notes'] ?? null);
        $confidence = (float) ($resData['confidence'] ?? 0.96);

        // 3. Automatically save record to HealthRecord database
        $record = HealthRecord::create([
            'user_id' => $user->id,
            'metric_type' => 'FOOD_LOG',
            'value_numeric' => $calories,
            'value_text' => $productName,
            'unit' => 'kkal',
            'source' => 'SCANNER',
            'quality_status' => 'VERIFIED',
            'confidence_score' => $confidence,
            'metadata' => [
                'food_name' => $productName,
                'category' => $category,
                'calories' => $calories,
                'carbs_g' => $carbsG,
                'sugar_g' => $sugarG,
                'protein_g' => $proteinG,
                'fat_g' => $fatG,
                'fiber_g' => $fiberG,
                'sodium_mg' => $sodiumMg,
                'bpom' => $bpom,
                'glycemic_load' => $glScore,
                'glycemic_load_level' => $glLevel,
                'clinical_note' => $clinicalNote,
            ],
            'recorded_at' => Carbon::now(),
        ]);

        // 4. Award gamification points (+15 points for scanning)
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'SCANNER_REWARD',
            'points' => 15,
            'reference_type' => 'health_records',
            'reference_id' => (string) $record->id,
            'created_at' => Carbon::now(),
        ]);

        // 5. Update or increment streak
        $streak = UserStreak::firstOrCreate(
            ['user_id' => $user->id, 'type' => 'DAILY_LOGGING'],
            ['current_count' => 1, 'best_count' => 1, 'started_at' => Carbon::today(), 'last_activity_at' => Carbon::today()]
        );

        if ($streak->last_activity_at && !Carbon::parse($streak->last_activity_at)->isToday()) {
            if (Carbon::parse($streak->last_activity_at)->isYesterday()) {
                $streak->increment('current_count');
                if ($streak->current_count > $streak->best_count) {
                    $streak->best_count = $streak->current_count;
                }
            } else {
                $streak->current_count = 1;
            }
            $streak->last_activity_at = Carbon::today();
            $streak->save();
        }

        // Attach saved record and reward info to client response
        $result['saved_record'] = $record;
        $result['points_earned'] = 15;
        $result['total_points'] = $user->totalPoints();
        $result['message'] = 'Hasil pemindaian berhasil diproses AI dan otomatis tersimpan ke jurnal nutrisi (+15 Poin)!';

        return response()->json($result);
    }

    /**
     * Save scanned product to user's daily nutrition log manually if requested.
     */
    public function saveToNutrisi(Request $request)
    {
        $productName = $request->input('product_name') ?? $request->input('item_name') ?? 'Produk Nutrisi Kemasan';
        $calories = (float) ($request->input('calories') ?? $request->input('nutrition.calories') ?? 0);
        $sugarG = (float) ($request->input('sugar_grams') ?? $request->input('nutrition.sugar_g') ?? 0);
        $sodiumMg = (float) ($request->input('sodium_mg') ?? $request->input('nutrition.sodium_mg') ?? 0);
        $bpom = (string) ($request->input('bpom_number') ?? $request->input('bpom') ?? '-');
        $glycemicLoad = $request->input('glycemic_load.score') ?? $request->input('glycemic_load') ?? null;

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Record health record
        $record = HealthRecord::create([
            'user_id' => $user->id,
            'metric_type' => 'FOOD_LOG',
            'value_numeric' => $calories,
            'value_text' => $productName,
            'unit' => 'kkal',
            'source' => 'SCANNER',
            'quality_status' => 'VERIFIED',
            'confidence_score' => 0.95,
            'metadata' => [
                'food_name' => $productName,
                'sugar_g' => $sugarG,
                'sodium_mg' => $sodiumMg,
                'bpom' => $bpom,
                'glycemic_load' => $glycemicLoad,
            ],
            'recorded_at' => Carbon::now(),
        ]);

        // 2. Award gamification points (+15 points for scanning)
        PointsLedger::create([
            'user_id' => $user->id,
            'event_type' => 'SCANNER_REWARD',
            'points' => 15,
            'reference_type' => 'health_records',
            'reference_id' => (string) $record->id,
            'created_at' => Carbon::now(),
        ]);

        // 3. Update or increment streak
        $streak = UserStreak::firstOrCreate(
            ['user_id' => $user->id, 'type' => 'DAILY_LOGGING'],
            ['current_count' => 1, 'best_count' => 1, 'started_at' => Carbon::today(), 'last_activity_at' => Carbon::today()]
        );

        if ($streak->last_activity_at && !Carbon::parse($streak->last_activity_at)->isToday()) {
            if (Carbon::parse($streak->last_activity_at)->isYesterday()) {
                $streak->increment('current_count');
                if ($streak->current_count > $streak->best_count) {
                    $streak->best_count = $streak->current_count;
                }
            } else {
                $streak->current_count = 1;
            }
            $streak->last_activity_at = Carbon::today();
            $streak->save();
        }

        return response()->json([
            'status' => 'success',
            'success' => true,
            'message' => 'Produk berhasil dicatat ke riwayat nutrisi! Anda mendapatkan +15 Poin.',
            'points_earned' => 15,
            'total_points' => $user->totalPoints(),
            'record' => $record,
        ]);
    }
}
