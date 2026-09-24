import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MetabolicRunner2D from '../Components/MetabolicRunner2D';
import MetabolicStoryGame from '../Components/MetabolicStoryGame';
import MetabolicArcadeModal from '../Components/MetabolicArcadeModal';

export default function Arcade() {
    const [activeView, setActiveView] = useState('story'); // 'story', 'runner'
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

    const leaderboard = [
        { rank: 1, name: 'dr. Bramantyo, Sp.PD', char: 'dr. Bramantyo', score: 3840, tir: '94%', medal: '1' },
        { rank: 2, name: 'Sarah Nindya', char: 'Sarah Nindya', score: 3210, tir: '89%', medal: '2' },
        { rank: 3, name: 'Dimas Aryo', char: 'Dimas Aryo', score: 2750, tir: '81%', medal: '3' },
        { rank: 4, name: 'Rian Pratama', char: 'Dimas Aryo', score: 2190, tir: '78%', medal: '4' },
        { rank: 5, name: 'Nadia Salsabila', char: 'Sarah Nindya', score: 1840, tir: '74%', medal: '5' },
    ];

    const foodCards = [
        {
            icon: 'eco',
            name: 'Brokoli & Serat Hijau',
            type: 'Nutrisi Super',
            impact: '-15 mg/dL Glukosa',
            desc: 'Memperlambat absorbsi karbohidrat, meratakan kurva lonjakan glukosa setelah makan.',
            badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
            icon: 'water_drop',
            name: 'Air Mineral & Elektrolit',
            type: 'Hidrasi Sel',
            impact: 'Stabilkan Ginjal & Hemokonsentrasi',
            desc: 'Membantu ginjal menyaring kelebihan gula dalam darah secara alami.',
            badge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        },
        {
            icon: 'bakery_dining',
            name: 'Donat Tepung Halus',
            type: 'Jebakan Karbo Cepat',
            impact: '+28 mg/dL Lonjakan',
            desc: 'Tinggi gula sukrosa dan tepung olahan, memicu lonjakan insulin mendadak lalu hipoglikemia reaktif.',
            badge: 'bg-rose-100 text-rose-800 border-rose-200',
        },
        {
            icon: 'local_cafe',
            name: 'Boba Gula Aren Pekat',
            type: 'Bom Fruktosa Cair',
            impact: '+35 mg/dL Lonjakan',
            desc: 'Mengandung hingga 40-50 gram gula cair per gelas tanpa serat pelindung sama sekali.',
            badge: 'bg-amber-100 text-amber-800 border-amber-200',
        },
    ];

    return (
        <div className="min-h-screen bg-[#f7faf8] text-[#142320] flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
            <Head title="Arena Gamifikasi 2D — Glucose Dash & Edukasi Metabolik | AEVYRA" />
            <Header />

            <main className="flex-1 max-w-300 mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 w-full space-y-10">
                {/* Hero Header */}
                <div className="space-y-3 text-center max-w-3xl mx-auto pt-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#edf5f0] text-primary text-xs font-mono font-bold border border-[#cfe1d7]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>ARENA GAMIFIKASI KESEHATAN PREVENTIF 2D</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#122824] leading-tight">
                        Taklukkan Lonjakan Glukosa dalam Aksi 2D Interaktif
                    </h1>

                    <p className="text-xs sm:text-sm text-[#4d665f] leading-relaxed max-w-2xl mx-auto">
                        Pelajari respon biologis tubuh terhadap makanan tinggi gula dan manfaat serat secara menyenangkan! Mainkan runner 2D dengan fisika mulus, atau jelajahi simulasi keputusan kasus klinis 24 jam.
                    </p>

                    {/* Mode Selector Tabs */}
                    <div className="pt-3 flex justify-center w-full">
                        <div className="p-1.5 bg-surface-container-low rounded-2xl border border-surface-container flex flex-col sm:flex-row items-center gap-1.5 shadow-2xs w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => setActiveView('story')}
                                className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    activeView === 'story'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[17px]">auto_stories</span>
                                <span>Story Game 24 Jam</span>
                                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-800 text-[9px] font-mono">
                                    Visual Novel
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveView('runner')}
                                className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                    activeView === 'runner'
                                        ? 'bg-primary text-white shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[17px]">sports_esports</span>
                                <span>Aksi 2D: Glucose Dash</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Primary Feature Stage: Story Mode or 2D Runner */}
                <section className="space-y-4">
                    {activeView === 'story' ? <MetabolicStoryGame /> : <MetabolicRunner2D />}
                </section>

                {/* Secondary Grid: Community Leaderboard & Nutritional Education */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                    {/* Community Leaderboard */}
                    <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-surface-container-high shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[22px]">leaderboard</span>
                                <div>
                                    <h3 className="font-serif font-bold text-base text-on-surface">Papan Peringkat</h3>
                                    <p className="text-[10px] text-on-surface-variant">Top Rekor Skor Komunitas Pekan Ini</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                Live
                            </span>
                        </div>

                        <div className="space-y-2.5">
                            {leaderboard.map((item) => (
                                <div
                                    key={item.rank}
                                    className="p-3 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center justify-between text-xs hover:border-primary/40 transition-colors"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className={`w-6 h-6 rounded-full font-mono font-bold text-xs flex items-center justify-center ${
                                            item.rank === 1 ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                                            item.rank === 2 ? 'bg-slate-200 text-slate-800 border border-slate-300' :
                                            item.rank === 3 ? 'bg-amber-900/10 text-amber-950 border border-amber-800/30' :
                                            'bg-surface-container text-on-surface-variant'
                                        }`}>
                                            {item.medal}
                                        </span>
                                        <div>
                                            <strong className="block text-on-surface leading-tight">{item.name}</strong>
                                            <span className="text-[10px] text-on-surface-variant font-mono">{item.char}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono font-black text-primary text-sm block leading-tight">
                                            {item.score}
                                        </span>
                                        <span className="text-[9px] text-on-surface-variant">TIR: {item.tir}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2 text-center">
                            <p className="text-[11px] text-on-surface-variant">
                                Skor disimpan otomatis di peramban Anda.
                            </p>
                        </div>
                    </div>

                    {/* Food Items & Glycemic Impact Guide */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-surface-container-high shadow-xs space-y-4 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between border-b border-surface-container pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[22px]">biotech</span>
                                    <div>
                                        <h3 className="font-serif font-bold text-base text-on-surface">
                                            Kamus Glikemik & Dampak Metabolik
                                        </h3>
                                        <p className="text-[10px] text-on-surface-variant">
                                            Kenapa item dalam game berpengaruh terhadap glukosa darah?
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                                    PERKENI 2026
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {foodCards.map((card, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-1.5"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary text-[20px]">{card.icon}</span>
                                                <h4 className="font-bold text-xs text-on-surface">{card.name}</h4>
                                            </div>
                                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${card.badge}`}>
                                                {card.impact}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#52645f] leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banner to Real Life Application */}
                        <div className="p-4 rounded-2xl bg-[#edf5f0] border border-[#cfe1d7] flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                            <div className="space-y-0.5 text-center sm:text-left">
                                <strong className="text-xs text-primary font-bold block">
                                    Ingin Pindai Makanan Nyata Anda Menggunakan Kamera?
                                </strong>
                                <p className="text-[11px] text-[#4d665f]">
                                    Arahkan kamera ke label kemasan untuk deteksi gula, natrium, dan beban glikemik dalam &lt;0.4 detik.
                                </p>
                            </div>
                            <Link
                                href="/member/scanner"
                                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
                            >
                                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                <span>Buka Scanner Kamera</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 24-Hour Patient Story Simulation Modal */}
                <MetabolicArcadeModal
                    isOpen={isStoryModalOpen}
                    onClose={() => setIsStoryModalOpen(false)}
                />
            </main>

            <Footer />
        </div>
    );
}
