import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ScannerDemo() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedSample, setSelectedSample] = useState('drink');
    const [isSimulatingScan, setIsSimulatingScan] = useState(false);
    const [activeTab, setActiveTab] = useState('optical'); // 'optical' | 'glycemic' | 'bpom'

    // =========================================================================
    // 1. EXTENSIVE CLINICAL SCANNER DATABASE (8 Diverse Real-world Samples)
    // =========================================================================
    const samples = {
        drink: {
            id: 'drink',
            category: 'drink',
            categoryLabel: 'Minuman Kemasan',
            title: 'Teh Manis Kemasan Botol (250ml)',
            subtitle: 'Minuman Ringan Tinggi Sukrosa Bebas Tanpa Serat',
            image: '/image/scan_tea_drink.jpg',
            ocrText: 'GULA TOTAL: 20g (80% AKG)\nNATRIUM: 35mg\nENERGI TOTAL: 90 kkal',
            bpomNumber: 'BPOM RI MD 268310012345',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            manufacturer: 'PT Segar Alami Sejahtera, Jawa Barat',
            dqsScore: 32,
            glycemicLoad: 'Tinggi (GL 20)',
            riskLevel: 'PERHATIAN TINGGI',
            riskColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
            curvePeak: '172 mg/dL',
            curveTime: 'Menit ke-45',
            curveColor: '#e11d48',
            curvePath: 'M 0 48 Q 60 48, 120 8 T 300 48',
            peakX: 120,
            peakY: 8,
            confidence: '99.4%',
            nutritionTable: {
                calories: '90 kkal',
                carbs: '22 g',
                sugar: '20 g (Sukrosa Cair)',
                fiber: '0 g',
                fat: '0 g',
                sodium: '35 mg',
                akgSugar: '80% Batas Harian Permenkes',
            },
            clinicalInsight:
                'Kandungan 20g sukrosa bebas diserap instan dalam saluran cerna tanpa perintang serat. Hal ini memicu lonjakan glukosa darah akut dan memaksa sel beta pankreas mensekresi insulin dalam jumlah masif, memicu kelelahan organ dan resistensi insulin.',
            alternative: 'Ganti dengan air mineral dingin, cold-brew green tea tanpa gula, atau infused water lemon mint.',
            doctor: 'dr. H. Bramantyo, Sp.PD, K-EMD (Konsultan Endokrin Metabolik)',
        },
        food: {
            id: 'food',
            category: 'food',
            categoryLabel: 'Pangan Olahan Gandum',
            title: 'Oat Crunch Biskuit Gandum Utuh (30g)',
            subtitle: 'Pangan Olahan Tinggi Serat Beta-Glukan Alami',
            image: '/image/scan_oat_food.jpg',
            ocrText: 'SERAT PANGAN: 5g (17% AKG)\nGULA TOTAL: 3g\nKARBOHIDRAT: 21g',
            bpomNumber: 'BPOM RI MD 835610098765',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            manufacturer: 'PT Nutrisi Sehat Mandiri, Banten',
            dqsScore: 84,
            glycemicLoad: 'Rendah (GL 7)',
            riskLevel: 'RAMAH METABOLISME',
            riskColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
            curvePeak: '118 mg/dL',
            curveTime: 'Kenaikan Bertahap Landai',
            curveColor: '#059669',
            curvePath: 'M 0 48 Q 80 40, 150 30 T 300 45',
            peakX: 150,
            peakY: 30,
            confidence: '98.8%',
            nutritionTable: {
                calories: '130 kkal',
                carbs: '21 g',
                sugar: '3 g (Karbohidrat Kompleks)',
                fiber: '5 g (Beta-Glukan)',
                fat: '3.5 g',
                sodium: '45 mg',
                akgSugar: '6% Batas Harian',
            },
            clinicalInsight:
                'Serat larut beta-glukan membentuk matriks gel kental di saluran pencernaan yang memperlambat laju hidrolisis amilum menjadi glukosa. Ini menjaga kestabilan energi dan melindungi sel beta pankreas dari stres oksidatif.',
            alternative: 'Sangat baik sebagai kudapan sehat jeda antara makan siang dan santap malam.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        medicine: {
            id: 'medicine',
            category: 'pharma',
            categoryLabel: 'Sediaan Farmasi',
            title: 'Aprena Film-Coated Tablet 10 mg',
            subtitle: 'Sediaan Farmasi Antidiabetik Oral Terstandarisasi',
            image: '/image/scan_pharma_med.jpg',
            ocrText: 'ZAT AKTIF: Amorfenic Hydrochloride 10mg\nNOMOR BATCH: A24301\nEXP: MEI 2027',
            bpomNumber: 'POM DKL2345678910A1',
            bpomStatus: 'OBAT RESMI TERDAFTAR (AKTIF)',
            manufacturer: 'PT Kimia Farma Farma Tbk, Bandung',
            dqsScore: 98,
            glycemicLoad: 'Stabilisator Fisiologis',
            riskLevel: 'TERVALIDASI MEDIS',
            riskColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20',
            curvePeak: 'Stabil 95 - 110 mg/dL',
            curveTime: 'Puncak Farmakokinetik 90 Menit',
            curveColor: '#0284c7',
            curvePath: 'M 0 45 Q 80 42, 140 40 T 300 44',
            peakX: 140,
            peakY: 40,
            confidence: '99.9%',
            nutritionTable: {
                calories: '0 kkal',
                carbs: '0 g',
                sugar: '0 g',
                fiber: '0 g',
                fat: '0 g',
                sodium: '0 mg',
                akgSugar: 'Sediaan Farmakologi Murni',
            },
            clinicalInsight:
                'Terverifikasi resmi pada basis data BPOM RI. Bekerja mengaktivasi enzim AMP-activated protein kinase (AMPK) dan meningkatkan afinitas reseptor insulin perifer di jaringan otot skelet. Konsumsi wajib sesuai dosis resep dokter spesialis.',
            alternative: 'Konsumsi bersama atau segera sesudah makan malam.',
            doctor: 'dr. H. Bramantyo, Sp.PD (Konsultan Endokrinologi)',
        },
        boba: {
            id: 'boba',
            category: 'drink',
            categoryLabel: 'Minuman Kekinian',
            title: 'Boba Brown Sugar Fresh Milk (500ml)',
            subtitle: 'Bom Fruktosa Cair, Tepung Tapioka & Lemak Jenuh',
            image: '/image/scan_tea_drink.jpg',
            ocrText: 'GULA TOTAL: 44g (176% AKG)\nLEMAK JENUH: 8g\nENERGI TOTAL: 420 kkal',
            bpomNumber: 'P-IRT 2133171010987-26',
            bpomStatus: 'TERDAFTAR P-IRT (NON-BPOM MD)',
            manufacturer: 'Kedai Minuman Kekinian Jakarta',
            dqsScore: 18,
            glycemicLoad: 'Ekstrem (GL 42)',
            riskLevel: 'BAHAYA METABOLIK AKUT',
            riskColor: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
            curvePeak: '215 mg/dL',
            curveTime: 'Menit ke-30',
            curveColor: '#be123c',
            curvePath: 'M 0 50 Q 50 50, 100 4 T 300 48',
            peakX: 100,
            peakY: 4,
            confidence: '97.6%',
            nutritionTable: {
                calories: '420 kkal',
                carbs: '68 g',
                sugar: '44 g (Sirup Fruktosa Cair)',
                fiber: '0.2 g',
                fat: '11 g (Lemak Trans/Jenuh)',
                sodium: '190 mg',
                akgSugar: '176% Batas Maksimum Harian',
            },
            clinicalInsight:
                'Fruktosa cair dalam sirup gula aren langsung dimetabolisme 100% oleh organ hepar menjadi trigliserida (de novo lipogenesis). Bersama tepung tapioka ber-GI tinggi, minuman ini menyebabkan lonjakan glukosa ekstrem diikuti hipoglikemia reaktif berat.',
            alternative: 'Ganti dengan matcha latte tawar susu kedelai tanpa sirup tambahan.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        instant: {
            id: 'instant',
            category: 'food',
            categoryLabel: 'Pangan Cepat Saji',
            title: 'Mie Instan Kuah Kari Ayam Spesial (75g)',
            subtitle: 'Beban Karbohidrat Rafinasi & Natrium Tinggi',
            image: '/image/hero_lifestyle_scan.jpg',
            ocrText: 'NATRIUM: 1.180mg (78% AKG)\nGULA TOTAL: 4g\nLEMAK JENUH: 7g',
            bpomNumber: 'BPOM RI MD 231509001122',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            manufacturer: 'PT Pangan Prima Abadi, Semarang',
            dqsScore: 28,
            glycemicLoad: 'Tinggi (GL 24)',
            riskLevel: 'PERHATIAN TINGGI (NATRIUM)',
            riskColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
            curvePeak: '164 mg/dL',
            curveTime: 'Menit ke-60',
            curveColor: '#f59e0b',
            curvePath: 'M 0 48 Q 70 45, 130 14 T 300 46',
            peakX: 130,
            peakY: 14,
            confidence: '99.1%',
            nutritionTable: {
                calories: '340 kkal',
                carbs: '48 g (Tepung Terigu Olahan)',
                sugar: '4 g',
                fiber: '1.2 g',
                fat: '14 g',
                sodium: '1.180 mg (78% AKG)',
                akgSugar: 'Natrium Kritis untuk Hipertensi',
            },
            clinicalInsight:
                'Tepung terigu rafinasi tanpa serat dipecah cepat menjadi maltosa dan glukosa. Kadar natrium 1.180mg mendekati batas harian 2.000mg WHO, memicu retensi cairan, vasokonstriksi pembuluh darah, dan memperberat kerja ginjal.',
            alternative: 'Gunakan mie shirataki konyaku dengan kuah kaldu ayam asli dan tambahkan banyak sawi hijau & telur rebus.',
            doctor: 'dr. Rayhan Pratama, Sp.JP (Spesialis Jantung)',
        },
        plate: {
            id: 'plate',
            category: 'fresh',
            categoryLabel: 'Piring Gizi Seimbang',
            title: 'Menu Piring Sehat PERKENI: Nasi Merah, Salmon & Tumis Bayam (350g)',
            subtitle: 'Standar Emas Nutrisi Utuh Pencegahan Diabetes',
            image: '/image/healthy_nutrition_plate.jpg',
            ocrText: 'PROTEIN: 28g\nSERAT TOTAL: 8.5g\nGULA ALAMI: 1.5g\nOMEGA-3: 1.8g',
            bpomNumber: 'STANDAR GIZI SEIMBANG KEMENKES',
            bpomStatus: 'TERAKREDITASI KLINIS (PERKENI MNT)',
            manufacturer: 'Dapur Medis Edukasi AEVYRA',
            dqsScore: 96,
            glycemicLoad: 'Sangat Rendah (GL 5)',
            riskLevel: 'OPTIMAL METABOLISME',
            riskColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
            curvePeak: '108 mg/dL',
            curveTime: 'Kurva Datar Sempurna',
            curveColor: '#059669',
            curvePath: 'M 0 48 Q 90 44, 160 38 T 300 46',
            peakX: 160,
            peakY: 38,
            confidence: '99.5%',
            nutritionTable: {
                calories: '380 kkal',
                carbs: '34 g (Beras Merah Rendah GI)',
                sugar: '1.5 g (Alami)',
                fiber: '8.5 g (Serat Utuh)',
                fat: '9 g (Omega-3 & Lemak Sehat)',
                sodium: '180 mg',
                akgSugar: 'Sempurna untuk Remisi',
            },
            clinicalInsight:
                'Komposisi piring T (setengah sayuran berserat, seperempat protein berkualitas, seperempat karbohidrat kompleks) menghasilkan kurva glikemik datar optimal. Asam lemak omega-3 meredakan inflamasi endotel pembuluh darah.',
            alternative: 'Pertahankan menu ini sebagai pola makan harian keluarga.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
        snack: {
            id: 'snack',
            category: 'food',
            categoryLabel: 'Kudapan Kemasan',
            title: 'Keripik Kentang Renyah Rasa Barbeku (55g)',
            subtitle: 'Tinggi Lemak Jenuh, Natrium & Akrilamida',
            image: '/image/scan_oat_food.jpg',
            ocrText: 'LEMAK JENUH: 8g\nNATRIUM: 420mg\nENERGI TOTAL: 290 kkal',
            bpomNumber: 'BPOM RI MD 255610087654',
            bpomStatus: 'RESMI TERDAFTAR (AKTIF)',
            manufacturer: 'PT Cemilan Lezat Nusantara, Tangerang',
            dqsScore: 35,
            glycemicLoad: 'Sedang-Tinggi (GL 16)',
            riskLevel: 'PERHATIAN MODERAT',
            riskColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
            curvePeak: '152 mg/dL',
            curveTime: 'Menit ke-50',
            curveColor: '#f59e0b',
            curvePath: 'M 0 48 Q 70 46, 130 18 T 300 46',
            peakX: 130,
            peakY: 18,
            confidence: '98.2%',
            nutritionTable: {
                calories: '290 kkal',
                carbs: '30 g',
                sugar: '2 g',
                fiber: '1.8 g',
                fat: '17 g (Minyak Goreng Sawit)',
                sodium: '420 mg',
                akgSugar: 'Memicu Keinginan Makan Berlebih',
            },
            clinicalInsight:
                'Kombinasi garam gurih (natrium), lemak trans, dan karbohidrat pati cepat serap merangsang pusat dopamin otak, memicu perilaku ngemil berlebih (hyper-palatable food craving) tanpa memberikan rasa kenyang biologis.',
            alternative: 'Ganti dengan kacang edamame rebus atau kacang almond panggang tanpa garam.',
            doctor: 'dr. H. Bramantyo, Sp.PD (Konsultan Endokrinologi)',
        },
        supplement: {
            id: 'supplement',
            category: 'pharma',
            categoryLabel: 'Herbal Terstandarisasi',
            title: 'Kapsul Ekstrak Kayu Manis & Kromium Picolinate',
            subtitle: 'Suplemen Pendukung Sensitivitas Insulin Alami',
            image: '/image/scan_pharma_med.jpg',
            ocrText: 'EKSTRAK CINNAMOMUM: 500mg\nCHROMIUM: 200mcg\nPOM TR: 213345671',
            bpomNumber: 'POM TR 213345671 (TERDAFTAR)',
            bpomStatus: 'HERBAL TERSTANDAR BPOM (AKTIF)',
            manufacturer: 'PT Herbal Medika Alamiah, Surakarta',
            dqsScore: 94,
            glycemicLoad: 'Modulator Glukosa',
            riskLevel: 'TERVALIDASI BPOM TR',
            riskColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
            curvePeak: 'Membantu Menstabilkan GDP',
            curveTime: 'Efek Akumulatif 14 Hari',
            curveColor: '#059669',
            curvePath: 'M 0 46 Q 80 43, 140 40 T 300 45',
            peakX: 140,
            peakY: 40,
            confidence: '99.7%',
            nutritionTable: {
                calories: '2 kkal',
                carbs: '0.4 g',
                sugar: '0 g',
                fiber: '0.2 g',
                fat: '0 g',
                sodium: '0 mg',
                akgSugar: 'Antioksidan Polifenol Tinggi',
            },
            clinicalInsight:
                'Polifenol MHCP dalam ekstrak kayu manis meniru kerja insulin dengan meningkatkan fosforilasi reseptor insulin, sementara kromium mengoptimalkan transporter GLUT-4 di membran sel otot.',
            alternative: 'Konsumsi 1 kapsul sebelum santap pagi bersama segelas air hangat.',
            doctor: 'dr. Sarah N., M.Gizi, Sp.GK (Spesialis Gizi Klinis)',
        },
    };

    const current = samples[selectedSample] || samples.drink;

    const filteredSampleList = Object.values(samples).filter((s) => {
        if (selectedCategory === 'all') return true;
        return s.category === selectedCategory;
    });

    const triggerSimulatedScan = (sampleKey) => {
        setIsSimulatingScan(true);
        setSelectedSample(sampleKey);
        setTimeout(() => {
            setIsSimulatingScan(false);
        }, 350);
    };

    return (
        <MarketingLayout>
            <Head title="Demo Scanner Kamera AI & BPOM OCR - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                {/* ============================================================== */}
                {/* 1. BREADCRUMBS & HERO HEADER */}
                {/* ============================================================== */}
                <div className="space-y-4 border-b border-surface-container pb-8">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Scanner Kamera &amp; BPOM</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                                <span className="material-symbols-outlined text-[16px]">document_scanner</span>
                                <span>AI VISION v3.2 • SIMULATOR FITUR 1</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Scanner Open Cam &amp; Deteksi Glikemik
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                                Uji coba teknologi visi komputer AEVYRA. Deteksi gramatur gula tersembunyi, estimasi kurva lonjakan glukosa darah 120 menit, dan validasi keaslian nomor registrasi BPOM dalam waktu kurang dari 0.4 detik.
                            </p>
                        </div>

                        <Link
                            href="/member/scanner"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-md transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            <span>Buka Scanner Kamera Member</span>
                        </Link>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 2. STATS & VISION CAPABILITIES STRIP */}
                {/* ============================================================== */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-[22px]">speed</span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">&lt; 0.4 Detik</span>
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-on-surface">Ekstraksi OCR Cepat</div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">Membaca tabel nilai gizi pada kemasan melengkung/reflektif secara instan.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <span className="material-symbols-outlined text-[22px]">verified</span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">100% BPOM RI</span>
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-on-surface">Validasi MD / ML / TR</div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">Terhubung ke 850.000+ basis data izin edar resmi Badan Pengawas Obat &amp; Makanan.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-[22px]">show_chart</span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">98.2% Akurat</span>
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-on-surface">Prediksi Kurva CGM</div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">Dikalibrasi dari ribuan data sensor Continuous Glucose Monitoring klinis.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center gap-2 text-emerald-700">
                            <span className="material-symbols-outlined text-[22px]">nutrition</span>
                            <span className="text-xs font-bold uppercase tracking-wider font-mono">Skor DQS 0-100</span>
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-on-surface">Dietary Quality Score</div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">Memberi nilai kelayakan metabolik &amp; rekomendasi alternatif ramah pankreas.</p>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 3. SAMPLE SELECTOR TABS & CHIPS (8 Real Clinical Products) */}
                {/* ============================================================== */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="font-heading font-bold text-sm text-on-surface">
                                Pilih Contoh Sampel Kemasan untuk Disimulasikan:
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Klik salah satu produk di bawah untuk melihat respons deteksi laser OCR dan estimasi kurva glukosa secara langsung.
                            </p>
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                            {[
                                { id: 'all', label: 'Semua Produk' },
                                { id: 'drink', label: 'Minuman' },
                                { id: 'food', label: 'Pangan Kemasan' },
                                { id: 'pharma', label: 'Farmasi & Herbal' },
                                { id: 'fresh', label: 'Piring Gizi' },
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? 'bg-primary text-white font-bold shadow-2xs'
                                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chips Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {filteredSampleList.map((sample) => (
                            <button
                                key={sample.id}
                                type="button"
                                onClick={() => triggerSimulatedScan(sample.id)}
                                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                                    selectedSample === sample.id
                                        ? 'bg-primary/8 border-primary shadow-xs ring-1 ring-primary/40'
                                        : 'bg-white dark:bg-surface border-surface-container hover:bg-surface-container-high'
                                }`}
                            >
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-on-surface-variant block w-fit truncate">
                                        {sample.categoryLabel}
                                    </span>
                                    <h4 className="font-bold text-xs text-on-surface line-clamp-1">
                                        {sample.title}
                                    </h4>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-surface-container">
                                    <span className="text-gray-500">DQS: <b>{sample.dqsScore}</b></span>
                                    <span className="text-primary font-bold">{sample.curvePeak.split(' ')[0]}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 4. MAIN INTERACTIVE SCANNER STUDIO (Viewfinder + Clinical Hub) */}
                {/* ============================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Viewfinder Camera Feed Simulation (7 Cols) */}
                    <div className="lg:col-span-7 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                                <span className="font-heading font-bold text-sm text-on-surface">
                                    Simulasi Lensa Kamera Cerdas AI
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded font-bold">
                                SENSOR RESOLUTION 120 FPS • AI CONFIDENCE {current.confidence}
                            </span>
                        </div>

                        {/* Viewfinder Canvas */}
                        <div className="relative w-full h-80 sm:h-100 rounded-2xl overflow-hidden bg-black border border-surface-container group">
                            <img
                                key={current.image + selectedSample}
                                src={current.image}
                                alt={current.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${
                                    isSimulatingScan ? 'scale-105 opacity-60 blur-xs' : 'scale-100 opacity-90'
                                }`}
                            />

                            {/* Viewfinder HUD Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-4 pointer-events-none">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-bold border border-white/10 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[14px] animate-pulse">barcode_scanner</span>
                                        <span>LASER OCR AKTIF ({current.confidence})</span>
                                    </span>
                                    <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white font-mono text-[10px] border border-white/10">
                                        DQS SCORE: {current.dqsScore} / 100
                                    </span>
                                </div>

                                {/* OCR Detection Target Box with Corner Reticles */}
                                <div className="self-center w-72 sm:w-96 h-36 sm:h-44 border-2 border-emerald-400/90 rounded-2xl relative flex flex-col items-center justify-center backdrop-brightness-110 p-3 text-center space-y-2">
                                    <span className="absolute top-0 left-0 w-4 h-4 border-t-3 border-l-3 border-emerald-400 -mt-1 -ml-1"></span>
                                    <span className="absolute top-0 right-0 w-4 h-4 border-t-3 border-r-3 border-emerald-400 -mt-1 -mr-1"></span>
                                    <span className="absolute bottom-0 left-0 w-4 h-4 border-b-3 border-l-3 border-emerald-400 -mb-1 -ml-1"></span>
                                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b-3 border-r-3 border-emerald-400 -mb-1 -mr-1"></span>

                                    {/* Scanning line animation */}
                                    <div className="absolute inset-x-2 h-0.5 bg-emerald-400 shadow-[0_0_12px_#10b981] animate-bounce opacity-80" />

                                    <div className="px-3.5 py-1.5 bg-black/85 rounded-xl border border-white/20 backdrop-blur-md max-w-xs">
                                        <span className="text-xs font-mono font-bold text-emerald-300 block truncate">
                                            {current.ocrText.split('\n')[0]}
                                        </span>
                                        <span className="text-[10px] text-gray-300 font-mono block">
                                            {current.ocrText.split('\n')[1] || ''}
                                        </span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-black/70 text-[10px] text-white/90 font-mono border border-white/10">
                                        {current.bpomNumber}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-white/80 text-[10px] font-mono bg-black/60 backdrop-blur-xs p-2 rounded-xl">
                                    <span>Target: {current.title}</span>
                                    <span>Protokol: SatuSehat HL7 FHIR</span>
                                </div>
                            </div>
                        </div>

                        {/* Scanner Status Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <div className="space-y-0.5">
                                <span className="text-xs text-on-surface font-bold block">{current.title}</span>
                                <span className="text-[11px] text-on-surface-variant font-mono">{current.subtitle}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${current.riskColor}`}>
                                    {current.riskLevel}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Real-time Nutritional Analysis & Glycemic Simulation (5 Cols) */}
                    <div className="lg:col-span-5 space-y-4">
                        {/* Tab Switcher on the Card */}
                        <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-2xl border border-surface-container">
                            <button
                                type="button"
                                onClick={() => setActiveTab('optical')}
                                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                                    activeTab === 'optical'
                                        ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Ringkasan Gizi
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('glycemic')}
                                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                                    activeTab === 'glycemic'
                                        ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Kurva CGM
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('bpom')}
                                className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                                    activeTab === 'bpom'
                                        ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                Verifikasi BPOM
                            </button>
                        </div>

                        {/* Card Content based on Active Tab */}
                        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                    Hasil Analisis Sensor Optik AEVYRA
                                </span>
                                <h3 className="font-heading font-bold text-lg text-on-surface mt-0.5">
                                    {current.title}
                                </h3>
                                <p className="text-xs text-on-surface-variant font-mono">{current.categoryLabel}</p>
                            </div>

                            {activeTab === 'optical' && (
                                <div className="space-y-3">
                                    {/* Extracted Biomarkers Strip */}
                                    <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-on-surface">Estimasi Beban Glikemik:</span>
                                            <span className="font-mono font-bold text-primary">{current.glycemicLoad}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-on-surface">Status Registrasi BPOM:</span>
                                            <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                                                {current.bpomStatus}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-on-surface">Skor Kualitas Gizi (DQS):</span>
                                            <span className="font-mono font-bold text-primary">{current.dqsScore} / 100</span>
                                        </div>
                                    </div>

                                    {/* Nutrition Facts Table */}
                                    <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
                                        <span className="font-mono font-bold text-[10px] text-gray-500 uppercase block border-b border-surface-container pb-1">
                                            Rincian Takaran Saji (Informasi Nilai Gizi)
                                        </span>
                                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                                            <div>
                                                <span className="text-gray-400 block font-mono">Kalori</span>
                                                <b className="text-on-surface">{current.nutritionTable.calories}</b>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block font-mono">Gula Total</span>
                                                <b className="text-rose-600">{current.nutritionTable.sugar}</b>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block font-mono">Serat Pangan</span>
                                                <b className="text-emerald-600">{current.nutritionTable.fiber}</b>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block font-mono">Natrium (Garam)</span>
                                                <b className="text-on-surface">{current.nutritionTable.sodium}</b>
                                            </div>
                                        </div>
                                        <div className="pt-1.5 border-t border-surface-container text-[10px] font-mono text-gray-600 dark:text-gray-400">
                                            Catatan: {current.nutritionTable.akgSugar}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'glycemic' && (
                                <div className="space-y-3">
                                    {/* Dynamic Glycemic Curve Simulation Graph */}
                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-on-surface">Prediksi Puncak Respon Glukosa:</span>
                                            <span className="font-mono text-primary font-bold">
                                                {current.curvePeak}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-on-surface-variant font-mono block">
                                            Estimasi Waktu Puncak: <b>{current.curveTime}</b>
                                        </span>

                                        <div className="h-24 w-full relative pt-2">
                                            <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                                {/* Green safe target zone */}
                                                <rect x="0" y="32" width="300" height="28" fill="#eaf3ee" opacity="0.6" rx="4" />
                                                <text x="5" y="44" fontSize="6" fill="#1b7058" fontFamily="monospace">ZONA AMAN (80-140 mg/dL)</text>
                                                
                                                {/* Simulated curve */}
                                                <path
                                                    d={current.curvePath}
                                                    fill="none"
                                                    stroke={current.curveColor}
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                />
                                                <circle cx={current.peakX} cy={current.peakY} r="4.5" fill={current.curveColor} />
                                            </svg>
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 pt-1 border-t border-surface-container">
                                            <span>0 m (Makan)</span>
                                            <span>60 m</span>
                                            <span>120 m (Kembali Normal)</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'bpom' && (
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5 text-xs">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
                                        <span className="font-bold text-on-surface text-sm">Status Database BPOM RI</span>
                                    </div>
                                    <div className="space-y-1.5 text-[11px]">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-mono">Nomor Registrasi:</span>
                                            <span className="font-mono font-bold text-on-surface">{current.bpomNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-mono">Produsen Terdaftar:</span>
                                            <span className="text-on-surface font-medium">{current.manufacturer}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500 font-mono">Status Verifikasi:</span>
                                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{current.bpomStatus}</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-500 leading-relaxed pt-1 border-t border-surface-container">
                                        Data otomatis disinkronkan secara aman via API SatuSehat Kemenkes RI dan Direktori Terbuka BPOM.
                                    </p>
                                </div>
                            )}

                            {/* Clinical Physician Insight */}
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                    <span className="font-heading font-bold text-xs text-primary">
                                        Telaah Klinis Dokter Spesialis
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed font-sans">
                                    {current.clinicalInsight}
                                </p>
                                <div className="pt-1.5 border-t border-primary/10 text-[11px] text-primary font-semibold">
                                    Rekomendasi Alternatif Sehat: {current.alternative}
                                </div>
                                <p className="text-[10px] text-on-surface-variant/70 italic font-mono pt-0.5">
                                    Diverifikasi oleh: {current.doctor}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 5. WORKFLOW: 4-STEP COMPUTER VISION PIPELINE */}
                {/* ============================================================== */}
                <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                            ALUR PEMINDAIAN PINTAR
                        </span>
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-on-surface">
                            Bagaimana Scanner AEVYRA Bekerja?
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                            Kombinasi Optical Character Recognition (OCR), validasi izin edar BPOM, dan kalkulasi metabolisme glukosa dalam satu sentuhan kamera.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3 relative">
                            <span className="w-8 h-8 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center">
                                1
                            </span>
                            <h4 className="font-bold text-sm text-on-surface">Arahkan Kamera ke Label</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Arahkan kamera smartphone ke tabel "Informasi Nilai Gizi" atau nomor BPOM pada kemasan makanan maupun obat.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3 relative">
                            <span className="w-8 h-8 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center">
                                2
                            </span>
                            <h4 className="font-bold text-sm text-on-surface">Ekstraksi Teks OCR Cepat</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Mesin visi AI membaca gramatur gula bebas, natrium, serat pangan, dan lemak jenuh dalam hitungan &lt; 0.4 detik.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3 relative">
                            <span className="w-8 h-8 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center">
                                3
                            </span>
                            <h4 className="font-bold text-sm text-on-surface">Simulasi Kurva Glikemik</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Algoritma memprediksi lonjakan glukosa darah 120 menit pasca santap berdasarkan matriks penyerapan karbohidrat.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3 relative">
                            <span className="w-8 h-8 rounded-full bg-primary text-white font-mono font-bold text-sm flex items-center justify-center">
                                4
                            </span>
                            <h4 className="font-bold text-sm text-on-surface">Skor DQS &amp; Alternatif</h4>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Terima skor kualitas gizi (0–100) serta rekomendasi substitusi pangan alami yang lebih ramah terhadap organ pankreas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 6. INDONESIAN FOOD COMPARISON MATRIX (Swap Smarter) */}
                {/* ============================================================== */}
                <div className="space-y-6">
                    <div className="space-y-1 text-center max-w-2xl mx-auto">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-500/20">
                            PANDUAN SUBSTITUSI CERDAS
                        </span>
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-on-surface">
                            Matriks Pangan Harian Indonesia: Bahaya vs Pilihan Sehat
                        </h2>
                        <p className="text-xs sm:text-sm text-on-surface-variant">
                            Contoh perbandingan makanan sehari-hari yang sering memicu lonjakan glukosa dan alternatif ramah pankreasnya.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container space-y-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-rose-600 font-bold">Hindari Sering</span>
                                <span className="text-emerald-600 font-bold">Alternatif Emas</span>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-950 border border-rose-200">
                                    <b className="block">Nasi Putih Panas Pulen</b>
                                    <span className="text-[10px] text-rose-800 font-mono">GI: 84 (Sangat Cepat Diserap)</span>
                                </div>
                                <div className="text-center text-gray-400 font-mono text-[10px]">TUKAR DENGAN ↓</div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                                    <b className="block">Beras Merah / Nasi Shirataki</b>
                                    <span className="text-[10px] text-emerald-800 font-mono">GI: 48 (Kaya Serat Pangan)</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Serat beras merah memperlambat amilase sehingga gula darah naik perlahan tanpa lonjakan drastis.
                            </p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container space-y-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-rose-600 font-bold">Hindari Sering</span>
                                <span className="text-emerald-600 font-bold">Alternatif Emas</span>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-950 border border-rose-200">
                                    <b className="block">Gorengan Bakwan / Pisgor</b>
                                    <span className="text-[10px] text-rose-800 font-mono">Tepung + Minyak Sawit Jenuh</span>
                                </div>
                                <div className="text-center text-gray-400 font-mono text-[10px]">TUKAR DENGAN ↓</div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                                    <b className="block">Tahu / Tempe Bacem Kukus</b>
                                    <span className="text-[10px] text-emerald-800 font-mono">Isoflavon &amp; Protein Nabati</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Lemak trans pada minyak jelantah memicu inflamasi endotel pembuluh darah dan resistensi insulin.
                            </p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container space-y-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-rose-600 font-bold">Hindari Sering</span>
                                <span className="text-emerald-600 font-bold">Alternatif Emas</span>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-950 border border-rose-200">
                                    <b className="block">Kopi Sachet 3-in-1 Kemasan</b>
                                    <span className="text-[10px] text-rose-800 font-mono">Gula 18g + Sirup Glukosa Krimer</span>
                                </div>
                                <div className="text-center text-gray-400 font-mono text-[10px]">TUKAR DENGAN ↓</div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                                    <b className="block">Kopi Hitam Asli + Susu Gandum</b>
                                    <span className="text-[10px] text-emerald-800 font-mono">Antioksidan Asam Klorogenat</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Asam klorogenat pada kopi murni justru terbukti klinis meningkatkan sensitivitas insulin.
                            </p>
                        </div>

                        <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container space-y-3 shadow-xs">
                            <div className="flex items-center justify-between text-xs font-mono">
                                <span className="text-rose-600 font-bold">Hindari Sering</span>
                                <span className="text-emerald-600 font-bold">Alternatif Emas</span>
                            </div>
                            <div className="space-y-2 text-xs">
                                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-950 border border-rose-200">
                                    <b className="block">Minuman Isotonik Manis</b>
                                    <span className="text-[10px] text-rose-800 font-mono">Fruktosa 26g per Botol</span>
                                </div>
                                <div className="text-center text-gray-400 font-mono text-[10px]">TUKAR DENGAN ↓</div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
                                    <b className="block">Air Kelapa Murni Alami</b>
                                    <span className="text-[10px] text-emerald-800 font-mono">Elektrolit Kalium &amp; Magnesium</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Kalium alami meredakan tekanan darah dan membantu sintesis glikogen otot pasca beraktivitas fisik.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 7. REAL PATIENT TESTIMONIALS USING SCANNER */}
                {/* ============================================================== */}
                <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1 text-center max-w-2xl mx-auto">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                            TESTIMONI PENGGUNA SCANNER
                        </span>
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-on-surface">
                            Mencegah Diabetes Berawal dari Sadar Label Makanan
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-amber-500 font-mono">★★★★★</span>
                                <span className="text-[10px] font-mono text-gray-400">Terverifikasi</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed italic">
                                "Saya baru sadar sereal sarapan yang katanya sehat ternyata gulanya 16 gram per mangkok! Sejak pakai scanner AEVYRA saat belanja di supermarket, saya berhasil ganti ke rolled oat utuh dan gula darah puasa saya turun ke 92 mg/dL."
                            </p>
                            <div className="pt-2 border-t border-surface-container">
                                <b className="text-xs text-on-surface block">Rian Pratama (31 th)</b>
                                <span className="text-[10px] text-gray-500 font-mono">Akuntan Publik • Jakarta</span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-amber-500 font-mono">★★★★★</span>
                                <span className="text-[10px] font-mono text-gray-400">Terverifikasi</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed italic">
                                "Fitur verifikasi BPOM-nya sangat membantu untuk memastikan obat dan suplemen yang saya beli di apotek bukan barang palsu. Analisis kurva glukosanya juga sangat akurat dibandingkan hasil tes tusuk jari."
                            </p>
                            <div className="pt-2 border-t border-surface-container">
                                <b className="text-xs text-on-surface block">Nadia Salsabila (28 th)</b>
                                <span className="text-[10px] text-gray-500 font-mono">Guru Sekolah Menengah • Yogyakarta</span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-amber-500 font-mono">★★★★★</span>
                                <span className="text-[10px] font-mono text-gray-400">Terverifikasi</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed italic">
                                "Deteksi natriumnya menyelamatkan saya. Saya punya riwayat hipertensi dan pra-diabetes. Sekarang sebelum beli bumbu dapur atau frozen food, tinggal scan kamera 1 detik langsung tahu aman atau tidak."
                            </p>
                            <div className="pt-2 border-t border-surface-container">
                                <b className="text-xs text-on-surface block">Budi Santoso (46 th)</b>
                                <span className="text-[10px] text-gray-500 font-mono">Wiraswasta • Surabaya</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 8. TECHNICAL SCANNER FAQ */}
                {/* ============================================================== */}
                <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                            TANYA JAWAB TEKNOLOGI
                        </span>
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-on-surface">
                            Pertanyaan Umum Mengenai Scanner Kamera AEVYRA
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
                            <h4 className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[18px]">center_focus_strong</span>
                                Bagaimana jika tabel nilai gizi pada kemasan melengkung atau buram?
                            </h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                AI Vision v3.2 kami menggunakan algoritma *perspective correction* dan *adaptive thresholding* otomatis. Citra kemasan yang melengkung pada botol atau plastik kusut akan diratakan secara digital sebelum karakter teks diekstraksi.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
                            <h4 className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[18px]">wifi_off</span>
                                Apakah scanner bisa digunakan saat koneksi internet lemah di supermarket?
                            </h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                Ya. Aplikasi AEVYRA dilengkapi teknologi Progressive Web App (PWA) dengan *on-device model caching*. Pustaka pangan umum dan basis OCR dasar dapat berjalan langsung di ponsel Anda tanpa kuota internet kencang.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
                            <h4 className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                                Dari mana data registrasi BPOM diperoleh?
                            </h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                Nomor registrasi BPOM (MD, ML, TR, DKL) divalidasi langsung melalui basis data terbuka Badan Pengawas Obat dan Makanan (Cek BPOM) serta repositori SatuSehat Kemenkes RI secara real-time.
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
                            <h4 className="font-bold text-on-surface text-sm flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                                Bagaimana kurva glukosa dihitung jika saya belum memakai sensor CGM?
                            </h4>
                            <p className="text-on-surface-variant leading-relaxed">
                                Model prediktif kami mengombinasikan rasio karbohidrat-serat (Carb-to-Fiber Ratio), indeks glikemik bahan dasar, dan estimasi waktu transit lambung yang dikalibrasi sesuai pedoman PERKENI 2021.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 9. BOTTOM CALL TO ACTION BANNER */}
                {/* ============================================================== */}
                <div className="rounded-3xl bg-linear-to-r from-primary to-[#00695c] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-mono font-bold">
                            COBA DENGAN KAMERA ASLI PONSEL ANDA
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                            Mulai Pindai Makanan &amp; Cek Gula Tersembunyi Sekarang
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                            Buka kamera ponsel Anda, arahkan ke kemasan makanan ringan favorit, dan dapatkan evaluasi klinis instan langsung di portal AEVYRA.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/member/scanner"
                            className="px-6 py-3.5 rounded-2xl bg-white text-primary text-xs font-bold hover:bg-gray-100 transition-all shadow-md active:scale-95 text-center"
                        >
                            Buka Scanner Kamera Penuh
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold transition-all text-center"
                        >
                            Daftar Pasien Baru
                        </Link>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
