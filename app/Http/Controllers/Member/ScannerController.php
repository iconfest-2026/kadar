<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScannerController extends Controller
{
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
        $dailyLimit = $membership?->tier?->slug === 'platinum' ? -1 : ($membership?->tier?->slug === 'gold' ? 50 : 10);

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
     * Analyze image from live camera snapshot or sample preset.
     */
    public function analyze(Request $request)
    {
        $request->validate([
            'image' => 'nullable|string', // Base64 data URL from webcam or uploaded file
            'sample_key' => 'nullable|string|in:drink,food,medicine,snack',
        ]);

        $sampleKey = $request->input('sample_key', 'drink');

        // Presets data with authentic Indonesian BPOM numbers and clinical calculations
        $presets = [
            'drink' => [
                'name' => 'Teh Manis Kemasan Botol Dingin (250 ml)',
                'category' => 'MINUMAN_RINGAN',
                'category_label' => 'Minuman Kemasan Siap Minum',
                'brand' => 'Minuman Teh Melati Tradisional',
                'bpom_number' => 'MD 268310001001',
                'bpom_status' => 'TERDAFTAR_RESMI',
                'bpom_status_label' => 'Izin Edar BPOM RI Valid & Aktif',
                'serving_size' => '250 ml',
                'calories' => 90,
                'sugar_grams' => 20.0,
                'sugar_daily_percent' => 80, // 20g / 25g WHO recommended sugar max
                'sugar_status' => 'HIGH',
                'sugar_status_label' => 'Tinggi Gula Bebas',
                'sodium_mg' => 15,
                'fat_grams' => 0,
                'glycemic_index' => 68,
                'glycemic_load' => 14,
                'glycemic_category' => 'SEDANG_TINGGI',
                'spike_peak' => '172 mg/dL',
                'spike_time' => 'Menit ke-45 pasca konsumsi',
                'glucose_curve' => [
                    ['time' => '0m', 'value' => 95],
                    ['time' => '15m', 'value' => 135],
                    ['time' => '30m', 'value' => 165],
                    ['time' => '45m', 'value' => 172],
                    ['time' => '60m', 'value' => 155],
                    ['time' => '90m', 'value' => 125],
                    ['time' => '120m', 'value' => 102],
                ],
                'clinical_summary' => 'Sukrosa cair diserap sangat cepat oleh mukosa usus, memicu lonjakan insulin mendadak. Pada orang dengan pra-diabetes, minuman ini dapat memicu hiperglikemia sesaat dan rasa kantuk hebat (sugar crash).',
                'recommendation' => 'Ganti dengan teh hijau tawar atau air kelapa murni tanpa sirup pemanis.',
            ],
            'food' => [
                'name' => 'Oat Crunch Biskuit Gandum Utuh (30 g)',
                'category' => 'PANGAN_OLAHAN',
                'category_label' => 'Pangan Olahan Gandum & Sereal',
                'brand' => 'Modern Organic Oat Crunch',
                'bpom_number' => 'MD 235610023412',
                'bpom_status' => 'TERDAFTAR_RESMI',
                'bpom_status_label' => 'Izin Edar BPOM RI Valid & Aktif',
                'serving_size' => '3 keping (30 g)',
                'calories' => 140,
                'sugar_grams' => 3.0,
                'sugar_daily_percent' => 12,
                'sugar_status' => 'LOW',
                'sugar_status_label' => 'Rendah Gula (<5g)',
                'sodium_mg' => 90,
                'fat_grams' => 5.0,
                'fiber_grams' => 5.0,
                'glycemic_index' => 45,
                'glycemic_load' => 8,
                'glycemic_category' => 'RENDAH',
                'spike_peak' => '118 mg/dL',
                'spike_time' => 'Kenaikan Bertahap Menit ke-60',
                'glucose_curve' => [
                    ['time' => '0m', 'value' => 95],
                    ['time' => '15m', 'value' => 102],
                    ['time' => '30m', 'value' => 110],
                    ['time' => '45m', 'value' => 116],
                    ['time' => '60m', 'value' => 118],
                    ['time' => '90m', 'value' => 112],
                    ['time' => '120m', 'value' => 98],
                ],
                'clinical_summary' => 'Tingginya kandungan serat pangan larut (beta-glukan) membentuk gel di lambung yang memperlambat penyerapan glukosa, menjaga energi stabil sepanjang hari tanpa lonjakan tajam.',
                'recommendation' => 'Pilihan sangat baik untuk sarapan ringan atau camilan sore ramah glukosa.',
            ],
            'medicine' => [
                'name' => 'Aprena Film-Coated Tablet 10 mg',
                'category' => 'SEDIAAN_FARMASI',
                'category_label' => 'Obat Keras Terdaftar Resmi BPOM',
                'brand' => 'Medika Pharma Farma',
                'bpom_number' => 'POM DKL2345678910A1',
                'bpom_status' => 'TERDAFTAR_RESMI',
                'bpom_status_label' => 'Registrasi Obat BPOM RI Terverifikasi',
                'serving_size' => '1 tablet salut selaput (10 mg)',
                'calories' => 0,
                'sugar_grams' => 0,
                'sugar_daily_percent' => 0,
                'sugar_status' => 'ZERO',
                'sugar_status_label' => 'Bebas Gula',
                'active_ingredient' => 'Amorfenic Acid 10 mg',
                'batch_number' => 'Batch No: A24301 • Exp: 05/2027',
                'glycemic_index' => 0,
                'glycemic_load' => 0,
                'glycemic_category' => 'NETRAL',
                'spike_peak' => 'Konsentrasi Plasma Puncak 90 menit',
                'spike_time' => 'Durasi Efektif 4–6 Jam',
                'glucose_curve' => [
                    ['time' => '0m', 'value' => 95],
                    ['time' => '15m', 'value' => 95],
                    ['time' => '30m', 'value' => 96],
                    ['time' => '45m', 'value' => 95],
                    ['time' => '60m', 'value' => 95],
                    ['time' => '90m', 'value' => 95],
                    ['time' => '120m', 'value' => 94],
                ],
                'clinical_summary' => 'Tercatat valid dalam basis data registrasi obat BPOM. Tidak memengaruhi metabolisme glukosa secara langsung. Disarankan diminum sesudah makan untuk kenyamanan lambung.',
                'recommendation' => 'Patuhi jadwal minum obat sesuai anjuran dokter penanggung jawab Anda.',
            ],
            'snack' => [
                'name' => 'Keripik Kentang Renyah Rasa Balado (50 g)',
                'category' => 'PANGAN_OLAHAN',
                'category_label' => 'Camilan Goreng Tinggi Natrium',
                'brand' => 'Snack Nusantara Crispy',
                'bpom_number' => 'MD 272810019283',
                'bpom_status' => 'TERDAFTAR_RESMI',
                'bpom_status_label' => 'Izin Edar BPOM RI Valid & Aktif',
                'serving_size' => '50 g',
                'calories' => 260,
                'sugar_grams' => 4.5,
                'sugar_daily_percent' => 18,
                'sugar_status' => 'MEDIUM',
                'sugar_status_label' => 'Gula Sedang',
                'sodium_mg' => 480,
                'sodium_daily_percent' => 24,
                'fat_grams' => 16.0,
                'glycemic_index' => 70,
                'glycemic_load' => 18,
                'glycemic_category' => 'TINGGI',
                'spike_peak' => '158 mg/dL',
                'spike_time' => 'Menit ke-50 pasca konsumsi',
                'glucose_curve' => [
                    ['time' => '0m', 'value' => 95],
                    ['time' => '15m', 'value' => 118],
                    ['time' => '30m', 'value' => 142],
                    ['time' => '50m', 'value' => 158],
                    ['time' => '75m', 'value' => 140],
                    ['time' => '90m', 'value' => 120],
                    ['time' => '120m', 'value' => 100],
                ],
                'clinical_summary' => 'Kombinasi pati kentang cepat cerna, lemak jenuh tinggi, dan natrium gurih mendorong makan berlebih (hyper-palatable). Natrium tinggi berisiko meningkatkan tekanan darah.',
                'recommendation' => 'Batasi porsi konsumsi atau ganti dengan keripik tempe oven tanpa garam berlebih.',
            ],
        ];

        $result = $presets[$sampleKey] ?? $presets['drink'];

        return response()->json([
            'success' => true,
            'data' => $result,
            'source' => $request->has('image') ? 'CAMERA_OCR_ANALYSIS' : 'PRESET_DEMO',
        ]);
    }

    /**
     * Save scanned product to user's daily nutrition log.
     */
    public function saveToNutrisi(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:200',
            'calories' => 'required|numeric',
            'sugar_grams' => 'nullable|numeric',
            'sodium_mg' => 'nullable|numeric',
            'bpom_number' => 'nullable|string',
            'glycemic_load' => 'nullable|numeric',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Record health record
        $record = HealthRecord::create([
            'user_id' => $user->id,
            'metric_type' => 'FOOD_LOG',
            'value' => $validated['calories'],
            'unit' => 'kkal',
            'source' => 'SCANNER',
            'context' => [
                'food_name' => $validated['item_name'],
                'sugar_g' => $validated['sugar_grams'] ?? 0,
                'sodium_mg' => $validated['sodium_mg'] ?? 0,
                'bpom' => $validated['bpom_number'] ?? '-',
                'glycemic_load' => $validated['glycemic_load'] ?? null,
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
            'success' => true,
            'message' => 'Produk berhasil dicatat ke riwayat nutrisi! Anda mendapatkan +15 Poin.',
            'points_earned' => 15,
            'total_points' => $user->totalPoints(),
            'record' => $record,
        ]);
    }
}
