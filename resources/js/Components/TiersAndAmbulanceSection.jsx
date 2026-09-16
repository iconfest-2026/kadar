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
        <section className="w-full py-space-xl px-gutter lg:px-margin bg-surface" id="tiers">
            <div className="max-w-7xl mx-auto space-y-space-xl">
                {/* 1. Tingkatan Member Section */}
                <div className="space-y-space-md">
                    <div className="text-center max-w-xl mx-auto space-y-1">
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ FITUR 10 // TINGKATAN MEMBER ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Pilihan Tingkatan Member (Freemium)
                        </h2>
                        <p className="text-body-sm text-xs text-on-surface-variant">
                            Mendorong loyalitas dan keberlanjutan pemakaian jangka panjang dengan tingkat manfaat yang jelas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm items-stretch">
                        {tiers.map((t, idx) => (
                            <div
                                key={idx}
                                className={`p-space-md rounded-2xl border flex flex-col justify-between space-y-space-sm transition-all duration-300 hover:shadow-lg ${
                                    t.isPopular
                                        ? 'bg-surface-container-lowest border-primary ring-2 ring-primary shadow-md relative'
                                        : 'bg-surface-container-low border-surface-container'
                                }`}
                            >
                                <div className="space-y-space-xs">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-headline-sm text-xl font-bold text-primary">
                                            {t.name}
                                        </h3>
                                        <span className={`font-label-mono text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${t.badgeColor}`}>
                                            {t.tag}
                                        </span>
                                    </div>
                                    <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
                                        {t.desc}
                                    </p>

                                    <ul className="space-y-2 pt-2 border-t border-surface-container text-xs text-on-surface">
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

                                <div className="pt-2">
                                    <Link
                                        href="/register"
                                        className={`w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-200 active:scale-95 ${
                                            t.isPopular
                                                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                                                : 'bg-surface text-primary border border-surface-container hover:bg-surface-container'
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
                <div className="p-space-lg bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-3xl border border-tertiary-container/30 shadow-sm" id="emergency">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
                        <div className="md:col-span-8 space-y-1.5">
                            <div className="inline-flex items-center gap-1.5 font-label-mono text-[11px] font-bold text-tertiary uppercase">
                                <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                                <span>[ FITUR 11 // TANGGAP DARURAT AMBULAN ]</span>
                            </div>
                            <h3 className="font-headline-sm text-2xl font-bold text-on-tertiary-fixed-variant">
                                Telepon Ambulan Cepat Berbasis Koordinat GPS
                            </h3>
                            <p className="text-body-sm text-xs leading-relaxed max-w-xl">
                                Dalam situasi gawat darurat, setiap detik sangat berharga. Fitur ini langsung mendeteksi titik lokasi Anda dan memangkas waktu pencarian kontak RS/Ambulan terdekat saat panik.
                            </p>
                            {coords && (
                                <p className="font-label-mono text-[10px] text-tertiary pt-1">
                                    📍 Koordinat Terdeteksi: Lat {coords.lat}, Lng {coords.lng} (Hotline 119 Siaga)
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-4 flex flex-col items-center md:items-end gap-2">
                            <button
                                type="button"
                                onClick={handleCallAmbulance}
                                disabled={ambulanceCalling}
                                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-tertiary text-on-tertiary font-label-mono text-xs font-bold uppercase tracking-wider hover:bg-tertiary-container transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
                                <span>{ambulanceCalling ? 'Mencari Lokasi...' : 'Hubungi Ambulan Terdekat (119)'}</span>
                            </button>
                            <span className="font-label-mono text-[10px] text-on-tertiary-fixed-variant/80">
                                Hotline Siaga Bencana Medis Kemenkes RI
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

