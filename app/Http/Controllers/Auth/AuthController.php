<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\InstructorProfile;
use App\Models\MemberProfile;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function showLogin(): Response
    {
        return $this->showLoginForm();
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            /** @var \App\Models\User $user */
            $user = Auth::user();

            if ($user->status === 'SUSPENDED') {
                Auth::logout();
                return back()->withErrors(['email' => 'Akun Anda dinonaktifkan sementara oleh Administrator.']);
            }

            $user->update(['last_login_at' => now()]);
            $request->session()->regenerate();

            AuditLog::log($user->id, $user->roles->first()?->slug ?? 'member', 'auth.login.success');

            $targetUrl = $this->redirectPathForUser($user);

            // Sanitize intended URL to prevent stale /onboarding or 404 loops
            $intended = $request->session()->get('url.intended');
            if ($intended && str_contains($intended, 'onboarding')) {
                $request->session()->forget('url.intended');
                return redirect($targetUrl);
            }

            return redirect()->intended($targetUrl);
        }

        return back()->withErrors([
            'email' => 'Kredensial yang diberikan tidak cocok dengan data kami.',
        ])->onlyInput('email');
    }

    public function showRegisterForm(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function showRegister(): Response
    {
        return $this->showRegisterForm();
    }

    public function register(Request $request): RedirectResponse
    {
        $roleType = $request->input('role', 'member');

        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', Password::min(8)],
            'role' => ['required', 'string', 'in:member,instructor'],
            'consent' => ['accepted'],
        ];

        if ($roleType === 'instructor') {
            $rules['specialization'] = ['required', 'string', 'max:150'];
            $rules['str_number'] = ['required', 'string', 'max:100'];
            $rules['sip_number'] = ['nullable', 'string', 'max:100'];
            $rules['institution'] = ['required', 'string', 'max:200'];
            $rules['years_of_experience'] = ['required', 'integer', 'min:0', 'max:60'];
            $rules['bio'] = ['nullable', 'string', 'max:2000'];
            $rules['proof_document'] = ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240']; // max 10MB
        }

        $validated = $request->validate($rules);

        // Upload proof document if present
        $documentPath = null;
        if ($request->hasFile('proof_document')) {
            $documentPath = $request->file('proof_document')->store('instructor_proofs', 'public');
        }

        // Determine user status
        $userStatus = ($roleType === 'instructor') ? 'PENDING_VERIFICATION' : 'ACTIVE';

        $user = User::create([
            'name' => $validated['name'],
            'email' => strtolower(trim($validated['email'])),
            'password' => Hash::make($validated['password']),
            'status' => $userStatus,
            'last_login_at' => now(),
        ]);

        if ($roleType === 'instructor') {
            // Assign Instructor role
            $instructorRole = Role::firstOrCreate(['slug' => 'instructor'], [
                'name' => 'Instruktur Medis',
                'description' => 'Tenaga ahli kesehatan & dokter pendamping terverifikasi',
            ]);
            $user->assignRole($instructorRole);

            // Create Instructor Profile with unverified status
            InstructorProfile::create([
                'user_id' => $user->id,
                'specialization' => $validated['specialization'],
                'str_number' => $validated['str_number'],
                'sip_number' => $validated['sip_number'] ?? null,
                'institution' => $validated['institution'],
                'years_of_experience' => $validated['years_of_experience'],
                'document_proof_path' => $documentPath,
                'bio' => $validated['bio'] ?? null,
                'is_verified' => false,
                'is_recommended' => false,
            ]);

            Auth::login($user);
            $request->session()->regenerate();

            AuditLog::log($user->id, 'instructor', 'auth.register.instructor_pending', 'User', (string)$user->id, [
                'str_number' => $validated['str_number'],
                'specialization' => $validated['specialization'],
            ]);

            return redirect('/instructor/dashboard');
        } else {
            // Assign default Member role
            $memberRole = Role::firstOrCreate(['slug' => 'member'], [
                'name' => 'Member',
                'description' => 'Anggota pengguna aplikasi AEVYRA',
            ]);
            $user->assignRole($memberRole);

            // Create default profile
            MemberProfile::create([
                'user_id' => $user->id,
                'display_name' => $user->name,
                'timezone' => 'Asia/Jakarta',
                'locale' => 'id-ID',
            ]);

            Auth::login($user);
            $request->session()->regenerate();

            AuditLog::log($user->id, 'member', 'auth.register.success');

            $targetUrl = $this->redirectPathForUser($user);
            $request->session()->forget('url.intended');

            return redirect($targetUrl);
        }
    }

    public function logout(Request $request): RedirectResponse
    {
        $userId = Auth::id();
        AuditLog::log($userId, Auth::user()?->roles->first()?->slug ?? 'member', 'auth.logout');

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect user to Google OAuth provider.
     */
    public function redirectToGoogle(Request $request)
    {
        // Store intended role (defaults to member) in session for callback
        $role = $request->query('role', 'member');
        if (in_array($role, ['member', 'instructor'])) {
            $request->session()->put('google_oauth_role', $role);
        }

        return Socialite::driver('google')->redirect();
    }

    /**
     * Link Google account to currently logged-in user.
     */
    public function linkGoogle(Request $request): RedirectResponse
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $returnUrl = $request->query('return_url');
        if (!$returnUrl) {
            $returnUrl = $user->hasRole('instructor') ? '/instructor/account' : '/member/account';
        }

        $request->session()->put('google_link_user_id', $user->id);
        $request->session()->put('google_link_return_url', $returnUrl);

        return Socialite::driver('google')->redirect();
    }

    /**
     * Unlink Google account from currently logged-in user.
     */
    public function unlinkGoogle(Request $request): RedirectResponse
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();
        if (!$user) {
            return redirect()->route('login');
        }

        $user->update(['google_id' => null]);

        AuditLog::log($user->id, $user->roles->first()?->slug ?? 'member', 'auth.google_unlink.success', 'User', (string)$user->id, [
            'email' => $user->email,
        ]);

        return back()->with('success', 'Koneksi akun Google berhasil diputuskan.');
    }

    /**
     * Handle callback from Google OAuth provider.
     */
    public function handleGoogleCallback(Request $request): RedirectResponse
    {
        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            $linkUserId = $request->session()->pull('google_link_user_id');
            $returnUrl = $request->session()->pull('google_link_return_url');
            if ($linkUserId && $returnUrl) {
                return redirect($returnUrl)->withErrors([
                    'google' => 'Gagal mengautentikasi akun Google: ' . $e->getMessage(),
                ]);
            }
            return redirect()->route('login')->withErrors([
                'email' => 'Gagal mengautentikasi akun Google: ' . $e->getMessage(),
            ]);
        }

        if (!$googleUser || !$googleUser->getEmail()) {
            $linkUserId = $request->session()->pull('google_link_user_id');
            $returnUrl = $request->session()->pull('google_link_return_url');
            if ($linkUserId && $returnUrl) {
                return redirect($returnUrl)->withErrors([
                    'google' => 'Tidak dapat menemukan data email dari akun Google Anda.',
                ]);
            }
            return redirect()->route('login')->withErrors([
                'email' => 'Tidak dapat menemukan data email dari akun Google Anda.',
            ]);
        }

        $email = strtolower(trim($googleUser->getEmail()));
        $googleId = $googleUser->getId();
        $avatar = $googleUser->getAvatar();
        $name = $googleUser->getName() ?: explode('@', $email)[0];

        // CHECK IF THIS IS AN ACCOUNT LINKING ATTEMPT
        $linkUserId = $request->session()->pull('google_link_user_id');
        $returnUrl = $request->session()->pull('google_link_return_url');

        if ($linkUserId) {
            /** @var \App\Models\User|null $currentUser */
            $currentUser = User::find($linkUserId);
            if (!$currentUser) {
                return redirect()->route('login')->withErrors(['email' => 'Sesi autentikasi telah berakhir.']);
            }

            if (!$returnUrl) {
                $returnUrl = $currentUser->hasRole('instructor') ? '/instructor/account' : '/member/account';
            }

            // Check if this Google ID is already linked to another account
            $alreadyLinked = User::where('google_id', $googleId)->where('id', '!=', $currentUser->id)->first();
            if ($alreadyLinked) {
                return redirect($returnUrl)->withErrors([
                    'google' => 'Akun Google ini (' . $email . ') sudah terhubung dengan akun AEVYRA lain (' . $alreadyLinked->email . '). Gunakan akun Google lain.',
                ]);
            }

            $currentUser->update([
                'google_id' => $googleId,
                'avatar_url' => $currentUser->avatar_url ?: $avatar,
            ]);

            AuditLog::log($currentUser->id, $currentUser->roles->first()?->slug ?? 'member', 'auth.google_link.success', 'User', (string)$currentUser->id, [
                'google_id' => $googleId,
                'google_email' => $email,
            ]);

            return redirect($returnUrl)->with('success', 'Akun Google (' . $email . ') berhasil dihubungkan ke akun AEVYRA Anda!');
        }

        // 1. Search for existing user by google_id or email
        $user = User::where('google_id', $googleId)
            ->orWhere('email', $email)
            ->first();

        $roleType = $request->session()->pull('google_oauth_role', 'member');

        if ($user) {
            // Update google_id and avatar if missing
            $user->update([
                'google_id' => $googleId,
                'avatar_url' => $user->avatar_url ?: $avatar,
                'email_verified_at' => $user->email_verified_at ?: now(),
                'last_login_at' => now(),
            ]);

            if ($user->status === 'SUSPENDED') {
                return redirect()->route('login')->withErrors([
                    'email' => 'Akun Anda dinonaktifkan sementara oleh Administrator.',
                ]);
            }

            // Sync role if user explicitly chose role during Google OAuth and doesn't have it yet
            if ($roleType === 'instructor' && !$user->hasRole('instructor') && !$user->hasRole('admin')) {
                $instructorRole = Role::firstOrCreate(['slug' => 'instructor'], [
                    'name' => 'Instruktur Medis',
                    'description' => 'Tenaga ahli kesehatan & dokter pendamping terverifikasi',
                ]);
                $user->assignRole($instructorRole);

                if (!$user->instructorProfile) {
                    InstructorProfile::create([
                        'user_id' => $user->id,
                        'specialization' => 'Dokter Umum',
                        'str_number' => null,
                        'institution' => null,
                        'years_of_experience' => 0,
                        'is_verified' => false,
                        'is_recommended' => false,
                    ]);
                }
                $user->update(['status' => 'PENDING_VERIFICATION']);
            } elseif ($roleType === 'member' && !$user->hasRole('member') && !$user->hasRole('admin') && !$user->hasRole('instructor')) {
                $memberRole = Role::firstOrCreate(['slug' => 'member'], [
                    'name' => 'Member',
                    'description' => 'Anggota pengguna aplikasi AEVYRA',
                ]);
                $user->assignRole($memberRole);
            }
        } else {
            // 2. Register as new user via Google
            $userStatus = ($roleType === 'instructor') ? 'PENDING_VERIFICATION' : 'ACTIVE';

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'google_id' => $googleId,
                'avatar_url' => $avatar,
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
                'status' => $userStatus,
                'last_login_at' => now(),
            ]);

            if ($roleType === 'instructor') {
                $instructorRole = Role::firstOrCreate(['slug' => 'instructor'], [
                    'name' => 'Instruktur Medis',
                    'description' => 'Tenaga ahli kesehatan & dokter pendamping terverifikasi',
                ]);
                $user->assignRole($instructorRole);

                InstructorProfile::create([
                    'user_id' => $user->id,
                    'specialization' => 'Dokter Umum',
                    'str_number' => null,
                    'institution' => null,
                    'years_of_experience' => 0,
                    'is_verified' => false,
                    'is_recommended' => false,
                ]);
            } else {
                $memberRole = Role::firstOrCreate(['slug' => 'member'], [
                    'name' => 'Member',
                    'description' => 'Anggota pengguna aplikasi AEVYRA',
                ]);
                $user->assignRole($memberRole);

                MemberProfile::create([
                    'user_id' => $user->id,
                    'display_name' => $name,
                    'avatar_path' => $avatar,
                    'timezone' => 'Asia/Jakarta',
                    'locale' => 'id-ID',
                ]);
            }
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        AuditLog::log($user->id, $user->roles->first()?->slug ?? 'member', 'auth.google_sso.success', 'User', (string)$user->id, [
            'google_id' => $googleId,
            'email' => $email,
        ]);

        $targetUrl = $this->redirectPathForUser($user);

        // Sanitize intended URL to prevent stale /onboarding or 404 loops
        $intended = $request->session()->get('url.intended');
        if ($intended && str_contains($intended, 'onboarding')) {
            $request->session()->forget('url.intended');
            return redirect($targetUrl);
        }

        return redirect()->intended($targetUrl);
    }

    /**
     * Determine the correct dashboard redirect path based on user role.
     */
    protected function redirectPathForUser(User $user): string
    {
        $user->load('roles');

        if ($user->hasRole('admin')) {
            return '/admin/dashboard';
        }

        if ($user->hasRole('instructor')) {
            return '/instructor/dashboard';
        }

        return '/member/dashboard';
    }
}
