import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function TimelineDetail({ record }) {
    if (!record) return null;

    const isFood = record.metric_type === 'FOOD_LOG' || record.metric_type === 'food_log';
    const metadata = record.metadata || {};

    const getGlycemicBadge = (level) => {
        if (level === 'TINGGI') return { label: 'Tinggi', bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20' };
        if (level === 'RENDAH') return { label: 'Rendah', bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' };
        return { label: 'Sedang', bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' };
    };

    return (
        <AppLayout title="Detail Riwayat" activeTab="timeline">
            <Head title={`${record.title} - Detail Riwayat AEVYRA`} />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
                
                {/* Top Nav Bar */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/member/timeline"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        <span>Kembali ke Riwayat</span>
                    </Link>

                    <span className="text-[11px] font-label-mono text-on-surface-variant font-medium">
                        ID: #{record.id}
                    </span>
                </div>

                {/* Hero Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[20px]">
                                    {isFood ? 'restaurant' : 'vital_signs'}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-label-mono uppercase tracking-wider text-primary font-bold block">
                                    {record.metric_label}
                                </span>
                                <h1 className="font-heading font-bold text-base sm:text-lg text-on-surface truncate">
                                    {record.title}
                                </h1>
                            </div>
                        </div>

                        {isFood && metadata.glycemic_load_level && (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-label-mono border shrink-0 ${getGlycemicBadge(metadata.glycemic_load_level).bg}`}>
                                GL {metadata.glycemic_load_level}
                            </span>
                        )}
                    </div>

                    {/* Timestamp & Source */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-on-surface-variant pt-2 border-t border-surface-container/60">
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">calendar_today</span>
                            <span>{record.display_date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-primary">devices</span>
                            <span>{record.source_label}</span>
                        </div>
                        {record.confidence_score && (
                            <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                                    <span>AI: {Math.round(record.confidence_score * 100)}%</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Primary Metric Value Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 text-center space-y-0.5">
                    <span className="text-[10px] font-label-mono uppercase text-emerald-800 dark:text-emerald-300 font-bold tracking-wider">
                        {isFood ? 'Total Nilai Kalori' : 'Hasil Pengukuran'}
                    </span>
                    <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-900 dark:text-emerald-100 font-mono">
                        {Math.round(record.value || 0)}{' '}
                        <span className="text-sm font-normal text-emerald-700 dark:text-emerald-400">
                            {record.unit || (isFood ? 'kkal' : '')}
                        </span>
                    </div>
                </div>

                {/* FOOD LOG DETAILS */}
                {isFood && (
                    <div className="space-y-3.5">
                        {/* BPOM Registry if present */}
                        {metadata.bpom && metadata.bpom !== '-' && (
                            <div className="p-3 rounded-xl bg-white dark:bg-surface border border-surface-container flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5 text-on-surface">
                                    <span className="material-symbols-outlined text-primary text-[16px]">verified_user</span>
                                    <span className="text-xs">Sertifikasi BPOM RI:</span>
                                </div>
                                <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded-md bg-primary/10">
                                    {metadata.bpom}
                                </span>
                            </div>
                        )}

                        {/* Nutrition Breakdown 4 Cards */}
                        <div className="space-y-2">
                            <h3 className="font-heading font-bold text-xs text-on-surface flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[16px]">nutrition</span>
                                <span>Rincian Nutrisi Teranalisis</span>
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                <div className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-center space-y-0.5 shadow-2xs">
                                    <span className="text-[9px] font-label-mono uppercase text-on-surface-variant font-bold block">Gula</span>
                                    <div className="font-mono font-bold text-sm text-rose-600">
                                        {metadata.sugar_g ?? '-'} <span className="text-[10px] font-normal">g</span>
                                    </div>
                                    <span className="text-[9px] text-on-surface-variant block">Kandungan Glukosa</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-center space-y-0.5 shadow-2xs">
                                    <span className="text-[9px] font-label-mono uppercase text-on-surface-variant font-bold block">Karbohidrat</span>
                                    <div className="font-mono font-bold text-sm text-amber-600">
                                        {metadata.carbs_g ?? '-'} <span className="text-[10px] font-normal">g</span>
                                    </div>
                                    <span className="text-[9px] text-on-surface-variant block">Energi Cepat</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-center space-y-0.5 shadow-2xs">
                                    <span className="text-[9px] font-label-mono uppercase text-on-surface-variant font-bold block">Protein</span>
                                    <div className="font-mono font-bold text-sm text-emerald-600">
                                        {metadata.protein_g ?? '-'} <span className="text-[10px] font-normal">g</span>
                                    </div>
                                    <span className="text-[9px] text-on-surface-variant block">Regenerasi Otot</span>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-center space-y-0.5 shadow-2xs">
                                    <span className="text-[9px] font-label-mono uppercase text-on-surface-variant font-bold block">Natrium</span>
                                    <div className="font-mono font-bold text-sm text-sky-600">
                                        {metadata.sodium_mg ?? '-'} <span className="text-[10px] font-normal">mg</span>
                                    </div>
                                    <span className="text-[9px] text-on-surface-variant block">Garam / Elektrolit</span>
                                </div>
                            </div>
                        </div>

                        {/* Glycemic Load Evaluation */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1.5 shadow-2xs">
                            <h3 className="font-heading font-bold text-xs text-primary flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[16px]">ssid_chart</span>
                                <span>Evaluasi Beban Glikemik (Glycemic Load)</span>
                            </h3>
                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                Skor Beban Glikemik makanan ini diperkirakan <strong>{metadata.glycemic_load ?? '15'}</strong> ({metadata.glycemic_load_level ?? 'SEDANG'}). 
                                Indikator ini menggambarkan seberapa cepat dan seberapa tinggi karbohidrat dalam makanan ini akan meningkatkan glukosa darah pasca makan.
                            </p>
                        </div>

                        {/* Clinical Note / AI Insight */}
                        {(metadata.clinical_note || record.notes) && (
                            <div className="p-3.5 sm:p-4 rounded-2xl bg-surface-container-low border border-primary/15 space-y-1.5">
                                <h3 className="font-heading font-bold text-xs text-primary flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
                                    <span>Wawasan Medis &amp; Saran Gaya Hidup AI</span>
                                </h3>
                                <p className="text-[11px] text-on-surface leading-relaxed">
                                    {metadata.clinical_note || record.notes}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Non-Food Health Record Notes */}
                {!isFood && record.notes && (
                    <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1.5 shadow-2xs">
                        <h3 className="font-heading font-bold text-xs text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">notes</span>
                            <span>Catatan &amp; Observasi</span>
                        </h3>
                        <p className="text-[11px] text-on-surface leading-relaxed">
                            "{record.notes}"
                        </p>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                    <Link
                        href="/member/scanner"
                        className="w-full py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-1.5 text-center"
                    >
                        <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                        <span>Pindai Makanan Lainnya</span>
                    </Link>

                    <Link
                        href="/member/timeline"
                        className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-surface border border-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-1.5 text-center"
                    >
                        <span className="material-symbols-outlined text-[16px]">list</span>
                        <span>Semua Riwayat</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

