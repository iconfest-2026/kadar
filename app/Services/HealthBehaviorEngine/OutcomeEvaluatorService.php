<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\ResultType;
use App\Models\BehaviorOutcome;
use App\Models\HealthRecord;
use App\Models\Intervention;
use App\Models\InterventionOutcome;
use Carbon\Carbon;

class OutcomeEvaluatorService
{
    /**
     * Evaluates the before vs after longitudinal outcome of an intervention.
     */
    public function evaluateIntervention(Intervention $intervention, int $windowDays = 7): InterventionOutcome
    {
        $user = $intervention->user;
        $metric = $intervention->goal?->metrics->first()?->metric_type ?? 'sleep_duration';
        $startAt = Carbon::parse($intervention->start_at);

        // Before window
        $beforeStart = $startAt->copy()->subDays($windowDays);
        $beforeRecords = HealthRecord::query()
            ->where('user_id', $user->id)
            ->where('metric_type', $metric)
            ->where('quality_status', 'VALID')
            ->whereBetween('recorded_at', [$beforeStart, $startAt])
            ->get();

        // After window
        $afterEnd = $startAt->copy()->addDays($windowDays);
        $afterRecords = HealthRecord::query()
            ->where('user_id', $user->id)
            ->where('metric_type', $metric)
            ->where('quality_status', 'VALID')
            ->whereBetween('recorded_at', [$startAt, $afterEnd])
            ->get();

        $beforeVal = $beforeRecords->isNotEmpty() ? (float) $beforeRecords->avg('value_numeric') : 0.0;
        $afterVal = $afterRecords->isNotEmpty() ? (float) $afterRecords->avg('value_numeric') : 0.0;

        $resultType = $this->determineResultType($metric, $beforeVal, $afterVal, $beforeRecords->count(), $afterRecords->count());

        // Create BehaviorOutcome record
        BehaviorOutcome::create([
            'user_id' => $user->id,
            'intervention_id' => $intervention->id,
            'metric_type' => $metric,
            'before_value' => round($beforeVal, 2),
            'after_value' => round($afterVal, 2),
            'before_window' => $windowDays,
            'after_window' => $windowDays,
            'outcome_type' => $resultType->value,
            'evaluated_at' => now(),
        ]);

        // Create or update InterventionOutcome
        $summary = match ($resultType) {
            ResultType::IMPROVING => "Parameter {$metric} mengalami perbaikan terukur sebesar " . round($afterVal - $beforeVal, 2) . " unit.",
            ResultType::STABLE => "Kondisi parameter {$metric} stabil mendekati target bimbingan.",
            ResultType::DECLINING => "Parameter {$metric} belum menunjukkan kemajuan; perlu penyesuaian strategi mikro.",
            ResultType::INSUFFICIENT_DATA => "Catatan data pendukung belum mencukupi untuk evaluasi lengkap.",
            default => "Hasil evaluasi berkala belum menunjukkan pergeseran signifikan.",
        };

        return InterventionOutcome::updateOrCreate(
            ['intervention_id' => $intervention->id],
            [
                'status' => 'FINAL',
                'observation_start' => $beforeStart,
                'observation_end' => $afterEnd,
                'result_type' => $resultType->value,
                'summary' => $summary,
                'evaluated_by' => $intervention->instructor_id,
            ]
        );
    }

    private function determineResultType(string $metric, float $before, float $after, int $beforeCount, int $afterCount): ResultType
    {
        if ($beforeCount === 0 || $afterCount === 0) {
            return ResultType::INSUFFICIENT_DATA;
        }

        $delta = $after - $before;
        $pct = $before > 0 ? ($delta / $before) * 100 : 0.0;

        // Metrics where higher is better: sleep, steps, water
        if (in_array($metric, ['sleep_duration', 'steps', 'water_intake', 'active_minutes'])) {
            return match (true) {
                $pct >= 5.0 => ResultType::IMPROVING,
                abs($pct) < 5.0 => ResultType::STABLE,
                $pct <= -5.0 => ResultType::DECLINING,
                default => ResultType::UNCHANGED,
            };
        }

        // Metrics where lower is better (e.g. glucose when elevated):
        if ($metric === 'blood_glucose') {
            return match (true) {
                $pct <= -5.0 => ResultType::IMPROVING,
                abs($pct) < 5.0 => ResultType::STABLE,
                $pct >= 5.0 => ResultType::DECLINING,
                default => ResultType::UNCHANGED,
            };
        }

        return ResultType::STABLE;
    }
}
