<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArcadeScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_type',
        'character_name',
        'score',
        'tir',
        'distance',
        'peak_glucose',
        'played_at',
    ];

    protected $casts = [
        'score' => 'integer',
        'distance' => 'integer',
        'peak_glucose' => 'integer',
        'played_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
