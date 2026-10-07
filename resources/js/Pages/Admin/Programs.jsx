import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select, DropdownAction } from '@/Components/UI';

export default function Programs({
    programs = { data: [], links: [] },
    stats = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [deletingProgram, setDeletingProgram] = useState(null);

    // Create Form
    const createForm = useForm({
        name: '',
        description: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    // Edit Form
    const editForm = useForm({
        name: '',
        description: '',
        status: 'PUBLISHED',
        starts_at: '',
        ends_at: '',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/programs',
                { search, status },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, status]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/programs', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (prog) => {
        setEditingProgram(prog);
        editForm.setData({
            name: prog.name || '',
            description: prog.description || '',
            status: prog.status || 'PUBLISHED',
            starts_at: prog.starts_at ? prog.starts_at.split('T')[0] : '',
            ends_at: prog.ends_at ? prog.ends_at.split('T')[0] : '',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingProgram) return;
        editForm.patch(`/admin/programs/${editingProgram.id}`, {
            onSuccess: () => {
                setEditingProgram(null);
                editForm.reset();
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingProgram) return;
        router.delete(`/admin/programs/${deletingProgram.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingProgram(null),
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Nama Program Kohor',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs sm:text-sm line-clamp-1">{row.name}</p>
                        <p className="text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">{row.description || 'Program pembiasaan terstruktur'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Program',
            render: (row) => (
                <AdminBadge variant={row.status === 'PUBLISHED' ? 'published' : 'draft'} size="xs">
                    {row.status || 'DRAFT'}
                </AdminBadge>
            ),
        },
        {
            key: 'period',
            label: 'Periode Berjalan',
            render: (row) => (
                <div className="font-label-mono text-xs text-on-surface-variant">
                    {row.starts_at ? (
                        <span>
                            {new Date(row.starts_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} s/d{' '}
                            {row.ends_at ? new Date(row.ends_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Seterusnya'}
                        </span>
                    ) : (
                        <span>Fleksibel (Kapan Saja)</span>
                    )}
                </div>
            ),
        },
        {
            key: 'members_count',
            label: 'Peserta',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-teal-700">
                    {row.members_count || 0} Member
                </span>
            ),
        },
        {
            key: 'instructors_count',
            label: 'Instruktur',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-indigo-700">
                    {row.instructors_count || 0} Dokter/Dietisien
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onEdit={() => openEditModal(row)}
                        editLabel="Edit Program"
                        onDelete={() => setDeletingProgram(row)}
                        deleteLabel="Hapus Program"
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="programs" title="Program Kohor Kesehatan">
            <Head title="Program Kohor Kesehatan - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Kurikulum & Program Kohor Kesehatan"
                    subtitle="Kelola program pembiasaan gaya hidup terstruktur (7/14/21/30 hari), alokasi tim instruktur pengampu, dan kuota kohor peserta."
                    icon="inventory_2"
                    badge={<AdminBadge variant="indigo">Structured Cohorts</AdminBadge>}
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
                                Buat Program Baru
                            </Button>
                        </div>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Program"
                        value={stats.totalPrograms || 0}
                        icon="inventory_2"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Diterbitkan (Aktif)"
                        value={stats.publishedPrograms || 0}
                        icon="check_circle"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Draf (Dalam Review)"
                        value={stats.draftPrograms || 0}
                        icon="edit_note"
                        accent="amber"
                    />
                    <AdminStatCard
                        title="Diarsipkan"
                        value={stats.archivedPrograms || 0}
                        icon="archive"
                        accent="slate"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari nama atau deskripsi program kohor..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: status,
                            onChange: setStatus,
                            options: [
                                { label: 'Semua Status Program', value: '' },
                                { label: 'Diterbitkan (PUBLISHED)', value: 'PUBLISHED' },
                                { label: 'Draf (DRAFT)', value: 'DRAFT' },
                                { label: 'Diarsipkan (ARCHIVED)', value: 'ARCHIVED' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (status ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setStatus('');
                    }}
                />

                {/* View Switcher: Table vs Cards */}
                {viewMode === 'table' ? (
                    <Table
                        columns={columns}
                        data={programs}
                        emptyMessage="Tidak ada program kohor kesehatan yang ditemukan."
                        emptyIcon="inventory_2"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {programs.data?.map((prog) => (
                            <div
                                key={prog.id}
                                className="bg-white/95 rounded-3xl p-6 border border-primary/15 hover:border-primary/35 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <AdminBadge variant={prog.status === 'PUBLISHED' ? 'published' : 'draft'} size="xs">
                                            {prog.status || 'PUBLISHED'}
                                        </AdminBadge>
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(prog)}
                                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                                                title="Edit Program"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeletingProgram(prog)}
                                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                                title="Hapus Program"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="font-heading font-bold text-base text-primary tracking-tight mb-2">
                                        {prog.name}
                                    </h3>
                                    <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                                        {prog.description || 'Program pembiasaan pola hidup preventif terarah.'}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-primary/10 space-y-2 text-xs">
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-teal-600">group</span>
                                            Peserta Kohor:
                                        </span>
                                        <span className="font-label-mono font-bold text-teal-700">{prog.members_count || 0} Member</span>
                                    </div>
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-indigo-600">medical_services</span>
                                            Instruktur:
                                        </span>
                                        <span className="font-label-mono font-bold text-indigo-700">{prog.instructors_count || 0} Tenaga Ahli</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Program Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Buat Program Kohor Baru"
                    subtitle="Susun kurikulum kohor intervensi preventif untuk member AEVYRA."
                    icon="add_box"
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
                                form="create-program-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Terbitkan Program
                            </Button>
                        </div>
                    }
                >
                    <form id="create-program-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Input
                            label="Nama Program"
                            placeholder="Contoh: Program Restorasi Tidur 21 Hari"
                            required
                            value={createForm.data.name}
                            onChange={(e) => createForm.setData('name', e.target.value)}
                            error={createForm.errors.name}
                        />

                        <Textarea
                            label="Deskripsi & Sasaran Intervensi"
                            placeholder="Jelaskan tujuan kohor, modul harian, dan metrik biomarker yang ditargetkan..."
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
                                { value: 'DRAFT', label: 'Draf Konsep (DRAFT)' },
                                { value: 'ARCHIVED', label: 'Diarsipkan (ARCHIVED)' },
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Tanggal Mulai (Opsional)"
                                type="date"
                                value={createForm.data.starts_at}
                                onChange={(e) => createForm.setData('starts_at', e.target.value)}
                                error={createForm.errors.starts_at}
                            />
                            <Input
                                label="Tanggal Selesai (Opsional)"
                                type="date"
                                value={createForm.data.ends_at}
                                onChange={(e) => createForm.setData('ends_at', e.target.value)}
                                error={createForm.errors.ends_at}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Edit Program Modal */}
                <Modal
                    isOpen={!!editingProgram}
                    onClose={() => setEditingProgram(null)}
                    title={`Edit Program: ${editingProgram?.name || ''}`}
                    subtitle="Perbarui kurikulum, status publikasi, atau periode program kohor."
                    icon="edit"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingProgram(null)}
                                disabled={editForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-program-form"
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
                    <form id="edit-program-form" onSubmit={handleEditSubmit} className="space-y-4">
                        <Input
                            label="Nama Program"
                            required
                            value={editForm.data.name}
                            onChange={(e) => editForm.setData('name', e.target.value)}
                            error={editForm.errors.name}
                        />

                        <Textarea
                            label="Deskripsi & Sasaran Intervensi"
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
                                { value: 'DRAFT', label: 'Draf Konsep (DRAFT)' },
                                { value: 'ARCHIVED', label: 'Diarsipkan (ARCHIVED)' },
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Tanggal Mulai"
                                type="date"
                                value={editForm.data.starts_at}
                                onChange={(e) => editForm.setData('starts_at', e.target.value)}
                                error={editForm.errors.starts_at}
                            />
                            <Input
                                label="Tanggal Selesai"
                                type="date"
                                value={editForm.data.ends_at}
                                onChange={(e) => editForm.setData('ends_at', e.target.value)}
                                error={editForm.errors.ends_at}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingProgram}
                    onClose={() => setDeletingProgram(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Program Kohor"
                    message="Apakah Anda yakin ingin menghapus program kohor kesehatan ini secara permanen dari basis data?"
                    itemName={deletingProgram ? deletingProgram.name : ''}
                />
            </div>
        </AdminLayout>
    );
}
