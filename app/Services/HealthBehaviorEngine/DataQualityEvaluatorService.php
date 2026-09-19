<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\MetricType;
use Carbon\Carbon;

class DataQualityEvaluatorService
{
    /**
     * Evaluates data quality and sanity bounds.
     *
     * @return array{is_valid: bool, is_outlier: bool, quality_status: string, dqs: float, reason: ?string}
     */
    public function evaluate(string|MetricType $metricType, float $value, Carbon|string $recordedAt, string $source = 'manual'): array
    {
        $type = is_string($metricType) ? MetricType::tryFrom($metricType) : $metricType;
        $timestamp = is_string($recordedAt) ? Carbon::parse($recordedAt) : $recordedAt;

        // Future timestamp check
        if ($timestamp->isFuture()) {
            return [
                'is_valid' => false,
                'is_outlier' => true,
                'quality_status' => 'INVALID_FUTURE_TIME',
                'dqs' => 0.0,
                'reason' => 'Stempel waktu tidak boleh di masa depan.',
            ];
        }

        // Biological sanity bounds
        $bounds = $this->getSanityBounds($type);
        if ($value < $bounds['min'] || $value > $bounds['max']) {
            return [
                'is_valid' => false,
                'is_outlier' => true,
                'quality_status' => 'OUT_OF_BIOLOGICAL_BOUNDS',
                'dqs' => 0.20,
                'reason' => "Nilai {$value} berada di luar rentang biologis wajar ({$bounds['min']} - {$bounds['max']}).",
            ];
        }

        // Source confidence
        $sourceWeight = match ($source) {
            'wearable', 'system' => 1.00,
            'scanner', 'instructor' => 0.90,
            'manual', 'imported' => 0.80,
            default => 0.70,
        };

        // Recency score (within 48 hours is 1.0, older degrades gradually)
        $hoursAgo = abs(now()->diffInHours($timestamp));
        $recencyScore = $hoursAgo <= 48 ? 1.0 : max(0.5, 1.0 - (($hoursAgo - 48) / 168));

        // DQS Composite
        $dqs = round((0.4 * 1.0) + (0.3 * $sourceWeight) + (0.3 * $recencyScore), 2);

        return [
            'is_valid' => true,
            'is_outlier' => false,
            'quality_status' => 'VALID',
            'dqs' => $dqs,
            'reason' => null,
        ];
    }

    /**
     * Define physiological sanity bounds per metric in canonical units.
     */
    private function getSanityBounds(?MetricType $type): array
    {
        if (!$type) {
            return ['min' => 0, 'max' => 1000000];
        }

        return match ($type) {
            MetricType::SLEEP_DURATION => ['min' => 60, 'max' => 1080], // 1 hour to 18 hours in minutes
            MetricType::SLEEP_QUALITY, MetricType::MOOD_SCORE, MetricType::ENERGY_LEVEL => ['min' => 1, 'max' => 5],
            MetricType::STEPS => ['min' => 0, 'max' => 100000],
            MetricType::ACTIVE_MINUTES => ['min' => 0, 'max' => 720], // up to 12 hours
            MetricType::WATER_INTAKE => ['min' => 50, 'max' => 10000], // 50ml to 10L
            MetricType::BLOOD_GLUCOSE => ['min' => 30, 'max' => 600], // mg/dL
            MetricType::WEIGHT => ['min' => 25, 'max' => 350], // kg
            default => ['min' => 0, 'max' => 100000],
        };
    }
}
