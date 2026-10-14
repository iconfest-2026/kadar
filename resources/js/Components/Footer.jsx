import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const navFeatures = [
        { name: 'Pemindai Kamera Label & Obat BPOM', href: '/member/scanner', requiresAuth: true },
        { name: 'Tracker & Metrik Kesehatan (HBE)', href: '/member/dashboard', requiresAuth: true },
        { name: 'Program Tantangan Remisi 90 Hari', href: '/member/challenges', requiresAuth: true },
        { name: 'Hub Konsultasi Dokter Spesialis & AI', href: '/member/consultations-hub', requiresAuth: true },
        { name: 'Komunitas & Forum Diskusi Pasien', href: '/member/community', requiresAuth: true },
        { name: 'Simulasi Kasus Metabolik 24 Jam', href: '/arcade', requiresAuth: false },
        { name: 'Pilihan Paket Keanggotaan', href: '/paket', requiresAuth: false },
        { name: 'Pusat Tanya Jawab Klinis (FAQ)', href: '/faq', requiresAuth: false },
    ];

    return (
        <footer className="w-full bg-[#f2f7f4] text-[#2c3d38] pt-6 pb-4 sm:pt-7 sm:pb-5 border-t border-[#e0ece5]">
            <div className="max-w-7xl min-w-0 mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 pb-1">
                    {/* Brand & Mission Statement */}
                    <div className="lg:col-span-4 space-y-2.5">
                        <Link href="/" className="inline-flex items-center shrink-0">
                            <img
                                src="/image/Logo_EVYRA_Horizontal.png"
                                alt="AEVYRA — Your Health, Ahead"
                                className="h-6.5 sm:h-7 w-auto object-contain"
                            />
                        </Link>

                        <p className="text-[11px] text-[#52655f] max-w-sm leading-relaxed">
                            Platform intervensi dini pra-diabetes dan pemindai nutrisi preventif berbasis visi komputer, interoperabilitas SatuSehat Kemenkes RI, dan pendampingan dokter spesialis terverifikasi.
                        </p>

                        <div className="pt-0.5">
                            {authUser ? (
                                <Link 
                                    href="/member/dashboard" 
                                    className="text-[11px] text-primary font-bold hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Buka Dashboard Pasien</span>
                                    <span>→</span>
                                </Link>
                            ) : (
                                <Link 
                                    href="/login" 
                                    className="text-[11px] text-primary font-bold hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Masuk ke Portal Pasien</span>
                                    <span>→</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Features Directory: Split into 2 columns (Kiri - Kanan) on all viewports */}
                    <div className="lg:col-span-5 space-y-2.5">
                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold block">
                            Eksplorasi Platform
                        </span>
                        <ul className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1.5 text-[11px] text-[#52655f]">
                            {navFeatures.map((item, idx) => (
                                <li key={idx} className="min-w-0">
                                    <Link 
                                        href={item.href} 
                                        className="hover:text-primary hover:underline transition-colors flex items-center justify-between gap-1 group py-0.5"
                                        title={item.name}
                                    >
                                        <span className="truncate group-hover:translate-x-0.5 transition-transform">
                                            {item.name}
                                        </span>
                                        {item.requiresAuth && !authUser && (
                                            <span className="text-[8.5px] px-1 py-0.1 rounded bg-[#e4ede7] text-[#1c6454] font-mono group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                                Login
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Support: Side by Side (Kiri - Kanan) on mobile */}
                    <div className="lg:col-span-3 space-y-2.5">
                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold block">
                            Regulasi &amp; Bantuan
                        </span>
                        <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-1.5 text-[11px] text-[#52655f]">
                            <li className="min-w-0">
                                <Link href="/privacy" className="hover:text-primary hover:underline truncate block py-0.5">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li className="min-w-0">
                                <Link href="/terms" className="hover:text-primary hover:underline truncate block py-0.5">
                                    Syarat &amp; Ketentuan
                                </Link>
                            </li>
                            <li className="col-span-2 sm:col-span-1 min-w-0">
                                <a href="mailto:care@aevyra.health" className="hover:text-primary hover:underline truncate block py-0.5 font-mono text-[10.5px]">
                                    care@aevyra.health
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Security Strip */}
                <div className="pt-4 border-t border-[#e0ece5] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#63756f] text-center sm:text-left">
                    <span>© 2026 AEVYRA HEALTHCARE.</span>
                </div>
            </div>
        </footer>
    );
}

