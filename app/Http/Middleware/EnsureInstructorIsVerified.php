<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class EnsureInstructorIsVerified
{
    /**
     * Memastikan instruktur yang mengakses dasbor sudah berstatus ACTIVE dan terverifikasi legalitas medisnya.
     * Instruktur PENDING_VERIFICATION / SUSPENDED / REJECTED tidak diizinkan memasuki workspace operasional.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Hanya berlaku untuk user dengan role instructor
        if ($user->hasRole('instructor')) {
            $profile = $user->instructorProfile;
            $isVerified = $profile?->is_verified ?? false;

            if ($user->status !== 'ACTIVE' || !$isVerified) {
                if ($request->header('X-Inertia')) {
                    return Inertia::render('Instructor/PendingVerification', [
                        'status' => $user->status,
                        'profile' => $profile ? [
                            'specialization' => $profile->specialization,
                            'str_number' => $profile->str_number,
                            'sip_number' => $profile->sip_number,
                            'institution' => $profile->institution,
                            'is_verified' => $profile->is_verified,
                            'rejection_reason' => $profile->rejection_reason,
                            'created_at' => $profile->created_at?->toISOString(),
                        ] : null,
                    ])->toResponse($request)->setStatusCode(403);
                }

                abort(403, 'Akun instruktur Anda belum diverifikasi atau sedang dibekukan oleh Administrator platform.');
            }
        }

        return $next($request);
    }
}
