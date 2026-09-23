<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\InstructorMemberAssignment;
use App\Models\SystemSetting;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MemberInstructorController extends Controller
{
    /**
     * Display directory of verified instructors for members to browse & select
     */
    public function index(Request $request): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $maxQuota = (int) SystemSetting::get('max_instructors_per_member', 3);
        $assignedInstructors = $user->assignedInstructors()->with('instructorProfile')->get();
        $assignedInstructorIds = $assignedInstructors->pluck('id')->toArray();
        $activeCount = count($assignedInstructorIds);

        $query = User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))
            ->where('status', 'ACTIVE')
            ->whereHas('instructorProfile', fn($q) => $q->where('is_verified', true))
            ->with(['instructorProfile'])
            ->withCount([
                'activeAssignedMembers as members_count',
                'consultationsAsInstructor as consultations_count',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhereHas('instructorProfile', function($ip) use ($search) {
                      $ip->where('specialization', 'like', "%{$search}%")
                         ->orWhere('institution', 'like', "%{$search}%")
                         ->orWhere('bio', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('specialization')) {
            $query->whereHas('instructorProfile', fn($q) => $q->where('specialization', $request->specialization));
        }

        // Recommended instructors always ordered first!
        $instructors = $query->leftJoin('instructor_profiles', 'users.id', '=', 'instructor_profiles.user_id')
            ->select('users.*')
            ->orderByDesc('instructor_profiles.is_recommended')
            ->orderByDesc('instructor_profiles.years_of_experience')
            ->latest('users.created_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Member/Instructors', [
            'instructors' => $instructors,
            'assignedInstructors' => $assignedInstructors,
            'assignedInstructorIds' => $assignedInstructorIds,
            'quota' => [
                'current' => $activeCount,
                'max' => $maxQuota,
                'remaining' => max(0, $maxQuota - $activeCount),
                'canAssignMore' => $activeCount < $maxQuota,
            ],
            'filters' => $request->only('search', 'specialization'),
        ]);
    }

    /**
     * Member assigns/connects with an instructor (up to max quota limit)
     */
    public function assign(Request $request, User $instructor): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Verify instructor eligibility
        if (!$instructor->hasRole('instructor') || $instructor->status !== 'ACTIVE' || !($instructor->instructorProfile?->is_verified)) {
            return back()->withErrors(['error' => 'Instruktur ini belum terverifikasi secara sah untuk menerima pendampingan member.']);
        }

        // 2. Check if already assigned
        $existing = InstructorMemberAssignment::where('member_id', $user->id)
            ->where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->first();

        if ($existing) {
            return back()->withErrors(['error' => "Anda sudah terhubung dalam bimbingan aktif dengan {$instructor->name}."]);
        }

        // 3. Validate Max Quota (Max 3 by default)
        $maxQuota = (int) SystemSetting::get('max_instructors_per_member', 3);
        $currentCount = $user->activeInstructorCount();

        if ($currentCount >= $maxQuota) {
            return back()->withErrors([
                'error' => "Anda telah mencapai batas maksimal {$maxQuota} instruktur aktif. Silakan lepas salah satu pendamping terlebih dahulu jika ingin memilih dokter/instruktur lain.",
            ]);
        }

        // 4. Create assignment
        InstructorMemberAssignment::create([
            'instructor_id' => $instructor->id,
            'member_id' => $user->id,
            'status' => 'ACTIVE',
            'starts_at' => now(),
            'assigned_by' => $user->id,
        ]);

        AuditLog::log(
            $user->id,
            'member',
            'member.instructor.assign',
            'User',
            (string)$instructor->id,
            [
                'instructor_name' => $instructor->name,
                'specialization' => $instructor->instructorProfile?->specialization,
                'active_instructors_count' => $currentCount + 1,
                'max_quota' => $maxQuota,
            ]
        );

        return back()->with('success', "Berhasil memilih {$instructor->name} sebagai tim pendamping kesehatan Anda.");
    }

    /**
     * Member releases/removes an assigned instructor
     */
    public function release(User $instructor): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $assignment = InstructorMemberAssignment::where('member_id', $user->id)
            ->where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->first();

        if (!$assignment) {
            return back()->withErrors(['error' => 'Anda tidak memiliki sesi bimbingan aktif dengan instruktur ini.']);
        }

        $assignment->update([
            'status' => 'ENDED',
            'ends_at' => now(),
        ]);

        AuditLog::log(
            $user->id,
            'member',
            'member.instructor.release',
            'User',
            (string)$instructor->id,
            [
                'instructor_name' => $instructor->name,
            ]
        );

        return back()->with('success', "Pendampingan dengan {$instructor->name} telah selesai. Slot kuota instruktur Anda kembali tersedia.");
    }
}

