import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Community({ profile, posts, activeCategory = 'all' }) {
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('1'); // 1=Nutrition, 2=Remission, 3=Fitness, 4=Doctor
    const [submittingPost, setSubmittingPost] = useState(false);

    // Comment inputs state map: { [postId]: string }
    const [commentTexts, setCommentTexts] = useState({});
    const [submittingComment, setSubmittingComment] = useState({});
    const [expandedComments, setExpandedComments] = useState({});

    const categories = [
        { id: 'all', label: 'Semua Topik', icon: 'forum' },
        { id: 'nutrition', label: 'Nutrisi & Resep Sehat', icon: 'restaurant' },
        { id: 'remission', label: 'Kisah Remisi Pra-Diabetes', icon: 'favorite' },
        { id: 'fitness', label: 'Langkah & Olahraga', icon: 'directions_run' },
        { id: 'consultation', label: 'Tanya Dokter / Coach', icon: 'medical_services' },
    ];

    const handleCategoryClick = (catId) => {
        router.get('/member/community', { category: catId }, { preserveState: true });
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setSubmittingPost(true);
        router.post('/member/community/post', {
            title,
            content,
            category_id: category,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setTitle('');
                setContent('');
                setIsCreatingPost(false);
            },
            onFinish: () => setSubmittingPost(false),
        });
    };

    const handleReaction = (postId, reactionType) => {
        router.post('/member/community/react', {
            post_id: postId,
            type: reactionType,
        }, {
            preserveScroll: true,
        });
    };

    const handleCommentSubmit = (postId) => {
        const text = commentTexts[postId];
        if (!text || !text.trim()) return;

        setSubmittingComment(prev => ({ ...prev, [postId]: true }));
        router.post('/member/community/comment', {
            post_id: postId,
            content: text,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setCommentTexts(prev => ({ ...prev, [postId]: '' }));
                setExpandedComments(prev => ({ ...prev, [postId]: true }));
            },
            onFinish: () => setSubmittingComment(prev => ({ ...prev, [postId]: false })),
        });
    };

    const toggleExpandComments = (postId) => {
        setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const postItems = posts?.data || [];

    return (
        <AppLayout title="Komunitas & Forum Diskusi" activeTab="community">
            <Head title="Komunitas Sehat & Forum Diskusi - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                
                {/* Hero Header */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-xs">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-emerald-300">groups</span>
                            <span>FORUM KOMUNITAS • AKUNTABILITAS & PEJUANG SEHAT</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Dukungan Nyata: Anda Tidak Berjuang Sendirian
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Penelitian membuktikan bahwa akuntabilitas sosial meningkatkan konsistensi gaya hidup sehat sebesar 65%. Bagikan resep rendah gula Anda, rayakan stabilitas biomarker, dan diskusikan pola makan bersama sesama pejuang kesehatan dan tenaga medis.
                        </p>
                        
                        <div className="flex items-center gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(!isCreatingPost)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-bold text-xs shadow-xs hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                <span>{isCreatingPost ? 'Tutup Form' : 'Tulis Cerita / Pertanyaan (+20 Poin)'}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Create Post Card */}
                {isCreatingPost && (
                    <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined">edit_note</span>
                                <span>Buat Postingan Baru di Komunitas</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsCreatingPost(false)}
                                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high cursor-pointer transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreatePost} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface block">Kategori Topik:</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full sm:w-72 p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs font-semibold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                >
                                    <option value="1">Nutrisi & Resep Rendah Gula</option>
                                    <option value="2">Kisah Remisi Pra-Diabetes</option>
                                    <option value="3">Olahraga, Langkah & Otot</option>
                                    <option value="4">Tanya Dokter & Health Coach</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface block">Judul Diskusi:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Contoh: Pengalaman saya menurunkan gula darah puasa dari 118 ke 92 mg/dL..."
                                    className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface block">Isi Cerita / Pertanyaan:</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={4}
                                    placeholder="Ceritakan rutinitas harian, menu sarapan, atau pertanyaan spesifik yang ingin didiskusikan..."
                                    className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[15px] text-amber-500">stars</span>
                                    <span>Dapatkan <strong>+20 Poin</strong> saat postingan Anda dipublikasikan!</span>
                                </span>
                                <button
                                    type="submit"
                                    disabled={submittingPost}
                                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">send</span>
                                    <span>{submittingPost ? 'Memposting...' : 'Publikasikan'}</span>
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
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-white dark:bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface hover:border-primary/30'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">{c.icon}</span>
                            <span>{c.label}</span>
                        </button>
                    ))}
                </div>

                {/* Forum Feed Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Posts Feed (2 cols) */}
                    <div className="lg:col-span-2 space-y-4">
                        {postItems.length > 0 ? (
                            postItems.map((post) => {
                                const isCommentsOpen = !!expandedComments[post.id];
                                const comments = post.comments || [];
                                const reactions = post.reactions || [];

                                const likeCount = reactions.filter(r => r.reaction_type === 'LIKE').length;
                                const supportCount = reactions.filter(r => r.reaction_type === 'SUPPORT').length;
                                const celebrateCount = reactions.filter(r => r.reaction_type === 'CELEBRATE').length;

                                return (
                                    <div
                                        key={post.id}
                                        className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container hover:border-primary/30 transition-all shadow-xs space-y-4"
                                    >
                                        {/* Author Header */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                                                    {post.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-xs sm:text-sm text-on-surface">
                                                            {post.user?.name || 'Member Komunitas'}
                                                        </span>
                                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/10 text-primary">
                                                            Member Aktif
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] text-on-surface-variant">
                                                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-surface-container-low text-on-surface-variant font-label-mono">
                                                {post.category_id === 1 ? 'Nutrisi' : post.category_id === 2 ? 'Remisi' : post.category_id === 3 ? 'Kebugaran' : 'Tanya Ahli'}
                                            </span>
                                        </div>

                                        {/* Post Content */}
                                        <div className="space-y-2">
                                            <h3 className="font-heading font-black text-sm sm:text-base text-on-surface">
                                                {post.title}
                                            </h3>
                                            <p className="text-xs text-on-surface-variant leading-relaxed whitespace-pre-line">
                                                {post.content}
                                            </p>
                                        </div>

                                        {/* Reactions & Comment Bar */}
                                        <div className="pt-3 border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'LIKE')}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-500/20 font-medium text-[11px] transition-colors cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">favorite</span>
                                                    <span>Suka</span>
                                                    <span className="font-mono font-bold">{likeCount}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'SUPPORT')}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-400 hover:bg-sky-500/20 font-medium text-[11px] transition-colors cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">fitness_center</span>
                                                    <span>Semangat</span>
                                                    <span className="font-mono font-bold">{supportCount}</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleReaction(post.id, 'CELEBRATE')}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 font-medium text-[11px] transition-colors cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">hotel_class</span>
                                                    <span>Keren</span>
                                                    <span className="font-mono font-bold">{celebrateCount}</span>
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleExpandComments(post.id)}
                                                className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface font-semibold text-xs py-1 px-2 rounded-lg cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                                                <span>{comments.length} Balasan</span>
                                            </button>
                                        </div>

                                        {/* Comments Drawer */}
                                        {isCommentsOpen && (
                                            <div className="pt-3 border-t border-surface-container space-y-3 bg-surface-container-low p-4 rounded-2xl">
                                                {comments.length > 0 ? (
                                                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                                                        {comments.map((comm) => (
                                                             <div key={comm.id} className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-xs space-y-1">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="font-bold text-on-surface">
                                                                        {comm.user?.name || 'Anggota'}
                                                                    </span>
                                                                    <span className="text-[10px] text-on-surface-variant">
                                                                        {new Date(comm.created_at).toLocaleDateString('id-ID')}
                                                                    </span>
                                                                </div>
                                                                <p className="text-on-surface-variant leading-relaxed">
                                                                    {comm.content}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-on-surface-variant italic">Belum ada balasan. Jadilah yang pertama membalas!</p>
                                                )}

                                                {/* Add Comment Input */}
                                                <div className="flex gap-2 pt-1">
                                                    <input
                                                        type="text"
                                                        value={commentTexts[post.id] || ''}
                                                        onChange={(e) => setCommentTexts({ ...commentTexts, [post.id]: e.target.value })}
                                                        placeholder="Tulis balasan atau saran suportif..."
                                                        className="flex-1 p-2 rounded-xl border border-surface-container bg-white dark:bg-surface text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleCommentSubmit(post.id);
                                                        }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCommentSubmit(post.id)}
                                                        disabled={submittingComment[post.id]}
                                                        className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
                                                    >
                                                        Kirim
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center rounded-3xl border border-dashed border-surface-container bg-surface-container-low space-y-3">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">chat</span>
                                <p className="text-xs text-on-surface-variant">
                                    Belum ada postingan dalam kategori ini. Jadilah inisiator diskusi pertama!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: Community Principles & Contributor */}
                    <div className="space-y-5">
                        {/* Guidelines Card */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">health_and_safety</span>
                                <h3 className="font-heading font-bold text-sm text-on-surface">
                                    Prinsip Komunitas AEVYRA
                                </h3>
                            </div>
                            <ul className="text-xs text-on-surface-variant space-y-2 leading-relaxed">
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-600 mt-0.5">check_circle</span>
                                    <span>Berbagi tips berbasis sains & pedoman PERKENI/Kemenkes RI.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-600 mt-0.5">check_circle</span>
                                    <span>Menjaga privasi data medis personal rekan sesama anggota.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-600 mt-0.5">check_circle</span>
                                    <span>Saling mendukung tanpa penghakiman (<em>non-judgmental care</em>).</span>
                                </li>
                            </ul>
                        </div>

                        {/* Top Contributor Badge Card */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-600 text-[20px]">military_tech</span>
                                <h3 className="font-heading font-bold text-sm text-on-surface">
                                    Pahlawan Remisi Bulan Ini
                                </h3>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Berbagi cerita dan menginspirasi 30+ rekan lain dalam menjaga HbA1c stabil.
                            </p>
                            <div className="flex items-center gap-2 pt-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold text-xs font-mono">
                                    <span className="material-symbols-outlined text-[15px] text-amber-600">workspace_premium</span>
                                    <span>Reza R. (+1,250 Poin)</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
