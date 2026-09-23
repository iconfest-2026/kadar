import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Instructors({ instructors = { data: [], links: [] } }) {
    const approveInstructor = (instructor) => {
        router.post(`/admin/instructors/${instructor.id}/approve`, {}, {
            preserveScroll: true
        });
    };

    const toggleStatus = (instructor) => {
        router.post(`/admin/users/${instructor.id}/toggle-status`, {}, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout activeNav="instructors" title="Verifikasi & Tata Kelola Instruktur">
            <Head title="Manajemen Instruktur — Admin Kadar" />
            <Head title="Manajemen Instruktur — Admin AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[22px]">medical_services</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Tenaga Ahli & Instruktur Binaan</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Verifikasi lisensi kompetensi, alokasi program kohor, dan pemantauan beban caseload
                        </p>
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-secondary-fixed/40 text-secondary-container border border-secondary/20 text-xs font-label-mono font-bold self-start md:self-auto">
                        Human-in-the-Loop Standard
                    </span>
                </div>

                {/* Instructors Table Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/[0.03] text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-4 px-6">Identitas Instruktur</th>
                                    <th className="py-4 px-6">Spesialisasi / Gelar</th>
                                    <th className="py-4 px-6">Status Verifikasi</th>
                                    <th className="py-4 px-6">Intervensi Aktif</th>
                                    <th className="py-4 px-6 text-right">Tindakan Persetujuan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {instructors.data.map(inst => {
                                    const isPending = inst.status === 'PENDING';
                                    const isSuspended = inst.status === 'SUSPENDED';
                                    const isActive = inst.status === 'ACTIVE' || (!inst.status && !isPending);

                                    return (
                                        <tr key={inst.id} className="hover:bg-primary/[0.02] transition-colors">
                                            {/* Instructor Info */}
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary font-heading font-black flex items-center justify-center text-sm shadow-xs">
                                                        {inst.name?.charAt(0) || 'I'}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-sm">{inst.name}</div>
                                                        <div className="text-on-surface-variant font-label-mono text-[11px] mt-0.5">{inst.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Specialty */}
                                            <td className="py-4 px-6 font-medium text-on-surface">
                                                {inst.member_profile?.occupation || 'Nutrisionis & Lifestyle Coach'}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                {isActive && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        TERVERIFIKASI
                                                    </span>
                                                )}
                                                {isPending && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                        MENUNGGU REVIEW
                                                    </span>
                                                )}
                                                {isSuspended && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-rose-50 text-rose-800 border border-rose-200">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                        DIBEKUKAN
                                                    </span>
                                                )}
                                            </td>

                                            {/* Assigned Count */}
                                            <td className="py-4 px-6 font-label-mono font-semibold text-primary">
                                                {inst.assigned_interventions_count || 0} rencana
                                            </td>

                                            {/* Action Buttons */}
                                            <td className="py-4 px-6 text-right space-x-2">
                                                {isPending && (
                                                    <button
                                                        type="button"
                                                        onClick={() => approveInstructor(inst)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">check</span>
                                                        <span>Setujui</span>
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleStatus(inst)}
                                                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs active:scale-95 ${
                                                        isActive
                                                        ? 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
                                                        : 'bg-primary hover:bg-primary-container text-white'
                                                    }`}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">
                                                        {isActive ? 'block' : 'restore'}
                                                    </span>
                                                    <span>{isActive ? 'Bekukan' : 'Aktifkan'}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {instructors.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">school</span>
                                                <p className="text-sm font-semibold text-on-surface">Belum ada akun instruktur terdaftar.</p>
                                                <p className="text-xs text-on-surface-variant mt-1">Akun yang mendaftar sebagai tenaga ahli akan muncul di sini.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {instructors.links && instructors.links.length > 3 && (
                        <div className="p-4 sm:p-5 border-t border-primary/10 flex flex-wrap gap-1.5 justify-center bg-white/40">
                            {instructors.links.map((link, k) => (
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
        </AdminLayout>
    );
}

