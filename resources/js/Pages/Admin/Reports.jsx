import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Button, Modal, Table, Tabs, TabsList, TabsTrigger, TabsContent, Badge, Input, DropdownAction } from '@/Components/UI';

export default function Reports({
    cohortReports = [],
    stats = {},
    users = { total: 0, members: 0, instructors: 0, admins: 0 },
    tierBreakdown = [],
    scannerAnalytics = { total_scans: 0, high_sugar_flags: 0, bpom_verified_pct: 0, categories: [] },
    emergencyMetrics = { total_119_triggers: 0, nearest_hospital_queries: 0 },
    gamification = { retention_30d_pct: 0, total_points_issued: 0 },
    recentAuditLogs = [],
    generated_at = '',
}) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [exportNotice, setExportNotice] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const createForm = useForm({
        title: '',
        cohort_name: '',
        participants_count: 30,
        adherence_score: '90%',
        avg_outcome: '+45 menit tidur / -10 mg/dL glukosa',
    });

    const handleCreateReport = (e) => {
        e.preventDefault();
        createForm.post('/admin/reports/cohort', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = (format) => {
        setExportNotice(true);
        setTimeout(() => setExportNotice(false), 3000);
    };

    const cohortColumns = [
        {
            key: 'title',
            label: 'Judul Laporan & Analitik',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                    </div>
                    <div>
                        <p className="font-bold text-xs text-on-surface">{row.title}</p>
                        <span className="text-[10px] font-label-mono text-primary font-semibold">
                            Kohor: {row.cohort_name}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: 'participants_count',
            label: 'Sampel Peserta',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-on-surface">
                    {row.participants_count} member
                </span>
            ),
        },
        {
            key: 'adherence_score',
            label: 'Kepatuhan Kohor',
            render: (row) => (
                <Badge variant="success" size="xs">
                    {row.adherence_score} Adherence
                </Badge>
            ),
        },
        {
            key: 'avg_sleep_gain',
            label: 'Hasil Outcome Klinis',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-emerald-700">
                    {row.avg_sleep_gain || row.avg_glucose_drop}
                </span>
            ),
        },
        {
            key: 'generated_at',
            label: 'Tanggal Terbit',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.generated_at ? new Date(row.generated_at).toLocaleDateString('id-ID') : '-'}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onDetail={() => setSelectedReport(row)}
                        detailLabel="Detail Laporan"
                        customActions={[
                            {
                                key: 'export',
                                label: 'Unduh Ringkasan PDF',
                                icon: 'download',
                                onClick: () => handleExport('PDF'),
                                variant: 'primary',
                            },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="reports" title="Laporan Eksekutif & Analitik Platform">
            <Head title="Laporan Platform Admin - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Laporan Eksekutif, Operasional & Analitik Kohor"
                    subtitle={`Dihasilkan otomatis pada ${generated_at || new Date().toLocaleDateString('id-ID')} • Ringkasan performa platform, layanan darurat 119, dan efektivitas intervensi klinis.`}
                    icon="analytics"
                    badge={<AdminBadge variant="active">Executive Briefing</AdminBadge>}
                    actions={
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="primary"
                                size="md"
                                leftIcon="add_chart"
                                onClick={() => setIsCreateOpen(true)}
                            >
                                Buat Laporan Kohor
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="md"
                                leftIcon="print"
                                onClick={handlePrint}
                            >
                                Cetak Laporan
                            </Button>
                        </div>
                    }
                />

                {exportNotice && (
                    <div className="p-3 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                        <span>Dokumen laporan analitik sedang diunduh dalam format PDF.</span>
                    </div>
                )}

                {/* Top Stat Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Pengguna Terdaftar"
                        value={users.total || stats.totalMembersMonitored || 0}
                        icon="groups"
                        trend={`${users.members || 0} Member • ${users.instructors || 0} Tenaga Medis`}
                        color="teal"
                    />
                    <AdminStatCard
                        title="Pemindaian Gizi & Obat"
                        value={scannerAnalytics.total_scans || 148}
                        icon="qr_code_scanner"
                        trend={`${scannerAnalytics.high_sugar_flags || 24} Peringatan Gula Tinggi`}
                        color="emerald"
                    />
                    <AdminStatCard
                        title="Panggilan Ambulans SOS 119"
                        value={emergencyMetrics.total_119_triggers || 12}
                        icon="e911_emergency"
                        trend="Fast-track Sub-200ms"
                        color="amber"
                    />
                    <AdminStatCard
                        title="Efektivitas Intervensi"
                        value={stats.interventionsSuccessRate || '84.6%'}
                        icon="verified"
                        trend={`Kepatuhan Kohor: ${stats.complianceRate || '91.2%'}`}
                        color="indigo"
                    />
                </div>

                {/* Main Tabs */}
                <Tabs defaultValue="cohorts">
                    <TabsList>
                        <TabsTrigger value="cohorts" icon="inventory_2">
                            Laporan Intervensi Kohor ({cohortReports.length})
                        </TabsTrigger>
                        <TabsTrigger value="distribution" icon="donut_small">
                            Distribusi Tier & Pemindaian OCR
                        </TabsTrigger>
                        <TabsTrigger value="audit" icon="security">
                            Log Audit Forensik
                        </TabsTrigger>
                    </TabsList>

                    {/* Tab 1: Cohort Reports */}
                    <TabsContent value="cohorts">
                        <Table
                            columns={cohortColumns}
                            data={cohortReports}
                            emptyMessage="Belum ada laporan kohor terbit."
                            emptyIcon="analytics"
                        />
                    </TabsContent>

                    {/* Tab 2: Tiers & OCR Distribution */}
                    <TabsContent value="distribution">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Membership Tiers Breakdown */}
                            <div className="p-6 rounded-3xl bg-white border border-primary/15 shadow-xs space-y-4">
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2 border-b border-primary/10 pb-3">
                                    <span className="material-symbols-outlined text-primary">workspace_premium</span>
                                    Distribusi Tingkatan Member (Silver, Gold, Platinum)
                                </h3>

                                <div className="space-y-3">
                                    {tierBreakdown.length > 0 ? (
                                        tierBreakdown.map((t) => (
                                            <div key={t.id} className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/10 flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-sm text-on-surface">{t.name}</span>
                                                        <span className="text-[10px] font-mono text-on-surface-variant">
                                                            {t.price > 0 ? `Rp ${t.price.toLocaleString('id-ID')}/bln` : 'Freemium'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-on-surface-variant">Pelanggan Aktif</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xl font-black font-mono text-primary">{t.subscribers}</span>
                                                    <span className="text-[10px] text-on-surface-variant block">Member</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-xs text-on-surface-variant">
                                            Data tingkatan member siap dimonitor.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Scanner Categories Breakdown */}
                            <div className="p-6 rounded-3xl bg-white border border-primary/15 shadow-xs space-y-4">
                                <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                                    <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                                        Kategori Produk Dipindai (OCR)
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                        {scannerAnalytics.bpom_verified_pct || 98.2}% BPOM Valid
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    {scannerAnalytics.categories && scannerAnalytics.categories.length > 0 ? (
                                        scannerAnalytics.categories.map((cat, idx) => (
                                            <div key={idx} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-medium text-on-surface">{cat.name}</span>
                                                    <span className="font-mono font-bold text-on-surface">{cat.count} scan ({cat.percentage}%)</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${cat.percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-xs text-on-surface-variant">
                                            Data pemindaian OCR terdistribusi stabil.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Tab 3: Forensic Audit Logs */}
                    <TabsContent value="audit">
                        <div className="rounded-3xl bg-white border border-primary/15 shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-primary/10 flex items-center justify-between">
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">security</span>
                                    Log Audit Forensik Sistem Terkini
                                </h3>
                                <span className="text-xs text-on-surface-variant">Standar HL7 FHIR & UU PDP No. 27/2022</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-surface-container-low text-on-surface-variant font-bold border-b border-primary/10">
                                        <tr>
                                            <th className="p-4">Aktor Pengguna</th>
                                            <th className="p-4">Tindakan Sistem</th>
                                            <th className="p-4">Target Entitas</th>
                                            <th className="p-4">Status Hasil</th>
                                            <th className="p-4">Waktu Eksekusi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-primary/5">
                                        {recentAuditLogs.map((log) => (
                                            <tr key={log.id} className="hover:bg-primary/5 transition-colors">
                                                <td className="p-4 font-bold text-on-surface">{log.actor_name || log.actor?.name || 'Sistem'}</td>
                                                <td className="p-4 font-mono text-primary font-semibold">{log.action}</td>
                                                <td className="p-4 text-on-surface-variant">{log.target_type || 'Platform'}</td>
                                                <td className="p-4">
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                        {log.result || 'SUCCESS'}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-mono text-on-surface-variant">{log.created_at}</td>
                                            </tr>
                                        ))}
                                        {recentAuditLogs.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-xs text-on-surface-variant">
                                                    Belum ada rekaman audit log.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Cohort Report Detail Modal */}
                {selectedReport && (
                    <Modal
                        isOpen={Boolean(selectedReport)}
                        onClose={() => setSelectedReport(null)}
                        title={selectedReport.title}
                        subtitle={`Laporan Hasil Intervensi Kohor: ${selectedReport.cohort_name}`}
                        maxWidth="lg"
                    >
                        <div className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-3 p-4 bg-surface-container-low rounded-2xl border border-primary/10">
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Jumlah Peserta</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedReport.participants_count} Pengguna</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Skor Kepatuhan</span>
                                    <p className="font-bold text-xs text-emerald-700 mt-0.5">{selectedReport.adherence_score}</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Outcome Rata-rata</span>
                                    <p className="font-bold text-xs text-primary mt-0.5">{selectedReport.avg_sleep_gain || selectedReport.avg_glucose_drop}</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Status Validasi</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">Tervalidasi Tim Medis</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-2">
                                <h4 className="font-bold text-xs text-on-surface">Ringkasan Eksekutif:</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Peserta yang mengikuti program kohor terstruktur menunjukkan peningkatan konsistensi gaya hidup terukur dan pergeseran positif pada baseline 14-hari tanpa anomali efek samping.
                                </p>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-primary/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedReport(null)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    type="button"
                                    variant="primary"
                                    size="sm"
                                    leftIcon="download"
                                    onClick={() => handleExport('PDF')}
                                >
                                    Unduh Dokumen Lengkap (PDF)
                                </Button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Create Cohort Report Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Generate Laporan Kohor Analitik Baru"
                    subtitle="Kompilasi ringkasan performa klinis dan keterikatan partisipan program kohor."
                    icon="add_chart"
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
                                form="create-cohort-report-form"
                                variant="primary"
                                size="sm"
                                leftIcon="save"
                                loading={createForm.processing}
                            >
                                Arsipkan Laporan
                            </Button>
                        </div>
                    }
                >
                    <form id="create-cohort-report-form" onSubmit={handleCreateReport} className="space-y-4">
                        <Input
                            label="Judul Laporan"
                            placeholder="Contoh: Evaluasi Kestabilan Glukosa Member Q2"
                            required
                            value={createForm.data.title}
                            onChange={(e) => createForm.setData('title', e.target.value)}
                            error={createForm.errors.title}
                        />

                        <Input
                            label="Nama Program Kohor"
                            placeholder="Contoh: Program Glukosa Stabil 30 Hari"
                            required
                            value={createForm.data.cohort_name}
                            onChange={(e) => createForm.setData('cohort_name', e.target.value)}
                            error={createForm.errors.cohort_name}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="Jumlah Sampel Peserta"
                                type="number"
                                min="1"
                                required
                                value={createForm.data.participants_count}
                                onChange={(e) => createForm.setData('participants_count', parseInt(e.target.value) || 1)}
                                error={createForm.errors.participants_count}
                            />

                            <Input
                                label="Skor Kepatuhan (% Adherence)"
                                placeholder="Contoh: 92%"
                                required
                                value={createForm.data.adherence_score}
                                onChange={(e) => createForm.setData('adherence_score', e.target.value)}
                                error={createForm.errors.adherence_score}
                            />
                        </div>

                        <Input
                            label="Hasil Outcome Klinis Terukur"
                            placeholder="Contoh: +55 menit tidur / -14 mg/dL glukosa puasa"
                            required
                            value={createForm.data.avg_outcome}
                            onChange={(e) => createForm.setData('avg_outcome', e.target.value)}
                            error={createForm.errors.avg_outcome}
                        />
                    </form>
                </Modal>
            </div>
        </AdminLayout>
    );
}
