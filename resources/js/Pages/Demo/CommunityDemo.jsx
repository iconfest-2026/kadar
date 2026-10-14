import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function CommunityDemo({
    posts = null,
    activeCategory = 'ALL',
    search = '',
    categoryCounts = null,
}) {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const [selectedTag, setSelectedTag] = useState(activeCategory || 'ALL');
    const [searchQuery, setSearchQuery] = useState(search || '');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newPostSuccess, setNewPostSuccess] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalAction, setAuthModalAction] = useState('like'); // 'like' | 'post'

    // Form inputs for creating a new post
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostCategory, setNewPostCategory] = useState('TANYA_DOKTER');
    const [newPostContent, setNewPostContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Synchronize props when navigating via pagination or filtering
    useEffect(() => {
        setSelectedTag(activeCategory || 'ALL');
    }, [activeCategory]);

    useEffect(() => {
        setSearchQuery(search || '');
    }, [search]);

    const postList = posts?.data || [];

    const handleSelectCategory = (catId) => {
        setSelectedTag(catId);
        router.get(
            '/demo/community',
            {
                category: catId,
                search: searchQuery,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(
            '/demo/community',
            {
                category: selectedTag,
                search: searchQuery,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get(
            '/demo/community',
            {
                category: selectedTag,
                search: '',
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Toggle like: strictly requires authentication
    const toggleLike = (post) => {
        if (!authUser) {
            setAuthModalAction('like');
            setShowAuthModal(true);
            return;
        }

        router.post(
            '/demo/community/react',
            {
                post_id: post.id,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    // Open create modal: strictly requires authentication
    const handleOpenCreateModal = () => {
        if (!authUser) {
            setAuthModalAction('post');
            setShowAuthModal(true);
            return;
        }
        setIsCreateModalOpen(true);
    };

    // Submit new discussion post
    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!authUser) {
            setAuthModalAction('post');
            setShowAuthModal(true);
            return;
        }
        if (!newPostTitle.trim() || !newPostContent.trim()) return;

        setIsSubmitting(true);
        router.post(
            '/demo/community/post',
            {
                title: newPostTitle,
                body: newPostContent,
                category: newPostCategory,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    setIsCreateModalOpen(false);
                    setNewPostTitle('');
                    setNewPostContent('');
                    setNewPostSuccess(true);
                    setTimeout(() => setNewPostSuccess(false), 5000);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const comparisonRows = [
        {
            dimension: 'Validitas & Keamanan Medis',
            medsos: 'Banyak mitos, obat herbal tanpa izin BPOM, dan anjuran berbahaya',
            aevyra: '100% Dimoderasi dan dijawab langsung oleh dokter spesialis IDI terverifikasi',
        },
        {
            dimension: 'Fokus & Kultur Komunitas',
            medsos: 'Percakapan acak, spam jualan produk, dan postingan menakut-nakuti (alarmist)',
            aevyra: 'Terarah per kohor biomarker, saling menyemangati dengan bukti ilmiah nyata',
        },
        {
            dimension: 'Kerahasiaan Rekam Medis',
            medsos: 'Nomor telepon dan riwayat penyakit pribadi rentan tersebar ke publik',
            aevyra: 'Privasi terlindungi, enkripsi standar SatuSehat Kemenkes RI, opsi nama anonim',
        },
        {
            dimension: 'Kurasi Resep Pangan',
            medsos: 'Resep viral yang ternyata tinggi gula tersembunyi dan tepung rafinasi',
            aevyra: 'Resep teruji rendah indeks glikemik yang disetujui dokter spesialis gizi klinis',
        },
        {
            dimension: 'Koneksi ke Data Kesehatan',
            medsos: 'Terpisah total dari catatan glukometer atau pelacak harian',
            aevyra: 'Terintegrasi langsung dengan log baseline 14-hari dan riwayat tantangan sehat',
        },
    ];

    return (
        <MarketingLayout>
            <Head title="Demo Forum Komunitas & Ruang Diskusi Terarah - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                {/* 1. Header */}
                <div className="space-y-3 border-b border-[#cfe0d5] pb-6">
                    <div className="flex items-center gap-2 text-xs text-[#222222] font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Komunitas &amp; Forum Terarah</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-black tracking-tight">
                                Forum Komunitas Pejuang Sehat
                            </h1>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium mt-1 max-w-2xl leading-relaxed">
                                Ruang diskusi terarah real-time antar sesama member, instruktur, dan dokter spesialis IDI. Berbagi resep rendah glikemik, tips remisi, dan evaluasi lab tanpa hoaks medis.
                            </p>
                        </div>

                        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
                            <button
                                type="button"
                                onClick={handleOpenCreateModal}
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border border-[#c4dcce] text-black text-xs font-bold hover:bg-[#f6faf7] hover:border-primary shadow-2xs transition-all active:scale-95 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                                <span>Tulis Diskusi Baru</span>
                            </button>
                            <Link
                                href={authUser ? '/member/community' : '/register'}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {authUser ? 'forum' : 'person_add'}
                                </span>
                                <span>
                                    {authUser ? 'Buka Forum Komunitas Member' : 'Daftar Akun Baru'}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Success Alert if New Post Added */}
                {newPostSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs flex items-center justify-between gap-3 text-emerald-950 animate-in fade-in">
                        <div className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                            <span className="font-bold">
                                Diskusi Anda berhasil disimpan dan diterbitkan langsung ke forum komunitas!
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setNewPostSuccess(false)}
                            className="text-gray-500 hover:text-black cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                )}

                {/* 2. 4 Stat Cards: Community Trust & Clinical Moderation */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#333333] font-bold">Anggota Kohor Aktif</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-black font-mono">
                            4.850+ <span className="text-xs font-bold text-[#333333] font-sans">pejuang</span>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-bold block">Tersebar di 24 Kota Indonesia</span>
                    </div>

                    <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#333333] font-bold">Moderasi Dokter IDI</span>
                            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            100% <span className="text-xs font-bold text-[#333333] font-sans">Tervalidasi</span>
                        </div>
                        <span className="text-[11px] text-[#222222] font-semibold block">Sp.PD, Sp.GK &amp; Sp.JP Pengawas</span>
                    </div>

                    <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#333333] font-bold">Resep &amp; Menu Sehat</span>
                            <span className="material-symbols-outlined text-emerald-800 text-[20px]">restaurant</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-800 font-mono">
                            {categoryCounts?.RESEP_SEHAT ?? 128} <span className="text-xs font-bold text-[#333333] font-sans">kreasi</span>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-bold block">Telah Lolos Uji Indeks Glikemik</span>
                    </div>

                    <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[#333333] font-bold">Total Diskusi Real</span>
                            <span className="material-symbols-outlined text-amber-700 text-[20px]">forum</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-amber-700 font-mono">
                            {posts?.total ?? postList.length} <span className="text-xs font-bold text-[#333333] font-sans">topik</span>
                        </div>
                        <span className="text-[11px] text-[#222222] font-semibold block">Tersimpan Resmi di Database</span>
                    </div>
                </div>

                {/* 3. WORKFLOW / 3-STEP PATHWAY */}
                <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-[#c4dcce] shadow-xs space-y-4 sm:space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                        <h2 className="font-heading font-black text-base sm:text-3xl text-black">
                            Bagaimana Komunitas Terarah AEVYRA Bekerja?
                        </h2>
                        <p className="text-[11px] sm:text-sm text-[#222222] font-medium leading-relaxed">
                            Bukan sekadar grup chat biasa. Ekosistem dukungan rekan sebaya terarah yang diawasi tenaga medis profesional.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-6">
                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                1
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Kohor Sesuai Kondisi</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Tergabung dengan peserta yang memiliki target biomarker serupa (gula darah puasa, hipertensi, atau perlemakan hati).
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                2
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Berbagi Resep &amp; Solusi</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Temukan inspirasi masakan lokal rendah gula dan strategi mengatasi kebiasaan manis saat aktivitas sehari-hari.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                3
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Validasi Dokter IDI</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Setiap pertanyaan medis ditanggapi oleh dokter spesialis konsultan untuk menjamin keabsahan informasi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. MAIN FORUM FEED & SEARCH (Real Database Data with Pagination) */}
                <div className="space-y-6">
                    {/* Filter Tabs & Search Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap text-xs pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {[
                                { id: 'ALL', label: 'Semua Topik Diskusi' },
                                { id: 'RESEP_SEHAT', label: 'Resep Rendah Glikemik' },
                                { id: 'TANYA_DOKTER', label: 'Tanya Dokter Spesialis' },
                                { id: 'CERITA_REMISI', label: 'Cerita Remisi Kohor' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => handleSelectCategory(tab.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        selectedTag === tab.id
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : 'bg-white text-black border border-gray-400 hover:border-primary hover:text-primary font-bold'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar Form */}
                        <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-72">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari resep, tips, kata kunci..."
                                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-[#c4dcce] text-xs text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {postList.length === 0 ? (
                            <div className="p-8 rounded-3xl bg-white border border-[#c4dcce] text-center space-y-3">
                                <span className="material-symbols-outlined text-[36px] text-gray-400">search_off</span>
                                <h3 className="font-heading font-bold text-base text-black">Belum Ada Diskusi Ditemukan</h3>
                                <p className="text-xs text-[#222222] font-medium max-w-md mx-auto">
                                    Belum ada kiriman diskusi untuk kategori ini. Jadilah yang pertama memulai diskusi atau berbagi resep!
                                </p>
                                <button
                                    type="button"
                                    onClick={handleOpenCreateModal}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                                    <span>Tulis Diskusi Pertama</span>
                                </button>
                            </div>
                        ) : (
                            postList.map((post) => {
                                // CRITICAL LOGIC: If guest (not logged in), post is NEVER liked.
                                // If logged in, reflects whether this user reacted in DB.
                                const isPostLiked = Boolean(authUser && post.is_liked);

                                return (
                                    <div
                                        key={post.id}
                                        className="p-5 sm:p-7 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-4 hover:border-primary/50 hover:shadow-md transition-all"
                                    >
                                        {/* Author Info */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0 border border-primary/20">
                                                    {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-bold text-xs sm:text-sm text-black leading-snug line-clamp-2">
                                                        {post.author}
                                                    </h4>
                                                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                                        <span className="text-[10px] sm:text-[11px] text-[#445652] font-mono font-medium">
                                                            {post.time}
                                                        </span>
                                                        <span className="sm:hidden px-2 py-0.5 rounded-full bg-[#f6faf7] border border-[#d8e8de] text-black text-[9px] font-mono font-bold">
                                                            {post.tagLabel}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#f6faf7] border border-[#d8e8de] text-black text-[10.5px] font-mono font-bold whitespace-nowrap shrink-0 self-start sm:self-auto">
                                                {post.tagLabel}
                                            </span>
                                        </div>

                                        {/* Content (Solid Black & Dark Neutral for High Visibility) */}
                                        <div className="space-y-2">
                                            <h3 className="font-heading font-black text-sm sm:text-base text-black leading-snug">
                                                {post.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-[#222222] leading-relaxed font-sans font-medium whitespace-pre-line">
                                                {post.content}
                                            </p>
                                        </div>

                                        {/* Interactive Reaction & Real Like Action (Strict Guest Protection) */}
                                        <div className="flex items-center justify-between pt-3 border-t border-[#e2eee6] text-xs">
                                            <button
                                                type="button"
                                                onClick={() => toggleLike(post)}
                                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                                                    isPostLiked
                                                        ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200 shadow-2xs'
                                                        : 'bg-white border border-[#c4dcce] text-black hover:bg-[#f6faf7] hover:border-primary font-semibold'
                                                }`}
                                            >
                                                <span className={`material-symbols-outlined text-[17px] ${isPostLiked ? 'text-rose-600' : 'text-gray-600'}`}>
                                                    {isPostLiked ? 'favorite' : 'favorite_border'}
                                                </span>
                                                <span>{post.likes_count} Bermanfaat</span>
                                            </button>

                                            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-[#222222] font-semibold">
                                                <span className="material-symbols-outlined text-[15px] text-emerald-800">
                                                    verified
                                                </span>
                                                <span>Terverifikasi Komunitas</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* 5. PAGINATION BAR (Server-Side Pagination) */}
                    {posts?.links && posts.last_page > 1 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#e2eee6]">
                            <span className="text-xs text-[#222222] font-mono font-bold">
                                Menampilkan {posts.from}–{posts.to} dari {posts.total} diskusi
                            </span>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                {posts.links.map((link, idx) => {
                                    const isPrev =
                                        link.label.includes('Previous') ||
                                        link.label.includes('&laquo;') ||
                                        link.label.includes('pagination.previous');
                                    const isNext =
                                        link.label.includes('Next') ||
                                        link.label.includes('&raquo;') ||
                                        link.label.includes('pagination.next');
                                    const labelClean = isPrev
                                        ? '← Sebelumnya'
                                        : isNext
                                        ? 'Berikutnya →'
                                        : link.label;

                                    if (!link.url) {
                                        return (
                                            <span
                                                key={idx}
                                                className="px-3.5 py-1.5 rounded-xl border border-[#c4dcce] bg-[#edf4f0] text-[#556863] text-xs font-mono font-bold cursor-not-allowed select-none inline-flex items-center justify-center"
                                            >
                                                {labelClean}
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                                                link.active
                                                    ? 'bg-primary text-white shadow-2xs border border-primary'
                                                    : 'bg-white border border-[#c4dcce] text-black hover:bg-[#f6faf7] hover:border-primary'
                                            }`}
                                        >
                                            {labelClean}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* 6. CLINICAL COMPARISON: Komunitas Medis AEVYRA vs Grup Chat Medsos Biasa */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                            Mengapa Forum Medis AEVYRA Berbeda dari Grup Chat Biasa?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#222222] font-medium">
                            Grup media sosial sering kali dipenuhi mitos berbahaya dan penjualan suplemen ilegal. Komunitas AEVYRA memprioritaskan bukti klinis dan rasa aman pasien.
                        </p>
                    </div>

                    {/* Mobile Comparison Cards (Sebaris 2 Isi: grid-cols-2) */}
                    <div className="sm:hidden grid grid-cols-2 gap-2.5">
                        {comparisonRows.map((row, idx) => (
                            <div
                                key={idx}
                                className="p-2.5 rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-2 flex flex-col justify-between"
                            >
                                <div className="font-bold text-[11px] text-black border-b border-[#d8e8de] pb-1 min-w-0">
                                    <span className="truncate block">{row.dimension}</span>
                                </div>
                                <div className="space-y-1.5 text-xs flex-1 flex flex-col justify-between">
                                    <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#333333] space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase block">
                                            Grup Chat Medsos / WA
                                        </span>
                                        <p className="text-[10px] leading-snug">{row.medsos}</p>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-black space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-primary uppercase block">
                                            Komunitas Terarah AEVYRA
                                        </span>
                                        <p className="text-[10px] font-semibold text-primary leading-snug">{row.aevyra}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Comparison Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#e2eee6] text-black font-mono">
                                    <th className="py-3 px-4 font-bold">Dimensi Evaluasi</th>
                                    <th className="py-3 px-4 text-[#333333] font-bold">Grup Chat Medsos / WA</th>
                                    <th className="py-3 px-4 text-primary font-bold bg-primary/5 rounded-t-xl">Komunitas Terarah AEVYRA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2eee6]">
                                {comparisonRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3 px-4 font-bold text-black border-r border-[#e2eee6]">
                                            {row.dimension}
                                        </td>
                                        <td className="py-3 px-4 text-[#333333] border-r border-[#e2eee6]">
                                            <span className="text-rose-600 font-bold mr-1.5">✕</span>
                                            {row.medsos}
                                        </td>
                                        <td className="py-3 px-4 text-black font-semibold bg-primary/5">
                                            <span className="text-emerald-700 font-bold mr-1.5">✓</span>
                                            {row.aevyra}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7. FAQ ACCORDION */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-black">
                            Pertanyaan Umum Seputar Forum Komunitas
                        </h2>
                        <p className="text-xs text-[#222222] font-medium">
                            Semua hal yang perlu Anda ketahui mengenai tata tertib, kerahasiaan, dan panduan berbagi cerita.
                        </p>
                    </div>

                    <div className="space-y-3 max-w-3xl mx-auto">
                        {[
                            {
                                q: 'Apakah identitas dan rekam medis saya terlihat oleh seluruh anggota?',
                                a: 'Tidak. Anda memiliki kebebasan penuh untuk menggunakan nama inisial atau anonim di setiap postingan forum. Angka biomarker spesifik (seperti riwayat lab lengkap) hanya dapat dilihat oleh dokter spesialis penanggung jawab Anda.',
                            },
                            {
                                q: 'Bagaimana AEVYRA memastikan tidak ada hoaks atau penjualan obat herbal ilegal?',
                                a: 'Setiap postingan yang mencantumkan klaim medis atau rekomendasi obat/herbal wajib melalui antrean moderasi dokter spesialis IDI. Postingan promosi produk atau anjuran medis non-evidensial akan otomatis ditolak oleh sistem dan kurator.',
                            },
                            {
                                q: 'Apakah saya bisa berkonsultasi secara privat dengan dokter tanpa dibaca orang lain?',
                                a: 'Tentu saja. Forum Komunitas ditujukan untuk dukungan rekan sebaya (peer support) dan resep harian. Untuk keluhan spesifik atau dosis obat, Anda dapat menggunakan modul "Konsultasi Klinis Terjadwal" dengan ruang chat terenkripsi.',
                            },
                            {
                                q: 'Bagaimana cara resep makanan saya mendapatkan verifikasi dokter gizi?',
                                a: 'Saat menulis postingan dengan kategori "Resep Rendah Glikemik", cantumkan bahan dan perkiraan porsi. Tim dokter spesialis gizi klinis kami akan melakukan simulasi indeks glikemik dan menyematkan stempel verifikasi jika sesuai standar.',
                            },
                        ].map((faq, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-[#c4dcce] overflow-hidden transition-all bg-[#f6faf7]"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-black hover:text-primary transition-colors cursor-pointer"
                                >
                                    <span>{faq.q}</span>
                                    <span className="material-symbols-outlined text-[20px] shrink-0 text-primary">
                                        {openFaqIndex === idx ? 'remove' : 'add'}
                                    </span>
                                </button>
                                {openFaqIndex === idx && (
                                    <div className="p-4 pt-0 text-xs text-[#222222] font-medium leading-relaxed border-t border-[#e2eee6] bg-white">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. BOTTOM CTA BANNER */}
                <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-container text-white p-6 sm:p-10 shadow-lg border border-primary/20">
                    <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-[10px] sm:text-xs font-mono font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                            Bergabung dengan 4.850+ Rekan Kohor
                        </span>
                        <h2 className="font-heading font-black text-xl sm:text-3xl tracking-tight leading-tight">
                            Perjalanan Menuju Remisi Terasa Jauh Lebih Ringan Bersama Teman Seperjuangan.
                        </h2>
                        <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                            Mulai perjalanan penurunan HbA1c dan perbaikan metabolisme Anda hari ini. Dapatkan akses ke forum eksklusif, bimbingan dokter konsultan, dan panduan resep lokal teruji.
                        </p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-bold hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-xs text-center gap-1.5 cursor-pointer"
                            >
                                <span>Daftar Akun Gratis</span>
                                <span className="ml-1 text-xs">→</span>
                            </Link>
                            <Link
                                href="/demo/consultations"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all active:scale-95 border border-white/20 text-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                                <span>Lihat Demo Konsultasi Medis</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL: Tulis Diskusi Baru (Real DB Submission) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white text-black max-w-lg w-full p-6 sm:p-7 rounded-3xl shadow-2xl border border-[#c4dcce] space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-[#e2eee6] pb-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                    <span className="material-symbols-outlined text-[20px]">edit_note</span>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-base text-black">
                                        Tulis Topik Diskusi Baru
                                    </h3>
                                    <p className="text-[11px] text-[#222222] font-medium">
                                        Tersimpan resmi ke database komunitas AEVYRA
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-gray-400 hover:text-black cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
                            <div>
                                <label className="font-bold text-black block mb-1">
                                    Kategori Diskusi:
                                </label>
                                <select
                                    value={newPostCategory}
                                    onChange={(e) => setNewPostCategory(e.target.value)}
                                    className="w-full p-2.5 rounded-xl border border-[#c4dcce] bg-[#f6faf7] text-black font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    <option value="TANYA_DOKTER">Tanya Dokter Spesialis</option>
                                    <option value="RESEP_SEHAT">Resep Rendah Glikemik</option>
                                    <option value="CERITA_REMISI">Cerita Remisi &amp; Evaluasi Lab</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-black block mb-1">
                                    Judul Diskusi:
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newPostTitle}
                                    onChange={(e) => setNewPostTitle(e.target.value)}
                                    placeholder="Contoh: Kreasi Piring Rendah Glikemik dengan Sayuran Lokal..."
                                    className="w-full p-2.5 rounded-xl border border-[#c4dcce] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div>
                                <label className="font-bold text-black block mb-1">
                                    Isi Diskusi / Pengalaman:
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={newPostContent}
                                    onChange={(e) => setNewPostContent(e.target.value)}
                                    placeholder="Ceritakan detail pertanyaan, bahan resep, atau capaian glukosa Anda..."
                                    className="w-full p-2.5 rounded-xl border border-[#c4dcce] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed"
                                />
                            </div>

                            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-950 flex items-center gap-2 font-mono">
                                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                                <span>100% Bebas Spam &amp; Iklan • Dimoderasi Dokter IDI</span>
                            </div>

                            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#e2eee6]">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-black hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">send</span>
                                    <span>{isSubmitting ? 'Menerbitkan...' : 'Terbitkan Diskusi'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* AUTH REQUIRED MODAL: Wajib Login Sebelum Memberi Apresiasi atau Menulis */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white text-black max-w-md w-full p-6 sm:p-7 rounded-3xl shadow-2xl border border-[#c4dcce] space-y-5 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-[#e2eee6] pb-3.5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 border border-primary/20">
                                    <span className="material-symbols-outlined text-[22px]">
                                        {authModalAction === 'like' ? 'favorite' : 'edit_note'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-heading font-black text-base text-black">
                                        {authModalAction === 'like'
                                            ? 'Login untuk Memberi Apresiasi'
                                            : 'Login untuk Menulis Diskusi'}
                                    </h3>
                                    <p className="text-[11px] text-[#222222] font-mono font-medium">
                                        Komunitas Medis AEVYRA
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAuthModal(false)}
                                className="text-gray-400 hover:text-black cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs text-[#222222] font-medium leading-relaxed">
                                {authModalAction === 'like'
                                    ? 'Anda saat ini belum masuk ke akun. Untuk memberikan apresiasi ("Bermanfaat") pada postingan rekan komunitas, silakan masuk ke akun Anda atau daftar baru secara gratis.'
                                    : 'Anda saat ini belum masuk ke akun. Untuk membuat topik diskusi atau membagikan resep rendah glikemik ke forum, silakan masuk ke akun Anda atau daftar akun baru terlebih dahulu.'}
                            </p>

                            <div className="p-3.5 rounded-2xl bg-[#f6faf7] border border-[#d8e8de] text-[11px] text-emerald-950 flex items-center gap-2 font-mono font-medium">
                                <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                                <span>100% Bebas Spam • Keamanan Data Standar SatuSehat</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-2 border-t border-[#e2eee6]">
                            <button
                                type="button"
                                onClick={() => setShowAuthModal(false)}
                                className="px-4 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-black hover:bg-gray-50 transition-colors cursor-pointer text-center"
                            >
                                Nanti Saja
                            </button>
                            <Link
                                href="/login"
                                className="px-4 py-2.5 rounded-full border border-primary text-primary text-xs font-bold hover:bg-primary/5 transition-colors cursor-pointer text-center"
                            >
                                Masuk Akun
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 cursor-pointer text-center"
                            >
                                Daftar Baru
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </MarketingLayout>
    );
}
