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
        Schema::create('goals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 50); // SLEEP_ROUTINE, PHYSICAL_ACTIVITY, etc.
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('status', 30)->default('ACTIVE')->index(); // DRAFT, ACTIVE, PAUSED, COMPLETED
            $table->unsignedSmallInteger('priority')->default(1);
            $table->date('start_date');
            $table->date('target_date')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });

        Schema::create('goal_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('goal_id')->constrained('goals')->cascadeOnDelete();
            $table->string('metric_type', 50);
            $table->decimal('target_value', 10, 2);
            $table->string('unit', 30);
            $table->smallInteger('priority')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('goal_metrics');
        Schema::dropIfExists('goals');
    }
};
