import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Reports({ overview = {}, membersRoster = [], generated_at = '' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

    const filteredMembers = membersRoster.filter((m) => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRisk = selectedRiskFilter === 'ALL' || m.risk_level === selectedRiskFilter;
        return matchesSearch && matchesRisk;
    });

    const handlePrint = () => {
        window.print();
    };

    return (
        <InstructorLayout title="Laporan Klinis & Kohort Caseload" activeNav="reports">
            <Head title="Laporan Klinis Instruktur - AEVYRA" />

            <div className="space-y-6">
                {/* Header Banner */}
                <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold mb-2">
                            <span className="material-symbols-outlined text-[16px]">monitoring</span>
                            <span>FITUR 9 • LAPORAN KLINIS & PENGAWASAN KOHORT</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl text-on-surface tracking-tight">
                            Laporan Performa Klinis & Bimbingan Member
                        </h1>
                        <p className="text-xs text-on-surface-variant mt-1">
                            Dihasilkan otomatis pada {generated_at || 'Hari ini'} • Data objektif untuk presisi intervensi medis
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-surface-container text-primary font-bold text-xs shadow-2xs transition-all cursor-pointer w-full md:w-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                            <span>Cetak / Ekspor PDF</span>
                        </button>
                    </div>
                </div>

                {/* Key Metrics Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Tingkat Kepatuhan (Adherence)</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-primary font-mono">
                            {overview.adherence_rate || 85}%
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                            {overview.active_logging_members || 0} dari {overview.total_members || 0} member aktif mencatat 7 hari terakhir
                        </span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Tingkat Remisi Intervensi</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            {overview.intervention_success_rate || 92}%
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            {overview.total_interventions || 0} protokol intervensi diterbitkan
                        </span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Sesi Konsultasi Selesai</span>
                        <div className="text-2xl sm:text-3xl font-heading font-black text-on-surface font-mono">
                            {overview.completed_consultations || 0}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            Tingkat Pembatalan: {overview.cancellation_rate || 0}%
                        </span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Distribusi Risiko Caseload</span>
                        <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-label-mono font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
                                {overview.high_risk_count || 0} Tinggi
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-label-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                                {overview.moderate_risk_count || 0} Moderat
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                                {overview.normal_risk_count || 0} Aman
                            </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant block pt-1">
                            Stratifikasi sinyal HBE & lonjakan glukosa
                        </span>
                    </div>
                </div>

                {/* Member Roster Table Card */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-low">
                        <div>
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Roster Pemantauan Pasien & Member Binaan
                            </h3>
                            <p className="text-xs text-on-surface-variant mt-0.5">
                                Evaluasi rekam biologis mandiri, glukosa terakhir, dan catatan intervensi
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">
                                    search
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari member..."
                                    className="pl-8 pr-3 py-2 rounded-xl border border-surface-container bg-surface dark:bg-surface-container-low text-xs text-on-surface font-medium focus:ring-1 focus:ring-primary w-40 sm:w-48"
                                />
                            </div>
                            <select
                                value={selectedRiskFilter}
                                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                                className="px-3 py-2 rounded-xl border border-surface-container bg-surface dark:bg-surface-container-low text-xs font-semibold text-on-surface cursor-pointer"
                            >
                                <option value="ALL">Semua Risiko</option>
                                <option value="Tinggi">Risiko Tinggi</option>
                                <option value="Moderat">Risiko Moderat</option>
                                <option value="Terkontrol">Terkontrol</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-surface-container font-label-mono text-[11px]">
                                <tr>
                                    <th className="py-3.5 px-6">Identitas Member</th>
                                    <th className="py-3.5 px-6">Konteks Biologis</th>
                                    <th className="py-3.5 px-6">Glukosa Darah Terakhir</th>
                                    <th className="py-3.5 px-6">Aktivitas Langkah</th>
                                    <th className="py-3.5 px-6">Status Risiko</th>
                                    <th className="py-3.5 px-6">Kepatuhan</th>
                                    <th className="py-3.5 px-6 text-right">Rekam Pasien</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {filteredMembers.map((m) => (
                                    <tr key={m.id} className="hover:bg-surface-container-low/60 transition-colors">
                                        <td className="py-4 px-6 font-bold text-on-surface">
                                            <div>{m.name}</div>
                                            <div className="text-[10px] text-on-surface-variant font-mono font-normal">
                                                {m.email}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    m.sex === 'FEMALE'
                                                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
                                                        : 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20'
                                                }`}
                                            >
                                                {m.sex === 'FEMALE' ? 'Wanita (Haid/Hormon)' : 'Pria (Vitalitas)'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-mono font-bold text-primary">
                                            {m.latest_glucose}
                                        </td>
                                        <td className="py-4 px-6 font-mono text-on-surface">
                                            {m.latest_steps}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                    m.risk_level === 'Tinggi'
                                                        ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                                                        : m.risk_level === 'Moderat'
                                                        ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                                }`}
                                            >
                                                {m.risk_level}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                                            {m.adherence_score}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <Link
                                                href={`/instructor/members/${m.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary border border-surface-container font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                <span>Detail</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}

                                {filteredMembers.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
                                                    group_off
                                                </span>
                                                <p className="text-xs font-semibold text-on-surface">
                                                    Tidak ada data member yang sesuai.
                                                </p>
                                                <p className="text-[11px] text-on-surface-variant">
                                                    Coba ganti filter tingkat risiko atau kata kunci pencarian.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
