<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MembershipPayment extends Model
{
    protected $fillable = [
        'user_id',
        'tier_id',
        'order_id',
        'base_amount',
        'admin_fee',
        'gross_amount',
        'currency',
        'payment_type',
        'snap_token',
        'snap_redirect_url',
        'status',
        'midtrans_response',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'base_amount' => 'decimal:2',
            'admin_fee' => 'decimal:2',
            'gross_amount' => 'decimal:2',
            'midtrans_response' => 'array',
            'paid_at' => 'datetime',
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
}
