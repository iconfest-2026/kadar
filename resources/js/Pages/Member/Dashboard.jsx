import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import QuickLogModal from '../../Components/QuickLogModal';
import axios from 'axios';

export default function Dashboard({
    user,
    profile,
    lifestyle,
    baselines,
    todayRecords,
    activeSignals,
    activeInsights,
    streak,
    totalPoints,
    instructor,
}) {
    const [quickLogOpen, setQuickLogOpen] = useState(false);
    const [quickLogMetric, setQuickLogMetric] = useState('sleep_duration');

    // AI Chat modal state
    const [aiChatOpen, setAiChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            role: 'assistant',
            content: `Halo ${user?.name || 'Kawan'}! Saya asisten gaya hidup preventif Kadar. Saya dapat membantu Anda mendiskusikan pola istirahat, hidrasi, atau kebiasaan harian berdasarkan baseline Anda tanpa memberikan diagnosa medis. Apa yang ingin Anda diskusikan hari ini?`,
            content: `Halo ${user?.name || 'Kawan'}! Saya asisten gaya hidup preventif AEVYRA. Saya dapat membantu Anda mendiskusikan pola istirahat, hidrasi, atau kebiasaan harian berdasarkan baseline Anda tanpa memberikan diagnosa medis. Apa yang ingin Anda diskusikan hari ini?`,
        },
    ]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);

    const handleOpenQuickLog = (metric) => {
        setQuickLogMetric(metric);
        setQuickLogOpen(true);
    };

    const handleAcceptRecommendation = (recId) => {
        router.post(`/member/recommendations/${recId}/accept`, {}, {
            preserveScroll: true,
        });
    };

    const handleDismissInsight = (insightId) => {
        router.post(`/member/insights/${insightId}/dismiss`, {}, {
            preserveScroll: true,
        });
    };

    const handleSendChatMessage = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || chatLoading) return;

        const userMsg = chatInput.trim();
        setChatMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
        setChatInput('');
        setChatLoading(true);

        try {
            const res = await axios.post('/member/ai-chat/send', { message: userMsg });
            setChatMessages((prev) => [
                ...prev,
                { role: 'assistant', content: res.data.reply },
            ]);
        } catch (err) {
            setChatMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Maaf, terjadi gangguan koneksi ke asisten AI. Silakan coba kembali sesaat lagi.',
                },
            ]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <AppLayout title="Dashboard Member" activeTab="dashboard">
            <Head title="Ringkasan Baseline - Kadar" />
            <Head title="Ringkasan Baseline — AEVYRA" />

            <div className="space-y-6">
                {/* 1. Welcome & Status Banner */}
                <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary uppercase">
                                    Gold Member Preventif
                                </span>
                                <span className="text-[11px] text-on-surface-variant">•</span>
                                <span className="text-[11px] text-on-surface-variant font-medium">
                                    {profile?.display_name || user?.name} ({profile?.occupation || 'Member'})
                                </span>
                            </div>
                            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface tracking-tight">
                                Selamat Datang Kembali, {user?.name?.split(' ')[0]}
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                                Baseline personal 14-hari Anda aktif. Sistem terus membandingkan ritme harian Anda terhadap norma stabil Anda sendiri.
                            </p>
                        </div>

                        {/* Gamification Counters & Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="px-4 py-3 bg-surface-container-low rounded-2xl border border-surface-container flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                                </div>
                                <div>
                                    <div className="text-lg font-heading font-black text-on-surface leading-none">
                                        {streak?.current || 1} <span className="text-xs font-normal text-on-surface-variant">Hari</span>
                                    </div>
                                    <div className="font-label-mono text-[10px] text-on-surface-variant uppercase mt-0.5">
                                        Streak Konsisten
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-surface-container-low rounded-2xl border border-surface-container flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[24px]">stars</span>
                                </div>
                                <div>
                                    <div className="text-lg font-heading font-black text-on-surface leading-none">
                                        {totalPoints || 0}
                                    </div>
                                    <div className="font-label-mono text-[10px] text-on-surface-variant uppercase mt-0.5">
                                        Poin Preventif
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setAiChatOpen(true)}
                                className="px-4 py-3 rounded-2xl bg-secondary-container text-on-secondary-container hover:bg-secondary-container/80 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
                            >
                                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                                <span>Tanya AI Kadar</span>
                                <span>Tanya AI AEVYRA</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2. Personal Baseline Cards Grid */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-heading font-bold text-lg text-on-surface">Status Baseline Personal (HBE)</h2>
                            <p className="text-xs text-on-surface-variant">
                                Garis acuan personal dihitung dari jendela bergulir 14-hari data valid Anda.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Sleep Baseline */}
                        <div className="p-5 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden">
                            {baselines?.sleep_duration ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">bedtime</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300">
                                            Pergeseran Aktif
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                            Durasi Tidur
                                        </span>
                                        <div className="text-2xl font-heading font-bold text-on-surface mt-0.5">
                                            5j 42m <span className="text-xs text-red-600 font-semibold">-1j 33m</span>
                                        </div>
                                        <p className="text-[11px] text-on-surface-variant mt-1">
                                            Baseline stabil: <strong>7 jam 15 mnt</strong> ({baselines.sleep_duration.sample_count} hari sampel)
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="py-3 text-center space-y-2">
                                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">bedtime</span>
                                    <p className="text-xs font-semibold text-on-surface">Baseline Tidur Belum Siap</p>
                                    <p className="text-[11px] text-on-surface-variant">Kumpulkan 7-14 hari data untuk menghitung garis acuan Anda.</p>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('sleep_duration')}
                                className="w-full py-1.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-[11px] font-semibold text-primary transition-all flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[14px]">add</span>
                                <span>Catat Tidur</span>
                            </button>
                        </div>

                        {/* Water Baseline */}
                        <div className="p-5 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden">
                            {baselines?.water_intake ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[18px]">water_drop</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                            Normal
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                            Asupan Air Minum
                                        </span>
                                        <div className="text-2xl font-heading font-bold text-on-surface mt-0.5">
                                            1.500 <span className="text-xs font-normal text-on-surface-variant">/ 2.150 ml</span>
                                        </div>
                                        <p className="text-[11px] text-on-surface-variant mt-1">
                                            Baseline harian: <strong>2.150 ml</strong> ({baselines.water_intake.sample_count} sampel)
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="py-3 text-center space-y-2">
                                    <span className="material-symbols-outlined text-on-surface-variant text-[24px]">water_drop</span>
                                    <p className="text-xs font-semibold text-on-surface">Baseline Air Belum Siap</p>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('water_intake')}
                                className="w-full py-1.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-[11px] font-semibold text-primary transition-all flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[14px]">add</span>
                                <span>+250ml Air</span>
                            </button>
                        </div>

                        {/* Steps Baseline */}
                        <div className="p-5 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">directions_walk</span>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant">
                                    Collecting (5/14)
                                </span>
                            </div>
                            <div>
                                <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                    Langkah Kaki
                                </span>
                                <div className="text-2xl font-heading font-bold text-on-surface mt-0.5">
                                    6.420 <span className="text-xs font-normal text-on-surface-variant">langkah</span>
                                </div>
                                <p className="text-[11px] text-on-surface-variant mt-1">
                                    Membutuhkan 2 hari lagi untuk kalkulasi baseline awal.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('steps')}
                                className="w-full py-1.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-[11px] font-semibold text-primary transition-all flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[14px]">add</span>
                                <span>Catat Langkah</span>
                            </button>
                        </div>

                        {/* Blood Glucose Baseline */}
                        <div className="p-5 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden">
                            <div className="flex items-center justify-between">
                                <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[18px]">bloodtype</span>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant">
                                    Collecting (3/14)
                                </span>
                            </div>
                            <div>
                                <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                    Gula Darah Puasa
                                </span>
                                <div className="text-2xl font-heading font-bold text-on-surface mt-0.5">
                                    94 <span className="text-xs font-normal text-on-surface-variant">mg/dL</span>
                                </div>
                                <p className="text-[11px] text-on-surface-variant mt-1">
                                    Rentang normal puasa: 70 - 99 mg/dL.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('blood_glucose')}
                                className="w-full py-1.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-[11px] font-semibold text-primary transition-all flex items-center justify-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[14px]">add</span>
                                <span>Catat Glukosa</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 3. Active Insights & Evidence Card */}
                {activeInsights && activeInsights.length > 0 && (
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="font-heading font-bold text-lg text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-[22px]">lightbulb</span>
                                <span>Wawasan Kebiasaan Terdeteksi (Behavior Insights)</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {activeInsights.map((insight) => (
                                <div
                                    key={insight.id}
                                    className="p-6 rounded-3xl bg-surface border-2 border-amber-500/30 shadow-xs space-y-4"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                                            <h3 className="font-heading font-bold text-base text-on-surface">
                                                {insight.title}
                                            </h3>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDismissInsight(insight.id)}
                                            className="text-[11px] text-on-surface-variant hover:text-on-surface self-start sm:self-auto"
                                        >
                                            Arsipkan Wawasan
                                        </button>
                                    </div>

                                    {/* Narrative & Context */}
                                    <div className="space-y-2 text-xs text-on-surface-variant leading-relaxed">
                                        <p className="text-on-surface font-medium">{insight.observation}</p>
                                        <p>{insight.context}</p>
                                        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-amber-950 dark:text-amber-200">
                                            <strong>Mengapa ini penting?</strong> {insight.why_it_matters}
                                        </div>
                                    </div>

                                    {/* Evidence Comparison Bar */}
                                    <div className="p-4 bg-surface-container-low rounded-2xl border border-surface-container grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">
                                                Garis Acuan Anda
                                            </span>
                                            <span className="font-heading font-bold text-sm text-on-surface">
                                                {insight.baseline_value}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">
                                                Rata-rata 4 Hari Ini
                                            </span>
                                            <span className="font-heading font-bold text-sm text-on-surface">
                                                {insight.current_value}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">
                                                Deviasi Relatif
                                            </span>
                                            <span className="font-heading font-bold text-sm text-red-600 font-mono">
                                                {insight.difference_value}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Recommendations List */}
                                    {insight.recommendations && insight.recommendations.length > 0 && (
                                        <div className="space-y-2 pt-1">
                                            <span className="font-label-mono text-[10px] uppercase font-bold text-primary tracking-wider block">
                                                Rekomendasi Mikro-Kebiasaan Rendah Hambatan:
                                            </span>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {insight.recommendations.map((rec) => (
                                                    <div
                                                        key={rec.id}
                                                        className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between gap-3"
                                                    >
                                                        <div>
                                                            <h4 className="font-heading font-bold text-xs text-on-surface">
                                                                {rec.title}
                                                            </h4>
                                                            <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                                                                {rec.description}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                                                            <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">
                                                                Tingkat: {rec.difficulty_level || 'Mudah'}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAcceptRecommendation(rec.id)}
                                                                className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-all"
                                                            >
                                                                <span className="material-symbols-outlined text-[14px]">check</span>
                                                                <span>Aktifkan Komitmen</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. Coach Card & Care Team */}
                {instructor && (
                    <section className="p-6 rounded-3xl bg-surface border border-surface-container shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                                👩‍⚕️
                            </div>
                            <div>
                                <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                                    Instruktur Terverifikasi Anda
                                </span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    {instructor.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Mendampingi pemantauan baseline, review deviasi kebiasaan, dan rencana intervensi Anda.
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setAiChatOpen(true)}
                            className="py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface border border-surface-container flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                            <span>Konsultasi Pertanyaan</span>
                        </button>
                    </section>
                )}
            </div>

            {/* Quick Log Modal */}
            <QuickLogModal
                isOpen={quickLogOpen}
                onClose={() => setQuickLogOpen(false)}
                defaultMetric={quickLogMetric}
            />

            {/* AI Assistant Chat Modal */}
            {aiChatOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-surface rounded-3xl border border-surface-container shadow-2xl overflow-hidden flex flex-col h-140 animate-scale-up">
                        {/* Header */}
                        <div className="px-5 py-3.5 border-b border-surface-container bg-surface-container-low flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-sm text-on-surface">Asisten Gaya Hidup Kadar</h3>
                                    <h3 className="font-heading font-bold text-sm text-on-surface">Asisten Gaya Hidup AEVYRA</h3>
                                    <p className="text-[10px] text-on-surface-variant font-label-mono">
                                        Non-Diagnostik • Terpandu Batas Klinis
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAiChatOpen(false)}
                                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Message Feed */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                            {chatMessages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-primary text-on-primary rounded-br-xs'
                                                : 'bg-surface-container-low text-on-surface border border-surface-container rounded-bl-xs'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {chatLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-surface-container-low text-on-surface border border-surface-container rounded-2xl rounded-bl-xs p-3 flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-[11px] text-on-surface-variant">Menyusun respon aman...</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendChatMessage} className="p-3 border-t border-surface-container bg-surface flex items-center gap-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Tanyakan seputar pola tidur, minum air, atau olahraga..."
                                className="flex-1 px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                disabled={chatLoading || !chatInput.trim()}
                                className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary-container disabled:opacity-50 transition-all flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
