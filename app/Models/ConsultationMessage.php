<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConsultationMessage extends Model
{
    protected $fillable = [
        'consultation_id',
        'sender_id',
        'sender_role',
        'message',
        'metric_payload',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'metric_payload' => 'array',
            'is_read' => 'boolean',
        ];
    }

    public function consultation(): BelongsTo
    {
        return $this->belongsTo(Consultation::class, 'consultation_id');
    }

    public function sender(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
