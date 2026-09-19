<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Intervention extends Model
{
    protected $fillable = [
        'user_id',
        'instructor_id',
        'created_by',
        'goal_id',
        'behavior_signal_id',
        'type',
        'title',
        'description',
        'status',
        'start_at',
        'due_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'start_at' => 'datetime',
            'due_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function goal(): BelongsTo
    {
        return $this->belongsTo(Goal::class);
    }

    public function signal(): BelongsTo
    {
        return $this->belongsTo(BehaviorSignal::class, 'behavior_signal_id');
    }

    public function outcome(): HasOne
    {
        return $this->hasOne(InterventionOutcome::class);
    }
}
