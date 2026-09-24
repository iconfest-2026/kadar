<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>@yield('title') — AEVYRA Health Platform</title>
    <link rel="icon" type="image/png" href="/image/Logo_AEVYRA_Icon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#1c6454',
                        'primary-container': '#144c40',
                        'surface-container-low': '#f3f7f5',
                        'surface-container': '#e6eee9',
                        'surface-container-high': '#d6e4dc',
                        'on-surface': '#142320',
                        'on-surface-variant': '#51635e',
                    },
                    fontFamily: {
                        sans: ['"IBM Plex Sans"', 'sans-serif'],
                        serif: ['"Newsreader"', 'serif'],
                        mono: ['"IBM Plex Mono"', 'monospace'],
                    },
                },
            },
        };
    </script>
</head>
<body class="bg-[#f7faf8] text-[#142320] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
    <!-- Diffused Natural Light Ambient Blooms -->
    <div 
        aria-hidden="true" 
        class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] max-w-[90vw] h-[350px] bg-gradient-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
    ></div>
    <div 
        aria-hidden="true" 
        class="pointer-events-none absolute bottom-0 right-0 w-[450px] max-w-[80vw] h-[350px] bg-[#f4ebe1]/30 blur-3xl rounded-full"
    ></div>

    <!-- Header -->
    <header class="h-16 w-full border-b border-[#d6e4dc]/60 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div class="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <a href="/" class="flex items-center gap-2">
                <img
                    src="/image/Logo_AEVYRA_Horizontal.png"
                    alt="AEVYRA Logo"
                    class="h-7 sm:h-8 w-auto object-contain"
                />
            </a>

            <div class="flex items-center gap-2 sm:gap-3">
                <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#d8e7de] text-[11px] text-[#1c6454]">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Diagnostik Sistem Siaga</span>
                </div>
                <a
                    href="tel:119"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf5f3] text-[#8e483b] border border-[#ebd8d2] text-xs font-medium hover:bg-[#f5edea] transition-colors"
                >
                    <span class="material-symbols-outlined text-[15px] text-[#9c5243]">emergency</span>
                    <span>Siaga 119</span>
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center items-center relative z-10">
        <div class="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl border border-[#d6e4dc] p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,40,36,0.04)] space-y-6 text-left">
            @yield('content')
        </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-5 border-t border-[#d6e4dc]/60 bg-white/40 text-[11px] text-[#63756f] text-center">
        <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 AEVYRA HEALTHCARE • SISTEM INTEGRASI PREVENTIF</span>
            <div class="flex items-center gap-3">
                <span>Standar SatuSehat Kemenkes</span>
                <span>•</span>
                <span>UU PDP No. 27/2022</span>
                <span>•</span>
                <span>PERKENI Protocol</span>
            </div>
        </div>
    </footer>
</body>
</html>

