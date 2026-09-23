import React, { forwardRef } from 'react';

const Checkbox = forwardRef(function Checkbox(
    {
        label,
        description,
        error,
        checked,
        onChange,
        disabled = false,
        className = '',
        containerClassName = '',
        id,
        ...props
    },
    ref
) {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    return (
        <div className={`flex items-start gap-3 select-none ${containerClassName}`}>
            <div className="relative flex items-center pt-0.5">
                <input
                    ref={ref}
                    type="checkbox"
                    id={inputId}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className={`
                        w-4 h-4 rounded-md border text-primary transition-all duration-150 cursor-pointer
                        focus:ring-2 focus:ring-primary/20 focus:ring-offset-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                            error
                                ? 'border-rose-400 text-rose-600 focus:ring-rose-500/20'
                                : 'border-outline-variant/80 text-primary checked:bg-primary checked:border-primary'
                        }
                        ${className}
                    `.replace(/\s+/g, ' ').trim()}
                    {...props}
                />
            </div>

            {(label || description) && (
                <div className="text-xs sm:text-sm leading-tight">
                    {label && (
                        <label
                            htmlFor={inputId}
                            className={`font-semibold cursor-pointer ${
                                disabled ? 'text-on-surface-variant/50 cursor-not-allowed' : 'text-on-surface'
                            }`}
                        >
                            {label}
                        </label>
                    )}
                    {description && (
                        <p className="text-xs text-on-surface-variant/70 mt-0.5 leading-normal">
                            {description}
                        </p>
                    )}
                    {error && (
                        <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

export default Checkbox;

