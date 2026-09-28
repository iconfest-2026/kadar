import React, { useState } from 'react';

const FALLBACK_TIERS = [
    {
        name: 'Silver',
        slug: 'silver',
        price: 'Gratis',
        period: 'Selamanya',
        description: 'Fondasi pencatatan preventif harian untuk memulai evaluasi gaya hidup sehat.',
        features: [
            { text: '3x Scan Kamera Gizi & Obat / hari', active: true },
            { text: 'Pencatatan metrik harian (Gula, Tidur, Langkah)', active: true },
            { text: 'Konsultasi Tanya Jawab AI Dasar (5 sesi/hari)', active: true },
            { text: 'Akses Komunitas & Forum Diskusi Publik', active: true },
            { text: 'Konsultasi Dokter Spesialis Terjadwal', active: false },
            { text: 'Simulasi Lengkap Kurva Beban Glikemik (GL)', active: false },
            { text: 'Instruktur Pendamping Medis Terverifikasi', active: false },
        ],
    },
    {
        name: 'Gold',
        slug: 'gold',
        price: 'Rp 79.000',
        period: '/ bulan',
        description: 'Paling populer untuk pencegahan pra-diabetes dan optimasi metabolik mandiri terpandu.',
        popular: true,
        features: [
            { text: '15x Scan Kamera Gizi & Obat / hari', active: true },
            { text: '4x Konsultasi Terjadwal Bersama Dokter/Spesialis Gizi', active: true },
            { text: 'AI Asisten Preventif 24/7 Tanpa Batas', active: true },
            { text: 'Simulasi Lengkap Kurva Glukosa & Beban Glikemik (GL)', active: true },
            { text: 'Akses Penuh Program Tantangan 14-90 Hari PERKENI', active: true },
            { text: 'Laporan Perkembangan Bulanan Terstandar Kemenkes', active: true },
            { text: 'Instruktur Pendamping Medis Terverifikasi', active: false },
        ],
    },
    {
        name: 'Platinum',
        slug: 'platinum',
        price: 'Rp 199.000',
        period: '/ bulan',
        description: 'Paket VIP paripurna dengan bimbingan dokter spesialis pribadi & ambulans terhubung.',
        features: [
            { text: 'Scan Kamera Gizi & Obat UNLIMITED (Bebas Batas)', active: true },
            { text: '8x Konsultasi Dokter & Spesialis Gizi Klinis (Sp.GK)', active: true },
            { text: 'Dedicated Personal Health Coach & Intervensi Kustom', active: true },
            { text: 'Akses Jalur Cepat Ambulans 119 dengan Riwayat Medis Instan', active: true },
            { text: 'Laporan Klinis Komprehensif Berstandar Rumah Sakit', active: true },
            { text: 'Prediksi Hormonal & Siklus AI Tingkat Lanjut', active: true },
            { text: 'Status Eksklusif di Komunitas Pejuang Sehat AEVYRA', active: true },
        ],
    },
];

