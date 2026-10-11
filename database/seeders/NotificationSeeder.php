<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $member = User::where('email', 'member@aevyra.health')->first();
        $instructor = User::where('email', 'instruktur@aevyra.health')->first();
        $admin = User::where('email', 'admin@aevyra.health')->first();

        // =============================================================
        // 1. MEMBER NOTIFICATIONS
        // =============================================================
        if ($member) {
            $memberNotifications = [
                [
                    'user_id' => $member->id,
                    'type' => 'CONSULTATION_REMINDER',
                    'title' => 'Pengingat Sesi Konsultasi Terjadwal',
                    'body' => 'Sesi tatap maya Anda dengan dr. Nabila Sarah, Sp.GK dijadwalkan besok pukul 10:00 WIB. Siapkan catatan kebiasaan makan Anda.',
                    'data' => [
                        'action_url' => '/member/consultations-hub',
                        'category' => 'consultation',
                        'severity' => 'info',
                        'icon' => 'video_camera_front',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subMinutes(15),
                ],
                [
                    'user_id' => $member->id,
                    'type' => 'INSIGHT_AVAILABLE',
                    'title' => 'Wawasan Gaya Hidup Baru Tersedia',
                    'body' => 'Health Behavior Engine mencatat stabilitas durasi istirahat Anda meningkat 12% dalam 7 hari terakhir. Tinjau rekomendasi mikro baru.',
                    'data' => [
                        'action_url' => '/member/dashboard',
                        'category' => 'insight',
                        'severity' => 'success',
                        'icon' => 'insights',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(2),
                ],
                [
                    'user_id' => $member->id,
                    'type' => 'COMMUNITY_ENGAGEMENT',
                    'title' => 'Apresiasi Baru di Forum Komunitas',
                    'body' => '5 rekan pejuang sehat menyukai dan mengomentari cerita menu sarapan rendah glikemik yang Anda bagikan.',
                    'data' => [
                        'action_url' => '/member/community',
                        'category' => 'community',
                        'severity' => 'info',
                        'icon' => 'forum',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(5),
                ],
                [
                    'user_id' => $member->id,
                    'type' => 'CHALLENGE_PROGRESS',
                    'title' => 'Pencapaian Misi Tantangan Sehat',
                    'body' => 'Hebat! Anda menyelesaikan 3 dari 7 hari Tantangan Hidup Bebas Minuman Manis (+50 Poin ditambahkan ke buku besar).',
                    'data' => [
                        'action_url' => '/member/challenges',
                        'category' => 'challenge',
                        'severity' => 'success',
                        'icon' => 'military_tech',
                    ],
                    'read_at' => Carbon::now()->subDay(),
                    'created_at' => Carbon::now()->subDay(),
                ],
                [
                    'user_id' => $member->id,
                    'type' => 'MEAL_SCAN_COMPLETE',
                    'title' => 'Hasil Pemindaian Gizi Label Siap',
                    'body' => 'Pemindaian komposisi nutrisi telah selesai diproses dan dicocokkan dengan batas aman gula harian Anda.',
                    'data' => [
                        'action_url' => '/member/scanner',
                        'category' => 'scanner',
                        'severity' => 'info',
                        'icon' => 'photo_camera',
                    ],
                    'read_at' => Carbon::now()->subDays(2),
                    'created_at' => Carbon::now()->subDays(2),
                ],
            ];

            foreach ($memberNotifications as $n) {
                Notification::updateOrCreate(
                    ['user_id' => $n['user_id'], 'type' => $n['type'], 'title' => $n['title']],
                    $n
                );
            }
        }

        // =============================================================
        // 2. INSTRUCTOR NOTIFICATIONS
        // =============================================================
        if ($instructor) {
            $instructorNotifications = [
                [
                    'user_id' => $instructor->id,
                    'type' => 'CLINICAL_ALERT',
                    'title' => 'Sinyal Deviasi Kebiasaan Member Binaan',
                    'body' => 'Member binaan Reza Rahardian terdeteksi mengalami penurunan durasi tidur malam di bawah ambang batas personal 14 hari.',
                    'data' => [
                        'action_url' => '/instructor/members/' . ($member ? $member->id : '3'),
                        'category' => 'clinical',
                        'severity' => 'warning',
                        'icon' => 'warning',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subMinutes(30),
                ],
                [
                    'user_id' => $instructor->id,
                    'type' => 'CONSULTATION_BOOKING',
                    'title' => 'Reservasi Sesi Konsultasi Baru Masuk',
                    'body' => 'Member Reza Rahardian telah mengonfirmasi pemesanan sesi tele-konsultasi untuk jadwal besok pukul 10:00 WIB.',
                    'data' => [
                        'action_url' => '/instructor/dashboard',
                        'category' => 'booking',
                        'severity' => 'info',
                        'icon' => 'event',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(1),
                ],
                [
                    'user_id' => $instructor->id,
                    'type' => 'INTERVENTION_REVIEW',
                    'title' => 'Rencana Intervensi Perlu Evaluasi',
                    'body' => 'Masa pemantauan 14 hari untuk rencana intervensi nutrisi rendah glikemik telah tercapai dan siap dievaluasi dampaknya.',
                    'data' => [
                        'action_url' => '/instructor/interventions',
                        'category' => 'intervention',
                        'severity' => 'info',
                        'icon' => 'assignment_turned_in',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(4),
                ],
                [
                    'user_id' => $instructor->id,
                    'type' => 'CASELOAD_UPDATE',
                    'title' => 'Penugasan Member Binaan Baru',
                    'body' => 'Seorang member baru telah memilih profil Anda dalam pendampingan pencegahan metabolik personal.',
                    'data' => [
                        'action_url' => '/instructor/members',
                        'category' => 'caseload',
                        'severity' => 'success',
                        'icon' => 'groups',
                    ],
                    'read_at' => Carbon::now()->subDay(),
                    'created_at' => Carbon::now()->subDay(),
                ],
            ];

            foreach ($instructorNotifications as $n) {
                Notification::updateOrCreate(
                    ['user_id' => $n['user_id'], 'type' => $n['type'], 'title' => $n['title']],
                    $n
                );
            }
        }

        // =============================================================
        // 3. ADMIN NOTIFICATIONS
        // =============================================================
        if ($admin) {
            $adminNotifications = [
                [
                    'user_id' => $admin->id,
                    'type' => 'MODERATION_ALERT',
                    'title' => 'Aduan Konten Komunitas Baru Masuk',
                    'body' => 'Sebuah postingan dilaporkan anggota dengan indikasi klaim medis tidak berizin. Memerlukan peninjauan tim moderator.',
                    'data' => [
                        'action_url' => '/admin/community?tab=reports',
                        'category' => 'moderation',
                        'severity' => 'warning',
                        'icon' => 'gavel',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subMinutes(10),
                ],
                [
                    'user_id' => $admin->id,
                    'type' => 'EMERGENCY_SOS_LOG',
                    'title' => 'Pemicuan Jalur Darurat Telemetri 119',
                    'body' => 'Pemicuan tombol darurat SPGDT 119 tercatat pada log telemetri platform dengan latensi respon 240ms.',
                    'data' => [
                        'action_url' => '/admin/emergency',
                        'category' => 'emergency',
                        'severity' => 'danger',
                        'icon' => 'emergency',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(2),
                ],
                [
                    'user_id' => $admin->id,
                    'type' => 'SUBSCRIPTION_PAYMENT',
                    'title' => 'Langganan Membership Baru Diverifikasi',
                    'body' => 'Transaksi perpanjangan langganan tahunan Gold Member senilai Rp 1.500.000 sukses diverifikasi melalui Midtrans.',
                    'data' => [
                        'action_url' => '/admin/subscriptions',
                        'category' => 'payment',
                        'severity' => 'success',
                        'icon' => 'verified',
                    ],
                    'read_at' => null,
                    'created_at' => Carbon::now()->subHours(6),
                ],
                [
                    'user_id' => $admin->id,
                    'type' => 'INSTRUCTOR_VERIFICATION',
                    'title' => 'Pengajuan Verifikasi STR Instruktur',
                    'body' => 'Dokumen lisensi dokter spesialis baru telah diunggah dan menunggu peninjauan kepatuhan legalitas praktisi.',
                    'data' => [
                        'action_url' => '/admin/instructors',
                        'category' => 'verification',
                        'severity' => 'info',
                        'icon' => 'badge',
                    ],
                    'read_at' => Carbon::now()->subDay(),
                    'created_at' => Carbon::now()->subDay(),
                ],
                [
                    'user_id' => $admin->id,
                    'type' => 'SYSTEM_AUDIT_NOTICE',
                    'title' => 'Rekonsiliasi Audit Forensik Harian',
                    'body' => 'Pemeriksaan integritas basis data, buku besar poin, dan log akses 24 jam terakhir dinyatakan 100% konsisten.',
                    'data' => [
                        'action_url' => '/admin/audit',
                        'category' => 'audit',
                        'severity' => 'info',
                        'icon' => 'security',
                    ],
                    'read_at' => Carbon::now()->subDays(2),
                    'created_at' => Carbon::now()->subDays(2),
                ],
            ];

            foreach ($adminNotifications as $n) {
                Notification::updateOrCreate(
                    ['user_id' => $n['user_id'], 'type' => $n['type'], 'title' => $n['title']],
                    $n
                );
            }
        }
    }
}
