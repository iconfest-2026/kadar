import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const navFeatures = [
        { name: 'Simulasi Pemindai Kamera', href: '#scanner-demo' },
        { name: 'Arsitektur Ekosistem 6 Pilar', href: '#features' },
        { name: 'Bukti Klinis Remisi 90 Hari', href: '#promo' },
        { name: 'Pilihan Paket Keanggotaan', href: '#tiers' },
        { name: 'Tanya Jawab & Standar Medis', href: '#faq' },
    ];

    return (
        <footer className="w-full bg-[#f2f7f4] text-[#2c3d38] pt-14 pb-10 border-t border-[#e0ece5]">
            <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-4">
                    {/* Brand & Mission Statement */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/image/Logo_AEVYRA_Horizontal.png"
                                alt="AEVYRA — Your Health, Ahead"
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#1c6454] border border-[#d6e7dd] font-mono">
                                Ekosistem Medis 2026
                            </span>
                        </div>

                        <p className="text-xs text-[#52655f] max-w-sm leading-relaxed">
                            Platform intervensi dini pra-diabetes dan pemindai nutrisi preventif berbasis visi komputer, interoperabilitas SatuSehat Kemenkes RI, dan pendampingan dokter spesialis terverifikasi.
                        </p>

                        {/* Serene Operational Status Indicator */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#d6e7dd] text-[11px] text-[#1c6454]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                            <span>Sistem Operasional Aktif (99.98%)</span>
                        </div>

                        <div className="pt-1">
                            <Link href="/login" className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1">
                                <span>Masuk ke Portal Pasien</span>
                                <span>→</span>
                            </Link>
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
                                    <a href={item.href} className="hover:text-primary hover:underline transition-colors">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal, Support & Emergency */}
                    <div className="lg:col-span-3 space-y-3">
                        <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                            Regulasi &amp; Bantuan
                        </span>
                        <ul className="space-y-1.5 text-xs text-[#52655f] pb-1">
                            <li><Link href="/privacy" className="hover:text-primary hover:underline">Kebijakan Privasi (UU PDP)</Link></li>
                            <li><Link href="/terms" className="hover:text-primary hover:underline">Syarat &amp; Ketentuan Layanan</Link></li>
                            <li><a href="mailto:care@aevyra.health" className="hover:text-primary hover:underline">care@aevyra.health</a></li>
                        </ul>

                        {/* Dignified Emergency Hotline Box */}
                        <a
                            href="tel:119"
                            className="mt-3 p-3.5 rounded-2xl bg-[#faf5f3] text-[#2c1e1c] block hover:bg-[#f5edea] transition-all border border-[#ebd8d2]"
                        >
                            <div className="flex items-center justify-between text-[10px] text-[#8e483b] uppercase font-medium">
                                <span>Siaga Medis Kemenkes</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#9c5243]"></span>
                            </div>
                            <span className="font-serif text-sm font-medium text-[#2c1e1c] block mt-0.5">
                                Hotline Darurat 119
                            </span>
                        </a>
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

