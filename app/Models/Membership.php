<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Membership extends Model
{
    protected $fillable = [
        'user_id',
        'tier_id',
        'downgrade_to_tier_id',
        'status',
        'starts_at',
        'ends_at',
        'downgrade_at',
        'downgrade_reason',
        'auto_renew',
    ];

    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'downgrade_at' => 'datetime',
            'auto_renew' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tier(): BelongsTo
    {
        return $this->belongsTo(MembershipTier::class, 'tier_id');
    }

    public function downgradeTier(): BelongsTo
    {
        return $this->belongsTo(MembershipTier::class, 'downgrade_to_tier_id');
    }

    /**
     * Check if membership has a scheduled downgrade waiting to take effect.
     */
    public function hasPendingDowngrade(): bool
    {
        return !is_null($this->downgrade_to_tier_id) && !is_null($this->downgrade_at);
    }

    /**
     * Check and execute pending downgrade if scheduled date has been reached.
     * Netflix-style scheduled transition.
     */
    public function applyPendingDowngradeIfDue(): bool
    {
        if (!$this->hasPendingDowngrade()) {
            return false;
        }

        if (now()->greaterThanOrEqualTo($this->downgrade_at)) {
            $newTier = MembershipTier::find($this->downgrade_to_tier_id);
            if (!$newTier) {
                // Target tier no longer exists, cancel downgrade
                $this->update([
                    'downgrade_to_tier_id' => null,
                    'downgrade_at' => null,
                    'downgrade_reason' => null,
                ]);
                return false;
            }

            $oldTier = $this->tier;
            $isFree = ((float) $newTier->price) <= 0;

            $this->update([
                'tier_id' => $newTier->id,
                'downgrade_to_tier_id' => null,
                'downgrade_at' => null,
                'downgrade_reason' => null,
                'starts_at' => now(),
                'ends_at' => $isFree ? null : now()->addMonth(),
                'status' => 'ACTIVE',
            ]);

            // Create in-app notification
            try {
                Notification::create([
                    'user_id' => $this->user_id,
                    'type' => 'MEMBERSHIP_DOWNGRADE_EFFECTIVE',
                    'title' => "Paket Anda Kini Telah Beralih ke {$newTier->name}",
                    'body' => "Sesuai jadwal yang ditentukan, paket langganan Anda kini telah beralih ke {$newTier->name}. Manfaat dan kuota telah disesuaikan dengan tingkatan baru.",
                    'data' => [
                        'category' => 'system',
                        'tier_name' => $newTier->name,
                        'tier_slug' => $newTier->slug,
                        'previous_tier' => $oldTier?->name,
                        'action_url' => '/paket',
                    ],
                    'read_at' => null,
                    'delivered_at' => now(),
                ]);

                AuditLog::log(
                    $this->user_id,
                    'system',
                    'membership.downgrade_executed',
                    'Membership',
                    (string) $this->id,
                    [
                        'from_tier' => $oldTier?->name,
                        'to_tier' => $newTier->name,
                    ]
                );
            } catch (\Throwable $e) {
                Log::error('Failed to notify user on downgrade execution: ' . $e->getMessage());
            }

            return true;
        }

        return false;
    }
}
