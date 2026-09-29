import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Paket(props) {
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    const tiers = [
        {
            id: 'silver',
            name: 'Silver',
            badge: 'Akses Esensial Mandiri',
            badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
            priceMonthly: 'Gratis',
            priceYearly: 'Gratis',
            period: 'selamanya',
            savings: null,
            desc: 'Fondasi skrining mandiri label pangan, buku harian glukosa, dan edukasi preventif tanpa biaya.',
            features: [
                { text: 'Pemindai Kamera Makanan & Obat BPOM Tanpa Batas', included: true },
                { text: 'Deteksi Beban Glikemik & Gramatur Gula Instan (<0.4s)', included: true },
                { text: 'Buku Harian Glukosa Darah & Log HBE Harian', included: true },
                { text: 'Asisten AI Terverifikasi Medis 24/7 (Edukasi Dasar)', included: true },
                { text: 'Akses Siaga Panggilan Darurat Ambulans 119', included: true },
                { text: 'Akses Komunitas & Forum Diskusi Pasien Publik', included: true },
                { text: 'Prediksi Kurva Glukosa Postprandial 2 Jam Makanan', included: false },
                { text: 'Konsultasi Terjadwal Dokter Spesialis / Instruktur Diet', included: false },
                { text: 'Rencana Intervensi Gizi Personalisasi & Tantangan Remisi', included: false },
                { text: 'Ekspor Resume Medis PDF Terstandar Faskes', included: false },
            ],
            cta: 'Mulai Silver Gratis',
            ctaLink: '/register',
            isPopular: false,
            cardStyle: 'bg-white/90 border-[#d8e6df] shadow-xs',
        },
        {
            id: 'gold',
            name: 'Gold',
            badge: 'Paling Direkomendasikan',
            badgeStyle: 'bg-primary text-white border-transparent shadow-xs',
            priceMonthly: 'Rp 79.000',
            priceYearly: 'Rp 63.000',
            period: '/ bulan',
            savings: 'Hemat Rp 192.000 per tahun',
            desc: 'Program terstruktur untuk pembalikan pra-diabetes, penurunan resistensi insulin, dan panduan gizi terarah.',
            features: [
                { text: 'Semua kapabilitas dalam paket Silver', included: true, highlight: true },
                { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', included: true },
                { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', included: true },
                { text: 'Program Tantangan Remisi 14–90 Hari (Pedoman PERKENI)', included: true },
                { text: '2x Sesi Telekonsultasi Instruktur Gizi per Bulan', included: true },
                { text: 'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)', included: true },
                { text: 'Notifikasi Peringatan Dini Lonjakan Glukosa Anomali', included: true },
                { text: 'Akses Penuh Seluruh Modul Gamifikasi & Resep Rendah Gula', included: true },
                { text: 'Konsultasi Dokter Spesialis Penyakit Dalam (Sp.PD) 1-on-1', included: false },
                { text: 'Starter Kit Glukometer Mandiri Diantar ke Rumah', included: false },
            ],
            cta: 'Pilih Paket Gold',
            ctaLink: '/register?tier=gold',
            isPopular: true,
            cardStyle: 'bg-white border-primary/50 shadow-[0_8px_35px_rgba(0,67,62,0.12)] ring-2 ring-primary/20',
        },
        {
            id: 'platinum',
            name: 'Platinum',
            badge: 'Pendampingan Spesialis VIP',
            badgeStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
            priceMonthly: 'Rp 199.000',
            priceYearly: 'Rp 159.000',
            period: '/ bulan',
            savings: 'Hemat Rp 480.000 per tahun',
            desc: 'Bimbingan klinis intensif 1-on-1 bersama Dokter Spesialis Penyakit Dalam (Sp.PD) untuk kondisi metabolik kompleks.',
            features: [
                { text: 'Semua kapabilitas dalam paket Gold', included: true, highlight: true },
                { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: true },
                { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', included: true },
                { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', included: true },
                { text: 'Starter Kit Glukometer Mandiri Diantar ke Rumah (Langganan Tahunan)', included: true },
                { text: 'Dedicated Health Coach Pribadi & Review Mingguan', included: true },
                { text: 'Hotline Tim Medis Siaga Prioritas 24/7', included: true },
                { text: 'Jalur Koordinasi Ambulans dengan Riwayat Klinis Instan', included: true },
                { text: 'Konsultasi Darurat Tanpa Batas Kuota Bulanan', included: true },
                { text: 'Lencana Anggota Platinum & Undangan Seminar Tertutup', included: true },
            ],
            cta: 'Pilih Paket Platinum',
            ctaLink: '/register?tier=platinum',
            isPopular: false,
            cardStyle: 'bg-white/90 border-[#d8e6df] shadow-xs',
        },
    ];

    const comparisonCategories = [
        {
            category: 'Pemindaian Kamera & Deteksi AI',
            items: [
                { name: 'Pemindai Kamera Label Makanan & Minuman', silver: 'Tanpa Batas', gold: 'Tanpa Batas', platinum: 'Tanpa Batas' },
                { name: 'Verifikasi Nomor Registrasi Obat BPOM RI', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Tersedia' },
                { name: 'Deteksi Gula Tersembunyi (60+ Variasi Sirup)', silver: 'Dasar', gold: 'Komprehensif', platinum: 'Komprehensif' },
                { name: 'Prediksi Kurva Glukosa Darah Postprandial 2 Jam', silver: '—', gold: 'Tersedia', platinum: 'Prioritas Presisi' },
            ],
        },
        {
            category: 'Pencatatan Biomarker & Analitik',
            items: [
                { name: 'Buku Harian Glukosa, Tensi & Aktivitas HBE', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Tersedia' },
                { name: 'Grafik Tren Glikemik & Rata-rata Mingguan', silver: 'Dasar', gold: 'Lanjutan', platinum: 'Klinis Multivariabel' },
                { name: 'Laporan Evaluasi Progres Bulanan (PDF)', silver: '—', gold: 'Tersedia', platinum: 'Format Resume Faskes' },
                { name: 'Analisis Hasil Uji Laboratorium (HbA1c & Kolesterol)', silver: '—', gold: '—', platinum: 'Review Dokter Sp.PD' },
            ],
        },
        {
            category: 'Pendampingan Medis & Tenaga Ahli',
            items: [
                { name: 'Asisten Tanya Jawab Edukasi AI 24/7', silver: 'Tersedia', gold: 'Tanpa Batas', platinum: 'Prioritas Respons' },
                { name: 'Konsultasi Terjadwal Instruktur Diet / Ahli Gizi', silver: '—', gold: '2x per bulan', platinum: '4x per bulan' },
                { name: 'Konsultasi Dokter Spesialis Penyakit Dalam (Sp.PD)', silver: '—', gold: '—', platinum: 'Jalur Langsung 1-on-1' },
                { name: 'Dedicated Personal Health Coach', silver: '—', gold: '—', platinum: 'Tersedia' },
            ],
        },
        {
            category: 'Program Intervensi & Komunitas',
            items: [
                { name: 'Program Tantangan 14 Hari Tanpa Gula Tambahan', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Tersedia' },
                { name: 'Protokol Remisi Pra-Diabetes 90 Hari PERKENI', silver: '—', gold: 'Terpandu', platinum: 'Supervisi Klinis Penuh' },
                { name: 'Akses Forum Komunitas Pasien & Poin Gamifikasi', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Lencana VIP' },
            ],
        },
        {
            category: 'Keamanan, Kit & Gawat Darurat',
            items: [
                { name: 'Akses Panggilan Siaga Darurat Ambulans 119', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Jalur Cepat + Riwayat' },
                { name: 'Starter Kit Glukometer Mandiri ke Rumah', silver: '—', gold: '—', platinum: 'Termasuk (Tahunan)' },
                { name: 'Enkripsi Akun Standar Industri (UU PDP)', silver: 'Tersedia', gold: 'Tersedia', platinum: 'Tersedia' },
            ],
        },
    ];

    const packageFaqs = [
        {
            q: 'Apakah paket Silver benar-benar gratis tanpa batas waktu?',
            a: 'Ya, 100% gratis selamanya. Anda dapat membuat akun, memindai kemasan makanan dan obat dengan kamera, mencatat glukosa darah harian, serta berdiskusi dengan asisten AI tanpa perlu memasukkan informasi kartu kredit.',
        },
        {
            q: 'Kapan saya dapat membatalkan atau mengubah paket langganan?',
            a: 'Anda dapat meningkatkan (upgrade), menurunkan (downgrade), atau membatalkan langganan kapan saja melalui menu pengaturan profil akun Anda. Tidak ada ikatan kontrak dan tidak ada denda pembatalan.',
        },
        {
            q: 'Metode pembayaran apa saja yang diterima untuk paket Gold dan Platinum?',
            a: 'Kami menerima berbagai metode pembayaran resmi yang aman: QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja), Transfer Bank / Virtual Account (BCA, Mandiri, BNI, BRI, Permata), serta Kartu Debit/Kredit berlogo Visa dan Mastercard.',
        },
        {
            q: 'Bagaimana cara pengiriman Starter Kit Glukometer pada paket Platinum?',
            a: 'Untuk anggota paket Platinum dengan siklus pembayaran tahunan, paket kit pemantauan glukosa mandiri (berisi alat ukur glukosa darah, strip uji, dan jarum lanset steril) akan dikirimkan langsung ke alamat rumah Anda melalui kurir rekanan dalam 2–4 hari kerja.',
        },
        {
            q: 'Apakah ada garansi pengembalian dana jika layanan tidak sesuai harapan?',
            a: 'Tentu. Kami memberikan jaminan kepuasan 14 hari uang kembali (14-day money-back guarantee) untuk langganan pertama paket Gold maupun Platinum. Jika Anda merasa program pendampingan kami tidak sesuai, hubungi tim kami untuk pengembalian dana penuh tanpa syarat rumit.',
        },
    ];

    return (
        <MarketingLayout {...props}>
            <Head title="Paket &amp; Pilihan Keanggotaan Preventif - AEVYRA" />

            <div className="relative w-full overflow-hidden bg-[#f7faf8] py-8 sm:py-12 lg:py-16">
                {/* Diffused Ambient Lights */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-150 max-w-[90vw] h-87.5 bg-linear-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[35%] -left-32 w-112.5 max-w-[80vw] h-87.5 bg-[#f4ebe1]/45 blur-3xl rounded-full"
                />

                <div className="relative z-10 max-w-300 mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-[#586b65]">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-[#192b27] font-medium">Pilihan Paket Keanggotaan</span>
                    </nav>

                    {/* Hero Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3.5">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-on-surface border border-[#d6e7dc] text-[11px] text-primary font-medium tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                            <span>Transparansi Biaya • Standar Layanan Medis Terakreditasi</span>
                        </div>
                        <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight tracking-tight">
                            Investasi preventif untuk kesehatan metabolik bebas komplikasi.
                        </h1>
                        <p className="text-[11px] sm:text-sm text-[#4a5e57] leading-relaxed">
                            Pilih tingkatan pendampingan klinis yang sesuai dengan target kesehatan Anda. Mulai dengan pemindaian mandiri gratis seumur hidup hingga supervisi langsung bersama dokter spesialis.
                        </p>

                        {/* Billing Toggle (Monthly vs Yearly) */}
                        <div className="pt-3 flex items-center justify-center">
                            <div className="p-1 bg-[#e7f0ec] rounded-full border border-[#d6e5dd] flex items-center gap-1 shadow-2xs">
                                <button
                                    type="button"
                                    onClick={() => setBillingCycle('monthly')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                                        billingCycle === 'monthly'
                                            ? 'bg-white text-primary shadow-xs'
                                            : 'text-[#4d605a] hover:text-primary'
                                    }`}
                                >
                                    Penagihan Bulanan
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBillingCycle('yearly')}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                                        billingCycle === 'yearly'
                                            ? 'bg-primary text-white shadow-xs'
                                            : 'text-[#4d605a] hover:text-primary'
                                    }`}
                                >
                                    <span>Penagihan Tahunan</span>
                                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                                        Hemat 20%
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3 Core Tier Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
                        {tiers.map((tier) => {
                            const isYearly = billingCycle === 'yearly';
                            const displayPrice = isYearly ? tier.priceYearly : tier.priceMonthly;

                            return (
                                <div
                                    key={tier.id}
                                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${tier.cardStyle}`}
                                >
                                    {tier.isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px] text-emerald-300">star</span>
                                            <span>Rekomendasi Utama</span>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {/* Card Header */}
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-serif text-2xl font-normal text-[#142320]">
                                                {tier.name}
                                            </h3>
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${tier.badgeStyle}`}>
                                                {tier.badge}
                                            </span>
                                        </div>

                                        <p className="text-xs text-[#52655f] leading-relaxed min-h-10">
                                            {tier.desc}
                                        </p>

                                        {/* Price Display */}
                                        <div className="py-2 border-y border-[#edf4f0]">
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="font-serif text-3xl sm:text-4xl font-normal text-primary">
                                                    {displayPrice}
                                                </span>
                                                <span className="text-xs text-[#637671]">
                                                    {tier.period}
                                                </span>
                                            </div>
                                            {isYearly && tier.savings && (
                                                <span className="text-[11px] text-emerald-800 font-medium block mt-1">
                                                    {tier.savings}
                                                </span>
                                            )}
                                        </div>

                                        {/* Features List */}
                                        <div className="space-y-2.5 pt-1">
                                            <span className="text-[10px] font-semibold text-[#536762] uppercase tracking-wider block">
                                                Kapabilitas yang Termasuk:
                                            </span>
                                            <ul className="space-y-2 text-xs">
                                                {tier.features.map((f, idx) => (
                                                    <li
                                                        key={idx}
                                                        className={`flex items-start gap-2.5 ${
                                                            f.included
                                                                ? 'text-[#283c36]'
                                                                : 'text-[#9ab1a7] line-through'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                                                                f.included
                                                                    ? f.highlight
                                                                        ? 'text-primary font-bold'
                                                                        : 'text-emerald-700'
                                                                    : 'text-[#b5c7bf]'
                                                            }`}
                                                        >
                                                            {f.included ? 'check_circle' : 'remove_circle_outline'}
                                                        </span>
                                                        <span className={f.highlight ? 'font-semibold text-primary' : ''}>
                                                            {f.text}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-6">
                                        <Link
                                            href={tier.ctaLink}
                                            className={`w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs text-center cursor-pointer ${
                                                tier.isPopular
                                                    ? 'bg-primary text-white hover:bg-primary-container shadow-md'
                                                    : 'bg-white text-primary border border-[#cbe0d5] hover:bg-[#edf5f0]'
                                            }`}
                                        >
                                            <span>{tier.cta}</span>
                                            <span className="text-xs">→</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trust Guarantees Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-[#d8e6df] shadow-2xs text-center text-xs">
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Garansi 14 Hari</span>
                            <span className="text-[10px] text-[#637671] block">Uang kembali tanpa syarat</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">event_busy</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Bebas Batalkan</span>
                            <span className="text-[10px] text-[#637671] block">Kapan saja tanpa biaya denda</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">QRIS &amp; Transfer Bank</span>
                            <span className="text-[10px] text-[#637671] block">Pembayaran resmi &amp; instan</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">lock</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Privasi Terlindungi</span>
                            <span className="text-[10px] text-[#637671] block">Kepatuhan UU PDP No. 27/2022</span>
                        </div>
                    </div>

                    {/* Detailed Feature Comparison Table */}
                    <div className="space-y-4 pt-4">
                        <div className="text-center max-w-xl mx-auto space-y-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                                Matriks Perbandingan Fitur
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#142320]">
                                Bandingkan seluruh kapabilitas klinis secara transparan.
                            </h2>
                        </div>

                        <div className="overflow-x-auto rounded-3xl border border-[#d8e6df] bg-white shadow-xs">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="bg-[#f2f7f4] border-b border-[#d8e6df]">
                                        <th className="p-4 sm:p-5 font-semibold text-[#162723] w-2/5">
                                            Fitur &amp; Spesifikasi Layanan
                                        </th>
                                        <th className="p-4 sm:p-5 font-semibold text-[#162723] text-center w-1/5">
                                            Silver (Gratis)
                                        </th>
                                        <th className="p-4 sm:p-5 font-semibold text-primary text-center w-1/5 bg-[#edf5f0]">
                                            Gold (Rekomendasi)
                                        </th>
                                        <th className="p-4 sm:p-5 font-semibold text-[#162723] text-center w-1/5">
                                            Platinum (VIP)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf4f0]">
                                    {comparisonCategories.map((cat, cIdx) => (
                                        <React.Fragment key={cIdx}>
                                            <tr className="bg-[#f9fbf9]">
                                                <td
                                                    colSpan={4}
                                                    className="px-4 sm:px-5 py-2.5 font-semibold text-[11px] text-primary uppercase tracking-wider bg-[#f3f8f5] border-t border-[#e2ede7]"
                                                >
                                                    {cat.category}
                                                </td>
                                            </tr>
                                            {cat.items.map((item, iIdx) => (
                                                <tr key={iIdx} className="hover:bg-[#fafcfb] transition-colors">
                                                    <td className="p-3.5 sm:p-4 text-[#2b3e38] font-medium">
                                                        {item.name}
                                                    </td>
                                                    <td className="p-3.5 sm:p-4 text-center text-[#556963]">
                                                        {item.silver === 'Tersedia' ? (
                                                            <span className="material-symbols-outlined text-emerald-700 text-[18px]">check_circle</span>
                                                        ) : item.silver === '—' ? (
                                                            <span className="text-[#a5b9b0]">—</span>
                                                        ) : (
                                                            <span>{item.silver}</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3.5 sm:p-4 text-center text-primary font-medium bg-[#edf5f0]/40">
                                                        {item.gold === 'Tersedia' ? (
                                                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                                                        ) : item.gold === '—' ? (
                                                            <span className="text-[#a5b9b0]">—</span>
                                                        ) : (
                                                            <span>{item.gold}</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3.5 sm:p-4 text-center text-[#2b3e38] font-medium">
                                                        {item.platinum === 'Tersedia' ? (
                                                            <span className="material-symbols-outlined text-emerald-700 text-[18px]">check_circle</span>
                                                        ) : item.platinum === '—' ? (
                                                            <span className="text-[#a5b9b0]">—</span>
                                                        ) : (
                                                            <span>{item.platinum}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* FAQ Seputar Pembayaran & Paket */}
                    <div className="space-y-4 max-w-3xl mx-auto pt-4">
                        <div className="text-center space-y-1">
                            <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                                Tanya Jawab Berlangganan
                            </span>
                            <h2 className="font-serif text-2xl font-normal text-[#142320]">
                                Pertanyaan umum seputar paket dan tagihan.
                            </h2>
                        </div>

                        <div className="space-y-2.5">
                            {packageFaqs.map((faq, idx) => {
                                const isOpen = faqOpenIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        className={`rounded-2xl border transition-all duration-300 ${
                                            isOpen
                                                ? 'bg-white border-[#1c6454]/40 shadow-xs'
                                                : 'bg-white/80 border-[#dce7e1] hover:border-[#cfe0d6]'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-serif text-[#182926] cursor-pointer gap-4"
                                        >
                                            <span className="font-medium text-[#182926]">{faq.q}</span>
                                            <span
                                                className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                                                    isOpen
                                                        ? 'bg-primary text-white rotate-180'
                                                        : 'bg-[#edf5f0] text-[#1c6454] rotate-0'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[16px] leading-none">
                                                    expand_more
                                                </span>
                                            </span>
                                        </button>
                                        <div
                                            className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-4 pb-4 text-xs text-[#4d605a] leading-relaxed border-t border-[#f0f5f2] pt-2.5">
                                                    {faq.a}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Counselor Banner */}
                    <div className="p-6 sm:p-8 bg-primary text-white rounded-3xl shadow-[0_8px_30px_rgba(0,67,62,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                        <div className="space-y-1.5 max-w-lg">
                            <span className="text-[11px] px-3 py-0.5 rounded-full bg-white/10 text-[#d4ede2] border border-white/15 inline-block">
                                Butuh Saran Personalisasi?
                            </span>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                                Bingung menentukan paket mana yang paling tepat untuk Anda?
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c8e6d8] leading-relaxed">
                                Edukator klinis kami siap membantu menganalisis riwayat biomarker dan merekomendasikan tingkatan intervensi yang paling efektif.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                            <a
                                href="mailto:care@aevyra.health"
                                className="px-6 py-3 rounded-full bg-white text-primary text-xs font-semibold hover:bg-[#f3f9f5] transition-all shadow-xs"
                            >
                                Konsultasi Gratis Sekarang
                            </a>
                            <Link
                                href="/"
                                className="px-4 py-3 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-all border border-white/20"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
