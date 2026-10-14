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

    <!-- PWA Primary Meta Tags & Manifest (Direct & Cache-Busted) -->
    <meta name="theme-color" content="#00433e" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="AEVYRA" />
    <link rel="apple-touch-icon" href="/icon-192x192.png?v=3" />
    <link rel="manifest" href="/manifest.json?v=3" />

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
    <!-- AEVYRA Premium In-App Preloader (Modern, Minimalist, Healthcare Elegance) -->
    <div id="aevyra-app-preloader" aria-hidden="true" style="
        position: fixed;
        inset: 0;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: #f7faf8;
        background-image: radial-gradient(circle at 50% 45%, rgba(0, 67, 62, 0.04) 0%, rgba(247, 250, 248, 1) 75%);
        padding: 56px 24px 36px;
        transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.4s;
    ">
        <!-- Top Spacer for balanced vertical harmony -->
        <div style="height: 24px;"></div>

        <!-- Center Brand Container -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; max-width: 340px;">
            <!-- Logo Icon in Clean Elevated Rounded Card -->
            <div style="
                width: 82px;
                height: 82px;
                border-radius: 26px;
                background: #ffffff;
                border: 1px solid rgba(0, 67, 62, 0.08);
                box-shadow: 0 14px 34px -8px rgba(0, 67, 62, 0.12), 0 2px 8px rgba(0, 67, 62, 0.04);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 15px;
                margin-bottom: 22px;
            ">
                <img
                    src="/image/Logo_AEVYRA_Icon.png"
                    alt="AEVYRA"
                    style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,67,62,0.08));"
                />
            </div>

            <!-- Brand Name Typography -->
            <h1 style="
                margin: 0;
                font-family: 'Newsreader', Georgia, serif;
                font-size: 28px;
                font-weight: 700;
                color: #00433e;
                letter-spacing: 0.14em;
                line-height: 1.2;
            ">
                AEVYRA
            </h1>

            <!-- Subtitle Badge -->
            <div style="
                margin-top: 10px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 14px;
                border-radius: 9999px;
                background: rgba(0, 67, 62, 0.05);
                border: 1px solid rgba(0, 67, 62, 0.09);
            ">
                <span style="
                    width: 6px;
                    height: 6px;
                    border-radius: 9999px;
                    background: #10b981;
                "></span>
                <span style="
                    font-family: 'IBM Plex Mono', monospace;
                    font-size: 11px;
                    font-weight: 600;
                    color: #005a53;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                ">
                    Preventive Health Platform
                </span>
            </div>

            <!-- Ultra-Thin Minimalist Progress Line (Non-AI, Refined & Calm) -->
            <div style="
                margin-top: 36px;
                width: 130px;
                height: 2.5px;
                border-radius: 9999px;
                background: rgba(0, 67, 62, 0.08);
                overflow: hidden;
                position: relative;
            ">
                <div style="
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 45%;
                    border-radius: 9999px;
                    background: linear-gradient(90deg, #00433e 0%, #008069 60%, #10b981 100%);
                    animation: aevyra-preloader-slide 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                "></div>
            </div>
        </div>

        <!-- Bottom Clinical Credentials Footer -->
        <div style="
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-family: 'IBM Plex Sans', -apple-system, sans-serif;
            font-size: 11.5px;
            color: #71837e;
        ">
            <span>Standar Layanan Preventif Terintegrasi</span>
        </div>
    </div>

    <!-- Inline Animation & Dismissal Style -->
    <style>
        @keyframes aevyra-preloader-slide {
            0% {
                left: -45%;
                width: 30%;
            }
            50% {
                left: 30%;
                width: 55%;
            }
            100% {
                left: 100%;
                width: 30%;
            }
        }
        #aevyra-app-preloader.preloader-fade-out {
            opacity: 0 !important;
            transform: scale(1.015) !important;
            pointer-events: none !important;
            visibility: hidden !important;
        }
    </style>

    <script>
        (function() {
            function dismissPreloader() {
                var el = document.getElementById('aevyra-app-preloader');
                if (!el) return;
                el.classList.add('preloader-fade-out');
                setTimeout(function() {
                    if (el && el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                }, 450);
            }

            document.addEventListener('inertia:finish', dismissPreloader, { once: true });
            window.addEventListener('DOMContentLoaded', function() {
                setTimeout(dismissPreloader, 1000);
            });
            setTimeout(dismissPreloader, 3200);
        })();
    </script>

    @inertia

    @laravelPwa
</body>
</html>

