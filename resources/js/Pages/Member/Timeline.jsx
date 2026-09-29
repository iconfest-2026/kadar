import React from 'react';
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
    const getBadge = (type) => {
        switch (type) {
            case 'HEALTH_RECORD':
                return { bg: 'bg-primary/10 text-primary', icon: 'edit_note', label: 'Catatan Metrik' };
            case 'BEHAVIOR_SIGNAL':
                return { bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300', icon: 'insights', label: 'Sinyal HBE' };
            case 'INTERVENTION':
                return { bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300', icon: 'task_alt', label: 'Intervensi Aktif' };
            default:
                return { bg: 'bg-surface-container text-on-surface-variant', icon: 'info', label: 'Peristiwa' };
        }
    };

    const formatReadableTitle = (item) => {
        if (item.type === 'HEALTH_RECORD') {
            const conf = METRIC_CONFIG[item.metric_type];
            if (conf) return `Catatan ${conf.label}`;
            if (item.metric_label) return `Catatan ${item.metric_label}`;
            const clean = (item.metric_type || '').replace(/_/g, ' ');
            return `Catatan ${clean.charAt(0).toUpperCase() + clean.slice(1)}`;
        }
        if (item.type === 'BEHAVIOR_SIGNAL') {
            const conf = SIGNAL_CONFIG[item.signal_type];
            if (conf) return conf.label;
            const clean = (item.signal_type || '').replace(/_/g, ' ').toLowerCase();
            return clean.charAt(0).toUpperCase() + clean.slice(1);
        }
        return item.title ? item.title.replace(/_/g, ' ') : 'Program Intervensi Perilaku';
    };

    const formatItemValue = (item) => {
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

    const getMetricIcon = (metricType) => {
        return METRIC_CONFIG[metricType]?.icon || 'monitoring';
    };

    return (
        <AppLayout title="Timeline & Riwayat Kesehatan" activeTab="timeline">
            <Head title="Timeline Kesehatan & Riwayat Intervensi - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                
                {/* Hero Header Banner */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-lg">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-emerald-300">history_edu</span>
                            <span>AUDIT TRAIL • REKAM JEJAK KRONOLOGIS TERVERIFIKASI</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Timeline Perilaku &amp; Intervensi Kesehatan
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Arsip kronologis yang mencatat entri metrik, kualifikasi sinyal HBE, intervensi mikro, dan interaksi pendampingan secara transparan serta terenkripsi sesuai standar SatuSehat Kemenkes RI.
                        </p>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-surface-container">
                    <Link
                        href="/member/timeline"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                            !currentFilter
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        Semua Peristiwa ({timelineItems.length})
                    </Link>
                    <Link
                        href="/member/timeline?metric=sleep_duration"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'sleep_duration'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">bedtime</span>
                        <span>Durasi Tidur</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=water_intake"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'water_intake'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">water_drop</span>
                        <span>Asupan Air</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=blood_glucose"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'blood_glucose'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">bloodtype</span>
                        <span>Gula Darah</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=steps"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'steps'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">directions_walk</span>
                        <span>Langkah Kaki</span>
                    </Link>
                    <Link
                        href="/member/timeline?metric=mood_score"
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                            currentFilter === 'mood_score'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[15px]">sentiment_satisfied</span>
                        <span>Kesejahteraan (Mood)</span>
                    </Link>
                </div>

                {/* Timeline Stream */}
                <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-6 space-y-6 pb-8">
                    {timelineItems && timelineItems.length > 0 ? (
                        timelineItems.map((item, idx) => {
                            const badge = getBadge(item.type);
                            const displayTitle = formatReadableTitle(item);
                            const metricConfig = METRIC_CONFIG[item.metric_type];
                            const signalConfig = SIGNAL_CONFIG[item.signal_type];
                            const severity = formatSeverity(item.severity);
                            const status = formatStatus(item.status);

                            return (
                                <div key={idx} className="relative pl-6 sm:pl-8 group">
                                    {/* Timeline Node Dot */}
                                    <div className="absolute -left-2.25 top-2.5 w-4 h-4 rounded-full bg-white dark:bg-surface border-2 border-primary flex items-center justify-center shadow-xs">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>

                                    {/* Item Card */}
                                    <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3 group-hover:border-primary/40 transition-colors">
                                        
                                        {/* Card Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-surface-container/60 pb-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-label-mono font-bold flex items-center gap-1 ${badge.bg}`}>
                                                    <span className="material-symbols-outlined text-[13px]">{badge.icon}</span>
                                                    <span>{badge.label}</span>
                                                </span>
                                                <h3 className="text-xs sm:text-sm font-bold text-on-surface flex items-center gap-1.5">
                                                    {item.type === 'HEALTH_RECORD' && (
                                                        <span className="material-symbols-outlined text-primary text-[17px]">
                                                            {getMetricIcon(item.metric_type)}
                                                        </span>
                                                    )}
                                                    {item.type === 'BEHAVIOR_SIGNAL' && (
                                                        <span className="material-symbols-outlined text-amber-600 text-[17px]">
                                                            {signalConfig?.icon || 'insights'}
                                                        </span>
                                                    )}
                                                    {item.type === 'INTERVENTION' && (
                                                        <span className="material-symbols-outlined text-emerald-600 text-[17px]">
                                                            task_alt
                                                        </span>
                                                    )}
                                                    <span>{displayTitle}</span>
                                                </h3>
                                            </div>
                                            <span className="text-[11px] font-label-mono text-on-surface-variant shrink-0">
                                                {item.display_date}
                                            </span>
                                        </div>

                                        {/* 1. Content for HEALTH_RECORD */}
                                        {item.type === 'HEALTH_RECORD' && (
                                            <div className="space-y-2">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
                                                    <div>
                                                        <span className="text-[10px] text-on-surface-variant block uppercase font-label-mono font-semibold">
                                                            {metricConfig?.category || 'Nilai Pengukuran Terverifikasi'}
                                                        </span>
                                                        <span className="text-on-surface font-black text-base sm:text-lg font-mono">
                                                            {formatItemValue(item)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-label-mono px-2.5 py-1 rounded-xl bg-white dark:bg-surface border border-surface-container text-on-surface-variant font-medium">
                                                            Sumber: <strong className="text-on-surface">{item.source_label || formatSource(item.source)}</strong>
                                                        </span>
                                                    </div>
                                                </div>

                                                {item.notes && (
                                                    <p className="text-xs text-on-surface-variant italic px-1">
                                                        Catatan: "{item.notes}"
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* 2. Content for BEHAVIOR_SIGNAL */}
                                        {item.type === 'BEHAVIOR_SIGNAL' && (
                                            <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${severity.bg}`}>
                                                        {item.severity_label || severity.label}
                                                    </span>
                                                    {item.priority_score && (
                                                        <span className="text-[10px] font-label-mono text-on-surface-variant">
                                                            Skor Prioritas Klinis: <strong className="text-primary font-bold">{item.priority_score}</strong>
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-on-surface leading-relaxed font-medium">
                                                    {item.explanation || signalConfig?.category || 'Terdeteksi deviasi pola kebiasaan terhadap baseline stabilitas 14-hari.'}
                                                </p>
                                            </div>
                                        )}

                                        {/* 3. Content for INTERVENTION */}
                                        {item.type === 'INTERVENTION' && (
                                            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                                                <p className="text-xs text-on-surface leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <div className="flex items-center justify-between pt-1">
                                                    <span className={`inline-block text-[10px] font-label-mono px-2.5 py-0.5 rounded-full font-bold ${status.bg}`}>
                                                        Status: {item.status_label || status.label}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="p-8 text-center rounded-3xl border border-dashed border-surface-container bg-surface-container-low space-y-3">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant">event_busy</span>
                            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                Belum ada riwayat aktivitas atau catatan kesehatan untuk filter ini.
                            </p>
                            <Link
                                href="/member/timeline"
                                className="inline-block px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs"
                            >
                                Lihat Semua Peristiwa
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
