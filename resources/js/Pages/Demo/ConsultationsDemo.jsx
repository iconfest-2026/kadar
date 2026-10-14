import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ConsultationsDemo({ instructors = [] }) {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedQuestion, setSelectedQuestion] = useState('q1');
    const [selectedDoctor, setSelectedDoctor] = useState('bramantyo');
    const [selectedSlot, setSelectedSlot] = useState('14:00');
    const [doctorFilter, setDoctorFilter] = useState('all');
    const [bookingSuccessModal, setBookingSuccessModal] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // =========================================================================
    // 1. EXTENSIVE CLINICAL TRIAGE DATABASE (8 Real Scenarios with PERKENI Guidelines)
    // =========================================================================
    const triageQuestions = {
        q1: {
            id: 'q1',
            category: 'glucose',
            title: 'Gula Darah Puasa 118 mg/dL: Apakah Sudah Masuk Diabetes?',
            userQuery: 'Gula darah puasa saya tercatat 118 mg/dL kemarin pagi. Apakah saya sudah masuk fase diabetes?',
            aiResponse:
                'Berdasarkan Konsensus Pengelolaan & Pencegahan DM Tipe 2 PERKENI 2021, rentang glukosa puasa 100–125 mg/dL diklasifikasikan sebagai Gangguan Glukosa Puasa (Pre-Diabetes), belum DM Tipe 2 (≥ 126 mg/dL). Kondisi ini 100% reversibel dengan intervensi gizi rendah glisemik, jalan kaki teratur 150 menit/minggu, dan aktivasi otot soleus.',
            triageLevel: 'PERLU INTERVENSI GAYA HIDUP (REVERSIBEL)',
            triageStyle: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
            guidelineRef: 'PERKENI 2021 Hal. 18 • Kategori Prediabetes Fisiologis',
            biomarkerHighlight: 'GDS: 118 mg/dL (Rentang Waspada: 100-125 mg/dL)',
            recommendedDoctorId: 'bramantyo',
            recommendedAction: 'Jadwalkan tele-konsultasi bersama dr. H. Bramantyo, Sp.PD untuk rencana perbaikan kurva glukosa 14 hari.',
        },
        q2: {
            id: 'q2',
            category: 'nutrition',
            title: 'Lemas & Kantuk Ekstrem 1 Jam Pasca Makan Nasi Padang',
            userQuery: 'Mengapa tubuh saya terasa lemas dan mengantuk 1 jam setelah makan siang nasi padang?',
            aiResponse:
                'Sensasi lemas dan kantuk ekstrem pasca santap tinggi karbohidrat olahan dan lemak jenuh dikenal sebagai "Reactive Hypoglycemia" atau Postprandial Somnolence. Lonjakan glukosa cepat memicu sekresi insulin berlebih (insulin spike), sehingga glukosa darah anjlok mendadak setelah 45–60 menit.',
            triageLevel: 'RESPONS INSULIN REAKTIF (SUGAR CRASH)',
            triageStyle: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold',
            guidelineRef: 'Standar Terapi Nutrisi Medis ADA 2024 & PERKENI MNT',
            biomarkerHighlight: 'Lonjakan Fluktuasi Est. +55 mg/dL lalu Crash',
            recommendedDoctorId: 'sarah',
            recommendedAction: 'Gunakan protokol urutan santap: Mulai dari serat sayur hijau, disusul protein hewani, dan akhiri dengan karbohidrat kompleks.',
        },
        q3: {
            id: 'q3',
            category: 'nutrition',
            title: 'Konsumsi Buah Tropis: Bolehkah Makan Mangga & Pisang?',
            userQuery: 'Apakah penderita pre-diabetes masih boleh mengonsumsi buah-buahan seperti mangga atau pisang?',
            aiResponse:
                'Boleh, dengan pemilihan buah berindeks glikemik rendah-sedang dan takaran saji terukur. Konsumsi buah utuh (bukan jus/smoothie) agar matriks serat pangan tetap utuh menahan pelepasan fruktosa. Padukan dengan segenggam kacang almond untuk menstabilkan kurva energi.',
            triageLevel: 'PANDUAN NUTRISI PREVENTIF',
            triageStyle: 'bg-teal-100 text-teal-950 border-teal-300 font-bold',
            guidelineRef: 'Panduan Gizi Seimbang Kemenkes RI & Indeks Glikemik WHO',
            biomarkerHighlight: 'Glycemic Load Mangga: Sedang (12-14 per 100g)',
            recommendedDoctorId: 'sarah',
            recommendedAction: 'Konsultasikan takaran piring gizi bersama dr. Sarah N., M.Gizi, Sp.GK.',
        },
        q4: {
            id: 'q4',
            category: 'hormone',
            title: 'Lonjakan Sugar Craving & Kram Menjelang Siklus Menstruasi',
            userQuery: 'Tiap 7 hari sebelum haid, tubuh saya selalu gemetar, lapar karbohidrat manis, dan lingkar pinggang membesar. Apakah ini PCOS?',
            aiResponse:
                'Kondisi ini merupakan manifestasi lonjakan resistensi insulin fisiologis pada fase luteal. Peningkatan hormon progesteron menurunkan afinitas reseptor insulin terhadap glukosa hingga 30%, memicu kompensasi otak yang menuntut kalori gula cepat (PMS craving). Jika disertai siklus haid tak teratur, evaluasi PCOS sangat dianjurkan.',
            triageLevel: 'FLUKTUASI HORMONAL & INSULIN LUTEAL',
            triageStyle: 'bg-purple-100 text-purple-950 border-purple-300 font-bold',
            guidelineRef: 'Konsensus POGI & Konsensus Endokrin Reproduksi 2023',
            biomarkerHighlight: 'Resistensi Luteal: +25-30% Insulin Strain',
            recommendedDoctorId: 'nadia',
            recommendedAction: 'Jadwalkan konsultasi ginekologi & metabolik bersama dr. Nadia Salsabila, Sp.OG untuk skrining hormon dan USG pelvis.',
        },
        q5: {
            id: 'q5',
            category: 'cardio',
            title: 'Ujung Kaki Kebas, Kesemutan Tebal & Tekanan Darah 145/92 mmHg',
            userQuery: 'Saya sering merasa kebas di telapak kaki saat bangun pagi dan tensi terakhir 145/92 mmHg. Apakah ini tanda neuropati?',
            aiResponse:
                'Sensasi tebal/kebas di ujung ekstremitas (glove and stocking distribution) merupakan tanda awal neuropati diabetik perifer sekunder akibat stres oksidatif mikrovaskular. Tekanan darah 145/92 mmHg menandakan hipertensi derajat 1 yang mempercepat aterosklerosis pembuluh darah koroner.',
            triageLevel: 'PERLU EVALUASI SPESIALIS MENDALAM',
            triageStyle: 'bg-rose-100 text-rose-950 border-rose-300 font-bold',
            guidelineRef: 'Pedoman Hipertensi PERKI 2023 & Komorbiditas PERKENI',
            biomarkerHighlight: 'TD: 145/92 mmHg (Hipertensi Derajat 1)',
            recommendedDoctorId: 'rayhan',
            recommendedAction: 'Segera lakukan skrining EKG jantung dan pemeriksaan refleks saraf perifer bersama dr. Rayhan Pratama, Sp.JP.',
        },
        q6: {
            id: 'q6',
            category: 'glucose',
            title: 'Waktu Paling Efektif Jalan Kaki Pasca-Makan untuk Menekan Gula',
            userQuery: 'Kapan waktu terbaik melakukan olahraga jalan kaki ringan agar gula darah setelah makan tidak melonjak tinggi?',
            aiResponse:
                'Waktu emas adalah 15–30 menit segera setelah suapan terakhir selesai, berdurasi 10–20 menit dengan intensitas jalan cepat santai (brisk walking). Kontraksi otot kaki, terutama otot soleus, mengaktifkan transporter GLUT-4 non-insulin dependent yang langsung menyerap glukosa darah tanpa membebani sekresi pankreas.',
            triageLevel: 'AKTIVASI KINETIK METABOLIK',
            triageStyle: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold',
            guidelineRef: 'Sports Medicine Review 2023: Postprandial Glycemic Attenuation',
            biomarkerHighlight: 'Potensi Reduksi Lonjakan: Hingga -32 mg/dL',
            recommendedDoctorId: 'nabila',
            recommendedAction: 'Ikuti program latihan jalan kaki terukur di tab Tantangan AEVYRA bersama dr. Nabila Sarah, Sp.GK.',
        },
        q7: {
            id: 'q7',
            category: 'nutrition',
            title: 'Sirup Jagung Fruktosa Tinggi (HFCS) & Bahaya Perlemakan Hati',
            userQuery: 'Mengapa minuman manis kemasan seperti boba atau kopi kekinian lebih berbahaya dibanding nasi putih?',
            aiResponse:
                'Minuman manis umumnya dimaniskan dengan High Fructose Corn Syrup (HFCS). Berbeda dengan glukosa yang digunakan seluruh sel tubuh, fruktosa cair 100% dimetabolisme di organ hati (hepar). Kelebihan fruktosa langsung diubah menjadi trigliserida (de novo lipogenesis), memicu perlemakan hati (NAFLD) dan resistensi insulin hepatik parah.',
            triageLevel: 'RISIKO TINGGI STEATOSIS HEPATIK',
            triageStyle: 'bg-rose-100 text-rose-950 border-rose-300 font-bold',
            guidelineRef: 'PGI Konsensus NAFLD 2022 & EASL Clinical Guidelines',
            biomarkerHighlight: 'Trigliserida Potensial: Naik > 180 mg/dL',
            recommendedDoctorId: 'sarah',
            recommendedAction: 'Ganti minuman dengan infused water lemon-mint dan konsultasikan batas toleransi fruktosa bersama dr. Sarah Sp.GK.',
        },
        q8: {
            id: 'q8',
            category: 'glucose',
            title: 'Intermittent Fasting 16/8 untuk Pekerja Lembur / Shift Malam',
            userQuery: 'Saya bekerja shift malam 10 jam di depan laptop. Apakah aman melakukan puasa intermiten 16 jam?',
            aiResponse:
                'Aman jika jendela makan (feeding window) disesuaikan dengan ritme sirkadian kerja. Hindari makan karbohidrat berat pada pukul 01:00–04:00 dini hari karena sensitivitas insulin malam hari berada pada titik terendah. Buka puasa saat jam kerja dimulai dengan hidrasi tinggi dan protein kaya triptofan.',
            triageLevel: 'PENYESUAIAN RITME SIRKADIAN',
            triageStyle: 'bg-teal-100 text-teal-950 border-teal-300 font-bold',
            guidelineRef: 'Circadian Biology & Chrononutrition Protocol 2023',
            biomarkerHighlight: 'Ritme Insulin: Turun drastis tengah malam',
            recommendedDoctorId: 'bramantyo',
            recommendedAction: 'Susun jadwal sirkadian shift malam terpadu bersama dr. Bramantyo Sp.PD di portal AEVYRA.',
        },
    };

    // Filter questions based on category
    const filteredQuestions = Object.values(triageQuestions).filter((q) => {
        if (selectedCategory === 'all') return true;
        return q.category === selectedCategory;
    });

    const activeTriage = triageQuestions[selectedQuestion] || triageQuestions.q1;

    // =========================================================================
    // 2. EXTENSIVE DOCTOR & CLINICAL BOARD DIRECTORY (Real Instructor Accounts from DB)
    // =========================================================================
    const doctorList = React.useMemo(() => {
        if (Array.isArray(instructors) && instructors.length > 0) {
            return instructors;
        }
        return [
            {
                id: 'bramantyo',
                name: 'dr. H. Bramantyo, Sp.PD, K-EMD, FINASIM',
                role: 'Spesialis Penyakit Dalam & Konsultan Endokrinologi',
                specialtyCategory: 'internist',
                str: 'STR No. 31.1.1.100.2.21.098765 (Terverifikasi IDI & SatuSehat)',
                exp: '14 Tahun Pengalaman',
                rating: 4.9,
                sessions: '1.840+',
                hospital: 'RSUPN Dr. Cipto Mangunkusumo & Konsultan AEVYRA',
                focus: 'Remisi Pra-Diabetes, Sindrom Metabolik, & Resistensi Insulin Lanjut',
                avatar: '/image/doctor_bramantyo.jpg',
                slots: ['09:30', '11:00', '14:00', '16:30', '19:00'],
                tags: ['Penyakit Dalam', 'Endokrinologi', 'Remisi 90 Hari'],
            },
            {
                id: 'sarah',
                name: 'dr. Sarah Nindya, M.Gizi, Sp.GK, AIFO-K',
                role: 'Spesialis Gizi Klinis & Terapi Nutrisi Medis',
                specialtyCategory: 'nutritionist',
                str: 'STR No. 32.2.1.200.3.19.045612 (Terverifikasi IDI & SatuSehat)',
                exp: '9 Tahun Pengalaman',
                rating: 5.0,
                sessions: '1.420+',
                hospital: 'RSUPN Dr. Cipto Mangunkusumo & Konsultan AEVYRA',
                focus: 'Medical Nutrition Therapy (MNT), Diet Glikemik & Komposisi Lemak',
                avatar: '/image/doctor_consultation.jpg',
                slots: ['09:30', '11:00', '14:00', '16:30', '19:00'],
                tags: ['Gizi Klinis', 'Food Sequencing', 'Nutrisi Terarah'],
            },
            {
                id: 'rayhan',
                name: 'dr. Rayhan Pratama, Sp.JP, FIHA',
                role: 'Spesialis Jantung & Pembuluh Darah (Kardiologi Preventif)',
                specialtyCategory: 'cardiology',
                str: 'STR No. 31.1.1.300.1.20.076543 (Terverifikasi IDI & SatuSehat)',
                exp: '11 Tahun Pengalaman',
                rating: 4.9,
                sessions: '980+',
                hospital: 'RS Jantung dan Pembuluh Darah Harapan Kita & Konsultan AEVYRA',
                focus: 'Pencegahan Plak Aterosklerosis, Hipertensi Metabolik, & Evaluasi EKG',
                avatar: '/image/hero_lifestyle_scan.jpg',
                slots: ['09:30', '11:00', '14:00', '16:30', '19:00'],
                tags: ['Kardiovaskular', 'Rekam EKG', 'Hipertensi'],
            },
            {
                id: 'nadia',
                name: 'dr. Nadia Salsabila, Sp.OG, Subsp.FER',
                role: 'Spesialis Obstetri & Ginekologi (Konsultan Fertilitas & Endokrin)',
                specialtyCategory: 'women',
                str: 'STR No. 33.2.1.400.4.18.065432 (Terverifikasi IDI & SatuSehat)',
                exp: '10 Tahun Pengalaman',
                rating: 4.9,
                sessions: '1.150+',
                hospital: 'RSUP Fatmawati Jakarta & Konsultan AEVYRA',
                focus: 'Konsultan endokrinologi reproduksi wanita, menangani resistensi insulin pada PCOS, sindrom metabolik gestasional, dan kesehatan metabolik hormonal.',
                avatar: '/image/habit_morning_walk.jpg',
                slots: ['09:30', '11:00', '14:00', '16:30', '19:00'],
                tags: ['Kesehatan Reproduksi', 'PCOS', 'Hormon Menstruasi'],
            },
            {
                id: 'nabila',
                name: 'dr. Nabila Sarah, Sp.GK',
                role: 'Dokter Spesialis Gizi Klinis (Sp.GK)',
                specialtyCategory: 'nutritionist',
                str: 'STR No. 31.1.1.100.2.21.087654 (Terverifikasi IDI & SatuSehat)',
                exp: '8 Tahun Pengalaman',
                rating: 4.9,
                sessions: '1.200+',
                hospital: 'RSUPN Dr. Cipto Mangunkusumo & Konsultan AEVYRA',
                focus: 'Dokter Spesialis Gizi Klinis berfokus pada pencegahan resistensi insulin, remisi pra-diabetes, dan modulasi gaya hidup metabolik berbasis bukti ilmiah.',
                avatar: '/image/doctor_consultation.jpg',
                slots: ['09:30', '11:00', '14:00', '16:30', '19:00'],
                tags: ['Gizi Klinis', 'Food Sequencing', 'Nutrisi Terarah'],
            },
        ];
    }, [instructors]);

    const doctorsMap = React.useMemo(() => {
        const map = {};
        doctorList.forEach((d) => {
            map[d.id] = d;
            if (d.user_id) {
                map[d.user_id] = d;
            }
        });
        return map;
    }, [doctorList]);

    const activeDoc = doctorsMap[selectedDoctor] || doctorList[0] || {};

    const filteredDoctorList = doctorList.filter((d) => {
        if (doctorFilter === 'all') return true;
        return d.specialtyCategory === doctorFilter;
    });

    const handleSelectDoctorFromCard = (docId) => {
        setSelectedDoctor(docId);
        const target = doctorsMap[docId];
        setSelectedSlot(target?.slots?.[0] || '14:00');
        // Smooth scroll up to booking simulator
        window.scrollTo({ top: 380, behavior: 'smooth' });
    };

    return (
        <MarketingLayout>
            <Head title="Telemedisin & AI Co-Pilot Klinis 24/7 - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                {/* ============================================================== */}
                {/* 1. HERO BREADCRUMB & HEADER */}
                {/* ============================================================== */}
                <div className="space-y-4 border-b border-surface-container pb-8">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Konsultasi &amp; Dokter IDI</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Telemedisin &amp; AI Co-Pilot Klinis 24/7
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                                Rasakan integrasi bimbingan medis AEVYRA: skrining cerdas via AI terkalibrasi pedoman Konsensus PERKENI 2021 dan tele-konsultasi video call 1-on-1 dengan dokter spesialis berlisensi IDI resmi serta sertifikasi SatuSehat Kemenkes RI.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Link
                                href={authUser ? '/member/consultations-hub' : '/register'}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-md transition-all active:scale-95 whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {authUser ? 'calendar_today' : 'person_add'}
                                </span>
                                <span>{authUser ? 'Buka Hub Konsultasi Member' : 'Daftar Konsultasi'}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 2. STATS & CLINICAL TRUST STRIP (4 Key Pillars) */}
                {/* ============================================================== */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4dcce] shadow-xs space-y-1.5">
                        <div className="font-serif text-xl sm:text-2xl font-bold text-black">Terverifikasi SIP &amp; STR</div>
                        <p className="text-[11px] text-[#222222] font-medium leading-tight">Seluruh dokter terdaftar resmi di Kemenkes SatuSehat Protocol.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4dcce] shadow-xs space-y-1.5">
                        <div className="font-serif text-xl sm:text-2xl font-bold text-black">Tingkat Kepuasan 4.9/5</div>
                        <p className="text-[11px] text-[#222222] font-medium leading-tight">Tele-konsultasi video WebRTC HD terenkripsi aman peer-to-peer.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4dcce] shadow-xs space-y-1.5">
                        <div className="font-serif text-xl sm:text-2xl font-bold text-black">AI Triage PERKENI</div>
                        <p className="text-[11px] text-[#222222] font-medium leading-tight">Terkalibrasi 100% konsensus medis diabetes &amp; gizi klinis nasional.</p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c4dcce] shadow-xs space-y-1.5">
                        <div className="font-serif text-xl sm:text-2xl font-bold text-black">Penurunan HbA1c Lab</div>
                        <p className="text-[11px] text-[#222222] font-medium leading-tight">Hasil evaluasi lab 90 hari membuktikan pra-diabetes dapat dibalikkan.</p>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 3. PRIMARY SIMULATOR: 2-COLUMN INTERACTIVE ENGINE */}
                {/* ============================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Column: AI Clinical Triage Interactive Simulator (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#d5e5db] shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-3.5 border-b border-[#e2eee6]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-base text-[#152a24]">
                                            Simulasi AI Triage Klinis 24/7
                                        </h3>
                                        <p className="text-[11px] text-[#40564f] font-mono">Terkalibrasi Pedoman PERKENI 2021 &amp; Kemenkes RI</p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Filter for Questions */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-[#152a24] block">
                                        Pilih Topik Keluhan Klinis:
                                    </label>
                                    <span className="text-[11px] font-mono text-[#40564f] font-semibold">{filteredQuestions.length} Kasus Teruji</span>
                                </div>
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                                    {[
                                        { id: 'all', label: 'Semua Kasus' },
                                        { id: 'glucose', label: 'Glukosa & Lab' },
                                        { id: 'nutrition', label: 'Gizi & Piring' },
                                        { id: 'hormone', label: 'Hormon Wanita' },
                                        { id: 'cardio', label: 'Kardiovaskular' },
                                    ].map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-all shrink-0 cursor-pointer ${
                                                selectedCategory === cat.id
                                                    ? 'bg-primary text-white shadow-2xs'
                                                    : 'bg-[#edf5f0] text-[#2c473e] hover:bg-[#dfeee5]'
                                            }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Select Pre-defined Prompt List (Compact height aligned with right column) */}
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                {filteredQuestions.map((q) => (
                                    <button
                                        key={q.id}
                                        type="button"
                                        onClick={() => setSelectedQuestion(q.id)}
                                        className={`w-full p-2.5 rounded-2xl text-left text-xs transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                                            selectedQuestion === q.id
                                                ? 'bg-primary/10 border-primary text-primary font-bold shadow-2xs ring-1 ring-primary/30'
                                                : 'bg-[#f6faf7] border-[#d8e8de] text-[#1f3830] hover:bg-[#edf5f0]'
                                        }`}
                                    >
                                        <span className="truncate leading-snug font-medium">"{q.title}"</span>
                                        <span className="material-symbols-outlined text-[16px] shrink-0 text-primary">
                                            {selectedQuestion === q.id ? 'check_circle' : 'chevron_right'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Chat Bubble Output */}
                        <div className="space-y-3 pt-3 border-t border-[#e2eee6]">
                            {/* User Bubble */}
                            <div className="flex items-start gap-2.5 justify-end">
                                <div className="p-3 rounded-2xl rounded-tr-xs bg-primary text-white text-xs max-w-sm leading-relaxed shadow-2xs font-medium">
                                    {activeTriage.userQuery}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-primary/30">
                                    <span className="material-symbols-outlined text-[16px]">person</span>
                                </div>
                            </div>

                            {/* AI Assistant Bubble */}
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                    <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                                </div>
                                <div className="p-4 rounded-2xl rounded-tl-xs bg-[#f4f9f6] border border-[#cfe2d7] text-xs max-w-md space-y-3 shadow-2xs leading-relaxed">
                                    <div className="flex items-center justify-between gap-2 border-b border-[#cfe2d7] pb-2 flex-wrap">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${activeTriage.triageStyle}`}>
                                            {activeTriage.triageLevel}
                                        </span>
                                        <span className="text-[11px] text-[#0f2921] font-mono font-bold">Respon 0.28 detik</span>
                                    </div>

                                    {/* Ultra Clear High-Contrast Clinical Text */}
                                    <p className="text-[#091b15] text-xs sm:text-[13px] leading-relaxed font-semibold">
                                        {activeTriage.aiResponse}
                                    </p>

                                    {/* Clinical Guideline Badge */}
                                    <div className="p-2.5 rounded-xl bg-[#e1f0e7] border border-[#a9d5bd] text-xs font-mono text-[#082a20] flex items-center gap-2 font-medium">
                                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0">menu_book</span>
                                        <span className="leading-snug">Grounding: <strong className="font-bold text-[#051c15]">{activeTriage.guidelineRef}</strong></span>
                                    </div>

                                    {/* Recommended Action */}
                                    <div className="p-3.5 rounded-xl bg-white border border-[#a9d5bd] space-y-2.5 shadow-xs">
                                        <div className="flex items-center gap-2 text-[#085a42] font-bold text-xs">
                                            <span className="material-symbols-outlined text-[17px] text-emerald-700">verified_user</span>
                                            <span>Rekomendasi Tindakan Lanjutan:</span>
                                        </div>
                                        <p className="text-xs text-[#0a1e18] font-semibold leading-relaxed pl-6">
                                            {activeTriage.recommendedAction}
                                        </p>
                                        <div className="pt-1 pl-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (activeTriage.recommendedDoctorId) {
                                                        const doc = doctorsMap[activeTriage.recommendedDoctorId] || doctorList[0];
                                                        if (doc) {
                                                            setSelectedDoctor(doc.id);
                                                            setSelectedSlot(doc.slots?.[0] || '14:00');
                                                        }
                                                    }
                                                }}
                                                className="px-4 py-2 rounded-xl bg-primary hover:bg-[#07664c] text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95"
                                            >
                                                <span>Pilih Dokter Rujukan Ini</span>
                                                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Doctor Booking & Video Room Preview (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#d5e5db] shadow-xs p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
                        <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-center justify-between pb-3.5 border-b border-[#e2eee6]">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">medical_services</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-base text-[#152a24]">
                                            Jadwal Tele-Konsultasi Dokter IDI
                                        </h3>
                                        <p className="text-[11px] text-[#40564f] font-mono">Tatap Muka Video 1-on-1 Enkripsi WebRTC</p>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor Selector Chips */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-[#152a24] block">
                                        Pilih Dokter Spesialis Konsultan:
                                    </label>
                                    <span className="text-[11px] font-mono text-[#40564f] font-semibold">{doctorList.length} Spesialis Standby</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {doctorList.map((doc) => (
                                        <button
                                            key={doc.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedDoctor(doc.id);
                                                setSelectedSlot(doc.slots?.[0] || '14:00');
                                            }}
                                            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                                                selectedDoctor === doc.id
                                                    ? 'bg-primary/10 border-primary shadow-2xs ring-1 ring-primary/40'
                                                    : 'bg-[#f6faf7] border-[#d8e8de] hover:bg-[#edf5f0]'
                                            }`}
                                        >
                                            <img
                                                src={doc.avatar}
                                                alt={doc.name}
                                                className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-primary/30"
                                            />
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-xs text-[#10241f] truncate">{doc.name}</h4>
                                                <p className="text-[10px] text-[#345147] truncate font-medium">{doc.role}</p>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <span className="text-[10px] font-mono font-bold text-amber-700">★ {doc.rating}</span>
                                                    <span className="text-[10px] text-[#425e55] font-medium font-mono">({doc.sessions} sesi)</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Schedule Slot & Session Confirmation Box (Anchored to Bottom to Match Left Column Perfectly) */}
                        <div className="space-y-3 pt-3 border-t border-[#e2eee6]">
                            {/* Doctor Detailed Credentials Card */}
                            <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2.5 text-xs shadow-2xs">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                    <span className="font-bold text-[#10241f] text-sm">{activeDoc?.name || ''}</span>
                                    <span className="font-mono text-[10px] text-emerald-950 font-bold bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                                        {activeDoc?.exp || ''}
                                    </span>
                                </div>
                                <p className="text-[#2c473e] text-[11px] font-mono font-medium">{activeDoc?.str || ''}</p>
                                <p className="text-[11px] text-[#085a42] font-semibold">
                                    Afiliasi: {activeDoc?.hospital || ''}
                                </p>
                                <p className="text-xs text-[#1e3831] pt-1.5 border-t border-[#cfe2d7] leading-relaxed">
                                    <b className="text-[#10241f]">Fokus Klinis:</b> {activeDoc?.focus || ''}
                                </p>

                                {/* Verification Trust Badges */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-2 border-t border-[#cfe2d7] text-[10px] font-mono font-bold text-[#0a3b2e]">
                                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1.5 rounded-lg border border-[#c6dfd2]">
                                        <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                                        <span>Resep Digital IDI</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1.5 rounded-lg border border-[#c6dfd2]">
                                        <span className="material-symbols-outlined text-[14px] text-emerald-600">sync_saved_locally</span>
                                        <span>SatuSehat Kemenkes</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1.5 rounded-lg border border-[#c6dfd2]">
                                        <span className="material-symbols-outlined text-[14px] text-emerald-600">lock</span>
                                        <span>WebRTC TLS 1.3</span>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Slot Selector */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-[#152a24] block">
                                        Pilih Waktu Sesi Konsultasi Hari Ini:
                                    </label>
                                    <span className="text-[11px] text-emerald-800 font-mono font-bold">
                                        Tersedia {(activeDoc?.slots || []).length} Slot
                                    </span>
                                </div>
                                <div className="grid grid-cols-5 gap-1.5">
                                    {(activeDoc?.slots || ['09:30', '11:00', '14:00', '16:30', '19:00']).map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer border ${
                                                selectedSlot === slot
                                                    ? 'bg-primary text-white border-primary shadow-xs ring-1 ring-primary/40'
                                                    : 'bg-[#f4f9f6] border-[#cfe2d7] text-[#152a24] hover:bg-[#e6f2eb]'
                                            }`}
                                        >
                                            {slot} WIB
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Simulated Room Action */}
                            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                                <div className="space-y-0.5">
                                    <span className="text-xs font-bold text-emerald-950 block">
                                        Sesi Siap: Hari Ini, {selectedSlot} WIB bersama {(activeDoc?.name || '').split(',')[0]}
                                    </span>
                                    <span className="text-[10px] text-emerald-900 font-medium block">
                                        Enkripsi Medis Peer-to-Peer (WebRTC) • Rekam Medis Terhubung SatuSehat
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setBookingSuccessModal(true)}
                                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-all active:scale-95 cursor-pointer text-center whitespace-nowrap"
                                >
                                    Konfirmasi Sesi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 4. WORKFLOW: 4-STEP CLINICAL CONSULTATION PATHWAY */}
                {/* ============================================================== */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c4dcce] p-3.5 sm:p-8 space-y-4 sm:space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-1.5 sm:space-y-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                            ALUR KERJA TERPADU
                        </span>
                        <h2 className="font-heading font-black text-base sm:text-3xl text-black">
                            Bagaimana Konsultasi AEVYRA Bekerja?
                        </h2>
                        <p className="text-[11px] sm:text-sm text-[#222222] font-medium leading-relaxed">
                            Proses 3 langkah mudah menghubungkan pemantauan glukosa harian Anda langsung dengan tim medis berlisensi tanpa antre di rumah sakit.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-6">
                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                1
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Skrining &amp; AI Triage</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Unggah riwayat makan atau masukkan angka glukosa darah. AI langsung menyusun ringkasan klinis awal berbasis konsensus PERKENI.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                2
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Pilih Dokter &amp; Jadwal</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Pilih dokter spesialis penyakit dalam (Sp.PD), gizi klinis (Sp.GK), atau kardiologi sesuai kebutuhan, lalu tentukan jam sesi.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0">
                                3
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Rencana Terapi Medis</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Terima panduan nutrisi terarah, e-resep resmi jika diperlukan, dan resume medis yang otomatis tersimpan di rekam medis digital.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 5. FULL CLINICAL SPECIALIST DIRECTORY (5 Doctors Grid) */}
                {/* ============================================================== */}
                <div className="space-y-6">
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                                Direktori Dokter Spesialis Berlisensi IDI
                            </h2>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium">
                                Dokter kami telah melalui verifikasi ganda Surat Tanda Registrasi (STR) dan Surat Izin Praktik (SIP) resmi.
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap text-xs pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {[
                                { id: 'all', label: 'Semua Spesialis' },
                                { id: 'internist', label: 'Penyakit Dalam' },
                                { id: 'nutritionist', label: 'Gizi Klinis' },
                                { id: 'cardiology', label: 'Jantung (Kardio)' },
                                { id: 'women', label: 'Kesehatan Wanita' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setDoctorFilter(f.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        doctorFilter === f.id
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : 'bg-white text-black border border-gray-400 hover:border-primary hover:text-primary font-bold'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctorList.map((doc) => (
                            <div
                                key={doc.id}
                                className="bg-white rounded-3xl border border-[#c4dcce] shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3.5">
                                        <img
                                            src={doc.avatar}
                                            alt={doc.name}
                                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
                                        />
                                        <div className="min-w-0 space-y-1">
                                            <h3 className="font-heading font-bold text-sm text-black leading-snug">
                                                {doc.name}
                                            </h3>
                                            <p className="text-xs text-[#222222] font-bold">
                                                {doc.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs pt-2 border-t border-[#e2eee6]">
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-[#333333] font-mono font-bold">Pengalaman:</span>
                                            <span className="font-bold text-black">{doc.exp}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-[11px]">
                                            <span className="text-[#333333] font-mono font-bold">Rating Pasien:</span>
                                            <span className="font-bold text-amber-700 font-mono">★ {doc.rating} ({doc.sessions} sesi)</span>
                                        </div>
                                        <div className="text-[11px] text-[#111111] leading-relaxed">
                                            <span className="font-bold block text-black mb-0.5">Fokus Klinis:</span>
                                            {doc.focus}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                                        {(doc.tags || []).map((t, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#e8f5ee] text-[#053d2f] border border-[#a8d9bf]"
                                            >
                                                #{t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-[#e2eee6] flex items-center justify-between gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectDoctorFromCard(doc.id)}
                                        className="w-full py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all text-center cursor-pointer inline-flex items-center justify-center gap-1.5"
                                    >
                                        <span>Jadwalkan Konsultasi</span>
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 6. COMPARISON: TELEMEDISIN UMUM VS AEVYRA CLINICAL CO-PILOT */}
                {/* ============================================================== */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                            Mengapa AEVYRA Berbeda dari Telemedisin Biasa?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#222222] font-medium">
                            Kami tidak sekadar memberikan resep obat penurun gejala, melainkan intervensi presisi untuk mencapai remisi metabolik permanen.
                        </p>
                    </div>

                    {/* Mobile Comparison Cards (2 Columns Layout without green dot) */}
                    <div className="sm:hidden grid grid-cols-2 gap-2.5">
                        {[
                            {
                                param: 'Fokus Sasaran',
                                conv: 'Meredakan keluhan akut & konsumsi obat rutin seumur hidup',
                                aev: 'Remisi metabolik & perbaikan sensitivitas sel beta pankreas',
                            },
                            {
                                param: 'Standar AI & Panduan',
                                conv: 'Chatbot teks umum tanpa verifikasi klinis spesifik',
                                aev: 'Terkalibrasi 100% Konsensus PERKENI 2021 & MNT Kemenkes RI',
                            },
                            {
                                param: 'Integrasi Data Biomarker',
                                conv: 'Pasien harus mengetik ulang angka tes lab setiap konsultasi',
                                aev: 'Sinkronisasi otomatis dengan AI scanner nutrisi & glukometer digital',
                            },
                            {
                                param: 'Kolaborasi Tim Medis',
                                conv: 'Hanya 1 dokter umum secara terisolasi',
                                aev: 'Panel multidisiplin: Sp.PD, Sp.GK, Sp.JP, dan Sp.OG bekerja terpadu',
                            },
                            {
                                param: 'Konektivitas SatuSehat',
                                conv: 'Rekam medis terpisah dalam aplikasi sendiri',
                                aev: 'Terhubung penuh ke ekosistem SatuSehat Kemenkes RI Terenkripsi',
                            },
                        ].map((row, idx) => (
                            <div
                                key={idx}
                                className={`p-2.5 sm:p-3 rounded-2xl bg-surface-container-low border border-[#c4dcce] flex flex-col justify-between space-y-2 ${
                                    idx === 4 ? 'col-span-2' : ''
                                }`}
                            >
                                <div className="font-bold text-[11px] sm:text-xs text-black border-b border-[#d8e8de] pb-1 leading-snug">
                                    {row.param}
                                </div>
                                <div
                                    className={`text-xs flex-1 ${
                                        idx === 4
                                            ? 'grid grid-cols-2 gap-2 space-y-0'
                                            : 'flex flex-col justify-between space-y-1.5'
                                    }`}
                                >
                                    <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#333333] space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase block tracking-wider">
                                            Konvensional
                                        </span>
                                        <p className="text-[10px] sm:text-[11px] leading-tight text-[#444444]">{row.conv}</p>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-black space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-primary uppercase block tracking-wider">
                                            AEVYRA Co-Pilot
                                        </span>
                                        <p className="text-[10px] sm:text-[11px] font-semibold text-primary leading-tight">{row.aev}</p>
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
                                    <th className="py-3 px-4 font-bold">Parameter Layanan</th>
                                    <th className="py-3 px-4 text-[#333333] font-bold">Telemedisin Konvensional</th>
                                    <th className="py-3 px-4 text-primary font-bold bg-primary/5 rounded-t-xl">AEVYRA Clinical Co-Pilot</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2eee6]">
                                <tr>
                                    <td className="py-3.5 px-4 font-bold text-black">Fokus Sasaran</td>
                                    <td className="py-3.5 px-4 text-[#222222] font-medium">Meredakan keluhan akut &amp; konsumsi obat rutin seumur hidup</td>
                                    <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">Remisi metabolik &amp; perbaikan sensitivitas sel beta pankreas</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-bold text-black">Standar AI &amp; Panduan</td>
                                    <td className="py-3.5 px-4 text-[#222222] font-medium">Chatbot teks umum tanpa verifikasi klinis spesifik</td>
                                    <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">Terkalibrasi 100% Konsensus PERKENI 2021 &amp; MNT Kemenkes RI</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-bold text-black">Integrasi Data Biomarker</td>
                                    <td className="py-3.5 px-4 text-[#222222] font-medium">Pasien harus mengetik ulang angka tes lab setiap konsultasi</td>
                                    <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">Sinkronisasi otomatis dengan AI scanner nutrisi &amp; glukometer digital</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-bold text-black">Kolaborasi Tim Medis</td>
                                    <td className="py-3.5 px-4 text-[#222222] font-medium">Hanya 1 dokter umum secara terisolasi</td>
                                    <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">Panel multidisiplin: Sp.PD, Sp.GK, Sp.JP, dan Sp.OG bekerja terpadu</td>
                                </tr>
                                <tr>
                                    <td className="py-3.5 px-4 font-bold text-black">Konektivitas SatuSehat</td>
                                    <td className="py-3.5 px-4 text-[#222222] font-medium">Rekam medis terpisah dalam aplikasi sendiri</td>
                                    <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">Terhubung penuh ke ekosistem SatuSehat Kemenkes RI Terenkripsi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 7. REAL PATIENT OUTCOMES (Clinical Evidence) */}
                {/* ============================================================== */}
                <div className="space-y-6">
                    <div className="space-y-1 text-center max-w-2xl mx-auto">
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                            Kisah Pasien yang Berhasil Mencapai Remisi
                        </h2>
                        <p className="text-xs sm:text-sm text-[#222222] font-medium">
                            Data laboratorium objektif membuktikan efektivitas bimbingan telemedisin terarah AEVYRA.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/image/doctor_consultation.jpg"
                                    alt="Dimas Aryo"
                                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-sm text-black">Dimas Aryo (29 th)</h4>
                                    <p className="text-[10px] text-[#333333] font-mono font-bold">Software Engineer • Jakarta</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-center p-3 rounded-2xl bg-surface-container-low font-mono text-xs">
                                <div>
                                    <span className="text-[10px] text-black font-bold block">GDP Puasa</span>
                                    <span className="text-rose-600 line-through text-[11px]">154</span> → <b className="text-emerald-600">86 mg/dL</b>
                                </div>
                                <div>
                                    <span className="text-[10px] text-black font-bold block">HbA1c Lab</span>
                                    <span className="text-rose-600 line-through text-[11px]">6.3%</span> → <b className="text-emerald-600">5.3%</b>
                                </div>
                            </div>
                            <p className="text-xs text-[#222222] leading-relaxed italic font-medium">
                                "Sebelumnya saya sering lemas dan kantuk parah tiap jam 2 siang. Melalui bimbingan telemedisin dr. Bramantyo dan pengaturan urutan makan dari dr. Sarah, gula darah saya kembali normal tanpa obat."
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/image/habit_morning_walk.jpg"
                                    alt="Sarah Nindya"
                                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-sm text-black">Sarah Nindya (34 th)</h4>
                                    <p className="text-[10px] text-[#333333] font-mono font-bold">Brand Strategist • Surabaya</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-center p-3 rounded-2xl bg-surface-container-low font-mono text-xs">
                                <div>
                                    <span className="text-[10px] text-black font-bold block">Lonjakan Luteal</span>
                                    <span className="text-rose-600 line-through text-[11px]">162</span> → <b className="text-emerald-600">104 mg/dL</b>
                                </div>
                                <div>
                                    <span className="text-[10px] text-black font-bold block">Lingkar Perut</span>
                                    <span className="text-rose-600 line-through text-[11px]">86 cm</span> → <b className="text-emerald-600">79 cm</b>
                                </div>
                            </div>
                            <p className="text-xs text-[#222222] leading-relaxed italic font-medium">
                                "Fluktuasi gula saat PMS selalu bikin migrain dan kram perut. Dr. Nadia dan dr. Sarah Sp.GK memberikan terapi nutrisi fase luteal yang benar-benar memulihkan siklus menstruasi saya."
                            </p>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="/image/doctor_bramantyo.jpg"
                                    alt="Ir. Hendro"
                                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-sm text-black">Ir. Hendro Wibowo (52 th)</h4>
                                    <p className="text-[10px] text-[#333333] font-mono font-bold">Manajer Konstruksi • Bandung</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-center p-3 rounded-2xl bg-surface-container-low font-mono text-xs">
                                <div>
                                    <span className="text-[10px] text-black font-bold block">Tekanan Darah</span>
                                    <span className="text-rose-600 line-through text-[11px]">145/92</span> → <b className="text-emerald-600">118/76</b>
                                </div>
                                <div>
                                    <span className="text-[10px] text-black font-bold block">Keluhan Kebas</span>
                                    <span className="text-rose-600 line-through text-[11px]">Aktif</span> → <b className="text-emerald-600">Hilang 100%</b>
                                </div>
                            </div>
                            <p className="text-xs text-[#222222] leading-relaxed italic font-medium">
                                "Kombinasi tele-konsultasi kardiologi dr. Rayhan dengan pemantauan natrium harian menyelamatkan saya dari risiko stroke dan serangan jantung koroner di proyek."
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 8. CLINICAL FAQ ACCORDION (Landing Page Accordion Style) */}
                {/* ============================================================== */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1">
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-black">
                            Pertanyaan Umum Mengenai Telemedisin AEVYRA
                        </h2>
                    </div>

                    <div className="space-y-2.5">
                        {[
                            {
                                q: 'Apakah dokter yang bertugas memiliki izin praktik resmi?',
                                a: 'Ya. 100% dokter di AEVYRA adalah dokter spesialis berlisensi IDI dengan Surat Tanda Registrasi (STR) aktif dari Konsil Kedokteran Indonesia (KKI) dan Surat Izin Praktik (SIP) yang terdaftar di Kementerian Kesehatan RI.',
                            },
                            {
                                q: 'Bagaimana privasi rekam medis dan data pasien dilindungi?',
                                a: 'Data rekam medis elektronik Anda dienkripsi dengan standar AES-256 militer dan protokol transmisi video WebRTC peer-to-peer terenkripsi berstandar internasional.',
                            },
                            {
                                q: 'Apakah dokter dapat meresepkan obat atau rujukan lab?',
                                a: 'Dokter kami dapat menerbitkan e-resep resmi dan surat pengantar laboratorium terverifikasi digital yang dapat ditebus langsung di apotek rekanan atau laboratorium klinik terdekat di kota Anda.',
                            },
                            {
                                q: 'Kapan saya harus memilih Sp.PD vs Sp.GK?',
                                a: 'Pilih dokter Sp.PD jika Anda ingin evaluasi komprehensif diagnosis glukosa darah puasa, HbA1c, dan obat. Pilih dokter Sp.GK jika fokus Anda adalah penyusunan menu piring gizi harian, takaran karbohidrat, dan jadwal makan terarah.',
                            },
                            {
                                q: 'Berapa lama durasi setiap sesi tele-konsultasi dokter spesialis?',
                                a: 'Setiap sesi konsultasi berdurasi 30 menit interaktif tatap muka langsung via video HD terenkripsi, lengkap dengan resume klinis dan rekam medis digital SatuSehat yang dapat diunduh seketika.',
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

                {/* ============================================================== */}
                {/* 9. BOTTOM CALL TO ACTION BANNER (Landing Page CtaBanner Style) */}
                {/* ============================================================== */}
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
                            Siap Membalikkan Risiko Pra-Diabetes Bersama Dokter Ahli?
                        </h3>

                        <p className="text-xs sm:text-sm text-[#d4ebe0] max-w-xl mx-auto leading-relaxed">
                            Akses langsung dashboard pemantauan mandiri, panduan nutrisi harian, dan sesi tele-konsultasi dokter spesialis berlisensi IDI resmi sekarang.
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-bold hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-xs text-center gap-1.5 cursor-pointer"
                            >
                                <span>Daftar Pasien Baru</span>
                                <span className="ml-1 text-xs">→</span>
                            </Link>
                            <Link
                                href="/member/consultations-hub"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all active:scale-95 border border-white/20 text-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                                <span>Masuk Portal Konsultasi</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* MODAL: SIMULATION CONFIRMATION FEEDBACK */}
            {/* ============================================================== */}
            {bookingSuccessModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-surface text-on-surface max-w-md w-full p-6 rounded-3xl shadow-2xl border border-surface-container space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                                <span className="material-symbols-outlined text-[24px]">event_available</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Simulasi Sesi Berhasil Disiapkan!
                                </h3>
                                <p className="text-xs text-on-surface-variant font-mono">
                                    ID Sesi: #AEV-{Math.floor(100000 + Math.random() * 900000)}
                                </p>
                            </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Dokter:</span>
                                <span className="font-bold text-primary">{activeDoc?.name || ''}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Waktu Konsultasi:</span>
                                <span className="font-mono font-bold text-emerald-700">Hari Ini, {selectedSlot} WIB</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-500">Kanal Video:</span>
                                <span className="font-mono text-gray-700 dark:text-gray-300">AEVYRA Encrypted WebRTC</span>
                            </div>
                        </div>

                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            Ini adalah demonstrasi interaktif alur tele-konsultasi. Untuk melakukan tele-konsultasi langsung dan mendapatkan bimbingan dokter berlisensi, silakan masuk ke portal konsultasi resmi.
                        </p>

                        <div className="pt-2 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setBookingSuccessModal(false)}
                                className="px-4 py-2 rounded-xl border border-surface-container text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
                            >
                                Tutup Demo
                            </button>
                            <Link
                                href="/member/consultations-hub"
                                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all"
                            >
                                Buka Hub Member
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </MarketingLayout>
    );
}
