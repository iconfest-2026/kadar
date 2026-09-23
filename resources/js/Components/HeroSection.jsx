import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    const [activeScanSample, setActiveScanSample] = useState('drink'); // 'drink' | 'food' | 'medicine'

    const scanSamples = {
        drink: {
            title: 'Minuman Soda / Boba Kemasan',
            subtitle: 'Pemindaian Label Informasi Nilai Gizi',
            metrics: [
                { label: 'Kandungan Gula', value: '28 gram', status: 'warning', note: '112% batas harian' },
                { label: 'Kalori Total', value: '160 kkal', status: 'normal', note: '8% kebutuhan harian' },
                { label: 'Natrium', value: '35 mg', status: 'safe', note: 'Kategori rendah' },
            ],
            verdictBadge: '⚠️ PERINGATAN GULA TINGGI',
            verdictBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
            aiRecommendation: 'Mengandung gula tambahan melebihi rekomendasi Kemenkes (25g/hari). Disarankan batasi konsumsi untuk cegah lonjakan glukosa darah.',
        },
        food: {
            title: 'Mie Instan / Camilan Gurih',
            subtitle: 'Pemindaian Kadar Natrium & Lemak',
            metrics: [
                { label: 'Kandungan Natrium', value: '1.080 mg', status: 'warning', note: '54% batas aman harian' },
                { label: 'Lemak Jenuh', value: '6 gram', status: 'warning', note: '30% batas harian' },
                { label: 'Karbohidrat', value: '44 gram', status: 'normal', note: 'Porsi sedang' },
            ],
            verdictBadge: '⚠️ WASPADA NATRIUM TINGGI',
            verdictBg: 'bg-secondary-fixed text-on-secondary-fixed-variant',
            aiRecommendation: 'Tinggi garam (natrium). Berisiko menaikkan tekanan darah bagi penderita hipertensi atau pra-diabetes.',
        },
        medicine: {
            title: 'Obat Sakit Kepala / Paracetamol 500mg',
            subtitle: 'Pemindaian Barcode & Dosis Obat',
            metrics: [
                { label: 'Zat Aktif', value: 'Paracetamol 500mg', status: 'safe', note: 'Analgesik & Antipiretik' },
                { label: 'Status BPOM', value: 'Terdaftar Resmi', status: 'safe', note: 'No: DBL7612502204A1' },
                { label: 'Aturan Pakai', value: '1 Tab / 6-8 Jam', status: 'safe', note: 'Maks. 4.000mg/hari' },
            ],
            verdictBadge: '✅ TERVERIFIKASI BPOM RI',
            verdictBg: 'bg-primary-fixed text-on-primary-fixed-variant',
            aiRecommendation: 'Obat bebas resmi. Minum setelah makan. Hindari penggunaan berlebih bersamaan dengan obat pereda nyeri lain.',
        },
    };

    const currentSample = scanSamples[activeScanSample];

    const scrollToId = (e, id) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="w-full relative pt-space-md sm:pt-space-lg pb-space-xl px-gutter lg:px-margin" id="about">
            <div className="max-w-7xl mx-auto space-y-space-lg">
                {/* Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                    {/* Left: Punchy Promo & Headline */}
                    <div className="lg:col-span-6 space-y-space-md">
                        {/* Promo Badge */}
                        <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 bg-white/80 backdrop-blur-md text-secondary font-label-mono text-xs rounded-full border border-secondary-container/80 font-semibold shadow-xs hover:bg-white/95 transition-all">
                            <span className="material-symbols-outlined text-[15px] animate-pulse text-secondary">local_fire_department</span>
                            <span>PROMO PELUNCURAN // AKSES SCANNER &amp; CHAT AI 100% GRATIS</span>
                        </div>

                        {/* Direct Headline */}
                        <h1 className="font-display text-4xl sm:text-5xl font-normal text-primary tracking-tight leading-[1.15]">
                            Scan Makanan &amp; Obat dalam 0.4 Detik. Jaga Sehat Tanpa Ribet.
                        </h1>

                        <p className="text-body-md sm:text-body-lg text-on-surface-variant leading-relaxed">
                            Cukup arahkan kamera HP untuk mengetahui kandungan gula, natrium, alergen, dan info dosis obat seketika. Dilengkapi konsultasi chat AI, bimbingan instruktur, dan panggilan darurat ambulan 1-tap.
                        </p>

                        {/* 3 Quick Value Highlights - True Glassmorphic Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-space-xs">
                            <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_4px_20px_-2px_rgba(0,67,62,0.06)] hover:bg-white/95 hover:border-primary-fixed-dim hover:-translate-y-1 transition-all duration-300">
                                <span className="material-symbols-outlined text-primary text-[22px] mb-1 block">photo_camera</span>
                                <span className="font-headline-sm text-xs font-semibold text-primary block">Open Cam Scanner</span>
                                <p className="text-body-sm text-on-surface-variant text-[11px] mt-0.5">Analisis gula, natrium &amp; obat cepat</p>
                            </div>
                            <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_4px_20px_-2px_rgba(0,67,62,0.06)] hover:bg-white/95 hover:border-primary-fixed-dim hover:-translate-y-1 transition-all duration-300">
                                <span className="material-symbols-outlined text-primary text-[22px] mb-1 block">forum</span>
                                <span className="font-headline-sm text-xs font-semibold text-primary block">Chat AI &amp; Instruktur</span>
                                <p className="text-body-sm text-on-surface-variant text-[11px] mt-0.5">Tanya jawab cepat tanpa antre RS</p>
                            </div>
                            <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 shadow-[0_4px_20px_-2px_rgba(0,67,62,0.06)] hover:bg-white/95 hover:border-primary-fixed-dim hover:-translate-y-1 transition-all duration-300">
                                <span className="material-symbols-outlined text-primary text-[22px] mb-1 block">emergency</span>
                                <span className="font-headline-sm text-xs font-semibold text-primary block">Ambulan 1-Tap</span>
                                <p className="text-body-sm text-on-surface-variant text-[11px] mt-0.5">Panggilan darurat berbasis lokasi GPS</p>
                            </div>
                        </div>

                        {/* Dual Direct CTAs */}
                        <div className="pt-space-xs flex flex-wrap items-center gap-space-sm">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-primary text-on-primary text-body-sm font-bold hover:bg-primary-container transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg hover:shadow-primary/20"
                            >
                                Coba Scanner Gratis Sekarang &rarr;
                            </Link>
                            <a
                                href="#tiers"
                                onClick={(e) => scrollToId(e, 'tiers')}
                                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-transparent text-primary text-body-sm font-bold hover:bg-primary/5 transition-all duration-200 active:scale-95 border border-primary shadow-xs"
                            >
                                Lihat Paket Member
                            </a>
                        </div>

                        {/* Social Proof Badges */}
                        <div className="grid grid-cols-3 gap-2 pt-space-xs border-t border-primary/10">
                            <div>
                                <span className="font-data-lg text-xl font-bold text-primary block">120.000+</span>
                                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Produk BPOM</span>
                            </div>
                            <div>
                                <span className="font-data-lg text-xl font-bold text-primary block">&lt;0.4 Detik</span>
                                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Respon AI Scanner</span>
                            </div>
                            <div>
                                <span className="font-data-lg text-xl font-bold text-secondary block">100% Gratis</span>
                                <span className="font-label-mono text-[10px] text-on-surface-variant uppercase">Member Silver PWA</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Interactive Live Open Cam Scanner Simulator - Frosted Glass Container */}
                    <div className="lg:col-span-6 bg-white/80 backdrop-blur-xl p-space-md sm:p-space-lg rounded-3xl border border-white/90 shadow-2xl shadow-primary/10 hover:border-primary-fixed-dim/60 transition-all duration-300" id="scanner-demo">
                        <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                                <span className="font-label-mono text-xs font-bold text-primary uppercase tracking-wide">
                                    LIVE SIMULASI OPEN CAM SCANNER
                                </span>
                            </div>
                            <span className="font-label-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/90 text-primary font-semibold border border-primary/10 shadow-2xs">
                                AI VISION ACTIVE
                            </span>
                        </div>

                        {/* 3 Sample Selector Pills */}
                        <div className="grid grid-cols-3 gap-1.5 my-3 p-1.5 bg-primary/5 backdrop-blur-sm rounded-xl border border-primary/10">
                            <button
                                type="button"
                                onClick={() => setActiveScanSample('drink')}
                                className={`py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                                    activeScanSample === 'drink'
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                                }`}
                            >
                                🧃 Minuman
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveScanSample('food')}
                                className={`py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                                    activeScanSample === 'food'
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                                }`}
                            >
                                🍜 Makanan
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveScanSample('medicine')}
                                className={`py-2 text-xs font-semibold rounded-lg transition-all active:scale-95 ${
                                    activeScanSample === 'medicine'
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/60'
                                }`}
                            >
                                💊 Obat / Dosis
                            </button>
                        </div>

                        {/* Scanner Viewfinder Box */}
                        <div className="relative rounded-2xl bg-white/50 backdrop-blur-md p-4 border border-white/70 overflow-hidden space-y-3 shadow-inner">
                            {/* Simulated Camera Viewfinder Corner Guides */}
                            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-primary rounded-tl-sm"></div>
                            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-primary rounded-tr-sm"></div>
                            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-primary rounded-bl-sm"></div>
                            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-primary rounded-br-sm"></div>

                            {/* Header scanned info */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h4 className="font-headline-sm text-sm font-bold text-primary">
                                        {currentSample.title}
                                    </h4>
                                    <span className="text-[11px] font-label-mono text-on-surface-variant">
                                        {currentSample.subtitle}
                                    </span>
                                </div>
                                <span className={`font-label-mono text-[10px] px-2.5 py-1 rounded-full font-bold shadow-2xs ${currentSample.verdictBg}`}>
                                    {currentSample.verdictBadge}
                                </span>
                            </div>

                            {/* Nutrition / Dosis Metrics Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                {currentSample.metrics.map((m, idx) => (
                                    <div key={idx} className="p-2.5 bg-white/85 backdrop-blur-sm rounded-xl border border-white/90 text-center shadow-xs hover:border-primary-fixed-dim transition-all">
                                        <span className="font-label-mono text-[10px] text-on-surface-variant block">
                                            {m.label}
                                        </span>
                                        <span className="font-data-md text-xs font-bold text-primary block mt-0.5">
                                            {m.value}
                                        </span>
                                        <span className="text-[9px] text-on-surface-variant/80 block mt-0.5">
                                            {m.note}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* AI Clinical Verdict Note */}
                            <div className="p-3 bg-white/90 backdrop-blur-sm rounded-xl border border-white/90 text-xs text-on-surface space-y-1 shadow-xs">
                                <div className="flex items-center gap-1 font-label-mono text-[10px] text-primary font-bold">
                                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                                    <span>KESIMPULAN &amp; REKOMENDASI PRIBADI:</span>
                                </div>
                                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                    {currentSample.aiRecommendation}
                                </p>
                            </div>
                        </div>

                        {/* Scanner Action Bar */}
                        <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant font-label-mono">
                            <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[16px]">qr_code_scanner</span>
                                Mendukung Barcode, QR, &amp; Teks OCR
                            </span>
                            <Link href="/register" className="text-primary font-bold hover:underline inline-flex items-center gap-0.5">
                                <span>Buka Kamera HP</span>
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
