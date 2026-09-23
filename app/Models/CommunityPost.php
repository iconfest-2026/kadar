<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class CommunityPost extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'body',
        'visibility',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(CommunityComment::class, 'post_id')->latest();
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(CommunityReaction::class, 'reactable_id')
            ->where('reactable_type', self::class);
    }
}
