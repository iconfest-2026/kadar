<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'google_id',
        'avatar_url',
        'email_verified_at',
        'password',
        'status',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'model_has_roles', 'user_id', 'role_id');
    }

    public function hasRole(string|array $roles): bool
    {
        $roleList = is_array($roles) ? $roles : func_get_args();
        return $this->roles->pluck('slug')->intersect($roleList)->isNotEmpty();
    }

    public function assignRole(string|Role $role): void
    {
        $roleModel = is_string($role) ? Role::where('slug', $role)->firstOrFail() : $role;
        $this->roles()->syncWithoutDetaching([$roleModel->id]);
    }

    public function memberProfile(): HasOne
    {
        return $this->hasOne(MemberProfile::class);
    }

    public function lifestyleProfile(): HasOne
    {
        return $this->hasOne(LifestyleProfile::class);
    }

    public function instructorProfile(): HasOne
    {
        return $this->hasOne(InstructorProfile::class);
    }

    public function isVerifiedInstructor(): bool
    {
        return $this->hasRole('instructor') &&
            $this->status === 'ACTIVE' &&
            ($this->instructorProfile?->is_verified ?? false);
    }

    public function goals(): HasMany
    {
        return $this->hasMany(Goal::class);
    }

    public function healthRecords(): HasMany
    {
        return $this->hasMany(HealthRecord::class);
    }

    public function healthBaselines(): HasMany
    {
        return $this->hasMany(HealthBaseline::class);
    }

    public function behaviorSignals(): HasMany
    {
        return $this->hasMany(BehaviorSignal::class);
    }

    public function behaviorInsights(): HasMany
    {
        return $this->hasMany(BehaviorInsight::class);
    }

    public function recommendations(): HasMany
    {
        return $this->hasMany(Recommendation::class);
    }

    public function interventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'user_id');
    }

    public function assignedInterventions(): HasMany
    {
        return $this->hasMany(Intervention::class, 'instructor_id');
    }

    public function consultationsAsMember(): HasMany
    {
        return $this->hasMany(Consultation::class, 'member_id');
    }

    public function consultationsAsInstructor(): HasMany
    {
        return $this->hasMany(Consultation::class, 'instructor_id');
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function latestMembership(): HasOne
    {
        return $this->hasOne(Membership::class)->latestOfMany();
    }

    public function activeMembership(): HasOne
    {
        return $this->hasOne(Membership::class)->where('status', 'ACTIVE')->latestOfMany();
    }

    public function membershipPayments(): HasMany
    {
        return $this->hasMany(MembershipPayment::class);
    }

    public function streaks(): HasMany
    {
        return $this->hasMany(UserStreak::class);
    }

    public function pointsLedger(): HasMany
    {
        return $this->hasMany(PointsLedger::class);
    }

    public function achievements(): BelongsToMany
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')->withPivot('earned_at');
    }

    public function consents(): HasMany
    {
        return $this->hasMany(Consent::class);
    }

    public function communityPosts(): HasMany
    {
        return $this->hasMany(CommunityPost::class);
    }

    public function communityComments(): HasMany
    {
        return $this->hasMany(CommunityComment::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class)->latest();
    }

    public function unreadNotifications(): HasMany
    {
        return $this->hasMany(Notification::class)->whereNull('read_at')->latest();
    }

    /**
     * Active assignments from this member to their chosen instructors
     */
    public function instructorAssignments(): HasMany
    {
        return $this->hasMany(InstructorMemberAssignment::class, 'member_id');
    }

    public function activeInstructorAssignments(): HasMany
    {
        return $this->hasMany(InstructorMemberAssignment::class, 'member_id')->where('status', 'ACTIVE');
    }

    /**
     * Instructors currently assigned to this member
     */
    public function assignedInstructors(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'instructor_member_assignments', 'member_id', 'instructor_id')
            ->wherePivot('status', 'ACTIVE')
            ->withPivot(['id', 'status', 'starts_at', 'program_id', 'assigned_by'])
            ->withTimestamps();
    }

    /**
     * Members assigned to this instructor
     */
    public function assignedMembers(): HasMany
    {
        return $this->hasMany(InstructorMemberAssignment::class, 'instructor_id');
    }

    public function activeAssignedMembers(): HasMany
    {
        return $this->hasMany(InstructorMemberAssignment::class, 'instructor_id')->where('status', 'ACTIVE');
    }

    public function activeInstructorCount(): int
    {
        return $this->activeInstructorAssignments()->count();
    }

    public function canAssignMoreInstructors(): bool
    {
        $maxLimit = (int) SystemSetting::get('max_instructors_per_member', 3);
        return $this->activeInstructorCount() < $maxLimit;
    }

    public function menstrualSetting(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(MenstrualSetting::class);
    }

    public function menstrualLogs(): HasMany
    {
        return $this->hasMany(MenstrualLog::class)->orderBy('log_date', 'desc');
    }

    public function totalPoints(): int
    {
        return (int) $this->pointsLedger()->sum('points');
    }

    public function arcadeScores(): HasMany
    {
        return $this->hasMany(ArcadeScore::class);
    }

    public function bestArcadeScore(): HasOne
    {
        return $this->hasOne(ArcadeScore::class)->ofMany('score', 'max');
    }

    /**
     * Active membership tier model for this user.
     */
    public function activeTier(): ?MembershipTier
    {
        return $this->activeMembership?->tier;
    }

    /**
     * Active tier slug (e.g. 'free', 'gold', 'platinum').
     */
    public function getTierSlug(): string
    {
        return strtolower($this->activeTier()?->slug ?? 'free');
    }

    /**
     * Active tier display name.
     */
    public function getTierName(): string
    {
        return $this->activeTier()?->name ?? 'Gratis (Basic)';
    }

    /**
     * Check if user is on any paid active membership tier.
     */
    public function isPremium(): bool
    {
        $tier = $this->activeTier();
        return $tier && (float) $tier->price > 0;
    }

    /**
     * Check if user has Platinum VIP tier.
     */
    public function isPlatinum(): bool
    {
        $slug = $this->getTierSlug();
        return $slug === 'platinum' || ($this->activeTier()?->price >= 140000);
    }

    /**
     * Get maximum consultation quota per month (-1 for unlimited, 0 for none).
     */
    public function maxConsultations(): int
    {
        return (int) ($this->activeTier()?->max_consultations ?? 0);
    }

    /**
     * Get maximum scanner quota per day (-1 for unlimited, default 10).
     */
    public function maxDailyScans(): int
    {
        return (int) ($this->activeTier()?->max_scanner ?? 10);
    }

    /**
     * Check if user tier has a specific feature by keyword.
     */
    public function hasFeature(string $keyword): bool
    {
        $features = $this->activeTier()?->features ?? [];
        if (!is_array($features) || empty($features)) {
            return false;
        }

        $kw = strtolower($keyword);
        foreach ($features as $feat) {
            if (str_contains(strtolower((string) $feat), $kw)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if member is currently eligible to book a teleconsultation.
     */
    public function canBookConsultation(): bool
    {
        return app(\App\Services\Membership\ConsultationQuotaService::class)->canMemberBook($this);
    }

    /**
     * Check if member has remaining scans available today.
     */
    public function canScanFoodToday(): bool
    {
        $limit = $this->maxDailyScans();
        if ($limit === -1) {
            return true;
        }

        $todayScans = HealthRecord::where('user_id', $this->id)
            ->where('source', 'SCANNER')
            ->whereDate('recorded_at', \Carbon\Carbon::today())
            ->count();

        return $todayScans < $limit;
    }
}

