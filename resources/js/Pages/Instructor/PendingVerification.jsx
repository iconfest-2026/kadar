import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Alert, Badge } from '@/Components/UI';

export default function PendingVerification({ status = 'PENDING_VERIFICATION', profile }) {
    const isSuspended = status === 'SUSPENDED';
    const isRejected = status === 'REJECTED' || Boolean(profile?.rejection_reason);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-[#f0f8f4] text-on-surface flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary selection:text-on-primary">
            <Head title="Status Verifikasi Instruktur — AEVYRA" />

            {/* Ambient Background Glow */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/30 via-teal-200/20 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-gradient-to-bl from-teal-300/20 to-transparent blur-[140px] rounded-full" />
            </div>

            {/* Card Container */}
            <div className="relative z-10 max-w-lg w-full bg-white/95 rounded-3xl p-8 sm:p-10 border border-primary/15 shadow-xl text-center space-y-6">
                <div
                    className={`mx-auto w-16 h-16 rounded-3xl flex items-center justify-center shadow-xs ${
                        isSuspended || isRejected
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                    }`}
                >
                    <span className="material-symbols-outlined text-3xl">
                        {isSuspended ? 'lock_person' : isRejected ? 'gpp_bad' : 'verified_user'}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-center">
                        <Badge
                            variant={isSuspended || isRejected ? 'destructive' : 'warning'}
                            dot
                            pulse={!isSuspended && !isRejected}
                        >
                            {isSuspended
                                ? 'AKUN DIBEKUKAN'
                                : isRejected
                                ? 'VERIFIKASI DITOLAK'
                                : 'DALAM PENINJAUAN ADMIN'}
                        </Badge>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-heading font-black text-primary tracking-tight">
                        {isSuspended
                            ? 'Akses Instruktur Dinonaktifkan'
                            : isRejected
                            ? 'Dokumen Kredensial Perlu Revisi'
                            : 'Verifikasi Kredensial Medis Berlangsung'}
                    </h1>

                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {isSuspended
                            ? 'Akun bimbingan Anda saat ini dinonaktifkan sementara oleh Administrator sistem. Silakan hubungi tim audit kepatuhan medis AEVYRA.'
                            : isRejected
                            ? 'Permohonan verifikasi kredensial medis Anda belum dapat disetujui. Silakan periksa catatan dari admin di bawah.'
                            : 'Pendaftaran Anda sebagai tenaga ahli kesehatan sedang ditinjau. Tim audit AEVYRA sedang memvalidasi keabsahan nomor STR, SIP, dan sertifikasi profesi Anda.'}
                    </p>
                </div>

                {/* Profile Submitted Summary */}
                {profile && (
                    <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 text-xs text-left space-y-2">
                        <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                            <span className="text-on-surface-variant font-medium">Spesialisasi Diajukan:</span>
                            <span className="font-bold text-primary">{profile.specialization}</span>
                        </div>
                        {profile.str_number && (
                            <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                                <span className="text-on-surface-variant font-medium">Nomor STR:</span>
                                <span className="font-mono font-semibold text-on-surface">{profile.str_number}</span>
                            </div>
                        )}
                        {profile.sip_number && (
                            <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                                <span className="text-on-surface-variant font-medium">Nomor SIP:</span>
                                <span className="font-mono font-semibold text-on-surface">{profile.sip_number}</span>
                            </div>
                        )}
                        {profile.institution && (
                            <div className="flex items-center justify-between">
                                <span className="text-on-surface-variant font-medium">Institusi / Faskes:</span>
                                <span className="font-semibold text-on-surface">{profile.institution}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Rejection Note if any */}
                {isRejected && profile?.rejection_reason && (
                    <Alert variant="destructive" title="Catatan dari Tim Verifikator Medis:">
                        {profile.rejection_reason}
                    </Alert>
                )}

                <div className="p-4 bg-primary/[0.04] rounded-2xl border border-primary/10 text-xs text-left space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-primary">
                        <span className="material-symbols-outlined text-[18px]">security</span>
                        <span>Protokol Medis Human-in-the-Loop AEVYRA</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-[11px]">
                        Hanya dokter dan instruktur terverifikasi (berstatus <strong>ACTIVE</strong>) yang diizinkan mengakses data vital fisiologis member dan meresepkan rencana intervensi gaya hidup.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handleLogout}
                        leftIcon="logout"
                        className="w-full sm:w-auto"
                    >
                        Keluar Akun
                    </Button>
                    <Button
                        href="/"
                        variant="primary"
                        size="md"
                        leftIcon="home"
                        className="w-full sm:w-auto"
                    >
                        Kembali ke Beranda
                    </Button>
                </div>
            </div>
        </div>
    );
}
