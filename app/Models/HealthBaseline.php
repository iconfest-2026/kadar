<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HealthBaseline extends Model
{
    protected $fillable = [
        'user_id',
        'metric_type',
        'window_start',
        'window_end',
        'sample_count',
        'value_primary',
        'value_secondary',
        'method',
        'status',
        'rule_version',
        'is_active',
        'generated_at',
    ];

    protected function casts(): array
    {
        return [
            'window_start' => 'date',
            'window_end' => 'date',
            'sample_count' => 'integer',
            'value_primary' => 'decimal:4',
            'value_secondary' => 'decimal:4',
            'is_active' => 'boolean',
            'generated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function signals(): HasMany
    {
        return $this->hasMany(BehaviorSignal::class, 'baseline_id');
    }
}
