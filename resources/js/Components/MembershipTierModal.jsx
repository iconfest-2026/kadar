import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePage } from '@inertiajs/react';

// Fallback tiers mirroring exact database configuration
const SYSTEM_FALLBACK_TIERS = [
    {
        id: 4,
        name: 'Silver (Gratis)',
        slug: 'silver',
        price: 0,
        admin_fee: 0,
        calculated_admin_fee: 0,
        total_price: 0,
        max_scanner: 10,
        max_consultations: 0,
        badge_text: 'Akses Esensial Mandiri',
        is_popular: false,
        description: 'Fondasi skrining mandiri label pangan, buku harian glukosa darah, dan edukasi preventif tanpa biaya.',
    },
    {
        id: 5,
        name: 'PERAK',
        slug: 'perak',
        price: 90000,
        admin_fee: 4000,
        calculated_admin_fee: 4000,
        total_price: 94000,
        max_scanner: -1,
        max_consultations: 0,
        badge_text: 'Paling Rekomen',
        is_popular: true,
        description: 'Akses scanner OCR makanan dan obat tanpa batas ditambah paket glukometer mandiri diantar ke rumah.',
    },
    {
        id: 2,
        name: 'Gold Sehat',
        slug: 'gold',
        price: 99000,
        admin_fee: 4000,
        calculated_admin_fee: 4000,
        total_price: 103000,
        max_scanner: 50,
        max_consultations: 2,
        badge_text: 'Paling Diminati',
        is_popular: true,
        description: 'Program terstruktur untuk pembalikan pra-diabetes, penurunan resistensi insulin, dan telekonsultasi dokter.',
    },
    {
        id: 3,
        name: 'Platinum VIP Klinis',
        slug: 'platinum',
        price: 249000,
        admin_fee: 4000,
        calculated_admin_fee: 4000,
        total_price: 253000,
        max_scanner: -1,
        max_consultations: 6,
        badge_text: 'Pendampingan Spesialis VIP',
        is_popular: false,
        description: 'Bimbingan klinis intensif 1-on-1 bersama Dokter Spesialis Penyakit Dalam (Sp.PD) untuk kondisi metabolisme kompleks.',
    },
];

