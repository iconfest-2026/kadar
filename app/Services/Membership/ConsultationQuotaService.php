<?php

namespace App\Services\Membership;

use App\Models\Consultation;
use App\Models\Membership;
use App\Models\MembershipTier;
use App\Models\User;
use Carbon\Carbon;

class ConsultationQuotaService
{
    /**
     * Get detailed consultation quota information for a member based on active subscription.
     */
    public function getMemberQuota(?User $user): array
    {
        if (!$user) {
            return [
                'tier_name' => 'Silver',
                'tier_slug' => 'silver',
                'tier_id' => null,
                'total' => 0,
                'used' => 0,
                'remaining' => 0,
                'is_unlimited' => false,
                'can_book' => false,
                'reason' => 'Silakan masuk ke akun Anda terlebih dahulu.',
                'cycle_start' => Carbon::now()->startOfMonth()->format('Y-m-d'),
            ];
        }

        // 1. Fetch active membership
        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        if ($membership) {
            $membership->applyPendingDowngradeIfDue();
            $membership->loadMissing('tier');

            // Check if expired
            if ($membership->ends_at && $membership->ends_at->isPast()) {
                $membership->update(['status' => 'EXPIRED']);
                $membership = null;
            }
        }

        // 2. Determine active tier (fall back to default free/silver tier)
        $tier = $membership?->tier;
        if (!$tier) {
            $tier = MembershipTier::where('slug', 'silver')
                ->orWhere('slug', 'free')
                ->first();
        }

        // 3. Determine max consultations allowed by this tier
        // -1: Unlimited, 0: None (e.g. Silver), >0: Specific monthly quota (e.g. 2 for Gold, 6 for Platinum)
        $maxConsultations = $tier ? (int) $tier->max_consultations : 0;
        $isUnlimited = ($maxConsultations === -1);

        // 4. Calculate current billing cycle start date
        if ($membership && $membership->starts_at) {
            $cycleStart = $membership->starts_at->copy();
            // If subscription has been running for longer than 30 days, adjust to current cycle window
            if ($cycleStart->diffInDays(now()) > 30) {
                $monthsPassed = (int) $cycleStart->diffInMonths(now());
                $cycleStart = $cycleStart->addMonths($monthsPassed);
            }
        } else {
            $cycleStart = Carbon::now()->startOfMonth();
        }

        // 5. Count non-cancelled consultations within current cycle
        $used = Consultation::where('member_id', $user->id)
            ->whereNotIn('status', ['CANCELLED'])
            ->where('created_at', '>=', $cycleStart)
            ->count();

        // 6. Calculate remaining quota & booking eligibility
        if ($isUnlimited) {
            $remaining = 999;
            $canBook = true;
        } else {
            $remaining = max(0, $maxConsultations - $used);
            $canBook = ($maxConsultations > 0 && $remaining > 0);
        }

        // 7. Formulate explanatory message if cannot book
        $reason = null;
        if (!$canBook) {
            if ($maxConsultations === 0) {
                $tierDisplayName = $tier?->name ?? 'Silver';
                $reason = "Paket langganan aktif Anda saat ini ({$tierDisplayName}) tidak mencakup kuota konsultasi dokter/instruktur. Silakan upgrade ke paket Gold atau Platinum untuk menikmati sesi telekonsultasi.";
            } else {
                $reason = "Kuota sesi konsultasi dokter Anda untuk periode paket ini sudah habis ({$used}/{$maxConsultations} sesi telah digunakan). Silakan tingkatkan paket Anda untuk mendapatkan kuota tambahan.";
            }
        }

        return [
            'tier_name' => $tier?->name ?? 'Silver',
            'tier_slug' => $tier?->slug ?? 'silver',
            'tier_id' => $tier?->id,
            'total' => $isUnlimited ? -1 : $maxConsultations,
            'used' => $used,
            'remaining' => $isUnlimited ? -1 : $remaining,
            'is_unlimited' => $isUnlimited,
            'can_book' => $canBook,
            'reason' => $reason,
            'cycle_start' => $cycleStart->format('Y-m-d'),
        ];
    }

    /**
     * Check if a member can book a new consultation.
     */
    public function canMemberBook(User $user): bool
    {
        return $this->getMemberQuota($user)['can_book'];
    }

    /**
     * Validate booking and return error message if quota exceeded or tier doesn't include consultations.
     * Returns null if booking is allowed.
     */
    public function validateBooking(User $user): ?string
    {
        $quota = $this->getMemberQuota($user);
        return $quota['can_book'] ? null : $quota['reason'];
    }
}
