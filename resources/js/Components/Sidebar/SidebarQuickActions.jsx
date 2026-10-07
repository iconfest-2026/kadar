import React from 'react';

export default function SidebarQuickActions({ isMember, onOpenQuickLog, onOpenScanner }) {
    if (!isMember) return null;

    return (
        <div className="px-3 pt-2.5 pb-1 grid grid-cols-2 gap-2 shrink-0">
            <button
                type="button"
                onClick={onOpenQuickLog}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-primary hover:bg-[#005a54] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                title="Catat Glukosa, Tensi, Tidur, Langkah"
            >
                <span className="material-symbols-outlined text-[17px]">add</span>
                <span>Catat Metrik</span>
            </button>

            <button
                type="button"
                onClick={onOpenScanner}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer border border-surface-container"
                title="Buka Kamera Pindai Cepat Gizi & BPOM"
            >
                <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                <span>Pindai Gizi</span>
            </button>
        </div>
    );
}
