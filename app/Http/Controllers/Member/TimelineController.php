<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\BehaviorSignal;
use App\Models\HealthRecord;
use App\Models\Intervention;
use App\Models\PointsLedger;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TimelineController extends Controller
{
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $filterMetric = $request->query('metric');
        $days = (int) $request->query('days', 30);

        $startDate = Carbon::now()->subDays($days)->startOfDay();

        // 1. Fetch Health Records
        $recordsQuery = HealthRecord::where('user_id', $user->id)
            ->where('recorded_at', '>=', $startDate)
            ->latest('recorded_at');

        if ($filterMetric) {
            $recordsQuery->where('metric_type', $filterMetric);
        }

        $records = $recordsQuery->take(50)->get()->map(function ($rec) {
            return [
                'type' => 'HEALTH_RECORD',
                'id' => $rec->id,
                'metric_type' => $rec->metric_type,
                'value' => (float)$rec->value,
                'unit' => $rec->unit,
                'source' => $rec->source,
                'notes' => $rec->notes,
                'timestamp' => $rec->recorded_at->toIso8601String(),
                'display_date' => $rec->recorded_at->translatedFormat('d M Y, H:i'),
            ];
        });

        // 2. Fetch Behavior Signals
        $signals = BehaviorSignal::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->latest()
            ->take(20)
            ->get()
            ->map(function ($sig) {
                return [
                    'type' => 'BEHAVIOR_SIGNAL',
                    'id' => $sig->id,
                    'signal_type' => $sig->signal_type,
                    'severity' => $sig->severity,
                    'status' => $sig->status,
                    'priority_score' => $sig->priority_score,
                    'explanation' => $sig->explanation,
                    'timestamp' => $sig->created_at->toIso8601String(),
                    'display_date' => $sig->created_at->translatedFormat('d M Y, H:i'),
                ];
            });

        // 3. Fetch Interventions
        $interventions = Intervention::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->latest()
            ->take(15)
            ->get()
            ->map(function ($intv) {
                return [
                    'type' => 'INTERVENTION',
                    'id' => $intv->id,
                    'title' => $intv->title,
                    'description' => $intv->description,
                    'status' => $intv->status,
                    'timestamp' => $intv->created_at->toIso8601String(),
                    'display_date' => $intv->created_at->translatedFormat('d M Y, H:i'),
                ];
            });

        // Merge and sort all items chronologically descending
        $timelineItems = $records->concat($signals)->concat($interventions)
            ->sortByDesc('timestamp')
            ->values();

        return Inertia::render('Member/Timeline', [
            'timelineItems' => $timelineItems,
            'currentFilter' => $filterMetric,
            'days' => $days,
        ]);
    }
}
