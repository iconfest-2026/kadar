import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Tabs, TabsList, TabsTrigger, TabsContent, Input, Textarea, Select } from '@/Components/UI';

export default function Recommendations({
    insights = { data: [], links: [] },
    signals = [],
    stats = {},
    members = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [activeTab, setActiveTab] = useState('insights');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [selectedSignal, setSelectedSignal] = useState(null);
    const [deletingInsight, setDeletingInsight] = useState(null);

    const createForm = useForm({
        user_id: members[0]?.id || '',
        title: '',
        observation: '',
        context: 'Evaluasi preventif gaya hidup & kepatuhan nutrisi',
        why_it_matters: '',
        action_title: '',
        action_type: 'DIET',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/recommendations', {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/recommendations',
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

    const toggleInsight = (insight) => {
        router.patch(`/admin/recommendations/${insight.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingInsight) return;
        router.delete(`/admin/recommendations/${deletingInsight.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingInsight(null),
        });
    };

    const insightColumns = [
        {
            key: 'user',
            label: 'Member Penerima',
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
            key: 'title',
            label: 'Judul Wawasan Perilaku',
            render: (row) => (
                <div>
                    <p className="font-bold text-xs text-on-surface">{row.title}</p>
                    <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">{row.observation}</p>
                </div>
            ),
        },
        {
            key: 'metric_diff',
            label: 'Deviasi Baseline vs Terkini',
            render: (row) => (
                <div className="font-label-mono text-xs">
                    <span className="text-on-surface-variant">Base: {row.baseline_value || '-'}</span> →{' '}
                    <span className="text-primary font-bold">Kini: {row.current_value || '-'}</span>
                    <span className="text-rose-600 font-bold ml-1.5">({row.difference_value || '0%'})</span>
                </div>
            ),
        },
        {
            key: 'recommendations_count',
            label: 'Rekomendasi Mikro',
            render: (row) => (
                <span className="font-label-mono font-semibold text-xs text-primary">
                    {row.recommendations?.length || 0} opsi aksi
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status Wawasan',
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
                <div className="flex items-center justify-end gap-1.5">
                    <Button
                        type="button"
                        size="xs"
                        variant="outline"
                        leftIcon="visibility"
                        onClick={() => setSelectedInsight(row)}
                        title="Detail Wawasan"
                    >
                        Detail
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant={row.status === 'ACTIVE' ? 'secondary' : 'success'}
                        leftIcon={row.status === 'ACTIVE' ? 'archive' : 'unarchive'}
                        onClick={() => toggleInsight(row)}
                        title={row.status === 'ACTIVE' ? 'Arsipkan' : 'Aktifkan'}
                    >
                        {row.status === 'ACTIVE' ? 'Tutup' : 'Buka'}
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant="destructive"
                        leftIcon="delete"
                        onClick={() => setDeletingInsight(row)}
                        title="Hapus Wawasan"
                    />
                </div>
            ),
        },
    ];

    const signalMap = {
        SLEEP_DEFICIT: 'Defisit Durasi Tidur',
        GLUCOSE_SPIKE: 'Lonjakan Glukosa Postprandial',
        HYDRATION_LOW: 'Asupan Cairan Kurang',
        SEDENTARY_STREAK: 'Kurang Aktivitas Fisik',
        GLYCEMIC_VARIABILITY_HIGH: 'Variabilitas Glikemik Tinggi',
        LATE_NIGHT_MEAL: 'Pola Makan Larut Malam',
        VITALITY_DROP: 'Penurunan Indikator Vitalitas',
    };

    const signalColumns = [
        {
            key: 'signal_type',
            label: 'Tipe Sinyal Anomali',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
                    <span className="font-bold text-xs text-on-surface">
                        {signalMap[row.signal_type] || (row.signal_type ? row.signal_type.replace(/_/g, ' ') : 'Anomali Perilaku')}
                    </span>
                </div>
            ),
        },
        {
            key: 'user',
            label: 'Member Terdeteksi',
            render: (row) => (
                <span className="font-bold text-xs text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'severity',
            label: 'Tingkat Keparahan',
            render: (row) => {
                const isCrit = row.severity === 'CRITICAL' || row.severity === 'ATTENTION';
                return (
                    <AdminBadge variant={isCrit ? 'emergency' : 'active'} size="xs">
                        {row.severity || 'INFO'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'detected_at',
            label: 'Waktu Deteksi HBE',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.detected_at ? new Date(row.detected_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Inspeksi',
            align: 'right',
            render: (row) => (
                <Button
                    type="button"
                    size="xs"
                    variant="outline"
                    leftIcon="visibility"
                    onClick={() => setSelectedSignal(row)}
                >
                    Lihat Sinyal
                </Button>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="recommendations" title="Health Behavior Engine (HBE)">
            <Head title="Health Behavior Engine & Rekomendasi — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Health Behavior Engine & Rekomendasi Personal"
                    subtitle="Pusat inferensi perilaku otomatis non-diagnostik: deteksi sinyal deviasi dari baseline 14-hari, penurunan rekomendasi mikro bertahap, dan evaluasi kepatuhan."
                    icon="psychology"
                    badge={<AdminBadge variant="primary">Automated HBE Engine</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="add"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Kirim Rekomendasi Baru
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Wawasan Aktif"
                        value={stats.activeInsights || 0}
                        icon="lightbulb"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Sinyal Perlu Tindak Lanjut"
                        value={stats.pendingSignals || 0}
                        icon="notification_important"
                        accent="rose"
                    />
                    <AdminStatCard
                        title="Rasio Diterima Member"
                        value={stats.acceptanceRate || '81.4%'}
                        icon="thumb_up"
                        accent="emerald"
                    />
                    <AdminStatCard
                        title="Aturan Mesin Aktif"
                        value={stats.activeRules || 16}
                        icon="rule"
                        accent="indigo"
                    />
                </div>

                {/* Tabs Component */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="insights">Wawasan Perilaku ({insights.total || insights.data?.length || 0})</TabsTrigger>
                        <TabsTrigger value="signals">Sinyal Anomali Terdeteksi ({signals.length || 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="insights" className="space-y-4 pt-2">
                        {/* Filter Bar */}
                        <AdminFilterBar
                            searchPlaceholder="Cari judul wawasan atau nama member..."
                            searchValue={search}
                            onSearchChange={setSearch}
                            filters={[
                                {
                                    value: status,
                                    onChange: setStatus,
                                    options: [
                                        { label: 'Semua Status', value: '' },
                                        { label: 'Aktif (ACTIVE)', value: 'ACTIVE' },
                                        { label: 'Ditutup (DISMISSED)', value: 'DISMISSED' },
                                    ],
                                },
                            ]}
                            activeCount={(search ? 1 : 0) + (status ? 1 : 0)}
                            onReset={() => {
                                setSearch('');
                                setStatus('');
                            }}
                        />

                        {/* Insights Table */}
                        <Table
                            columns={insightColumns}
                            data={insights}
                            emptyMessage="Tidak ada wawasan perilaku aktif yang ditemukan."
                            emptyIcon="psychology"
                        />
                    </TabsContent>

                    <TabsContent value="signals" className="pt-2">
                        {/* Signals Table */}
                        <Table
                            columns={signalColumns}
                            data={signals}
                            emptyMessage="Belum ada sinyal anomali perilaku yang terdeteksi."
                            emptyIcon="notifications_none"
                        />
                    </TabsContent>
                </Tabs>

                {/* Insight Detail Modal */}
                <Modal
                    isOpen={!!selectedInsight}
                    onClose={() => setSelectedInsight(null)}
                    title={`Detail Wawasan: "${selectedInsight?.title || ''}"`}
                    subtitle={`Penerima: ${selectedInsight?.user?.name || 'Member'}`}
                    icon="lightbulb"
                    maxWidth="lg"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedInsight(null)}
                        >
                            Tutup
                        </Button>
                    }
                >
                    {selectedInsight && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Hasil Observasi:</span>
                                <p className="text-xs text-on-surface leading-relaxed mt-1">{selectedInsight.observation}</p>
                            </div>

                            {selectedInsight.why_it_matters && (
                                <div className="p-4 rounded-2xl bg-white border border-primary/10">
                                    <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Mengapa Penting (Secara Preventif):</span>
                                    <p className="text-xs text-on-surface leading-relaxed mt-1">{selectedInsight.why_it_matters}</p>
                                </div>
                            )}

                            {selectedInsight.recommendations && selectedInsight.recommendations.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="font-bold text-xs text-on-surface">Pilihan Aksi Mikro Rekomendasi:</h4>
                                    <div className="space-y-2">
                                        {selectedInsight.recommendations.map((rec) => (
                                            <div key={rec.id} className="p-3 rounded-2xl bg-surface-container-lowest border border-primary/15 flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-xs text-primary">{rec.title || rec.action_text}</p>
                                                    <p className="text-[11px] text-on-surface-variant">{rec.description}</p>
                                                </div>
                                                <AdminBadge variant={rec.status === 'ACCEPTED' ? 'active' : 'draft'} size="xs">
                                                    {rec.status || 'TERSEDIA'}
                                                </AdminBadge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                {/* Signal Detail Modal */}
                <Modal
                    isOpen={!!selectedSignal}
                    onClose={() => setSelectedSignal(null)}
                    title={`Detail Sinyal: ${signalMap[selectedSignal?.signal_type] || selectedSignal?.signal_type}`}
                    subtitle={`Member: ${selectedSignal?.user?.name || 'Member'}`}
                    icon="warning"
                    maxWidth="md"
                    footer={
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            onClick={() => setSelectedSignal(null)}
                        >
                            Tutup
                        </Button>
                    }
                >
                    {selectedSignal && (
                        <div className="space-y-3">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Tipe Sinyal Anomali:</span>
                                <p className="font-bold text-sm text-primary mt-0.5">{selectedSignal.signal_type}</p>
                                <p className="text-xs text-on-surface-variant mt-1">Tingkat Keparahan: <strong>{selectedSignal.severity}</strong></p>
                            </div>

                            <div className="p-3 rounded-2xl bg-white border border-primary/10">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Waktu Deteksi:</span>
                                <p className="text-xs text-on-surface font-label-mono mt-0.5">
                                    {selectedSignal.detected_at ? new Date(selectedSignal.detected_at).toLocaleString('id-ID') : '-'}
                                </p>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingInsight}
                    onClose={() => setDeletingInsight(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Wawasan Perilaku"
                    message="Apakah Anda yakin ingin menghapus wawasan perilaku ini beserta seluruh opsi rekomendasi terkait?"
                    itemName={deletingInsight ? deletingInsight.title : ''}
                />

                {/* Create Recommendation Modal (CREATE) */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Kirim Rekomendasi & Wawasan Baru (CREATE)"
                    subtitle="Buat catatan wawasan klinis dan opsi tindakan perbaikan preventif untuk member."
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
                                form="create-recommendation-form"
                                variant="primary"
                                size="sm"
                                leftIcon="send"
                                loading={createForm.processing}
                            >
                                Kirim Rekomendasi
                            </Button>
                        </div>
                    }
                >
                    <form id="create-recommendation-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Select
                            label="Pilih Member Penerima"
                            required
                            value={createForm.data.user_id}
                            onChange={(e) => createForm.setData('user_id', e.target.value)}
                            error={createForm.errors.user_id}
                            options={members.map((m) => ({ value: m.id, label: `${m.name} (${m.email})` }))}
                        />

                        <Input
                            label="Judul Wawasan Perilaku"
                            placeholder="Contoh: Evaluasi Kepatuhan Serat & Glikemik Malam"
                            required
                            value={createForm.data.title}
                            onChange={(e) => createForm.setData('title', e.target.value)}
                            error={createForm.errors.title}
                        />

                        <Textarea
                            label="Observasi Klinis / Temuan Pola"
                            placeholder="Jelaskan anomali atau pola data yang terdeteksi..."
                            required
                            value={createForm.data.observation}
                            onChange={(e) => createForm.setData('observation', e.target.value)}
                            error={createForm.errors.observation}
                            rows={2}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Input
                                label="Tindakan Rekomendasi"
                                placeholder="Contoh: Minum 2 gelas air sebelum tidur"
                                value={createForm.data.action_title}
                                onChange={(e) => createForm.setData('action_title', e.target.value)}
                                error={createForm.errors.action_title}
                            />

                            <Select
                                label="Kategori Tindakan"
                                value={createForm.data.action_type}
                                onChange={(e) => createForm.setData('action_type', e.target.value)}
                                error={createForm.errors.action_type}
                                options={[
                                    { value: 'DIET', label: 'Nutrisi & Gizi' },
                                    { value: 'SLEEP', label: 'Tidur & Pemulihan' },
                                    { value: 'PHYSICAL_ACTIVITY', label: 'Aktivitas Fisik' },
                                    { value: 'HYDRATION', label: 'Hidrasi' },
                                    { value: 'MEDICATION', label: 'Pengobatan & Kepatuhan' },
                                ]}
                            />
                        </div>

                        <Textarea
                            label="Mengapa Ini Penting (Alasan Klinis)"
                            placeholder="Penjelasan preventif agar member memahami dampaknya terhadap glukosa..."
                            value={createForm.data.why_it_matters}
                            onChange={(e) => createForm.setData('why_it_matters', e.target.value)}
                            error={createForm.errors.why_it_matters}
                            rows={2}
                        />
                    </form>
                </Modal>
            </div>
        </AdminLayout>
    );
}
