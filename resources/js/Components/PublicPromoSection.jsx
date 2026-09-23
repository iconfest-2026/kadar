import React from 'react';
import { Link } from '@inertiajs/react';

export default function PublicPromoSection() {
    const promoHighlights = [
        {
            icon: 'card_giftcard',
            title: 'Akses Scanner Gratis Selamanya',
            desc: 'Member Silver dapat memindai informasi gizi pangan kemasan, kalori, dan obat tanpa dipungut biaya langganan.',
            badge: '100% GRATIS',
        },
        {
            icon: 'bolt',
            title: 'Chat Konsultasi AI 24 Jam',
            desc: 'Dapatkan jawaban cepat seputar pantangan makanan, batas gula, dan saran nutrisi harian kapan pun Anda butuhkan.',
            badge: 'RESPON INSTAN',
        },
        {
            icon: 'military_tech',
            title: 'Reward & Badge Challenge',
            desc: 'Selesaikan tantangan 14–90 hari bebas gula dan raih badge pencapaian kesehatan yang dapat dibagikan ke komunitas.',
            badge: 'GAMIFIKASI',
        },
        {
            icon: 'e911_emergency',
            title: 'Akses Cepat Ambulan GPS',
            desc: 'Perlindungan darurat satu ketukan untuk mendeteksi rumah sakit terdekat saat kondisi krisis.',
            badge: 'SIAGA 119',
        },
    ];

    return (
        <section className="w-full relative py-space-xl px-gutter lg:px-margin" id="promo">
            <div className="max-w-7xl mx-auto space-y-space-lg">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ PROMO PELUNCURAN // KEUNTUNGAN MEMBER PWA ]
                        </span>
                        <h2 className="font-headline-lg text-3xl sm:text-4xl font-normal text-primary">
                            Mengapa Ribuan Orang Memilih Kadar?
                            Mengapa Ribuan Orang Memilih AEVYRA?
                        </h2>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Solusi praktis mencegah diabetes &amp; penyakit metabolik langsung dari smartphone Anda.
                    </p>
                </div>

                {/* 4 Promo Highlight Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                    {promoHighlights.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-space-md sm:p-5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/80 hover:border-secondary-container/80 hover:bg-white/95 shadow-[0_4px_20px_-2px_rgba(131,85,0,0.06)] hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-space-xs"
                        >
                            <div className="space-y-space-xs">
                                <div className="flex items-center justify-between">
                                    <div className="w-11 h-11 rounded-xl bg-secondary/5 backdrop-blur-sm flex items-center justify-center text-secondary border border-secondary/10 shadow-2xs">
                                        <span className="material-symbols-outlined text-[22px]">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="font-label-mono text-[10px] px-2.5 py-0.5 rounded-full bg-secondary-fixed/90 text-on-secondary-fixed-variant font-bold shadow-2xs">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="font-headline-sm text-base font-semibold text-on-surface pt-1">
                                    {item.title}
                                </h3>
                                <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="pt-2.5 border-t border-secondary/10">
                                <Link
                                    href="/register"
                                    className="text-xs font-semibold text-primary hover:text-secondary hover:underline inline-flex items-center gap-1 group"
                                >
                                    <span>Klaim Akses Gratis</span>
                                    <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

