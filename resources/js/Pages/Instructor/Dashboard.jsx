import React from 'react';
import { Head, Link } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

export default function Dashboard({ assignedMembers = [], pendingSignals = [], upcomingConsultations = [], stats = {} }) {
    return (
        <InstructorLayout activeNav="dashboard" title="Dashboard Pendampingan">
            <Head title="Instruktur Dashboard - AEVYRA" />
            
            <div className="space-y-6">
                {/* Header Welcome Card with Glassmorphism */}
                <div className="relative overflow-hidden bg-linear-to-r from-primary/90 via-primary-container/80 to-secondary/70 text-white rounded-3xl p-6 sm:p-8 shadow-lg backdrop-blur-xl border border-white/20">
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-label-mono font-bold tracking-wider uppercase mb-3 border border-white/20">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Workspace Pendampingan Aktif
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight mb-2">
                            Ruang Bimbingan & Intervensi Human-in-the-Loop
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Pantau anomali fisiologis member binaan, tinjau rekomendasi perilaku berbasis sains, dan terbitkan intervensi personal yang non-alarmist.
                        </p>
                    </div>

                    {/* Ambient subtle decorative rings */}
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    <div className="absolute right-28 top-2 w-32 h-32 rounded-full bg-secondary-container/30 blur-xl pointer-events-none" />
                </div>

                {/* 3 Interactive Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                    {/* Total Member */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-primary/10 hover:border-primary/30 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-on-surface-variant">Total Member Binaan</p>
                            <p className="text-3xl font-heading font-black text-primary tracking-tight mt-1">
                                {stats.totalMembers || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant/80 font-medium mt-1">
                                Alokasi kohor aktif
                            </p>
                        </div>
                        <div className="w-13 h-13 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">groups</span>
                        </div>
                    </div>

                    {/* Perlu Perhatian */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-primary/10 hover:border-amber-300 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-on-surface-variant">Sinyal Perlu Perhatian</p>
                            <p className="text-3xl font-heading font-black text-amber-700 tracking-tight mt-1">
                                {stats.needsAttention || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant/80 font-medium mt-1">
                                Butuh evaluasi intervensi
                            </p>
                        </div>
                        <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">notification_important</span>
                        </div>
                    </div>

                    {/* Konsultasi Hari Ini */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-primary/10 hover:border-secondary/30 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-on-surface-variant">Konsultasi Hari Ini</p>
                            <p className="text-3xl font-heading font-black text-secondary tracking-tight mt-1">
                                {stats.todayConsultations || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant/80 font-medium mt-1">
                                Sesi tatap muka terjadwal
                            </p>
                        </div>
                        <div className="w-13 h-13 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px]">event_available</span>
                        </div>
                    </div>
                </div>

                {/* Sinyal Perilaku Yang Membutuhkan Triase */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all">
                    <div className="p-5 sm:p-6 border-b border-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white/40">
                        <div>
                            <h3 className="text-lg font-heading font-bold text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">troubleshoot</span>
                                Sinyal Perilaku Membutuhkan Triase
                            </h3>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                Anomali gaya hidup yang terdeteksi secara otomatis oleh Behavioral Engine
                            </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[11px] font-label-mono font-bold text-primary">
                            Protokol Non-Alarmist
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-primary/2 text-on-surface-variant font-semibold border-b border-primary/10">
                                <tr>
                                    <th className="py-3.5 px-6">Member Binaan</th>
                                    <th className="py-3.5 px-6">Tingkat Urgensi</th>
                                    <th className="py-3.5 px-6">Metrik Terdampak</th>
                                    <th className="py-3.5 px-6">Waktu Deteksi</th>
                                    <th className="py-3.5 px-6 text-right">Aksi Bimbingan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {pendingSignals.map((signal) => {
                                    const isAttention = signal.severity === 'ATTENTION';
                                    const isNotice = signal.severity === 'NOTICE';

                                    return (
                                        <tr key={signal.id} className="hover:bg-primary/2 transition-colors">
                                            <td className="py-4 px-6 font-bold text-on-surface text-sm">
                                                {signal.member_name || 'Member Terbina'}
                                            </td>
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
                                                    {signal.severity}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-label-mono font-semibold text-primary">
                                                {signal.metric || 'Pola Tidur/Glukosa'}
                                            </td>
                                            <td className="py-4 px-6 text-on-surface-variant font-label-mono">
                                                {signal.detected_at || 'Baru Saja'}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/instructor/members/${signal.member_id || 1}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white hover:bg-primary-container text-xs font-bold rounded-xl shadow-xs transition-all"
                                                >
                                                    Tinjau Konteks
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {pendingSignals.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-10 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-emerald-500/50 mb-2">verified</span>
                                                <p className="text-sm font-semibold text-on-surface">Semua sinyal binaan dalam kondisi stabil.</p>
                                                <p className="text-xs text-on-surface-variant mt-0.5">Tidak ada deviasi kritis yang memerlukan triase darurat.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom 2-Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Member Binaan Terbaru */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 flex justify-between items-center bg-white/40">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">person_pin</span>
                                    Member Binaan Aktif
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Daftar kohor pendampingan pribadi</p>
                            </div>
                            <Link 
                                href="/instructor/members" 
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-container px-3 py-1.5 rounded-xl hover:bg-primary/5 transition-all"
                            >
                                Lihat Semua
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="p-4 sm:p-5 flex-1 divide-y divide-primary/5">
                            {assignedMembers.map(member => (
                                <div key={member.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-secondary/10 border border-secondary/20 text-secondary font-heading font-bold flex items-center justify-center text-sm">
                                            {member.name?.charAt(0) || 'M'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-on-surface">{member.name}</p>
                                            <p className="text-[11px] text-on-surface-variant font-label-mono">{member.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/instructor/members/${member.id}`}
                                        className="p-2 rounded-xl text-primary hover:bg-primary/10 transition-colors"
                                        title="Buka Rekam Binaan"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </Link>
                                </div>
                            ))}

                            {assignedMembers.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Belum ada member yang dialokasikan ke Anda.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Konsultasi Mendatang */}
                    <div className="bg-white/75 backdrop-blur-md rounded-3xl shadow-xs border border-primary/10 overflow-hidden hover:border-primary/20 transition-all flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-primary/10 flex justify-between items-center bg-white/40">
                            <div>
                                <h3 className="text-base font-heading font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                    Agenda Konsultasi 1-on-1
                                </h3>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Sesi terjadwal mendatang</p>
                            </div>
                            <Link 
                                href="/instructor/consultations" 
                                className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary-container px-3 py-1.5 rounded-xl hover:bg-secondary/5 transition-all"
                            >
                                Kelola Kalender
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="p-4 sm:p-5 flex-1 divide-y divide-primary/5">
                            {upcomingConsultations.map(consultation => (
                                <div key={consultation.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-[20px]">video_call</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-on-surface">{consultation.member_name}</p>
                                            <p className="text-[11px] text-on-surface-variant flex items-center gap-1 font-label-mono mt-0.5">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                {consultation.schedule_time || 'Pukul 14:00 WIB'}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/15">
                                        {consultation.type || 'SINKRON'}
                                    </span>
                                </div>
                            ))}

                            {upcomingConsultations.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Tidak ada jadwal konsultasi dalam waktu dekat.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
