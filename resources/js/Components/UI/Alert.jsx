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
        info: {
            container: 'bg-sky-50/80 border-sky-200 text-sky-950',
            icon: 'info',
            iconColor: 'text-sky-600',
        },
        success: {
            container: 'bg-emerald-50/80 border-emerald-200 text-emerald-950',
            icon: 'check_circle',
            iconColor: 'text-emerald-600',
        },
        warning: {
            container: 'bg-amber-50/80 border-amber-200 text-amber-950',
            icon: 'warning',
            iconColor: 'text-amber-600',
        },
        destructive: {
            container: 'bg-rose-50/80 border-rose-200 text-rose-950',
            icon: 'error',
            iconColor: 'text-rose-600',
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
                relative flex items-start gap-3.5 p-4 rounded-2xl border text-xs sm:text-sm
                transition-all duration-200 shadow-2xs
                ${currentVariant.container}
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {alertIcon && (
                <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${currentVariant.iconColor}`}>
                    {alertIcon}
                </span>
            )}

            <div className="flex-1 pr-2">
                {title && <h5 className="font-bold mb-0.5 tracking-tight">{title}</h5>}
                <div className="text-on-surface/90 leading-relaxed font-normal">{children}</div>
            </div>

            {dismissible && (
                <button
                    type="button"
                    onClick={handleDismiss}
                    className="shrink-0 p-1 -mr-1 -mt-1 rounded-lg text-on-surface-variant/60 hover:text-on-surface hover:bg-black/5 transition-colors cursor-pointer"
                    aria-label="Tutup notifikasi"
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
            )}
        </div>
    );
}

