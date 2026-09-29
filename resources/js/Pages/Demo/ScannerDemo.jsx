import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ScannerDemo() {
    const [selectedSample, setSelectedSample] = useState('drink');
    const [isSimulatingScan, setIsSimulatingScan] = useState(false);
    const [activeTab, setActiveTab] = useState('optical'); // 'optical' | 'glycemic' | 'bpom'

    const samples = {
        drink: {
            title: 'Teh Manis Kemasan Botol (250ml)',
            category: 'Minuman Ringan Tinggi Sukrosa',
            image: '/image/scan_tea_drink.jpg',
            ocrText: 'GULA TOTAL: 20g (80% AKG)\nNATRIUM: 35mg\nENERGI TOTAL: 90 kkal',
            bpomNumber: 'BPOM RI MD 268310012345',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            dqsScore: 32,
            glycemicLoad: 'Tinggi (GL 20)',
            riskLevel: 'PERHATIAN TINGGI',
            riskColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
            curvePeak: '172 mg/dL',
            curveTime: 'Menit ke-45',
            curveColor: '#e11d48',
            clinicalInsight:
                'Kandungan 20g sukrosa bebas diserap cepat dalam saluran cerna tanpa perintang serat. Hal ini memicu lonjakan glukosa darah akut dan memaksa pankreas mensekresi insulin dalam jumlah besar.',
            alternative: 'Ganti dengan air mineral, cold-brew green tea tanpa gula, atau infused water lemon mint.',
            doctor: 'dr. H. Bramantyo, Sp.PD (Konsultan Endokrinologi)',
        },
        food: {
            title: 'Oat Crunch Biskuit Gandum (30g)',
            category: 'Pangan Olahan Tinggi Serat',
            image: '/image/scan_oat_food.jpg',
            ocrText: 'SERAT PANGAN: 5g (17% AKG)\nGULA TOTAL: 3g\nKARBOHIDRAT: 21g',
            bpomNumber: 'BPOM RI MD 835610098765',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            dqsScore: 84,
            glycemicLoad: 'Rendah (GL 7)',
            riskLevel: 'RAMAH METABOLISME',
            riskColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
            curvePeak: '118 mg/dL',
            curveTime: 'Kenaikan Bertahap',
            curveColor: '#059669',
            clinicalInsight:
                'Serat larut beta-glukan membentuk matriks kental di lambung yang memperlambat laju hidrolisis pati menjadi glukosa, mencegah resistensi insulin pasca santap.',
            alternative: 'Sangat baik sebagai kudapan jeda makan siang ke santap malam.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        medicine: {
            title: 'Aprena Film-Coated Tablet 10 mg',
            category: 'Sediaan Farmasi Antidiabetik Oral',
            image: '/image/scan_pharma_med.jpg',
            ocrText: 'ZAT AKTIF: Amorfenic Hydrochloride 10mg\nNOMOR BATCH: A24301\nEXP: MEI 2027',
            bpomNumber: 'POM DKL2345678910A1',
            bpomStatus: 'OBAT RESMI TERDAFTAR (AKTIF)',
            dqsScore: 98,
            glycemicLoad: 'Stabilisator Fisiologis',
            riskLevel: 'TERVALIDASI MEDIS',
            riskColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
            curvePeak: 'Optimal 4-6 Jam',
            curveTime: 'Puncak 90 Menit',
            curveColor: '#0284c7',
            clinicalInsight:
                'Terverifikasi resmi pada basis data BPOM RI. Bekerja meningkatkan sensitivitas reseptor insulin perifer di jaringan otot skelet. Konsumsi sesuai dosis yang diresepkan dokter.',
            alternative: 'Konsumsi bersama atau sesudah makan malam.',
            doctor: 'apt. Rian Pratama, S.Farm (Verifikator Farmasi Klinis)',
        },
    };

    const current = samples[selectedSample];

    const triggerSimulatedScan = (sampleKey) => {
        setIsSimulatingScan(true);
        setSelectedSample(sampleKey);
        setTimeout(() => {
            setIsSimulatingScan(false);
        }, 400);
    };

    return (
        <MarketingLayout>
            <Head title="Demo Scanner Open Cam & BPOM OCR — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Breadcrumbs & Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Scanner Kamera &amp; BPOM</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">document_scanner</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 1</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Scanner Open Cam &amp; Deteksi Glikemik
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Uji coba teknologi visi komputer AEVYRA. Deteksi gramatur gula tersembunyi, estimasi kurva glukosa, dan validasi registrasi BPOM dalam &lt; 0.4 detik.
                            </p>
                        </div>

                        <Link
                            href="/member/scanner"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            <span>Buka Scanner Kamera Member</span>
                        </Link>
                    </div>
                </div>

                {/* Sample Switcher Pills */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-surface-container-low rounded-2xl border border-surface-container max-w-xl">
                    <button
                        type="button"
                        onClick={() => triggerSimulatedScan('drink')}
                        className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                            selectedSample === 'drink'
                                ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">water_bottle</span>
                        <span>Minuman Kemasan</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => triggerSimulatedScan('food')}
                        className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                            selectedSample === 'food'
                                ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">bakery_dining</span>
                        <span>Pangan Olahan</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => triggerSimulatedScan('medicine')}
                        className={`flex-1 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-xl text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                            selectedSample === 'medicine'
                                ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">medication</span>
                        <span>Sediaan Farmasi</span>
                    </button>
                </div>

                {/* Main Interactive Scanner Studio */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Viewfinder Camera Feed Simulation (7 Cols) */}
                    <div className="lg:col-span-7 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                                <span className="font-heading font-bold text-sm text-on-surface">
                                    Simulasi Lensa Kamera Cerdas
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                                AI VISION v3.2 • 120 FPS
                            </span>
                        </div>

                        {/* Viewfinder Canvas */}
                        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-black border border-surface-container group">
                            <img
                                key={current.image}
                                src={current.image}
                                alt={current.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                    isSimulatingScan ? 'scale-105 opacity-60 blur-xs' : 'scale-100 opacity-90'
                                }`}
                            />

                            {/* Viewfinder HUD Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 pointer-events-none">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-bold border border-white/10 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[14px]">barcode_scanner</span>
                                        <span>LASER SCAN ACTIVE</span>
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white font-mono text-[10px]">
                                        DQS: {current.dqsScore}%
                                    </span>
                                </div>

                                {/* OCR Detection Target Box */}
                                <div className="self-center w-64 sm:w-80 h-28 sm:h-36 border-2 border-emerald-400/80 rounded-xl relative flex flex-col items-center justify-center backdrop-brightness-110 p-3 text-center space-y-1">
                                    <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400 -mt-0.5 -ml-0.5"></span>
                                    <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400 -mt-0.5 -mr-0.5"></span>
                                    <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400 -mb-0.5 -ml-0.5"></span>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400 -mb-0.5 -mr-0.5"></span>

                                    <div className="px-3 py-1 bg-black/75 rounded-lg border border-white/20 backdrop-blur-md">
                                        <span className="text-xs font-mono font-bold text-emerald-300 block">
                                            {current.ocrText.split('\n')[0]}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-white/90 font-mono">
                                        {current.bpomNumber}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-white/80 text-[10px] font-mono">
                                    <span>Target: {current.category}</span>
                                    <span>Standar: SatuSehat HL7</span>
                                </div>
                            </div>
                        </div>

                        {/* Scanner Bottom Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-on-surface-variant font-medium">
                                Klik sampel di atas untuk menguji respons deteksi OCR instan.
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${current.riskColor}`}>
                                    {current.riskLevel}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Real-time Nutritional Analysis & Glycemic Simulation (5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        {/* Sample Overview Card */}
                        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                    Hasil Analisis Sensor Optik
                                </span>
                                <h3 className="font-heading font-bold text-lg text-on-surface mt-0.5">
                                    {current.title}
                                </h3>
                                <p className="text-xs text-on-surface-variant">{current.category}</p>
                            </div>

                            {/* Extracted Biomarkers */}
                            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-on-surface">Estimasi Beban Glikemik:</span>
                                    <span className="font-mono font-bold text-primary">{current.glycemicLoad}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-on-surface">Status Registrasi BPOM:</span>
                                    <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                                        {current.bpomStatus}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-on-surface">Skor Kualitas Gizi (DQS):</span>
                                    <span className="font-mono font-bold text-primary">{current.dqsScore} / 100</span>
                                </div>
                            </div>

                            {/* Dynamic Glycemic Curve Simulation Graph */}
                            <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-on-surface">Prediksi Respon Glukosa:</span>
                                    <span className="font-mono text-primary font-bold">
                                        {current.curvePeak} ({current.curveTime})
                                    </span>
                                </div>
                                <div className="h-16 w-full relative">
                                    <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        <rect x="0" y="36" width="300" height="24" fill="#eaf3ee" opacity="0.5" rx="4" />
                                        <path
                                            d="M 0 45 Q 80 45, 140 10 T 300 45"
                                            fill="none"
                                            stroke={current.curveColor}
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="140" cy="10" r="4" fill={current.curveColor} />
                                    </svg>
                                </div>
                                <span className="text-[10px] text-on-surface-variant block font-mono">
                                    Zona aman glukosa postprandial: 80 - 140 mg/dL
                                </span>
                            </div>

                            {/* Clinical Physician Insight */}
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                    <span className="font-heading font-bold text-xs text-primary">
                                        Telaah Klinis Dokter
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                                    {current.clinicalInsight}
                                </p>
                                <div className="pt-1 border-t border-primary/10 text-[11px] text-primary font-semibold">
                                    Rekomendasi Alternatif: {current.alternative}
                                </div>
                                <p className="text-[10px] text-on-surface-variant/70 italic font-mono pt-0.5">
                                    Diverifikasi oleh: {current.doctor}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}

