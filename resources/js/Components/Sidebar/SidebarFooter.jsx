import React from 'react';

export default function SidebarFooter({ onOpenEmergency, onLogout }) {
    return (
        <div className="p-2 border-t border-surface-container space-y-1 shrink-0 bg-white dark:bg-surface">
            {/* SOS Emergency Hotline */}
            <button
                type="button"
                onClick={onOpenEmergency}
                className="w-full py-1.5 px-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-bold border border-rose-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Panggilan Tanggap Darurat Ambulans 119"
            >
                <span className="material-symbols-outlined text-[15px]">emergency</span>
                <span>Siaga Darurat 119</span>
            </button>

            {/* Logout Button */}
            <button
                type="button"
                onClick={onLogout}
                className="w-full py-1.5 px-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-rose-600 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
                <span className="material-symbols-outlined text-[15px]">logout</span>
                <span>Keluar</span>
            </button>
        </div>
    );
}
