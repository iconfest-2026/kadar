import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MaleVitalityCard() {
    const [waistCm, setWaistCm] = useState(84);
    const [heightCm, setHeightCm] = useState(172);

    // Waist-to-Height Ratio calculation
    const whtr = heightCm > 0 ? (waistCm / heightCm).toFixed(2) : 0.49;
    const isWhtrOptimal = whtr < 0.50;

    const handleSwitchToFemale = () => {
        router.post('/member/profile/toggle-sex');
    };

    return (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 relative overflow-hidden">
            
            {/* Top Tag & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container pb-4">
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[22px]">fitness_center</span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">
                                Skrining Lemak Viseral & Vitalitas Pria
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary uppercase whitespace-nowrap shrink-0">
                                Akun Pria
                            </span>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                            Pemantauan rasio lingkar pinggang, risiko sindrom metabolik, dan aktivasi transporter GLUT-4 otot
                        </p>
                    </div>
                </div>

                {/* Profile Sex Toggle Button */}
                <button
                    type="button"
                    onClick={handleSwitchToFemale}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors cursor-pointer"
                    title="Beralih ke akun wanita untuk melihat Catatan Haid & Prediksi Hormonal AI"
                >
                    <span className="material-symbols-outlined text-[15px]">female</span>
                    <span>Uji Akun Wanita</span>
                </button>
            </div>

            {/* Metrics & Screening Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* WHtR Calculator Card */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px] text-primary">straighten</span>
                            <span>Rasio Lingkar / Tinggi (WHtR)</span>
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                            isWhtrOptimal ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
                        }`}>
                            {isWhtrOptimal ? 'Ideal / Aman' : 'Perhatian Viseral'}
                        </span>
                    </div>

                    <div className="text-center py-1">
                        <span className="text-3xl font-black font-mono text-on-surface">{whtr}</span>
                        <span className="text-[11px] text-on-surface-variant block mt-0.5 font-medium">Target Sehat: &lt; 0.50</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                            <label className="text-[10px] text-on-surface-variant font-medium block">Lingkar Pinggang</label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    value={waistCm}
                                    onChange={(e) => setWaistCm(Number(e.target.value))}
                                    className="w-full p-2 text-xs rounded-xl border border-surface-container bg-surface-container-lowest font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <span className="text-[10px] text-on-surface-variant font-mono">cm</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-on-surface-variant font-medium block">Tinggi Badan</label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(Number(e.target.value))}
                                    className="w-full p-2 text-xs rounded-xl border border-surface-container bg-surface-container-lowest font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <span className="text-[10px] text-on-surface-variant font-mono">cm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visceral Fat & Cardiovascular Risk */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5">
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">monitor_heart</span>
                        <span>Status Sindrom Metabolik Pria</span>
                    </span>

                    <div className="space-y-2 pt-1 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Estimasi Lemak Viseral:</span>
                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">Level 6 (Aman &lt; 9)</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Proteksi Kardiovaskular:</span>
                            <span className="font-mono font-bold text-primary">88% Terjaga</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Stamina Sore Hari:</span>
                            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">Stabil (Bebas Crash)</span>
                        </div>
                    </div>

                    <p className="text-[10px] text-on-surface-variant pt-2 border-t border-surface-container leading-relaxed">
                        Penimbunan lemak rongga perut meningkatkan risiko perlemakan hati (<em>fatty liver</em>) 3x lipat dibanding lemak subkutan.
                    </p>
                </div>

                {/* Prescribed Lifestyle Protocol */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                    <span className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">sports_gymnastics</span>
                        <span>Protokol Reseptor GLUT-4 Otot</span>
                    </span>

                    <p className="text-xs text-on-surface leading-relaxed">
                        Latihan ketahanan memicu translokasi transporter glukosa GLUT-4 langsung ke membran sel otot <span className="font-semibold text-primary">tanpa bergantung insulin</span>.
                    </p>

                    <div className="space-y-1.5 pt-1 text-[11px] text-on-surface-variant">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                            <span>Jalan cepat 10–15 menit setelah santap makan</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
                            <span>Latihan beban otot besar (<em>squat/push-up</em>) 3x/minggu</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
