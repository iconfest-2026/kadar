import React from 'react';
import { Head, Link } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';

const SIGNAL_MAP = {
    SLEEP_DEFICIT: 'Defisit Durasi Tidur',
    GLUCOSE_SPIKE: 'Lonjakan Glukosa Postprandial',
    HYDRATION_LOW: 'Asupan Cairan Kurang',
    SEDENTARY_STREAK: 'Kurang Aktivitas Fisik',
    GLYCEMIC_VARIABILITY_HIGH: 'Variabilitas Glikemik Tinggi',
    LATE_NIGHT_MEAL: 'Pola Makan Larut Malam',
    VITALITY_DROP: 'Penurunan Indikator Vitalitas',
    sleep_duration: 'Durasi Tidur',
    water_intake: 'Asupan Air Minum',
    blood_glucose: 'Gula Darah Puasa',
    steps: 'Langkah Kaki',
};

const SEVERITY_MAP = {
    ATTENTION: 'Perlu Perhatian',
    CRITICAL: 'Tingkat Kritis',
    NOTICE: 'Pemberitahuan',
    FOLLOW_UP: 'Perlu Tindak Lanjut',
    INFO: 'Informasi',
    STABLE: 'Stabil',
};

export default function Dashboard({ assignedMembers = [], pendingSignals = [], upcomingConsultations = [], stats = {} }) {
    return (
        <InstructorLayout activeNav="dashboard" title="Dashboard Pendampingan">
            <Head title="Instruktur Dashboard — AEVYRA" />
            
            <div className="space-y-6">
                {/* Header Welcome Card */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-xs">
                    <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-emerald-300">verified_user</span>
                            <span>HUMAN-IN-THE-LOOP • CLINICAL CASELOAD & INTERVENTION</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Ruang Bimbingan & Intervensi Tenaga Medis
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Pantau deviasi fisiologis member binaan secara objektif, evaluasi kepatuhan gaya hidup, dan terbitkan protokol intervensi mikro berbasis pedoman klinis PERKENI & Kemenkes RI.
                        </p>
                    </div>
                </div>

                {/* 3 Interactive Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total Member */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-on-surface-variant">Total Member Binaan</p>
                            <p className="text-3xl font-heading font-black text-primary font-mono">
                                {stats.totalMembers || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                                Alokasi kohor pendampingan aktif
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                            <span className="material-symbols-outlined text-[26px]">groups</span>
                        </div>
                    </div>

                    {/* Perlu Perhatian */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-on-surface-variant">Sinyal Perlu Perhatian</p>
                            <p className="text-3xl font-heading font-black text-amber-700 dark:text-amber-400 font-mono">
                                {stats.needsAttention || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                                Membutuhkan evaluasi triase
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                            <span className="material-symbols-outlined text-[26px]">notification_important</span>
                        </div>
                    </div>

                    {/* Konsultasi Hari Ini */}
                    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-on-surface-variant">Konsultasi Hari Ini</p>
                            <p className="text-3xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                                {stats.todayConsultations || 0}
                            </p>
                            <p className="text-[11px] text-on-surface-variant">
                                Sesi tele-konsultasi terjadwal
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                            <span className="material-symbols-outlined text-[26px]">calendar_today</span>
                        </div>
                    </div>
                </div>

                {/* Sinyal Perilaku Yang Membutuhkan Triase */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden space-y-0">
                    <div className="p-5 sm:p-6 border-b border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-surface-container-low">
                        <div>
                            <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">troubleshoot</span>
                                <span>Sinyal Perilaku Membutuhkan Triase</span>
                            </h3>
                            <p className="text-xs text-on-surface-variant mt-0.5">
                                Anomali gaya hidup dan biomarker yang terdeteksi oleh Health Behavior Engine (HBE)
                            </p>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-mono font-bold">
                            Protokol Non-Alarmist
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-surface-container font-label-mono text-[11px]">
                                <tr>
                                    <th className="py-3 px-6">Member Binaan</th>
                                    <th className="py-3 px-6">Tingkat Urgensi</th>
                                    <th className="py-3 px-6">Metrik Terdampak</th>
                                    <th className="py-3 px-6">Waktu Deteksi</th>
                                    <th className="py-3 px-6 text-right">Tindakan Klinis</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-container">
                                {pendingSignals.map((signal) => {
                                    const isAttention = signal.severity === 'ATTENTION';
                                    const isNotice = signal.severity === 'NOTICE' || signal.severity === 'FOLLOW_UP';

                                    return (
                                        <tr key={signal.id} className="hover:bg-surface-container-low/60 transition-colors">
                                            <td className="py-3.5 px-6 font-bold text-on-surface">
                                                {signal.user?.name || signal.member_name || 'Member Binaan'}
                                            </td>
                                            <td className="py-3.5 px-6">
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
                                                    <span>{signal.severity}</span>
                                                    <span>{SEVERITY_MAP[signal.severity] || signal.severity}</span>
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-6 font-mono font-semibold text-primary">
                                                {signal.metric || signal.signal_type || 'Pola Tidur / Glukosa'}
                                            <td className="py-3.5 px-6 font-semibold text-primary text-xs">
                                                {SIGNAL_MAP[signal.metric || signal.signal_type] || (signal.metric || signal.signal_type ? (signal.metric || signal.signal_type).replace(/_/g, ' ') : 'Pola Tidur / Glukosa')}
                                            </td>
                                            <td className="py-3.5 px-6 text-on-surface-variant font-mono">
                                                {signal.detected_at || 'Baru Saja'}
                                            </td>
                                            <td className="py-3.5 px-6 text-right">
                                                <Link
                                                    href={`/instructor/members/${signal.user_id || signal.member_id || 1}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white hover:bg-primary-container text-xs font-bold rounded-xl shadow-2xs transition-all cursor-pointer"
                                                >
                                                    <span>Tinjau Konteks</span>
                                                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}

                                {pendingSignals.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-10 text-center text-on-surface-variant">
                                            <div className="flex flex-col items-center justify-center space-y-1.5">
                                                <span className="material-symbols-outlined text-4xl text-emerald-600">verified</span>
                                                <p className="text-xs font-semibold text-on-surface">Semua sinyal binaan dalam kondisi stabil.</p>
                                                <p className="text-[11px] text-on-surface-variant">Tidak ada deviasi kritis yang memerlukan triase darurat.</p>
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
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">person_pin</span>
                                    <span>Member Binaan Aktif</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">Daftar kohor pendampingan personal</p>
                            </div>
                            <Link 
                                href="/instructor/members" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                            >
                                <span>Lihat Semua</span>
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="p-4 sm:p-5 flex-1 divide-y divide-surface-container">
                            {assignedMembers.map(member => (
                                <div key={member.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                            {member.name?.charAt(0) || 'M'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-on-surface truncate">{member.name}</p>
                                            <p className="text-[11px] text-on-surface-variant font-mono truncate">{member.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/instructor/members/${member.id}`}
                                        className="p-2 rounded-xl text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
                                        title="Buka Rekam Binaan"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </Link>
                                </div>
                            ))}

                            {assignedMembers.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Belum ada member yang memilih Anda sebagai pendamping.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Konsultasi Mendatang */}
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden flex flex-col">
                        <div className="p-5 sm:p-6 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                                    <span>Agenda Konsultasi Terjadwal</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">Sesi tatap muka 1-on-1 mendatang</p>
                            </div>
                            <Link 
                                href="/instructor/consultations" 
                                className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline cursor-pointer"
                            >
                                <span>Kelola Jadwal</span>
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </Link>
                        </div>
                        
                        <div className="p-4 sm:p-5 flex-1 divide-y divide-surface-container">
                            {upcomingConsultations.map(consultation => (
                                <div key={consultation.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">videocam</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-on-surface truncate">
                                                {consultation.member?.name || consultation.member_name || 'Member Terbina'}
                                            </p>
                                            <p className="text-[11px] text-on-surface-variant flex items-center gap-1 font-mono">
                                                <span className="material-symbols-outlined text-[13px]">schedule</span>
                                                <span>{consultation.scheduled_start || consultation.schedule_time || 'Terjadwal'}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary">
                                        {consultation.status || 'SCHEDULED'}
                                    </span>
                                </div>
                            ))}

                            {upcomingConsultations.length === 0 && (
                                <div className="py-8 text-center text-on-surface-variant text-xs">
                                    Tidak ada jadwal tele-konsultasi aktif dalam waktu dekat.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
