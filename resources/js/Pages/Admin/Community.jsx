import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import { Table, Modal, Button, Input, Textarea, Select, Avatar, DropdownAction } from '@/Components/UI';

export default function Community({
    posts = { data: [], links: [] },
    threads = [], // backward compatibility fallback
    stats = {},
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [deletingPost, setDeletingPost] = useState(null);

    // Create Form
    const createForm = useForm({
        title: '',
        body: '',
        status: 'PUBLISHED',
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/community',
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

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/community/posts', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const updatePostStatus = (post, newStatus) => {
        router.patch(`/admin/community/posts/${post.id}/status`, { status: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedPost?.id === post.id) {
                    setSelectedPost((prev) => ({ ...prev, status: newStatus }));
                }
            },
        });
    };

    const handleDeleteConfirm = () => {
        if (!deletingPost) return;
        router.delete(`/admin/community/posts/${deletingPost.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingPost(null);
                if (selectedPost?.id === deletingPost.id) setSelectedPost(null);
            },
        });
    };

    // Use posts or fallback
    const dataTableSource = posts?.data?.length !== undefined ? posts : (threads.length ? threads : posts);

    const columns = [
        {
            key: 'title',
            label: 'Topik & Isi Diskusi',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    </div>
                    <div>
                        <p className="font-bold text-xs sm:text-sm text-on-surface line-clamp-1">{row.title}</p>
                        <p className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">{row.body || 'Konten diskusi komunitas'}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'author',
            label: 'Penulis Postingan',
            render: (row) => {
                const authorName = row.user?.name || row.author || 'Member Anonim';
                const roleSlug = row.user?.roles?.[0]?.slug || row.author_role?.toLowerCase() || 'member';
                return (
                    <div className="flex items-center gap-2">
                        <Avatar name={authorName} size="xs" />
                        <div>
                            <p className="font-bold text-xs text-on-surface">{authorName}</p>
                            <AdminBadge variant={roleSlug} size="xs">
                                {roleSlug.toUpperCase()}
                            </AdminBadge>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'engagement',
            label: 'Interaksi',
            render: (row) => (
                <div className="font-label-mono text-xs space-y-0.5">
                    <p className="text-on-surface font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-teal-600">comment</span>
                        {row.comments_count ?? row.replies_count ?? 0} Balasan
                    </p>
                    <p className="text-[10px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-rose-500">favorite</span>
                        {row.reactions_count ?? 0} Reaksi
                    </p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Moderasi',
            render: (row) => {
                const stat = row.status || 'PUBLISHED';
                const isFlagged = stat.includes('FLAG') || stat === 'UNDER_REVIEW' || stat === 'HIDDEN';
                return (
                    <AdminBadge variant={isFlagged ? 'emergency' : 'published'} size="xs">
                        {stat === 'PUBLISHED' ? 'Diterbitkan' : stat === 'UNDER_REVIEW' ? 'Dalam Review' : stat}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'actions',
            label: 'Tindakan',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end">
                    <DropdownAction
                        onDetail={() => setSelectedPost(row)}
                        detailLabel="Moderasi Post"
                        detailIcon="shield"
                        onDelete={() => setDeletingPost(row)}
                        deleteLabel="Hapus Post"
                    />
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="community" title="Forum & Komunitas">
            <Head title="Forum & Komunitas - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Moderasi Forum & Komunitas Diskusi"
                    subtitle="Pengawasan ruang interaksi sosial pengguna, penegakan pedoman medis aman, dan penyiaran pengumuman resmi ke seluruh komunitas."
                    icon="groups"
                    badge={<AdminBadge variant="teal">Safe Community Hub</AdminBadge>}
                    actions={
                        <Button
                            type="button"
                            variant="primary"
                            size="md"
                            leftIcon="campaign"
                            onClick={() => setIsCreateOpen(true)}
                        >
                            Buat Pengumuman Resmi
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Postingan"
                        value={stats.totalThreads || 0}
                        icon="forum"
                        accent="primary"
                    />
                    <AdminStatCard
                        title="Diskusi Aktif"
                        value={stats.activeDiscussions || 0}
                        icon="mark_chat_unread"
                        accent="teal"
                    />
                    <AdminStatCard
                        title="Perlu Tindakan Moderasi"
                        value={stats.flaggedPosts || 0}
                        icon="report"
                        accent={stats.flaggedPosts > 0 ? 'rose' : 'emerald'}
                    />
                    <AdminStatCard
                        title="Indeks Sentimen Positif"
                        value={stats.sentimentPositive || '95.2%'}
                        icon="sentiment_satisfied"
                        accent="amber"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari judul postingan, nama penulis, atau teks..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    filters={[
                        {
                            value: status,
                            onChange: setStatus,
                            options: [
                                { label: 'Semua Status Moderasi', value: '' },
                                { label: 'Diterbitkan (PUBLISHED)', value: 'PUBLISHED' },
                                { label: 'Dalam Review (UNDER_REVIEW)', value: 'UNDER_REVIEW' },
                                { label: 'Disembunyikan (HIDDEN)', value: 'HIDDEN' },
                            ],
                        },
                    ]}
                    activeCount={(search ? 1 : 0) + (status ? 1 : 0)}
                    onReset={() => {
                        setSearch('');
                        setStatus('');
                    }}
                />

                {/* Table Component */}
                <Table
                    columns={columns}
                    data={dataTableSource}
                    emptyMessage="Tidak ada topik forum diskusi yang ditemukan."
                    emptyIcon="forum"
                    searchable={false}
                />

                {/* Create Official Announcement Modal */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Buat Pengumuman Resmi Komunitas"
                    subtitle="Terbitkan artikel atau edukasi medis resmi atas nama administrator ke linimasa komunitas."
                    icon="campaign"
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
                                form="create-post-form"
                                variant="primary"
                                size="sm"
                                leftIcon="send"
                                loading={createForm.processing}
                            >
                                Terbitkan Sekarang
                            </Button>
                        </div>
                    }
                >
                    <form id="create-post-form" onSubmit={handleCreateSubmit} className="space-y-4">
                        <Input
                            label="Judul Pengumuman / Topik Diskusi"
                            placeholder="Contoh: Edukasi Resmi: Panduan Membaca Label Informasi Nilai Gizi"
                            required
                            value={createForm.data.title}
                            onChange={(e) => createForm.setData('title', e.target.value)}
                            error={createForm.errors.title}
                        />

                        <Textarea
                            label="Isi Pengumuman / Pesan Komunitas"
                            placeholder="Tuliskan isi pesan atau edukasi yang ingin disampaikan..."
                            required
                            value={createForm.data.body}
                            onChange={(e) => createForm.setData('body', e.target.value)}
                            error={createForm.errors.body}
                            rows={5}
                        />

                        <Select
                            label="Status Publikasi"
                            required
                            value={createForm.data.status}
                            onChange={(e) => createForm.setData('status', e.target.value)}
                            error={createForm.errors.status}
                            options={[
                                { value: 'PUBLISHED', label: 'Terbitkan Langsung (PUBLISHED)' },
                                { value: 'UNDER_REVIEW', label: 'Tinjau Terlebih Dahulu (UNDER_REVIEW)' },
                            ]}
                        />
                    </form>
                </Modal>

                {/* Moderation Detail Modal */}
                <Modal
                    isOpen={!!selectedPost}
                    onClose={() => setSelectedPost(null)}
                    title="Panel Moderasi Postingan Komunitas"
                    subtitle={`Penulis: ${selectedPost?.user?.name || selectedPost?.author || 'Member'}`}
                    icon="shield"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                {selectedPost?.status === 'PUBLISHED' ? (
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="outline"
                                        leftIcon="visibility_off"
                                        onClick={() => updatePostStatus(selectedPost, 'HIDDEN')}
                                    >
                                        Sembunyikan Post
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="success"
                                        leftIcon="check"
                                        onClick={() => updatePostStatus(selectedPost, 'PUBLISHED')}
                                    >
                                        Pulihkan & Terbitkan
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="destructive"
                                    leftIcon="delete"
                                    onClick={() => {
                                        setDeletingPost(selectedPost);
                                    }}
                                >
                                    Hapus
                                </Button>
                            </div>
                            <Button
                                type="button"
                                variant="primary"
                                size="sm"
                                onClick={() => setSelectedPost(null)}
                            >
                                Tutup
                            </Button>
                        </div>
                    }
                >
                    {selectedPost && (
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10">
                                <h4 className="font-bold text-sm text-primary mb-1">{selectedPost.title}</h4>
                                <p className="text-xs text-on-surface leading-relaxed whitespace-pre-wrap">{selectedPost.body}</p>
                            </div>

                            <div className="p-4 rounded-2xl bg-white border border-primary/10 space-y-2">
                                <h5 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-teal-600 text-[18px]">verified_user</span>
                                    <span>Pedoman Medis & Kepatuhan Platform:</span>
                                </h5>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Pastikan postingan tidak memuat klaim obat mujarab tanpa izin BPOM, resep ilegal, ujaran kebencian, atau misinformasi non-klinis.
                                </p>
                            </div>
                        </div>
                    )}
                </Modal>

                {/* Delete Confirmation Modal */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingPost}
                    onClose={() => setDeletingPost(null)}
                    onConfirm={handleDeleteConfirm}
                    title="Hapus Postingan Komunitas"
                    message="Apakah Anda yakin ingin menghapus postingan komunitas ini beserta seluruh komentar terkait secara permanen?"
                    itemName={deletingPost ? deletingPost.title : ''}
                />
            </div>
        </AdminLayout>
    );
}
