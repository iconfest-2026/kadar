import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Error({ status = 404, message = null, errorId = null }) {
    const [activeCode, setActiveCode] = useState(status || 404);

    const errorConfigs = {
        403: {
            code: 403,
            badge: 'KODE 403 • AKSES DIRESTRIKSI',
            badgeStyle: 'bg-[#fdf2f1] text-[#992a24] border-[#f5cbca]',
            icon: 'lock',
            iconContainer: 'from-[#fdf2f1] to-[#fae2e0] border-[#f5cbca] text-[#992a24] shadow-[0_4px_20px_rgba(153,42,36,0.06)]',
            title: 'Akses Memerlukan Otorisasi',
            description: 'Halaman atau data klinis ini dilindungi oleh protokol keamanan medis. Anda memerlukan otorisasi khusus atau akun terverifikasi untuk dapat mengaksesnya.',
            primaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            secondaryBtn: { text: 'Masuk Akun Lain', href: '/login', icon: 'switch_account' },
            footerMeta: 'UU PDP No. 27/2022',
        },
        404: {
            code: 404,
            badge: 'KODE 404 • TIDAK DITEMUKAN',
            badgeStyle: 'bg-[#eef7f2] text-[#00433e] border-[#d3e7dc]',
            icon: 'travel_explore',
            iconContainer: 'from-[#eaf5f0] to-[#d8ede1] border-[#cbe3d6] text-[#00433e] shadow-[0_4px_20px_rgba(0,67,62,0.06)]',
            title: 'Halaman Tidak Ditemukan',
            description: 'Tautan yang Anda tuju mungkin telah dipindahkan, diubah, atau tidak lagi terdaftar dalam indeks sistem AEVYRA.',
            primaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            secondaryBtn: { text: 'Halaman Sebelumnya', action: 'back', icon: 'arrow_back' },
            shortcut: { text: 'Buka Pemindai Nutrisi', href: '/member/scanner' },
        },
        419: {
            code: 419,
            badge: 'KODE 419 • SESI KEDALUWARSA',
            badgeStyle: 'bg-[#fef8ed] text-[#996312] border-[#f5dfb8]',
            icon: 'history_toggle_off',
            iconContainer: 'from-[#fef8ed] to-[#fcefd8] border-[#f5dfb8] text-[#996312] shadow-[0_4px_20px_rgba(153,99,18,0.06)]',
            title: 'Sesi Keamanan Telah Kedaluwarsa',
            description: 'Untuk menjaga kerahasiaan data kesehatan Anda, formulir ditutup secara otomatis setelah beberapa waktu tanpa interaksi. Silakan muat ulang halaman untuk melanjutkan.',
            primaryBtn: { text: 'Muat Ulang Halaman', action: 'reload', icon: 'refresh' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            footerMeta: 'Token CSRF Diperbarui',
        },
        429: {
            code: 429,
            badge: 'KODE 429 • BATAS LAJU TERCAPAI',
            badgeStyle: 'bg-[#fef8ed] text-[#996312] border-[#f5dfb8]',
            icon: 'speed',
            iconContainer: 'from-[#fef8ed] to-[#fcefd8] border-[#f5dfb8] text-[#996312] shadow-[0_4px_20px_rgba(153,99,18,0.06)]',
            title: 'Terlalu Banyak Permintaan',
            description: 'Sistem mendeteksi pengiriman data atau pemindaian yang terlalu sering dalam interval singkat. Mohon jeda 30–60 detik sebelum mengirimkan permintaan berikutnya.',
            primaryBtn: { text: 'Coba Lagi Sekarang', action: 'reload', icon: 'update' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            footerMeta: 'Throttle Rate Guard Aktif',
        },
        500: {
            code: 500,
            badge: 'KODE 500 • KENDALA SISTEM',
            badgeStyle: 'bg-[#fdf2f1] text-[#992a24] border-[#f5cbca]',
            icon: 'dns',
            iconContainer: 'from-[#fdf2f1] to-[#fae2e0] border-[#f5cbca] text-[#992a24] shadow-[0_4px_20px_rgba(153,42,36,0.06)]',
            title: 'Terjadi Kendala pada Sistem',
            description: 'Sistem kami mengalami gangguan sesaat saat memproses permintaan Anda. Tim teknis AEVYRA telah menerima peringatan otomatis untuk segera menanganinya.',
            primaryBtn: { text: 'Muat Ulang Halaman', action: 'reload', icon: 'refresh' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            shortcut: { text: 'Hubungi Bantuan Medis', href: 'mailto:care@aevyra.health', isExternal: true },
        },
        503: {
            code: 503,
            badge: 'KODE 503 • PEMELIHARAAN SISTEM',
            badgeStyle: 'bg-[#eef7f2] text-[#00433e] border-[#d3e7dc]',
            icon: 'construction',
            iconContainer: 'from-[#eaf5f0] to-[#d8ede1] border-[#cbe3d6] text-[#00433e] shadow-[0_4px_20px_rgba(0,67,62,0.06)]',
            title: 'Sistem Sedang Ditingkatkan',
            description: 'Platform AEVYRA sedang menjalani peningkatan berkala dan kalibrasi model inferensi SatuSehat. Layanan klinis akan segera kembali beroperasi penuh.',
            primaryBtn: { text: 'Periksa Status Server', action: 'reload', icon: 'cached' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            footerMeta: 'Data Pasien Aman & Terenkripsi',
        },
    };

    const currentError = errorConfigs[activeCode] || errorConfigs[404];
    const generatedTraceId = errorId || `AEV-${activeCode}-${Math.floor(100000 + Math.random() * 900000)}`;

    const handleAction = (btn) => {
        if (btn.action === 'reload') {
            window.location.reload();
        } else if (btn.action === 'back') {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = '/';
            }
        }
    };

    const renderButton = (btn, isPrimary = true) => {
        const baseClasses = isPrimary
            ? 'w-full sm:w-auto min-h-11 px-5 py-2.5 rounded-full bg-[#00433e] text-white text-xs sm:text-sm font-medium hover:bg-[#0c5348] transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer'
            : 'w-full sm:w-auto min-h-11 px-4 py-2.5 rounded-full bg-white text-[#203630] text-xs sm:text-sm font-medium hover:bg-[#f3f8f5] border border-[#d2e0d7] transition-all active:scale-98 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer';

        if (btn.action) {
            return (
                <button
                    key={btn.text}
                    type="button"
                    onClick={() => handleAction(btn)}
                    className={baseClasses}
                >
                    <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
                    <span>{btn.text}</span>
                </button>
            );
        }

        if (btn.href?.startsWith('mailto:') || btn.href?.startsWith('tel:')) {
            return (
                <a
                    key={btn.text}
                    href={btn.href}
                    className={baseClasses}
                >
                    <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
                    <span>{btn.text}</span>
                </a>
            );
        }

        return (
            <Link
                key={btn.text}
                href={btn.href || '/'}
                className={baseClasses}
            >
                <span className="material-symbols-outlined text-[18px]">{btn.icon}</span>
                <span>{btn.text}</span>
            </Link>
        );
    };

    return (
        <div className="min-h-screen w-full bg-[#f6faf8] text-[#12221e] flex flex-col font-sans selection:bg-[#00433e]/20 selection:text-[#00433e] relative overflow-x-hidden justify-between">
            <Head title={`${currentError.code} - ${currentError.title} | AEVYRA Health`} />

            {/* Peaceful, Serene Background Canvas Blooms */}
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-160 max-w-[95vw] h-96 bg-gradient-to-b from-[#ddede4]/70 via-[#ebf5ef]/40 to-transparent blur-3xl rounded-full"
            />
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute bottom-0 right-0 w-120 max-w-[85vw] h-96 bg-[#f7eee4]/40 blur-3xl rounded-full"
            />

            {/* Clean Medical Header */}
            <header className="h-16 w-full border-b border-[#e1ede5]/80 bg-white/75 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-5xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
                        <img
                            src="/image/Logo_EVYRA_Horizontal.png"
                            alt="AEVYRA Healthcare"
                            className="h-7 sm:h-8 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-[#00433e] border border-[#d3e5dc] hover:border-[#00433e]/40 transition-all shadow-xs"
                        >
                            <span className="material-symbols-outlined text-[16px]">home</span>
                            <span className="hidden sm:inline">Beranda</span>
                        </Link>
                        <a
                            href="tel:119"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fcf6f5] text-[#8e483b] border border-[#ebd8d2] text-xs font-medium hover:bg-[#f6edea] transition-colors"
                            title="Saluran Siaga Medis 119"
                        >
                            <span className="material-symbols-outlined text-[15px] text-[#9c5243]">emergency</span>
                            <span>119</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Error Presentation Card */}
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col justify-center items-center relative z-10">
                <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl border border-[#d6e4dc]/80 p-6 sm:p-9 shadow-[0_16px_40px_rgba(0,67,62,0.04)] text-center relative overflow-hidden transition-all">
                    
                    {/* Status Icon Badge */}
                    <div className={`mx-auto w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-b border flex items-center justify-center mb-5 ${currentError.iconContainer}`}>
                        <span className="material-symbols-outlined text-[32px] sm:text-[36px]">
                            {currentError.icon}
                        </span>
                    </div>

                    {/* Status Code Chip */}
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-semibold tracking-wider mb-3 ${currentError.badgeStyle}`}>
                        <span>{currentError.badge}</span>
                    </div>

                    {/* Editorial Headline */}
                    <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#12221e] leading-snug tracking-tight">
                        {currentError.title}
                    </h1>

                    {/* Empathetic & Clear Explanation */}
                    <p className="text-xs sm:text-sm text-[#4d635c] leading-relaxed max-w-md mx-auto mt-2.5 mb-7">
                        {message || currentError.description}
                    </p>

                    {/* Action Button Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto">
                        {renderButton(currentError.primaryBtn, true)}
                        {renderButton(currentError.secondaryBtn, false)}
                    </div>

                    {/* Subtle Trace & Meta Info */}
                    <div className="mt-7 pt-4 border-t border-[#ebf2ee] flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#6b8078] font-mono">
                        <span>Ref ID: <strong className="text-[#1a2e29] font-medium">{generatedTraceId}</strong></span>
                        {currentError.shortcut ? (
                            currentError.shortcut.isExternal ? (
                                <a
                                    href={currentError.shortcut.href}
                                    className="text-[#00433e] font-sans font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>{currentError.shortcut.text}</span>
                                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                </a>
                            ) : (
                                <Link
                                    href={currentError.shortcut.href}
                                    className="text-[#00433e] font-sans font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>{currentError.shortcut.text}</span>
                                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                </Link>
                            )
                        ) : (
                            <span className="text-[#728780] font-sans">{currentError.footerMeta || 'Enkripsi Sesi Aktif'}</span>
                        )}
                    </div>
                </div>

                {/* Status Switcher Bar (Quick preview for testing and verifying all status codes) */}
                <div className="mt-8 text-center space-y-1.5 opacity-70 hover:opacity-100 transition-opacity">
                    <span className="text-[11px] text-[#6b8078] block">
                        Pratinjau Kode Status Lain:
                    </span>
                    <div className="inline-flex flex-wrap items-center justify-center gap-1 p-1 bg-white/70 backdrop-blur-xs rounded-full border border-[#d6e4dc] shadow-2xs">
                        {[403, 404, 419, 429, 500, 503].map((code) => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setActiveCode(code)}
                                className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                                    activeCode === code
                                        ? 'bg-[#00433e] text-white shadow-2xs'
                                        : 'text-[#4d635c] hover:text-[#00433e] hover:bg-[#edf5f0]'
                                }`}
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Quiet Minimalist Footer */}
            <footer className="w-full py-4 sm:py-5 border-t border-[#e1ede5]/70 bg-white/40 text-[11px] text-[#6b8078] text-center">
                <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span>© 2026 AEVYRA HEALTHCARE • Platform Intervensi Preventif</span>
                    <div className="flex items-center gap-2.5 text-[#7e948c]">
                        <span>Standar SatuSehat Kemenkes</span>
                        <span>•</span>
                        <span>Enkripsi UU PDP</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