export default function MembershipTierModal({ isOpen, onClose, currentTier = 'Gold', availableTiers = [] }) {
    const [selectedTier, setSelectedTier] = useState(currentTier);
    const [upgrading, setUpgrading] = useState(false);
    const [upgradeSuccess, setUpgradeSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    if (!isOpen) return null;

    const tiers = availableTiers && availableTiers.length > 0
        ? availableTiers.map((t) => ({
            id: t.id,
            name: t.name,
            slug: t.slug,
            price: Number(t.total_price || t.price) === 0 ? 'Gratis' : `Rp ${Number(t.total_price || t.price).toLocaleString('id-ID')}`,
            adminFee: Number(t.calculated_admin_fee || 0),
            period: Number(t.price) === 0 ? 'Selamanya' : '/ bulan',
            description: t.description || 'Layanan kesehatan preventif terpadu AEVYRA.',
            popular: Boolean(t.is_popular),
            features: Array.isArray(t.features) && t.features.length > 0
                ? t.features.map((feat) => ({ text: feat, active: true }))
                : (FALLBACK_TIERS.find((ft) => ft.slug === t.slug)?.features || []),
        }))
        : FALLBACK_TIERS;

    const handleUpgrade = async (tierItem) => {
        setUpgrading(true);
        setErrorMessage(null);

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

            let data = {};
            try {
                data = await res.json();
            } catch (e) {
                // Non-JSON response
            }

            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Gagal memulai transaksi checkout Midtrans.');
            }

            // Free tier activation
            if (data.is_free) {
                setUpgradeSuccess(true);
                setSelectedTier(tierItem.name);
                setTimeout(() => {
                    setUpgradeSuccess(false);
                    onClose();
                    window.location.reload();
                }, 1500);
                return;
            }

            // Midtrans Snap Popup
            if (data.snap_token) {
                if (window.snap && typeof window.snap.pay === 'function') {
                    window.snap.pay(data.snap_token, {
                        onSuccess: function (result) {
                            setUpgradeSuccess(true);
                            setSelectedTier(tierItem.name);
                            setTimeout(() => {
                                onClose();
                                window.location.reload();
                            }, 1500);
                        },
                        onPending: function (result) {
                            alert('Pesanan langganan Anda berhasil dibuat dan menunggu konfirmasi pembayaran.');
                            onClose();
                        },
                        onError: function (result) {
                            setErrorMessage('Pembayaran gagal atau ditolak oleh gateway.');
                        },
                        onClose: function () {
                            // Modal closed
                        },
                    });
                } else if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    throw new Error('Midtrans Snap SDK belum siap dimuat. Silakan muat ulang halaman.');
                }
            }
        } catch (err) {
            setErrorMessage(err.message || 'Terjadi gangguan saat menghubungkan ke gateway pembayaran.');
        } finally {
            setUpgrading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="bg-white dark:bg-surface rounded-3xl max-w-4xl w-full shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                
                {/* Header */}
                <div className="p-4 sm:p-6 bg-surface-container-low border-b border-surface-container flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                            <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                            <span>TINGKATAN KEANGGOTAAN PREVENTIF</span>
                        </div>
                        <h3 className="font-heading font-black text-base sm:text-xl text-on-surface">
                            Tingkatan Akses & Kuota Layanan AEVYRA
                        </h3>
                        <p className="text-xs text-on-surface-variant line-clamp-2 sm:line-clamp-none">
                            Mendorong keberlanjutan hidup sehat jangka panjang dengan fleksibilitas fitur komprehensif
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 shrink-0 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Plans Comparison */}
                <div className="p-6 overflow-y-auto space-y-6">
                    {errorMessage && (
                        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                <span>{errorMessage}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setErrorMessage(null)}
                                className="text-rose-500 hover:text-rose-700 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tiers.map((t) => {
                            const isCurrent = t.name.toLowerCase() === currentTier.toLowerCase();
                            return (
                                <div
                                    key={t.name}
                                    className={`rounded-3xl border p-5 flex flex-col justify-between transition-all bg-white dark:bg-surface relative ${
                                        t.popular
                                            ? 'border-primary ring-2 ring-primary/20 shadow-xs'
                                            : 'border-surface-container hover:border-primary/30'
                                    }`}
                                >
                                    {t.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white font-bold text-[9px] uppercase tracking-wider shadow-xs">
                                            Paling Direkomendasikan
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-heading font-black text-base text-on-surface">
                                                {t.name}
                                            </h4>
                                            {isCurrent && (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-label-mono font-bold bg-primary/10 text-primary">
                                                    Paket Aktif Anda
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black font-mono text-on-surface">
                                                {t.price}
                                            </span>
                                            <span className="text-xs text-on-surface-variant font-medium">{t.period}</span>
                                        </div>

                                        <p className="text-[11px] text-on-surface-variant leading-relaxed min-h-[32px]">
                                            {t.description}
                                        </p>

                                        <div className="pt-3 border-t border-surface-container space-y-2 text-xs">
                                            {t.features.map((feat, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-start gap-2 ${
                                                        feat.active ? 'text-on-surface' : 'text-on-surface-variant/40 line-through'
                                                    }`}
                                                >
                                                    <span className={`material-symbols-outlined text-[16px] shrink-0 ${
                                                        feat.active ? 'text-primary' : 'text-surface-container'
                                                    }`}>
                                                        {feat.active ? 'check_circle' : 'cancel'}
                                                    </span>
                                                    <span className="text-[11px] leading-tight">{feat.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-5 mt-4 border-t border-surface-container">
                                        {isCurrent ? (
                                            <button
                                                disabled
                                                className="w-full py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-bold text-xs cursor-default text-center"
                                            >
                                                Status Aktif Saat Ini
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleUpgrade(t)}
                                                disabled={upgrading}
                                                className="w-full py-2.5 rounded-xl font-bold text-xs text-center transition-all shadow-2xs active:scale-95 bg-primary hover:bg-primary-container text-white cursor-pointer"
                                            >
                                                {upgrading ? 'Menghubungkan Midtrans...' : `Pilih ${t.name}`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {upgradeSuccess && (
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span>Berhasil! Tingkatan keanggotaan Anda telah diperbarui ke {selectedTier}.</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-surface-container-low border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-on-surface-variant text-center sm:text-left">
                    <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0">lock</span>
                        <span>Transaksi terlindungi Midtrans Payment Gateway & enkripsi perbankan.</span>
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="font-bold text-primary hover:underline cursor-pointer shrink-0"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
