import React from 'react';
import { Link } from '@inertiajs/react';

export default function Button({
    children,
    type = 'button',
    variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'link'
    size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'icon'
    className = '',
    loading = false,
    loadingText,
    disabled = false,
    leftIcon,
    rightIcon,
    href,
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-container shadow-xs hover:shadow-md border border-transparent',
        secondary: 'bg-secondary text-white hover:bg-secondary-container shadow-xs hover:shadow-md border border-transparent',
        outline: 'bg-white hover:bg-primary/5 text-on-surface hover:text-primary border border-primary/20 hover:border-primary/40 shadow-2xs',
        ghost: 'bg-transparent hover:bg-primary/10 text-on-surface hover:text-primary border border-transparent',
        destructive: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs hover:shadow-md border border-transparent',
        success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md border border-transparent',
        link: 'bg-transparent text-primary hover:underline underline-offset-4 border-transparent p-0 h-auto shadow-none font-semibold',
    };

    const sizes = {
        xs: 'px-2.5 py-1 text-[11px] gap-1 rounded-xl',
        sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-xl',
        md: 'px-4 py-2.5 text-xs sm:text-sm gap-2 rounded-2xl',
        lg: 'px-6 py-3 text-sm sm:text-base gap-2.5 rounded-2xl',
        icon: 'p-2 w-9 h-9 rounded-xl flex items-center justify-center',
    };

    const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`.trim();

    const content = (
        <>
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
            ) : leftIcon ? (
                <span className="material-symbols-outlined text-[18px] shrink-0">{leftIcon}</span>
            ) : null}

            {loading && loadingText ? (
                <span>{loadingText}</span>
            ) : (
                children && <span>{children}</span>
            )}

            {!loading && rightIcon && (
                <span className="material-symbols-outlined text-[18px] shrink-0">{rightIcon}</span>
            )}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={combinedClasses} {...props}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={combinedClasses}
            {...props}
        >
            {content}
        </button>
    );
}

