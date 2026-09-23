import React from 'react';

export default function AdminBadge({ variant = 'default', children, icon, size = 'sm', pulse = false }) {
    const sizeClasses = {
        xs: 'px-2 py-0.5 text-[9px]',
        sm: 'px-2.5 py-0.5 text-[10px]',
        md: 'px-3 py-1 text-xs',
    };

    const variantStyles = {
        // Status Variants
        active: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
        pending: 'bg-amber-500/10 text-amber-800 border-amber-500/25',
        suspended: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        completed: 'bg-blue-500/10 text-blue-800 border-blue-500/25',
        published: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
        draft: 'bg-slate-500/10 text-slate-800 border-slate-500/25',

        // Urgency / Severity Variants
        emergency: 'bg-rose-600/15 text-rose-900 border-rose-600/30 animate-pulse',
        attention: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        notice: 'bg-amber-500/10 text-amber-800 border-amber-500/25',
        info: 'bg-sky-500/10 text-sky-800 border-sky-500/25',
        success: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',

        // Membership Tiers
        silver: 'bg-slate-500/15 text-slate-800 border-slate-400/30',
        gold: 'bg-amber-500/20 text-amber-900 border-amber-500/30',
        platinum: 'bg-indigo-500/15 text-indigo-900 border-indigo-500/30',

        // Roles
        admin: 'bg-primary/10 text-primary border-primary/20',
        instructor: 'bg-teal-500/15 text-teal-900 border-teal-500/25',
        member: 'bg-sky-500/10 text-sky-800 border-sky-500/20',

        default: 'bg-surface-container text-on-surface-variant border-surface-container',
    };

    const style = variantStyles[variant.toLowerCase()] || variantStyles.default;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-label-mono font-bold uppercase tracking-wider border shadow-2xs transition-all ${sizeClasses[size] || sizeClasses.sm} ${style}`}
        >
            {pulse && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current"></span>
                </span>
            )}
            {icon && <span className="material-symbols-outlined text-[13px]">{icon}</span>}
            <span>{children}</span>
        </span>
    );
}

