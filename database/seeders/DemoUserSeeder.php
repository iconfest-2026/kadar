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
use App\Models\InstructorProfile;
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

        // =============================================================
        // 1. ROLE ADMIN
        // =============================================================
        $admin = User::firstOrCreate(
            ['email' => 'admin@aevyra.health'],
            [
                'name' => 'Administrator AEVYRA',
                'password' => Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        if ($adminRole) {
            $admin->roles()->syncWithoutDetaching([$adminRole->id]);
        }

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

        // =============================================================
        // 2. ROLE INSTRUKTUR (5 SPESIALIS RESMI TERDAFTAR)
        // =============================================================
        $instructorsList = [
            [
                'email' => 'bramantyo@aevyra.health',
                'name' => 'dr. H. Bramantyo, Sp.PD, K-EMD, FINASIM',
                'specialization' => 'Spesialis Penyakit Dalam & Konsultan Endokrinologi',
                'str_number' => '31.1.1.100.2.21.098765',
                'sip_number' => 'SIP.503/112/PD-09/2021',
                'institution' => 'RSUPN Dr. Cipto Mangunkusumo',
                'years_of_experience' => 14,
                'bio' => 'Dokter spesialis penyakit dalam konsultan endokrinologi metabolik diabetes. Berfokus pada pembalikan resistensi insulin dan remisi pra-diabetes.',
            ],
            [
                'email' => 'sarah.nindya@aevyra.health',
                'name' => 'dr. Sarah Nindya, M.Gizi, Sp.GK, AIFO-K',
                'specialization' => 'Spesialis Gizi Klinis & Terapi Nutrisi Medis',
                'str_number' => '32.2.1.200.3.19.045612',
                'sip_number' => 'SIP.503/446/GK-08/2022',
                'institution' => 'RSUPN Dr. Cipto Mangunkusumo',
                'years_of_experience' => 9,
                'bio' => 'Dokter spesialis gizi klinis berfokus pada terapi nutrisi medis pra-diabetes, pembalikan fatty liver, dan desain piring glikemik seimbang.',
            ],
            [
                'email' => 'rayhan.pratama@aevyra.health',
                'name' => 'dr. Rayhan Pratama, Sp.JP, FIHA',
                'specialization' => 'Spesialis Jantung & Pembuluh Darah (Kardiologi Preventif)',
                'str_number' => '31.1.1.300.1.20.076543',
                'sip_number' => 'SIP.503/218/JP-03/2023',
                'institution' => 'RS Jantung dan Pembuluh Darah Harapan Kita',
                'years_of_experience' => 11,
                'bio' => 'Dokter spesialis jantung dan pembuluh darah dengan peminatan kardiologi preventif, proteksi vaskular endotel, dan manajemen dislipidemia.',
            ],
            [
                'email' => 'nadia.salsabila@aevyra.health',
                'name' => 'dr. Nadia Salsabila, Sp.OG, Subsp.FER',
                'specialization' => 'Spesialis Obstetri & Ginekologi (Konsultan Fertilitas & Endokrin)',
                'str_number' => '33.2.1.400.4.18.065432',
                'sip_number' => 'SIP.503/329/OG-11/2020',
                'institution' => 'RSUP Fatmawati Jakarta',
                'years_of_experience' => 10,
                'bio' => 'Konsultan endokrinologi reproduksi wanita, menangani resistensi insulin pada PCOS, sindrom metabolik gestasional, dan kesehatan metabolik hormonal.',
            ],
            [
                'email' => 'instruktur@aevyra.health',
                'name' => 'dr. Nabila Sarah, Sp.GK',
                'specialization' => 'Dokter Spesialis Gizi Klinis (Sp.GK)',
                'str_number' => '31.1.1.100.2.21.087654',
                'sip_number' => 'SIP.503/446/GK-08/2023',
                'institution' => 'RSUPN Dr. Cipto Mangunkusumo',
                'years_of_experience' => 8,
                'bio' => 'Dokter Spesialis Gizi Klinis berfokus pada pencegahan resistensi insulin, remisi pra-diabetes, dan modulasi gaya hidup metabolik berbasis bukti ilmiah.',
            ],
        ];

        foreach ($instructorsList as $inst) {
            $instructorUser = User::firstOrCreate(
                ['email' => $inst['email']],
                [
                    'name' => $inst['name'],
                    'password' => Hash::make('password'),
                    'status' => 'ACTIVE',
                    'email_verified_at' => now(),
                ]
            );

            if ($instructorRole) {
                $instructorUser->roles()->syncWithoutDetaching([$instructorRole->id]);
            }

            InstructorProfile::updateOrCreate(
                ['user_id' => $instructorUser->id],
                [
                    'specialization' => $inst['specialization'],
                    'str_number' => $inst['str_number'],
                    'sip_number' => $inst['sip_number'],
                    'institution' => $inst['institution'],
                    'years_of_experience' => $inst['years_of_experience'],
                    'bio' => $inst['bio'],
                    'is_verified' => true,
                    'verified_at' => now()->subMonths(6),
                    'verified_by' => $admin->id,
                    'is_recommended' => true,
                    'max_member_capacity' => 50,
                ]
            );
        }

        // =============================================================
        // 3. ROLE MEMBER
        // =============================================================
        $member = User::firstOrCreate(
            ['email' => 'member@aevyra.health'],
            [
                'name' => 'Reza Rahardian',
                'password' => Hash::make('password'),
                'status' => 'ACTIVE',
                'email_verified_at' => now(),
            ]
        );
        if ($memberRole) {
            $member->roles()->syncWithoutDetaching([$memberRole->id]);
        }

        // Membership Gold
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

        // Profil Member
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

        // Profil Gaya Hidup
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

        // Target / Goals
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
                'target_value' => 450.0, // 7.5 jam dalam menit
                'unit' => 'minutes',
                'priority' => 1,
            ]
        );

        // Penugasan Instruktur ke Member (Relasi Binaan)
        $primaryInstructor = User::where('email', 'instruktur@aevyra.health')->first();
        if ($primaryInstructor) {
            InstructorMemberAssignment::updateOrCreate(
                ['member_id' => $member->id, 'instructor_id' => $primaryInstructor->id],
                [
                    'status' => 'ACTIVE',
                    'starts_at' => now()->subDays(14),
                    'assigned_by' => $admin->id,
                ]
            );
        }

        // Streak Harian
        UserStreak::updateOrCreate(
            ['user_id' => $member->id, 'type' => 'DAILY_LOGGING'],
            [
                'current_count' => 5,
                'best_count' => 14,
                'started_at' => now()->subDays(14)->toDateString(),
                'last_activity_at' => now()->toDateString(),
            ]
        );

        // Poin Gamifikasi
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

        // Riwayat Data Kesehatan 14 Hari (Baseline)
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

            // Catatan hidrasi air
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

        // Baseline Tidur Terhitung
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

        // Baseline Air Minum
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

        // Data Penurunan Tidur 4 Hari Terakhir
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

        // Catatan Air Hari Ini
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

        // Sinyal Perilaku & Insight
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

        $signal->records()->syncWithoutDetaching(collect($recentRecords)->pluck('id')->all());

        // Insight Card
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

        // Rekomendasi
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
            'title' => 'Konsultasi Penjadwalan Ulang dengan dr. Nabila Sarah, Sp.GK',
            'description' => 'Jadwalkan sesi evaluasi 15 menit bersama coach pendamping Anda untuk menata kembali jam istirahat di tengah kesibukan proyek.',
            'difficulty_level' => 'EASY',
            'status' => 'RECOMMENDED',
            'priority' => 2,
            'expires_at' => now()->addDays(7),
        ]);
    }
}
