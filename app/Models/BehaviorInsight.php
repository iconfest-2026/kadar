<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BehaviorInsight extends Model
{
    protected $fillable = [
        'user_id',
        'behavior_signal_id',
        'title',
        'observation',
        'context',
        'why_it_matters',
        'baseline_value',
        'current_value',
        'difference_value',
        'data_points_count',
        'status',
        'generated_by',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'data_points_count' => 'integer',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function signal(): BelongsTo
    {
        return $this->belongsTo(BehaviorSignal::class, 'behavior_signal_id');
    }

    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class, 'insight_id');
    }
}
