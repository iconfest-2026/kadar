import React from 'react';

export default function AdminPageHeader({
    title,
    subtitle,
    badge,
    breadcrumbs = [],
    actions,
    icon,
}) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-primary/10 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,67,62,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 gpu-layer">
            {/* Ambient Background Glow */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-2xl pointer-events-none" />

            <div className="relative space-y-2 max-w-2xl">
                {/* Breadcrumbs or Category pill */}
                <div className="flex flex-wrap items-center gap-2">
                    {breadcrumbs.length > 0 ? (
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                            {breadcrumbs.map((crumb, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <span className="text-on-surface-variant/40">/</span>}
                                    <span className={idx === breadcrumbs.length - 1 ? 'text-primary font-bold' : ''}>
                                        {crumb}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15 uppercase tracking-wider">
                            Tata Kelola Platform AEVYRA
                        </span>
                    )}

                    {badge}
                </div>

                {/* Title & Subtitle */}
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[22px]">{icon}</span>
                        </div>
                    )}
                    <h1 className="font-heading font-black text-2xl sm:text-3xl text-on-surface tracking-tight">
                        {title}
                    </h1>
                </div>

                {subtitle && (
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Quick Actions Slot */}
            {actions && (
                <div className="relative flex flex-wrap items-center gap-3 shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
