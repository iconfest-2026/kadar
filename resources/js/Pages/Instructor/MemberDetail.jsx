import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import Table from '@/Components/UI/Table';

const METRIC_LABELS = {
    sleep_duration: 'Durasi Tidur',
    water_intake: 'Asupan Air Minum',
    blood_glucose: 'Gula Darah Puasa',
    steps: 'Langkah Kaki',
    mood_score: 'Kesejahteraan Mental (Mood)',
    heart_rate: 'Denyut Jantung',
    blood_pressure_systolic: 'Tekanan Darah Sistolik',
    blood_pressure_diastolic: 'Tekanan Darah Diastolik',
    weight: 'Berat Badan',
    body_weight: 'Berat Badan',
    calories: 'Asupan Kalori',
    glycemic_load: 'Beban Glikemik (GL)',
};

const SIGNAL_LABELS = {
    SLEEP_DEFICIT: 'Defisit Durasi Tidur',
    SLEEP_DECLINE: 'Penurunan Kualitas Tidur',
    GLUCOSE_SPIKE: 'Lonjakan Glukosa Postprandial',
    HYDRATION_LOW: 'Asupan Cairan Kurang',
    SEDENTARY_STREAK: 'Kurang Aktivitas Fisik / Menetap',
    GLYCEMIC_VARIABILITY_HIGH: 'Variabilitas Glikemik Fluktuatif',
    LATE_NIGHT_MEAL: 'Pola Makan Larut Malam',
    VITALITY_DROP: 'Penurunan Indikator Vitalitas',
};

const SEVERITY_LABELS = {
    ATTENTION: 'Perlu Perhatian',
    CRITICAL: 'Tingkat Kritis',
    NOTICE: 'Pemberitahuan',
    FOLLOW_UP: 'Perlu Tindak Lanjut',
    INFO: 'Informasi',
    STABLE: 'Stabil',
};

const STATUS_LABELS = {
    ACTIVE: 'Aktif / Berjalan',
    IN_PROGRESS: 'Sedang Berjalan',
    COMPLETED: 'Telah Selesai',
    PENDING: 'Menunggu Evaluasi',
    PAUSED: 'Dijeda',
    CANCELLED: 'Dibatalkan',
    UNRESOLVED: 'Perlu Tindakan',
    RESOLVED: 'Terselesaikan',
    VALIDATED: 'Tervalidasi',
};

const INTERVENTION_TYPE_LABELS = {
    NUTRITION: 'Nutrisi & Diet',
    PHYSICAL_ACTIVITY: 'Aktivitas Fisik',
    SLEEP_CIRCADIAN: 'Pemulihan & Tidur',
    STRESS_MANAGEMENT: 'Manajemen Stres',
    HYDRATION: 'Target Hidrasi',
};

