<?php

namespace App\Http\Controllers\Member;

use App\Enums\MetricType;
use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use App\Models\HealthRecordAudit;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use App\Services\HealthBehaviorEngine\BaselineBuilderService;
use App\Services\HealthBehaviorEngine\DataNormalizerService;
use App\Services\HealthBehaviorEngine\DataQualityEvaluatorService;
use App\Services\HealthBehaviorEngine\InsightGeneratorService;
use App\Services\HealthBehaviorEngine\SignalQualifierService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuickLogController extends Controller
{
    public function __construct(
        protected DataNormalizerService $normalizer,
        protected DataQualityEvaluatorService $evaluator,
        protected BaselineBuilderService $baselineBuilder,
        protected SignalQualifierService $signalQualifier,
        protected InsightGeneratorService $insightGenerator,
    ) {}

    public function store(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'metric_type' => 'required|string',
            'value' => 'required|numeric',
            'unit' => 'nullable|string|max:30',
            'recorded_at' => 'nullable|date',
            'notes' => 'nullable|string|max:500',
            'source' => 'nullable|in:manual,wearable,scanner,instructor,imported',
        ]);

        $metricType = MetricType::tryFrom($validated['metric_type']);
        if (!$metricType) {
            return back()->withErrors(['metric_type' => 'Tipe metrik tidak valid.']);
        }

        $recordedAt = !empty($validated['recorded_at'])
            ? Carbon::parse($validated['recorded_at'])
            : Carbon::now();

        $rawUnit = $validated['unit'] ?? $metricType->canonicalUnit();
        $source = $validated['source'] ?? 'manual';

        // 1. Normalize
        $normalized = $this->normalizer->normalize($metricType, (float)$validated['value'], $rawUnit);

        // 2. Evaluate Quality & Sanity
        $quality = $this->evaluator->evaluate($metricType, $normalized['value'], $recordedAt, $source);

        if (!$quality['is_valid']) {
            return back()->withErrors(['value' => $quality['reason'] ?? 'Nilai yang dimasukkan berada di luar batas biologis yang masuk akal.']);
        }

        $generatedInsight = null;

        DB::transaction(function () use ($user, $metricType, $normalized, $validated, $recordedAt, $quality, $source, &$generatedInsight) {
            // 3. Create Health Record
            $record = HealthRecord::create([
                'user_id' => $user->id,
                'metric_type' => $metricType->value,
                'value_numeric' => $normalized['value'],
                'value_text' => (string)$normalized['value'],
                'unit' => $normalized['canonical_unit'],
                'source' => $source,
                'recorded_at' => $recordedAt,
                'quality_status' => $quality['quality_status'],
                'confidence_score' => $quality['dqs'],
                'metadata' => [
                    'raw_value' => (float)$validated['value'],
                    'raw_unit' => $validated['unit'] ?? null,
                    'notes' => $validated['notes'] ?? null,
                ],
            ]);

            // 4. Create Audit Log for Health Record
            HealthRecordAudit::create([
                'health_record_id' => $record->id,
                'old_value' => null,
                'new_value' => (string)$record->value_numeric,
                'reason' => 'QUICK_LOG_ENTRY',
                'updated_by' => $user->id,
            ]);

            // 5. Update Streak
            $today = Carbon::today();
            $streak = UserStreak::firstOrCreate(
                ['user_id' => $user->id, 'type' => 'DAILY_LOGGING'],
                ['current_count' => 0, 'best_count' => 0, 'started_at' => $today->toDateString(), 'last_activity_at' => null]
            );

            if (!$streak->last_activity_at || !Carbon::parse($streak->last_activity_at)->isToday()) {
                if ($streak->last_activity_at && Carbon::parse($streak->last_activity_at)->isYesterday()) {
                    $streak->current_count += 1;
                } else {
                    $streak->current_count = 1;
                }
                if ($streak->current_count > $streak->best_count) {
                    $streak->best_count = $streak->current_count;
                }
                $streak->last_activity_at = $today->toDateString();
                $streak->save();

                // 6. Award Activity Points
                PointsLedger::create([
                    'user_id' => $user->id,
                    'event_type' => 'QUICK_LOG',
                    'points' => 10,
                    'reference_type' => 'HealthRecord',
                    'reference_id' => (string)$record->id,
                    'created_at' => now(),
                ]);
            }

            // 7. Trigger HBE Pipeline for this metric
            $this->baselineBuilder->buildBaseline($user, $metricType);
            $signal = $this->signalQualifier->qualifySignal($user, $metricType);

            if ($signal) {
                $generatedInsight = $this->insightGenerator->generateInsight($signal);
            }
        });

        $message = "Catatan {$metricType->label()} berhasil disimpan (+10 poin)!";
        if ($generatedInsight) {
            $message .= " Pola terbaru Anda menghasilkan insight baru.";
        }

        return back()->with('success', $message);
    }
}
