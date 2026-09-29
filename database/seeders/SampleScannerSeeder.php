<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HealthRecord;
use App\Models\User;

class SampleScannerSeeder extends Seeder
{
    public function run(): void
    {
        $member = User::whereHas('roles', fn($q) => $q->where('slug', 'member'))->first() ?: User::first();
        if (!$member) return;

        $items = [
            [
                'metric_type' => 'nutrition',
                'value_numeric' => 90,
                'value_text' => 'Teh Melati Kemasan Botol Dingin (250 ml)',
                'unit' => 'kkal',
                'quality_status' => 'WARNING_ISSUED',
                'confidence_score' => 0.99,
                'metadata' => [
                    'item_name' => 'Teh Melati Kemasan Botol Dingin (250 ml)',
                    'category' => 'MINUMAN_RINGAN',
                    'sugar_g' => 20.0,
                    'bpom' => 'BPOM RI MD 268310001001',
                    'glycemic_load' => 14,
                    'ocr_accuracy' => 99.2,
                    'latency_ms' => 320,
                ],
                'recorded_at' => now()->subHours(2),
            ],
            [
                'metric_type' => 'nutrition',
                'value_numeric' => 135,
                'value_text' => 'Oat Crunch Biskuit Gandum Utuh (30 g)',
                'unit' => 'kkal',
                'quality_status' => 'QUALIFIED',
                'confidence_score' => 0.98,
                'metadata' => [
                    'item_name' => 'Oat Crunch Biskuit Gandum Utuh (30 g)',
                    'category' => 'MAKANAN_SEHAT',
                    'sugar_g' => 4.2,
                    'bpom' => 'BPOM RI MD 235610002045',
                    'glycemic_load' => 8,
                    'ocr_accuracy' => 98.4,
                    'latency_ms' => 385,
                ],
                'recorded_at' => now()->subHours(5),
            ],
            [
                'metric_type' => 'medication',
                'value_numeric' => 500,
                'value_text' => 'Metformin HCl 500 mg Tablet Lepas Cepat',
                'unit' => 'mg',
                'quality_status' => 'QUALIFIED',
                'confidence_score' => 0.97,
                'metadata' => [
                    'item_name' => 'Metformin HCl 500 mg Tablet Lepas Cepat',
                    'category' => 'medication',
                    'bpom' => 'BPOM RI DKL 1234567817A1',
                    'dosage' => '1x sehari sesudah makan utama',
                    'ocr_accuracy' => 97.6,
                    'latency_ms' => 410,
                ],
                'recorded_at' => now()->subDay(),
            ],
            [
                'metric_type' => 'nutrition',
                'value_numeric' => 220,
                'value_text' => 'Susu Oat Barista Blend Rendah Lemak (200 ml)',
                'unit' => 'kkal',
                'quality_status' => 'QUALIFIED',
                'confidence_score' => 0.99,
                'metadata' => [
                    'item_name' => 'Susu Oat Barista Blend Rendah Lemak (200 ml)',
                    'category' => 'MINUMAN_SEHAT',
                    'sugar_g' => 6.0,
                    'bpom' => 'BPOM RI ML 482019283011',
                    'glycemic_load' => 9,
                    'ocr_accuracy' => 99.4,
                    'latency_ms' => 295,
                ],
                'recorded_at' => now()->subDays(2),
            ],
        ];

        foreach ($items as $item) {
            HealthRecord::firstOrCreate(
                [
                    'user_id' => $member->id,
                    'value_text' => $item['value_text'],
                    'source' => 'SCANNER',
                ],
                array_merge($item, [
                    'user_id' => $member->id,
                    'source' => 'SCANNER',
                ])
            );
        }
    }
}
