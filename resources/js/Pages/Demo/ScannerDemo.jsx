import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ScannerDemo() {
    const [selectedSample, setSelectedSample] = useState('drink');
    const [scannerStage, setScannerStage] = useState('ready'); // 'ready' | 'capturing' | 'analyzing' | 'result'
    const [analysisStep, setAnalysisStep] = useState(0);

    const samples = {
        drink: {
            id: 'drink',
            type: 'ocr',
            typeLabel: 'OCR Label Kemasan',
            title: 'Teh Manis Kemasan Botol (250ml)',
            category: 'Minuman Ringan Tinggi Sukrosa',
            image: '/image/scan_tea_drink.jpg',
            ocrText: 'GULA TOTAL: 20g (80% AKG)\nNATRIUM: 35mg\nENERGI TOTAL: 90 kkal',
            bpomNumber: 'BPOM RI MD 268310012345',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            dqsScore: 32,
            glycemicLoad: 'Tinggi (GL 20)',
            riskLevel: 'PERHATIAN TINGGI',
            riskColor: 'bg-rose-50 text-rose-700 border-rose-200',
            sugar: '20g (5 sdt)',
            sodium: '35 mg',
            calories: '90 kkal',
            protein: '0 g',
            curvePeak: '172 mg/dL',
            curveTime: 'Menit ke-45',
            curveColor: '#e11d48',
            clinicalInsight:
                'Kandungan 20g sukrosa bebas diserap cepat dalam saluran cerna tanpa perintang serat. Hal ini memicu lonjakan glukosa darah akut dan memaksa pankreas mensekresi insulin dalam jumlah besar.',
            alternative: 'Ganti dengan air mineral, cold-brew green tea tanpa gula, atau infused water lemon mint.',
            doctor: 'dr. H. Bramantyo, Sp.PD (Konsultan Endokrinologi)',
        },
        plate: {
            id: 'plate',
            type: 'yolo',
            typeLabel: 'YOLO Food Vision',
            title: 'Piring Nutrisi: Nasi Merah, Salmon & Brokoli',
            category: 'Makanan Segar Padat Makronutrisi',
            image: '/image/healthy_nutrition_plate.jpg',
            ocrText: 'DETEKSI YOLO VISUAL:\n- Salmon Panggang (120g)\n- Nasi Beras Merah (100g)\n- Brokoli & Wortel Kukus (150g)',
            bpomNumber: 'Pangan Segar Alami (Tanpa Bahan Tambahan)',
            bpomStatus: 'KANDUNGAN ALAMI TERVALIDASI',
            dqsScore: 94,
            glycemicLoad: 'Rendah (GL 6.8)',
            riskLevel: 'RAMAH METABOLISME',
            riskColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            sugar: '2.4g',
            sodium: '180 mg',
            calories: '385 kkal',
            protein: '31 g',
            curvePeak: '112 mg/dL',
            curveTime: 'Kenaikan Landai Stabil',
            curveColor: '#059669',
            clinicalInsight:
                'Kombinasi asam lemak Omega-3 dari salmon dan serat tinggi brokoli secara efektif menurunkan laju penyerapan karbohidrat beras merah, menjaga stabilitas glukosa postprandial 2 jam.',
            alternative: 'Komposisi piring makan ideal untuk remisi pra-diabetes & pemeliharaan berat badan.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        food: {
            id: 'food',
            type: 'ocr',
            typeLabel: 'OCR Label Kemasan',
            title: 'Oat Crunch Biskuit Gandum (30g)',
            category: 'Pangan Olahan Tinggi Serat',
            image: '/image/scan_oat_food.jpg',
            ocrText: 'SERAT PANGAN: 5g (17% AKG)\nGULA TOTAL: 3g\nKARBOHIDRAT TOTAL: 21g',
            bpomNumber: 'BPOM RI MD 835610098765',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            dqsScore: 84,
            glycemicLoad: 'Rendah (GL 7)',
            riskLevel: 'RAMAH METABOLISME',
            riskColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            sugar: '3g (0.75 sdt)',
            sodium: '65 mg',
            calories: '130 kkal',
            protein: '3.5 g',
            curvePeak: '118 mg/dL',
            curveTime: 'Kenaikan Bertahap',
            curveColor: '#059669',
            clinicalInsight:
                'Serat larut beta-glukan membentuk matriks kental di lambung yang memperlambat laju hidrolisis pati menjadi glukosa, mencegah resistensi insulin pasca santap.',
            alternative: 'Sangat baik sebagai kudapan jeda makan siang ke santap malam.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        medicine: {
            id: 'medicine',
            type: 'pharma',
            typeLabel: 'Verifikasi Obat BPOM',
            title: 'Aprena Film-Coated Tablet 10 mg',
            category: 'Sediaan Farmasi Antidiabetik Oral',
            image: '/image/scan_pharma_med.jpg',
            ocrText: 'ZAT AKTIF: Amorfenic Hydrochloride 10mg\nNOMOR BATCH: A24301\nEXP: MEI 2027',
            bpomNumber: 'POM DKL2345678910A1',
            bpomStatus: 'OBAT RESMI TERDAFTAR (AKTIF)',
            dqsScore: 98,
            glycemicLoad: 'Stabilisator Fisiologis',
            riskLevel: 'TERVALIDASI MEDIS',
            riskColor: 'bg-sky-50 text-sky-700 border-sky-200',
            sugar: '0g',
            sodium: '0 mg',
            calories: '0 kkal',
            protein: '0 g',
            curvePeak: 'Optimal 4-6 Jam',
            curveTime: 'Puncak 90 Menit',
            curveColor: '#0284c7',
            clinicalInsight:
                'Terverifikasi resmi pada basis data BPOM RI. Bekerja meningkatkan sensitivitas reseptor insulin perifer di jaringan otot skelet. Konsumsi sesuai dosis yang diresepkan dokter.',
            alternative: 'Konsumsi bersama atau sesudah makan malam sesuai anjuran resep.',
            doctor: 'apt. Rian Pratama, S.Farm (Verifikator Farmasi Klinis)',
        },
    };

    const current = samples[selectedSample];

    const handleSelectSample = (sampleKey) => {
        setSelectedSample(sampleKey);
        setScannerStage('ready');
        setAnalysisStep(0);
    };

    const handleTriggerCapture = () => {
        setScannerStage('capturing');
        
        // Step 1: Shutter capture
        setTimeout(() => {
            setScannerStage('analyzing');
            setAnalysisStep(1); // Ekstraksi pixel
        }, 300);

        // Step 2: OCR / YOLO processing
        setTimeout(() => {
            setAnalysisStep(2); // Identifikasi nutrisi & BPOM
        }, 800);

        // Step 3: Selesai & hasil keluar
        setTimeout(() => {
            setAnalysisStep(3);
            setScannerStage('result');
        }, 1300);
    };

    const handleResetScanner = () => {
        setScannerStage('ready');
        setAnalysisStep(0);
    };

    return (
        <MarketingLayout>
            <Head title="Demo Scanner Cerdas Jepret & Identifikasi — AEVYRA" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
                
                {/* 1. Header & Konsep Manual Capture */}
                <div className="space-y-3.5 border-b border-surface-container-high pb-6">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#52655f] font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-semibold">Demo Fitur Scanner</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1.5 max-w-3xl">
                            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#142320] tracking-tight">
                                Jepret Foto Manual, Biarkan AI Mengidentifikasi Nutrisi &amp; BPOM.
                            </h1>
                            <p className="text-xs sm:text-sm text-[#52645f] leading-relaxed">
                                Tidak perlu streaming kamera live yang panas dan menguras kuota. Cukup <strong>ambil foto</strong> atau <strong>unggah dari galeri</strong> ponsel Anda. Algoritma AEVYRA membedah gramatur gula tersembunyi, estimasi kurva glukosa darah, dan validasi registrasi BPOM dalam hitungan detik.
                            </p>
                        </div>

                        <Link
                            href="/member/scanner"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white text-xs font-semibold hover:bg-[#00352e] transition-all active:scale-95 shadow-xs whitespace-nowrap self-start lg:self-auto shrink-0"
                        >
                            <span className="material-symbols-outlined text-[17px]">center_focus_strong</span>
                            <span>Buka Scanner Member</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Cara Kerja 3 Langkah Singkat (Mobile-First Stepper) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e4ede7] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                1
                            </span>
                            <h3 className="font-bold text-xs sm:text-sm text-[#142320]">
                                Bidik &amp; Jepret Foto
                            </h3>
                        </div>
                        <p className="text-[11px] text-[#556963] leading-relaxed pl-8">
                            Arahkan kamera ke piring makanan segar atau label gizi kemasan, lalu tekan tombol shutter (atau pilih dari galeri).
                        </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e4ede7] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                2
                            </span>
                            <h3 className="font-bold text-xs sm:text-sm text-[#142320]">
                                AI Ekstraksi Otomatis
                            </h3>
                        </div>
                        <p className="text-[11px] text-[#556963] leading-relaxed pl-8">
                            Visi YOLO mengenali jenis makanan fisik, sementara Vision OCR membaca gramatur gula, natrium, dan nomor izin BPOM.
                        </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e4ede7] space-y-1.5 shadow-2xs">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                3
                            </span>
                            <h3 className="font-bold text-xs sm:text-sm text-[#142320]">
                                Proyeksi Kurva &amp; Telaah
                            </h3>
                        </div>
                        <p className="text-[11px] text-[#556963] leading-relaxed pl-8">
                            Dapatkan estimasi kurva lonjakan glukosa 2 jam, skor gizi DQS, dan alternatif menu sehat dari dokter spesialis.
                        </p>
                    </div>
                </div>

                {/* 3. Interactive Studio: Shutter Simulator */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                            <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                                Simulator Kamera Interaktif
                            </span>
                            <h2 className="font-serif text-lg sm:text-2xl font-normal text-[#142320]">
                                Uji Alur Jepret Foto &amp; Identifikasi
                            </h2>
                        </div>
                        <span className="text-xs text-[#5f736e]">
                            Pilih sampel di bawah untuk mensimulasikan foto:
                        </span>
                    </div>

                    {/* Sample Selection Buttons (Mobile Scrollable) */}
                    <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => handleSelectSample('drink')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                                selectedSample === 'drink'
                                    ? 'bg-primary text-white border-primary shadow-2xs font-semibold'
                                    : 'bg-white text-[#4d615c] border-[#d8e5de] hover:bg-[#edf5f0]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[15px]">water_bottle</span>
                            <span>Minuman Botol</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSelectSample('plate')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                                selectedSample === 'plate'
                                    ? 'bg-primary text-white border-primary shadow-2xs font-semibold'
                                    : 'bg-white text-[#4d615c] border-[#d8e5de] hover:bg-[#edf5f0]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[15px]">restaurant</span>
                            <span>Piring Makanan Segar</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSelectSample('food')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                                selectedSample === 'food'
                                    ? 'bg-primary text-white border-primary shadow-2xs font-semibold'
                                    : 'bg-white text-[#4d615c] border-[#d8e5de] hover:bg-[#edf5f0]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[15px]">bakery_dining</span>
                            <span>Biskuit Gandum</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSelectSample('medicine')}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 border ${
                                selectedSample === 'medicine'
                                    ? 'bg-primary text-white border-primary shadow-2xs font-semibold'
                                    : 'bg-white text-[#4d615c] border-[#d8e5de] hover:bg-[#edf5f0]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[15px]">medication</span>
                            <span>Sediaan Obat BPOM</span>
                        </button>
                    </div>

                    {/* Studio Main Frame (Mobile-First Phone Screen Mockup) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        
                        {/* Left / Top: Camera Shutter Viewfinder (7 Cols) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#d6e7dd] p-3.5 sm:p-5 shadow-xs space-y-3">
                            <div className="flex items-center justify-between pb-2.5 border-b border-[#edf4f0] text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="font-bold text-[#142320]">
                                        {scannerStage === 'ready' && 'Lensa Kamera Siap Bidik'}
                                        {scannerStage === 'capturing' && 'Mengambil Gambar...'}
                                        {scannerStage === 'analyzing' && 'Memproses Identifikasi AI...'}
                                        {scannerStage === 'result' && 'Foto Terkunci &amp; Teridentifikasi'}
                                    </span>
                                </div>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#f0f6f3] text-[#365049] font-medium">
                                    {current.typeLabel}
                                </span>
                            </div>

                            {/* Viewfinder Screen */}
                            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-black flex items-center justify-center group select-none">
                                <img
                                    src={current.image}
                                    alt={current.title}
                                    className={`w-full h-full object-cover transition-all duration-300 ${
                                        scannerStage === 'capturing' ? 'scale-105 filter brightness-150' : 'scale-100 opacity-95'
                                    } ${scannerStage === 'analyzing' ? 'filter blur-[1px]' : ''}`}
                                />

                                {/* Flash overlay on capture */}
                                {scannerStage === 'capturing' && (
                                    <div className="absolute inset-0 bg-white/80 animate-ping pointer-events-none"></div>
                                )}

                                {/* Overlay Elements */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30 p-3 sm:p-4 flex flex-col justify-between pointer-events-none">
                                    <div className="flex items-center justify-between text-[10px] text-white/90 font-mono">
                                        <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px] text-emerald-400">lens</span>
                                            <span>MODE SHUTTER MANUAL</span>
                                        </span>
                                        <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs">
                                            1080p FHD
                                        </span>
                                    </div>

                                    {/* Focus Target Reticle */}
                                    <div className="self-center w-52 sm:w-64 h-28 sm:h-36 border-2 border-white/60 rounded-xl relative flex flex-col items-center justify-center p-2 text-center">
                                        <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400 -mt-0.5 -ml-0.5"></span>
                                        <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400 -mt-0.5 -mr-0.5"></span>
                                        <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400 -mb-0.5 -ml-0.5"></span>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400 -mb-0.5 -mr-0.5"></span>

                                        {scannerStage === 'ready' && (
                                            <div className="px-2.5 py-1 rounded bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                                                Arahkan fokus ke {current.id === 'plate' ? 'piring makanan' : 'label nutrisi'}
                                            </div>
                                        )}

                                        {scannerStage === 'analyzing' && (
                                            <div className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-mono flex items-center gap-2 backdrop-blur-xs">
                                                <span className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></span>
                                                <span>{analysisStep === 1 ? 'Membaca Pixel Foto...' : 'Mengekstrak Nilai Gizi...'}</span>
                                            </div>
                                        )}

                                        {scannerStage === 'result' && (
                                            <div className="px-3 py-1 rounded bg-emerald-600/90 text-white text-[11px] font-bold backdrop-blur-xs flex items-center gap-1 shadow-xs">
                                                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                                                <span>Identifikasi Selesai</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-white/80 text-[10px] font-mono">
                                        <span className="truncate max-w-45">{current.title}</span>
                                        <span>AEVYRA Optical v3</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shutter Bar / Controls */}
                            <div className="p-2 rounded-2xl bg-[#f5faf7] border border-[#dcebe1] flex items-center justify-between gap-3">
                                <div className="text-[11px] text-[#4d665f] pl-1">
                                    {scannerStage === 'ready' && 'Tekan tombol kamera untuk mengambil gambar:'}
                                    {scannerStage === 'capturing' && 'Memotret sampel...'}
                                    {scannerStage === 'analyzing' && 'Sedang diidentifikasi AI...'}
                                    {scannerStage === 'result' && 'Gambar tersimpan di sesi demo.'}
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {scannerStage === 'result' ? (
                                        <button
                                            type="button"
                                            onClick={handleResetScanner}
                                            className="px-4 py-2 rounded-full bg-white border border-[#cbe0d3] text-primary hover:bg-[#edf5f0] text-xs font-semibold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">refresh</span>
                                            <span>Foto Ulang</span>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleTriggerCapture}
                                            disabled={scannerStage === 'analyzing' || scannerStage === 'capturing'}
                                            className="px-5 py-2.5 rounded-full bg-primary hover:bg-[#003831] text-white text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                                            <span>Ambil Foto</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right / Bottom: Clinical Results & Biomarkers (5 Cols) */}
                        <div className="lg:col-span-5 space-y-3.5">
                            <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#d6e7dd] shadow-xs space-y-4">
                                <div className="border-b border-[#edf4f0] pb-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Laporan Nutrisi Terkini
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold border ${current.riskColor}`}>
                                            {current.riskLevel}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#142320] mt-1">
                                        {current.title}
                                    </h3>
                                    <p className="text-[11px] text-[#5b6e69]">{current.category}</p>
                                </div>

                                {/* Macro Biomarkers Grid */}
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-[#e2ede6]">
                                        <span className="text-[10px] text-[#637771] block font-medium">Beban Gula:</span>
                                        <strong className="text-sm font-mono text-[#142320] font-bold">{current.sugar}</strong>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-[#e2ede6]">
                                        <span className="text-[10px] text-[#637771] block font-medium">Beban Glikemik:</span>
                                        <strong className="text-sm font-mono text-primary font-bold">{current.glycemicLoad}</strong>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-[#e2ede6]">
                                        <span className="text-[10px] text-[#637771] block font-medium">Kalori:</span>
                                        <strong className="text-sm font-mono text-[#142320] font-bold">{current.calories}</strong>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-[#e2ede6]">
                                        <span className="text-[10px] text-[#637771] block font-medium">Skor Gizi (DQS):</span>
                                        <strong className="text-sm font-mono text-primary font-bold">{current.dqsScore} / 100</strong>
                                    </div>
                                </div>

                                {/* BPOM Strip */}
                                <div className="p-2.5 rounded-xl bg-[#edf5f0] border border-[#cfe1d7] flex items-center justify-between text-[11px]">
                                    <span className="text-[#1c6454] font-medium truncate">{current.bpomNumber}</span>
                                    <span className="text-[9.5px] font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-md shrink-0">
                                        {current.bpomStatus}
                                    </span>
                                </div>

                                {/* Glycemic Curve Mini Visual */}
                                <div className="p-3 rounded-xl bg-[#fafcfb] border border-[#e4ede8] space-y-1.5">
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-semibold text-[#182926]">Proyeksi Kurva Glukosa:</span>
                                        <span className="font-mono text-primary font-bold">{current.curvePeak}</span>
                                    </div>
                                    <div className="h-12 w-full relative">
                                        <svg viewBox="0 0 300 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                            <rect x="0" y="30" width="300" height="20" fill="#eaf3ee" opacity="0.6" rx="3" />
                                            <path
                                                d="M 0 38 Q 80 38, 140 8 T 300 38"
                                                fill="none"
                                                stroke={current.curveColor}
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                            <circle cx="140" cy="8" r="3.5" fill={current.curveColor} />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-[#71847f] font-mono">
                                        <span>0 mnt</span>
                                        <span>{current.curveTime}</span>
                                        <span>120 mnt</span>
                                    </div>
                                </div>

                                {/* Clinical Advice */}
                                <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 space-y-1.5 text-xs">
                                    <div className="flex items-center gap-1.5 text-primary font-bold text-[11px]">
                                        <span className="material-symbols-outlined text-[15px]">verified</span>
                                        <span>Telaah Dokter Spesialis:</span>
                                    </div>
                                    <p className="text-[11px] text-[#334641] leading-relaxed">
                                        {current.clinicalInsight}
                                    </p>
                                    <div className="text-[10px] text-[#566e67] italic pt-0.5 border-t border-primary/10">
                                        Diverifikasi oleh: {current.doctor}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Keunggulan Sistem Jepret Manual vs Live Video Streaming */}
                <div className="p-4 sm:p-7 rounded-3xl bg-[#f3f8f5] border border-[#d6e7dc] space-y-4 sm:space-y-5">
                    <div className="max-w-2xl space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                            Efisiensi &amp; Ketelitian Optik
                        </span>
                        <h2 className="font-serif text-lg sm:text-2xl font-normal text-[#142320]">
                            Mengapa Sistem Jepret Foto Lebih Unggul dari Live Video Cam?
                        </h2>
                        <p className="text-[11px] sm:text-xs text-[#52645f] leading-relaxed">
                            Kami merancang scanner AEVYRA agar nyaman digunakan sehari-hari di ponsel Anda tanpa menimbulkan kendala teknis:
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#e1ece5] space-y-1.5 flex flex-col justify-start shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#edf5f0] text-primary flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">battery_charging_full</span>
                            </div>
                            <h4 className="font-bold text-[11px] sm:text-xs text-[#142320] leading-snug">Hemat Baterai &amp; Suhu</h4>
                            <p className="text-[9.5px] sm:text-[10.5px] text-[#556963] leading-relaxed">
                                Live stream 60fps membuat HP cepat panas. Jepret foto hanya aktif saat menekan tombol.
                            </p>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#e1ece5] space-y-1.5 flex flex-col justify-start shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#edf5f0] text-primary flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">wifi</span>
                            </div>
                            <h4 className="font-bold text-[11px] sm:text-xs text-[#142320] leading-snug">Hemat Kuota Data</h4>
                            <p className="text-[9.5px] sm:text-[10.5px] text-[#556963] leading-relaxed">
                                Tidak perlu streaming feed video. Satu foto terkompresi berukuran sangat ringan (&lt; 150 KB).
                            </p>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#e1ece5] space-y-1.5 flex flex-col justify-start shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#edf5f0] text-primary flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">shutter_speed</span>
                            </div>
                            <h4 className="font-bold text-[11px] sm:text-xs text-[#142320] leading-snug">Bebas Blur &amp; Akurat</h4>
                            <p className="text-[9.5px] sm:text-[10.5px] text-[#556963] leading-relaxed">
                                Shutter membekukan tabel gizi tanpa goyangan tangan, akurasi OCR mencapai 99.2%.
                            </p>
                        </div>

                        <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#e1ece5] space-y-1.5 flex flex-col justify-start shadow-2xs">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#edf5f0] text-primary flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">lock</span>
                            </div>
                            <h4 className="font-bold text-[11px] sm:text-xs text-[#142320] leading-snug">Privasi Terjamin</h4>
                            <p className="text-[9.5px] sm:text-[10.5px] text-[#556963] leading-relaxed">
                                Kamera tidak merekam ruangan secara terus-menerus. Hanya foto makanan yang dianalisis.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Bottom Call to Action for Member Access */}
                <div className="p-6 sm:p-8 rounded-3xl bg-primary text-white flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-xs">
                    <div className="space-y-1 max-w-lg">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 border border-white/15 inline-block">
                            Siap Mengontrol Makanan Anda?
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                            Coba Scanner Kamera Pada Makanan Asli Anda.
                        </h3>
                        <p className="text-xs text-[#c6e6d7] leading-relaxed">
                            Buka portal member untuk menggunakan kamera ponsel langsung atau unggah foto label makanan dari galeri.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
                        <Link
                            href="/member/scanner"
                            className="px-6 py-3 rounded-full bg-white text-primary text-xs font-bold hover:bg-[#edf5f0] transition-all active:scale-95 shadow-xs"
                        >
                            Buka Scanner Member Sekarang
                        </Link>
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-all border border-white/20"
                        >
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>

            </div>
        </MarketingLayout>
    );
}
