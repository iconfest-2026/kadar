<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MembershipTier extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'features',
        'price',
        'admin_fee',
        'admin_fee_type',
        'currency',
        'billing_interval',
        'status',
        'badge_text',
        'is_popular',
        'max_consultations',
        'max_scanner',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'admin_fee' => 'decimal:2',
            'features' => 'array',
            'is_popular' => 'boolean',
            'max_consultations' => 'integer',
            'max_scanner' => 'integer',
        ];
    }

    protected $appends = ['total_price', 'calculated_admin_fee'];

    public function getCalculatedAdminFeeAttribute(): float
    {
        $base = (float) $this->price;
        if ($base <= 0) {
            return 0.00;
        }

        if ($this->admin_fee_type === 'PERCENTAGE') {
            return round($base * ((float) $this->admin_fee / 100), 2);
        }

        return (float) ($this->admin_fee ?? 4000.00);
    }

    public function getTotalPriceAttribute(): float
    {
        $base = (float) $this->price;
        if ($base <= 0) {
            return 0.00;
        }

        return round($base + $this->calculated_admin_fee, 2);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class, 'tier_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(MembershipPayment::class, 'tier_id');
    }

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('id', $value)->orWhere('slug', $value)->firstOrFail();
    }
}
