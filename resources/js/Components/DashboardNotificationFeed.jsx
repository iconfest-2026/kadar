import React from 'react';
import { usePage, router, Link } from '@inertiajs/react';

export default function DashboardNotificationFeed({
    role = 'member',
    title,
    subtitle,
    maxItems = 3,
    className = '',
}) {
    const { notifications: notifData = { unread_count: 0, recent: [] } } = usePage().props;
    const unreadCount = notifData.unread_count || 0;
    const recentList = notifData.recent || [];

    const displayedNotifications = recentList.slice(0, maxItems);

    const defaultTitle = role === 'admin'
        ? 'Alert & Notifikasi Tata Kelola'
        : role === 'instructor'
        ? 'Sinyal Klinis & Notifikasi Caseload'
        : 'Pengingat & Wawasan Terkini';

    const defaultSubtitle = role === 'admin'
        ? 'Pemberitahuan moderasi, log telemetri, dan lisensi STR'
        : role === 'instructor'
        ? 'Notifikasi deviasi biomarker dan jadwal tele-konsultasi'
        : 'Update konsultasi dokter, capaian tantangan, dan HBE';

    const formatRelativeTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 2) return 'Baru saja';
        if (diffMins < 60) return `${diffMins}m lalu`;
        if (diffHours < 24) return `${diffHours}j lalu`;
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
            default:
                return { icon: 'notifications', color: 'bg-primary/10 text-primary border-primary/20' };
        }
    };

    const handleMarkAsRead = (e, notif) => {
        e.stopPropagation();
        e.preventDefault();
        router.patch(`/notifications/${notif.id}/read`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleMarkAllAsRead = (e) => {
        e.preventDefault();
        router.post('/notifications/mark-all-read', {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleItemClick = (notif) => {
        if (!notif.read_at) {
            router.patch(`/notifications/${notif.id}/read`, {}, {
                preserveScroll: true,
                preserveState: true,
            });
        }
        const targetUrl = notif.data?.action_url;
        if (targetUrl) {
            router.visit(targetUrl);
        }
    };

    return (
        <div className={`p-4 sm:p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs transition-all ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-3.5 pb-3 border-b border-surface-container">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[19px]">notifications_active</span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-heading font-black text-xs sm:text-sm text-on-surface truncate">
                                {title || defaultTitle}
                            </h3>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500 text-white shrink-0 shadow-2xs">
                                    {unreadCount} baru
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-on-surface-variant truncate mt-0.5">
                            {subtitle || defaultSubtitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {unreadCount > 0 && (
                        <button
                            type="button"
                            onClick={handleMarkAllAsRead}
                            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-container px-2 py-1 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                            title="Tandai semua notifikasi sudah dibaca"
                        >
                            <span className="material-symbols-outlined text-[14px]">done_all</span>
                            <span>Tandai Dibaca</span>
                        </button>
                    )}
                    <Link
                        href="/notifications"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-[11px] font-bold transition-colors shrink-0"
                    >
                        <span>Semua</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </Link>
                </div>
            </div>

            {/* List */}
            {displayedNotifications.length > 0 ? (
                <div className="space-y-2">
                    {displayedNotifications.map((notif) => {
                        const iconInfo = getIconInfo(notif);
                        const isUnread = !notif.read_at;

                        return (
                            <div
                                key={notif.id}
                                onClick={() => handleItemClick(notif)}
                                className={`group p-3 rounded-2xl transition-all cursor-pointer flex items-start gap-3 border ${
                                    isUnread
                                        ? 'bg-primary/3 hover:bg-primary/6 border-primary/15 shadow-2xs'
                                        : 'bg-surface-container-low/50 hover:bg-surface-container border-transparent'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border mt-0.5 ${iconInfo.color}`}>
                                    <span className="material-symbols-outlined text-[17px]">
                                        {iconInfo.icon}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0 space-y-0.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className={`text-xs truncate ${isUnread ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-[10px] font-mono text-on-surface-variant shrink-0">
                                            {formatRelativeTime(notif.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant/90 line-clamp-2 leading-relaxed">
                                        {notif.body}
                                    </p>
                                </div>

                                <div className="shrink-0 flex items-center gap-1 self-center opacity-80 group-hover:opacity-100">
                                    {isUnread && (
                                        <button
                                            type="button"
                                            onClick={(e) => handleMarkAsRead(e, notif)}
                                            className="p-1 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                            title="Tandai dibaca"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        </button>
                                    )}
                                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-transform">
                                        arrow_forward
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="py-6 text-center text-on-surface-variant space-y-1">
                    <span className="material-symbols-outlined text-[28px] text-primary/40">notifications_none</span>
                    <p className="text-xs font-semibold text-on-surface">Tidak ada notifikasi baru</p>
                    <p className="text-[11px] text-on-surface-variant">
                        {role === 'instructor'
                            ? 'Seluruh sinyal caseload dalam batas normal.'
                            : role === 'admin'
                            ? 'Seluruh antrean moderasi & audit dalam keadaan aman.'
                            : 'Semua target pengingat kesehatan Anda berjalan baik.'}
                    </p>
                </div>
            )}
        </div>
    );
}
