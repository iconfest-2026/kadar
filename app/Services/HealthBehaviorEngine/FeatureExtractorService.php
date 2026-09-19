<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\MetricType;
use App\Models\BehaviorFeature;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\User;
use Carbon\Carbon;

class FeatureExtractorService
{
    /**
     * Extracts behavioral feature vectors for a user and metric.
     *
     * @return array<string, float>
     */
    public function extractFeatures(User $user, string|MetricType $metricType, int $recentDays = 5): array
    {
        $typeString = is_string($metricType) ? $metricType : $metricType->value;
        $endDate = Carbon::today()->endOfDay();
        $startDate = Carbon::today()->subDays($recentDays - 1)->startOfDay();

        $records = HealthRecord::query()
            ->where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('quality_status', 'VALID')
            ->whereBetween('recorded_at', [$startDate, $endDate])
            ->orderBy('recorded_at')
            ->get();

        $values = $records->pluck('value_numeric')->map(fn ($v) => (float) $v)->values()->all();
        $count = count($values);

        if ($count === 0) {
            return [
                'average' => 0.0,
                'variability' => 0.0,
                'consistency' => 0.0,
                'trend_slope' => 0.0,
                'deviation_delta' => 0.0,
                'sample_count' => 0,
            ];
        }

        $average = array_sum($values) / $count;

        // Variability (Std Dev)
        $variability = 0.0;
        if ($count > 1) {
            $sumSq = 0.0;
            foreach ($values as $v) {
                $sumSq += pow($v - $average, 2);
            }
            $variability = sqrt($sumSq / ($count - 1));
        }

        // Consistency ratio (e.g. 5 records in 5 days = 1.0)
        $consistency = round(min(1.0, $count / $recentDays), 2);

        // Linear regression slope
        $slope = $this->calculateSlope($values);

        // Deviation delta against baseline
        $baseline = HealthBaseline::where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('is_active', true)
            ->first();

        $baselineValue = $baseline ? (float) $baseline->value_primary : $average;
        $deviationDelta = round($average - $baselineValue, 2);

        // Store features in database
        $features = [
            'AVERAGE' => round($average, 2),
            'VARIABILITY' => round($variability, 2),
            'CONSISTENCY' => $consistency,
            'TREND' => round($slope, 2),
            'DEVIATION' => $deviationDelta,
        ];

        foreach ($features as $fType => $val) {
            BehaviorFeature::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'metric_type' => $typeString,
                    'feature_type' => $fType,
                    'period_start' => $startDate,
                    'period_end' => $endDate,
                ],
                [
                    'value_numeric' => $val,
                    'source_version' => 'v1.0',
                ]
            );
        }

        return [
            'average' => round($average, 2),
            'variability' => round($variability, 2),
            'consistency' => $consistency,
            'trend_slope' => round($slope, 2),
            'deviation_delta' => $deviationDelta,
            'baseline_value' => $baselineValue,
            'sample_count' => $count,
        ];
    }

    private function calculateSlope(array $values): float
    {
        $n = count($values);
        if ($n < 2) {
            return 0.0;
        }

        $x = range(1, $n);
        $meanX = array_sum($x) / $n;
        $meanY = array_sum($values) / $n;

        $numerator = 0.0;
        $denominator = 0.0;

        for ($i = 0; $i < $n; $i++) {
            $diffX = $x[$i] - $meanX;
            $numerator += $diffX * ($values[$i] - $meanY);
            $denominator += pow($diffX, 2);
        }

        return $denominator != 0 ? $numerator / $denominator : 0.0;
    }
}
