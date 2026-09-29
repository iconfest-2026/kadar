import React, { forwardRef, useState } from 'react';

const Input = forwardRef(function Input(
    {
        label,
        error,
        helperText,
        leftIcon,
        rightIcon,
        type = 'text',
        size = 'md', // 'sm' | 'md' | 'lg'
        className = '',
        containerClassName = '',
        id,
        disabled = false,
        required = false,
        allowPasswordToggle = false,
        ...props
    },
    ref
) {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const isPassword = type === 'password' || allowPasswordToggle;
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const sizes = {
        sm: 'py-1.5 px-3 text-xs rounded-xl',
        md: 'py-2.5 px-4 text-xs sm:text-sm rounded-2xl',
        lg: 'py-3.5 px-5 text-sm sm:text-base rounded-2xl',
    };

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

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-on-surface-variant pointer-events-none">
                        <span className="material-symbols-outlined text-[18px] leading-none select-none">{leftIcon}</span>
                    </div>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={computedType}
                    disabled={disabled}
                    required={required}
                    className={`w-full bg-surface-container-low text-on-surface border transition-all duration-200 placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
                        leftIcon ? 'pl-10' : ''
                    } ${rightIcon || isPassword ? 'pr-11' : ''} ${
                        error
                            ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-500/20 bg-rose-50/20'
                            : 'border-primary/15 focus:border-primary focus:ring-primary/15 focus:bg-white'
                    } ${sizes[size] || sizes.md} ${className}`}
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                        title={showPassword ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                    >
                        <span className="material-symbols-outlined text-[18px] leading-none select-none">
                            {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                    </button>
                )}

                {!isPassword && rightIcon && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-on-surface-variant pointer-events-none">
                        <span className="material-symbols-outlined text-[18px] leading-none select-none">{rightIcon}</span>
                    </div>
                )}
            </div>

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

export default Input;

