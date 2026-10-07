<?php

use App\Http\Controllers\Admin\AdminGovernanceController;
use App\Http\Controllers\Admin\AdminReportsController;
use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\Admin\ChallengeController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Payment\MidtransPaymentController;
use App\Http\Controllers\Instructor\ConsultationController;
use App\Http\Controllers\Instructor\InstructorCaseloadController;
use App\Http\Controllers\Instructor\InterventionController;
use App\Http\Controllers\Instructor\ReportsController as InstructorReportsController;
use App\Http\Controllers\Member\AiChatController;
use App\Http\Controllers\Member\BookingController;
use App\Http\Controllers\Member\ChallengeMemberController;
use App\Http\Controllers\Member\CommunityController;
use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Member\EmergencyController;
use App\Http\Controllers\Member\InsightController;
use App\Http\Controllers\Member\MemberInstructorController;
use App\Http\Controllers\Member\MenstrualCycleController;
use App\Http\Controllers\Member\OnboardingController;
use App\Http\Controllers\Member\QuickLogController;
use App\Http\Controllers\Member\ScannerController;
use App\Http\Controllers\Member\TimelineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes - AEVYRA Preventive Health Platform
|--------------------------------------------------------------------------
*/

// Public Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Interactive Feature Demo / Showcase Pages (Public Access)
Route::get('/demo/scanner', function () {
    return Inertia::render('Demo/ScannerDemo');
})->name('demo.scanner');

Route::get('/demo/consultations', function () {
    return Inertia::render('Demo/ConsultationsDemo');
})->name('demo.consultations');

Route::get('/demo/tracker', function () {
    return Inertia::render('Demo/TrackerDemo');
})->name('demo.tracker');

Route::get('/demo/challenges', function () {
    return Inertia::render('Demo/ChallengesDemo');
})->name('demo.challenges');

Route::get('/demo/community', function () {
    return Inertia::render('Demo/CommunityDemo');
})->name('demo.community');

Route::get('/demo/gender-vitality', function () {
    return Inertia::render('Demo/GenderVitalityDemo');
})->name('demo.gender-vitality');

Route::get('/demo/emergency', function () {
    return Inertia::render('Demo/EmergencyDemo');
})->name('demo.emergency');

// Public FAQ Page (20 Comprehensive Medical & Platform Questions)
Route::get('/faq', function () {
    return Inertia::render('Faq');
})->name('faq');

// Public & Member Packages & Pricing Page
Route::get('/paket', function () {
    $tiers = \App\Models\MembershipTier::where('status', 'ACTIVE')->orderBy('price', 'asc')->get();

    $user = \Illuminate\Support\Facades\Auth::user();
    $currentTier = null;
    if ($user) {
        $activeMembership = \App\Models\Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();
        $currentTier = $activeMembership?->tier ? [
            'id' => $activeMembership->tier->id,
            'name' => $activeMembership->tier->name,
            'slug' => $activeMembership->tier->slug,
        ] : null;
    }

    return Inertia::render('Paket', [
        'tiersData' => $tiers,
        'currentTier' => $currentTier,
        'midtransConfig' => [
            'client_key' => config('services.midtrans.client_key'),
            'snap_url' => config('services.midtrans.snap_url'),
            'is_production' => (bool) config('services.midtrans.is_production', false),
        ],
    ]);
})->name('paket');

Route::get('/pricing', function () {
    return redirect()->route('paket');
});

// Legal & Compliance Dedicated Pages
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

// Itch.io Style Interactive Metabolic Mini-Game
Route::get('/arcade', [\App\Http\Controllers\ArcadeController::class, 'index'])->name('arcade');
Route::post('/arcade/scores', [\App\Http\Controllers\ArcadeController::class, 'storeScore'])->name('arcade.scores.store');

// Error Page Testing & Verification Route
Route::get('/error/{code?}', function (?int $code = 404) {
    $validCodes = [403, 404, 419, 429, 500, 503];
    $status = in_array((int)$code, $validCodes) ? (int)$code : 404;
    return Inertia::render('Error', [
        'status' => $status,
    ]);
})->name('error');

// Guest / Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Midtrans Payment Gateway Webhook (CSRF Exempt)
Route::post('/midtrans/notification', [MidtransPaymentController::class, 'notification'])->name('midtrans.notification');
Route::get('/midtrans/finish', [MidtransPaymentController::class, 'finish'])->name('midtrans.finish');

