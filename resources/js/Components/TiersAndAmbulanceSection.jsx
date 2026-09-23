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
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto" id="tiers">
            <div className="space-y-16">
                {/* 1. Membership Tiers Section */}
                <div className="space-y-10">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch pt-2">
                        {tiers.map((t, idx) => (
                            <div
                                key={idx}
                                className={`p-5 sm:p-6 lg:p-7 rounded-3xl border flex flex-col justify-between space-y-6 transition-all ${
                                    t.isPopular
                                        ? 'bg-[#f0f7f3] border-2 border-[#1c6454] shadow-[0_8px_30px_rgba(0,67,62,0.06)] relative -translate-y-1 sm:-translate-y-2'
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
                                                <span className="text-[#1c6454] font-serif leading-none shrink-0 mt-0.5">
                                                    ✓
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
                                        <span className="text-xs">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Emergency Response 119 - Dignified Medical Triage (Calm Warm Terracotta / Sandstone) */}
                <div className="p-5 sm:p-7 lg:p-9 bg-[#faf6f4] rounded-3xl border border-[#eadcd6] relative overflow-hidden" id="ambulance">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3.5">
                            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-[#8f4a3c] uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-[#9c5243]"></span>
                                <span>Akses Siaga Darurat 24 Jam • Integrasi Call Center 119</span>
                            </div>
                            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#271d1b]">
                                Panggilan darurat ambulan berbasis koordinat GPS.
                            </h3>
                            <p className="text-xs sm:text-sm leading-relaxed max-w-xl text-[#60504c]">
                                Saat terjadi penurunan glukosa drastis (hipoglikemia), nyeri dada mendadak, atau keluhan akut di rumah, sistem mendeteksi titik koordinat Anda untuk mempercepat penjemputan ambulan faskes terdekat tanpa kendala birokrasi.
                            </p>

                            {/* Medical Emergency Passport Chips */}
                            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#ebdcd6] text-[#4d3d39]">
                                    Paspor Medis Siaga Terhubung
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#ebdcd6] text-[#4d3d39]">
                                    Faskes Rujukan Terdekat (~1.4 km)
                                </span>
                                {coords && (
                                    <span className="px-3 py-1 rounded-full bg-[#edf5f0] border border-[#d4e8dd] text-[#1c6454] font-mono">
                                        GPS Terkunci: {coords.lat}, {coords.lng}
                                    </span>
                                )}
                            </div>

                            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCallAmbulance}
                                    disabled={ambulanceCalling}
                                    className="min-h-12 px-7 py-3.5 rounded-full bg-[#964a3b] text-white text-xs font-medium hover:bg-[#803d2f] transition-all active:scale-95 shadow-[0_2px_12px_rgba(150,74,59,0.18)] cursor-pointer flex items-center justify-center text-center"
                                >
                                    <span>{ambulanceCalling ? 'Memverifikasi Koordinat...' : 'Hubungi Ambulan Siaga 119'}</span>
                                </button>
                                <span className="text-[11px] text-[#7d6c68]">
                                    Terhubung ke Posko Siaga Darurat Kemenkes RI
                                </span>
                            </div>
                        </div>

                        {/* Right: Real Emergency Care & Ambulance Team Visual */}
                        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#e2d2ca] shadow-md group">
                            <div className="h-52 sm:h-60 w-full overflow-hidden">
                                <img
                                    src="/image/emergency_ambulance_119.jpg"
                                    alt="Tim Paramedis dan Ambulan Siaga 119"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-white/95">Unit Medis Reaksi Cepat</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-mono">
                                        SIAGA 24/7
                                    </span>
                                </div>
                                <span className="text-[11px] text-white/80 mt-0.5">
                                    Terhubung jejaring IGD rumah sakit rujukan terdekat
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

