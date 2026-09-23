import React, { useState } from 'react';

export default function MembershipTierModal({ isOpen, onClose, currentTier = 'Gold' }) {
    const [selectedTier, setSelectedTier] = useState(currentTier);
    const [upgrading, setUpgrading] = useState(false);
    const [upgradeSuccess, setUpgradeSuccess] = useState(false);

    if (!isOpen) return null;

    const tiers = [
        {
            name: 'Silver',
            slug: 'silver',
            price: 'Gratis',
            period: 'Selamanya',
            description: 'Fondasi pencatatan preventif harian untuk memulai gaya hidup sehat.',
            color: 'border-slate-200 dark:border-slate-800',
            headerBg: 'bg-slate-100 dark:bg-slate-900',
            badge: 'bg-slate-200 text-slate-700',
            features: [
                { text: '3x Scan Kamera Gizi & Obat / hari', active: true },
                { text: 'Pencatatan metrik harian (Gula, Tidur, Langkah)', active: true },
                { text: 'Konsultasi Tanya Jawab AI Dasar (5 chat/hari)', active: true },
                { text: 'Akses Komunitas & Forum Diskusi Publik', active: true },
                { text: 'Konsultasi Dokter Spesialis Terjadwal', active: false },
                { text: 'Simulasi Lengkap Kurva Glukosa Postprandial', active: false },
                { text: 'Dedicated 1-on-1 Health Coach', active: false },
            ],
        },
        {
            name: 'Gold',
            slug: 'gold',
            price: 'Rp 49.000',
            period: '/ bulan',
            description: 'Paling populer untuk pencegahan pra-diabetes dan optimasi metabolik aktif.',
            color: 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/30',
            headerBg: 'bg-linear-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10',
            badge: 'bg-amber-100 text-amber-900 font-bold',
            popular: true,
            features: [
                { text: '15x Scan Kamera Gizi & Obat / hari', active: true },
                { text: '4x Konsultasi Terjadwal Bersama Dokter/Spesialis Gizi', active: true },
                { text: 'AI Asisten Preventif 24/7 Tanpa Batas', active: true },
                { text: 'Simulasi Lengkap Kurva Glukosa & Beban Glikemik (GL)', active: true },
                { text: 'Akses Penuh Program Tantangan 14-90 Hari PERKENI', active: true },
                { text: 'Laporan Perkembangan Bulanan (PDF/Klinis)', active: true },
                { text: 'Dedicated 1-on-1 Health Coach', active: false },
            ],
        },
        {
            name: 'Platinum',
            slug: 'platinum',
            price: 'Rp 99.000',
            period: '/ bulan',
            description: 'Paket paripurna VIP dengan bimbingan dokter spesialis pribadi & ambulans terhubung.',
            color: 'border-emerald-500/80 ring-2 ring-emerald-500/30',
            headerBg: 'bg-linear-to-r from-primary/15 via-emerald-500/10 to-transparent',
            badge: 'bg-emerald-100 text-emerald-900 font-bold',
            features: [
                { text: 'Scan Kamera Gizi & Obat UNLIMITED (Bebas Batas)', active: true },
                { text: '8x Konsultasi Dokter & Spesialis Gizi Klinis (Sp.GK)', active: true },
                { text: 'Dedicated Personal Health Coach & Intervensi HBE Kustom', active: true },
                { text: 'Akses Jalur Cepat Ambulans 119 dengan Riwayat Medis Instan', active: true },
                { text: 'Laporan Klinis Komprehensif Berstandar Rumah Sakit', active: true },
                { text: 'Prediksi Hormonal & Siklus AI Tingkat Lanjut', active: true },
                { text: 'Badge & Status Eksklusif di Komunitas AEVYRA', active: true },
            ],
        },
    ];

    const handleUpgrade = (tierName) => {
        setUpgrading(true);
        setTimeout(() => {
            setUpgrading(false);
            setUpgradeSuccess(true);
            setSelectedTier(tierName);
            setTimeout(() => {
                setUpgradeSuccess(false);
                onClose();
            }, 1200);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface rounded-3xl max-w-4xl w-full shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-b border-surface-container flex items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                            <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                            Tingkatan Member (Membership Tiers)
                        </div>
                        <h3 className="font-heading font-black text-lg sm:text-xl text-primary">
                            Tingkatan Langganan AEVYRA HealthCheck
                        </h3>
                        <p className="text-xs text-on-surface-variant">
                            Mendorong keberlanjutan hidup sehat jangka panjang dengan fleksibilitas fitur premium
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Plans Comparison */}
                <div className="p-6 overflow-y-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tiers.map((t) => {
                            const isCurrent = t.name.toLowerCase() === currentTier.toLowerCase();
                            return (
                                <div
                                    key={t.name}
                                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all bg-white dark:bg-surface relative ${t.color}`}
                                >
                                    {t.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[9px] uppercase tracking-wider shadow-xs">
                                            Rekomendasi Terbaik
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-heading font-black text-base text-on-surface">
                                                {t.name}
                                            </h4>
                                            {isCurrent && (
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-primary text-white">
                                                    Paket Aktif Anda
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black font-mono text-on-surface">
                                                {t.price}
                                            </span>
                                            <span className="text-xs text-on-surface-variant">{t.period}</span>
                                        </div>

                                        <p className="text-[11px] text-on-surface-variant leading-relaxed min-h-[32px]">
                                            {t.description}
                                        </p>

                                        <div className="pt-3 border-t border-surface-container space-y-2 text-xs">
                                            {t.features.map((feat, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`flex items-start gap-2 ${
                                                        feat.active ? 'text-on-surface' : 'text-on-surface-variant/50 line-through'
                                                    }`}
                                                >
                                                    <span className={`material-symbols-outlined text-[16px] shrink-0 ${
                                                        feat.active ? 'text-emerald-500' : 'text-surface-container-high'
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
                                                Status Aktif
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleUpgrade(t.name)}
                                                disabled={upgrading}
                                                className={`w-full py-2.5 rounded-xl font-bold text-xs text-center transition-all shadow-xs active:scale-98 ${
                                                    t.name === 'Platinum'
                                                        ? 'bg-primary hover:bg-primary-container text-white'
                                                        : t.name === 'Gold'
                                                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                                                }`}
                                            >
                                                {upgrading ? 'Memproses...' : `Pilih ${t.name}`}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {upgradeSuccess && (
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 animate-fade-in">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            <span>Berhasil! Tingkatan keanggotaan Anda telah diperbarui ke {selectedTier}.</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-surface-container-lowest border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                        Pembayaran terenkripsi aman & dapat dibatalkan kapan saja tanpa komitmen jangka panjang.
                    </span>
                    <button
                        onClick={onClose}
                        className="font-bold text-primary hover:underline"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
