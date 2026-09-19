<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->text('description');
            $table->string('status', 30)->default('ACTIVE'); // DRAFT, ACTIVE, PAUSED, COMPLETED, ARCHIVED
            $table->date('starts_at');
            $table->date('ends_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('program_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status', 30)->default('ACTIVE'); // ENROLLED, ACTIVE, COMPLETED
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamp('left_at')->nullable();
            $table->timestamps();

            $table->unique(['program_id', 'user_id']);
        });

        Schema::create('program_instructors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained('programs')->cascadeOnDelete();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->string('role', 50)->default('LEAD_INSTRUCTOR');
            $table->timestamps();
        });

        Schema::create('instructor_availabilities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedTinyInteger('day_of_week'); // 0=Sunday, 6=Saturday
            $table->time('start_time');
            $table->time('end_time');
            $table->string('timezone', 50)->default('Asia/Jakarta');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('instructor_availability_exceptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->date('date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('type', 30)->default('BLOCKED_SLOT'); // HOLIDAY, LEAVE, BLOCKED_SLOT, EXTRA
            $table->string('reason', 255)->nullable();
            $table->timestamps();
        });

        Schema::create('instructor_member_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('member_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->string('status', 30)->default('ACTIVE'); // PENDING, ACTIVE, PAUSED, ENDED, REVOKED
            $table->timestamp('starts_at')->useCurrent();
            $table->timestamp('ends_at')->nullable();
            $table->foreignId('assigned_by')->constrained('users');
            $table->timestamps();

            $table->index(['instructor_id', 'status'], 'idx_assignments_active');
            $table->index(['member_id', 'status']);
        });

        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('goal_id')->nullable()->constrained('goals')->nullOnDelete();
            $table->foreignId('behavior_signal_id')->nullable()->constrained('behavior_signals')->nullOnDelete();
            $table->string('type', 50); // HABIT_CHANGE, NUTRITION_PLAN, SLEEP_ROUTINE, EXERCISE_PLAN
            $table->string('title', 200);
            $table->text('description');
            $table->string('status', 30)->default('ACTIVE'); // DRAFT, ACTIVE, IN_REVIEW, RESOLVED, CANCELLED
            $table->timestamp('start_at');
            $table->timestamp('due_at');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'instructor_id', 'status']);
        });

        Schema::create('intervention_outcomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('intervention_id')->unique()->constrained('interventions')->cascadeOnDelete();
            $table->string('status', 30)->default('FINAL'); // DRAFT, FINAL
            $table->timestamp('observation_start');
            $table->timestamp('observation_end');
            $table->string('result_type', 30); // IMPROVING, STABLE, UNCHANGED, DECLINING, INSUFFICIENT_DATA
            $table->text('summary');
            $table->foreignId('evaluated_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('behavior_outcomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('intervention_id')->nullable()->constrained('interventions')->nullOnDelete();
            $table->string('metric_type', 50);
            $table->decimal('before_value', 12, 4);
            $table->decimal('after_value', 12, 4);
            $table->unsignedInteger('before_window')->default(7);
            $table->unsignedInteger('after_window')->default(7);
            $table->string('outcome_type', 30);
            $table->timestamp('evaluated_at')->useCurrent();
        });

        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('instructor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->string('status', 30)->default('REQUESTED'); // REQUESTED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED, NO_SHOW
            $table->timestamp('scheduled_start');
            $table->timestamp('scheduled_end');
            $table->string('purpose', 255);
            $table->string('meeting_url', 255)->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['instructor_id', 'scheduled_start']);
            $table->index(['member_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
        Schema::dropIfExists('behavior_outcomes');
        Schema::dropIfExists('intervention_outcomes');
        Schema::dropIfExists('interventions');
        Schema::dropIfExists('instructor_member_assignments');
        Schema::dropIfExists('instructor_availability_exceptions');
        Schema::dropIfExists('instructor_availabilities');
        Schema::dropIfExists('program_instructors');
        Schema::dropIfExists('program_members');
        Schema::dropIfExists('programs');
    }
};
