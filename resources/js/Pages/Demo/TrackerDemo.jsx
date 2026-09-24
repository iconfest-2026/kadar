import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function TrackerDemo() {
    const [glucoseInput, setGlucoseInput] = useState(115);
    const [stepsInput, setStepsInput] = useState(8500);
    const [sleepInput, setSleepInput] = useState(7.2);

    // Calculate dynamic risk & signal
    const isGlucoseHigh = glucoseInput >= 126;
    const isGlucosePrediabetes = glucoseInput >= 100 && glucoseInput < 126;
    const isStepsOptimal = stepsInput >= 8000;
    const isSleepOptimal = sleepInput >= 7.0;

    let overallRisk = 'TERKONTROL';
    let riskColor = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
    let hbeSignal = 'Pola metabolisme berada dalam batas toleransi normal 14-hari.';
    let microTask = 'Pertahankan ritme jalan santai pasca santap malam 15 menit.';

    if (isGlucoseHigh) {
        overallRisk = 'PERHATIAN TINGGI';
        riskColor = 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
        hbeSignal = 'Terdeteksi anomali glukosa puasa melampaui ambang batas klinis 126 mg/dL.';
        microTask = 'Protokol Darurat: Eliminasi karbohidrat cair dan hubungi dokter spesialis.';
    } else if (isGlucosePrediabetes) {
        overallRisk = 'RISIKO MODERAT (PRE-DIABETES)';
        riskColor = 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
        hbeSignal = 'Glukosa darah puasa menunjukkan resistensi insulin awal (100–125 mg/dL).';
        microTask = 'Target Mikro: Naikkan langkah harian ke 10.000 dan konsumsi 30g serat/hari.';
    }

    return (
        <MarketingLayout>
            <Head title="Demo Tracker & Rolling Baselines — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Tracker &amp; Metrik Baseline</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">monitoring</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 3</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Rolling Baselines 14-Hari &amp; Mesin HBE
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                AEVYRA tidak sekadar mencatat angka. Health Behavior Engine (HBE) membangun rentang biologis personal 14-hari dan menerbitkan intervensi mikro non-alarmist.
                            </p>
                        </div>

                        <Link
                            href="/member/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                            <span>Buka Dashboard Member</span>
                        </Link>
                    </div>
                </div>

                {/* 4 Stat Cards: Rolling Baselines Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Baseline Glukosa Puasa</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            104 <span className="text-xs font-normal text-on-surface-variant font-sans">± 6 mg/dL</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold block">Validasi 14 Hari DQS 94%</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Baseline Tekanan Darah</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            118/78 <span className="text-xs font-normal text-on-surface-variant font-sans">mmHg</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Kategori Normotensif</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Aktivitas Langkah Harian</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            8,420 <span className="text-xs font-normal text-on-surface-variant font-sans">langkah</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 block">Target 10.000 langkah</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Rerata Kualitas Tidur</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-on-surface font-mono">
                            7.4 <span className="text-xs font-normal text-on-surface-variant font-sans">jam</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Deep Sleep 1j 45m</span>
                    </div>
                </div>

                {/* Interactive Simulator: Adjust Sliders & Watch HBE Engine Calculate Signals */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive Metric Input Sliders (6 Cols) */}
                    <div className="lg:col-span-6 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Simulasi Input Log Harian
                                </h3>
                            </div>
                            <span className="text-xs text-on-surface-variant font-mono">Geser untuk menguji</span>
                        </div>

                        {/* Slider 1: Glucose */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-on-surface">Glukosa Darah Puasa:</span>
                                <span className="font-mono text-base font-bold text-primary">{glucoseInput} mg/dL</span>
                            </div>
                            <input
                                type="range"
                                min="70"
                                max="220"
                                value={glucoseInput}
                                onChange={(e) => setGlucoseInput(Number(e.target.value))}
                                className="w-full accent-primary cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                                <span>Normal (&lt;100)</span>
                                <span>Pre-Diabetes (100-125)</span>
                                <span>Tinggi (≥126)</span>
                            </div>
                        </div>

                        {/* Slider 2: Steps */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-on-surface">Aktivitas Langkah:</span>
                                <span className="font-mono text-base font-bold text-primary">
                                    {stepsInput.toLocaleString('id-ID')} langkah
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1000"
                                max="15000"
                                step="500"
                                value={stepsInput}
                                onChange={(e) => setStepsInput(Number(e.target.value))}
                                className="w-full accent-primary cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                                <span>Sedentari (1k)</span>
                                <span>Sedang (7k)</span>
                                <span>Optimal (10k+)</span>
                            </div>
                        </div>

                        {/* Slider 3: Sleep */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-on-surface">Durasi Tidur:</span>
                                <span className="font-mono text-base font-bold text-primary">{sleepInput} jam</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="10"
                                step="0.2"
                                value={sleepInput}
                                onChange={(e) => setSleepInput(Number(e.target.value))}
                                className="w-full accent-primary cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-on-surface-variant font-mono">
                                <span>Kurang (&lt;6j)</span>
                                <span>Cukup (7–8j)</span>
                                <span>Lebih (&gt;9j)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: HBE Engine Response & Micro-Task Generation (6 Cols) */}
                    <div className="lg:col-span-6 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Output Health Behavior Engine (HBE)
                                </h3>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${riskColor}`}>
                                {overallRisk}
                            </span>
                        </div>

                        {/* Signal Explanation */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                                <span className="material-symbols-outlined text-primary text-[18px]">troubleshoot</span>
                                <span>Deteksi Deviasi Fisiologis:</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">{hbeSignal}</p>
                        </div>

                        {/* Prescriptive Micro-Task */}
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-primary">
                                <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                                <span>Tugas Mikro Kebiasaan Diterbitkan:</span>
                            </div>
                            <p className="text-xs text-on-surface-variant font-semibold leading-relaxed">{microTask}</p>
                            <span className="text-[10px] text-primary font-mono block pt-1">
                                Intervensi berbasis prinsip Tiny Habits &amp; Behavioral Nudge
                            </span>
                        </div>

                        {/* DQS Integrity Callout */}
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
                            <span className="font-medium text-emerald-900 dark:text-emerald-200">
                                Integritas Data DQS: Terverifikasi (96%)
                            </span>
                            <Link
                                href="/register"
                                className="px-3 py-1.5 rounded-xl bg-primary text-white font-bold text-xs shadow-2xs hover:bg-primary-container transition-all"
                            >
                                Simpan Baseline
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}

