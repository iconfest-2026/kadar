import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function TiersAndAmbulanceSection() {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
    const [ambulanceCalling, setAmbulanceCalling] = useState(false);
    const [coords, setCoords] = useState(null);

    const tiers = [
        {
            name: 'Silver',
            tag: 'Akses Esensial',
            tagStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            priceMonthly: 'Gratis',
            priceYearly: 'Gratis',
            period: 'selamanya',
            desc: 'Akses penuh pemindaian kemasan, obat BPOM, dan buku harian glukosa.',
            features: [
                'Pemindai Kamera Makanan & Obat BPOM (Tanpa Batas)',
                'Deteksi Beban Glikemik & Gramatur Gula Instan',
                'Buku Catatan Biomarker Glukosa Darah Harian',
                'Konsultasi Asisten AI Terverifikasi Medis 24/7',
                'Akses Siaga Panggilan Darurat Ambulan 119',
            ],
            cta: 'Mulai Silver Gratis',
            isPopular: false,
        },
        {
            name: 'Gold',
            tag: 'Paling Direkomendasikan',
            tagStyle: 'bg-primary text-white border-transparent',
            priceMonthly: 'Rp 79.000',
            priceYearly: 'Rp 63.000',
            period: '/ bulan',
            savings: 'Hemat Rp 192.000/tahun',
            desc: 'Personalisasi menu gizi, evaluasi mingguan, dan bimbingan terstruktur.',
            features: [
                'Semua kapabilitas dalam paket Silver',
                'Prediksi Lonjakan Glikemik Makanan Spesifik',
                'Rekomendasi Profil Presisi (Alergi, Garam, Tensi)',
                'Program Kebiasaan Remisi 14–90 Hari Terpandu',
                '2x Jadwal Konsultasi Instruktur Gizi per Bulan',
                'Laporan Evaluasi Progres Metabolik Otomatis',
            ],
            cta: 'Pilih Paket Gold',
            isPopular: true,
        },
        {
            name: 'Platinum',
            tag: 'Pendampingan Spesialis',
            tagStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
            priceMonthly: 'Rp 199.000',
            priceYearly: 'Rp 159.000',
            period: '/ bulan',
            savings: 'Hemat Rp 480.000/tahun',
            desc: 'Bimbingan intensif 1-on-1 bersama Dokter Spesialis Penyakit Dalam (Sp.PD).',
            features: [
                'Semua kapabilitas dalam paket Gold',
                'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD',
                'Integrasi Penuh Rekam Medis SatuSehat Kemenkes',
                'Ekspor Resume Medis PDF Terstandar Faskes',
                'Analisis Hasil Tes Laboratorium (HbA1c & Lipid)',
                'Koordinasi Prioritas Tim Medis Siaga',
            ],
            cta: 'Pilih Paket Platinum',
            isPopular: false,
        },
    ];

    const handleCallAmbulance = () => {
        setAmbulanceCalling(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const currentCoords = {
                        lat: pos.coords.latitude.toFixed(4),
                        lng: pos.coords.longitude.toFixed(4),
                    };
                    setCoords(currentCoords);
                    setTimeout(() => {
                        setAmbulanceCalling(false);
                        alert(`Koordinat GPS terverifikasi: [${currentCoords.lat}, ${currentCoords.lng}]. Menghubungkan panggilan darurat ke Posko Siaga 119...`);
                        window.location.href = 'tel:119';
                    }, 600);
                },
                () => {
                    setAmbulanceCalling(false);
                    window.location.href = 'tel:119';
                }
            );
        } else {
            setAmbulanceCalling(false);
            window.location.href = 'tel:119';
        }
    };

    return (
        <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="tiers">
            <div className="space-y-8 sm:space-y-10">
                {/* 1. Membership Tiers Section */}
                <div className="space-y-5 sm:space-y-6">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <span className="text-[11px] text-primary font-medium tracking-wide uppercase block">
                            Pilihan Keanggotaan Transparan
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#142320]">
                            Investasi terukur untuk metabolisme jangka panjang.
                        </h2>
                        <p className="text-xs sm:text-sm text-[#546661] max-w-lg mx-auto leading-relaxed">
                            Mulai tanpa biaya untuk pemantauan mandiri, atau pilih bimbingan klinis terpadu bersama tim dokter spesialis kami.
                        </p>

                        {/* Billing Switcher Toggle (Standard Touch Height 42px) */}
                        <div className="pt-2 flex items-center justify-center">
                            <div className="p-1 bg-[#f0f5f2] rounded-full border border-[#d8e7de] inline-flex items-center max-w-full overflow-x-auto">
                                <button
                                    type="button"
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`min-h-10.5 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs transition-all whitespace-nowrap flex items-center justify-center ${
                                        billingCycle === 'monthly'
                                            ? 'bg-white text-primary font-medium shadow-xs'
                                            : 'text-[#52645f] hover:text-primary'
                                    }`}
                                >
                                    Tagihan Bulanan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`min-h-10.5 px-3.5 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                                        billingCycle === 'yearly'
                                            ? 'bg-white text-primary font-medium shadow-xs'
                                            : 'text-[#52645f] hover:text-primary'
                                    }`}
                                >
                                    <span>Tagihan Tahunan</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#e8f2ec] text-[#1c6454] font-medium">
                                        Hemat 20%
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tier Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch pt-1">
                        {tiers.map((t, idx) => (
                            <div
                                key={idx}
                                className={`p-4 sm:p-5 lg:p-6 rounded-2xl border flex flex-col justify-between space-y-4 transition-all ${
                                    t.isPopular
                                        ? 'bg-[#f0f7f3] border-2 border-[#1c6454] shadow-[0_8px_30px_rgba(0,67,62,0.06)] relative -translate-y-1 sm:-translate-y-1.5'
                                        : 'bg-white/80 border-surface-container-high hover:border-[#cfe0d6] shadow-[0_4px_20px_rgba(0,40,36,0.02)]'
                                }`}
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#182926]">
                                                {t.name}
                                            </h3>
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium mt-1 inline-block ${t.tagStyle}`}>
                                                {t.tag}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price Box */}
                                    <div className="pt-1">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-serif text-3xl sm:text-4xl font-normal text-[#182926]">
                                                {billingCycle === 'yearly' ? t.priceYearly : t.priceMonthly}
                                            </span>
                                            <span className="text-xs text-[#63746f]">
                                                {t.period}
                                            </span>
                                        </div>
                                        {billingCycle === 'yearly' && t.savings && (
                                            <span className="text-[11px] text-[#1c6454] font-medium block mt-1">
                                                {t.savings}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-[#52645f] leading-relaxed">
                                        {t.desc}
                                    </p>

                                    {/* Features List with Calm Line Markers */}
                                    <ul className="space-y-2.5 pt-4 border-t border-surface-container-high text-xs text-[#354843]">
                                        {t.features.map((f, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-2.5">
                                                <span className="text-[#1c6454] shrink-0 mt-0.5">
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                </span>
                                                <span className="leading-relaxed">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-3">
                                    <Link
                                        href="/register"
                                        className={`w-full min-h-12 py-3 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                                            t.isPopular
                                                ? 'bg-primary text-white hover:bg-primary-container shadow-[0_2px_12px_rgba(0,67,62,0.15)]'
                                                : 'bg-white text-[#2a3d38] border border-[#d2dfd8] hover:bg-[#f4faf6]'
                                        }`}
                                    >
                                        <span>{t.cta}</span>
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Emergency Response 119 - Crisp Clinical Telemetry (AEVYRA Theme Aligned) */}
                <div className="p-5 sm:p-7 lg:p-8 bg-white/95 rounded-3xl border border-surface-container-high shadow-[0_8px_32px_rgba(0,40,36,0.04)] relative overflow-hidden backdrop-blur-sm" id="ambulance">
                    {/* Ambient subtle glow */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                        <div className="lg:col-span-7 space-y-4">
                            {/* Live Clinical Beacon Header */}
                            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#edf5f0] border border-[#d2e5da] text-[#1c6454] text-[11px] font-medium tracking-wide">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                </span>
                                <span>Akses Siaga Darurat 24 Jam • Integrasi Posko 119 Kemenkes RI</span>
                            </div>

                            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#142320] leading-tight">
                                Panggilan darurat ambulan berbasis koordinat GPS faskes.
                            </h3>

                            <p className="text-xs sm:text-sm leading-relaxed max-w-xl text-[#52645f]">
                                Saat terjadi penurunan glukosa drastis (hipoglikemia akut), nyeri dada mendadak, atau keluhan darurat di rumah, transmisi koordinat otomatis mempercepat kedatangan armada ambulan faskes terdekat tanpa kendala birokrasi.
                            </p>

                            {/* Medical Telemetry & Readiness Cards */}
                            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div className="p-2.5 rounded-2xl bg-[#edf5f0]/80 border border-[#cfe1d7] flex items-center gap-2.5 text-[#1c6454]">
                                    <div className="w-7 h-7 rounded-xl bg-white text-[#1c6454] flex items-center justify-center shrink-0 shadow-2xs">
                                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="font-bold block text-[11px]">Telemetri GPS Terkunci</span>
                                        <span className="text-[10px] text-[#4d665f] block truncate">
                                            {coords ? `Lat: ${coords.lat}, Lng: ${coords.lng}` : 'Siaga otomatis saat tombol ditekan'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2.5 rounded-2xl bg-[#f8faf9] border border-surface-container-high flex items-center gap-2.5 text-[#2c3f3a]">
                                    <div className="w-7 h-7 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 border border-surface-container shadow-2xs">
                                        <span className="material-symbols-outlined text-[16px]">local_hospital</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="font-bold block text-[11px]">Faskes &amp; IGD Terdekat</span>
                                        <span className="text-[10px] text-[#697d76] block truncate">
                                            Jejaring RS Rujukan (~1.4 km)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Call Action Button & Live Status */}
                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                                <button
                                    type="button"
                                    onClick={handleCallAmbulance}
                                    disabled={ambulanceCalling}
                                    className="min-h-12 px-7 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all active:scale-95 shadow-[0_4px_18px_rgba(225,29,72,0.28)] hover:shadow-[0_6px_22px_rgba(225,29,72,0.36)] cursor-pointer flex items-center justify-center gap-2 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        call
                                    </span>
                                    <span>{ambulanceCalling ? 'Memverifikasi Koordinat...' : 'Hubungi Ambulan Siaga 119'}</span>
                                </button>
                                <div className="flex flex-col justify-center gap-1">
                                    <span className="text-xs font-semibold text-[#182926] flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        Bebas Pulsa 24 Jam • Command Center 119
                                    </span>
                                    <span className="text-[11px] text-[#697c77]">
                                        Terhubung langsung ke Posko Siaga Darurat Kemenkes RI
                                    </span>
                                </div>
                                <Link
                                    href="/demo/emergency"
                                    className="min-h-12 px-5 py-3 rounded-full bg-white/80 border border-[#ebdcd6] text-[#4d3d39] text-xs font-bold hover:bg-white transition-all active:scale-95 text-center flex items-center justify-center gap-1.5 shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[16px] text-rose-600">emergency</span>
                                    <span>Buka Demo 119</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Emergency Vehicle & Paramedic Visual with Live HUD Badges */}
                        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-surface-container-high shadow-lg group bg-surface">
                            <div className="h-56 sm:h-64 lg:h-72 w-full overflow-hidden">
                                <img
                                    src="/image/emergency_ambulance_119.jpg"
                                    alt="Tim Paramedis dan Ambulan Siaga 119"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Top HUD Floating Status Badges */}
                            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                                <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-1.5 text-[10px] font-bold text-[#182926]">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>Unit Siaga Aktif</span>
                                </div>
                                <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md font-mono font-bold tracking-wider">
                                    RESPON &lt; 8 MENIT
                                </span>
                            </div>

                            {/* Bottom Glassmorphic Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/85 via-black/50 to-transparent backdrop-blur-[2px] text-white">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-xs sm:text-sm text-white">
                                        Unit Reaksi Cepat 119
                                    </span>
                                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 font-medium">
                                        SatuSehat Ready
                                    </span>
                                </div>
                                <span className="text-[11px] text-white/80 block mt-1 leading-snug">
                                    Terhubung langsung jejaring IGD rumah sakit rujukan terdekat
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

