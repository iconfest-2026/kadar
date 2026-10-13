import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button, Alert, Badge, LogoutConfirmModal } from '@/Components/UI';

export default function PendingVerification({ status = 'PENDING_VERIFICATION', profile }) {
    const isSuspended = status === 'SUSPENDED';
    const isRejected = status === 'REJECTED' || Boolean(profile?.rejection_reason);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f0f8f4] text-on-surface flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary selection:text-on-primary">
            <Head title="Verifikasi Akun Instruktur - AEVYRA" />

            {/* Ambient Background Glow */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-150 h-87.5 bg-linear-to-tr from-amber-200/30 via-teal-200/20 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-10 right-1/4 w-125 h-100 bg-linear-to-bl from-teal-300/20 to-transparent blur-[140px] rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#00433e_1.5px,transparent_1.5px)] bg-size-[32px_32px] opacity-[0.035]" />
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
                            ? 'Permohonan verifikasi kredensial medis Anda belum dapat disetujui. Silakan periksa catatan dari tim verifikator di bawah.'
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

                <div className="p-4 bg-primary/4 rounded-2xl border border-primary/10 text-xs text-left space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-primary">
                        <span className="material-symbols-outlined text-[18px]">security</span>
                        <span>Protokol Medis Human-in-the-Loop AEVYRA</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-[11px]">
                        Hanya dokter dan instruktur terverifikasi (berstatus <strong>ACTIVE</strong>) yang diizinkan mengakses data vital fisiologis member dan meresepkan rencana intervensi gaya hidup.
                    </p>
                </div>

                {/* STR Missing Callout for Google SSO */}
                {!profile?.str_number && (
                    <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/25 text-left text-xs space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-amber-900">
                            <span className="material-symbols-outlined text-[18px]">edit_note</span>
                            <span>Biodata & Kredensial STR Belum Lengkap</span>
                        </div>
                        <p className="text-amber-800 leading-relaxed text-[11px]">
                            Akun Anda terdaftar melalui Google Sign-In dan belum menyertakan Nomor STR, institusi faskes, serta berkas legalitas. Administrator hanya dapat memvalidasi akun Anda jika biodata kredensial telah dilengkapi.
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                    <Button
                        href="/instructor/profile"
                        variant="primary"
                        size="md"
                        leftIcon="badge"
                        className="w-full sm:w-auto"
                    >
                        Lengkapi Profil &amp; Nomor STR
                    </Button>
                    <Button
                        href="/instructor/account"
                        variant="outline"
                        size="md"
                        leftIcon="manage_accounts"
                        className="w-full sm:w-auto"
                    >
                        Pengaturan Akun &amp; Google
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={handleLogout}
                        leftIcon="logout"
                        className="w-full sm:w-auto text-rose-600 hover:bg-rose-50 border-rose-200"
                    >
                        Keluar
                    </Button>
                </div>
            </div>

            {/* Logout Confirmation Alert / Modal */}
            <LogoutConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                userRole="Instruktur"
            />
        </div>
    );
}
