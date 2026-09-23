import React from 'react';

export default function Skeleton({
    className = '',
    variant = 'rounded', // 'text' | 'circular' | 'rectangular' | 'rounded'
    width,
    height,
    count = 1,
    ...props
}) {
    const variants = {
        text: 'h-4 rounded-md w-full',
        circular: 'rounded-full shrink-0',
        rectangular: 'rounded-none w-full',
        rounded: 'rounded-2xl w-full',
    };

    const style = {
        width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    };

    const baseClass = `
        animate-pulse bg-gradient-to-r from-surface-container-high/80 via-surface-container-low/60 to-surface-container-high/80
        background-animate
        ${variants[variant] || variants.rounded}
        ${className}
    `.replace(/\s+/g, ' ').trim();

    if (count > 1) {
        return (
            <div className="flex flex-col gap-2.5 w-full">
                {Array.from({ length: count }).map((_, idx) => (
                    <div key={idx} className={baseClass} style={style} {...props} />
                ))}
            </div>
        );
    }

    return <div className={baseClass} style={style} {...props} />;
}

