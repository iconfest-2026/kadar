import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ChallengesDemo() {
    const [activeChallenge, setActiveChallenge] = useState('sugar_zero');
    const [simulatedProgress, setSimulatedProgress] = useState(6); // Completed days out of 14

    const challenges = {
        sugar_zero: {
            title: '14 Hari Bebas Minuman Manis (Liquid Sugar Zero)',
            duration: '14 Hari',
            category: 'Pola Nutrisi',
            badge: '+350 XP • Badge Sugar Fighter',
            target: 'Ganti semua minuman berpemanis cair dengan air putih, teh tawar, atau infused water.',
            clinicalGoal: 'Menghilangkan lonjakan glukosa tajam dan mengembalikan sensitivitas reseptor rasa manis.',
            milestones: [
                'Hari 1-3: Fase Adaptasi Cravings Manis',
                'Hari 4-7: Stabilisasi Energi Siang Hari (Bebas Kantuk)',
                'Hari 8-14: Sensitivitas Insulin Otot Meningkat',
            ],
            participants: 1420,
        },
        steps_10k: {
            title: '30 Hari Jalan Kaki 10.000 Langkah & Post-Meal Walk',
            duration: '30 Hari',
            category: 'Aktivitas Fisik',
            badge: '+600 XP • Badge Metabolic Runner',
            target: 'Capai minimal 10.000 langkah harian dan jalan santai 15 menit sesudah santap malam.',
            clinicalGoal: 'Translokasi reseptor GLUT-4 non-insulin pada otot rangka untuk menyerap glukosa darah.',
            milestones: [
                'Hari 1-10: Pembiasaan Rutinitas Jalan Pagi',
                'Hari 11-20: Penurunan Glukosa Postprandial Rerata 18%',
                'Hari 21-30: Peningkatan Daya Tahan Kardiometabolik',
            ],
            participants: 890,
        },
        sleep_hygiene: {
            title: '21 Hari Transisi Sirkadian & Kualitas Tidur Optimal',
            duration: '21 Hari',
            category: 'Ritme Sirkadian',
            badge: '+450 XP • Badge Deep Sleeper',
            target: 'Matikan layar gadget 45 menit sebelum tidur dan tidur tepat pukul 22:30 WIB.',
            clinicalGoal: 'Menurunkan kortisol malam hari dan mencegah lonjakan glukosa puasa dini hari (Dawn Phenomenon).',
            milestones: [
                'Hari 1-7: Penyelarasan Suhu Kamar & Jam Rehat',
                'Hari 8-14: Peningkatan Durasi Deep Sleep & REM',
                'Hari 15-21: Glukosa Puasa Lebih Stabil di Pagi Hari',
            ],
            participants: 670,
        },
        remission_90: {
            title: '90 Hari Protokol Remisi Pre-Diabetes & HbA1c',
            duration: '90 Hari',
            category: 'Protokol Medis Kohor',
            badge: '+1,500 XP • Badge Remission Master',
            target: 'Kombinasi nutrisi rendah glikemik, latihan resistensi 3x/minggu, dan bimbingan dokter spesialis.',
            clinicalGoal: 'Penurunan kadar HbA1c hingga &lt; 5.7% dan pemulihan fungsi sel beta pankreas.',
            milestones: [
                'Bulan 1: Eliminasi Pemicu Lonjakan Gula Darah',
                'Bulan 2: Peningkatan Massa Otot & Mitokondria',
                'Bulan 3: Evaluasi Lab Darah HbA1c Target Remisi',
            ],
            participants: 530,
        },
    };

    const current = challenges[activeChallenge];
    const progressPercent = Math.min(100, Math.round((simulatedProgress / 14) * 100));

    const handleSimulateCheckIn = () => {
        if (simulatedProgress < 14) {
            setSimulatedProgress(simulatedProgress + 1);
        } else {
            setSimulatedProgress(1);
        }
    };

    return (
        <MarketingLayout>
            <Head title="Demo Program Tantangan Sehat — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Program Tantangan Sehat</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                <span className="material-symbols-outlined text-[16px]">emoji_events</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 4</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Program Tantangan 14–90 Hari
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Bangun kebiasaan preventif melalui tantangan berbasis sains. Dilengkapi pelacak progres harian, streak multiplier, dan reward XP gamifikasi.
                            </p>
                        </div>

                        <Link
                            href="/member/challenges"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">military_tech</span>
                            <span>Buka Katalog Tantangan Member</span>
                        </Link>
                    </div>
                </div>

                {/* Challenge Catalog Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(challenges).map(([key, item]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setActiveChallenge(key);
                                setSimulatedProgress(6);
                            }}
                            className={`p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                                activeChallenge === key
                                    ? 'bg-primary/5 border-primary shadow-xs'
                                    : 'bg-white dark:bg-surface border-surface-container hover:border-primary/40'
                            }`}
                        >
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="font-bold text-primary">{item.category}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                                        {item.duration}
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-sm text-on-surface line-clamp-2">
                                    {item.title}
                                </h3>
                            </div>
                            <span className="text-[10px] text-on-surface-variant font-mono block">
                                {item.participants.toLocaleString('id-ID')} peserta aktif
                            </span>
                        </button>
                    ))}
                </div>

                {/* Interactive Challenge Tracker Showcase */}
                <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container pb-5">
                        <div>
                            <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                Simulasi Pelacak Progres Harian
                            </span>
                            <h2 className="font-heading font-black text-xl sm:text-2xl text-on-surface mt-0.5">
                                {current.title}
                            </h2>
                            <p className="text-xs text-on-surface-variant mt-1">{current.target}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
                                {current.badge}
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar & Interactive Check-in Button */}
                    <div className="space-y-3 p-5 rounded-2xl bg-surface-container-low border border-surface-container">
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-on-surface">
                                Progres Tantangan: Hari ke-{simulatedProgress} dari 14 Hari
                            </span>
                            <span className="font-mono font-bold text-primary">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <span className="text-xs text-on-surface-variant">
                                Klik tombol di samping untuk mensimulasikan check-in kepatuhan harian:
                            </span>
                            <button
                                type="button"
                                onClick={handleSimulateCheckIn}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container transition-all active:scale-95 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                <span>Check-in Hari Ke-{simulatedProgress < 14 ? simulatedProgress + 1 : 1}</span>
                            </button>
                        </div>
                    </div>

                    {/* 3 Milestones Roadmap */}
                    <div className="space-y-3">
                        <h4 className="font-heading font-bold text-sm text-on-surface">
                            Roadmap Tahapan Transformasi Biologis:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {current.milestones.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1"
                                >
                                    <span className="text-[10px] font-mono text-primary font-bold">FASE {idx + 1}</span>
                                    <p className="text-xs font-semibold text-on-surface leading-snug">{m}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}

