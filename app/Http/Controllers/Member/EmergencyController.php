<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Safety\EmergencyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class EmergencyController extends Controller
{
    public function __construct(
        protected EmergencyService $emergencyService
    ) {}

    /**
     * Render the member emergency response center page.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Demo/EmergencyDemo');
    }

    /**
     * Fetch real nearby hospitals around coordinates via OSM Nominatim and verified registry.
     */
    public function nearbyHospitals(Request $request)
    {
        $lat = $request->filled('lat') ? (float)$request->input('lat') : ($request->filled('latitude') ? (float)$request->input('latitude') : -6.175392);
        $lng = $request->filled('lng') ? (float)$request->input('lng') : ($request->filled('longitude') ? (float)$request->input('longitude') : 106.827153);
        $limit = min(30, max(1, (int)$request->input('limit', 12)));

        $hospitals = $this->emergencyService->findNearbyHospitals($lat, $lng, $limit);

        return response()->json([
            'status' => 'success',
            'latitude' => $lat,
            'longitude' => $lng,
            'count' => count($hospitals),
            'hospitals' => $hospitals,
            'nearest' => $hospitals[0] ?? null,
        ]);
    }

    /**
     * Trigger and record a real emergency event dispatch.
     */
    public function trigger(Request $request)
    {
        /** @var User|null $user */
        $user = Auth::user();

        // Guest fallback support for simulation
        if (!$user) {
            $user = User::first() ?? new User(['id' => 1, 'name' => 'Tamu Siaga Darurat']);
        }

        $lat = $request->filled('latitude') ? (float)$request->input('latitude') : ($request->filled('lat') ? (float)$request->input('lat') : null);
        $lng = $request->filled('longitude') ? (float)$request->input('longitude') : ($request->filled('lng') ? (float)$request->input('lng') : null);

        $response = $this->emergencyService->triggerEmergency($user, $lat, $lng);

        return response()->json($response);
    }

    /**
     * Get national verified emergency hotlines.
     */
    public function getHotlines()
    {
        return response()->json([
            'national_emergency' => '112',
            'medical_ambulance' => '119',
            'police' => '110',
            'fire' => '113',
            'pmi' => '021-7992325',
            'directory' => [
                ['name' => 'Ambulans Darurat 119 (Kemenkes RI)', 'number' => '119', 'type' => 'MEDICAL'],
                ['name' => 'Panggilan Darurat Terpadu Nasional', 'number' => '112', 'type' => 'GENERAL'],
                ['name' => 'Palang Merah Indonesia (PMI)', 'number' => '021-7992325', 'type' => 'AMBULANCE'],
                ['name' => 'RSUP Cipto Mangunkusumo (RSCM Jakarta)', 'number' => '(021) 1500135', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Hasan Sadikin (Bandung)', 'number' => '(022) 2034953', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Sardjito (Yogyakarta)', 'number' => '(0274) 587333', 'type' => 'HOSPITAL'],
                ['name' => 'RSUP Dr. Soetomo (Surabaya)', 'number' => '(031) 5501078', 'type' => 'HOSPITAL'],
            ],
        ]);
    }
}
