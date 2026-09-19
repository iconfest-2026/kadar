<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\MetricType;
use App\Enums\SignalSeverity;
use App\Enums\SignalStatus;
use App\Models\BehaviorSignal;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\User;
use Carbon\Carbon;

class SignalQualifierService
{
    public function __construct(
        protected ChangeDetectorService $changeDetector
    ) {}

    /**
     * Qualifies a behavior deviation and creates/updates a Behavioral Signal.
     */
    public function qualifySignal(User $user, string|MetricType $metricType, int $recentDays = 5): ?BehaviorSignal
    {
        $typeString = is_string($metricType) ? $metricType : $metricType->value;
        $change = $this->changeDetector->detectChange($user, $metricType, $recentDays);

        if (!$change['has_change']) {
            return null;
        }

        $baseline = HealthBaseline::where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('is_active', true)
            ->first();

        // Determine signal type and severity based on metric and direction
        $signalType = $this->resolveSignalType($typeString, $change['direction']);
        $severity = $this->resolveSeverity($change['magnitude'], $change['sigma_ratio']);

        // Calculate priority score (0..100)
        $priorityScore = min(100.0, round(($change['sigma_ratio'] * 30.0) + ($change['features']['consistency'] * 40.0), 2));

        $obsStart = Carbon::today()->subDays($recentDays - 1)->startOfDay();
        $obsEnd = Carbon::today()->endOfDay();

        // Avoid duplicate active signal within cooldown period (48h)
        $existing = BehaviorSignal::where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('signal_type', $signalType)
            ->whereIn('status', [SignalStatus::QUALIFIED->value, SignalStatus::PRESENTED->value])
            ->where('detected_at', '>=', now()->subHours(48))
            ->first();

        if ($existing) {
            $existing->update([
                'severity' => $severity->value,
                'priority_score' => $priorityScore,
                'observation_end' => $obsEnd,
            ]);
            return $existing;
        }

        $signal = BehaviorSignal::create([
            'user_id' => $user->id,
            'metric_type' => $typeString,
            'signal_type' => $signalType,
            'severity' => $severity->value,
            'status' => SignalStatus::QUALIFIED->value,
            'detected_at' => now(),
            'observation_start' => $obsStart,
            'observation_end' => $obsEnd,
            'baseline_id' => $baseline?->id,
            'rule_version' => 'v1.0',
            'evidence_quality' => round($change['features']['consistency'] * 100, 2),
            'priority_score' => $priorityScore,
        ]);

        // Attach evidence records
        $recentRecordIds = HealthRecord::query()
            ->where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('quality_status', 'VALID')
            ->whereBetween('recorded_at', [$obsStart, $obsEnd])
            ->pluck('id');

        if ($recentRecordIds->isNotEmpty()) {
            $signal->records()->syncWithoutDetaching($recentRecordIds);
        }

        return $signal;
    }

    private function resolveSignalType(string $metric, string $direction): string
    {
        return match ($metric) {
            'sleep_duration' => $direction === 'DECREASING' ? 'SLEEP_DECLINE' : 'SLEEP_INCREASE',
            'steps', 'active_minutes' => $direction === 'DECREASING' ? 'ACTIVITY_DROP' : 'ACTIVITY_BOOST',
            'water_intake' => $direction === 'DECREASING' ? 'WATER_DEFICIT' : 'WATER_SURPLUS',
            'blood_glucose' => $direction === 'INCREASING' ? 'GLUCOSE_SPIKE_TREND' : 'GLUCOSE_STABILIZING',
            'weight' => $direction === 'INCREASING' ? 'WEIGHT_GAIN_TREND' : 'WEIGHT_LOSS_TREND',
            default => 'BEHAVIOR_SHIFT',
        };
    }

    private function resolveSeverity(string $magnitude, float $sigmaRatio): SignalSeverity
    {
        return match (true) {
            $sigmaRatio >= 2.5 => SignalSeverity::FOLLOW_UP,
            $sigmaRatio >= 1.8 => SignalSeverity::ATTENTION,
            $sigmaRatio >= 1.0 => SignalSeverity::NOTICE,
            default => SignalSeverity::INFO,
        };
    }
}
