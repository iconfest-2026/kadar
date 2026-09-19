<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\BehaviorSignal;
use App\Models\Consultation;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\InstructorMemberAssignment;
use App\Models\Intervention;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InstructorCaseloadController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        // 1. Get all assigned members
        $assignments = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->with(['member.memberProfile', 'member.lifestyleProfile'])
            ->get();

        $caseload = $assignments->map(function ($assignment) {
            $member = $assignment->member;
            
            // Latest signals for member
            $signals = BehaviorSignal::where('user_id', $member->id)
                ->whereIn('status', ['QUALIFIED', 'PRESENTED'])
                ->latest()
                ->take(3)
                ->get();

            // Active interventions
            $interventionsCount = Intervention::where('user_id', $member->id)
                ->where('status', 'ACTIVE')
                ->count();

            // Last recorded activity
            $lastRecord = HealthRecord::where('user_id', $member->id)
                ->latest('recorded_at')
                ->first();

            return [
                'assignment_id' => $assignment->id,
                'member_id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'profile' => $member->memberProfile,
                'lifestyle' => $member->lifestyleProfile,
                'active_signals' => $signals,
                'active_interventions_count' => $interventionsCount,
                'last_activity_date' => $lastRecord?->recorded_at?->diffForHumans() ?? 'Belum ada aktivitas',
                'assigned_since' => $assignment->starts_at?->translatedFormat('d M Y'),
                'status' => $assignment->status,
            ];
        });

        return Inertia::render('Instructor/Dashboard', [
            'instructor' => [
                'id' => $instructor->id,
                'name' => $instructor->name,
                'email' => $instructor->email,
            ],
            'caseload' => $caseload,
        ]);
    }

    public function showMember(int|string $memberId)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $member = User::with(['memberProfile', 'lifestyleProfile', 'goals.metrics'])
            ->findOrFail($memberId);

        // Verify assignment
        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $member->id)
            ->where('status', 'ACTIVE')
            ->exists();

        if (!$isAssigned) {
            abort(403, 'Anda tidak memiliki otorisasi untuk mengakses data member ini.');
        }

        $baselines = HealthBaseline::where('user_id', $member->id)
            ->where('is_active', true)
            ->get();

        $recentRecords = HealthRecord::where('user_id', $member->id)
            ->latest('recorded_at')
            ->take(30)
            ->get();

        $signals = BehaviorSignal::where('user_id', $member->id)
            ->latest()
            ->take(10)
            ->get();

        $interventions = Intervention::where('user_id', $member->id)
            ->latest()
            ->get();

        $consultations = Consultation::where('member_id', $member->id)
            ->where('instructor_id', $instructor->id)
            ->latest()
            ->get();

        return Inertia::render('Instructor/MemberDetail', [
            'member' => $member,
            'baselines' => $baselines,
            'recentRecords' => $recentRecords,
            'signals' => $signals,
            'interventions' => $interventions,
            'consultations' => $consultations,
        ]);
    }

    public function storeIntervention(Request $request, int|string $memberId)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required|string|max:1000',
            'type' => 'required|string|max:50',
            'start_at' => 'required|date',
            'due_at' => 'required|date|after_or_equal:start_at',
        ]);

        $intervention = Intervention::create([
            'user_id' => $memberId,
            'instructor_id' => $instructor->id,
            'created_by' => $instructor->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'type' => $validated['type'],
            'status' => 'ACTIVE',
            'start_at' => $validated['start_at'],
            'due_at' => $validated['due_at'],
        ]);

        return back()->with('success', 'Rencana intervensi berhasil ditugaskan kepada member.');
    }

    public function storeConsultationNote(Request $request, int|string $memberId)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $validated = $request->validate([
            'notes' => 'required|string|max:2000',
            'scheduled_at' => 'nullable|date',
        ]);

        Consultation::create([
            'member_id' => $memberId,
            'instructor_id' => $instructor->id,
            'status' => 'COMPLETED',
            'scheduled_at' => $validated['scheduled_at'] ?? now(),
            'completed_at' => now(),
            'notes' => $validated['notes'],
        ]);

        return back()->with('success', 'Catatan konsultasi berhasil disimpan ke rekam klinis/pendampingan.');
    }
}
