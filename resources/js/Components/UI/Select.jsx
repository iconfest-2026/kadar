import React, { forwardRef } from 'react';

const Select = forwardRef(function Select(
    {
        label,
        error,
        helperText,
        options = [],
        children,
        leftIcon,
        placeholder,
        disabled = false,
        required = false,
        className = '',
        containerClassName = '',
        id,
        ...props
    },
    ref
) {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const hasError = Boolean(error);

    const baseSelectClasses = `
        w-full appearance-none rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-medium
        bg-surface-container-low text-on-surface
        border transition-all duration-200
        focus:outline-none focus:ring-2 focus:bg-white
        disabled:opacity-50 disabled:bg-surface-container/50 disabled:cursor-not-allowed
        ${leftIcon ? 'pl-10' : 'pl-4'}
        pr-10
        ${
            hasError
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/30'
                : 'border-outline-variant/60 focus:border-primary focus:ring-primary/20 hover:border-primary/40'
        }
        ${className}
    `.replace(/\s+/g, ' ').trim();

    return (
        <div className={`w-full ${containerClassName}`}>
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 mb-1.5"
                >
                    {label}
                    {required && <span className="text-rose-500 ml-0.5">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3.5 pointer-events-none text-on-surface-variant/60 flex items-center">
                        <span className="material-symbols-outlined text-[18px]">{leftIcon}</span>
                    </div>
                )}

                <select
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    required={required}
                    className={baseSelectClasses}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.length > 0
                        ? options.map((opt, idx) => {
                              if (typeof opt === 'object' && opt !== null) {
                                  return (
                                      <option key={opt.value ?? idx} value={opt.value} disabled={opt.disabled}>
                                          {opt.label ?? opt.value}
                                      </option>
                                  );
                              }
                              return (
                                  <option key={idx} value={opt}>
                                      {opt}
                                  </option>
                              );
                          })
                        : children}
                </select>

                <div className="absolute right-3.5 pointer-events-none text-on-surface-variant/70 flex items-center">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
            </div>

            {hasError ? (
                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                </p>
            ) : helperText ? (
                <p className="mt-1.5 text-xs text-on-surface-variant/70">{helperText}</p>
            ) : null}
        </div>
    );
});

export default Select;