export default function MemberDetail({
    member = {},
    baselines = [],
    recentRecords = [],
    signals = [],
    interventions = [],
    consultations = [],
}) {
    const [activeTab, setActiveTab] = useState('overview');
    const [showInterventionModal, setShowInterventionModal] = useState(false);
    const [showConsultationModal, setShowConsultationModal] = useState(false);

    const recordColumns = [
        {
            key: 'recorded_at',
            label: 'Waktu Pencatatan',
            render: (r) => (
                <span className="font-mono text-on-surface-variant text-[11px]">
                    {r.recorded_at ? new Date(r.recorded_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : '-'}
                </span>
            )
        },
        {
            key: 'metric_type',
            label: 'Jenis Metrik',
            render: (r) => (
                <span className="font-bold text-primary">
                    {METRIC_LABELS[r.metric_type] || (r.metric_type ? String(r.metric_type).replace(/_/g, ' ') : '-')}
                </span>
            )
        },
        {
            key: 'value',
            label: 'Nilai Kuantitatif',
            render: (r) => (
                <span className="font-mono font-bold text-on-surface">
                    {r.value !== undefined && r.value !== null ? `${r.value} ${r.unit || ''}` : '-'}
                </span>
            )
        },
        {
            key: 'context',
            label: 'Konteks / Catatan Tambahan',
            render: (r) => (
                <span className="text-on-surface-variant max-w-xs truncate block">
                    {r.context || r.notes || '-'}
                </span>
            )
        },
        {
            key: 'data_quality_score',
            label: 'Integritas DQS',
            render: (r) => (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    {r.data_quality_score ? `${r.data_quality_score}%` : 'TERVERIFIKASI'}
                </span>
            )
        }
    ];

    // Intervention Form
    const interventionForm = useForm({
        title: '',
        type: 'NUTRITION',
        description: '',
        start_at: new Date().toISOString().split('T')[0],
        due_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    // Consultation Note Form (SOAP)
    const consultationForm = useForm({
        notes: '',
    });

    const handleInterventionSubmit = (e) => {
        e.preventDefault();
        interventionForm.post(`/instructor/members/${member.id}/interventions`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowInterventionModal(false);
                interventionForm.reset();
            },
        });
    };

    const handleConsultationSubmit = (e) => {
        e.preventDefault();
        consultationForm.post(`/instructor/members/${member.id}/consultations/note`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowConsultationModal(false);
                consultationForm.reset();
            },
        });
    };

    const isFemale = member.member_profile?.sex === 'FEMALE' || member.lifestyle_profile?.biological_sex === 'FEMALE';
    const age = member.member_profile?.date_of_birth
        ? new Date().getFullYear() - new Date(member.member_profile.date_of_birth).getFullYear()
        : 28;

    return (
        <InstructorLayout activeNav="members" title={`Rekam Medis & Bimbingan: ${member.name}`}>
            <Head title={`Detail Binaan ${member.name} - Instruktur AEVYRA`} />

            <div className="space-y-6">
                {/* Member Profile Header */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                    <div className="flex items-start sm:items-center gap-4">
                        <Link
                            href="/instructor/members"
                            className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-primary hover:text-white border border-surface-container text-primary shadow-2xs transition-all cursor-pointer"
                            title="Kembali ke daftar member"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-heading font-black flex items-center justify-center text-xl shadow-2xs shrink-0">
                                {member.name?.charAt(0) || 'M'}
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="font-heading font-black text-2xl text-on-surface">
                                        {member.name}
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/20">
                                        Member Terbina Aktif
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                        isFemale
                                            ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
                                            : 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20'
                                    }`}>
                                        {isFemale ? 'Wanita • Siklus Haid' : 'Pria • Vitalitas'}
                                    </span>
                                </div>
                                <p className="text-xs text-on-surface-variant mt-1 font-mono">
                                    {member.email} • {member.member_profile?.occupation || 'Profesional'} • Usia: {age} th
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                        <Link
                            href={`/instructor/chat?member_id=${member.id}`}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">forum</span>
                            <span>Chat Pasien</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowConsultationModal(true)}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-surface-container text-on-surface text-xs font-bold shadow-2xs transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px] text-primary">edit_note</span>
                            <span>Catat Sesi / SOAP</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowInterventionModal(true)}
                            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_task</span>
                            <span>Terbitkan Intervensi</span>
                        </button>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-2 border-b border-surface-container overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            activeTab === 'overview'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">ecg_heart</span>
                        <span>Garis Pangkal & Biomarker</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('signals')}
                        className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            activeTab === 'signals'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">troubleshoot</span>
                        <span>Sinyal Deviasi HBE ({signals.length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('interventions')}
                        className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            activeTab === 'interventions'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                        <span>Intervensi Perilaku ({interventions.length})</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('consultations')}
                        className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            activeTab === 'consultations'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        <span>Rekam Tele-Konsultasi ({consultations.length})</span>
                    </button>
                </div>

                {/* TAB CONTENT: Overview (Baselines & Records) */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* 14-Day Rolling Baselines */}
                        <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-4">
                                <div>
                                    <h2 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[20px]">monitor_heart</span>
                                        <span>Garis Pangkal Fisiologis (14-Day Rolling Baselines)</span>
                                    </h2>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                        Rentang acuan biologis personal tervalidasi Data Quality Score (DQS)
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-label-mono font-bold self-start sm:self-auto">
                                    Pedoman Klinis PERKENI
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {baselines.map((b) => (
                                    <div
                                        key={b.id}
                                        className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 hover:border-primary/40 transition-all"
                                    >
                                        <span className="font-label-mono text-[10px] uppercase text-on-surface-variant font-bold block">
                                            {METRIC_LABELS[b.metric_type] || (b.metric_type ? b.metric_type.replace(/_/g, ' ') : 'Metrik')}
                                        </span>
                                        <div className="text-2xl font-heading font-black text-primary font-mono">
                                            {b.value_primary}{' '}
                                            <span className="text-xs font-normal text-on-surface-variant font-sans">
                                                ± {b.value_secondary || 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between pt-1 text-[10px] font-label-mono">
                                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                                                {STATUS_LABELS[b.status] || b.status || 'Tervalidasi'}
                                            </span>
                                            <span className="text-on-surface-variant">
                                                {b.sample_count || 14} sampel
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {baselines.length === 0 && (
                                    <div className="col-span-full py-8 text-center text-on-surface-variant text-xs space-y-1">
                                        <span className="material-symbols-outlined text-3xl text-primary/30">analytics</span>
                                        <p className="font-semibold text-on-surface">Sedang Menghitung Baseline Biologis</p>
                                        <p>Data log harian member 14 hari terakhir diperlukan untuk membentuk baseline acuan.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Health Records Table */}
                        <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                            <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                                <div>
                                    <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">history</span>
                                        <span>Log Rekam Biomarker Terkini (30 Hari Terakhir)</span>
                                    </h3>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                        Log mandiri glukosa, tekanan darah, aktivitas, dan kualitas tidur
                                    </p>
                                </div>
                                <span className="text-[10px] font-mono text-on-surface-variant">
                                    {recentRecords.length} entri tercatat
                                </span>
                            </div>

                            <Table
                                columns={recordColumns}
                                data={recentRecords}
                                searchable={true}
                                searchPlaceholder="Cari catatan biometrik..."
                                pageSize={10}
                                emptyMessage="Belum ada catatan biomarker terkini untuk member ini."
                                emptyIcon="history"
                            />
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: Signals */}
                {activeTab === 'signals' && (
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">query_stats</span>
                                    <span>Riwayat Sinyal Deviasi Perilaku & Gaya Hidup</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Deteksi anomali pola makan, penurunan tidur kronis, atau lonjakan resistensi insulin
                                </p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-label-mono font-bold">
                                HBE Rule-Based Engine
                            </span>
                        </div>

                        <div className="p-5 divide-y divide-surface-container space-y-3">
                            {signals.map((s) => {
                                const isAttention = s.severity === 'ATTENTION' || s.severity === 'CRITICAL';
                                const isFollowUp = s.severity === 'FOLLOW_UP' || s.severity === 'NOTICE';

                                return (
                                    <div
                                        key={s.id}
                                        className="pt-3 first:pt-0 rounded-2xl p-4 bg-surface-container-low border border-surface-container space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-primary text-[18px]">warning</span>
                                                <strong className="text-sm font-bold text-on-surface">
                                                    {SIGNAL_LABELS[s.signal_type] || (s.signal_type ? s.signal_type.replace(/_/g, ' ') : (s.metric || 'Anomali Perilaku Terdeteksi'))}
                                                </strong>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                isAttention
                                                    ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                                                    : isFollowUp
                                                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20'
                                                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                            }`}>
                                                {SEVERITY_LABELS[s.severity] || (s.severity ? s.severity.replace(/_/g, ' ') : 'Pemberitahuan')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-on-surface-variant leading-relaxed">
                                            {s.explanation || s.notes || 'Terdeteksi deviasi signifikan dari baseline 14-hari member.'}
                                        </p>
                                        <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono pt-1">
                                            <span>Waktu Deteksi: {s.detected_at || 'Hari ini'}</span>
                                            <span>Status Sinyal: {STATUS_LABELS[s.status] || (s.status ? s.status.replace(/_/g, ' ') : 'Perlu Tindakan')}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {signals.length === 0 && (
                                <div className="py-10 text-center text-on-surface-variant text-xs space-y-1">
                                    <span className="material-symbols-outlined text-4xl text-emerald-600">check_circle</span>
                                    <p className="font-semibold text-on-surface">Tidak Ada Sinyal Deviasi</p>
                                    <p>Gaya hidup dan metrik biologis member berada dalam rentang baseline normal.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: Interventions */}
                {activeTab === 'interventions' && (
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">assignment_turned_in</span>
                                    <span>Program & Intervensi Perilaku Aktif</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Daftar protokol mikro yang ditugaskan kepada member untuk modifikasi kebiasaan
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowInterventionModal(true)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                <span>Intervensi Baru</span>
                            </button>
                        </div>

                        <div className="p-5 divide-y divide-surface-container space-y-3">
                            {interventions.map((i) => {
                                const isActive = i.status === 'ACTIVE' || i.status === 'IN_PROGRESS';
                                const isCompleted = i.status === 'COMPLETED';

                                return (
                                    <div
                                        key={i.id}
                                        className="pt-3 first:pt-0 rounded-2xl p-4 bg-surface-container-low border border-surface-container space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/20">
                                                    {INTERVENTION_TYPE_LABELS[i.type] || (i.type ? i.type.replace(/_/g, ' ') : 'Nutrisi & Diet')}
                                                </span>
                                                <strong className="text-sm font-bold text-primary">{i.title}</strong>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                                                isActive
                                                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                                                    : isCompleted
                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                    : 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20'
                                            }`}>
                                                {STATUS_LABELS[i.status] || (i.status ? i.status.replace(/_/g, ' ') : 'Aktif')}
                                            </span>
                                        </div>
                                        <p className="text-xs text-on-surface-variant leading-relaxed">{i.description}</p>
                                        <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono pt-1">
                                            <span>Mulai: {i.start_at || 'Sekarang'}</span>
                                            <span>Target Selesai: {i.due_at || '7 Hari'}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {interventions.length === 0 && (
                                <div className="py-10 text-center text-on-surface-variant text-xs space-y-1">
                                    <span className="material-symbols-outlined text-4xl text-primary/30">add_task</span>
                                    <p className="font-semibold text-on-surface">Belum Ada Intervensi</p>
                                    <p>Terbitkan intervensi mikro pertama untuk memandu perubahan kebiasaan member.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* TAB CONTENT: Consultations & SOAP */}
                {activeTab === 'consultations' && (
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">clinical_notes</span>
                                    <span>Histori Sesi Tele-Konsultasi & Catatan SOAP</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Rekam bimbingan 1-on-1, evaluasi subjektif pasien, dan rencana tindak lanjut
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowConsultationModal(true)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                <span>Catat Sesi Baru</span>
                            </button>
                        </div>

                        <div className="p-5 divide-y divide-surface-container space-y-3">
                            {consultations.map((c) => (
                                <div
                                    key={c.id}
                                    className="pt-3 first:pt-0 rounded-2xl p-4 bg-surface-container-low border border-surface-container space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-secondary text-[18px]">calendar_today</span>
                                            <strong className="text-sm font-bold text-on-surface">
                                                {c.purpose || 'Evaluasi Bimbingan Klinis'}
                                            </strong>
                                        </div>
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary border border-primary/20">
                                            {STATUS_LABELS[c.status] || (c.status ? c.status.replace(/_/g, ' ') : 'Selesai')}
                                        </span>
                                    </div>
                                    {c.notes && (
                                        <div className="p-3 bg-white dark:bg-surface rounded-xl border border-surface-container text-xs text-on-surface whitespace-pre-line leading-relaxed font-sans">
                                            {c.notes}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono pt-1">
                                        <span>
                                            Waktu Sesi: {c.scheduled_start ? new Date(c.scheduled_start).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }) : 'Tercatat'}
                                        </span>
                                        <Link
                                            href={`/instructor/chat?consultation_id=${c.id}`}
                                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[15px]">chat</span>
                                            <span>Buka Chat</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {consultations.length === 0 && (
                                <div className="py-10 text-center text-on-surface-variant text-xs space-y-1">
                                    <span className="material-symbols-outlined text-4xl text-primary/30">event_note</span>
                                    <p className="font-semibold text-on-surface">Belum Ada Rekam Konsultasi</p>
                                    <p>Gunakan tombol "Catat Sesi Baru" untuk memasukkan hasil evaluasi klinis.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL: Buat Intervensi Perilaku Baru */}
            {showInterventionModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowInterventionModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Terbitkan Rencana Intervensi Baru
                                </h3>
                                <p className="text-xs text-on-surface-variant">Member: {member.name}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowInterventionModal(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleInterventionSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Kategori Intervensi (HBE)</label>
                                <select
                                    value={interventionForm.data.type}
                                    onChange={(e) => interventionForm.setData('type', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                >
                                    <option value="NUTRITION">Nutrisi & Pola Makan (DQS)</option>
                                    <option value="PHYSICAL_ACTIVITY">Aktivitas Fisik & Langkah Harian</option>
                                    <option value="SLEEP_CIRCADIAN">Ritme Sirkadian & Durasi Tidur</option>
                                    <option value="STRESS_MANAGEMENT">Manajemen Stres & Relaksasi</option>
                                    <option value="HYDRATION">Target Hidrasi & Kepatuhan</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Judul Protokol Tugas Mikro</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Jalan Kaki 15 Menit Pasca Santap Malam"
                                    value={interventionForm.data.title}
                                    onChange={(e) => interventionForm.setData('title', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Instruksi & Penjelasan Klinis</label>
                                <textarea
                                    rows="4"
                                    placeholder="Jelaskan secara spesifik aksi harian yang perlu dilakukan dan alasan biologisnya..."
                                    value={interventionForm.data.description}
                                    onChange={(e) => interventionForm.setData('description', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Tanggal Mulai</label>
                                    <input
                                        type="date"
                                        value={interventionForm.data.start_at}
                                        onChange={(e) => interventionForm.setData('start_at', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Target Tenggat Waktu</label>
                                    <input
                                        type="date"
                                        value={interventionForm.data.due_at}
                                        onChange={(e) => interventionForm.setData('due_at', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setShowInterventionModal(false)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={interventionForm.processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {interventionForm.processing ? 'Menyimpan...' : 'Terbitkan Intervensi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: Catat Evaluasi Klinis / SOAP */}
            {showConsultationModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowConsultationModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Catatan Evaluasi Klinis (SOAP)
                                </h3>
                                <p className="text-xs text-on-surface-variant">Member: {member.name}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowConsultationModal(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleConsultationSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">
                                    Ringkasan Sesi & Evaluasi (S-O-A-P)
                                </label>
                                <p className="text-[11px] text-on-surface-variant mb-2 leading-relaxed">
                                    Format: Subjektif (keluhan pasien), Objektif (glukosa/langkah/DQS), Asesmen (analisis klinis), Plan (rencana perbaikan lanjutan).
                                </p>
                                <textarea
                                    rows="6"
                                    placeholder="S: Pasien merasa lebih berenergi pada siang hari...&#10;O: Rerata glukosa puasa 104 mg/dL, 8.200 langkah/hari.&#10;A: Kepatuhan diet membaik, resistensi insulin terkontrol.&#10;P: Lanjutkan intervensi jalan santai pasca makan."
                                    value={consultationForm.data.notes}
                                    onChange={(e) => consultationForm.setData('notes', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setShowConsultationModal(false)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={consultationForm.processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {consultationForm.processing ? 'Menyimpan...' : 'Simpan ke Rekam Medis'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}
