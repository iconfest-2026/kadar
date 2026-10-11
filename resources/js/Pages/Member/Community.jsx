import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Community({
    profile,
    posts = { data: [], links: [] },
    activeCategory = 'all',
    search: initialSearch = '',
    categoryCounts = {},
    topContributors = [],
    userTotalPoints = 0,
    currentUser = {},
}) {
    // Search state
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    // Create post drawer
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('1'); // 1=Nutrition, 2=Remission, 3=Fitness, 4=Consultation
    const [submittingPost, setSubmittingPost] = useState(false);

    // Edit post state
    const [editingPost, setEditingPost] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [editCategory, setEditCategory] = useState('1');
    const [submittingEdit, setSubmittingEdit] = useState(false);

    // Delete post state
    const [deletingPost, setDeletingPost] = useState(null);

    // Report post state
    const [reportingPost, setReportingPost] = useState(null);
    const [reportReason, setReportReason] = useState('MEDICAL_MISINFO');
    const [reportDescription, setReportDescription] = useState('');
    const [submittingReport, setSubmittingReport] = useState(false);

    // Comment inputs state map: { [postId]: string }
    const [commentTexts, setCommentTexts] = useState({});
    const [submittingComment, setSubmittingComment] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

    const categories = [
        { id: 'all', numId: null, label: 'Semua', icon: 'forum', count: categoryCounts.all || 0 },
        { id: 'nutrition', numId: 1, label: 'Nutrisi & Resep', icon: 'restaurant', count: categoryCounts.nutrition || 0 },
        { id: 'remission', numId: 2, label: 'Kisah Remisi', icon: 'favorite', count: categoryCounts.remission || 0 },
        { id: 'fitness', numId: 3, label: 'Langkah & Olahraga', icon: 'directions_run', count: categoryCounts.fitness || 0 },
        { id: 'consultation', numId: 4, label: 'Tanya Dokter', icon: 'medical_services', count: categoryCounts.consultation || 0 },
        { id: 'announcement', numId: 5, label: 'Pengumuman', icon: 'campaign', count: categoryCounts.announcement || 0 },
    ];

    const categoryNames = {
        1: 'Nutrisi & Resep',
        2: 'Kisah Remisi',
        3: 'Langkah & Olahraga',
        4: 'Tanya Dokter',
        5: 'Pengumuman Resmi',
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/member/community', {
            category: activeCategory,
            search: searchTerm,
        }, { preserveState: true });
    };

    const handleCategoryClick = (catId) => {
        router.get('/member/community', {
            category: catId,
            search: searchTerm,
        }, { preserveState: true });
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        setSubmittingPost(true);
        router.post('/member/community/post', {
            title,
            body,
            category_id: parseInt(category, 10),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setTitle('');
                setBody('');
                setIsCreatingPost(false);
            },
            onFinish: () => setSubmittingPost(false),
        });
    };

    const handleOpenEdit = (post) => {
        setEditingPost(post);
        setEditTitle(post.title);
        setEditBody(post.body);
        setEditCategory(String(post.category_id || 1));
    };

    const handleUpdatePost = (e) => {
        e.preventDefault();
        if (!editingPost || !editTitle.trim() || !editBody.trim()) return;

        setSubmittingEdit(true);
        router.patch(`/member/community/posts/${editingPost.id}`, {
            title: editTitle,
            body: editBody,
            category_id: parseInt(editCategory, 10),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditingPost(null);
            },
            onFinish: () => setSubmittingEdit(false),
        });
    };

    const handleDeletePost = () => {
        if (!deletingPost) return;
        router.delete(`/member/community/posts/${deletingPost.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeletingPost(null),
        });
    };

    const handleReaction = (postId, reactionType) => {
        router.post('/member/community/react', {
            post_id: postId,
            reaction_type: reactionType,
        }, {
            preserveScroll: true,
        });
    };

    const handleCommentSubmit = (postId) => {
        const text = commentTexts[postId];
        if (!text || !text.trim()) return;

        setSubmittingComment((prev) => ({ ...prev, [postId]: true }));
        router.post('/member/community/comment', {
            post_id: postId,
            body: text,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
                setExpandedComments((prev) => ({ ...prev, [postId]: true }));
            },
            onFinish: () => setSubmittingComment((prev) => ({ ...prev, [postId]: false })),
        });
    };

    const handleDeleteComment = (commentId) => {
        if (!confirm('Hapus komentar Anda?')) return;
        router.delete(`/member/community/comments/${commentId}`, {
            preserveScroll: true,
        });
    };

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (!reportingPost) return;

        setSubmittingReport(true);
        router.post(`/member/community/posts/${reportingPost.id}/report`, {
            reason: reportReason,
            description: reportDescription,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setReportingPost(null);
                setReportDescription('');
            },
            onFinish: () => setSubmittingReport(false),
        });
    };

    const toggleExpandComments = (postId) => {
        setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const postItems = posts?.data || [];

    return (
        <AppLayout title="Komunitas" activeTab="community">
            <Head title="Forum Komunitas - AEVYRA" />

            <div className="max-w-2xl mx-auto px-4 py-4 space-y-4 pb-12">

                {/* 1. Header Ringkas ala Dashboard */}
                <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <span className="text-[10px] font-label-mono text-emerald-200 uppercase font-bold tracking-wider block">
                                Forum Komunitas
                            </span>
                            <h1 className="font-heading font-black text-lg sm:text-xl truncate leading-tight">
                                Berbagi Pengalaman Sehat
                            </h1>
                            <p className="text-[11px] text-white/80 mt-0.5">
                                Ruang diskusi, kiat nutrisi, dan saling menyemangati
                            </p>
                        </div>

                        {/* Poin & Tombol Tulis */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="px-2.5 py-1.5 rounded-xl bg-black/20 border border-white/10 text-center">
                                <span className="material-symbols-outlined text-amber-300 text-[16px] block">stars</span>
                                <span className="font-mono font-bold text-xs leading-none block mt-0.5">
                                    {userTotalPoints}p
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(!isCreatingPost)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-primary font-bold text-xs shadow-xs hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {isCreatingPost ? 'close' : 'edit_square'}
                                </span>
                                <span className="hidden sm:inline">
                                    {isCreatingPost ? 'Batal' : 'Tulis'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Formulir Tulis Cerita (Kompak & Minimalis) */}
                {isCreatingPost && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-primary/30 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-surface-container pb-2">
                            <h3 className="font-heading font-bold text-xs text-primary flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                <span>Tulis Diskusi Baru</span>
                            </h3>
                            <span className="text-[10px] font-label-mono text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-md font-bold">
                                +20 Poin
                            </span>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-2.5">
                            <div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="1">Nutrisi &amp; Resep Sehat</option>
                                    <option value="2">Kisah Remisi Pra-Diabetes</option>
                                    <option value="3">Langkah &amp; Olahraga</option>
                                    <option value="4">Tanya Dokter &amp; Coach</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Judul topik atau pengalaman Anda..."
                                    className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                    maxLength={200}
                                />
                            </div>

                            <div>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    rows={3}
                                    placeholder="Tulis cerita, menu makanan, atau pertanyaan Anda..."
                                    className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                    maxLength={3000}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setIsCreatingPost(false)}
                                    className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingPost}
                                    className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[15px]">send</span>
                                    <span>{submittingPost ? 'Mengirim...' : 'Kirim'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* 3. Kolom Pencarian Singkat */}
                <form onSubmit={handleSearchSubmit} className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                        search
                    </span>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari topik diskusi atau nama anggota..."
                        className="w-full pl-9 pr-16 py-2 rounded-xl border border-surface-container bg-white dark:bg-surface text-xs text-on-surface shadow-2xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm('');
                                router.get('/member/community', { category: activeCategory, search: '' }, { preserveState: true });
                            }}
                            className="absolute right-12 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs"
                        >
                            <span className="material-symbols-outlined text-[15px]">close</span>
                        </button>
                    )}
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-primary text-white text-[10px] font-bold"
                    >
                        Cari
                    </button>
                </form>

                {/* 4. Filter Kategori Geser Ringkas */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    {categories.map((c) => {
                        const isSelected = activeCategory === c.id;
                        return (
                            <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCategoryClick(c.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                                    isSelected
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[15px]">{c.icon}</span>
                                <span>{c.label}</span>
                                {c.count > 0 && (
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                                        isSelected ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                                    }`}>
                                        {c.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* 5. Daftar Kiriman Komunitas (Feed Kartu Kompak) */}
                <div className="space-y-3">
                    {postItems.length > 0 ? (
                        postItems.map((post) => {
                            const isCommentsOpen = !!expandedComments[post.id];
                            const comments = post.comments || [];
                            const reactions = post.reactions || [];

                            const likeCount = reactions.filter((r) => r.reaction_type === 'LIKE').length;
                            const supportCount = reactions.filter((r) => r.reaction_type === 'SUPPORT').length;
                            const celebrateCount = reactions.filter((r) => r.reaction_type === 'CELEBRATE').length;
                            const totalReactions = reactions.length;

                            const userReaction = post.user_reaction;
                            const isOwner = post.is_owner || post.user_id === currentUser?.id;
                            const authorRole = post.user?.roles?.[0]?.slug || 'member';
                            const isOfficial = post.category_id === 5 || authorRole === 'admin';
                            const isDoctor = authorRole === 'instructor';

                            return (
                                <div
                                    key={post.id}
                                    className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-2.5 transition-all"
                                >
                                    {/* Author & Kategori */}
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                                isDoctor
                                                    ? 'bg-teal-500/15 text-teal-700'
                                                    : isOfficial
                                                    ? 'bg-amber-500/15 text-amber-700'
                                                    : 'bg-primary/10 text-primary'
                                            }`}>
                                                {post.user?.name?.charAt(0) || 'U'}
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-bold text-xs text-on-surface truncate">
                                                        {post.user?.name || 'Member'}
                                                    </span>
                                                    {isDoctor && (
                                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-teal-500/15 text-teal-800 dark:text-teal-300">
                                                            Dokter
                                                        </span>
                                                    )}
                                                    {isOfficial && !isDoctor && (
                                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                                                            Resmi
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant font-label-mono">
                                                    <span>
                                                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                        })}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="text-primary font-semibold truncate">
                                                        {categoryNames[post.category_id] || 'Komunitas'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Aksi Postingan (Edit / Hapus / Lapor) */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            {isOwner ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenEdit(post)}
                                                        className="p-1 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                                                        title="Edit"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">edit</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDeletingPost(post)}
                                                        className="p-1 rounded-lg text-on-surface-variant hover:text-rose-600 transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">delete</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setReportingPost(post);
                                                        setReportReason('MEDICAL_MISINFO');
                                                        setReportDescription('');
                                                    }}
                                                    className="p-1 rounded-lg text-on-surface-variant hover:text-rose-600 transition-colors"
                                                    title="Laporkan"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">flag</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Judul & Isi Pesan */}
                                    <div className="space-y-1">
                                        <h3 className="font-heading font-bold text-xs sm:text-sm text-on-surface leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-4 whitespace-pre-line">
                                            {post.body}
                                        </p>
                                    </div>

                                    {/* Bar Reaksi & Komentar Ringkas */}
                                    <div className="pt-2 border-t border-surface-container flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1">
                                            <button
                                                type="button"
                                                onClick={() => handleReaction(post.id, 'LIKE')}
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                                                    userReaction === 'LIKE'
                                                        ? 'bg-rose-500 text-white shadow-2xs'
                                                        : 'bg-surface-container-low text-on-surface-variant hover:bg-rose-500/10 hover:text-rose-600'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[14px]">favorite</span>
                                                <span>{likeCount || 0}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleReaction(post.id, 'SUPPORT')}
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                                                    userReaction === 'SUPPORT'
                                                        ? 'bg-sky-500 text-white shadow-2xs'
                                                        : 'bg-surface-container-low text-on-surface-variant hover:bg-sky-500/10 hover:text-sky-600'
                                                }`}
                                                title="Semangat"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">fitness_center</span>
                                                <span>{supportCount || 0}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleReaction(post.id, 'CELEBRATE')}
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                                                    userReaction === 'CELEBRATE'
                                                        ? 'bg-amber-500 text-white shadow-2xs'
                                                        : 'bg-surface-container-low text-on-surface-variant hover:bg-amber-500/10 hover:text-amber-600'
                                                }`}
                                                title="Keren"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">hotel_class</span>
                                                <span>{celebrateCount || 0}</span>
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => toggleExpandComments(post.id)}
                                            className="inline-flex items-center gap-1 text-[11px] font-bold text-on-surface-variant hover:text-primary py-1 px-2 rounded-lg bg-surface-container-low transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">chat_bubble_outline</span>
                                            <span>{comments.length} Balasan</span>
                                        </button>
                                    </div>

                                    {/* Kolom Balasan Komentar (Bila Dibuka) */}
                                    {isCommentsOpen && (
                                        <div className="pt-2 border-t border-surface-container space-y-2 bg-surface-container-low p-3 rounded-xl animate-fade-in text-xs">
                                            {comments.length > 0 ? (
                                                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                                                    {comments.map((comm) => {
                                                        const isCommOwner = comm.user_id === currentUser?.id;
                                                        return (
                                                            <div
                                                                key={comm.id}
                                                                className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container space-y-1"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-1.5">
                                                                        <span className="font-bold text-on-surface">
                                                                            {comm.user?.name || 'Anggota'}
                                                                        </span>
                                                                        <span className="text-[9px] text-on-surface-variant font-label-mono">
                                                                            {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                                                        </span>
                                                                    </div>
                                                                    {isCommOwner && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleDeleteComment(comm.id)}
                                                                            className="text-on-surface-variant hover:text-rose-600 p-0.5"
                                                                        >
                                                                            <span className="material-symbols-outlined text-[13px]">delete</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                                <p className="text-on-surface-variant leading-relaxed">
                                                                    {comm.body}
                                                                </p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-on-surface-variant italic py-1 text-center text-[11px]">
                                                    Belum ada balasan. Jadilah yang pertama memberi tanggapan.
                                                </p>
                                            )}

                                            {/* Input Balasan Cepat */}
                                            <div className="flex gap-1.5 pt-1">
                                                <input
                                                    type="text"
                                                    value={commentTexts[post.id] || ''}
                                                    onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                                                    placeholder="Tulis balasan..."
                                                    className="flex-1 p-2 rounded-xl border border-surface-container bg-white dark:bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleCommentSubmit(post.id);
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleCommentSubmit(post.id)}
                                                    disabled={submittingComment[post.id]}
                                                    className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow-2xs hover:bg-primary-container disabled:opacity-50 flex items-center gap-1 shrink-0"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">send</span>
                                                    <span>Kirim</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center rounded-2xl border border-dashed border-surface-container bg-surface-container-low space-y-2">
                            <span className="material-symbols-outlined text-3xl text-on-surface-variant">forum</span>
                            <h4 className="font-bold text-xs text-on-surface">Belum ada diskusi di kategori ini</h4>
                            <p className="text-[11px] text-on-surface-variant max-w-xs mx-auto">
                                Jadilah inisiator pertama yang membagikan pengalaman kesehatan hari ini.
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(true)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span>
                                <span>Tulis Topik</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* 6. Info Ringkas Panduan Medis (Footer Singkat) */}
                <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-2 text-[11px] text-on-surface-variant">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-teal-600 text-[18px]">verified_user</span>
                        <span>Seluruh kiriman dipantau demi keselamatan informasi medis.</span>
                    </div>
                </div>

                {/* MODAL EDIT POST */}
                {editingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-2xl p-5 max-w-md w-full space-y-3 shadow-xl border border-surface-container animate-scale-up text-xs">
                            <div className="flex items-center justify-between border-b border-surface-container pb-2">
                                <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-primary text-[18px]">edit</span>
                                    <span>Edit Diskusi</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleUpdatePost} className="space-y-3">
                                <div>
                                    <label className="text-[11px] font-bold text-on-surface block mb-1">Kategori:</label>
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="1">Nutrisi &amp; Resep Sehat</option>
                                        <option value="2">Kisah Remisi Pra-Diabetes</option>
                                        <option value="3">Langkah &amp; Olahraga</option>
                                        <option value="4">Tanya Dokter &amp; Coach</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-on-surface block mb-1">Judul:</label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                        maxLength={200}
                                    />
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-on-surface block mb-1">Isi:</label>
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        rows={4}
                                        className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                        maxLength={3000}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setEditingPost(null)}
                                        className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingEdit}
                                        className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container disabled:opacity-50"
                                    >
                                        {submittingEdit ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MODAL HAPUS POST */}
                {deletingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-2xl p-5 max-w-xs w-full space-y-3 shadow-xl border border-surface-container animate-scale-up text-xs">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">delete</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-sm text-on-surface">Hapus Postingan?</h3>
                                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                                    Postingan "{deletingPost.title}" beserta komentarnya akan dihapus permanen.
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setDeletingPost(null)}
                                    className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeletePost}
                                    className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-2xs hover:bg-rose-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODAL LAPORKAN POST */}
                {reportingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-2xl p-5 max-w-sm w-full space-y-3 shadow-xl border border-surface-container animate-scale-up text-xs">
                            <div className="flex items-center justify-between border-b border-surface-container pb-2">
                                <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-rose-500 text-[18px]">report</span>
                                    <span>Laporkan Konten</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setReportingPost(null)}
                                    className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleReportSubmit} className="space-y-3">
                                <div>
                                    <label className="text-[11px] font-bold text-on-surface block mb-1">Jenis Pelanggaran:</label>
                                    <select
                                        value={reportReason}
                                        onChange={(e) => setReportReason(e.target.value)}
                                        className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="MEDICAL_MISINFO">Informasi Medis Menyesatkan / Obat Terlarang</option>
                                        <option value="SPAM">Spam / Promosi Komersial</option>
                                        <option value="HATE">Ujaran Kebencian / Pelecehan</option>
                                        <option value="PRIVACY_VIOLATION">Pelanggaran Privasi Data</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[11px] font-bold text-on-surface block mb-1">Keterangan (Opsional):</label>
                                    <textarea
                                        value={reportDescription}
                                        onChange={(e) => setReportDescription(e.target.value)}
                                        rows={2}
                                        placeholder="Tuliskan alasan laporan..."
                                        className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        maxLength={1000}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setReportingPost(null)}
                                        className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingReport}
                                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-2xs hover:bg-rose-700 disabled:opacity-50"
                                    >
                                        {submittingReport ? 'Mengirim...' : 'Kirim Laporan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
