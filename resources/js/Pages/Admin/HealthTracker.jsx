import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Select } from '@/Components/UI';

export default function HealthTracker({
    records = { data: [], links: [] },
    stats = {},
    members = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [metricFilter, setMetricFilter] = useState(filters.metric || '');
    const [qualityFilter, setQualityFilter] = useState(filters.quality || '');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [deletingRecord, setDeletingRecord] = useState(null);

    const createForm = useForm({
        user_id: members[0]?.id || '',
        metric_type: 'blood_glucose',
        value_numeric: '',
        value_text: '',
        unit: 'mg/dL',
        recorded_at: new Date().toISOString().substring(0, 16),
        source: 'MANUAL_ADMIN',
        quality_status: 'ACCEPTED',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/health-tracker',
                { search, metric: metricFilter, quality: qualityFilter },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, metricFilter, qualityFilter]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/health-tracker', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingRecord) return;
        router.delete(`/admin/health-tracker/${deletingRecord.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingRecord(null),
        });
    };

    const metricLabels = {
        sleep_duration: 'Durasi Tidur',
        water_intake: 'Asupan Air Minum',
        steps: 'Langkah Kaki',
        blood_glucose: 'Gula Darah Puasa',
        mood_score: 'Kesejahteraan Mental (Mood)',
        heart_rate: 'Denyut Jantung',
        blood_pressure_systolic: 'Tekanan Darah Sistolik',
        blood_pressure_diastolic: 'Tekanan Darah Diastolik',
        weight: 'Berat Badan',
        body_weight: 'Berat Badan',
        calories: 'Asupan Kalori',
        nutrition: 'Nutrisi & Makanan',
    };

    const metricIcons = {
        sleep_duration: 'bedtime',
        water_intake: 'water_drop',
        steps: 'directions_walk',
        blood_glucose: 'bloodtype',
        mood_score: 'sentiment_satisfied',
        heart_rate: 'favorite',
        blood_pressure_systolic: 'speed',
        blood_pressure_diastolic: 'speed',
        weight: 'scale',
        body_weight: 'scale',
        calories: 'restaurant',
        nutrition: 'nutrition',
    };

    const columns = [
        {
            key: 'user',
            label: 'Identitas Member',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                        {row.user?.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.user?.name || 'Member'}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'metric_type',
            label: 'Tipe Metrik',
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                        {metricIcons[row.metric_type] || 'vital_signs'}
                    </span>
                    <span className="font-semibold text-xs text-on-surface">
                        {metricLabels[row.metric_type] || (row.metric_type ? row.metric_type.replace(/_/g, ' ') : 'Biomarker')}
                    </span>
                </div>
            ),
        },
        {
            key: 'value_numeric',
            label: 'Nilai Terrekam',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-primary">
                    {row.value_numeric !== null && row.value_numeric !== undefined
                        ? `${row.value_numeric} ${row.unit || ''}`
                        : (row.value_text || '-')}
                </span>
            ),
        },
        {
            key: 'source',
            label: 'Sumber Masukan',
            render: (row) => (
                <span className="font-label-mono text-[10px] px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant uppercase">
                    {row.source || 'MANUAL'}
                </span>
            ),
        },
        {
            key: 'quality_status',
            label: 'Kualitas Data (DQS)',
            render: (row) => {
                const isAccepted = row.quality_status === 'ACCEPTED' || row.quality_status === 'VALID';
                return (
                    <AdminBadge variant={isAccepted ? 'active' : 'suspended'} size="xs">
                        {row.quality_status || 'VALID'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'recorded_at',
            label: 'Waktu Pencatatan',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.recorded_at ? new Date(row.recorded_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    }) : '-'}
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
                        leftIcon="visibility"
                        onClick={() => setSelectedRecord(row)}
                        title="Detail Metrik"
                    >
                        Detail
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant="destructive"
                        leftIcon="delete"
                        onClick={() => setDeletingRecord(row)}
                        title="Hapus Rekaman"
                    />
                </div>
            ),
        },
    ];

    const activeFilterCount = (search ? 1 : 0) + (metricFilter ? 1 : 0) + (qualityFilter ? 1 : 0);

    return (
        <AdminLayout activeNav="health-tracker" title="Log & Tata Kelola Tracker">
            <Head title="Audit Data Tracker Kesehatan - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Audit Data Tracker & Kualitas Biomarker (DQS)"
                    subtitle="Pengawasan data observasi biologis preventif (glukosa, tekanan darah, durasi tidur, langkah kaki) dan skor validitas data."
                    icon="monitoring"
                    badge={<AdminBadge variant="primary">Data Quality Standard (DQS)</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Catat Metrik Manual
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Rekaman Metrik"
                        value={stats.totalRecords || 0}
                        icon="stacked_line_chart"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Kualitas Tinggi (Valid)"
                        value={stats.highQualityCount || 0}
                        icon="verified"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Baseline Berjalan"
                        value={stats.activeBaselines || 0}
                        icon="tune"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Rerata Skor DQS"
                        value={stats.avgDqsScore || '93.2 / 100'}
                        icon="grade"
                        accent="amber"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari tipe metrik, teks catatan, atau nama member..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: metricFilter,
                            onChange: setMetricFilter,
                            options: [
                                { label: 'Semua Tipe Metrik', value: '' },
                                { label: 'Gula Darah Puasa', value: 'blood_glucose' },
                                { label: 'Durasi Tidur', value: 'sleep_duration' },
                                { label: 'Langkah Kaki', value: 'steps' },
                                { label: 'Asupan Air', value: 'water_intake' },
                                { label: 'Tekanan Darah Sistolik', value: 'blood_pressure_systolic' },
                                { label: 'Nutrisi & Makanan', value: 'nutrition' },
                            ],
                        },
                        {
                            value: qualityFilter,
                            onChange: setQualityFilter,
                            options: [
                                { label: 'Semua Status Kualitas', value: '' },
                                { label: 'Diterima (ACCEPTED / VALID)', value: 'ACCEPTED' },
                                { label: 'Mencurigakan (SUSPICIOUS)', value: 'SUSPICIOUS' },
                                { label: 'Pencilan (OUTLIER)', value: 'OUTLIER' },
                            ],
                        },
                    ]}
                    activeCount={activeFilterCount}
                    onReset={() => {
                        setSearch('');
                        setMetricFilter('');
                        setQualityFilter('');
                    }}
                />

                {/* Table Component */}
                <Table
                    columns={columns}
                    data={records}
                    emptyMessage="Tidak ada catatan metrik kesehatan yang ditemukan."
                    emptyIcon="vital_signs"
                />

                {/* Create Health Record Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Catat Rekaman Metrik Kesehatan Manual"
                    subtitle="Masukkan entri biomarker medis resmi untuk salah satu member."
                    icon="add_circle"
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
                                form="create-metric-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Simpan Rekaman
                            </Button>
                        </div>
                    }
                >
                    <form id="create-metric-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Select
                            label="Pilih Member"
                            required
                            value={createForm.data.user_id}
                            onChange={(e) => createForm.setData('user_id', e.target.value)}
                            error={createForm.errors.user_id}
                            options={members.map((m) => ({ value: m.id, label: `${m.name} (${m.email})` }))}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Tipe Metrik"
                                required
                                value={createForm.data.metric_type}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    let unit = '';
                                    if (val === 'blood_glucose') unit = 'mg/dL';
                                    else if (val === 'sleep_duration') unit = 'jam';
                                    else if (val === 'steps') unit = 'langkah';
                                    else if (val === 'water_intake') unit = 'ml';
                                    else if (val.includes('pressure')) unit = 'mmHg';
                                    createForm.setData({
                                        ...createForm.data,
                                        metric_type: val,
                                        unit: unit || createForm.data.unit,
                                    });
                                }}
                                error={createForm.errors.metric_type}
                                options={[
                                    { value: 'blood_glucose', label: 'Gula Darah Puasa' },
                                    { value: 'sleep_duration', label: 'Durasi Tidur' },
                                    { value: 'steps', label: 'Langkah Kaki' },
                                    { value: 'water_intake', label: 'Asupan Air Minum' },
                                    { value: 'heart_rate', label: 'Denyut Jantung' },
                                    { value: 'blood_pressure_systolic', label: 'Tekanan Darah Sistolik' },
                                    { value: 'blood_pressure_diastolic', label: 'Tekanan Darah Diastolik' },
                                    { value: 'nutrition', label: 'Nutrisi' },
                                ]}
                            />

                            <Input
                                label="Satuan Unit"
                                required
                                value={createForm.data.unit}
                                onChange={(e) => createForm.setData('unit', e.target.value)}
                                error={createForm.errors.unit}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Nilai Numerik"
                                type="number"
                                step="any"
                                placeholder="Contoh: 95"
                                value={createForm.data.value_numeric}
                                onChange={(e) => createForm.setData('value_numeric', e.target.value)}
                                error={createForm.errors.value_numeric}
                            />

                            <Input
                                label="Keterangan / Nilai Teks"
                                placeholder="Contoh: Normal puasa 10 jam"
                                value={createForm.data.value_text}
                                onChange={(e) => createForm.setData('value_text', e.target.value)}
                                error={createForm.errors.value_text}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Waktu Pengukuran"
                                type="datetime-local"
                                required
                                value={createForm.data.recorded_at}
                                onChange={(e) => createForm.setData('recorded_at', e.target.value)}
                                error={createForm.errors.recorded_at}
                            />

                            <Select
                                label="Kualifikasi Data DQS"
                                value={createForm.data.quality_status}
                                onChange={(e) => createForm.setData('quality_status', e.target.value)}
                                error={createForm.errors.quality_status}
                                options={[
                                    { value: 'ACCEPTED', label: 'Diterima (ACCEPTED)' },
                                    { value: 'VALID', label: 'Valid Standar (VALID)' },
                                    { value: 'SUSPICIOUS', label: 'Mencurigakan (SUSPICIOUS)' },
                                    { value: 'OUTLIER', label: 'Pencilan Ekstrem (OUTLIER)' },
                                ]}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Detail Modal */}
                <Modal
                    isOpen={!!selectedRecord}
                    onClose={() => setSelectedRecord(null)}
                    title="Detail Catatan Metrik Kesehatan"
                    subtitle={`Member: ${selectedRecord?.user?.name || 'Member'}`}
                    icon="vital_signs"
                    maxWidth="md"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedRecord(null)}
                        >
                            Tutup
                        </Button>
                    }
                >
                    {selectedRecord && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Biomarker Terrekam:</span>
                                <p className="text-sm font-bold text-primary mt-1">
                                    {metricLabels[selectedRecord.metric_type] || selectedRecord.metric_type} :{' '}
                                    <span className="font-label-mono">
                                        {selectedRecord.value_numeric !== null ? `${selectedRecord.value_numeric} ${selectedRecord.unit || ''}` : selectedRecord.value_text}
                                    </span>
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Sumber Pengambilan:</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedRecord.source || 'MANUAL'}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Status DQS:</span>
                                    <p className="font-bold text-xs text-emerald-700 mt-0.5">{selectedRecord.quality_status || 'VALID'}</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Waktu Rekam Resmi:</span>
                                <p className="text-xs text-on-surface font-label-mono mt-0.5">
                                    {selectedRecord.recorded_at ? new Date(selectedRecord.recorded_at).toLocaleString('id-ID') : '-'}
                                </p>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingRecord}
                    onClose={() => setDeletingRecord(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Catatan Metrik"
                    message="Apakah Anda yakin ingin menghapus catatan data kesehatan ini?"
                    itemName={deletingRecord ? `${deletingRecord.metric_type}: ${deletingRecord.value_numeric || deletingRecord.value_text}` : ''}
                />
            </div>
        </AdminLayout>
    );
}
