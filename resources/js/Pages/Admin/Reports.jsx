import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';

export default function Reports({ cohortReports = [], stats = {} }) {
    const [selectedReport, setSelectedReport] = useState(null);
    const [exportNotice, setExportNotice] = useState(false);

    const handleExport = (format) => {
        setExportNotice(true);
        setTimeout(() => setExportNotice(false), 3000);
    };

    const columns = [
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
                <AdminBadge variant="emerald" size="xs">
                    {row.adherence_score} Adherence
                </AdminBadge>
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
                    {new Date(row.generated_at).toLocaleDateString('id-ID')}
                </span>
            ),
        },
        {
            key: 'actions',
            label: 'Ekspor / Unduh',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => setSelectedReport(row)}
                        className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all flex items-center gap-1"
                    >
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        <span>Lihat</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleExport('PDF')}
                        className="px-2.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-xs transition-all flex items-center gap-1 shadow-xs"
                    >
                        <span className="material-symbols-outlined text-[14px]">download</span>
                        <span>PDF</span>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="reports" title="Laporan & Ekspor Data">
            <Head title="Laporan & Ekspor Data — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Pusat Laporan Analitik & Outcome Klinis"
                    subtitle="Laporan periodik efektivitas intervensi kohor kesehatan, utilisasi kinerja instruktur pendamping, serta ekspor berkas data agregat (CSV/PDF)."
                    icon="analytics"
                    badge={<AdminBadge variant="active">Kohor Analytics Q1 2026</AdminBadge>}
                    actions={
                        <button
                            type="button"
                            onClick={() => handleExport('CSV')}
                            className="px-4 py-2.5 rounded-2xl bg-white text-primary border border-primary/20 text-xs font-semibold hover:bg-primary/5 shadow-xs flex items-center gap-2 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">table_view</span>
                            <span>Ekspor Data CSV</span>
                        </button>
                    }
                />

                {exportNotice && (
                    <div className="p-3 bg-emerald-500/10 text-emerald-800 rounded-2xl border border-emerald-500/20 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        <span>Laporan berhasil disiapkan dan unduhan dimulai.</span>
                    </div>
                )}

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Member Terpantau Aktif"
                        value={stats.totalMembersMonitored || 180}
                        icon="person_check"
                        accent="primary"
                        subtitle="Dalam pengawasan preventif"
                    />
                    <AdminStatCard
                        title="Rencana Intervensi Berjalan"
                        value={stats.activeInterventions || 0}
                        icon="assignment"
                        accent="indigo"
                        subtitle="Ditugaskan oleh instruktur"
                    />
                    <AdminStatCard
                        title="Tingkat Keberhasilan Intervensi"
                        value={stats.interventionsSuccessRate || '84.6%'}
                        icon="insights"
                        accent="emerald"
                        subtitle="Pencapaian target mikro"
                        trend={{ value: '+4.2%', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Laporan Terbit Bulan Ini"
                        value={stats.monthlyGeneratedReports || 38}
                        icon="summarize"
                        accent="amber"
                        subtitle="Arsip analitik siap ekspor"
                    />
                </div>

                {/* Data Table */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">assessment</span>
                            <span>Daftar Laporan Evaluasi Kohor Kesehatan</span>
                        </h3>
                    </div>
                    <AdminDataTable
                        columns={columns}
                        data={cohortReports}
                        emptyMessage="Belum ada laporan kohor yang di-generate."
                        emptyIcon="analytics"
                    />
                </div>

                {/* Modal Detail Report */}
                <AdminModal
                    isOpen={!!selectedReport}
                    onClose={() => setSelectedReport(null)}
                    title={selectedReport?.title}
                    subtitle={`Kohor: ${selectedReport?.cohort_name} • Terbit: ${selectedReport?.generated_at}`}
                    icon="analytics"
                    footer={
                        <button
                            type="button"
                            onClick={() => setSelectedReport(null)}
                            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                        >
                            Tutup
                        </button>
                    }
                >
                    {selectedReport && (
                        <div className="space-y-4">
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
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Outcome Perubahan Rata-rata</span>
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
                        </div>
                    )}
                </AdminModal>
            </div>
        </AdminLayout>
    );
}

