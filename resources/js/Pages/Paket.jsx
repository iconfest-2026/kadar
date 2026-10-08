import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Paket(props) {
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);
    const [processingTierId, setProcessingTierId] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: string }

    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    const user = props.auth?.user;
    const currentTierSlug = props.currentTier?.slug || props.membership?.current_tier_slug || null;
    const currentTierName = props.currentTier?.name || props.membership?.current_tier || null;

    // Fallback preset features if tier has no features in database
    const getDefaultFeaturesForSlug = (slug) => {
        const s = (slug || '').toLowerCase();
        if (s === 'silver' || s === 'free' || s === 'basic' || s.includes('gratis')) {
            return [
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
        }
        if (s === 'perak') {
            return [
                { text: 'Semua kapabilitas dalam paket Silver', included: true, highlight: true },
                { text: 'Pemindai Kamera OCR Tanpa Batas (Unlimited)', included: true },
                { text: 'Starter Kit Glukometer Mandiri Diantar ke Rumah', included: true },
                { text: 'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)', included: true },
                { text: 'Prediksi Lonjakan Glikemik Makanan (Kurva 2 Jam)', included: true },
                { text: 'Laporan Evaluasi Progres Metabolik Bulanan (Format PDF)', included: true },
                { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', included: false },
                { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Lipid)', included: false },
            ];
        }
        if (s === 'gold' || s.includes('gold')) {
            return [
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
            ];
        }
        return [
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
        ];
    };

    const rawTiers = props.tiersData && props.tiersData.length > 0 ? props.tiersData : [];

    // Map all tiers dynamically from database with fixed pricing and calculated admin fee
    const tiers = rawTiers.length > 0
        ? rawTiers.map((t) => {
            const basePrice = Number(t.price || 0);
            const adminFee = Number(t.calculated_admin_fee ?? t.admin_fee ?? 0);
            const totalPrice = Number(t.total_price || (basePrice + adminFee));

            const isCurrent = user && (
                (currentTierSlug && currentTierSlug.toLowerCase() === t.slug?.toLowerCase()) ||
                (currentTierName && currentTierName.toLowerCase() === t.name?.toLowerCase()) ||
                (props.currentTier?.id && props.currentTier.id === t.id)
            );

            const isPopular = Boolean(t.is_popular) || t.slug === 'gold' || t.name?.toLowerCase().includes('gold');
            const isPlatinum = !isPopular && (t.slug === 'platinum' || t.name?.toLowerCase().includes('platinum') || basePrice >= 140000);
            const isFree = basePrice === 0 || t.slug === 'free' || t.slug === 'silver';

            // Determine badge style
            let badge = t.badge_text;
            let badgeStyle = 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd] font-medium';
            if (isPopular) {
                badge = t.badge_text || 'Paling Direkomendasikan';
                badgeStyle = 'bg-primary text-white border-transparent shadow-xs font-bold';
            } else if (isPlatinum) {
                badge = t.badge_text || 'Pendampingan Spesialis VIP';
                badgeStyle = 'bg-[#fbf7f0] text-[#785b34] border-[#ebdcc4] font-semibold';
            } else {
                badge = t.badge_text || 'Akses Esensial Mandiri';
                badgeStyle = 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd] font-medium';
            }

            const rawFeatures = Array.isArray(t.features) && t.features.length > 0
                ? t.features.map((feat) => ({ text: feat, included: true }))
                : getDefaultFeaturesForSlug(t.slug || t.name);

            return {
                id: t.id,
                name: t.name,
                slug: t.slug,
                basePrice,
                adminFee,
                totalPrice,
                priceFormatted: totalPrice === 0 ? 'Gratis' : `Rp ${totalPrice.toLocaleString('id-ID')}`,
                basePriceFormatted: basePrice === 0 ? 'Gratis' : `Rp ${basePrice.toLocaleString('id-ID')}`,
                adminFeeFormatted: adminFee === 0 ? 'Rp 0' : `Rp ${adminFee.toLocaleString('id-ID')}`,
                period: basePrice === 0 ? 'selamanya' : '/ bulan',
                desc: t.description || 'Program kesehatan preventif terstruktur untuk evaluasi dan perbaikan biomarker metabolik Anda.',
                badge,
                badgeStyle,
                isPopular,
                isPlatinum,
                isFree,
                maxConsultations: t.max_consultations,
                maxScanner: t.max_scanner,
                features: rawFeatures,
                isCurrent: Boolean(isCurrent),
            };
        })
        : [
            {
                id: 1,
                name: 'Silver (Gratis)',
                slug: 'silver',
                basePrice: 0,
                adminFee: 0,
                totalPrice: 0,
                priceFormatted: 'Gratis',
                basePriceFormatted: 'Gratis',
                adminFeeFormatted: 'Rp 0',
                period: 'selamanya',
                desc: 'Fondasi skrining mandiri label pangan, buku harian glukosa, dan edukasi preventif tanpa biaya.',
                badge: 'Akses Esensial Mandiri',
                badgeStyle: 'bg-[#edf5f0] text-[#1c6454] border-[#d4e8dd]',
                isPopular: false,
                maxConsultations: 0,
                maxScanner: 10,
                features: getDefaultFeaturesForSlug('silver'),
                isCurrent: false,
            },
            {
                id: 2,
                name: 'Gold Sehat',
                slug: 'gold',
                basePrice: 99000,
                adminFee: 4000,
                totalPrice: 103000,
                priceFormatted: 'Rp 103.000',
                basePriceFormatted: 'Rp 99.000',
                adminFeeFormatted: 'Rp 4.000',
                period: '/ bulan',
                desc: 'Program terstruktur untuk pembalikan pra-diabetes, penurunan resistensi insulin, dan panduan gizi terarah.',
                badge: 'Paling Direkomendasikan',
                badgeStyle: 'bg-primary text-white border-transparent shadow-xs',
                isPopular: true,
                maxConsultations: 2,
                maxScanner: 50,
                features: getDefaultFeaturesForSlug('gold'),
                isCurrent: false,
            },
            {
                id: 3,
                name: 'Platinum VIP Klinis',
                slug: 'platinum',
                basePrice: 249000,
                adminFee: 4000,
                totalPrice: 253000,
                priceFormatted: 'Rp 253.000',
                basePriceFormatted: 'Rp 249.000',
                adminFeeFormatted: 'Rp 4.000',
                period: '/ bulan',
                desc: 'Bimbingan klinis intensif 1-on-1 bersama Dokter Spesialis Penyakit Dalam (Sp.PD) untuk kondisi metabolik kompleks.',
                badge: 'Pendampingan Spesialis VIP',
                badgeStyle: 'bg-[#f4efe8] text-[#785b34] border-[#e7ddd0]',
                isPopular: false,
                maxConsultations: 6,
                maxScanner: -1,
                features: getDefaultFeaturesForSlug('platinum'),
                isCurrent: false,
            },
        ];

    // Helper to ensure Midtrans Snap is ready in window
    const ensureSnapLoaded = () => {
        return new Promise((resolve) => {
            if (window.snap && typeof window.snap.pay === 'function') {
                return resolve(true);
            }
            const existingScript = document.getElementById('midtrans-snap-script');
            if (existingScript) {
                existingScript.addEventListener('load', () => resolve(true));
                setTimeout(() => resolve(Boolean(window.snap)), 1500);
                return;
            }
            const snapUrl = props.midtransConfig?.snap_url || 'https://app.sandbox.midtrans.com/snap/snap.js';
            const clientKey = props.midtransConfig?.client_key || 'Mid-client-o8FP06N-oie4kS_V';
            const script = document.createElement('script');
            script.id = 'midtrans-snap-script';
            script.src = snapUrl;
            script.setAttribute('data-client-key', clientKey);
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Checkout / Activation Handler via Midtrans
    const handleCheckout = async (tier) => {
        if (!user) {
            window.location.href = `/register?tier=${tier.slug || tier.id}`;
            return;
        }

        if (tier.isCurrent) {
            return;
        }

        setProcessingTierId(tier.id);
        setStatusMessage(null);

        try {
            const getCookie = (name) => {
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = metaToken || xsrfToken || '';

            const res = await fetch(`/member/memberships/${tier.slug || tier.id}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': xsrfToken || csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            let data = {};
            try {
                data = await res.json();
            } catch (e) {
                // Non-JSON
            }

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Gagal memulai transaksi pembayaran Midtrans.');
            }

            // Free tier instant activation
            if (data.is_free) {
                setStatusMessage({
                    type: 'success',
                    text: `Paket ${tier.name} berhasil diaktifkan pada akun Anda secara gratis.`,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                return;
            }

            // Paid tier: Launch Midtrans Snap Popup
            if (data.snap_token) {
                await ensureSnapLoaded();

                if (window.snap && typeof window.snap.pay === 'function') {
                    window.snap.pay(data.snap_token, {
                        onSuccess: function () {
                            setStatusMessage({
                                type: 'success',
                                text: `Pembayaran berhasil diverifikasi! Tingkatan langganan ${tier.name} telah aktif.`,
                            });
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        },
                        onPending: function () {
                            setStatusMessage({
                                type: 'info',
                                text: `Pesanan langganan dibuat (Kode: ${data.order_id || 'AEVYRA'}). Silakan selesaikan pembayaran sesuai metode yang Anda pilih di Midtrans.`,
                            });
                        },
                        onError: function () {
                            setStatusMessage({
                                type: 'error',
                                text: 'Pembayaran gagal diproses atau transaksi ditolak oleh payment gateway.',
                            });
                        },
                        onClose: function () {
                            setProcessingTierId(null);
                        },
                    });
                } else if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    throw new Error('Midtrans Snap SDK tidak merespons. Silakan muat ulang halaman.');
                }
            }
        } catch (err) {
            setStatusMessage({
                type: 'error',
                text: err.message || 'Terjadi gangguan saat menghubungkan ke gateway pembayaran.',
            });
        } finally {
            setProcessingTierId(null);
        }
    };

    // Dynamic Comparison Matrix
    const comparisonCategories = [
        {
            category: 'Pemindaian Kamera & Deteksi AI',
            items: [
                {
                    name: 'Pemindai Kamera Label Makanan & Minuman',
                    checker: (t) => t.maxScanner === -1 ? 'Tanpa Batas' : (t.maxScanner > 0 ? `${t.maxScanner}x / hari` : '10x / hari'),
                },
                {
                    name: 'Verifikasi Nomor Registrasi Obat BPOM RI',
                    checker: () => 'Tersedia',
                },
                {
                    name: 'Deteksi Gula Tersembunyi (60+ Variasi Sirup)',
                    checker: (t) => t.basePrice > 0 ? 'Komprehensif' : 'Dasar',
                },
                {
                    name: 'Prediksi Kurva Glukosa Darah Postprandial 2 Jam',
                    checker: (t) => t.basePrice >= 200000 ? 'Prioritas Presisi' : (t.basePrice > 0 ? 'Tersedia' : 'Tidak Termasuk'),
                },
            ],
        },
        {
            category: 'Pencatatan Biomarker & Analitik',
            items: [
                {
                    name: 'Buku Harian Glukosa, Tensi & Aktivitas HBE',
                    checker: () => 'Tersedia',
                },
                {
                    name: 'Grafik Tren Glikemik & Rata-rata Mingguan',
                    checker: (t) => t.basePrice >= 200000 ? 'Klinis Multivariabel' : (t.basePrice > 0 ? 'Lanjutan' : 'Dasar'),
                },
                {
                    name: 'Laporan Evaluasi Progres Bulanan (PDF)',
                    checker: (t) => t.basePrice >= 200000 ? 'Format Resume Faskes' : (t.basePrice > 0 ? 'Tersedia' : 'Tidak Termasuk'),
                },
                {
                    name: 'Analisis Hasil Uji Laboratorium (HbA1c & Kolesterol)',
                    checker: (t) => t.basePrice >= 200000 ? 'Review Dokter Spesialis' : 'Tidak Termasuk',
                },
            ],
        },
        {
            category: 'Pendampingan Medis & Tenaga Ahli',
            items: [
                {
                    name: 'Asisten Tanya Jawab Edukasi AI 24/7',
                    checker: (t) => t.basePrice > 0 ? 'Tanpa Batas' : 'Tersedia (Dasar)',
                },
                {
                    name: 'Konsultasi Terjadwal Instruktur Diet / Dokter',
                    checker: (t) => t.maxConsultations === -1 ? 'Bebas Batas' : (t.maxConsultations > 0 ? `${t.maxConsultations}x per bulan` : 'Tidak Termasuk'),
                },
                {
                    name: 'Dedicated Personal Health Coach',
                    checker: (t) => t.basePrice >= 200000 ? 'Tersedia' : 'Tidak Termasuk',
                },
            ],
        },
        {
            category: 'Program Intervensi & Gawat Darurat',
            items: [
                {
                    name: 'Program Tantangan Remisi Gizi & Gaya Hidup',
                    checker: () => 'Tersedia',
                },
                {
                    name: 'Akses Panggilan Siaga Darurat Ambulans 119',
                    checker: (t) => t.basePrice >= 200000 ? 'Jalur Cepat + Riwayat' : 'Tersedia',
                },
                {
                    name: 'Enkripsi Data Standar Perbankan (UU PDP)',
                    checker: () => 'Tersedia',
                },
            ],
        },
    ];

    const packageFaqs = [
        {
            q: 'Apakah harga paket yang tercantum sudah fiks dan transparan?',
            a: 'Ya, harga yang tercantum adalah tarif fiks yang mencakup biaya pokok layanan bulanan ditambah biaya administrasi resmi. Tidak ada biaya tersembunyi ataupun tagihan tambahan tanpa persetujuan Anda.',
        },
        {
            q: 'Apakah paket Silver benar-benar bebas biaya tanpa batas waktu?',
            a: 'Ya, 100% gratis selamanya. Anda dapat membuat akun, memindai kemasan makanan dan obat dengan kamera, mencatat glukosa darah harian, serta berdiskusi dengan asisten AI tanpa kewajiban memasukkan nomor kartu kredit.',
        },
        {
            q: 'Bagaimana alur pembayaran paket langganan?',
            a: 'Ketika Anda memilih paket, jendela pembayaran resmi akan langsung terbuka di layar. Anda dapat memilih metode pembayaran instan seperti QRIS (GoPay, OVO, Dana, ShopeePay), Virtual Account Bank (BCA, Mandiri, BNI, BRI, Permata), maupun Kartu Debit/Kredit. Setelah pembayaran berhasil, status langganan langsung aktif secara otomatis.',
        },
        {
            q: 'Kapan saya dapat membatalkan atau mengubah paket keanggotaan?',
            a: 'Anda dapat melakukan upgrade, downgrade, atau membatalkan langganan kapan saja melalui menu pengelolaan paket pada profil Anda. Tidak ada ikatan kontrak jangka panjang dan tidak ada biaya denda pembatalan.',
        },
        {
            q: 'Apakah ada garansi jika layanan konsultasi dan pendampingan tidak sesuai?',
            a: 'Tentu. Kami menyediakan jaminan kepuasan 14 hari uang kembali (14-day money-back guarantee) untuk langganan pertama paket berbayar kami. Jika Anda merasa program pendampingan klinis tidak sesuai, tim kami siap membantu proses pengembalian dana secara profesional.',
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

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-[#586b65]" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-[#192b27] font-medium">Pilihan Paket Keanggotaan</span>
                    </nav>

                    {/* Hero Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight tracking-tight">
                            Investasi preventif untuk kesehatan metabolik bebas komplikasi.
                        </h1>
                        <p className="text-xs sm:text-sm text-[#4a5e57] leading-relaxed">
                            Pilih tingkatan pendampingan klinis yang sesuai dengan target kesehatan Anda.
                        </p>
                    </div>

                    {/* Status Alert Notification */}
                    {statusMessage && (
                        <div
                            className={`max-w-2xl mx-auto p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-xs animate-fade-in ${
                                statusMessage.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                    : statusMessage.type === 'info'
                                    ? 'bg-teal-50 text-teal-900 border-teal-200'
                                    : 'bg-rose-50 text-rose-900 border-rose-200'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <span className="material-symbols-outlined text-[20px] shrink-0">
                                    {statusMessage.type === 'success'
                                        ? 'check_circle'
                                        : statusMessage.type === 'info'
                                        ? 'info'
                                        : 'error'}
                                </span>
                                <span>{statusMessage.text}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStatusMessage(null)}
                                className="text-current hover:opacity-75 cursor-pointer shrink-0"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    {/* Dynamic Tier Cards Grid */}
                    <div
                        className={`grid grid-cols-1 ${
                            tiers.length === 1
                                ? 'max-w-md mx-auto'
                                : tiers.length === 2
                                ? 'sm:grid-cols-2 max-w-3xl mx-auto'
                                : tiers.length === 3
                                ? 'lg:grid-cols-3'
                                : 'md:grid-cols-2 lg:grid-cols-4'
                        } gap-6 lg:gap-6 items-stretch`}
                    >
                        {tiers.map((tier) => {
                            const isProcessing = processingTierId === tier.id;

                            let cardContainerStyle = 'bg-white/95 border-[#d8e6df] shadow-xs hover:border-[#b4cfc1]';
                            if (tier.isCurrent) {
                                cardContainerStyle = 'bg-white border-[#1c6454]/60 shadow-md ring-2 ring-[#1c6454]/30';
                            } else if (tier.isPopular) {
                                cardContainerStyle = 'bg-linear-to-b from-[#f2f9f5] via-white to-[#eaf5ef]/70 border-2 border-primary shadow-[0_16px_45px_rgba(0,67,62,0.18)] ring-4 ring-primary/10 lg:-translate-y-2.5 z-10 scale-[1.02]';
                            } else if (tier.isPlatinum) {
                                cardContainerStyle = 'bg-linear-to-b from-white via-[#fcfbfa] to-[#faf5ee]/60 border border-[#e2d8c9] shadow-md hover:shadow-lg hover:border-[#c8b79e]';
                            }

                            return (
                                <div
                                    key={tier.id || tier.slug}
                                    className={`p-6 sm:p-7 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative ${cardContainerStyle}`}
                                >
                                    {/* Popular or Recommendation Badge */}
                                    {tier.isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                                            <span className="material-symbols-outlined text-[13px] text-amber-300">star</span>
                                            <span>Rekomendasi Utama</span>
                                        </div>
                                    )}

                                    {tier.isPlatinum && !tier.isPopular && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#3d2e1b] text-[#ebdcc4] text-[10px] font-bold tracking-wider uppercase shadow-sm flex items-center gap-1 whitespace-nowrap border border-[#ebdcc4]/40">
                                            <span className="material-symbols-outlined text-[12px] text-amber-300">workspace_premium</span>
                                            <span>Tingkat Tertinggi VIP</span>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {/* Card Header */}
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className={`font-serif text-xl sm:text-2xl text-[#142320] truncate ${tier.isPopular ? 'font-bold' : 'font-normal'}`}>
                                                {tier.name}
                                            </h3>
                                            {tier.isCurrent ? (
                                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#e6efe9] text-[#1c6454] border border-[#bcdbc8] font-bold shrink-0">
                                                    Paket Aktif
                                                </span>
                                            ) : (
                                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border shrink-0 ${tier.badgeStyle}`}>
                                                    {tier.badge}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-[#52655f] leading-relaxed min-h-10">
                                            {tier.desc}
                                        </p>

                                        {/* Price Display */}
                                        <div className={`py-2.5 border-y space-y-1.5 ${tier.isPopular ? 'border-primary/20 bg-primary/5 -mx-6 px-6 sm:-mx-7 sm:px-7' : 'border-[#edf4f0]'}`}>
                                            <div className="flex items-baseline gap-1.5">
                                                <span className={`font-serif text-3xl font-normal ${tier.isPopular ? 'text-primary font-bold text-3xl sm:text-4xl' : tier.isPlatinum ? 'text-[#20322d]' : 'text-[#182926]'}`}>
                                                    {tier.priceFormatted}
                                                </span>
                                                <span className="text-xs text-[#637671] font-medium">
                                                    {tier.period}
                                                </span>
                                            </div>

                                            {/* Price Breakdown from Admin input */}
                                            {tier.basePrice > 0 ? (
                                                <div className={`p-2 rounded-xl border flex flex-col justify-center gap-0.5 text-[11px] h-11.5 ${tier.isPopular ? 'bg-emerald-50/90 border-emerald-200/80' : tier.isPlatinum ? 'bg-[#fcf7ee] border-[#ebdcc4]' : 'bg-[#f4f8f5] border-[#dbe9e1]'}`}>
                                                    <div className="flex items-center justify-between text-[#475b55]">
                                                        <span>Harga Pokok Layanan:</span>
                                                        <strong className="text-[#192b27] font-mono">{tier.basePriceFormatted}</strong>
                                                    </div>
                                                    <div className="flex items-center justify-between text-teal-800 font-medium">
                                                        <span>Biaya Admin:</span>
                                                        <span className="font-mono">+{tier.adminFeeFormatted}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-2 rounded-xl border border-[#dbe9e1] bg-[#f4f8f5] flex items-center gap-1.5 text-[11px] text-[#4d6b60] h-11.5">
                                                    <span className="material-symbols-outlined text-[14px] text-emerald-700">lock_open</span>
                                                    <span>Gratis selamanya tanpa biaya admin</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Quotas Box */}
                                        <div className={`grid grid-cols-2 gap-2 p-2.5 rounded-2xl border text-xs ${
                                            tier.isPopular 
                                                ? 'bg-[#e2f2e8] border-[#b8dfc8]' 
                                                : tier.isPlatinum 
                                                ? 'bg-[#faf5ee] border-[#ede2d2]' 
                                                : 'bg-[#f0f6f2]/80 border-[#dbe7e0]'
                                        }`}>
                                            <div>
                                                <span className="text-[10px] text-[#556963] font-medium block">Konsultasi Medis:</span>
                                                <span className={`font-mono font-bold ${tier.isPopular ? 'text-primary' : tier.isPlatinum ? 'text-[#785b34]' : 'text-[#284138]'}`}>
                                                    {tier.maxConsultations === -1 ? 'Bebas Batas' : (tier.maxConsultations > 0 ? `${tier.maxConsultations}x / bulan` : 'Tanpa Kuota')}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-[#556963] font-medium block">Pemindai Kamera:</span>
                                                <span className={`font-mono font-bold ${tier.isPopular ? 'text-primary' : tier.isPlatinum ? 'text-[#785b34]' : 'text-[#284138]'}`}>
                                                    {tier.maxScanner === -1 ? 'Unlimited' : (tier.maxScanner > 0 ? `${tier.maxScanner}x / hari` : '10x / hari')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Dynamic Features List */}
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
                                                                ? 'text-[#20342e]'
                                                                : 'text-[#8b9e97] line-through decoration-[#9cb0a8]'
                                                        }`}
                                                    >
                                                        <span
                                                            className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${
                                                                f.included
                                                                    ? tier.isPopular
                                                                        ? 'text-primary font-bold'
                                                                        : tier.isPlatinum
                                                                        ? 'text-emerald-800'
                                                                        : 'text-emerald-700'
                                                                    : 'text-[#9ab1a7]'
                                                            }`}
                                                        >
                                                            {f.included ? 'check_circle' : 'close'}
                                                        </span>
                                                        <span className={f.included && f.highlight ? 'font-bold text-[#006057]' : ''}>
                                                            {f.text}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Action Button & Payment Gateway Interaction */}
                                    <div className="pt-6">
                                        {tier.isCurrent ? (
                                            <button
                                                type="button"
                                                disabled
                                                className="w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold bg-[#e7f0ec] text-[#2c5347] border border-[#d2e3d9] cursor-default flex items-center justify-center gap-1.5 shadow-2xs"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">verified</span>
                                                <span>Paket Aktif Anda</span>
                                            </button>
                                        ) : user ? (
                                            <button
                                                type="button"
                                                onClick={() => handleCheckout(tier)}
                                                disabled={processingTierId !== null}
                                                className={`w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs text-center cursor-pointer ${
                                                    tier.isPopular
                                                        ? 'bg-primary text-white hover:bg-primary-container shadow-[0_6px_20px_rgba(0,67,62,0.28)] font-bold'
                                                        : tier.isPlatinum
                                                        ? 'bg-[#162723] text-white hover:bg-[#253e38] shadow-sm font-semibold'
                                                        : 'bg-white text-primary border border-[#cbe0d5] hover:bg-[#edf5f0]'
                                                }`}
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                                                        <span>Menghubungkan Midtrans...</span>
                                                    </>
                                                ) : tier.totalPrice === 0 ? (
                                                    <>
                                                        <span>Aktifkan Paket Gratis</span>
                                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>Pilih &amp; Bayar {tier.name}</span>
                                                        <span className="material-symbols-outlined text-[15px]">credit_card</span>
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div>
                                                <Link
                                                    href={`/register?tier=${tier.slug || tier.id}`}
                                                    className={`w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs text-center cursor-pointer ${
                                                        tier.isPopular
                                                            ? 'bg-primary text-white hover:bg-primary-container shadow-[0_6px_20px_rgba(0,67,62,0.28)] font-bold'
                                                            : tier.isPlatinum
                                                            ? 'bg-[#162723] text-white hover:bg-[#253e38] shadow-sm font-semibold'
                                                            : 'bg-white text-primary border border-[#cbe0d5] hover:bg-[#edf5f0]'
                                                    }`}
                                                >
                                                    <span>{tier.totalPrice === 0 ? `Mulai ${tier.name}` : `Pilih Paket ${tier.name}`}</span>
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </Link>
                                                <Link
                                                    href="/login?redirect=/paket"
                                                    className="text-[11px] text-[#4a5f57] hover:underline mt-2 block text-center"
                                                >
                                                    Sudah punya akun? Masuk
                                                </Link>
                                            </div>
                                        )}
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
                            <span className="text-[10px] text-[#637671] block">Uang kembali tanpa syarat rumit</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">event_busy</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Bebas Batalkan</span>
                            <span className="text-[10px] text-[#637671] block">Kapan saja tanpa biaya penalti</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">QRIS &amp; Virtual Account</span>
                            <span className="text-[10px] text-[#637671] block">Midtrans Snap resmi &amp; instan</span>
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
                                        <th className="p-4 sm:p-5 font-semibold text-[#162723]">
                                            Fitur &amp; Spesifikasi Layanan
                                        </th>
                                        {tiers.map((t) => (
                                            <th
                                                key={t.id}
                                                className={`p-4 sm:p-5 font-semibold text-center ${
                                                    t.isPopular ? 'text-primary bg-[#edf5f0]' : 'text-[#162723]'
                                                }`}
                                            >
                                                <span>{t.name}</span>
                                                <span className="block text-[10px] font-normal text-[#556963] mt-0.5">
                                                    {t.priceFormatted}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf4f0]">
                                    {comparisonCategories.map((cat, cIdx) => (
                                        <React.Fragment key={cIdx}>
                                            <tr className="bg-[#f9fbf9]">
                                                <td
                                                    colSpan={tiers.length + 1}
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
                                                    {tiers.map((t) => {
                                                        const result = item.checker(t);
                                                        return (
                                                            <td
                                                                key={t.id}
                                                                className={`p-3.5 sm:p-4 text-center ${
                                                                    t.isPopular ? 'bg-[#edf5f0]/40 font-medium text-primary' : 'text-[#556963]'
                                                                }`}
                                                            >
                                                                {result === 'Tersedia' ? (
                                                                    <span className="material-symbols-outlined text-emerald-700 text-[18px]">
                                                                        check_circle
                                                                    </span>
                                                                ) : result === 'Tidak Termasuk' ? (
                                                                    <span className="material-symbols-outlined text-[#b2c4bc] text-[18px]">
                                                                        remove
                                                                    </span>
                                                                ) : (
                                                                    <span>{result}</span>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
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
                                Pertanyaan umum seputar paket dan pembayaran.
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
