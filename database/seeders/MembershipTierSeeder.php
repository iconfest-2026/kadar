<?php

namespace Database\Seeders;

use App\Models\MembershipTier;
use Illuminate\Database\Seeder;

class MembershipTierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'name' => 'Gratis (Basic)',
                'slug' => 'free',
                'description' => 'Akses gratis seumur hidup dengan pemantauan baseline dasar dan tombol darurat 119.',
                'price' => 0.00,
                'currency' => 'IDR',
                'billing_interval' => 'LIFETIME',
                'status' => 'ACTIVE',
            ],
            [
                'name' => 'Gold Preventif',
                'slug' => 'gold',
                'description' => 'Untuk individu proaktif yang ingin mendeteksi deviasi metabolik dan tidur sejak dini.',
                'price' => 49000.00,
                'currency' => 'IDR',
                'billing_interval' => 'MONTHLY',
                'status' => 'ACTIVE',
            ],
            [
                'name' => 'Platinum Concierge',
                'slug' => 'platinum',
                'description' => 'Pendampingan holistik dengan bimbingan langsung instruktur dan dokter preventif.',
                'price' => 149000.00,
                'currency' => 'IDR',
                'billing_interval' => 'MONTHLY',
                'status' => 'ACTIVE',
            ],
        ];

        foreach ($tiers as $tier) {
            MembershipTier::updateOrCreate(['slug' => $tier['slug']], $tier);
        }
    }
}
