import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    const [activeScanSample, setActiveScanSample] = useState('drink'); // 'drink' | 'food' | 'medicine'

    const scanSamples = {
        drink: {
            title: 'Teh Manis Kemasan Botol (250ml)',
            subtitle: 'Kategori: Minuman Ringan Tinggi Sukrosa Bebas',
            image: '/image/scan_tea_drink.jpg',
            sensorTag: 'LABEL INFORMASI GIZI',
            ocrLabel: 'GULA TOTAL: 20g / BOTOL',
            focusArea: 'Tabel Informasi Nilai Gizi',
            metrics: [
                { label: 'Gula Tambahan', value: '20 gram', level: 'high', note: '80% batas harian' },
                { label: 'Beban Glikemik', value: 'Tinggi (GL 20)', level: 'high', note: 'Respon lonjakan cepat' },
                { label: 'Kalori Bebas', value: '90 kkal', level: 'medium', note: 'Energi cair' },
            ],
            statusTag: 'Beban Glikemik Tinggi',
            statusTagStyle: 'bg-[#fdf3f0] text-[#a13b2c] border-[#f5d9d2]',
            curveColor: '#a13b2c',
            curvePeak: '172 mg/dL',
            curvePeakTime: 'Menit ke-45',
            clinicalObservation: 'Kandungan 20g sukrosa cair diserap cepat oleh usus halus dalam 15–30 menit, memicu lonjakan glukosa darah postprandial yang membebani sel beta pankreas. Disarankan beralih ke teh tawar atau infused water beraroma herbal.',
            physician: 'dr. H. Bramantyo, Sp.PD',
            physicianRole: 'Konsultan Endokrinologi & Metabolik',
        },
        food: {
            title: 'Oat Crunch Biskuit Gandum Utuh (30g)',
            subtitle: 'Kategori: Pangan Olahan Rendah Gula & Tinggi Serat',
            image: '/image/scan_oat_food.jpg',
            sensorTag: 'BARCODE & SERAT PANGAN',
            ocrLabel: 'SERAT: 5g • GULA: 3g',
            focusArea: 'Takaran Saji & Komposisi',
            metrics: [
                { label: 'Serat Pangan', value: '5 gram', level: 'normal', note: '17% kebutuhan harian' },
                { label: 'Gula Bebas', value: '3 gram', level: 'normal', note: 'Rendah gula (<5g)' },
                { label: 'Karbohidrat Kompleks', value: '21 gram', level: 'normal', note: 'Pelepasan lambat' },
            ],
            statusTag: 'Ramah Metabolisme',
            statusTagStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            curveColor: '#1c6454',
            curvePeak: '118 mg/dL',
            curvePeakTime: 'Kenaikan Bertahap',
            clinicalObservation: 'Tingginya serat beta-glukan memperlambat laju absorpsi glukosa sehingga kurva energi tetap stabil tanpa rasa lemas setelah makan. Sangat baik sebagai camilan pencegah resistensi insulin.',
            physician: 'dr. Sarah N., M.Gizi, Sp.GK',
            physicianRole: 'Spesialis Gizi Klinis',
        },
        medicine: {
            title: 'Aprena Film-Coated Tablet 10 mg',
            subtitle: 'Kategori: Sediaan Farmasi Terdaftar Resmi BPOM',
            image: '/image/scan_pharma_med.jpg',
            sensorTag: 'NOMOR REGISTRASI BPOM',
            ocrLabel: 'POM DKL2345678910A1',
            focusArea: 'Kode Izin Edar & Zat Aktif',
            metrics: [
                { label: 'Zat Aktif', value: 'Amorfenic Acid 10mg', level: 'normal', note: 'Murni terstandar' },
                { label: 'Nomor Registrasi', value: 'POM DKL2345678910A1', level: 'normal', note: 'Aktif terverifikasi' },
                { label: 'Masa Berlaku', value: 'Mei 2027', level: 'normal', note: 'Batch No: A24301' },
            ],
            statusTag: 'Terverifikasi BPOM RI',
            statusTagStyle: 'bg-[#f0f7f3] text-[#1c6454] border-[#d4e9df]',
            curveColor: '#1c6454',
            curvePeak: 'Efektif 4–6 Jam',
            curvePeakTime: 'Puncak 90 menit',
            clinicalObservation: 'Tercatat valid dalam basis data registrasi BPOM RI. Patuhi anjuran waktu konsumsi sesudah makan sesuai arahan dokter Anda untuk menjaga kenyamanan saluran pencernaan.',
            physician: 'apt. Rian Pratama, S.Farm',
            physicianRole: 'Verifikator Farmasi Medis',
        },
    };

    const current = scanSamples[activeScanSample];

    const scrollToDemo = (e) => {
        e.preventDefault();
        const el = document.getElementById('scanner-demo');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="w-full pt-8 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left: Editorial Authority & Gentle Typography */}
                <div className="lg:col-span-6 space-y-6">
                    {/* Soft Pill Tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-on-surface border border-[#d6e7dc] text-[11px] text-primary font-medium tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                        <span>Pencegahan Dini &amp; Skrining Nutrisi Mandiri</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-3">
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#142320] leading-[1.18] tracking-tight">
                            Pahami dampak makanan pada glukosa Anda, <span className="italic text-primary">sebelum suapan pertama.</span>
                        </h1>
                        <p className="text-sm sm:text-base text-[#4a5a55] leading-relaxed max-w-xl">
                            Arahkan kamera smartphone ke label kemasan makanan atau obat. Algoritma kami menganalisis beban glikemik, takaran gula tersembunyi, dan izin resmi BPOM seketika — didampingi tim dokter untuk pencegahan pra-diabetes.
                        </p>
                    </div>

                    {/* Primary Action Buttons (Touch Ergonomics 48px) */}
                    <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Link
                            href="/member/scanner"
                            className="inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-[0_2px_12px_rgba(0,67,62,0.15)] text-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                            <span>Buka Scanner Kamera Langsung</span>
                        </Link>
                        <Link
                            href="/member/consultations-hub"
                            className="inline-flex items-center justify-center min-h-12 px-5 py-3 rounded-full bg-white/80 text-[#31433f] text-xs font-medium hover:bg-white transition-all active:scale-95 border border-[#dce6e1] text-center gap-1.5"
                        >
                            <span className="material-symbols-outlined text-[17px] text-emerald-700">health_and_safety</span>
                            <span>Konsultasi &amp; Jadwal Dokter</span>
                        </Link>
                    </div>

                    {/* Editorial Clinical Endorsement Badge */}
                    <div className="flex items-center gap-3 pt-1">
                        <div className="flex -space-x-2 shrink-0">
                            <img
                                src="/image/doctor_bramantyo.jpg"
                                alt="dr. H. Bramantyo, Sp.PD"
                                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                            />
                            <img
                                src="/image/doctor_consultation.jpg"
                                alt="Konsultasi Klinis AEVYRA"
                                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                            />
                        </div>
                        <div className="text-xs text-[#4b5d58] leading-tight">
                            <span className="font-medium text-[#142622] block">
                                Didampingi Dewan Dokter Spesialis IDI
                            </span>
                            <span className="text-[11px] text-[#6b7d78]">
                                Protokol klinis PERKENI &amp; standar SatuSehat Kemenkes RI
                            </span>
                        </div>
                    </div>

                    {/* Quiet, Harmonious Stats Strip */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-surface-container-high">
                        <div>
                            <span className="font-serif text-lg sm:text-2xl text-primary block leading-tight">120.000+</span>
                            <span className="text-[10px] sm:text-[11px] text-[#63746f] block mt-0.5 leading-tight">Produk BPOM Terindeks</span>
                        </div>
                        <div>
                            <span className="font-serif text-lg sm:text-2xl text-primary block leading-tight">&lt; 0.4 Detik</span>
                            <span className="text-[10px] sm:text-[11px] text-[#63746f] block mt-0.5 leading-tight">Kecepatan Analisis</span>
                        </div>
                        <div>
                            <span className="font-serif text-lg sm:text-2xl text-primary block leading-tight">98.4%</span>
                            <span className="text-[10px] sm:text-[11px] text-[#63746f] block mt-0.5 leading-tight">Akurasi Pembacaan</span>
                        </div>
                    </div>
                </div>

                {/* Right: Sleek, High-End Medical Viewfinder Interface */}
                <div className="lg:col-span-6 bg-white/90 backdrop-blur-xl p-4 sm:p-6 lg:p-7 rounded-3xl border border-surface-container-high shadow-[0_8px_30px_rgba(0,40,36,0.04)]" id="scanner-demo">
                    {/* Viewfinder Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[#edf4f0]">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#1c6454]"></span>
                            <span className="text-xs font-medium text-[#2d3f3b] tracking-wide">
                                Simulasi Pemindai Label Nutrisi
                            </span>
                        </div>
                        <span className="text-[11px] text-[#5e716c] font-mono">
                            Moda Sensor Aktif
                        </span>
                    </div>

                    {/* Minimalist Sample Selector Tabs */}
                    <div className="grid grid-cols-3 gap-1 my-3.5 p-1 bg-[#f3f7f5] rounded-xl border border-[#e4ede8]">
                        <button
                            type="button"
                            onClick={() => setActiveScanSample('drink')}
                            className={`min-h-10.5 py-1 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all ${
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
                            className={`min-h-10.5 py-1 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all ${
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
                            className={`min-h-10.5 py-1 px-1.5 text-[11px] sm:text-xs font-medium rounded-lg flex items-center justify-center text-center transition-all ${
                                activeScanSample === 'medicine'
                                    ? 'bg-white text-primary shadow-xs'
                                    : 'text-[#566863] hover:text-primary'
                            }`}
                        >
                            Label Farmasi
                        </button>
                    </div>

                    {/* Clean Scan Card Body */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#fafcfb] border border-[#e5eee9] space-y-4">
                        {/* Sample Title & Status Pill */}
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                                <h3 className="font-serif text-base sm:text-lg font-medium text-[#182926]">
                                    {current.title}
                                </h3>
                                <span className="text-xs text-[#63746f] block mt-0.5">
                                    {current.subtitle}
                                </span>
                            </div>
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${current.statusTagStyle}`}>
                                {current.statusTag}
                            </span>
                        </div>

                        {/* Interactive Optical Viewfinder Frame with Real Scanned Product Photo */}
                        <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-[#121c19] border border-[#d8e6df] shadow-inner group">
                            <img
                                key={current.image}
                                src={current.image}
                                alt={current.title}
                                className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105"
                            />
                            {/* Scanning HUD Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/35 pointer-events-none flex flex-col justify-between p-3">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-wider border border-white/10">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span>AI SENSOR: {current.sensorTag}</span>
                                    </span>
                                    <span className="text-[10px] text-white/95 font-mono bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                                        AKURASI 98.4%
                                    </span>
                                </div>

                                {/* OCR Focus Target Box */}
                                <div className="self-center w-52 sm:w-60 h-20 sm:h-24 border border-white/50 rounded-lg relative flex items-center justify-center backdrop-brightness-110">
                                    <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400 -mt-0.5 -ml-0.5"></span>
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-emerald-400 -mt-0.5 -mr-0.5"></span>
                                    <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-emerald-400 -mb-0.5 -ml-0.5"></span>
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400 -mb-0.5 -mr-0.5"></span>
                                    
                                    <div className="px-2.5 py-1 bg-black/75 rounded-md border border-white/15 backdrop-blur-xs text-center shadow-lg">
                                        <span className="text-[10px] text-emerald-300 font-mono block tracking-wide font-medium">
                                            {current.ocrLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-white/80 text-[10px] font-sans">
                                    <span>Area Fokus: {current.focusArea}</span>
                                    <span>Moda: Vision OCR Terenkripsi</span>
                                </div>
                            </div>
                        </div>

                        {/* Minimalist Glycemic Curve Visualization (Clean SVG) */}
                        <div className="p-3 bg-white rounded-xl border border-[#e8f0ec] space-y-2">
                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-[#596d67]">Estimasi Respons Glukosa Darah:</span>
                                <span className="font-medium text-[#182926]">
                                    Puncak {current.curvePeak} ({current.curvePeakTime})
                                </span>
                            </div>
                            {/* Serene SVG Curve */}
                            <div className="h-14 w-full relative">
                                <svg viewBox="0 0 300 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={current.curveColor} stopOpacity="0.15" />
                                            <stop offset="100%" stopColor={current.curveColor} stopOpacity="0.0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Normal baseline zone band */}
                                    <rect x="0" y="30" width="300" height="18" fill="#eaf3ee" opacity="0.6" rx="2" />
                                    {/* Curve path */}
                                    {activeScanSample === 'drink' && (
                                        <>
                                            <path d="M 0 36 Q 60 36, 100 8 T 200 36 L 300 36 L 300 48 L 0 48 Z" fill="url(#curveGradient)" />
                                            <path d="M 0 36 Q 60 36, 100 8 T 200 36 L 300 36" fill="none" stroke={current.curveColor} strokeWidth="2.2" strokeLinecap="round" />
                                            <circle cx="100" cy="8" r="3.5" fill={current.curveColor} />
                                        </>
                                    )}
                                    {activeScanSample === 'food' && (
                                        <>
                                            <path d="M 0 36 Q 80 36, 140 16 T 250 36 L 300 36 L 300 48 L 0 48 Z" fill="url(#curveGradient)" />
                                            <path d="M 0 36 Q 80 36, 140 16 T 250 36 L 300 36" fill="none" stroke={current.curveColor} strokeWidth="2.2" strokeLinecap="round" />
                                            <circle cx="140" cy="16" r="3.5" fill={current.curveColor} />
                                        </>
                                    )}
                                    {activeScanSample === 'medicine' && (
                                        <>
                                            <path d="M 0 36 Q 90 34, 150 24 T 300 34 L 300 48 L 0 48 Z" fill="url(#curveGradient)" />
                                            <path d="M 0 36 Q 90 34, 150 24 T 300 34" fill="none" stroke={current.curveColor} strokeWidth="2.2" strokeLinecap="round" />
                                            <circle cx="150" cy="24" r="3.5" fill={current.curveColor} />
                                        </>
                                    )}
                                </svg>
                            </div>
                            <div className="flex justify-between text-[10px] text-[#71827e] font-sans">
                                <span>Saat Makan</span>
                                <span>Zona Normal Terkendali (70–120 mg/dL)</span>
                                <span>2 Jam Pasca Makan</span>
                            </div>
                        </div>

                        {/* 3 Metrics in Soft Porcelain Cards */}
                        <div className="grid grid-cols-3 gap-2">
                            {current.metrics.map((m, idx) => (
                                <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#e8f0ec] text-center">
                                    <span className="text-[10px] text-[#697c76] block truncate">
                                        {m.label}
                                    </span>
                                    <span className="font-serif text-sm font-medium text-[#182926] block mt-0.5">
                                        {m.value}
                                    </span>
                                    <span className="text-[10px] text-[#7d8f89] block mt-0.5">
                                        {m.note}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Observation from Doctor */}
                        <div className="p-3.5 bg-white rounded-xl border border-[#e8f0ec] space-y-1.5 text-xs">
                            <span className="text-[10px] text-[#5e716c] uppercase tracking-wider font-medium block">
                                Catatan Klinis Edukasi:
                            </span>
                            <p className="text-[#3c4f4a] leading-relaxed text-[11px]">
                                {current.clinicalObservation}
                            </p>
                            <div className="pt-1.5 border-t border-[#edf4f0] flex items-center justify-between text-[10px] text-[#637671]">
                                <span className="font-serif text-xs text-[#1c6454] font-medium">{current.physician}</span>
                                <span>{current.physicianRole}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Link */}
                    <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#637671]">
                        <span>Mendukung kamera smartphone, deteksi barcode &amp; tabel gizi BPOM</span>
                        <Link
                            href="/member/scanner"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container transition-all active:scale-95"
                        >
                            <span>Buka Kamera Sekarang</span>
                            <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
