<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Program;
use App\Models\Challenge;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminGovernanceController extends Controller
{
    public function index(Request $request)
    {
        $totalUsers = User::count();
        
        $activeInstructors = User::where('status', 'ACTIVE')
            ->whereHas('roles', fn($q) => $q->where('slug', 'instructor'))
            ->count();
            
        $activePrograms = Program::where('status', 'PUBLISHED')->count();
        
        $activeChallenges = Challenge::where('status', 'PUBLISHED')->count();

        $recentAuditLogs = AuditLog::with('actor')->latest()->take(10)->get();
        
        $recentUsers = User::with('roles')->latest()->take(5)->get();
        
        // User Growth (last 7 days)
        $userGrowth = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'kpis' => [
                'totalUsers' => $totalUsers,
                'activeInstructors' => $activeInstructors,
                'activePrograms' => $activePrograms,
                'activeChallenges' => $activeChallenges,
            ],
            'recentAuditLogs' => $recentAuditLogs,
            'recentUsers' => $recentUsers,
            'userGrowth' => $userGrowth,
        ]);
    }

    public function instructors(Request $request)
    {
        $instructors = User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))
            ->withCount('assignedInterventions')
            ->latest()
            ->paginate(15);
            
        return Inertia::render('Admin/Instructors', [
            'instructors' => $instructors,
        ]);
    }
    
    public function approveInstructor(User $user)
    {
        if (!$user->hasRole('instructor')) {
            return back()->withErrors(['error' => 'Pengguna bukan instruktur.']);
        }
        
        $oldStatus = $user->status;
        $user->update(['status' => 'ACTIVE']);
        
        AuditLog::log(
            Auth::id(),
            'admin',
            'instructor.approve',
            'User',
            (string)$user->id,
            ['old_status' => $oldStatus, 'new_status' => 'ACTIVE']
        );
        
        return back()->with('success', "Instruktur {$user->name} berhasil disetujui (Aktif).");
    }
    
    public function settings()
    {
        // Example mock of membership tiers or configuration
        $membershipTiers = [
            ['id' => 1, 'name' => 'Basic', 'price' => 0],
            ['id' => 2, 'name' => 'Pro', 'price' => 99000],
            ['id' => 3, 'name' => 'Premium', 'price' => 199000],
        ];
        
        return Inertia::render('Admin/Settings', [
            'membershipTiers' => $membershipTiers
        ]);
    }

    public function toggleUserStatus(Request $request, $userId)
    {
        $targetUser = User::findOrFail($userId);

        if ($targetUser->id === Auth::id()) {
            return back()->withErrors(['error' => 'Anda tidak dapat menonaktifkan akun Anda sendiri.']);
        }

        $oldStatus = $targetUser->status;
        $newStatus = ($oldStatus === 'ACTIVE') ? 'SUSPENDED' : 'ACTIVE';
        $targetUser->update(['status' => $newStatus]);

        AuditLog::log(
            Auth::id(),
            'admin',
            'user.status.toggle',
            'User',
            (string)$targetUser->id,
            ['old_status' => $oldStatus, 'new_status' => $newStatus]
        );

        return back()->with('success', "Status akun {$targetUser->name} berhasil diubah menjadi {$newStatus}.");
    }
}
