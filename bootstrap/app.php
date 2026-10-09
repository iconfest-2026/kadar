<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'midtrans/notification',
            'api/midtrans/notification',
            'member/scanner/analyze',
            'member/scanner/save',
            'member/ai-chat/send',
        ]);
        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureUserHasRole::class,
            'verified-instructor' => \App\Http\Middleware\EnsureInstructorIsVerified::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $status = $response->getStatusCode();
            if (in_array($status, [403, 404, 419, 429, 500, 503])) {
                if ($request->header('X-Inertia')) {
                    return Inertia::render('Error', [
                        'status' => $status,
                        'message' => $exception->getMessage() ?: null,
                    ])->toResponse($request)->setStatusCode($status);
                }
            }
            return $response;
        });
    })->create();
