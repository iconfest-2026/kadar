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
        Schema::create('menstrual_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->unsignedSmallInteger('average_cycle_days')->default(28);
            $table->unsignedSmallInteger('average_period_days')->default(5);
            $table->date('last_period_date')->nullable();
            $table->string('contraceptive_type', 50)->nullable();
            $table->timestamps();
        });

        Schema::create('menstrual_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->date('log_date');
            $table->string('flow_level', 20)->default('MEDIUM'); // NONE, LIGHT, MEDIUM, HEAVY, SPOTTING
            $table->unsignedTinyInteger('pain_level')->default(0); // 0-5
            $table->string('mood', 50)->nullable(); // HAPPY, CALM, SENSITIVE, IRRITABLE, ANXIOUS, TIRED
            $table->json('symptoms')->nullable(); // ['cramps', 'bloating', 'headache', 'craving', 'acne']
            $table->string('glycemic_note', 255)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'log_date']);
            $table->index(['user_id', 'log_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menstrual_logs');
        Schema::dropIfExists('menstrual_settings');
    }
};
