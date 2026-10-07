import React from 'react';

export default function SidebarFooter({ onOpenEmergency, onLogout }) {
    return (
        <div className="p-3 border-t border-surface-container space-y-2 shrink-0 bg-white dark:bg-surface">
            {/* SOS Emergency Hotline Trigger */}
            <button
                type="button"
                onClick={onOpenEmergency}
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer animate-pulse"
            >
                <span className="material-symbols-outlined text-[17px]">e911_emergency</span>
                <span>Hotline Siaga SOS 119</span>
            </button>

            {/* Logout Button */}
            <button
                type="button"
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
                <span className="material-symbols-outlined text-[16px]">logout</span>
                <span>Keluar Akun</span>
            </button>
        </div>
    );
}
