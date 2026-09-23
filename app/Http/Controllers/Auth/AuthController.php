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
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

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

            // Role-based redirection
            if ($user->hasRole('admin')) {
                return redirect()->intended('/admin/dashboard');
            }

            if ($user->hasRole('instructor')) {
                return redirect()->intended('/instructor/dashboard');
            }

            // Member flow
            if (!$user->memberProfile || !$user->lifestyleProfile) {
                return redirect()->intended('/onboarding');
            }

            return redirect()->intended('/dashboard');
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

            return redirect('/onboarding');
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
}
