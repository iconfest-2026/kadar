<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Challenge;
use App\Models\ChallengeParticipation;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ChallengeController extends Controller
{
    public function index(Request $request)
    {
        $query = Challenge::with('program')
            ->withCount('participations')
            ->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('goal_type') && $request->goal_type !== 'ALL') {
            $query->where('goal_type', $request->goal_type);
        }

        if ($request->filled('status') && $request->status !== 'ALL') {
            $query->where('status', $request->status);
        }

        $challenges = $query->paginate(12)->withQueryString();
        $programs = Program::select('id', 'name')->get();

        $stats = [
            'totalChallenges' => Challenge::count(),
            'activeChallenges' => Challenge::where('status', 'PUBLISHED')->orWhere('status', 'ACTIVE')->count(),
            'totalParticipations' => ChallengeParticipation::count(),
            'totalRewardsAwarded' => (int) Challenge::sum('points_reward'),
        ];

        return Inertia::render('Admin/Challenges', [
            'challenges' => $challenges,
            'programs' => $programs,
            'stats' => $stats,
            'filters' => $request->only(['search', 'goal_type', 'status']),
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
            'status' => ['required', 'in:DRAFT,PUBLISHED,ACTIVE,ARCHIVED'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        while (Challenge::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        $validated['slug'] = $slug;
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

        return back()->with('success', "Tantangan {$challenge->name} berhasil dibuat.");
    }

    public function update(Request $request, Challenge $challenge)
    {
        $validated = $request->validate([
            'program_id' => ['nullable', 'exists:programs,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'goal_type' => ['required', 'string'],
            'duration_days' => ['required', 'integer', 'min:1'],
            'points_reward' => ['required', 'integer', 'min:0'],
            'status' => ['required', 'in:DRAFT,PUBLISHED,ACTIVE,ARCHIVED'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        if ($challenge->name !== $validated['name']) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;
            while (Challenge::where('slug', $slug)->where('id', '!=', $challenge->id)->exists()) {
                $slug = $baseSlug . '-' . $counter++;
            }
            $validated['slug'] = $slug;
        }

        $challenge->update($validated);

        AuditLog::log(
            Auth::id(),
            'admin',
            'challenge.update',
            'Challenge',
            (string)$challenge->id,
            $validated
        );

        return back()->with('success', "Tantangan {$challenge->name} berhasil diperbarui.");
    }

    public function destroy(Challenge $challenge)
    {
        $challengeName = $challenge->name;
        $challengeId = $challenge->id;

        $challenge->delete();

        AuditLog::log(
            Auth::id(),
            'admin',
            'challenge.delete',
            'Challenge',
            (string)$challengeId,
            ['name' => $challengeName]
        );

        return back()->with('success', "Tantangan {$challengeName} berhasil dihapus.");
    }
}
