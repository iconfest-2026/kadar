import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function TrackerDemo() {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const [glucoseInput, setGlucoseInput] = useState(115);
    const [stepsInput, setStepsInput] = useState(8500);
    const [sleepInput, setSleepInput] = useState(7.2);
    const [metricCategory, setMetricCategory] = useState('all');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [saveBaselineModal, setSaveBaselineModal] = useState(false);

    // Calculate dynamic risk & signal
    const isGlucoseHigh = glucoseInput >= 126;
    const isGlucosePrediabetes = glucoseInput >= 100 && glucoseInput < 126;
    const isStepsOptimal = stepsInput >= 8000;
    const isSleepOptimal = sleepInput >= 7.0;

    let overallRisk = 'TERKONTROL';
    let riskColor = 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold';
    let hbeSignal = 'Pola metabolisme berada dalam batas toleransi normal 14-hari.';
    let microTask = 'Pertahankan ritme jalan santai pasca santap malam 15 menit.';

    if (isGlucoseHigh) {
        overallRisk = 'PERHATIAN TINGGI';
        riskColor = 'bg-rose-100 text-rose-950 border-rose-300 font-bold';
        hbeSignal = 'Terdeteksi anomali glukosa puasa melampaui ambang batas klinis 126 mg/dL.';
        microTask = 'Protokol Darurat: Eliminasi karbohidrat cair dan hubungi dokter spesialis.';
    } else if (isGlucosePrediabetes) {
        overallRisk = 'RISIKO MODERAT (PRE-DIABETES)';
        riskColor = 'bg-amber-100 text-amber-950 border-amber-300 font-bold';
        hbeSignal = 'Glukosa darah puasa menunjukkan resistensi insulin awal (100–125 mg/dL).';
        microTask = 'Target Mikro: Naikkan langkah harian ke 10.000 dan konsumsi 30g serat/hari.';
    }

    const biomarkerCards = [
        {
            id: 'glucose',
            category: 'glycemic',
            title: 'Glukosa Puasa & Post-Prandial',
            categoryLabel: 'Glikemik & Gula',
            target: '< 100 mg/dL (Puasa) • < 140 mg/dL (2 Jam PP)',
            tir: 'Target TIR > 70%',
            badgeColor: 'bg-primary/10 text-primary border-primary/20',
            desc: 'Memantau amplitudo lonjakan gula setelah makan dan stabilitas fajar (Dawn Phenomenon) untuk melindungi fungsi sel beta pankreas.',
            indicator: 'Stabilitas Glikemik 14-Hari: 92% Dalam Rentang Target',
            icon: 'bloodtype',
        },
        {
            id: 'blood_pressure',
            category: 'cardio',
            title: 'Variabilitas Tekanan Darah',
            categoryLabel: 'Kardiovaskular',
            target: '< 120/80 mmHg (Normotensif)',
            tir: 'Beban Vaskular Rendah',
            badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
            desc: 'Menganalisis korelasi fluktuasi tekanan darah sistolik/diastolik dengan konsumsi natrium harian dan kekakuan vaskular perifer.',
            indicator: 'Rerata Rolling: 118/78 mmHg (Bebas Tekanan Vaskular)',
            icon: 'favorite',
        },
        {
            id: 'steps',
            category: 'activity',
            title: 'Aktivitas Langkah & Post-Meal Walk',
            categoryLabel: 'Aktivitas & Gerak',
            target: '8.000 – 10.000 Langkah/Hari',
            tir: 'Aktivasi Otot Soleus',
            badgeColor: 'bg-primary/10 text-primary border-primary/20',
            desc: 'Memanfaatkan kontraksi serat lambat otot soleus betis pasca makan untuk menyerap glukosa darah langsung ke otot tanpa memerlukan lonjakan insulin tinggi.',
            indicator: 'Post-Meal Walk: 15 Menit Menurunkan Lonjakan Glukosa 42%',
            icon: 'directions_walk',
        },
        {
            id: 'sleep',
            category: 'circadian',
            title: 'Arsitektur Tidur & Ritme Sirkadian',
            categoryLabel: 'Pemulihan & Tidur',
            target: '7.0 – 8.5 Jam (Deep Sleep > 1.5 Jam)',
            tir: 'Kortisol Seimbang',
            badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
            desc: 'Kualitas fase tidur nyenyak memulihkan kepekaan reseptor insulin dan mencegah pelepasan hormon kortisol berlebih yang memicu resistensi insulin.',
            indicator: 'Efisiensi Tidur: 88% (Rasio Restorative Sleep Optimal)',
            icon: 'bedtime',
        },
        {
            id: 'hydration',
            category: 'cardio',
            title: 'Hidrasi & Viskositas Darah',
            categoryLabel: 'Kardiovaskular',
            target: '2.0 – 2.5 Liter Air Mineral/Hari',
            tir: 'Osmolalitas Normal',
            badgeColor: 'bg-primary/10 text-primary border-primary/20',
            desc: 'Kecukupan cairan mencegah hemokonsentrasi yang kerap membuat angka glukosa tampak meningkat semu dan membebani filtrasi glomerulus ginjal.',
            indicator: 'Intake Harian Terpenuhi: 2.3L Rata-rata 14 Hari',
            icon: 'water_drop',
        },
        {
            id: 'dqs',
            category: 'glycemic',
            title: 'Data Quality Score (DQS)',
            categoryLabel: 'Glikemik & Gula',
            target: 'Skor Validitas > 85% Konsisten',
            tir: 'Filter Outlier AI',
            badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20',
            desc: 'Algoritma mendeteksi kesalahan pengukuran alat (strip expired/jari kotor) dan memisahkan deviasi nyata dari noise data secara akurat.',
            indicator: 'Integritas Rekam Medis: 96% Data Terverifikasi AI',
            icon: 'verified',
        },
    ];

    const filteredBiomarkers = biomarkerCards.filter((card) => {
        if (metricCategory === 'all') return true;
        return card.category === metricCategory;
    });

    const comparisonRows = [
        {
            dimension: 'Metodologi Analisis',
            conventional: 'Angka titik statis terisolasi tanpa konteks fisiologis',
            hbe: 'Rolling baseline 14-hari dinamis berorientasi variabilitas',
        },
        {
            dimension: 'Respon Peringatan',
            conventional: 'Peringatan alarm merah panik tanpa solusi konkret',
            hbe: 'Non-alarmist dengan micro-habits terarah (Tiny Habits)',
        },
        {
            dimension: 'Korelasi Multi-Faktor',
            conventional: 'Glukosa, tidur, dan langkah dicatat di grafik terpisah',
            hbe: 'AI mengkorelasikan kurang tidur & langkah minim dengan lonjakan gula',
        },
        {
            dimension: 'Integritas Data',
            conventional: 'Data acak tanpa validasi rentan kesalahan strip/sensor',
            hbe: 'Data Quality Score (DQS) menyaring anomali & outlier otomatis',
        },
        {
            dimension: 'Kesiapan Konsultasi Dokter',
            conventional: 'Catatan tulisan tangan yang sulit dibaca dokter spesialis',
            hbe: 'Resume tren terstandarisasi siap pakai di telekonsultasi dokter IDI',
        },
    ];

    return (
        <MarketingLayout>
            <Head title="Demo Tracker & Rolling Baselines - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                {/* 1. Header */}
                <div className="space-y-3 border-b border-[#cfe0d5] pb-6">
                    <div className="flex items-center gap-2 text-xs text-[#222222] font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Tracker &amp; Metrik Baseline</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-black tracking-tight">
                                Rolling Baselines 14-Hari &amp; Mesin HBE
                            </h1>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium mt-1 max-w-2xl leading-relaxed">
                                AEVYRA tidak sekadar mencatat angka. Health Behavior Engine (HBE) membangun rentang biologis personal 14-hari dan menerbitkan intervensi mikro non-alarmist.
                            </p>
                        </div>

                        <Link
                            href={authUser ? '/member/dashboard' : '/register'}
                            className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {authUser ? 'space_dashboard' : 'person_add'}
                            </span>
                            <span>
                                {authUser ? 'Buka Dashboard Member' : 'Daftar Akun Baru'}
                            </span>
                        </Link>
                    </div>
                </div>

                {/* 2. 4 Stat Cards: Rolling Baselines Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <span className="text-xs text-[#333333] font-bold">Baseline Glukosa Puasa</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            104 <span className="text-xs font-bold text-[#333333] font-sans">± 6 mg/dL</span>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-bold block">Validasi 14 Hari DQS 94%</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <span className="text-xs text-[#333333] font-bold">Baseline Tekanan Darah</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            118/78 <span className="text-xs font-bold text-[#333333] font-sans">mmHg</span>
                        </div>
                        <span className="text-[11px] text-[#222222] font-semibold block">Kategori Normotensif</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <span className="text-xs text-[#333333] font-bold">Aktivitas Langkah Harian</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-800 font-mono">
                            8,420 <span className="text-xs font-bold text-[#333333] font-sans">langkah</span>
                        </div>
                        <span className="text-[11px] text-emerald-800 font-bold block">Target 10.000 langkah</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-1">
                        <span className="text-xs text-[#333333] font-bold">Rerata Kualitas Tidur</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-black font-mono">
                            7.4 <span className="text-xs font-bold text-[#333333] font-sans">jam</span>
                        </div>
                        <span className="text-[11px] text-[#222222] font-semibold block">Deep Sleep 1j 45m</span>
                    </div>
                </div>

                {/* 3. Interactive Simulator: Adjust Sliders & Watch HBE Engine Calculate Signals */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive Metric Input Sliders (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#c4dcce] shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-[#e2eee6]">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                                <h3 className="font-heading font-bold text-base text-black">
                                    Simulasi Input Log Harian
                                </h3>
                            </div>
                            <span className="text-xs text-[#222222] font-mono font-bold">Geser untuk menguji</span>
                        </div>

                        {/* Slider 1: Glucose */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-[#f6faf7] border border-[#d8e8de]">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-black">Glukosa Darah Puasa:</span>
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
                            <div className="flex justify-between text-[11px] text-[#222222] font-mono font-bold">
                                <span>Normal (&lt;100)</span>
                                <span>Pre-Diabetes (100-125)</span>
                                <span>Tinggi (≥126)</span>
                            </div>
                        </div>

                        {/* Slider 2: Steps */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-[#f6faf7] border border-[#d8e8de]">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-black">Aktivitas Langkah:</span>
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
                            <div className="flex justify-between text-[11px] text-[#222222] font-mono font-bold">
                                <span>Sedentari (1k)</span>
                                <span>Sedang (7k)</span>
                                <span>Optimal (10k+)</span>
                            </div>
                        </div>

                        {/* Slider 3: Sleep */}
                        <div className="space-y-2 p-3.5 rounded-2xl bg-[#f6faf7] border border-[#d8e8de]">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-black">Durasi Tidur:</span>
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
                            <div className="flex justify-between text-[11px] text-[#222222] font-mono font-bold">
                                <span>Kurang (&lt;6j)</span>
                                <span>Cukup (7–8j)</span>
                                <span>Lebih (&gt;9j)</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: HBE Engine Response & Micro-Task Generation (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#c4dcce] shadow-xs p-4 sm:p-6 space-y-4 sm:space-y-5">
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e2eee6]">
                            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0">smart_toy</span>
                                <h3 className="font-heading font-bold text-xs sm:text-base text-black truncate sm:overflow-visible">
                                    Output Health Behavior Engine (HBE)
                                </h3>
                            </div>
                            <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-mono font-bold border shrink-0 whitespace-nowrap inline-flex items-center ${riskColor}`}>
                                {overallRisk}
                            </span>
                        </div>

                        {/* 2 Columns on Mobile & Desktop (Sebaris 2 Isi) */}
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                            {/* Signal Explanation */}
                            <div className="p-3 sm:p-4 rounded-2xl bg-[#f6faf7] border border-[#d8e8de] space-y-1.5 sm:space-y-2 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-black">
                                        <span className="material-symbols-outlined text-primary text-[16px] sm:text-[18px] shrink-0">troubleshoot</span>
                                        <span className="leading-tight">Deteksi Deviasi Fisiologis:</span>
                                    </div>
                                    <p className="text-[10.5px] sm:text-xs text-[#222222] font-medium leading-relaxed">
                                        {hbeSignal}
                                    </p>
                                </div>
                            </div>

                            {/* Prescriptive Micro-Task */}
                            <div className="p-3 sm:p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1.5 sm:space-y-2 flex flex-col justify-between">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-primary">
                                        <span className="material-symbols-outlined text-[16px] sm:text-[18px] shrink-0">assignment_turned_in</span>
                                        <span className="leading-tight">Tugas Mikro Diterbitkan:</span>
                                    </div>
                                    <p className="text-[10.5px] sm:text-xs text-black font-bold leading-relaxed">
                                        {microTask}
                                    </p>
                                </div>
                                <span className="text-[9px] sm:text-[10px] text-primary font-mono font-bold block pt-1 leading-tight">
                                    Tiny Habits &amp; Behavioral Nudge
                                </span>
                            </div>
                        </div>

                        {/* DQS Integrity Callout (Single Line on Mobile) */}
                        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-between gap-1.5 sm:gap-2">
                            <span className="font-bold text-emerald-950 text-[9px] min-[360px]:text-[10px] sm:text-xs whitespace-nowrap">
                                Integritas Data DQS: Terverifikasi (96%)
                            </span>
                            <button
                                type="button"
                                onClick={() => setSaveBaselineModal(true)}
                                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-primary text-white font-bold text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs shadow-2xs hover:bg-primary-container transition-all cursor-pointer whitespace-nowrap shrink-0"
                            >
                                Simpan Baseline
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. WORKFLOW / 3-STEP PATHWAY: Bagaimana Rolling Baselines Bekerja? */}
                <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-[#c4dcce] shadow-xs space-y-4 sm:space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                        <h2 className="font-heading font-black text-base sm:text-3xl text-black">
                            Bagaimana Mesin Baseline AEVYRA Bekerja?
                        </h2>
                        <p className="text-[11px] sm:text-sm text-[#222222] font-medium leading-relaxed">
                            Proses 3 tahapan kontinu yang memetakan toleransi glukosa unik tubuh Anda tanpa alarm palsu dan tanpa stres berlebih.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-6">
                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                1
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Pencatatan Multi-Biomarker</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Catat glukosa puasa, tensi darah, hitungan langkah, dan jam tidur harian via antarmuka cepat atau koneksi glukometer digital.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                2
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Analisis Rentang Rolling 14-Hari</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Health Behavior Engine (HBE) menghitung deviasi standar personal 14 hari, menyaring fluktuasi sesaat dari tren resistensi insulin nyata.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                3
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Intervensi Mikro Preskriptif</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Dapatkan rekomendasi kebiasaan mikro realistis (jalan kaki 15 menit pasca makan, urutan serat) yang langsung menurunkan beban glukosa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. DIRECTORY: 4 Dimensi Biomarker yang Dilacak */}
                <div className="space-y-6">
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                                Dimensi Parameter Biomarker Terpantau
                            </h2>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium">
                                Pelacakan holistik yang mengintegrasikan metrik darah, vaskular, ritme gerak, dan kualitas pemulihan sirkadian.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap text-xs pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {[
                                { id: 'all', label: 'Semua Metrik' },
                                { id: 'glycemic', label: 'Glikemik & Gula' },
                                { id: 'cardio', label: 'Kardiovaskular' },
                                { id: 'activity', label: 'Aktivitas & Gerak' },
                                { id: 'circadian', label: 'Pemulihan & Tidur' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setMetricCategory(f.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        metricCategory === f.id
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : 'bg-white text-black border border-gray-400 hover:border-primary hover:text-primary font-bold'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                        {filteredBiomarkers.map((bio) => (
                            <div
                                key={bio.id}
                                className="bg-white rounded-2xl sm:rounded-3xl border border-[#c4dcce] shadow-xs p-3.5 sm:p-6 flex flex-col justify-between space-y-2.5 sm:space-y-4 hover:shadow-md transition-shadow"
                            >
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[18px] sm:text-[22px]">{bio.icon}</span>
                                        </div>
                                        <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[8.5px] sm:text-[10px] font-mono font-bold border self-start sm:self-auto ${bio.badgeColor}`}>
                                            {bio.tir}
                                        </span>
                                    </div>
                                    <div className="space-y-0.5 sm:space-y-1">
                                        <h3 className="font-heading font-bold text-xs sm:text-base text-black leading-snug">
                                            {bio.title}
                                        </h3>
                                        <span className="text-[9.5px] sm:text-[11px] font-mono font-bold text-primary block leading-tight">
                                            Target: {bio.target}
                                        </span>
                                        <p className="text-[10px] sm:text-xs text-[#222222] font-medium leading-snug sm:leading-relaxed pt-1">
                                            {bio.desc}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2 sm:pt-3 border-t border-[#e2eee6] text-[9px] sm:text-[11px] font-mono font-bold text-emerald-800 leading-tight">
                                    {bio.indicator}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. COMPARISON TABLE: Pencatatan Konvensional vs Health Behavior Engine (HBE) AEVYRA */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                            Mengapa Rolling Baselines Lebih Unggul dari Tracker Biasa?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#222222] font-medium">
                            Sebagian besar aplikasi kesehatan hanya menjadi buku catatan bisu. Mesin HBE AEVYRA mengubah data mentah menjadi tindakan preventif nyata.
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
                                            Konvensional
                                        </span>
                                        <p className="text-[10px] leading-snug">{row.conventional}</p>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-black space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-primary uppercase block">
                                            Health Behavior Engine (HBE)
                                        </span>
                                        <p className="text-[10px] font-semibold text-primary leading-snug">{row.hbe}</p>
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
                                    <th className="py-3 px-4 text-[#333333] font-bold">Pencatatan Konvensional</th>
                                    <th className="py-3 px-4 text-primary font-bold bg-primary/5 rounded-t-xl">Health Behavior Engine (HBE)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2eee6]">
                                {comparisonRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3.5 px-4 font-bold text-black">{row.dimension}</td>
                                        <td className="py-3.5 px-4 text-[#222222] font-medium">{row.conventional}</td>
                                        <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">{row.hbe}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* 8. FAQ ACCORDION (Landing Page Accordion Style) */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1">
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-black">
                            Pertanyaan Umum Seputar Tracker &amp; Mesin HBE
                        </h2>
                    </div>

                    <div className="space-y-2.5">
                        {[
                            {
                                q: 'Mengapa AEVYRA menggunakan sistem Rolling Baseline 14-hari?',
                                a: 'Kadar glukosa dan tekanan darah berfluktuasi secara alami akibat variasi hidrasi, stres, dan hormon. Evaluasi rata-rata dinamis 14-hari (Rolling Baseline) menyaring anomali sementara sehingga Anda mendapatkan gambaran sensitivitas insulin dan kesehatan metabolik jangka panjang yang sebenarnya.',
                            },
                            {
                                q: 'Apakah saya wajib memiliki alat CGM (Continuous Glucose Monitor) mahal?',
                                a: 'Tidak wajib. Sistem HBE AEVYRA dirancang untuk bekerja dengan glukometer tusuk jari konvensional yang terjangkau, tensimeter digital rumah tangga, serta sensor langkah bawaan smartphone Anda tanpa memerlukan perangkat invasif berbiaya tinggi.',
                            },
                            {
                                q: 'Bagaimana mesin HBE mencegah kepanikan saat angka glukosa saya naik (non-alarmist)?',
                                a: 'Alih-alih menyalakan alarm merah yang memicu stres kortisol, mesin HBE mengidentifikasi deviasi secara tenang dan langsung menerbitkan tugas mikro spesifik yang dapat dilakukan seketika (seperti jalan kaki santai 15 menit atau minum dua gelas air mineral).',
                            },
                            {
                                q: 'Apakah riwayat data ini dapat dilihat langsung oleh dokter spesialis?',
                                a: 'Ya. Seluruh catatan baseline, deviasi, dan skor DQS Anda otomatis tersinkronisasi ke rekam medis SatuSehat Kemenkes RI dan dapat langsung dievaluasi oleh dokter spesialis penyakit dalam (Sp.PD) maupun gizi klinis (Sp.GK) saat sesi telekonsultasi.',
                            },
                            {
                                q: 'Bagaimana durasi tidur dan langkah kaki mempengaruhi kadar gula darah?',
                                a: 'Tidur nyenyak (Deep Sleep) mengatur ulang kepekaan insulin dan menurunkan hormon kortisol malam hari. Sementara itu, aktivitas langkah kaki mengaktifkan kontraksi lambat otot soleus yang menyerap glukosa darah tanpa bergantung penuh pada hormon insulin.',
                            },
                        ].map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? 'bg-white border-[#1c6454]/40 shadow-[0_4px_20px_rgba(0,40,36,0.06)]'
                                            : 'bg-white/80 border-[#d5e5db] hover:border-[#1c6454]/30 hover:bg-white'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-black cursor-pointer gap-4"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-primary font-bold">
                                                0{idx + 1}.
                                            </span>
                                            <span className="font-bold text-black">{faq.q}</span>
                                        </span>
                                        <span
                                            className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                                                isOpen
                                                    ? 'bg-primary text-white rotate-180 shadow-2xs'
                                                    : 'bg-[#edf5f0] text-primary rotate-0'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[18px] leading-none">
                                                expand_more
                                            </span>
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-4 text-xs text-[#222222] font-medium leading-relaxed border-t border-[#f0f5f2] pt-3">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 9. BOTTOM CALL TO ACTION BANNER (Landing Page CtaBanner Style) */}
                <div className="relative overflow-hidden p-6 sm:p-10 lg:p-12 bg-primary text-white rounded-2xl sm:rounded-3xl space-y-4 text-center shadow-[0_12px_40px_rgba(0,67,62,0.18)]">
                    {/* Subtle Restorative Ambient Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#1c6454]/30 rounded-full blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-primary-container/40 rounded-full blur-3xl"
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-3.5 max-w-2xl mx-auto">
                        <h3 className="font-serif text-xl sm:text-3xl lg:text-[40px] leading-[1.2] font-normal text-white">
                            Mulai Bangun Rentang Biologis 14-Hari Anda Sekarang
                        </h3>

                        <p className="text-xs sm:text-sm text-[#d4ebe0] max-w-xl mx-auto leading-relaxed">
                            Bebaskan diri dari kebingungan angka glukosa acak. Dapatkan evaluasi terstruktur, panduan mikro personal, dan pemantauan dokter terintegrasi.
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
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

            {/* Modal Feedback Simpan Baseline */}
            {saveBaselineModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-2xl border border-[#c4dcce] space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[24px]">bookmark_check</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-base text-black">
                                    Simulasi Baseline Tersimpan
                                </h3>
                                <p className="text-xs text-[#222222] font-medium">Validasi Data Quality Score (DQS) 96%</p>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#f6faf7] border border-[#d8e8de] space-y-2 text-xs">
                            <div className="flex justify-between text-black">
                                <span className="font-medium">Glukosa Darah Puasa:</span>
                                <span className="font-mono font-bold text-primary">{glucoseInput} mg/dL</span>
                            </div>
                            <div className="flex justify-between text-black">
                                <span className="font-medium">Aktivitas Langkah:</span>
                                <span className="font-mono font-bold text-primary">{stepsInput.toLocaleString('id-ID')} langkah</span>
                            </div>
                            <div className="flex justify-between text-black">
                                <span className="font-medium">Durasi Tidur:</span>
                                <span className="font-mono font-bold text-primary">{sleepInput} jam</span>
                            </div>
                            <div className="flex justify-between text-black pt-2 border-t border-[#e2eee6]">
                                <span className="font-medium">Status Risiko HBE:</span>
                                <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${riskColor}`}>{overallRisk}</span>
                            </div>
                        </div>

                        <p className="text-xs text-[#333333] leading-relaxed font-medium">
                            Untuk menyimpan rekam jejak 14-hari ke akun profil permanen dan mendapatkan bimbingan dokter spesialis secara berkelanjutan, buat akun sekarang.
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setSaveBaselineModal(false)}
                                className="flex-1 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-black hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                Tutup
                            </button>
                            <Link
                                href="/register"
                                className="flex-1 py-2.5 rounded-full bg-primary text-white text-xs font-bold text-center hover:bg-primary-container transition-all shadow-xs cursor-pointer"
                            >
                                Daftar Akun
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </MarketingLayout>
    );
}
