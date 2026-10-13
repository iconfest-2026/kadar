<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $roles = [
            'member' => [
                'name' => 'Member',
                'description' => 'Member / Pengguna Layanan Preventif',
            ],
            'instructor' => [
                'name' => 'Instructor',
                'description' => 'Instruktur Kesehatan / Tenaga Ahli Terverifikasi',
            ],
            'admin' => [
                'name' => 'Admin',
                'description' => 'Administrator Sistem & Tata Kelola Kepatuhan',
            ],
        ];

        $roleModels = [];
        foreach ($roles as $slug => $data) {
            $roleModels[$slug] = Role::firstOrCreate(
                ['slug' => $slug],
                ['name' => $data['name'], 'description' => $data['description']]
            );
        }

        // 2. Permissions
        $permissions = [
            // Member
            'log_health_data' => 'Mencatat data metrik kesehatan harian',
            'view_own_baseline' => 'Melihat baseline dan grafik tren personal',
            'chat_with_ai' => 'Menggunakan asisten gaya hidup dan wawasan kesehatan AI',
            'trigger_emergency' => 'Mengakses tombol SOS dan panggilan 119/112',
            // Instructor
            'view_caseload' => 'Melihat daftar dan status member bimbingan',
            'create_interventions' => 'Membuat program intervensi mikro kebiasaan untuk member',
            'log_consultation_notes' => 'Menulis rekam konsultasi dan rekomendasi gaya hidup',
            // Admin
            'manage_users' => 'Mengelola status akun dan role pengguna',
            'view_forensic_audits' => 'Melihat jejak audit forensik dan log keamanan',
            'manage_membership_tiers' => 'Mengatur tingkatan tier membership dan benefit',
        ];

        foreach ($permissions as $slug => $desc) {
            $perm = Permission::firstOrCreate(
                ['slug' => $slug],
                ['name' => Str::headline($slug), 'description' => $desc]
            );

            if (in_array($slug, ['log_health_data', 'view_own_baseline', 'chat_with_ai', 'trigger_emergency'])) {
                $roleModels['member']->permissions()->syncWithoutDetaching([$perm->id]);
            }
            if (in_array($slug, ['view_caseload', 'create_interventions', 'log_consultation_notes', 'view_own_baseline'])) {
                $roleModels['instructor']->permissions()->syncWithoutDetaching([$perm->id]);
            }
            if (in_array($slug, ['manage_users', 'view_forensic_audits', 'manage_membership_tiers'])) {
                $roleModels['admin']->permissions()->syncWithoutDetaching([$perm->id]);
            }
        }
    }
}
