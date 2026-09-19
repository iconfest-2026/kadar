<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Challenge;
use App\Models\ChallengeTask;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChallengeAndAchievementSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Achievements
        $achievements = [
            [
                'key' => 'FIRST_LOG',
                'name' => 'Langkah Perdana',
                'description' => 'Mencatat data kesehatan pertama Anda di platform Kadar.',
                'category' => 'CONSISTENCY',
                'icon_path' => 'emoji_flags',
                'rules_config' => ['type' => 'LOG_COUNT', 'target' => 1, 'points' => 15],
                'status' => 'ACTIVE',
            ],
            [
                'key' => 'STREAK_7',
                'name' => 'Disiplin 7 Hari',
                'description' => 'Mempertahankan konsistensi pencatatan selama 7 hari berturut-turut.',
                'category' => 'CONSISTENCY',
                'icon_path' => 'local_fire_department',
                'rules_config' => ['type' => 'STREAK_DAYS', 'target' => 7, 'points' => 50],
                'status' => 'ACTIVE',
            ],
            [
                'key' => 'BASELINE_READY',
                'name' => 'Fondasi Baseline Terbentuk',
                'description' => 'Mengumpulkan data 14 hari penuh hingga HBE menghitung baseline personal Anda.',
                'category' => 'HEALTH_AWARENESS',
                'icon_path' => 'query_stats',
                'rules_config' => ['type' => 'BASELINE_STATUS', 'target' => 'AVAILABLE', 'points' => 100],
                'status' => 'ACTIVE',
            ],
            [
                'key' => 'HYDRATION_HERO',
                'name' => 'Ksatria Hidrasi',
                'description' => 'Mencapai target hidrasi minimal 2000ml dalam 5 hari berturut-turut.',
                'category' => 'HYDRATION',
                'icon_path' => 'water_drop',
                'rules_config' => ['type' => 'WATER_METRIC', 'target' => 2000, 'days' => 5, 'points' => 40],
                'status' => 'ACTIVE',
            ],
        ];

        foreach ($achievements as $ach) {
            Achievement::updateOrCreate(['key' => $ach['key']], $ach);
        }

        // Get or create system/admin creator
        $creator = User::first();
        if (!$creator) {
            return;
        }

        // 2. Challenges
        $challenge1 = Challenge::updateOrCreate(
            ['slug' => 'hidrasi-7-hari'],
            [
                'name' => 'Tantangan Hidrasi Cerdas 7 Hari',
                'description' => 'Bangun kebiasaan hidrasi konsisten minimal 2000ml setiap hari untuk energi metabolik prima.',
                'goal_type' => 'HYDRATION',
                'duration_days' => 7,
                'points_reward' => 75,
                'status' => 'ACTIVE',
                'starts_at' => now()->startOfWeek(),
                'ends_at' => now()->addDays(14),
                'created_by' => $creator->id,
            ]
        );

        ChallengeTask::updateOrCreate(
            ['challenge_id' => $challenge1->id, 'title' => 'Catat 2000ml Air Minum'],
            [
                'description' => 'Minum 1 gelas air saat bangun dan catat total asupan hingga malam hari.',
                'type' => 'HYDRATION_CHECK',
                'target_value' => 2000,
                'target_unit' => 'ml',
                'sort_order' => 1,
            ]
        );

        $challenge2 = Challenge::updateOrCreate(
            ['slug' => 'digital-sunset-5-hari'],
            [
                'name' => 'Digital Sunset: Restorasi Tidur',
                'description' => 'Redupkan layar gawai 45 menit sebelum tidur dan dapatkan minimal 7 jam tidur lelap.',
                'goal_type' => 'SLEEP',
                'duration_days' => 5,
                'points_reward' => 100,
                'status' => 'ACTIVE',
                'starts_at' => now()->startOfWeek(),
                'ends_at' => now()->addDays(14),
                'created_by' => $creator->id,
            ]
        );

        ChallengeTask::updateOrCreate(
            ['challenge_id' => $challenge2->id, 'title' => 'Catat Jam Tidur > 7 Jam'],
            [
                'description' => 'Matikan layar sebelum pukul 22:30 dan catat durasi tidur keesokan harinya.',
                'type' => 'SLEEP_CHECK',
                'target_value' => 420,
                'target_unit' => 'minutes',
                'sort_order' => 1,
            ]
        );
    }
}
