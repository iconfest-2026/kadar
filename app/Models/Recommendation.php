<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recommendation extends Model
{
    protected $fillable = [
        'user_id',
        'insight_id',
        'type',
        'title',
        'description',
        'difficulty_level',
        'status',
        'priority',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'priority' => 'integer',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function insight(): BelongsTo
    {
        return $this->belongsTo(BehaviorInsight::class, 'insight_id');
    }
}
