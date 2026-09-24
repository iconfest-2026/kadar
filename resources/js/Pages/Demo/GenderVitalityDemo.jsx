import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function GenderVitalityDemo() {
    const [selectedGender, setSelectedGender] = useState('female');
    const [femalePhase, setFemalePhase] = useState('luteal'); // 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

    const femalePhases = {
        menstrual: {
            name: 'Fase Menstruasi (Hari 1-5)',
            insulinSensitivity: 'Sedang (Sensitivitas Normal)',
            hormoneStatus: 'Estrogen & Progesteron Rendah',
            dietAdvice: 'Prioritaskan makanan kaya zat besi (bayam, daging merah tanpa lemak) dan hidrasi hangat.',
            exerciseAdvice: 'Jalan santai, yoga restoratif, atau peregangan ringan.',
            color: 'text-rose-700 bg-rose-50 border-rose-200',
        },
        follicular: {
            name: 'Fase Folikular (Hari 6-13)',
            insulinSensitivity: 'Sangat Tinggi (Toleransi Karbohidrat Terbaik)',
            hormoneStatus: 'Estrogen Meningkat Bertahap',
            dietAdvice: 'Tubuh sangat efisien mengolah glukosa. Waktu terbaik mengonsumsi karbohidrat kompleks.',
            exerciseAdvice: 'Latihan beban intensitas tinggi (HIIT) dan angkat beban progresif.',
            color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        },
        ovulation: {
            name: 'Fase Ovulasi (Hari 14-16)',
            insulinSensitivity: 'Puncak Energi (Sensitivitas Optimal)',
            hormoneStatus: 'Lonjakan Hormon LH & Estrogen Puncak',
            dietAdvice: 'Tingkatkan asupan antioksidan (berries, brokoli) untuk meredam stres oksidatif folikel.',
            exerciseAdvice: 'Latihan kardio intens, lari jarak menengah, atau latihan kekuatan maksimal.',
            color: 'text-amber-700 bg-amber-50 border-amber-200',
        },
        luteal: {
            name: 'Fase Luteal (Hari 17-28)',
            insulinSensitivity: 'Menurun (Kecenderungan Resistensi Insulin & Cravings)',
            hormoneStatus: 'Progesteron Dominan',
            dietAdvice:
                'Batasi gula bebas karena progesteron menurunkan sensitivitas insulin. Perbanyak magnesium (biji labu, cokelat hitam 85%).',
            exerciseAdvice: 'Latihan beban sedang, pilates, dan jalan kaki 30 menit pasca makan.',
            color: 'text-rose-700 bg-rose-50 border-rose-200',
        },
    };

    const activeFemale = femalePhases[femalePhase];

    return (
        <MarketingLayout>
            <Head title="Demo Siklus Haid & Vitalitas Pria — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Siklus Haid &amp; Vitalitas Pria</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">vital_signs</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 6</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Personalisasi Biologis Berbasis Gender
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Metabolisme pria dan wanita memiliki dinamika hormon yang berbeda. AEVYRA mempersonalisasi rekomendasi nutrisi sesuai fase siklus menstruasi wanita atau profil kardiometabolik pria.
                            </p>
                        </div>

                        <Link
                            href="/member/dashboard"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">favorite</span>
                            <span>Buka Modul Biologis Member</span>
                        </Link>
                    </div>
                </div>

                {/* Gender Mode Toggle */}
                <div className="flex justify-center">
                    <div className="p-1.5 bg-surface-container-low rounded-2xl border border-surface-container inline-flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setSelectedGender('female')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                selectedGender === 'female'
                                    ? 'bg-rose-500 text-white shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">female</span>
                            <span>Wanita • Siklus Haid &amp; Hormon</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedGender('male')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                selectedGender === 'male'
                                    ? 'bg-sky-600 text-white shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">male</span>
                            <span>Pria • Vitalitas &amp; Lemak Viseral</span>
                        </button>
                    </div>
                </div>

                {/* MODE WANITA (Female Mode) */}
                {selectedGender === 'female' && (
                    <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-container pb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-rose-600 uppercase">
                                    Female Cycle &amp; Insulin Sensitivity
                                </span>
                                <h3 className="font-heading font-black text-xl text-on-surface mt-0.5">
                                    Simulasi 4 Fase Siklus Menstruasi &amp; Toleransi Glukosa
                                </h3>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-mono font-bold border border-rose-500/20">
                                28 Hari Kalender AI
                            </span>
                        </div>

                        {/* Phase Selector Tabs */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                            <button
                                type="button"
                                onClick={() => setFemalePhase('menstrual')}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                    femalePhase === 'menstrual'
                                        ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                }`}
                            >
                                <span className="text-[10px] font-mono font-bold block">HARI 1 - 5</span>
                                <h4 className="font-bold text-xs mt-1">Fase Menstruasi</h4>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFemalePhase('follicular')}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                    femalePhase === 'follicular'
                                        ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                }`}
                            >
                                <span className="text-[10px] font-mono font-bold block">HARI 6 - 13</span>
                                <h4 className="font-bold text-xs mt-1">Fase Folikular</h4>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFemalePhase('ovulation')}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                    femalePhase === 'ovulation'
                                        ? 'bg-amber-50 border-amber-300 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                }`}
                            >
                                <span className="text-[10px] font-mono font-bold block">HARI 14 - 16</span>
                                <h4 className="font-bold text-xs mt-1">Fase Ovulasi</h4>
                            </button>

                            <button
                                type="button"
                                onClick={() => setFemalePhase('luteal')}
                                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                                    femalePhase === 'luteal'
                                        ? 'bg-rose-50 border-rose-300 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 shadow-2xs'
                                        : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container-high'
                                }`}
                            >
                                <span className="text-[10px] font-mono font-bold block">HARI 17 - 28</span>
                                <h4 className="font-bold text-xs mt-1">Fase Luteal (PMS)</h4>
                            </button>
                        </div>

                        {/* Phase Detail Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                                <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                    Dinamika Hormonal &amp; Sensitivitas Insulin
                                </span>
                                <h4 className="font-heading font-bold text-base text-on-surface">{activeFemale.name}</h4>
                                <div className="space-y-1.5 text-xs">
                                    <div className="flex justify-between border-b border-surface-container pb-1.5">
                                        <span className="text-on-surface-variant">Sensitivitas Insulin:</span>
                                        <span className="font-bold text-primary">{activeFemale.insulinSensitivity}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-surface-container pb-1.5">
                                        <span className="text-on-surface-variant">Status Hormon Dominan:</span>
                                        <span className="font-mono font-semibold text-on-surface">{activeFemale.hormoneStatus}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
                                <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                    Rekomendasi Preskriptif Nutrisi &amp; Latihan
                                </span>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="font-bold text-primary block">Strategi Pola Makan:</span>
                                        <p className="text-on-surface-variant mt-0.5 leading-relaxed">{activeFemale.dietAdvice}</p>
                                    </div>
                                    <div className="pt-2 border-t border-primary/10">
                                        <span className="font-bold text-primary block">Intensitas Latihan Fisik:</span>
                                        <p className="text-on-surface-variant mt-0.5 leading-relaxed">{activeFemale.exerciseAdvice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODE PRIA (Male Mode) */}
                {selectedGender === 'male' && (
                    <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-container pb-4">
                            <div>
                                <span className="text-[10px] font-mono font-bold text-sky-600 uppercase">
                                    Male Cardiometabolic &amp; Vitality Screening
                                </span>
                                <h3 className="font-heading font-black text-xl text-on-surface mt-0.5">
                                    Skrining Lemak Viseral &amp; Kebugaran Kardiometabolik Pria
                                </h3>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-800 dark:text-sky-300 text-xs font-mono font-bold border border-sky-500/20">
                                Rasio WHtR &amp; Sindrom Metabolik
                            </span>
                        </div>

                        {/* 3 Male Metric Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                <span className="text-xs font-bold text-on-surface block">Rasio Lingkar Pinggang (WHtR)</span>
                                <div className="text-2xl font-heading font-black text-sky-700 dark:text-sky-400 font-mono">
                                    0.48 <span className="text-xs text-on-surface-variant font-sans">(Ideal &lt; 0.5)</span>
                                </div>
                                <span className="text-[10px] text-emerald-600 font-semibold block">
                                    Risiko Lemak Viseral Rendah
                                </span>
                            </div>

                            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                <span className="text-xs font-bold text-on-surface block">Indeks Vitalitas Sirkadian</span>
                                <div className="text-2xl font-heading font-black text-primary font-mono">
                                    88 / 100
                                </div>
                                <span className="text-[10px] text-on-surface-variant block">
                                    Kualitas Deep Sleep Mendukung Testosteron
                                </span>
                            </div>

                            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                <span className="text-xs font-bold text-on-surface block">Kebugaran Mitokondria</span>
                                <div className="text-2xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                                    Optimal
                                </div>
                                <span className="text-[10px] text-emerald-600 font-semibold block">
                                    Toleransi Beban Latihan Resistensi 3x/minggu
                                </span>
                            </div>
                        </div>

                        {/* Clinical Guidelines for Men */}
                        <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/15 space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sky-700 dark:text-sky-400 text-[18px]">
                                    security
                                </span>
                                <span className="font-bold text-sky-900 dark:text-sky-200">
                                    Fokus Intervensi Preventif Pria Dewasa
                                </span>
                            </div>
                            <p className="text-on-surface-variant leading-relaxed">
                                Penimbunan lemak di area perut (visceral fat) pada pria melepaskan sitokin pro-inflamasi yang memperparah resistensi insulin. Protokol AEVYRA memadukan latihan kekuatan otot besar (squat, deadlift) dan pembatasan konsumsi fruktosa cair untuk memulihkan elastisitas pembuluh darah dan kebugaran vitalitas.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </MarketingLayout>
    );
}

