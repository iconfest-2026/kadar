import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Members({ members = { data: [], links: [] } }) {
    const [search, setSearch] = useState('');

    const filteredMembers = members.data ? members.data.filter(m => 
        m.name?.toLowerCase().includes(search.toLowerCase()) || 
        m.email?.toLowerCase().includes(search.toLowerCase())
    ) : [];

    return (
        <InstructorLayout activeNav="members" title="Daftar Member Binaan">
            <Head title="Member Binaan — Instruktur AEVYRA" />
            
            <div className="space-y-6">
                {/* Header & Search Bar */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-primary">Member Dalam Bimbingan Aktif</h2>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Pantau metrik fisiologis, status sinyal deviasi, dan kemajuan intervensi setiap individu
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-72">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/50 text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari member binaan..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-primary/15 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs text-on-surface transition-all placeholder:text-on-surface-variant/50"
                        />
                    </div>
                </div>

                {/* Member Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/3 text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Identitas Member</th>
                                    <th className="py-4 px-6">Status Sinyal Terkini</th>
                                    <th className="py-4 px-6">Intervensi Berjalan</th>
                                    <th className="py-4 px-6">Masa Pendampingan</th>
                                    <th className="py-4 px-6 text-right">Rekam Medis & Bimbingan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {filteredMembers.map((member) => {
                                    const severity = member.latest_signal_severity || 'STABLE';
                                    const isAttention = severity === 'ATTENTION';
                                    const isNotice = severity === 'NOTICE';

                                    return (
                                        <tr key={member.id} className="hover:bg-primary/2 transition-colors">
                                            {/* Member Profile */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary font-heading font-black flex items-center justify-center text-sm shadow-xs">
                                                        {member.name?.charAt(0) || 'M'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-sm">{member.name}</div>
                                                        <div className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Latest Signal Severity Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    isAttention 
                                                    ? 'bg-rose-50 text-rose-800 border-rose-200' 
                                                    : isNotice 
                                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        isAttention ? 'bg-rose-500' : isNotice ? 'bg-amber-500' : 'bg-emerald-500'
                                                    }`} />
                                                    {severity}
                                                </span>
                                            </td>

                                            {/* Active Interventions */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-heading font-bold text-sm text-primary">
                                                        {member.active_interventions_count || 0}
                                                    </span>
                                                    <span className="text-on-surface-variant text-[11px]">tugas aktif</span>
                                                </div>
                                            </td>

                                            {/* Contract Period */}
                                            <td className="py-4 px-6 text-on-surface-variant font-label-mono text-[11px]">
                                                {member.assigned_since ? new Date(member.assigned_since).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : 'Aktif'}
                                            </td>

                                            {/* Detail Link */}
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/instructor/members/${member.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white hover:bg-primary-container text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
                                                >
                                                    <span>Buka Rekam</span>
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {filteredMembers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">group_off</span>
                                                <p className="text-sm font-semibold text-on-surface">Tidak ada member binaan yang ditemukan.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Pastikan kontrak penugasan member telah disetujui oleh Administrator.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {members.links && members.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {members.links.map((link, k) => (
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
