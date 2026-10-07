<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use App\Services\Ocr\NutritionOcrService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScannerController extends Controller
{
    public function __construct(
        protected NutritionOcrService $ocrService
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
     * Analyze image from live camera snapshot, uploaded file, or sample preset using OCR.
     */
    public function analyze(Request $request)
    {
        $input = $request->all();
        $result = $this->ocrService->analyze($input);

        return response()->json($result);
    }

    /**
     * Save scanned product to user's daily nutrition log.
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
            'value' => $calories,
            'unit' => 'kkal',
            'source' => 'SCANNER',
            'context' => [
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
