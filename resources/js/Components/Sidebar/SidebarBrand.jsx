import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarBrand({ isAdmin, isInstructor, onClose }) {
    const roleBadge = isAdmin ? 'Admin' : isInstructor ? 'Instruktur' : 'Preventif';

    return (
        <div className="h-16 flex items-center justify-between px-5 border-b border-surface-container shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2.5 group min-w-0">
                <img
                    src="/image/Logo_AEVYRA_Icon.png"
                    alt="AEVYRA Logo"
                    className="w-8 h-8 rounded-xl object-contain shadow-2xs group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="font-heading font-black text-lg text-primary tracking-tight">EVYRA</span>
                        <span className="px-1.5 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary shrink-0">
                            {roleBadge}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="flex items-center gap-1">
                <Link
                    href="/"
                    className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
                    title="Ke Beranda Web Utama"
                >
                    <span className="material-symbols-outlined text-[19px]">home</span>
                </Link>
                {onClose && (
                    <button
                        type="button"
                        className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
                        onClick={onClose}
                        aria-label="Tutup Menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                )}
            </div>
        </div>
    );
}
