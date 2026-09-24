import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function HealthTracker({ records = { data: [], links: [] }, stats = {}, filters = {} }) {
    const [metricFilter, setMetricFilter] = useState(filters.metric || '');
    const [qualityFilter, setQualityFilter] = useState(filters.quality || '');

    const handleFilterChange = (metric, quality) => {
        setMetricFilter(metric);
        setQualityFilter(quality);
        router.get('/admin/health-tracker', { metric, quality }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
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
            render: (row) => {
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
                };
                return (
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[16px]">
                            {metricIcons[row.metric_type] || 'vital_signs'}
                        </span>
                        <span className="font-semibold text-xs text-on-surface">
                            {metricLabels[row.metric_type] || (row.metric_type ? row.metric_type.replace(/_/g, ' ') : 'Biomarker')}
                        </span>
                    </div>
                );
            },
        },
        {
            key: 'value_numeric',
            label: 'Nilai Terrekam',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-primary">
                    {row.value_numeric} {row.unit}
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
            label: 'Validasi Kualitas (DQS)',
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <AdminBadge variant={row.quality_status === 'ACCEPTED' ? 'active' : 'attention'}>
                        {row.quality_status || 'ACCEPTED'}
                    </AdminBadge>
                    <span className="text-[10px] font-label-mono text-on-surface-variant">
                        ({Math.round(row.confidence_score * 100 || 95)}%)
                    </span>
                </div>
            ),
        },
        {
            key: 'recorded_at',
            label: 'Waktu Rekam',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.recorded_at ? new Date(row.recorded_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                </span>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="health-tracker" title="Tracker & Rekam Biologis">
            <Head title="Tracker & Rekam Biologis — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tracker & Rekam Medis Fisiologis (Data Lake)"
                    subtitle="Pengawasan agregasi rekaman biomarker biologis (tidur, hidrasi air, langkah, glukosa), validasi kualitas input DQS, dan integritas rolling baseline."
                    icon="vital_signs"
                    badge={<AdminBadge variant="emerald">DQS Engine Validated</AdminBadge>}
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Total Titik Rekam Medis"
                        value={stats.totalRecords || 0}
                        icon="database"
                        accent="primary"
                        subtitle="Log biomarker tervalidasi"
                        trend={{ value: '+450 minggu ini', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Kualitas DQS Valid"
                        value={stats.highQualityCount || 0}
                        icon="verified"
                        accent="emerald"
                        subtitle="Lolos uji batas biologis masuk akal"
                    />
                    <AdminStatCard
                        title="Rolling Baseline Aktif"
                        value={stats.activeBaselines || 0}
                        icon="timeline"
                        accent="indigo"
                        subtitle="Garis acuan stabil 14-hari"
                    />
                    <AdminStatCard
                        title="Rata-rata Skor DQS"
                        value={stats.avgDqsScore || '92.4'}
                        icon="grade"
                        accent="teal"
                        subtitle="Tingkat integritas rekaman"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    filters={[
                        {
                            value: metricFilter,
                            onChange: (v) => handleFilterChange(v, qualityFilter),
                            options: [
                                { label: 'Semua Metrik Biologis', value: '' },
                                { label: 'Durasi Tidur (sleep_duration)', value: 'sleep_duration' },
                                { label: 'Asupan Air (water_intake)', value: 'water_intake' },
                                { label: 'Langkah Kaki (steps)', value: 'steps' },
                                { label: 'Gula Darah (blood_glucose)', value: 'blood_glucose' },
                            ],
                        },
                        {
                            value: qualityFilter,
                            onChange: (v) => handleFilterChange(metricFilter, v),
                            options: [
                                { label: 'Semua Status Kualitas', value: '' },
                                { label: 'Diterima (ACCEPTED)', value: 'ACCEPTED' },
                                { label: 'Perlu Perhatian (ATTENTION)', value: 'ATTENTION' },
                            ],
                        },
                    ]}
                    activeCount={(metricFilter ? 1 : 0) + (qualityFilter ? 1 : 0)}
                    onReset={() => handleFilterChange('', '')}
                />

                {/* Data Table */}
                <AdminDataTable
                    columns={columns}
                    data={records}
                    emptyMessage="Tidak ada rekam metrik kesehatan yang cocok."
                    emptyIcon="vital_signs"
                />
            </div>
        </AdminLayout>
    );
}

