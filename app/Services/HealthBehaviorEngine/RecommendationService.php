<?php

namespace App\Services\HealthBehaviorEngine;

use App\Models\BehaviorInsight;
use App\Models\BehaviorSignal;
use App\Models\Recommendation;

class RecommendationService
{
    /**
     * Generates micro-habit recommendations based on an insight and its underlying signal.
     *
     * @return array<Recommendation>
     */
    public function generateRecommendationsForInsight(BehaviorInsight $insight, BehaviorSignal $signal): array
    {
        $created = [];
        $templates = $this->getRecommendationTemplates($signal->signal_type, $signal->metric_type);

        foreach ($templates as $idx => $tpl) {
            $created[] = Recommendation::create([
                'user_id' => $insight->user_id,
                'insight_id' => $insight->id,
                'type' => $tpl['type'],
                'title' => $tpl['title'],
                'description' => $tpl['description'],
                'difficulty_level' => $tpl['difficulty_level'],
                'status' => 'RECOMMENDED',
                'priority' => $idx + 1,
                'expires_at' => now()->addDays(7),
            ]);
        }

        return $created;
    }

    private function getRecommendationTemplates(string $signalType, string $metric): array
    {
        return match ($signalType) {
            'SLEEP_DECLINE' => [
                [
                    'type' => 'HABIT',
                    'title' => 'Jeda Layar 20 Menit Sebelum Tidur',
                    'description' => 'Redupkan lampu kamar dan letakkan ponsel 20 menit sebelum jam tidur target Anda untuk membantu pelepasan melatonin alami.',
                    'difficulty_level' => 'EASY',
                ],
                [
                    'type' => 'REMINDER',
                    'title' => 'Nyalakan Pengingat Persiapan Istirahat',
                    'description' => 'Atur pengingat lembut pada pukul 21.30 WIB agar Anda memiliki waktu transisi yang tenang sebelum tidur.',
                    'difficulty_level' => 'EASY',
                ],
            ],
            'ACTIVITY_DROP' => [
                [
                    'type' => 'HABIT',
                    'title' => 'Jalan Santai 10 Menit di Siang Hari',
                    'description' => 'Sisihkan 10 menit setelah makan siang untuk berjalan santai di sekitar ruangan atau area terbuka.',
                    'difficulty_level' => 'EASY',
                ],
                [
                    'type' => 'CHALLENGE',
                    'title' => 'Ikuti Misi 6.000 Langkah Harian',
                    'description' => 'Bangun kembali kebiasaan aktif Anda secara bertahap bersama tantangan komunitas.',
                    'difficulty_level' => 'MODERATE',
                ],
            ],
            'WATER_DEFICIT' => [
                [
                    'type' => 'HABIT',
                    'title' => 'Sediakan 1 Botol Air (600ml) di Meja',
                    'description' => 'Menaruh air dalam jangkauan pandangan terbukti meningkatkan frekuensi minum tanpa perlu mengingat keras.',
                    'difficulty_level' => 'EASY',
                ],
                [
                    'type' => 'HABIT',
                    'title' => 'Minum 1 Gelas Air Saat Bangun Tidur',
                    'description' => 'Awali pagi dengan 1 gelas air bersuhu ruang untuk mengembalikan hidrasi setelah tidur semalaman.',
                    'difficulty_level' => 'EASY',
                ],
            ],
            default => [
                [
                    'type' => 'HABIT',
                    'title' => 'Catat Rutinitas Harian Secara Teratur',
                    'description' => 'Lanjutkan pencatatan 1 kali sehari agar sistem dapat menyajikan wawasan yang semakin personal.',
                    'difficulty_level' => 'EASY',
                ],
            ],
        };
    }
}
