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
        Schema::create('member_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('display_name', 100);
            $table->date('date_of_birth')->nullable();
            $table->string('sex', 20)->nullable(); // MALE, FEMALE
            $table->string('occupation', 150)->nullable();
            $table->string('timezone', 50)->default('Asia/Jakarta');
            $table->string('locale', 10)->default('id-ID');
            $table->string('avatar_path', 255)->nullable();
            $table->timestamps();
        });

        Schema::create('lifestyle_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('work_pattern', 50)->default('SEDENTARY'); // SEDENTARY, SHIFT_WORK, ACTIVE_LABOR
            $table->time('typical_sleep_bed')->nullable();
            $table->time('typical_sleep_wake')->nullable();
            $table->string('meal_pattern', 50)->default('3_MEALS'); // 3_MEALS, INTERMITTENT, UNSTRUCTURED
            $table->json('dietary_pref')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lifestyle_profiles');
        Schema::dropIfExists('member_profiles');
    }
};
