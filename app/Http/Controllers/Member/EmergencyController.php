<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Services\Safety\EmergencyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmergencyController extends Controller
{
    public function __construct(
        protected EmergencyService $emergencyService
    ) {}

    public function trigger(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $lat = $request->input('latitude') ? (float)$request->input('latitude') : null;
        $lng = $request->input('longitude') ? (float)$request->input('longitude') : null;

        $response = $this->emergencyService->triggerEmergency($user, $lat, $lng);

        return response()->json($response);
    }

    public function getHotlines()
    {
        return response()->json([
            'national_emergency' => '112',
            'medical_ambulance' => '119',
            'police' => '110',
            'fire' => '113',
            'directory' => [
                ['name' => 'Ambulans Darurat 119 (Kemenkes RI)', 'number' => '119', 'type' => 'MEDICAL'],
                ['name' => 'Panggilan Darurat Terpadu Nasional', 'number' => '112', 'type' => 'GENERAL'],
                ['name' => 'RSUP Cipto Mangunkusumo (RSCM Jakarta)', 'number' => '(021) 1500135', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Hasan Sadikin (Bandung)', 'number' => '(022) 2034953', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Sardjito (Yogyakarta)', 'number' => '(0274) 587333', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Soetomo (Surabaya)', 'number' => '(031) 5501078', 'type' => 'HOSPITAL'],
            ],
        ]);
    }
}
