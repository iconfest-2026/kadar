<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $query = Program::with('creator')
            ->withCount(['members', 'instructors'])
            ->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->filled('status') && $request->status !== 'ALL') {
            $query->where('status', $request->status);
        }

        $programs = $query->paginate(12)->withQueryString();

        $stats = [
            'totalPrograms' => Program::count(),
            'publishedPrograms' => Program::where('status', 'PUBLISHED')->count(),
            'draftPrograms' => Program::where('status', 'DRAFT')->count(),
            'archivedPrograms' => Program::where('status', 'ARCHIVED')->count(),
        ];

        return Inertia::render('Admin/Programs', [
            'programs' => $programs,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:DRAFT,PUBLISHED,ARCHIVED'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        while (Program::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter++;
        }

        $validated['slug'] = $slug;
        $validated['created_by'] = Auth::id();

        $program = Program::create($validated);

        AuditLog::log(
            Auth::id(),
            'admin',
            'program.create',
            'Program',
            (string)$program->id,
            $validated
        );

        return back()->with('success', "Program {$program->name} berhasil dibuat.");
    }

    public function update(Request $request, Program $program)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:DRAFT,PUBLISHED,ARCHIVED'],
            'starts_at' => ['nullable', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
        ]);

        if ($program->name !== $validated['name']) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;
            while (Program::where('slug', $slug)->where('id', '!=', $program->id)->exists()) {
                $slug = $baseSlug . '-' . $counter++;
            }
            $validated['slug'] = $slug;
        }

        $program->update($validated);

        AuditLog::log(
            Auth::id(),
            'admin',
            'program.update',
            'Program',
            (string)$program->id,
            $validated
        );

        return back()->with('success', "Program {$program->name} berhasil diperbarui.");
    }

    public function destroy(Program $program)
    {
        $programName = $program->name;
        $programId = $program->id;

        $program->delete();

        AuditLog::log(
            Auth::id(),
            'admin',
            'program.delete',
            'Program',
            (string)$programId,
            ['name' => $programName]
        );

        return back()->with('success', "Program {$programName} berhasil dihapus.");
    }
}
