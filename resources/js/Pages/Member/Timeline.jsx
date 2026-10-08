import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

// Dictionary mapping for metrics
const METRIC_CONFIG = {
    sleep_duration: {
        label: 'Durasi Tidur',
        icon: 'bedtime',
        category: 'Istirahat & Pemulihan',
        formatValue: (val, unit) => {
            const num = parseFloat(val);
            if (isNaN(num)) return `${val} ${unit || ''}`;
            if (unit === 'minutes' || num > 24) {
                const hours = Math.floor(num / 60);
                const minutes = Math.round(num % 60);
                return minutes > 0 ? `${hours} Jam ${minutes} Menit` : `${hours} Jam`;
            }
            const hours = Math.floor(num);
            const minutes = Math.round((num - hours) * 60);
            return minutes > 0 ? `${hours} Jam ${minutes} Menit` : `${hours} Jam`;
        },
    },
    water_intake: {
        label: 'Asupan Air Minum',
        icon: 'water_drop',
        category: 'Hidrasi & Keseimbangan',
        formatValue: (val) => `${Number(val || 0).toLocaleString('id-ID')} ml`,
    },
    blood_glucose: {
        label: 'Gula Darah Puasa',
        icon: 'bloodtype',
        category: 'Metabolik & Glukosa',
        formatValue: (val) => `${val} mg/dL`,
    },
    steps: {
        label: 'Langkah Kaki Harian',
        icon: 'directions_walk',
        category: 'Aktivitas Fisik',
        formatValue: (val) => `${Number(val || 0).toLocaleString('id-ID')} Langkah`,
    },
    mood_score: {
        label: 'Kesejahteraan Mental (Mood)',
        icon: 'sentiment_satisfied',
        category: 'Kesehatan Holistik',
        formatValue: (val) => {
            const score = Number(val);
            const moodText = score >= 4 ? 'Sangat Baik' : score === 3 ? 'Cukup / Normal' : 'Butuh Relaksasi';
            return `Skor ${score} / 5 (${moodText})`;
        },
    },
    heart_rate: {
        label: 'Denyut Jantung',
        icon: 'favorite',
        category: 'Kardiovaskular',
        formatValue: (val) => `${val} bpm`,
    },
    blood_pressure_systolic: {
        label: 'Tekanan Darah Sistolik',
        icon: 'speed',
        category: 'Kardiovaskular',
        formatValue: (val) => `${val} mmHg`,
    },
    blood_pressure_diastolic: {
        label: 'Tekanan Darah Diastolik',
        icon: 'speed',
        category: 'Kardiovaskular',
        formatValue: (val) => `${val} mmHg`,
    },
    weight: {
        label: 'Berat Badan',
        icon: 'scale',
        category: 'Komposisi Tubuh',
        formatValue: (val) => `${val} kg`,
    },
    body_weight: {
        label: 'Berat Badan',
        icon: 'scale',
        category: 'Komposisi Tubuh',
        formatValue: (val) => `${val} kg`,
    },
    calories: {
        label: 'Asupan Kalori',
        icon: 'restaurant',
        category: 'Nutrisi Harian',
        formatValue: (val) => `${Number(val || 0).toLocaleString('id-ID')} kkal`,
    },
    glycemic_load: {
        label: 'Beban Glikemik (GL)',
        icon: 'ssid_chart',
        category: 'Keseimbangan Glukosa',
        formatValue: (val) => `Skor Beban Glikemik ${val}`,
    },
    FOOD_LOG: {
        label: 'Pindai Makanan & Gizi',
        icon: 'photo_camera',
        category: 'Jurnal Nutrisi Kamera AI',
        formatValue: (val) => `${Number(val || 0).toLocaleString('id-ID')} kkal`,
    },
    food_log: {
        label: 'Pindai Makanan & Gizi',
        icon: 'photo_camera',
        category: 'Jurnal Nutrisi Kamera AI',
        formatValue: (val) => `${Number(val || 0).toLocaleString('id-ID')} kkal`,
    },
};

