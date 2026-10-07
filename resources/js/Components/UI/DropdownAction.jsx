import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';

/**
 * Reusable & Dynamic Dropdown Action Component for Tables
 * Supports standard preset CRUD actions (Detail, Edit, Delete) as well as Custom Actions.
 * Rendered using React Portal to eliminate table overflow/clipping issues.
 */
export default function DropdownAction({
    // Standard CRUD Presets
    onDetail,
    detailHref,
    detailLabel = 'Lihat Detail',
    detailIcon = 'visibility',

    onEdit,
    editHref,
    editLabel = 'Ubah / Edit',
    editIcon = 'edit',

    onDelete,
    deleteHref,
    deleteLabel = 'Hapus Data',
    deleteIcon = 'delete',
    deleteVariant = 'danger',

    // Custom Actions List: Array of objects
    // { label, icon, onClick, href, method, variant: 'default'|'primary'|'success'|'warning'|'danger', disabled, hidden, divider }
    customActions = [],
    actions = [], // alias or direct action list

    // Trigger Customization
    triggerIcon = 'more_vert',
    triggerLabel,
    size = 'sm', // 'xs' | 'sm' | 'md'
    variant = 'ghost', // 'ghost' | 'outline' | 'secondary' | 'primary'
    align = 'right', // 'right' | 'left'
    menuWidth = 190,
    className = '',
    menuClassName = '',
    disabled = false,
    title = 'Pilihan Aksi',
    children, // optional direct children override
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0, openUpwards: false });
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    // Combine preset actions with custom actions
    const allActions = [];

    // Custom items if provided first or exclusively
    if (Array.isArray(actions) && actions.length > 0) {
        allActions.push(...actions);
    } else {
        // Detail preset
        if (onDetail || detailHref) {
            allActions.push({
                key: 'detail',
                label: detailLabel,
                icon: detailIcon,
                onClick: onDetail,
                href: detailHref,
                variant: 'default',
            });
        }

        // Custom actions placed between detail and edit/delete if needed
        if (Array.isArray(customActions) && customActions.length > 0) {
            allActions.push(...customActions);
        }

        // Edit preset
        if (onEdit || editHref) {
            allActions.push({
                key: 'edit',
                label: editLabel,
                icon: editIcon,
                onClick: onEdit,
                href: editHref,
                variant: 'default',
            });
        }

        // Delete preset
        if (onDelete || deleteHref) {
            allActions.push({
                key: 'delete',
                label: deleteLabel,
                icon: deleteIcon,
                onClick: onDelete,
                href: deleteHref,
                variant: deleteVariant || 'danger',
                divider: allActions.length > 0, // add subtle separation before delete
            });
        }
    }

    // Filter out hidden items
    const visibleActions = allActions.filter((a) => !a?.hidden);

    // Calculate Coordinates on toggle
    const handleToggle = (e) => {
        e.stopPropagation();
        if (disabled) return;

        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            const estimatedHeight = Math.max(80, visibleActions.length * 36 + 16);
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const openUpwards = spaceBelow < estimatedHeight + 10 && spaceAbove > spaceBelow;

            let left = align === 'right' ? rect.right - menuWidth : rect.left;
            // Bound inside screen viewport
            if (left + menuWidth > window.innerWidth - 10) {
                left = window.innerWidth - menuWidth - 10;
            }
            if (left < 10) {
                left = 10;
            }

            setMenuCoords({
                top: openUpwards ? rect.top - 6 : rect.bottom + 6,
                left,
                openUpwards,
            });
        }

        setIsOpen((prev) => !prev);
    };

    // Close on click outside, scroll, or Escape
    useEffect(() => {
        if (!isOpen) return;

        const handleOutsideClick = (e) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            setIsOpen(false);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        window.addEventListener('scroll', handleScrollOrResize, true);
        window.addEventListener('resize', handleScrollOrResize);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Button size styles
    const sizeClasses = {
        xs: 'w-7 h-7 text-[16px] rounded-lg',
        sm: 'w-8 h-8 text-[18px] rounded-xl',
        md: 'w-9 h-9 text-[20px] rounded-xl',
    };

    const variantClasses = {
        ghost: 'text-on-surface-variant hover:text-primary hover:bg-primary/10',
        outline: 'border border-primary/20 text-on-surface hover:bg-primary/5 hover:text-primary',
        secondary: 'bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high',
        primary: 'bg-primary/10 text-primary hover:bg-primary hover:text-white',
    };

    // Item variant styles
    const getItemVariantClass = (itemVariant) => {
        switch (itemVariant) {
            case 'danger':
                return 'text-rose-600 hover:bg-rose-50 hover:text-rose-700';
            case 'warning':
                return 'text-amber-700 hover:bg-amber-50 hover:text-amber-800';
            case 'success':
                return 'text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800';
            case 'primary':
                return 'text-primary hover:bg-primary/10 font-bold';
            default:
                return 'text-on-surface hover:bg-primary/5 hover:text-primary';
        }
    };

    return (
        <div className={`relative inline-block text-left ${className}`} onClick={(e) => e.stopPropagation()}>
            {/* Trigger Button */}
            <button
                ref={triggerRef}
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                title={title}
                className={`inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    sizeClasses[size] || sizeClasses.sm
                } ${variantClasses[variant] || variantClasses.ghost} ${
                    isOpen ? 'bg-primary/10 text-primary ring-2 ring-primary/20' : ''
                } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span className="material-symbols-outlined leading-none">{triggerIcon}</span>
                {triggerLabel && <span className="ml-1.5 text-xs font-semibold">{triggerLabel}</span>}
            </button>

            {/* Portal Dropdown Menu */}
            {isOpen && typeof document !== 'undefined' &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{
                            position: 'fixed',
                            top: menuCoords.openUpwards ? 'auto' : `${menuCoords.top}px`,
                            bottom: menuCoords.openUpwards ? `${window.innerHeight - menuCoords.top}px` : 'auto',
                            left: `${menuCoords.left}px`,
                            width: `${menuWidth}px`,
                            zIndex: 99999,
                        }}
                        className={`bg-white rounded-2xl border border-primary/15 shadow-[0_10px_35px_rgba(0,67,62,0.12)] p-1.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 ${menuClassName}`}
                    >
                        {children ? (
                            typeof children === 'function' ? children({ close: () => setIsOpen(false) }) : children
                        ) : visibleActions.length === 0 ? (
                            <div className="px-3 py-2 text-xs text-on-surface-variant italic text-center">
                                Tidak ada opsi aksi
                            </div>
                        ) : (
                            <div className="space-y-0.5">
                                {visibleActions.map((item, idx) => {
                                    const itemKey = item.key || item.label || idx;
                                    const variantClass = getItemVariantClass(item.variant);

                                    const handleItemClick = (e) => {
                                        setIsOpen(false);
                                        if (item.onClick) {
                                            item.onClick(e);
                                        }
                                    };

                                    return (
                                        <React.Fragment key={itemKey}>
                                            {item.divider && (
                                                <div className="my-1 border-t border-primary/10" />
                                            )}
                                            {item.href ? (
                                                <Link
                                                    href={item.href}
                                                    method={item.method || 'get'}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-all ${variantClass} ${
                                                        item.disabled ? 'opacity-40 pointer-events-none' : ''
                                                    }`}
                                                >
                                                    {item.icon && (
                                                        <span className="material-symbols-outlined text-[17px] shrink-0">
                                                            {item.icon}
                                                        </span>
                                                    )}
                                                    <span className="truncate">{item.label}</span>
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleItemClick}
                                                    disabled={item.disabled}
                                                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition-all text-left ${variantClass} ${
                                                        item.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                                >
                                                    {item.icon && (
                                                        <span className="material-symbols-outlined text-[17px] shrink-0">
                                                            {item.icon}
                                                        </span>
                                                    )}
                                                    <span className="truncate">{item.label}</span>
                                                </button>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </div>
    );
}

