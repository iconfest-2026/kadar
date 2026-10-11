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
        $query = Challenge::with(['program', 'tasks'])
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
            if ($request->status === 'ACTIVE') {
                $query->whereIn('status', ['ACTIVE', 'PUBLISHED']);
            } else {
                $query->where('status', $request->status);
            }
        }

        $challenges = $query->paginate(12)->withQueryString();
        $programs = Program::select('id', 'name')->get();

        $stats = [
            'totalChallenges' => Challenge::count(),
            'activeChallenges' => Challenge::whereIn('status', ['ACTIVE', 'PUBLISHED'])->count(),
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
            'tasks' => ['nullable', 'array'],
            'tasks.*.title' => ['required', 'string', 'max:255'],
            'tasks.*.type' => ['nullable', 'string', 'max:50'],
            'tasks.*.target_value' => ['nullable', 'numeric'],
            'tasks.*.target_unit' => ['nullable', 'string', 'max:30'],
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        while (Challenge::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        $challengeData = collect($validated)->except('tasks')->toArray();
        $challengeData['slug'] = $slug;
        $challengeData['created_by'] = Auth::id();

        $challenge = Challenge::create($challengeData);

        // Create tasks if provided
        if (!empty($validated['tasks'])) {
            foreach ($validated['tasks'] as $index => $taskData) {
                if (!empty(trim($taskData['title'] ?? ''))) {
                    $challenge->tasks()->create([
                        'title' => trim($taskData['title']),
                        'type' => $taskData['type'] ?? $challenge->goal_type,
                        'target_value' => !empty($taskData['target_value']) ? (float)$taskData['target_value'] : 1,
                        'target_unit' => $taskData['target_unit'] ?? 'kali',
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

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
            'tasks' => ['nullable', 'array'],
            'tasks.*.title' => ['required', 'string', 'max:255'],
            'tasks.*.type' => ['nullable', 'string', 'max:50'],
            'tasks.*.target_value' => ['nullable', 'numeric'],
            'tasks.*.target_unit' => ['nullable', 'string', 'max:30'],
        ]);

        if ($challenge->name !== $validated['name']) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;
            while (Challenge::where('slug', $slug)->where('id', '!=', $challenge->id)->exists()) {
                $slug = $baseSlug . '-' . $counter++;
            }
            $challenge->slug = $slug;
        }

        $challengeData = collect($validated)->except('tasks')->toArray();
        $challenge->update($challengeData);

        // Sync tasks if provided
        if (isset($validated['tasks'])) {
            $challenge->tasks()->delete();
            foreach ($validated['tasks'] as $index => $taskData) {
                if (!empty(trim($taskData['title'] ?? ''))) {
                    $challenge->tasks()->create([
                        'title' => trim($taskData['title']),
                        'type' => $taskData['type'] ?? $challenge->goal_type,
                        'target_value' => !empty($taskData['target_value']) ? (float)$taskData['target_value'] : 1,
                        'target_unit' => $taskData['target_unit'] ?? 'kali',
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

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
