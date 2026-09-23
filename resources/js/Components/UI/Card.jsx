import React from 'react';

export function Card({ children, className = '', variant = 'default', hoverable = false, ...props }) {
    const variants = {
        default: 'bg-white border border-outline-variant/60 shadow-xs',
        frosted: 'bg-white/90 backdrop-blur-md border border-white/60 shadow-xs',
        elevated: 'bg-white border border-outline-variant/40 shadow-md',
        flat: 'bg-surface-container-low border border-transparent',
        outline: 'bg-transparent border border-outline-variant/80',
    };

    const hoverClass = hoverable ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5' : '';

    return (
        <div
            className={`rounded-3xl p-6 relative overflow-hidden ${variants[variant] || variants.default} ${hoverClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', ...props }) {
    return (
        <div className={`flex flex-col space-y-1.5 pb-4 ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '', ...props }) {
    return (
        <h3
            className={`text-lg sm:text-xl font-headline font-bold text-on-surface tracking-tight ${className}`.trim()}
            {...props}
        >
            {children}
        </h3>
    );
}

export function CardDescription({ children, className = '', ...props }) {
    return (
        <p className={`text-xs sm:text-sm text-on-surface-variant/80 leading-relaxed ${className}`.trim()} {...props}>
            {children}
        </p>
    );
}

export function CardContent({ children, className = '', ...props }) {
    return (
        <div className={`pt-2 ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '', ...props }) {
    return (
        <div className={`flex items-center pt-5 mt-4 border-t border-outline-variant/40 ${className}`.trim()} {...props}>
            {children}
        </div>
    );
}

export default Card;

