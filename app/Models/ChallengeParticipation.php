<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ChallengeParticipation extends Model
{
    protected $fillable = [
        'challenge_id',
        'user_id',
        'status',
        'progress_percent',
        'joined_at',
        'started_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'progress_percent' => 'decimal:2',
            'joined_at' => 'datetime',
            'started_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function challenge(): BelongsTo
    {
        return $this->belongsTo(Challenge::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function completedTasks(): BelongsToMany
    {
        return $this->belongsToMany(ChallengeTask::class, 'challenge_task_completions', 'participation_id', 'challenge_task_id')
            ->withPivot('completed_at')
            ->withTimestamps();
    }
}
