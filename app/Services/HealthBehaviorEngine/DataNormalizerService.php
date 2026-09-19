<?php

namespace App\Services\HealthBehaviorEngine;

use App\Enums\MetricType;

class DataNormalizerService
{
    /**
     * Normalize a value to its canonical unit based on metric type and input unit.
     *
     * @return array{value: float, unit: string}
     */
    public function normalize(string|MetricType $metricType, float $rawValue, string $rawUnit): array
    {
        $type = is_string($metricType) ? MetricType::tryFrom($metricType) : $metricType;
        $unit = strtolower(trim($rawUnit));

        if (!$type) {
            return ['value' => $rawValue, 'unit' => $rawUnit, 'canonical_unit' => $rawUnit];
        }

        $result = match ($type) {
            MetricType::SLEEP_DURATION, MetricType::ACTIVE_MINUTES => $this->normalizeDuration($rawValue, $unit),
            MetricType::WATER_INTAKE => $this->normalizeVolume($rawValue, $unit),
            MetricType::STEPS => ['value' => max(0, round($rawValue)), 'unit' => 'steps'],
            MetricType::BLOOD_GLUCOSE => $this->normalizeGlucose($rawValue, $unit),
            MetricType::WEIGHT => $this->normalizeWeight($rawValue, $unit),
            default => ['value' => $rawValue, 'unit' => $type->canonicalUnit()],
        };

        $result['canonical_unit'] = $result['unit'];
        return $result;
    }

    private function normalizeDuration(float $value, string $unit): array
    {
        // Canonical unit is minutes
        $normalized = match ($unit) {
            'hour', 'hours', 'jam', 'j', 'h' => $value * 60,
            'second', 'seconds', 'detik', 's' => $value / 60,
            default => $value, // assuming minutes ('minute', 'minutes', 'menit', 'm')
        };

        return [
            'value' => round(max(0, $normalized), 2),
            'unit' => 'minutes',
        ];
    }

    private function normalizeVolume(float $value, string $unit): array
    {
        // Canonical unit is ml
        $normalized = match ($unit) {
            'liter', 'liters', 'l' => $value * 1000,
            'glass', 'glasses', 'gelas' => $value * 250, // Standard Indonesian drinking glass ~250ml
            'bottle', 'bottles', 'botol' => $value * 600, // Standard 600ml water bottle
            default => $value, // 'ml', 'milliliter'
        };

        return [
            'value' => round(max(0, $normalized), 2),
            'unit' => 'ml',
        ];
    }

    private function normalizeGlucose(float $value, string $unit): array
    {
        // Canonical unit in Indonesia is mg/dL. If mmol/L is provided: 1 mmol/L = 18.018 mg/dL
        $normalized = match ($unit) {
            'mmol/l', 'mmol' => $value * 18.018,
            default => $value, // 'mg/dl'
        };

        return [
            'value' => round(max(0, $normalized), 2),
            'unit' => 'mg/dL',
        ];
    }

    private function normalizeWeight(float $value, string $unit): array
    {
        // Canonical unit is kg. If lbs: 1 lb = 0.453592 kg
        $normalized = match ($unit) {
            'lbs', 'lb', 'pound', 'pounds' => $value * 0.453592,
            default => $value, // 'kg'
        };

        return [
            'value' => round(max(0, $normalized), 2),
            'unit' => 'kg',
        ];
    }
}
