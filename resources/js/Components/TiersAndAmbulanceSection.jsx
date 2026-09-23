import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function TiersAndAmbulanceSection() {
    const [ambulanceCalling, setAmbulanceCalling] = useState(false);
    const [coords, setCoords] = useState(null);

    const tiers = [
        {
            name: 'Silver',
            tag: 'Tier Awal (Gratis)',
            badgeColor: 'bg-surface-container text-on-surface-variant',
            desc: 'Akses esensial untuk pemantauan mandiri harian & scanner dasar.',
            features: [
                'Open Cam Scanner Nutrisi & Obat',
                'Riwayat & Tracker Kesehatan Pribadi',
                'Chat Konsultasi AI 24/7',
                'Akses Komunitas & Forum Diskusi',
                'Badge & Gamifikasi Dasar',
            ],
            cta: 'Mulai Silver Gratis',
            isPopular: false,
        },
        {
            name: 'Gold',
            tag: 'Paling Populer',
            badgeColor: 'bg-secondary-fixed text-on-secondary-fixed-variant',
            desc: 'Personalisasi penuh dan program challenge terstruktur dengan reward.',
            features: [
                'Semua Fitur Silver',
                'Rekomendasi Profil Personal (Alergi/Glikemik)',
                'Program Challenge 14–90 Hari Terpandu',
                'Sesi Booking Instruktur Terjadwal',
                'Laporan Evaluasi Mingguan',
            ],
            cta: 'Pilih Paket Gold',
            isPopular: true,
        },
        {
            name: 'Platinum',
            tag: 'Pendampingan Penuh',
            badgeColor: 'bg-primary text-on-primary',
            desc: 'Bimbingan intensif 1-on-1 bersama instruktur dan dokter spesialis.',
            features: [
                'Semua Fitur Gold',
                'Prioritas Chat Instruktur & Tenaga Medis',
                'Sinkronisasi Otomatis Rekam Medis SatuSehat',
                'Laporan Komprehensif Ekspor PDF Lab',
                'Akses Prioritas Ambulan & Hotline Khusus',
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
                        window.location.href = 'tel:119';
                    }, 800);
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
        <section className="w-full relative py-space-xl px-gutter lg:px-margin" id="tiers">
            <div className="max-w-7xl mx-auto space-y-space-xl">
                {/* 1. Tingkatan Member Section */}
                <div className="space-y-space-md">
                    <div className="text-center max-w-xl mx-auto space-y-1">
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ FITUR 10 // TINGKATAN MEMBER ]
                        </span>
                        <h2 className="font-headline-lg text-3xl sm:text-4xl font-normal text-primary">
                            Pilihan Tingkatan Member (Freemium)
                        </h2>
                        <p className="text-body-sm text-xs text-on-surface-variant">
                            Mendorong loyalitas dan keberlanjutan pemakaian jangka panjang dengan tingkat manfaat yang jelas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm sm:gap-space-md items-stretch pt-2">
                        {tiers.map((t, idx) => (
                            <div
                                key={idx}
                                className={`p-space-md sm:p-space-lg rounded-3xl border flex flex-col justify-between space-y-space-sm transition-all duration-300 hover:shadow-xl ${
                                    t.isPopular
                                        ? 'bg-white/90 backdrop-blur-xl border-2 border-primary shadow-2xl shadow-primary/15 relative -translate-y-1 sm:-translate-y-2.5'
                                        : 'bg-white/75 backdrop-blur-md border border-white/80 hover:bg-white/95 hover:border-primary-fixed-dim/70 shadow-[0_4px_20px_-2px_rgba(0,67,62,0.06)]'
                                }`}
                            >
                                <div className="space-y-space-xs">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-headline-sm text-xl font-bold text-primary">
                                            {t.name}
                                        </h3>
                                        <span className={`font-label-mono text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-2xs ${t.badgeColor}`}>
                                            {t.tag}
                                        </span>
                                    </div>
                                    <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
                                        {t.desc}
                                    </p>

                                    <ul className="space-y-2.5 pt-3 border-t border-primary/10 text-xs text-on-surface">
                                        {t.features.map((f, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary text-[16px] shrink-0">
                                                    check_circle
                                                </span>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-3">
                                    <Link
                                        href="/register"
                                        className={`w-full py-2.5 sm:py-3 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 active:scale-95 ${
                                            t.isPopular
                                                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-md hover:shadow-lg hover:shadow-primary/20'
                                                : 'bg-white/80 backdrop-blur-sm text-primary border border-primary/20 hover:bg-white shadow-2xs'
                                        }`}
                                    >
                                        {t.cta} →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Fitur 11: Telepon Ambulan Berbasis Lokasi (Emergency Call) */}
                <div className="p-space-lg sm:p-space-xl bg-white/85 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-lg shadow-primary/5" id="emergency">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                        <div className="md:col-span-8 space-y-2">
                            <div className="inline-flex items-center gap-1.5 font-label-mono text-[11px] font-bold text-secondary uppercase">
                                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                                <span>[ FITUR 11 // TANGGAP DARURAT AMBULAN ]</span>
                            </div>
                            <h3 className="font-headline-sm text-2xl sm:text-3xl font-bold text-primary">
                                Telepon Ambulan Cepat Berbasis Koordinat GPS
                            </h3>
                            <p className="text-body-sm text-xs leading-relaxed max-w-xl text-on-surface-variant">
                                Dalam situasi gawat darurat, setiap detik sangat berharga. Fitur ini langsung mendeteksi titik lokasi Anda dan memangkas waktu pencarian kontak RS/Ambulan terdekat.
                            </p>
                            {coords && (
                                <p className="font-label-mono text-[10px] text-primary pt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">location_on</span>
                                    Koordinat Terdeteksi: Lat {coords.lat}, Lng {coords.lng} (Hotline 119 Siaga)
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-4 flex flex-col items-center md:items-end gap-2">
                            <button
                                type="button"
                                onClick={handleCallAmbulance}
                                disabled={ambulanceCalling}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-secondary text-on-secondary font-label-mono text-xs font-bold uppercase tracking-wider hover:bg-secondary-container transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
                                <span>{ambulanceCalling ? 'Mencari Lokasi...' : 'Hubungi Ambulan Terdekat (119)'}</span>
                            </button>
                            <span className="font-label-mono text-[10px] text-on-surface-variant/80">
                                Hotline Siaga Bencana Medis Kemenkes RI
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

