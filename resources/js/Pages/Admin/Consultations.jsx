import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Select, Textarea, DropdownAction } from '@/Components/UI';

export default function Consultations({
    consultations = { data: [], links: [] },
    stats = {},
    instructors = [],
    members = [],
    programs = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [editingConsultation, setEditingConsultation] = useState(null);
    const [deletingConsultation, setDeletingConsultation] = useState(null);

    // Create Form
    const createForm = useForm({
        member_id: members[0]?.id || '',
        instructor_id: instructors[0]?.id || '',
        program_id: '',
        scheduled_start: '',
        scheduled_end: '',
        purpose: '',
        meeting_url: '',
        notes: '',
        status: 'SCHEDULED',
    });

    // Edit Form
    const editForm = useForm({
        scheduled_start: '',
        scheduled_end: '',
        purpose: '',
        meeting_url: '',
        notes: '',
        status: 'SCHEDULED',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/consultations',
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
        createForm.post('/admin/consultations', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const openEditModal = (consultation) => {
        setEditingConsultation(consultation);
        editForm.setData({
            scheduled_start: consultation.scheduled_start ? consultation.scheduled_start.replace(' ', 'T').substring(0, 16) : '',
            scheduled_end: consultation.scheduled_end ? consultation.scheduled_end.replace(' ', 'T').substring(0, 16) : '',
            purpose: consultation.purpose || '',
            meeting_url: consultation.meeting_url || '',
            notes: consultation.notes || '',
            status: consultation.status || 'SCHEDULED',
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingConsultation) return;
        editForm.patch(`/admin/consultations/${editingConsultation.id}`, {
            onSuccess: () => {
                setEditingConsultation(null);
                editForm.reset();
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingConsultation) return;
        router.delete(`/admin/consultations/${deletingConsultation.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingConsultation(null),
        });
    };

    const columns = [
        {
            key: 'member',
            label: 'Member Pemesan',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                        {row.member?.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.member?.name || 'Member Anonim'}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.member?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'instructor',
            label: 'Instruktur / Tenaga Ahli',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-[18px]">verified</span>
                    <span className="font-semibold text-xs text-on-surface">
                        {row.instructor?.name || 'Instruktur Ditugaskan'}
                    </span>
                </div>
            ),
        },
        {
            key: 'purpose',
            label: 'Topik / Keperluan Sesi',
            render: (row) => (
                <span className="font-medium text-xs text-on-surface-variant line-clamp-1">
                    {row.purpose || 'Konsultasi Evaluasi Gaya Hidup'}
                </span>
            ),
        },
        {
            key: 'scheduled_start',
            label: 'Jadwal Sesi',
            render: (row) => (
                <div className="font-label-mono text-xs">
                    <p className="font-bold text-on-surface">
                        {row.scheduled_start ? new Date(row.scheduled_start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                    </p>
                    <p className="text-[10px] text-on-surface-variant">
                        {row.scheduled_start ? new Date(row.scheduled_start).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''} WIB
                    </p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Sesi',
            render: (row) => (
                <AdminBadge variant={row.status === 'COMPLETED' ? 'completed' : row.status === 'SCHEDULED' ? 'active' : 'draft'} size="xs">
                    {row.status || 'SCHEDULED'}
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
                        onDetail={() => setSelectedConsultation(row)}
                        detailLabel="Lihat Detail"
                        onEdit={() => openEditModal(row)}
                        editLabel="Edit Sesi"
                        onDelete={() => setDeletingConsultation(row)}
                        deleteLabel="Hapus Sesi"
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="consultations" title="Konsultasi & Jadwal Janji Medis">
            <Head title="Tata Kelola Sesi Konsultasi - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tata Kelola Sesi Konsultasi & Jadwal Instruktur"
                    subtitle="Pengawasan reservasi telekonsultasi, alokasi waktu dokter dan dietisien berlisensi, serta catatan medis hasil evaluasi preventif."
                    icon="calendar_month"
                    badge={<AdminBadge variant="teal">Telemedicine Hub</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Jadwalkan Konsultasi Baru
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Sesi Konsultasi"
                        value={stats.totalSessions || 0}
                        icon="event_available"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Terjadwal"
                        value={stats.scheduledCount || 0}
                        icon="schedule"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Selesai Terlaksana"
                        value={stats.completedCount || 0}
                        icon="check_circle"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Dibatalkan"
                        value={stats.cancelledCount || 0}
                        icon="cancel"
                        accent="rose"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari topik sesi, nama member, atau instruktur..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: status,
                            onChange: setStatus,
                            options: [
                                { label: 'Semua Status Sesi', value: '' },
                                { label: 'Terjadwal (SCHEDULED)', value: 'SCHEDULED' },
                                { label: 'Selesai (COMPLETED)', value: 'COMPLETED' },
                                { label: 'Dibatalkan (CANCELLED)', value: 'CANCELLED' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (status ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setStatus('');
                    }}
                />

                {/* Table Component */}
                <Table
                    columns={columns}
                    data={consultations}
                    emptyMessage="Tidak ada sesi konsultasi yang cocok dengan kriteria pencarian."
                    emptyIcon="event_busy"
                    searchable={false}
                />

                {/* Create Consultation Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Jadwalkan Sesi Konsultasi Baru"
                    subtitle="Buat jadwal temu telekonsultasi langsung antara member dan instruktur."
                    icon="calendar_add_on"
                    maxWidth="lg"
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
                                form="create-consultation-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Simpan Jadwal Sesi
                            </Button>
                        </div>
                    }
                >
                    <form id="create-consultation-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Pilih Member"
                                required
                                value={createForm.data.member_id}
                                onChange={(e) => createForm.setData('member_id', e.target.value)}
                                error={createForm.errors.member_id}
                                options={members.map((m) => ({ value: m.id, label: `${m.name} (${m.email})` }))}
                            />

                            <Select
                                label="Pilih Instruktur Pengampu"
                                required
                                value={createForm.data.instructor_id}
                                onChange={(e) => createForm.setData('instructor_id', e.target.value)}
                                error={createForm.errors.instructor_id}
                                options={instructors.map((i) => ({ value: i.id, label: `${i.name} (${i.email})` }))}
                            />
                        </div>

                        {programs.length > 0 && (
                            <Select
                                label="Terkait Program Kohor (Opsional)"
                                value={createForm.data.program_id}
                                onChange={(e) => createForm.setData('program_id', e.target.value)}
                                error={createForm.errors.program_id}
                                options={[
                                    { value: '', label: 'Tanpa Program Khusus (Sesi Mandiri)' },
                                    ...programs.map((p) => ({ value: p.id, label: p.name })),
                                ]}
                            />
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Jadwal Mulai"
                                type="datetime-local"
                                required
                                value={createForm.data.scheduled_start}
                                onChange={(e) => createForm.setData('scheduled_start', e.target.value)}
                                error={createForm.errors.scheduled_start}
                            />
                            <Input
                                label="Jadwal Selesai"
                                type="datetime-local"
                                value={createForm.data.scheduled_end}
                                onChange={(e) => createForm.setData('scheduled_end', e.target.value)}
                                error={createForm.errors.scheduled_end}
                            />
                        </div>

                        <Input
                            label="Topik / Keperluan Sesi"
                            placeholder="Contoh: Evaluasi Profil Glukosa & Sirkadian 14 Hari"
                            required
                            value={createForm.data.purpose}
                            onChange={(e) => createForm.setData('purpose', e.target.value)}
                            error={createForm.errors.purpose}
                            leftIcon="help"
                        />

                        <Input
                            label="Tautan Tatap Muka Virtual (Meeting URL)"
                            placeholder="https://meet.google.com/xyz-abc"
                            value={createForm.data.meeting_url}
                            onChange={(e) => createForm.setData('meeting_url', e.target.value)}
                            error={createForm.errors.meeting_url}
                            leftIcon="videocam"
                        />

                        <Textarea
                            label="Catatan Awal / Arahan Medis"
                            placeholder="Tuliskan catatan arahan awal untuk sesi ini..."
                            value={createForm.data.notes}
                            onChange={(e) => createForm.setData('notes', e.target.value)}
                            error={createForm.errors.notes}
                            rows={3}
                        />
                    </form>
                </Modal>

                {/* Edit Consultation Modal */}
                <Modal
                    isOpen={!!editingConsultation}
                    onClose={() => setEditingConsultation(null)}
                    title={`Edit Sesi Konsultasi #${editingConsultation?.id || ''}`}
                    subtitle="Perbarui status sesi, jadwal, atau tambahkan tautan pertemuan virtual."
                    icon="edit_calendar"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingConsultation(null)}
                                disabled={editForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="edit-consultation-form"
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
                    <form id="edit-consultation-form" onSubmit={handleEditSubmit} className="space-y-4">
                        <Select
                            label="Status Sesi"
                            required
                            value={editForm.data.status}
                            onChange={(e) => editForm.setData('status', e.target.value)}
                            error={editForm.errors.status}
                            options={[
                                { value: 'SCHEDULED', label: 'Terjadwal (SCHEDULED)' },
                                { value: 'COMPLETED', label: 'Selesai Terlaksana (COMPLETED)' },
                                { value: 'CANCELLED', label: 'Dibatalkan (CANCELLED)' },
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Jadwal Mulai"
                                type="datetime-local"
                                value={editForm.data.scheduled_start}
                                onChange={(e) => editForm.setData('scheduled_start', e.target.value)}
                                error={editForm.errors.scheduled_start}
                            />
                            <Input
                                label="Jadwal Selesai"
                                type="datetime-local"
                                value={editForm.data.scheduled_end}
                                onChange={(e) => editForm.setData('scheduled_end', e.target.value)}
                                error={editForm.errors.scheduled_end}
                            />
                        </div>

                        <Input
                            label="Topik / Keperluan Sesi"
                            required
                            value={editForm.data.purpose}
                            onChange={(e) => editForm.setData('purpose', e.target.value)}
                            error={editForm.errors.purpose}
                        />

                        <Input
                            label="Tautan Tatap Muka Virtual"
                            value={editForm.data.meeting_url}
                            onChange={(e) => editForm.setData('meeting_url', e.target.value)}
                            error={editForm.errors.meeting_url}
                            leftIcon="videocam"
                        />

                        <Textarea
                            label="Catatan Klinis / Evaluasi"
                            value={editForm.data.notes}
                            onChange={(e) => editForm.setData('notes', e.target.value)}
                            error={editForm.errors.notes}
                            rows={3}
                        />
                    </form>
                </Modal>

                {/* Detail Modal */}
                <Modal
                    isOpen={!!selectedConsultation}
                    onClose={() => setSelectedConsultation(null)}
                    title={`Detail Sesi Konsultasi #${selectedConsultation?.id || ''}`}
                    subtitle="Rincian informasi janji temu telekonsultasi preventif."
                    icon="info"
                    maxWidth="md"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedConsultation(null)}
                        >
                            Tutup
                        </Button>
                    }
                >
                    {selectedConsultation && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Topik Sesi:</span>
                                <p className="text-sm font-bold text-primary mt-1">
                                    {selectedConsultation.purpose || 'Konsultasi Gaya Hidup Preventif'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Member:</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedConsultation.member?.name}</p>
                                    <p className="text-[10px] text-on-surface-variant font-label-mono">{selectedConsultation.member?.email}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Instruktur Pengampu:</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedConsultation.instructor?.name || '-'}</p>
                                    <p className="text-[10px] text-on-surface-variant font-label-mono">{selectedConsultation.instructor?.email}</p>
                                </div>
                            </div>

                            {selectedConsultation.meeting_url && (
                                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                                    <span className="font-semibold flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px] text-emerald-600">videocam</span>
                                        Tautan Tatap Muka:
                                    </span>
                                    <a
                                        href={selectedConsultation.meeting_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="font-bold text-emerald-700 underline text-[11px] inline-flex items-center gap-1"
                                    >
                                        <span>Buka Ruang Virtual</span>
                                        <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                                    </a>
                                </div>
                            )}

                            {selectedConsultation.notes && (
                                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Catatan Klinis:</span>
                                    <p className="text-xs text-on-surface leading-relaxed mt-1">{selectedConsultation.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingConsultation}
                    onClose={() => setDeletingConsultation(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Jadwal Konsultasi"
                    message="Apakah Anda yakin ingin membatalkan dan menghapus data sesi konsultasi ini dari sistem?"
                    itemName={deletingConsultation ? `Sesi #${deletingConsultation.id} (${deletingConsultation.purpose})` : ''}
                />
            </div>
        </AdminLayout>
    );
}
