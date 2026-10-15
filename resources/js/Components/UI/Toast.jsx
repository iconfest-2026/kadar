import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Modern floating Toast component for notification feedback
 * Supports 'error' | 'success' | 'warning' | 'info'
 */
export default function Toast({
    toast, // { type, title, message, duration } or pass individual props below
    type = 'info',
    title,
    message,
    duration = 4000,
    onClose,
    position = 'top-right', // 'top-right' | 'top-center' | 'bottom-right'
}) {
    const [mounted, setMounted] = useState(false);
    const activeToast = toast || (message ? { type, title, message, duration } : null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!activeToast || !onClose) return;
        const timerDuration = activeToast.duration !== undefined ? activeToast.duration : duration;
        if (timerDuration <= 0) return;

        const timer = setTimeout(() => {
            onClose();
        }, timerDuration);

        return () => clearTimeout(timer);
    }, [activeToast, onClose, duration]);

    if (!activeToast) return null;

    const toastType = activeToast.type || 'info';

    const variants = {
        error: {
            card: 'bg-white/95 dark:bg-[#1c0f12]/95 border-rose-200 dark:border-rose-900/60 shadow-rose-950/10 text-rose-950 dark:text-rose-100',
            iconBadge: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60',
            icon: 'error',
            titleColor: 'text-rose-950 dark:text-rose-100',
            bodyColor: 'text-rose-800/90 dark:text-rose-200/90',
            defaultTitle: 'Terjadi Kesalahan',
        },
        destructive: {
            card: 'bg-white/95 dark:bg-[#1c0f12]/95 border-rose-200 dark:border-rose-900/60 shadow-rose-950/10 text-rose-950 dark:text-rose-100',
            iconBadge: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60',
            icon: 'error',
            titleColor: 'text-rose-950 dark:text-rose-100',
            bodyColor: 'text-rose-800/90 dark:text-rose-200/90',
            defaultTitle: 'Peringatan Sistem',
        },
        success: {
            card: 'bg-white/95 dark:bg-[#071f18]/95 border-emerald-200 dark:border-emerald-900/60 shadow-emerald-950/10 text-emerald-950 dark:text-emerald-100',
            iconBadge: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60',
            icon: 'check_circle',
            titleColor: 'text-emerald-950 dark:text-emerald-100',
            bodyColor: 'text-emerald-800/90 dark:text-emerald-200/90',
            defaultTitle: 'Berhasil',
        },
        warning: {
            card: 'bg-white/95 dark:bg-[#201705]/95 border-amber-200 dark:border-amber-900/60 shadow-amber-950/10 text-amber-950 dark:text-amber-100',
            iconBadge: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60',
            icon: 'warning',
            titleColor: 'text-amber-950 dark:text-amber-100',
            bodyColor: 'text-amber-800/90 dark:text-amber-200/90',
            defaultTitle: 'Perhatian',
        },
        info: {
            card: 'bg-white/95 dark:bg-[#091b1a]/95 border-teal-200 dark:border-teal-900/60 shadow-teal-950/10 text-teal-950 dark:text-teal-100',
            iconBadge: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60',
            icon: 'info',
            titleColor: 'text-teal-950 dark:text-teal-100',
            bodyColor: 'text-teal-800/90 dark:text-teal-200/90',
            defaultTitle: 'Informasi',
        },
    };

    const currentVariant = variants[toastType] || variants.info;
    const toastTitle = activeToast.title || currentVariant.defaultTitle;

    const positionClasses = {
        'top-right': 'top-5 right-4 sm:right-6',
        'top-center': 'top-5 left-1/2 -translate-x-1/2',
        'bottom-right': 'bottom-5 right-4 sm:right-6',
    }[position] || 'top-5 right-4 sm:right-6';

    if (!mounted || !activeToast) return null;

    const toastContent = (
        <div
            className={`fixed ${positionClasses} z-[70] pointer-events-none max-w-sm sm:max-w-md w-[calc(100vw-2rem)] transition-all duration-300 animate-in fade-in slide-in-from-top-4`}
        >
            <div
                className={`backdrop-blur-xl rounded-2xl p-3.5 sm:p-4 shadow-2xl border flex items-start gap-3 pointer-events-auto ${currentVariant.card}`}
            >
                <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${currentVariant.iconBadge}`}
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {currentVariant.icon}
                    </span>
                </div>

                <div className="flex-1 min-w-0 pr-1">
                    <h5 className={`text-xs font-bold leading-tight ${currentVariant.titleColor}`}>
                        {toastTitle}
                    </h5>
                    <p className={`text-[11.5px] leading-relaxed mt-0.5 ${currentVariant.bodyColor}`}>
                        {activeToast.message}
                    </p>
                </div>

                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                        aria-label="Tutup notifikasi"
                    >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                )}
            </div>
        </div>
    );

    return createPortal(toastContent, document.body);
}

