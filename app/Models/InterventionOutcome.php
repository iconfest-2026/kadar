<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InterventionOutcome extends Model
{
    protected $fillable = [
        'intervention_id',
        'status',
        'observation_start',
        'observation_end',
        'result_type',
        'summary',
        'evaluated_by',
    ];

    protected function casts(): array
    {
        return [
            'observation_start' => 'datetime',
            'observation_end' => 'datetime',
        ];
    }

    public function intervention(): BelongsTo
    {
        return $this->belongsTo(Intervention::class);
    }

    public function evaluator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'evaluated_by');
    }
}
