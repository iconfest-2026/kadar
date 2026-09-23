import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const pwaFeatures = [
        'Scanner Open Cam (Pangan & Obat)',
        'Konsultasi Chat AI & Instruktur',
        'Riwayat & Tracker Kesehatan Pribadi',
        'Rekomendasi Personal Berbasis Profil',
        'Program Challenge 14–90 Hari',
        'Booking Konsultasi Terjadwal',
        'Komunitas & Forum Diskusi',
        'Badge & Gamifikasi Kesehatan',
    ];


    return (
        <footer className="w-full bg-surface-container-low text-on-surface pt-space-lg pb-space-md border-t border-surface-container">
            <div className="max-w-7xl mx-auto px-gutter lg:px-margin">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-space-md pb-space-lg">
                    {/* Brand */}
                    <div className="lg:col-span-5 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-display text-2xl font-normal text-primary">Kadar</span>
                            <span className="font-display text-2xl font-bold text-primary">AEVYRA</span>
                            <span className="font-label-mono text-[10px] px-2 py-0.5 rounded bg-surface text-primary border border-surface-container font-medium">
                                PWA Ecosystem v2.4
                            </span>
                        </div>
                        <p className="text-body-sm text-xs text-on-surface-variant max-w-sm leading-relaxed">
                            Website PWA kesehatan cerdas untuk scan nutrisi & obat, bimbingan instruktur kesehatan, tracking mandiri, dan tanggap darurat ambulan berbasis lokasi.
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                            <Link href="/login" className="text-xs text-primary font-semibold hover:underline">
                                Masuk Portal →
                            </Link>
                            <Link href="/register" className="text-xs text-primary font-semibold hover:underline">
                                Daftar Akun →
                            </Link>
                        </div>
                    </div>

                    {/* Features Directory */}
                    <div className="lg:col-span-4 space-y-1">
                        <span className="font-label-mono text-[11px] uppercase tracking-wider text-primary font-semibold block">
                            Fitur Unggulan PWA
                        </span>
                        <ul className="space-y-1 text-body-sm text-xs text-on-surface-variant">
                            {pwaFeatures.map((item, idx) => (
                                <li key={idx} className="hover:text-primary transition-colors cursor-pointer">
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Emergency */}
                    <div className="lg:col-span-3 space-y-2">
                        <span className="font-label-mono text-[11px] uppercase tracking-wider text-primary font-semibold block">
                            Legal &amp; Darurat
                        </span>
                        <ul className="space-y-1 text-body-sm text-xs text-on-surface-variant pb-1">
                            <li><Link href="/privacy" className="hover:text-primary">Kebijakan Privasi</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Syarat &amp; Ketentuan</Link></li>
                        </ul>

                        <a
                            href="tel:119"
                            className="mt-3 p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant block hover:bg-tertiary hover:text-on-tertiary transition-colors active:scale-95 border border-tertiary/20"
                        >
                            <span className="font-data-md text-sm font-bold block">HOTLINE AMBULAN 119</span>
                            <span className="font-label-mono text-[9px] uppercase">Siaga Bencana &amp; Darurat Medis</span>
                        </a>
                    </div>
                </div>

                {/* Bottom status */}
                <div className="pt-space-sm border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-2 font-label-mono text-[10px] text-on-surface-variant">
                    <span>© 2025 KADAR HEALTH PWA. HAK CIPTA DILINDUNGI.</span>
                    <span>© 2026 AEVYRA HEALTH PWA. HAK CIPTA DILINDUNGI.</span>
                    <div className="flex items-center gap-3">
                        <span>PWA OFFLINE READY</span>
                        <span className="text-primary font-semibold">GPS &amp; ENCRYPTED SECURE</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
