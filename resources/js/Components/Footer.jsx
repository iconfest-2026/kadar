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
        { name: 'Gim Glucose Dash Arcade', href: '/arcade', requiresAuth: false },
        { name: 'Pilihan Paket Keanggotaan', href: '/paket', requiresAuth: false },
        { name: 'Pusat Tanya Jawab Klinis (FAQ)', href: '/faq', requiresAuth: false },
    ];

    return (
        <footer id="site-footer" className="w-full bg-[#f2f7f4] text-[#2c3d38] pt-14 pb-10 border-t border-[#e0ece5] relative">
            <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-4">
                    {/* Brand & Mission Statement */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center">
                            <img
                                src="/image/Logo_AEVYRA_Horizontal.png"
                                alt="AEVYRA — Your Health, Ahead"
                                className="h-8 w-auto object-contain"
                            />
                        </div>

                        <p className="text-xs text-[#52655f] max-w-sm leading-relaxed">
                            Platform intervensi dini pra-diabetes dan pemindai nutrisi preventif berbasis visi komputer, interoperabilitas SatuSehat Kemenkes RI, dan pendampingan dokter spesialis terverifikasi.
                        </p>

                        <div className="pt-1">
                            {authUser ? (
                                <Link 
                                    href="/member/dashboard" 
                                    className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Buka Dashboard Pasien</span>
                                    <span>→</span>
                                </Link>
                            ) : (
                                <Link 
                                    href="/login" 
                                    className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Masuk ke Portal Pasien</span>
                                    <span>→</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Features Directory */}
                    <div className="lg:col-span-4 space-y-3">
                        <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                            Eksplorasi Platform
                        </span>
                        <ul className="space-y-2 text-xs text-[#52655f]">
                            {navFeatures.map((item, idx) => (
                                <li key={idx}>
                                    <Link 
                                        href={item.href} 
                                        className="hover:text-primary hover:underline transition-colors flex items-center justify-between group"
                                    >
                                        <span className="group-hover:translate-x-0.5 transition-transform">
                                            {item.name}
                                        </span>
                                        {item.requiresAuth && !authUser && (
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#e4ede7] text-[#1c6454] font-mono group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                                                Login
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Support */}
                    <div className="lg:col-span-3 space-y-3">
                        <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                            Regulasi &amp; Bantuan
                        </span>
                        <ul className="space-y-1.5 text-xs text-[#52655f]">
                            <li><Link href="/privacy" className="hover:text-primary hover:underline">Kebijakan Privasi (UU PDP)</Link></li>
                            <li><Link href="/terms" className="hover:text-primary hover:underline">Syarat &amp; Ketentuan Layanan</Link></li>
                            <li><a href="mailto:care@aevyra.health" className="hover:text-primary hover:underline">care@aevyra.health</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Legal & Security Strip */}
                <div className="pt-6 border-t border-[#e0ece5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#63756f]">
                    <span>© 2026 AEVYRA HEALTHCARE. HAK CIPTA DILINDUNGI UU.</span>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[#1c6454] font-medium">Enkripsi Medis AES-256</span>
                        <span>•</span>
                        <span>SatuSehat Compatible</span>
                        <span>•</span>
                        <span>PERKENI Protocol Compliant</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

