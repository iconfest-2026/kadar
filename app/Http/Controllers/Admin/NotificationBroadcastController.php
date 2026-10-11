<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationBroadcastController extends Controller
{
    /**
     * Display a listing of broadcasted notifications and statistics.
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $targetRole = $request->query('target_role', 'all');
        $category = $request->query('category', 'all');

        $query = Notification::with('user:id,name,email')
            ->where(function ($q) {
                $q->where('type', 'SYSTEM_BROADCAST')
                  ->orWhere('type', 'like', '%BROADCAST%')
                  ->orWhere('data->category', 'system');
            })
            ->latest();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%")
                         ->orWhere('email', 'like', "%{$search}%");
                  });
            });
        }

        if ($targetRole !== 'all') {
            $query->where('data->target_role', $targetRole);
        }

        if ($category !== 'all') {
            $query->where('data->category', $category);
        }

        $notifications = $query->paginate(15)->withQueryString();

        // Calculate platform recipient stats
        $totalMembers = User::whereHas('roles', fn ($q) => $q->where('slug', 'member'))->count();
        $totalInstructors = User::whereHas('roles', fn ($q) => $q->where('slug', 'instructor'))->count();
        $totalBroadcastsSent = Notification::where('type', 'SYSTEM_BROADCAST')->count();
        $totalUnread = Notification::where('type', 'SYSTEM_BROADCAST')->whereNull('read_at')->count();

        $stats = [
            'totalBroadcasts' => $totalBroadcastsSent,
            'totalMembers' => $totalMembers,
            'totalInstructors' => $totalInstructors,
            'totalUnread' => $totalUnread,
        ];

        return Inertia::render('Admin/Notifications/Index', [
            'notifications' => $notifications,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
                'target_role' => $targetRole,
                'category' => $category,
            ],
        ]);
    }

    /**
     * Send a notification broadcast to members, instructors, or both.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'body' => ['required', 'string'],
            'target_role' => ['required', 'string', 'in:all,member,instructor'],
            'category' => ['required', 'string', 'in:system,maintenance,announcement,clinical,emergency'],
            'severity' => ['required', 'string', 'in:info,warning,danger,success'],
            'action_url' => ['nullable', 'string', 'max:255'],
        ]);

        // Determine recipient users based on selected target_role
        $targetRole = $validated['target_role'];
        $userQuery = User::where('status', 'ACTIVE');

        if ($targetRole === 'member') {
            $userQuery->whereHas('roles', fn ($q) => $q->where('slug', 'member'));
        } elseif ($targetRole === 'instructor') {
            $userQuery->whereHas('roles', fn ($q) => $q->where('slug', 'instructor'));
        } else {
            // 'all': members and instructors
            $userQuery->whereHas('roles', fn ($q) => $q->whereIn('slug', ['member', 'instructor']));
        }

        $targetUsers = $userQuery->select('id')->get();

        if ($targetUsers->isEmpty()) {
            return back()->with('error', 'Tidak ada pengguna aktif ditemukan untuk target peran ini.');
        }

        $iconMap = [
            'system' => 'settings_alert',
            'maintenance' => 'build',
            'announcement' => 'campaign',
            'clinical' => 'warning',
            'emergency' => 'emergency',
        ];

        $icon = $iconMap[$validated['category']] ?? 'notifications';

        $dataPayload = [
            'category' => $validated['category'],
            'severity' => $validated['severity'],
            'target_role' => $targetRole,
            'icon' => $icon,
            'action_url' => $validated['action_url'] ?: null,
            'sender_id' => Auth::id(),
            'sender_name' => Auth::user()?->name ?? 'Administrator',
            'broadcast_time' => now()->toIso8601String(),
        ];

        $now = now();
        $notificationRecords = [];

        foreach ($targetUsers as $targetUser) {
            $notificationRecords[] = [
                'user_id' => $targetUser->id,
                'type' => 'SYSTEM_BROADCAST',
                'title' => $validated['title'],
                'body' => $validated['body'],
                'data' => json_encode($dataPayload),
                'read_at' => null,
                'delivered_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        // Chunk insert for optimal database performance
        foreach (array_chunk($notificationRecords, 500) as $chunk) {
            Notification::insert($chunk);
        }

        // Log to Audit Trail
        AuditLog::log(
            Auth::id(),
            'admin',
            'notification.broadcast',
            'Notification',
            'broadcast',
            [
                'title' => $validated['title'],
                'target_role' => $targetRole,
                'category' => $validated['category'],
                'severity' => $validated['severity'],
                'recipients_count' => $targetUsers->count(),
            ]
        );

        $roleLabel = match ($targetRole) {
            'member' => 'Member',
            'instructor' => 'Instruktur',
            default => 'Member & Instruktur',
        };

        return back()->with(
            'success',
            "Pengumuman notifikasi berhasil dikirim ke {$targetUsers->count()} pengguna ({$roleLabel})."
        );
    }

    /**
     * Delete an individual notification.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();
        return back()->with('success', 'Notifikasi berhasil dihapus dari sistem.');
    }
}

