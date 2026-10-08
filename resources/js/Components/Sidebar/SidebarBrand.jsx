import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarBrand({ isAdmin, isInstructor, onClose }) {
    const roleBadge = isAdmin ? 'Admin' : isInstructor ? 'Instruktur' : 'Member';

    return (
        <div className="h-13 flex items-center justify-between px-3.5 border-b border-surface-container shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2 group min-w-0">
                <img
                    src="/image/Logo_AEVYRA_Icon.png"
                    alt="AEVYRA Logo"
                    className="w-7 h-7 rounded-lg object-contain shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-heading font-black text-sm text-primary tracking-tight">AEVYRA</span>
                    <span className="px-1.5 py-0.2 text-[8.5px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary shrink-0">
                        {roleBadge}
                    </span>
                </div>
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
