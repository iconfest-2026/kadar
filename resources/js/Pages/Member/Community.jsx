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

    // Create post state
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
        { id: 'all', numId: null, label: 'Semua Diskusi', icon: 'forum', count: categoryCounts.all || 0 },
        { id: 'nutrition', numId: 1, label: 'Nutrisi & Resep Sehat', icon: 'restaurant', count: categoryCounts.nutrition || 0 },
        { id: 'remission', numId: 2, label: 'Kisah Remisi Pra-Diabetes', icon: 'favorite', count: categoryCounts.remission || 0 },
        { id: 'fitness', numId: 3, label: 'Langkah & Olahraga', icon: 'directions_run', count: categoryCounts.fitness || 0 },
        { id: 'consultation', numId: 4, label: 'Tanya Dokter & Coach', icon: 'medical_services', count: categoryCounts.consultation || 0 },
        { id: 'announcement', numId: 5, label: 'Pengumuman Resmi', icon: 'campaign', count: categoryCounts.announcement || 0 },
    ];

    const categoryNames = {
        1: 'Nutrisi & Resep Sehat',
        2: 'Kisah Remisi Pra-Diabetes',
        3: 'Langkah & Olahraga',
        4: 'Tanya Dokter & Coach',
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
        if (!confirm('Hapus balasan komentar Anda?')) return;
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
        <AppLayout title="Komunitas & Forum Diskusi" activeTab="community">
            <Head title="Komunitas Sehat & Forum Diskusi - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

                {/* Hero Header Card */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-xs">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-3xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-emerald-300">groups</span>
                            <span>FORUM KOMUNITAS SEHAT • AKUNTABILITAS SOSIAL & DUKUNGAN TEMAN SEBAYA</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Ruang Berbagi Nyata: Anda Tidak Sendiri Menghadapi Pra-Diabetes
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Riset membuktikan akuntabilitas sebaya meningkatkan konsistensi gaya hidup sehat sebesar 65%. Bagikan resep rendah glikemik, inspirasi penurunan HbA1c, dan diskusikan kebiasaan baik bersama sesama pejuang kesehatan dalam lingkungan aman yang dimoderasi.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(!isCreatingPost)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-bold text-xs shadow-xs hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {isCreatingPost ? 'close' : 'add_circle'}
                                </span>
                                <span>{isCreatingPost ? 'Tutup Formulir' : 'Tulis Cerita / Diskusi (+20 Poin)'}</span>
                            </button>

                            <div className="flex items-center gap-2 text-white/90 text-xs px-3 py-2 rounded-xl bg-black/15 backdrop-blur-xs">
                                <span className="material-symbols-outlined text-amber-300 text-[18px]">stars</span>
                                <span>Poin Komunitas Anda: <strong className="font-mono text-amber-200">{userTotalPoints} Poin</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar & Stats Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-surface p-3 sm:p-4 rounded-2xl border border-surface-container shadow-2xs">
                    <form onSubmit={handleSearchSubmit} className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari topik diskusi, resep, kata kunci atau nama anggota..."
                            className="w-full pl-9 pr-20 py-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm('');
                                    router.get('/member/community', { category: activeCategory, search: '' }, { preserveState: true });
                                }}
                                className="absolute right-12 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        )}
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-primary text-white text-[10px] font-bold"
                        >
                            Cari
                        </button>
                    </form>

                    <div className="flex items-center gap-2 text-[11px] text-on-surface-variant px-2 shrink-0">
                        <span className="material-symbols-outlined text-teal-600 text-[16px]">verified_user</span>
                        <span>Seluruh kiriman dipantau demi keselamatan medis.</span>
                    </div>
                </div>

                {/* Create Post Card Drawer */}
                {isCreatingPost && (
                    <div className="p-6 rounded-3xl bg-white dark:bg-surface border-2 border-primary/20 shadow-xs space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined">edit_note</span>
                                <span>Bagikan Pengalaman / Buka Topik Diskusi Sehat</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(false)}
                                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs text-teal-900 dark:text-teal-200 flex items-start gap-2.5">
                            <span className="material-symbols-outlined text-teal-600 text-[18px] mt-0.5">health_and_safety</span>
                            <div>
                                <p className="font-bold">Pedoman Keselamatan Medis AEVYRA:</p>
                                <p className="mt-0.5">
                                    Ceritakan pengalaman gaya hidup pribadi Anda. Dilarang mempromosikan obat keras tanpa resep, produk herbal tanpa izin BPOM, atau klaim penyembuhan instan. Jaga privasi data medis personal Anda.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Kategori Topik:</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="1">Nutrisi & Resep Sehat</option>
                                        <option value="2">Kisah Remisi Pra-Diabetes</option>
                                        <option value="3">Langkah & Olahraga</option>
                                        <option value="4">Tanya Dokter & Health Coach</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Imbalan Kontribusi:</label>
                                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs font-semibold text-amber-800 dark:text-amber-200 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-amber-500 text-[18px]">stars</span>
                                        <span>Dapatkan <strong>+20 Poin</strong> saat berhasil dipublikasikan!</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface block">Judul Diskusi:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Contoh: Menu sarapan oat & chia seed yang tidak bikin gula darah saya melonjak..."
                                    className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                    maxLength={200}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface block">Isi Cerita / Pengalaman / Pertanyaan:</label>
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    rows={5}
                                    placeholder="Ceritakan bahan resep, perubahan rutinitas, tips menghadapi keinginan makan manis, atau pertanyaan untuk sesama anggota..."
                                    className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                    maxLength={3000}
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreatingPost(false)}
                                    className="px-4 py-2 rounded-xl border border-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-low cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submittingPost}
                                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">send</span>
                                    <span>{submittingPost ? 'Menerbitkan...' : 'Publikasikan ke Komunitas'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Category Pills Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            type="button"
                            onClick={() => handleCategoryClick(c.id)}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
                                activeCategory === c.id
                                    ? 'bg-primary text-white shadow-2xs ring-2 ring-primary/20'
                                    : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface hover:border-primary/30'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                            <span>{c.label}</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                                activeCategory === c.id ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                            }`}>
                                {c.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Posts Feed (2 Cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        {postItems.length > 0 ? (
                            postItems.map((post) => {
                                const isCommentsOpen = !!expandedComments[post.id];
                                const comments = post.comments || [];
                                const reactions = post.reactions || [];

                                const likeCount = reactions.filter((r) => r.reaction_type === 'LIKE').length;
                                const supportCount = reactions.filter((r) => r.reaction_type === 'SUPPORT').length;
                                const celebrateCount = reactions.filter((r) => r.reaction_type === 'CELEBRATE').length;
                                const empathyCount = reactions.filter((r) => r.reaction_type === 'EMPATHY').length;

                                const userReaction = post.user_reaction;
                                const isOwner = post.is_owner || post.user_id === currentUser?.id;
                                const authorRole = post.user?.roles?.[0]?.slug || 'member';
                                const isOfficial = post.category_id === 5 || authorRole === 'admin';
                                const isDoctor = authorRole === 'instructor';

                                return (
                                    <div
                                        key={post.id}
                                        className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border transition-all shadow-xs space-y-4 ${
                                            isOfficial
                                                ? 'border-amber-400/40 bg-amber-50/15 dark:bg-amber-950/10'
                                                : 'border-surface-container hover:border-primary/30'
                                        }`}
                                    >
                                        {/* Post Author Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs ${
                                                    isDoctor
                                                        ? 'bg-teal-500/15 border border-teal-500/30 text-teal-700'
                                                        : isOfficial
                                                        ? 'bg-amber-500/15 border border-amber-500/30 text-amber-700'
                                                        : 'bg-primary/10 border border-primary/20 text-primary'
                                                }`}>
                                                    {post.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-bold text-xs sm:text-sm text-on-surface">
                                                            {post.user?.name || 'Member Komunitas'}
                                                        </span>

                                                        {isDoctor && (
                                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/15 text-teal-800 dark:text-teal-300 flex items-center gap-0.5">
                                                                <span className="material-symbols-outlined text-[12px]">medical_services</span>
                                                                Dokter / Coach
                                                            </span>
                                                        )}

                                                        {isOfficial && !isDoctor && (
                                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 flex items-center gap-0.5">
                                                                <span className="material-symbols-outlined text-[12px]">verified</span>
                                                                Resmi AEVYRA
                                                            </span>
                                                        )}

                                                        {!isDoctor && !isOfficial && (
                                                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/10 text-primary">
                                                                Member Aktif
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[10px] text-on-surface-variant font-label-mono">
                                                            {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                                year: 'numeric',
                                                            })}
                                                        </span>
                                                        <span className="text-[10px] text-on-surface-variant">•</span>
                                                        <span className="text-[10px] font-semibold text-teal-700 dark:text-teal-300">
                                                            {categoryNames[post.category_id] || 'Komunitas'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Dropdown / Menu */}
                                            <div className="flex items-center gap-1">
                                                {isOwner ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleOpenEdit(post)}
                                                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container cursor-pointer transition-colors"
                                                            title="Edit Postingan"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setDeletingPost(post)}
                                                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                                            title="Hapus Postingan"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
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
                                                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                                        title="Laporkan Postingan ke Tim Medis"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">flag</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="space-y-2">
                                            <h3 className="font-heading font-black text-sm sm:text-base text-on-surface">
                                                {post.title}
                                            </h3>
                                            <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line">
                                                {post.body}
                                            </p>
                                        </div>

                                        {/* Reactions & Comment Bar */}
                                        <div className="pt-3 border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs">
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'LIKE')}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-[11px] transition-all cursor-pointer ${
                                                        userReaction === 'LIKE'
                                                            ? 'bg-rose-500 text-white shadow-2xs scale-105'
                                                            : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20'
                                                    }`}
                                                    title="Suka postingan ini"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">favorite</span>
                                                    <span>Suka</span>
                                                    <span className="font-mono font-bold">{likeCount}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'SUPPORT')}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-[11px] transition-all cursor-pointer ${
                                                        userReaction === 'SUPPORT'
                                                            ? 'bg-sky-500 text-white shadow-2xs scale-105'
                                                            : 'bg-sky-500/10 text-sky-700 dark:text-sky-400 hover:bg-sky-500/20'
                                                    }`}
                                                    title="Beri semangat"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">fitness_center</span>
                                                    <span>Semangat</span>
                                                    <span className="font-mono font-bold">{supportCount}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'CELEBRATE')}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-[11px] transition-all cursor-pointer ${
                                                        userReaction === 'CELEBRATE'
                                                            ? 'bg-amber-500 text-white shadow-2xs scale-105'
                                                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20'
                                                    }`}
                                                    title="Rayakan keberhasilan"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">hotel_class</span>
                                                    <span>Keren</span>
                                                    <span className="font-mono font-bold">{celebrateCount}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'EMPATHY')}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-[11px] transition-all cursor-pointer ${
                                                        userReaction === 'EMPATHY'
                                                            ? 'bg-teal-600 text-white shadow-2xs scale-105'
                                                            : 'bg-teal-500/10 text-teal-700 dark:text-teal-400 hover:bg-teal-500/20'
                                                    }`}
                                                    title="Dukungan empati"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
                                                    <span>Empati</span>
                                                    <span className="font-mono font-bold">{empathyCount}</span>
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleExpandComments(post.id)}
                                                className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-semibold text-xs py-1.5 px-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                                                <span>{comments.length} Balasan Diskusi</span>
                                            </button>
                                        </div>

                                        {/* Comments Drawer */}
                                        {isCommentsOpen && (
                                            <div className="pt-3 border-t border-surface-container space-y-3 bg-surface-container-low p-4 rounded-2xl animate-fade-in">
                                                {comments.length > 0 ? (
                                                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                                                        {comments.map((comm) => {
                                                            const commAuthorRole = comm.user?.roles?.[0]?.slug || 'member';
                                                            const isCommOwner = comm.user_id === currentUser?.id;

                                                            return (
                                                                <div
                                                                    key={comm.id}
                                                                    className="p-3 rounded-xl bg-white dark:bg-surface border border-surface-container text-xs space-y-1.5"
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="font-bold text-on-surface">
                                                                                {comm.user?.name || 'Anggota'}
                                                                            </span>

                                                                            {commAuthorRole === 'instructor' && (
                                                                                <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-teal-500/15 text-teal-800 dark:text-teal-300">
                                                                                    Dokter/Coach
                                                                                </span>
                                                                            )}

                                                                            {commAuthorRole === 'admin' && (
                                                                                <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                                                                                    Admin
                                                                                </span>
                                                                            )}

                                                                            <span className="text-[10px] text-on-surface-variant font-label-mono">
                                                                                {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                                                            </span>
                                                                        </div>

                                                                        {isCommOwner && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => handleDeleteComment(comm.id)}
                                                                                className="text-on-surface-variant hover:text-rose-600 p-1"
                                                                                title="Hapus komentar"
                                                                            >
                                                                                <span className="material-symbols-outlined text-[14px]">delete</span>
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
                                                    <p className="text-xs text-on-surface-variant italic py-2 text-center">
                                                        Belum ada balasan. Jadilah yang pertama memberikan saran atau tanggapan suportif!
                                                    </p>
                                                )}

                                                {/* Add Comment Input Bar */}
                                                <div className="flex gap-2 pt-1">
                                                    <input
                                                        type="text"
                                                        value={commentTexts[post.id] || ''}
                                                        onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                                                        placeholder="Tulis balasan suportif atau bagikan tips serupa..."
                                                        className="flex-1 p-2.5 rounded-xl border border-surface-container bg-white dark:bg-surface text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleCommentSubmit(post.id);
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCommentSubmit(post.id)}
                                                        disabled={submittingComment[post.id]}
                                                        className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">send</span>
                                                        <span>Kirim (+5 Poin)</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-12 text-center rounded-3xl border border-dashed border-surface-container bg-surface-container-low space-y-3">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">chat</span>
                                <h4 className="font-bold text-sm text-on-surface">Tidak ada postingan yang sesuai</h4>
                                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                    Belum ada cerita dalam kategori ini atau hasil pencarian tidak ditemukan. Jadilah inisiator diskusi pertama!
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setIsCreatingPost(true)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]">add</span>
                                    <span>Tulis Cerita Baru</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Guidelines, Top Contributors, Safety (1 Col) */}
                    <div className="space-y-5">

                        {/* Medical Compliance & Guidelines Card */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3.5">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[22px]">health_and_safety</span>
                                <h3 className="font-heading font-bold text-sm text-on-surface">
                                    Prinsip Komunitas Sehat AEVYRA
                                </h3>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Forum ini memfasilitasi pertukaran inspirasi kebiasaan harian, bukan tempat diagnosis klinis mandiri atau pengganti dokter.
                            </p>
                            <ul className="text-xs text-on-surface-variant space-y-2.5 leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
                                    <span><strong>Panduan Ilmiah:</strong> Bagikan tips nutrisi mengacu panduan resmi PERKENI & Kemenkes RI.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
                                    <span><strong>Privasi Terjaga:</strong> Dilarang mengunggah data medis anggota lain tanpa izin sadar.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-rose-500 shrink-0 mt-0.5">cancel</span>
                                    <span><strong>Nir-Obat Terlarang:</strong> Dilarang mempromosikan obat keras atau klaim kesembuhan instan.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Top Contributors Card */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500 text-[22px]">military_tech</span>
                                    <h3 className="font-heading font-bold text-sm text-on-surface">
                                        Pahlawan Komunitas
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                                    Bulan Ini
                                </span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Anggota yang paling aktif menginspirasi dan memberikan respon suportif kepada rekan pejuang sehat:
                            </p>

                            <div className="space-y-2.5 pt-1">
                                {topContributors.length > 0 ? (
                                    topContributors.map((c, idx) => (
                                        <div key={c.id} className="flex items-center justify-between p-2.5 rounded-2xl bg-surface-container-low border border-surface-container text-xs">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-[10px]">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">{c.name}</p>
                                                    <p className="text-[10px] text-on-surface-variant">{c.community_posts_count} Cerita Berbagi</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-lg">
                                                Inspirator
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-3 rounded-2xl bg-surface-container-low text-xs text-on-surface-variant text-center">
                                        Jadilah anggota pertama yang menginspirasi bulan ini!
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gamification Points Ledger Card */}
                        <div className="p-6 rounded-3xl bg-linear-to-br from-teal-900 via-primary to-teal-950 text-white shadow-xs space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-300 text-[20px]">workspace_premium</span>
                                <h4 className="font-heading font-bold text-sm">Reward Gamifikasi Komunitas</h4>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed">
                                Setiap kontribusi Anda di forum dihargai dengan poin AEVYRA:
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-white/70">Bagikan Cerita</p>
                                    <p className="font-bold text-amber-300">+20 Poin</p>
                                </div>
                                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                                    <p className="text-[10px] text-white/70">Komentar Balasan</p>
                                    <p className="font-bold text-amber-300">+5 Poin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDIT POST MODAL */}
                {editingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-surface-container animate-scale-up">
                            <div className="flex items-center justify-between border-b border-surface-container pb-3">
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">edit</span>
                                    <span>Edit Postingan Komunitas</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setEditingPost(null)}
                                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleUpdatePost} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Kategori Topik:</label>
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="1">Nutrisi & Resep Sehat</option>
                                        <option value="2">Kisah Remisi Pra-Diabetes</option>
                                        <option value="3">Langkah & Olahraga</option>
                                        <option value="4">Tanya Dokter & Coach</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Judul Diskusi:</label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                        maxLength={200}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Isi Cerita:</label>
                                    <textarea
                                        value={editBody}
                                        onChange={(e) => setEditBody(e.target.value)}
                                        rows={5}
                                        className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                        maxLength={3000}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditingPost(null)}
                                        className="px-4 py-2 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingEdit}
                                        className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                                    >
                                        {submittingEdit ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* DELETE POST CONFIRM MODAL */}
                {deletingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-surface-container animate-scale-up">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">delete</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface">Hapus Postingan Komunitas?</h3>
                                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                                    Postingan <strong>"{deletingPost.title}"</strong> beserta seluruh komentar terkait akan dihapus secara permanen.
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setDeletingPost(null)}
                                    className="px-4 py-2 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeletePost}
                                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                                >
                                    Hapus Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* REPORT POST MODAL */}
                {reportingPost && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl border border-surface-container animate-scale-up">
                            <div className="flex items-center justify-between border-b border-surface-container pb-3">
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-rose-500">report</span>
                                    <span>Laporkan Pelanggaran Konten</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setReportingPost(null)}
                                    className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>

                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Identitas pelapor dirahasiakan 100%. Laporan Anda akan ditinjau langsung oleh tim medis & moderator AEVYRA.
                            </p>

                            <form onSubmit={handleReportSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Jenis Pelanggaran:</label>
                                    <select
                                        value={reportReason}
                                        onChange={(e) => setReportReason(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="MEDICAL_MISINFO">Klaim Medis Berbahaya / Obat Tanpa Izin</option>
                                        <option value="SPAM">Spam / Iklan Komersial Terlarang</option>
                                        <option value="HATE">Ujaran Kebencian / Pelecehan / Perundungan</option>
                                        <option value="PRIVACY_VIOLATION">Pelanggaran Privasi / Membocorkan Data Medis</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">Keterangan Tambahan (Opsional):</label>
                                    <textarea
                                        value={reportDescription}
                                        onChange={(e) => setReportDescription(e.target.value)}
                                        rows={3}
                                        placeholder="Jelaskan alasan laporan atau bagian yang melanggar pedoman..."
                                        className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        maxLength={1000}
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setReportingPost(null)}
                                        className="px-4 py-2 rounded-xl border border-surface-container text-xs font-semibold hover:bg-surface-container-low"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submittingReport}
                                        className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
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
