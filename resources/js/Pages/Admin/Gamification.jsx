import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function Gamification({ achievements = [], recentLedger = [], topStreaks = [], stats = {} }) {
    const badgeColumns = [
        {
            key: 'name',
            label: 'Nama & Ikon Lencana',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/25 text-amber-800 font-heading font-black flex items-center justify-center text-lg shadow-xs">
                        🏅
                    </div>
                    <div>
                        <p className="font-bold text-xs text-on-surface">{row.name}</p>
                        <p className="text-[10px] text-on-surface-variant font-label-mono">{row.key}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'category',
            label: 'Kategori Kebiasaan',
            render: (row) => (
                <AdminBadge variant="amber" size="xs">
                    {row.category || 'KONSISTENSI'}
                </AdminBadge>
            ),
        },
        {
            key: 'description',
            label: 'Syarat Pencapaian',
            render: (row) => (
                <span className="text-xs text-on-surface-variant line-clamp-1">
                    {row.description || 'Menjaga konsistensi pencatatan'}
                </span>
            ),
        },
        {
            key: 'users_count',
            label: 'Member Penerima',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-primary">
                    {row.users_count || 0} pengguna
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status Lencana',
            render: (row) => (
                <AdminBadge variant={row.status === 'ACTIVE' ? 'active' : 'draft'}>
                    {row.status || 'AKTIF'}
                </AdminBadge>
            ),
        },
    ];

    const streakColumns = [
        {
            key: 'rank',
            label: 'Peringkat',
            render: (_, idx) => (
                <span className="font-heading font-black text-sm text-amber-600">
                    #{idx + 1}
                </span>
            ),
        },
        {
            key: 'user',
            label: 'Member Berdedikasi',
            render: (row) => (
                <span className="font-bold text-xs text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'current_count',
            label: 'Streak Berjalan',
            render: (row) => (
                <div className="flex items-center gap-1 font-label-mono font-bold text-xs text-amber-600">
                    <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                    <span>{row.current_count} Hari</span>
                </div>
            ),
        },
        {
            key: 'best_count',
            label: 'Rekor Terbaik',
            render: (row) => (
                <span className="font-label-mono text-xs text-on-surface-variant font-medium">
                    {row.best_count} Hari
                </span>
            ),
        },
    ];

    const ledgerColumns = [
        {
            key: 'event_type',
            label: 'Peristiwa Poin',
            render: (row) => (
                <AdminBadge variant="primary" size="xs">
                    {row.event_type}
                </AdminBadge>
            ),
        },
        {
            key: 'user',
            label: 'Penerima',
            render: (row) => (
                <span className="text-xs font-medium text-on-surface">{row.user?.name || 'Member'}</span>
            ),
        },
        {
            key: 'points',
            label: 'Jumlah Poin',
            render: (row) => (
                <span className="font-label-mono font-bold text-xs text-emerald-700">
                    +{row.points} Poin
                </span>
            ),
        },
        {
            key: 'created_at',
            label: 'Waktu Transaksi',
            render: (row) => (
                <span className="font-label-mono text-[11px] text-on-surface-variant">
                    {new Date(row.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </span>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="gamification" title="Badge & Gamifikasi">
            <Head title="Badge & Gamifikasi — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Badge, Gamifikasi & Buku Poin (Rewards Engine)"
                    subtitle="Pengaturan lencana pencapaian mikro-kebiasaan, pemantauan rekor streak harian anggota, dan riwayat ledger perolehan poin preventif."
                    icon="military_tech"
                    badge={<AdminBadge variant="gold">Gamification Hub</AdminBadge>}
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Katalog Badge Aktif"
                        value={stats.totalBadges || achievements.length}
                        icon="military_tech"
                        accent="amber"
                        subtitle="Lencana penghargaan terbit"
                    />
                    <AdminStatCard
                        title="Total Poin Terdistribusi"
                        value={stats.totalPointsAwarded?.toLocaleString('id-ID') || 0}
                        icon="stars"
                        accent="primary"
                        subtitle="Poin reward diperoleh member"
                    />
                    <AdminStatCard
                        title="Rekor Streak Tertinggi"
                        value={`${stats.highestStreak || 14} Hari`}
                        icon="local_fire_department"
                        accent="rose"
                        subtitle="Pencatatan berturut-turut"
                    />
                    <AdminStatCard
                        title="Member Aktif Ber-Streak"
                        value={stats.activeStreaksCount || 0}
                        icon="bolt"
                        accent="emerald"
                        subtitle="Streak >= 3 hari tanpa putus"
                    />
                </div>

                {/* Badge Catalog Table */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-[20px]">emoji_events</span>
                            <span>Katalog Lencana Prestasi (Badges)</span>
                        </h3>
                    </div>
                    <AdminDataTable
                        columns={badgeColumns}
                        data={achievements}
                        emptyMessage="Belum ada lencana yang dibuat."
                    />
                </div>

                {/* 2-Columns: Streak Leaderboard + Recent Ledger */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-[20px]">leaderboard</span>
                            <span>Leaderboard Streak Konsistensi</span>
                        </h3>
                        <AdminDataTable
                            columns={streakColumns}
                            data={topStreaks}
                            emptyMessage="Belum ada data streak berjalan."
                        />
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-emerald-600 text-[20px]">receipt_long</span>
                            <span>Ledger Transaksi Poin Terbaru</span>
                        </h3>
                        <AdminDataTable
                            columns={ledgerColumns}
                            data={recentLedger}
                            emptyMessage="Belum ada transaksi poin."
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

