<?php

namespace Tests\Unit;

use App\Enums\MetricType;
use App\Services\HealthBehaviorEngine\DataQualityEvaluatorService;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

class DataQualityEvaluatorServiceTest extends TestCase
{
    protected DataQualityEvaluatorService $evaluator;

    protected function setUp(): void
    {
        parent::setUp();
        $this->evaluator = new DataQualityEvaluatorService();
    }

    public function test_accepts_valid_sleep_duration_within_bounds(): void
    {
        // 450 minutes (7.5 hours) is valid
        $result = $this->evaluator->evaluate(MetricType::SLEEP_DURATION, 450.0, Carbon::now(), 'wearable');

        $this->assertTrue($result['is_valid']);
        $this->assertFalse($result['is_outlier']);
        $this->assertGreaterThan(0.8, $result['dqs']);
    }

    public function test_rejects_future_timestamp(): void
    {
        $future = Carbon::now()->addDays(2);
        $result = $this->evaluator->evaluate(MetricType::WATER_INTAKE, 500.0, $future, 'manual');

        $this->assertFalse($result['is_valid']);
        $this->assertEquals('INVALID_FUTURE_TIME', $result['quality_status']);
    }

    public function test_flags_out_of_biological_bounds(): void
    {
        // 2000 minutes of sleep in 1 night is impossible (> 33 hours)
        $result = $this->evaluator->evaluate(MetricType::SLEEP_DURATION, 2000.0, Carbon::now(), 'manual');

        $this->assertFalse($result['is_valid']);
        $this->assertTrue($result['is_outlier']);
        $this->assertEquals('OUT_OF_BIOLOGICAL_BOUNDS', $result['quality_status']);
    }
}
