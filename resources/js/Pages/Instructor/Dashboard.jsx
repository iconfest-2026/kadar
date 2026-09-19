import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Dashboard({ instructor, caseload }) {
    const [activeMemberModal, setActiveMemberModal] = useState(null);
    const [modalType, setModalType] = useState(null); // 'INTERVENTION' | 'CONSULTATION'

    // Form for intervention
    const interventionForm = useForm({
        title: 'Rutinitas Digital Sunset Terstruktur 7 Hari',
        description: 'Redupkan gawai 45 menit sebelum tidur dan ganti dengan relaksasi pernapasan 4-7-8 untuk memulihkan baseline tidur lelap.',
        type: 'SLEEP_ROUTINE',
        start_at: new Date().toISOString().split('T')[0],
        due_at: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    });

    // Form for consultation note
    const noteForm = useForm({
        notes: '',
        scheduled_at: new Date().toISOString().split('T')[0],
    });

    const handleOpenIntervention = (member) => {
        setActiveMemberModal(member);
        setModalType('INTERVENTION');
    };

    const handleOpenConsultation = (member) => {
        setActiveMemberModal(member);
        setModalType('CONSULTATION');
    };

    const handleCloseModal = () => {
        setActiveMemberModal(null);
        setModalType(null);
    };

    const handleSaveIntervention = (e) => {
        e.preventDefault();
        interventionForm.post(`/instructor/members/${activeMemberModal.member_id}/interventions`, {
            onSuccess: () => handleCloseModal(),
        });
    };

    const handleSaveConsultation = (e) => {
        e.preventDefault();
        noteForm.post(`/instructor/members/${activeMemberModal.member_id}/consultations`, {
            onSuccess: () => handleCloseModal(),
        });
    };

    return (
        <AppLayout title="Caseload Instruktur" activeTab="caseload">
            <Head title="Caseload & Bimbingan Member - Kadar" />

            <div className="space-y-6">
                {/* Header Banner */}
                <section className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-2">
                    <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                        Workspace Instruktur & Tenaga Ahli Terverifikasi
                    </span>
                    <h1 className="font-heading font-bold text-2xl sm:text-3xl text-on-surface">
                        Manajemen Caseload & Triase Sinyal Perilaku
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                        Pantau anggota bimbingan yang mengalami pergeseran baseline perilaku (HBE), tugaskan rencana intervensi mikro, dan dokumentasikan rekam konsultasi preventif.
                    </p>
                </section>

                {/* Caseload Cards */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-heading font-bold text-base text-on-surface">
                            Daftar Member Aktif ({caseload?.length || 0})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {caseload && caseload.length > 0 ? (
                            caseload.map((item) => (
                                <div
                                    key={item.assignment_id}
                                    className="p-6 rounded-3xl bg-surface border border-surface-container shadow-xs space-y-4 hover:border-primary/40 transition-all"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container pb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base">
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-heading font-bold text-base text-on-surface">
                                                        {item.name}
                                                    </h3>
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary">
                                                        Gold Member
                                                    </span>
                                                </div>
                                                <p className="text-xs text-on-surface-variant">
                                                    {item.email} • Pekerjaan: {item.profile?.occupation || 'Karyawan'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenIntervention(item)}
                                                className="py-2 px-3.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">add_task</span>
                                                <span>Tugaskan Intervensi</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleOpenConsultation(item)}
                                                className="py-2 px-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold border border-surface-container flex items-center gap-1.5 transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">note_alt</span>
                                                <span>Catatan Konsultasi</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Active Behavioral Signals Alert */}
                                    <div className="space-y-2">
                                        <span className="font-label-mono text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                                            Sinyal Perilaku Terdeteksi (HBE Signals):
                                        </span>
                                        {item.active_signals && item.active_signals.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {item.active_signals.map((sig) => (
                                                    <div
                                                        key={sig.id}
                                                        className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5"
                                                    >
                                                        <span className="material-symbols-outlined text-amber-600 text-[18px] mt-0.5">warning</span>
                                                        <div className="text-xs space-y-0.5">
                                                            <div className="flex items-center gap-2">
                                                                <strong className="text-amber-950 dark:text-amber-200 font-bold">{sig.signal_type}</strong>
                                                                <span className="px-1.5 py-0.2 rounded text-[9px] font-label-mono bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-bold uppercase">
                                                                    {sig.severity}
                                                                </span>
                                                            </div>
                                                            <p className="text-amber-900/80 dark:text-amber-300 text-[11px] leading-snug">
                                                                Skor Prioritas Triase: <strong>{sig.priority_score}</strong> / 100
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-on-surface-variant italic">
                                                Tidak ada deviasi kritis yang terdeteksi saat ini.
                                            </p>
                                        )}
                                    </div>

                                    {/* Footer Info */}
                                    <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-2 border-t border-surface-container/60">
                                        <span>Aktivitas Terakhir: <strong>{item.last_activity_date}</strong></span>
                                        <span>Bimbingan Sejak: <strong>{item.assigned_since}</strong></span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 bg-surface rounded-3xl text-center text-xs text-on-surface-variant border border-surface-container">
                                Belum ada member yang dialokasikan ke caseload Anda.
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Modal for Creating Intervention */}
            {modalType === 'INTERVENTION' && activeMemberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-surface rounded-3xl border border-surface-container shadow-2xl p-6 space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Tugaskan Intervensi untuk {activeMemberModal.name}
                            </h3>
                            <button type="button" onClick={handleCloseModal} className="text-on-surface-variant p-1">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveIntervention} className="space-y-3.5">
                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Judul Program / Komitmen
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={interventionForm.data.title}
                                    onChange={(e) => interventionForm.setData('title', e.target.value)}
                                    className="w-full px-3 py-2 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Deskripsi Instruksi & Protokol Mikro
                                </label>
                                <textarea
                                    rows="3"
                                    required
                                    value={interventionForm.data.description}
                                    onChange={(e) => interventionForm.setData('description', e.target.value)}
                                    className="w-full px-3 py-2 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={interventionForm.data.start_at}
                                        onChange={(e) => interventionForm.setData('start_at', e.target.value)}
                                        className="w-full px-3 py-2 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                        Batas Evaluasi (Due Date)
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={interventionForm.data.due_at}
                                        onChange={(e) => interventionForm.setData('due_at', e.target.value)}
                                        className="w-full px-3 py-2 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={interventionForm.processing}
                                    className="py-2 px-4 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-xl"
                                >
                                    Simpan & Tugaskan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Consultation Note */}
            {modalType === 'CONSULTATION' && activeMemberModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-surface rounded-3xl border border-surface-container shadow-2xl p-6 space-y-4 animate-scale-up">
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Catatan Konsultasi: {activeMemberModal.name}
                            </h3>
                            <button type="button" onClick={handleCloseModal} className="text-on-surface-variant p-1">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveConsultation} className="space-y-3.5">
                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Rekam Catatan Klinis / Evaluasi Gaya Hidup
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    placeholder="Catat hasil evaluasi, penyebab deviasi tidur (misal deadline kantor), dan komitmen perbaikan member..."
                                    value={noteForm.data.notes}
                                    onChange={(e) => noteForm.setData('notes', e.target.value)}
                                    className="w-full px-3 py-2 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={noteForm.processing}
                                    className="py-2 px-4 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-xl"
                                >
                                    Simpan ke Rekam Medis
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
