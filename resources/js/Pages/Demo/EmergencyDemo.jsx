import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function EmergencyDemo() {
    const [sosTriggered, setSosTriggered] = useState(false);
    const [selectedFaskes, setSelectedFaskes] = useState(1);

    const faskesList = [
        {
            id: 1,
            name: 'RSUPN Dr. Cipto Mangunkusumo (RSCM)',
            type: 'Rumah Sakit Rujukan Nasional (IGD 24 Jam)',
            distance: '2.4 km',
            eta: '7 Menit',
            phone: '119 / (021) 1500-135',
            ambulanceReady: true,
            address: 'Jl. Diponegoro No. 71, Jakarta Pusat',
        },
        {
            id: 2,
            name: 'RS Jantung & Pembuluh Darah Harapan Kita',
            type: 'Pusat Rujukan Kardiovaskular (IGD 24 Jam)',
            distance: '4.8 km',
            eta: '12 Menit',
            phone: '119 / (021) 5684-093',
            ambulanceReady: true,
            address: 'Jl. Letjen S. Parman Kav. 87, Jakarta Barat',
        },
        {
            id: 3,
            name: 'RS Yarsi Cempaka Putih',
            type: 'Fasilitas Kesehatan Tingkat Lanjutan',
            distance: '3.1 km',
            eta: '9 Menit',
            phone: '119 / (021) 8061-8618',
            ambulanceReady: true,
            address: 'Jl. Letjen Suprapto Kav. 13, Jakarta Pusat',
        },
    ];

    const activeFaskes = faskesList.find((f) => f.id === selectedFaskes) || faskesList[0];

    return (
        <MarketingLayout>
            <Head title="Demo Siaga Ambulan 119 & Tanggap Darurat — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Tanggap Darurat &amp; 119</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-semibold mb-2 border border-rose-500/20">
                                <span className="material-symbols-outlined text-[16px]">emergency</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 8</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Siaga Ambulan 119 &amp; Triase Darurat
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Keamanan pasien adalah prioritas mutlak. AEVYRA mengintegrasikan pemetaan geolocation IGD faskes terdekat, armada ambulan siaga, dan protokol krisis hipoglikemia akut.
                            </p>
                        </div>

                        <Link
                            href="/member/emergency"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">emergency_share</span>
                            <span>Buka Modul Darurat Member</span>
                        </Link>
                    </div>
                </div>

                {/* 2-Column Emergency Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Interactive SOS Button & Hypoglycemia Crisis Protocol (6 Cols) */}
                    <div className="lg:col-span-6 space-y-6">
                        {/* Interactive SOS Trigger Card */}
                        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-mono font-bold">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                                <span>HOTLINE KEMENKES RI 119</span>
                            </div>

                            <h3 className="font-heading font-black text-xl text-on-surface">
                                Tombol Pemicu Krisis Darurat (SOS)
                            </h3>
                            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                Klik tombol di bawah untuk mensimulasikan aktivasi siaga ambulans dan penyiaran koordinat GPS lokasi Anda ke faskes terdekat.
                            </p>

                            <div className="py-2">
                                <button
                                    type="button"
                                    onClick={() => setSosTriggered(!sosTriggered)}
                                    className={`w-36 h-36 rounded-full mx-auto flex flex-col items-center justify-center gap-1 transition-all transform active:scale-95 shadow-xl cursor-pointer border-4 ${
                                        sosTriggered
                                            ? 'bg-rose-600 text-white border-rose-300 animate-pulse'
                                            : 'bg-linear-to-b from-rose-500 to-rose-700 text-white border-rose-200 hover:scale-105'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[40px]">emergency</span>
                                    <span className="font-heading font-black text-sm tracking-wider">
                                        {sosTriggered ? 'SIAGA AKTIF' : 'TEKAN SOS'}
                                    </span>
                                </button>
                            </div>

                            {sosTriggered && (
                                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-900 dark:text-rose-200 space-y-1 animate-in fade-in zoom-in-95">
                                    <div className="font-bold flex items-center justify-center gap-1.5">
                                        <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                                        <span>Panggilan Darurat Terkirim ke 119 &amp; Kontak Keluarga!</span>
                                    </div>
                                    <p className="text-[11px] text-rose-800 dark:text-rose-300">
                                        Ambulans dari {activeFaskes.name} dalam perjalanan. Estimasi tiba: {activeFaskes.eta}.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* First Aid: Rule of 15 for Hypoglycemia */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4">
                            <div className="flex items-center gap-2 border-b border-surface-container pb-3">
                                <span className="material-symbols-outlined text-primary text-[22px]">medical_information</span>
                                <h4 className="font-heading font-bold text-sm text-on-surface">
                                    Pertolongan Pertama Hipoglikemia Akut (Rule of 15)
                                </h4>
                            </div>

                            <div className="space-y-2.5 text-xs text-on-surface-variant">
                                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-surface-container-low border border-surface-container">
                                    <span className="w-6 h-6 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0">
                                        1
                                    </span>
                                    <p className="leading-snug">
                                        <strong className="text-on-surface">Konsumsi 15g Karbohidrat Cepat:</strong> Berikan 1/2 cangkir jus buah manis, 3 sendok teh gula pasir dilarutkan air, atau tablet glukosa.
                                    </p>
                                </div>

                                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-surface-container-low border border-surface-container">
                                    <span className="w-6 h-6 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0">
                                        2
                                    </span>
                                    <p className="leading-snug">
                                        <strong className="text-on-surface">Tunggu 15 Menit:</strong> Istirahatkan pasien dan ukur kembali kadar glukosa darah kapiler.
                                    </p>
                                </div>

                                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-surface-container-low border border-surface-container">
                                    <span className="w-6 h-6 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-xs shrink-0">
                                        3
                                    </span>
                                    <p className="leading-snug">
                                        <strong className="text-on-surface">Ulangi Jika Masih &lt; 70 mg/dL:</strong> Jika belum stabil atau pasien tidak sadar, segera rujuk ke IGD 24 Jam terdekat.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Geolocation Map & Hospital Roster (6 Cols) */}
                    <div className="lg:col-span-6 bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-6 space-y-5">
                        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-rose-600 text-[20px]">local_hospital</span>
                                <h3 className="font-heading font-bold text-base text-on-surface">
                                    Fasilitas Kesehatan &amp; IGD Terdekat
                                </h3>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                                GPS AKURAT (± 5m)
                            </span>
                        </div>

                        {/* Radar Geolocation Map Preview Simulation */}
                        <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-slate-900 border border-surface-container flex items-center justify-center">
                            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <div className="relative z-10 flex flex-col items-center justify-center space-y-2 text-center p-4">
                                <div className="relative">
                                    <span className="w-12 h-12 rounded-full bg-rose-500/30 flex items-center justify-center animate-ping absolute -inset-0"></span>
                                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center relative shadow-lg">
                                        <span className="material-symbols-outlined text-[24px]">person_pin_circle</span>
                                    </div>
                                </div>
                                <span className="text-white text-xs font-bold font-mono">
                                    Lokasi Anda: Jakarta Pusat
                                </span>
                                <span className="text-[10px] text-emerald-400 font-mono">
                                    3 Faskes IGD Aktif Dalam Radius 5 KM
                                </span>
                            </div>
                        </div>

                        {/* Hospital Selection List */}
                        <div className="space-y-2.5">
                            <span className="text-xs font-bold text-on-surface block">Pilih Rumah Sakit Rujukan:</span>
                            {faskesList.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setSelectedFaskes(f.id)}
                                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                                        selectedFaskes === f.id
                                            ? 'bg-rose-500/5 border-rose-500 shadow-2xs'
                                            : 'bg-surface-container-low border-surface-container hover:bg-surface-container-high'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-xs text-on-surface">{f.name}</h4>
                                        <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full">
                                            {f.distance} • {f.eta}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant font-sans">{f.address}</p>
                                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono pt-1">
                                        <span>Hotline: {f.phone}</span>
                                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">Ambulan Siaga</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}

