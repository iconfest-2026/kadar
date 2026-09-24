import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import InstructorLayout from '../../Layouts/InstructorLayout';

export default function Reports({ overview = {}, membersRoster = [], generated_at = '' }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');

    const filteredMembers = membersRoster.filter((m) => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

            <div className="space-y-8">
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/10 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                            <span className="material-symbols-outlined text-[16px]">monitoring</span>
                            <span>Fitur 9: Laporan Klinis & Pengawasan Kohort</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl text-primary tracking-tight">
                            Laporan Performa Klinis & Bimbingan Member
                        </h1>
                        <p className="text-xs sm:text-sm text-on-surface-variant">
                            Dihasilkan otomatis pada {generated_at} • Data objektif untuk presisi intervensi
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-primary/20 text-primary font-bold text-xs shadow-xs hover:bg-primary/5 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                            <span>Cetak / Simpan PDF</span>
                        </button>
                    </div>
                </div>

                {/* Key Metrics Overview Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Tingkat Kepatuhan (Adherence)</span>
                        <div className="text-2xl sm:text-3xl font-black text-primary font-mono">
                            {overview.adherence_rate}%
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                            {overview.active_logging_members} dari {overview.total_members} member aktif mencatat 7 hari terakhir
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Tingkat Remisi Intervensi</span>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                            {overview.intervention_success_rate}%
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            {overview.total_interventions} protokol intervensi diterbitkan
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Sesi Konsultasi Selesai</span>
                        <div className="text-2xl sm:text-3xl font-black text-on-surface font-mono">
                            {overview.completed_consultations}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            Tingkat Pembatalan: {overview.cancellation_rate}%
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Distribusi Risiko Caseload</span>
                        <div className="flex items-center gap-2 pt-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                                {overview.high_risk_count} Tinggi
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                {overview.moderate_risk_count} Moderat
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {overview.normal_risk_count} Aman
                            </span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant block pt-1">
                            Berdasarkan lonjakan glukosa & sinyal HBE
                        </span>
                    </div>
                </div>

                {/* Member Roster Table */}
                <div className="rounded-3xl bg-white border border-primary/15 shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-primary/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Roster Pemantauan Pasien & Member Binaan
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Evaluasi rekam medis mandiri, glukosa terakhir, dan catatan intervensi
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari nama member..."
                                className="p-2 rounded-xl border border-surface-container bg-surface-container-lowest text-xs focus:ring-2 focus:ring-primary/20 w-48"
                            />
                            <select
                                value={selectedRiskFilter}
                                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                                className="p-2 rounded-xl border border-surface-container bg-surface-container-lowest text-xs font-semibold"
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
                            <thead className="bg-surface-container-lowest text-on-surface-variant font-bold border-b border-surface-container">
                                <tr>
                                    <th className="p-4">Nama Pasien / Member</th>
                                    <th className="p-4">Jenis Akun</th>
                                    <th className="p-4">Glukosa Darah Terakhir</th>
                                    <th className="p-4">Aktivitas Langkah</th>
                                    <th className="p-4">Status Risiko</th>
                                    <th className="p-4">Kepatuhan</th>
                                    <th className="p-4">Catatan Intervensi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {filteredMembers.map((m) => (
                                    <tr key={m.id} className="hover:bg-primary/5 transition-colors">
                                        <td className="p-4 font-bold text-on-surface">
                                            <div>{m.name}</div>
                                            <div className="text-[10px] text-on-surface-variant font-normal">{m.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                m.sex === 'FEMALE' ? 'bg-rose-100 text-rose-800' : 'bg-sky-100 text-sky-800'
                                            }`}>
                                                {m.sex === 'FEMALE' ? 'Wanita (Haid/Hormon)' : 'Pria (Vitalitas)'}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono font-bold text-primary">
                                            {m.latest_glucose}
                                        </td>
                                        <td className="p-4 font-mono text-on-surface">
                                            {m.latest_steps}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                m.risk_level === 'Tinggi' ? 'bg-rose-100 text-rose-800' :
                                                m.risk_level === 'Moderat' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                                            }`}>
                                                {m.risk_level}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono font-bold text-emerald-600">
                                            {m.adherence_score}
                                        </td>
                                        <td className="p-4 text-on-surface-variant max-w-xs truncate">
                                            {m.notes}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
