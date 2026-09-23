import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
    isOpen = false,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = 'md', // 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
    closeOnEscape = true,
    closeOnBackdropClick = true,
    className = '',
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Escape Key & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (closeOnEscape && e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closeOnEscape, onClose]);

    if (!mounted || !isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        full: 'max-w-5xl',
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop Layer */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200 animate-fadeIn"
                onClick={closeOnBackdropClick && onClose ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Modal Dialog Box */}
            <div
                className={`
                    relative w-full ${maxWidthClasses[maxWidth] || maxWidthClasses.md}
                    bg-white rounded-3xl border border-outline-variant/60 shadow-2xl
                    overflow-hidden z-10 flex flex-col max-h-[90vh]
                    transform transition-all duration-200 animate-scaleUp
                    ${className}
                `.replace(/\s+/g, ' ').trim()}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || subtitle || onClose) && (
                    <div className="flex items-start justify-between p-6 pb-4 border-b border-outline-variant/40 bg-surface-container-lowest">
                        <div>
                            {title && (
                                <h3 className="text-lg font-headline font-bold text-on-surface tracking-tight">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-xs text-on-surface-variant/80 mt-0.5 leading-relaxed">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-1.5 rounded-full text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container transition-colors -mr-1 -mt-1 cursor-pointer"
                                aria-label="Tutup modal"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        )}
                    </div>
                )}

                {/* Body Content */}
                <div className="p-6 overflow-y-auto flex-1 font-sans text-on-surface">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-outline-variant/40 bg-surface-container-low">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

