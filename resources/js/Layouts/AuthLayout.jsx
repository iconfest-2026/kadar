import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary selection:text-on-primary">
            {/* Top Clinical Docket Bar */}
            <div className="w-full bg-surface-container-high px-4 sm:px-8 py-1.5 border-b border-surface-container">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between font-label-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                        <span>DOKET AUTENTIKASI RESMI // SATUSEHAT KEMENKES RI // ENKRIPSI AES-256</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3">
                        <span>ISO/IEC 27001 ISMS</span>
                        <span className="text-primary font-semibold">SSL 256-BIT SECURE</span>
                    </div>
                </div>
            </div>

            {/* Main Auth Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    {/* Brand Header */}
                    <div className="text-center space-y-1">
                        <Link href="/" className="inline-flex items-center gap-2 group active:scale-95 transition-transform">
                            <span className="font-display text-3xl font-black text-primary tracking-tight">AEVYRA</span>
                            <span className="font-label-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                                v2.4
                            </span>
                        </Link>
                        <h1 className="font-headline text-xl font-bold text-on-surface pt-1">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-outline-variant/60 shadow-xs">
                        {children}
                    </div>

                    {/* Bottom Accreditation & Back link */}
                    <div className="text-center space-y-2 font-label-mono text-[11px] text-on-surface-variant">
                        <Link href="/" className="inline-flex items-center gap-1 text-primary hover:underline font-medium">
                            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                            <span>Kembali ke Beranda</span>
                        </Link>
                        <p className="text-[10px] text-on-surface-variant/80">
                            Terhubung langsung dengan profil SatuSehat ID & Kepatuhan UU PDP No. 27/2022
                        </p>
                    </div>
                </div>
            </div>

            {/* Minimalist Footer */}
            <div className="py-3 text-center border-t border-surface-container font-label-mono text-[10px] text-on-surface-variant">
                © 2026 AEVYRA HEALTH PROTOCOL ARCHIVE. HAK CIPTA DILINDUNGI.
            </div>
        </div>
    );
}
