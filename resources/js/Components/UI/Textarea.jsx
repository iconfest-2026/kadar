import React, { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea(
    {
        label,
        error,
        helperText,
        rows = 3,
        className = '',
        containerClassName = '',
        id,
        disabled = false,
        required = false,
        ...props
    },
    ref
) {
    const inputId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
        <div className={`w-full space-y-1.5 ${containerClassName}`}>
            {label && (
                <div className="flex items-center justify-between">
                    <label
                        htmlFor={inputId}
                        className="block text-xs font-bold text-on-surface select-none"
                    >
                        {label}
                        {required && <span className="text-rose-500 ml-1">*</span>}
                    </label>
                </div>
            )}

            <textarea
                ref={ref}
                id={inputId}
                rows={rows}
                disabled={disabled}
                required={required}
                className={`w-full bg-surface-container-low text-on-surface border transition-all duration-200 placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium py-2.5 px-4 text-xs sm:text-sm rounded-2xl ${
                    error
                        ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/20'
                        : 'border-primary/15 focus:border-primary focus:ring-primary/15 focus:bg-white'
                } ${className}`}
                {...props}
            />

            {error && (
                <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 animate-in fade-in duration-150">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    <span>{error}</span>
                </p>
            )}

            {!error && helperText && (
                <p className="text-[11px] text-on-surface-variant/80 font-medium">
                    {helperText}
                </p>
            )}
        </div>
    );
});

export default Textarea;

