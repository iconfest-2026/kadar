<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MembershipTier;

class MembershipTierEnhancementSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            'free' => [
                'name' => 'Gratis (Basic)',
                'slug' => 'free',
                'description' => 'Akses gratis seumur hidup dengan pemantauan baseline dasar dan tombol darurat 119.',
                'price' => 0.00,
                'admin_fee' => 0.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Akses Esensial Mandiri',
                'is_popular' => false,
                'max_consultations' => 0,
                'max_scanner' => 10,
                'features' => [
                    'Pemindai Kamera Makanan & Obat BPOM (10x / hari)',
                    'Deteksi Beban Glikemik & Gramatur Gula Instan (<0.4s)',
                    'Buku Harian Glukosa Darah & Log HBE Harian',
                    'Asisten AI Terverifikasi Medis 24/7 (Edukasi Dasar)',
                    'Akses Siaga Panggilan Darurat Ambulans 119',
                    'Akses Komunitas & Forum Diskusi Pasien Publik',
                ],
                'status' => 'ACTIVE',
            ],
            'gold' => [
                'name' => 'Gold Preventif',
                'slug' => 'gold',
                'description' => 'Untuk individu proaktif yang ingin mendeteksi deviasi metabolik dan tidur sejak dini.',
                'price' => 49000.00,
                'admin_fee' => 4000.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Paling Direkomendasikan',
                'is_popular' => true,
                'max_consultations' => 2,
                'max_scanner' => -1,
                'features' => [
                    'Semua kapabilitas dalam paket Gratis & Dasar',
                    'Pemindai Kamera OCR & Obat BPOM Bebas Batas (Unlimited)',
                    'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)',
                    'Rencana Intervensi Gizi Mingguan Dipersonalisasi',
                    'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)',
                    '2x Sesi Telekonsultasi Instruktur Gizi per Bulan',
                    'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)',
                    'Akses Penuh Seluruh Modul Gamifikasi & Resep Rendah Gula',
                ],
                'status' => 'ACTIVE',
            ],
            'platinum' => [
                'name' => 'Platinum Concierge',
                'slug' => 'platinum',
                'description' => 'Pendampingan holistik dengan bimbingan langsung instruktur dan dokter preventif.',
                'price' => 149000.00,
                'admin_fee' => 4000.00,
                'admin_fee_type' => 'FIXED',
                'badge_text' => 'Pendampingan Spesialis VIP',
                'is_popular' => false,
                'max_consultations' => 6,
                'max_scanner' => -1,
                'features' => [
                    'Semua kapabilitas dalam paket Gold & Gratis',
                    'Pemindai Kamera OCR & Obat BPOM Bebas Batas (Unlimited)',
                    'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)',
                    '6x Sesi Telekonsultasi Dokter Spesialis per Bulan',
                    'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)',
                    'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan',
                    'Dedicated Personal Health Coach & Review Mingguan',
                    'Hotline Tim Medis Siaga Prioritas 24/7',
                    'Jalur Koordinasi Ambulans dengan Riwayat Klinis Instan',
                    'Rencana Intervensi Gizi & Menu Presisi Personal Khusus',
                    'Program Tantangan Remisi Intensif Klinis Terpandu',
                    'Akses Jalur Cepat Tindakan Klinis & Integrasi SatuSehat',
                ],
                'status' => 'ACTIVE',
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