// Helper to provide realistic feature defaults if tier has no features defined in DB
const getDefaultFeatures = (t) => {
    const slug = (t.slug || '').toLowerCase();
    const maxScanner = Number(t.max_scanner ?? 0);
    const maxConsultations = Number(t.max_consultations ?? 0);

    if (slug === 'silver' || slug === 'free') {
        return [
            { text: maxScanner === -1 ? 'Scan Nutrisi & Obat BPOM Tanpa Batas' : `${maxScanner > 0 ? maxScanner : 10}x Scan Nutrisi & BPOM / hari`, active: true },
            { text: 'Pencatatan metrik harian (Gula Darah, Tidur, Langkah)', active: true },
            { text: 'Deteksi Beban Glikemik & Gramatur Gula Instan', active: true },
            { text: 'Konsultasi Asisten AI Preventif Medis Terverifikasi', active: true },
            { text: 'Akses Siaga Panggilan Darurat Ambulans 119', active: true },
            { text: 'Forum Diskusi Komunitas & Edukasi Pasien Publik', active: true },
            { text: 'Prediksi Lonjakan Glikemik Makanan Spesifik (Kurva 2 Jam)', active: false },
            { text: 'Rencana Intervensi Gizi Mingguan Dipersonalisasi', active: false },
            { text: 'Sesi Telekonsultasi Instruktur Gizi Klinis per Bulan', active: false },
            { text: 'Jalur Prioritas Dokter Spesialis Sp.PD (1-on-1)', active: false },
            { text: 'Analisis Hasil Lab Darah (HbA1c & Profil Lipid)', active: false },
            { text: 'Dedicated Personal Health Coach 24/7', active: false },
        ];
    }

    if (slug === 'perak') {
        return [
            { text: 'Semua kapabilitas dasar paket Silver', active: true },
            { text: maxScanner === -1 ? 'Scan Kamera Gizi & BPOM UNLIMITED' : `${maxScanner}x Scan Kamera Gizi / hari`, active: true },
            { text: 'Starter Kit Glukometer Mandiri Diantar ke Rumah', active: true },
            { text: 'Program Tantangan Remisi 14-90 Hari (Pedoman PERKENI)', active: true },
            { text: 'Prediksi Lonjakan Glikemik Makanan (Kurva 2 Jam)', active: true },
            { text: 'Laporan Evaluasi Progres Bulanan Format PDF', active: true },
            { text: maxConsultations > 0 ? `${maxConsultations}x Sesi Telekonsultasi Dokter / bln` : 'Jadwal Konsultasi Dokter Spesialis Terjadwal', active: maxConsultations > 0 },
            { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', active: false },
            { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Lipid)', active: false },
        ];
    }

    if (slug === 'gold') {
        return [
            { text: 'Semua kapabilitas paket Silver & Dasar', active: true },
            { text: maxScanner === -1 ? 'Scan Kamera OCR Tanpa Batas' : `${maxScanner > 0 ? maxScanner : 50}x Scan Nutrisi & BPOM / hari`, active: true },
            { text: `${maxConsultations > 0 ? maxConsultations : 2}x Sesi Konsultasi Dokter Spesialis / bln`, active: true },
            { text: 'Rencana Intervensi Gizi & Menu Presisi Personal', active: true },
            { text: 'Akses Penuh Program Tantangan Remisi 14-90 Hari', active: true },
            { text: 'Prediksi Lonjakan Glikemik & Analisis Kurva 2 Jam', active: true },
            { text: 'Laporan Perkembangan Bulanan Terstandar Medis', active: true },
            { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', active: false },
            { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Profil Lipid)', active: false },
            { text: 'Ekspor Resume Medis PDF Terstandar Faskes & Rujukan', active: false },
            { text: 'Dedicated Personal Health Coach & Review Mingguan', active: false },
            { text: 'Hotline Tim Medis Siaga Prioritas 24/7', active: false },
        ];
    }

    if (slug === 'platinum') {
        return [
            { text: 'Semua kapabilitas komprehensif paket Gold & Dasar', active: true },
            { text: 'Scan Nutrisi & Obat BPOM UNLIMITED Bebas Batas', active: true },
            { text: 'Jalur Konsultasi Prioritas Dokter Spesialis Sp.PD (1-on-1)', active: true },
            { text: `${maxConsultations > 0 ? maxConsultations : 6}x Sesi Konsultasi Dokter Spesialis / bln`, active: true },
            { text: 'Analisis Mendalam Hasil Lab Darah (HbA1c & Lipid)', active: true },
            { text: 'Resume Medis PDF Terstandar Rumah Sakit & Rujukan', active: true },
            { text: 'Dedicated Personal Health Coach & Review Mingguan', active: true },
            { text: 'Hotline Tim Medis Siaga Prioritas 24/7', active: true },
            { text: 'Jalur Koordinasi Ambulans 119 dengan Riwayat Klinis Instan', active: true },
            { text: 'Rencana Intervensi Gizi & Menu Presisi Personal Khusus', active: true },
            { text: 'Program Tantangan Remisi Intensif Klinis Terpandu', active: true },
            { text: 'Akses Jalur Cepat Tindakan Klinis & Integrasi SatuSehat', active: true },
        ];
    }

    // Dynamic generation for custom admin tiers
    const list = [];
    if (maxScanner === -1) {
        list.push({ text: 'Pemindai Kamera Gizi & Obat BPOM Tanpa Batas (Unlimited)', active: true });
    } else if (maxScanner > 0) {
        list.push({ text: `${maxScanner}x Pemindai Kamera Gizi & BPOM / hari`, active: true });
    } else {
        list.push({ text: 'Akses Pencatatan Metrik Dasar', active: true });
    }

    if (maxConsultations === -1) {
        list.push({ text: 'Konsultasi Tim Dokter Spesialis Tanpa Batas', active: true });
    } else if (maxConsultations > 0) {
        list.push({ text: `${maxConsultations}x Sesi Konsultasi Dokter Terjadwal / bulan`, active: true });
    } else {
        list.push({ text: 'Konsultasi Dokter Spesialis Terjadwal', active: false });
    }

    list.push({ text: 'Asisten AI Preventif Medis 24/7', active: true });
    list.push({ text: 'Pencatatan Riwayat Biomarker & Tren Kestabilan', active: true });
    list.push({ text: 'Akses Siaga Panggilan Darurat Ambulans 119', active: true });
    list.push({ text: 'Laporan Evaluasi Progres Terstandar Kemenkes', active: true });

    return list;
};

// Helper to safely parse features avoiding React object child rendering errors
const parseFeatures = (t) => {
    if (Array.isArray(t.features) && t.features.length > 0) {
        return t.features.map((feat) => {
            if (typeof feat === 'string') {
                return { text: feat, active: true };
            }
            if (typeof feat === 'object' && feat !== null) {
                return {
                    text: feat.text || feat.name || feat.title || JSON.stringify(feat),
                    active: feat.active !== false && feat.included !== false,
                };
            }
            return { text: String(feat), active: true };
        });
    }
    return getDefaultFeatures(t);
};

export default function MembershipTierModal({ isOpen, onClose, currentTier = null, availableTiers = [] }) {
    const [mounted, setMounted] = useState(false);
    const { membership, midtrans } = usePage().props;
    const [processingTierId, setProcessingTierId] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: string }

    useEffect(() => {
        setMounted(true);
    }, []);

    // Keyboard navigation (Esc to close) & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    // Pick tiers dynamically: prefer passed prop, then inertia shared membership tiers, then fallback
    const rawTiers = (Array.isArray(availableTiers) && availableTiers.length > 0)
        ? availableTiers
        : ((Array.isArray(membership?.active_tiers) && membership.active_tiers.length > 0)
            ? membership.active_tiers
            : ((Array.isArray(membership?.all_tiers) && membership.all_tiers.length > 0)
                ? membership.all_tiers
                : SYSTEM_FALLBACK_TIERS));

    // Determine currently active tier with multiple fallback matching
    const checkIsCurrentTier = (t) => {
        if (typeof t.is_current === 'boolean') {
            return t.is_current;
        }

        const activeTierId = membership?.tier_id || (typeof currentTier === 'object' ? currentTier?.id : null);
        if (activeTierId && t.id && Number(t.id) === Number(activeTierId)) {
            return true;
        }

        const activeSlug = (
            membership?.current_tier_slug ||
            (typeof currentTier === 'object' ? currentTier?.slug : null) ||
            (typeof currentTier === 'string' ? currentTier : '')
        ).trim().toLowerCase();

        const tSlug = (t.slug || '').trim().toLowerCase();
        if (activeSlug && tSlug && (activeSlug === tSlug || activeSlug.startsWith(tSlug) || tSlug.startsWith(activeSlug))) {
            return true;
        }

        const activeName = (
            membership?.current_tier ||
            (typeof currentTier === 'object' ? currentTier?.name : null) ||
            (typeof currentTier === 'string' ? currentTier : '')
        ).trim().toLowerCase();

        const tName = (t.name || '').trim().toLowerCase();
        if (activeName && tName && (activeName === tName || activeName.includes(tName) || tName.includes(activeName))) {
            return true;
        }

        return false;
    };

    // Normalize tiers data
    const tiers = rawTiers.map((t) => {
        const basePrice = Number(t.price || 0);
        const adminFee = Number(t.calculated_admin_fee ?? t.admin_fee ?? 0);
        const totalPrice = Number(t.total_price || (basePrice + adminFee));

        return {
            id: t.id,
            name: t.name,
            slug: t.slug,
            basePrice,
            adminFee,
            totalPrice,
            price: totalPrice === 0 ? 'Gratis' : `Rp ${totalPrice.toLocaleString('id-ID')}`,
            basePriceFormatted: `Rp ${basePrice.toLocaleString('id-ID')}`,
            adminFeeFormatted: `Rp ${adminFee.toLocaleString('id-ID')}`,
            period: basePrice === 0 ? 'selamanya' : '/ bulan',
            description: t.description || 'Program kesehatan preventif terpadu AEVYRA.',
            badge: t.badge_text,
            isPopular: Boolean(t.is_popular),
            maxConsultations: t.max_consultations,
            maxScanner: t.max_scanner,
            features: parseFeatures(t),
            isCurrent: checkIsCurrentTier(t),
        };
    });

    // Helper to ensure Midtrans Snap is ready
    const ensureSnapLoaded = (serverClientKey) => {
        return new Promise((resolve) => {
            if (window.snap && typeof window.snap.pay === 'function') {
                return resolve(true);
            }

            const clientKey = serverClientKey || midtrans?.client_key || 'Mid-client-o8FP06N-oie4kS_V';
            const snapUrl = midtrans?.snap_url || 'https://app.sandbox.midtrans.com/snap/snap.js';

            let script = document.getElementById('midtrans-snap-script');
            if (script) {
                if (window.snap && typeof window.snap.pay === 'function') {
                    return resolve(true);
                }
                script.addEventListener('load', () => resolve(true));
                setTimeout(() => resolve(Boolean(window.snap && typeof window.snap.pay === 'function')), 1500);
                return;
            }

            script = document.createElement('script');
            script.id = 'midtrans-snap-script';
            script.src = snapUrl;
            script.setAttribute('data-client-key', clientKey);
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Checkout / Upgrade Handler
    const handleUpgrade = async (tierItem) => {
        setProcessingTierId(tierItem.id || tierItem.slug);
        setStatusMessage(null);

        try {
            const getCookie = (name) => {
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = metaToken || xsrfToken || '';

            const res = await fetch(`/member/memberships/${tierItem.slug || tierItem.id}/checkout`, {
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

            if (res.status === 419) {
                throw new Error('Sesi keamanan Anda telah berakhir. Halaman akan dimuat ulang...');
            }

            if (res.status === 401) {
                window.location.href = '/login';
                return;
            }

            let data = {};
            try {
                data = await res.json();
            } catch (e) {
                // Non-JSON response
            }

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Gagal memulai transaksi pembayaran paket.');
            }

            // Free tier instant activation
            if (data.is_free) {
                setStatusMessage({
                    type: 'success',
                    text: `Berhasil! Paket ${tierItem.name} telah aktif di akun Anda.`,
                });
                setTimeout(() => {
                    onClose();
                    window.location.reload();
                }, 1600);
                return;
            }

            // Midtrans Snap Checkout
            if (data.snap_token) {
                await ensureSnapLoaded(data.client_key);

                if (window.snap && typeof window.snap.pay === 'function') {
                    window.snap.pay(data.snap_token, {
                        onSuccess: async function () {
                            setStatusMessage({
                                type: 'success',
                                text: `🎉 Pembayaran berhasil diverifikasi! Paket ${tierItem.name} Anda telah aktif dan notifikasi resmi telah dikirim.`,
                            });

                            // Instant authoritative DB verification & notification generation
                            try {
                                const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
                                const xsrfToken = getCookie('XSRF-TOKEN');
                                const csrfToken = metaToken || xsrfToken || '';
                                await fetch('/member/memberships/verify', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'X-CSRF-TOKEN': csrfToken,
                                        'X-Requested-With': 'XMLHttpRequest',
                                    },
                                    body: JSON.stringify({ order_id: data.order_id }),
                                });
                            } catch (err) {
                                console.warn('Instant sync ping:', err);
                            }

                            setTimeout(() => {
                                onClose();
                                window.location.reload();
                            }, 1400);
                        },
                        onPending: function () {
                            setStatusMessage({
                                type: 'info',
                                text: `Pesanan paket ${tierItem.name} berhasil dibuat. Silakan selesaikan pembayaran sesuai petunjuk Midtrans.`,
                            });
                            setTimeout(() => {
                                onClose();
                                window.location.reload();
                            }, 3000);
                        },
                        onError: function () {
                            setStatusMessage({
                                type: 'error',
                                text: 'Pembayaran dibatalkan atau terjadi penolakan dari gateway pembayaran Midtrans.',
                            });
                            setProcessingTierId(null);
                        },
                        onClose: function () {
                            setProcessingTierId(null);
                        },
                    });
                } else if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    throw new Error('SDK pembayaran Midtrans Snap tidak dapat dimuat. Silakan periksa koneksi internet Anda.');
                }
            }
        } catch (err) {
            setStatusMessage({
                type: 'error',
                text: err.message || 'Terjadi gangguan saat menghubungkan ke gateway pembayaran.',
            });
            setProcessingTierId(null);
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-surface rounded-3xl max-w-6xl w-full shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[92vh] animate-scale-up my-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:p-6 bg-surface-container-low border-b border-surface-container flex items-start justify-between gap-3 shrink-0">
                    <div className="min-w-0 flex-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                            <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                            <span>TINGKATAN KEANGGOTAAN PREVENTIF</span>
                        </div>
                        <h3 className="font-heading font-black text-base sm:text-xl text-on-surface">
                            Tingkatan Akses & Kuota Layanan AEVYRA
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-2 sm:line-clamp-none">
                            Pilihan tingkatan keanggotaan dan pendampingan kesehatan preventif AEVYRA.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 shrink-0 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                        aria-label="Tutup Modal"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Plans Comparison Body */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
                    {/* Status Alert Messages */}
                    {statusMessage && (
                        <div
                            className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-2 animate-fade-in ${
                                statusMessage.type === 'success'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                                    : statusMessage.type === 'info'
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
                                    : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    {statusMessage.type === 'success' ? 'check_circle' : statusMessage.type === 'info' ? 'info' : 'error'}
                                </span>
                                <span>{statusMessage.text}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setStatusMessage(null)}
                                className="cursor-pointer opacity-70 hover:opacity-100"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    {/* Cards Grid: Dynamic 1 / 2 / 4 Columns */}
                    <div className={`grid grid-cols-1 sm:grid-cols-2 ${tiers.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}>
                        {tiers.map((t) => {
                            const isProcessingThis = processingTierId === (t.id || t.slug);
                            return (
                                <div
                                    key={t.id || t.slug || t.name}
                                    className={`rounded-3xl border p-4 sm:p-5 flex flex-col justify-between transition-all bg-white dark:bg-surface relative ${
                                        t.isPopular
                                            ? 'border-primary ring-2 ring-primary/20 shadow-xs'
                                            : 'border-surface-container hover:border-primary/30'
                                    }`}
                                >
                                    {t.isPopular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white font-bold text-[9px] uppercase tracking-wider shadow-xs whitespace-nowrap">
                                            {t.badge || 'Paling Diminati'}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        {/* Card Title & Badges */}
                                        <div className="flex items-center justify-between gap-1">
                                            <h4 className="font-heading font-black text-sm sm:text-base text-on-surface truncate" title={t.name}>
                                                {t.name}
                                            </h4>
                                            {t.isCurrent ? (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-label-mono font-bold bg-primary/10 text-primary shrink-0">
                                                    Paket Aktif
                                                </span>
                                            ) : t.badge && !t.isPopular ? (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-surface-container-high text-on-surface-variant border border-surface-container shrink-0">
                                                    {t.badge}
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Pricing Box */}
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl sm:text-2xl font-black font-mono text-on-surface">
                                                    {t.price}
                                                </span>
                                                <span className="text-xs text-on-surface-variant font-medium">{t.period}</span>
                                            </div>

                                            {t.basePrice > 0 && (
                                                <div className="mt-1.5 p-2 rounded-xl bg-surface-container-low border border-primary/10 flex items-center justify-between text-[10px]">
                                                    <span className="text-on-surface-variant">
                                                        Pokok: <strong className="text-on-surface">{t.basePriceFormatted}</strong>
                                                    </span>
                                                    <span className="text-teal-700 dark:text-teal-400 font-mono font-bold">
                                                        + Biaya Admin: {t.adminFeeFormatted}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="text-[11px] text-on-surface-variant leading-relaxed min-h-7.5">
                                            {t.description}
                                        </p>

                                        {/* Quota Quick Summary */}
                                        {(t.maxConsultations !== undefined || t.maxScanner !== undefined) && (
                                            <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-surface-container-low/60 border border-surface-container text-[10px]">
                                                <div>
                                                    <span className="text-on-surface-variant block text-[9px]">Konsultasi:</span>
                                                    <span className="font-bold text-primary truncate block">
                                                        {t.maxConsultations === -1 ? 'Bebas Batas' : (t.maxConsultations > 0 ? `${t.maxConsultations}x / bln` : '0 Sesi')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-on-surface-variant block text-[9px]">Scanner OCR:</span>
                                                    <span className="font-bold text-primary truncate block">
                                                        {t.maxScanner === -1 ? 'Unlimited' : (t.maxScanner > 0 ? `${t.maxScanner}x / hari` : '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Features List */}
                                        <div className="pt-3 border-t border-surface-container space-y-2 text-xs">
                                            {t.features.map((feat, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-start gap-2 ${
                                                        feat.active ? 'text-on-surface' : 'text-on-surface-variant/40'
                                                    }`}
                                                >
                                                    <span className={`material-symbols-outlined text-[16px] shrink-0 ${
                                                        feat.active ? 'text-primary' : 'text-surface-container'
                                                    }`}>
                                                        {feat.active ? 'check_circle' : 'close'}
                                                    </span>
                                                    <span className={`text-[11px] leading-tight ${!feat.active ? 'line-through' : ''}`}>
                                                        {feat.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4 mt-3 border-t border-surface-container">
                                        {t.isCurrent ? (
                                            <button
                                                type="button"
                                                disabled
                                                className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-bold text-xs cursor-default text-center"
                                            >
                                                Paket Aktif Saat Ini
                                            </button>
                                        ) : Number(membership?.current_tier_price || 0) > 0 && t.basePrice < Number(membership?.current_tier_price || 0) ? (
                                            <a
                                                href="/paket"
                                                className="w-full py-2.5 rounded-xl font-bold text-xs text-center transition-all shadow-2xs border border-[#b2cfc1] bg-white text-[#1f3731] hover:bg-[#f1f7f4] flex items-center justify-center gap-1.5 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[15px] text-emerald-700">schedule_send</span>
                                                <span>Turunkan ke {t.name}</span>
                                            </a>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleUpgrade(t)}
                                                disabled={Boolean(processingTierId)}
                                                className={`w-full py-2.5 rounded-xl font-bold text-xs text-center transition-all shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${
                                                    isProcessingThis
                                                        ? 'bg-primary/70 text-white cursor-wait'
                                                        : t.totalPrice === 0
                                                        ? 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                                                        : 'bg-primary hover:bg-primary-container text-white'
                                                }`}
                                            >
                                                {isProcessingThis ? (
                                                    <>
                                                        <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                                                        <span>Menghubungkan Pembayaran...</span>
                                                    </>
                                                ) : t.totalPrice === 0 ? (
                                                    <span>Aktifkan {t.name}</span>
                                                ) : (
                                                    <span>Pilih & Bayar {t.name}</span>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Utilities */}
                <div className="p-4 bg-surface-container-low border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-on-surface-variant text-center sm:text-left shrink-0">
                    <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0">lock</span>
                        <span>Transaksi aman terenkripsi perbankan berizin Bank Indonesia.</span>
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="font-bold text-primary hover:underline cursor-pointer shrink-0"
                    >
                        Tutup Modal
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
