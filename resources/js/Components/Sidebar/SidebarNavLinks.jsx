import React from 'react';
import { Link } from '@inertiajs/react';

export default function SidebarNavLinks({
    sections = [],
    activeTab,
    onNavClick,
    onOpenAiChat,
    onOpenTierModal,
}) {
    return (
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
            {sections.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                    <span className="px-3 text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant block">
                        {sec.title}
                    </span>
                    <div className="space-y-0.5">
                        {sec.items.map((item) => {
                            const isActive = activeTab === item.id;

                            if (item.action === 'open_ai_chat') {
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            if (onNavClick) onNavClick();
                                            if (onOpenAiChat) onOpenAiChat();
                                        }}
                                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-[#008069] hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all min-w-0 cursor-pointer text-left"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <span className="material-symbols-outlined text-[18px] shrink-0 text-[#008069]">
                                                {item.icon}
                                            </span>
                                            <span className="truncate">{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 bg-emerald-100 text-emerald-800">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            }

                            if (item.action === 'tier_modal') {
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            if (onNavClick) onNavClick();
                                            if (onOpenTierModal) onOpenTierModal();
                                        }}
                                        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all min-w-0 cursor-pointer text-left"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                            <span className="material-symbols-outlined text-[18px] shrink-0 text-amber-600">
                                                {item.icon}
                                            </span>
                                            <span className="truncate">{item.name}</span>
                                        </div>
                                        {item.badge && (
                                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 bg-surface-container text-on-surface-variant">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={onNavClick}
                                    className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all min-w-0 ${
                                        isActive
                                            ? 'bg-primary text-white font-bold shadow-2xs'
                                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <span
                                            className={`material-symbols-outlined text-[18px] shrink-0 ${
                                                isActive ? 'text-white' : 'text-primary'
                                            }`}
                                        >
                                            {item.icon}
                                        </span>
                                        <span className="truncate">{item.name}</span>
                                    </div>

                                    {item.badge && (
                                        <span
                                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 ${
                                                isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-surface-container text-on-surface-variant'
                                            }`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