// Dictionary mapping for signals
const SIGNAL_CONFIG = {
    SLEEP_DEFICIT: {
        label: 'Defisit Durasi Tidur',
        icon: 'bedtime_off',
        category: 'Deviasi Pola Istirahat',
    },
    SLEEP_DECLINE: {
        label: 'Penurunan Kualitas Tidur',
        icon: 'bedtime_off',
        category: 'Deviasi Pola Istirahat',
    },
    GLUCOSE_SPIKE: {
        label: 'Deteksi Lonjakan Glukosa Postprandial',
        icon: 'trending_up',
        category: 'Respon Glikemik Akut',
    },
    HYDRATION_LOW: {
        label: 'Peringatan Asupan Cairan Kurang',
        icon: 'water_drop',
        category: 'Keseimbangan Cairan',
    },
    SEDENTARY_STREAK: {
        label: 'Kurang Aktivitas Fisik / Pola Menetap',
        icon: 'airline_seat_recline_normal',
        category: 'Perilaku Statis',
    },
    GLYCEMIC_VARIABILITY_HIGH: {
        label: 'Variabilitas Glikemik Fluktuatif',
        icon: 'insights',
        category: 'Fluktuasi Gula Darah',
    },
    LATE_NIGHT_MEAL: {
        label: 'Pola Makan Larut Malam',
        icon: 'dinner_dining',
        category: 'Ritme Sirkadian',
    },
    VITALITY_DROP: {
        label: 'Penurunan Indikator Vitalitas & Kebugaran',
        icon: 'ecg_heart',
        category: 'Kesiapan Biologis',
    },
};

