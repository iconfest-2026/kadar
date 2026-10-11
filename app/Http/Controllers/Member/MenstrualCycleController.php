<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\MenstrualLog;
use App\Models\MenstrualSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenstrualCycleController extends Controller
{
    /**
     * Get cycle summary, phase calculations, and AI predictions.
     */
    public function getSummary()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $settings = MenstrualSetting::firstOrCreate(
            ['user_id' => $user->id],
            [
                'average_cycle_days' => 28,
                'average_period_days' => 5,
                'last_period_date' => Carbon::today()->subDays(14)->toDateString(),
                'contraceptive_type' => 'NONE',
            ]
        );

        $lastPeriod = $settings->last_period_date ? Carbon::parse($settings->last_period_date) : Carbon::today()->subDays(14);
        $today = Carbon::today();
        $cycleLength = $settings->average_cycle_days ?: 28;
        $periodLength = $settings->average_period_days ?: 5;

        // Current cycle day (1-indexed)
        $diffDays = $lastPeriod->diffInDays($today);
        $currentCycleDay = ($diffDays % $cycleLength) + 1;

        // Determine current phase and metabolic guidance
        if ($currentCycleDay <= $periodLength) {
            $phaseKey = 'MENSTRUAL';
            $phaseName = 'Fase Menstruasi';
            $phaseDesc = 'Kadar estrogen dan progesteron berada pada titik terendah. Tubuh membutuhkan asupan zat besi, magnesium, dan hidrasi hangat.';
            $glycemicImpact = 'Sensitivitas insulin cenderung stabil, namun rasa lemas wajar terjadi.';
            $nutritionalTip = 'Konsumsi bayam, tempe, daging tanpa lemak, dan air kelapa untuk memulihkan elektrolit.';
        } elseif ($currentCycleDay < ($cycleLength - 14 - 1)) {
            $phaseKey = 'FOLLICULAR';
            $phaseName = 'Fase Folikuler';
            $phaseDesc = 'Estrogen meningkat bertahap, meningkatkan energi, mood, dan metabolisme karbohidrat.';
            $glycemicImpact = 'Sensitivitas insulin optimal. Tubuh memproses karbohidrat kompleks dengan sangat efisien.';
            $nutritionalTip = 'Waktu terbaik untuk aktivitas fisik intensitas sedang-tinggi dan makanan kaya antioksidan.';
        } elseif ($currentCycleDay <= ($cycleLength - 14 + 2)) {
            $phaseKey = 'OVULATION';
            $phaseName = 'Fase Ovulasi (Masa Subur)';
            $phaseDesc = 'Puncak pelepasan sel telur dan lonjakan hormon LH & estrogen. Masa paling subur dalam siklus.';
            $glycemicImpact = 'Toleransi glukosa prima, suhu basal tubuh sedikit meningkat.';
            $nutritionalTip = 'Perbanyak serat larut, brokoli, dan biji chia untuk mendukung detoksifikasi kelebihan estrogen.';
        } else {
            $phaseKey = 'LUTEAL';
            $phaseName = 'Fase Luteal';
            $phaseDesc = 'Progesteron mendominasi. Tubuh mempersiapkan lapisan rahim, sering disertai retensi air dan peningkatan nafsu makan.';
            $glycemicImpact = 'Resistensi insulin alami meningkat 15–20%. Mudah terjadi lonjakan glukosa dan dorongan kuat mengonsumsi makanan manis (craving).';
            $nutritionalTip = 'Pilihlah karbohidrat berindeks glikemik rendah (ubi rebus, oat) dan tambahkan kayu manis untuk menstabilkan gula darah.';
        }

        // AI Next Cycle Predictions
        $nextPeriodDate = $lastPeriod->copy()->addDays($cycleLength);
        if ($nextPeriodDate->isPast()) {
            $cyclesPassed = floor($lastPeriod->diffInDays($today) / $cycleLength) + 1;
            $nextPeriodDate = $lastPeriod->copy()->addDays($cycleLength * $cyclesPassed);
        }
        $daysUntilNextPeriod = max(0, $today->diffInDays($nextPeriodDate, false));

        $ovulationDay = $cycleLength - 14;
        $nextOvulationDate = $nextPeriodDate->copy()->subDays(14);
        $fertileStart = $nextOvulationDate->copy()->subDays(4);
        $fertileEnd = $nextOvulationDate->copy()->addDay();

        // Generate calendar cycle predictions (past 1 cycle and next 4 cycles)
        $cycleEvents = [];
        $cycleStartCursor = $lastPeriod->copy()->subDays($cycleLength);
        for ($c = 0; $c < 5; $c++) {
            $cPeriodStart = $cycleStartCursor->copy()->addDays($c * $cycleLength);
            $cPeriodEnd = $cPeriodStart->copy()->addDays($periodLength - 1);
            $cOvulationDate = $cPeriodStart->copy()->addDays($cycleLength - 14);
            $cFertileStart = $cOvulationDate->copy()->subDays(4);
            $cFertileEnd = $cOvulationDate->copy()->addDay();

            $cycleEvents[] = [
                'period_start' => $cPeriodStart->toDateString(),
                'period_end' => $cPeriodEnd->toDateString(),
                'ovulation_date' => $cOvulationDate->toDateString(),
                'fertile_start' => $cFertileStart->toDateString(),
                'fertile_end' => $cFertileEnd->toDateString(),
            ];
        }

        // Recent logs
        $logs = MenstrualLog::where('user_id', $user->id)
            ->orderBy('log_date', 'desc')
            ->take(30)
            ->get();

        return response()->json([
            'status' => 'success',
            'success' => true,
            'settings' => $settings,
            'summary' => [
                'current_cycle_day' => (int) $currentCycleDay,
                'cycle_length' => (int) $cycleLength,
                'period_length' => (int) $periodLength,
                'phase_key' => $phaseKey,
                'phase_name' => $phaseName,
                'phase_desc' => $phaseDesc,
                'glycemic_impact' => $glycemicImpact,
                'nutritional_tip' => $nutritionalTip,
                'last_period_date' => $lastPeriod->toDateString(),
                'next_period_date' => $nextPeriodDate->toDateString(),
                'days_until_next_period' => (int) $daysUntilNextPeriod,
                'next_ovulation_date' => $nextOvulationDate->toDateString(),
                'fertile_window' => [
                    'start' => $fertileStart->toDateString(),
                    'end' => $fertileEnd->toDateString(),
                ],
            ],
            'cycle_events' => $cycleEvents,
            'recent_logs' => $logs,
        ]);
    }

    /**
     * Store daily menstrual cycle symptom & flow log.
     */
    public function storeLog(Request $request)
    {
        $validated = $request->validate([
            'log_date' => 'required|date',
            'flow_level' => 'required|in:NONE,SPOTTING,LIGHT,MEDIUM,HEAVY',
            'pain_level' => 'nullable|integer|min:0|max:5',
            'mood' => 'nullable|string|max:50',
            'symptoms' => 'nullable|array',
            'notes' => 'nullable|string|max:500',
            'is_period_start' => 'nullable|boolean',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $log = MenstrualLog::updateOrCreate(
            [
                'user_id' => $user->id,
                'log_date' => $validated['log_date'],
            ],
            [
                'flow_level' => $validated['flow_level'],
                'pain_level' => $validated['pain_level'] ?? 0,
                'mood' => $validated['mood'] ?? null,
                'symptoms' => $validated['symptoms'] ?? [],
                'notes' => $validated['notes'] ?? null,
                'glycemic_note' => $request->input('glycemic_note'),
            ]
        );

        // If user marks this day as period start, update last_period_date in settings
        if (!empty($validated['is_period_start'])) {
            MenstrualSetting::updateOrCreate(
                ['user_id' => $user->id],
                ['last_period_date' => $validated['log_date']]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Catatan siklus dan gejala berhasil disimpan.',
            'log' => $log,
        ]);
    }

    /**
     * Update cycle baseline settings.
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'average_cycle_days' => 'required|integer|min:21|max:45',
            'average_period_days' => 'required|integer|min:2|max:10',
            'last_period_date' => 'required|date',
            'contraceptive_type' => 'nullable|string|max:50',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();

        $settings = MenstrualSetting::updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan siklus haid berhasil diperbarui.',
            'settings' => $settings,
        ]);
    }
}
