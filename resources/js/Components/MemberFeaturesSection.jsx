import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function MemberFeaturesSection() {
    const [activeCategory, setActiveCategory] = useState('all');

    const featureModules = [
        {
            id: 'scanner',
            category: 'skrining',
            span: 'lg:col-span-8',
            num: '01',
            title: 'Scanner Open Cam & Validasi BPOM',
            summary: 'Arahkan kamera smartphone ke label makanan, minuman, atau obat. Deteksi seketika gramatur gula, natrium, beban glikemik, dan nomor izin edar BPOM RI.',
            badge: 'Kamera Live 0.4s',
            badge: 'Demo Scanner 0.4s',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: '/member/scanner',
            btnText: 'Buka Pemindai Kamera',
            href: '/demo/scanner',
            btnText: 'Buka Demo Pemindai',
            visual: (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                    <div className="sm:col-span-7 space-y-2.5">
                        <div className="p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex items-center justify-between text-xs font-mono">
                            <span className="text-[#1c6454] font-semibold">120.000+ Database BPOM</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                Akurasi 98.4%
                            </span>
                        </div>
                        <p className="text-xs text-[#52645f] leading-relaxed">
                            Mencegah lonjakan glukosa darah sebelum makan dan memverifikasi keaslian obat tanpa riset manual.
                        </p>
                    </div>
                    <div className="sm:col-span-5 h-28 sm:h-32 rounded-2xl overflow-hidden border border-[#e2ece6] relative">
                        <img 
                            src="/image/hero_lifestyle_scan.jpg" 
                            alt="Pemindaian Label dengan Smartphone" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-2">
                            <span className="text-[10px] text-white font-medium">Viewfinder Laser OCR</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'consultation',
            category: 'medis',
            span: 'lg:col-span-4',
            num: '02',
            title: 'Konsultasi AI 24/7 & Dokter IDI',
            summary: 'Tanya jawab kesehatan preventif kapan saja dengan AI terkalibrasi, atau jadwalkan tele-konsultasi bersama dokter spesialis berlisensi resmi.',
            badge: 'Siaga 24 Jam',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: '/member/consultations-hub',
            btnText: 'Buka Hub Konsultasi',
            href: '/demo/consultations',
            btnText: 'Buka Demo Konsultasi',
            visual: (
                <div className="mt-4 rounded-2xl overflow-hidden border border-[#e5eee9] bg-[#fafcfb]">
                    <div className="h-28 w-full relative overflow-hidden">
                        <img
                            src="/image/doctor_consultation.jpg"
                            alt="Konsultasi Bersama Dokter"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-medium text-[#1c6454]">
                            Dokter Terverifikasi
                        </span>
                    </div>
                </div>
            ),
        },
        {
            id: 'tracker',
            category: 'metrik',
            span: 'lg:col-span-4',
            num: '03',
            title: 'Tracker & Grafik Tren Baseline',
            summary: 'Catat glukosa darah, tensi, durasi tidur, hidrasi, dan langkah harian untuk melihat stabilitas metabolisme personal.',
            badge: 'Analisis Deviasi',
            badgeStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
            href: '/member/dashboard',
            btnText: 'Buka Tracker Metrik',
            href: '/demo/tracker',
            btnText: 'Buka Demo Tracker',
            visual: (
                <div className="mt-4 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-[#63746f]">Target Stabilitas:</span>
                        <span className="font-serif font-medium text-[#1c6454]">HbA1c &lt; 5.7% (Stabil)</span>
                    </div>
                    <div className="w-full bg-[#e8f0ec] rounded-full h-1.5 overflow-hidden">
                        <div className="w-[72%] bg-[#1c6454] h-full rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-[#7b8d87] block">
                        Variabilitas glukosa 14 hari terkendali
                    </span>
                </div>
            ),
        },
        {
            id: 'challenges',
            category: 'lifestyle',
            span: 'lg:col-span-4',
            num: '04',
            title: 'Program Tantangan 14–90 Hari',
            summary: 'Bimbingan aksi kebiasaan bertahap: 14 hari kurangi pemanis cair, 30 hari jalan 10.000 langkah, hingga target remisi glukosa 90 hari.',
            badge: '+Poin & Gamifikasi',
            badgeStyle: 'bg-[#fcf7ee] text-[#8e6018] border-[#f2e6cf]',
            href: '/member/challenges',
            btnText: 'Lihat Program Tantangan',
            href: '/demo/challenges',
            btnText: 'Buka Demo Tantangan',
            visual: (
                <div className="mt-4 rounded-2xl overflow-hidden border border-[#e5eee9] bg-[#fafcfb]">
                    <div className="h-28 w-full relative overflow-hidden">
                        <img
                            src="/image/habit_morning_walk.jpg"
                            alt="Program Tantangan Sehat"
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-medium text-[#8e6018]">
                            Habit Booster
                        </span>
                    </div>
                </div>
            ),
        },
        {
            id: 'community',
            category: 'lifestyle',
            span: 'lg:col-span-4',
            num: '05',
            title: 'Komunitas & Forum Pejuang Sehat',
            summary: 'Ruang diskusi terarah untuk berbagi pengalaman remisi, tips menu rendah gula, dan berinteraksi dengan sesama pejuang kesehatan.',
            badge: 'Forum Terbuka',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: '/member/community',
            btnText: 'Masuk Forum Komunitas',
            href: '/demo/community',
            btnText: 'Buka Demo Forum',
            visual: (
                <div className="mt-4 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-on-surface">Diskusi Aktif Hari Ini</span>
                    </div>
                    <p className="text-[11px] text-[#52645f] line-clamp-2">
                        "Cara mengatasi cravings manis di sore hari saat bekerja di kantor..."
                    </p>
                </div>
            ),
        },
        {
            id: 'hormonal',
            category: 'metrik',
            span: 'lg:col-span-6',
            num: '06',
            title: 'Siklus Haid Wanita & Vitalitas Pria',
            summary: 'Pelacakan fase hormonal dan prediksi masa subur wanita terhadap resistensi insulin, serta skrining lemak viseral dan risiko kardiometabolik pria.',
            badge: 'Khusus Gender',
            badgeStyle: 'bg-[#fdf2f4] text-[#a0344d] border-[#fad5dc]',
            href: '/member/dashboard',
            btnText: 'Lihat Modul Hormonal & Vitalitas',
            href: '/demo/gender-vitality',
            btnText: 'Buka Demo Hormon & Vitalitas',
            visual: (
                <div className="mt-3.5 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-rose-50 border border-rose-100">
                        <span className="text-[10px] text-rose-700 font-bold block">Wanita (Haid)</span>
                        <span className="text-[11px] text-[#445652] block mt-0.5">Fase Luteal &amp; Kalender AI</span>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50 border border-teal-100">
                        <span className="text-[10px] text-teal-700 font-bold block">Pria (Vitalitas)</span>
                        <span className="text-[11px] text-[#445652] block mt-0.5">Rasio WHtR &amp; Sindrom Metabolik</span>
                    </div>
                </div>
            ),
        },
        {
            id: 'reports',
            category: 'medis',
            span: 'lg:col-span-6',
            num: '07',
            title: 'Laporan Instruktur & Admin',
            summary: 'Dashboard analitik bagi instruktur kesehatan untuk memantau kepatuhan pasien, serta tata kelola audit sistem bagi admin platform.',
            badge: 'Tata Kelola Medis',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            href: '/instructor/reports',
            btnText: 'Lihat Portal Laporan',
            visual: (
                <div className="mt-3.5 p-3 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                        <span className="font-serif text-xs font-semibold text-on-surface block">
                            Resume Medis Terenkripsi
                        </span>
                        <span className="text-[11px] text-[#63746f]">
                            Standar SatuSehat Kemenkes RI (FHIR HL7)
                        </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-primary/10 text-primary text-[10px] font-bold">
                        Audit Siaga
                    </span>
                </div>
            ),
        },
    ];

    const categories = [
        { id: 'all', label: 'Semua Fitur (12 Modul)' },
        { id: 'skrining', label: 'Pemindai Kamera' },
        { id: 'medis', label: 'Layanan Medis & Dokter' },
        { id: 'metrik', label: 'Tracker & Vitalitas' },
        { id: 'lifestyle', label: 'Tantangan & Komunitas' },
    ];

    const filtered = featureModules.filter(item => {
        if (activeCategory === 'all') return true;
        return item.category === activeCategory;
    });

    return (
        <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="features">
            <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-surface-container-high">
                    <div className="space-y-1.5">
                        <span className="text-[11px] text-primary font-bold tracking-wider uppercase block">
                            Ringkasan Fitur Ekosistem AEVYRA
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#142320]">
                            Solusi lengkap untuk kesehatan preventif Anda.
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#546661] max-w-md leading-relaxed">
                        Klik tombol pada setiap kartu di bawah untuk membuka dan mencoba halaman fitur secara langsung.
                    </p>
                </div>

                {/* Filter Categories */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-surface-container/60">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => setActiveCategory(cat.id)}
                            className={`min-h-9.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-primary text-white shadow-2xs'
                                    : 'bg-white/80 text-[#52645f] hover:bg-[#edf5f0]'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            className={`${item.span} p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container-high shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 pb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono text-xs font-bold text-primary/70">
                                            {item.num}.
                                        </span>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeStyle}`}>
                                            {item.badge}
                                        </span>
                                    </div>
                                    <span className="text-[10px] text-on-surface-variant font-mono">
                                        AEVYRA Modul
                                    </span>
                                </div>

                                <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface mt-1">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-[#52645f] leading-relaxed mt-1.5">
                                    {item.summary}
                                </p>

                                {item.visual}
                            </div>

                            {/* Direct Action Link into the Full Page */}
                            <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
                                <span className="text-[11px] text-on-surface-variant hidden sm:inline">
                                    Akses halaman lengkap:
                                </span>
                                <Link
                                    href={item.href}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-xs active:scale-95 transition-all ml-auto"
                                >
                                    <span>{item.btnText}</span>
                                    <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
