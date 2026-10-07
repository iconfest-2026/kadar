import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select, Tabs, TabsList, TabsTrigger, TabsContent, DropdownAction } from '@/Components/UI';

export default function Gamification({
    achievements = { data: [], links: [] },
    recentLedger = [],
    topStreaks = [],
    stats = {},
    users = [],
}) {
    const [activeTab, setActiveTab] = useState('badges');

    // Modals
    const [isCreateBadgeOpen, setIsCreateBadgeOpen] = useState(false);
    const [isAwardPointsOpen, setIsAwardPointsOpen] = useState(false);
    const [editingBadge, setEditingBadge] = useState(null);
    const [deletingBadge, setDeletingBadge] = useState(null);

    // Create Badge Form
    const badgeForm = useForm({
        name: '',
        key: '',
        category: 'CONSISTENCY',
        description: '',
        status: 'ACTIVE',
    });

    // Edit Badge Form
    const editBadgeForm = useForm({
        name: '',
        category: 'CONSISTENCY',
        description: '',
        status: 'ACTIVE',
    });

    // Award Points Form
    const pointsForm = useForm({
        user_id: users[0]?.id || '',
        points: 50,
        event_type: 'ADMIN_SPECIAL_AWARD',
    });

    const handleCreateBadge = (e) => {
        e.preventDefault();
        badgeForm.post('/admin/gamification/badges', {
            onSuccess: () => {
                setIsCreateBadgeOpen(false);
                badgeForm.reset();
            },
        });
    };

    const openEditBadge = (badge) => {
        setEditingBadge(badge);
        editBadgeForm.setData({
            name: badge.name || '',
            category: badge.category || 'CONSISTENCY',
            description: badge.description || '',
            status: badge.status || 'ACTIVE',
        });
    };

    const handleEditBadge = (e) => {
        e.preventDefault();
        if (!editingBadge) return;
        editBadgeForm.patch(`/admin/gamification/badges/${editingBadge.id}`, {
            onSuccess: () => {
                setEditingBadge(null);
                editBadgeForm.reset();
            },
        });
    };

    const handleDeleteBadge = () => {
        if (!deletingBadge) return;
        router.delete(`/admin/gamification/badges/${deletingBadge.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingBadge(null),
        });
    };

    const handleAwardPoints = (e) => {
        e.preventDefault();
        pointsForm.post('/admin/gamification/award-points', {
            onSuccess: () => {
                setIsAwardPointsOpen(false);
                pointsForm.reset();
            },
        });
    };

    const badgeColumns = [
        {
            key: 'name',
            label: 'Nama & Kunci Lencana',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-800 font-heading font-black flex items-center justify-center shadow-2xs shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-amber-600">military_tech</span>
                    </div>
                    <div>
                        <p className="font-bold text-xs text-on-surface">{row.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.key}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Kategori Kebiasaan',
            render: (row) => (
                <AdminBadge variant="amber" size="xs">
                    {row.category || 'KONSISTENSI'}
                </AdminBadge>
            ),
        },
        {
            key: 'description',
            label: 'Syarat Pencapaian',
            render: (row) => (
                <span className="text-xs text-on-surface-variant line-clamp-1">
                    {row.description || 'Menjaga konsistensi pencatatan'}
                </span>
            ),
        },
        {
            key: 'users_count',
            label: 'Member Penerima',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-primary">
                    {row.users_count || 0} pengguna
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status Lencana',
            render: (row) => (
                <AdminBadge variant={row.status === 'ACTIVE' ? 'active' : 'draft'} size="xs">
                    {row.status || 'AKTIF'}
                </AdminBadge>
            ),
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onEdit={() => openEditBadge(row)}
                        editLabel="Edit Lencana"
                        onDelete={() => setDeletingBadge(row)}
                        deleteLabel="Hapus Lencana"
                    />
                </div>
            ),
        },
    ];

    const ledgerColumns = [
        {
            key: 'user',
            label: 'Penerima Poin',
            render: (row) => (
                <span className="font-bold text-xs text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'event_type',
            label: 'Sumber Peristiwa',
            render: (row) => (
                <AdminBadge variant="gold" size="xs">
                    {row.event_type}
                </AdminBadge>
            ),
        },
        {
            key: 'points',
            label: 'Kredit Poin',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-emerald-700">
                    +{row.points} Poin
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Waktu Transaksi',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.created_at ? new Date(row.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                </span>
            ),
        },
    ];

    const streakColumns = [
        {
            key: 'rank',
            label: 'Peringkat',
            render: (_, rIdx) => (
                <span className="font-heading font-black text-sm text-amber-600">
                    #{rIdx + 1}
                </span>
            ),
        },
        {
            key: 'user',
            label: 'Member Berdedikasi',
            render: (row) => (
                <span className="font-bold text-xs text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'current_count',
            label: 'Streak Berjalan',
            render: (row) => (
                <div className="flex items-center gap-1 font-label-mono font-bold text-xs text-amber-600">
                    <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                    <span>{row.current_count} Hari</span>
                </div>
            ),
        },
        {
            key: 'best_count',
            label: 'Rekor Terbaik',
            render: (row) => (
                <span className="font-label-mono text-xs text-on-surface-variant font-medium">
                    {row.best_count} Hari
                </span>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="gamification" title="Gamifikasi & Penghargaan">
            <Head title="Gamifikasi, Lencana & Poin - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Gamifikasi, Lencana Penghargaan & Buku Besar Poin"
                    subtitle="Pengawasan aturan penghargaan mikro-kebiasaan, pencatatan transaksi kredit poin aktivitas sehat, dan peringkat streak konsistensi member."
                    icon="military_tech"
                    badge={<AdminBadge variant="amber">Habit Motivation</AdminBadge>}
                    actions={
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="md"
                                leftIcon="redeem"
                                onClick={() => setIsAwardPointsOpen(true)}
                            >
                                Beri Poin Manual
                            </Button>
                            <Button
                                type="button"
                                variant="primary"
                                size="md"
                                leftIcon="add"
                                onClick={() => setIsCreateBadgeOpen(true)}
                            >
                                Buat Lencana Baru
                            </Button>
                        </div>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Lencana Aktif"
                        value={stats.totalBadges || 0}
                        icon="military_tech"
                        accent="amber"
                    />
                    <AdminStatCard
                        title="Poin Dikeluarkan"
                        value={stats.totalPointsAwarded ? `${stats.totalPointsAwarded.toLocaleString('id-ID')} Poin` : '0 Poin'}
                        icon="stars"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Streak Tertinggi Platform"
                        value={`${stats.highestStreak || 14} Hari`}
                        icon="local_fire_department"
                        accent="rose"
                    />
                    <AdminStatCard
                        title="Member Streak Aktif (≥3H)"
                        value={stats.activeStreaksCount || 0}
                        icon="trending_up"
                        accent="emerald"
                    />
                </div>

                {/* Tabs Component */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="badges">Koleksi Lencana ({achievements.total || achievements.data?.length || 0})</TabsTrigger>
                        <TabsTrigger value="ledger">Buku Besar Poin Terkini ({recentLedger.length || 0})</TabsTrigger>
                        <TabsTrigger value="streaks">Peringkat Streak Member ({topStreaks.length || 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="badges" className="pt-2">
                        <Table
                            columns={badgeColumns}
                            data={achievements}
                            emptyMessage="Belum ada lencana pencapaian yang terdaftar."
                            emptyIcon="military_tech"
                        />
                    </TabsContent>

                    <TabsContent value="ledger" className="pt-2">
                        <Table
                            columns={ledgerColumns}
                            data={recentLedger}
                            emptyMessage="Belum ada riwayat transaksi poin terbaru."
                            emptyIcon="account_balance_wallet"
                        />
                    </TabsContent>

                    <TabsContent value="streaks" className="pt-2">
                        <Table
                            columns={streakColumns}
                            data={topStreaks}
                            emptyMessage="Belum ada data streak berjalan yang tercatat."
                            emptyIcon="local_fire_department"
                        />
                    </TabsContent>
                </Tabs>

                {/* Create Badge Modal */}
                <Modal
                    isOpen={isCreateBadgeOpen}
                    onClose={() => setIsCreateBadgeOpen(false)}
                    title="Buat Lencana Penghargaan Baru"
                    subtitle="Definisikan lencana baru beserta syarat pencapaiannya untuk memotivasi member."
                    icon="military_tech"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCreateBadgeOpen(false)}
                                disabled={badgeForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="create-badge-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={badgeForm.processing}
                            >
                                Simpan Lencana
                            </Button>
                        </div>
                    }
                >
                    <form id="create-badge-form" onSubmit={handleCreateBadge} className="space-y-4">
                        <Input
                            label="Nama Lencana"
                            placeholder="Contoh: Jawara Hidrasi 14 Hari"
                            required
                            value={badgeForm.data.name}
                            onChange={(e) => badgeForm.setData('name', e.target.value)}
                            error={badgeForm.errors.name}
                        />

                        <Input
                            label="Kunci Sistem Unik (Unique Key)"
                            placeholder="Contoh: hydration_master_14d"
                            required
                            value={badgeForm.data.key}
                            onChange={(e) => badgeForm.setData('key', e.target.value)}
                            error={badgeForm.errors.key}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Kategori Kebiasaan"
                                required
                                value={badgeForm.data.category}
                                onChange={(e) => badgeForm.setData('category', e.target.value)}
                                error={badgeForm.errors.category}
                                options={[
                                    { value: 'CONSISTENCY', label: 'Konsistensi Rutin' },
                                    { value: 'NUTRITION', label: 'Nutrisi Sehat' },
                                    { value: 'ACTIVITY', label: 'Aktivitas Fisik' },
                                    { value: 'SLEEP', label: 'Kualitas Tidur' },
                                    { value: 'HYDRATION', label: 'Hidrasi Air' },
                                ]}
                            />

                            <Select
                                label="Status Awal"
                                required
                                value={badgeForm.data.status}
                                onChange={(e) => badgeForm.setData('status', e.target.value)}
                                error={badgeForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif (Dapat Diraih)' },
                                    { value: 'DRAFT', label: 'Draf' },
                                    { value: 'ARCHIVED', label: 'Diarsipkan' },
                                ]}
                            />
                        </div>

                        <Textarea
                            label="Syarat & Deskripsi Pencapaian"
                            placeholder="Jelaskan kondisi yang harus dipenuhi member untuk membuka lencana ini..."
                            required
                            value={badgeForm.data.description}
                            onChange={(e) => badgeForm.setData('description', e.target.value)}
                            error={badgeForm.errors.description}
                            rows={3}
                        />
                    </form>
                </Modal>

                {/* Edit Badge Modal */}
                <Modal
                    isOpen={!!editingBadge}
                    onClose={() => setEditingBadge(null)}
                    title={`Edit Lencana: ${editingBadge?.name || ''}`}
                    subtitle="Perbarui nama, deskripsi syarat, atau status keaktifan lencana."
                    icon="edit"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingBadge(null)}
                                disabled={editBadgeForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-badge-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={editBadgeForm.processing}
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    }
                >
                    <form id="edit-badge-form" onSubmit={handleEditBadge} className="space-y-4">
                        <Input
                            label="Nama Lencana"
                            required
                            value={editBadgeForm.data.name}
                            onChange={(e) => editBadgeForm.setData('name', e.target.value)}
                            error={editBadgeForm.errors.name}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Kategori"
                                required
                                value={editBadgeForm.data.category}
                                onChange={(e) => editBadgeForm.setData('category', e.target.value)}
                                error={editBadgeForm.errors.category}
                                options={[
                                    { value: 'CONSISTENCY', label: 'Konsistensi Rutin' },
                                    { value: 'NUTRITION', label: 'Nutrisi Sehat' },
                                    { value: 'ACTIVITY', label: 'Aktivitas Fisik' },
                                    { value: 'SLEEP', label: 'Kualitas Tidur' },
                                    { value: 'HYDRATION', label: 'Hidrasi Air' },
                                ]}
                            />

                            <Select
                                label="Status Lencana"
                                required
                                value={editBadgeForm.data.status}
                                onChange={(e) => editBadgeForm.setData('status', e.target.value)}
                                error={editBadgeForm.errors.status}
                                options={[
                                    { value: 'ACTIVE', label: 'Aktif' },
                                    { value: 'DRAFT', label: 'Draf' },
                                    { value: 'ARCHIVED', label: 'Diarsipkan' },
                                ]}
                            />
                        </div>

                        <Textarea
                            label="Deskripsi Syarat Pencapaian"
                            required
                            value={editBadgeForm.data.description}
                            onChange={(e) => editBadgeForm.setData('description', e.target.value)}
                            error={editBadgeForm.errors.description}
                            rows={3}
                        />
                    </form>
                </Modal>

                {/* Award Points Modal */}
                <Modal
                    isOpen={isAwardPointsOpen}
                    onClose={() => setIsAwardPointsOpen(false)}
                    title="Beri Hadiah Poin Manual ke Pengguna"
                    subtitle="Berikan bonus poin kesehatan untuk member berprestasi atau sebagai kompensasi."
                    icon="redeem"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsAwardPointsOpen(false)}
                                disabled={pointsForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="award-points-form"
                                variant="primary"
                                size="sm"
                                leftIcon="send"
                                loading={pointsForm.processing}
                            >
                                Kreditkan Poin
                            </Button>
                        </div>
                    }
                >
                    <form id="award-points-form" onSubmit={handleAwardPoints} className="space-y-4">
                        <Select
                            label="Pilih Member Penerima"
                            required
                            value={pointsForm.data.user_id}
                            onChange={(e) => pointsForm.setData('user_id', e.target.value)}
                            error={pointsForm.errors.user_id}
                            options={users.map((u) => ({ value: u.id, label: `${u.name} (${u.email})` }))}
                        />

                        <Input
                            label="Jumlah Poin Hadiah"
                            type="number"
                            min="1"
                            max="10000"
                            required
                            value={pointsForm.data.points}
                            onChange={(e) => pointsForm.setData('points', parseInt(e.target.value) || 0)}
                            error={pointsForm.errors.points}
                        />

                        <Input
                            label="Alasan / Tipe Hadiah"
                            placeholder="Contoh: BONUS_KONSISTENSI_BULANAN"
                            required
                            value={pointsForm.data.event_type}
                            onChange={(e) => pointsForm.setData('event_type', e.target.value)}
                            error={pointsForm.errors.event_type}
                        />
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingBadge}
                    onClose={() => setDeletingBadge(null)}
                    onConfirm={handleDeleteBadge}
                    title="Hapus Lencana Pencapaian"
                    message="Apakah Anda yakin ingin menghapus lencana ini secara permanen dari basis data?"
                    itemName={deletingBadge ? deletingBadge.name : ''}
                />
            </div>
        </AdminLayout>
    );
}
