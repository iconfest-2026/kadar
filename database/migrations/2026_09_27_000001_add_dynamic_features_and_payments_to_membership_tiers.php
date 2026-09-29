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
        Schema::table('membership_tiers', function (Blueprint $table) {
            $table->json('features')->nullable()->after('description');
            $table->decimal('admin_fee', 12, 2)->default(4000.00)->after('price');
            $table->string('admin_fee_type', 20)->default('FIXED')->after('admin_fee');
            $table->string('badge_text', 50)->nullable()->after('status');
            $table->boolean('is_popular')->default(false)->after('badge_text');
            $table->integer('max_consultations')->default(0)->after('is_popular');
            $table->integer('max_scanner')->default(-1)->after('max_consultations'); // -1 = Unlimited
        });

        Schema::create('membership_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('tier_id')->constrained('membership_tiers')->cascadeOnDelete();
            $table->string('order_id', 100)->unique();
            $table->decimal('base_amount', 12, 2)->default(0.00);
            $table->decimal('admin_fee', 12, 2)->default(0.00);
            $table->decimal('gross_amount', 12, 2)->default(0.00);
            $table->string('currency', 3)->default('IDR');
            $table->string('payment_type', 50)->nullable();
            $table->string('snap_token', 255)->nullable();
            $table->text('snap_redirect_url')->nullable();
            $table->string('status', 30)->default('PENDING'); // PENDING, SETTLEMENT, EXPIRE, CANCEL, DENY
            $table->json('midtrans_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index('order_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_payments');

        Schema::table('membership_tiers', function (Blueprint $table) {
            $table->dropColumn([
                'features',
                'admin_fee',
                'admin_fee_type',
                'badge_text',
                'is_popular',
                'max_consultations',
                'max_scanner',
            ]);
        });
    }
};
