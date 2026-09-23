<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InstructorProfile extends Model
{
    protected $fillable = [
        'user_id',
        'str_number',
        'sip_number',
        'specialization',
        'institution',
        'years_of_experience',
        'document_proof_path',
        'bio',
        'is_verified',
        'verified_at',
        'verified_by',
        'rejection_reason',
        'is_recommended',
        'max_member_capacity',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'is_recommended' => 'boolean',
            'verified_at' => 'datetime',
            'years_of_experience' => 'integer',
            'max_member_capacity' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function verifiedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}

