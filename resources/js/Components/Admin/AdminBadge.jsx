import React from 'react';

/**
 * Reusable Badge component for Admin and General tables/views.
 * Sleek, compact, and responsive across various table contexts.
 * Sizes: xs (micro/compact), sm (standard table), md (medium), lg (large), xl (banner/callout).
 */
export default function AdminBadge({
    variant = 'default',
    children,
    icon,
    size = 'xs',
    pulse = false,
    dot = false,
    className = '',
    onClick,
    ...props
}) {
    // Compact size configurations tailored for data tables
    const sizeClasses = {
        xs: 'px-1.5 py-0.5 text-[9px] leading-none gap-1',
        sm: 'px-2 py-0.5 text-[10px] leading-none gap-1',
        md: 'px-2.5 py-1 text-[11px] leading-tight gap-1.5',
        lg: 'px-3 py-1.5 text-xs leading-normal gap-1.5',
        xl: 'px-4 py-2 text-sm leading-normal gap-2',
    };

    // Scaled icon sizes
    const iconSizes = {
        xs: 'text-[10px]',
        sm: 'text-[12px]',
        md: 'text-[14px]',
        lg: 'text-[16px]',
        xl: 'text-[18px]',
    };

    // Scaled dot/pulse indicator sizes
    const dotSizes = {
        xs: 'h-1.5 w-1.5',
        sm: 'h-1.5 w-1.5',
        md: 'h-2 w-2',
        lg: 'h-2.5 w-2.5',
        xl: 'h-3 w-3',
    };

    const variantStyles = {
        // Status Variants
        active: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
        inactive: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
        pending: 'bg-amber-500/10 text-amber-800 border-amber-500/25',
        suspended: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        completed: 'bg-blue-500/10 text-blue-800 border-blue-500/25',
        published: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
        draft: 'bg-slate-500/10 text-slate-800 border-slate-500/25',
        cancelled: 'bg-rose-500/10 text-rose-800 border-rose-500/25',

        // Urgency / Severity Variants
        emergency: 'bg-rose-600/15 text-rose-900 border-rose-600/30 font-bold',
        danger: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        attention: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        warning: 'bg-amber-500/10 text-amber-800 border-amber-500/25',
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
        user: 'bg-sky-500/10 text-sky-800 border-sky-500/20',
        guest: 'bg-slate-500/10 text-slate-700 border-slate-500/20',

        // Color Palettes
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        indigo: 'bg-indigo-500/15 text-indigo-900 border-indigo-500/30',
        amber: 'bg-amber-500/15 text-amber-900 border-amber-500/30',
        emerald: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/25',
        teal: 'bg-teal-500/15 text-teal-900 border-teal-500/25',
        rose: 'bg-rose-500/10 text-rose-800 border-rose-500/25',
        sky: 'bg-sky-500/10 text-sky-800 border-sky-500/25',
        purple: 'bg-purple-500/15 text-purple-900 border-purple-500/25',
        slate: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
        neutral: 'bg-surface-container text-on-surface-variant border-surface-container',
        outline: 'bg-transparent text-on-surface border-outline-variant',

        default: 'bg-surface-container text-on-surface-variant border-surface-container',
    };

    const safeKey = typeof variant === 'string' ? variant.toLowerCase() : 'default';
    const style = variantStyles[safeKey] || variantStyles.default;
    const currentSize = sizeClasses[size] ? size : 'xs';
    const resolvedSizeClass = sizeClasses[currentSize];
    const resolvedIconSize = iconSizes[currentSize];
    const resolvedDotSize = dotSizes[currentSize];
    // Strict icon pixel mapping to guarantee Google Fonts 24px CSS never blows up badge height
    const iconPixels = {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
    };

    return (
        <span
            onClick={onClick}
            className={`inline-flex items-center rounded-full font-semibold uppercase tracking-wider border shadow-2xs transition-all select-none ${resolvedSizeClass} ${style} ${className} ${onClick ? 'cursor-pointer hover:opacity-85' : ''}`.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {(pulse || dot) && (
                <span className={`relative flex shrink-0 ${resolvedDotSize}`}>
                    {pulse && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full ${resolvedDotSize} bg-current`}></span>
                </span>
            )}
            {icon && (
                <span
                    className="material-symbols-outlined shrink-0 select-none flex items-center justify-center leading-none"
                    style={{
                        fontSize: `${iconPixels[currentSize]}px`,
                        width: `${iconPixels[currentSize]}px`,
                        height: `${iconPixels[currentSize]}px`,
                        lineHeight: 1,
                    }}
                >
                    {icon}
                </span>
            )}
            <span className="truncate">{children}</span>
        </span>
    );
}
