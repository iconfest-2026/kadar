<?php

use App\Http\Controllers\Admin\AdminGovernanceController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Instructor\InstructorCaseloadController;
use App\Http\Controllers\Member\AiChatController;
use App\Http\Controllers\Member\DashboardController;
use App\Http\Controllers\Member\EmergencyController;
use App\Http\Controllers\Member\InsightController;
use App\Http\Controllers\Member\OnboardingController;
use App\Http\Controllers\Member\QuickLogController;
use App\Http\Controllers\Member\TimelineController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes - Kadar (AEVYRA) Preventive Health Platform
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
    Route::middleware(['role:instructor'])->prefix('instructor')->name('instructor.')->group(function () {
        Route::get('/dashboard', [InstructorCaseloadController::class, 'index'])->name('dashboard');
        Route::get('/members/{member}', [InstructorCaseloadController::class, 'showMember'])->name('members.show');
        Route::post('/members/{member}/interventions', [InstructorCaseloadController::class, 'storeIntervention'])->name('members.interventions.store');
        Route::post('/members/{member}/consultations', [InstructorCaseloadController::class, 'storeConsultationNote'])->name('members.consultations.store');
    });

    // -------------------------------------------------------------
    // ADMIN GOVERNANCE ROUTES
    // -------------------------------------------------------------
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminGovernanceController::class, 'index'])->name('dashboard');
        Route::post('/users/{user}/toggle-status', [AdminGovernanceController::class, 'toggleUserStatus'])->name('users.toggle-status');
    });
});
