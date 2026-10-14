import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function CtaBanner() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = user?.roles || [];
    const isAdmin = roles.includes('admin');
    const isInstructor = roles.includes('instructor');

    const dashboardHref = isAdmin ? '/admin/dashboard' : isInstructor ? '/instructor/dashboard' : '/member/dashboard';
    const dashboardLabel = isAdmin ? 'Buka Panel Admin' : isInstructor ? 'Buka Portal Instruktur' : 'Buka Dashboard Saya';

    return (
        <section className="w-full pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto" id="auth-portal">
            <div className="relative overflow-hidden p-5 sm:p-8 lg:p-10 bg-primary text-white rounded-2xl sm:rounded-3xl space-y-4 text-center shadow-[0_12px_40px_rgba(0,67,62,0.18)]">
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
                <div className="relative z-10 space-y-3.5 max-w-2xl mx-auto">
                    {/* Editorial Headline */}
                    <h3 className="font-serif text-xl sm:text-3xl lg:text-[42px] leading-[1.2] font-normal text-white">
                        Kendalikan glukosa darah &amp; lindungi metabolisme Anda hari ini.
                    </h3>

                    <p className="text-[11px] sm:text-sm text-[#d4ebe0] max-w-lg mx-auto leading-relaxed">
                        Arahkan kamera ke label kemasan makanan Anda. Dapatkan pemetaan beban glikemik seketika, rekomendasi gizi dari dokter konsultan, dan panduan remisi bertahap.
                    </p>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
                        {user ? (
                            <Link
                                href={dashboardHref}
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-bold hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-xs text-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                    {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                </span>
                                <span>{dashboardLabel}</span>
                                <span className="ml-1 text-xs">→</span>
                            </Link>
                        ) : (
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-medium hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-xs text-center"
                            >
                                <span>Mulai Skrining Mandiri Bebas Biaya</span>
                                <span className="ml-1 text-xs">→</span>
                            </Link>
                        )}
                        <a
                            href="mailto:care@aevyra.health"
                            className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all active:scale-95 border border-white/20 text-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                            <span>Tanya Tim Dokter</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
