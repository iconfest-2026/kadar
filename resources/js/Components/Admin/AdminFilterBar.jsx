import React from 'react';

export default function AdminFilterBar({
    searchPlaceholder = 'Cari data...',
    searchValue = '',
    onSearchChange,
    filters = [],
    actions,
    activeCount,
    onReset,
}) {
    return (
        <div className="bg-white/95 rounded-2xl border border-primary/10 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 gpu-layer">
            {/* Search Input & Dropdown Filters */}
            <div className="flex-1 flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                {onSearchChange && (
                    <div className="relative flex-1 min-w-[220px]">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full pl-9 pr-3.5 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-primary/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-on-surface-variant/60 font-medium"
                        />
                        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            search
                        </span>
                        {searchValue && (
                            <button
                                type="button"
                                onClick={() => onSearchChange('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Dropdown Filters */}
                {filters.map((f, idx) => (
                    <div key={idx} className="relative min-w-[140px]">
                        <select
                            value={f.value}
                            onChange={(e) => f.onChange(e.target.value)}
                            className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-primary/10 focus:outline-none focus:ring-1 focus:ring-primary font-medium transition-all cursor-pointer"
                        >
                            {f.options.map((opt, oIdx) => (
                                <option key={oIdx} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

                {/* Active Filter Counter & Reset */}
                {activeCount > 0 && onReset && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="px-2.5 py-1.5 rounded-xl bg-primary/5 hover:bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                        <span className="material-symbols-outlined text-[14px]">filter_alt_off</span>
                        <span>Reset ({activeCount})</span>
                    </button>
                )}
            </div>

            {/* Extra Actions Slot */}
            {actions && (
                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
