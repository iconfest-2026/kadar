<?php

use App\Http\Controllers\Admin\AdminGovernanceController;
use App\Http\Controllers\Admin\AuditController;
use App\Http\Controllers\Admin\ChallengeController;
use App\Http\Controllers\Admin\ProgramController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Instructor\InstructorCaseloadController;
use App\Http\Controllers\Instructor\ConsultationController;
use App\Http\Controllers\Instructor\InterventionController;
use App\Http\Controllers\Member\AiChatController;
use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Member\EmergencyController;
use App\Http\Controllers\Member\InsightController;
use App\Http\Controllers\Member\MemberInstructorController;
use App\Http\Controllers\Member\OnboardingController;
use App\Http\Controllers\Member\QuickLogController;
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

// Guest / Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

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

        // AI Lifestyle Assistant (Non-diagnostic, Gemini + Fallback)
        Route::get('/ai-chat/history', [AiChatController::class, 'getHistory'])->name('ai.history');
        Route::post('/ai-chat/send', [AiChatController::class, 'sendMessage'])->name('ai.send');
    });

    // -------------------------------------------------------------
    // INSTRUCTOR ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:instructor', 'verified-instructor'])->prefix('instructor')->name('instructor.')->group(function () {
        Route::get('/dashboard', [InstructorCaseloadController::class, 'index'])->name('dashboard');
        Route::get('/members/{member}', [InstructorCaseloadController::class, 'showMember'])->name('members.show');
        Route::get('/members', [InstructorCaseloadController::class, 'members'])->name('members.index');
        Route::post('/members/{member}/interventions', [InstructorCaseloadController::class, 'storeIntervention'])->name('members.interventions.store');
        Route::get('/interventions', [InterventionController::class, 'index'])->name('interventions.index');
        Route::post('/interventions', [InterventionController::class, 'store'])->name('interventions.store');
        Route::patch('/interventions/{intervention}', [InterventionController::class, 'update'])->name('interventions.update');
        Route::get('/consultations', [ConsultationController::class, 'index'])->name('consultations.index');
        Route::post('/consultations', [ConsultationController::class, 'store'])->name('consultations.store');
        Route::patch('/consultations/{consultation}/complete', [ConsultationController::class, 'complete'])->name('consultations.complete');
    });

    // -------------------------------------------------------------
    // ADMIN GOVERNANCE ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminGovernanceController::class, 'index'])->name('dashboard');
        Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
        Route::post('/users/{user}/toggle-status', [UserManagementController::class, 'toggleStatus'])->name('users.toggle-status');
        Route::patch('/users/{user}/role', [UserManagementController::class, 'changeRole'])->name('users.role.update');
        
        // Instructor Verification & Recommendation Desk
        Route::get('/instructors', [AdminGovernanceController::class, 'instructors'])->name('instructors.index');
        Route::post('/instructors/{user}/approve', [AdminGovernanceController::class, 'approveInstructor'])->name('instructors.approve');
        Route::post('/instructors/{user}/reject', [AdminGovernanceController::class, 'rejectInstructor'])->name('instructors.reject');
        Route::post('/instructors/{user}/recommend', [AdminGovernanceController::class, 'toggleRecommendInstructor'])->name('instructors.recommend');
        
        // 11 Core Features Governance Routes
        Route::get('/scanner', [AdminGovernanceController::class, 'scanner'])->name('scanner');
        Route::get('/consultations', [AdminGovernanceController::class, 'consultations'])->name('consultations');
        Route::get('/health-tracker', [AdminGovernanceController::class, 'healthTracker'])->name('health-tracker');
        Route::get('/recommendations', [AdminGovernanceController::class, 'recommendations'])->name('recommendations');
        Route::get('/programs', [ProgramController::class, 'index'])->name('programs.index');
        Route::post('/programs', [ProgramController::class, 'store'])->name('programs.store');
        Route::patch('/programs/{program}', [ProgramController::class, 'update'])->name('programs.update');
        Route::get('/challenges', [ChallengeController::class, 'index'])->name('challenges.index');
        Route::post('/challenges', [ChallengeController::class, 'store'])->name('challenges.store');
        Route::get('/community', [AdminGovernanceController::class, 'community'])->name('community');
        Route::get('/gamification', [AdminGovernanceController::class, 'gamification'])->name('gamification');
        Route::get('/reports', [AdminGovernanceController::class, 'reports'])->name('reports');
        Route::get('/memberships', [AdminGovernanceController::class, 'memberships'])->name('memberships');
        Route::get('/emergency', [AdminGovernanceController::class, 'emergency'])->name('emergency');
        
        // Audit & Settings
        Route::get('/audit', [AuditController::class, 'index'])->name('audit.index');
        Route::get('/settings', [AdminGovernanceController::class, 'settings'])->name('settings');
        Route::post('/settings', [AdminGovernanceController::class, 'updateSettings'])->name('settings.update');
    });
});
