import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Dashboard({ kpis, auditLogs, users, recentEmergencies }) {
    const handleToggleUserStatus = (userId) => {
        router.post(`/admin/users/${userId}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout title="Panel Tata Kelola & Audit Forensik" activeTab="admin">
            <Head title="Tata Kelola & Audit Forensik - Kadar" />

            <div className="space-y-6">
                {/* Header Banner */}
                <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-2">
                    <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                        Tata Kelola Sistem, Kepatuhan PDP & Keamanan Data
                    </span>
                    <h1 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                        Konsol Tata Kelola & Jejak Audit Forensik
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                        Memantau kepatuhan pemrosesan data kesehatan preventif sesuai UU PDP No. 27/2022, jejak aktivitas sistem, serta kesiapan infrastruktur darurat 119 SPGDT.
                    </p>
                </section>

                {/* KPI Metrics */}
                <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Total Akun</span>
                        <div className="text-2xl font-heading font-black text-on-surface mt-1">{kpis?.totalUsers || 0}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Total Member</span>
                        <div className="text-2xl font-heading font-black text-primary mt-1">{kpis?.membersCount || 0}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Instruktur</span>
                        <div className="text-2xl font-heading font-black text-on-surface mt-1">{kpis?.instructorsCount || 0}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Log Hari Ini</span>
                        <div className="text-2xl font-heading font-black text-emerald-600 mt-1">{kpis?.recordsToday || 0}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Sinyal HBE</span>
                        <div className="text-2xl font-heading font-black text-amber-600 mt-1">{kpis?.activeSignalsCount || 0}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-2xl border border-surface-container shadow-xs">
                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">Event Darurat</span>
                        <div className="text-2xl font-heading font-black text-red-600 mt-1">{kpis?.emergencyEventsCount || 0}</div>
                    </div>
                </section>

                {/* User Directory */}
                <section className="bg-surface rounded-3xl p-6 border border-surface-container shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-surface-container pb-3">
                        <div>
                            <h2 className="font-heading font-bold text-base text-on-surface">Direktori Pengguna & Otorisasi</h2>
                            <p className="text-xs text-on-surface-variant">Manajemen status akun dan peran otorisasi pengguna.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-surface-container font-label-mono text-[11px] uppercase text-on-surface-variant">
                                    <th className="py-2.5 px-3">Nama Pengguna</th>
                                    <th className="py-2.5 px-3">Email</th>
                                    <th className="py-2.5 px-3">Role</th>
                                    <th className="py-2.5 px-3">Status</th>
                                    <th className="py-2.5 px-3">Terdaftar</th>
                                    <th className="py-2.5 px-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {users?.data?.map((u) => (
                                    <tr key={u.id} className="hover:bg-surface-container-low transition-colors">
                                        <td className="py-3 px-3 font-semibold text-on-surface">{u.name}</td>
                                        <td className="py-3 px-3 text-on-surface-variant">{u.email}</td>
                                        <td className="py-3 px-3">
                                            {u.roles?.map((r, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary uppercase mr-1">
                                                    {r}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="py-3 px-3">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold uppercase ${
                                                u.status === 'ACTIVE'
                                                    ? 'bg-emerald-500/10 text-emerald-700'
                                                    : 'bg-red-500/10 text-red-700'
                                            }`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-on-surface-variant font-label-mono text-[11px]">{u.created_at}</td>
                                        <td className="py-3 px-3 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleToggleUserStatus(u.id)}
                                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                                                    u.status === 'ACTIVE'
                                                        ? 'text-red-600 hover:bg-red-50 border-red-200'
                                                        : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200'
                                                }`}
                                            >
                                                {u.status === 'ACTIVE' ? 'Tangguhkan' : 'Aktifkan'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Forensic Audit Log Table */}
                <section className="bg-surface rounded-3xl p-6 border border-surface-container shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-surface-container pb-3">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                            <div>
                                <h2 className="font-heading font-bold text-base text-on-surface">Jejak Audit Forensik Sistem</h2>
                                <p className="text-xs text-on-surface-variant">Log peristiwa audit kepatuhan dengan referensi hash IP satu arah (UU PDP).</p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-surface-container font-label-mono text-[11px] uppercase text-on-surface-variant">
                                    <th className="py-2.5 px-3">Waktu</th>
                                    <th className="py-2.5 px-3">Aktor</th>
                                    <th className="py-2.5 px-3">Peran</th>
                                    <th className="py-2.5 px-3">Aksi (Action)</th>
                                    <th className="py-2.5 px-3">Target</th>
                                    <th className="py-2.5 px-3">Hasil</th>
                                    <th className="py-2.5 px-3">Ref IP (SHA-256)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container font-mono text-[11px]">
                                {auditLogs?.map((log) => (
                                    <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                                        <td className="py-2.5 px-3 text-on-surface-variant whitespace-nowrap">{log.created_at}</td>
                                        <td className="py-2.5 px-3 font-sans font-semibold text-on-surface">{log.actor_name}</td>
                                        <td className="py-2.5 px-3 uppercase text-[10px] text-primary">{log.actor_role}</td>
                                        <td className="py-2.5 px-3 font-bold text-on-surface">{log.action}</td>
                                        <td className="py-2.5 px-3 text-on-surface-variant">{log.target_type || '-'}</td>
                                        <td className="py-2.5 px-3">
                                            <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                                log.result === 'ALLOWED'
                                                    ? 'bg-emerald-500/10 text-emerald-700'
                                                    : 'bg-red-500/10 text-red-700'
                                            }`}>
                                                {log.result}
                                            </span>
                                        </td>
                                        <td className="py-2.5 px-3 text-on-surface-variant text-[10px]">{log.ip_reference}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
