import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarProfile({ user, isMember }) {
    if (!user) return null;

    return (
        <div className="px-2.5 pt-2 pb-0.5 shrink-0">
            <Link
                href={isMember ? '/member/menu' : '/dashboard'}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container border border-surface-container/60 transition-colors group"
                title="Buka Menu & Pengaturan Akun"
            >
                <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-primary to-[#005a54] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[11.5px] font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {user?.name || 'Member'}
                    </p>
                    <p className="text-[9.5px] text-on-surface-variant/80 truncate">
                        {isMember ? 'Lihat Akun & Profil' : user?.email}
                    </p>
                </div>
                <span className="material-symbols-outlined text-[15px] text-on-surface-variant/40 group-hover:text-primary transition-colors shrink-0">
                    chevron_right
                </span>
            </Link>
        </div>
    );
}
