<?php

namespace Tests\Unit;

use App\Enums\MetricType;
use App\Services\HealthBehaviorEngine\DataNormalizerService;
use PHPUnit\Framework\TestCase;

class DataNormalizerServiceTest extends TestCase
{
    protected DataNormalizerService $normalizer;

    protected function setUp(): void
    {
        parent::setUp();
        $this->normalizer = new DataNormalizerService();
    }

    public function test_normalizes_sleep_duration_from_hours_to_minutes(): void
    {
        $result = $this->normalizer->normalize(MetricType::SLEEP_DURATION, 7.5, 'hours');

        $this->assertEquals(450.0, $result['value']);
        $this->assertEquals('minutes', $result['canonical_unit']);
    }

    public function test_normalizes_water_intake_from_glasses_to_ml(): void
    {
        // 1 glass = 250ml -> 8 glasses = 2000ml
        $result = $this->normalizer->normalize(MetricType::WATER_INTAKE, 8, 'glasses');

        $this->assertEquals(2000.0, $result['value']);
        $this->assertEquals('ml', $result['canonical_unit']);
    }

    public function test_normalizes_water_intake_from_liters_to_ml(): void
    {
        $result = $this->normalizer->normalize(MetricType::WATER_INTAKE, 1.5, 'l');

        $this->assertEquals(1500.0, $result['value']);
        $this->assertEquals('ml', $result['canonical_unit']);
    }

    public function test_keeps_canonical_units_unchanged(): void
    {
        $result = $this->normalizer->normalize(MetricType::STEPS, 8000, 'steps');

        $this->assertEquals(8000.0, $result['value']);
        $this->assertEquals('steps', $result['canonical_unit']);
    }
}
