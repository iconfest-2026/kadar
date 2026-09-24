<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\InstructorMemberAssignment;
use App\Models\Intervention;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InterventionController extends Controller
{
    public function index(Request $request)
    {
        $instructor = Auth::user();

        $assignedMemberIds = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('status', 'ACTIVE')
            ->pluck('member_id');

        $assignedMembers = User::whereIn('id', $assignedMemberIds)
            ->select('id', 'name', 'email')
            ->get();

        $query = Intervention::where('created_by', $instructor->id)
            ->with('user');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $interventions = $query->latest()->paginate(15);

        return Inertia::render('Instructor/Interventions', [
            'interventions' => $interventions,
            'assignedMembers' => $assignedMembers,
            'filters' => $request->only('status'),
        ]);
    }

    public function store(Request $request)
    {
        $instructor = Auth::user();

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string|max:50',
            'title' => 'required|string|max:150',
            'description' => 'required|string|max:1000',
            'start_at' => 'required|date',
            'due_at' => 'required|date|after_or_equal:start_at',
        ]);

        $isAssigned = InstructorMemberAssignment::where('instructor_id', $instructor->id)
            ->where('member_id', $validated['user_id'])
            ->where('status', 'ACTIVE')
            ->exists();

        if (!$isAssigned) {
            abort(403, 'Member ini tidak ditugaskan kepada Anda.');
        }

        $intervention = Intervention::create([
            'user_id' => $validated['user_id'],
            'instructor_id' => $instructor->id,
            'created_by' => $instructor->id,
            'type' => $validated['type'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'ACTIVE',
            'start_at' => $validated['start_at'],
            'due_at' => $validated['due_at'],
        ]);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'CREATE_INTERVENTION',
            'Intervention',
            $intervention->id,
            ['user_id' => $validated['user_id']]
        );

        return back()->with('success', 'Intervensi berhasil dibuat.');
    }

    public function update(Request $request, Intervention $intervention)
    {
        $instructor = Auth::user();

        if ($intervention->instructor_id !== $instructor->id && $intervention->created_by !== $instructor->id) {
            abort(403, 'Anda tidak memiliki hak akses ke intervensi ini.');
        }

        $validated = $request->validate([
            'status' => 'required|in:DRAFT,ACTIVE,COMPLETED,PAUSED',
        ]);

        $updates = ['status' => $validated['status']];
        
        if ($validated['status'] === 'COMPLETED' && $intervention->status !== 'COMPLETED') {
            $updates['completed_at'] = now();
        } elseif ($validated['status'] !== 'COMPLETED') {
            $updates['completed_at'] = null;
        }

        $intervention->update($updates);

        AuditLog::log(
            $instructor->id,
            'INSTRUCTOR',
            'UPDATE_INTERVENTION_STATUS',
            'Intervention',
            $intervention->id,
            ['status' => $validated['status']]
        );

        return back()->with('success', 'Status intervensi berhasil diperbarui.');
    }
}

