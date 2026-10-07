import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarProfile({ user, isMember, onOpenTierModal }) {
    if (!user) return null;

    if (isMember) {
        return (
            <div className="p-4 mx-3 mt-3 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                        {user?.name?.charAt(0) || 'M'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-on-surface truncate">
                            {user?.name || 'Member Sehat'}
                        </p>
                        <p className="text-[10px] text-on-surface-variant truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-surface-container/80">
                    <button
                        type="button"
                        onClick={onOpenTierModal}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-bold hover:bg-amber-500/20 transition-all cursor-pointer shrink-0"
                        title="Lihat Kuota & Tingkatan Member"
                    >
                        <span className="material-symbols-outlined text-[13px] text-amber-600">workspace_premium</span>
                        <span>Gold Member</span>
                    </button>
                    <Link
                        href="/member/onboarding"
                        className="text-[10px] text-primary font-semibold hover:underline shrink-0"
                    >
                        Edit Profil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                    <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                </div>
            </div>
        </div>
    );
}
