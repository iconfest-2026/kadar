<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Consultation;
use App\Models\InstructorMemberAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    public function index()
    {
        $instructor = Auth::user();

        $consultations = Consultation::where('instructor_id', $instructor->id)
            ->with('member')
            ->orderBy('scheduled_start')
            ->paginate(15);

        return Inertia::render('Instructor/Consultations', [
            'consultations' => $consultations,
        ]);
    }

    public function store(Request $request)
    {
        $instructor = Auth::user();

        $validated = $request->validate([
            'member_id' => 'required|exists:users,id',
            'scheduled_start' => 'required|date',
            'scheduled_end' => 'required|date|after:scheduled_start',
            'purpose' => 'required|string|max:255',
        ]);

        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $validated['member_id'])
            ->where('status', 'ACTIVE')
            ->exists();

        if (!$isAssigned) {
            abort(403, 'Member ini tidak ditugaskan kepada Anda.');
        }

        $consultation = Consultation::create([
            'member_id' => $validated['member_id'],
            'instructor_id' => $instructor->id,
            'status' => 'SCHEDULED', // Assuming SCHEDULED is a valid status
            'scheduled_start' => $validated['scheduled_start'],
            'scheduled_end' => $validated['scheduled_end'],
            'purpose' => $validated['purpose'],
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'SCHEDULE_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['member_id' => $validated['member_id']]
        );

        return back()->with('success', 'Konsultasi berhasil dijadwalkan.');
    }

    public function complete(Request $request, Consultation $consultation)
    {
        $instructor = Auth::user();

        if ($consultation->instructor_id !== $instructor->id) {
            abort(403, 'Anda tidak memiliki hak akses ke konsultasi ini.');
        }

        $validated = $request->validate([
            'notes' => 'nullable|string|max:2000',
        ]);

        $consultation->update([
            'status' => 'COMPLETED',
            'completed_at' => now(),
            'notes' => $validated['notes'] ?? $consultation->notes,
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'COMPLETE_CONSULTATION',
            'Consultation',
            $consultation->id,
            ['has_notes' => !empty($validated['notes'])]
        );

        return back()->with('success', 'Konsultasi berhasil diselesaikan.');
    }
}

