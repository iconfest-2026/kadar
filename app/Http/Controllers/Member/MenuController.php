<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\MemberProfile;
use App\Models\Membership;
use App\Models\PointsLedger;
use App\Models\User;
use App\Models\UserStreak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $profile = $user->memberProfile;
        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        $streak = UserStreak::where('user_id', $user->id)
            ->where('type', 'DAILY_LOGGING')
            ->first();

        $totalPoints = (int) PointsLedger::where('user_id', $user->id)->sum('points');

        return Inertia::render('Member/MenuHub', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile ? [
                'display_name' => $profile->display_name ?: $user->name,
                'occupation' => $profile->occupation,
                'sex' => $profile->sex,
                'date_of_birth' => $profile->date_of_birth ? $profile->date_of_birth->toDateString() : null,
            ] : null,
            'membership' => [
                'tier' => $membership?->tier?->name ?? 'Silver',
                'slug' => strtolower($membership?->tier?->slug ?? 'silver'),
            ],
            'streak' => $streak ? [
                'current' => $streak->current_count,
                'best' => $streak->best_count,
            ] : ['current' => 1, 'best' => 1],
            'totalPoints' => $totalPoints,
        ]);
    }

    public function updateProfile(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'display_name' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'sex' => 'nullable|in:MALE,FEMALE,OTHER',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        MemberProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'display_name' => $validated['display_name'] ?: $validated['name'],
                'occupation' => $validated['occupation'] ?: 'Member AEVYRA',
                'sex' => $validated['sex'] ?: 'MALE',
            ]
        );

        return back()->with('success', 'Profil Anda berhasil diperbarui!');
    }
}

