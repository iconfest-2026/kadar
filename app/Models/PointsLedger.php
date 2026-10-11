<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PointsLedger extends Model
{
    public $timestamps = false;
    protected $table = 'points_ledger';

    protected $fillable = [
        'user_id',
        'event_type',
        'points',
        'reference_type',
        'reference_id',
        'created_at',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->event_type)) {
                $model->event_type = 'GENERAL_ACTIVITY';
            }
            if (empty($model->created_at)) {
                $model->created_at = now();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'points' => 'integer',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
