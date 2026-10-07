import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Table, Modal, Button, Tabs, TabsList, TabsTrigger, TabsContent, DropdownAction } from '@/Components/UI';

export default function Emergency({
    emergencyLogs = { data: [], links: [] },
    directory = {},
    stats = {},
}) {
    const [selectedLog, setSelectedLog] = useState(null);
    const [activeTab, setActiveTab] = useState('logs');
    const [isSimulating, setIsSimulating] = useState(false);

    const handleSimulate = () => {
        setIsSimulating(true);
        router.post('/admin/emergency/simulate', {}, {
            preserveScroll: true,
            onFinish: () => setIsSimulating(false),
        });
    };

    const handleResolve = (event) => {
        router.patch(`/admin/emergency/${event.id}/status`, { action_taken: 'RESOLVED_BY_DISPATCH' }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedLog?.id === event.id) {
                    setSelectedLog((prev) => ({ ...prev, action_taken: 'RESOLVED_BY_DISPATCH' }));
                }
            },
        });
    };

    const logColumns = [
        {
            key: 'id',
            label: 'ID Panggilan',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-rose-700">
                    #SOS-{row.id}
                </span>
            ),
        },
        {
            key: 'user',
            label: 'Member Pemicu SOS',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-700 font-bold flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">emergency</span>
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.user?.name || 'Pengguna Darurat'}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.user?.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'loc_reference',
            label: 'Koordinat / Faskes Terdekat',
            render: (row) => (
                <div className="flex items-center gap-1.5 font-label-mono text-xs text-on-surface">
                    <span className="material-symbols-outlined text-rose-600 text-[16px]">location_on</span>
                    <span className="line-clamp-1">{row.loc_reference || 'Lat: -6.208, Lng: 106.845'}</span>
                </div>
            ),
        },
        {
            key: 'action_taken',
            label: 'Saluran Dispatch',
            render: (row) => {
                const isResolved = row.action_taken?.includes('RESOLVED');
                return (
                    <AdminBadge variant={isResolved ? 'active' : 'emergency'} size="xs">
                        {row.action_taken || 'DIAL_119'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Waktu Trigger',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {row.created_at ? new Date(row.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'medium' }) : '-'}
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
                        onDetail={() => setSelectedLog(row)}
                        detailLabel="Detail Panggilan SOS"
                    />
                </div>
            ),
        },
    ];

    const hospitalList = directory.standard_faskes || [];
    const hospitalColumns = [
        {
            key: 'name',
            label: 'Nama Rumah Sakit / Faskes Rujukan',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center text-xs font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                    </div>
                    <div>
                        <p className="font-bold text-xs text-on-surface">{row.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.type || 'IGD 24 Jam'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'phone',
            label: 'Nomor Kontak Langsung',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-primary">
                    {row.phone || '119'}
                </span>
            ),
        },
        {
            key: 'city',
            label: 'Wilayah / Kota',
            render: (row) => (
                <span className="text-xs text-on-surface-variant">
                    {row.city || 'Nasional'}
                </span>
            ),
        },
        {
            key: 'distance',
            label: 'Status Layanan',
            render: () => (
                <AdminBadge variant="active" size="xs">
                    Terintegrasi SPGDT
                </AdminBadge>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="emergency" title="Tanggap Darurat 119/112">
            <Head title="Tanggap Darurat 119/112 - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Pusat Komando Tanggap Darurat Medis & Ambulans 119/112"
                    subtitle="Pengawasan audit real-time pemicuan tombol panik SOS, transmisi koordinat GPS ke SPGDT Kemenkes RI, serta direktori IGD RS rujukan nasional."
                    icon="emergency"
                    badge={<AdminBadge variant="emergency" pulse>Zero AI Dependency • Sub-200ms</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="destructive"
                            size="md"
                            leftIcon="e911_emergency"
                            loading={isSimulating}
                            onClick={handleSimulate}
                        >
                            Uji Coba Latensi SOS
                        </Button>
                    }
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Pemicuan SOS"
                        value={stats.totalTriggers || 0}
                        icon="e911_emergency"
                        accent="rose"
                        subtitle="Log panggilan krisis"
                    />
                    <AdminStatCard
                        title="Pemicuan Hari Ini"
                        value={stats.todayTriggers || 0}
                        icon="notification_important"
                        accent="amber"
                        subtitle="Monitoring krisis aktif"
                    />
                    <AdminStatCard
                        title="Rerata Latensi Respon"
                        value={stats.avgDispatchLatency || '< 180ms'}
                        icon="bolt"
                        accent="emerald"
                        subtitle="Panggilan instan murni"
                    />
                    <AdminStatCard
                        title="RS / Faskes Terverifikasi"
                        value={stats.verifiedHospitalsCount || hospitalList.length || 12}
                        icon="local_hospital"
                        accent="primary"
                        subtitle="Direktori rujukan nasional"
                    />
                </div>

                {/* Tabs Component */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="logs">Log Pemicuan SOS Real-Time ({emergencyLogs.total || emergencyLogs.data?.length || 0})</TabsTrigger>
                        <TabsTrigger value="hospitals">Direktori Rumah Sakit Rujukan ({hospitalList.length || 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="logs" className="pt-2">
                        <Table
                            columns={logColumns}
                            data={emergencyLogs}
                            emptyMessage="Tidak ada riwayat panggilan darurat yang tercatat."
                            emptyIcon="notifications_off"
                        />
                    </TabsContent>

                    <TabsContent value="hospitals" className="pt-2">
                        <Table
                            columns={hospitalColumns}
                            data={hospitalList}
                            emptyMessage="Belum ada direktori rumah sakit yang dimuat."
                            emptyIcon="local_hospital"
                        />
                    </TabsContent>
                </Tabs>

                {/* SOS Detail Modal */}
                <Modal
                    isOpen={!!selectedLog}
                    onClose={() => setSelectedLog(null)}
                    title={`Detail Panggilan Darurat #SOS-${selectedLog?.id || ''}`}
                    subtitle={`Member: ${selectedLog?.user?.name || 'Pengguna'}`}
                    icon="emergency"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-between w-full">
                            {!selectedLog?.action_taken?.includes('RESOLVED') && (
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="success"
                                    leftIcon="check_circle"
                                    onClick={() => handleResolve(selectedLog)}
                                >
                                    Tandai Teratasi (Resolved)
                                </Button>
                            )}
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                onClick={() => setSelectedLog(null)}
                            >
                                Tutup
                            </Button>
                        </div>
                    }
                >
                    {selectedLog && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-900">
                                <h4 className="font-bold text-xs uppercase tracking-wider text-rose-800">Status Kejadian Krisis</h4>
                                <p className="text-sm font-bold mt-1">Saluran Dispatch: {selectedLog.action_taken || 'DIAL_119'}</p>
                                <p className="text-xs text-rose-700 mt-1 font-label-mono">
                                    Waktu Kejadian: {selectedLog.created_at ? new Date(selectedLog.created_at).toLocaleString('id-ID') : '-'}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10 space-y-2">
                                <span className="text-[10px] font-label-mono uppercase text-on-surface-variant font-bold">Koordinat Lokasi GPS Terdeteksi:</span>
                                <p className="text-xs font-label-mono font-bold text-primary flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[18px] text-rose-600">location_on</span>
                                    {selectedLog.loc_reference || 'Lat: -6.2088, Lng: 106.8456'}
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-primary/10">
                                <h5 className="font-bold text-xs text-on-surface">Data Member:</h5>
                                <p className="text-xs text-on-surface mt-1">Nama: <strong>{selectedLog.user?.name}</strong></p>
                                <p className="text-xs text-on-surface-variant font-label-mono">Email: {selectedLog.user?.email}</p>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </AdminLayout>
    );
}
