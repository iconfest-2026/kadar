<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>AEVYRA - Personal Preventive Health &amp; Early Intervention Platform</title>
    <link rel="icon" type="image/png" href="/image/Logo_AEVYRA_Icon.png" />
    <link rel="apple-touch-icon" href="/image/Logo_AEVYRA_Icon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    @pwaHead('image/Logo_AEVYRA_Icon.png', '#00433e')

    <!-- Midtrans Snap Payment Gateway -->
    <script src="{{ config('services.midtrans.snap_url') }}" data-client-key="{{ config('services.midtrans.client_key') }}"></script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-surface font-body-md text-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary">
    @inertia

    @production
        @laravelPwa
        @pwaUpdateNotifier
    @else
        <!-- Development Auto-Clean: Unregister Service Worker & Clear PWA Caches so Vite HMR Auto-Refresh works flawlessly -->
        {{-- <script>
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (let registration of registrations) {
                        registration.unregister().then(function(success) {
                            if (success) {
                                console.log('[AEVYRA Dev] PWA Service Worker unregistered to enable instant Vite HMR auto-refresh.');
                            }
                        });
                    }
                });
            }
            if ('caches' in window) {
                caches.keys().then(function(keys) {
                    for (let key of keys) {
                        caches.delete(key);
                    }
                });
            }
        </script> --}}
    @endproduction
</body>
</html>

