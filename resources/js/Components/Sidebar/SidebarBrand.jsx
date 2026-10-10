import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarBrand({ isAdmin, isInstructor, onClose }) {
    const roleBadge = isAdmin ? 'Admin' : isInstructor ? 'Instruktur' : 'Member';

    return (
        <div className="h-14 flex items-center justify-between px-3.5 border-b border-surface-container shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2 group min-w-0">
                <img
                    src="/image/Logo_EVYRA_Horizontal.png"
                    alt="AEVYRA Healthcare"
                    className="h-6.5 sm:h-7 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
                />
                <span className="px-1.5 py-0.5 text-[8.5px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary shrink-0">
                    {roleBadge}
                </span>
            </Link>

            <div className="flex items-center gap-0.5">
                <Link
                    href="/"
                    className="p-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
                    title="Ke Beranda Web Utama"
                >
                    <span className="material-symbols-outlined text-[17px]">home</span>
                </Link>
                {onClose && (
                    <button
                        type="button"
                        className="lg:hidden p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
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
