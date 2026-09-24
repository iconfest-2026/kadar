import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

const SEVERITY_LABELS = {
    ATTENTION: 'Perlu Perhatian',
    CRITICAL: 'Tingkat Kritis',
    NOTICE: 'Pemberitahuan',
    FOLLOW_UP: 'Perlu Tindak Lanjut',
    INFO: 'Informasi',
    STABLE: 'Stabil',
};

export default function Members({ members = { data: [], links: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        router.get('/instructor/members', { search: val }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const memberList = members.data || [];

    return (
        <InstructorLayout activeNav="members" title="Daftar Member Binaan">
            <Head title="Member Binaan - Instruktur AEVYRA" />
            
            <div className="space-y-6">
                {/* Header & Search Bar */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">groups</span>
                            <h2 className="font-heading font-bold text-lg text-on-surface">Member Dalam Bimbingan Aktif</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Pantau metrik fisiologis, status sinyal deviasi HBE, dan kemajuan intervensi setiap member binaan
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-80">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari member binaan berdasarkan nama/email..."
                            value={search}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium transition-all placeholder:text-on-surface-variant/60"
                        />
                    </div>
                </div>

                {/* Member Table Card */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-surface-container font-label-mono text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-6">Identitas Member</th>
                                    <th className="py-3.5 px-6">Status Sinyal HBE</th>
                                    <th className="py-3.5 px-6">Intervensi Berjalan</th>
                                    <th className="py-3.5 px-6">Profesi / Konteks</th>
                                    <th className="py-3.5 px-6 text-right">Rekam Binaan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {memberList.map((member) => {
                                    const severity = member.latest_signal_severity || 'STABLE';
                                    const isAttention = severity === 'ATTENTION';
                                    const isNotice = severity === 'NOTICE' || severity === 'FOLLOW_UP';

                                    return (
                                        <tr key={member.id} className="hover:bg-surface-container-low/60 transition-colors">
                                            {/* Member Profile */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                                        {member.name?.charAt(0) || 'M'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-xs sm:text-sm">{member.name}</div>
                                                        <div className="text-on-surface-variant font-mono text-[11px]">{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Latest Signal Severity Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold ${
                                                    isAttention 
                                                    ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20' 
                                                    : isNotice 
                                                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20' 
                                                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        isAttention ? 'bg-rose-500' : isNotice ? 'bg-amber-500' : 'bg-emerald-500'
                                                    }`} />
                                                    <span>{severity}</span>
                                                    <span>{SEVERITY_LABELS[severity] || severity}</span>
                                                </span>
                                            </td>

                                            {/* Active Interventions */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-mono font-bold text-primary">
                                                        {member.active_interventions_count || 0}
                                                    </span>
                                                    <span className="text-on-surface-variant text-[11px]">tugas aktif</span>
                                                </div>
                                            </td>

                                            {/* Occupation / Context */}
                                            <td className="py-4 px-6 text-on-surface-variant text-[11px]">
                                                {member.member_profile?.occupation || 'Member Terdaftar'}
                                            </td>

                                            {/* Action */}
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/instructor/members/${member.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs transition-all cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
                                                    <span>Buka Profil</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {memberList.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">person_search</span>
                                                <p className="text-xs font-semibold text-on-surface">Tidak ada member binaan yang cocok.</p>
                                                <p className="text-[11px] text-on-surface-variant">Coba sesuaikan kata kunci pencarian nama atau email.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {members.links && members.links.length > 3 && (
                        <div className="p-4 border-t border-surface-container flex items-center justify-center gap-1.5 bg-surface-container-low">
                            {members.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                                        link.active
                                            ? 'bg-primary text-white shadow-2xs'
                                            : !link.url
                                            ? 'opacity-40 cursor-not-allowed text-on-surface-variant'
                                            : 'bg-white dark:bg-surface border border-surface-container text-on-surface hover:bg-surface-container-high'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </InstructorLayout>
    );
}
