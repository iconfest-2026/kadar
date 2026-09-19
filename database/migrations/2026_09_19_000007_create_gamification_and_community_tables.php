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
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->nullable()->constrained('programs')->nullOnDelete();
            $table->string('name', 150);
            $table->string('slug', 150)->unique();
            $table->text('description');
            $table->string('goal_type', 50); // NUTRITION, STEPS, SLEEP, HYDRATION
            $table->unsignedSmallInteger('duration_days')->default(7);
            $table->unsignedInteger('points_reward')->default(50);
            $table->string('status', 30)->default('ACTIVE'); // DRAFT, ACTIVE, COMPLETED, ARCHIVED
            $table->timestamp('starts_at')->useCurrent();
            $table->timestamp('ends_at')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
        });

        Schema::create('challenge_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained('challenges')->cascadeOnDelete();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('type', 50); // LOG_MEAL, STEPS_TARGET, SLEEP_CHECK, HYDRATION_CHECK
            $table->decimal('target_value', 10, 2);
            $table->string('target_unit', 30);
            $table->smallInteger('sort_order')->default(1);
            $table->timestamps();
        });

        Schema::create('challenge_participations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained('challenges')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status', 30)->default('ENROLLED'); // ENROLLED, IN_PROGRESS, COMPLETED
            $table->decimal('progress_percent', 5, 2)->default(0.00);
            $table->timestamp('joined_at')->useCurrent();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['challenge_id', 'user_id']);
        });

        Schema::create('challenge_task_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participation_id')->constrained('challenge_participations')->cascadeOnDelete();
            $table->foreignId('challenge_task_id')->constrained('challenge_tasks')->cascadeOnDelete();
            $table->timestamp('completed_at')->useCurrent();
            $table->string('evidence_reference', 100)->nullable();
            $table->timestamps();

            $table->unique(['participation_id', 'challenge_task_id'], 'idx_task_comp_unique');
        });

        Schema::create('points_ledger', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('event_type', 50); // CHALLENGE_REWARD, STREAK_BONUS, QUICK_LOG
            $table->integer('points');
            $table->string('reference_type', 100)->nullable();
            $table->string('reference_id', 100)->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['user_id', 'created_at']);
        });

        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->string('name', 150);
            $table->string('description', 255);
            $table->string('category', 50)->default('CONSISTENCY');
            $table->string('icon_path', 255)->nullable();
            $table->json('rules_config')->nullable();
            $table->string('status', 30)->default('ACTIVE');
            $table->timestamps();
        });

        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('achievement_id')->constrained('achievements')->cascadeOnDelete();
            $table->timestamp('earned_at')->useCurrent();
            $table->string('reference_type', 100)->nullable();
            $table->string('reference_id', 100)->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'achievement_id']);
        });

        Schema::create('user_streaks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 50)->default('DAILY_LOGGING');
            $table->unsignedInteger('current_count')->default(0);
            $table->unsignedInteger('best_count')->default(0);
            $table->date('started_at')->nullable();
            $table->date('last_activity_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'type']);
        });

        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('title', 200);
            $table->text('body');
            $table->string('visibility', 30)->default('PUBLIC'); // PUBLIC, COMMUNITY, PROGRAM, PRIVATE
            $table->string('status', 30)->default('PUBLISHED'); // PUBLISHED, UNDER_REVIEW, HIDDEN
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('community_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')->constrained('community_posts')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('body');
            $table->string('status', 30)->default('PUBLISHED');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('community_reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('reactable_type', 100);
            $table->unsignedBigInteger('reactable_id');
            $table->string('reaction_type', 30)->default('LIKE'); // LIKE, SUPPORT, CELEBRATE, EMPATHY
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['user_id', 'reactable_type', 'reactable_id'], 'idx_user_reaction_unique');
        });

        Schema::create('community_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reporter_id')->constrained('users')->cascadeOnDelete();
            $table->string('target_type', 100);
            $table->unsignedBigInteger('target_id');
            $table->string('reason', 50); // SPAM, MEDICAL_MISINFO, HATE
            $table->text('description')->nullable();
            $table->string('status', 30)->default('PENDING'); // PENDING, INVESTIGATING, RESOLVED
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->string('resolution', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('moderation_actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('moderator_id')->constrained('users')->cascadeOnDelete();
            $table->string('target_type', 100);
            $table->unsignedBigInteger('target_id');
            $table->string('action', 50); // HIDE_POST, DELETE_POST, BAN_USER
            $table->text('reason');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moderation_actions');
        Schema::dropIfExists('community_reports');
        Schema::dropIfExists('community_reactions');
        Schema::dropIfExists('community_comments');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('user_streaks');
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('points_ledger');
        Schema::dropIfExists('challenge_task_completions');
        Schema::dropIfExists('challenge_participations');
        Schema::dropIfExists('challenge_tasks');
        Schema::dropIfExists('challenges');
    }
};
