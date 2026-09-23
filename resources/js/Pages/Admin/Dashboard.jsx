import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function Dashboard({
    kpis = {},
    totalUsers,
    activeInstructors,
    activePrograms,
    activeChallenges,
    recentAuditLogs = [],
    recentUsers = [],
    userGrowth = [],
}) {
    const finalTotalUsers = totalUsers ?? kpis?.totalUsers ?? 0;
    const finalActiveInstructors = activeInstructors ?? kpis?.activeInstructors ?? 0;
    const finalActivePrograms = activePrograms ?? kpis?.activePrograms ?? 0;
    const finalActiveChallenges = activeChallenges ?? kpis?.activeChallenges ?? 0;

    const maxGrowth = Math.max(...(userGrowth.length ? userGrowth.map(d => d.count) : [1]), 1);

    const userColumns = [
        {
            key: 'name',
            label: 'Nama & Pengguna',
            render: (row) => (
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                        {row.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'role',
            label: 'Peran Akun',
            render: (row) => {
                const roleSlug = row.roles?.[0]?.slug || 'member';
                return <AdminBadge variant={roleSlug} size="xs">{roleSlug}</AdminBadge>;
            },
        },
        {
            key: 'created_at',
            label: 'Terdaftar',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
            ),
        },
    ];

    const auditColumns = [
        {
            key: 'action',
            label: 'Aksi Sistem',
            render: (row) => (
                <AdminBadge variant="admin" size="xs">
                    {row.action}
                </AdminBadge>
            ),
        },
        {
            key: 'actor',
            label: 'Eksekutor',
            render: (row) => (
                <span className="font-medium text-xs text-on-surface">
                    {row.actor?.name || 'Sistem Otomatis'}
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Waktu',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {new Date(row.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="dashboard" title="Dashboard Tata Kelola">
            <Head title="Dashboard Tata Kelola — AEVYRA" />

            <div className="space-y-6">
                {/* Standard Page Header */}
                <AdminPageHeader
                    title="Pusat Komando & Tata Kelola AEVYRA"
                    subtitle="Pengawasan terpadu 11 pilar ekosistem kesehatan preventif: Scanner OCR, Konsultasi, Tracker, HBE, Komunitas, hingga Tanggap Darurat 119."
                    icon="shield_person"
                    badge={<AdminBadge variant="active" pulse>Sistem Operasional Optimal</AdminBadge>}
                    actions={
                        <Link
                            href="/admin/reports"
                            className="px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 shadow-xs flex items-center gap-2 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">analytics</span>
                            <span>Laporan Eksekutif</span>
                        </Link>
                    }
                />

                {/* Primary KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Total Pengguna"
                        value={finalTotalUsers}
                        icon="group"
                        accent="primary"
                        subtitle="Member terdaftar di AEVYRA"
                        trend={{ value: '+14%', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Instruktur Aktif"
                        value={finalActiveInstructors}
                        icon="verified_user"
                        accent="teal"
                        subtitle="Tenaga ahli terverifikasi"
                        trend={{ value: '100% Valid', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Rekam Metrik Biologis"
                        value={kpis.healthRecordsCount || 0}
                        icon="vital_signs"
                        accent="emerald"
                        subtitle="Total data point tervalidasi DQS"
                        trend={{ value: '+28/hari', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Panggilan SOS 119 Hari Ini"
                        value={kpis.emergencyCount || 0}
                        icon="emergency"
                        accent={kpis.emergencyCount > 0 ? 'rose' : 'primary'}
                        subtitle="SLA Dispatch < 180ms"
                        badge={kpis.emergencyCount > 0 ? <AdminBadge variant="emergency">Perlu Review</AdminBadge> : <AdminBadge variant="active">Standby 24/7</AdminBadge>}
                    />
                </div>

                {/* Secondary KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Program Kohor"
                        value={finalActivePrograms}
                        icon="inventory_2"
                        accent="indigo"
                        subtitle="Kurikulum aktif 7/14/30 hari"
                    />
                    <AdminStatCard
                        title="Tantangan Komunitas"
                        value={finalActiveChallenges}
                        icon="emoji_events"
                        accent="amber"
                        subtitle="Gamifikasi mikro-kebiasaan"
                    />
                    <AdminStatCard
                        title="Konsultasi Terjadwal"
                        value={kpis.consultationsToday || 0}
                        icon="forum"
                        accent="teal"
                        subtitle="Sesi terjadwal hari ini"
                    />
                    <AdminStatCard
                        title="Member Berlangganan"
                        value={kpis.activeTiers || 0}
                        icon="workspace_premium"
                        accent="amber"
                        subtitle="Distribusi Silver, Gold, Platinum"
                    />
                </div>

                {/* Growth Chart Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-[0_4px_30px_rgba(0,67,62,0.03)] border border-primary/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[22px]">trending_up</span>
                                <h3 className="text-lg font-heading font-black text-on-surface">Tren Registrasi Pengguna Baru</h3>
                            </div>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Pertumbuhan akun member & instruktur dalam 7 hari terakhir</p>
                        </div>
                        <AdminBadge variant="admin">Metrik Kohor Harian</AdminBadge>
                    </div>

                    <div className="h-48 sm:h-56 flex items-end gap-2 sm:gap-3 pt-6 pb-2 px-2 border-b border-primary/10">
                        {userGrowth.map((day, idx) => {
                            const heightPercent = Math.max((day.count / maxGrowth) * 100, 10);
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                    {/* Tooltip on Hover */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-primary text-white text-[11px] font-label-mono py-1 px-2.5 rounded-xl whitespace-nowrap pointer-events-none z-20 shadow-lg border border-white/20">
                                        {day.date}: <span className="font-bold">{day.count} user</span>
                                    </div>
                                    
                                    {/* Interactive Bar */}
                                    <div 
                                        className="w-full bg-gradient-to-t from-primary to-teal-500 rounded-t-xl transition-all duration-300 group-hover:from-amber-600 group-hover:to-amber-400 group-hover:scale-y-105 origin-bottom shadow-xs cursor-pointer"
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                    
                                    {/* Subtitle date at bottom */}
                                    <span className="text-[10px] font-label-mono text-on-surface-variant/70 mt-2 truncate w-full text-center hidden md:block">
                                        {day.date.split('-').slice(1).join('/')}
                                    </span>
                                </div>
                            );
                        })}
                        {userGrowth.length === 0 && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined text-3xl text-primary/30 mb-2">query_stats</span>
                                <span className="text-xs font-medium">Belum ada rekaman pertumbuhan pengguna.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2-Column Responsive Tables using Reusable AdminDataTable */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users Table */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">person_add</span>
                                <span>Pengguna Terdaftar Terbaru</span>
                            </h3>
                            <Link href="/admin/users" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                Kelola Semua →
                            </Link>
                        </div>
                        <AdminDataTable
                            columns={userColumns}
                            data={recentUsers}
                            emptyMessage="Belum ada pengguna terdaftar."
                        />
                    </div>

                    {/* Recent Audit Trail Table */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                                <span>Jejak Audit Forensik Mutasi</span>
                            </h3>
                            <Link href="/admin/audit" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                                Buku Besar →
                            </Link>
                        </div>
                        <AdminDataTable
                            columns={auditColumns}
                            data={recentAuditLogs}
                            emptyMessage="Belum ada rekaman audit log."
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
