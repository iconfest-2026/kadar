<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Membership & Feature Gates
        Gate::define('access-consultation', fn(User $user) => $user->canBookConsultation());
        Gate::define('access-scanner', fn(User $user) => $user->canScanFoodToday());
        Gate::define('premium-member', fn(User $user) => $user->isPremium());
        Gate::define('platinum-member', fn(User $user) => $user->isPlatinum());
        Gate::define('access-feature', fn(User $user, string $feature) => $user->hasFeature($feature));
    }
}
