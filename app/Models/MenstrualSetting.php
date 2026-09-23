<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenstrualSetting extends Model
{
    protected $fillable = [
        'user_id',
        'average_cycle_days',
        'average_period_days',
        'last_period_date',
        'contraceptive_type',
    ];

    protected $casts = [
        'average_cycle_days' => 'integer',
        'average_period_days' => 'integer',
        'last_period_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
