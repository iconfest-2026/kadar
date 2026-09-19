import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function MemberDetail({ member, baselines, recentRecords, signals, interventions, consultations }) {
    return (
        <AppLayout title={`Detail Member: ${member.name}`} activeTab="caseload">
            <Head title={`Detail ${member.name} - Instruktur Kadar`} />

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <Link
                        href="/instructor/dashboard"
                        className="p-2 rounded-xl bg-surface border border-surface-container text-on-surface-variant hover:text-on-surface"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    </Link>
                    <div>
                        <h1 className="font-heading font-bold text-2xl text-on-surface">{member.name}</h1>
                        <p className="text-xs text-on-surface-variant">{member.email} • {member.member_profile?.occupation || 'Member'}</p>
                    </div>
                </div>

                {/* Baselines overview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {baselines?.map((b) => (
                        <div key={b.id} className="p-4 rounded-2xl bg-surface border border-surface-container shadow-xs space-y-1">
                            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant font-bold">
                                Baseline {b.metric_type}
                            </span>
                            <div className="text-xl font-heading font-bold text-on-surface">
                                {b.value_primary} <span className="text-xs font-normal text-on-surface-variant">± {b.value_secondary}</span>
                            </div>
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-label-mono bg-emerald-500/10 text-emerald-700 font-bold">
                                {b.status} ({b.sample_count} sampel)
                            </span>
                        </div>
                    ))}
                </div>

                {/* Signals & Interventions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Signals */}
                    <div className="p-6 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-4">
                        <h2 className="font-heading font-bold text-base text-on-surface">Riwayat Sinyal Perilaku</h2>
                        <div className="space-y-2">
                            {signals?.map((s) => (
                                <div key={s.id} className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-on-surface">{s.signal_type}</strong>
                                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/10 text-amber-700">
                                            {s.severity}
                                        </span>
                                    </div>
                                    <p className="text-on-surface-variant text-[11px]">{s.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interventions */}
                    <div className="p-6 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-4">
                        <h2 className="font-heading font-bold text-base text-on-surface">Program Intervensi Ditugaskan</h2>
                        <div className="space-y-2">
                            {interventions?.map((i) => (
                                <div key={i.id} className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-on-surface">{i.title}</strong>
                                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-700">
                                            {i.status}
                                        </span>
                                    </div>
                                    <p className="text-on-surface-variant text-[11px]">{i.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
