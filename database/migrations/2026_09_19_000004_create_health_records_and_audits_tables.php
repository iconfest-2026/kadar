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
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('metric_type', 50);
            $table->decimal('value_numeric', 12, 4)->nullable();
            $table->string('value_text', 255)->nullable();
            $table->string('unit', 30);
            $table->timestamp('recorded_at');
            $table->string('source', 30)->default('manual'); // manual, scanner, wearable, instructor, import, system
            $table->string('source_reference', 100)->nullable();
            $table->string('quality_status', 30)->default('VALID'); // VALID, OUTLIER, SUSPICIOUS
            $table->decimal('confidence_score', 3, 2)->default(1.00);
            $table->json('metadata')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id', 'metric_type', 'recorded_at'], 'idx_health_records_lookup');
            $table->index(['user_id', 'recorded_at']);
        });

        Schema::create('health_record_audits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('health_record_id')->constrained('health_records')->cascadeOnDelete();
            $table->string('old_value', 255)->nullable();
            $table->string('new_value', 255);
            $table->string('reason', 255)->nullable();
            $table->foreignId('updated_by')->constrained('users');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_record_audits');
        Schema::dropIfExists('health_records');
    }
};
