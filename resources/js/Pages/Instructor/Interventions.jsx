import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Interventions({ interventions = { data: [], links: [] }, filters = {} }) {
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    useEffect(() => {
        router.get('/instructor/interventions', { status: statusFilter }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, [statusFilter]);

    const updateStatus = (intervention, newStatus) => {
        router.patch(`/instructor/interventions/${intervention.id}`, { status: newStatus }, {
            preserveScroll: true
        });
    };

    return (
        <InstructorLayout activeNav="interventions" title="Rencana Intervensi Perilaku">
            <Head title="Rencana Intervensi — Instruktur AEVYRA" />

            <div className="space-y-6">
                {/* Header & Filter Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">clinical_notes</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Daftar Rencana Intervensi</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Pantau target kebiasaan mikro, evaluasi kepatuhan member, dan sesuaikan rekomendasi bimbingan
                        </p>
                    </div>

                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface font-medium transition-all cursor-pointer"
                        >
                            <option value="">Semua Status Intervensi</option>
                            <option value="ACTIVE">ACTIVE (Sedang Berjalan)</option>
                            <option value="COMPLETED">COMPLETED (Selesai)</option>
                            <option value="PAUSED">PAUSED (Dijeda)</option>
                            <option value="DRAFT">DRAFT (Penyusunan)</option>
                        </select>
                    </div>
                </div>

                {/* Interventions Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/3 text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Member Sasaran</th>
                                    <th className="py-4 px-6">Judul Intervensi</th>
                                    <th className="py-4 px-6">Kategori</th>
                                    <th className="py-4 px-6">Status Progres</th>
                                    <th className="py-4 px-6">Target Waktu</th>
                                    <th className="py-4 px-6 text-right">Pembaruan Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {interventions.data.map(inv => {
                                    const isActive = inv.status === 'ACTIVE';
                                    const isCompleted = inv.status === 'COMPLETED';
                                    const isPaused = inv.status === 'PAUSED';

                                    return (
                                        <tr key={inv.id} className="hover:bg-primary/2 transition-colors">
                                            {/* Member info */}
                                            <td className="py-4 px-6">
                                                <div className="font-bold text-on-surface text-sm">
                                                    {inv.user?.name || 'Member Terbina'}
                                                </div>
                                                <div className="text-on-surface-variant font-label-mono text-[11px]">
                                                    {inv.user?.email || '-'}
                                                </div>
                                            </td>

                                            {/* Title & Description */}
                                            <td className="py-4 px-6 max-w-xs">
                                                <div className="font-bold text-primary text-xs">{inv.title}</div>
                                                <div className="text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">{inv.description}</div>
                                            </td>

                                            {/* Type */}
                                            <td className="py-4 px-6">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15">
                                                    {inv.type || 'HABIT'}
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    isActive 
                                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                                    : isCompleted 
                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                    : 'bg-amber-50 text-amber-800 border-amber-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        isActive ? 'bg-emerald-500' : isCompleted ? 'bg-primary' : 'bg-amber-500'
                                                    }`} />
                                                    {inv.status}
                                                </span>
                                            </td>

                                            {/* Due Date */}
                                            <td className="py-4 px-6 text-on-surface-variant font-label-mono text-[11px]">
                                                {inv.due_at ? new Date(inv.due_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : '7 Hari'}
                                            </td>

                                            {/* Status Action Buttons */}
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {isActive && (
                                                    <button
                                                        type="button"
                                                        onClick={() => updateStatus(inv, 'COMPLETED')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                                                        <span>Selesai</span>
                                                    </button>
                                                )}
                                                {isActive ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => updateStatus(inv, 'PAUSED')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 font-bold text-xs transition-all shadow-xs"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">pause</span>
                                                        <span>Jeda</span>
                                                    </button>
                                                ) : isPaused ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => updateStatus(inv, 'ACTIVE')}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs transition-all shadow-xs"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                                                        <span>Lanjutkan</span>
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {interventions.data.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">assignment</span>
                                                <p className="text-sm font-semibold text-on-surface">Belum ada intervensi yang cocok.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Buat intervensi baru langsung melalui halaman detail member binaan.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {interventions.links && interventions.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {interventions.links.map((link, k) => (
                                link.url ? (
                                    <Link
                                        key={k}
                                        href={link.url}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                                            link.active 
                                            ? 'bg-primary text-white border-primary shadow-xs' 
                                            : 'bg-white/80 border-primary/15 text-on-surface hover:bg-primary/5 hover:border-primary/30'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={k}
                                        className="px-3 py-1.5 rounded-xl border border-primary/10 text-on-surface-variant/40 bg-white/40 text-xs font-medium cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </InstructorLayout>
    );
}

