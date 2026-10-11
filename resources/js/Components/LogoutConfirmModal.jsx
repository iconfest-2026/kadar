import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { router, usePage } from '@inertiajs/react';

export default function LogoutConfirmModal({
    isOpen = false,
    onClose,
    onConfirm,
    title = 'Konfirmasi Keluar Akun',
    message,
    confirmText = 'Ya, Keluar Akun',
    cancelText = 'Batal',
    userRole,
}) {
    let currentUser = null;
    try {
        const page = usePage();
        currentUser = page?.props?.auth?.user;
    } catch {
        currentUser = null;
    }
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
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            aria-modal="true"
            role="dialog"
            aria-labelledby="logout-modal-title"
        >
            {/* Backdrop Layer with subtle blur */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200 animate-fadeIn"
                onClick={() => {
                    if (!isLoggingOut && onClose) onClose();
                }}
                aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <div
                className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-surface rounded-3xl sm:rounded-[28px] border border-outline-variant/50 dark:border-outline-variant/30 shadow-2xl overflow-hidden z-10 flex flex-col my-auto transform transition-all duration-200 animate-scaleUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Top Accent Gradient */}
                <div className="h-2 w-full bg-linear-to-r from-rose-500 via-amber-500 to-primary" />

                {/* Close Button */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        type="button"
                        disabled={isLoggingOut}
                        onClick={onClose}
                        className="p-1.5 rounded-full text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer disabled:opacity-40"
                        aria-label="Tutup modal konfirmasi"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 pt-7 flex flex-col items-center text-center">
                    {/* Glowing Warning/Exit Icon Badge */}
                    <div className="relative mb-4">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl sm:rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-xs ring-6 ring-rose-500/10">
                            <span className="material-symbols-outlined text-[32px] sm:text-[36px]">logout</span>
                        </div>
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
                        </span>
                    </div>

                    {/* Title */}
                    <h3
                        id="logout-modal-title"
                        className="font-serif text-xl sm:text-2xl font-bold text-on-surface tracking-tight"
                    >
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-on-surface-variant/90 mt-2 leading-relaxed">
                        {message || 'Apakah Anda yakin ingin keluar dari sesi ini? Anda dapat masuk kembali kapan saja untuk melanjutkan pemantauan biomarker dan aktivitas Anda.'}
                    </p>

                    {/* Authenticated User Preview (if available) */}
                    {currentUser && (
                        <div className="w-full mt-4 p-3 rounded-2xl bg-surface-container-low/70 dark:bg-surface-container/40 border border-outline-variant/30 flex items-center justify-between text-left">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                                    {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-on-surface text-xs truncate leading-snug">
                                        {currentUser.name}
                                    </p>
                                    <p className="text-[11px] text-on-surface-variant/70 truncate">
                                        {currentUser.email}
                                    </p>
                                </div>
                            </div>
                            {userRole && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-surface-container-highest text-on-surface-variant shrink-0 ml-2">
                                    {userRole}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Reassurance Notice */}
                    <div className="w-full mt-3 p-3 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-left flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                            verified_user
                        </span>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                            <strong className="text-on-surface font-semibold">Data Tersimpan Aman: </strong>
                            Seluruh rekam metrik dan riwayat Anda tersimpan di server Kadar.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3 w-full">
                        <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={onClose}
                            className="w-full sm:flex-1 py-3 px-4 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer disabled:opacity-50 text-center active:scale-[0.99]"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            disabled={isLoggingOut}
                            onClick={handleConfirmLogout}
                            className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-600/20 hover:shadow-lg hover:shadow-rose-600/30 transition-all duration-150 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.99]"
                        >
                            {isLoggingOut ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                                    <span>Mengeluarkan...</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
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
