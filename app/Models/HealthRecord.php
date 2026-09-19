<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class HealthRecord extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'metric_type',
        'value_numeric',
        'value_text',
        'unit',
        'recorded_at',
        'source',
        'source_reference',
        'quality_status',
        'confidence_score',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'value_numeric' => 'decimal:4',
            'confidence_score' => 'decimal:2',
            'recorded_at' => 'datetime',
            'metadata' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function audits(): HasMany
    {
        return $this->hasMany(HealthRecordAudit::class);
    }
}
