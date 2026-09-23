<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value')->nullable();
            $table->string('type', 30)->default('string'); // string, integer, boolean, json
            $table->string('group', 50)->default('general');
            $table->string('description', 255)->nullable();
            $table->timestamps();
        });

        // Insert default setting: max_instructors_per_member = 3
        DB::table('system_settings')->insert([
            'key' => 'max_instructors_per_member',
            'value' => '3',
            'type' => 'integer',
            'group' => 'coaching',
            'description' => 'Batas maksimal instruktur aktif yang dapat dipilih oleh seorang member (Maksimal 3)',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};

