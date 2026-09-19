<?php

namespace Tests\Feature;

use App\Enums\MetricType;
use App\Models\HealthRecord;
use App\Models\User;
use App\Services\HealthBehaviorEngine\BaselineBuilderService;
use App\Services\HealthBehaviorEngine\ChangeDetectorService;
use App\Services\HealthBehaviorEngine\InsightGeneratorService;
use App\Services\HealthBehaviorEngine\SignalQualifierService;
use App\Services\Safety\EmergencyService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HealthBehaviorEngineTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(\Database\Seeders\RoleAndPermissionSeeder::class);
        $this->seed(\Database\Seeders\MembershipTierSeeder::class);
    }

    public function test_hbe_calculates_14_day_baseline_and_qualifies_deviation_signal(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        // 1. Seed 14 days of natural healthy baseline data (~435 mins with realistic variance)
        $baselineValues = [435, 440, 425, 450, 430, 445, 435, 440, 420, 450, 435, 440, 425, 430];
        foreach ($baselineValues as $idx => $val) {
            $daysAgo = 18 - $idx; // days 18 down to 5
            HealthRecord::create([
                'user_id' => $user->id,
                'metric_type' => MetricType::SLEEP_DURATION->value,
                'value_numeric' => (float)$val,
                'value_text' => (string)$val,
                'unit' => 'minutes',
                'recorded_at' => Carbon::now()->subDays($daysAgo)->setTime(7, 30),
                'quality_status' => 'VALID',
                'confidence_score' => 0.95,
            ]);
        }

        // Calculate baseline with 20-day window
        $baselineService = app(BaselineBuilderService::class);
        $baseline = $baselineService->buildBaseline($user, MetricType::SLEEP_DURATION, 20);

        $this->assertNotNull($baseline);
        $this->assertEquals(14, $baseline->sample_count);
        $this->assertGreaterThan(420.0, (float)$baseline->value_primary);
        $this->assertGreaterThan(5.0, (float)$baseline->value_secondary); // standard deviation is healthy
        $this->assertEquals('AVAILABLE', $baseline->status);

        // 2. Seed recent 4 days of sleep drop (days 4 down to 1: ~340 mins = 5h 40m, drop of ~95 mins)
        $dropValues = [340, 335, 345, 340];
        foreach ($dropValues as $idx => $val) {
            $daysAgo = 4 - $idx;
            HealthRecord::create([
                'user_id' => $user->id,
                'metric_type' => MetricType::SLEEP_DURATION->value,
                'value_numeric' => (float)$val,
                'value_text' => (string)$val,
                'unit' => 'minutes',
                'recorded_at' => Carbon::now()->subDays($daysAgo)->setTime(8, 0),
                'quality_status' => 'VALID',
                'confidence_score' => 0.95,
            ]);
        }

        // 3. Change Detector evaluation
        $changeDetector = app(ChangeDetectorService::class);
        $change = $changeDetector->detectChange($user, MetricType::SLEEP_DURATION, 4);

        $this->assertTrue($change['has_change']);
        $this->assertEquals('DECREASING', $change['direction']);
        $this->assertContains($change['magnitude'], ['MODERATE', 'LARGE']);

        // 4. Signal Qualifier creates BehaviorSignal
        $signalQualifier = app(SignalQualifierService::class);
        $signal = $signalQualifier->qualifySignal($user, MetricType::SLEEP_DURATION, 4);

        $this->assertNotNull($signal);
        $this->assertEquals('SLEEP_DECLINE', $signal->signal_type);
        $this->assertGreaterThan(50.0, (float)$signal->priority_score);

        // 5. Insight Generator creates Insight + Recommendations
        $insightGenerator = app(InsightGeneratorService::class);
        $insight = $insightGenerator->generateInsight($signal);

        $this->assertNotNull($insight);
        $this->assertEquals($user->id, $insight->user_id);
        $this->assertDatabaseHas('recommendations', [
            'insight_id' => $insight->id,
            'user_id' => $user->id,
        ]);
    }

    public function test_emergency_service_executes_independently_of_ai(): void
    {
        /** @var User $user */
        $user = User::factory()->create();

        $emergencyService = app(EmergencyService::class);
        $response = $emergencyService->triggerEmergency($user, -6.2088, 106.8456);

        $this->assertEquals('EMERGENCY_TRIGGERED', $response['status']);
        $this->assertEquals('119', $response['hotlines']['primary_ambulance']);
        $this->assertDatabaseHas('emergency_events', [
            'user_id' => $user->id,
            'action_taken' => 'DIAL_119',
        ]);
    }
}
