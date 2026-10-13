<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\MemberProfile;
use App\Models\Membership;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $profile = $user->memberProfile;

        $membership = Membership::where('user_id', $user->id)
            ->where('status', 'ACTIVE')
            ->with('tier')
            ->first();

        return Inertia::render('Member/Account', [
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
            'profile' => [
                'display_name' => $profile?->display_name ?: $user->name,
                'occupation' => $profile?->occupation ?: 'Member AEVYRA',
                'sex' => $profile?->sex ?: 'MALE',
                'date_of_birth' => $profile?->date_of_birth ? $profile->date_of_birth->toDateString() : '',
                'timezone' => $profile?->timezone ?: 'Asia/Jakarta',
            ],
            'membership' => [
                'tier' => $membership?->tier?->name ?? 'Silver',
                'slug' => strtolower($membership?->tier?->slug ?? 'silver'),
                'expires_at' => $membership?->expires_at ? $membership->expires_at->translatedFormat('d F Y') : 'Aktif Selamanya',
            ],
        ]);
    }

    public function update(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'display_name' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'sex' => 'nullable|in:MALE,FEMALE,OTHER',
            'date_of_birth' => 'nullable|date',
        ]);

        $user->update([
            'name' => $validated['name'],
        ]);

        MemberProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'display_name' => $validated['display_name'] ?: $validated['name'],
                'occupation' => $validated['occupation'] ?: 'Member AEVYRA',
                'sex' => $validated['sex'] ?: 'MALE',
                'date_of_birth' => $validated['date_of_birth'] ?: null,
            ]
        );

        return back()->with('success', 'Informasi akun dan profil berhasil diperbarui!');
    }

    public function updatePassword(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $validated = $request->validate([
            'current_password' => ['nullable', 'string'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        // Jika user memiliki password lokal dan bukan login Google murni, verifikasi current password
        if ($user->password && !empty($validated['current_password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                return back()->withErrors(['current_password' => 'Kata sandi lama yang Anda masukkan tidak sesuai.']);
            }
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Kata sandi berhasil diperbarui!');
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

            MemberProfile::updateOrCreate(
                ['user_id' => $user->id],
                ['avatar_path' => $avatarUrl]
            );

            return back()->with('success', 'Foto profil berhasil diperbarui!');
        }

        return back()->withErrors(['avatar' => 'Gagal mengunggah foto profil.']);
    }
}

