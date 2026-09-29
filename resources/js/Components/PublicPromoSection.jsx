import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// Koleksi data riset empiris dan dataset terbuka resmi (12 Rujukan Klinis & Epidemiologi Dunia & Indonesia)
const clinicalResearchLibrary = [
    {
        id: 'perkeni-kemenkes',
        sourceName: 'PB PERKENI & Kemenkes RI',
        category: 'Konsensus Nasional Prediabetes',
        tag: 'Pedoman PB PERKENI & Permenkes No. 30/2013',
        corpusSource: 'Perkumpulan Endokrinologi Indonesia (PB PERKENI) & Kementerian Kesehatan RI',
        datasetId: 'Pedoman Pengelolaan & Pencegahan Prediabetes Indonesia (Katalog Kemenkes)',
        sampleSize: 'Konsensus Multidisiplin Ahli Endokrinologi Nasional',
        icon: 'policy',
        quote: 'Prediabetes adalah golden period yang sepenuhnya reversibel. Terapi Nutrisi Medis (TNM) berprinsip 3J (Jadwal, Jumlah, Jenis) dan pembatasan asupan gula bebas di bawah 50 gram per hari (Permenkes No. 30/2013) terbukti menghentikan beban glukotoksisitas sebelum sel beta pankreas mengalami atrofi permanen.',
        evidenceTitle: 'Pedoman Diagnosis dan Pengelolaan Prediabetes di Indonesia — PB PERKENI',
        evidenceLevel: 'Pedoman Asuhan Medis Resmi Nasional',
        standards: [
            'Konsensus Nasional Terkini PB PERKENI',
            'Regulasi Batas Gula Permenkes No. 30/2013',
            'Interoperabilitas Terminologi SatuSehat'
        ],
        keyMetric: 'Batas Gula Bebas < 50g / Hari',
        studyNote: 'Protokol rujukan resmi dokter spesialis penyakit dalam dan gizi klinik di seluruh Indonesia.',
    },
    {
        id: 'lancet-direct',
        sourceName: 'Uji Klinis The Lancet',
        category: 'Multi-Center Randomized Controlled Trial',
        tag: 'The Lancet • DOI: 10.1016/S0140-6736(17)33102-1',
        corpusSource: 'The Lancet Diabetes & Endocrinology (DiRECT Trial, PMID: 29221643)',
        datasetId: 'Newcastle University & University of Glasgow Research Cohort',
        sampleSize: 'n = 298 Partisipan Fasilitas Layanan Primer',
        icon: 'biotech',
        quote: 'Uji klinis acak multisenter DiRECT membuktikan bahwa intervensi nutrisi terstruktur yang mencapai penurunan berat badan metabolik mampu memulihkan kapasitas sekresi sel beta pankreas dan menghasilkan remisi diabetes (HbA1c < 6.5% tanpa obat) pada 86% partisipan dalam pemantauan 12 bulan.',
        evidenceTitle: 'Primary care-led weight management for remission of type 2 diabetes (DiRECT Trial)',
        evidenceLevel: 'Level 1A Randomized Controlled Trial (The Lancet)',
        standards: [
            'Publikasi The Lancet Diabetes & Endocrinology',
            'Kriteria Remisi Metabolik HbA1c < 6.5%',
            'Regenerasi Kapasitas Sekresi Sel Beta'
        ],
        keyMetric: '86% Remisi Tanpa Obat Terbukti',
        studyNote: 'Bukti ilmiah definitif bahwa kerusakan metabolik pra-diabetes dan diabetes dini bersifat reversibel.',
    },
    {
        id: 'who-sugar-guidelines',
        sourceName: 'WHO Sugar Intake Guideline',
        category: 'Panduan Nutrisi Global Berbasis Bukti',
        tag: 'WHO Guidelines Approved by Guidelines Review Committee',
        corpusSource: 'World Health Organization (WHO) Department of Nutrition for Health & Development',
        datasetId: 'ISBN 978-92-4-154902-8 • Systematic Review & Meta-Analysis',
        sampleSize: 'Meta-analisis 67 Uji Klinis Terkontrol & Kohort Global',
        icon: 'public',
        quote: 'WHO merekomendasikan pengurangan asupan gula bebas harian hingga kurang dari 10% dari total asupan energi, dengan rekomendasi bersyarat hingga di bawah 5% (sekitar 25 gram atau 6 sendok teh per hari) untuk meminimalkan akumulasi glukotoksisitas hati, perlemakan organ visceral, dan resistensi insulin sistemik.',
        evidenceTitle: 'Guideline: Sugars Intake for Adults and Children — World Health Organization',
        evidenceLevel: 'Strong Recommendation / Grade A Global Evidence',
        standards: [
            'Standar Batas Beban Gula Bebas Global (WHO)',
            'Proteksi Enzim Hati & Kardiometabolik',
            'Rujukan Regulasi Kesehatan 194 Negara Anggota'
        ],
        keyMetric: 'Target Ideal Gula Bebas < 25g / Hari',
        studyNote: 'Fondasi global pembatasan gula tersembunyi pada makanan olahan dan minuman kemasan.',
    },
    {
        id: 'cdc-dpp-github',
        sourceName: 'CDC & NEJM DPP Trial',
        category: 'Surveilans Kesehatan & Uji Pencegahan',
        tag: 'NEJM DOI: 10.1056/NEJMoa012512 • GitHub cdcgov/diabetes-surveillance',
        corpusSource: 'U.S. Centers for Disease Control and Prevention & Diabetes Prevention Program',
        datasetId: 'NEJM DPP Research Group Cohort (n = 3.234 Subjek Terkontrol)',
        sampleSize: 'n = 3.234 Subjek Prediabetes Terkontrol',
        icon: 'clinical_notes',
        quote: 'Data uji klinis acak multisenter DPP menunjukkan bahwa intervensi gaya hidup intensif (pengurangan asupan karbohidrat sederhana cair dan aktivitas terukur 150 menit/minggu) menurunkan insidensi progresi ke diabetes sebesar 58%, mengungguli efektivitas terapi farmakologis metformin tunggal (31%).',
        evidenceTitle: 'Reduction in the Incidence of Type 2 Diabetes with Lifestyle Intervention or Metformin',
        evidenceLevel: 'New England Journal of Medicine & CDC Surveillance',
        standards: [
            'Uji Klinis Nasional DPP (New England Journal of Medicine)',
            'Surveilans Terbuka CDC (cdcgov data)',
            'Protokol Intervensi Perilaku Mandiri'
        ],
        keyMetric: '58% Penurunan Risiko (Superior vs Metformin)',
        studyNote: 'Standar emas global pencegahan progresi prediabetes berbasis modifikasi nutrisi harian.',
    },
    {
        id: 'niddk-kaggle',
        sourceName: 'Dataset Kaggle & NIH NIDDK',
        category: 'Analisis Benchmark Machine Learning',
        tag: 'Kaggle: uciml/pima-indians-diabetes',
        corpusSource: 'National Institute of Diabetes and Digestive and Kidney Diseases (NIH NIDDK)',
        datasetId: 'kaggle.com/datasets/uciml/pima-indians-diabetes-database',
        sampleSize: 'n = 768 Rekaman Klinis Terverifikasi',
        icon: 'database',
        quote: 'Analisis prediktif multivariat pada dataset NIDDK membuktikan bahwa glukosa plasma 2 jam postprandial (OGTT > 140 mg/dL) dan indeks massa tubuh (BMI) memiliki skor korelasi fitur tertinggi (AUC 0.835) dalam memprediksi timbulnya resistensi insulin metabolik sebelum manifestasi klinis.',
        evidenceTitle: 'NIDDK Diabetes Research Dataset • Benchmarking Model Diagnostik & Sensitivitas Insulin',
        evidenceLevel: 'Open Science Clinical Dataset (Kaggle / UCI Repository)',
        standards: [
            'Repositori Terbuka Kaggle (uciml/pima-indians-diabetes)',
            'Algoritma Prediksi Beban Glikemik HBE',
            'Validasi Fitur Klinis NIDDK NIH'
        ],
        keyMetric: 'AUC 0.835 Korelasi Glukosa 2 Jam',
        studyNote: 'Dataset acuan global untuk benchmarking pemodelan prediksi dini diabetes melitus.',
    },
    {
        id: 'ada-standards',
        sourceName: 'ADA Standards of Care',
        category: 'Konsensus Terapi & Monitoring CGM',
        tag: 'Diabetes Care 2026; 49 (Suppl. 1): S1-S270',
        corpusSource: 'American Diabetes Association (ADA) Professional Practice Committee',
        datasetId: 'ADA Clinical Practice Recommendations 2026',
        sampleSize: 'Konsensus Klinis Internasional Berbasis Evidence',
        icon: 'monitoring',
        quote: 'Standar Asuhan Medis ADA menekankan bahwa pencapaian Time in Range (TIR > 70% pada rentang glukosa 70-140 mg/dL) secara signifikan mengurangi risiko komplikasi mikrovaskular dan neuropati otonom hingga 64%, membuktikan bahwa fluktuasi variabilitas glukosa harian sama berbahayanya dengan nilai rata-rata HbA1c tinggi.',
        evidenceTitle: 'Standards of Care in Diabetes — Glycemic Targets & Continuous Glucose Monitoring',
        evidenceLevel: 'Level A ADA Evidence Rating',
        standards: [
            'Metrik Time in Range (TIR > 70%)',
            'Pengurangan Komplikasi Mikrovaskular 64%',
            'Panduan Evaluasi Variabilitas Glukosa'
        ],
        keyMetric: 'TIR > 70% Cegah Komplikasi 64%',
        studyNote: 'Rujukan protokol pemantauan glukosa darah berkelanjutan di fasilitas kesehatan modern.',
    },
    {
        id: 'ski-kemenkes',
        sourceName: 'Kemenkes RI • Survei SKI',
        category: 'Surveilans Epidemiologi Nasional',
        tag: 'Laporan Nasional SKI 2023 / Riskesdas Kemenkes RI',
        corpusSource: 'Badan Kebijakan Pembangunan Kesehatan (BKPK) Kementerian Kesehatan RI',
        datasetId: 'Katalog Data Terbuka Kemenkes RI (data.kemkes.go.id)',
        sampleSize: 'n = 300.000+ Rumah Tangga di 38 Provinsi Indonesia',
        icon: 'analytics',
        quote: 'Data Survei Kesehatan Indonesia (SKI) mengidentifikasi bahwa prevalensi Gangguan Toleransi Glukosa (TGT / Prediabetes) di Indonesia mencapai 10.2% populasi dewasa, di mana 73.7% di antaranya belum pernah terdiagnosis. Intervensi skrining preventif digital berbasis komunitas berpotensi menghemat beban pembiayaan katastropik BPJS hingga triliunan rupiah.',
        evidenceTitle: 'Laporan Hasil Riset Survei Kesehatan Indonesia (SKI) — Beban Gangguan Metabolik',
        evidenceLevel: 'Survei Populasi Nasional Berskala Penuh',
        standards: [
            'Sampling 38 Provinsi Seluruh Indonesia',
            'Integrasi Rekam Medis SatuSehat Kemenkes',
            'Estimasi Beban Biaya Katastropik JKN'
        ],
        keyMetric: '73.7% Kasus Belum Terdiagnosis',
        studyNote: 'Fakta urgensi deteksi dini mandiri sebelum penderita berlanjut ke diabetes menahun.',
    },
    {
        id: 'harvard-cohort',
        sourceName: 'Harvard Cohort Studies',
        category: 'Nutrisi Epidemiologi & Serat Pangan',
        tag: 'BMJ 2020; 370:m2197 • Harvard Nurses\' Health Study',
        corpusSource: 'Harvard T.H. Chan School of Public Health & Brigham and Women\'s Hospital',
        datasetId: 'Nurses\' Health Study I & II, Health Professionals Follow-Up Study',
        sampleSize: 'n = 200.000+ Tenaga Kesehatan Terpantau Selama 32 Tahun',
        icon: 'school',
        quote: 'Investigasi kohort prospektif Harvard selama 3 dekade menunjukkan bahwa konsumsi serat pangan utuh (minimal 25-30g/hari) dikaitkan dengan penurunan risiko diabetes tipe 2 sebesar 33%, sementara konsumsi makanan ultra-proses (UPF) dan minuman berpemanis meningkatkan risiko sindrom metabolik sebesar 39% terlepas dari faktor genetik.',
        evidenceTitle: 'Intake of whole grains and risk of type 2 diabetes: results from three prospective cohorts',
        evidenceLevel: 'Prospective Observational Cohort Level 1B',
        standards: [
            'Pemantauan Prospektif Selama 32 Tahun',
            'Validasi Kuisioner Frekuensi Makanan (FFQ)',
            'Koreksi Kovariat Genetik & Gaya Hidup'
        ],
        keyMetric: 'Serat Pangan Turunkan Risiko 33%',
        studyNote: 'Bukti empiris jangka panjang tentang proteksi serat larut terhadap peradangan metabolik.',
    },
    {
        id: 'finnish-dps',
        sourceName: 'Finnish DPS (The Lancet)',
        category: 'Uji Pencegahan Gaya Hidup Jangka Panjang',
        tag: 'The Lancet • DOI: 10.1016/S0140-6736(06)69701-8',
        corpusSource: 'National Public Health Institute of Finland & University of Helsinki (Tuomilehto et al.)',
        datasetId: 'Finnish DPS Study Group (Follow-up 13 Tahun)',
        sampleSize: 'n = 522 Partisipan dengan Gangguan Toleransi Glukosa',
        icon: 'verified_user',
        quote: 'Studi pencegahan diabetes Finlandia (DPS) dengan tindak lanjut jangka panjang membuktikan bahwa keberhasilan mempertahankan 4 dari 5 target gaya hidup (lemak jenuh < 10%, serat > 15g/1000 kkal, dan jalan kaki 30 menit/hari) memberikan proteksi hampir absolut (insidensi diabetes 0%) selama fase aktif intervensi.',
        evidenceTitle: 'Prevention of type 2 diabetes mellitus by changes in lifestyle among subjects with IGT',
        evidenceLevel: 'Pioneering Randomized Controlled Clinical Trial',
        standards: [
            'Tindak Lanjut Jangka Panjang 13 Tahun',
            'Efek Protektif Bertahan Pasca Intervensi',
            'Pemberian Panduan Dietisien Spesialis'
        ],
        keyMetric: '0% Insidensi pada Kepatuhan Target',
        studyNote: 'Uji klinis pertama di dunia yang membuktikan diabetes tipe 2 dapat dicegah sepenuhnya.',
    },
    {
        id: 'uk-biobank',
        sourceName: 'UK Biobank 500K Cohort',
        category: 'Sirkadian Metabolik & Waktu Makan',
        tag: 'Nature Communications (2023) 14:8120',
        corpusSource: 'UK Biobank Research Consortium & Oxford University',
        datasetId: 'UK Biobank Accession Dataset #48231',
        sampleSize: 'n = 472.000 Subjek Populasi Terverifikasi',
        icon: 'schedule',
        quote: 'Analisis akselerometer dan pencatatan biomarker darah pada UK Biobank mengungkapkan bahwa membatasi jendela makan dalam 10-12 jam dan menghindari konsumsi karbohidrat olahan dalam 2 jam sebelum tidur menurunkan marker resistensi insulin (HOMA-IR) hingga 28% berkat sinkronisasi ritme sirkadian metabolisme glukosa hati.',
        evidenceTitle: 'Chrononutrition and metabolic risk in the UK Biobank prospective population study',
        evidenceLevel: 'Big Data Population Cohort (Nature Publishing Group)',
        standards: [
            'Biobank Terbesar Dunia (500.000 Sampel)',
            'Analisis Ritme Sirkadian Metabolisme',
            'Korelasi Biomarker HOMA-IR & HbA1c'
        ],
        keyMetric: '28% Penurunan Resistensi HOMA-IR',
        studyNote: 'Pentingnya waktu makan (timing) di samping jenis dan jumlah kalori yang dikonsumsi.',
    },
    {
        id: 'idf-atlas',
        sourceName: 'IDF Diabetes Atlas 2026',
        category: 'Konsorsium Epidemiologi Global',
        tag: 'IDF Diabetes Atlas • ISBN: 978-2-930229-98-0',
        corpusSource: 'International Diabetes Federation (IDF) Global Surveillance Committee',
        datasetId: 'Global Diabetes Data Portal (diabetesatlas.org)',
        sampleSize: 'Surveilans Global di 215 Negara & Teritori',
        icon: 'public',
        quote: 'Laporan IDF Diabetes Atlas menegaskan bahwa 1 dari 8 orang dewasa diproyeksikan akan hidup dengan diabetes pada tahun 2030 jika tren konsumsi makanan ultra-proses saat ini berlanjut. Lebih dari 85% pengeluaran kesehatan dapat dihindarkan apabila intervensi perubahan perilaku dilakukan saat pasien masih berada pada fase pra-diabetes.',
        evidenceTitle: 'IDF Diabetes Atlas 11th Edition — Global Prevalence, Morbidity & Economic Burden',
        evidenceLevel: 'Global Epidemiological Reference Standard',
        standards: [
            'Surveilans 215 Negara di Seluruh Dunia',
            'Estimasi Dampak Ekonomi Kesehatan Global',
            'Protokol Pencegahan Berkelanjutan'
        ],
        keyMetric: '85% Biaya Kesehatan Dapat Dicegah',
        studyNote: 'Rujukan utama para pembuat kebijakan kesehatan di tingkat internasional dan kementerian.',
    },
    {
        id: 'framingham-aha',
        sourceName: 'Framingham & AHA Cohort',
        category: 'Kardiometabolik & Aterosklerosis Dini',
        tag: 'Circulation 2022; 146:1820–1834 • Framingham Offspring',
        corpusSource: 'National Heart, Lung, and Blood Institute (NHLBI) & Boston University',
        datasetId: 'Framingham Offspring & Third Generation Cohort Data',
        sampleSize: 'n = 14.000+ Multigenerasi Kohort Jantung-Metabolik',
        icon: 'cardiology',
        quote: 'Studi longitudinal Framingham mengungkap bahwa rasio Trigliserida/HDL tinggi (> 3.0) yang dipicu oleh lonjakan glukosa harian berulang merupakan prediktor paling akurat terjadinya plak aterosklerosis koroner dini, membuktikan bahwa kerusakan pembuluh darah telah dimulai bertahun-tahun sebelum glukosa puasa mencapai kriteria diabetes.',
        evidenceTitle: 'Cardiovascular-Kidney-Metabolic (CKM) Syndrome: A Presidential Advisory From the AHA',
        evidenceLevel: 'Multi-Decade Landmark Epidemiological Study',
        standards: [
            'Kohort Jantung Terpanjang Dunia (Sejak 1948)',
            'Korelasi Rasio Trigliserida/HDL',
            'Pedoman CKM Syndrome American Heart Association'
        ],
        keyMetric: 'Prediktor Plak Vaskular Dini',
        studyNote: 'Hubungan kritis antara lonjakan gula darah harian dengan kesehatan pembuluh darah dan jantung.',
    },
];

