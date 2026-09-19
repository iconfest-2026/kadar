<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Achievement extends Model
{
    protected $fillable = [
        'key',
        'name',
        'description',
        'category',
        'icon_path',
        'rules_config',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'rules_config' => 'array',
        ];
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_achievements')->withPivot('earned_at');
    }
}
