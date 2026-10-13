<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MembershipTier;

class MembershipTierEnhancementSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            'silver' => [
                'name' => 'Silver (Gratis)',
                'slug' => 'silver',
                'description' => 'Paket dasar gaya hidup preventif untuk pemantauan mandiri harian.',
                'price' => 0.00,
                'admin_fee' => 0.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Freemium Standar',
                'is_popular' => false,
                'max_consultations' => 0,
                'max_scanner' => 10,
                'features' => [
                    'Akses Pemindai Kamera OCR (10x / hari)',
                    'Pelacak Biomarker Mandiri & Riwayat Medis',
                    'Akses Forum Diskusi Komunitas Sehat',
                    'Panggilan Darurat Cepat Ambulans 119',
                ],
            ],
            'gold' => [
                'name' => 'Gold Sehat',
                'slug' => 'gold',
                'description' => 'Pendampingan terarah untuk individu dan keluarga dengan konsultasi medis rutin.',
                'price' => 99000.00,
                'admin_fee' => 4000.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Paling Diminati',
                'is_popular' => true,
                'max_consultations' => 2,
                'max_scanner' => 50,
                'features' => [
                    'Semua Fitur Paket Silver',
                    '2x Konsultasi Spesialis Gizi / Dokter per Bulan',
                    'Akses Pemindai Kamera OCR Hingga 50x / Hari',
                    'Asisten AI Prediktif Glukosa & Pola Hidup 24/7',
                    'Analisis Kurva Glikemik & Rekomendasi Menu Harian',
                    'Lencana Profil Eksklusif Anggota Gold',
                ],
            ],
            'platinum' => [
                'name' => 'Platinum VIP Klinis',
                'slug' => 'platinum',
                'description' => 'Solusi komprehensif pendampingan klinis intensif oleh nakes profesional.',
                'price' => 249000.00,
                'admin_fee' => 4000.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Pendampingan Penuh',
                'is_popular' => false,
                'max_consultations' => 6,
                'max_scanner' => -1,
                'features' => [
                    'Semua Fitur Paket Gold',
                    '6x Konsultasi Dokter & Tim Medis Berlisensi per Bulan',
                    'Akses Pemindai Kamera OCR Tanpa Batas (Unlimited)',
                    'Intervensi Terpandu Langsung oleh Dokter Pendamping',
                    'Laporan Kesehatan Eksekutif Berkala Format PDF',
                    'Fast-track Ambulans 119 Prioritas & Integrasi Faskes',
                    'Lencana Platinum VIP & Akses Program Kohor Premium',
                ],
            ],
        ];

        foreach ($tiers as $slug => $data) {
            MembershipTier::updateOrCreate(
                ['slug' => $slug],
                $data
            );
        }
    }
}
