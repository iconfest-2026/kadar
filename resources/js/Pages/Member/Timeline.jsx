import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Timeline({ timelineItems, currentFilter, days }) {
    const getBadge = (type) => {
        switch (type) {
            case 'HEALTH_RECORD':
                return { bg: 'bg-primary/10 text-primary', icon: 'edit_note', label: 'Catatan Metrik' };
            case 'BEHAVIOR_SIGNAL':
                return { bg: 'bg-amber-500/10 text-amber-600', icon: 'insights', label: 'Sinyal HBE' };
            case 'INTERVENTION':
                return { bg: 'bg-emerald-500/10 text-emerald-600', icon: 'task_alt', label: 'Intervensi Aktif' };
            default:
                return { bg: 'bg-surface-container text-on-surface-variant', icon: 'info', label: 'Peristiwa' };
        }
    };

    return (
        <AppLayout title="Timeline Riwayat Kesehatan" activeTab="timeline">
            <Head title="Timeline Kesehatan — AEVYRA" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-2">
                    <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                        Rekam Jejak Kronologis Terverifikasi
                    </span>
                    <h1 className="font-heading font-bold text-2xl text-on-surface">
                        Timeline Perilaku & Intervensi Kesehatan
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Arsip kronologis yang mencatat entri metrik, kualifikasi sinyal HBE, intervensi mikro, dan interaksi pendampingan secara transparan.
                    </p>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <Link
                        href="/member/timeline"
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            !currentFilter
                                ? 'bg-primary text-on-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border border-surface-container'
                        }`}
                    >
                        Semua Peristiwa
                    </Link>
                    <Link
                        href="/member/timeline?metric=sleep_duration"
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            currentFilter === 'sleep_duration'
                                ? 'bg-primary text-on-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border border-surface-container'
                        }`}
                    >
                        Durasi Tidur
                    </Link>
                    <Link
                        href="/member/timeline?metric=water_intake"
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                            currentFilter === 'water_intake'
                                ? 'bg-primary text-on-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border border-surface-container'
                        }`}
                    >
                        Asupan Air
                    </Link>
                </div>

                {/* Timeline Stream */}
                <div className="relative border-l-2 border-surface-container ml-4 sm:ml-6 space-y-6 pb-8">
                    {timelineItems && timelineItems.length > 0 ? (
                        timelineItems.map((item, idx) => {
                            const badge = getBadge(item.type);
                            return (
                                <div key={idx} className="relative pl-6 sm:pl-8 group">
                                    {/* Timeline Node Dot */}
                                    <div className="absolute -left-2.25 top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                    </div>

                                    {/* Item Card */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-surface-container shadow-xs space-y-2 group-hover:border-primary/40 transition-colors">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-surface-container/60 pb-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-label-mono font-bold flex items-center gap-1 ${badge.bg}`}>
                                                    <span className="material-symbols-outlined text-[12px]">{badge.icon}</span>
                                                    <span>{badge.label}</span>
                                                </span>
                                                <span className="text-xs font-bold text-on-surface">
                                                    {item.type === 'HEALTH_RECORD'
                                                        ? `Catatan ${item.metric_type}`
                                                        : item.type === 'BEHAVIOR_SIGNAL'
                                                        ? item.signal_type
                                                        : item.title}
                                                </span>
                                            </div>
                                            <span className="text-[11px] font-label-mono text-on-surface-variant">
                                                {item.display_date}
                                            </span>
                                        </div>

                                        {/* Content based on type */}
                                        {item.type === 'HEALTH_RECORD' && (
                                            <div className="flex items-center justify-between text-xs">
                                                <div>
                                                    <span className="text-on-surface font-semibold text-sm">
                                                        {item.value} {item.unit}
                                                    </span>
                                                    {item.notes && (
                                                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                            {item.notes}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-label-mono px-2 py-0.5 rounded bg-surface-container text-on-surface-variant uppercase">
                                                    Sumber: {item.source}
                                                </span>
                                            </div>
                                        )}

                                        {item.type === 'BEHAVIOR_SIGNAL' && (
                                            <div className="text-xs space-y-1">
                                                <p className="text-on-surface font-medium">
                                                    Tingkat Urgensi: <strong>{item.severity}</strong> (Skor Prioritas: {item.priority_score})
                                                </p>
                                                {item.explanation && (
                                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                                        {item.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {item.type === 'INTERVENTION' && (
                                            <div className="text-xs space-y-1">
                                                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                                    {item.description}
                                                </p>
                                                <span className="inline-block text-[10px] font-label-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-bold">
                                                    Status: {item.status}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="pl-6 py-8 text-center text-xs text-on-surface-variant">
                            Belum ada rekam peristiwa untuk filter ini.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
