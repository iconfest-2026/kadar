import React, { useState, useEffect, useMemo } from 'react';
import { router } from '@inertiajs/react';

export default function MenstrualTrackerCard() {
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modals
    const [logModalOpen, setLogModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    // Weekly Strip State (Selected Date default to Today)
    const [selectedDate, setSelectedDate] = useState(() => new Date());

    // Log Form State
    const [logDateStr, setLogDateStr] = useState(() => new Date().toISOString().split('T')[0]);
    const [isPeriodStart, setIsPeriodStart] = useState(false);
    const [flowLevel, setFlowLevel] = useState('MEDIUM');
    const [painLevel, setPainLevel] = useState(1);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [notes, setNotes] = useState('');
    const [submittingLog, setSubmittingLog] = useState(false);

    // Settings Form State
    const [cycleLengthInput, setCycleLengthInput] = useState(28);
    const [periodLengthInput, setPeriodLengthInput] = useState(5);
    const [lastPeriodDateInput, setLastPeriodDateInput] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 14);
        return d.toISOString().split('T')[0];
    });
    const [submittingSettings, setSubmittingSettings] = useState(false);

    const symptomOptions = [
        'Kram Perut Bawah', 'Cravings Makanan Manis', 'Mood Swing',
        'Kembung / Bloating', 'Kelelahan / Fatig', 'Sakit Kepala',
        'Nyeri Punggung', 'Sulit Tidur', 'Jerawat Hormonal'
    ];

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayShortNames = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
    const dayFullNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const fetchSummary = async () => {
        try {
            const res = await fetch('/member/menstrual/summary');
            const data = await res.json();
            if (data.status === 'success' || data.summary) {
                setSummaryData(data);
                if (data.settings) {
                    setCycleLengthInput(data.settings.average_cycle_days || 28);
                    setPeriodLengthInput(data.settings.average_period_days || 5);
                    if (data.settings.last_period_date) {
                        setLastPeriodDateInput(data.settings.last_period_date);
                    }
                }
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
            setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
        } else {
            setSelectedSymptoms([...selectedSymptoms, sym]);
        }
    };

    const handleSaveLog = async (e) => {
        e?.preventDefault();
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
                    log_date: logDateStr,
                    flow_level: flowLevel,
                    pain_level: painLevel,
                    is_period_start: isPeriodStart,
                    symptoms: selectedSymptoms,
                    notes: notes || 'Dicatat via Pelacak Siklus AEVYRA',
                }),
            });
            const data = await res.json();
            if (data.success || data.status === 'success') {
                setLogModalOpen(false);
                fetchSummary();
            }
        } catch (err) {
            console.error('Save menstrual log error:', err);
        } finally {
            setSubmittingLog(false);
        }
    };

    const handleSaveSettings = async (e) => {
        e?.preventDefault();
        setSubmittingSettings(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch('/member/menstrual/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    average_cycle_days: parseInt(cycleLengthInput, 10),
                    average_period_days: parseInt(periodLengthInput, 10),
                    last_period_date: lastPeriodDateInput,
                }),
            });
            const data = await res.json();
            if (data.success || data.status === 'success') {
                setSettingsModalOpen(false);
                fetchSummary();
            }
        } catch (err) {
            console.error('Save settings error:', err);
        } finally {
            setSubmittingSettings(false);
        }
    };

    const handleSwitchToMale = () => {
        router.post('/member/profile/toggle-sex');
    };

    const openLogForDate = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        setLogDateStr(`${y}-${m}-${day}`);
        setLogModalOpen(true);
    };

    // Calculate Week Days Strip (7 Days around the selected date)
    const weekDays = useMemo(() => {
        const current = new Date(selectedDate);
        const dayOfWeek = current.getDay(); // 0 is Sunday
        const startOfWeek = new Date(current);
        startOfWeek.setDate(current.getDate() - dayOfWeek); // Start at Sunday

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            days.push({
                dateObj: d,
                dateNum: d.getDate(),
                dayShort: dayShortNames[d.getDay()],
                dateStr: dateStr,
                isToday: dateStr === new Date().toISOString().split('T')[0],
                isSelected: dateStr === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
            });
        }
        return days;
    }, [selectedDate]);

    const handlePrevWeek = () => {
        const newD = new Date(selectedDate);
        newD.setDate(newD.getDate() - 7);
        setSelectedDate(newD);
    };

    const handleNextWeek = () => {
        const newD = new Date(selectedDate);
        newD.setDate(newD.getDate() + 7);
        setSelectedDate(newD);
    };

    // Evaluate date status for the circular focal view
    const cycleEvents = summaryData?.cycle_events || [];
    const recentLogs = summaryData?.recent_logs || [];
    const summary = summaryData?.summary || {};

    const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

    const evaluateDate = (dStr) => {
        // 1. Check logged period
        const log = recentLogs.find((l) => l.log_date === dStr);
        if (log && log.flow_level && log.flow_level !== 'NONE') {
            return {
                isPeriod: true,
                mainTitle: 'Sedang Haid',
                daysCount: null,
                pregnancyChance: 'Peluang hamil sangat rendah',
                type: 'PERIOD_LOGGED',
                colorClass: 'text-rose-500',
            };
        }

        // 2. Check predicted periods & fertile events
        for (const ev of cycleEvents) {
            if (dStr >= ev.period_start && dStr <= ev.period_end) {
                const dayNum = Math.floor((new Date(dStr) - new Date(ev.period_start)) / (1000 * 60 * 60 * 24)) + 1;
                return {
                    isPeriod: true,
                    mainTitle: 'Fase Haid',
                    daysCount: `Hari ke-${dayNum}`,
                    pregnancyChance: 'Peluang hamil sangat rendah',
                    type: 'PREDICTED_PERIOD',
                    colorClass: 'text-rose-500',
                };
            }
            if (dStr === ev.ovulation_date) {
                return {
                    isPeriod: false,
                    mainTitle: 'Puncak Ovulasi',
                    daysCount: 'Hari Ini',
                    pregnancyChance: 'Peluang hamil sangat tinggi',
                    type: 'OVULATION',
                    colorClass: 'text-primary font-bold',
                };
            }
            if (dStr >= ev.fertile_start && dStr <= ev.fertile_end) {
                return {
                    isPeriod: false,
                    mainTitle: 'Jendela Masa Subur',
                    daysCount: 'Subur',
                    pregnancyChance: 'Peluang hamil tinggi',
                    type: 'FERTILE',
                    colorClass: 'text-emerald-600',
                };
            }
        }

        // 3. Distance to next period from this date
        let targetPeriodDate = summary.next_period_date;
        for (const ev of cycleEvents) {
            if (ev.period_start > dStr) {
                targetPeriodDate = ev.period_start;
                break;
            }
        }

        if (targetPeriodDate) {
            const diffMs = new Date(targetPeriodDate) - new Date(dStr);
            const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            if (daysLeft > 0) {
                return {
                    isPeriod: false,
                    mainTitle: 'Haid dalam',
                    daysCount: `${daysLeft} hari`,
                    pregnancyChance: 'Peluang hamil rendah',
                    type: 'UPCOMING_PERIOD',
                    colorClass: 'text-on-surface',
                };
            }
        }

        return {
            isPeriod: false,
            mainTitle: 'Haid dalam',
            daysCount: `${summary.days_until_next_period || 10} hari`,
            pregnancyChance: 'Peluang hamil rendah',
            type: 'REGULAR',
            colorClass: 'text-on-surface',
        };
    };

    const evaluated = evaluateDate(selectedDateStr);

    if (loading) {
        return (
            <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container shadow-xs animate-pulse space-y-4">
                <div className="h-6 bg-surface-container rounded-md w-1/3"></div>
                <div className="h-64 rounded-full bg-surface-container/60 w-64 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-linear-to-b from-primary/5 via-surface to-surface border border-surface-container shadow-xs p-5 sm:p-7 relative overflow-hidden space-y-4">
            
            {/* Top Bar: Month & Switcher */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <span className="text-xs font-bold text-primary font-label-mono uppercase tracking-wider">
                        Siklus Hormonal
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {/* Month Picker Button */}
                    <button
                        type="button"
                        onClick={() => setSettingsModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-surface border border-surface-container shadow-2xs text-xs font-bold text-on-surface hover:border-primary/40 transition-all cursor-pointer"
                        title="Klik untuk mengatur HPHT & siklus"
                    >
                        <span>{monthNames[selectedDate.getMonth()]}</span>
                        <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSwitchToMale}
                        className="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
                        title="Beralih ke tampilan akun pria"
                    >
                        Uji Pria
                    </button>
                </div>
            </div>

            {/* 1. WEEKLY HORIZONTAL CALENDAR STRIP */}
            <div className="relative">
                <div className="flex items-center justify-between gap-1 max-w-md mx-auto">
                    {/* Prev Week Button */}
                    <button
                        type="button"
                        onClick={handlePrevWeek}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shrink-0 cursor-pointer"
                        title="Minggu sebelumnya"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>

                    {/* 7 Days Row */}
                    <div className="flex-1 grid grid-cols-7 gap-1 text-center items-center">
                        {weekDays.map((w) => {
                            const dateStatus = evaluateDate(w.dateStr);
                            const isSelected = w.isSelected;

                            let numberColor = 'text-on-surface';
                            if (dateStatus.type === 'FERTILE' || dateStatus.type === 'OVULATION') {
                                numberColor = 'text-primary font-bold';
                            } else if (dateStatus.type === 'PERIOD_LOGGED' || dateStatus.type === 'PREDICTED_PERIOD') {
                                numberColor = 'text-rose-600 font-bold';
                            }

                            return (
                                <div
                                    key={w.dateStr}
                                    onClick={() => setSelectedDate(w.dateObj)}
                                    className="flex flex-col items-center cursor-pointer select-none group"
                                >
                                    {/* Day Short Name (MIN, SEN, SEL...) */}
                                    <span className="text-[10px] font-bold text-on-surface-variant tracking-wider mb-1 block font-label-mono">
                                        {w.dayShort}
                                    </span>

                                    {/* Date Bubble */}
                                    <div
                                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                                            isSelected
                                                ? 'bg-white dark:bg-surface border-2 border-primary text-primary font-bold shadow-xs scale-105 z-10'
                                                : 'hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <span
                                            className={`font-mono text-sm sm:text-base leading-none ${
                                                isSelected ? 'font-black text-primary' : numberColor
                                            }`}
                                        >
                                            {w.dateNum}
                                        </span>
                                    </div>

                                    {/* Indicator Dot */}
                                    <div className="h-2 flex items-center justify-center mt-1">
                                        {dateStatus.type === 'PERIOD_LOGGED' || dateStatus.type === 'PREDICTED_PERIOD' ? (
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                        ) : dateStatus.type === 'OVULATION' ? (
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        ) : dateStatus.type === 'FERTILE' ? (
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Next Week Button */}
                    <button
                        type="button"
                        onClick={handleNextWeek}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors shrink-0 cursor-pointer"
                        title="Minggu berikutnya"
                    >
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                </div>

                {/* Subtle vertical connector line */}
                <div className="w-[1.5px] h-5 bg-primary/25 mx-auto mt-1 pointer-events-none"></div>
            </div>

            {/* 2. CENTRAL FOCAL DIAL CIRCLE (Elegant & Clean) */}
            <div className="relative flex justify-center py-1">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
                    
                    {/* Selected Date Header */}
                    <span className="text-[11px] sm:text-xs font-semibold text-on-surface-variant mb-2 block">
                        {dayFullNames[selectedDate.getDay()]}, {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                    </span>

                    {/* Status Title */}
                    <span className="text-sm sm:text-base font-bold text-on-surface leading-tight block">
                        {evaluated.mainTitle}
                    </span>

                    {/* Big Bold Countdown / Day Number */}
                    {evaluated.daysCount && (
                        <div className="font-heading font-black text-3xl sm:text-4xl text-on-surface my-1.5 font-mono tracking-tight">
                            {evaluated.daysCount}
                        </div>
                    )}

                    {/* Probability / Fertility Subtitle */}
                    <span className="text-xs text-primary font-semibold mt-0.5 mb-5 block">
                        {evaluated.pregnancyChance}
                    </span>

                    {/* Theme Green Action Button */}
                    <button
                        type="button"
                        onClick={() => openLogForDate(selectedDate)}
                        className="px-6 py-2.5 rounded-full bg-primary hover:bg-[#005a54] active:scale-95 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                        <span className="material-symbols-outlined text-[15px]">edit_calendar</span>
                        <span>Catat Masa Haid</span>
                    </button>
                </div>
            </div>

            {/* 3. METABOLIC GLYCEMIC CONTEXT (Subtle Card) */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1.5 max-w-md mx-auto text-xs shadow-2xs">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                        <span className="material-symbols-outlined text-[16px]">insights</span>
                        <span>Fase {summary.phase_name || 'Siklus'} &amp; Sensitivitas Insulin</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSettingsModalOpen(true)}
                        className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                    >
                        Atur Siklus
                    </button>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-[11px]">
                    {summary.glycemic_impact || 'Perubahan hormon bulanan mempengaruhi bagaimana sel merespons hormon insulin.'}
                </p>
            </div>

            {/* MODAL 1: SETTINGS SIKLUS & HPHT */}
            {settingsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white dark:bg-surface rounded-3xl max-w-md w-full p-6 shadow-xl border border-surface-container space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-black text-sm text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">tune</span>
                                <span>Pengaturan Siklus Menstruasi</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setSettingsModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-on-surface block">
                                    Hari Pertama Haid Terakhir (HPHT):
                                </label>
                                <input
                                    type="date"
                                    value={lastPeriodDateInput}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setLastPeriodDateInput(e.target.value)}
                                    className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                    required
                                />
                                <span className="text-[10.5px] text-on-surface-variant block">
                                    Tanggal ketika darah haid pertama kali keluar di bulan terakhir.
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-on-surface block">
                                        Panjang Siklus (Hari):
                                    </label>
                                    <input
                                        type="number"
                                        min="21"
                                        max="45"
                                        value={cycleLengthInput}
                                        onChange={(e) => setCycleLengthInput(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                                        required
                                    />
                                    <span className="text-[10px] text-on-surface-variant block">
                                        Umumnya 21–35 hari (default: 28).
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <label className="font-bold text-on-surface block">
                                        Lama Haid (Hari):
                                    </label>
                                    <input
                                        type="number"
                                        min="2"
                                        max="10"
                                        value={periodLengthInput}
                                        onChange={(e) => setPeriodLengthInput(e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                                        required
                                    />
                                    <span className="text-[10px] text-on-surface-variant block">
                                        Umumnya 3–7 hari (default: 5).
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2 flex items-center gap-2">
                                <button
                                    type="submit"
                                    disabled={submittingSettings}
                                    className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-[#005a54] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                    <span>{submittingSettings ? 'Menyimpan...' : 'Perbarui Perhitungan Kalender'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSettingsModalOpen(false)}
                                    className="py-2.5 px-4 rounded-xl bg-surface-container text-xs font-semibold text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: CATATAN HAID & GEJALA */}
            {logModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white dark:bg-surface rounded-3xl max-w-md w-full p-6 shadow-xl border border-surface-container space-y-4 animate-scale-up max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-black text-sm text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">edit_calendar</span>
                                <span>Catat Masa Haid &amp; Gejala Tubuh</span>
                            </h3>
                            <button
                                type="button"
                                onClick={() => setLogModalOpen(false)}
                                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-xs hover:bg-surface-container-high transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveLog} className="space-y-3.5 text-xs">
                            <div className="space-y-1">
                                <label className="font-bold text-on-surface block">Tanggal Catatan:</label>
                                <input
                                    type="date"
                                    value={logDateStr}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setLogDateStr(e.target.value)}
                                    className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                                    required
                                />
                            </div>

                            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/20 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={isPeriodStart}
                                    onChange={(e) => setIsPeriodStart(e.target.checked)}
                                    className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer"
                                />
                                <div className="min-w-0">
                                    <span className="font-bold text-primary block text-xs">
                                        Hari Pertama Haid Baru
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant block">
                                        Memperbarui HPHT dan memulai siklus baru secara otomatis.
                                    </span>
                                </div>
                            </label>

                            <div className="space-y-1.5">
                                <label className="font-bold text-on-surface block">Intensitas Aliran / Darah:</label>
                                <div className="grid grid-cols-5 gap-1">
                                    {[
                                        { id: 'NONE', label: 'Tidak' },
                                        { id: 'SPOTTING', label: 'Flek' },
                                        { id: 'LIGHT', label: 'Ringan' },
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
                                                    : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:border-primary/40'
                                            }`}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="font-bold text-on-surface">Tingkat Kram / Nyeri Perut:</label>
                                    <span className="font-mono font-bold text-primary">{painLevel} / 5</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={painLevel}
                                    onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                                    className="w-full accent-primary cursor-pointer"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="font-bold text-on-surface block">Gejala yang Dirasakan:</label>
                                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1">
                                    {symptomOptions.map((sym) => (
                                        <button
                                            key={sym}
                                            type="button"
                                            onClick={() => toggleSymptom(sym)}
                                            className={`p-2 text-left rounded-xl text-[11px] font-medium border flex items-center justify-between transition-all cursor-pointer ${
                                                selectedSymptoms.includes(sym)
                                                    ? 'bg-primary/10 text-primary border-primary/40 font-bold'
                                                    : 'bg-surface-container-low text-on-surface-variant border-surface-container hover:bg-surface-container'
                                            }`}
                                        >
                                            <span className="truncate">{sym}</span>
                                            {selectedSymptoms.includes(sym) && (
                                                <span className="material-symbols-outlined text-[13px] text-primary shrink-0">check</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-on-surface block">Catatan Tambahan (Opsional):</label>
                                <input
                                    type="text"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Contoh: Sedikit lemas, ingin makan manis..."
                                    className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="pt-2 flex items-center gap-2">
                                <button
                                    type="submit"
                                    disabled={submittingLog}
                                    className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-[#005a54] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">save</span>
                                    <span>{submittingLog ? 'Menyimpan...' : 'Simpan Catatan Masa Haid'}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLogModalOpen(false)}
                                    className="py-2.5 px-4 rounded-xl bg-surface-container text-xs font-semibold text-on-surface cursor-pointer hover:bg-surface-container-high transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
