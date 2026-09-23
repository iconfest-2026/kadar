<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Challenge;
use App\Models\Program;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        $challenges = Challenge::with('program')
            ->withCount('participations')
            ->latest()
            ->paginate(15);

        $programs = Program::select('id', 'name')->get();

        return Inertia::render('Admin/Challenges', [
            'challenges' => $challenges,
            'programs' => $programs,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_id' => ['nullable', 'exists:programs,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'goal_type' => ['required', 'string'],
            'duration_days' => ['required', 'integer', 'min:1'],
            'points_reward' => ['required', 'integer', 'min:0'],
            'status' => ['required', 'in:DRAFT,PUBLISHED,ARCHIVED'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['created_by'] = Auth::id();

        $challenge = Challenge::create($validated);

        AuditLog::log(
            Auth::id(),
            'admin',
            'challenge.create',
            'Challenge',
            (string)$challenge->id,
            $validated
        );

        return back()->with('success', 'Challenge berhasil dibuat.');
    }
}

