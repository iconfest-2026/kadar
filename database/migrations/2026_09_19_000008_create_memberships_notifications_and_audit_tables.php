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
        Schema::create('membership_tiers', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('slug', 50)->unique();
            $table->text('description');
            $table->decimal('price', 12, 2)->default(0.00);
            $table->string('currency', 3)->default('IDR');
            $table->string('billing_interval', 20)->default('MONTHLY');
            $table->string('status', 30)->default('ACTIVE');
            $table->timestamps();
        });

        Schema::create('membership_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('membership_tier_id')->constrained('membership_tiers')->cascadeOnDelete();
            $table->string('feature_key', 100);
            $table->integer('limit_value')->default(-1); // -1 = Unlimited
            $table->json('configuration')->nullable();
            $table->timestamps();
        });

        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('tier_id')->constrained('membership_tiers')->cascadeOnDelete();
            $table->string('status', 30)->default('ACTIVE'); // PENDING, ACTIVE, PAUSED, EXPIRED, CANCELLED
            $table->timestamp('starts_at')->useCurrent();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });

        Schema::create('ai_conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('context_type', 50)->nullable(); // GLUCOSE_SPIKE, SLEEP_DECLINE, MEAL
            $table->string('context_id', 100)->nullable();
            $table->string('status', 30)->default('ACTIVE'); // ACTIVE, ARCHIVED, ESCALATED
            $table->string('title', 200)->default('Percakapan Kesehatan');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('ai_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->cascadeOnDelete();
            $table->string('role', 20); // SYSTEM, USER, ASSISTANT, TOOL
            $table->text('content');
            $table->string('message_type', 30)->default('TEXT'); // TEXT, TOOL_CALL, TOOL_RESULT, ERROR
            $table->string('model', 100)->default('gemini-2.5-flash');
            $table->string('provider', 50)->default('google');
            $table->string('prompt_version', 20)->default('v1.0');
            $table->timestamps();
        });

        Schema::create('ai_tool_executions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->cascadeOnDelete();
            $table->foreignId('message_id')->nullable()->constrained('ai_messages')->nullOnDelete();
            $table->string('tool_name', 100);
            $table->char('input_hash', 64);
            $table->string('status', 30)->default('EXECUTED'); // AUTHORIZED, EXECUTED, BLOCKED, ERROR
            $table->string('auth_result', 50)->default('AUTHORIZED');
            $table->string('result_reference', 100)->nullable();
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
        });

        Schema::create('ai_safety_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->cascadeOnDelete();
            $table->foreignId('message_id')->nullable()->constrained('ai_messages')->nullOnDelete();
            $table->string('classification', 50); // DIAGNOSIS_REQUEST, MEDICATION_REQUEST, PROMPT_INJECTION, EMERGENCY_SENSITIVE
            $table->string('reason_code', 100);
            $table->string('action_taken', 100);
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('ai_handoffs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('ai_conversations')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('reason', 100);
            $table->string('status', 30)->default('PENDING'); // PENDING, ASSIGNED, RESOLVED
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 150);
            $table->string('title', 200);
            $table->text('body');
            $table->json('data')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'read_at']);
        });

        Schema::create('notification_preferences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('category', 50); // REMINDERS, SIGNALS, COMMUNITY, SYSTEM
            $table->string('channel', 30)->default('IN_APP'); // PUSH, IN_APP, EMAIL
            $table->boolean('enabled')->default(true);
            $table->time('quiet_hours_start')->nullable();
            $table->time('quiet_hours_end')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'category', 'channel']);
        });

        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 50); // MEAL_LOG, HYDRATION, POST_MEAL_WALK, SLEEP_PREP
            $table->string('title', 150);
            $table->string('description', 255)->nullable();
            $table->time('scheduled_at');
            $table->string('timezone', 50)->default('Asia/Jakarta');
            $table->string('status', 30)->default('ACTIVE');
            $table->timestamps();
        });

        Schema::create('emergency_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 50)->default('PANIC_BUTTON'); // PANIC_BUTTON, HYPO_CRISIS, CHEST_PAIN
            $table->string('loc_perm_status', 30)->default('DENIED');
            $table->string('loc_reference', 100)->nullable(); // Nearest verified clinic / hospital name
            $table->string('action_taken', 100)->default('DIAL_119'); // DIAL_119, DIAL_112
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('consent_type', 50); // PRIVACY_POLICY, HEALTH_DATA_PROCESSING, AI_PERSONALIZATION, INSTRUCTOR_DATA_SHARING
            $table->string('version', 20)->default('1.0.0');
            $table->string('status', 30)->default('GRANTED'); // GRANTED, WITHDRAWN, EXPIRED
            $table->timestamp('granted_at')->useCurrent();
            $table->timestamp('withdrawn_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'consent_type'], 'idx_user_consent_unique');
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actor_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('actor_role', 50)->default('member');
            $table->string('action', 100); // e.g. member.health_summary.viewed
            $table->string('target_type', 100)->nullable();
            $table->string('target_id', 100)->nullable();
            $table->json('context')->nullable();
            $table->string('result', 20)->default('ALLOWED');
            $table->uuid('request_id')->nullable();
            $table->string('ip_reference', 64)->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['actor_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('consents');
        Schema::dropIfExists('emergency_events');
        Schema::dropIfExists('reminders');
        Schema::dropIfExists('notification_preferences');
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('ai_handoffs');
        Schema::dropIfExists('ai_safety_events');
        Schema::dropIfExists('ai_tool_executions');
        Schema::dropIfExists('ai_messages');
        Schema::dropIfExists('ai_conversations');
        Schema::dropIfExists('memberships');
        Schema::dropIfExists('membership_features');
        Schema::dropIfExists('membership_tiers');
    }
};
