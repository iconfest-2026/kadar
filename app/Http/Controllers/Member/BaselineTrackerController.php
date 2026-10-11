<?php

namespace App\Http\Controllers\Member;

use App\Enums\MetricType;
use App\Http\Controllers\Controller;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BaselineTrackerController extends Controller
{
    /**
     * Display the dedicated Tracker & Baseline Trend Analytics Page (Fitur 03)
     */
    public function index(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $coreMetrics = [
            MetricType::BLOOD_GLUCOSE->value,
            MetricType::STEPS->value,
            MetricType::SLEEP_DURATION->value,
            MetricType::WATER_INTAKE->value,
        ];

        // 1. Fetch active baselines
        $baselines = HealthBaseline::where('user_id', $user->id)
            ->whereIn('metric_type', $coreMetrics)
            ->where('is_active', true)
            ->get()
            ->keyBy('metric_type');

        // 2. Fetch recent 30-day history for baseline trend charting
        $days = (int) $request->query('days', 30);
        $recentHistory = HealthRecord::where('user_id', $user->id)
            ->whereIn('metric_type', $coreMetrics)
            ->where('recorded_at', '>=', Carbon::now()->subDays($days)->startOfDay())
            ->orderBy('recorded_at', 'asc')
            ->get(['id', 'metric_type', 'value_numeric', 'unit', 'recorded_at'])
            ->groupBy('metric_type')
            ->map(function ($items) {
                return $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'value' => (float) $item->value_numeric,
                        'unit' => $item->unit,
                        'date' => Carbon::parse($item->recorded_at)->format('Y-m-d'),
                        'label' => Carbon::parse($item->recorded_at)->translatedFormat('d M'),
                    ];
                });
            });

        // 3. Fetch summary statistics
        $stats = [];
        foreach ($coreMetrics as $metric) {
            $metricRecords = HealthRecord::where('user_id', $user->id)
                ->where('metric_type', $metric)
                ->where('recorded_at', '>=', Carbon::now()->subDays(14)->startOfDay())
                ->pluck('value_numeric');

            $count = $metricRecords->count();
            $avg = $count > 0 ? $metricRecords->avg() : 0;
            $min = $count > 0 ? $metricRecords->min() : 0;
            $max = $count > 0 ? $metricRecords->max() : 0;

            $stats[$metric] = [
                'count' => $count,
                'avg' => round($avg, 1),
                'min' => round($min, 1),
                'max' => round($max, 1),
            ];
        }

        return Inertia::render('Member/BaselineTracker', [
            'baselines' => $baselines,
            'recentHistory' => $recentHistory,
            'stats' => $stats,
            'selectedDays' => $days,
        ]);
    }
}
