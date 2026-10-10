import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import { Table } from '@/Components/UI';

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

    const handleSearch = (val) => {
        setSearch(val);
        router.get('/instructor/members', { search: val }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Identitas Member',
            render: (member) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                        {member.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                        <div className="font-bold text-on-surface text-xs sm:text-sm">{member.name}</div>
                        <div className="text-on-surface-variant font-mono text-[11px]">{member.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'latest_signal_severity',
            label: 'Status Sinyal HBE',
            render: (member) => {
                const severity = member.latest_signal_severity || 'STABLE';
                const isAttention = severity === 'ATTENTION';
                const isNotice = severity === 'NOTICE' || severity === 'FOLLOW_UP';

                return (
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
                        <span>{SEVERITY_LABELS[severity] || severity}</span>
                    </span>
                );
            },
        },
        {
            key: 'active_interventions_count',
            label: 'Intervensi Berjalan',
            render: (member) => (
                <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-primary">
                        {member.active_interventions_count || 0}
                    </span>
                    <span className="text-on-surface-variant text-[11px]">tugas aktif</span>
                </div>
            ),
        },
        {
            key: 'occupation',
            label: 'Profesi / Konteks',
            render: (member) => (
                <span className="text-on-surface-variant text-[11px]">
                    {member.member_profile?.occupation || 'Member Terdaftar'}
                </span>
            ),
        },
        {
            key: 'action',
            label: 'Rekam Binaan',
            align: 'right',
            render: (member) => (
                <Link
                    href={`/instructor/members/${member.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs transition-all cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[16px]">clinical_notes</span>
                    <span>Buka Profil</span>
                </Link>
            ),
        },
    ];

    return (
        <InstructorLayout activeNav="members" title="Daftar Member Binaan">
            <Head title="Member Binaan - Instruktur AEVYRA" />
            
            <div className="space-y-6">
                {/* Header Strip */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">groups</span>
                        <h2 className="font-heading font-bold text-lg text-on-surface">Member Dalam Bimbingan Aktif</h2>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">
                        Pantau metrik fisiologis, status sinyal deviasi HBE, dan kemajuan intervensi setiap member binaan
                    </p>
                </div>

                {/* Unified Table Component with Search & Pagination */}
                <Table
                    columns={columns}
                    data={members}
                    searchValue={search}
                    onSearch={handleSearch}
                    searchPlaceholder="Cari member binaan berdasarkan nama/email..."
                    emptyMessage="Tidak ada member binaan yang cocok."
                    emptyIcon="person_search"
                />
            </div>
        </InstructorLayout>
    );
}
