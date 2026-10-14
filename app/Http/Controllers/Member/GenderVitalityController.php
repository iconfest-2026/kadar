<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GenderVitalityController extends Controller
{
    /**
     * Dedicated Gender-Specific Health Page (Fitur 12):
     * - Kondisi FEMALE: Menampilkan siklus haid, fase ovulasi, prediksi hormonal AI, skrining resistensi insulin & PCOS.
     * - Kondisi MALE: Menampilkan skrining lemak viseral (WHtR), jam biologis sirkadian, protokol GLUT-4, & skrining ADAM.
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

        // Fetch latest physical metrics if available in HealthRecord
        $latestHeight = HealthRecord::where('user_id', $user->id)
            ->where('metric_type', 'height')
            ->latest('recorded_at')
            ->first()?->value_numeric;

        $latestWeight = HealthRecord::where('user_id', $user->id)
            ->where('metric_type', 'weight')
            ->latest('recorded_at')
            ->first()?->value_numeric;

        $latestWaist = HealthRecord::where('user_id', $user->id)
            ->where('metric_type', 'waist_circumference')
            ->latest('recorded_at')
            ->first()?->value_numeric;

        // Fetch latest saved screening results
        $latestMaleScreening = HealthRecord::where('user_id', $user->id)
            ->where('metric_type', 'male_adam_screening')
            ->latest('recorded_at')
            ->first();

        $latestFemaleScreening = HealthRecord::where('user_id', $user->id)
            ->where('metric_type', 'female_pcos_screening')
            ->latest('recorded_at')
            ->first();

        $age = $profile->date_of_birth ? Carbon::parse($profile->date_of_birth)->age : 30;

        return Inertia::render('Member/GenderVitality', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'sex' => $sex,
            'profile' => [
                'display_name' => $profile->display_name ?? $user->name,
                'date_of_birth' => $profile->date_of_birth?->toDateString(),
                'age' => $age,
                'height_cm' => $latestHeight ? (float) $latestHeight : 172,
                'weight_kg' => $latestWeight ? (float) $latestWeight : 68,
                'waist_cm' => $latestWaist ? (float) $latestWaist : ($sex === 'MALE' ? 84 : 74),
            ],
            'lastScreening' => [
                'male_adam' => $latestMaleScreening ? [
                    'score' => (int) $latestMaleScreening->value_numeric,
                    'recorded_at' => $latestMaleScreening->recorded_at?->translatedFormat('d M Y, H:i') ?? $latestMaleScreening->created_at?->translatedFormat('d M Y, H:i'),
                    'metadata' => $latestMaleScreening->metadata,
                ] : null,
                'female_pcos' => $latestFemaleScreening ? [
                    'score' => (int) $latestFemaleScreening->value_numeric,
                    'recorded_at' => $latestFemaleScreening->recorded_at?->translatedFormat('d M Y, H:i') ?? $latestFemaleScreening->created_at?->translatedFormat('d M Y, H:i'),
                    'metadata' => $latestFemaleScreening->metadata,
                ] : null,
            ],
        ]);
    }

    /**
     * Store WHtR body measurements (waist, height, weight).
     */
    public function saveMetrics(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'waist_cm' => 'required|numeric|min:40|max:200',
            'height_cm' => 'nullable|numeric|min:100|max:250',
            'weight_kg' => 'nullable|numeric|min:30|max:300',
        ]);

        $now = Carbon::now();

        HealthRecord::create([
            'user_id' => $user->id,
            'metric_type' => 'waist_circumference',
            'value_numeric' => $validated['waist_cm'],
            'unit' => 'cm',
            'recorded_at' => $now,
            'source' => 'manual',
            'metadata' => ['feature' => 'gender_vitality_whtr'],
        ]);

        if (!empty($validated['height_cm'])) {
            HealthRecord::create([
                'user_id' => $user->id,
                'metric_type' => 'height',
                'value_numeric' => $validated['height_cm'],
                'unit' => 'cm',
                'recorded_at' => $now,
                'source' => 'manual',
                'metadata' => ['feature' => 'gender_vitality_whtr'],
            ]);
        }

        if (!empty($validated['weight_kg'])) {
            HealthRecord::create([
                'user_id' => $user->id,
                'metric_type' => 'weight',
                'value_numeric' => $validated['weight_kg'],
                'unit' => 'kg',
                'recorded_at' => $now,
                'source' => 'manual',
                'metadata' => ['feature' => 'gender_vitality_whtr'],
            ]);
        }

        return back()->with('success', 'Pengukuran lingkar pinggang & tinggi badan berhasil disimpan ke catatan kesehatan.');
    }

    /**
     * Store Male ADAM or Female PCOS screening result.
     */
    public function saveScreening(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'screening_type' => 'required|in:male_adam,female_pcos',
            'score' => 'required|numeric|min:0|max:100',
            'answers' => 'required|array',
        ]);

        $metricType = $validated['screening_type'] === 'male_adam' 
            ? 'male_adam_screening' 
            : 'female_pcos_screening';

        $label = $validated['screening_type'] === 'male_adam'
            ? 'Skrining Saint Louis ADAM & Kardiometabolik Pria'
            : 'Skrining Risiko Resistensi Insulin & PCOS Wanita';

        HealthRecord::create([
            'user_id' => $user->id,
            'metric_type' => $metricType,
            'value_numeric' => $validated['score'],
            'unit' => '%',
            'recorded_at' => Carbon::now(),
            'source' => 'manual',
            'metadata' => [
                'screening_type' => $validated['screening_type'],
                'label' => $label,
                'answers' => $validated['answers'],
                'risk_level' => $validated['score'] >= 50 ? 'HIGH_ATTENTION' : 'LOW_RISK',
            ],
        ]);

        return back()->with('success', "Hasil {$label} berhasil disimpan ke profil klinis Anda.");
    }
}
