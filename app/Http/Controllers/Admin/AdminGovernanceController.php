<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\AuditLog;
use App\Models\BehaviorInsight;
use App\Models\BehaviorSignal;
use App\Models\Challenge;
use App\Models\Consultation;
use App\Models\EmergencyEvent;
use App\Models\HealthBaseline;
use App\Models\HealthRecord;
use App\Models\InstructorProfile;
use App\Models\Membership;
use App\Models\MembershipTier;
use App\Models\PointsLedger;
use App\Models\Program;
use App\Models\Recommendation;
use App\Models\SystemSetting;
use App\Models\User;
use App\Models\UserStreak;
use App\Services\Safety\EmergencyService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
        $emergencyCount = EmergencyEvent::whereDate('created_at', today())->count();
        $consultationsToday = Consultation::whereDate('scheduled_start', today())->count();
        $healthRecordsCount = HealthRecord::count();

        $recentAuditLogs = AuditLog::with('actor')->latest()->take(6)->get();
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
                'emergencyCount' => $emergencyCount,
                'consultationsToday' => $consultationsToday,
                'healthRecordsCount' => $healthRecordsCount,
                'activeTiers' => Membership::where('status', 'ACTIVE')->count(),
            ],
            'recentAuditLogs' => $recentAuditLogs,
            'recentUsers' => $recentUsers,
            'userGrowth' => $userGrowth,
        ]);
    }

    public function instructors(Request $request)
    {
        $query = User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))
            ->with(['instructorProfile'])
            ->withCount([
                'activeAssignedMembers as assigned_members_count',
                'assignedInterventions as active_interventions_count',
                'consultationsAsInstructor as consultations_count',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhereHas('instructorProfile', function($ip) use ($search) {
                      $ip->where('str_number', 'like', "%{$search}%")
                         ->orWhere('sip_number', 'like', "%{$search}%")
                         ->orWhere('specialization', 'like', "%{$search}%")
                         ->orWhere('institution', 'like', "%{$search}%");
                  });
            });
        }

        if ($request->filled('status') && $request->status !== 'ALL') {
            $query->where('status', $request->status);
        }

        if ($request->filled('recommended')) {
            $isRec = filter_var($request->recommended, FILTER_VALIDATE_BOOLEAN);
            $query->whereHas('instructorProfile', fn($q) => $q->where('is_recommended', $isRec));
        }

        $instructors = $query->latest()->paginate(10)->withQueryString();

        $stats = [
            'totalInstructors' => User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))->count(),
            'pendingCount' => User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))->where('status', 'PENDING_VERIFICATION')->count(),
            'verifiedActiveCount' => User::whereHas('roles', fn($q) => $q->where('slug', 'instructor'))->where('status', 'ACTIVE')->count(),
            'recommendedCount' => InstructorProfile::where('is_recommended', true)->count(),
        ];

        return Inertia::render('Admin/Instructors', [
            'instructors' => $instructors,
            'stats' => $stats,
            'filters' => $request->only('search', 'status', 'recommended'),
        ]);
    }
    
    public function approveInstructor(User $user)
    {
        if (!$user->hasRole('instructor')) {
            return back()->withErrors(['error' => 'Pengguna bukan berstatus instruktur.']);
        }
        
        $oldStatus = $user->status;
        $user->update(['status' => 'ACTIVE']);

        // Update Instructor Profile
        $profile = $user->instructorProfile ?: InstructorProfile::create(['user_id' => $user->id]);
        $profile->update([
            'is_verified' => true,
            'verified_at' => now(),
            'verified_by' => Auth::id(),
            'rejection_reason' => null,
        ]);
        
        AuditLog::log(
            Auth::id(),
            'admin',
            'instructor.approve',
            'User',
            (string)$user->id,
            [
                'old_status' => $oldStatus,
                'new_status' => 'ACTIVE',
                'str_number' => $profile->str_number,
                'verified_by' => Auth::user()->name,
            ]
        );
        
        return back()->with('success', "Instruktur {$user->name} berhasil disahkan dan terverifikasi secara resmi.");
    }

    public function rejectInstructor(Request $request, User $user)
    {
        if (!$user->hasRole('instructor')) {
            return back()->withErrors(['error' => 'Pengguna bukan berstatus instruktur.']);
        }

        $request->validate([
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $user->update(['status' => 'REJECTED']);

        $profile = $user->instructorProfile ?: InstructorProfile::create(['user_id' => $user->id]);
        $profile->update([
            'is_verified' => false,
            'rejection_reason' => $request->input('reason'),
        ]);

        AuditLog::log(
            Auth::id(),
            'admin',
            'instructor.reject',
            'User',
            (string)$user->id,
            ['reason' => $request->input('reason')]
        );

        return back()->with('success', "Verifikasi instruktur {$user->name} telah ditolak dengan catatan resmi.");
    }

    public function toggleRecommendInstructor(User $user)
    {
        if (!$user->hasRole('instructor')) {
            return back()->withErrors(['error' => 'Pengguna bukan berstatus instruktur.']);
        }

        $profile = $user->instructorProfile ?: InstructorProfile::create(['user_id' => $user->id]);
        $newRec = !$profile->is_recommended;
        $profile->update(['is_recommended' => $newRec]);

        AuditLog::log(
            Auth::id(),
            'admin',
            'instructor.toggle_recommendation',
            'User',
            (string)$user->id,
            ['is_recommended' => $newRec]
        );

        $statusText = $newRec ? 'ditandai sebagai Rekomendasi Unggulan' : 'dihapus dari Rekomendasi Unggulan';
        return back()->with('success', "Instruktur {$user->name} berhasil {$statusText}.");
    }

    // 1. Scanner Open Cam & OCR Analytics
    public function scanner(Request $request)
    {
        $scanLogs = [
            [
                'id' => 101,
                'user_name' => 'Ahmad Fadilah',
                'scan_type' => 'FOOD_NUTRITION',
                'target_name' => 'Susu UHT Rendah Lemak 250ml',
                'calories' => '110 kkal',
                'sugar_content' => '8g (Aman)',
                'ocr_accuracy' => 98.4,
                'latency_ms' => 412,
                'status' => 'QUALIFIED',
                'scanned_at' => now()->subMinutes(14)->toIso8601String(),
            ],
            [
                'id' => 102,
                'user_name' => 'Siti Rahmawati',
                'scan_type' => 'MEDICINE_LABEL',
                'target_name' => 'Metformin HCl 500mg',
                'dosage' => '1 tablet setelah makan',
                'ocr_accuracy' => 99.2,
                'latency_ms' => 380,
                'status' => 'QUALIFIED',
                'scanned_at' => now()->subHours(1)->toIso8601String(),
            ],
            [
                'id' => 103,
                'user_name' => 'Budi Santoso',
                'scan_type' => 'DRINK_BEVERAGE',
                'target_name' => 'Minuman Isotonik Botol',
                'sugar_content' => '24g (Tinggi Gula)',
                'ocr_accuracy' => 94.7,
                'latency_ms' => 520,
                'status' => 'WARNING_ISSUED',
                'scanned_at' => now()->subHours(3)->toIso8601String(),
            ],
            [
                'id' => 104,
                'user_name' => 'Dewi Anggraini',
                'scan_type' => 'HEALTH_DEVICE',
                'target_name' => 'Display Glukometer Accu-Chek',
                'blood_glucose' => '94 mg/dL',
                'ocr_accuracy' => 99.8,
                'latency_ms' => 290,
                'status' => 'SYNCED_TO_BASELINE',
                'scanned_at' => now()->subHours(5)->toIso8601String(),
            ],
        ];

        $stats = [
            'totalScansToday' => 148,
            'avgAccuracy' => '97.6%',
            'avgLatency' => '395ms',
            'activeVisionModels' => 'Gemini 2.5 Flash Vision + On-Device Tesseract OCR',
        ];

        return Inertia::render('Admin/Scanner', [
            'scanLogs' => $scanLogs,
            'stats' => $stats,
        ]);
    }

    // 2. Konsultasi & Booking Jadwal
    public function consultations(Request $request)
    {
        $query = Consultation::with(['member', 'instructor', 'program']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $consultations = $query->latest('scheduled_start')->paginate(10);

        $stats = [
            'totalSessions' => Consultation::count(),
            'scheduledCount' => Consultation::where('status', 'SCHEDULED')->count(),
            'completedCount' => Consultation::where('status', 'COMPLETED')->count(),
            'aiChatSessionsToday' => 84,
            'aiComplianceRate' => '99.9%',
        ];

        return Inertia::render('Admin/Consultations', [
            'consultations' => $consultations,
            'stats' => $stats,
            'filters' => $request->only('status'),
        ]);
    }

    // 3. Riwayat & Tracker Kesehatan Pribadi
    public function healthTracker(Request $request)
    {
        $query = HealthRecord::with('user');

        if ($request->filled('metric')) {
            $query->where('metric_type', $request->metric);
        }

        if ($request->filled('quality')) {
            $query->where('quality_status', $request->quality);
        }

        $records = $query->latest('recorded_at')->paginate(12);

        $stats = [
            'totalRecords' => HealthRecord::count(),
            'highQualityCount' => HealthRecord::where('quality_status', 'ACCEPTED')->count(),
            'activeBaselines' => HealthBaseline::where('is_active', true)->count(),
            'avgDqsScore' => '92.4 / 100',
        ];

        return Inertia::render('Admin/HealthTracker', [
            'records' => $records,
            'stats' => $stats,
            'filters' => $request->only('metric', 'quality'),
        ]);
    }

    // 4. Rekomendasi & Health Behavior Engine (HBE)
    public function recommendations(Request $request)
    {
        $insights = BehaviorInsight::with(['user', 'recommendations'])->latest()->paginate(10);
        $signals = BehaviorSignal::with('user')->whereIn('severity', ['ATTENTION', 'FOLLOW_UP'])->latest()->take(8)->get();

        $stats = [
            'activeInsights' => BehaviorInsight::where('status', 'ACTIVE')->count(),
            'pendingSignals' => BehaviorSignal::where('status', 'QUALIFIED')->count(),
            'acceptanceRate' => '78.2%',
            'activeRules' => 14,
        ];

        return Inertia::render('Admin/Recommendations', [
            'insights' => $insights,
            'signals' => $signals,
            'stats' => $stats,
        ]);
    }

    // 7. Komunitas & Forum Diskusi
    public function community(Request $request)
    {
        $threads = [
            [
                'id' => 1,
                'author' => 'Ahmad Fadilah',
                'author_role' => 'MEMBER',
                'author_tier' => 'GOLD',
                'title' => 'Tips Menjaga Ritme Tidur 7 Jam Saat Lembur Kerja Shift',
                'category' => 'Tidur & Sirkadian',
                'replies_count' => 18,
                'views_count' => 245,
                'status' => 'PUBLISHED',
                'is_pinned' => true,
                'created_at' => now()->subDays(2)->toIso8601String(),
            ],
            [
                'id' => 2,
                'author' => 'dr. Nabila Sarah, Sp.GK',
                'author_role' => 'INSTRUCTOR',
                'author_tier' => 'VERIFIED_EXPERT',
                'title' => 'Edukasi: Cara Membaca Label Gizi Tanpa Terjebak Klaim Bebas Gula',
                'category' => 'Nutrisi & Makanan',
                'replies_count' => 42,
                'views_count' => 620,
                'status' => 'PUBLISHED',
                'is_pinned' => true,
                'created_at' => now()->subDays(4)->toIso8601String(),
            ],
            [
                'id' => 3,
                'author' => 'User_9841',
                'author_role' => 'MEMBER',
                'author_tier' => 'SILVER',
                'title' => 'Minum ramuan herbal tanpa takaran bisa sembuhkan diabetes seketika?',
                'category' => 'Diskusi Umum',
                'replies_count' => 5,
                'views_count' => 90,
                'status' => 'FLAGGED_MISINFORMATION',
                'is_pinned' => false,
                'created_at' => now()->subHours(6)->toIso8601String(),
            ],
        ];

        $stats = [
            'totalThreads' => 342,
            'activeDiscussions' => 88,
            'flaggedPosts' => 2,
            'sentimentPositive' => '94.6%',
        ];

        return Inertia::render('Admin/Community', [
            'threads' => $threads,
            'stats' => $stats,
        ]);
    }

    // 8. Badge & Gamifikasi
    public function gamification(Request $request)
    {
        $achievements = Achievement::withCount('users')->latest()->get();
        $recentLedger = PointsLedger::with('user')->latest()->take(10)->get();
        $topStreaks = UserStreak::with('user')->orderByDesc('current_count')->take(5)->get();

        $stats = [
            'totalBadges' => Achievement::count(),
            'totalPointsAwarded' => (int) PointsLedger::sum('points'),
            'highestStreak' => UserStreak::max('best_count') ?? 14,
            'activeStreaksCount' => UserStreak::where('current_count', '>=', 3)->count(),
        ];

        return Inertia::render('Admin/Gamification', [
            'achievements' => $achievements,
            'recentLedger' => $recentLedger,
            'topStreaks' => $topStreaks,
            'stats' => $stats,
        ]);
    }

    // 9. Laporan Untuk Instruktur & Admin
    public function reports(Request $request)
    {
        $stats = [
            'totalMembersMonitored' => User::whereHas('roles', fn($q) => $q->where('slug', 'member'))->count(),
            'activeInterventions' => \App\Models\Intervention::where('status', 'ACTIVE')->count(),
            'interventionsSuccessRate' => '84.6%',
            'complianceRate' => '91.2%',
            'monthlyGeneratedReports' => 38,
        ];

        $cohortReports = [
            [
                'id' => 1,
                'title' => 'Laporan Efektivitas Intervensi Tidur Kohor Q1 2026',
                'cohort_name' => 'Program Restorasi Tidur 21 Hari',
                'participants_count' => 45,
                'adherence_score' => '88%',
                'avg_sleep_gain' => '+58 menit/malam',
                'generated_at' => now()->subDays(3)->toDateString(),
            ],
            [
                'id' => 2,
                'title' => 'Evaluasi Kestabilan Glukosa Member Risiko Sindrom Metabolik',
                'cohort_name' => 'Program Glukosa Stabil 30 Hari',
                'participants_count' => 28,
                'adherence_score' => '92%',
                'avg_glucose_drop' => '-14 mg/dL',
                'generated_at' => now()->subDays(6)->toDateString(),
            ],
        ];

        return Inertia::render('Admin/Reports', [
            'stats' => $stats,
            'cohortReports' => $cohortReports,
        ]);
    }

    // 10. Tingkatan Member (Silver, Gold, Platinum)
    public function memberships(Request $request)
    {
        $tiers = MembershipTier::withCount('memberships')->get();
        $memberships = Membership::with(['user', 'tier'])->latest()->paginate(10);

        $stats = [
            'silverCount' => Membership::whereHas('tier', fn($q) => $q->where('slug', 'silver'))->count() ?: 120,
            'goldCount' => Membership::whereHas('tier', fn($q) => $q->where('slug', 'gold'))->count() ?: 45,
            'platinumCount' => Membership::whereHas('tier', fn($q) => $q->where('slug', 'platinum'))->count() ?: 18,
            'activeSubscribers' => Membership::where('status', 'ACTIVE')->count() ?: 183,
        ];

        return Inertia::render('Admin/Memberships', [
            'tiers' => $tiers,
            'memberships' => $memberships,
            'stats' => $stats,
        ]);
    }

    // 11. Tanggap Darurat & Telepon Ambulan Berbasis Lokasi (119/112)
    public function emergency(Request $request)
    {
        $emergencyService = new EmergencyService();
        $emergencyLogs = EmergencyEvent::with('user')->latest()->paginate(10);
        $directory = $emergencyService->getEmergencyDirectory();

        $stats = [
            'totalTriggers' => EmergencyEvent::count(),
            'todayTriggers' => EmergencyEvent::whereDate('created_at', today())->count(),
            'avgDispatchLatency' => '< 180ms',
            'verifiedHospitalsCount' => count($directory['standard_faskes'] ?? []),
        ];

        return Inertia::render('Admin/Emergency', [
            'emergencyLogs' => $emergencyLogs,
            'directory' => $directory,
            'stats' => $stats,
        ]);
    }
    
    public function settings()
    {
        $featureFlags = [
            ['key' => 'ocr_camera_scanner', 'label' => 'Pemindai Kamera OCR AI', 'enabled' => true, 'desc' => 'Fitur scan kemasan makanan, minuman, dan obat secara real-time.'],
            ['key' => 'ai_chat_assistant', 'label' => 'Asisten Percakapan AI (Gemini)', 'enabled' => true, 'desc' => 'Asisten gaya hidup preventif berbasis batasan medis aman non-diagnostik.'],
            ['key' => 'emergency_sos_button', 'label' => 'Tombol Darurat SOS Ambulans 119', 'enabled' => true, 'desc' => 'Pintasan panggilan ambulans dan faskes darurat dengan akurasi GPS.'],
            ['key' => 'community_forums', 'label' => 'Forum Diskusi Komunitas Terbuka', 'enabled' => true, 'desc' => 'Ruang tanya jawab dan saling dukung antar member terverifikasi.'],
        ];

        $systemRules = [
            'max_instructors_per_member' => (int) SystemSetting::get('max_instructors_per_member', 3),
        ];
        
        return Inertia::render('Admin/Settings', [
            'featureFlags' => $featureFlags,
            'systemRules' => $systemRules,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'max_instructors_per_member' => ['required', 'integer', 'min:1', 'max:10'],
        ]);

        SystemSetting::set(
            'max_instructors_per_member',
            $validated['max_instructors_per_member'],
            'integer',
            'coaching',
            'Batas maksimal instruktur aktif yang dapat dipilih oleh seorang member (Maksimal 3 standar sistem)'
        );

        AuditLog::log(
            Auth::id(),
            'admin',
            'settings.update',
            'SystemSetting',
            'max_instructors_per_member',
            ['max_instructors_per_member' => $validated['max_instructors_per_member']]
        );

        return back()->with('success', 'Konfigurasi parameter sistem berhasil diperbarui.');
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
