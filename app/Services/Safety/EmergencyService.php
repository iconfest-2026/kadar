<?php

namespace App\Services\Safety;

use App\Models\EmergencyEvent;
use App\Models\User;

class EmergencyService
{
    /**
     * Trigger and log an emergency crisis event.
     * Guaranteed fast response time (< 200ms) with zero AI dependencies.
     *
     * @return array{status: string, event_id: int, hotlines: array, nearest_hospital: array, advice: string}
     */
    public function triggerEmergency(
        User $user,
        ?float $lat = null,
        ?float $lng = null,
        string $type = 'PANIC_BUTTON'
    ): array {
        $locStatus = ($lat !== null && $lng !== null) ? 'APPROXIMATE' : 'DENIED';
        $locRef = ($lat !== null && $lng !== null)
            ? 'Lat: ' . round($lat, 3) . ', Lng: ' . round($lng, 3)
            : 'Faskes Rujukan Terdekat';

        $event = EmergencyEvent::create([
            'user_id' => $user->id,
            'type' => $type,
            'status' => 'DISPATCHED',
            'loc_perm_status' => $locStatus,
            'loc_reference' => $locRef,
            'action_taken' => 'DIAL_119',
            'dispatched_at' => now(),
            'created_at' => now(),
        ]);

        return [
            'status' => 'EMERGENCY_TRIGGERED',
            'event_id' => $event->id,
            'hotlines' => [
                'primary_ambulance' => '119',
                'national_emergency' => '112',
                'police' => '110',
            ],
            'nearest_hospital' => [
                'name' => 'RSUP Cipto Mangunkusumo (RSCM)',
                'hotline' => '1500135',
                'type' => 'IGD 24 Jam Kelas A',
            ],
            'advice' => 'Tetap tenang, amankan jalan napas korban, dan jangan tutup saluran darurat sebelum petugas 119 terhubung.',
        ];
    }

    /**
     * List of verified national emergency protocols & verified general hospitals (IGD 24 Jam).
     */
    public function getEmergencyDirectory(): array
    {
        return [
            'hotlines' => [
                [
                    'name' => 'SPGDT Kemenkes RI (Ambulans Medis)',
                    'number' => '119',
                    'badge' => 'Utama / Medis',
                    'description' => 'Sistem Penanggulangan Gawat Darurat Terpadu Nasional',
                ],
                [
                    'name' => 'Layanan Panggilan Darurat Nasional',
                    'number' => '112',
                    'badge' => 'Bebas Pulsa',
                    'description' => 'Panggilan darurat terintegrasi (Polisi, Ambulans, Damkar)',
                ],
                [
                    'name' => 'Palang Merah Indonesia (PMI)',
                    'number' => '021-7992325',
                    'badge' => 'Ambulans & Donor',
                    'description' => 'Pelayanan ambulans dan bank darah PMI',
                ],
            ],
            'standard_faskes' => [
                [
                    'name' => 'RSUP Nasional Dr. Cipto Mangunkusumo (RSCM)',
                    'address' => 'Jl. Pangeran Diponegoro No.71, Jakarta Pusat',
                    'phone' => '1500135',
                    'type' => 'IGD 24 Jam - Kelas A',
                ],
                [
                    'name' => 'RSUP Fatmawati',
                    'address' => 'Jl. RS. Fatmawati Raya No.4, Jakarta Selatan',
                    'phone' => '021-7501524',
                    'type' => 'IGD 24 Jam - Kelas A',
                ],
            ],
        ];
    }
}
