import React from 'react';
import { Head, Link } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function MemberDetail({ member, baselines = [], recentRecords = [], signals = [], interventions = [], consultations = [] }) {
    return (
        <InstructorLayout activeNav="members" title={`Profil & Rekam Binaan: ${member.name}`}>
            <Head title={`Detail ${member.name} - Instruktur AEVYRA`} />

            <div className="space-y-6">
                {/* Top Profile Header with Glassmorphism */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/instructor/members"
                            className="p-2.5 rounded-2xl bg-white/80 hover:bg-primary hover:text-white border border-primary/15 text-primary shadow-xs transition-all"
                            title="Kembali ke daftar member"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </Link>
                        <div className="flex items-center gap-3.5">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary font-heading font-black flex items-center justify-center text-xl shadow-xs">
                                {member.name?.charAt(0) || 'M'}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-heading font-bold text-2xl text-primary">{member.name}</h2>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15">
                                        Member Terbina
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                    {member.email} • {member.member_profile?.occupation || 'Profesi Umum'} • Usia: {member.member_profile?.date_of_birth ? new Date().getFullYear() - new Date(member.member_profile.date_of_birth).getFullYear() + ' th' : '28 th'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full md:w-auto">
                        <Link
                            href="/instructor/interventions"
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-xs transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">add_task</span>
                            <span>Buat Intervensi</span>
                        </Link>
                    </div>
                </div>

                {/* Physiological Baselines Overview */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 shadow-xs border border-primary/10">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
                                Garis Pangkal Fisiologis (Rolling Baselines)
                            </h3>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                Rentang nilai acuan biologis personal berdasarkan observasi 14 hari terakhir
                            </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-label-mono font-bold">
                            Validasi DQS
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {baselines.map((b) => (
                            <div key={b.id} className="p-5 rounded-2xl bg-white/80 border border-primary/10 shadow-xs hover:border-primary/30 transition-all space-y-2">
                                <span className="font-label-mono text-[11px] uppercase text-on-surface-variant font-bold block">
                                    {b.metric_type?.replace('_', ' ')}
                                </span>
                                <div className="text-2xl font-heading font-black text-primary">
                                    {b.value_primary} <span className="text-xs font-normal text-on-surface-variant font-sans">± {b.value_secondary || 0}</span>
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-label-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                                        {b.status || 'TERSEDIA'}
                                    </span>
                                    <span className="text-[11px] text-on-surface-variant font-label-mono">
                                        {b.sample_count || 14} sampel
                                    </span>
                                </div>
                            </div>
                        ))}

                        {baselines.length === 0 && (
                            <div className="col-span-3 py-6 text-center text-on-surface-variant text-xs font-medium">
                                Sedang mengumpulkan data sampel awal untuk mengkalkulasi baseline biologis.
                            </div>
                        )}
                    </div>
                </div>

                {/* 2-Column Section: Signals & Interventions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Signals Feed */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 bg-white/40 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">query_stats</span>
                                    Histori Sinyal Deviasi Perilaku
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Deteksi anomali gaya hidup</p>
                            </div>
                        </div>

                        <div className="p-5 flex-1 divide-y divide-primary/5 space-y-3">
                            {signals.map((s) => (
                                <div key={s.id} className="pt-3 first:pt-0 rounded-2xl p-4 bg-white/60 border border-primary/5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-sm font-bold text-on-surface">{s.signal_type || 'Anomali Pola Makan'}</strong>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                            s.severity === 'ATTENTION'
                                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                                            : 'bg-amber-50 text-amber-800 border-amber-200'
                                        }`}>
                                            {s.severity || 'NOTICE'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">{s.explanation || 'Terdeteksi pola konsumsi gula tinggi tanpa kompensasi aktivitas fisik terukur.'}</p>
                                    <div className="text-[10px] text-on-surface-variant/70 font-label-mono pt-1">
                                        Terdeteksi pada: {s.detected_at || 'Hari ini, 08:30 WIB'}
                                    </div>
                                </div>
                            ))}

                            {signals.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Tidak ada catatan sinyal deviasi.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Interventions Feed */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 bg-white/40 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                                    Intervensi & Rekomendasi Diberikan
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Tugas mikro kebiasaan terstruktur</p>
                            </div>
                        </div>

                        <div className="p-5 flex-1 divide-y divide-primary/5 space-y-3">
                            {interventions.map((i) => (
                                <div key={i.id} className="pt-3 first:pt-0 rounded-2xl p-4 bg-white/60 border border-primary/5 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-sm font-bold text-primary">{i.title}</strong>
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                            {i.status || 'AKTIF'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">{i.description}</p>
                                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant/70 font-label-mono pt-1">
                                        <span>Target: {i.due_at || '7 Hari'}</span>
                                        <span>Dibuat: {i.created_at ? new Date(i.created_at).toLocaleDateString('id-ID') : 'Hari ini'}</span>
                                    </div>
                                </div>
                            ))}

                            {interventions.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Belum ada intervensi aktif yang ditugaskan.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
