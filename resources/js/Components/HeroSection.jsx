import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    const [activeScanSample, setActiveScanSample] = useState('drink'); // 'drink' | 'food' | 'medicine'

    const scanSamples = {
        drink: {
            title: 'Teh Manis Kemasan Botol (250ml)',
            subtitle: 'Minuman Ringan Tinggi Sukrosa Bebas',
            image: '/image/scan_tea_drink.jpg',
            sensorTag: 'LABEL INFORMASI GIZI',
            ocrLabel: 'GULA TOTAL: 20g / BOTOL',
            focusArea: 'Tabel Nilai Gizi',
            metrics: [
                { label: 'Gula Bebas', value: '20 gram', level: 'high', note: '80% batas harian' },
                { label: 'Beban Glikemik', value: 'Tinggi (GL 20)', level: 'high', note: 'Lonjakan cepat' },
                { label: 'Kalori Cair', value: '90 kkal', level: 'medium', note: 'Energi cepat serap' },
            ],
            statusTag: 'Beban Glikemik Tinggi',
            statusTagStyle: 'bg-[#fdf3f0] text-[#a13b2c] border-[#f5d9d2]',
            curveColor: '#a13b2c',
            curvePeak: '172 mg/dL',
            curvePeakTime: 'Menit ke-45',
            clinicalObservation: 'Kandungan 20g sukrosa cair diserap cepat dalam 15–30 menit, memicu lonjakan glukosa darah postprandial. Disarankan beralih ke teh tawar atau infused water.',
            physician: 'dr. H. Bramantyo, Sp.PD',
            physicianRole: 'Konsultan Endokrinologi & Metabolik',
        },
        food: {
            title: 'Oat Crunch Biskuit Gandum (30g)',
            subtitle: 'Pangan Olahan Rendah Gula & Tinggi Serat',
            image: '/image/scan_oat_food.jpg',
            sensorTag: 'BARCODE & SERAT PANGAN',
            ocrLabel: 'SERAT: 5g • GULA: 3g',
            focusArea: 'Takaran Saji & Serat',
            metrics: [
                { label: 'Serat Pangan', value: '5 gram', level: 'normal', note: '17% harian' },
                { label: 'Gula Bebas', value: '3 gram', level: 'normal', note: 'Rendah gula (<5g)' },
                { label: 'Karbo Kompleks', value: '21 gram', level: 'normal', note: 'Pelepasan lambat' },
            ],
            statusTag: 'Ramah Metabolisme',
            statusTagStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            curveColor: '#1c6454',
            curvePeak: '118 mg/dL',
            curvePeakTime: 'Kenaikan Bertahap',
            clinicalObservation: 'Tingginya serat beta-glukan memperlambat absorpsi glukosa sehingga kurva energi tetap stabil tanpa lemas setelah makan.',
            physician: 'dr. Sarah N., M.Gizi, Sp.GK',
            physicianRole: 'Spesialis Gizi Klinis',
        },
        medicine: {
            title: 'Aprena Film-Coated Tablet 10 mg',
            subtitle: 'Sediaan Farmasi Terdaftar Resmi BPOM',
            image: '/image/scan_pharma_med.jpg',
            sensorTag: 'NOMOR REGISTRASI BPOM',
            ocrLabel: 'POM DKL2345678910A1',
            focusArea: 'Izin Edar & Zat Aktif',
            metrics: [
                { label: 'Zat Aktif', value: 'Amorfenic 10mg', level: 'normal', note: 'Murni terstandar' },
                { label: 'Nomor BPOM', value: 'POM DKL23456..', level: 'normal', note: 'Aktif terverifikasi' },
                { label: 'Masa Berlaku', value: 'Mei 2027', level: 'normal', note: 'Batch: A24301' },
            ],
            statusTag: 'Terverifikasi BPOM RI',
            statusTagStyle: 'bg-[#f0f7f3] text-[#1c6454] border-[#d4e9df]',
            curveColor: '#1c6454',
            curvePeak: 'Efektif 4–6 Jam',
            curvePeakTime: 'Puncak 90 menit',
            clinicalObservation: 'Tercatat valid dalam basis data registrasi BPOM RI. Patuhi aturan minum sesudah makan sesuai arahan dokter Anda.',
            physician: 'apt. Rian Pratama, S.Farm',
            physicianRole: 'Verifikator Farmasi Medis',
        },
    };

    const current = scanSamples[activeScanSample];

    return (
        <section className="w-full pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left: Editorial Authority & Value Proposition */}
                <div className="lg:col-span-6 space-y-5">
                    {/* Headline */}
                    <div className="space-y-2.5">
                        <h1 className="font-serif text-xl sm:text-3xl lg:text-[40px] font-normal text-[#142320] leading-[1.18] tracking-tight">
                            Pahami dampak makanan pada glukosa Anda, <span className="italic text-primary">sebelum suapan pertama.</span>
                        </h1>
                        <p className="text-[11px] sm:text-sm text-[#4a5a55] leading-relaxed max-w-xl">
                            Arahkan kamera smartphone ke label kemasan makanan atau obat. Algoritma visi komputer menganalisis beban glikemik, takaran gula tersembunyi, dan nomor izin edar BPOM seketika — didampingi tim dokter untuk pencegahan pra-diabetes.
                        </p>
                    </div>

                    {/* Core Feature Bullet Highlights - 2 Kolom Sebaris di Mobile */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-[#354843] pt-1">
                        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#e2ede7] min-w-0">
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[12px] sm:text-[13px] font-bold">check</span>
                            </span>
                            <span className="truncate font-medium">120.000+ Database BPOM</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#e2ede7] min-w-0">
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[12px] sm:text-[13px] font-bold">check</span>
                            </span>
                            <span className="truncate font-medium">Deteksi Laser OCR &lt; 0.4 Detik</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#e2ede7] min-w-0">
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[12px] sm:text-[13px] font-bold">check</span>
                            </span>
                            <span className="truncate font-medium">Estimasi Kurva Glukosa</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl bg-white/70 border border-[#e2ede7] min-w-0">
                            <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[12px] sm:text-[13px] font-bold">check</span>
                            </span>
                            <span className="truncate font-medium">Standar PERKENI &amp; SatuSehat</span>
                        </div>
                    </div>

                    {/* Primary Action Buttons - 2 Kolom Sebaris di Mobile */}
                    <div className="pt-1 grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3">
                        <Link
                            href="/demo/scanner"
                            className="inline-flex items-center justify-center min-h-9 sm:min-h-10.5 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-white text-[10px] sm:text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-[0_2px_12px_rgba(0,67,62,0.15)] text-center gap-1 sm:gap-2 truncate"
                        >
                            <span className="material-symbols-outlined text-[14px] sm:text-[16px] shrink-0">photo_camera</span>
                            <span className="truncate">Demo Scanner Kamera</span>
                        </Link>
                        <Link
                            href="/demo/consultations"
                            className="inline-flex items-center justify-center min-h-9 sm:min-h-10.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/80 text-[#31433f] text-[10px] sm:text-xs font-medium hover:bg-white transition-all active:scale-95 border border-[#dce6e1] text-center gap-1 sm:gap-1.5 truncate"
                        >
                            <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-emerald-700 shrink-0">health_and_safety</span>
                            <span className="truncate">Demo Konsultasi Dokter</span>
                        </Link>
                    </div>

                    {/* Endorsement Badge & Stats Strip */}
                    <div className="pt-2 border-t border-surface-container-high space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2 shrink-0">
                                <img
                                    src="/image/doctor_bramantyo.jpg"
                                    alt="dr. H. Bramantyo, Sp.PD"
                                    className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                                />
                                <img
                                    src="/image/doctor_consultation.jpg"
                                    alt="Konsultasi Klinis AEVYRA"
                                    className="w-8 h-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                                />
                            </div>
                            <div className="text-xs text-[#4b5d58] leading-tight">
                                <span className="font-medium text-[#142622] block">
                                    Didampingi Dewan Dokter Spesialis IDI
                                </span>
                                <span className="text-[10px] text-[#6b7d78]">
                                    Protokol klinis PERKENI &amp; standar SatuSehat Kemenkes RI
                                </span>
                            </div>
                        </div>

                        {/* Stats Strip */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-container-high/60">
                            <div>
                                <span className="font-serif text-sm sm:text-lg text-primary block leading-tight">120.000+</span>
                                <span className="text-[10px] text-[#63746f] block mt-0.5 leading-tight">Produk BPOM</span>
                            </div>
                            <div>
                                <span className="font-serif text-sm sm:text-lg text-primary block leading-tight">&lt; 0.4 Detik</span>
                                <span className="text-[10px] text-[#63746f] block mt-0.5 leading-tight">Kecepatan Analisis</span>
                            </div>
                            <div>
                                <span className="font-serif text-sm sm:text-lg text-primary block leading-tight">98.4%</span>
                                <span className="text-[10px] text-[#63746f] block mt-0.5 leading-tight">Akurasi Pembacaan</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Viewfinder Simulation */}
                <div className="lg:col-span-6 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-surface-container-high shadow-[0_8px_30px_rgba(0,40,36,0.04)]" id="scanner-demo">
                    {/* Minimalist Sample Selector Tabs */}
                    <div className="grid grid-cols-3 gap-1 mb-2.5 p-1 bg-[#f3f7f5] rounded-xl border border-[#e4ede8]">
                        <button
                            type="button"
                            onClick={() => setActiveScanSample('drink')}
                            className={`py-1.5 px-1 sm:px-2 text-[10px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all cursor-pointer ${
                                activeScanSample === 'drink'
                                    ? 'bg-white text-primary shadow-xs'
                                    : 'text-[#566863] hover:text-primary'
                            }`}
                        >
                            Minuman Kemasan
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveScanSample('food')}
                            className={`py-1.5 px-1 sm:px-2 text-[10px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all cursor-pointer ${
                                activeScanSample === 'food'
                                    ? 'bg-white text-primary shadow-xs'
                                    : 'text-[#566863] hover:text-primary'
                            }`}
                        >
                            Pangan Olahan
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveScanSample('medicine')}
                            className={`py-1.5 px-1 sm:px-2 text-[10px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all cursor-pointer ${
                                activeScanSample === 'medicine'
                                    ? 'bg-white text-primary shadow-xs'
                                    : 'text-[#566863] hover:text-primary'
                            }`}
                        >
                            Label Farmasi
                        </button>
                    </div>

                    {/* Clean Scan Card Body */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-3">
                        {/* Sample Title & Status Pill */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <h3 className="font-serif text-sm sm:text-base font-medium text-[#182926] truncate">
                                    {current.title}
                                </h3>
                                <span className="text-[11px] text-[#63746f] block truncate">
                                    {current.subtitle}
                                </span>
                            </div>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium shrink-0 ${current.statusTagStyle}`}>
                                {current.statusTag}
                            </span>
                        </div>

                        {/* Interactive Optical Viewfinder Frame */}
                        <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-[#121c19] border border-[#d8e6df] shadow-inner group">
                            <img
                                key={current.image}
                                src={current.image}
                                alt={current.title}
                                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                            />
                            {/* Scanning HUD Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/35 pointer-events-none flex flex-col justify-between p-2.5">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[9px] font-mono tracking-wider border border-white/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>AI SENSOR: {current.sensorTag}</span>
                                    </span>
                                    <span className="text-[9px] text-white/95 font-mono bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                                        AKURASI 98.4%
                                    </span>
                                </div>

                                {/* OCR Focus Target Box */}
                                <div className="self-center w-48 sm:w-56 h-14 sm:h-16 border border-white/50 rounded-lg relative flex items-center justify-center backdrop-brightness-110">
                                    <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-emerald-400 -mt-0.5 -ml-0.5"></span>
                                    <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-emerald-400 -mt-0.5 -mr-0.5"></span>
                                    <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-emerald-400 -mb-0.5 -ml-0.5"></span>
                                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-emerald-400 -mb-0.5 -mr-0.5"></span>
                                    
                                    <div className="px-2 py-0.5 bg-black/75 rounded border border-white/15 backdrop-blur-xs text-center shadow-lg">
                                        <span className="text-[10px] text-emerald-300 font-mono block tracking-wide font-medium">
                                            {current.ocrLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-white/80 text-[9px] font-sans">
                                    <span>Area Fokus: {current.focusArea}</span>
                                    <span>Moda: Vision OCR Terenkripsi</span>
                                </div>
                            </div>
                        </div>

                        {/* 3 Metrics in Soft Porcelain Cards */}
                        <div className="grid grid-cols-3 gap-2">
                            {current.metrics.map((m, idx) => (
                                <div key={idx} className="p-2 rounded-xl bg-white border border-[#e8f0ec] text-center">
                                    <span className="text-[10px] text-[#697c76] block truncate">
                                        {m.label}
                                    </span>
                                    <span className="font-serif text-xs sm:text-sm font-medium text-[#182926] block mt-0.5 truncate">
                                        {m.value}
                                    </span>
                                    <span className="text-[9px] text-[#7d8f89] block mt-0.5 truncate">
                                        {m.note}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Glycemic Curve Row */}
                        <div className="p-2.5 bg-white rounded-xl border border-[#e8f0ec] space-y-1.5">
                            <div className="flex justify-between items-center text-[10px]">
                                <span className="text-[#596d67]">Estimasi Respons Glukosa Darah:</span>
                                <span className="font-medium text-[#182926]">
                                    Puncak {current.curvePeak} ({current.curvePeakTime})
                                </span>
                            </div>
                            <div className="h-9 w-full relative">
                                <svg viewBox="0 0 300 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="heroCurveGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={current.curveColor} stopOpacity="0.18" />
                                            <stop offset="100%" stopColor={current.curveColor} stopOpacity="0.0" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="0" y="24" width="300" height="14" fill="#eaf3ee" opacity="0.6" rx="2" />
                                    {activeScanSample === 'drink' && (
                                        <>
                                            <path d="M 0 30 Q 60 30, 100 6 T 200 30 L 300 30 L 300 38 L 0 38 Z" fill="url(#heroCurveGradient)" />
                                            <path d="M 0 30 Q 60 30, 100 6 T 200 30 L 300 30" fill="none" stroke={current.curveColor} strokeWidth="2" strokeLinecap="round" />
                                            <circle cx="100" cy="6" r="3" fill={current.curveColor} />
                                        </>
                                    )}
                                    {activeScanSample === 'food' && (
                                        <>
                                            <path d="M 0 30 Q 80 30, 140 14 T 250 30 L 300 30 L 300 38 L 0 38 Z" fill="url(#heroCurveGradient)" />
                                            <path d="M 0 30 Q 80 30, 140 14 T 250 30 L 300 30" fill="none" stroke={current.curveColor} strokeWidth="2" strokeLinecap="round" />
                                            <circle cx="140" cy="14" r="3" fill={current.curveColor} />
                                        </>
                                    )}
                                    {activeScanSample === 'medicine' && (
                                        <>
                                            <path d="M 0 30 Q 90 28, 150 20 T 300 28 L 300 38 L 0 38 Z" fill="url(#heroCurveGradient)" />
                                            <path d="M 0 30 Q 90 28, 150 20 T 300 28" fill="none" stroke={current.curveColor} strokeWidth="2" strokeLinecap="round" />
                                            <circle cx="150" cy="20" r="3" fill={current.curveColor} />
                                        </>
                                    )}
                                </svg>
                            </div>
                            <p className="text-[10px] text-[#425550] leading-snug pt-0.5 border-t border-[#edf4f0]">
                                <span className="font-semibold text-[#1c6454]">{current.physician}:</span> {current.clinicalObservation}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Link - Rata Sebaris di Mobile */}
                    <div className="mt-2.5 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-[#637671]">
                        <span className="truncate">Kamera smartphone &amp; barcode BPOM</span>
                        <Link
                            href="/demo/scanner"
                            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded-lg bg-primary text-white text-[10px] sm:text-[11px] font-semibold hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap shadow-2xs"
                        >
                            <span>Buka Demo Scanner</span>
                            <span className="material-symbols-outlined text-[12px] sm:text-[13px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
