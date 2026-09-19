<?php

namespace App\Services\HealthBehaviorEngine;

use App\Models\BehaviorInsight;
use App\Models\BehaviorSignal;
use App\Models\User;

class InsightGeneratorService
{
    public function __construct(
        protected RecommendationService $recommendationService
    ) {}

    /**
     * Generate an empathetic, evidence-backed narrative insight from a behavioral signal.
     */
    public function generateInsight(BehaviorSignal $signal): BehaviorInsight
    {
        $user = $signal->user;
        $metric = $signal->metric_type;
        $baseline = $signal->baseline;

        $baselineVal = $baseline ? (float) $baseline->value_primary : 0.0;
        $evidenceRecords = $signal->records;
        $count = $evidenceRecords->count();
        $recentAverage = $count > 0 ? $evidenceRecords->avg('value_numeric') : 0.0;
        $diff = round($recentAverage - $baselineVal, 2);

        [$title, $observation, $context, $whyItMatters, $formattedBase, $formattedCurrent, $formattedDiff] = $this->buildNarrative(
            $metric,
            $signal->signal_type,
            $baselineVal,
            $recentAverage,
            $diff,
            $count
        );

        $insight = BehaviorInsight::create([
            'user_id' => $user->id,
            'behavior_signal_id' => $signal->id,
            'title' => $title,
            'observation' => $observation,
            'context' => $context,
            'why_it_matters' => $whyItMatters,
            'baseline_value' => $formattedBase,
            'current_value' => $formattedCurrent,
            'difference_value' => $formattedDiff,
            'data_points_count' => $count,
            'status' => 'ACTIVE',
            'generated_by' => 'ENGINE',
            'expires_at' => now()->addDays(7),
        ]);

        // Generate matching actionable recommendations
        $this->recommendationService->generateRecommendationsForInsight($insight, $signal);

        return $insight;
    }

    private function buildNarrative(
        string $metric,
        string $signalType,
        float $baseline,
        float $current,
        float $diff,
        int $dataPoints
    ): array {
        return match ($metric) {
            'sleep_duration' => [
                'Pergeseran Ritme Istirahat Tidur',
                "Dalam {$dataPoints} hari terakhir, durasi tidur Anda rata-rata {$this->formatMinutes($current)}.",
                "Garis acuan (*personal baseline*) Anda adalah {$this->formatMinutes($baseline)}.",
                'Istirahat yang konsisten membantu memulihkan kesiapan mental dan menjaga kestabilan energi sepanjang hari.',
                $this->formatMinutes($baseline),
                $this->formatMinutes($current),
                ($diff > 0 ? '+' : '') . $this->formatMinutes($diff),
            ],
            'steps' => [
                'Variasi Aktivitas Langkah Kaki',
                "Rata-rata langkah harian Anda tercatat " . number_format($current) . " langkah.",
                "Biasanya, garis acuan harian Anda adalah " . number_format($baseline) . " langkah.",
                'Menjaga pergerakan aktif berkala membantu menjaga sirkulasi darah dan kebugaran metabolik tubuh.',
                number_format($baseline) . ' langkah',
                number_format($current) . ' langkah',
                ($diff > 0 ? '+' : '') . number_format($diff) . ' langkah',
            ],
            'water_intake' => [
                'Keseimbangan Asupan Hidrasi Harian',
                "Rata-rata asupan air minum Anda berada di " . number_format($current) . " ml.",
                "Garis acuan hidrasi normal Anda adalah " . number_format($baseline) . " ml.",
                'Kecukupan cairan menjaga konsentrasi, mencegah keletihan otot, dan mendukung fungsi organ tubuh optimal.',
                number_format($baseline) . ' ml',
                number_format($current) . ' ml',
                ($diff > 0 ? '+' : '') . number_format($diff) . ' ml',
            ],
            default => [
                'Perubahan Pola Gaya Hidup',
                "Terdeteksi pergeseran rata-rata sebesar {$current} dari nilai biasanya.",
                "Garis acuan kebiasaan Anda adalah {$baseline}.",
                'Mengenali perubahan kecil lebih awal membantu kita mengambil langkah preventif yang realistis.',
                (string) $baseline,
                (string) $current,
                ($diff > 0 ? '+' : '') . $diff,
            ],
        };
    }

    private function formatMinutes(float $minutes): string
    {
        $m = abs(round($minutes));
        $hours = floor($m / 60);
        $remMinutes = $m % 60;

        if ($hours > 0) {
            return "{$hours} jam {$remMinutes} menit";
        }
        return "{$remMinutes} menit";
    }
}
