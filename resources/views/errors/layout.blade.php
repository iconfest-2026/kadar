<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>@yield('title') - AEVYRA Health Platform</title>
    <link rel="icon" type="image/png" href="/image/Logo_AEVYRA_Icon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />

    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#00433e',
                        'primary-hover': '#0c5348',
                        'primary-container': '#0f5c56',
                        'surface-container-low': '#edf6f0',
                        'surface-container': '#e7f0eb',
                        'surface-container-high': '#dce8e0',
                        'on-surface': '#12221e',
                        'on-surface-variant': '#4d635c',
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
<body class="bg-[#f6faf8] text-[#12221e] font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#00433e]/20 selection:text-[#00433e] relative overflow-x-hidden">
    <!-- Diffused Natural Light Ambient Blooms -->
    <div 
        aria-hidden="true" 
        class="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-160 max-w-[95vw] h-96 bg-gradient-to-b from-[#ddede4]/70 via-[#ebf5ef]/40 to-transparent blur-3xl rounded-full"
    ></div>
    <div 
        aria-hidden="true" 
        class="pointer-events-none absolute bottom-0 right-0 w-120 max-w-[85vw] h-96 bg-[#f7eee4]/40 blur-3xl rounded-full"
    ></div>

    <!-- Header -->
    <header class="h-16 w-full border-b border-[#e1ede5]/80 bg-white/75 backdrop-blur-md sticky top-0 z-30">
        <div class="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            <a href="/" class="flex items-center gap-2 group transition-opacity hover:opacity-90">
                <img
                    src="/image/Logo_EVYRA_Horizontal.png"
                    alt="AEVYRA Healthcare"
                    class="h-7 sm:h-8 w-auto object-contain"
                />
            </a>

            <div class="flex items-center gap-2.5">
                <a
                    href="/"
                    class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#00433e] border border-[#d3e5dc] hover:border-[#00433e]/40 transition-all shadow-xs"
                >
                    <span class="material-symbols-outlined text-[16px]">home</span>
                    <span class="hidden sm:inline">Beranda</span>
                </a>
                <a
                    href="tel:119"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fcf6f5] text-[#8e483b] border border-[#ebd8d2] text-xs font-medium hover:bg-[#f6edea] transition-colors"
                    title="Saluran Siaga Medis 119"
                >
                    <span class="material-symbols-outlined text-[15px] text-[#9c5243]">emergency</span>
                    <span>119</span>
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center items-center relative z-10">
        <div class="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl border border-[#d6e4dc]/80 p-6 sm:p-9 shadow-[0_16px_40px_rgba(0,67,62,0.04)] text-center relative overflow-hidden transition-all">
            @yield('content')
        </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-4 sm:py-5 border-t border-[#e1ede5]/70 bg-white/40 text-[11px] text-[#6b8078] text-center">
        <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 AEVYRA HEALTHCARE • Platform Intervensi Preventif</span>
            <div class="flex items-center gap-2.5 text-[#7e948c]">
                <span>Standar SatuSehat Kemenkes</span>
                <span>•</span>
                <span>Enkripsi UU PDP</span>
            </div>
        </div>
    </footer>
</body>
</html>
