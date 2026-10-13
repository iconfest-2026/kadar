import React from 'react';
import { Link } from '@inertiajs/react';
import NotificationDropdown from '../NotificationDropdown';

export default function SidebarBrand({ isAdmin, isInstructor, onClose }) {
    const roleBadge = isAdmin ? 'Admin' : isInstructor ? 'Instruktur' : 'Member';

    return (
        <div className="h-14 flex items-center justify-between px-3 border-b border-surface-container shrink-0">
            <Link href="/dashboard" className="flex items-center gap-1.5 min-w-0 group">
                <img
                    src="/image/Logo_EVYRA_Horizontal.png"
                    alt="AEVYRA Healthcare"
                    className="h-6 w-auto max-w-[102px] object-contain shrink-0 group-hover:opacity-90 transition-opacity"
                />
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[8px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary tracking-wide shrink-0">
                    {roleBadge}
                </span>
            </Link>

            <div className="flex items-center gap-0.5 shrink-0">
                <NotificationDropdown
                    align="left"
                    buttonClassName="relative w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center shrink-0"
                />
                <Link
                    href="/"
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0 flex items-center justify-center"
                    title="Ke Beranda Web Utama"
                >
                    <span className="material-symbols-outlined text-[18px]">home</span>
                </Link>
                {onClose && (
                    <button
                        type="button"
                        className="lg:hidden w-8 h-8 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0 flex items-center justify-center"
                        onClick={onClose}
                        aria-label="Tutup Menu"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                )}
            </div>
        </div>
    );
}
