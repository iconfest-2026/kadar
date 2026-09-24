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

        // 1. Dictionaries for localization
        $metricLabels = [
            'sleep_duration' => 'Durasi Tidur',
            'water_intake' => 'Asupan Air Minum',
            'blood_glucose' => 'Gula Darah Puasa',
            'steps' => 'Langkah Kaki Harian',
            'mood_score' => 'Kesejahteraan Mental (Mood)',
            'heart_rate' => 'Denyut Jantung',
            'blood_pressure_systolic' => 'Tekanan Darah Sistolik',
            'blood_pressure_diastolic' => 'Tekanan Darah Diastolik',
            'weight' => 'Berat Badan',
            'body_weight' => 'Berat Badan',
            'calories' => 'Asupan Kalori',
            'glycemic_load' => 'Beban Glikemik (GL)',
        ];

        $sourceLabels = [
            'manual' => 'Input Mandiri',
            'device' => 'Sinkronisasi Jam Pintar / Wearable',
            'wearable' => 'Jam Pintar / Wearable',
            'apple_health' => 'Apple Health',
            'google_fit' => 'Google Health Connect',
            'ocr_scan' => 'Pemindai Kamera Gizi & BPOM',
            'camera_scanner' => 'Pemindai Kamera Gizi & BPOM',
            'doctor_entry' => 'Entri Dokter Spesialis',
            'ai_estimation' => 'Estimasi AI Preventif',
        ];

        $signalLabels = [
            'SLEEP_DEFICIT' => 'Defisit Durasi Tidur',
            'GLUCOSE_SPIKE' => 'Lonjakan Glukosa Postprandial',
            'HYDRATION_LOW' => 'Asupan Cairan Kurang',
            'SEDENTARY_STREAK' => 'Kurang Aktivitas Fisik / Menetap',
            'GLYCEMIC_VARIABILITY_HIGH' => 'Variabilitas Glikemik Fluktuatif',
            'LATE_NIGHT_MEAL' => 'Pola Makan Larut Malam',
            'VITALITY_DROP' => 'Penurunan Indikator Vitalitas',
        ];

        $severityLabels = [
            'ATTENTION' => 'Perlu Perhatian',
            'CRITICAL' => 'Kritis',
            'NOTICE' => 'Pemberitahuan',
            'FOLLOW_UP' => 'Perlu Tindak Lanjut',
            'INFO' => 'Informasi',
            'STABLE' => 'Stabil',
        ];

        $statusLabels = [
            'ACTIVE' => 'Sedang Berjalan',
            'IN_PROGRESS' => 'Sedang Berjalan',
            'COMPLETED' => 'Selesai',
            'PENDING' => 'Menunggu Evaluasi',
            'CANCELLED' => 'Dibatalkan',
            'UNRESOLVED' => 'Perlu Tindakan',
            'RESOLVED' => 'Terselesaikan',
        ];

        // 2. Fetch Health Records
        $recordsQuery = HealthRecord::where('user_id', $user->id)
            ->where('recorded_at', '>=', $startDate)
            ->latest('recorded_at');

        if ($filterMetric) {
            $recordsQuery->where('metric_type', $filterMetric);
        }

        $records = $recordsQuery->take(50)->get()->map(function ($rec) use ($metricLabels, $sourceLabels) {
            $metricKey = (string)$rec->metric_type;
            $humanLabel = $metricLabels[$metricKey] ?? ucwords(str_replace('_', ' ', $metricKey));
            
            // Format readable value from value_numeric or value_text
            $val = (float)($rec->value_numeric ?? $rec->value ?? 0);
            $formattedValue = (string)$val;
            
            if ($metricKey === 'sleep_duration') {
                if ($rec->unit === 'minutes' || $val > 24) {
                    $hours = floor($val / 60);
                    $mins = round($val % 60);
                    $formattedValue = $mins > 0 ? "{$hours} Jam {$mins} Menit" : "{$hours} Jam";
                } else {
                    $hours = floor($val);
                    $mins = round(($val - $hours) * 60);
                    $formattedValue = $mins > 0 ? "{$hours} Jam {$mins} Menit" : "{$hours} Jam";
                }
            } elseif ($metricKey === 'water_intake') {
                $formattedValue = number_format($val, 0, ',', '.') . ' ml';
            } elseif ($metricKey === 'steps') {
                $formattedValue = number_format($val, 0, ',', '.') . ' Langkah';
            } elseif ($metricKey === 'blood_glucose') {
                $formattedValue = "{$val} mg/dL";
            } elseif ($metricKey === 'mood_score') {
                $moodDesc = $val >= 4 ? 'Sangat Baik' : ($val == 3 ? 'Cukup' : 'Butuh Perhatian');
                $formattedValue = "Skor {$val} / 5 ({$moodDesc})";
            } else {
                $formattedValue = $rec->unit ? "{$val} {$rec->unit}" : (string)$val;
            }

            $sourceKey = strtolower((string)$rec->source);
            $sourceLabel = $sourceLabels[$sourceKey] ?? ($sourceKey ? ucwords(str_replace('_', ' ', $sourceKey)) : 'Input Mandiri');
            $notes = $rec->notes ?? $rec->metadata['notes'] ?? null;

            return [
                'type' => 'HEALTH_RECORD',
                'id' => $rec->id,
                'metric_type' => $metricKey,
                'metric_label' => $humanLabel,
                'title' => "Catatan {$humanLabel}",
                'value' => $val,
                'formatted_value' => $formattedValue,
                'unit' => $rec->unit,
                'source' => $sourceKey,
                'source_label' => $sourceLabel,
                'notes' => $notes,
                'timestamp' => $rec->recorded_at->toIso8601String(),
                'display_date' => $rec->recorded_at->translatedFormat('d M Y, H:i'),
            ];
        });

        // 3. Fetch Behavior Signals
        $signals = BehaviorSignal::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->latest()
            ->take(20)
            ->get()
            ->map(function ($sig) use ($signalLabels, $severityLabels, $statusLabels) {
                $sigKey = (string)$sig->signal_type;
                $humanSignal = $signalLabels[$sigKey] ?? ucwords(str_replace('_', ' ', strtolower($sigKey)));
                $sevKey = (string)$sig->severity;
                $humanSeverity = $severityLabels[$sevKey] ?? $sevKey;
                $statKey = (string)$sig->status;
                $humanStatus = $statusLabels[$statKey] ?? $statKey;

                return [
                    'type' => 'BEHAVIOR_SIGNAL',
                    'id' => $sig->id,
                    'signal_type' => $sigKey,
                    'title' => "Sinyal: {$humanSignal}",
                    'severity' => $sevKey,
                    'severity_label' => $humanSeverity,
                    'status' => $statKey,
                    'status_label' => $humanStatus,
                    'priority_score' => $sig->priority_score,
                    'explanation' => $sig->explanation,
                    'timestamp' => $sig->created_at->toIso8601String(),
                    'display_date' => $sig->created_at->translatedFormat('d M Y, H:i'),
                ];
            });

        // 4. Fetch Interventions
        $interventions = Intervention::where('user_id', $user->id)
            ->where('created_at', '>=', $startDate)
            ->latest()
            ->take(15)
            ->get()
            ->map(function ($intv) use ($statusLabels) {
                $statKey = (string)$intv->status;
                $humanStatus = $statusLabels[$statKey] ?? $statKey;

                return [
                    'type' => 'INTERVENTION',
                    'id' => $intv->id,
                    'title' => $intv->title ?: 'Program Intervensi Perilaku',
                    'description' => $intv->description,
                    'status' => $statKey,
                    'status_label' => $humanStatus,
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