// Authenticated Routes
Route::middleware(['auth'])->group(function () {
    
    // Redirect /dashboard based on user's primary role
    Route::get('/dashboard', function () {
        /** @var \App\Models\User|null $user */
        $user = \Illuminate\Support\Facades\Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }
        if ($user->hasRole('admin')) {
            return redirect()->route('admin.dashboard');
        }
        if ($user->hasRole('instructor')) {
            return redirect()->route('instructor.dashboard');
        }
        return redirect()->route('member.dashboard');
    })->name('dashboard');

    // -------------------------------------------------------------
    // MEMBER ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:member'])->prefix('member')->name('member.')->group(function () {
        // Onboarding
        Route::get('/onboarding', [OnboardingController::class, 'show'])->name('onboarding');
        Route::post('/onboarding', [OnboardingController::class, 'store']);

        // Member Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Quick Health Log & HBE Trigger
        Route::post('/quick-log', [QuickLogController::class, 'store'])->name('quick-log');

        // Health Timeline Feed
        Route::get('/timeline', [TimelineController::class, 'index'])->name('timeline');

        // Instructors Directory & Multi-Instructor Assignment (Max 3, Optional)
        Route::get('/instructors', [MemberInstructorController::class, 'index'])->name('instructors.index');
        Route::post('/instructors/{instructor}/assign', [MemberInstructorController::class, 'assign'])->name('instructors.assign');
        Route::post('/instructors/{instructor}/release', [MemberInstructorController::class, 'release'])->name('instructors.release');

        // Insights & Recommendations
        Route::post('/insights/{insight}/dismiss', [InsightController::class, 'dismiss'])->name('insights.dismiss');
        Route::post('/recommendations/{recommendation}/accept', [InsightController::class, 'acceptRecommendation'])->name('recommendations.accept');

        // Emergency 119/112 (Instant, AI-Independent)
        Route::post('/emergency/trigger', [EmergencyController::class, 'trigger'])->name('emergency.trigger');
        Route::get('/emergency/hotlines', [EmergencyController::class, 'getHotlines'])->name('emergency.hotlines');

        // AI Lifestyle Assistant (Multi-Tier: Gemini -> Groq -> Cloudflare -> Local Fallback)
        Route::get('/ai-chat/history', [AiChatController::class, 'getHistory'])->name('ai.history');
        Route::post('/ai-chat/send', [AiChatController::class, 'sendMessage'])->name('ai.send');
        Route::get('/ai-chat/status', [AiChatController::class, 'getProviderStatus'])->name('ai.status');

        // Feature 1: Scanner Open Cam (Food, Drink, Medication OCR & Glycemic Load)
        Route::get('/scanner', [ScannerController::class, 'index'])->name('scanner');
        Route::post('/scanner/analyze', [ScannerController::class, 'analyze'])->name('scanner.analyze');
        Route::post('/scanner/save', [ScannerController::class, 'saveToNutrisi'])->name('scanner.save');

        // Feature 2 & 6: Dual Consultation Hub & Scheduled Booking
        Route::get('/consultations-hub', [BookingController::class, 'index'])->name('consultations.index');
        Route::get('/booking/slots/{instructor}', [BookingController::class, 'getSlots'])->name('booking.slots');
        Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
        Route::post('/booking/{consultation}/cancel', [BookingController::class, 'cancel'])->name('booking.cancel');

        // Feature 5: Program Challenge Kesehatan
        Route::get('/challenges', [ChallengeMemberController::class, 'index'])->name('challenges.index');
        Route::post('/challenges/{challenge}/join', [ChallengeMemberController::class, 'join'])->name('challenges.join');
        Route::post('/challenges/{participation}/progress', [ChallengeMemberController::class, 'updateProgress'])->name('challenges.progress');

        // Feature 7: Komunitas / Forum Diskusi
        Route::get('/community', [CommunityController::class, 'index'])->name('community.index');
        Route::post('/community/post', [CommunityController::class, 'storePost'])->name('community.post');
        Route::post('/community/comment', [CommunityController::class, 'storeComment'])->name('community.comment');
        Route::post('/community/react', [CommunityController::class, 'toggleReaction'])->name('community.react');

        // Feature 12: Catatan Haid (Wanita) & Prediksi AI vs Vitalitas (Pria)
        Route::get('/menstrual/summary', [MenstrualCycleController::class, 'getSummary'])->name('menstrual.summary');
        Route::post('/menstrual/log', [MenstrualCycleController::class, 'storeLog'])->name('menstrual.log');
        Route::post('/menstrual/settings', [MenstrualCycleController::class, 'updateSettings'])->name('menstrual.settings');
        Route::post('/profile/toggle-sex', [DashboardController::class, 'toggleSex'])->name('profile.toggle-sex');

        // Feature: SaaS Membership Checkout & Verification via Midtrans
        Route::post('/memberships/{tier}/checkout', [MidtransPaymentController::class, 'checkout'])->name('memberships.checkout');
        Route::post('/memberships/verify', [MidtransPaymentController::class, 'verifyStatus'])->name('memberships.verify')->middleware('throttle:30,1');
        Route::get('/memberships/finish', [MidtransPaymentController::class, 'finish'])->name('memberships.finish');
    });

    // -------------------------------------------------------------
    // INSTRUCTOR ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:instructor', 'verified-instructor'])->prefix('instructor')->name('instructor.')->group(function () {
        Route::get('/dashboard', [InstructorCaseloadController::class, 'index'])->name('dashboard');
        Route::get('/members/{member}', [InstructorCaseloadController::class, 'showMember'])->name('members.show');
        Route::get('/members', [InstructorCaseloadController::class, 'members'])->name('members.index');
        Route::post('/members/{member}/interventions', [InstructorCaseloadController::class, 'storeIntervention'])->name('members.interventions.store');
        Route::post('/members/{member}/consultations/note', [InstructorCaseloadController::class, 'storeConsultationNote'])->name('members.consultations.note');
        Route::get('/interventions', [InterventionController::class, 'index'])->name('interventions.index');
        Route::post('/interventions', [InterventionController::class, 'store'])->name('interventions.store');
        Route::patch('/interventions/{intervention}', [InterventionController::class, 'update'])->name('interventions.update');
        Route::get('/consultations', [ConsultationController::class, 'index'])->name('consultations.index');
        Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
        Route::patch('/consultations/{consultation}/complete', [ConsultationController::class, 'complete'])->name('consultations.complete');

        // Feature 9: Laporan Untuk Instruktur
        Route::get('/reports', [InstructorReportsController::class, 'index'])->name('reports.index');
    });

    // -------------------------------------------------------------
    // ADMIN GOVERNANCE ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminGovernanceController::class, 'index'])->name('dashboard');
        
        // Users Management CRUD
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::post('/users', [UserManagementController::class, 'store'])->name('users.store');
        Route::put('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');
        Route::post('/users/{user}/toggle-status', [UserManagementController::class, 'toggleStatus'])->name('users.toggle-status');
        Route::patch('/users/{user}/role', [UserManagementController::class, 'changeRole'])->name('users.role.update');
        
        // Instructor Verification & Recommendation Desk
        Route::get('/instructors', [AdminGovernanceController::class, 'instructors'])->name('instructors.index');
        Route::post('/instructors/{user}/approve', [AdminGovernanceController::class, 'approveInstructor'])->name('instructors.approve');
        Route::post('/instructors/{user}/reject', [AdminGovernanceController::class, 'rejectInstructor'])->name('instructors.reject');
        Route::post('/instructors/{user}/recommend', [AdminGovernanceController::class, 'toggleRecommendInstructor'])->name('instructors.recommend');
        
        // 11 Core Features Governance Routes
        // Scanner
        Route::get('/scanner', [AdminGovernanceController::class, 'scanner'])->name('scanner');
        Route::post('/scanner', [AdminGovernanceController::class, 'storeScan'])->name('scanner.store');
        Route::delete('/scanner/{record}', [AdminGovernanceController::class, 'destroyScan'])->name('scanner.destroy');

        // Consultations
        Route::get('/consultations', [AdminGovernanceController::class, 'consultations'])->name('consultations');
        Route::post('/consultations', [AdminGovernanceController::class, 'storeConsultation'])->name('consultations.store');
        Route::patch('/consultations/{consultation}', [AdminGovernanceController::class, 'updateConsultation'])->name('consultations.update');
        Route::delete('/consultations/{consultation}', [AdminGovernanceController::class, 'destroyConsultation'])->name('consultations.destroy');

        // Health Tracker
        Route::get('/health-tracker', [AdminGovernanceController::class, 'healthTracker'])->name('health-tracker');
        Route::post('/health-tracker', [AdminGovernanceController::class, 'storeHealthRecord'])->name('health-tracker.store');
        Route::delete('/health-tracker/{record}', [AdminGovernanceController::class, 'destroyHealthRecord'])->name('health-tracker.destroy');

        // Recommendations
        Route::get('/recommendations', [AdminGovernanceController::class, 'recommendations'])->name('recommendations');
        Route::post('/recommendations', [AdminGovernanceController::class, 'storeInsight'])->name('recommendations.store');
        Route::patch('/recommendations/{insight}/toggle', [AdminGovernanceController::class, 'toggleInsightStatus'])->name('recommendations.toggle');
        Route::delete('/recommendations/{insight}', [AdminGovernanceController::class, 'destroyInsight'])->name('recommendations.destroy');

        // Programs
        Route::get('/programs', [ProgramController::class, 'index'])->name('programs.index');
        Route::post('/programs', [ProgramController::class, 'store'])->name('programs.store');
        Route::patch('/programs/{program}', [ProgramController::class, 'update'])->name('programs.update');
        Route::delete('/programs/{program}', [ProgramController::class, 'destroy'])->name('programs.destroy');

        // Challenges
        Route::get('/challenges', [ChallengeController::class, 'index'])->name('challenges.index');
        Route::post('/challenges', [ChallengeController::class, 'store'])->name('challenges.store');
        Route::patch('/challenges/{challenge}', [ChallengeController::class, 'update'])->name('challenges.update');
        Route::delete('/challenges/{challenge}', [ChallengeController::class, 'destroy'])->name('challenges.destroy');

        // Community Moderation
        Route::get('/community', [AdminGovernanceController::class, 'community'])->name('community');
        Route::post('/community/posts', [AdminGovernanceController::class, 'storeCommunityPost'])->name('community.posts.store');
        Route::patch('/community/posts/{post}/status', [AdminGovernanceController::class, 'updateCommunityPostStatus'])->name('community.posts.status');
        Route::delete('/community/posts/{post}', [AdminGovernanceController::class, 'destroyCommunityPost'])->name('community.posts.destroy');

        // Gamification
        Route::get('/gamification', [AdminGovernanceController::class, 'gamification'])->name('gamification');
        Route::post('/gamification/badges', [AdminGovernanceController::class, 'storeBadge'])->name('gamification.badges.store');
        Route::patch('/gamification/badges/{achievement}', [AdminGovernanceController::class, 'updateBadge'])->name('gamification.badges.update');
        Route::delete('/gamification/badges/{achievement}', [AdminGovernanceController::class, 'destroyBadge'])->name('gamification.badges.destroy');
        Route::post('/gamification/award-points', [AdminGovernanceController::class, 'awardPoints'])->name('gamification.points.award');

        // Memberships & Tiers
        Route::get('/memberships', [AdminGovernanceController::class, 'memberships'])->name('memberships');
        Route::post('/memberships/assign', [AdminGovernanceController::class, 'assignMembership'])->name('memberships.assign');
        Route::patch('/memberships/subscriptions/{membership}', [AdminGovernanceController::class, 'updateMembership'])->name('memberships.subscriptions.update');
        Route::delete('/memberships/subscriptions/{membership}', [AdminGovernanceController::class, 'destroyMembership'])->name('memberships.subscriptions.destroy');
        Route::delete('/memberships/payments/{payment}', [AdminGovernanceController::class, 'destroyPayment'])->name('memberships.payments.destroy');
        Route::post('/memberships/tiers', [AdminGovernanceController::class, 'storeTier'])->name('memberships.tiers.store');
        Route::patch('/memberships/tiers/{tier}', [AdminGovernanceController::class, 'updateTier'])->name('memberships.tiers.update');
        Route::delete('/memberships/tiers/{tier}', [AdminGovernanceController::class, 'destroyTier'])->name('memberships.tiers.destroy');

        // Emergency 119/112
        Route::get('/emergency', [AdminGovernanceController::class, 'emergency'])->name('emergency');
        Route::patch('/emergency/{event}/status', [AdminGovernanceController::class, 'updateEmergencyStatus'])->name('emergency.status');
        Route::delete('/emergency/{event}', [AdminGovernanceController::class, 'destroyEmergencyEvent'])->name('emergency.destroy');
        Route::post('/emergency/simulate', [AdminGovernanceController::class, 'simulateEmergency'])->name('emergency.simulate');
        
        // Feature 9: Laporan & Analitik Platform Untuk Admin
        Route::get('/reports', [AdminReportsController::class, 'index'])->name('reports.index');
        Route::post('/reports/cohort', [AdminReportsController::class, 'storeCohortReport'])->name('reports.cohort.store');

        // Audit & Settings
        Route::get('/audit', [AuditController::class, 'index'])->name('audit.index');
        Route::get('/settings', [AdminGovernanceController::class, 'settings'])->name('settings');
        Route::post('/settings', [AdminGovernanceController::class, 'updateSettings'])->name('settings.update');
        Route::post('/settings/flags', [AdminGovernanceController::class, 'updateFeatureFlags'])->name('settings.flags');
    });
});
