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
        Schema::table('memberships', function (Blueprint $table) {
            $table->foreignId('downgrade_to_tier_id')
                ->nullable()
                ->after('tier_id')
                ->constrained('membership_tiers')
                ->nullOnDelete();
            $table->timestamp('downgrade_at')->nullable()->after('ends_at');
            $table->text('downgrade_reason')->nullable()->after('downgrade_at');
            $table->boolean('auto_renew')->default(true)->after('downgrade_reason');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            $table->dropForeign(['downgrade_to_tier_id']);
            $table->dropColumn([
                'downgrade_to_tier_id',
                'downgrade_at',
                'downgrade_reason',
                'auto_renew',
            ]);
        });
    }
};
