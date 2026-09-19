<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BehaviorSignal extends Model
{
    protected $fillable = [
        'user_id',
        'metric_type',
        'signal_type',
        'severity',
        'status',
        'detected_at',
        'observation_start',
        'observation_end',
        'baseline_id',
        'rule_version',
        'evidence_quality',
        'priority_score',
        'resolved_at',
    ];

    protected function casts(): array
    {
        return [
            'detected_at' => 'datetime',
            'observation_start' => 'datetime',
            'observation_end' => 'datetime',
            'evidence_quality' => 'decimal:2',
            'priority_score' => 'decimal:2',
            'resolved_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function baseline(): BelongsTo
    {
        return $this->belongsTo(HealthBaseline::class, 'baseline_id');
    }

    public function records(): BelongsToMany
    {
        return $this->belongsToMany(HealthRecord::class, 'behavior_signal_records', 'signal_id', 'health_record_id');
    }

    public function insights(): HasMany
    {
        return $this->hasMany(BehaviorInsight::class, 'behavior_signal_id');
    }
}
