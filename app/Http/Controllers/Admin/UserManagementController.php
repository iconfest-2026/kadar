<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('role') && $request->role !== 'ALL') {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('slug', $request->role);
            });
        }

        if ($request->filled('status') && $request->status !== 'ALL') {
            $query->where('status', $request->status);
        }

        $users = $query->paginate(15)->withQueryString();
        $roles = Role::select('id', 'name', 'slug')->get();

        $stats = [
            'totalUsers' => User::count(),
            'activeUsers' => User::where('status', 'ACTIVE')->count(),
            'suspendedUsers' => User::where('status', 'SUSPENDED')->count(),
            'memberCount' => User::whereHas('roles', fn($q) => $q->where('slug', 'member'))->count(),
            'instructorCount' => User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))->count(),
            'adminCount' => User::whereHas('roles', fn($q) => $q->where('slug', 'admin'))->count(),
        ];

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'roles' => $roles,
            'stats' => $stats,
            'filters' => $request->only(['search', 'role', 'status']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', Password::default()],
            'role' => ['required', 'string', 'exists:roles,slug'],
            'status' => ['required', 'in:ACTIVE,SUSPENDED,PENDING_VERIFICATION'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'status' => $validated['status'],
        ]);

        $role = Role::where('slug', $validated['role'])->first();
        if ($role) {
            $user->roles()->sync([$role->id]);
        }

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.create',
            'User',
            (string)$user->id,
            ['name' => $user->name, 'email' => $user->email, 'role' => $validated['role'], 'status' => $user->status]
        );

        return back()->with('success', "Pengguna {$user->name} berhasil ditambahkan.");
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'password' => ['nullable', 'string', Password::default()],
            'role' => ['required', 'string', 'exists:roles,slug'],
            'status' => ['required', 'in:ACTIVE,SUSPENDED,PENDING_VERIFICATION'],
        ]);

        $userData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'status' => $validated['status'],
        ];

        if (!empty($validated['password'])) {
            $userData['password'] = Hash::make($validated['password']);
        }

        $user->update($userData);

        $role = Role::where('slug', $validated['role'])->first();
        if ($role) {
            $user->roles()->sync([$role->id]);
        }

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.update',
            'User',
            (string)$user->id,
            ['name' => $user->name, 'email' => $user->email, 'role' => $validated['role'], 'status' => $user->status]
        );

        return back()->with('success', "Data pengguna {$user->name} berhasil diperbarui.");
    }

    public function destroy(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak dapat menghapus akun Anda sendiri.']);
        }

        $userName = $user->name;
        $userEmail = $user->email;
        $userId = $user->id;

        $user->roles()->detach();
        $user->delete();

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.delete',
            'User',
            (string)$userId,
            ['name' => $userName, 'email' => $userEmail]
        );

        return back()->with('success', "Akun {$userName} berhasil dihapus permanen.");
    }

    public function toggleStatus(User $user)
    {
        if ($user->id === Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak dapat mengubah status Anda sendiri.']);
        }

        $oldStatus = $user->status;
        $newStatus = ($oldStatus === 'ACTIVE') ? 'SUSPENDED' : 'ACTIVE';
        
        $user->update(['status' => $newStatus]);

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.status.toggle',
            'User',
            (string)$user->id,
            ['old_status' => $oldStatus, 'new_status' => $newStatus]
        );

        return back()->with('success', "Status akun {$user->name} berhasil diubah menjadi {$newStatus}.");
    }

    public function changeRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'string', 'exists:roles,slug'],
        ]);

        $roleSlug = $request->role;
        $roleModel = Role::where('slug', $roleSlug)->firstOrFail();

        $oldRoles = $user->roles->pluck('slug')->toArray();
        $user->roles()->sync([$roleModel->id]);

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.role.change',
            'User',
            (string)$user->id,
            ['old_roles' => $oldRoles, 'new_role' => $roleSlug]
        );

        return back()->with('success', "Role {$user->name} berhasil diubah.");
    }
}