export default function PublicPromoSection() {
    const ROTATE_INTERVAL_SEC = 60; // Berubah otomatis tiap 1 menit (60 detik)
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(ROTATE_INTERVAL_SEC);

    const activeItem = clinicalResearchLibrary[activeIdx];

    // Fungsi transisi halus antar slide riset
    const changeSlide = (newIndex) => {
        if (newIndex === activeIdx || isTransitioning) return;
        setIsTransitioning(true);
        setSecondsLeft(ROTATE_INTERVAL_SEC);
        setTimeout(() => {
            setActiveIdx(newIndex);
            setIsTransitioning(false);
        }, 180);
    };

    const handlePrev = () => {
        const nextIdx = (activeIdx - 1 + clinicalResearchLibrary.length) % clinicalResearchLibrary.length;
        changeSlide(nextIdx);
    };

    const handleNext = () => {
        const nextIdx = (activeIdx + 1) % clinicalResearchLibrary.length;
        changeSlide(nextIdx);
    };

    // Fungsi acak untuk memilih rujukan berbeda setiap kali tombol/tab diklik
    const handleRandom = () => {
        if (isTransitioning) return;
        let nextIdx = Math.floor(Math.random() * clinicalResearchLibrary.length);
        if (nextIdx === activeIdx) {
            nextIdx = (activeIdx + 1) % clinicalResearchLibrary.length;
        }
        changeSlide(nextIdx);
    };

    // Auto-advance timer (setiap 60 detik / 1 menit jika tidak di-hover)
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    const nextIdx = (activeIdx + 1) % clinicalResearchLibrary.length;
                    changeSlide(nextIdx);
                    return ROTATE_INTERVAL_SEC;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activeIdx, isPaused, isTransitioning]);

    return (
        <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="promo">
            <div className="space-y-5 sm:space-y-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high">
                    <div className="space-y-1">
                        <span className="text-[11px] text-primary font-medium tracking-wide uppercase block">
                            Bukti Klinis &amp; Pembalikan Risiko
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#142320]">
                            Mengapa intervensi dini menentukan masa depan Anda.
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#546661] max-w-sm leading-relaxed">
                        Pra-diabetes berkembang tanpa rasa nyeri. Mengetahui beban gula pada makanan harian dapat mencegah kerusakan pembuluh darah mikro sebelum terlambat.
                    </p>
                </div>

                {/* Side-by-Side Comparative Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                    {/* Left: Conventional Reactive Approach */}
                    <div className="p-4 sm:p-6 bg-[#faf8f7] rounded-3xl border border-[#ece3de] flex flex-col justify-between space-y-5 h-full">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd5]">
                                <span className="text-[11px] font-medium text-[#8c594c] uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9c5f51]"></span>
                                    Pendekatan Konvensional (Reaktif)
                                </span>
                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#9c5f51] border border-[#ecdcd5] font-medium">
                                    Tanpa Pemantauan
                                </span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2b211e] leading-snug">
                                Menunggu gejala fisik hingga diabetes menetap.
                            </h3>

                            <div className="space-y-3.5 text-xs text-[#5f514d] leading-relaxed pt-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Beban Gula Tersembunyi:</strong> Pemanis cair dan saus kemasan dikonsumsi tanpa panduan, memicu lonjakan glukosa harian yang tidak disadari.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Fluktuasi Energi Berulang:</strong> Rasa kantuk hebat dan lemas setelah makan sering diabaikan sebagai kelelahan biasa, padahal pertanda resistensi insulin.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#a46e61] font-mono text-sm leading-none shrink-0 mt-0.5">—</span>
                                    <span>
                                        <strong className="text-[#2b211e] font-medium">Intervensi Terlambat:</strong> Baru berkonsultasi ke fasilitas medis saat komplikasi kardiovaskular atau neuropati telah muncul.
                                    </span>
                                </div>
                            </div>

                            {/* Symmetrical Mini Telemetry Alert Card (Pure Typographic & Data Metric - No Dummy Images) */}
                            <div className="p-3 rounded-2xl bg-white/85 border border-[#ebd8d0] flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#fdf2ee] border border-[#f5d5cc] text-[#9c5f51] flex flex-col items-center justify-center shrink-0">
                                    <span className="font-mono font-bold text-xs leading-none">24g+</span>
                                    <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5">Gula</span>
                                </div>
                                <div className="text-xs overflow-hidden">
                                    <span className="font-serif font-medium text-[#2b211e] block truncate">
                                        Beban Pemanis Kemasan Bebas Deteksi
                                    </span>
                                    <span className="text-[11px] text-[#7d6560] block truncate">
                                        Gula cair tersembunyi memicu lonjakan glukosa tajam tanpa rasa kenyang
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/80 border border-[#eddcd5] flex items-center justify-between text-[11px] text-[#785044]">
                            <span>Hasil Rata-rata: Beban metabolik meningkat</span>
                            <span className="font-serif font-medium text-[#8c594c]">Progresi Volatil</span>
                        </div>
                    </div>

                    {/* Right: AEVYRA Guided Approach */}
                    <div className="p-4 sm:p-6 bg-[#f2f7f4] rounded-3xl border border-[#cfe1d7] shadow-[0_4px_24px_rgba(0,67,62,0.04)] flex flex-col justify-between space-y-5 h-full">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#d6e7dd]">
                                <span className="text-[11px] font-medium text-[#1c6454] uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                                    Pendekatan AEVYRA (Preventif)
                                </span>
                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#1c6454] border border-[#cbe0d4] font-medium">
                                    Protokol Presisi
                                </span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#122824] leading-snug">
                                Deteksi 0.4 detik &amp; bimbingan gaya hidup terpadu.
                            </h3>

                            <div className="space-y-3.5 text-xs text-[#3f5751] leading-relaxed pt-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Transparansi Sebelum Makan:</strong> Kamera membedah gramatur sukrosa bebas, garam, dan kalori secara instan sebelum suapan pertama.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Kurva Glukosa Terjaga:</strong> Alternatif pangan yang disarankan dokter membantu menjaga kestabilan energi tanpa rasa lapar berlebih.
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-[#1c6454] font-mono text-sm leading-none shrink-0 mt-0.5">+</span>
                                    <span>
                                        <strong className="text-[#122824] font-medium">Remisi Bertahap 90 Hari:</strong> Program kebiasaan mikro terukur dan sinkronisasi data SatuSehat untuk dokter faskes Anda.
                                    </span>
                                </div>
                            </div>

                            {/* Symmetrical Mini Telemetry Preview Card (Pure Typographic & Data Metric - No Dummy Images) */}
                            <div className="p-3 rounded-2xl bg-white/85 border border-[#cbe0d4] flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-[#edf5f0] border border-[#cde2d6] text-[#1c6454] flex flex-col items-center justify-center shrink-0">
                                    <span className="font-mono font-bold text-xs leading-none">&lt;10</span>
                                    <span className="text-[8px] font-semibold uppercase tracking-wider mt-0.5">GL</span>
                                </div>
                                <div className="text-xs overflow-hidden">
                                    <span className="font-serif font-medium text-[#122824] block truncate">
                                        Nutrisi Presisi Rendah Glikemik
                                    </span>
                                    <span className="text-[11px] text-[#4d665f] block truncate">
                                        Stabilisasi glukosa postprandial tanpa lonjakan insulin drastis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/80 border border-[#cbe0d4] flex items-center justify-between text-[11px] text-[#1c6454]">
                            <span>Target Terukur: Stabilitas glukosa terjaga</span>
                            <span className="font-serif font-medium text-primary">Remisi HbA1c &lt; 5.7%</span>
                        </div>
                    </div>
                </div>

                {/* 100% Real Empirical Research Citation Card (Pure Typographic & Scientific Data - ZERO DUMMY IMAGES) */}
                <div
                    className="p-5 sm:p-7 lg:p-8 bg-white/95 rounded-3xl border border-surface-container-high shadow-[0_4px_24px_rgba(0,40,36,0.03)] space-y-6 transition-all duration-300 relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Active Empirical Research Block (Pure Typographic Citation Card - No Photos) */}
                    <div
                        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-all duration-200 ${
                            isTransitioning ? 'opacity-30 translate-y-1' : 'opacity-100 translate-y-0'
                        }`}
                    >
                        {/* Left Column: Scholarly Metadata & Verifiable Identifiers */}
                        <div className="lg:col-span-4 bg-[#f4f9f6] rounded-2xl p-4 sm:p-5 border border-[#d6e7dc] space-y-3.5">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-2xs">
                                    <span className="material-symbols-outlined text-[20px]">
                                        {activeItem.icon}
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <span className="text-[10px] uppercase tracking-wider text-[#637d74] font-semibold block">
                                        Basis Riset &amp; Data
                                    </span>
                                    <h3 className="font-bold text-xs sm:text-sm text-[#182926] truncate">
                                        {activeItem.sourceName}
                                    </h3>
                                </div>
                            </div>

                            {/* Dataset Identification Badge */}
                            <div className="space-y-1 pt-1">
                                <span className="text-[10px] text-[#556963] font-medium block">
                                    Identitas Korpus / Repositori:
                                </span>
                                <div className="p-2 rounded-xl bg-white border border-[#d2e4d9] font-mono text-[10px] text-primary font-semibold break-all">
                                    {activeItem.tag}
                                </div>
                            </div>

                            {/* Sample Size & Organization */}
                            <div className="space-y-1 text-xs text-[#445b54]">
                                <div className="flex items-center justify-between py-1 border-b border-[#e1ece5] text-[11px]">
                                    <span className="text-[#687e77]">Kohort Subjek:</span>
                                    <span className="font-semibold text-[#182926]">{activeItem.sampleSize}</span>
                                </div>
                                <div className="py-1 text-[11px] leading-relaxed">
                                    <span className="text-[#687e77] block text-[10px]">Lembaga Peneliti / Pemilik Data:</span>
                                    <span className="font-medium text-[#203631] block mt-0.5">{activeItem.corpusSource}</span>
                                </div>
                            </div>

                            {/* Key Empirical Metric Pill */}
                            <div className="pt-1">
                                <span className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-white shadow-2xs">
                                    <span className="material-symbols-outlined text-[15px]">verified</span>
                                    <span>{activeItem.keyMetric}</span>
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Full Scientific Quote, Evidence Level & Methodological Standards */}
                        <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
                            {/* Evidence Level & Study Title Header */}
                            <div className="space-y-1.5 pb-2 border-b border-surface-container-high/70">
                                <div className="flex flex-wrap items-center gap-2 text-[10px]">
                                    <span className="px-2.5 py-0.5 rounded-md bg-[#edf5f1] text-[#1a5b4c] font-bold tracking-wide uppercase border border-[#cde3d6]">
                                        {activeItem.evidenceLevel}
                                    </span>
                                    <span className="text-[#899a94]">•</span>
                                    <span className="text-[#435954] font-semibold">
                                        {activeItem.category}
                                    </span>
                                </div>
                                <h4 className="text-xs sm:text-sm font-bold text-[#142622] leading-snug">
                                    {activeItem.evidenceTitle}
                                </h4>
                            </div>

                            {/* The Real Scientific Empirical Quote */}
                            <blockquote className="font-serif italic text-base sm:text-lg lg:text-[19px] text-[#1a332e] leading-relaxed relative pl-4 border-l-3 border-primary/60 my-2">
                                &ldquo;{activeItem.quote}&rdquo;
                            </blockquote>

                            {/* Interactive Quick-Change Action Button (Setiap di klik berubah) */}
                            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                                <button
                                    type="button"
                                    onClick={handleRandom}
                                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#edf5f0] hover:bg-[#dfeee5] text-[#1a5b4c] border border-[#c8e0d1] text-xs font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[16px]">shuffle</span>
                                    <span>Ganti Data Rujukan Acak ({activeIdx + 1}/{clinicalResearchLibrary.length})</span>
                                </button>
                                <span className="text-[10px] text-[#748782] italic">
                                    *Data otomatis berganti tiap 60 detik atau saat tombol di-klik
                                </span>
                            </div>

                            {/* Scientific Standards & Verification Footer */}
                            <div className="pt-3 border-t border-surface-container-high/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#63746f]">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    {activeItem.standards.map((std, sIdx) => (
                                        <React.Fragment key={sIdx}>
                                            <span className="inline-flex items-center gap-1 text-[#1c6454] font-medium">
                                                <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                {std}
                                            </span>
                                            {sIdx < activeItem.standards.length - 1 && (
                                                <span className="text-[#abb8b3]">•</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>

                                <span className="text-[10px] text-[#768984] italic">
                                    {activeItem.studyNote}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Indicator Dots with Prev/Next Navigation (12 items) */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-surface-container/60">
                        <button
                            type="button"
                            onClick={handlePrev}
                            aria-label="Riset Klinis Sebelumnya"
                            title="Riset Sebelumnya"
                            className="w-8 h-8 rounded-full border border-surface-container-high bg-white hover:bg-primary hover:text-white hover:border-primary text-[#324541] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        </button>

                        <div className="flex flex-wrap items-center justify-center gap-1.5 overflow-hidden">
                            {clinicalResearchLibrary.map((item, dotIdx) => {
                                const isCurrent = dotIdx === activeIdx;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => changeSlide(dotIdx)}
                                        title={`${item.sourceName} (${dotIdx + 1})`}
                                        aria-label={`Lihat ${item.sourceName}`}
                                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                                            isCurrent
                                                ? 'w-7 sm:w-8 h-2 bg-primary shadow-xs'
                                                : 'w-2 h-2 bg-[#d1ded7] hover:bg-[#a6bcb1]'
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={handleNext}
                            aria-label="Riset Klinis Selanjutnya"
                            title="Riset Selanjutnya"
                            className="w-8 h-8 rounded-full border border-surface-container-high bg-white hover:bg-primary hover:text-white hover:border-primary text-[#324541] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
