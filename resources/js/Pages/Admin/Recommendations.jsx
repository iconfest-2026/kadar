import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function Recommendations({ insights = { data: [], links: [] }, signals = [], stats = {} }) {
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
                <AdminBadge variant={row.status === 'ACTIVE' ? 'active' : 'draft'}>
                    {row.status || 'AKTIF'}
                </AdminBadge>
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

    const severityMap = {
        ATTENTION: 'Perlu Perhatian',
        CRITICAL: 'Kritis',
        NOTICE: 'Pemberitahuan',
        FOLLOW_UP: 'Tindak Lanjut',
        INFO: 'Informasi',
        STABLE: 'Stabil',
    };

    const signalColumns = [
        {
            key: 'signal_type',
            label: 'Tipe Sinyal Anomali',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px]">warning</span>
                    <span className="font-bold text-xs text-on-surface">{row.signal_type}</span>
                    <span className="font-bold text-xs text-on-surface">
                        {signalMap[row.signal_type] || (row.signal_type ? row.signal_type.replace(/_/g, ' ') : 'Anomali Perilaku')}
                    </span>
                </div>
            ),
        },
        {
            key: 'severity',
            label: 'Tingkat Urgensi',
            render: (row) => (
                <AdminBadge variant={row.severity.toLowerCase()}>
                    {row.severity}
                <AdminBadge variant={row.severity?.toLowerCase() === 'attention' ? 'attention' : row.severity?.toLowerCase() === 'critical' ? 'suspended' : 'active'}>
                    {severityMap[row.severity] || row.severity || 'Normal'}
                </AdminBadge>
            ),
        },
        {
            key: 'user',
            label: 'Target Member',
            render: (row) => (
                <span className="text-xs font-medium text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'created_at',
            label: 'Terdeteksi',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {new Date(row.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </span>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="recommendations" title="Rekomendasi & HBE Engine">
            <Head title="Rekomendasi & HBE Engine — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Health Behavior Engine (HBE) & Rekomendasi Personal"
                    subtitle="Pengawasan otomatisasi inferensi wawasan gaya hidup, kualifikasi sinyal anomali deviasi biologis, dan rekomendasi mikro-kebiasaan berbasis profil personal."
                    icon="psychology"
                    badge={<AdminBadge variant="amber">HBE Algorithm v2.4</AdminBadge>}
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Wawasan Perilaku Aktif"
                        value={stats.activeInsights || 0}
                        icon="lightbulb"
                        accent="primary"
                        subtitle="Insight terbit ke pengguna"
                    />
                    <AdminStatCard
                        title="Sinyal Deviasi Terkualifikasi"
                        value={stats.pendingSignals || 0}
                        icon="sensors"
                        accent="amber"
                        subtitle="Anomali ritme kebiasaan"
                    />
                    <AdminStatCard
                        title="Rasio Adopsi Rekomendasi"
                        value={stats.acceptanceRate || '78.2%'}
                        icon="task_alt"
                        accent="emerald"
                        subtitle="Komitmen mikro yang diaktifkan"
                    />
                    <AdminStatCard
                        title="Aturan Heuristik Aktif"
                        value={stats.activeRules || 14}
                        icon="rule"
                        accent="indigo"
                        subtitle="Rule engine evaluasi baseline"
                    />
                </div>

                {/* Sinyal Anomali Terkini */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-[20px]">sensors</span>
                            <span>Sinyal Anomali Perilaku Terbaru (Signal Stream)</span>
                        </h3>
                    </div>
                    <AdminDataTable
                        columns={signalColumns}
                        data={signals}
                        emptyMessage="Tidak ada sinyal anomali deviasi saat ini."
                    />
                </div>

                {/* Data Table Insights */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">insights</span>
                            <span>Daftar Wawasan Kebiasaan Diterbitkan (Behavior Insights)</span>
                        </h3>
                    </div>
                    <AdminDataTable
                        columns={insightColumns}
                        data={insights}
                        emptyMessage="Belum ada wawasan kebiasaan yang diterbitkan."
                    />
                </div>
            </div>
        </AdminLayout>
    );
}

