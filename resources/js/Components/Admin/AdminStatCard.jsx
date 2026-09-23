import React from 'react';

export default function AdminStatCard({
    title,
    value,
    subtitle,
    icon,
    trend,
    accent = 'primary',
    badge,
    action,
}) {
    const accentMap = {
        primary: {
            iconBg: 'bg-primary/10 text-primary border-primary/20',
            border: 'border-primary/10 hover:border-primary/30',
            orb: 'from-primary/10',
        },
        amber: {
            iconBg: 'bg-amber-500/15 text-amber-700 border-amber-500/25',
            border: 'border-amber-500/20 hover:border-amber-500/40',
            orb: 'from-amber-500/10',
        },
        emerald: {
            iconBg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/25',
            border: 'border-emerald-500/20 hover:border-emerald-500/40',
            orb: 'from-emerald-500/10',
        },
        rose: {
            iconBg: 'bg-rose-500/15 text-rose-700 border-rose-500/25',
            border: 'border-rose-500/20 hover:border-rose-500/40',
            orb: 'from-rose-500/10',
        },
        indigo: {
            iconBg: 'bg-indigo-500/15 text-indigo-700 border-indigo-500/25',
            border: 'border-indigo-500/20 hover:border-indigo-500/40',
            orb: 'from-indigo-500/10',
        },
        teal: {
            iconBg: 'bg-teal-500/15 text-teal-700 border-teal-500/25',
            border: 'border-teal-500/20 hover:border-teal-500/40',
            orb: 'from-teal-500/10',
        },
    };

    const currentAccent = accentMap[accent] || accentMap.primary;

    return (
        <div
            className={`group relative overflow-hidden rounded-3xl bg-white/95 border ${currentAccent.border} p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,67,62,0.03)] hover:shadow-[0_8px_30px_rgba(0,67,62,0.06)] transition-all duration-200 flex flex-col justify-between gpu-layer`}
        >
            {/* Ambient Corner Orb */}
            <div
                className={`absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br ${currentAccent.orb} to-transparent blur-xl pointer-events-none transition-transform duration-300`}
            />

            {/* Card Header: Icon + Badge / Action */}
            <div className="relative flex items-center justify-between mb-4">
                <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 duration-200 ${currentAccent.iconBg}`}
                >
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>

                <div className="flex items-center gap-2">
                    {badge}
                    {action}
                </div>
            </div>

            {/* Card Body: Metric Value + Label */}
            <div className="relative space-y-1">
                <span className="font-label-mono text-[11px] uppercase tracking-wider text-on-surface-variant font-bold block">
                    {title}
                </span>
                <div className="flex items-baseline gap-2">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-on-surface tracking-tight">
                        {value}
                    </span>
                    {trend && (
                        <span
                            className={`inline-flex items-center text-xs font-bold font-label-mono ${
                                trend.isPositive !== false ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                {trend.isPositive !== false ? 'trending_up' : 'trending_down'}
                            </span>
                            <span>{trend.value}</span>
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="text-xs text-on-surface-variant/80 font-medium pt-0.5 leading-snug">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}
