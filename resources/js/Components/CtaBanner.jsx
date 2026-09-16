import React from 'react';
import { Link } from '@inertiajs/react';

export default function CtaBanner() {
    return (
        <section className="w-full pb-space-xl px-gutter lg:px-margin bg-surface" id="auth-portal">
            <div className="max-w-4xl mx-auto">
                <div className="p-space-lg bg-primary text-on-primary rounded-3xl space-y-space-sm text-center shadow-lg border border-primary-container">
                    <span className="font-label-mono text-[11px] px-3 py-1 bg-primary-container text-primary-fixed rounded-full uppercase inline-block font-semibold">
                        PERIODE INISIASI 2025 // KUOTA TERBATAS 500 SUBJEK
                    </span>

                    <h3 className="font-display text-3xl sm:text-4xl max-w-xl mx-auto leading-tight font-normal">
                        Mulai Langkah Preventif Anda Hari Ini.
                    </h3>

                    <p className="text-body-sm text-xs sm:text-sm text-primary-fixed-dim max-w-md mx-auto leading-relaxed">
                        Skrining mandiri 3 menit, kenali komposisi pangan Anda, dan pantau biomarker bersama dokter spesialis.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-space-sm">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-surface text-primary text-body-sm font-semibold hover:bg-surface-variant transition-all duration-200 active:scale-95 shadow-xs hover:shadow-md"
                        >
                            Daftar Tanpa Biaya Sekarang →
                        </Link>
                        <a
                            href="mailto:docket@kadar.kemkes.go.id"
                            className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-primary-container text-on-primary text-body-sm font-medium hover:bg-primary transition-all duration-200 active:scale-95 border border-primary-fixed-dim/30"
                        >
                            Konseling Pasien
                        </a>
                    </div>

                    <div className="pt-2 font-label-mono text-[10px] text-primary-fixed-dim border-t border-primary-container/60">
                        <span>RESMI TERVERIFIKASI SATUSEHAT KEMENKES RI</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
