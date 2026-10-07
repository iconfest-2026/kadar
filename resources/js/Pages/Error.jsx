import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Error({ status = 404, message = null, errorId = null }) {
    const [activeCode, setActiveCode] = useState(status || 404);

    const errorConfigs = {
        403: {
            code: 403,
            badge: 'AKSES DIRESTRIKSI • OTORISASI DIPERLUKAN',
            badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
            icon: 'lock',
            iconBg: 'bg-rose-100 text-rose-700',
            title: 'Akses Dibatasi oleh Protokol Keamanan Medis',
            subtitle: 'Otorisasi Khusus Diperlukan',
            description: 'Anda tidak memiliki hak otorisasi untuk mengakses area data klinis atau konsol tata kelola ini. Area ini dilindungi oleh regulasi privasi rekam medis digital UU PDP No. 27/2022 dan hanya dapat diakses oleh peran tertentu (Admin / Dokter Terverifikasi).',
            suggestions: [
                'Pastikan Anda telah masuk dengan akun yang memiliki hak akses yang sesuai (Role Admin / Instruktur Terverifikasi).',
                'Jika Anda adalah dokter binaan, pastikan nomor STR dan SIP Anda telah selesai divalidasi oleh Administrator.',
                'Hubungi tim administrator faskes jika Anda membutuhkan eskalasi hak istimewa operasional.',
            ],
            primaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
            secondaryBtn: { text: 'Masuk Akun Lain', href: '/login', icon: 'switch_account' },
        },
        404: {
            code: 404,
            badge: 'KODE 404 • DOKUMEN TIDAK DITEMUKAN',
            badgeStyle: 'bg-emerald-50 text-[#1c6454] border-[#d4e8dd]',
            icon: 'travel_explore',
            iconBg: 'bg-emerald-100 text-[#1c6454]',
            title: 'Halaman atau Rekam Data Tidak Ditemukan',
            subtitle: 'Alamat URL Mungkin Telah Berubah',
            description: 'Tautan yang Anda tuju mungkin telah dipindahkan, dinonaktifkan, atau parameter identitas rekam medis tidak terdaftar dalam indeks sistem AEVYRA.',
            suggestions: [
                'Periksa kembali penulisan URL pada bilah alamat peramban Anda.',
                'Gunakan menu navigasi utama untuk mencari fitur pemindai kamera, tracker biomarker, atau jadwal konsultasi.',
                'Jika mencari produk pangan/obat, buka langsung modul Scanner Kamera BPOM untuk pemindaian live.',
            ],
            primaryBtn: { text: 'Buka Pemindai Nutrisi', href: '/member/scanner', icon: 'photo_camera' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
        },
        419: {
            code: 419,
            badge: 'KODE 419 • SESI ENKRIPSI KEDALUWARSA',
            badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
            icon: 'history_toggle_off',
            iconBg: 'bg-amber-100 text-amber-800',
            title: 'Sesi Keamanan Enkripsi Telah Kedaluwarsa',
            subtitle: 'Token CSRF & Autentikasi Habis Masa Berlaku',
            description: 'Untuk melindungi data kesehatan pribadi Anda dari manipulasi pihak ketiga, sistem secara otomatis mengunci formulir jika tidak terdapat aktivitas interaktif dalam kurun waktu tertentu.',
            suggestions: [
                'Muat ulang halaman untuk memperbarui token keamanan sesi Anda.',
                'Kirim ulang formulir yang sebelumnya sedang Anda isi.',
                'Jika kendala berulang, silakan masuk kembali ke akun AEVYRA Anda.',
            ],
            primaryBtn: { text: 'Muat Ulang Halaman', action: 'reload', icon: 'refresh' },
            secondaryBtn: { text: 'Masuk Ulang Akun', href: '/login', icon: 'login' },
        },
        429: {
            code: 429,
            badge: 'KODE 429 • BATAS LAJU AKSES TERCAPAI',
            badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200',
            icon: 'speed',
            iconBg: 'bg-amber-100 text-amber-800',
            title: 'Laju Permintaan Melebihi Batas Kecepatan',
            subtitle: 'Rate Limit Throttling Aktif',
            description: 'Sistem mendeteksi frekuensi pengiriman data atau pemindaian OCR yang terlalu padat dalam interval singkat. Pembatasan ini diterapkan untuk menjaga ketersediaan server bagi seluruh pengguna.',
            suggestions: [
                'Tunggu 30–60 detik sebelum mengirimkan permintaan analisis kamera atau formulir berikutnya.',
                'Hindari menekan tombol submit secara bertubi-tubi.',
                'Sistem akan otomatis membuka pembatasan setelah interval pendinginan selesai.',
            ],
            primaryBtn: { text: 'Coba Lagi Nanti', action: 'reload', icon: 'update' },
            secondaryBtn: { text: 'Kembali ke Beranda', href: '/', icon: 'home' },
        },
        500: {
            code: 500,
            badge: 'KODE 500 • KENDALA INTERNAL SERVER',
            badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
            icon: 'dns',
            iconBg: 'bg-rose-100 text-rose-700',
            title: 'Terjadi Gangguan Internal pada Sistem Komputasi',
            subtitle: 'Layanan Telah Mencatat Insiden',
            description: 'Terjadi kegagalan yang tidak terduga saat memproses algoritma inferensi atau query basis data. Tim teknis dan rekayasa keandalan sistem AEVYRA telah menerima peringatan otomatis untuk segera melakukan investigasi.',
            suggestions: [
                'Coba muat ulang halaman beberapa saat lagi.',
                'Jika Anda sedang melakukan panggilan konsultasi atau darurat, gunakan tombol Siaga 119 di bawah.',
                'Kirim laporan diagnostik ke tim bantuan teknis kami jika masalah berlanjut.',
            ],
            primaryBtn: { text: 'Muat Ulang Sistem', action: 'reload', icon: 'refresh' },
            secondaryBtn: { text: 'Laporkan ke Tim Siaga', href: 'mailto:care@aevyra.health', icon: 'mail' },
        },
        503: {
            code: 503,
            badge: 'KODE 503 • PEMELIHARAAN SISTEM BERKALA',
            badgeStyle: 'bg-teal-50 text-teal-800 border-teal-200',
            icon: 'construction',
            iconBg: 'bg-teal-100 text-teal-800',
            title: 'Sistem Sedang Dalam Pemeliharaan & Peningkatan',
            subtitle: 'Sinkronisasi Basis Data SatuSehat & Kalibrasi AI',
            description: 'Platform AEVYRA sedang menjalani pemeliharaan berkala untuk peningkatan performa model visi gizi dan sinkronisasi standar interoperabilitas HL7 FHIR Kemenkes RI. Layanan akan kembali normal dalam hitungan menit.',
            suggestions: [
                'Seluruh data biomarker dan rekam konsultasi Anda aman dan terenkripsi.',
                'Layanan darurat hotline Ambulan 119 tetap beroperasi 24 jam melalui sambungan telepon langsung.',
                'Halaman akan otomatis terhubung kembali setelah proses pemeliharaan selesai.',
            ],
            primaryBtn: { text: 'Periksa Status Server', action: 'reload', icon: 'cached' },
            secondaryBtn: { text: 'Kontak Tim Support', href: 'mailto:care@aevyra.health', icon: 'support_agent' },
        },
    };

    const currentError = errorConfigs[activeCode] || errorConfigs[404];
    const generatedTraceId = errorId || `AEV-${activeCode}-${Math.floor(100000 + Math.random() * 900000)}`;

    const handleAction = (btn) => {
        if (btn.action === 'reload') {
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f7faf8] text-[#142320] flex flex-col font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
            <Head title={`${currentError.code} - ${currentError.title} | AEVYRA Health`} />

            {/* Peaceful, Serene Background Canvas Blooms */}
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-150 max-w-[90vw] h-87.5 bg-linear-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
            />
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute bottom-0 right-0 w-112.5 max-w-[80vw] h-87.5 bg-[#f4ebe1]/30 blur-3xl rounded-full"
            />

            {/* Minimalist Medical Header */}
            <header className="h-16 w-full border-b border-surface-container-high/60 bg-white/70 backdrop-blur-md sticky top-0 z-30">
                <div className="max-w-7xl min-w-0 mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/image/Logo_EVYRA_Horizontal.png"
                            alt="AEVYRA Logo"
                            className="h-7 sm:h-8 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#d8e7de] text-[11px] text-[#1c6454]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Diagnostik Sistem Siaga</span>
                        </div>
                        <a
                            href="tel:119"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf5f3] text-[#8e483b] border border-[#ebd8d2] text-xs font-medium hover:bg-[#f5edea] transition-colors"
                        >
                            <span className="material-symbols-outlined text-[15px] text-[#9c5243]">emergency</span>
                            <span>Siaga 119</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Error Presentation Card */}
            <main className="flex-1 max-w-7xl min-w-0 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center items-center relative z-10">
                <div className="w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-3xl border border-surface-container-high p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,40,36,0.04)] space-y-6 text-left">
                    
                    {/* Top Status Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-surface-container">
                        <div className="flex items-center gap-2.5">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${currentError.iconBg}`}>
                                <span className="material-symbols-outlined text-[22px]">
                                    {currentError.icon}
                                </span>
                            </div>
                            <div>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border ${currentError.badgeStyle}`}>
                                    {currentError.badge}
                                </span>
                                <span className="text-[11px] text-[#63746f] block mt-0.5">
                                    {currentError.subtitle}
                                </span>
                            </div>
                        </div>

                        <span className="font-mono text-2xl sm:text-3xl font-bold text-primary/40 tracking-wider">
                            HTTP {currentError.code}
                        </span>
                    </div>

                    {/* Editorial Headline & Explanation */}
                    <div className="space-y-2.5">
                        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#142320] leading-snug">
                            {currentError.title}
                        </h1>
                        <p className="text-xs sm:text-sm text-[#4d605a] leading-relaxed">
                            {message || currentError.description}
                        </p>
                    </div>

                    {/* Clinical Recommendations & Action Guidance */}
                    <div className="p-4 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-2.5">
                        <span className="text-[11px] font-bold text-[#1c6454] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">info</span>
                            Langkah Panduan Penanganan:
                        </span>
                        <ul className="space-y-2 text-xs text-[#445652]">
                            {currentError.suggestions.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-primary font-bold leading-none mt-0.5">•</span>
                                    <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Diagnostic Trace Info (UUID, Timestamp, Protocol) */}
                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#61736d] font-mono">
                        <span>Trace ID: <strong className="text-on-surface">{generatedTraceId}</strong></span>
                        <span>Waktu: {new Date().toLocaleTimeString('id-ID', { hour12: false })} WIB</span>
                        <span>Enkripsi: AES-256 Valid</span>
                    </div>

                    {/* Action Button Row */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {currentError.primaryBtn.action ? (
                            <button
                                type="button"
                                onClick={() => handleAction(currentError.primaryBtn)}
                                className="min-h-11 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[17px]">{currentError.primaryBtn.icon}</span>
                                <span>{currentError.primaryBtn.text}</span>
                            </button>
                        ) : (
                            <Link
                                href={currentError.primaryBtn.href}
                                className="min-h-11 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-xs flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[17px]">{currentError.primaryBtn.icon}</span>
                                <span>{currentError.primaryBtn.text}</span>
                            </Link>
                        )}

                        {currentError.secondaryBtn.href?.startsWith('mailto:') ? (
                            <a
                                href={currentError.secondaryBtn.href}
                                className="min-h-11 px-4 py-2.5 rounded-full bg-white text-[#31433f] text-xs font-medium hover:bg-[#f4faf6] transition-all active:scale-95 border border-[#dce6e1] flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[17px]">{currentError.secondaryBtn.icon}</span>
                                <span>{currentError.secondaryBtn.text}</span>
                            </a>
                        ) : (
                            <Link
                                href={currentError.secondaryBtn.href || '/'}
                                className="min-h-11 px-4 py-2.5 rounded-full bg-white text-[#31433f] text-xs font-medium hover:bg-[#f4faf6] transition-all active:scale-95 border border-[#dce6e1] flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[17px]">{currentError.secondaryBtn.icon}</span>
                                <span>{currentError.secondaryBtn.text}</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Status Switcher Bar (Quick preview for testing and verifying all status codes) */}
                <div className="mt-8 text-center space-y-2">
                    <span className="text-[11px] text-[#6b7d78] block">
                        Pratinjau Kode Status Lain:
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-white/80 rounded-full border border-surface-container shadow-2xs">
                        {[403, 404, 419, 429, 500, 503].map((code) => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setActiveCode(code)}
                                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                                    activeCode === code
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#52645f] hover:text-primary hover:bg-[#edf5f0]'
                                }`}
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Quiet Footer */}
            <footer className="w-full py-5 border-t border-surface-container-high/60 bg-white/40 text-[11px] text-[#63756f] text-center">
                <div className="max-w-7xl min-w-0 mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span>© 2026 AEVYRA HEALTHCARE • SISTEM INTEGRASI PREVENTIF</span>
                    <div className="flex items-center gap-3">
                        <span>Standar SatuSehat Kemenkes</span>
                        <span>•</span>
                        <span>UU PDP No. 27/2022</span>
                        <span>•</span>
                        <span>PERKENI Protocol</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

