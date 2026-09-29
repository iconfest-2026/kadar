import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import QuickLogModal from '../../Components/QuickLogModal';
import LiveCameraScannerModal from '../../Components/LiveCameraScannerModal';
import MembershipTierModal from '../../Components/MembershipTierModal';
import MenstrualTrackerCard from '../../Components/MenstrualTrackerCard';
import MaleVitalityCard from '../../Components/MaleVitalityCard';

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
    membership,
    achievements = [],
}) {
    const [quickLogOpen, setQuickLogOpen] = useState(false);
    const [quickLogMetric, setQuickLogMetric] = useState('sleep_duration');
    const [scannerModalOpen, setScannerModalOpen] = useState(false);
    const [tierModalOpen, setTierModalOpen] = useState(false);

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
                    content: 'Mohon maaf, terjadi gangguan koneksi ke asisten preventif. Silakan coba kembali sesaat lagi.',
                },
            ]);
        } finally {
            setChatLoading(false);
        }
    };

    const getAchievementIcon = (key) => {
        switch (key) {
            case 'FIRST_LOG': return 'spa';
            case 'STREAK_7': return 'local_fire_department';
            case 'BASELINE_READY': return 'monitoring';
            case 'HYDRATION_HERO': return 'water_drop';
            default: return 'military_tech';
        }
    };

    // Helper to format assistant messages with clean section dividers, bullet points, and numbered lists
    const renderFormattedAssistantMessage = (content) => {
        if (!content) return null;

        // 1. Strip residual asterisks
        const clean = content.replace(/\*/g, '');

        // 2. Normalize text: ensure bullet points and numbered points start on separate lines
        const normalized = clean
            .replace(/([^\n])\s*[-•]\s+/g, '$1\n- ')
            .replace(/([^\n])\s+(\d+)\.\s+/g, '$1\n$2. ');

        const rawLines = normalized.split('\n');
        const elements = [];
        let currentBullets = [];
        let currentNumbers = [];

        const flushLists = () => {
            if (currentBullets.length > 0) {
                elements.push({
                    type: 'bullet-group',
                    items: [...currentBullets],
                });
                currentBullets = [];
            }
            if (currentNumbers.length > 0) {
                elements.push({
                    type: 'number-group',
                    items: [...currentNumbers],
                });
                currentNumbers = [];
            }
        };

        for (let i = 0; i < rawLines.length; i++) {
            const line = rawLines[i].trim();
            if (!line) {
                flushLists();
                continue;
            }

            // Bullet item
            if (line.startsWith('- ') || line.startsWith('• ')) {
                if (currentNumbers.length > 0) flushLists();
                currentBullets.push(line.replace(/^[-•]\s+/, '').trim());
                continue;
            }

            // Numbered item
            const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
                if (currentBullets.length > 0) flushLists();
                currentNumbers.push({
                    num: numMatch[1],
                    text: numMatch[2].trim(),
                });
                continue;
            }

            // Flush open lists
            flushLists();

            // Detect section headers (lines ending with ':', starting with '###', or short header phrases)
            const isHeader = line.endsWith(':') ||
                line.startsWith('###') ||
                (line.length < 80 && /^(Gejala|Tanda|Penyebab|Langkah|Cara|Tips|Prinsip|Rekomendasi|Faktor|Perhatian|Pencegahan|Catatan|Penting|Karakteristik)/i.test(line));

            if (isHeader) {
                elements.push({
                    type: 'header',
                    text: line.replace(/^###\s*/, ''),
                });
            } else {
                elements.push({
                    type: 'paragraph',
                    text: line,
                });
            }
        }
        flushLists();

        return (
            <div className="space-y-2 text-xs leading-relaxed">
                {elements.map((el, elIdx) => {
                    if (el.type === 'header') {
                        return (
                            <div key={elIdx} className="pt-2 mt-2.5 first:mt-0 first:pt-0 border-t border-surface-container-high/70">
                                <div className="flex items-center gap-1.5 text-primary font-bold text-[12px] mb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    <span>{el.text}</span>
                                </div>
                            </div>
                        );
                    }

                    if (el.type === 'bullet-group') {
                        return (
                            <div key={elIdx} className="space-y-1.5 pl-0.5 my-1.5">
                                {el.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-start gap-2 text-on-surface">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                                        <span className="leading-relaxed flex-1">{item}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    if (el.type === 'number-group') {
                        return (
                            <div key={elIdx} className="space-y-2 pl-0.5 my-2">
                                {el.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex items-start gap-2.5 text-on-surface">
                                        <span className="w-4.5 h-4.5 rounded-md bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                                            {item.num}
                                        </span>
                                        <span className="leading-relaxed flex-1">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }

                    return (
                        <p key={elIdx} className="text-on-surface leading-relaxed my-1">
                            {el.text}
                        </p>
                    );
                })}
            </div>
        );
    };

    return (
        <AppLayout title="Dashboard Member" activeTab="dashboard">
            <Head title="Ringkasan Baseline Personal - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                
                {/* 1. Hero Welcome & Baseline Status Banner */}
                <section className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-md">
                    <div className="absolute -right-12 -top-12 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold text-amber-200 border border-white/10">
                                    <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
                                    <span>{membership?.tier || 'Gold Member'} Preventif</span>
                                </span>
                                <span className="text-white/60 text-xs">•</span>
                                <span className="text-white/90 text-xs font-medium">
                                    {profile?.display_name || user?.name} ({profile?.occupation || 'Member'})
                                </span>
                            </div>

                            <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                                Selamat Datang Kembali, {user?.name?.split(' ')[0] || 'Kawan'}!
                            </h1>
                            <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                                Baseline personal 14-hari Anda aktif. Sistem kecerdasan preventif AEVYRA terus membandingkan ritme harian terhadap rentang kestabilan metabolisme Anda.
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-2.5 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setScannerModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-primary font-bold text-xs shadow-xs hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                                    <span>Pindai Nutrisi / BPOM</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenQuickLog('blood_glucose')}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/25 hover:bg-black/35 text-white font-bold text-xs border border-white/15 backdrop-blur-xs transition-all cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[17px]">add_circle</span>
                                    <span>Catat Biomarker</span>
                                </button>
                            </div>
                        </div>

                        {/* Gamification Counters & AI Action */}
                        <div className="flex flex-wrap lg:flex-col sm:flex-row items-stretch gap-3 shrink-0">
                            <div className="flex-1 sm:flex-initial px-4 py-3 bg-black/25 backdrop-blur-md rounded-2xl border border-white/15 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
                                </div>
                                <div>
                                    <div className="text-lg font-heading font-black text-white leading-none">
                                        {streak?.current || 1} <span className="text-xs font-normal text-white/75">Hari</span>
                                    </div>
                                    <div className="font-label-mono text-[10px] text-white/75 uppercase mt-0.5">
                                        Streak Disiplin
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 sm:flex-initial px-4 py-3 bg-black/25 backdrop-blur-md rounded-2xl border border-white/15 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[22px]">stars</span>
                                </div>
                                <div>
                                    <div className="text-lg font-heading font-black text-white leading-none">
                                        {totalPoints || 0} <span className="text-xs font-normal text-white/75">Poin</span>
                                    </div>
                                    <div className="font-label-mono text-[10px] text-white/75 uppercase mt-0.5">
                                        Poin Reward
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Quick Feature Launch Grid */}
                <section className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    <button
                        type="button"
                        onClick={() => setScannerModalOpen(true)}
                        className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-xs hover:shadow-sm transition-all text-left flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-on-surface block group-hover:text-primary transition-colors">
                                Scanner Open Cam
                            </span>
                            <span className="text-[10px] text-on-surface-variant block">OCR Gizi & Obat BPOM</span>
                        </div>
                    </button>

                    <Link
                        href="/member/consultations-hub"
                        className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-xs hover:shadow-sm transition-all text-left flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-on-surface block group-hover:text-primary transition-colors">
                                Booking Dokter
                            </span>
                            <span className="text-[10px] text-on-surface-variant block">Jadwal Spesialis IDI</span>
                        </div>
                    </Link>

                    <Link
                        href="/member/challenges"
                        className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-xs hover:shadow-sm transition-all text-left flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[22px]">emoji_events</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-on-surface block group-hover:text-primary transition-colors">
                                Program Tantangan
                            </span>
                            <span className="text-[10px] text-on-surface-variant block">Target 14–90 Hari</span>
                        </div>
                    </Link>

                    <Link
                        href="/member/community"
                        className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-xs hover:shadow-sm transition-all text-left flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[22px]">groups</span>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-on-surface block group-hover:text-primary transition-colors">
                                Forum Komunitas
                            </span>
                            <span className="text-[10px] text-on-surface-variant block">Pejuang Sehat & Resep</span>
                        </div>
                    </Link>
                </section>

                {/* 3. Gender-Specific Health Module */}
                <section>
                    {profile?.sex === 'FEMALE' ? (
                        <MenstrualTrackerCard />
                    ) : (
                        <MaleVitalityCard />
                    )}
                </section>

                {/* 4. Personal Baseline Biomarkers Grid */}
                <section className="space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                                <span className="material-symbols-outlined text-[13px]">tune</span>
                                <span>STANDAR KESEHATAN METABOLIK PERKENI</span>
                            </div>
                            <h2 className="font-heading font-bold text-base sm:text-lg text-on-surface">
                                Status Baseline Personal (Human Baseline Engine)
                            </h2>
                            <p className="text-xs text-on-surface-variant">
                                Garis acuan personal dihitung dari jendela bergulir 14-hari data valid Anda untuk mendeteksi deviasi secara dini.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Sleep Baseline */}
                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between">
                            {baselines?.sleep_duration ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[20px]">bedtime</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300">
                                            Pergeseran Aktif
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                            Durasi Tidur
                                        </span>
                                        <div className="text-2xl font-heading font-black text-on-surface mt-0.5">
                                            5j 42m <span className="text-xs text-rose-600 font-semibold font-mono">-1j 33m</span>
                                        </div>
                                        <p className="text-[11px] text-on-surface-variant mt-1">
                                            Baseline stabil: <strong>7 jam 15 mnt</strong> ({baselines.sleep_duration.sample_count} hari sampel)
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-3 text-center space-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface-variant mx-auto flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">bedtime</span>
                                    </div>
                                    <p className="text-xs font-semibold text-on-surface">Baseline Tidur Belum Siap</p>
                                    <p className="text-[11px] text-on-surface-variant">Kumpulkan 7-14 hari data untuk menghitung garis acuan Anda.</p>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('sleep_duration')}
                                className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span>
                                <span>Catat Tidur</span>
                            </button>
                        </div>

                        {/* Water Baseline */}
                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between">
                            {baselines?.water_intake ? (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[20px]">water_drop</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                            Optimal
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                            Asupan Air Minum
                                        </span>
                                        <div className="text-2xl font-heading font-black text-on-surface mt-0.5">
                                            1.500 <span className="text-xs font-normal text-on-surface-variant">/ 2.150 ml</span>
                                        </div>
                                        <p className="text-[11px] text-on-surface-variant mt-1">
                                            Baseline harian: <strong>2.150 ml</strong> ({baselines.water_intake.sample_count} sampel)
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-3 text-center space-y-2">
                                    <div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface-variant mx-auto flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[22px]">water_drop</span>
                                    </div>
                                    <p className="text-xs font-semibold text-on-surface">Baseline Air Belum Siap</p>
                                    <p className="text-[11px] text-on-surface-variant">Target hidrasi optimal: 2.000 ml / hari.</p>
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('water_intake')}
                                className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span>
                                <span>+250ml Air</span>
                            </button>
                        </div>

                        {/* Steps Baseline */}
                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant">
                                        Mengumpulkan (5/14)
                                    </span>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                        Langkah Kaki
                                    </span>
                                    <div className="text-2xl font-heading font-black text-on-surface mt-0.5">
                                        6.420 <span className="text-xs font-normal text-on-surface-variant">langkah</span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant mt-1">
                                        Membutuhkan 2 hari lagi untuk kalkulasi baseline stabil.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('steps')}
                                className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span>
                                <span>Catat Langkah</span>
                            </button>
                        </div>

                        {/* Blood Glucose Baseline */}
                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3 relative overflow-hidden flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">bloodtype</span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-surface-container text-on-surface-variant">
                                        Mengumpulkan (3/14)
                                    </span>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[11px] text-on-surface-variant uppercase font-semibold">
                                        Gula Darah Puasa
                                    </span>
                                    <div className="text-2xl font-heading font-black text-on-surface mt-0.5">
                                        94 <span className="text-xs font-normal text-on-surface-variant">mg/dL</span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant mt-1">
                                        Rentang normal puasa PERKENI: 70 - 99 mg/dL.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleOpenQuickLog('blood_glucose')}
                                className="w-full py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span>
                                <span>Catat Glukosa</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* 5. Active Insights & Evidence Card */}
                {activeInsights && activeInsights.length > 0 && (
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="font-heading font-bold text-base sm:text-lg text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-[22px]">lightbulb</span>
                                <span>Wawasan Kebiasaan Terdeteksi (Behavior Insights Engine)</span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {activeInsights.map((insight) => (
                                <div
                                    key={insight.id}
                                    className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4"
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
                                            className="text-xs font-semibold text-on-surface-variant hover:text-on-surface self-start sm:self-auto cursor-pointer"
                                        >
                                            Arsipkan Wawasan
                                        </button>
                                    </div>

                                    {/* Narrative & Context */}
                                    <div className="space-y-2.5 text-xs text-on-surface-variant leading-relaxed">
                                        <p className="text-on-surface font-medium">{insight.observation}</p>
                                        <p>{insight.context}</p>
                                        <div className="p-3.5 bg-surface-container-low rounded-2xl border border-surface-container text-on-surface">
                                            <strong className="text-primary">Mengapa ini penting?</strong> {insight.why_it_matters}
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
                                            <span className="font-heading font-bold text-sm text-rose-600 font-mono">
                                                {insight.difference_value}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Recommendations List */}
                                    {insight.recommendations && insight.recommendations.length > 0 && (
                                        <div className="space-y-2 pt-1">
                                            <span className="font-label-mono text-[10px] uppercase font-bold text-primary tracking-wider block">
                                                Rekomendasi Mikro-Kebiasaan Terpandu:
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
                                                                className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[11px] font-semibold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
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

                {/* 6. Coach & Care Team */}
                {instructor && (
                    <section className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">stethoscope</span>
                            </div>
                            <div>
                                <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                                    Instruktur Terverifikasi Anda
                                </span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    {instructor.name}
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Mendampingi pemantauan baseline, review deviasi kebiasaan, dan rencana intervensi gaya hidup Anda.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/member/consultations-hub"
                            className="py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface border border-surface-container flex items-center gap-2 cursor-pointer transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                            <span>Konsultasi Dokter</span>
                        </Link>
                    </section>
                )}

                {/* 7. Achievements & Badges Showcase */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-800 mb-1">
                                <span className="material-symbols-outlined text-[14px]">military_tech</span>
                                <span>PENGHARGAAN & DISIPLIN PREVENTIF</span>
                            </div>
                            <h2 className="font-heading font-bold text-base sm:text-lg text-on-surface">Pencapaian & Lencana Kesehatan</h2>
                            <p className="text-xs text-on-surface-variant">
                                Kumpulkan lencana konsistensi dan tukarkan poin reward untuk konsultasi dokter spesialis.
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-black font-mono text-primary">{totalPoints} Poin</span>
                            <span className="text-[10px] text-on-surface-variant block">Total Akumulasi</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {achievements && achievements.length > 0 ? (
                            achievements.map((ach) => (
                                <div
                                    key={ach.id}
                                    className={`p-4 rounded-2xl border transition-all text-center space-y-2.5 ${
                                        ach.is_unlocked
                                            ? 'bg-white dark:bg-surface border-primary/30 shadow-xs'
                                            : 'bg-surface-container-lowest border-surface-container opacity-60'
                                    }`}
                                >
                                    <div className={`w-11 h-11 rounded-2xl mx-auto flex items-center justify-center ${
                                        ach.is_unlocked ? 'bg-primary/10 text-primary' : 'bg-surface-container text-on-surface-variant'
                                    }`}>
                                        <span className="material-symbols-outlined text-[24px]">
                                            {getAchievementIcon(ach.key)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xs text-on-surface">{ach.name}</h4>
                                        <p className="text-[10px] text-on-surface-variant line-clamp-2 mt-0.5">{ach.description}</p>
                                    </div>
                                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                                        ach.is_unlocked ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-surface-container text-on-surface-variant'
                                    }`}>
                                        {ach.is_unlocked ? `Terbuka (+${ach.points} pt)` : `Terkunci (+${ach.points} pt)`}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 p-4 text-center rounded-2xl bg-surface-container-lowest text-xs text-on-surface-variant">
                                Belum ada badge tersedia.
                            </div>
                        )}
                    </div>
                </section>

                {/* 8. Tingkatan Member & Kuota */}
                <section className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-600 text-[20px]">workspace_premium</span>
                            <span className="font-heading font-black text-sm uppercase tracking-wider text-on-surface">
                                Tingkatan Anda: <span className="text-amber-700 dark:text-amber-400">{membership?.tier || 'Gold Member'}</span>
                            </span>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                            Kuota Pindai Kamera: <strong>{membership?.scan_limit || '15 / hari'}</strong> • Kuota Konsultasi: <strong>{membership?.consultation_quota || '4 Sesi / bulan'}</strong>
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setTierModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-2xs transition-all active:scale-95 shrink-0 cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                        <span>Bandingkan & Tingkatkan Paket</span>
                    </button>
                </section>
            </div>

            {/* Live Camera Scanner Modal */}
            <LiveCameraScannerModal
                isOpen={scannerModalOpen}
                onClose={() => setScannerModalOpen(false)}
            />

            {/* Membership Tier Modal */}
            <MembershipTierModal
                isOpen={tierModalOpen}
                onClose={() => setTierModalOpen(false)}
                currentTier={membership?.tier || 'Gold'}
            />

            {/* Quick Log Modal */}
            <QuickLogModal
                isOpen={quickLogOpen}
                onClose={() => setQuickLogOpen(false)}
                defaultMetric={quickLogMetric}
            />
        </AppLayout>
    );
}
