import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function TiersAndAmbulanceSection() {
    const { membership } = usePage().props || {};
    const [ambulanceCalling, setAmbulanceCalling] = useState(false);
    const [coords, setCoords] = useState(null);

    const rawTiers = membership?.active_tiers && membership.active_tiers.length > 0 ? membership.active_tiers : [];

    const fallbackTiers = [
        {
            name: 'Gratis (Basic)',
            tag: 'Akses Esensial',
            tagStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            priceMonthly: 'Gratis',
            period: 'selamanya',
            adminFee: 0,
            desc: 'Akses gratis seumur hidup dengan pemantauan baseline dasar dan tombol darurat 119.',
            features: [
                { text: 'Pemindai Kamera Makanan & Obat BPOM (10x / hari)', included: true },
                { text: 'Deteksi Beban Glikemik & Gramatur Gula Instan (<0.4s)', included: true },
                { text: 'Buku Harian Glukosa Darah & Log HBE Harian', included: true },
                { text: 'Asisten AI Terverifikasi Medis 24/7 (Edukasi Dasar)', included: true },
                { text: 'Akses Siaga Panggilan Darurat Ambulans 119', included: true },
                { text: 'Akses Komunitas & Forum Diskusi Pasien Publik', included: true },
                { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', included: false },
                { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', included: false },
                { text: 'Sesi Telekonsultasi Instruktur Gizi Klinis per Bulan', included: false },
                { text: 'Jalur Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: false },
                { text: 'Analisis Hasil Lab Darah (HbA1c & Profil Lipid)', included: false },
                { text: 'Dedicated Personal Health Coach 24/7', included: false },
            ],
            cta: 'Mulai Gratis (Basic)',
            isPopular: false,
        },
        {
            name: 'Gold Preventif',
            tag: 'Paling Direkomendasikan',
            tagStyle: 'bg-primary text-white border-transparent',
            priceMonthly: 'Rp 53.000',
            period: '/ bulan',
            adminFee: 4000,
            desc: 'Untuk individu proaktif yang ingin mendeteksi deviasi metabolik dan tidur sejak dini.',
            features: [
                { text: 'Semua kapabilitas dalam paket Gratis & Dasar', included: true, highlight: true },
                { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', included: true },
                { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', included: true },
                { text: 'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)', included: true },
                { text: '2x Sesi Telekonsultasi Instruktur Gizi per Bulan', included: true },
                { text: 'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)', included: true },
                { text: 'Akses Penuh Seluruh Modul Gamifikasi & Resep Rendah Gula', included: true },
                { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: false },
                { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', included: false },
                { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', included: false },
                { text: 'Dedicated Personal Health Coach & Review Mingguan', included: false },
                { text: 'Hotline Tim Medis Siaga Prioritas 24/7', included: false },
            ],
            cta: 'Pilih Paket Gold Preventif',
            isPopular: true,
        },
        {
            name: 'Platinum Concierge',
            tag: 'Pendampingan VIP',
            tagStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
            priceMonthly: 'Rp 153.000',
            period: '/ bulan',
            adminFee: 4000,
            desc: 'Pendampingan holistik dengan bimbingan langsung instruktur dan dokter preventif.',
            features: [
                { text: 'Semua kapabilitas dalam paket Gold & Gratis', included: true, highlight: true },
                { text: 'Pemindai Kamera OCR & Obat BPOM Bebas Batas (Unlimited)', included: true },
                { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: true },
                { text: '6x Sesi Telekonsultasi Dokter Spesialis per Bulan', included: true },
                { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', included: true },
                { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', included: true },
                { text: 'Dedicated Personal Health Coach & Review Mingguan', included: true },
                { text: 'Hotline Tim Medis Siaga Prioritas 24/7', included: true },
                { text: 'Jalur Koordinasi Ambulans dengan Riwayat Klinis Instan', included: true },
                { text: 'Rencana Intervensi Gizi & Menu Presisi Personal Khusus', included: true },
                { text: 'Program Tantangan Remisi Intensif Klinis Terpandu', included: true },
                { text: 'Akses Jalur Cepat Tindakan Klinis & Integrasi SatuSehat', included: true },
            ],
            cta: 'Pilih Paket Platinum Concierge',
            isPopular: false,
        },
    ];

    const tiers = rawTiers.length > 0
        ? rawTiers.map((t) => {
            const basePrice = Number(t.price || 0);
            const fee = Number(t.calculated_admin_fee ?? t.admin_fee ?? 0);
            const total = Number(t.total_price || (basePrice + fee));
            const isPopular = Boolean(t.is_popular) || t.slug === 'gold' || t.name?.toLowerCase().includes('gold');
            const isPlatinum = !isPopular && (t.slug === 'platinum' || t.name?.toLowerCase().includes('platinum') || basePrice >= 140000);

            let tagStyle = 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd] font-medium';
            if (isPopular) {
                tagStyle = 'bg-primary text-white border-transparent font-bold shadow-xs';
            } else if (isPlatinum) {
                tagStyle = 'bg-[#fbf7f0] text-[#785b34] border-[#ebdcc4] font-semibold';
            }

            const defaultFeatures = (t.slug === 'gold' || t.name?.toLowerCase().includes('gold'))
                ? [
                    { text: 'Semua kapabilitas dalam paket Gratis & Dasar', included: true, highlight: true },
                    { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', included: true },
                    { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', included: true },
                    { text: 'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)', included: true },
                    { text: '2x Sesi Telekonsultasi Instruktur Gizi per Bulan', included: true },
                    { text: 'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)', included: true },
                    { text: 'Akses Penuh Seluruh Modul Gamifikasi & Resep Rendah Gula', included: true },
                    { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: false },
                    { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', included: false },
                    { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', included: false },
                    { text: 'Dedicated Personal Health Coach & Review Mingguan', included: false },
                    { text: 'Hotline Tim Medis Siaga Prioritas 24/7', included: false },
                ]
                : isPlatinum
                ? [
                    { text: 'Semua kapabilitas dalam paket Gold & Gratis', included: true, highlight: true },
                    { text: 'Pemindai Kamera OCR & Obat BPOM Bebas Batas (Unlimited)', included: true },
                    { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: true },
                    { text: '6x Sesi Telekonsultasi Dokter Spesialis per Bulan', included: true },
                    { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', included: true },
                    { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', included: true },
                    { text: 'Dedicated Personal Health Coach & Review Mingguan', included: true },
                    { text: 'Hotline Tim Medis Siaga Prioritas 24/7', included: true },
                    { text: 'Jalur Koordinasi Ambulans dengan Riwayat Klinis Instan', included: true },
                    { text: 'Rencana Intervensi Gizi & Menu Presisi Personal Khusus', included: true },
                    { text: 'Program Tantangan Remisi Intensif Klinis Terpandu', included: true },
                    { text: 'Akses Jalur Cepat Tindakan Klinis & Integrasi SatuSehat', included: true },
                ]
                : [
                    { text: 'Pemindai Kamera Makanan & Obat BPOM (10x / hari)', included: true },
                    { text: 'Deteksi Beban Glikemik & Gramatur Gula Instan (<0.4s)', included: true },
                    { text: 'Buku Harian Glukosa Darah & Log HBE Harian', included: true },
                    { text: 'Asisten AI Terverifikasi Medis 24/7 (Edukasi Dasar)', included: true },
                    { text: 'Akses Siaga Panggilan Darurat Ambulans 119', included: true },
                    { text: 'Akses Komunitas & Forum Diskusi Pasien Publik', included: true },
                    { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', included: false },
                    { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', included: false },
                    { text: 'Sesi Telekonsultasi Instruktur Gizi Klinis per Bulan', included: false },
                    { text: 'Jalur Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: false },
                    { text: 'Analisis Hasil Lab Darah (HbA1c & Profil Lipid)', included: false },
                    { text: 'Dedicated Personal Health Coach 24/7', included: false },
                ];

            return {
                name: t.name,
                tag: t.badge_text || (isPopular ? 'Paling Direkomendasikan' : (isPlatinum ? 'Pendampingan Spesialis VIP' : 'Akses Esensial Mandiri')),
                tagStyle,
                priceMonthly: total === 0 ? 'Gratis' : `Rp ${total.toLocaleString('id-ID')}`,
                adminFee: fee,
                period: total === 0 ? 'selamanya' : '/ bulan',
                desc: t.description || 'Layanan preventif metabolik komprehensif.',
                features: Array.isArray(t.features) && t.features.length > 0
                    ? t.features
                    : defaultFeatures,
                cta: total === 0 ? 'Mulai Gratis' : (isPopular ? 'Pilih Paket Gold' : (isPlatinum ? 'Pilih Paket Platinum' : `Pilih ${t.name}`)),
                isPopular,
                isPlatinum,
            };
        })
        : fallbackTiers;

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
                        <span className="text-[10px] sm:text-[11px] text-primary font-medium tracking-wide uppercase block">
                            Pilihan Keanggotaan Transparan
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#142320]">
                            Investasi terukur untuk metabolisme jangka panjang.
                        </h2>
                        <p className="text-[11px] sm:text-sm text-[#546661] max-w-lg mx-auto leading-relaxed">
                            Mulai tanpa biaya untuk pemantauan mandiri, atau pilih bimbingan klinis terpadu bersama tim dokter spesialis kami.
                        </p>
                    </div>

                    {/* Tier Cards Grid */}
                    <div className={`grid grid-cols-1 ${tiers.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 items-stretch pt-3`}>
                        {tiers.map((t, idx) => (
                            <div
                                key={idx}
                                className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all duration-300 relative ${
                                    t.isPopular
                                        ? 'bg-linear-to-b from-[#f2f9f5] via-white to-[#eaf5ef]/70 border-2 border-primary shadow-[0_16px_45px_rgba(0,67,62,0.18)] ring-4 ring-primary/10 relative -translate-y-1.5 sm:-translate-y-2.5 z-10 scale-[1.02]'
                                        : t.isPlatinum
                                        ? 'bg-linear-to-b from-white via-[#fcfbfa] to-[#faf5ee]/60 border border-[#e2d8c9] shadow-md hover:shadow-lg hover:border-[#c8b79e]'
                                        : 'bg-white/95 border-[#d8e6df] shadow-xs hover:border-[#b4cfc1]'
                                }`}
                            >
                                {/* Floating Top Ribbon */}
                                {t.isPopular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="material-symbols-outlined text-[13px] text-amber-300">star</span>
                                        <span>Rekomendasi Utama</span>
                                    </div>
                                )}
                                {t.isPlatinum && !t.isPopular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#3d2e1b] text-[#ebdcc4] text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1 whitespace-nowrap border border-[#ebdcc4]/40">
                                        <span className="material-symbols-outlined text-[12px] text-amber-300">workspace_premium</span>
                                        <span>Tingkat Tertinggi VIP</span>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className={`font-serif text-xl sm:text-2xl text-[#142320] truncate ${t.isPopular ? 'font-bold' : 'font-normal'}`}>
                                            {t.name}
                                        </h3>
                                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 ${t.tagStyle}`}>
                                            {t.tag}
                                        </span>
                                    </div>

                                    {/* Price Box */}
                                    <div className={`py-2.5 border-y space-y-1.5 ${t.isPopular ? 'border-primary/20 bg-primary/5 -mx-6 px-6 sm:-mx-7 sm:px-7' : 'border-[#edf4f0]'}`}>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className={`font-serif text-3xl font-normal ${t.isPopular ? 'text-primary font-bold text-3xl sm:text-4xl' : t.isPlatinum ? 'text-[#20322d]' : 'text-[#182926]'}`}>
                                                {t.priceMonthly}
                                            </span>
                                            <span className="text-xs text-[#637671] font-medium">
                                                {t.period}
                                            </span>
                                        </div>
                                        {t.adminFee > 0 ? (
                                            <span className="text-[10px] text-teal-800 font-medium block mt-0.5">
                                                Sudah termasuk Biaya Admin (+Rp {t.adminFee.toLocaleString('id-ID')})
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-[#4d6b60] flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[13px] text-emerald-700">lock_open</span>
                                                <span>Akses tanpa biaya seumur hidup</span>
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-[#52645f] leading-relaxed min-h-10">
                                        {t.desc}
                                    </p>

                                    {/* Features List with Calm Line Markers */}
                                    <div className="space-y-2 pt-2 border-t border-surface-container-high">
                                        <span className="text-[10px] font-semibold text-[#536762] uppercase tracking-wider block">
                                            Kapabilitas Layanan:
                                        </span>
                                        <ul className="space-y-2 text-xs text-[#354843]">
                                            {t.features.map((f, fIdx) => {
                                                const text = typeof f === 'object' ? f.text : f;
                                                const isIncluded = typeof f === 'object' ? f.included !== false : true;
                                                const isHighlight = typeof f === 'object' ? Boolean(f.highlight) : false;

                                                return (
                                                    <li
                                                        key={fIdx}
                                                        className={`flex items-start gap-2.5 ${
                                                            isIncluded
                                                                ? 'text-[#20342e]'
                                                                : 'text-[#8b9e97]'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                                                                isIncluded
                                                                    ? t.isPopular
                                                                        ? 'text-primary font-bold'
                                                                        : t.isPlatinum
                                                                        ? 'text-emerald-800'
                                                                        : 'text-emerald-700'
                                                                    : 'text-[#9ab1a7]'
                                                            }`}
                                                        >
                                                            {isIncluded ? 'check_circle' : 'close'}
                                                        </span>
                                                        <span className={`${!isIncluded ? 'line-through decoration-[#9cb0a8]' : ''} ${isIncluded && isHighlight ? 'font-bold text-[#006057]' : ''}`}>
                                                            {text}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        href="/paket"
                                        className={`w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs text-center cursor-pointer ${
                                            t.isPopular
                                                ? 'bg-primary text-white hover:bg-primary-container shadow-[0_6px_20px_rgba(0,67,62,0.28)] font-bold'
                                                : t.isPlatinum
                                                ? 'bg-[#162723] text-white hover:bg-[#253e38] shadow-sm font-semibold'
                                                : 'bg-white text-primary border border-[#cbe0d5] hover:bg-[#edf5f0]'
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
                <div className="p-5 sm:p-7 lg:p-8 bg-white/95 rounded-3xl border border-surface-container-high shadow-[0_8px_32px_rgba(0,40,36,0.04)] relative overflow-hidden backdrop-blur-xs" id="ambulance">
                    {/* Ambient subtle glow */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                            <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-normal text-[#142320] leading-tight">
                                Panggilan darurat ambulan berbasis koordinat GPS faskes.
                            </h3>

                            <p className="text-[11px] sm:text-sm leading-relaxed max-w-xl text-[#52645f]">
                                Transmisi koordinat otomatis mempercepat kedatangan armada ambulan faskes terdekat saat terjadi kondisi medis darurat di rumah.
                            </p>

                            {/* Medical Telemetry & Readiness Cards */}
                            <div className="pt-0.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#edf5f0]/80 border border-[#cfe1d7] flex items-center gap-2.5 text-[#1c6454]">
                                    <div className="w-8 h-8 rounded-xl bg-white text-[#1c6454] flex items-center justify-center shrink-0 shadow-2xs">
                                        <span className="material-symbols-outlined text-[17px]">location_on</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="font-bold block text-xs">Telemetri GPS Terkunci</span>
                                        <span className="text-[10px] text-[#4d665f] block truncate">
                                            {coords ? `Lat: ${coords.lat}, Lng: ${coords.lng}` : 'Siaga otomatis saat tombol ditekan'}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#f8faf9] border border-surface-container-high flex items-center gap-2.5 text-[#2c3f3a]">
                                    <div className="w-8 h-8 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 border border-surface-container shadow-2xs">
                                        <span className="material-symbols-outlined text-[17px]">local_hospital</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className="font-bold block text-xs">Faskes &amp; IGD Terdekat</span>
                                        <span className="text-[10px] text-[#697d76] block truncate">
                                            Jejaring RS Rujukan (~1.4 km)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Call Action Buttons */}
                            <div className="pt-1.5 flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleCallAmbulance}
                                    disabled={ambulanceCalling}
                                    className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-[0_4px_18px_rgba(225,29,72,0.28)] hover:shadow-[0_6px_22px_rgba(225,29,72,0.36)] cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        call
                                    </span>
                                    <span>{ambulanceCalling ? 'Memverifikasi Koordinat...' : 'Hubungi Ambulan Siaga 119'}</span>
                                </button>
                                <Link
                                    href="/demo/emergency"
                                    className="h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-white border border-[#ebdcd6] text-[#4d3d39] hover:text-[#182926] text-xs sm:text-sm font-bold hover:bg-[#faf6f4] hover:border-[#dfceca] transition-all active:scale-95 text-center flex items-center justify-center gap-1.5 shadow-2xs"
                                >
                                    <span className="material-symbols-outlined text-[17px] text-rose-600">emergency</span>
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

                            {/* Bottom Glassmorphic Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/85 via-black/50 to-transparent backdrop-blur-[2px] text-white">
                                <span className="font-semibold text-xs sm:text-sm text-white block">
                                    Unit Reaksi Cepat 119
                                </span>
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

