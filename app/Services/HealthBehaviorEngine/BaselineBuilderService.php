<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\BaselineStatus;
use App\Enums\MetricType;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\User;
use Carbon\Carbon;

class BaselineBuilderService
{
    /**
     * Compute or refresh the personal rolling baseline for a user on a given metric.
     */
    public function buildBaseline(User $user, string|MetricType $metricType, int $windowDays = 14): ?HealthBaseline
    {
        $typeString = is_string($metricType) ? $metricType : $metricType->value;
        $windowEnd = Carbon::today();
        $windowStart = $windowEnd->copy()->subDays($windowDays);

        // Fetch valid, non-deleted records within window
        $records = HealthRecord::query()
            ->where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('quality_status', 'VALID')
            ->whereBetween('recorded_at', [$windowStart->startOfDay(), $windowEnd->endOfDay()])
            ->orderBy('recorded_at')
            ->get();

        $values = $records->pluck('value_numeric')->map(fn ($v) => (float) $v)->values()->all();
        $sampleCount = count($values);

        // Determine baseline status
        $status = match (true) {
            $sampleCount === 0 => BaselineStatus::NOT_STARTED,
            $sampleCount < 7 => BaselineStatus::COLLECTING,
            default => BaselineStatus::AVAILABLE,
        };

        if ($sampleCount === 0) {
            return null;
        }

        // Statistical computations
        $mean = array_sum($values) / $sampleCount;
        $median = $this->calculateMedian($values);
        $stdDev = $this->calculateStdDev($values, $mean);

        // Deactivate old active baseline
        HealthBaseline::where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('is_active', true)
            ->update(['is_active' => false]);

        // Save new baseline
        return HealthBaseline::create([
            'user_id' => $user->id,
            'metric_type' => $typeString,
            'window_start' => $windowStart->toDateString(),
            'window_end' => $windowEnd->toDateString(),
            'sample_count' => $sampleCount,
            'value_primary' => round($mean, 4),
            'value_secondary' => round($stdDev, 4),
            'method' => 'rolling_mean_iqr',
            'status' => $status->value,
            'rule_version' => 'v1.0',
            'is_active' => true,
            'generated_at' => now(),
        ]);
    }

    private function calculateMedian(array $values): float
    {
        sort($values);
        $count = count($values);
        if ($count === 0) {
            return 0.0;
        }
        $middle = (int) floor($count / 2);
        if ($count % 2 === 0) {
            return ($values[$middle - 1] + $values[$middle]) / 2;
        }
        return $values[$middle];
    }

    private function calculateStdDev(array $values, float $mean): float
    {
        $count = count($values);
        if ($count <= 1) {
            return 0.0;
        }
        $sumSquares = 0.0;
        foreach ($values as $val) {
            $sumSquares += pow($val - $mean, 2);
        }
        return sqrt($sumSquares / ($count - 1));
    }
}
