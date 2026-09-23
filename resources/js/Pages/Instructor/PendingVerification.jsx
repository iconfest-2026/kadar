import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function PendingVerification({ status = 'PENDING' }) {
    const isSuspended = status === 'SUSPENDED';

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#f0f8f4] text-on-surface flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary selection:text-on-primary">
            <Head title="Verifikasi Akun Instruktur — Kadar" />
            <Head title="Verifikasi Akun Instruktur — AEVYRA" />

            {/* Ambient Glow Orbs */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-secondary-fixed/30 via-primary-fixed/20 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-primary-fixed-dim/30 to-transparent blur-[140px] rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#00433e_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.035]" />
            </div>

            {/* Glass Card */}
            <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-primary/15 shadow-xl text-center space-y-6">
                <div className="mx-auto w-16 h-16 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-xs">
                    <span className="material-symbols-outlined text-3xl">
                        {isSuspended ? 'lock_person' : 'pending_actions'}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-label-mono font-bold uppercase bg-secondary-fixed/40 text-secondary-container border border-secondary/20">
                        Status: {status}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-heading font-black text-primary tracking-tight">
                        {isSuspended ? 'Akses Instruktur Dibekukan' : 'Verifikasi Kredensial Berlangsung'}
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {isSuspended 
                            ? 'Akun bimbingan Anda saat ini sedang ditangguhkan oleh Administrator sistem. Silakan hubungi tim kepatuhan medis kami.' 
                            : 'Profil Anda telah terdaftar sebagai calon tenaga ahli. Administrator platform sedang memverifikasi STR / sertifikasi lisensi kompetensi Anda.'
                        }
                    </p>
                </div>

                <div className="p-4 bg-primary/[0.03] rounded-2xl border border-primary/10 text-xs text-left space-y-2">
                    <div className="flex items-center gap-2 font-bold text-primary">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        <span>Standar Keamanan Human-in-the-Loop</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-[11px]">
                        Sesuai pedoman etika medis Kadar, hanya instruktur dengan status <strong>ACTIVE</strong> terverifikasi yang diizinkan mengakses data rekam fisiologis member.
                        Sesuai pedoman etika medis AEVYRA, hanya instruktur dengan status <strong>ACTIVE</strong> terverifikasi yang diizinkan mengakses data rekam fisiologis member.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-5 py-2.5 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs shadow-xs transition-all"
                    >
                        Keluar Akun
                    </button>
                    <Link
                        href="/"
                        className="px-5 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all"
                    >
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}

