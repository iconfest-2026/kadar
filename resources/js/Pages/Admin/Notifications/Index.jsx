import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select } from '@/Components/UI';

export default function NotificationsBroadcast({
    notifications = { data: [], links: [] },
    stats = { totalBroadcasts: 0, totalMembers: 0, totalInstructors: 0, totalUnread: 0 },
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [targetRole, setTargetRole] = useState(filters.target_role || 'all');
    const [category, setCategory] = useState(filters.category || 'all');

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [deletingNotification, setDeletingNotification] = useState(null);

    const broadcastForm = useForm({
        title: '',
        body: '',
        target_role: 'all',
        category: 'announcement',
        severity: 'info',
        action_url: '',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/notifications-broadcast',
                { search, target_role: targetRole, category },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, targetRole, category]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        broadcastForm.post('/admin/notifications-broadcast', {
            onSuccess: () => {
                setIsCreateOpen(false);
                broadcastForm.reset();
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingNotification) return;
        router.delete(`/admin/notifications-broadcast/${deletingNotification.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingNotification(null),
        });
    };

    const categoryLabels = {
        announcement: 'Pengumuman',
        maintenance: 'Maintenance',
        system: 'Sistem',
        clinical: 'Klinis',
        emergency: 'Darurat',
    };

    const severityBadges = {
        info: { variant: 'info', label: 'INFO' },
        warning: { variant: 'notice', label: 'PERINGATAN' },
        danger: { variant: 'emergency', label: 'KRITIS' },
        success: { variant: 'success', label: 'SUKSES' },
    };

    const targetRoleBadges = {
        all: { label: 'Semua', variant: 'primary' },
        member: { label: 'Member', variant: 'member' },
        instructor: { label: 'Instruktur', variant: 'instructor' },
    };

    const columns = [
        {
            key: 'title_body',
            label: 'Pesan & Judul',
            render: (row) => {
                const cat = row.data?.category || 'announcement';
                const sev = row.data?.severity || 'info';
                const icon = row.data?.icon || 'notifications';

                return (
                    <div className="flex items-center gap-2 max-w-sm">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                            sev === 'danger' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' :
                            sev === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                            sev === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                            'bg-primary/10 border-primary/20 text-primary'
                        }`}>
                            <span className="material-symbols-outlined text-[15px]">{icon}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-xs text-on-surface truncate" title={row.title}>
                                {row.title}
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant">
                                <span className="font-medium text-primary">
                                    {categoryLabels[cat] || cat}
                                </span>
                                <span>•</span>
                                <span className="font-mono text-[9px]">
                                    {new Date(row.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'target_role',
            label: 'Target',
            render: (row) => {
                const roleKey = row.data?.target_role || 'all';
                const roleMeta = targetRoleBadges[roleKey] || targetRoleBadges.all;
                return (
                    <div className="space-y-0.5">
                        <AdminBadge variant={roleMeta.variant} size="xs">
                            {roleMeta.label}
                        </AdminBadge>
                        <p className="text-[9px] text-on-surface-variant/70 truncate max-w-[110px]">
                            {row.user?.name || 'User'}
                        </p>
                    </div>
                );
            },
        },
        {
            key: 'severity',
            label: 'Urgensi',
            render: (row) => {
                const sev = row.data?.severity || 'info';
                const sevMeta = severityBadges[sev] || severityBadges.info;
                return (
                    <AdminBadge variant={sevMeta.variant} size="xs">
                        {sevMeta.label}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                row.read_at ? (
                    <AdminBadge variant="published" size="xs">
                        Dibaca
                    </AdminBadge>
                ) : (
                    <AdminBadge variant="notice" size="xs">
                        Belum Dibaca
                    </AdminBadge>
                )
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <button
                        type="button"
                        onClick={() => setDeletingNotification(row)}
                        className="p-1.5 rounded-xl text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Notifikasi"
                    >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="notifications-broadcast" title="Broadcast Notifikasi & Pengumuman">
            <Head title="Broadcast Notifikasi - Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Broadcast Notifikasi"
                    subtitle="Kirimkan notifikasi dan pengumuman penting secara serentak ke akun Instruktur dan Member."
                    icon="campaign"
                    badge={<AdminBadge variant="primary">Broadcast</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="send"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Kirim Notifikasi
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <AdminStatCard
                        title="Total Siaran"
                        value={stats.totalBroadcasts}
                        subtitle="Pesan terkirim"
                        icon="send"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Total Member"
                        value={stats.totalMembers}
                        subtitle="Penerima aktif"
                        icon="group"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Total Instruktur"
                        value={stats.totalInstructors}
                        subtitle="Penerima aktif"
                        icon="verified_user"
                        accent="amber"
                    />
                    <AdminStatCard
                        title="Belum Dibaca"
                        value={stats.totalUnread}
                        subtitle="Menunggu dibuka"
                        icon="mark_email_unread"
                        accent="rose"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari berdasarkan judul, pesan, atau nama penerima..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            label: 'Target Penerima',
                            value: targetRole,
                            onChange: setTargetRole,
                            options: [
                                { value: 'all', label: 'Semua Target' },
                                { value: 'member', label: 'Khusus Member' },
                                { value: 'instructor', label: 'Khusus Instruktur' },
                            ],
                        },
                        {
                            label: 'Kategori Pesan',
                            value: category,
                            onChange: setCategory,
                            options: [
                                { value: 'all', label: 'Semua Kategori' },
                                { value: 'maintenance', label: 'Pemeliharaan (Maintenance)' },
                                { value: 'announcement', label: 'Pengumuman' },
                                { value: 'system', label: 'Sistem' },
                                { value: 'clinical', label: 'Klinis' },
                                { value: 'emergency', label: 'Darurat' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (targetRole !== 'all' ? 1 : 0) + (category !== 'all' ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setTargetRole('all');
                        setCategory('all');
                    }}
                />

                {/* Table of Broadcasted Notifications */}
                <Table
                    columns={columns}
                    data={notifications}
                    emptyMessage="Belum ada riwayat siaran notifikasi yang dikirimkan."
                    emptyIcon="campaign"
                    searchable={false}
                />

                {/* Create / Broadcast Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Kirim Siaran Notifikasi (Broadcast)"
                    subtitle="Tuliskan pengumuman atau informasi darurat/pemeliharaan untuk dikirimkan secara serentak."
                    icon="campaign"
                    maxWidth="lg"
                    footer={
                        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCreateOpen(false)}
                                disabled={broadcastForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="broadcast-form"
                                variant="primary"
                                size="sm"
                                leftIcon="send"
                                loading={broadcastForm.processing}
                            >
                                Kirimkan Siaran Sekarang
                            </Button>
                        </div>
                    }
                >
                    <form id="broadcast-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        {/* Target Role Selector */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-on-surface">Target Penerima Peran (Role)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {[
                                    { value: 'all', label: 'Semua (Member & Instruktur)', icon: 'groups' },
                                    { value: 'member', label: 'Khusus Member', icon: 'person' },
                                    { value: 'instructor', label: 'Khusus Instruktur', icon: 'badge' },
                                ].map((tab) => (
                                    <button
                                        key={tab.value}
                                        type="button"
                                        onClick={() => broadcastForm.setData('target_role', tab.value)}
                                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                                            broadcastForm.data.target_role === tab.value
                                                ? 'bg-primary/10 border-primary text-primary shadow-xs'
                                                : 'bg-white border-surface-container text-on-surface-variant hover:border-primary/40'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px] mb-1">{tab.icon}</span>
                                        <span className="text-xs font-bold">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <Input
                            label="Judul Notifikasi"
                            placeholder="Contoh: Pemeliharaan Sistem Dijadwalkan Pukul 23:00 WIB"
                            required
                            value={broadcastForm.data.title}
                            onChange={(e) => broadcastForm.setData('title', e.target.value)}
                            error={broadcastForm.errors.title}
                        />

                        {/* Category & Severity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Select
                                label="Kategori Pesan"
                                required
                                value={broadcastForm.data.category}
                                onChange={(e) => broadcastForm.setData('category', e.target.value)}
                                error={broadcastForm.errors.category}
                                options={[
                                    { value: 'announcement', label: 'Pengumuman Umum' },
                                    { value: 'maintenance', label: 'Pemeliharaan (Maintenance)' },
                                    { value: 'system', label: 'Informasi Platform' },
                                    { value: 'clinical', label: 'Klinis & Medis' },
                                    { value: 'emergency', label: 'Peringatan Darurat' },
                                ]}
                            />

                            <Select
                                label="Tingkat Urgensi (Severity)"
                                required
                                value={broadcastForm.data.severity}
                                onChange={(e) => broadcastForm.setData('severity', e.target.value)}
                                error={broadcastForm.errors.severity}
                                options={[
                                    { value: 'info', label: 'Info (Biru - Netral)' },
                                    { value: 'warning', label: 'Warning (Kuning/Oranye - Waspada)' },
                                    { value: 'danger', label: 'Danger (Merah - Darurat/Kritis)' },
                                    { value: 'success', label: 'Success (Hijau - Berhasil)' },
                                ]}
                            />
                        </div>

                        {/* Body Message */}
                        <Textarea
                            label="Isi Pesan Notifikasi"
                            placeholder="Tuliskan detail informasi, durasi pemeliharaan, instruksi khusus, atau catatan penting..."
                            required
                            rows={4}
                            value={broadcastForm.data.body}
                            onChange={(e) => broadcastForm.setData('body', e.target.value)}
                            error={broadcastForm.errors.body}
                        />

                        {/* Action Link (Optional) */}
                        <Input
                            label="Tautan Aksi / Link Tujuan (Opsional)"
                            placeholder="Contoh: /member/tracker atau /instructor/dashboard"
                            value={broadcastForm.data.action_url}
                            onChange={(e) => broadcastForm.setData('action_url', e.target.value)}
                            error={broadcastForm.errors.action_url}
                        />

                        {/* Quick Presets */}
                        <div className="rounded-2xl bg-surface-container-low p-3 border border-surface-container space-y-1.5">
                            <p className="text-[11px] font-bold text-on-surface-variant font-label-mono uppercase tracking-wider">
                                Template Kilat (Preset):
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        broadcastForm.setData({
                                            ...broadcastForm.data,
                                            title: 'Pemberitahuan Jadwal Pemeliharaan Server',
                                            body: 'Sistem AEVYRA akan melakukan pemeliharaan server rutin malam ini pukul 23:00 - 01:00 WIB. Beberapa fitur mungkin mengalami jeda sementara.',
                                            category: 'maintenance',
                                            severity: 'warning',
                                            target_role: 'all',
                                        });
                                    }}
                                    className="px-2.5 py-1 rounded-xl bg-white border border-surface-container text-[11px] font-semibold text-on-surface hover:border-primary transition-colors cursor-pointer"
                                >
                                    🛠️ Pemeliharaan Server
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        broadcastForm.setData({
                                            ...broadcastForm.data,
                                            title: 'Pembaruan Fitur Baru AEVYRA Telah Rilis!',
                                            body: 'Nikmati fitur Tracker Tren Baseline dan Kalender Kesehatan yang lebih ringkas dan terintegrasi.',
                                            category: 'announcement',
                                            severity: 'info',
                                            target_role: 'all',
                                        });
                                    }}
                                    className="px-2.5 py-1 rounded-xl bg-white border border-surface-container text-[11px] font-semibold text-on-surface hover:border-primary transition-colors cursor-pointer"
                                >
                                    ✨ Rilis Fitur Baru
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        broadcastForm.setData({
                                            ...broadcastForm.data,
                                            title: 'Pengingat Evaluasi Klinis Mingguan',
                                            body: 'Bagi seluruh Instruktur, mohon memeriksa kembali sinyal perilaku dan konsultasi terbuka pada dashboard Anda.',
                                            category: 'clinical',
                                            severity: 'info',
                                            target_role: 'instructor',
                                        });
                                    }}
                                    className="px-2.5 py-1 rounded-xl bg-white border border-surface-container text-[11px] font-semibold text-on-surface hover:border-primary transition-colors cursor-pointer"
                                >
                                    📋 Evaluasi Instruktur
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingNotification}
                    onClose={() => setDeletingNotification(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Notifikasi Siaran"
                    message="Apakah Anda yakin ingin menghapus data siaran notifikasi ini?"
                    itemName={deletingNotification ? deletingNotification.title : ''}
                />
            </div>
        </AdminLayout>
    );
}

