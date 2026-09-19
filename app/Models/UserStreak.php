<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserStreak extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'current_count',
        'best_count',
        'started_at',
        'last_activity_at',
    ];

    protected function casts(): array
    {
        return [
            'current_count' => 'integer',
            'best_count' => 'integer',
            'started_at' => 'date',
            'last_activity_at' => 'date',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
