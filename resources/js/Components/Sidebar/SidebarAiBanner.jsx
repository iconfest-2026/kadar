import React from 'react';

export default function SidebarAiBanner({ isMember, onOpenAiChat }) {
    if (!isMember) return null;

    return (
        <div className="px-3 pt-1.5 pb-1 shrink-0">
            <button
                type="button"
                onClick={onOpenAiChat}
                className="w-full p-2.5 rounded-2xl bg-linear-to-r from-[#008069]/10 via-[#00a884]/10 to-[#25d366]/10 hover:from-[#008069]/20 hover:to-[#25d366]/20 border border-[#008069]/25 flex items-center justify-between transition-all group cursor-pointer shadow-2xs active:scale-98"
                title="Buka Chat AI WhatsApp AEVYRA"
            >
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-full bg-[#008069] text-white flex items-center justify-center shadow-xs">
                            <span className="material-symbols-outlined text-[19px]">smart_toy</span>
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25d366] ring-2 ring-white"></span>
                    </div>
                    <div className="text-left min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className="font-heading font-bold text-xs text-on-surface group-hover:text-[#008069] transition-colors truncate">
                                Asisten AI Preventif
                            </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block truncate">
                            Online • Chat ala WhatsApp
                        </span>
                    </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#008069] text-white text-[10px] font-bold shadow-2xs shrink-0 flex items-center gap-1">
                    <span>Chat</span>
                    <span className="material-symbols-outlined text-[13px]">chat</span>
                </span>
            </button>
        </div>
    );
}
