import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';

export default function Community({ threads = [], stats = {} }) {
    const [search, setSearch] = useState('');
    const [selectedThread, setSelectedThread] = useState(null);

    const filteredThreads = threads.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.author.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            key: 'title',
            label: 'Topik & Kategori Diskusi',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                            {row.is_pinned ? 'push_pin' : 'chat_bubble'}
                        </span>
                    </div>
                    <div>
                        <p className="font-bold text-xs text-on-surface line-clamp-1">{row.title}</p>
                        <span className="text-[10px] font-label-mono text-primary font-semibold">
                            Kategori: {row.category}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: 'author',
            label: 'Penulis Thread',
            render: (row) => (
                <div>
                    <p className="font-bold text-xs text-on-surface">{row.author}</p>
                    <AdminBadge variant={row.author_role.toLowerCase()} size="xs">
                        {row.author_role}
                    </AdminBadge>
                </div>
            ),
        },
        {
            key: 'engagement',
            label: 'Aktivitas Diskusi',
            render: (row) => (
                <div className="font-label-mono text-xs space-y-0.5">
                    <p className="text-on-surface font-semibold">{row.replies_count} Balasan</p>
                    <p className="text-[10px] text-on-surface-variant">{row.views_count} Dilihat</p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Moderasi',
            render: (row) => {
                const isFlagged = row.status.includes('FLAGGED');
                return (
                    <AdminBadge variant={isFlagged ? 'emergency' : 'published'}>
                        {isFlagged ? 'DILAPORKAN' : 'DITERBITKAN'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <button
                    type="button"
                    onClick={() => setSelectedThread(row)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all flex items-center gap-1 ml-auto"
                >
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    <span>Moderasi</span>
                </button>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="community" title="Forum & Komunitas">
            <Head title="Forum & Komunitas — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Moderasi Forum & Komunitas Diskusi"
                    subtitle="Pengawasan ruang interaksi sosial, saling dukung antar pengguna, pencegahan misinformasi medis tak berlisensi, dan pemeliharaan kultur positif."
                    icon="groups"
                    badge={<AdminBadge variant="active" pulse>Komunitas Sehat Terjaga</AdminBadge>}
                />

                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Total Thread Diskusi"
                        value={stats.totalThreads || 342}
                        icon="forum"
                        accent="primary"
                        subtitle="Topik kesehatan aktif"
                    />
                    <AdminStatCard
                        title="Diskusi Aktif Pekan Ini"
                        value={stats.activeDiscussions || 88}
                        icon="diversity_3"
                        accent="emerald"
                        subtitle="Engagement member terverifikasi"
                    />
                    <AdminStatCard
                        title="Postingan Dilaporkan"
                        value={stats.flaggedPosts || 0}
                        icon="report"
                        accent={stats.flaggedPosts > 0 ? 'rose' : 'primary'}
                        subtitle="Perlu peninjauan admin"
                        badge={stats.flaggedPosts > 0 ? <AdminBadge variant="emergency">Perlu Tindakan</AdminBadge> : <AdminBadge variant="active">Nol Pelanggaran</AdminBadge>}
                    />
                    <AdminStatCard
                        title="Indeks Sentimen Positif"
                        value={stats.sentimentPositive || '94.6%'}
                        icon="sentiment_satisfied"
                        accent="teal"
                        subtitle="Kultur suportif antar member"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari judul diskusi, kategori, atau nama penulis..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    activeCount={search ? 1 : 0}
                    onReset={() => setSearch('')}
                />

                {/* Data Table */}
                <AdminDataTable
                    columns={columns}
                    data={filteredThreads}
                    emptyMessage="Tidak ada topik forum diskusi yang ditemukan."
                    emptyIcon="forum"
                />

                {/* Moderation Modal */}
                <AdminModal
                    isOpen={!!selectedThread}
                    onClose={() => setSelectedThread(null)}
                    title={`Moderasi Thread: "${selectedThread?.title}"`}
                    subtitle={`Penulis: ${selectedThread?.author} (${selectedThread?.author_role})`}
                    icon="shield"
                    footer={
                        <div className="flex items-center gap-2">
                            {selectedThread?.status?.includes('FLAGGED') && (
                                <button
                                    type="button"
                                    onClick={() => setSelectedThread(null)}
                                    className="px-3.5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                                >
                                    Hapus & Peringatkan User
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setSelectedThread(null)}
                                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                            >
                                Tutup
                            </button>
                        </div>
                    }
                >
                    {selectedThread && (
                        <div className="space-y-4">
                            <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10">
                                <span className="font-label-mono text-[10px] uppercase text-on-surface-variant font-bold">Isi / Pertanyaan Thread:</span>
                                <p className="text-xs text-on-surface leading-relaxed mt-1 font-medium">
                                    "{selectedThread.title} — Diskusi seputar kebiasaan dan pengalaman anggota dalam menerapkan pola hidup sehat di AEVYRA."
                                </p>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-2">
                                <h4 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-teal-600 text-[18px]">verified_user</span>
                                    <span>Pedoman Moderasi Medis:</span>
                                </h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Pastikan tidak ada klaim obat tidak terverifikasi BPOM, anjuran penghentian obat resep dokter, atau promosi suplemen ilegal.
                                </p>
                            </div>
                        </div>
                    )}
                </AdminModal>
            </div>
        </AdminLayout>
    );
}

