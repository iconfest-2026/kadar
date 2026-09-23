import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MaleVitalityCard() {
    const [waistCm, setWaistCm] = useState(84);
    const [heightCm, setHeightCm] = useState(172);
    const [saving, setSaving] = useState(false);

    // Waist-to-Height Ratio calculation
    const whtr = heightCm > 0 ? (waistCm / heightCm).toFixed(2) : 0.49;
    const isWhtrOptimal = whtr < 0.50;

    const handleSwitchToFemale = () => {
        router.post('/member/profile/toggle-sex');
    };

    return (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-sky-200/80 dark:border-sky-950/30 shadow-sm space-y-5 relative overflow-hidden">
            
            {/* Top Tag & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container pb-4">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[18px]">fitness_center</span>
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Modul Vitalitas Pria & Pencegahan Sindrom Metabolik
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                                Akun Pria
                            </span>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                            Skrining lemak viseral abdomen, rasio lingkar pinggang, dan kapasitas aktivasi GLUT-4 otot
                        </p>
                    </div>
                </div>

                {/* Profile Sex Toggle Button */}
                <button
                    type="button"
                    onClick={handleSwitchToFemale}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-[11px] font-bold text-on-surface-variant transition-colors"
                    title="Beralih ke akun wanita untuk melihat Catatan Haid & Prediksi Hormonal AI"
                >
                    <span className="material-symbols-outlined text-[14px]">female</span>
                    <span>Uji Akun Wanita</span>
                </button>
            </div>

            {/* Metrics & Screening Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* WHtR Calculator Card */}
                <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-sky-600">straighten</span>
                            Rasio Lingkar Pinggang / Tinggi (WHtR)
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isWhtrOptimal ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                            {isWhtrOptimal ? 'Ideal / Sehat' : 'Perhatian Viseral'}
                        </span>
                    </div>

                    <div className="text-center py-1">
                        <span className="text-3xl font-black font-mono text-on-surface">{whtr}</span>
                        <span className="text-[11px] text-on-surface-variant block">Target Sehat: &lt; 0.50</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <label className="text-[10px] text-on-surface-variant block">Lingkar Pinggang</label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    value={waistCm}
                                    onChange={(e) => setWaistCm(Number(e.target.value))}
                                    className="w-full p-1.5 text-xs rounded-lg border border-surface-container bg-white dark:bg-surface font-mono"
                                />
                                <span className="text-[10px] text-on-surface-variant">cm</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] text-on-surface-variant block">Tinggi Badan</label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(Number(e.target.value))}
                                    className="w-full p-1.5 text-xs rounded-lg border border-surface-container bg-white dark:bg-surface font-mono"
                                />
                                <span className="text-[10px] text-on-surface-variant">cm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visceral Fat & Cardiovascular Risk */}
                <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-2">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">monitor_heart</span>
                        Status Sindrom Metabolik Pria
                    </span>

                    <div className="space-y-2 pt-1 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Estimasi Lemak Viseral:</span>
                            <span className="font-mono font-bold text-emerald-600">Level 6 (Aman &lt; 9)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Proteksi Kardiovaskular:</span>
                            <span className="font-mono font-bold text-primary">88% Terjaga</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Stamina Sore Hari:</span>
                            <span className="font-mono font-bold text-emerald-600">Stabil (Bebas Sugar Crash)</span>
                        </div>
                    </div>

                    <p className="text-[10px] text-on-surface-variant pt-2 border-t border-surface-container">
                        Penimbunan lemak di sekitar rongga perut pria meningkatkan risiko perlemakan hati (fatty liver) 3x lebih tinggi dibanding akumulasi subkutan.
                    </p>
                </div>

                {/* Prescribed Lifestyle Protocol */}
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/15 space-y-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">sports_gymnastics</span>
                        Protokol Aktivasi Reseptor GLUT-4
                    </span>

                    <p className="text-xs text-on-surface leading-relaxed">
                        Latihan ketahanan (resistance training) memicu translokasi transporter glukosa GLUT-4 ke membran sel otot secara langsung <span className="font-semibold text-primary">tanpa tergantung insulin</span>.
                    </p>

                    <div className="space-y-1 pt-1 text-[11px] text-on-surface-variant">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
                            <span>Jalan cepat 10 menit setelah makan siang/malam</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-500">check_circle</span>
                            <span>Latihan beban otot besar (squat/push-up) 3x/minggu</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
