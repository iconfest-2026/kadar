<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => $user->status,
                    'roles' => $user->roles->pluck('slug')->all(),
                    'profile' => $user->memberProfile ? [
                        'display_name' => $user->memberProfile->display_name,
                        'avatar_path' => $user->memberProfile->avatar_path,
                    ] : null,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'membership' => function () use ($user) {
                $activeTiers = \App\Models\MembershipTier::where('status', 'ACTIVE')->orderBy('price', 'asc')->get();
                if (!$user) {
                    return [
                        'current_tier' => null,
                        'current_tier_slug' => null,
                        'active_tiers' => $activeTiers,
                    ];
                }
                $active = \App\Models\Membership::where('user_id', $user->id)
                    ->where('status', 'ACTIVE')
                    ->with(['tier', 'downgradeTier'])
                    ->first();

                if ($active) {
                    $active->applyPendingDowngradeIfDue();
                    $active->loadMissing(['tier', 'downgradeTier']);
                }

                $defaultFreeTier = \App\Models\MembershipTier::where('slug', 'silver')
                    ->orWhere('slug', 'free')
                    ->first();

                $quotaService = app(\App\Services\Membership\ConsultationQuotaService::class);
                $consultationQuota = $quotaService->getMemberQuota($user);

                return [
                    'current_tier' => $active?->tier?->name ?? ($defaultFreeTier?->name ?? 'Silver'),
                    'current_tier_slug' => $active?->tier?->slug ?? ($defaultFreeTier?->slug ?? 'silver'),
                    'current_tier_price' => (float) ($active?->tier?->price ?? 0),
                    'tier_id' => $active?->tier?->id ?? $defaultFreeTier?->id,
                    'max_scanner' => $active?->tier?->max_scanner ?? ($defaultFreeTier?->max_scanner ?? 10),
                    'max_consultations' => $active?->tier?->max_consultations ?? ($defaultFreeTier?->max_consultations ?? 0),
                    'consultation_quota' => $consultationQuota,
                    'starts_at' => $active?->starts_at?->translatedFormat('d F Y'),
                    'ends_at' => $active?->ends_at?->translatedFormat('d F Y'),
                    'ends_at_iso' => $active?->ends_at?->toDateString(),
                    'has_pending_downgrade' => (bool) ($active && $active->hasPendingDowngrade()),
                    'pending_downgrade' => ($active && $active->hasPendingDowngrade()) ? [
                        'tier_id' => $active->downgrade_to_tier_id,
                        'tier_name' => $active->downgradeTier?->name,
                        'tier_slug' => $active->downgradeTier?->slug,
                        'effective_at' => $active->downgrade_at?->translatedFormat('d F Y'),
                        'effective_at_iso' => $active->downgrade_at?->toDateString(),
                        'reason' => $active->downgrade_reason,
                    ] : null,
                    'active_tiers' => $activeTiers,
                ];
            },
            'notifications' => function () use ($user) {
                if (!$user) {
                    return [
                        'unread_count' => 0,
                        'recent' => [],
                    ];
                }
                return [
                    'unread_count' => \App\Models\Notification::where('user_id', $user->id)->whereNull('read_at')->count(),
                    'recent' => \App\Models\Notification::where('user_id', $user->id)->latest()->take(8)->get(),
                ];
            },
            'midtrans' => [
                'client_key' => config('services.midtrans.client_key', env('MIDTRANS_CLIENT_KEY', 'Mid-client-o8FP06N-oie4kS_V')),
                'snap_url' => config('services.midtrans.snap_url', 'https://app.sandbox.midtrans.com/snap/snap.js'),
                'is_production' => (bool) config('services.midtrans.is_production', false),
            ],
        ];
    }
}
