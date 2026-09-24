import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function CommunityDemo() {
    const [selectedTag, setSelectedTag] = useState('ALL');
    const [likes, setLikes] = useState({ 1: 42, 2: 89, 3: 124 });
    const [liked, setLiked] = useState({ 1: false, 2: true, 3: false });

    const posts = [
        {
            id: 1,
            author: 'Dian Permata (Member Kohor 14)',
            badge: 'Remisi 60 Hari',
            time: '2 jam yang lalu',
            tag: 'RESEP_SEHAT',
            tagLabel: 'Resep Pangan Sehat',
            title: 'Kreasi Omelet Bayam Tahu Sutra: Sarapan Rendah Glikemik Bebas Lonjakan Gula',
            content:
                'Setelah 3 minggu mengganti lontong sayur dengan sarapan omelet bayam + tahu sutra kukus, gula darah 2 jam pasca sarapan saya stabil di 110 mg/dL (sebelumnya selalu tembus 165 mg/dL). Kuncinya ada pada paduan protein dan serat sebelum karbohidrat.',
            doctorComment: {
                doctor: 'dr. Sarah N., M.Gizi, Sp.GK',
                text: 'Kombinasi sangat tepat! Tahu sutra kaya protein nabati dan bayam memberikan serat larut yang efektif menekan lonjakan glukosa postprandial.',
            },
        },
        {
            id: 2,
            author: 'Budi Santoso',
            badge: 'Habit Runner 30 Hari',
            time: '5 jam yang lalu',
            tag: 'TIPS_KEBIASAAN',
            tagLabel: 'Tips Gaya Hidup',
            title: 'Strategi Mengatasi Cravings Minuman Manis Saat Lembur di Kantor',
            content:
                'Tips sederhana dari saya: selalu sediakan tumbler berisi infused water lemon + daun mint dingin di meja kerja. Setiap kali ingin memesan boba atau kopi susu manis, minum 3 teguk besar infused water dan tunggu 10 menit. 90% rasa ingin manis hilang.',
            doctorComment: {
                doctor: 'dr. H. Bramantyo, Sp.PD',
                text: 'Metode delay-gratification ini terbukti ilmiah meredakan impuls dopaminergik rasa manis di otak. Lanjutkan!',
            },
        },
        {
            id: 3,
            author: 'Rina Wijaya',
            badge: 'Member Baru',
            time: '1 hari yang lalu',
            tag: 'TANYA_DOKTER',
            tagLabel: 'Tanya Medis',
            title: 'Apakah wajar merasa sedikit pusing di hari ke-3 berhenti minum gula pasir?',
            content:
                'Halo teman-teman dan dokter, saya sedang ikut challenge 14 Hari Bebas Minuman Manis. Hari ini hari ke-3 dan kepala terasa agak melayang di jam 3 sore. Apakah ini gejala wajar dan bagaimana mengatasinya?',
            doctorComment: {
                doctor: 'dr. H. Bramantyo, Sp.PD',
                text: 'Sangat wajar, ini adalah fase transisi adaptasi metabolisme ("sugar withdrawal"). Pastikan hidrasi 2.5 liter/hari dan konsumsi segenggam kacang almond asin untuk menjaga elektrolit.',
            },
        },
    ];

    const toggleLike = (id) => {
        setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
        setLikes((prev) => ({ ...prev, [id]: prev[id] + (liked[id] ? -1 : 1) }));
    };

    const filteredPosts = posts.filter((p) => selectedTag === 'ALL' || p.tag === selectedTag);

    return (
        <MarketingLayout>
            <Head title="Demo Komunitas Pejuang Sehat — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Komunitas &amp; Forum</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">forum</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 5</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Forum Komunitas Pejuang Sehat
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Ruang diskusi terarah antar sesama member dan dokter spesialis. Berbagi resep rendah glikemik, tips remisi, dan motivasi harian.
                            </p>
                        </div>

                        <Link
                            href="/member/community"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">groups</span>
                            <span>Buka Forum Komunitas Member</span>
                        </Link>
                    </div>
                </div>

                {/* Filter Tags */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button
                        type="button"
                        onClick={() => setSelectedTag('ALL')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            selectedTag === 'ALL'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-low'
                        }`}
                    >
                        Semua Topik Diskusi
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTag('RESEP_SEHAT')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            selectedTag === 'RESEP_SEHAT'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-low'
                        }`}
                    >
                        Resep Rendah Glikemik
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTag('TIPS_KEBIASAAN')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            selectedTag === 'TIPS_KEBIASAAN'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-low'
                        }`}
                    >
                        Tips Gaya Hidup
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTag('TANYA_DOKTER')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                            selectedTag === 'TANYA_DOKTER'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-low'
                        }`}
                    >
                        Tanya Dokter
                    </button>
                </div>

                {/* Feed Roster */}
                <div className="space-y-4 max-w-4xl">
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4 hover:border-primary/30 transition-all"
                        >
                            {/* Author Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs sm:text-sm text-on-surface">{post.author}</span>
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono font-bold">
                                                {post.badge}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-on-surface-variant font-mono">{post.time}</span>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface text-[10px] font-mono font-bold">
                                    {post.tagLabel}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-1.5">
                                <h3 className="font-heading font-bold text-base text-primary">{post.title}</h3>
                                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">{post.content}</p>
                            </div>

                            {/* Verified Doctor Endorsement Comment */}
                            {post.doctorComment && (
                                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-emerald-700 dark:text-emerald-400 text-[16px]">
                                            verified
                                        </span>
                                        <span className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                                            Respon Medis Terverifikasi: {post.doctorComment.doctor}
                                        </span>
                                    </div>
                                    <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                                        "{post.doctorComment.text}"
                                    </p>
                                </div>
                            )}

                            {/* Interactive Reaction & Comment Actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-surface-container text-xs">
                                <button
                                    type="button"
                                    onClick={() => toggleLike(post.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                                        liked[post.id]
                                            ? 'bg-rose-500/10 text-rose-600 font-bold'
                                            : 'text-on-surface-variant hover:bg-surface-container-low'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        {liked[post.id] ? 'favorite' : 'favorite_border'}
                                    </span>
                                    <span>{likes[post.id]} Bermanfaat</span>
                                </button>

                                <span className="text-[11px] text-on-surface-variant font-mono">
                                    Disukai 98% Komunitas
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MarketingLayout>
    );
}

