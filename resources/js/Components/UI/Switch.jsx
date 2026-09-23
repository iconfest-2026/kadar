import React from 'react';

export default function Switch({
    label,
    description,
    checked = false,
    onChange,
    disabled = false,
    size = 'md', // 'sm' | 'md' | 'lg'
    badge,
    className = '',
    containerClassName = '',
    id,
    name,
    ...props
}) {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    const sizes = {
        sm: {
            track: 'w-8 h-4.5 p-0.5',
            thumb: 'w-3.5 h-3.5',
            translate: 'translate-x-3.5',
        },
        md: {
            track: 'w-11 h-6 p-0.5',
            thumb: 'w-5 h-5',
            translate: 'translate-x-5',
        },
        lg: {
            track: 'w-14 h-7.5 p-1',
            thumb: 'w-5.5 h-5.5',
            translate: 'translate-x-6.5',
        },
    };

    const currentSize = sizes[size] || sizes.md;

    const handleToggle = () => {
        if (!disabled && onChange) {
            onChange(!checked);
        }
    };

    return (
        <div className={`flex items-center justify-between gap-4 ${containerClassName}`}>
            {(label || description) && (
                <div className="flex flex-col select-none cursor-pointer" onClick={handleToggle}>
                    <div className="flex items-center gap-2">
                        {label && (
                            <span
                                className={`text-xs sm:text-sm font-semibold ${
                                    disabled ? 'text-on-surface-variant/50' : 'text-on-surface'
                                }`}
                            >
                                {label}
                            </span>
                        )}
                        {badge && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                                {badge}
                            </span>
                        )}
                    </div>
                    {description && (
                        <span className="text-xs text-on-surface-variant/70 mt-0.5">
                            {description}
                        </span>
                    )}
                </div>
            )}

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                id={inputId}
                onClick={handleToggle}
                className={`
                    relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${checked ? 'bg-primary' : 'bg-surface-container-high border border-outline-variant/50'}
                    ${currentSize.track}
                    ${className}
                `.replace(/\s+/g, ' ').trim()}
                {...props}
            >
                <span
                    className={`
                        pointer-events-none inline-block rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out
                        ${checked ? currentSize.translate : 'translate-x-0'}
                        ${currentSize.thumb}
                    `.replace(/\s+/g, ' ').trim()}
                />
            </button>
        </div>
    );
}

