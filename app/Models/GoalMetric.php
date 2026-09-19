<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GoalMetric extends Model
{
    protected $fillable = [
        'goal_id',
        'metric_type',
        'target_value',
        'unit',
        'priority',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'decimal:2',
            'priority' => 'integer',
        ];
    }

    public function goal(): BelongsTo
    {
        return $this->belongsTo(Goal::class);
    }
}
