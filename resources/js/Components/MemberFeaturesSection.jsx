import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function MemberFeaturesSection() {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const [activeCategory, setActiveCategory] = useState('all');

    const featureModules = [
        {
            id: 'scanner',
            category: 'skrining',
            num: '01',
            title: 'Scanner Open Cam & Validasi BPOM',
            summary: 'Arahkan kamera ke label makanan atau obat untuk deteksi seketika kadar gula bebas, sodium, kalori, dan izin edar BPOM RI.',
            badge: 'Kamera Live 0.4s',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: authUser ? '/member/scanner' : '/demo/scanner',
            btnText: authUser ? 'Buka Scanner' : 'Buka Demo Scanner',
            statusNote: 'Database 120k+ BPOM RI',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 rounded-2xl overflow-hidden border border-[#e2ece6] relative group">
                    <img 
                        src="/image/hero_lifestyle_scan.jpg" 
                        alt="Pemindaian Label dengan Smartphone" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                        <span className="text-[11px] font-medium">Viewfinder Laser OCR AI</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-mono">Akurasi 98.4%</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'consultation',
            category: 'medis',
            num: '02',
            title: 'Konsultasi AI 24/7 & Dokter IDI',
            summary: 'Tanya jawab kesehatan preventif kapan saja dengan AI medis, atau jadwalkan telekonsultasi dokter spesialis berlisensi STR/SIP.',
            badge: 'Siaga 24 Jam',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: authUser ? '/member/consultations-hub' : '/demo/consultations',
            btnText: authUser ? 'Hub Konsultasi' : 'Buka Demo Konsultasi',
            statusNote: 'Dokter Spesialis Terdaftar',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 rounded-2xl overflow-hidden border border-[#e5eee9] relative group">
                    <img
                        src="/image/doctor_consultation.jpg"
                        alt="Konsultasi Bersama Dokter"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                        <span className="text-[11px] font-medium">Telekonsultasi Sp.PD &amp; Sp.GK</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-xs font-mono">Tatap Muka AI/Dokter</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'tracker',
            category: 'metrik',
            num: '03',
            title: 'Tracker & Grafik Tren Baseline',
            summary: 'Catat glukosa harian, tensi darah, hidrasi, dan durasi tidur untuk memantau variabilitas metabolisme personal Anda.',
            badge: 'Analisis Deviasi',
            badgeStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
            href: authUser ? '/member/dashboard' : '/demo/tracker',
            btnText: authUser ? 'Buka Tracker' : 'Buka Demo Tracker',
            statusNote: 'Biomarker HBE Terintegrasi',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 p-3.5 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[#63746f]">Target Stabilitas Glukosa:</span>
                        <span className="font-serif font-semibold text-[#1c6454]">HbA1c &lt; 5.7% (Stabil)</span>
                    </div>
                    <div className="w-full bg-[#e8f0ec] rounded-full h-2 overflow-hidden">
                        <div className="w-[74%] bg-primary h-full rounded-full transition-all"></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#7b8d87]">
                        <span>Variabilitas 14 hari: Terkendali</span>
                        <span className="font-mono text-primary font-semibold">TIR 92%</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'challenges',
            category: 'lifestyle',
            num: '04',
            title: 'Program Tantangan 14–90 Hari',
            summary: 'Bimbingan aksi mikro terarah: 14 hari kurangi pemanis cair, 30 hari jalan 10.000 langkah, hingga target remisi glukosa 90 hari.',
            badge: 'Program Remisi',
            badgeStyle: 'bg-[#fcf7ee] text-[#8e6018] border-[#f2e6cf]',
            href: authUser ? '/member/challenges' : '/demo/challenges',
            btnText: authUser ? 'Lihat Tantangan' : 'Buka Demo Tantangan',
            statusNote: 'Tingkat Kepatuhan 88%',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 rounded-2xl overflow-hidden border border-[#e5eee9] relative group">
                    <img
                        src="/image/habit_morning_walk.jpg"
                        alt="Program Tantangan Sehat"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-3 text-white">
                        <span className="text-[11px] font-medium">Jalan Pagi &amp; Defisit Glikemik</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/80 backdrop-blur-xs font-mono">+Poin Remisi</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'community',
            category: 'lifestyle',
            num: '05',
            title: 'Komunitas & Forum Pejuang Sehat',
            summary: 'Ruang interaksi terarah untuk berbagi pengalaman remisi, tips menu rendah gula, dan inspirasi hidup sehat bersama.',
            badge: 'Forum Terbuka',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: authUser ? '/member/community' : '/demo/community',
            btnText: authUser ? 'Forum Sehat' : 'Buka Demo Forum',
            statusNote: 'Diskusi Aktif 24 Jam',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="font-bold text-[#182926]">Diskusi Hangat Hari Ini</span>
                        </div>
                        <span className="text-[10px] text-[#788a84]">Baru saja</span>
                    </div>
                    <p className="text-[11px] text-[#52645f] line-clamp-2 leading-relaxed">
                        &ldquo;Tips menjaga lonjakan gula darah setelah sarapan nasi uduk: trik makan serat lebih dulu...&rdquo;
                    </p>
                    <span className="text-[10px] text-primary font-medium">34 tanggapan member &bull; 2 dokter berkontribusi</span>
                </div>
            ),
        },
        {
            id: 'hormonal',
            category: 'metrik',
            num: '06',
            title: 'Siklus Haid Wanita & Vitalitas Pria',
            summary: 'Pelacakan fase hormonal wanita terhadap sensitivitas insulin serta evaluasi rasio lemak viseral dan risiko kardiometabolik pria.',
            badge: 'Personalisasi Gender',
            badgeStyle: 'bg-[#fdf2f4] text-[#a0344d] border-[#fad5dc]',
            href: authUser ? '/member/dashboard' : '/demo/gender-vitality',
            btnText: authUser ? 'Modul Vitalitas' : 'Buka Demo Vitalitas',
            statusNote: 'Prediksi AI Terkalibrasi',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 p-2.5 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-rose-50/80 border border-rose-100 flex flex-col justify-center">
                        <span className="text-[10px] text-rose-700 font-bold block">Wanita (Haid)</span>
                        <span className="text-[11px] text-[#445652] block font-medium mt-0.5">Fase Luteal &amp; Kalender</span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50/80 border border-teal-100 flex flex-col justify-center">
                        <span className="text-[10px] text-teal-700 font-bold block">Pria (Vitalitas)</span>
                        <span className="text-[11px] text-[#445652] block font-medium mt-0.5">WHtR &amp; Kardiometabolik</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'arcade',
            category: 'lifestyle',
            num: '07',
            title: 'Arena Edukasi Glucose Dash',
            summary: 'Permainan simulasi interaktif untuk mengenali dampak pemanis dan bahan pangan secara menyenangkan dengan poin skor.',
            badge: 'Edukasi Gamifikasi',
            badgeStyle: 'bg-[#eef2ff] text-[#3730a3] border-[#c7d2fe]',
            href: '/arcade',
            btnText: 'Mainkan Gim',
            statusNote: 'Simulasi Edukasi Play',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 p-3 rounded-2xl bg-linear-to-r from-slate-900 to-emerald-950 border border-emerald-800/40 text-white flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                            <span className="text-amber-400 text-xs">⚡</span>
                            <span className="text-xs font-bold font-mono tracking-wide">GLUCOSE DASH</span>
                        </div>
                        <p className="text-[10px] text-emerald-200/80 line-clamp-1">
                            Hindari lonjakan sukrosa, kumpulkan serat larut!
                        </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-white/15 backdrop-blur-xs text-[10px] font-mono font-bold text-white shrink-0">
                        PLAY ▶
                    </span>
                </div>
            ),
        },
        {
            id: 'reports',
            category: 'medis',
            num: '08',
            title: 'Portal Laporan & Audit Medis',
            summary: 'Dashboard analitik bagi instruktur kesehatan untuk memantau kepatuhan pasien, serta tata kelola audit sistem terenkripsi.',
            badge: 'Tata Kelola Medis',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: '/instructor/reports',
            btnText: 'Lihat Laporan',
            statusNote: 'Standar SatuSehat Kemenkes',
            visual: (
                <div className="mt-3.5 h-26 sm:h-28 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="font-serif text-xs font-bold text-on-surface block">
                            Resume Medis Terenkripsi FHIR HL7
                        </span>
                        <span className="text-[10px] text-[#63746f] block">
                            Audit jejak data &amp; ekspor PDF terstandar faskes
                        </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
                        Audit Siaga
                    </span>
                </div>
            ),
        },
    ];

    const categories = [
        { id: 'all', label: 'Semua Fitur (8 Modul)' },
        { id: 'skrining', label: 'Pemindai Kamera' },
        { id: 'medis', label: 'Layanan Medis & Dokter' },
        { id: 'metrik', label: 'Tracker & Vitalitas' },
        { id: 'lifestyle', label: 'Tantangan, Komunitas & Gim' },
    ];

    const filtered = featureModules.filter(item => {
        if (activeCategory === 'all') return true;
        return item.category === activeCategory;
    });

    return (
        <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="features">
            <div className="space-y-5 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-2 border-b border-surface-container-high">
                    <div className="space-y-1">
                        <span className="text-[10px] sm:text-[11px] text-primary font-bold tracking-wider uppercase block">
                            Ringkasan Fitur Ekosistem AEVYRA
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl lg:text-[32px] font-normal text-[#142320]">
                            Solusi lengkap untuk kesehatan preventif Anda.
                        </h2>
                    </div>
                    <p className="text-[11px] sm:text-sm text-[#546661] max-w-md leading-relaxed">
                        Pilih modul di bawah untuk mencoba dan mengakses fitur klinis secara langsung.
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-surface-container/60 scrollbar-none">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`min-h-7.5 sm:min-h-8 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-primary text-white shadow-2xs font-semibold'
                                    : 'bg-white/90 text-[#52645f] hover:bg-[#edf5f0] border border-surface-container'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Symmetrical 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            className="p-4 sm:p-5 rounded-3xl bg-white border border-surface-container-high shadow-[0_2px_12px_rgba(0,40,36,0.03)] hover:shadow-md transition-all flex flex-col justify-between h-full group"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2 pb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-primary/70">
                                            {item.num}.
                                        </span>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeStyle}`}>
                                            {item.badge}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-[#768883] font-mono">
                                        AEVYRA Modul
                                    </span>
                                </div>

                                <h3 className="font-serif font-bold text-sm sm:text-base text-[#142320] leading-snug group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-[#52645f] leading-relaxed line-clamp-2">
                                    {item.summary}
                                </p>

                                {item.visual}
                            </div>

                            {/* Proportional Action Footer */}
                            <div className="pt-3.5 mt-3.5 border-t border-surface-container/70 flex items-center justify-between text-xs">
                                <span className="text-[11px] text-[#6d807b] flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    {item.statusNote}
                                </span>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#edf5f0] hover:bg-primary text-primary hover:text-white border border-[#cbe0d4] text-xs font-semibold transition-all active:scale-95 shadow-2xs cursor-pointer"
                                >
                                    <span>{item.btnText}</span>
                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
