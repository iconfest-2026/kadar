<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\GoalMetric;
use App\Models\LifestyleProfile;
use App\Models\MemberProfile;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        return Inertia::render('Member/Onboarding', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'existingProfile' => $user->memberProfile,
            'existingLifestyle' => $user->lifestyleProfile,
            'existingGoal' => $user->goals()->first(),
        ]);
    }

    public function store(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            // Member Profile
            'display_name' => 'required|string|max:100',
            'date_of_birth' => 'nullable|date',
            'sex' => 'nullable|in:MALE,FEMALE,OTHER',
            'occupation' => 'nullable|string|max:150',

            // Lifestyle Profile
            'work_pattern' => 'nullable|in:SEDENTARY,SHIFT_WORK,ACTIVE_LABOR',
            'typical_sleep_bed' => 'nullable|string',
            'typical_sleep_wake' => 'nullable|string',
            'meal_pattern' => 'nullable|in:3_MEALS,INTERMITTENT,UNSTRUCTURED',
            'dietary_pref' => 'nullable|array',

            // Primary Goal
            'goal_title' => 'required|string|max:150',
            'goal_type' => 'required|in:SLEEP_ROUTINE,PHYSICAL_ACTIVITY,HYDRATION,NUTRITION,METABOLIC_HEALTH',
            'target_metric' => 'nullable|string|max:50',
            'target_value' => 'nullable|numeric',
            'target_unit' => 'nullable|string|max:30',
        ]);

        DB::transaction(function () use ($user, $validated) {
            // 1. Save Member Profile
            MemberProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'display_name' => $validated['display_name'],
                    'date_of_birth' => $validated['date_of_birth'] ?? null,
                    'sex' => $validated['sex'] ?? 'MALE',
                    'occupation' => $validated['occupation'] ?? 'Profesional',
                    'timezone' => 'Asia/Jakarta',
                    'locale' => 'id-ID',
                ]
            );

            // 2. Save Lifestyle Profile
            LifestyleProfile::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'work_pattern' => $validated['work_pattern'] ?? 'SEDENTARY',
                    'typical_sleep_bed' => $validated['typical_sleep_bed'] ?? '23:00:00',
                    'typical_sleep_wake' => $validated['typical_sleep_wake'] ?? '06:30:00',
                    'meal_pattern' => $validated['meal_pattern'] ?? '3_MEALS',
                    'dietary_pref' => $validated['dietary_pref'] ?? [],
                ]
            );

            // 3. Create Primary Goal
            $goal = Goal::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'status' => 'ACTIVE',
                ],
                [
                    'type' => $validated['goal_type'],
                    'title' => $validated['goal_title'],
                    'start_date' => now()->toDateString(),
                    'target_date' => now()->addDays(90)->toDateString(),
                ]
            );

            if (!empty($validated['target_metric']) && isset($validated['target_value'])) {
                GoalMetric::updateOrCreate(
                    ['goal_id' => $goal->id, 'metric_type' => $validated['target_metric']],
                    [
                        'target_value' => $validated['target_value'],
                        'unit' => $validated['target_unit'] ?? 'units',
                    ]
                );
            }

            // 4. Initial Streak Record
            UserStreak::firstOrCreate(
                ['user_id' => $user->id, 'type' => 'DAILY_LOGGING'],
                [
                    'current_count' => 1,
                    'best_count' => 1,
                    'started_at' => now()->toDateString(),
                    'last_activity_at' => now()->toDateString(),
                ]
            );

            // 5. Welcome Points Award
            PointsLedger::firstOrCreate(
                [
                    'user_id' => $user->id,
                    'event_type' => 'ONBOARDING_COMPLETED',
                ],
                [
                    'points' => 50,
                    'created_at' => now(),
                ]
            );
        });

        return redirect()->route('member.dashboard')->with('success', 'Profil kesehatan awal berhasil disimpan! Selamat datang di Kadar.');
    }
}
