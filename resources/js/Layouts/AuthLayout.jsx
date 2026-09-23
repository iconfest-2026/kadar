import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f7faf8] text-[#142320] flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
            {/* Top Atmospheric Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-[#e3f0e9]/60 blur-3xl pointer-events-none -z-10"></div>
            <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#f4ebe1]/50 blur-3xl pointer-events-none -z-10"></div>

            {/* Top Header Bar */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-surface-container-high/60 h-14 sticky top-0 z-30">
                <div className="h-full max-w-310 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center group active:scale-95 transition-transform">
                        <img
                            src="/image/Logo_AEVYRA_Horizontal.png"
                            alt="AEVYRA — Your Health, Ahead"
                            className="h-7 sm:h-8 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-3 text-xs">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf5f0] text-[#1c6454] border border-[#d4e8dd] font-mono text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>ENKRIPSI AES-256 • SATUSEHAT KEMENKES</span>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-[#52645f] hover:text-primary font-medium transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            <span>Beranda</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 max-w-310 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center">
                {children}
            </main>

            {/* Bottom Regulatory Footer */}
            <footer className="w-full bg-white/70 backdrop-blur-xs border-t border-surface-container-high/60 py-4 text-center">
                <div className="max-w-310 mx-auto px-4 text-center space-y-1">
                    <p className="text-[11px] text-[#63746f]">
                        © 2026 AEVYRA Health Platform • Kepatuhan UU Perlindungan Data Pribadi No. 27/2022
                    </p>
                    <p className="text-[10px] text-[#859691] font-mono">
                        Standar Interoperabilitas HL7 FHIR • PERKENI Clinical Guidelines
                    </p>
                </div>
            </footer>
        </div>
    );
}
