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
            title: 'Scanner Kamera & Validasi BPOM',
            summary: 'Jepret foto piring makanan atau label kemasan untuk identifikasi instan gramatur gula, sodium, kalori, dan izin edar BPOM RI.',
            href: authUser ? '/member/scanner' : '/demo/scanner',
            btnText: authUser ? 'Buka Scanner' : 'Demo Scanner',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#e2ece6] relative group">
                    <img 
                        src="/image/hero_lifestyle_scan.jpg" 
                        alt="Pemindaian Label dengan Smartphone" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-2 sm:p-3 text-white">
                        <span className="text-[9px] sm:text-[11px] font-medium truncate">Jepret &amp; Identifikasi AI</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-mono shrink-0">Akurasi 98.4%</span>
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
            href: authUser ? '/member/consultations-hub' : '/demo/consultations',
            btnText: authUser ? 'Hub Konsultasi' : 'Demo Konsultasi',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5eee9] relative group">
                    <img
                        src="/image/doctor_consultation.jpg"
                        alt="Konsultasi Bersama Dokter"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-2 sm:p-3 text-white">
                        <span className="text-[9px] sm:text-[11px] font-medium truncate">Telekonsultasi Dokter IDI</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-xs font-mono shrink-0">AI / Dokter</span>
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
            href: authUser ? '/member/dashboard' : '/demo/tracker',
            btnText: authUser ? 'Buka Tracker' : 'Demo Tracker',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[9px] sm:text-xs">
                        <span className="text-[#63746f] truncate">Target Glukosa:</span>
                        <span className="font-serif font-semibold text-[#1c6454] shrink-0">&lt; 5.7% (Stabil)</span>
                    </div>
                    <div className="w-full bg-[#e8f0ec] rounded-full h-1.5 sm:h-2 overflow-hidden my-1">
                        <div className="w-[74%] bg-primary h-full rounded-full transition-all"></div>
                    </div>
                    <div className="flex items-center justify-between text-[8px] sm:text-[11px] text-[#7b8d87]">
                        <span className="truncate">Variabilitas: Terkendali</span>
                        <span className="font-mono text-primary font-semibold shrink-0">TIR 92%</span>
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
            href: authUser ? '/member/challenges' : '/demo/challenges',
            btnText: authUser ? 'Lihat Tantangan' : 'Demo Tantangan',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden border border-[#e5eee9] relative group">
                    <img
                        src="/image/habit_morning_walk.jpg"
                        alt="Program Tantangan Sehat"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent flex items-end justify-between p-2 sm:p-3 text-white">
                        <span className="text-[9px] sm:text-[11px] font-medium truncate">Misi Jalan Pagi</span>
                        <span className="text-[8px] sm:text-[10px] px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-amber-500/80 backdrop-blur-xs font-mono shrink-0">+Poin Remisi</span>
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
            href: authUser ? '/member/community' : '/demo/community',
            btnText: authUser ? 'Forum Sehat' : 'Demo Forum',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] sm:text-xs">
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="font-bold text-[#182926] truncate">Diskusi Hari Ini</span>
                        </div>
                        <span className="text-[8px] sm:text-[10px] text-[#788a84] shrink-0">Aktif</span>
                    </div>
                    <p className="text-[8.5px] sm:text-[11px] text-[#52645f] line-clamp-2 leading-tight sm:leading-relaxed">
                        &ldquo;Tips menjaga gula stabil setelah sarapan: trik serat lebih dulu...&rdquo;
                    </p>
                    <span className="text-[8px] sm:text-[10px] text-primary font-medium truncate">34 tanggapan &bull; Dokter aktif</span>
                </div>
            ),
        },
        {
            id: 'hormonal',
            category: 'metrik',
            num: '06',
            title: 'Siklus Haid Wanita & Vitalitas Pria',
            summary: 'Pelacakan fase hormonal wanita terhadap sensitivitas insulin serta evaluasi rasio lemak viseral dan risiko kardiometabolik pria.',
            href: authUser ? '/member/dashboard' : '/demo/gender-vitality',
            btnText: authUser ? 'Modul Vitalitas' : 'Demo Vitalitas',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl bg-[#fafcfb] border border-[#e5eee9] grid grid-cols-2 gap-1.5 sm:gap-2 text-center text-xs">
                    <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-rose-50/80 border border-rose-100 flex flex-col justify-center">
                        <span className="text-[8px] sm:text-[10px] text-rose-700 font-bold block truncate">Wanita (Haid)</span>
                        <span className="text-[8px] sm:text-[11px] text-[#445652] block font-medium truncate">Fase Luteal</span>
                    </div>
                    <div className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-teal-50/80 border border-teal-100 flex flex-col justify-center">
                        <span className="text-[8px] sm:text-[10px] text-teal-700 font-bold block truncate">Pria (Vitalitas)</span>
                        <span className="text-[8px] sm:text-[11px] text-[#445652] block font-medium truncate">WHtR Rasio</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'arcade',
            category: 'lifestyle',
            num: '07',
            title: 'Simulasi Kasus Metabolik 24 Jam',
            summary: 'Simulasi kasus interaktif 24 jam untuk mengambil keputusan gizi, aktivitas, dan memantau kurva respon glukosa darah.',
            href: '/arcade',
            btnText: 'Mulai Simulasi',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-linear-to-r from-slate-900 to-emerald-950 border border-emerald-800/40 text-white flex items-center justify-between">
                    <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-amber-400">auto_stories</span>
                            <span className="text-[9.5px] sm:text-xs font-bold font-mono tracking-wide text-amber-200">STORY 24H</span>
                        </div>
                        <p className="text-[8.5px] sm:text-[10.5px] text-emerald-200/80 line-clamp-1">
                            Ambil keputusan nutrisi &amp; amati kurva respon glukosa!
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-2xl sm:text-3xl text-emerald-400/25 shrink-0">
                        query_stats
                    </span>
                </div>
            ),
        },
        {
            id: 'emergency',
            category: 'medis',
            num: '08',
            title: 'Siaga Ambulans 119 & IGD Faskes',
            summary: 'Hotline darurat nasional terintegrasi GPS SatuSehat untuk penanganan hipoglikemia, krisis kardiometabolik, dan rujukan cepat.',
            href: authUser ? '/member/dashboard#ambulance' : '/demo/emergency',
            btnText: 'Siaga 119',
            visual: (
                <div className="mt-2 sm:mt-3.5 h-20 sm:h-28 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-linear-to-r from-rose-950 to-slate-900 border border-rose-800/40 text-white flex items-center justify-between">
                    <div className="space-y-0.5 sm:space-y-1">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] sm:text-[16px] text-rose-400 animate-pulse">emergency</span>
                            <span className="text-[9px] sm:text-xs font-bold font-mono tracking-wide text-rose-200">HOTLINE 119</span>
                        </div>
                        <p className="text-[8px] sm:text-[10px] text-rose-100/80 line-clamp-1">
                            Geolokasi GPS &amp; IGD Faskes Terdekat
                        </p>
                    </div>
                    <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-xl bg-rose-600/80 text-[8.5px] sm:text-[10px] font-mono font-bold text-white shrink-0">
                        SIAGA
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
        <section className="w-full py-5 sm:py-8 px-3 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="features">
            <div className="space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-3 pb-2 border-b border-surface-container-high">
                    <div className="space-y-1">
                        <span className="text-[10px] sm:text-[11px] text-primary font-bold tracking-wider uppercase block">
                            Ringkasan Fitur Ekosistem AEVYRA
                        </span>
                        <h2 className="font-serif text-lg sm:text-2xl lg:text-[32px] font-normal text-[#142320]">
                            Solusi lengkap untuk kesehatan preventif Anda.
                        </h2>
                    </div>
                    <p className="text-[10.5px] sm:text-sm text-[#546661] max-w-md leading-relaxed">
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
                            className={`min-h-7 sm:min-h-8 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-primary text-white shadow-2xs font-semibold'
                                    : 'bg-white/90 text-[#52645f] hover:bg-[#edf5f0] border border-surface-container'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* 2-Column Responsive Grid on Mobile & Desktop */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-5">
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            className="p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-surface-container-high shadow-[0_2px_12px_rgba(0,40,36,0.03)] hover:shadow-md transition-all flex flex-col justify-between h-full group min-w-0"
                        >
                            <div className="space-y-1 sm:space-y-2">
                                <h3 className="font-serif font-bold text-[11.5px] sm:text-base text-[#142320] leading-snug group-hover:text-primary transition-colors line-clamp-2">
                                    <span className="font-mono font-bold text-primary mr-1 sm:mr-1.5">{item.num}.</span>
                                    {item.title}
                                </h3>

                                <p className="text-[9px] sm:text-xs text-[#52645f] leading-relaxed line-clamp-2">
                                    {item.summary}
                                </p>

                                {item.visual}
                            </div>

                            {/* Proportional Action Footer */}
                            <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-surface-container/70 flex items-center">
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center justify-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#edf5f0] hover:bg-primary text-primary hover:text-white border border-[#cbe0d4] text-[9.5px] sm:text-xs font-semibold transition-all active:scale-95 shadow-2xs cursor-pointer w-full text-center truncate"
                                >
                                    <span className="truncate">{item.btnText}</span>
                                    <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