// Dictionary mapping for severity
const SEVERITY_CONFIG = {
    ATTENTION: { label: 'Perlu Perhatian', bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20' },
    CRITICAL: { label: 'Tingkat Kritis', bg: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20' },
    NOTICE: { label: 'Pemberitahuan Khusus', bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
    FOLLOW_UP: { label: 'Perlu Tindak Lanjut', bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' },
    INFO: { label: 'Informasi Normal', bg: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20' },
    STABLE: { label: 'Stabil & Optimal', bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' },
};

// Dictionary mapping for sources
const SOURCE_CONFIG = {
    manual: 'Input Mandiri',
    device: 'Sinkronisasi Jam Pintar',
    wearable: 'Jam Pintar / Wearable',
    apple_health: 'Apple Health',
    google_fit: 'Google Health Connect',
    ocr_scan: 'Pemindai Kamera Gizi & BPOM',
    camera_scanner: 'Pemindai Kamera Gizi & BPOM',
    scanner: 'Pemindai Kamera AI & BPOM',
    SCANNER: 'Pemindai Kamera AI & BPOM',
    doctor_entry: 'Entri Dokter Spesialis',
    ai_estimation: 'Estimasi AI Preventif',
};

// Dictionary mapping for status
const STATUS_CONFIG = {
    ACTIVE: { label: 'Sedang Berjalan', bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
    IN_PROGRESS: { label: 'Sedang Berjalan', bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
    COMPLETED: { label: 'Telah Selesai', bg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' },
    PENDING: { label: 'Menunggu Evaluasi', bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
    CANCELLED: { label: 'Dibatalkan', bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-300' },
    UNRESOLVED: { label: 'Menunggu Tindakan', bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
    RESOLVED: { label: 'Terselesaikan', bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
};

export default function Timeline({ timelineItems = [], currentFilter, days = 30 }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const getBadge = (type) => {
        switch (type) {
            case 'HEALTH_RECORD':
                return { bg: 'bg-primary/10 text-primary', icon: 'edit_note', label: 'Metrik' };
            case 'BEHAVIOR_SIGNAL':
                return { bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300', icon: 'insights', label: 'Sinyal' };
            case 'INTERVENTION':
                return { bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', icon: 'task_alt', label: 'Intervensi' };
            default:
                return { bg: 'bg-surface-container text-on-surface-variant', icon: 'info', label: 'Catatan' };
        }
    };

    const formatReadableTitle = (item) => {
        if (item.type === 'HEALTH_RECORD') {
            if (item.metric_type === 'FOOD_LOG' || item.metric_type === 'food_log') {
                return item.value_text || item.metadata?.food_name || 'Makanan / Minuman';
            }
            const conf = METRIC_CONFIG[item.metric_type];
            if (conf) return conf.label;
            if (item.metric_label) return item.metric_label;
            const clean = (item.metric_type || '').replace(/_/g, ' ');
            return clean.charAt(0).toUpperCase() + clean.slice(1);
        }
        if (item.type === 'BEHAVIOR_SIGNAL') {
            const conf = SIGNAL_CONFIG[item.signal_type];
            if (conf) return conf.label;
            const clean = (item.signal_type || '').replace(/_/g, ' ').toLowerCase();
            return clean.charAt(0).toUpperCase() + clean.slice(1);
        }
        return item.title ? item.title.replace(/_/g, ' ') : 'Program Intervensi';
    };

    const formatItemValue = (item) => {
        if (item.metric_type === 'FOOD_LOG' || item.metric_type === 'food_log') {
            return `${Math.round(item.value || 0)} kkal`;
        }
        if (item.formatted_value) return item.formatted_value;
        const conf = METRIC_CONFIG[item.metric_type];
        if (conf && conf.formatValue) {
            return conf.formatValue(item.value, item.unit);
        }
        return `${item.value} ${item.unit || ''}`.trim();
    };

    const formatSource = (sourceKey) => {
        if (!sourceKey) return 'Input Mandiri';
        return SOURCE_CONFIG[sourceKey.toLowerCase()] || sourceKey.replace(/_/g, ' ');
    };

    const formatSeverity = (sevKey) => {
        if (!sevKey) return { label: 'Pemberitahuan', bg: 'bg-amber-500/10 text-amber-700 border-amber-500/20' };
        return SEVERITY_CONFIG[sevKey.toUpperCase()] || { label: sevKey.replace(/_/g, ' '), bg: 'bg-surface-container text-on-surface-variant' };
    };

    const formatStatus = (statKey) => {
        if (!statKey) return { label: 'Sedang Berjalan', bg: 'bg-emerald-500/10 text-emerald-700' };
        return STATUS_CONFIG[statKey.toUpperCase()] || { label: statKey.replace(/_/g, ' '), bg: 'bg-surface-container text-on-surface-variant' };
    };

    const getItemIcon = (item) => {
        if (item.type === 'HEALTH_RECORD') {
            return METRIC_CONFIG[item.metric_type]?.icon || 'monitoring';
        }
        if (item.type === 'BEHAVIOR_SIGNAL') {
            return SIGNAL_CONFIG[item.signal_type]?.icon || 'insights';
        }
        return 'task_alt';
    };

    return (
        <AppLayout title="Riwayat & Aktivitas" activeTab="timeline">
            <Head title="Riwayat Kesehatan - AEVYRA" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 space-y-4">
                
                {/* Mobile-Style Clean Header */}
                <div className="flex items-center justify-between pb-1">
                    <div>
                        <h1 className="font-heading font-black text-xl sm:text-2xl text-on-surface tracking-tight">
                            Riwayat Aktivitas
                        </h1>
                        <p className="text-xs text-on-surface-variant">
                            Klik kartu untuk melihat rincian &amp; wawasan klinis lengkap
                        </p>
                    </div>

                    <Link
                        href="/member/scanner"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-container transition-all"
                    >
                        <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                        <span className="hidden sm:inline">Pindai Baru</span>
                    </Link>
                </div>

                {/* Filter Chips - Compact Mobile Scroll */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <Link
                        href="/member/timeline"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                            !currentFilter
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Semua ({timelineItems.length})
                    </Link>
                    <Link
                        href="/member/timeline?metric=FOOD_LOG"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'FOOD_LOG'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">document_scanner</span>
                        <span>Makanan / Scanner</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=blood_glucose"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'blood_glucose'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">bloodtype</span>
                        <span>Gula Darah</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=sleep_duration"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'sleep_duration'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">bedtime</span>
                        <span>Tidur</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=steps"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'steps'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">directions_walk</span>
                        <span>Langkah</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=water_intake"
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'water_intake'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">water_drop</span>
                        <span>Air</span>
                    </Link>
                </div>

                {/* Mobile-Style Simple Card List */}
                <div className="space-y-2.5">
                    {timelineItems && timelineItems.length > 0 ? (
                        timelineItems.map((item, idx) => {
                            const isFood = item.metric_type === 'FOOD_LOG' || item.metric_type === 'food_log';
                            const title = formatReadableTitle(item);
                            const valText = formatItemValue(item);
                            const icon = getItemIcon(item);
                            const isHealthRecord = item.type === 'HEALTH_RECORD';
                            const detailHref = isHealthRecord ? `/member/timeline/${item.id}` : null;

                            const CardInner = () => (
                                <>
                                    {/* Left: Icon & Main Info */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                                            isFood
                                                ? 'bg-emerald-500/10 text-emerald-600'
                                                : item.type === 'BEHAVIOR_SIGNAL'
                                                ? 'bg-amber-500/10 text-amber-600'
                                                : item.type === 'INTERVENTION'
                                                ? 'bg-teal-500/10 text-teal-600'
                                                : 'bg-primary/10 text-primary'
                                        }`}>
                                            <span className="material-symbols-outlined text-[22px]">{icon}</span>
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-heading font-bold text-sm text-on-surface truncate">
                                                    {title}
                                                </h3>
                                                {isFood && item.metadata?.glycemic_load_level && (
                                                    <span className={`px-2 py-0.2 rounded-full font-label-mono text-[9px] font-bold shrink-0 ${
                                                        item.metadata.glycemic_load_level === 'TINGGI'
                                                            ? 'bg-rose-500/10 text-rose-700'
                                                            : item.metadata.glycemic_load_level === 'RENDAH'
                                                            ? 'bg-emerald-500/10 text-emerald-700'
                                                            : 'bg-amber-500/10 text-amber-700'
                                                    }`}>
                                                        GL {item.metadata.glycemic_load_level}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                                                <span>{item.display_date}</span>
                                                <span>•</span>
                                                <span className="truncate">{item.source_label || formatSource(item.source)}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right: Value & Chevron Arrow */}
                                    <div className="flex items-center gap-2.5 shrink-0">
                                        {item.type === 'HEALTH_RECORD' && (
                                            <div className="text-right">
                                                <span className="font-mono font-bold text-sm text-on-surface block">
                                                    {valText}
                                                </span>
                                                {isFood && item.metadata?.sugar_g !== undefined && (
                                                    <span className="text-[10px] text-on-surface-variant font-label-mono block">
                                                        Gula {item.metadata.sugar_g}g
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {item.type === 'BEHAVIOR_SIGNAL' && (
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-label-mono ${formatSeverity(item.severity).bg}`}>
                                                {formatSeverity(item.severity).label}
                                            </span>
                                        )}

                                        {item.type === 'INTERVENTION' && (
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-label-mono ${formatStatus(item.status).bg}`}>
                                                {formatStatus(item.status).label}
                                            </span>
                                        )}

                                        <span className="material-symbols-outlined text-on-surface-variant/60 group-hover:text-primary transition-colors text-[20px]">
                                            chevron_right
                                        </span>
                                    </div>
                                </>
                            );

                            return detailHref ? (
                                <Link
                                    key={idx}
                                    href={detailHref}
                                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99] block"
                                >
                                    <CardInner />
                                </Link>
                            ) : (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedItem(item)}
                                    className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/50 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                                >
                                    <CardInner />
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center rounded-3xl border border-dashed border-surface-container bg-surface-container-low space-y-3">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant">event_busy</span>
                            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                Belum ada riwayat tercatat untuk kategori ini.
                            </p>
                            <Link
                                href="/member/timeline"
                                className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs"
                            >
                                Tampilkan Semua
                            </Link>
                        </div>
                    )}
                </div>

                {/* ========================================================================= */}
                {/* DETAIL MODAL / BOTTOM SHEET (POP-UP SAAT CARD DI-KLIK)                    */}
                {/* ========================================================================= */}
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                        <div 
                            className="bg-white dark:bg-surface w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-surface-container space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-surface-container pb-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">
                                            {getItemIcon(selectedItem)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-black text-base text-on-surface">
                                            {formatReadableTitle(selectedItem)}
                                        </h3>
                                        <p className="text-[11px] font-label-mono text-on-surface-variant">
                                            {selectedItem.display_date} • {selectedItem.source_label || formatSource(selectedItem.source)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>

                            {/* Modal Body: Food Log Scanner Details */}
                            {(selectedItem.metric_type === 'FOOD_LOG' || selectedItem.metric_type === 'food_log') && (
                                <div className="space-y-4">
                                    {/* Primary Value Card */}
                                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-label-mono uppercase text-emerald-800 dark:text-emerald-300 font-bold block">
                                                Estimasi Energi Makanan
                                            </span>
                                            <span className="font-heading font-black text-2xl text-emerald-900 dark:text-emerald-200">
                                                {Math.round(selectedItem.value || 0)} <span className="text-sm font-normal">kkal</span>
                                            </span>
                                        </div>
                                        {selectedItem.metadata?.glycemic_load_level && (
                                            <div className="text-right">
                                                <span className="text-[10px] font-label-mono uppercase text-emerald-800 dark:text-emerald-300 font-bold block">
                                                    Beban Glikemik
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-label-mono bg-white dark:bg-surface text-emerald-800 shadow-2xs">
                                                    {selectedItem.metadata.glycemic_load_level} ({selectedItem.metadata.glycemic_load ?? '-'})
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* BPOM Registration */}
                                    {selectedItem.metadata?.bpom && selectedItem.metadata.bpom !== '-' && (
                                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
                                            <span className="text-on-surface-variant font-medium">Registrasi BPOM RI:</span>
                                            <span className="font-mono font-bold text-primary">{selectedItem.metadata.bpom}</span>
                                        </div>
                                    )}

                                    {/* Nutrition Macros Grid */}
                                    {selectedItem.metadata && (
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-bold text-on-surface">Rincian Makronutrisi:</span>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-center">
                                                    <span className="text-[10px] text-on-surface-variant font-label-mono uppercase block">Gula</span>
                                                    <span className="text-sm font-bold font-mono text-on-surface">{selectedItem.metadata.sugar_g ?? '-'} g</span>
                                                </div>
                                                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-center">
                                                    <span className="text-[10px] text-on-surface-variant font-label-mono uppercase block">Karbohidrat</span>
                                                    <span className="text-sm font-bold font-mono text-on-surface">{selectedItem.metadata.carbs_g ?? '-'} g</span>
                                                </div>
                                                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-center">
                                                    <span className="text-[10px] text-on-surface-variant font-label-mono uppercase block">Protein</span>
                                                    <span className="text-sm font-bold font-mono text-on-surface">{selectedItem.metadata.protein_g ?? '-'} g</span>
                                                </div>
                                                <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-center">
                                                    <span className="text-[10px] text-on-surface-variant font-label-mono uppercase block">Natrium</span>
                                                    <span className="text-sm font-bold font-mono text-on-surface">{selectedItem.metadata.sodium_mg ?? '-'} mg</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Clinical Insight AI */}
                                    {(selectedItem.metadata?.clinical_note || selectedItem.notes) && (
                                        <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/20 space-y-1.5">
                                            <h4 className="font-bold text-xs text-primary flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                                                <span>Analisis AI &amp; Anjuran Klinis</span>
                                            </h4>
                                            <p className="text-xs text-on-surface leading-relaxed">
                                                {selectedItem.metadata?.clinical_note || selectedItem.notes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Modal Body: Standard Health Record */}
                            {selectedItem.type === 'HEALTH_RECORD' && selectedItem.metric_type !== 'FOOD_LOG' && selectedItem.metric_type !== 'food_log' && (
                                <div className="space-y-3">
                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container text-center space-y-1">
                                        <span className="text-[10px] font-label-mono uppercase text-on-surface-variant">Hasil Pengukuran</span>
                                        <div className="font-heading font-black text-3xl text-on-surface font-mono">
                                            {formatItemValue(selectedItem)}
                                        </div>
                                    </div>
                                    {selectedItem.notes && (
                                        <div className="p-3.5 rounded-2xl bg-surface-container-low text-xs text-on-surface">
                                            <strong className="text-on-surface-variant block mb-1">Catatan Tambahan:</strong>
                                            "{selectedItem.notes}"
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Modal Body: Behavior Signal */}
                            {selectedItem.type === 'BEHAVIOR_SIGNAL' && (
                                <div className="space-y-3">
                                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-label-mono ${formatSeverity(selectedItem.severity).bg}`}>
                                                {selectedItem.severity_label || formatSeverity(selectedItem.severity).label}
                                            </span>
                                            {selectedItem.priority_score && (
                                                <span className="text-xs font-mono font-bold text-on-surface">
                                                    Prioritas: {selectedItem.priority_score}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-on-surface leading-relaxed">
                                            {selectedItem.explanation || 'Terdeteksi deviasi pola kebiasaan terhadap baseline stabilitas.'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Modal Body: Intervention */}
                            {selectedItem.type === 'INTERVENTION' && (
                                <div className="space-y-3">
                                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                                        <p className="text-xs text-on-surface leading-relaxed">
                                            {selectedItem.description}
                                        </p>
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold font-label-mono ${formatStatus(selectedItem.status).bg}`}>
                                            Status: {selectedItem.status_label || formatStatus(selectedItem.status).label}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Modal Footer */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedItem(null)}
                                    className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
