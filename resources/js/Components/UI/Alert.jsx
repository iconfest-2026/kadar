import React, { useState } from 'react';

export default function Alert({
    children,
    title,
    variant = 'info', // 'info' | 'success' | 'warning' | 'destructive'
    icon,
    dismissible = false,
    onDismiss,
    className = '',
    ...props
}) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const variants = {
        success: {
            container: 'bg-emerald-50 dark:bg-[#07271c] border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-50 shadow-xs',
            iconBadge: 'bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300',
            titleColor: 'text-emerald-950 dark:text-emerald-50 font-bold',
            bodyColor: 'text-emerald-900 dark:text-emerald-100 font-medium',
            icon: 'check_circle',
        },
        info: {
            container: 'bg-teal-50 dark:bg-[#062420] border-teal-300 dark:border-teal-700 text-teal-950 dark:text-teal-50 shadow-xs',
            iconBadge: 'bg-teal-500/20 dark:bg-teal-500/30 text-teal-700 dark:text-teal-300',
            titleColor: 'text-teal-950 dark:text-teal-50 font-bold',
            bodyColor: 'text-teal-900 dark:text-teal-100 font-medium',
            icon: 'info',
        },
        warning: {
            container: 'bg-amber-50 dark:bg-[#291a04] border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-50 shadow-xs',
            iconBadge: 'bg-amber-500/20 dark:bg-amber-500/30 text-amber-700 dark:text-amber-300',
            titleColor: 'text-amber-950 dark:text-amber-50 font-bold',
            bodyColor: 'text-amber-900 dark:text-amber-100 font-medium',
            icon: 'warning',
        },
        destructive: {
            container: 'bg-rose-50 dark:bg-[#2b0c11] border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-50 shadow-xs',
            iconBadge: 'bg-rose-500/20 dark:bg-rose-500/30 text-rose-700 dark:text-rose-300',
            titleColor: 'text-rose-950 dark:text-rose-50 font-bold',
            bodyColor: 'text-rose-900 dark:text-rose-100 font-medium',
            icon: 'error',
        },
    };

    const currentVariant = variants[variant] || variants.info;
    const alertIcon = icon !== undefined ? icon : currentVariant.icon;

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) onDismiss();
    };

    return (
        <div
            role="alert"
            className={`
                relative flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm
                transition-all duration-200
                ${currentVariant.container}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {alertIcon && (
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${currentVariant.iconBadge}`}>
                    <span className="material-symbols-outlined text-[20px]">
                        {alertIcon}
                    </span>
                </div>
            )}

            <div className="flex-1 min-w-0 pr-1">
                {title && <h5 className={`text-xs sm:text-sm leading-tight mb-0.5 ${currentVariant.titleColor}`}>{title}</h5>}
                <div className={`leading-relaxed ${currentVariant.bodyColor}`}>{children}</div>
            </div>

            {dismissible && (
                <button
                    type="button"
                    onClick={handleDismiss}
                    className="shrink-0 p-1 rounded-lg text-current opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Tutup notifikasi"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            )}
        </div>
    );
}
