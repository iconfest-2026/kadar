import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

export function Tabs({ defaultValue, value, onValueChange, children, className = '', ...props }) {
    const [selectedTab, setSelectedTab] = useState(defaultValue);

    const activeTab = value !== undefined ? value : selectedTab;

    const setActiveTab = (val) => {
        if (value === undefined) {
            setSelectedTab(val);
        }
        if (onValueChange) {
            onValueChange(val);
        }
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={`w-full flex flex-col ${className}`} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = '', variant = 'pills', ...props }) {
    const variants = {
        pills: 'bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/50 gap-1.5',
        underline: 'border-b border-outline-variant/60 gap-4 bg-transparent p-0',
    };

    return (
        <div
            role="tablist"
            className={`inline-flex items-center ${variants[variant] || variants.pills} ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}

export function TabsTrigger({ value, children, icon, badge, className = '', disabled = false, ...props }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within a Tabs component');

    const isActive = context.activeTab === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => context.setActiveTab(value)}
            className={`
                inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl
                transition-all duration-200 cursor-pointer select-none focus:outline-none shrink-0
                disabled:opacity-50 disabled:cursor-not-allowed
                ${
                    isActive
                        ? 'bg-white dark:bg-surface text-primary shadow-xs font-bold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/50 dark:hover:bg-surface/50'
                }
                ${className}
            `.replace(/\s+/g, ' ').trim()}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-[18px] shrink-0 leading-none">{icon}</span>}
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">{children}</span>
            {badge !== undefined && (
                <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full shrink-0 font-mono ${
                        isActive ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}
                >
                    {badge}
                </span>
            )}
        </button>
    );
}

export function TabsContent({ value, children, className = '', ...props }) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within a Tabs component');

    if (context.activeTab !== value) return null;

    return (
        <div
            role="tabpanel"
            className={`pt-4 focus:outline-none animate-fadeIn ${className}`.trim()}
            {...props}
        >
            {children}
        </div>
    );
}

export default Tabs;

