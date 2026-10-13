import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Paket(props) {
    const [faqOpenIndex, setFaqOpenIndex] = useState(null);
    const [processingTierId, setProcessingTierId] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: string }

    // Netflix-style Downgrade Flow States
    const [downgradeModalOpen, setDowngradeModalOpen] = useState(false);
    const [selectedDowngradeTier, setSelectedDowngradeTier] = useState(null);
    const [downgradeMode, setDowngradeMode] = useState('SCHEDULED'); // 'SCHEDULED' | 'IMMEDIATE'
    const [downgradeReason, setDowngradeReason] = useState('');
    const [isSubmittingDowngrade, setIsSubmittingDowngrade] = useState(false);
    const [isCancellingDowngrade, setIsCancellingDowngrade] = useState(false);

    const toggleFaq = (index) => {
        setFaqOpenIndex(faqOpenIndex === index ? null : index);
    };

    const user = props.auth?.user;
    const activeMembership = props.membershipDetails || props.membership || {};

    const currentTier = props.currentTier || (props.membership?.tier_id ? {
        id: props.membership.tier_id,
        name: props.membership.current_tier,
        slug: props.membership.current_tier_slug,
        price: Number(props.membership.current_tier_price || 0),
    } : null);

    const currentTierSlug = currentTier?.slug || props.membership?.current_tier_slug || null;
    const currentTierName = currentTier?.name || props.membership?.current_tier || 'Gratis (Basic)';
    const currentTierPrice = Number(currentTier?.price ?? props.membership?.current_tier_price ?? 0);

    const hasPendingDowngrade = Boolean(activeMembership.has_pending_downgrade || activeMembership.pending_downgrade);
    const pendingDowngrade = activeMembership.pending_downgrade || activeMembership.downgrade_tier || null;
    const pendingDowngradeTierId = pendingDowngrade?.tier_id || pendingDowngrade?.id;

    // Helper to get CSRF tokens
    const getCsrfToken = () => {
        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
        };
        const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const xsrfToken = getCookie('XSRF-TOKEN');
        return metaToken || xsrfToken || '';
    };

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

            const isCurrent = Boolean(user && (
                (currentTier?.id && Number(t.id) === Number(currentTier.id)) ||
                (currentTierSlug && currentTierSlug.toLowerCase() === t.slug?.toLowerCase()) ||
                (currentTierName && currentTierName.toLowerCase() === t.name?.toLowerCase())
            ));

            const isScheduledTarget = Boolean(
                hasPendingDowngrade &&
                ((pendingDowngradeTierId && Number(pendingDowngradeTierId) === Number(t.id)) ||
                 (pendingDowngrade?.tier_slug && pendingDowngrade.tier_slug.toLowerCase() === t.slug?.toLowerCase()))
            );

            // Downgrade if logged-in, not current, and target tier base price is lower than current tier
            const isDowngrade = Boolean(
                user &&
                !isCurrent &&
                !isScheduledTarget &&
                (currentTierPrice > 0 && basePrice < currentTierPrice)
            );

            const isUpgrade = Boolean(user && !isCurrent && !isScheduledTarget && !isDowngrade);

            const isPopular = Boolean(t.is_popular) || t.slug === 'gold' || t.name?.toLowerCase().includes('gold');
            const isPlatinum = !isPopular && (t.slug === 'platinum' || t.name?.toLowerCase().includes('platinum') || basePrice >= 140000);
            const isFree = basePrice === 0 || t.slug === 'free' || t.slug === 'silver';

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
                isCurrent,
                isScheduledTarget,
                isDowngrade,
                isUpgrade,
            };
        })
        : [];

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
            const csrfToken = getCsrfToken();
            const res = await fetch(`/member/memberships/${tier.slug || tier.id}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
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
                    text: `Paket ${tier.name} berhasil diaktifkan pada akun Anda secara gratis. Notifikasi otomatis telah dikirim.`,
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
                        onSuccess: async function () {
                            setStatusMessage({
                                type: 'success',
                                text: `🎉 Pembayaran berhasil diverifikasi! Paket ${tier.name} kini aktif dan notifikasi resmi telah dikirim ke akun Anda.`,
                            });

                            // Instant authoritative DB sync
                            try {
                                const token = getCsrfToken();
                                await fetch('/member/memberships/verify', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-CSRF-TOKEN': token,
                                        'X-Requested-With': 'XMLHttpRequest',
                                    },
                                    body: JSON.stringify({ order_id: data.order_id }),
                                });
                            } catch (err) {
                                console.warn('Instant sync background ping:', err);
                            }

                            setTimeout(() => {
                                window.location.reload();
                            }, 1400);
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

    // Open Netflix-style Downgrade Modal
    const openDowngradeModal = (tier) => {
        setSelectedDowngradeTier(tier);
        setDowngradeMode('SCHEDULED');
        setDowngradeReason('');
        setDowngradeModalOpen(true);
    };

    // Confirm Downgrade Submission
    const handleConfirmDowngrade = async () => {
        if (!selectedDowngradeTier) return;

        setIsSubmittingDowngrade(true);
        setStatusMessage(null);

        try {
            const csrfToken = getCsrfToken();
            const res = await fetch(`/member/memberships/${selectedDowngradeTier.slug || selectedDowngradeTier.id}/downgrade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    mode: downgradeMode,
                    reason: downgradeReason,
                }),
                credentials: 'same-origin',
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Gagal mengatur jadwal penurunan paket.');
            }

            setDowngradeModalOpen(false);
            setStatusMessage({
                type: 'success',
                text: data.message || `Penurunan paket ke ${selectedDowngradeTier.name} berhasil diproses. Notifikasi otomatis telah dikirim.`,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1400);
        } catch (err) {
            setStatusMessage({
                type: 'error',
                text: err.message || 'Terjadi kesalahan saat memproses penurunan paket.',
            });
        } finally {
            setIsSubmittingDowngrade(false);
        }
    };

    // Cancel Scheduled Downgrade (Netflix "Keep Current Plan")
    const handleCancelDowngrade = async () => {
        if (!confirm(`Batalkan jadwal penurunan paket dan tetap berlangganan ${currentTierName}?`)) {
            return;
        }

        setIsCancellingDowngrade(true);
        setStatusMessage(null);

        try {
            const csrfToken = getCsrfToken();
            const res = await fetch('/member/memberships/cancel-downgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Gagal membatalkan penurunan paket.');
            }

            setStatusMessage({
                type: 'info',
                text: data.message || `Jadwal penurunan paket berhasil dibatalkan. Anda tetap berlangganan ${currentTierName}.`,
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (err) {
            setStatusMessage({
                type: 'error',
                text: err.message || 'Gagal membatalkan penurunan paket.',
            });
        } finally {
            setIsCancellingDowngrade(false);
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
                    name: 'Enkripsi Data Medis Standar AES-256',
                    checker: () => 'Tersedia',
                },
            ],
        },
    ];

    const packageFaqs = [
        {
            q: 'Bagaimana cara kerja penurunan paket (downgrade) ala Netflix?',
            a: 'Ketika Anda memilih untuk menurunkan paket, Anda tidak akan kehilangan akses yang sudah dibayar. Seluruh kuota dan manfaat paket saat ini tetap berlaku penuh hingga akhir siklus penagihan Anda. Paket baru akan resmi aktif setelah periode berjalan selesai, dan Anda bebas membatalkan perubahan ini kapan saja sebelum tanggal tersebut.',
        },
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
            a: 'Ketika Anda memilih paket, jendela pembayaran resmi Midtrans Snap akan langsung terbuka di layar. Anda dapat memilih metode pembayaran instan seperti QRIS (GoPay, OVO, Dana, ShopeePay), Virtual Account Bank (BCA, Mandiri, BNI, BRI, Permata), maupun Kartu Debit/Kredit. Setelah pembayaran berhasil, status langganan langsung aktif secara otomatis dan notifikasi resmi dikirim.',
        },
        {
            q: 'Apakah saya langsung menerima notifikasi setelah pembayaran selesai?',
            a: 'Ya! Sistem kami secara otomatis mengirimkan notifikasi resmi ke akun Anda (tampil pada lonceng notifikasi & pusat pesan) berisi ringkasan paket aktif, masa berlaku, dan nomor transaksi.',
        },
        {
            q: 'Apakah ada garansi jika layanan konsultasi dan pendampingan tidak sesuai?',
            a: 'Tentu. Kami menyediakan jaminan kepuasan 14 hari uang kembali (14-day money-back guarantee) untuk langganan pertama paket berbayar kami. Jika Anda merasa program pendampingan klinis tidak sesuai, tim kami siap membantu proses pengembalian dana secara profesional.',
        },
    ];

    return (
        <MarketingLayout {...props}>
            <Head title="Paket & Pilihan Keanggotaan Preventif - AEVYRA" />

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

                <div className="relative z-10 max-w-350 mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
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
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-primary text-[11px] font-bold tracking-wider uppercase">
                            <span className="material-symbols-outlined text-[14px]">health_and_safety</span>
                            <span>LANGGANAN FLEKSIBEL & TRANSPARAN</span>
                        </div>
                        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight tracking-tight">
                            Investasi preventif untuk kesehatan metabolik bebas komplikasi.
                        </h1>
                        <p className="text-xs sm:text-sm text-[#4a5e57] leading-relaxed">
                            Pilih tingkatan pendampingan klinis yang sesuai dengan target kesehatan Anda. Bebas tingkatkan atau turunkan paket kapan saja tanpa penalti.
                        </p>
                    </div>

                    {/* Status Alert Notification */}
                    {statusMessage && (
                        <div
                            className={`max-w-3xl mx-auto p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-semibold shadow-xs animate-fade-in ${
                                statusMessage.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                                    : statusMessage.type === 'info'
                                    ? 'bg-teal-50 text-teal-950 border-teal-300'
                                    : 'bg-rose-50 text-rose-950 border-rose-300'
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
                                aria-label="Tutup notifikasi"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    {/* Netflix-Style Scheduled Downgrade Prominent Banner */}
                    {hasPendingDowngrade && (
                        <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-3xl bg-linear-to-r from-amber-500/10 via-amber-400/10 to-orange-400/5 border-2 border-amber-400/40 text-amber-950 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 rounded-2xl bg-amber-500/15 text-amber-700 shrink-0">
                                    <span className="material-symbols-outlined text-2xl">
                                        schedule
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900">
                                            Jadwal Penurunan Paket Aktif (Model Netflix)
                                        </span>
                                    </div>
                                    <h4 className="text-sm sm:text-base font-bold text-amber-950 font-serif">
                                        Paket Anda Dijadwalkan Beralih ke <span className="underline decoration-amber-600 font-extrabold">{pendingDowngrade?.tier_name}</span>
                                    </h4>
                                    <p className="text-xs text-amber-900/80 leading-relaxed">
                                        Perubahan akan efektif pada tanggal <strong className="text-amber-950 font-mono">{pendingDowngrade?.effective_at || activeMembership.ends_at}</strong>. Hingga saat itu, Anda tetap memegang akses penuh tanpa batas ke seluruh kuota dan fitur <strong>{currentTierName}</strong>.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCancelDowngrade}
                                disabled={isCancellingDowngrade}
                                className="w-full md:w-auto px-4 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
                            >
                                {isCancellingDowngrade ? (
                                    <>
                                        <span className="material-symbols-outlined text-[15px] animate-spin">refresh</span>
                                        <span>Membatalkan...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                        <span>Batalkan Penurunan (Tetap di {currentTierName})</span>
                                    </>
                                )}
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
                            } else if (tier.isScheduledTarget) {
                                cardContainerStyle = 'bg-amber-50/50 border-amber-400 shadow-md ring-2 ring-amber-400/30';
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
                                    {/* Badges */}
                                    {tier.isScheduledTarget && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                                            <span className="material-symbols-outlined text-[13px]">schedule</span>
                                            <span>Dijadwalkan Aktif</span>
                                        </div>
                                    )}

                                    {tier.isPopular && !tier.isScheduledTarget && (
                                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                                            <span className="material-symbols-outlined text-[13px] text-amber-300">star</span>
                                            <span>Rekomendasi Utama</span>
                                        </div>
                                    )}

                                    {tier.isPlatinum && !tier.isPopular && !tier.isScheduledTarget && (
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
                                            ) : tier.isScheduledTarget ? (
                                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold shrink-0">
                                                    Menunggu Siklus
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

                                            {/* Price Breakdown */}
                                            {tier.basePrice > 0 ? (
                                                <div className={`p-2 rounded-xl border flex flex-col justify-center gap-0.5 text-[11px] h-11.5 ${tier.isPopular ? 'bg-emerald-50/90 border-emerald-200/80' : tier.isPlatinum ? 'bg-[#fcf7ee] border-[#ebdcc4]' : 'bg-[#f4f8f5] border-[#dbe9e1]'}`}>
                                                    <div className="flex items-center justify-between text-[#475b55]">
                                                        <span>Harga Pokok Layanan:</span>
                                                        <strong className="text-[#192b27] font-mono">{tier.basePriceFormatted}</strong>
                                                    </div>
                                                    <div className="flex items-center justify-between text-teal-800 font-medium">
                                                        <span>Biaya Admin Gateway:</span>
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
                                            <div className="space-y-1.5">
                                                <button
                                                    type="button"
                                                    disabled
                                                    className="w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold bg-[#e7f0ec] text-[#2c5347] border border-[#d2e3d9] cursor-default flex items-center justify-center gap-1.5 shadow-2xs"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">verified</span>
                                                    <span>Paket Aktif Anda</span>
                                                </button>
                                                {activeMembership.ends_at && (
                                                    <span className="text-[10px] text-[#556963] font-mono text-center block">
                                                        Aktif hingga: {activeMembership.ends_at}
                                                    </span>
                                                )}
                                            </div>
                                        ) : tier.isScheduledTarget ? (
                                            <div className="space-y-2">
                                                <button
                                                    type="button"
                                                    onClick={handleCancelDowngrade}
                                                    disabled={isCancellingDowngrade}
                                                    className="w-full min-h-12 py-3 px-5 rounded-full text-xs font-bold bg-white text-amber-900 border-2 border-amber-400 hover:bg-amber-50 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                                    <span>Batalkan Penurunan Paket</span>
                                                </button>
                                                <span className="text-[10px] text-amber-800 font-medium text-center block">
                                                    Dijadwalkan aktif pada {pendingDowngrade?.effective_at || activeMembership.downgrade_at}
                                                </span>
                                            </div>
                                        ) : tier.isDowngrade ? (
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => openDowngradeModal(tier)}
                                                    className="w-full min-h-12 py-3 px-5 rounded-full text-xs font-semibold bg-white text-[#1f3731] border border-[#b2cfc1] hover:bg-[#f1f7f4] hover:border-[#86b5a0] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 text-center group"
                                                >
                                                    <span className="material-symbols-outlined text-[16px] text-emerald-700 group-hover:translate-y-0.5 transition-transform">
                                                        schedule_send
                                                    </span>
                                                    <span>Turunkan ke {tier.name}</span>
                                                </button>
                                                <span className="text-[10px] text-[#5f736c] mt-1.5 block text-center">
                                                    Model Netflix: Tetap nikmati paket lama hingga siklus berakhir
                                                </span>
                                            </div>
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
                                                        <span>Tingkatkan ke {tier.name}</span>
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
                            <span className="material-symbols-outlined text-primary text-2xl">event_repeat</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Fleksibilitas Netflix</span>
                            <span className="text-[10px] text-[#637671] block">Turunkan atau batalkan paket kapan saja</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">QRIS &amp; Virtual Account</span>
                            <span className="text-[10px] text-[#637671] block">Midtrans Snap resmi &amp; instan</span>
                        </div>
                        <div className="p-2 space-y-1">
                            <span className="material-symbols-outlined text-primary text-2xl">notifications_active</span>
                            <span className="font-semibold text-[#182926] block text-[11px]">Notifikasi Otomatis</span>
                            <span className="text-[10px] text-[#637671] block">Konfirmasi instan saat pembayaran selesai</span>
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

                        <div className="overflow-x-auto rounded-3xl border border-[#d8e6df] bg-white shadow-2xs">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-[#e2ece6] bg-[#f2f8f4]">
                                        <th className="p-4 sm:p-5 font-semibold text-[#1f332c] w-1/3">Fitur &amp; Kapabilitas</th>
                                        {tiers.map((t) => (
                                            <th key={t.id || t.slug} className="p-4 sm:p-5 text-center font-serif text-sm font-bold text-[#142320]">
                                                <div>{t.name}</div>
                                                <div className="text-[11px] font-sans font-normal text-[#60746d] mt-0.5">{t.priceFormatted}</div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#edf4f0]">
                                    {comparisonCategories.map((cat, catIdx) => (
                                        <React.Fragment key={catIdx}>
                                            <tr className="bg-[#f9fcfb]">
                                                <td colSpan={tiers.length + 1} className="p-3 sm:px-5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1c6454] bg-[#edf5f0]">
                                                    {cat.category}
                                                </td>
                                            </tr>
                                            {cat.items.map((item, itemIdx) => (
                                                <tr key={itemIdx} className="hover:bg-[#f6faf8] transition-colors">
                                                    <td className="p-3.5 sm:p-4 text-[#334640] font-medium">{item.name}</td>
                                                    {tiers.map((t) => {
                                                        const val = item.checker(t);
                                                        return (
                                                            <td key={t.id || t.slug} className="p-3.5 sm:p-4 text-center">
                                                                {val === 'Tersedia' || val === 'Tanpa Batas' ? (
                                                                    <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
                                                                        <span className="material-symbols-outlined text-[16px] text-emerald-700">check_circle</span>
                                                                        <span>{val}</span>
                                                                    </span>
                                                                ) : val === 'Tidak Termasuk' ? (
                                                                    <span className="material-symbols-outlined text-[#a2b5ac] text-[16px]">remove</span>
                                                                ) : (
                                                                    <span className="font-mono text-[11px] font-bold text-[#182926]">{val}</span>
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

                    {/* FAQ Accordion Section */}
                    <div className="max-w-3xl mx-auto space-y-6 pt-4">
                        <div className="text-center space-y-1.5">
                            <span className="text-[11px] uppercase tracking-wider text-primary font-medium block">
                                Tanya Jawab Umum
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#142320]">
                                Pertanyaan Seputar Paket &amp; Transaksi
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {packageFaqs.map((faq, idx) => {
                                const isOpen = faqOpenIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        className="rounded-2xl border border-[#d8e6df] bg-white transition-all overflow-hidden shadow-2xs"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#f8fbf9] transition-colors"
                                        >
                                            <span className="text-xs sm:text-sm font-semibold text-[#142320]">
                                                {faq.q}
                                            </span>
                                            <span
                                                className={`material-symbols-outlined text-[20px] text-primary transition-transform duration-200 shrink-0 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            >
                                                expand_more
                                            </span>
                                        </button>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${
                                                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-[#51655f] leading-relaxed border-t border-[#edf4f0]/80">
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

            {/* Netflix-Style Downgrade Confirmation Modal */}
            {downgradeModalOpen && selectedDowngradeTier && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="downgrade-modal-title"
                >
                    <div 
                        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-surface-container overflow-hidden space-y-0 max-h-[90vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-5 sm:p-6 bg-linear-to-r from-[#00433e] to-[#0f5c56] text-white flex items-start justify-between gap-3 shrink-0">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-mono font-bold tracking-wider uppercase">
                                    <span className="material-symbols-outlined text-[13px] text-amber-300">event_repeat</span>
                                    <span>Model Transisi Fleksibel Netflix</span>
                                </div>
                                <h3 id="downgrade-modal-title" className="font-serif text-xl sm:text-2xl font-bold">
                                    Penurunan Paket Langganan
                                </h3>
                                <p className="text-white/80 text-xs leading-relaxed">
                                    Anda tidak akan kehilangan hak akses yang sudah dibayar. Benefit tetap berlaku hingga akhir siklus.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setDowngradeModalOpen(false)}
                                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors shrink-0"
                                aria-label="Tutup modal penurunan paket"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Modal Body (Scrollable) */}
                        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left text-xs text-[#20342e]">
                            {/* Plan Comparison Box */}
                            <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#d6e9de] grid grid-cols-2 gap-3 items-center">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-[#5f746d] uppercase font-bold block">Paket Saat Ini</span>
                                    <div className="font-serif font-bold text-sm text-[#142320] truncate">{currentTierName}</div>
                                    <div className="text-[11px] font-mono font-semibold text-primary">
                                        {currentTierPrice > 0 ? `Rp ${currentTierPrice.toLocaleString('id-ID')} / bln` : 'Gratis'}
                                    </div>
                                </div>
                                <div className="space-y-1 border-l border-[#d6e9de] pl-3">
                                    <span className="text-[10px] font-mono text-[#5f746d] uppercase font-bold block">Paket Baru Tujuan</span>
                                    <div className="font-serif font-bold text-sm text-emerald-800 truncate">{selectedDowngradeTier.name}</div>
                                    <div className="text-[11px] font-mono font-semibold text-emerald-800">
                                        {selectedDowngradeTier.totalPrice > 0 ? `Rp ${selectedDowngradeTier.totalPrice.toLocaleString('id-ID')} / bln` : 'Gratis'}
                                    </div>
                                </div>
                            </div>

                            {/* Netflix-style 3-Point Guarantee Timeline */}
                            <div className="space-y-2.5">
                                <span className="text-[11px] font-bold text-[#142320] block">
                                    Jaminan Transparansi Penagihan:
                                </span>
                                <div className="space-y-2">
                                    <div className="p-3 rounded-xl bg-white border border-[#dce9e1] flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">verified_user</span>
                                        <div className="space-y-0.5">
                                            <span className="font-semibold block text-[11px] text-[#142320]">
                                                1. Akses Penuh Tetap Berjalan
                                            </span>
                                            <span className="text-[11px] text-[#556963] block leading-relaxed">
                                                Hingga <strong>{activeMembership.ends_at || 'akhir periode penagihan'}</strong>, Anda tetap memegang seluruh kuota konsultasi medis dan pemindai label tanpa ada pemotongan.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-white border border-[#dce9e1] flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0 mt-0.5">event</span>
                                        <div className="space-y-0.5">
                                            <span className="font-semibold block text-[11px] text-[#142320]">
                                                2. Transisi Otomatis di Tanggal Efektif
                                            </span>
                                            <span className="text-[11px] text-[#556963] block leading-relaxed">
                                                Mulai <strong>{activeMembership.ends_at || 'akhir periode'}</strong>, akun Anda otomatis berpindah ke {selectedDowngradeTier.name}. Penagihan tarif lama resmi dihentikan.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-xl bg-white border border-[#dce9e1] flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-amber-700 text-[18px] shrink-0 mt-0.5">undo</span>
                                        <div className="space-y-0.5">
                                            <span className="font-semibold block text-[11px] text-[#142320]">
                                                3. Bebas Batalkan Kapan Saja
                                            </span>
                                            <span className="text-[11px] text-[#556963] block leading-relaxed">
                                                Berubah pikiran? Anda dapat membatalkan penurunan paket ini kapan pun sebelum tanggal efektif dengan satu klik ("Keep Current Plan").
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timing Option Radio */}
                            <div className="space-y-2">
                                <span className="text-[11px] font-bold text-[#142320] block">
                                    Pilih Waktu Pemberlakuan:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                                        downgradeMode === 'SCHEDULED' 
                                            ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20' 
                                            : 'bg-white border-[#dbe7e0] hover:bg-[#f6faf8]'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="downgrade_mode"
                                            value="SCHEDULED"
                                            checked={downgradeMode === 'SCHEDULED'}
                                            onChange={() => setDowngradeMode('SCHEDULED')}
                                            className="mt-0.5 text-primary focus:ring-primary"
                                        />
                                        <div className="space-y-0.5">
                                            <span className="font-bold block text-[11px] text-[#142320]">
                                                Di Akhir Siklus (Rekomendasi)
                                            </span>
                                            <span className="text-[10px] text-[#5a6e67] block">
                                                Berlaku mulai {activeMembership.ends_at || 'akhir periode'}. Nikmati kuota lama sampai habis.
                                            </span>
                                        </div>
                                    </label>

                                    <label className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                                        downgradeMode === 'IMMEDIATE' 
                                            ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20' 
                                            : 'bg-white border-[#dbe7e0] hover:bg-[#f6faf8]'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="downgrade_mode"
                                            value="IMMEDIATE"
                                            checked={downgradeMode === 'IMMEDIATE'}
                                            onChange={() => setDowngradeMode('IMMEDIATE')}
                                            className="mt-0.5 text-primary focus:ring-primary"
                                        />
                                        <div className="space-y-0.5">
                                            <span className="font-bold block text-[11px] text-[#142320]">
                                                Terapkan Langsung Hari Ini
                                            </span>
                                            <span className="text-[10px] text-[#5a6e67] block">
                                                Beralih seketika sekarang juga ke kuota dan fitur {selectedDowngradeTier.name}.
                                            </span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Optional Survey Feedback */}
                            <div className="space-y-2">
                                <span className="text-[11px] font-bold text-[#142320] block">
                                    Alasan Penurunan Paket (Opsional):
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {[
                                        'Menyesuaikan anggaran',
                                        'Kebutuhan konsultasi tercapai',
                                        'Fitur melebihi kebutuhan harian',
                                        'Ingin istirahat sejenak',
                                    ].map((reason) => (
                                        <button
                                            key={reason}
                                            type="button"
                                            onClick={() => setDowngradeReason(downgradeReason === reason ? '' : reason)}
                                            className={`px-2.5 py-1 rounded-full text-[11px] border transition-all cursor-pointer ${
                                                downgradeReason === reason
                                                    ? 'bg-primary text-white border-primary font-bold shadow-2xs'
                                                    : 'bg-white text-[#455b54] border-[#d4e3dc] hover:bg-[#f1f7f4]'
                                            }`}
                                        >
                                            {reason}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Actions Footer */}
                        <div className="p-4 sm:p-5 bg-[#f6faf8] border-t border-[#d8e6df] flex flex-col sm:flex-row items-center justify-end gap-2.5 shrink-0">
                            <button
                                type="button"
                                onClick={() => setDowngradeModalOpen(false)}
                                disabled={isSubmittingDowngrade}
                                className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs font-semibold text-[#3b524b] hover:bg-[#e6efe9] transition-colors cursor-pointer text-center"
                            >
                                Tetap di {currentTierName}
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDowngrade}
                                disabled={isSubmittingDowngrade}
                                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-bold bg-[#142320] text-white hover:bg-[#253934] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                            >
                                {isSubmittingDowngrade ? (
                                    <>
                                        <span className="material-symbols-outlined text-[15px] animate-spin">refresh</span>
                                        <span>Menyimpan Jadwal...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                        <span>Konfirmasi Turunkan Paket</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MarketingLayout>
    );
}
