<?php

namespace Database\Seeders;

use App\Enums\BaselineStatus;
use App\Enums\MetricType;
use App\Enums\SignalSeverity;
use App\Enums\SignalStatus;
use App\Models\AuditLog;
use App\Models\BehaviorInsight;
use App\Models\BehaviorSignal;
use App\Models\Goal;
use App\Models\GoalMetric;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\InstructorMemberAssignment;
use App\Models\LifestyleProfile;
use App\Models\MemberProfile;
use App\Models\Membership;
use App\Models\MembershipTier;
use App\Models\PointsLedger;
use App\Models\Recommendation;
use App\Models\Role;
use App\Models\User;
use App\Models\UserStreak;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        $memberRole = Role::where('slug', 'member')->first();
        $instructorRole = Role::where('slug', 'instructor')->first();
        $adminRole = Role::where('slug', 'admin')->first();
        $goldTier = MembershipTier::where('slug', 'gold')->first();

        // -------------------------------------------------------------
        // 1. ADMIN USER
        // -------------------------------------------------------------
        $admin = User::firstOrCreate(
            ['email' => 'admin@kadar.id'],
            [
                'name' => 'Dr. Budi Pratama (Super Admin)',
                'password' => Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);

        AuditLog::create([
            'actor_id' => $admin->id,
            'actor_role' => 'admin',
            'action' => 'system.console.init',
            'target_type' => 'System',
            'target_id' => '1',
            'context' => ['status' => 'SYSTEM_READY'],
            'result' => 'ALLOWED',
            'ip_reference' => hash('sha256', '127.0.0.1'),
            'created_at' => now(),
        ]);

        // -------------------------------------------------------------
        // 2. INSTRUCTOR USER
        // -------------------------------------------------------------
        $instructor = User::firstOrCreate(
            ['email' => 'instruktur@kadar.id'],
            [
                'name' => 'Coach Nabila Sp.GK (Health Coach)',
                'password' => Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        $instructor->roles()->syncWithoutDetaching([$instructorRole->id]);

        // -------------------------------------------------------------
        // 3. MEMBER USER
        // -------------------------------------------------------------
        $member = User::firstOrCreate(
            ['email' => 'member@kadar.id'],
            [
                'name' => 'Reza Rahardian',
                'password' => Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        $member->roles()->syncWithoutDetaching([$memberRole->id]);

        // Membership
        if ($goldTier) {
            Membership::firstOrCreate(
                ['user_id' => $member->id],
                [
                    'tier_id' => $goldTier->id,
                    'status' => 'ACTIVE',
                    'starts_at' => now()->subMonth(),
                    'ends_at' => now()->addYear(),
                ]
            );
        }

        // Member Profile
        MemberProfile::updateOrCreate(
            ['user_id' => $member->id],
            [
                'display_name' => 'Reza',
                'date_of_birth' => '1996-05-14',
                'sex' => 'MALE',
                'occupation' => 'Product Manager & Software Designer',
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id-ID',
            ]
        );

        // Lifestyle Profile
        LifestyleProfile::updateOrCreate(
            ['user_id' => $member->id],
            [
                'work_pattern' => 'SEDENTARY',
                'typical_sleep_bed' => '23:30:00',
                'typical_sleep_wake' => '06:45:00',
                'meal_pattern' => '3_MEALS',
                'dietary_pref' => ['low_sugar', 'high_protein'],
            ]
        );

        // Goal
        $goal = Goal::updateOrCreate(
            ['user_id' => $member->id, 'type' => 'SLEEP_ROUTINE'],
            [
                'title' => 'Tidur Teratur & Menjaga Energi Prima',
                'description' => 'Mencapai konsistensi durasi tidur 7.5 jam setiap malam',
                'status' => 'ACTIVE',
                'priority' => 1,
                'start_date' => now()->subDays(18)->toDateString(),
                'target_date' => now()->addDays(72)->toDateString(),
            ]
        );

        GoalMetric::updateOrCreate(
            ['goal_id' => $goal->id, 'metric_type' => 'sleep_duration'],
            [
                'target_value' => 450.0, // 7.5 hours in minutes
                'unit' => 'minutes',
                'priority' => 1,
            ]
        );

        // Assign Instructor to Member
        InstructorMemberAssignment::updateOrCreate(
            ['member_id' => $member->id, 'instructor_id' => $instructor->id],
            [
                'status' => 'ACTIVE',
                'starts_at' => now()->subDays(14),
                'assigned_by' => $admin->id,
            ]
        );

        // Streak
        UserStreak::updateOrCreate(
            ['user_id' => $member->id, 'type' => 'DAILY_LOGGING'],
            [
                'current_count' => 5,
                'best_count' => 14,
                'started_at' => now()->subDays(14)->toDateString(),
                'last_activity_at' => now()->toDateString(),
            ]
        );

        // Gamification Points
        PointsLedger::firstOrCreate(
            ['user_id' => $member->id, 'event_type' => 'ONBOARDING_COMPLETED'],
            ['points' => 50, 'created_at' => now()->subDays(18)]
        );
        PointsLedger::firstOrCreate(
            ['user_id' => $member->id, 'event_type' => 'STREAK_BONUS'],
            ['points' => 50, 'created_at' => now()->subDays(7)]
        );
        PointsLedger::firstOrCreate(
            ['user_id' => $member->id, 'event_type' => 'QUICK_LOG'],
            ['points' => 70, 'created_at' => now()]
        );

        // -------------------------------------------------------------
        // 4. HISTORICAL HEALTH DATA FOR HBE DEMONSTRATION
        // -------------------------------------------------------------
        // Days -18 to -5: Healthy Baseline Period (~430 to 450 minutes = 7h 10m - 7h 30m)
        $baselineSleepValues = [435, 440, 425, 450, 430, 445, 435, 440, 420, 450, 435, 440, 425, 430];
        $historicalRecords = [];

        foreach ($baselineSleepValues as $idx => $minutes) {
            $daysAgo = 18 - $idx;
            $date = Carbon::now()->subDays($daysAgo)->setTime(7, 30);

            $rec = HealthRecord::create([
                'user_id' => $member->id,
                'metric_type' => MetricType::SLEEP_DURATION->value,
                'value_numeric' => (float)$minutes,
                'value_text' => (string)$minutes,
                'unit' => 'minutes',
                'source' => 'wearable',
                'recorded_at' => $date,
                'quality_status' => 'VALID',
                'confidence_score' => 0.95,
                'metadata' => ['notes' => 'Tidur malam lelap', 'raw_value' => round($minutes / 60, 2), 'raw_unit' => 'hours'],
            ]);
            $historicalRecords[] = $rec;

            // Also seed water intake
            HealthRecord::create([
                'user_id' => $member->id,
                'metric_type' => MetricType::WATER_INTAKE->value,
                'value_numeric' => 2200.0,
                'value_text' => '2200',
                'unit' => 'ml',
                'source' => 'manual',
                'recorded_at' => $date->copy()->setTime(20, 0),
                'quality_status' => 'VALID',
                'confidence_score' => 0.90,
            ]);
        }

        // Calculated Sleep Baseline
        $sleepBaseline = HealthBaseline::updateOrCreate(
            ['user_id' => $member->id, 'metric_type' => MetricType::SLEEP_DURATION->value],
            [
                'status' => BaselineStatus::AVAILABLE->value,
                'value_primary' => 435.0,
                'value_secondary' => 12.0,
                'sample_count' => 14,
                'window_start' => now()->subDays(18)->toDateString(),
                'window_end' => now()->subDays(5)->toDateString(),
                'method' => 'rolling_mean_iqr',
                'rule_version' => 'v1.0',
                'is_active' => true,
                'generated_at' => now()->subDays(4),
            ]
        );

        // Water baseline
        HealthBaseline::updateOrCreate(
            ['user_id' => $member->id, 'metric_type' => MetricType::WATER_INTAKE->value],
            [
                'status' => BaselineStatus::AVAILABLE->value,
                'value_primary' => 2150.0,
                'value_secondary' => 120.0,
                'sample_count' => 14,
                'window_start' => now()->subDays(18)->toDateString(),
                'window_end' => now()->subDays(5)->toDateString(),
                'method' => 'rolling_mean_iqr',
                'rule_version' => 'v1.0',
                'is_active' => true,
                'generated_at' => now()->subDays(4),
            ]
        );

        // Days -4 to Today: Recent 4 days of sleep drop (~340 to 350 minutes = ~5h 45m)
        $recentDropValues = [350, 340, 345, 335];
        $recentRecords = [];
        foreach ($recentDropValues as $idx => $minutes) {
            $daysAgo = 4 - $idx;
            $date = Carbon::now()->subDays($daysAgo)->setTime(7, 45);

            $rec = HealthRecord::create([
                'user_id' => $member->id,
                'metric_type' => MetricType::SLEEP_DURATION->value,
                'value_numeric' => (float)$minutes,
                'value_text' => (string)$minutes,
                'unit' => 'minutes',
                'source' => 'wearable',
                'recorded_at' => $date,
                'quality_status' => 'VALID',
                'confidence_score' => 0.92,
                'metadata' => ['notes' => 'Begadang menyelesaikan deadline kantor', 'raw_value' => round($minutes / 60, 2), 'raw_unit' => 'hours'],
            ]);
            $recentRecords[] = $rec;
        }

        // Today's water log (1500 ml logged so far)
        HealthRecord::create([
            'user_id' => $member->id,
            'metric_type' => MetricType::WATER_INTAKE->value,
            'value_numeric' => 1500.0,
            'value_text' => '1500',
            'unit' => 'ml',
            'source' => 'manual',
            'recorded_at' => Carbon::today()->setTime(14, 0),
            'quality_status' => 'VALID',
            'confidence_score' => 0.90,
            'metadata' => ['notes' => 'Botol 500ml x 3'],
        ]);

        // -------------------------------------------------------------
        // 5. QUALIFIED BEHAVIOR SIGNAL & INSIGHT GENERATION
        // -------------------------------------------------------------
        $signal = BehaviorSignal::create([
            'user_id' => $member->id,
            'metric_type' => MetricType::SLEEP_DURATION->value,
            'signal_type' => 'SLEEP_DECLINE',
            'severity' => SignalSeverity::ATTENTION->value,
            'status' => SignalStatus::QUALIFIED->value,
            'detected_at' => now()->subDays(1),
            'observation_start' => now()->subDays(4)->startOfDay(),
            'observation_end' => now()->endOfDay(),
            'baseline_id' => $sleepBaseline->id,
            'rule_version' => 'v1.0',
            'evidence_quality' => 92.0,
            'priority_score' => 78.50,
        ]);

        // Attach recent records as evidence
        $signal->records()->syncWithoutDetaching(collect($recentRecords)->pluck('id')->all());

        // Create Insight Card
        $insight = BehaviorInsight::create([
            'user_id' => $member->id,
            'behavior_signal_id' => $signal->id,
            'title' => 'Durasi Tidur Menurun 1,5 Jam dari Pola Normal Anda',
            'observation' => 'Dalam 4 hari terakhir, durasi tidur malam Anda rata-rata tercatat 5 jam 42 menit.',
            'context' => 'Garis acuan (personal baseline) stabil 14 hari Anda adalah 7 jam 15 menit.',
            'why_it_matters' => 'Penurunan tidur berturut-turut berpotensi mempengaruhi tingkat energi, kejernihan fokus, dan sensitivitas metabolik tubuh.',
            'baseline_value' => '7 jam 15 mnt',
            'current_value' => '5 jam 42 mnt',
            'difference_value' => '-1 jam 33 mnt',
            'data_points_count' => 4,
            'status' => 'ACTIVE',
            'generated_by' => 'ENGINE',
            'expires_at' => now()->addDays(7),
        ]);

        // Create Recommendations
        Recommendation::create([
            'user_id' => $member->id,
            'insight_id' => $insight->id,
            'type' => 'HABIT',
            'title' => 'Digital Sunset: Matikan Layar 45 Menit Sebelum Tidur',
            'description' => 'Mulai pukul 22.00, redupkan gawai dan hindari paparan cahaya biru untuk membantu pelepasan melatonin alami tubuh.',
            'difficulty_level' => 'EASY',
            'status' => 'RECOMMENDED',
            'priority' => 1,
            'expires_at' => now()->addDays(7),
        ]);

        Recommendation::create([
            'user_id' => $member->id,
            'insight_id' => $insight->id,
            'type' => 'REMINDER',
            'title' => 'Konsultasi Penjadwalan Ulang dengan Coach Nabila',
            'description' => 'Jadwalkan sesi evaluasi 15 menit bersama coach pendamping Anda untuk menata kembali jam istirahat di tengah kesibukan proyek.',
            'difficulty_level' => 'EASY',
            'status' => 'RECOMMENDED',
            'priority' => 2,
            'expires_at' => now()->addDays(7),
        ]);
    }
}
