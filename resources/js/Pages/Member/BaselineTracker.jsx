import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import BaselineTrendCard from '../../Components/BaselineTrendCard';
import QuickLogModal from '../../Components/QuickLogModal';

export default function BaselineTracker({
    baselines = {},
    recentHistory = {},
    stats = {},
    selectedDays = 30,
}) {
    const [quickLogOpen, setQuickLogOpen] = useState(false);
    const [quickLogMetric, setQuickLogMetric] = useState('blood_glucose');

    const handleOpenQuickLog = (metric) => {
        setQuickLogMetric(metric);
        setQuickLogOpen(true);
    };

    return (
        <AppLayout title="Tracker & Tren Baseline" activeTab="tracker">
            <Head title="Tracker & Tren Baseline - AEVYRA" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-container pb-5">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium mb-1">
                            <Link href="/member/dashboard" className="hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-primary font-bold">Tracker Baseline</span>
                        </div>
                        <h1 className="font-heading font-black text-xl sm:text-2xl text-on-surface tracking-tight">
                            Tracker &amp; Grafik Tren Baseline Biometrik
                        </h1>
                        <p className="text-xs text-on-surface-variant mt-0.5 max-w-xl leading-relaxed">
                            Analisis kurva fluktuasi metabolisme personal Anda terhadap garis acuan bergerak 14-hari (*rolling baseline* HBE Engine).
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleOpenQuickLog('blood_glucose')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            <span>Catat Rekaman Baru</span>
                        </button>
                    </div>
                </div>

                {/* 4 Stat Overview Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Glucose Stat */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-on-surface-variant">
                            <span className="text-[10px] font-label-mono font-bold uppercase">Gula Darah</span>
                            <span className="material-symbols-outlined text-rose-500 text-[18px]">bloodtype</span>
                        </div>
                        <div className="font-heading font-extrabold text-xl text-on-surface font-mono">
                            {baselines?.blood_glucose?.value_primary ? Math.round(baselines.blood_glucose.value_primary) : 95}
                            <span className="text-xs font-normal text-on-surface-variant ml-1 font-sans">mg/dL</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                            Baseline 14-Hari Stabil
                        </span>
                    </div>

                    {/* Steps Stat */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-on-surface-variant">
                            <span className="text-[10px] font-label-mono font-bold uppercase">Langkah Kaki</span>
                            <span className="material-symbols-outlined text-emerald-500 text-[18px]">directions_walk</span>
                        </div>
                        <div className="font-heading font-extrabold text-xl text-on-surface font-mono">
                            {baselines?.steps?.value_primary ? Number(Math.round(baselines.steps.value_primary)).toLocaleString('id-ID') : '7.500'}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            Rerata Harian
                        </span>
                    </div>

                    {/* Sleep Stat */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-on-surface-variant">
                            <span className="text-[10px] font-label-mono font-bold uppercase">Durasi Tidur</span>
                            <span className="material-symbols-outlined text-indigo-500 text-[18px]">bedtime</span>
                        </div>
                        <div className="font-heading font-extrabold text-xl text-on-surface font-mono">
                            {baselines?.sleep_duration?.value_primary ? (parseFloat(baselines.sleep_duration.value_primary) / 60).toFixed(1) : '7.2'}
                            <span className="text-xs font-normal text-on-surface-variant ml-1 font-sans">jam</span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-bold block">
                            Rentang Pemulihan
                        </span>
                    </div>

                    {/* Water Stat */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-1">
                        <div className="flex items-center justify-between text-on-surface-variant">
                            <span className="text-[10px] font-label-mono font-bold uppercase">Air Minum</span>
                            <span className="material-symbols-outlined text-sky-500 text-[18px]">water_drop</span>
                        </div>
                        <div className="font-heading font-extrabold text-xl text-on-surface font-mono">
                            {baselines?.water_intake?.value_primary ? Number(Math.round(baselines.water_intake.value_primary)).toLocaleString('id-ID') : '2.200'}
                            <span className="text-xs font-normal text-on-surface-variant ml-1 font-sans">ml</span>
                        </div>
                        <span className="text-[10px] text-sky-600 font-bold block">
                            Hidrasi Terjaga
                        </span>
                    </div>
                </div>

                {/* Main Interactive Chart Component */}
                <BaselineTrendCard
                    baselines={baselines}
                    recentHistory={recentHistory}
                    onOpenQuickLog={handleOpenQuickLog}
                />

                {/* Educational Banner regarding HBE Baseline */}
                <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-emerald-500/10 to-primary/10 border border-primary/20 space-y-2">
                    <div className="flex items-center gap-2 text-primary font-bold text-xs sm:text-sm">
                        <span className="material-symbols-outlined text-[18px]">verified_user</span>
                        <span>Mengenal Prinsip Garis Acuan Normal (*Rolling Baseline*)</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                        AEVYRA tidak membandingkan tubuh Anda dengan patokan kaku populasi umum. Setiap tubuh memiliki variasi biologis unik. Garis putus-putus teal dihitung menggunakan rata-rata bergerak dan interquartile range (IQR) selama 14 hari terakhir untuk memastikan deteksi perubahan kebiasaan berlangsung akurat tanpa alarm kecemasan palsu.
                    </p>
                </div>
            </div>

            {/* Quick Log Modal */}
            <QuickLogModal
                isOpen={quickLogOpen}
                onClose={() => setQuickLogOpen(false)}
                defaultMetric={quickLogMetric}
            />
        </AppLayout>
    );
}

