import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function MenstrualTrackerCard() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logModalOpen, setLogModalOpen] = useState(false);
    const [flowLevel, setFlowLevel] = useState('MEDIUM');
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [submittingLog, setSubmittingLog] = useState(false);

    const symptomOptions = [
        'Kram Perut Bawah', 'Cravings Makanan Manis', 'Mood Swing', 'Kembung / Bloating',
        'Kelelahan / Fatig', 'Sakit Kepala / Migrain', 'Nyeri Punggung', 'Sulit Tidur'
    ];

    const fetchSummary = async () => {
        try {
            const res = await fetch('/member/menstrual/summary');
            const data = await res.json();
            if (data.status === 'success') {
                setSummary(data);
            }
        } catch (err) {
            console.error('Fetch menstrual summary error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    const toggleSymptom = (sym) => {
        if (selectedSymptoms.includes(sym)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== sym));
        } else {
            setSelectedSymptoms([...selectedSymptoms, sym]);
        }
    };

    const handleSaveLog = async () => {
        setSubmittingLog(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch('/member/menstrual/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    log_date: new Date().toISOString().split('T')[0],
                    is_period_day: flowLevel !== 'NONE',
                    flow_level: flowLevel,
                    symptoms: selectedSymptoms,
                    notes: 'Dicatat via dial harian AEVYRA',
                }),
            });
            const data = await res.json();
            if (data.status === 'success') {
                setLogModalOpen(false);
                fetchSummary();
            }
        } catch (err) {
            console.error('Save menstrual log error:', err);
        } finally {
            setSubmittingLog(false);
        }
    };

    const handleSwitchToMale = () => {
        router.post('/member/profile/toggle-sex');
    };

    if (loading) {
        return (
            <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs animate-pulse space-y-3">
                <div className="h-6 bg-surface-container rounded-md w-1/3"></div>
                <div className="h-20 bg-surface-container rounded-xl"></div>
            </div>
        );
    }

    const currentPhase = summary?.current_phase || 'LUTEAL';
    const dayOfCycle = summary?.day_of_cycle || 18;
    const aiPrediction = summary?.ai_prediction || {};
    const metabolicTip = summary?.metabolic_insulin_tip || {};

    const phaseConfig = {
        MENSTRUAL: { label: 'Fase Menstruasi', badge: 'bg-rose-500/10 text-rose-700 dark:text-rose-400' },
        FOLLICULAR: { label: 'Fase Folikular (Proliferasi)', badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' },
        OVULATION: { label: 'Fase Ovulasi (Masa Subur)', badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
        LUTEAL: { label: 'Fase Luteal (Sekretori)', badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-400' },
    };

    const currentConf = phaseConfig[currentPhase] || phaseConfig.LUTEAL;

    return (
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 relative overflow-hidden">
            
            {/* Top Tag & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container pb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[22px]">water_drop</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Siklus Hormonal & Resistensi Insulin
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 uppercase">
                                Akun Wanita
                            </span>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                            Korelasi fluktuasi estrogen/progesteron terhadap sensitivitas insulin dan metabolisme glukosa harian
                        </p>
                    </div>
                </div>

                {/* Profile Sex Toggle Button */}
                <button
                    type="button"
                    onClick={handleSwitchToMale}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors cursor-pointer"
                    title="Beralih ke akun pria untuk melihat modul Vitalitas Pria"
                >
                    <span className="material-symbols-outlined text-[15px]">male</span>
                    <span>Uji Akun Pria</span>
                </button>
            </div>

            {/* Circular Phase Dial & AI Forecast Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                
                {/* Visual Dial (Left) */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col items-center text-center space-y-2.5">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="currentColor"
                                className="text-surface-container"
                                strokeWidth="8"
                            />
                            {/* Progress stroke */}
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="currentColor"
                                className="text-rose-500 transition-all duration-500"
                                strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 40}
                                strokeDashoffset={2 * Math.PI * 40 * (1 - (dayOfCycle / 28))}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[10px] uppercase font-bold text-rose-600 font-label-mono">Hari Ke</span>
                            <span className="text-2xl font-black text-on-surface font-mono">{dayOfCycle}</span>
                            <span className="text-[10px] text-on-surface-variant font-medium">dari 28 hari</span>
                        </div>
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentConf.badge}`}>
                        {currentConf.label}
                    </span>
                </div>

                {/* AI Predictions & Clinical Context (Right) */}
                <div className="md:col-span-2 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                                <span className="material-symbols-outlined text-[16px] text-rose-500">event_upcoming</span>
                                <span>Prediksi Haid Berikutnya:</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface">
                                {aiPrediction.next_period_estimate || '10 Hari Lagi'}
                            </div>
                            <span className="text-[11px] font-mono text-rose-600 font-semibold block">
                                Estimasi: {aiPrediction.next_period_start || '03 Okt 2026'}
                            </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">favorite</span>
                                <span>Jendela Masa Subur:</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface">
                                {aiPrediction.fertile_window || '18 Sep - 24 Sep 2026'}
                            </div>
                            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block">
                                {currentPhase === 'OVULATION' ? 'Peluang Ovulasi Maksimal' : 'Fase Folikular / Subur'}
                            </span>
                        </div>
                    </div>

                    {/* Metabolic Correlation Note */}
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
                            <h4 className="font-bold text-on-surface">
                                Korelasi Hormon & Resistensi Insulin:
                            </h4>
                        </div>
                        <p className="text-on-surface-variant leading-relaxed">
                            {metabolicTip.tip || 'Pada fase luteal, peningkatan hormon progesteron secara fisiologis dapat menurunkan sensitivitas insulin sebesar 15-20%. Anda mungkin mengalami peningkatan nafsu makan atau lonjakan glukosa lebih cepat sesudah makan karbohidrat.'}
                        </p>
                        <p className="text-[11px] text-primary font-semibold pt-0.5">
                            Saran Dokter: {metabolicTip.action || 'Prioritaskan sayuran berserat tinggi, hindari minuman manis berkalori kosong, dan lakukan jalan santai 15 menit sesudah makan.'}
                        </p>
                    </div>

                    {/* Quick Log Action */}
                    <div className="flex justify-end pt-1">
                        <button
                            type="button"
                            onClick={() => setLogModalOpen(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-2xs active:scale-95 transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                            <span>Catat Gejala & Haid Hari Ini</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* SYMPTOMS & PERIOD LOG MODAL */}
            {logModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white dark:bg-surface rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-container space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-rose-500">water_drop</span>
                                <span>Catatan Haid & Gejala Tubuh</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setLogModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>

                        {/* Flow Selector */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-on-surface">Intensitas Aliran / Darah:</label>
                            <div className="grid grid-cols-4 gap-1.5">
                                {[
                                    { id: 'NONE', label: 'Tidak Ada' },
                                    { id: 'LIGHT', label: 'Ringan / Flek' },
                                    { id: 'MEDIUM', label: 'Sedang' },
                                    { id: 'HEAVY', label: 'Banyak' },
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        type="button"
                                        onClick={() => setFlowLevel(f.id)}
                                        className={`py-2 px-1 text-center rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                                            flowLevel === f.id
                                                ? 'bg-primary text-white border-primary shadow-2xs'
                                                : 'bg-surface-container-lowest text-on-surface-variant border-surface-container hover:border-primary/40'
                                        }`}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Symptoms Selector */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-on-surface">Gejala yang Dirasakan:</label>
                            <div className="grid grid-cols-2 gap-1.5">
                                {symptomOptions.map((sym) => (
                                    <button
                                        key={sym}
                                        type="button"
                                        onClick={() => toggleSymptom(sym)}
                                        className={`p-2.5 text-left rounded-xl text-[11px] font-medium border flex items-center justify-between transition-all cursor-pointer ${
                                            selectedSymptoms.includes(sym)
                                                ? 'bg-primary/10 text-primary border-primary/40 font-bold'
                                                : 'bg-surface-container-lowest text-on-surface-variant border-surface-container hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <span>{sym}</span>
                                        {selectedSymptoms.includes(sym) && (
                                            <span className="material-symbols-outlined text-[14px] text-primary">check</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-2 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSaveLog}
                                disabled={submittingLog}
                                className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[16px]">save</span>
                                <span>{submittingLog ? 'Menyimpan...' : 'Simpan Catatan'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setLogModalOpen(false)}
                                className="py-2.5 px-4 rounded-xl bg-surface-container text-xs font-semibold text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
