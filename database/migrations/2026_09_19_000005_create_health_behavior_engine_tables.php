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
        Schema::create('health_baselines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('metric_type', 50);
            $table->date('window_start');
            $table->date('window_end');
            $table->unsignedInteger('sample_count')->default(0);
            $table->decimal('value_primary', 12, 4); // Mean / Median
            $table->decimal('value_secondary', 12, 4)->nullable(); // Std dev / IQR
            $table->string('method', 30)->default('rolling_mean_iqr');
            $table->string('status', 30)->default('COLLECTING'); // NOT_STARTED, COLLECTING, INSUFFICIENT_DATA, AVAILABLE, STALE
            $table->string('rule_version', 20)->default('v1.0');
            $table->boolean('is_active')->default(true);
            $table->timestamp('generated_at')->useCurrent();
            $table->timestamps();

            $table->index(['user_id', 'metric_type', 'is_active']);
        });

        Schema::create('behavior_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('metric_type', 50);
            $table->string('feature_type', 50); // AVERAGE, VARIABILITY, CONSISTENCY, TREND, DEVIATION, STREAK
            $table->decimal('value_numeric', 12, 4);
            $table->dateTime('period_start');
            $table->dateTime('period_end');
            $table->string('source_version', 20)->default('v1.0');
            $table->timestamps();

            $table->index(['user_id', 'metric_type', 'feature_type']);
        });

        Schema::create('behavior_signals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('metric_type', 50);
            $table->string('signal_type', 100); // SLEEP_DECLINE, ACTIVITY_DROP, etc.
            $table->string('severity', 30)->default('NOTICE'); // INFO, NOTICE, ATTENTION, FOLLOW_UP
            $table->string('status', 30)->default('QUALIFIED'); // DETECTED, QUALIFIED, PRESENTED, ACTED_ON, RESOLVED, DISMISSED
            $table->timestamp('detected_at');
            $table->timestamp('observation_start')->nullable();
            $table->timestamp('observation_end')->nullable();
            $table->foreignId('baseline_id')->nullable()->constrained('health_baselines')->nullOnDelete();
            $table->string('rule_version', 20)->default('v1.0');
            $table->decimal('evidence_quality', 5, 2)->default(100.00);
            $table->decimal('priority_score', 6, 2)->default(50.00);
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status', 'detected_at'], 'idx_behavior_signals_active');
        });

        Schema::create('behavior_signal_records', function (Blueprint $table) {
            $table->foreignId('signal_id')->constrained('behavior_signals')->cascadeOnDelete();
            $table->foreignId('health_record_id')->constrained('health_records')->cascadeOnDelete();
            $table->primary(['signal_id', 'health_record_id']);
        });

        Schema::create('behavior_insights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('behavior_signal_id')->nullable()->constrained('behavior_signals')->nullOnDelete();
            $table->string('title', 200);
            $table->text('observation');
            $table->text('context')->nullable();
            $table->text('why_it_matters');
            $table->string('baseline_value', 100)->nullable();
            $table->string('current_value', 100)->nullable();
            $table->string('difference_value', 100)->nullable();
            $table->integer('data_points_count')->default(0);
            $table->string('status', 30)->default('ACTIVE'); // ACTIVE, VIEWED, DISMISSED, EXPIRED, SUPERSEDED
            $table->string('generated_by', 30)->default('ENGINE'); // ENGINE, AI, HUMAN
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });

        Schema::create('recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('insight_id')->nullable()->constrained('behavior_insights')->nullOnDelete();
            $table->string('type', 50)->default('HABIT'); // HABIT, CHALLENGE, REMINDER, CONSULTATION
            $table->string('title', 200);
            $table->text('description');
            $table->string('difficulty_level', 20)->default('EASY');
            $table->string('status', 30)->default('RECOMMENDED'); // RECOMMENDED, ACCEPTED, STARTED, COMPLETED, DISMISSED
            $table->smallInteger('priority')->default(1);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendations');
        Schema::dropIfExists('behavior_insights');
        Schema::dropIfExists('behavior_signal_records');
        Schema::dropIfExists('behavior_signals');
        Schema::dropIfExists('behavior_features');
        Schema::dropIfExists('health_baselines');
    }
};
