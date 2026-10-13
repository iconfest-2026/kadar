import React from 'react';

export default function Badge({
    children,
    variant = 'neutral', // 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'info' | 'neutral' | 'outline'
    size = 'sm', // 'xs' | 'sm' | 'md'
    dot = false,
    pulse = false,
    icon,
    className = '',
    onRemove,
    ...props
}) {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20',
        secondary: 'bg-secondary/10 text-secondary border-secondary/20',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
        destructive: 'bg-rose-50 text-rose-700 border-rose-200/80',
        info: 'bg-sky-50 text-sky-700 border-sky-200/80',
        neutral: 'bg-surface-container text-on-surface-variant border-outline-variant/60',
        outline: 'bg-transparent text-on-surface border-outline-variant',
    };

    const dotColors = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        success: 'bg-emerald-500',
        warning: 'bg-amber-500',
        destructive: 'bg-rose-500',
        info: 'bg-sky-500',
        neutral: 'bg-on-surface-variant',
        outline: 'bg-on-surface',
    };

    const sizes = {
        xs: 'px-2 py-0.5 text-[10px] gap-1 rounded-md font-bold uppercase tracking-wider',
        sm: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg font-semibold',
        md: 'px-3 py-1.5 text-xs sm:text-sm gap-2 rounded-xl font-semibold',
        lg: 'px-3.5 py-2 text-sm gap-2 rounded-xl font-bold',
        xl: 'px-4 py-2.5 text-base gap-2.5 rounded-2xl font-bold',
    };

    return (
        <span
            className={`
                inline-flex items-center border select-none transition-colors
                ${variants[variant] || variants.neutral}
                ${sizes[size] || sizes.sm}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {dot && (
                <span className="relative flex h-2 w-2 shrink-0">
                    {pulse && (
                        <span
                            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                dotColors[variant] || 'bg-primary'
                            }`}
                        />
                    )}
                    <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${
                            dotColors[variant] || 'bg-primary'
                        }`}
                    />
                </span>
            )}

            {icon && (
                <span className="material-symbols-outlined text-[14px] shrink-0 leading-none">
                    {icon}
                </span>
            )}

            <span>{children}</span>

            {onRemove && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="ml-0.5 hover:opacity-75 focus:outline-none flex items-center justify-center cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
            )}
        </span>
    );
}

