<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\User;

class SampleProgramSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();
        if (!$admin) return;

        Program::firstOrCreate(
            ['slug' => 'program-kendali-glukosa-21-hari'],
            [
                'name' => 'Program Kendali Glukosa 21 Hari',
                'description' => 'Pendampingan diet rendah indeks glikemik, monitoring kadar gula darah puasa, dan latihan ketahanan kardio.',
                'status' => 'ACTIVE',
                'starts_at' => now(),
                'ends_at' => now()->addDays(21),
                'created_by' => $admin->id,
            ]
        );

        Program::firstOrCreate(
            ['slug' => 'revitalisasi-kardio-dan-stamina'],
            [
                'name' => 'Revitalisasi Kardio dan Stamina',
                'description' => 'Target kebugaran kardiorespirasi bertahap, pemantauan denyut jantung istirahat, dan pengurangan risiko hipertensi.',
                'status' => 'ACTIVE',
                'starts_at' => now(),
                'ends_at' => now()->addDays(30),
                'created_by' => $admin->id,
            ]
        );
    }
}
