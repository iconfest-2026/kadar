<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureInstructorIsVerified
{
    /**
     * Memastikan instruktur yang mengakses dasbor sudah berstatus ACTIVE.
     * Instruktur PENDING/SUSPENDED/INACTIVE tidak diizinkan memasuki workspace operasional.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // Hanya berlaku untuk user dengan role instructor
        if ($user->hasRole('instructor') && $user->status !== 'ACTIVE') {
            // Redirect ke halaman pending verification
            if ($request->header('X-Inertia')) {
                return \Inertia\Inertia::render('Instructor/PendingVerification', [
                    'status' => $user->status,
                ])->toResponse($request)->setStatusCode(403);
            }

            abort(403, 'Akun instruktur Anda belum diverifikasi atau sedang dibekukan. Hubungi administrator platform.');
        }

        return $next($request);
    }
}

