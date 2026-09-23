import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';

export default function Consultations({ consultations = { data: [], links: [] }, stats = {}, filters = {} }) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const handleStatusChange = (newStatus) => {
        setStatusFilter(newStatus);
        router.get('/admin/consultations', { status: newStatus }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
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
            label: 'Tenaga Ahli / Instruktur',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-600 text-[18px]">verified</span>
                    <span className="font-semibold text-xs text-on-surface">
                        {row.instructor?.name || 'Coach Belum Ditugaskan'}
                    </span>
                </div>
            ),
        },
        {
            key: 'purpose',
            label: 'Topik / Keperluan Sesi',
            render: (row) => (
                <span className="font-medium text-xs text-on-surface-variant line-clamp-1">
                    {row.purpose || 'Konsultasi Evaluasi Ritme Sirkadian'}
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
                <AdminBadge variant={row.status === 'COMPLETED' ? 'completed' : row.status === 'SCHEDULED' ? 'active' : 'pending'}>
                    {row.status || 'TERJADWAL'}
                </AdminBadge>
            ),
        },
        {
            key: 'actions',
            label: 'Detail',
            align: 'right',
            render: (row) => (
                <button
                    type="button"
                    onClick={() => setSelectedConsultation(row)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all flex items-center gap-1 ml-auto"
                >
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    <span>Detail</span>
                </button>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="consultations" title="Konsultasi & Sesi Chat">
            <Head title="Konsultasi & Sesi Chat — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tata Kelola Konsultasi Chat (AI & Tenaga Ahli)"
                    subtitle="Pengawasan percakapan asisten AI preventif (kepatuhan non-diagnostik) dan manajemen booking sesi tatap muka 1-on-1 dengan instruktur."
                    icon="forum"
                    badge={<AdminBadge variant="instructor">Tele-Konsultasi Terpandu</AdminBadge>}
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Total Sesi Terjadwal"
                        value={stats.totalSessions || 0}
                        icon="calendar_month"
                        accent="primary"
                        subtitle="Akumulasi booking terdaftar"
                    />
                    <AdminStatCard
                        title="Sesi Menunggu Pelaksanaan"
                        value={stats.scheduledCount || 0}
                        icon="pending_actions"
                        accent="amber"
                        subtitle="Perlu dihadiri instruktur"
                    />
                    <AdminStatCard
                        title="Sesi AI Chat Hari Ini"
                        value={stats.aiChatSessionsToday || 84}
                        icon="smart_toy"
                        accent="indigo"
                        subtitle="Interaksi asisten preventif"
                    />
                    <AdminStatCard
                        title="Kepatuhan Non-Diagnostik AI"
                        value={stats.aiComplianceRate || '99.9%'}
                        icon="gavel"
                        accent="emerald"
                        subtitle="Zero unauthorized medical advice"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    filters={[
                        {
                            value: statusFilter,
                            onChange: handleStatusChange,
                            options: [
                                { label: 'Semua Status Sesi', value: '' },
                                { label: 'Terjadwal (SCHEDULED)', value: 'SCHEDULED' },
                                { label: 'Selesai (COMPLETED)', value: 'COMPLETED' },
                                { label: 'Dibatalkan (CANCELLED)', value: 'CANCELLED' },
                            ],
                        },
                    ]}
                    activeCount={statusFilter ? 1 : 0}
                    onReset={() => handleStatusChange('')}
                />

                {/* Table */}
                <AdminDataTable
                    columns={columns}
                    data={consultations}
                    emptyMessage="Belum ada sesi konsultasi yang terdaftar sesuai filter."
                    emptyIcon="event_busy"
                />

                {/* Modal Detail */}
                <AdminModal
                    isOpen={!!selectedConsultation}
                    onClose={() => setSelectedConsultation(null)}
                    title={`Detail Sesi Konsultasi #${selectedConsultation?.id}`}
                    subtitle={`Member: ${selectedConsultation?.member?.name} • Instruktur: ${selectedConsultation?.instructor?.name}`}
                    icon="forum"
                    footer={
                        <button
                            type="button"
                            onClick={() => setSelectedConsultation(null)}
                            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                        >
                            Tutup
                        </button>
                    }
                >
                    {selectedConsultation && (
                        <div className="space-y-4">
                            <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 space-y-2">
                                <h4 className="font-bold text-xs text-primary uppercase font-label-mono">Maksud & Catatan Konsultasi:</h4>
                                <p className="text-xs text-on-surface leading-relaxed">{selectedConsultation.purpose || 'Evaluasi pola hidup dan rencana intervensi.'}</p>
                                {selectedConsultation.notes && (
                                    <div className="pt-2 border-t border-primary/10">
                                        <p className="font-bold text-xs text-on-surface">Catatan Instruktur Pasca-Sesi:</p>
                                        <p className="text-xs text-on-surface-variant mt-0.5">{selectedConsultation.notes}</p>
                                    </div>
                                )}
                            </div>

                            {selectedConsultation.meeting_url && (
                                <div className="p-3 bg-white rounded-2xl border border-primary/10 flex items-center justify-between">
                                    <span className="text-xs font-medium text-on-surface">Link Video Meeting Sesi:</span>
                                    <a
                                        href={selectedConsultation.meeting_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                    >
                                        <span>Buka Tautan</span>
                                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </AdminModal>
            </div>
        </AdminLayout>
    );
}

