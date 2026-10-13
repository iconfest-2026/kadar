import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function SidebarUpgradeCard({ isMember, onOpenTierModal }) {
    const { membership } = usePage().props;
    if (!isMember) return null;

    const currentTierName = membership?.current_tier || 'Gratis (Basic)';
    const maxScanner = membership?.max_scanner;
    const maxConsultations = membership?.max_consultations;
    const hasPendingDowngrade = Boolean(membership?.has_pending_downgrade);
    const pendingDowngrade = membership?.pending_downgrade;

    return (
        <div className="p-3.5 mx-3 mb-3 rounded-2xl bg-linear-to-br from-amber-500/10 via-emerald-500/5 to-transparent border border-amber-400/25 space-y-2 shrink-0">
            <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-amber-600 text-[18px] shrink-0">workspace_premium</span>
                    <span className="font-heading font-black text-xs text-amber-900 dark:text-amber-300 truncate">
                        Paket {currentTierName}
                    </span>
                </div>
                {hasPendingDowngrade && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 text-amber-800 shrink-0" title="Ada jadwal penurunan paket">
                        Jadwal Aktif
                    </span>
                )}
            </div>

            {hasPendingDowngrade ? (
                <p className="text-[10px] text-amber-800/90 dark:text-amber-300/90 leading-tight">
                    Beralih ke <strong>{pendingDowngrade?.tier_name}</strong> pada {pendingDowngrade?.effective_at}.
                </p>
            ) : (
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                    {maxScanner === -1 ? 'Scanner kamera tanpa batas' : `${maxScanner ?? 10}x scan harian`}, {maxConsultations === -1 ? 'konsultasi dokter bebas kuota' : `${maxConsultations ?? 0} sesi konsultasi`}.
                </p>
            )}

            <div className="flex items-center gap-1.5 pt-0.5">
                <button
                    type="button"
                    onClick={onOpenTierModal}
                    className="flex-1 py-1.5 px-2 bg-white dark:bg-surface rounded-xl text-[11px] font-bold text-amber-800 dark:text-amber-300 border border-amber-200 hover:bg-amber-50 transition-colors text-center cursor-pointer block"
                >
                    Kelola Paket
                </button>
                <Link
                    href="/paket"
                    className="p-1.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl text-amber-800 dark:text-amber-300 transition-colors shrink-0 flex items-center justify-center"
                    title="Buka Halaman Lengkap Paket & Penurunan Paket"
                >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </Link>
            </div>
        </div>
    );
}
