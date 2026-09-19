<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChallengeTask extends Model
{
    protected $fillable = [
        'challenge_id',
        'title',
        'description',
        'type',
        'target_value',
        'target_unit',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'target_value' => 'decimal:2',
            'sort_order' => 'integer',
        ];
    }

    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }
}
