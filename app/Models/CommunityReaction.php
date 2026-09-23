<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommunityReaction extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'reactable_type',
        'reactable_id',
        'reaction_type',
        'created_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
