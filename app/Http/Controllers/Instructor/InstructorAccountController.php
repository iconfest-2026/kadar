<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class InstructorAccountController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->instructorProfile;

        return Inertia::render('Instructor/Account', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar_url' => $user->avatar_url,
                'google_id' => $user->google_id,
                'is_google_connected' => !empty($user->google_id),
                'status' => $user->status,
                'created_at' => $user->created_at ? $user->created_at->translatedFormat('d F Y') : '-',
                'email_verified' => !empty($user->email_verified_at),
            ],
            'profile' => $profile ? [
                'specialization' => $profile->specialization,
                'institution' => $profile->institution,
                'str_number' => $profile->str_number,
                'sip_number' => $profile->sip_number,
                'years_of_experience' => $profile->years_of_experience,
                'is_verified' => (bool) $profile->is_verified,
                'rejection_reason' => $profile->rejection_reason,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        return back()->with('success', 'Informasi akun instruktur berhasil diperbarui!');
    }

    public function updatePassword(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'current_password' => ['nullable', 'string'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        if ($user->password && !empty($validated['current_password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return back()->withErrors(['current_password' => 'Kata sandi lama yang Anda masukkan tidak sesuai.']);
            }
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Kata sandi akun instruktur berhasil diperbarui!');
    }

    public function updateAvatar(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpeg,png,jpg,webp', 'max:3072'],
        ], [
            'avatar.required' => 'Silakan pilih berkas foto profil.',
            'avatar.image' => 'Berkas harus berupa gambar.',
            'avatar.mimes' => 'Format gambar harus JPEG, PNG, JPG, atau WEBP.',
            'avatar.max' => 'Ukuran foto maksimal 3MB.',
        ]);

        if ($request->hasFile('avatar')) {
            if ($user->avatar_url && str_starts_with($user->avatar_url, '/storage/')) {
                $oldPath = str_replace('/storage/', '', $user->avatar_url);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $avatarUrl = '/storage/' . $path;

            $user->update([
                'avatar_url' => $avatarUrl,
            ]);

            return back()->with('success', 'Foto profil instruktur berhasil diperbarui!');
        }

        return back()->withErrors(['avatar' => 'Gagal mengunggah foto profil.']);
    }
}

