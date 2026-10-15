import React, { useState, useRef, useEffect } from 'react';
import { usePage, router, Link } from '@inertiajs/react';

export default function NotificationDropdown({
    align = 'right',
    className = '',
    buttonClassName = '',
}) {
    const { notifications: notifData = { unread_count: 0, recent: [] } } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'unread'
    const dropdownRef = useRef(null);

    const [localUnreadCount, setLocalUnreadCount] = useState(notifData.unread_count || 0);
    const [localRecent, setLocalRecent] = useState(notifData.recent || []);

    useEffect(() => {
        setLocalUnreadCount(notifData.unread_count || 0);
        setLocalRecent(notifData.recent || []);
    }, [notifData.unread_count, notifData.recent]);

    const unreadCount = localUnreadCount;
    const recentList = localRecent;

    // Filter displayed notifications
    const displayedNotifications = recentList.filter((n) => {
        if (filter === 'unread') return !n.read_at;
        return true;
    });

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAsRead = (e, notif) => {
        e.stopPropagation();
        e.preventDefault();
        setLocalUnreadCount((prev) => Math.max(0, prev - 1));
        setLocalRecent((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, read_at: new Date().toISOString() } : n))
        );
        router.patch(`/notifications/${notif.id}/read`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleMarkAllAsRead = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        setLocalUnreadCount(0);
        setLocalRecent((prev) =>
            prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() }))
        );
        router.post('/notifications/mark-all-read', {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleDelete = (e, notif) => {
        e.stopPropagation();
        e.preventDefault();
        if (!notif.read_at) {
            setLocalUnreadCount((prev) => Math.max(0, prev - 1));
        }
        setLocalRecent((prev) => prev.filter((n) => n.id !== notif.id));
        router.delete(`/notifications/${notif.id}`, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleItemClick = (notif) => {
        setIsOpen(false);
        const targetUrl = notif.data?.action_url;
        if (!notif.read_at) {
            // Optimistically mark as read and remove badge
            setLocalUnreadCount((prev) => Math.max(0, prev - 1));
            setLocalRecent((prev) =>
                prev.map((n) => (n.id === notif.id ? { ...n, read_at: new Date().toISOString() } : n))
            );
            router.patch(`/notifications/${notif.id}/read`, {}, {
                preserveScroll: true,
                onSuccess: () => {
                    if (targetUrl) router.visit(targetUrl);
                },
                onError: () => {
                    if (targetUrl) router.visit(targetUrl);
                },
            });
        } else if (targetUrl) {
            router.visit(targetUrl);
        }
    };

    const formatRelativeTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 2) return 'Baru saja';
        if (diffMins < 60) return `${diffMins} mnt lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays === 1) return 'Kemarin';
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    };

    const getIconInfo = (notif) => {
        const cat = notif.data?.category || '';
        const severity = notif.data?.severity || '';
        const explicitIcon = notif.data?.icon;

        if (explicitIcon) {
            let color = 'bg-primary/10 text-primary border-primary/20';
            if (severity === 'warning') color = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            if (severity === 'danger') color = 'bg-rose-500/10 text-rose-600 border-rose-500/20';
            if (severity === 'success') color = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            return { icon: explicitIcon, color };
        }

        switch (cat) {
            case 'maintenance':
                return { icon: 'build', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
            case 'announcement':
                return { icon: 'campaign', color: 'bg-primary/10 text-primary border-primary/20' };
            case 'system':
                return { icon: 'settings_alert', color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' };
            case 'clinical':
                return { icon: 'warning', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' };
            case 'emergency':
                return { icon: 'emergency', color: 'bg-rose-600/10 text-rose-700 border-rose-600/30' };
            case 'moderation':
                return { icon: 'gavel', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
            case 'consultation':
            case 'booking':
                return { icon: 'video_camera_front', color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' };
            case 'insight':
                return { icon: 'insights', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
            case 'community':
                return { icon: 'forum', color: 'bg-sky-500/10 text-sky-600 border-sky-500/20' };
            case 'challenge':
            case 'payment':
                return { icon: 'stars', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
            case 'membership':
                return { icon: 'workspace_premium', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
            default:
                if (notif?.type?.startsWith('MEMBERSHIP_')) {
                    if (notif.type === 'MEMBERSHIP_PAYMENT_SUCCESS') {
                        return { icon: 'verified', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
                    }
                    if (notif.type === 'MEMBERSHIP_DOWNGRADE_SCHEDULED') {
                        return { icon: 'event_repeat', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
                    }
                    return { icon: 'workspace_premium', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' };
                }
                return { icon: 'notifications', color: 'bg-primary/10 text-primary border-primary/20' };
        }
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Notification Trigger Bell */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={
                    buttonClassName ||
                    `relative p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                        isOpen
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary border-primary/30 shadow-xs ring-2 ring-primary/15'
                            : 'bg-white/90 dark:bg-surface/90 text-on-surface-variant hover:text-primary hover:bg-white dark:hover:bg-surface border-primary/10 shadow-xs'
                    }`
                }
                title={`Notifikasi (${unreadCount} belum dibaca)`}
                aria-label="Pusat Notifikasi"
            >
                <span className="material-symbols-outlined text-[20px]">
                    {unreadCount > 0 ? 'notifications_active' : 'notifications'}
                </span>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white font-mono font-bold text-[9px] flex items-center justify-center ring-2 ring-white dark:ring-surface animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Mobile Backdrop - Frosted Glass Depth instead of flat muddy dark grey */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#00433e]/10 dark:bg-black/45 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-200 animate-in fade-in"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Notification Dropdown Drawer / Modal */}
            {isOpen && (
                <div
                    className={`fixed sm:absolute inset-x-3 sm:inset-x-auto ${
                        align === 'right' ? 'sm:right-0' : 'sm:left-0'
                    } top-15 sm:top-full mt-1.5 sm:mt-2 w-auto sm:w-96 max-w-[calc(100vw-1.5rem)] sm:max-w-none bg-white/98 dark:bg-[#12201c]/98 backdrop-blur-2xl border border-primary/15 dark:border-primary/25 rounded-3xl shadow-[0_20px_50px_rgba(0,67,62,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5 dark:ring-white/10`}
                >
                    {/* Header */}
                    <div className="p-3.5 sm:p-4 border-b border-surface-container flex items-center justify-between bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/15">
                                <span className="material-symbols-outlined text-[17px]">notifications</span>
                            </div>
                            <span className="font-heading font-bold text-sm text-on-surface">Notifikasi</span>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 font-mono border border-rose-500/20">
                                    {unreadCount} Baru
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <button
                                    type="button"
                                    onClick={handleMarkAllAsRead}
                                    className="text-[11px] font-bold text-primary hover:text-primary-container hover:underline cursor-pointer flex items-center gap-1 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[14px]">done_all</span>
                                    <span>Tandai Dibaca</span>
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="sm:hidden w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                                aria-label="Tutup notifikasi"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="px-3.5 sm:px-4 py-2 border-b border-surface-container/60 bg-surface-container-lowest/70 dark:bg-surface-container-low/30">
                        <div className="flex items-center p-0.5 bg-surface-container-low dark:bg-surface-container/40 rounded-xl border border-surface-container/60">
                            <button
                                type="button"
                                onClick={() => setFilter('all')}
                                className={`flex-1 py-1 px-3 rounded-lg font-semibold text-[11px] transition-all cursor-pointer text-center ${
                                    filter === 'all'
                                        ? 'bg-white dark:bg-surface text-primary shadow-2xs font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Semua ({recentList.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setFilter('unread')}
                                className={`flex-1 py-1 px-3 rounded-lg font-semibold text-[11px] transition-all cursor-pointer text-center ${
                                    filter === 'unread'
                                        ? 'bg-white dark:bg-surface text-primary shadow-2xs font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Belum Dibaca{unreadCount > 0 ? ` (${unreadCount})` : ''}
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-surface-container/70 max-h-[60vh] sm:max-h-84 overflow-y-auto">
                        {displayedNotifications.length > 0 ? (
                            displayedNotifications.map((notif) => {
                                const isUnread = !notif.read_at;
                                const iconInfo = getIconInfo(notif);

                                return (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleItemClick(notif)}
                                        className={`p-3 sm:p-3.5 flex items-start gap-3 transition-colors cursor-pointer group relative ${
                                            isUnread
                                                ? 'bg-primary/[0.04] dark:bg-primary/[0.08] hover:bg-primary/[0.08]'
                                                : 'hover:bg-surface-container-low/70'
                                        }`}
                                    >
                                        {/* Unread Accent Bar */}
                                        {isUnread && (
                                            <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-primary" />
                                        )}

                                        <div
                                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 shadow-2xs ${iconInfo.color}`}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {iconInfo.icon}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-0.5">
                                            <div className="flex items-center justify-between gap-1.5">
                                                <h4 className={`text-xs truncate ${
                                                    isUnread ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'
                                                }`}>
                                                    {notif.title}
                                                </h4>
                                                <span className="text-[10px] text-on-surface-variant/80 font-label-mono shrink-0 whitespace-nowrap">
                                                    {formatRelativeTime(notif.created_at)}
                                                </span>
                                            </div>

                                            <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                                                {notif.body}
                                            </p>

                                            <div className="flex items-center justify-between pt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                {notif.data?.action_url ? (
                                                    <span className="text-[10px] font-bold text-primary flex items-center gap-0.5 hover:underline">
                                                        <span>Buka</span>
                                                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                                    </span>
                                                ) : <span />}

                                                <div className="flex items-center gap-1">
                                                    {isUnread && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => handleMarkAsRead(e, notif)}
                                                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                                                            title="Tandai telah dibaca"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">done</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => handleDelete(e, notif)}
                                                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                                        title="Hapus notifikasi"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {isUnread && (
                                            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5 ring-2 ring-primary/20 animate-pulse"></span>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center space-y-2">
                                <div className="w-12 h-12 rounded-2xl bg-surface-container/60 mx-auto flex items-center justify-center text-on-surface-variant/50">
                                    <span className="material-symbols-outlined text-2xl">
                                        notifications_paused
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-on-surface">Tidak ada notifikasi baru</p>
                                <p className="text-[10px] text-on-surface-variant max-w-xs mx-auto">
                                    {filter === 'unread'
                                        ? 'Seluruh pemberitahuan telah Anda baca.'
                                        : 'Aktivitas dan pembaruan penting akan muncul di sini.'}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-surface-container/70 bg-linear-to-b from-transparent to-surface-container-low/40 text-center">
                        <Link
                            href="/notifications"
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold text-primary hover:text-primary-container hover:underline inline-flex items-center gap-1.5 transition-colors"
                        >
                            <span>Buka Semua di Pusat Notifikasi</span>
                            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
