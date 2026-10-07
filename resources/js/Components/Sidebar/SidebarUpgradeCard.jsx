import React from 'react';

export default function SidebarUpgradeCard({ isMember, onOpenTierModal }) {
    if (!isMember) return null;

    return (
        <div className="p-3.5 mx-3 mb-3 rounded-2xl bg-linear-to-br from-amber-500/10 to-transparent border border-amber-400/25 space-y-2 shrink-0">
            <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-600 text-[18px]">workspace_premium</span>
                <span className="font-heading font-black text-xs text-amber-900 dark:text-amber-300">
                    Paket Gold Aktif
                </span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Nikmati 15x scan kamera gizi harian dan 4 sesi konsultasi dokter spesialis IDI.
            </p>
            <button
                type="button"
                onClick={onOpenTierModal}
                className="w-full py-1.5 px-2.5 bg-white dark:bg-surface rounded-xl text-[11px] font-bold text-amber-800 dark:text-amber-300 border border-amber-200 hover:bg-amber-50 transition-colors text-center cursor-pointer block"
            >
                Kelola Tingkatan Paket
            </button>
        </div>
    );
}
