import React, { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminDeleteConfirmModal from '@/Components/Admin/AdminDeleteConfirmModal';
import {
    Table,
    Modal,
    Button,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Input,
    Textarea,
    Select,
    Avatar,
    DropdownAction,
} from '@/Components/UI';

export default function Community({
    posts = { data: [], links: [] },
    reports = { data: [], links: [] },
    recentActions = [],
    stats = {},
    filters = {},
    activeTab: initialTab = 'posts',
}) {
    const [currentTab, setCurrentTab] = useState(filters.tab || initialTab || 'posts');
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [reportStatus, setReportStatus] = useState(filters.report_status || '');

    // Modals
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectedReport, setSelectedReport] = useState(null);
    const [deletingPost, setDeletingPost] = useState(null);
    const [deletingComment, setDeletingComment] = useState(null);

    // Create Official Announcement Form
    const createForm = useForm({
        title: '',
        body: '',
        category_id: 5, // Pengumuman & Edukasi Resmi
        status: 'PUBLISHED',
    });

    // Report Resolution Form
    const reportForm = useForm({
        action: 'HIDE_POST',
        resolution_notes: '',
    });

    // Debounced filter updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                '/admin/community',
                {
                    search,
                    status,
                    category_id: categoryId,
                    report_status: reportStatus,
                    tab: currentTab,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search, status, categoryId, reportStatus, currentTab]);

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        createForm.post('/admin/community/posts', {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreateOpen(false);
                createForm.reset();
            },
        });
    };

    const updatePostStatus = (post, newStatus, reason = '') => {
        router.patch(`/admin/community/posts/${post.id}/status`, { status: newStatus, reason }, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedPost?.id === post.id) {
                    setSelectedPost((prev) => ({ ...prev, status: newStatus }));
                }
            },
        });
    };

    const handleDeletePostConfirm = () => {
        if (!deletingPost) return;
        router.delete(`/admin/community/posts/${deletingPost.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingPost(null);
                if (selectedPost?.id === deletingPost.id) setSelectedPost(null);
            },
        });
    };

    const handleDeleteCommentConfirm = () => {
        if (!deletingComment) return;
        router.delete(`/admin/community/comments/${deletingComment.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setDeletingComment(null);
                if (selectedPost) {
                    setSelectedPost((prev) => ({
                        ...prev,
                        comments: prev.comments?.filter((c) => c.id !== deletingComment.id),
                    }));
                }
            },
        });
    };

    const handleResolveReport = (e) => {
        e.preventDefault();
        if (!selectedReport) return;
        reportForm.patch(`/admin/community/reports/${selectedReport.id}/resolve`, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedReport(null);
                reportForm.reset();
            },
        });
    };

    const handleDismissReport = (report) => {
        router.patch(`/admin/community/reports/${report.id}/dismiss`, {}, {
            preserveScroll: true,
        });
    };

    const categoryNames = {
        1: 'Nutrisi & Resep',
        2: 'Remisi Pra-Diabetes',
        3: 'Langkah & Olahraga',
        4: 'Tanya Ahli/Dokter',
        5: 'Pengumuman Resmi',
    };

    const reasonLabels = {
        SPAM: 'Spam / Iklan Terlarang',
        MEDICAL_MISINFO: 'Klaim Medis Berbahaya / Tanpa Izin',
        HATE: 'Ujaran Kebencian / Pelecehan',
        PRIVACY_VIOLATION: 'Pelanggaran Privasi / Data Medis',
    };

    // Columns for Posts Table
    const postColumns = [
        {
            key: 'title',
            label: 'Topik & Isi Diskusi',
            render: (row) => (
                <div className="flex items-start gap-3 max-w-md">
                    <div className="w-9 h-9 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">
                            {row.category_id === 5 ? 'campaign' : 'chat_bubble'}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-xs sm:text-sm text-on-surface line-clamp-1">{row.title}</p>
                            {row.category_id === 5 && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 shrink-0">
                                    Resmi
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">{row.body || '-'}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">
                                {categoryNames[row.category_id] || 'Topik Umum'}
                            </span>
                            <span className="text-[10px] text-on-surface-variant font-label-mono">
                                {new Date(row.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'author',
            label: 'Penulis Postingan',
            render: (row) => {
                const authorName = row.user?.name || 'Member Anonim';
                const roleSlug = row.user?.roles?.[0]?.slug || 'member';
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
            label: 'Interaksi & Aduan',
            render: (row) => (
                <div className="font-label-mono text-xs space-y-0.5">
                    <p className="text-on-surface font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-teal-600">comment</span>
                        {row.comments_count ?? 0} Balasan
                    </p>
                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-rose-500">favorite</span>
                        {row.reactions_count ?? 0} Reaksi
                    </p>
                    {row.reports_count > 0 && (
                        <p className="text-[11px] text-rose-600 font-bold flex items-center gap-1 animate-pulse">
                            <span className="material-symbols-outlined text-[14px]">report</span>
                            {row.reports_count} Aduan
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Moderasi',
            render: (row) => {
                const stat = row.status || 'PUBLISHED';
                const isFlagged = stat === 'UNDER_REVIEW' || stat === 'HIDDEN';
                return (
                    <AdminBadge variant={isFlagged ? 'emergency' : 'published'} size="xs">
                        {stat === 'PUBLISHED' ? 'Diterbitkan' : stat === 'UNDER_REVIEW' ? 'Dalam Review' : 'Disembunyikan'}
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

    // Columns for Reports Table
    const reportColumns = [
        {
            key: 'target',
            label: 'Konten Dilaporkan',
            render: (row) => {
                const post = row.post;
                return (
                    <div className="max-w-md">
                        {post ? (
                            <>
                                <p className="font-bold text-xs text-on-surface line-clamp-1">{post.title}</p>
                                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">{post.body}</p>
                                <p className="text-[10px] text-on-surface-variant mt-1">
                                    Penulis: <span className="font-semibold text-primary">{post.user?.name || 'Member'}</span>
                                </p>
                            </>
                        ) : (
                            <p className="text-xs text-on-surface-variant italic">[Konten telah dihapus]</p>
                        )}
                    </div>
                );
            },
        },
        {
            key: 'reason',
            label: 'Alasan Pelanggaran',
            render: (row) => (
                <div className="space-y-1">
                    <AdminBadge
                        variant={row.reason === 'MEDICAL_MISINFO' ? 'destructive' : row.reason === 'HATE' ? 'emergency' : 'warning'}
                        size="xs"
                    >
                        {reasonLabels[row.reason] || row.reason}
                    </AdminBadge>
                    {row.description && (
                        <p className="text-[11px] text-on-surface-variant italic max-w-xs line-clamp-2">
                            "{row.description}"
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'reporter',
            label: 'Pelapor & Waktu',
            render: (row) => (
                <div className="text-xs">
                    <p className="font-bold text-on-surface">{row.reporter?.name || 'Member'}</p>
                    <p className="text-[10px] text-on-surface-variant font-label-mono">
                        {new Date(row.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Aduan',
            render: (row) => (
                <div className="space-y-0.5">
                    <AdminBadge
                        variant={row.status === 'PENDING' ? 'emergency' : row.status === 'RESOLVED' ? 'success' : 'default'}
                        size="xs"
                    >
                        {row.status === 'PENDING' ? 'Menunggu Review' : row.status === 'RESOLVED' ? 'Selesai Ditindak' : 'Ditolak'}
                    </AdminBadge>
                    {row.resolution && (
                        <p className="text-[10px] font-mono text-on-surface-variant">{row.resolution}</p>
                    )}
                </div>
            ),
        },
        {
            key: 'actions',
            label: 'Aksi Moderasi',
            align: 'right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1.5">
                    {row.status === 'PENDING' ? (
                        <>
                            <Button
                                type="button"
                                size="xs"
                                variant="primary"
                                leftIcon="gavel"
                                onClick={() => setSelectedReport(row)}
                            >
                                Proses
                            </Button>
                            <Button
                                type="button"
                                size="xs"
                                variant="outline"
                                onClick={() => handleDismissReport(row)}
                            >
                                Tolak
                            </Button>
                        </>
                    ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">done_all</span>
                            Ditutup
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="community" title="Forum & Komunitas">
            <Head title="Forum & Moderasi Komunitas - AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Tata Kelola & Moderasi Komunitas Diskusi"
                    subtitle="Pengawasan ruang interaksi sosial member, penegakan standar medis Kemenkes/PERKENI, penanganan aduan pelanggaran, dan publikasi edukasi resmi."
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
                            Terbitkan Pengumuman Resmi
                        </Button>
                    }
                />

                {/* KPI Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <AdminStatCard
                        title="Total Thread Diskusi"
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
                        title="Antrean Laporan Aduan"
                        value={stats.pendingReports || 0}
                        icon="report"
                        accent={stats.pendingReports > 0 ? 'rose' : 'emerald'}
                    />
                    <AdminStatCard
                        title="Post Perlu Ditinjau"
                        value={stats.flaggedPosts || 0}
                        icon="gavel"
                        accent={stats.flaggedPosts > 0 ? 'amber' : 'emerald'}
                    />
                </div>

                {/* Main Tabs Navigation */}
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="mb-4">
                        <TabsTrigger
                            value="posts"
                            icon="forum"
                            badge={posts?.total ?? posts?.data?.length ?? 0}
                        >
                            Daftar Postingan & Topik
                        </TabsTrigger>
                        <TabsTrigger
                            value="reports"
                            icon="gavel"
                            badge={stats.pendingReports || 0}
                        >
                            Antrean Moderasi & Aduan
                        </TabsTrigger>
                        <TabsTrigger
                            value="audit"
                            icon="history"
                        >
                            Log Audit Moderasi
                        </TabsTrigger>
                        <TabsTrigger
                            value="guidelines"
                            icon="health_and_safety"
                        >
                            Pedoman & Standar Medis
                        </TabsTrigger>
                    </TabsList>

                    {/* TAB 1: POSTS LIST */}
                    <TabsContent value="posts" className="space-y-4">
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
                                {
                                    value: categoryId,
                                    onChange: setCategoryId,
                                    options: [
                                        { label: 'Semua Kategori', value: '' },
                                        { label: 'Nutrisi & Resep Sehat', value: '1' },
                                        { label: 'Kisah Remisi Pra-Diabetes', value: '2' },
                                        { label: 'Langkah & Olahraga', value: '3' },
                                        { label: 'Tanya Dokter & Coach', value: '4' },
                                        { label: 'Pengumuman Resmi', value: '5' },
                                    ],
                                },
                            ]}
                            activeCount={(search ? 1 : 0) + (status ? 1 : 0) + (categoryId ? 1 : 0)}
                            onReset={() => {
                                setSearch('');
                                setStatus('');
                                setCategoryId('');
                            }}
                        />

                        <Table
                            columns={postColumns}
                            data={posts}
                            emptyMessage="Tidak ada topik forum diskusi yang sesuai filter."
                            emptyIcon="forum"
                            searchable={false}
                        />
                    </TabsContent>

                    {/* TAB 2: MODERATION QUEUE & USER REPORTS */}
                    <TabsContent value="reports" className="space-y-4">
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                            <span className="material-symbols-outlined text-[20px] text-amber-600 mt-0.5">info</span>
                            <div>
                                <p className="font-bold">Prinsip Moderasi Berbasis Keselamatan Medis:</p>
                                <p className="mt-0.5">
                                    Konten yang memuat klaim obat instan tanpa izin, resep mandiri tanpa lisensi dokter, atau pelanggaran privasi data biometrik anggota wajib ditindak segera sesuai kebijakan privasi dan regulasi Kemenkes.
                                </p>
                            </div>
                        </div>

                        <AdminFilterBar
                            searchPlaceholder="Cari aduan laporan..."
                            searchValue=""
                            onSearchChange={() => {}}
                            filters={[
                                {
                                    value: reportStatus,
                                    onChange: setReportStatus,
                                    options: [
                                        { label: 'Semua Status Aduan', value: '' },
                                        { label: 'Menunggu Tindakan (PENDING)', value: 'PENDING' },
                                        { label: 'Selesai Ditindak (RESOLVED)', value: 'RESOLVED' },
                                        { label: 'Ditolak (DISMISSED)', value: 'DISMISSED' },
                                    ],
                                },
                            ]}
                            activeCount={reportStatus ? 1 : 0}
                            onReset={() => setReportStatus('')}
                        />

                        <Table
                            columns={reportColumns}
                            data={reports}
                            emptyMessage="Tidak ada aduan laporan pelanggaran dalam antrean."
                            emptyIcon="task_alt"
                            searchable={false}
                        />
                    </TabsContent>

                    {/* TAB 3: AUDIT TRAIL LOG */}
                    <TabsContent value="audit" className="space-y-4">
                        <div className="bg-white dark:bg-surface rounded-3xl p-6 border border-surface-container shadow-xs space-y-4">
                            <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-teal-600">security</span>
                                <span>Catatan Jejak Audit Moderasi Terkini</span>
                            </h3>

                            {recentActions.length > 0 ? (
                                <div className="divide-y divide-surface-container">
                                    {recentActions.map((act) => (
                                        <div key={act.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-bold text-teal-600 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-[10px]">
                                                        {act.action}
                                                    </span>
                                                    <span className="font-semibold text-on-surface">
                                                        Moderator: {act.moderator?.name || 'Administrator'}
                                                    </span>
                                                </div>
                                                <p className="text-on-surface-variant">{act.reason}</p>
                                            </div>
                                            <span className="text-[10px] text-on-surface-variant font-label-mono whitespace-nowrap">
                                                {new Date(act.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-on-surface-variant italic py-6 text-center">
                                    Belum ada catatan tindakan moderasi yang terekam.
                                </p>
                            )}
                        </div>
                    </TabsContent>

                    {/* TAB 4: GUIDELINES & COMPLIANCE */}
                    <TabsContent value="guidelines" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">verified</span>
                                    <h4 className="font-heading font-bold text-sm text-on-surface">Standar Klinis & Non-Klaim</h4>
                                </div>
                                <ul className="text-xs text-on-surface-variant space-y-2 leading-relaxed">
                                    <li>• Seluruh konten forum berstatus UGC dan <strong>tidak memiliki kekuatan otoritas klinis</strong>.</li>
                                    <li>• Dilarang keras menjanjikan kesembuhan instan (<em>miracle cure</em>) diabetes tanpa pendampingan dokter spesialis.</li>
                                    <li>• Rekomendasi nutrisi wajib merujuk pedoman PERKENI (Persatuan Endokrinologi Indonesia).</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-teal-600">lock</span>
                                    <h4 className="font-heading font-bold text-sm text-on-surface">Perlindungan Kerahasiaan Data Pribadi</h4>
                                </div>
                                <ul className="text-xs text-on-surface-variant space-y-2 leading-relaxed">
                                    <li>• Dilarang mempublikasikan data glukosa, riwayat resep, atau identitas privat anggota lain tanpa persetujuan eksplisit.</li>
                                    <li>• Laporan aduan dari anggota dijaga kerahasiaannya dan tidak diungkap kepada pembuat konten yang dilaporkan.</li>
                                    <li>• Moderasi wajib proporsional dan meninggalkan jejak audit untuk akuntabilitas.</li>
                                </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* CREATE OFFICIAL ANNOUNCEMENT MODAL */}
                <Modal
                    isOpen={isCreateOpen}
                    onClose={() => setIsCreateOpen(false)}
                    title="Buat Pengumuman & Edukasi Resmi Komunitas"
                    subtitle="Terbitkan artikel pedoman atau pengumuman atas nama Administrator ke linimasa forum."
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
                            label="Judul Topik / Pengumuman"
                            placeholder="Contoh: Edukasi Resmi: Panduan Membaca Label Informasi Nilai Gizi"
                            required
                            value={createForm.data.title}
                            onChange={(e) => createForm.setData('title', e.target.value)}
                            error={createForm.errors.title}
                        />

                        <Select
                            label="Kategori Forum"
                            required
                            value={createForm.data.category_id}
                            onChange={(e) => createForm.setData('category_id', parseInt(e.target.value, 10))}
                            error={createForm.errors.category_id}
                            options={[
                                { value: 5, label: 'Pengumuman & Edukasi Resmi (Rekomendasi Admin)' },
                                { value: 1, label: 'Nutrisi & Resep Sehat' },
                                { value: 2, label: 'Kisah Remisi Pra-Diabetes' },
                                { value: 3, label: 'Langkah & Olahraga' },
                                { value: 4, label: 'Tanya Ahli & Dokter' },
                            ]}
                        />

                        <Textarea
                            label="Isi Pesan Edukasi / Arahan Komunitas"
                            placeholder="Tuliskan materi edukatif berbasis bukti ilmiah..."
                            required
                            value={createForm.data.body}
                            onChange={(e) => createForm.setData('body', e.target.value)}
                            error={createForm.errors.body}
                            rows={6}
                        />

                        <Select
                            label="Status Publikasi"
                            required
                            value={createForm.data.status}
                            onChange={(e) => createForm.setData('status', e.target.value)}
                            error={createForm.errors.status}
                            options={[
                                { value: 'PUBLISHED', label: 'Terbitkan Langsung (PUBLISHED)' },
                                { value: 'UNDER_REVIEW', label: 'Simpan Draf Review (UNDER_REVIEW)' },
                            ]}
                        />
                    </form>
                </Modal>

                {/* POST MODERATION & COMMENTS DETAIL MODAL */}
                <Modal
                    isOpen={!!selectedPost}
                    onClose={() => setSelectedPost(null)}
                    title="Panel Moderasi Postingan & Balasan"
                    subtitle={`Penulis: ${selectedPost?.user?.name || 'Member'}`}
                    icon="shield"
                    maxWidth="lg"
                    footer={
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                {selectedPost?.status === 'PUBLISHED' ? (
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="outline"
                                        leftIcon="visibility_off"
                                        onClick={() => updatePostStatus(selectedPost, 'HIDDEN', 'Disembunyikan oleh moderator')}
                                    >
                                        Sembunyikan Post
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="success"
                                        leftIcon="check"
                                        onClick={() => updatePostStatus(selectedPost, 'PUBLISHED', 'Dipulihkan oleh moderator')}
                                    >
                                        Pulihkan & Terbitkan
                                    </Button>
                                )}
                                <Button
                                    type="button"
                                    size="xs"
                                    variant="destructive"
                                    leftIcon="delete"
                                    onClick={() => setDeletingPost(selectedPost)}
                                >
                                    Hapus Postingan
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
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/10 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-full">
                                        {categoryNames[selectedPost.category_id] || 'Topik Umum'}
                                    </span>
                                    <AdminBadge variant={selectedPost.status === 'PUBLISHED' ? 'published' : 'emergency'} size="xs">
                                        {selectedPost.status}
                                    </AdminBadge>
                                </div>
                                <h4 className="font-bold text-sm text-on-surface">{selectedPost.title}</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                                    {selectedPost.body}
                                </p>
                            </div>

                            {/* Comments Moderation List */}
                            <div className="space-y-2">
                                <h5 className="font-bold text-xs text-on-surface flex items-center justify-between">
                                    <span>Komentar Balasan Terkait ({selectedPost.comments?.length || 0}):</span>
                                </h5>

                                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                                        {selectedPost.comments.map((comm) => (
                                            <div key={comm.id} className="p-3 rounded-xl bg-white dark:bg-surface border border-surface-container text-xs flex items-start justify-between gap-3">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-on-surface">{comm.user?.name || 'Member'}</span>
                                                        <span className="text-[10px] text-on-surface-variant font-label-mono">
                                                            {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>
                                                    <p className="text-on-surface-variant">{comm.body}</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="xs"
                                                    variant="destructive"
                                                    leftIcon="delete"
                                                    onClick={() => setDeletingComment(comm)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-on-surface-variant italic">Belum ada komentar pada postingan ini.</p>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>

                {/* RESOLVE REPORT MODAL */}
                <Modal
                    isOpen={!!selectedReport}
                    onClose={() => setSelectedReport(null)}
                    title="Tindak Lanjuti Aduan Pelanggaran"
                    subtitle={`Pelapor: ${selectedReport?.reporter?.name || 'Member'}`}
                    icon="gavel"
                    maxWidth="md"
                    footer={
                        <div className="flex items-center justify-end gap-2 w-full">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedReport(null)}
                                disabled={reportForm.processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                form="resolve-report-form"
                                variant="primary"
                                size="sm"
                                leftIcon="check_circle"
                                loading={reportForm.processing}
                            >
                                Terapkan Tindakan
                            </Button>
                        </div>
                    }
                >
                    {selectedReport && (
                        <form id="resolve-report-form" onSubmit={handleResolveReport} className="space-y-4">
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                                <p className="font-bold flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px]">warning</span>
                                    <span>Alasan Aduan: {reasonLabels[selectedReport.reason] || selectedReport.reason}</span>
                                </p>
                                {selectedReport.description && (
                                    <p className="italic">"{selectedReport.description}"</p>
                                )}
                            </div>

                            {selectedReport.post && (
                                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs space-y-1">
                                    <p className="font-bold text-on-surface">Target Post: {selectedReport.post.title}</p>
                                    <p className="text-on-surface-variant line-clamp-2">{selectedReport.post.body}</p>
                                </div>
                            )}

                            <Select
                                label="Keputusan Tindakan Moderasi"
                                required
                                value={reportForm.data.action}
                                onChange={(e) => reportForm.setData('action', e.target.value)}
                                error={reportForm.errors.action}
                                options={[
                                    { value: 'HIDE_POST', label: 'Sembunyikan Postingan dari Komunitas (HIDE_POST)' },
                                    { value: 'DELETE_POST', label: 'Hapus Postingan Permanen (DELETE_POST)' },
                                    { value: 'WARN_USER', label: 'Kirim Peringatan ke Penulis (WARN_USER)' },
                                    { value: 'DISMISS', label: 'Tolak Aduan (Tidak Melanggar Pedoman)' },
                                ]}
                            />

                            <Textarea
                                label="Catatan Justifikasi Moderasi (Audit Trail)"
                                placeholder="Tuliskan justifikasi keputusan moderasi untuk rekam jejak audit..."
                                value={reportForm.data.resolution_notes}
                                onChange={(e) => reportForm.setData('resolution_notes', e.target.value)}
                                error={reportForm.errors.resolution_notes}
                                rows={3}
                            />
                        </form>
                    )}
                </Modal>

                {/* DELETE POST CONFIRM MODAL */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingPost}
                    onClose={() => setDeletingPost(null)}
                    onConfirm={handleDeletePostConfirm}
                    title="Hapus Postingan Komunitas"
                    message="Apakah Anda yakin ingin menghapus postingan komunitas ini beserta seluruh komentarnya secara permanen?"
                    itemName={deletingPost ? deletingPost.title : ''}
                />

                {/* DELETE COMMENT CONFIRM MODAL */}
                <AdminDeleteConfirmModal
                    isOpen={!!deletingComment}
                    onClose={() => setDeletingComment(null)}
                    onConfirm={handleDeleteCommentConfirm}
                    title="Hapus Komentar Komunitas"
                    message="Apakah Anda yakin ingin menghapus komentar ini?"
                    itemName={deletingComment ? deletingComment.body : ''}
                />
            </div>
        </AdminLayout>
    );
}
