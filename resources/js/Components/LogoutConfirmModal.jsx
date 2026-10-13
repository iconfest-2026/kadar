import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';

export default function LogoutConfirmModal({
    isOpen = false,
    onClose,
    onConfirm,
    title = 'Keluar dari Akun?',
    message = 'Sesi Anda akan berakhir. Anda dapat masuk kembali kapan saja.',
    confirmText = 'Keluar',
    cancelText = 'Batal',
}) {
    const [mounted, setMounted] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Escape Key & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose && !isLoggingOut) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, isLoggingOut]);

    if (!mounted || !isOpen) return null;

    const handleConfirmLogout = () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);

        if (onConfirm) {
            onConfirm();
            return;
        }

        router.post('/logout', {}, {
            onFinish: () => {
                setIsLoggingOut(false);
                if (onClose) onClose();
            },
        });
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            aria-labelledby="logout-modal-title"
        >
            {/* Backdrop Layer with subtle blur */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-200 animate-fadeIn"
                onClick={() => {
                    if (!isLoggingOut && onClose) onClose();
                }}
                aria-hidden="true"
            />

            {/* Modal Dialog Card: Elegant, Compact, AEVYRA Theme */}
            <div
                className="relative w-full max-w-sm bg-white dark:bg-surface rounded-3xl border border-primary/15 shadow-xl overflow-hidden z-10 flex flex-col my-auto transform transition-all duration-200 animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <div className="absolute top-3.5 right-3.5 z-10">
                    <button
                        type="button"
                        disabled={isLoggingOut}
                        onClick={onClose}
                        className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer disabled:opacity-40"
                        aria-label="Tutup modal"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col items-center text-center">
                    {/* Theme Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-3 shadow-2xs">
                        <span className="material-symbols-outlined text-[28px]">logout</span>
                    </div>

                    {/* Title */}
                    <h3
                        id="logout-modal-title"
                        className="font-heading text-lg font-bold text-on-surface tracking-tight"
                    >
                        {title}
                    </h3>

                    {/* Description - Simple & Clean */}
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                        {message}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-5 flex items-center gap-2.5 w-full">
                        <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={onClose}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-surface-container bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-all cursor-pointer disabled:opacity-50 text-center active:scale-[0.99]"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={handleConfirmLogout}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary/90 text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-60 flex items-center justify-center gap-1.5 active:scale-[0.99]"
                        >
                            {isLoggingOut ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                                    <span>Mengeluarkan...</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[16px]">logout</span>
                                    <span>{confirmText}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
