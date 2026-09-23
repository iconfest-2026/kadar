import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function Reports({
    users = {},
    tierBreakdown = [],
    scannerAnalytics = {},
    emergencyMetrics = {},
    gamification = {},
    recentAuditLogs = [],
    generated_at = '',
}) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <AdminLayout title="Laporan Eksekutif & Tata Kelola Platform" activeNav="reports">
            <Head title="Laporan Platform Admin — AEVYRA" />

            <div className="space-y-8">
                
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/10 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                            <span className="material-symbols-outlined text-[16px]">bar_chart</span>
                            <span>Fitur 9: Laporan Tata Kelola Eksekutif & Analitik Platform</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl text-primary tracking-tight">
                            Laporan Operasional, Layanan 119 & PWA
                        </h1>
                        <p className="text-xs sm:text-sm text-on-surface-variant">
                            Dihasilkan otomatis pada {generated_at} • Ringkasan lintas pengguna, scanner gizi, dan kepatuhan audit
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-primary/20 text-primary font-bold text-xs shadow-xs hover:bg-primary/5 transition-all"
                        >
                            <span className="material-symbols-outlined text-[18px]">print</span>
                            <span>Cetak Laporan</span>
                        </button>
                    </div>
                </div>

                {/* Platform Summary Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Total Pengguna Terdaftar</span>
                        <div className="text-2xl sm:text-3xl font-black text-primary font-mono">
                            {users.total}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            {users.members} Member • {users.instructors} Instruktur • {users.admins} Admin
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Pemindaian Gizi & Obat (OCR)</span>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                            {scannerAnalytics.total_scans}
                        </div>
                        <span className="text-[10px] text-rose-600 font-semibold block">
                            {scannerAnalytics.high_sugar_flags} Peringatan Gula Tinggi (&gt;15g)
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Panggilan Ambulans 119</span>
                        <div className="text-2xl sm:text-3xl font-black text-rose-600 font-mono">
                            {emergencyMetrics.total_119_triggers}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">
                            {emergencyMetrics.nearest_hospital_queries} Pencarian IGD Berbasis GPS
                        </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-primary/15 shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Retensi Pengguna 30 Hari</span>
                        <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
                            {gamification.retention_30d_pct}%
                        </div>
                        <span className="text-[10px] text-emerald-600 font-bold block">
                            +{gamification.total_points_issued.toLocaleString()} Poin Diterbitkan
                        </span>
                    </div>
                </div>

                {/* Subscriptions & Scanner Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Membership Tiers Breakdown */}
                    <div className="p-6 rounded-3xl bg-white border border-primary/15 shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">workspace_premium</span>
                                Distribusi Tingkatan Member (Silver, Gold, Platinum)
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {tierBreakdown.map((t) => (
                                <div key={t.id} className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-on-surface">{t.name}</span>
                                            <span className="text-[10px] font-mono text-on-surface-variant">
                                                {t.price > 0 ? `Rp ${t.price.toLocaleString('id-ID')}/bln` : 'Freemium'}
                                            </span>
                                        </div>
                                        <span className="text-xs text-on-surface-variant">Pelanggan Aktif</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-black font-mono text-primary">{t.subscribers}</span>
                                        <span className="text-[10px] text-on-surface-variant block">Member</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Scanner Categories Breakdown */}
                    <div className="p-6 rounded-3xl bg-white border border-primary/15 shadow-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                                Kategori Produk Paling Sering Dipindai
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {scannerAnalytics.bpom_verified_pct}% Terverifikasi BPOM
                            </span>
                        </div>

                        <div className="space-y-3">
                            {scannerAnalytics.categories?.map((cat, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-medium text-on-surface">{cat.name}</span>
                                        <span className="font-mono font-bold text-on-surface">{cat.count} scan ({cat.percentage}%)</span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${cat.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Logs Forensics */}
                <div className="rounded-3xl bg-white border border-primary/15 shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-primary/10 flex items-center justify-between">
                        <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">security</span>
                            Log Audit Forensik Sistem Terkini
                        </h3>
                        <span className="text-xs text-on-surface-variant">Menjamin kepatuhan standar medis & keamanan data</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-surface-container-lowest text-on-surface-variant font-bold border-b border-surface-container">
                                <tr>
                                    <th className="p-4">Aktor Pengguna</th>
                                    <th className="p-4">Tindakan Sistem</th>
                                    <th className="p-4">Target Entitas</th>
                                    <th className="p-4">Status Hasil</th>
                                    <th className="p-4">Waktu Eksekusi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {recentAuditLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-primary/5 transition-colors">
                                        <td className="p-4 font-bold text-on-surface">{log.actor_name}</td>
                                        <td className="p-4 font-mono text-primary font-semibold">{log.action}</td>
                                        <td className="p-4 text-on-surface-variant">{log.target_type}</td>
                                        <td className="p-4">
                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                                {log.result}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono text-on-surface-variant">{log.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
