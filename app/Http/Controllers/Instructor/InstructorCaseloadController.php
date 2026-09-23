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

        $assignedMemberIds = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->pluck('member_id');

        $assignedMembers = User::whereIn('id', $assignedMemberIds)
            ->with(['memberProfile', 'lifestyleProfile'])
            ->get()
            ->map(function ($member) {
                $latestSignal = BehaviorSignal::where('user_id', $member->id)
                    ->latest()
                    ->first();
                $member->latest_signal = $latestSignal;
                return $member;
            });

        $pendingSignals = BehaviorSignal::whereIn('user_id', $assignedMemberIds)
            ->whereIn('severity', ['ATTENTION', 'FOLLOW_UP'])
            ->where('status', '!=', 'RESOLVED')
            ->with('user')
            ->latest()
            ->get();

        $upcomingConsultations = Consultation::where('instructor_id', $instructor->id)
            ->where('scheduled_start', '>=', now())
            ->where('status', '!=', 'CANCELLED')
            ->with('member')
            ->orderBy('scheduled_start')
            ->take(5)
            ->get();

        $activeInterventions = Intervention::whereIn('user_id', $assignedMemberIds)
            ->where('status', 'ACTIVE')
            ->count();

        $stats = [
            'totalMembers' => $assignedMemberIds->count(),
            'needsAttention' => $pendingSignals->count(),
            'todayConsultations' => Consultation::where('instructor_id', $instructor->id)
                ->whereDate('scheduled_start', today())
                ->where('status', '!=', 'CANCELLED')
                ->count(),
        ];

        return Inertia::render('Instructor/Dashboard', [
            'assignedMembers' => $assignedMembers,
            'pendingSignals' => $pendingSignals,
            'upcomingConsultations' => $upcomingConsultations,
            'activeInterventions' => $activeInterventions,
            'stats' => $stats,
        ]);
    }

    public function members(Request $request)
    {
        /** @var \App\Models\User $instructor */
        $instructor = Auth::user();

        $assignedMemberIds = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->pluck('member_id');

        $query = User::whereIn('id', $assignedMemberIds)
            ->with(['memberProfile']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $members = $query->paginate(15);
        $members->getCollection()->transform(function ($member) {
            $member->active_interventions_count = Intervention::where('user_id', $member->id)
                ->where('status', 'ACTIVE')
                ->count();
            
            $latestSignal = BehaviorSignal::where('user_id', $member->id)
                ->where('status', '!=', 'RESOLVED')
                ->latest('detected_at')
                ->first();
            
            $member->latest_signal_severity = $latestSignal ? $latestSignal->severity : null;
            return $member;
        });

        return Inertia::render('Instructor/Members', [
            'members' => $members,
            'filters' => $request->only('search'),
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
        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $memberId)
            ->where('status', 'ACTIVE')
            ->exists();

        abort_unless($isAssigned, 403, 'Member ini tidak ditugaskan kepada Anda.');


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

        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $memberId)
            ->where('status', 'ACTIVE')
            ->exists();

        abort_unless($isAssigned, 403, 'Member ini tidak ditugaskan kepada Anda.');

        $validated = $request->validate([
            'notes' => 'required|string|max:2000',
        ]);

        Consultation::create([
            'member_id' => $memberId,
            'instructor_id' => $instructor->id,
            'status' => 'COMPLETED',
            'scheduled_start' => now(),
            'scheduled_end' => now(),
            'purpose' => 'Catatan tindak lanjut instruktur',
            'completed_at' => now(),
            'notes' => $validated['notes'],
        ]);

        return back()->with('success', 'Catatan konsultasi berhasil disimpan ke rekam klinis/pendampingan.');
    }
}
