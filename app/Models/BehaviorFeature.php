<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BehaviorFeature extends Model
{
    protected $fillable = [
        'user_id',
        'metric_type',
        'feature_type',
        'value_numeric',
        'period_start',
        'period_end',
        'source_version',
    ];

    protected function casts(): array
    {
        return [
            'value_numeric' => 'decimal:4',
            'period_start' => 'datetime',
            'period_end' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
