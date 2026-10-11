import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import QuickLogModal from '../../Components/QuickLogModal';
import LiveCameraScannerModal from '../../Components/LiveCameraScannerModal';
import MembershipTierModal from '../../Components/MembershipTierModal';
import DashboardNotificationFeed from '../../Components/DashboardNotificationFeed';

export default function Dashboard({
    user,
    profile,
    lifestyle,
    baselines,
    recentHistory,
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

    return (
        <AppLayout title="Dashboard Kesehatan" activeTab="dashboard">
            <Head title="Ringkasan Kesehatan - AEVYRA" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-4 pb-2">
                
                {/* 1. Mobile-Style Compact Header Profile */}
                <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <span className="text-[10px] font-label-mono text-emerald-200 uppercase font-bold tracking-wider block">
                                {membership?.tier || 'Silver'} Member
                            </span>
                            <h1 className="font-heading font-black text-lg sm:text-xl truncate leading-tight">
                                Halo, {user?.name?.split(' ')[0] || 'Kawan'}!
                            </h1>
                            <p className="text-[11px] text-white/80 mt-0.5">
                                Target hari ini tetap stabil &amp; teratur
                            </p>
                        </div>

                        {/* Streak & Points Mini Badges */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="px-3 py-1.5 rounded-xl bg-black/20 border border-white/10 text-center">
                                <span className="material-symbols-outlined text-amber-300 text-[18px] block">local_fire_department</span>
                                <span className="font-mono font-bold text-xs leading-none block mt-0.5">
                                    {streak?.current || 1}h
                                </span>
                            </div>
                            <div className="px-3 py-1.5 rounded-xl bg-black/20 border border-white/10 text-center">
                                <span className="material-symbols-outlined text-emerald-300 text-[18px] block">stars</span>
                                <span className="font-mono font-bold text-xs leading-none block mt-0.5">
                                    {totalPoints || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Primary 4-Button Quick Actions (App-Style) */}
                <div className="grid grid-cols-4 gap-2 text-center">
                    <Link
                        href="/member/scanner"
                        className="p-2.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs active:scale-95 transition-all flex flex-col items-center gap-1.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface truncate w-full">Scan Makanan</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => handleOpenQuickLog('blood_glucose')}
                        className="p-2.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs active:scale-95 transition-all flex flex-col items-center gap-1.5 group cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">bloodtype</span>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface truncate w-full">Gula Darah</span>
                    </button>

                    <Link
                        href="/member/timeline"
                        className="p-2.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs active:scale-95 transition-all flex flex-col items-center gap-1.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">history_edu</span>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface truncate w-full">Riwayat</span>
                    </Link>

                    <Link
                        href="/member/consultations-hub"
                        className="p-2.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs active:scale-95 transition-all flex flex-col items-center gap-1.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[20px]">stethoscope</span>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface truncate w-full">Dokter</span>
                    </Link>
                </div>

                {/* Notifications & Actionable Reminders Feed */}
                <DashboardNotificationFeed role="member" maxItems={3} />

                {/* 3. Biomarkers Vitals 4-Grid (Data Inti Kesehatan) */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="font-heading font-bold text-xs uppercase tracking-wider text-on-surface-variant font-label-mono">
                            Biomarker Kunci Harian
                        </h2>
                        <Link href="/member/timeline" className="text-[11px] text-primary font-bold hover:underline">
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {/* Sleep Card */}
                        <div 
                            onClick={() => handleOpenQuickLog('sleep_duration')}
                            className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="material-symbols-outlined text-indigo-500 text-[18px]">bedtime</span>
                                <span className="text-[9px] font-label-mono text-on-surface-variant font-bold uppercase">Tidur</span>
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-lg text-on-surface font-mono">
                                    5j 42m
                                </div>
                                <span className="text-[10px] text-on-surface-variant block mt-0.5">Target: 7-8 jam</span>
                            </div>
                        </div>

                        {/* Water Card */}
                        <div 
                            onClick={() => handleOpenQuickLog('water_intake')}
                            className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="material-symbols-outlined text-sky-500 text-[18px]">water_drop</span>
                                <span className="text-[9px] font-label-mono text-on-surface-variant font-bold uppercase">Air</span>
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-lg text-on-surface font-mono">
                                    1.500 <span className="text-[10px] font-normal text-on-surface-variant">ml</span>
                                </div>
                                <span className="text-[10px] text-on-surface-variant block mt-0.5">Target: 2.000 ml</span>
                            </div>
                        </div>

                        {/* Steps Card */}
                        <div 
                            onClick={() => handleOpenQuickLog('steps')}
                            className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="material-symbols-outlined text-emerald-500 text-[18px]">directions_walk</span>
                                <span className="text-[9px] font-label-mono text-on-surface-variant font-bold uppercase">Langkah</span>
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-lg text-on-surface font-mono">
                                    6.420
                                </div>
                                <span className="text-[10px] text-on-surface-variant block mt-0.5">Target: 8.000</span>
                            </div>
                        </div>

                        {/* Blood Glucose Card */}
                        <div 
                            onClick={() => handleOpenQuickLog('blood_glucose')}
                            className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/40 shadow-2xs transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="material-symbols-outlined text-rose-500 text-[18px]">bloodtype</span>
                                <span className="text-[9px] font-label-mono text-on-surface-variant font-bold uppercase">Glukosa</span>
                            </div>
                            <div>
                                <div className="font-heading font-extrabold text-lg text-on-surface font-mono">
                                    94 <span className="text-[10px] font-normal text-on-surface-variant">mg/dL</span>
                                </div>
                                <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Normal (Puasa)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3b. Ringkasan Singkat & Shortcut: Tracker & Tren Baseline (Fitur 03) */}
                <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">monitoring</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-xs sm:text-sm text-on-surface leading-tight">
                                    Tracker &amp; Tren Baseline
                                </h3>
                                <p className="text-[10px] text-on-surface-variant">
                                    Rolling 14-Hari HBE Engine
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/member/tracker"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all active:scale-95"
                        >
                            <span>Buka Grafik Penuh</span>
                            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-[10px] text-on-surface-variant block">Baseline Glukosa</span>
                            <span className="font-mono font-bold text-primary text-sm">
                                {baselines?.blood_glucose?.value_primary ? Math.round(baselines.blood_glucose.value_primary) : 95} mg/dL
                            </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-[10px] text-on-surface-variant block">Baseline Langkah</span>
                            <span className="font-mono font-bold text-emerald-600 text-sm">
                                {baselines?.steps?.value_primary ? Number(Math.round(baselines.steps.value_primary)).toLocaleString('id-ID') : '7.500'}
                            </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-[10px] text-on-surface-variant block">Baseline Tidur</span>
                            <span className="font-mono font-bold text-indigo-600 text-sm">
                                {baselines?.sleep_duration?.value_primary ? (parseFloat(baselines.sleep_duration.value_primary) / 60).toFixed(1) : '7.2'} jam
                            </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container">
                            <span className="text-[10px] text-on-surface-variant block">Baseline Air</span>
                            <span className="font-mono font-bold text-sky-600 text-sm">
                                {baselines?.water_intake?.value_primary ? Number(Math.round(baselines.water_intake.value_primary)).toLocaleString('id-ID') : '2.200'} ml
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. Ringkasan Singkat & Shortcut: Kesehatan Spesifik Gender (Fitur 12) */}
                <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                            profile?.sex === 'FEMALE' ? 'bg-primary/10 text-primary' : 'bg-sky-500/10 text-sky-600'
                        }`}>
                            <span className="material-symbols-outlined text-[22px]">
                                {profile?.sex === 'FEMALE' ? 'calendar_month' : 'fitness_center'}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <h3 className="font-heading font-bold text-xs sm:text-sm text-on-surface truncate">
                                    {profile?.sex === 'FEMALE' ? 'Siklus Hormonal & Haid' : 'Skrining Lemak Viseral & Vitalitas'}
                                </h3>
                                <span className={`px-2 py-0.2 rounded-full text-[9px] font-label-mono font-bold uppercase ${
                                    profile?.sex === 'FEMALE' ? 'bg-primary/10 text-primary' : 'bg-sky-500/10 text-sky-600'
                                }`}>
                                    {profile?.sex === 'FEMALE' ? 'Wanita' : 'Pria'}
                                </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant truncate mt-0.5">
                                {profile?.sex === 'FEMALE'
                                    ? 'Kalender prediksi haid, fase ovulasi & toleransi insulin'
                                    : 'Pemantauan rasio lingkar pinggang (WHtR) & aktivasi GLUT-4'}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/member/vitality"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-xs font-bold shrink-0 transition-all active:scale-95"
                    >
                        <span>Kelola</span>
                        <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </Link>
                </div>

                {/* 5. Health Insight Snippet (Jika Ada Sinyal Penting) */}
                {activeInsights && activeInsights.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                                <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                                <span>Saran Kesehatan Hari Ini</span>
                            </div>
                            <span className="text-[10px] font-label-mono text-amber-700 font-medium">HBE AI</span>
                        </div>
                        <p className="text-xs text-on-surface leading-relaxed">
                            {activeInsights[0]?.observation || 'Pola glukosa dan waktu istirahat Anda dalam rentang yang stabil.'}
                        </p>
                    </div>
                )}

                {/* 6. Assigned Instructor Mini Card */}
                {instructor && (
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[20px]">stethoscope</span>
                            </div>
                            <div className="min-w-0">
                                <span className="text-[9px] font-label-mono uppercase text-primary font-bold block">Dokter Pendamping</span>
                                <h4 className="font-bold text-xs text-on-surface truncate">{instructor.name}</h4>
                            </div>
                        </div>

                        <Link
                            href="/member/consultations-hub"
                            className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface shrink-0"
                        >
                            Konsultasi
                        </Link>
                    </div>
                )}
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
                availableTiers={membership?.all_tiers || []}
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
