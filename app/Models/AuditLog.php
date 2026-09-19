<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'actor_id',
        'actor_role',
        'action',
        'target_type',
        'target_id',
        'context',
        'result',
        'request_id',
        'ip_reference',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'context' => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public static function log(
        ?int $actorId,
        string $actorRole,
        string $action,
        ?string $targetType = null,
        ?string $targetId = null,
        ?array $context = null,
        string $result = 'ALLOWED'
    ): self {
        return self::create([
            'actor_id' => $actorId,
            'actor_role' => $actorRole,
            'action' => $action,
            'target_type' => $targetType,
            'target_id' => $targetId,
            'context' => $context,
            'result' => $result,
            'request_id' => request()?->header('X-Request-ID'),
            'ip_reference' => request()?->ip() ? hash('sha256', request()->ip()) : null,
            'created_at' => now(),
        ]);
    }
}
