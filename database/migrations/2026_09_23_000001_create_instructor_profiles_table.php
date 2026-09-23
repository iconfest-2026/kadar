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
        Schema::create('instructor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('str_number', 100)->nullable(); // Nomor STR Dokter / Tenaga Medis
            $table->string('sip_number', 100)->nullable(); // Nomor Surat Izin Praktik
            $table->string('specialization', 150)->default('Dokter Umum'); // e.g. Spesialis Gizi Klinis Sp.GK, Dokter Spesialis Kedokteran Olahraga Sp.KO
            $table->string('institution', 200)->nullable(); // RS / Klinik / Fasilitas Pelayanan Kesehatan
            $table->unsignedSmallInteger('years_of_experience')->default(1);
            $table->string('document_proof_path', 255)->nullable(); // Path berkas STR / SIP / Ijazah
            $table->text('bio')->nullable(); // Deskripsi profil & pendekatan preventif
            $table->boolean('is_verified')->default(false); // Status verifikasi legalitas medis oleh Admin
            $table->timestamp('verified_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->text('rejection_reason')->nullable();
            $table->boolean('is_recommended')->default(false); // Flag rekomendasi admin untuk ditampilkan ke member
            $table->unsignedInteger('max_member_capacity')->default(50); // Batas maksimal kapasitas bimbingan member
            $table->timestamps();

            $table->index(['is_verified', 'is_recommended']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructor_profiles');
    }
};

