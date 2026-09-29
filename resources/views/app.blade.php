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

    <!-- Midtrans Snap Telemetry Filter (Prevent Faro ERR_BLOCKED_BY_CLIENT & Telemetry Console Errors) -->
    <script>
        (function() {
            if (typeof window === 'undefined') return;

            var isFaro = function(url) {
                if (!url) return false;
                try {
                    var s = typeof url === 'string' ? url : (url && url.url ? url.url : (url.href || ''));
                    return s.indexOf('katulampa.gopay.sh') !== -1 || s.indexOf('faro.katulampa') !== -1;
                } catch (e) {
                    return false;
                }
            };

            // Intercept window.fetch to mock 200 OK for Faro collector and avoid ERR_BLOCKED_BY_CLIENT
            if (window.fetch) {
                var _origFetch = window.fetch;
                window.fetch = function(input, init) {
                    try {
                        if (isFaro(input)) {
                            return Promise.resolve(new Response('{"status":"ok"}', {
                                status: 200,
                                headers: { 'Content-Type': 'application/json' }
                            }));
                        }
                    } catch (e) {}
                    return _origFetch.apply(this, arguments);
                };
            }

            // Intercept navigator.sendBeacon
            if (navigator && navigator.sendBeacon) {
                var _origBeacon = navigator.sendBeacon.bind(navigator);
                navigator.sendBeacon = function(url, data) {
                    try {
                        if (isFaro(url)) return true;
                    } catch (e) {}
                    return _origBeacon(url, data);
                };
            }

            // Intercept XMLHttpRequest fallback
            if (window.XMLHttpRequest) {
                var _origOpen = XMLHttpRequest.prototype.open;
                var _origSend = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.open = function(m, url) {
                    this.__isFaro = isFaro(url);
                    return _origOpen.apply(this, arguments);
                };
                XMLHttpRequest.prototype.send = function() {
                    if (this.__isFaro) {
                        try {
                            Object.defineProperty(this, 'readyState', { value: 4, configurable: true });
                            Object.defineProperty(this, 'status', { value: 200, configurable: true });
                            Object.defineProperty(this, 'responseText', { value: '{"status":"ok"}', configurable: true });
                            if (typeof this.onload === 'function') this.onload();
                            if (typeof this.onreadystatechange === 'function') this.onreadystatechange();
                        } catch (e) {}
                        return;
                    }
                    return _origSend.apply(this, arguments);
                };
            }

            // Suppress remaining Faro telemetry console errors
            var _origConsoleError = console.error;
            console.error = function() {
                try {
                    var str = '';
                    for (var i = 0; i < arguments.length; i++) {
                        var arg = arguments[i];
                        str += (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)) + ' ';
                    }
                    if (str.indexOf('katulampa.gopay.sh') !== -1 || str.indexOf('@grafana/faro') !== -1 || str.indexOf('faro-web-sdk') !== -1) {
                        return;
                    }
                } catch (e) {}
                return _origConsoleError.apply(console, arguments);
            };

            // Catch any unhandled promise rejections originating from Faro
            window.addEventListener('unhandledrejection', function(event) {
                try {
                    var r = event && event.reason;
                    var s = r ? (r.stack || r.message || String(r)) : '';
                    if (s.indexOf('katulampa.gopay.sh') !== -1 || s.indexOf('faro') !== -1 || s.indexOf('snap-popup-app') !== -1) {
                        event.preventDefault();
                    }
                } catch (e) {}
            });
        })();
    </script>

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

