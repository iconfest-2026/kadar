import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children, title, subtitle, maxWidth = 'max-w-5xl' }) {
    return (
        <div className="min-h-screen bg-[#f7faf8] text-[#142320] flex flex-col justify-between font-sans selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-[#e3f0e9]/60 blur-3xl pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#f4ebe1]/50 blur-3xl pointer-events-none -z-10" />

            {/* Top Header Bar */}
            <header className="w-full bg-white/80 backdrop-blur-md border-b border-surface-container-high/60 h-16 sticky top-0 z-30 shadow-2xs">
                <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center group active:scale-95 transition-transform">
                        <img
                            src="/image/Logo_EVYRA_Horizontal.png"
                            alt="AEVYRA — Your Health, Ahead"
                            className="h-8 sm:h-9 w-auto object-contain"
                        />
                    </Link>

                    <div className="flex items-center gap-3 text-xs">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[#52645f] hover:text-primary hover:bg-primary/5 font-medium transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            <span>Beranda</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Auth Container */}
            <main className={`flex-1 w-full ${maxWidth} mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center items-center animate-in fade-in duration-200`}>
                {(title || subtitle) && (
                    <div className="text-center space-y-1 mb-6 max-w-md mx-auto">
                        {title && (
                            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                <div className="w-full">
                    {children}
                </div>
            </main>

            {/* Bottom Regulatory Footer */}
            <footer className="w-full bg-white/70 backdrop-blur-xs border-t border-surface-container-high/60 py-4 text-center">
                <div className="max-w-6xl mx-auto px-4 text-center space-y-1">
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
