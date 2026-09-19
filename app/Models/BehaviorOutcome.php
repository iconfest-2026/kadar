<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BehaviorOutcome extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'intervention_id',
        'metric_type',
        'before_value',
        'after_value',
        'before_window',
        'after_window',
        'outcome_type',
        'evaluated_at',
    ];

    protected function casts(): array
    {
        return [
            'before_value' => 'decimal:4',
            'after_value' => 'decimal:4',
            'before_window' => 'integer',
            'after_window' => 'integer',
            'evaluated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function intervention(): BelongsTo
    {
        return $this->belongsTo(Intervention::class);
    }
}
