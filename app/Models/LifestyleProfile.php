<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LifestyleProfile extends Model
{
    protected $fillable = [
        'user_id',
        'work_pattern',
        'typical_sleep_bed',
        'typical_sleep_wake',
        'meal_pattern',
        'dietary_pref',
    ];

    protected function casts(): array
    {
        return [
            'dietary_pref' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
