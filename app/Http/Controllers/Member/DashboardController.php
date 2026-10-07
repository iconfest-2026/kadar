<?php

namespace App\Http\Controllers\Member;

use App\Enums\MetricType;
use App\Http\Controllers\Controller;
use App\Models\BehaviorInsight;
use App\Models\BehaviorSignal;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\PointsLedger;
use App\Models\UserStreak;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Check if profile setup is done
        $profile = $user->memberProfile;
        if (!$profile) {
            return redirect()->route('member.onboarding');
        }

        $today = Carbon::today();

        // 2. Fetch baselines for core metrics
        $coreMetrics = [
            MetricType::SLEEP_DURATION->value,
            MetricType::WATER_INTAKE->value,
            MetricType::STEPS->value,
            MetricType::BLOOD_GLUCOSE->value,
        ];

        $baselines = HealthBaseline::where('user_id', $user->id)
            ->whereIn('metric_type', $coreMetrics)
            ->where('is_active', true)
            ->get()
            ->keyBy('metric_type');

        // 3. Fetch today's health records
        $todayRecords = HealthRecord::where('user_id', $user->id)
            ->whereDate('recorded_at', $today)
            ->get()
            ->groupBy('metric_type');

        // 4. Fetch active signals
        $activeSignals = BehaviorSignal::where('user_id', $user->id)
            ->whereIn('status', ['QUALIFIED', 'PRESENTED'])
            ->latest()
            ->take(5)
            ->get();

        // 5. Fetch latest active insights with recommendations
        $activeInsights = BehaviorInsight::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with(['recommendations' => function ($query) {
                $query->whereIn('status', ['RECOMMENDED', 'ACCEPTED']);
            }])
            ->latest()
            ->take(4)
            ->get();

        // 6. Streak and gamification points
        $streak = UserStreak::where('user_id', $user->id)
            ->where('type', 'DAILY_LOGGING')
            ->first();

        $totalPoints = (int) PointsLedger::where('user_id', $user->id)->sum('points');

        // 7. Assigned Instructor info
        $activeAssignment = $user->instructorAssignments()
            ->where('status', 'ACTIVE')
            ->with('instructor')
            ->first();

        // 8. Membership Tier & Quota info
        $activeMembership = \App\Models\Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        $currentTier = $activeMembership?->tier;
        $tierSlug = strtolower($currentTier?->slug ?? 'silver');

        $allTiers = \App\Models\MembershipTier::where('status', 'ACTIVE')
            ->orderBy('price', 'asc')
            ->get()
            ->map(function ($t) use ($tierSlug) {
                return [
                    'id' => $t->id,
                    'name' => $t->name,
                    'slug' => $t->slug,
                    'description' => $t->description,
                    'price' => (float) $t->price,
                    'admin_fee' => (float) $t->admin_fee,
                    'admin_fee_type' => $t->admin_fee_type,
                    'calculated_admin_fee' => (float) $t->calculated_admin_fee,
                    'total_price' => (float) $t->total_price,
                    'badge_text' => $t->badge_text,
                    'is_popular' => (bool) $t->is_popular,
                    'max_consultations' => (int) $t->max_consultations,
                    'max_scanner' => (int) $t->max_scanner,
                    'features' => $t->features ?? [],
                    'is_current' => strtolower($t->slug) === $tierSlug,
                ];
            });

        $scanLimit = $currentTier
            ? ($currentTier->max_scanner === -1 ? 'Unlimited / hari' : ($currentTier->max_scanner > 0 ? "{$currentTier->max_scanner} / hari" : 'Tidak termasuk'))
            : '10 / hari';

        $consultationQuota = $currentTier
            ? ($currentTier->max_consultations === -1 ? 'Bebas Batas' : ($currentTier->max_consultations > 0 ? "{$currentTier->max_consultations} Sesi / bulan" : 'Tanpa Kuota'))
            : '0 Sesi / bulan';

        // 9. Achievements & Badges
        $userEarnedIds = $user->achievements()->pluck('achievements.id')->toArray();
        $achievements = \App\Models\Achievement::where('status', 'ACTIVE')->get()->map(function ($ach) use ($userEarnedIds) {
            return [
                'id' => $ach->id,
                'key' => $ach->key,
                'name' => $ach->name,
                'description' => $ach->description,
                'category' => $ach->category,
                'is_unlocked' => in_array($ach->id, $userEarnedIds) || $ach->key === 'FIRST_LOG',
                'points' => $ach->rules_config['points'] ?? 20,
            ];
        });

        return Inertia::render('Member/Dashboard', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'profile' => $profile,
            'lifestyle' => $user->lifestyleProfile,
            'baselines' => $baselines,
            'todayRecords' => $todayRecords,
            'activeSignals' => $activeSignals,
            'activeInsights' => $activeInsights,
            'streak' => $streak ? [
                'current' => $streak->current_count,
                'best' => $streak->best_count,
                'last_activity' => $streak->last_activity_at?->toDateString(),
            ] : ['current' => 1, 'best' => 1, 'last_activity' => $today->toDateString()],
            'totalPoints' => $totalPoints,
            'membership' => [
                'tier' => $currentTier?->name ?? 'Silver',
                'tier_slug' => $tierSlug,
                'all_tiers' => $allTiers,
                'scan_limit' => $scanLimit,
                'consultation_quota' => $consultationQuota,
            ],
            'achievements' => $achievements,
            'instructor' => $activeAssignment ? [
                'id' => $activeAssignment->instructor->id,
                'name' => $activeAssignment->instructor->name,
                'status' => $activeAssignment->status,
            ] : null,
        ]);
    }

    public function toggleSex(\Illuminate\Http\Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        if ($profile) {
            $newSex = $profile->sex === 'FEMALE' ? 'MALE' : 'FEMALE';
            $profile->update(['sex' => $newSex]);

            $label = $newSex === 'FEMALE' 
                ? 'Profil dialihkan ke Akun Wanita (Catatan Haid & Prediksi Hormonal AI aktif)' 
                : 'Profil dialihkan ke Akun Pria (Modul Vitalitas & Skrining Sindrom Metabolik aktif)';

            return back()->with('success', $label);
        }

        return back();
    }
}
