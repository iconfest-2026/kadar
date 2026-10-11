import React, { useState, useEffect, useRef } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Select, DropdownAction } from '@/Components/UI';

export default function Scanner({
    records = { data: [], links: [] },
    stats = {},
    members = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [deletingRecord, setDeletingRecord] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const isFirstRender = useRef(true);

    const createForm = useForm({
        user_id: members[0]?.id || '',
        item_name: '',
        metric_type: 'nutrition',
        value_numeric: '',
        unit: 'kkal',
        sugar_grams: '',
        bpom_number: '',
        quality_status: 'QUALIFIED',
        confidence_score: 0.98,
    });

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/scanner',
                { search, type },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, type]);

    const handleCreateScan = (e) => {
        e.preventDefault();
        createForm.post('/admin/scanner', {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset({
                    user_id: members[0]?.id || '',
                    item_name: '',
                    metric_type: 'nutrition',
                    value_numeric: '',
                    unit: 'kkal',
                    sugar_grams: '',
                    bpom_number: '',
                    quality_status: 'QUALIFIED',
                    confidence_score: 0.98,
                });
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingRecord) return;
        router.delete(`/admin/scanner/${deletingRecord.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingRecord(null),
        });
    };

    const columns = [
        {
            key: 'target_name',
            label: 'Objek / Produk Terdeteksi',
            render: (row) => {
                const label = row.value_text || row.metadata?.item_name || row.metadata?.food_name || row.metric_type || 'Pemindaian Nutrisi';
                const userName = row.user?.name || 'Member Pengguna';
                const isMed = (row.metric_type === 'medication' || row.metadata?.category === 'medication');

                return (
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                            isMed ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' : 'bg-primary/10 border-primary/20 text-primary'
                        }`}>
                            <span className="material-symbols-outlined text-[20px]">
                                {isMed ? 'medication' : 'nutrition'}
                            </span>
                        </div>
                        <div>
                            <p className="font-bold text-on-surface text-xs line-clamp-1">{label}</p>
                            <span className="text-[10px] font-label-mono text-on-surface-variant">
                                Pengguna: {userName}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'scan_type',
            label: 'Kategori Scan',
            render: (row) => {
                const isMed = row.metric_type === 'medication';
                return (
                    <AdminBadge variant={isMed ? 'attention' : 'active'} size="xs">
                        {isMed ? 'Label Obat' : 'Label Gizi & Makanan'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'details',
            label: 'Ekstraksi Nilai Kunci',
            render: (row) => {
                const num = row.value_numeric !== null && row.value_numeric !== undefined ? Number(row.value_numeric) : null;
                const val = num !== null ? `${num} ${row.unit || ''}` : (row.metadata?.calories ? `${row.metadata.calories} kkal` : (row.value_text || '-'));
                return (
                    <span className="font-label-mono text-xs font-semibold text-primary">
                        {val}
                    </span>
                );
            },
        },
        {
            key: 'ocr_accuracy',
            label: 'Akurasi OCR AI',
            render: (row) => {
                const score = row.confidence_score !== null && row.confidence_score !== undefined ? Number(row.confidence_score) : null;
                const acc = score !== null ? `${Math.round(score * 100)}%` : (row.metadata?.ocr_accuracy ? `${row.metadata.ocr_accuracy}%` : '98.5%');
                const lat = row.metadata?.latency_ms || 380;
                return (
                    <div className="flex items-center gap-1.5 font-label-mono text-xs">
                        <span className="font-bold text-on-surface">{acc}</span>
                        <span className="text-[10px] text-on-surface-variant">({lat}ms)</span>
                    </div>
                );
            },
        },
        {
            key: 'status',
            label: 'Kualifikasi Data',
            render: (row) => {
                const stat = row.quality_status || 'QUALIFIED';
                const isWarning = stat.includes('WARNING') || stat === 'SUSPICIOUS' || stat === 'OUTLIER';
                return (
                    <AdminBadge variant={isWarning ? 'attention' : 'active'} size="xs">
                        {stat}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onDetail={() => setSelectedRecord(row)}
                        detailLabel="Lihat Detail Scan"
                        onDelete={() => setDeletingRecord(row)}
                        deleteLabel="Hapus Rekaman Scan"
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="scanner" title="Audit Scanner OCR AI">
            <Head title="Audit Pemindai Kamera OCR AI - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Pemindai Kamera OCR & Analitik Nutrisi AI"
                    subtitle="Pengawasan log pemindaian kemasan makanan, minuman, dan obat-obatan secara real-time melalui Gemini 2.5 Flash Vision dan On-Device OCR."
                    icon="qr_code_scanner"
                    badge={<AdminBadge variant="active">Live Vision AI Engine</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add_a_photo"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Simulasi Pindaian Baru
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Pemindaian"
                        value={stats.totalScans ?? 0}
                        icon="document_scanner"
                        accent="primary"
                        subtitle="Akumulasi log pindaian"
                    />
                    <AdminStatCard
                        title="Scan Hari Ini"
                        value={stats.todayScans ?? 0}
                        icon="today"
                        accent="teal"
                        subtitle="Aktivitas harian member"
                    />
                    <AdminStatCard
                        title="Rerata Akurasi OCR"
                        value={stats.avgAccuracy || '0%'}
                        icon="verified"
                        accent="emerald"
                        subtitle="Gemini Vision + On-Device OCR"
                    />
                    <AdminStatCard
                        title="Rerata Latensi Respon"
                        value={stats.avgLatency || '-'}
                        icon="speed"
                        accent="indigo"
                        subtitle="Pemrosesan multimodal"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari nama produk, pengguna, atau kategori..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: type,
                            onChange: setType,
                            options: [
                                { label: 'Semua Kategori', value: '' },
                                { label: 'Nutrisi & Makanan', value: 'nutrition' },
                                { label: 'Obat & Farmasi', value: 'medication' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (type ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setType('');
                    }}
                />

                {/* Data Table */}
                <Table
                    columns={columns}
                    data={records}
                    emptyMessage="Tidak ada data pemindaian OCR yang ditemukan."
                    emptyIcon="document_scanner"
                    searchable={false}
                />

                {/* Detail Inspection Modal */}
                <Modal
                    isOpen={Boolean(selectedRecord)}
                    onClose={() => setSelectedRecord(null)}
                    title="Inspeksi Hasil Pemindaian OCR AI"
                    subtitle={`Pengguna: ${selectedRecord?.user?.name || 'Member'}`}
                    icon="document_scanner"
                    maxWidth="md"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedRecord(null)}
                        >
                            Tutup Detail
                        </Button>
                    }
                >
                    {selectedRecord && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <h4 className="font-bold text-xs text-on-surface mb-2 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-primary text-[18px]">info</span>
                                    <span>Identitas Produk Terpindai:</span>
                                </h4>
                                <p className="text-sm font-bold text-primary">
                                    {selectedRecord.value_text || selectedRecord.metadata?.item_name || selectedRecord.metric_type}
                                </p>
                                <p className="text-[11px] text-on-surface-variant font-label-mono mt-1">
                                    Waktu Scan: {selectedRecord.recorded_at ? new Date(selectedRecord.recorded_at).toLocaleString('id-ID') : '-'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Kategori Metrik:</span>
                                    <p className="font-bold text-on-surface mt-0.5">{selectedRecord.metric_type || 'nutrition'}</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Sumber Masukan:</span>
                                    <p className="font-bold text-primary mt-0.5">{selectedRecord.source || 'SCANNER'}</p>
                                </div>
                            </div>

                            {selectedRecord.metadata && (
                                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/10 space-y-2">
                                    <h5 className="font-bold text-xs text-on-surface">Payload Metadata Analisis:</h5>
                                    <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-label-mono text-[11px] overflow-x-auto max-h-40">
                                        {typeof selectedRecord.metadata === 'string'
                                            ? selectedRecord.metadata
                                            : JSON.stringify(selectedRecord.metadata, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                {/* Create / Simulate Scan Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Simulasi Hasil Pemindaian Kamera OCR"
                    subtitle="Tambahkan rekaman hasil pindaian nutrisi makanan atau label obat ke basis data rekam medis."
                    icon="add_a_photo"
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
                                form="create-scan-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Simpan Rekaman Scan
                            </Button>
                        </div>
                    }
                >
                    <form id="create-scan-form" onSubmit={handleCreateScan} className="space-y-4 text-xs">
                        <Select
                            label="Target Member"
                            required
                            value={createForm.data.user_id}
                            onChange={(e) => createForm.setData('user_id', e.target.value)}
                            options={members.map((m) => ({ label: `${m.name} (${m.email})`, value: m.id }))}
                            error={createForm.errors.user_id}
                        />

                        <Input
                            label="Nama Produk / Makanan / Obat"
                            placeholder="Contoh: Susu Kedelai Rendah Gula 250ml"
                            required
                            value={createForm.data.item_name}
                            onChange={(e) => createForm.setData('item_name', e.target.value)}
                            error={createForm.errors.item_name}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Select
                                label="Kategori Metrik"
                                required
                                value={createForm.data.metric_type}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    createForm.setData((prev) => ({
                                        ...prev,
                                        metric_type: val,
                                        unit: val === 'medication' ? 'tablet' : 'kkal',
                                    }));
                                }}
                                options={[
                                    { label: 'Nutrisi & Makanan', value: 'nutrition' },
                                    { label: 'Obat & Farmasi', value: 'medication' },
                                ]}
                                error={createForm.errors.metric_type}
                            />

                            <Input
                                label={createForm.data.metric_type === 'medication' ? 'Dosis / Jumlah' : 'Kalori (kkal)'}
                                type="number"
                                step="any"
                                required
                                value={createForm.data.value_numeric}
                                onChange={(e) => createForm.setData('value_numeric', e.target.value)}
                                error={createForm.errors.value_numeric}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Satuan (Unit)"
                                placeholder="Contoh: kkal, tablet, mg"
                                required
                                value={createForm.data.unit}
                                onChange={(e) => createForm.setData('unit', e.target.value)}
                                error={createForm.errors.unit}
                            />

                            <Input
                                label="Kandungan Gula (gram)"
                                type="number"
                                step="0.1"
                                placeholder="Contoh: 4.5"
                                value={createForm.data.sugar_grams}
                                onChange={(e) => createForm.setData('sugar_grams', e.target.value)}
                                error={createForm.errors.sugar_grams}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Nomor Izin BPOM (Opsional)"
                                placeholder="Contoh: BPOM RI MD 203810001001"
                                value={createForm.data.bpom_number}
                                onChange={(e) => createForm.setData('bpom_number', e.target.value)}
                                error={createForm.errors.bpom_number}
                            />

                            <Select
                                label="Status Kualifikasi OCR"
                                value={createForm.data.quality_status}
                                onChange={(e) => createForm.setData('quality_status', e.target.value)}
                                options={[
                                    { label: 'Memenuhi Syarat (QUALIFIED)', value: 'QUALIFIED' },
                                    { label: 'Peringatan Gula Tinggi (WARNING_ISSUED)', value: 'WARNING_ISSUED' },
                                    { label: 'Perlu Tinjauan Klinis (REQUIRES_REVIEW)', value: 'REQUIRES_REVIEW' },
                                ]}
                                error={createForm.errors.quality_status}
                            />
                        </div>
                    </form>
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={Boolean(deletingRecord)}
                    onClose={() => setDeletingRecord(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Rekaman Scan"
                    message="Apakah Anda yakin ingin menghapus data hasil pemindaian ini secara permanen?"
                    itemName={deletingRecord ? (deletingRecord.value_text || deletingRecord.metadata?.item_name || `Scan #${deletingRecord.id}`) : ''}
                />
            </div>
        </AdminLayout>
    );
}
