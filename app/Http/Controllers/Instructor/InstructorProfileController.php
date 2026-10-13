<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\InstructorProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class InstructorProfileController extends Controller
{
    /**
     * Tampilkan formulir profil dan berkas kredensial instruktur.
     */
    public function edit(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('roles');

        $profile = $user->instructorProfile;
        if (!$profile) {
            $profile = InstructorProfile::create([
                'user_id' => $user->id,
                'specialization' => 'Dokter Umum',
                'years_of_experience' => 0,
                'is_verified' => false,
                'is_recommended' => false,
            ]);
        }

        return Inertia::render('Instructor/Profile', [
            'instructor' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar_url' => $user->avatar_url,
                'status' => $user->status,
            ],
            'profile' => [
                'id' => $profile->id,
                'specialization' => $profile->specialization ?? '',
                'institution' => $profile->institution ?? '',
                'str_number' => $profile->str_number ?? '',
                'sip_number' => $profile->sip_number ?? '',
                'years_of_experience' => $profile->years_of_experience ?? 0,
                'bio' => $profile->bio ?? '',
                'document_proof_path' => $profile->document_proof_path,
                'is_verified' => (bool)$profile->is_verified,
                'rejection_reason' => $profile->rejection_reason,
                'verified_at' => $profile->verified_at?->toISOString(),
            ],
        ]);
    }

    /**
     * Simpan perubahan profil dan berkas legalitas STR/SIP instruktur.
     */
    public function update(Request $request): RedirectResponse
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'specialization' => ['required', 'string', 'max:150'],
            'institution' => ['required', 'string', 'max:200'],
            'str_number' => ['required', 'string', 'max:100'],
            'sip_number' => ['nullable', 'string', 'max:100'],
            'years_of_experience' => ['required', 'integer', 'min:0', 'max:60'],
            'bio' => ['nullable', 'string', 'max:2000'],
            'proof_document' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'], // Max 10MB
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'specialization.required' => 'Spesialisasi klinis wajib dipilih atau diisi.',
            'institution.required' => 'Nama institusi / fasilitas kesehatan praktik wajib diisi.',
            'str_number.required' => 'Nomor STR (Surat Tanda Registrasi) wajib diisi untuk proses verifikasi oleh Administrator.',
            'years_of_experience.required' => 'Pengalaman praktik wajib diisi.',
            'proof_document.mimes' => 'Berkas bukti legalitas harus berupa file PDF, JPG, JPEG, atau PNG.',
            'proof_document.max' => 'Ukuran berkas tidak boleh melebihi 10MB.',
        ]);

        // Update User Name
        $user->update([
            'name' => $validated['name'],
        ]);

        // Get or Create profile
        $profile = $user->instructorProfile ?: InstructorProfile::create(['user_id' => $user->id]);

        $data = [
            'specialization' => $validated['specialization'],
            'institution' => $validated['institution'],
            'str_number' => $validated['str_number'],
            'sip_number' => $validated['sip_number'] ?? null,
            'years_of_experience' => $validated['years_of_experience'],
            'bio' => $validated['bio'] ?? null,
        ];

        // Handle File Upload
        if ($request->hasFile('proof_document')) {
            // Delete old proof document if exists
            if ($profile->document_proof_path && Storage::disk('public')->exists($profile->document_proof_path)) {
                Storage::disk('public')->delete($profile->document_proof_path);
            }

            $path = $request->file('proof_document')->store('instructor_proofs', 'public');
            $data['document_proof_path'] = $path;
        }

        $profile->update($data);

        AuditLog::log(
            $user->id,
            'instructor',
            'instructor.profile.updated',
            'InstructorProfile',
            (string)$profile->id,
            [
                'specialization' => $validated['specialization'],
                'str_number' => $validated['str_number'],
                'has_document' => !empty($profile->document_proof_path),
            ]
        );

        return back()->with('success', 'Biodata profil dan kredensial STR berhasil diperbarui. Administrator akan meninjau kelayakan data Anda.');
    }
}

