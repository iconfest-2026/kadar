import React from 'react';
import { Link } from '@inertiajs/react';

export default function CtaBanner() {
    return (
        <section className="w-full pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto" id="auth-portal">
            <div className="relative overflow-hidden p-6 sm:p-10 lg:p-14 bg-primary text-white rounded-3xl space-y-6 text-center shadow-[0_12px_40px_rgba(0,67,62,0.18)]">
                {/* Subtle Restorative Ambient Glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#1c6454]/30 rounded-full blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-primary-container/40 rounded-full blur-3xl"
                />

                {/* Content */}
                <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
                    {/* Live Pilot Program Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] text-[#e0f2e8] border border-white/15">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7dd4b3]"></span>
                        <span>Program Intervensi Glikemik • Kuota Peserta Terbimbing</span>
                    </div>

                    {/* Editorial Headline */}
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] font-normal text-white">
                        Kendalikan glukosa darah &amp; lindungi metabolisme Anda hari ini.
                    </h3>

                    <p className="text-xs sm:text-sm text-[#d4ebe0] max-w-lg mx-auto leading-relaxed">
                        Arahkan kamera ke label kemasan makanan Anda. Dapatkan pemetaan beban glikemik seketika, rekomendasi gizi dari dokter konsultan, dan panduan remisi bertahap.
                    </p>

                    {/* Action Buttons (Standard 48px Touch Ergonomics) */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center min-h-12 px-7 py-3.5 rounded-full bg-white text-primary text-xs font-medium hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-sm text-center"
                        >
                            <span>Mulai Skrining Mandiri Bebas Biaya</span>
                            <span className="ml-1 text-xs">→</span>
                        </Link>
                        <a
                            href="mailto:care@aevyra.health"
                            className="inline-flex items-center justify-center min-h-12 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/15 transition-all active:scale-95 border border-white/20 text-center"
                        >
                            <span>Tanya Edukator Klinis</span>
                        </a>
                    </div>

                    {/* Trust Footnote */}
                    <div className="pt-5 text-[11px] text-[#b3dac8] border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                        <span>Terintegrasi SatuSehat Kemenkes</span>
                        <span>•</span>
                        <span>Standar Enkripsi Medis AES-256</span>
                        <span>•</span>
                        <span>Kepatuhan UU PDP No. 27/2022</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

