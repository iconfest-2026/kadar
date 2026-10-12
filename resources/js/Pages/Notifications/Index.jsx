import React, { useState, useEffect } from 'react';
import { Head, router, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function NotificationsIndex({
    notifications = { data: [], links: [] },
    stats = { total: 0, unread: 0 },
    currentFilter = 'all',
    currentCategory = 'all',
}) {
    const { auth } = usePage().props;
    const roles = auth?.user?.roles || [];
    const isAdmin = roles.includes('admin');
    const isInstructor = roles.includes('instructor');

    const [filter, setFilter] = useState(currentFilter);
    const [category, setCategory] = useState(currentCategory);

    const [localNotifications, setLocalNotifications] = useState(notifications);
    const [localStats, setLocalStats] = useState(stats);

    useEffect(() => {
        setLocalNotifications(notifications);
    }, [notifications]);

    useEffect(() => {
        setLocalStats(stats);
    }, [stats]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        router.get(
            '/notifications',
            { filter: newFilter, category },
            { preserveState: true }
        );
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        router.get(
            '/notifications',
            { filter, category: newCategory },
            { preserveState: true }
        );
    };

    const handleMarkAsRead = (id, targetUrl = null) => {
        setLocalNotifications((prev) => ({
            ...prev,
            data: prev.data.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
        }));
        setLocalStats((prev) => ({
            ...prev,
            unread: Math.max(0, prev.unread - 1),
        }));

        router.patch(`/notifications/${id}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (targetUrl) router.visit(targetUrl);
            },
            onError: () => {
                if (targetUrl) router.visit(targetUrl);
            },
        });
    };

    const handleMarkAllAsRead = () => {
        setLocalNotifications((prev) => ({
            ...prev,
            data: prev.data.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })),
        }));
        setLocalStats((prev) => ({
            ...prev,
            unread: 0,
        }));
        router.post('/notifications/mark-all-read', {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (!confirm('Hapus notifikasi ini?')) return;
        const target = localNotifications.data.find((n) => n.id === id);
        if (target && !target.read_at) {
            setLocalStats((prev) => ({
                ...prev,
                unread: Math.max(0, prev.unread - 1),
                total: Math.max(0, prev.total - 1),
            }));
        } else {
            setLocalStats((prev) => ({
                ...prev,
                total: Math.max(0, prev.total - 1),
            }));
        }
        setLocalNotifications((prev) => ({
            ...prev,
            data: prev.data.filter((n) => n.id !== id),
        }));
        router.delete(`/notifications/${id}`, {
            preserveScroll: true,
        });
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
            default:
                return { icon: 'notifications', color: 'bg-primary/10 text-primary border-primary/20' };
        }
    };

    const categoryOptions = [
        { value: 'all', label: 'Semua Kategori' },
        { value: 'announcement', label: 'Pengumuman' },
        { value: 'maintenance', label: 'Pemeliharaan' },
        { value: 'clinical', label: 'Klinis & Medis' },
        { value: 'emergency', label: 'Darurat' },
        { value: 'system', label: 'Sistem' },
        { value: 'consultation', label: 'Konsultasi' },
        { value: 'challenge', label: 'Tantangan' },
        { value: 'insight', label: 'Wawasan' },
    ];

    const content = (
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <Head title="Pusat Notifikasi - AEVYRA" />

            {/* Page Header Banner */}
            <div className="p-4 sm:p-6 rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-semibold">
                        <span className="material-symbols-outlined text-[15px] text-emerald-300">notifications</span>
                        <span>PUSAT PEMBERITAHUAN TERPUSAT</span>
                    </div>
                    <h1 className="font-heading font-black text-xl sm:text-2xl">
                        Notifikasi & Riwayat Aktivitas
                    </h1>
                    <p className="text-white/80 text-xs max-w-xl">
                        Pantau seluruh pengingat jadwal, rekomendasi wawasan gaya hidup, dan peringatan penting sistem.
                    </p>
                </div>

                {localStats.unread > 0 && (
                    <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-xl bg-white text-primary text-xs font-bold shadow-xs hover:bg-emerald-50 transition-all cursor-pointer whitespace-nowrap text-center justify-center flex items-center gap-1.5"
                    >
                        <span className="material-symbols-outlined text-[15px]">done_all</span>
                        <span>Tandai Semua Dibaca ({localStats.unread})</span>
                    </button>
                )}
            </div>

            {/* Filter Tabs & Categories */}
            <div className="bg-white dark:bg-surface p-3.5 sm:p-4 rounded-2xl border border-surface-container shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleFilterChange('all')}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                filter === 'all'
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                            Semua ({localStats.total})
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFilterChange('unread')}
                            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                filter === 'unread'
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            }`}
                        >
                            Belum Dibaca{localStats.unread > 0 ? ` (${localStats.unread})` : ''}
                        </button>
                    </div>

                    <div className="text-[11px] sm:text-xs text-on-surface-variant font-medium flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-teal-600 text-[16px] shrink-0">verified_user</span>
                        <span>Privasi dilindungi UU PDP (pratinjau bebas data rahasia).</span>
                    </div>
                </div>

                {/* Horizontal Category Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1 border-t border-surface-container/60">
                    {categoryOptions.map((cat) => (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => handleCategoryChange(cat.value)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                                category === cat.value
                                    ? 'bg-primary/10 text-primary border border-primary/25 font-bold'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-transparent'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications Feed */}
            <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs overflow-hidden divide-y divide-surface-container">
                {localNotifications.data.length > 0 ? (
                    localNotifications.data.map((notif) => {
                        const isUnread = !notif.read_at;
                        const iconInfo = getIconInfo(notif);

                        return (
                            <div
                                key={notif.id}
                                className={`p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4 transition-colors ${
                                    isUnread
                                        ? 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10'
                                        : 'hover:bg-surface-container-low'
                                }`}
                            >
                                <div
                                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 border mt-0.5 ${iconInfo.color}`}
                                >
                                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                                        {iconInfo.icon}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                                        <h3 className={`text-xs sm:text-sm font-bold ${
                                            isUnread ? 'text-on-surface' : 'text-on-surface-variant'
                                        }`}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-[10px] text-on-surface-variant font-label-mono shrink-0 whitespace-nowrap">
                                            {new Date(notif.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>

                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {notif.body}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                                        {notif.data?.action_url ? (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (isUnread) {
                                                        handleMarkAsRead(notif.id, notif.data.action_url);
                                                    } else {
                                                        router.visit(notif.data.action_url);
                                                    }
                                                }}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                                            >
                                                <span>Buka Halaman Terkait</span>
                                                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                            </button>
                                        ) : <span />}

                                        <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                                            {isUnread && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleMarkAsRead(notif.id)}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center gap-1 cursor-pointer transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">done</span>
                                                    <span>Tandai Dibaca</span>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(notif.id)}
                                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer transition-colors"
                                                title="Hapus"
                                                aria-label="Hapus notifikasi"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="p-10 sm:p-12 text-center space-y-3">
                        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
                            notifications_off
                        </span>
                        <h3 className="font-bold text-sm text-on-surface">Tidak Ada Notifikasi</h3>
                        <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                            {filter === 'unread'
                                ? 'Seluruh notifikasi telah Anda tandai sebagai dibaca.'
                                : 'Pemberitahuan aktivitas akan tampil di halaman ini.'}
                        </p>
                    </div>
                )}

                {/* Pagination Controls */}
                {localNotifications.links && localNotifications.links.length > 3 && (
                    <div className="p-3.5 sm:p-4 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <span className="text-on-surface-variant text-[11px] sm:text-xs">
                            Menampilkan <strong className="text-on-surface">{localNotifications.from || 0}</strong> - <strong className="text-on-surface">{localNotifications.to || 0}</strong> dari <strong className="text-on-surface">{localNotifications.total || 0}</strong> notifikasi
                        </span>
                        <div className="flex items-center gap-1 flex-wrap justify-center">
                            {localNotifications.links.map((link, idx) => {
                                if (!link.url && !link.active) {
                                    return (
                                        <span
                                            key={idx}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className="px-2.5 py-1 text-xs text-on-surface-variant/40 select-none"
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-primary text-white shadow-2xs'
                                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                        }`}
                                        preserveScroll
                                        preserveState
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (isAdmin) {
        return <AdminLayout title="Pusat Notifikasi" activeNav="notifications">{content}</AdminLayout>;
    }

    if (isInstructor) {
        return <InstructorLayout title="Pusat Notifikasi">{content}</InstructorLayout>;
    }

    return <AppLayout title="Pusat Notifikasi" activeTab="notifications">{content}</AppLayout>;
}
