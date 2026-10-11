import React, { useState } from 'react';
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

    const handleMarkAsRead = (id) => {
        router.patch(`/notifications/${id}/read`, {}, {
            preserveScroll: true,
        });
    };

    const handleMarkAllAsRead = () => {
        router.post('/notifications/mark-all-read', {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (!confirm('Hapus notifikasi ini?')) return;
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

    const content = (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <Head title="Pusat Notifikasi - AEVYRA" />

            {/* Page Header Banner */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

                {stats.unread > 0 && (
                    <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="px-4 py-2 rounded-xl bg-white text-primary text-xs font-bold shadow-xs hover:bg-emerald-50 transition-all cursor-pointer whitespace-nowrap"
                    >
                        Tandai Semua Dibaca ({stats.unread})
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-surface p-3 rounded-2xl border border-surface-container shadow-2xs">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleFilterChange('all')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            filter === 'all'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        Semua ({stats.total})
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFilterChange('unread')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            filter === 'unread'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        Belum Dibaca ({stats.unread})
                    </button>
                </div>

                <div className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-teal-600 text-[16px]">verified_user</span>
                    <span>Privasi dilindungi UU PDP (tanpa paparan data klinis pada pratinjau).</span>
                </div>
            </div>

            {/* Notifications Feed */}
            <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs overflow-hidden divide-y divide-surface-container">
                {notifications.data.length > 0 ? (
                    notifications.data.map((notif) => {
                        const isUnread = !notif.read_at;
                        const iconInfo = getIconInfo(notif);

                        return (
                            <div
                                key={notif.id}
                                className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                                    isUnread
                                        ? 'bg-primary/5 dark:bg-primary/10 hover:bg-primary/10'
                                        : 'hover:bg-surface-container-low'
                                }`}
                            >
                                <div
                                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border mt-0.5 ${iconInfo.color}`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">
                                        {iconInfo.icon}
                                    </span>
                                </div>

                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className={`text-xs sm:text-sm font-bold ${
                                            isUnread ? 'text-on-surface' : 'text-on-surface-variant'
                                        }`}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-[10px] text-on-surface-variant font-label-mono whitespace-nowrap">
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

                                    <div className="flex items-center justify-between pt-2">
                                        {notif.data?.action_url ? (
                                            <Link
                                                href={notif.data.action_url}
                                                onClick={() => {
                                                    if (isUnread) handleMarkAsRead(notif.id);
                                                }}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                                            >
                                                <span>Buka Halaman Terkait</span>
                                                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                            </Link>
                                        ) : <span />}

                                        <div className="flex items-center gap-2">
                                            {isUnread && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleMarkAsRead(notif.id)}
                                                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1 cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">done</span>
                                                    <span>Tandai Dibaca</span>
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(notif.id)}
                                                className="p-1 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                                                title="Hapus"
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
                    <div className="p-12 text-center space-y-3">
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
