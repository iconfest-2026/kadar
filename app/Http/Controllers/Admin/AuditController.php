<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AuditController extends Controller
{
    public function index(Request $request)
    {
        $query = AuditLog::with('actor')->latest();

        if ($request->filled('action')) {
            $query->where('action', 'like', "%{$request->action}%");
        }

        if ($request->filled('actor_role')) {
            $query->where('actor_role', $request->actor_role);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $auditLogs = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/AuditTrail', [
            'auditLogs' => $auditLogs,
            'filters' => $request->only(['action', 'actor_role', 'date_from', 'date_to']),
        ]);
    }
}

