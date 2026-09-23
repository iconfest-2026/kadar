<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Program;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $programs = Program::with('creator')
            ->withCount('members')
            ->withCount('instructors')
            ->latest()
            ->paginate(15);

        return Inertia::render('Admin/Programs', [
            'programs' => $programs,
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

        $validated['slug'] = Str::slug($validated['name']);
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

        return back()->with('success', 'Program berhasil dibuat.');
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
            $validated['slug'] = Str::slug($validated['name']);
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

        return back()->with('success', 'Program berhasil diperbarui.');
    }
}

