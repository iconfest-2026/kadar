<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MenstrualLog extends Model
{
    protected $fillable = [
        'user_id',
        'log_date',
        'flow_level',
        'pain_level',
        'mood',
        'symptoms',
        'glycemic_note',
        'notes',
    ];

    protected $casts = [
        'log_date' => 'date',
        'pain_level' => 'integer',
        'symptoms' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
