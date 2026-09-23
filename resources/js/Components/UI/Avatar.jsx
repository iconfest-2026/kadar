import React, { useState } from 'react';

export default function Avatar({
    src,
    alt = '',
    name = '',
    size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    status, // 'online' | 'offline' | 'busy' | 'away'
    fallbackIcon = 'person',
    className = '',
    ...props
}) {
    const [imageError, setImageError] = useState(false);

    const sizes = {
        xs: 'w-6 h-6 text-[10px]',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
    };

    const statusSizes = {
        xs: 'w-1.5 h-1.5 ring-1',
        sm: 'w-2 h-2 ring-1.5',
        md: 'w-2.5 h-2.5 ring-2',
        lg: 'w-3 h-3 ring-2',
        xl: 'w-3.5 h-3.5 ring-2',
        '2xl': 'w-4 h-4 ring-2',
    };

    const statusColors = {
        online: 'bg-emerald-500',
        offline: 'bg-stone-400',
        busy: 'bg-rose-500',
        away: 'bg-amber-500',
    };

    const getInitials = (str) => {
        if (!str) return '';
        const parts = str.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const initials = getInitials(name || alt);

    return (
        <div className={`relative inline-block shrink-0 select-none ${className}`} {...props}>
            <div
                className={`
                    relative rounded-full overflow-hidden flex items-center justify-center font-bold tracking-wider
                    bg-primary/10 text-primary border border-primary/20
                    ${sizes[size] || sizes.md}
                `.replace(/\s+/g, ' ').trim()}
            >
                {src && !imageError ? (
                    <img
                        src={src}
                        alt={alt || name}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover"
                    />
                ) : initials ? (
                    <span>{initials}</span>
                ) : (
                    <span className="material-symbols-outlined text-[18px]">{fallbackIcon}</span>
                )}
            </div>

            {status && (
                <span
                    className={`
                        absolute bottom-0 right-0 rounded-full ring-white
                        ${statusColors[status] || statusColors.online}
                        ${statusSizes[size] || statusSizes.md}
                    `.replace(/\s+/g, ' ').trim()}
                />
            )}
        </div>
    );
}

