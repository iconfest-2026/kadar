<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\MetricType;
use App\Models\HealthBaseline;
use App\Models\User;

class ChangeDetectorService
{
    public function __construct(
        protected FeatureExtractorService $featureExtractor
    ) {}

    /**
     * Detects meaningful behavioral shifts.
     *
     * @return array{has_change: bool, delta: float, percentage_change: float, magnitude: string, direction: string, features: array}
     */
    public function detectChange(User $user, string|MetricType $metricType, int $recentDays = 5): array
    {
        $typeString = is_string($metricType) ? $metricType : $metricType->value;
        $features = $this->featureExtractor->extractFeatures($user, $metricType, $recentDays);

        if ($features['sample_count'] < 3) {
            return [
                'has_change' => false,
                'delta' => 0.0,
                'percentage_change' => 0.0,
                'magnitude' => 'NONE',
                'direction' => 'STABLE',
                'features' => $features,
            ];
        }

        $baseline = HealthBaseline::where('user_id', $user->id)
            ->where('metric_type', $typeString)
            ->where('is_active', true)
            ->first();

        $baselineVal = $baseline ? (float) $baseline->value_primary : $features['average'];
        $stdDev = $baseline && $baseline->value_secondary ? (float) $baseline->value_secondary : max(1.0, $features['variability']);

        $delta = $features['deviation_delta'];
        $absDelta = abs($delta);
        $percent = $baselineVal > 0 ? round(($delta / $baselineVal) * 100, 1) : 0.0;

        // Magnitude evaluation based on standard deviation
        $sigmaRatio = $stdDev > 0 ? $absDelta / $stdDev : 0.0;
        $magnitude = match (true) {
            $sigmaRatio >= 2.0 => 'LARGE',
            $sigmaRatio >= 1.0 => 'MODERATE',
            $sigmaRatio >= 0.5 => 'SMALL',
            default => 'NEGLIGIBLE',
        };

        $direction = match (true) {
            $delta < 0 => 'DECREASING',
            $delta > 0 => 'INCREASING',
            default => 'STABLE',
        };

        $hasChange = in_array($magnitude, ['MODERATE', 'LARGE']);

        return [
            'has_change' => $hasChange,
            'delta' => $delta,
            'percentage_change' => $percent,
            'magnitude' => $magnitude,
            'direction' => $direction,
            'sigma_ratio' => round($sigmaRatio, 2),
            'features' => $features,
        ];
    }
}
