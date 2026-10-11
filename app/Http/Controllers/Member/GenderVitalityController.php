<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\MenstrualLog;
use App\Models\MenstrualSetting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GenderVitalityController extends Controller
{
    /**
     * Dedicated Gender-Specific Health Page (Fitur 12):
     * - Kondisi FEMALE: Menampilkan siklus haid, fase ovulasi, prediksi hormonal AI & resistensi insulin.
     * - Kondisi MALE: Menampilkan skrining lemak viseral (WHtR), risiko metabolik, & vitalitas pria.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        if (!$profile) {
            return redirect()->route('member.onboarding');
        }

        $sex = strtoupper($profile->sex ?? 'FEMALE');

        return Inertia::render('Member/GenderVitality', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'sex' => $sex,
            'profile' => [
                'height_cm' => $profile->height_cm,
                'weight_kg' => $profile->weight_kg,
                'birth_date' => $profile->birth_date?->toDateString(),
            ],
        ]);
    }
}
