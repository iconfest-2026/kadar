import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function AdminModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = 'max-w-2xl',
    icon,
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop with Blur - Top Stacking Priority */}
            <div
                className="fixed inset-0 bg-primary/30 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full ${maxWidth} bg-white/95 backdrop-blur-2xl rounded-3xl border border-primary/20 shadow-[0_25px_60px_rgba(0,67,62,0.25)] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] my-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-primary/10 bg-white/70 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 shadow-xs">
                                <span className="material-symbols-outlined text-[20px]">{icon}</span>
                            </div>
                        )}
                        <div>
                            <h3 className="font-heading font-black text-lg text-on-surface tracking-tight">
                                {title}
                            </h3>
                            {subtitle && (
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                        title="Tutup dialog"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto scrollbar-thin space-y-4 text-xs text-on-surface">
                    {children}
                </div>

                {/* Modal Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-primary/10 bg-surface-container-low/60 flex items-center justify-end gap-2 shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
