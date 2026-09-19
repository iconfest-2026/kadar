<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\BehaviorSignal;
use App\Models\EmergencyEvent;
use App\Models\HealthRecord;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminGovernanceController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $admin */
        $admin = Auth::user();

        // 1. Core KPIs
        $totalUsers = User::count();
        $membersCount = User::whereHas('roles', fn($q) => $q->where('slug', 'member'))->count();
        $instructorsCount = User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))->count();
        
        $recordsToday = HealthRecord::whereDate('recorded_at', Carbon::today())->count();
        $activeSignalsCount = BehaviorSignal::whereIn('status', ['QUALIFIED', 'PRESENTED'])->count();
        $emergencyEventsCount = EmergencyEvent::count();

        // 2. Recent Audit Logs (Forensic Trail)
        $auditLogs = AuditLog::with('actor')
            ->latest()
            ->take(50)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'actor_name' => $log->actor?->name ?? 'Sistem',
                    'actor_role' => $log->actor_role,
                    'action' => $log->action,
                    'target_type' => $log->target_type,
                    'target_id' => $log->target_id,
                    'result' => $log->result,
                    'ip_reference' => $log->ip_reference ? substr($log->ip_reference, 0, 10) . '...' : '-',
                    'created_at' => $log->created_at->translatedFormat('d M Y, H:i:s'),
                ];
            });

        // 3. User Directory
        $users = User::with(['roles', 'memberProfile'])
            ->latest()
            ->paginate(15)
            ->through(function ($u) {
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'roles' => $u->roles->pluck('name'),
                    'status' => $u->status ?? 'ACTIVE',
                    'created_at' => $u->created_at->translatedFormat('d M Y'),
                    'last_login_at' => $u->last_login_at?->diffForHumans() ?? 'Belum login',
                ];
            });

        // 4. Emergency events list
        $recentEmergencies = EmergencyEvent::with('user')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'kpis' => [
                'totalUsers' => $totalUsers,
                'membersCount' => $membersCount,
                'instructorsCount' => $instructorsCount,
                'recordsToday' => $recordsToday,
                'activeSignalsCount' => $activeSignalsCount,
                'emergencyEventsCount' => $emergencyEventsCount,
            ],
            'auditLogs' => $auditLogs,
            'users' => $users,
            'recentEmergencies' => $recentEmergencies,
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
