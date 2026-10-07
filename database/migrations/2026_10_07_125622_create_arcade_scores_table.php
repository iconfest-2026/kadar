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
        Schema::create('arcade_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('game_type', 50)->default('glucose_dash');
            $table->string('character_name', 100)->default('Dimas Aryo');
            $table->unsignedInteger('score')->default(0);
            $table->string('tir', 20)->default('100%');
            $table->unsignedInteger('distance')->default(0);
            $table->unsignedInteger('peak_glucose')->default(95);
            $table->timestamp('played_at')->useCurrent();
            $table->timestamps();

            $table->index(['game_type', 'score']);
            $table->index(['user_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arcade_scores');
    }
};
