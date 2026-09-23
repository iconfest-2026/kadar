import React from 'react';
import { Link } from '@inertiajs/react';

export default function CtaBanner() {
    return (
        <section className="w-full relative pb-space-xl px-gutter lg:px-margin" id="auth-portal">
            <div className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden p-space-lg sm:p-space-xl bg-gradient-to-br from-primary via-primary to-primary-container/90 text-on-primary rounded-3xl space-y-space-sm text-center shadow-2xl shadow-primary/20 border border-primary-fixed-dim/20">
                    {/* Atmospheric Glow Inside Banner */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-primary-fixed-dim/25 rounded-full blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl"
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-space-sm">
                        <span className="font-label-mono text-[11px] px-3.5 py-1.5 bg-primary-container/80 backdrop-blur-sm text-primary-fixed rounded-full uppercase inline-flex items-center gap-1.5 font-semibold border border-primary-fixed-dim/30 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                            <span>PERIODE INISIASI 2025 // KUOTA TERBATAS 500 SUBJEK</span>
                        </span>

                        <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl max-w-xl mx-auto leading-tight font-normal text-surface">
                            Mulai Langkah Preventif Anda Hari Ini.
                        </h3>

                        <p className="text-body-sm text-xs sm:text-base text-primary-fixed-dim max-w-lg mx-auto leading-relaxed">
                            Skrining mandiri 3 menit, kenali komposisi pangan Anda, dan pantau biomarker bersama dokter spesialis.
                        </p>

                        <div className="pt-2 flex flex-wrap items-center justify-center gap-space-sm">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-1.5 px-7 py-3.5 rounded-full bg-surface text-primary text-body-sm font-semibold hover:bg-surface-variant transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg hover:shadow-white/10"
                            >
                                <span>Daftar Tanpa Biaya Sekarang</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                            <a
                                href="mailto:docket@kadar.kemkes.go.id"
                                href="mailto:care@aevyra.health"
                                className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-primary-container/80 backdrop-blur-sm text-on-primary text-body-sm font-medium hover:bg-primary-container transition-all duration-200 active:scale-95 border border-primary-fixed-dim/30"
                            >
                                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                                <span>Konseling Pasien</span>
                            </a>
                        </div>

                        <div className="pt-4 font-label-mono text-[10px] text-primary-fixed-dim/90 border-t border-primary-container/50 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                RESMI TERVERIFIKASI SATUSEHAT KEMENKES RI
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span>STANDAR MEDIS PWA ENKRIPSI AES-256</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
