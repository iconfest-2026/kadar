import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select } from '@/Components/UI';

export default function Challenges({
    challenges = { data: [], links: [] },
    programs = [],
    stats = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [goalType, setGoalType] = useState(filters.goal_type || '');
    const [status, setStatus] = useState(filters.status || '');
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingChallenge, setEditingChallenge] = useState(null);
    const [deletingChallenge, setDeletingChallenge] = useState(null);

    // Create Form
    const createForm = useForm({
        name: '',
        description: '',
        goal_type: 'STEPS',
        duration_days: 7,
        points_reward: 100,
        program_id: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    // Edit Form
    const editForm = useForm({
        name: '',
        description: '',
        goal_type: 'STEPS',
        duration_days: 7,
        points_reward: 100,
        program_id: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/challenges',
                { search, goal_type: goalType, status },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, goalType, status]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/challenges', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (ch) => {
        setEditingChallenge(ch);
        editForm.setData({
            name: ch.name || '',
            description: ch.description || '',
            goal_type: ch.goal_type || 'STEPS',
            duration_days: ch.duration_days || 7,
            points_reward: ch.points_reward || 100,
            program_id: ch.program_id || '',
            status: ch.status || 'PUBLISHED',
            starts_at: ch.starts_at ? ch.starts_at.split('T')[0] : '',
            ends_at: ch.ends_at ? ch.ends_at.split('T')[0] : '',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingChallenge) return;
        editForm.patch(`/admin/challenges/${editingChallenge.id}`, {
            onSuccess: () => {
                setEditingChallenge(null);
                editForm.reset();
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingChallenge) return;
        router.delete(`/admin/challenges/${deletingChallenge.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingChallenge(null),
        });
    };

    const goalTypeLabels = {
        STEPS: 'Langkah Kaki',
        NUTRITION: 'Nutrisi Sehat',
        SLEEP: 'Ritme Tidur',
        HYDRATION: 'Hidrasi Air',
        WORKOUT: 'Latihan Fisik',
    };

    const columns = [
        {
            key: 'name',
            label: 'Nama Tantangan Gamifikasi',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs sm:text-sm line-clamp-1">{row.name}</p>
                        <p className="text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">{row.description || 'Target mikro-kebiasaan harian'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'program',
            label: 'Program Terkait',
            render: (row) => (
                <span className="font-medium text-xs text-on-surface">
                    {row.program?.name || 'Tantangan Terbuka (Mandiri)'}
                </span>
            ),
        },
        {
            key: 'goal_type',
            label: 'Kategori Target',
            render: (row) => (
                <AdminBadge variant="primary" size="xs">
                    {goalTypeLabels[row.goal_type] || row.goal_type}
                </AdminBadge>
            ),
        },
        {
            key: 'duration_reward',
            label: 'Durasi & Poin',
            render: (row) => (
                <div className="font-label-mono text-xs space-y-0.5">
                    <p className="font-bold text-amber-700">+{row.points_reward} Poin</p>
                    <p className="text-[10px] text-on-surface-variant">{row.duration_days} Hari Target</p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <AdminBadge variant={row.status === 'PUBLISHED' || row.status === 'ACTIVE' ? 'active' : 'draft'} size="xs">
                    {row.status || 'PUBLISHED'}
                </AdminBadge>
            ),
        },
        {
            key: 'participations_count',
            label: 'Partisipan',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-teal-700">
                    {row.participations_count || 0} Member
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1.5">
                    <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        leftIcon="edit"
                        onClick={() => openEditModal(row)}
                        title="Edit Tantangan"
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant="destructive"
                        leftIcon="delete"
                        onClick={() => setDeletingChallenge(row)}
                        title="Hapus Tantangan"
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="challenges" title="Tantangan & Gamifikasi Kesehatan">
            <Head title="Challenge Komunitas — Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tantangan Komunitas & Gamifikasi Mikro-Kebiasaan"
                    subtitle="Dorong keterikatan dan konsistensi member melalui target harian gamifikasi bertingkat, imbalan poin, dan lencana pencapaian."
                    icon="emoji_events"
                    badge={<AdminBadge variant="amber">Gamified Challenges</AdminBadge>}
                    actions={
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white/80 rounded-2xl border border-primary/15 p-1">
                                <button
                                    type="button"
                                    onClick={() => setViewMode('table')}
                                    className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                                        viewMode === 'table' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">table_rows</span>
                                    <span>Tabel</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setViewMode('cards')}
                                    className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                                        viewMode === 'cards' ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">grid_view</span>
                                    <span>Kartu</span>
                                </button>
                            </div>

                            <Button
                                type="button"
                                variant="primary"
                                size="md"
                                leftIcon="add"
                                onClick={() => setIsCreateOpen(true)}
                            >
                                Buat Challenge Baru
                            </Button>
                        </div>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Tantangan"
                        value={stats.totalChallenges || 0}
                        icon="emoji_events"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Tantangan Aktif"
                        value={stats.activeChallenges || 0}
                        icon="local_fire_department"
                        accent="amber"
                    />
                    <AdminStatCard
                        title="Total Partisipasi"
                        value={stats.totalParticipations || 0}
                        icon="groups"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Total Poin Tersedia"
                        value={stats.totalRewardsAwarded ? `${stats.totalRewardsAwarded} Poin` : '350 Poin'}
                        icon="stars"
                        accent="indigo"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari nama atau deskripsi tantangan..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: goalType,
                            onChange: setGoalType,
                            options: [
                                { label: 'Semua Kategori Sasaran', value: '' },
                                { label: 'Langkah Kaki (STEPS)', value: 'STEPS' },
                                { label: 'Nutrisi Sehat (NUTRITION)', value: 'NUTRITION' },
                                { label: 'Ritme Tidur (SLEEP)', value: 'SLEEP' },
                                { label: 'Hidrasi Air (HYDRATION)', value: 'HYDRATION' },
                            ],
                        },
                        {
                            value: status,
                            onChange: setStatus,
                            options: [
                                { label: 'Semua Status', value: '' },
                                { label: 'Diterbitkan (PUBLISHED / ACTIVE)', value: 'PUBLISHED' },
                                { label: 'Draf (DRAFT)', value: 'DRAFT' },
                                { label: 'Diarsipkan (ARCHIVED)', value: 'ARCHIVED' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (goalType ? 1 : 0) + (status ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setGoalType('');
                        setStatus('');
                    }}
                />

                {/* Switcher: Table vs Cards */}
                {viewMode === 'table' ? (
                    <Table
                        columns={columns}
                        data={challenges}
                        emptyMessage="Tidak ada tantangan gamifikasi yang ditemukan."
                        emptyIcon="emoji_events"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {challenges.data?.map((ch) => (
                            <div
                                key={ch.id}
                                className="bg-white/95 rounded-3xl p-6 border border-primary/15 hover:border-primary/35 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <AdminBadge variant="gold" size="xs">
                                                +{ch.points_reward || 100} POIN
                                            </AdminBadge>
                                            <AdminBadge variant="primary" size="xs">
                                                {ch.duration_days || 7} HARI
                                            </AdminBadge>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(ch)}
                                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                                title="Edit Tantangan"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingChallenge(ch)}
                                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                title="Hapus Tantangan"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-heading font-bold text-base text-primary tracking-tight mb-2">
                                        {ch.name}
                                    </h3>
                                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                        {ch.description || 'Tantangan konsistensi mikro untuk meningkatkan kebugaran dan metabolisme.'}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-primary/10 space-y-2 text-xs">
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
                                            Kategori Sasaran:
                                        </span>
                                        <span className="font-label-mono font-bold text-primary">{goalTypeLabels[ch.goal_type] || ch.goal_type}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-teal-600">group</span>
                                            Partisipan Aktif:
                                        </span>
                                        <span className="font-label-mono font-bold text-teal-700">{ch.participations_count || 0} Member</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Challenge Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Buat Tantangan Gamifikasi Baru"
                    subtitle="Rancang tantangan berhadiah poin untuk memicu konsistensi member."
                    icon="add_task"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsCreateOpen(false)}
                                disabled={createForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="create-challenge-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Terbitkan Tantangan
                            </Button>
                        </div>
                    }
                >
                    <form id="create-challenge-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Input
                            label="Nama Tantangan"
                            placeholder="Contoh: 10.000 Langkah Konsisten 7 Hari"
                            required
                            value={createForm.data.name}
                            onChange={(e) => createForm.setData('name', e.target.value)}
                            error={createForm.errors.name}
                        />

                        {programs.length > 0 && (
                            <Select
                                label="Tautkan dengan Program Kohor (Opsional)"
                                value={createForm.data.program_id}
                                onChange={(e) => createForm.setData('program_id', e.target.value)}
                                error={createForm.errors.program_id}
                                options={[
                                    { value: '', label: 'Tantangan Mandiri (Terbuka untuk Semua Member)' },
                                    ...programs.map((p) => ({ value: p.id, label: p.name })),
                                ]}
                            />
                        )}

                        <div className="grid grid-cols-3 gap-3">
                            <Select
                                label="Kategori Sasaran"
                                required
                                value={createForm.data.goal_type}
                                onChange={(e) => createForm.setData('goal_type', e.target.value)}
                                error={createForm.errors.goal_type}
                                options={[
                                    { value: 'STEPS', label: 'Langkah Kaki' },
                                    { value: 'NUTRITION', label: 'Nutrisi Sehat' },
                                    { value: 'SLEEP', label: 'Ritme Tidur' },
                                    { value: 'HYDRATION', label: 'Hidrasi Air' },
                                    { value: 'WORKOUT', label: 'Latihan Fisik' },
                                ]}
                            />

                            <Input
                                label="Durasi (Hari)"
                                type="number"
                                min="1"
                                max="90"
                                required
                                value={createForm.data.duration_days}
                                onChange={(e) => createForm.setData('duration_days', parseInt(e.target.value) || 1)}
                                error={createForm.errors.duration_days}
                            />

                            <Input
                                label="Hadiah Poin"
                                type="number"
                                min="0"
                                required
                                value={createForm.data.points_reward}
                                onChange={(e) => createForm.setData('points_reward', parseInt(e.target.value) || 0)}
                                error={createForm.errors.points_reward}
                            />
                        </div>

                        <Textarea
                            label="Deskripsi Tantangan & Syarat Keberhasilan"
                            placeholder="Jelaskan apa yang harus dicatat member setiap hari untuk menyelesaikan tantangan ini..."
                            value={createForm.data.description}
                            onChange={(e) => createForm.setData('description', e.target.value)}
                            error={createForm.errors.description}
                            rows={3}
                        />

                        <Select
                            label="Status Publikasi"
                            required
                            value={createForm.data.status}
                            onChange={(e) => createForm.setData('status', e.target.value)}
                            error={createForm.errors.status}
                            options={[
                                { value: 'PUBLISHED', label: 'Diterbitkan (PUBLISHED)' },
                                { value: 'DRAFT', label: 'Draf (DRAFT)' },
                                { value: 'ARCHIVED', label: 'Diarsipkan (ARCHIVED)' },
                            ]}
                        />
                    </form>
                </Modal>

                {/* Edit Challenge Modal */}
                <Modal
                    isOpen={!!editingChallenge}
                    onClose={() => setEditingChallenge(null)}
                    title={`Edit Tantangan: ${editingChallenge?.name || ''}`}
                    subtitle="Perbarui target, durasi, imbalan poin, atau status publikasi."
                    icon="edit"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingChallenge(null)}
                                disabled={editForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-challenge-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={editForm.processing}
                            >
                                Simpan Perubahan
                            </Button>
                        </div>
                    }
                >
                    <form id="edit-challenge-form" onSubmit={handleEditSubmit} className="space-y-4">
                        <Input
                            label="Nama Tantangan"
                            required
                            value={editForm.data.name}
                            onChange={(e) => editForm.setData('name', e.target.value)}
                            error={editForm.errors.name}
                        />

                        <div className="grid grid-cols-3 gap-3">
                            <Select
                                label="Kategori Sasaran"
                                required
                                value={editForm.data.goal_type}
                                onChange={(e) => editForm.setData('goal_type', e.target.value)}
                                error={editForm.errors.goal_type}
                                options={[
                                    { value: 'STEPS', label: 'Langkah Kaki' },
                                    { value: 'NUTRITION', label: 'Nutrisi Sehat' },
                                    { value: 'SLEEP', label: 'Ritme Tidur' },
                                    { value: 'HYDRATION', label: 'Hidrasi Air' },
                                    { value: 'WORKOUT', label: 'Latihan Fisik' },
                                ]}
                            />

                            <Input
                                label="Durasi (Hari)"
                                type="number"
                                min="1"
                                required
                                value={editForm.data.duration_days}
                                onChange={(e) => editForm.setData('duration_days', parseInt(e.target.value) || 1)}
                                error={editForm.errors.duration_days}
                            />

                            <Input
                                label="Hadiah Poin"
                                type="number"
                                min="0"
                                required
                                value={editForm.data.points_reward}
                                onChange={(e) => editForm.setData('points_reward', parseInt(e.target.value) || 0)}
                                error={editForm.errors.points_reward}
                            />
                        </div>

                        <Textarea
                            label="Deskripsi Tantangan"
                            value={editForm.data.description}
                            onChange={(e) => editForm.setData('description', e.target.value)}
                            error={editForm.errors.description}
                            rows={3}
                        />

                        <Select
                            label="Status Publikasi"
                            required
                            value={editForm.data.status}
                            onChange={(e) => editForm.setData('status', e.target.value)}
                            error={editForm.errors.status}
                            options={[
                                { value: 'PUBLISHED', label: 'Diterbitkan (PUBLISHED)' },
                                { value: 'DRAFT', label: 'Draf (DRAFT)' },
                                { value: 'ARCHIVED', label: 'Diarsipkan (ARCHIVED)' },
                            ]}
                        />
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingChallenge}
                    onClose={() => setDeletingChallenge(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Tantangan Gamifikasi"
                    message="Apakah Anda yakin ingin menghapus tantangan gamifikasi ini secara permanen?"
                    itemName={deletingChallenge ? deletingChallenge.name : ''}
                />
            </div>
        </AdminLayout>
    );
}
