import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ConsultationsDemo() {
    const [selectedQuestion, setSelectedQuestion] = useState('q1');
    const [selectedDoctor, setSelectedDoctor] = useState('bramantyo');
    const [selectedSlot, setSelectedSlot] = useState('14:00');

    const triageQuestions = {
        q1: {
            userQuery: 'Gula darah puasa saya tercatat 118 mg/dL kemarin pagi. Apakah saya sudah masuk fase diabetes?',
            aiResponse:
                'Berdasarkan Konsensus Pengelolaan & Pencegahan DM Tipe 2 PERKENI 2021, rentang glukosa puasa 100–125 mg/dL diklasifikasikan sebagai Gangguan Glukosa Puasa (Pre-Diabetes), belum DM Tipe 2 (≥ 126 mg/dL). Kondisi ini sangat reversibel dengan intervensi gizi rendah glisemik dan aktivitas fisik 150 menit/minggu.',
            triageLevel: 'PERLU INTERVENSI GAYA HIDUP (REVERSIBEL)',
            triageStyle: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
            recommendedAction: 'Jadwalkan tele-konsultasi bersama dr. H. Bramantyo, Sp.PD untuk rencana perbaikan pola makan 14 hari.',
        },
        q2: {
            userQuery: 'Mengapa tubuh saya terasa lemas dan mengantuk 1 jam setelah makan siang nasi padang?',
            aiResponse:
                'Sensasi lemas dan kantuk ekstrem pasca santap tinggi karbohidrat olahan dan lemak jenuh dikenal sebagai "Reactive Hypoglycemia" atau Postprandial Somnolence. Lonjakan glukosa cepat memicu sekresi insulin berlebih (insulin spike), sehingga glukosa darah anjlok mendadak setelah 45–60 menit.',
            triageLevel: 'RESPONS INSULIN REAKTIF',
            triageStyle: 'bg-primary/10 text-primary border-primary/20',
            recommendedAction: 'Gunakan protokol konsumsi: Mulai santap dengan serat sayur, disusul protein hewani, dan akhiri dengan karbohidrat.',
        },
        q3: {
            userQuery: 'Apakah penderita pre-diabetes masih boleh mengonsumsi buah-buahan seperti mangga atau pisang?',
            aiResponse:
                'Boleh, dengan pemilihan buah berindeks glikemik rendah-sedang dan takaran saji terukur. Konsumsi buah utuh (bukan jus/smoothie) agar matriks serat pangan tetap utuh menahan pelepasan fruktosa. Padukan dengan segenggam kacang almond untuk menstabilkan kurva energi.',
            triageLevel: 'PANDUAN NUTRISI PREVENTIF',
            triageStyle: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
            recommendedAction: 'Konsultasikan panduan porsi piring dengan dr. Sarah N., M.Gizi, Sp.GK.',
        },
    };

    const doctors = {
        bramantyo: {
            name: 'dr. H. Bramantyo, Sp.PD',
            role: 'Spesialis Penyakit Dalam & Konsultan Endokrinologi',
            str: 'STR No. 31.1.1.100.2.21.098765 (Terverifikasi IDI)',
            exp: '14 Tahun Pengalaman Klinis',
            focus: 'Remisi Pre-Diabetes, Resistensi Insulin, & Sindrom Metabolik',
            avatar: '/image/doctor_bramantyo.jpg',
            slots: ['10:00', '14:00', '16:30', '19:00'],
        },
        sarah: {
            name: 'dr. Sarah N., M.Gizi, Sp.GK',
            role: 'Spesialis Gizi Klinis & Terapi Nutrisi Medis',
            str: 'STR No. 32.2.1.200.3.22.112233 (Terverifikasi IDI)',
            exp: '10 Tahun Pengalaman Klinis',
            focus: 'Medical Nutrition Therapy (MNT) & Desain Diet Karbo Kompleks',
            avatar: '/image/doctor_consultation.jpg',
            slots: ['09:00', '11:30', '15:00', '17:30'],
        },
    };

    const activeTriage = triageQuestions[selectedQuestion];
    const activeDoc = doctors[selectedDoctor];

    return (
        <MarketingLayout>
            <Head title="Demo Konsultasi & Booking Dokter — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Konsultasi &amp; Dokter IDI</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">video_camera_front</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 2</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Telemedisin &amp; AI Co-Pilot Klinis 24/7
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Rasakan integrasi bimbingan medis AEVYRA: skrining cerdas via AI terkalibrasi pedoman PERKENI dan tele-konsultasi video call 1-on-1 dengan dokter spesialis berlisensi IDI.
                            </p>
                        </div>

                        <Link
                            href="/member/consultations-hub"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span>Buka Hub Konsultasi Member</span>
                        </Link>
                    </div>
                </div>

                {/* 2-Column Grid: AI Triage Simulator (Left) & Doctor Booking Preview (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: AI Clinical Triage Interactive Simulator (6 Cols) */}
                    <div className="lg:col-span-6 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Simulasi AI Triage Klinis 24/7
                                </h3>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                                STANDAR PERKENI
                            </span>
                        </div>

                        {/* Select Pre-defined Prompt */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-on-surface block">
                                Pilih Contoh Pertanyaan Pasien:
                            </label>
                            <div className="space-y-1.5">
                                <button
                                    type="button"
                                    onClick={() => setSelectedQuestion('q1')}
                                    className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer ${
                                        selectedQuestion === 'q1'
                                            ? 'bg-primary/5 border-primary text-primary font-bold'
                                            : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                    }`}
                                >
                                    "Gula darah puasa saya 118 mg/dL kemarin pagi..."
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedQuestion('q2')}
                                    className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer ${
                                        selectedQuestion === 'q2'
                                            ? 'bg-primary/5 border-primary text-primary font-bold'
                                            : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                    }`}
                                >
                                    "Mengapa lemas dan mengantuk 1 jam setelah makan nasi padang?"
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedQuestion('q3')}
                                    className={`w-full p-3 rounded-2xl text-left text-xs transition-all border cursor-pointer ${
                                        selectedQuestion === 'q3'
                                            ? 'bg-primary/5 border-primary text-primary font-bold'
                                            : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                    }`}
                                >
                                    "Bolehkah penderita pre-diabetes makan buah mangga/pisang?"
                                </button>
                            </div>
                        </div>

                        {/* Interactive Chat Bubble Output */}
                        <div className="space-y-3 pt-2">
                            {/* User Bubble */}
                            <div className="flex items-start gap-2.5 justify-end">
                                <div className="p-3.5 rounded-2xl rounded-tr-sm bg-primary text-white text-xs max-w-sm leading-relaxed shadow-2xs">
                                    {activeTriage.userQuery}
                                </div>
                                <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                    P
                                </div>
                            </div>

                            {/* AI Assistant Bubble */}
                            <div className="flex items-start gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                                    AI
                                </div>
                                <div className="p-4 rounded-2xl rounded-tl-sm bg-surface-container-low border border-surface-container text-xs text-on-surface max-w-md space-y-2.5 shadow-2xs leading-relaxed">
                                    <div className="flex items-center justify-between gap-2 border-b border-surface-container pb-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${activeTriage.triageStyle}`}>
                                            {activeTriage.triageLevel}
                                        </span>
                                        <span className="text-[10px] text-on-surface-variant font-mono">0.3s latency</span>
                                    </div>
                                    <p>{activeTriage.aiResponse}</p>
                                    <div className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-[11px] text-primary font-semibold">
                                        Rekomendasi Lanjutan: {activeTriage.recommendedAction}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Doctor Booking & Video Room Preview (6 Cols) */}
                    <div className="lg:col-span-6 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">medical_services</span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Jadwal Tele-Konsultasi Dokter IDI
                                </h3>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/20">
                                TERLISENSI RESMI
                            </span>
                        </div>

                        {/* Doctor Selector */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <button
                                type="button"
                                onClick={() => setSelectedDoctor('bramantyo')}
                                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                    selectedDoctor === 'bramantyo'
                                        ? 'bg-primary/5 border-primary shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container-high'
                                }`}
                            >
                                <img
                                    src="/image/doctor_bramantyo.jpg"
                                    alt="dr. Bramantyo"
                                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                    <h4 className="font-bold text-xs text-on-surface truncate">dr. H. Bramantyo, Sp.PD</h4>
                                    <p className="text-[10px] text-on-surface-variant truncate">Spesialis Penyakit Dalam</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedDoctor('sarah')}
                                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                    selectedDoctor === 'sarah'
                                        ? 'bg-primary/5 border-primary shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container hover:bg-surface-container-high'
                                }`}
                            >
                                <img
                                    src="/image/doctor_consultation.jpg"
                                    alt="dr. Sarah"
                                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                                />
                                <div className="min-w-0">
                                    <h4 className="font-bold text-xs text-on-surface truncate">dr. Sarah N., Sp.GK</h4>
                                    <p className="text-[10px] text-on-surface-variant truncate">Spesialis Gizi Klinis</p>
                                </div>
                            </button>
                        </div>

                        {/* Doctor Detailed Credentials Card */}
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-on-surface">{activeDoc.name}</span>
                                <span className="font-mono text-[10px] text-primary font-bold">{activeDoc.exp}</span>
                            </div>
                            <p className="text-on-surface-variant text-[11px] font-mono">{activeDoc.str}</p>
                            <p className="text-on-surface-variant text-xs pt-1 border-t border-surface-container">
                                Fokus: {activeDoc.focus}
                            </p>
                        </div>

                        {/* Schedule Slot Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-on-surface block">Pilih Waktu Sesi Konsultasi:</label>
                            <div className="grid grid-cols-4 gap-2">
                                {activeDoc.slots.map((slot) => (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2 px-1 rounded-xl text-xs font-mono font-bold transition-all text-center cursor-pointer border ${
                                            selectedSlot === slot
                                                ? 'bg-primary text-white border-primary shadow-2xs'
                                                : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                        }`}
                                    >
                                        {slot} WIB
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Simulated Room Action */}
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                                    Slot Dipilih: Hari Ini, {selectedSlot} WIB
                                </span>
                                <span className="text-[10px] text-emerald-800 dark:text-emerald-300">
                                    Enkripsi Medis Peer-to-Peer (WebRTC)
                                </span>
                            </div>
                            <Link
                                href="/member/consultations-hub"
                                className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container transition-all"
                            >
                                Konfirmasi Sesi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}

