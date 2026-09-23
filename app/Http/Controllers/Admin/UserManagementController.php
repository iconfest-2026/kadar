<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        if ($request->filled('role')) {
            $query->whereHas('roles', function ($q) use ($request) {
                $q->where('slug', $request->role);
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $users = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role', 'status']),
        ]);
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
        $roleModel = \App\Models\Role::where('slug', $roleSlug)->firstOrFail();

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

