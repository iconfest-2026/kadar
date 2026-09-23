import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({
    kpis = {},
    totalUsers,
    activeInstructors,
    activePrograms,
    activeChallenges,
    recentAuditLogs = [],
    recentUsers = [],
    userGrowth = []
}) {
    const finalTotalUsers = totalUsers ?? kpis?.totalUsers ?? 0;
    const finalActiveInstructors = activeInstructors ?? kpis?.activeInstructors ?? 0;
    const finalActivePrograms = activePrograms ?? kpis?.activePrograms ?? 0;
    const finalActiveChallenges = activeChallenges ?? kpis?.activeChallenges ?? 0;

    const maxGrowth = Math.max(...(userGrowth.length ? userGrowth.map(d => d.count) : [1]), 1);

    return (
        <AdminLayout activeNav="dashboard" title="Ringkasan Tata Kelola">
            <Head title="Admin Dashboard — AEVYRA" />
            
            <div className="space-y-6">
                {/* Header Welcome Card with Glassmorphism */}
                <div className="relative overflow-hidden bg-linear-to-r from-primary/90 via-primary-container/80 to-primary/95 text-white rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-xl border border-white/20">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-label-mono font-bold tracking-wider uppercase mb-3 border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Sistem Tata Kelola Operasional Aktif
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight mb-2">
                            Pusat Komando & Pengawasan AEVYRA
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Pantau integritas platform, pendaftaran pengguna, verifikasi instruktur, serta rekam jejak audit forensik secara real-time.
                        </p>
                    </div>

                    {/* Ambient subtle decorative rings */}
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    <div className="absolute right-20 top-0 w-32 h-32 rounded-full bg-secondary/30 blur-xl pointer-events-none" />
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <StatCard 
                        title="Total Pengguna" 
                        value={finalTotalUsers} 
                        icon="group" 
                        accent="primary"
                        description="Terdaftar di platform"
                        link="/admin/users"
                    />
                    <StatCard 
                        title="Instruktur Aktif" 
                        value={finalActiveInstructors} 
                        icon="school" 
                        accent="secondary"
                        description="Tenaga ahli terverifikasi"
                        link="/admin/instructors"
                    />
                    <StatCard 
                        title="Program Berjalan" 
                        value={finalActivePrograms} 
                        icon="inventory_2" 
                        accent="primary"
                        description="Kurikulum kohor aktif"
                        link="/admin/programs"
                    />
                    <StatCard 
                        title="Tantangan Aktif" 
                        value={finalActiveChallenges} 
                        icon="emoji_events" 
                        accent="secondary"
                        description="Gamifikasi kesehatan"
                        link="/admin/challenges"
                    />
                </div>

                {/* Growth Chart Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xs border border-primary/10 hover:border-primary/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                                <h3 className="text-lg font-heading font-bold text-primary">Tren Registrasi Pengguna</h3>
                            </div>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Pertumbuhan akun baru dalam 30 hari terakhir</p>
                        </div>
                        <span className="self-start sm:self-auto px-3 py-1 bg-primary/5 text-primary text-[11px] font-label-mono font-bold rounded-full border border-primary/10">
                            Metrik Kohor Harian
                        </span>
                    </div>

                    <div className="h-48 sm:h-56 flex items-end gap-1.5 sm:gap-2 pt-6 pb-2 px-2 border-b border-primary/10">
                        {userGrowth.map((day, idx) => {
                            const heightPercent = Math.max((day.count / maxGrowth) * 100, 8);
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                    {/* Tooltip on Hover */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-primary text-white text-[11px] font-label-mono py-1 px-2.5 rounded-xl whitespace-nowrap pointer-events-none z-20 shadow-lg border border-white/20">
                                        {day.date}: <span className="font-bold">{day.count} user</span>
                                    </div>
                                    
                                    {/* Interactive Bar */}
                                    <div 
                                        className="w-full bg-linear-to-t from-primary to-primary-fixed-dim rounded-t-lg transition-all duration-300 group-hover:from-secondary group-hover:to-secondary-container group-hover:scale-y-105 origin-bottom shadow-xs cursor-pointer"
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                    
                                    {/* Subtitle date at bottom */}
                                    <span className="text-[9px] font-label-mono text-on-surface-variant/70 mt-2 truncate w-full text-center hidden md:block">
                                        {day.date.split('-').slice(1).join('/')}
                                    </span>
                                </div>
                            );
                        })}
                        {userGrowth.length === 0 && (
                            <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant">
                                <span className="material-symbols-outlined text-3xl text-primary/30 mb-2">query_stats</span>
                                <span className="text-xs font-medium">Belum ada rekaman pertumbuhan pengguna.</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2-Column Responsive Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users Table */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 flex justify-between items-center bg-white/40">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">person_add</span>
                                    Pengguna Terdaftar Terbaru
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">5 anggota komunitas terakhir</p>
                            </div>
                            <Link 
                                href="/admin/users" 
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all"
                            >
                                Kelola Semua
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-primary/2 text-on-surface-variant font-semibold border-b border-primary/10">
                                    <tr>
                                        <th className="py-3 px-5">Nama & Profil</th>
                                        <th className="py-3 px-5">Email</th>
                                        <th className="py-3 px-5">Waktu Daftar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary/5">
                                    {recentUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-primary/2 transition-colors">
                                            <td className="py-3.5 px-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center text-[11px]">
                                                        {user.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <span className="font-semibold text-on-surface">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-5 text-on-surface-variant font-label-mono">{user.email}</td>
                                            <td className="py-3.5 px-5 text-on-surface-variant font-label-mono">
                                                {new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-on-surface-variant text-xs">
                                                Belum ada pengguna terdaftar.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Audit Trail Table */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 flex justify-between items-center bg-white/40">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">security</span>
                                    Jejak Audit Forensik
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Aktivitas mutasi sistem real-time</p>
                            </div>
                            <Link 
                                href="/admin/audit" 
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all"
                            >
                                Buku Besar
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-primary/2 text-on-surface-variant font-semibold border-b border-primary/10">
                                    <tr>
                                        <th className="py-3 px-5">Aksi Sistem</th>
                                        <th className="py-3 px-5">Eksekutor</th>
                                        <th className="py-3 px-5">Waktu UTC</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary/5">
                                    {recentAuditLogs.map(log => (
                                        <tr key={log.id} className="hover:bg-primary/2 transition-colors">
                                            <td className="py-3.5 px-5">
                                                <span className="font-label-mono text-[11px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/15">
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-5 text-on-surface font-medium">{log.actor?.name || 'Sistem Otomatis'}</td>
                                            <td className="py-3.5 px-5 text-on-surface-variant font-label-mono">
                                                {new Date(log.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentAuditLogs.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-8 text-center text-on-surface-variant text-xs">
                                                Belum ada rekaman audit log.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon, accent = 'primary', description, link }) {
    const isPrimary = accent === 'primary';
    return (
        <Link 
            href={link}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-primary/10 hover:border-primary/30 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isPrimary 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-secondary/10 text-secondary border border-secondary/20'
                }`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                    arrow_forward
                </span>
            </div>
            
            <div>
                <p className="text-xs font-medium text-on-surface-variant">{title}</p>
                <p className="text-3xl font-heading font-black text-primary tracking-tight mt-1">
                    {value}
                </p>
                <p className="text-[11px] text-on-surface-variant/80 font-medium mt-1">
                    {description}
                </p>
            </div>

            {/* Subtle bottom gradient indicator */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${
                isPrimary ? 'bg-primary/20 group-hover:bg-primary' : 'bg-secondary/20 group-hover:bg-secondary'
            }`} />
        </Link>
    );
}
