import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import { Table } from '@/Components/UI';

export default function Consultations({
    consultations = { data: [], links: [] },
    assignedMembers = [],
}) {
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    // Schedule Consultation Form
    const scheduleForm = useForm({
        member_id: assignedMembers[0]?.id || '',
        purpose: 'Evaluasi Mingguan Pola Makan & Glukosa Darah',
        scheduled_start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        scheduled_end: new Date(Date.now() + 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString().slice(0, 16),
    });

    // Complete Consultation Form
    const completeForm = useForm({
        notes: '',
    });

    const openCompleteModal = (cons) => {
        setSelectedConsultation(cons);
        completeForm.setData('notes', cons.notes || '');
    };

    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        scheduleForm.post('/instructor/consultations', {
            preserveScroll: true,
            onSuccess: () => {
                setShowScheduleModal(false);
                scheduleForm.reset();
            },
        });
    };

    const handleCompleteSubmit = (e) => {
        e.preventDefault();
        completeForm.patch(`/instructor/consultations/${selectedConsultation.id}/complete`, {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedConsultation(null);
                completeForm.reset();
            },
        });
    };

    const columns = [
        {
            key: 'member',
            label: 'Member Binaan',
            render: (cons) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-sm shadow-2xs shrink-0">
                        {cons.member?.name?.charAt(0) || 'M'}
                    </div>
                    <div>
                        <Link
                            href={`/instructor/members/${cons.member_id}`}
                            className="font-bold text-on-surface text-sm hover:text-primary transition-colors cursor-pointer"
                        >
                            {cons.member?.name || 'Member Terbina'}
                        </Link>
                        <div className="text-on-surface-variant font-mono text-[11px]">
                            {cons.member?.email || '-'}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'purpose',
            label: 'Tujuan Konsultasi',
            render: (cons) => (
                <div className="max-w-xs">
                    <div className="font-semibold text-primary">
                        {cons.purpose || 'Evaluasi Pola Makan Mingguan'}
                    </div>
                    {cons.notes && (
                        <div className="text-on-surface-variant text-[11px] italic mt-0.5 line-clamp-1">
                            Catatan: {cons.notes}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'scheduled_start',
            label: 'Waktu Pelaksanaan',
            render: (cons) => (
                <div className="font-mono text-on-surface-variant">
                    <div>
                        {cons.scheduled_start
                            ? new Date(cons.scheduled_start).toLocaleDateString('id-ID', {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                              })
                            : '-'}
                    </div>
                    <div className="text-[11px] text-primary font-bold">
                        {cons.scheduled_start
                            ? new Date(cons.scheduled_start).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                              })
                            : ''}
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Sesi',
            render: (cons) => {
                const isCompleted = cons.status === 'COMPLETED';
                return (
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                            isCompleted
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                        }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                isCompleted ? 'bg-primary' : 'bg-emerald-500'
                            }`}
                        />
                        {isCompleted
                            ? 'Selesai'
                            : (cons.status === 'CONFIRMED' || cons.status === 'SCHEDULED'
                            ? 'Terjadwal'
                            : (cons.status ? cons.status.replace(/_/g, ' ') : 'Terjadwal'))}
                    </span>
                );
            },
        },
        {
            key: 'action',
            label: 'Tindakan Klinis',
            align: 'right',
            render: (cons) => {
                const isCompleted = cons.status === 'COMPLETED';
                const isScheduled = cons.status === 'SCHEDULED' || cons.status === 'CONFIRMED';
                return (
                    <div className="space-x-2">
                        {isScheduled && (
                            <button
                                type="button"
                                onClick={() => openCompleteModal(cons)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[14px]">
                                    check_circle
                                </span>
                                <span>Selesaikan Sesi</span>
                            </button>
                        )}
                        {isCompleted && (
                            <button
                                type="button"
                                onClick={() => openCompleteModal(cons)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary border border-surface-container font-semibold text-xs transition-all shadow-2xs cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[14px]">
                                    edit_note
                                </span>
                                <span>Lihat Catatan</span>
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];

    const items = consultations.data || [];
    const completedCount = items.filter((c) => c.status === 'COMPLETED').length;
    const scheduledCount = items.filter((c) => c.status === 'SCHEDULED' || c.status === 'CONFIRMED').length;

    return (
        <InstructorLayout activeNav="consultations" title="Jadwal Tele-Konsultasi & Bimbingan">
            <Head title="Jadwal Konsultasi - Instruktur AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary text-[24px]">calendar_month</span>
                            <h1 className="font-heading font-black text-xl text-on-surface">
                                Agenda Bimbingan Tatap Muka 1-on-1
                            </h1>
                        </div>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Kelola jadwal video call sinkron, evaluasi mingguan, dan pencatatan ringkasan klinis (SOAP)
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={() => setShowScheduleModal(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">add_alarm</span>
                            <span>Jadwalkan Konsultasi</span>
                        </button>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Total Sesi Bimbingan</span>
                        <div className="text-2xl font-heading font-black text-primary font-mono">
                            {items.length}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Riwayat sesi terlaksana</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Sesi Terjadwal</span>
                        <div className="text-2xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            {scheduledCount}
                        </div>
                        <span className="text-[10px] text-emerald-600 block">Menunggu pelaksanaan</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Selesai & Terekam</span>
                        <div className="text-2xl font-heading font-black text-primary font-mono">
                            {completedCount}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Catatan klinis tersimpan</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Kapasitas Harian</span>
                        <div className="text-2xl font-heading font-black text-on-surface font-mono">
                            6 Sesi
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Standar beban kerja IDI</span>
                    </div>
                </div>

                {/* Consultations Table with Built-in Search & Pagination */}
                <Table
                    columns={columns}
                    data={consultations}
                    searchPlaceholder="Cari jadwal konsultasi berdasarkan nama member atau tujuan..."
                    emptyMessage="Tidak ada jadwal konsultasi yang ditemukan."
                    emptyIcon="event_busy"
                />
            </div>

            {/* MODAL: Jadwalkan Konsultasi Baru */}
            {showScheduleModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowScheduleModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Jadwalkan Sesi Tele-Konsultasi Baru
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Atur waktu video call 1-on-1 dengan member binaan
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowScheduleModal(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Member Binaan</label>
                                <select
                                    value={scheduleForm.data.member_id}
                                    onChange={(e) => scheduleForm.setData('member_id', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium cursor-pointer"
                                    required
                                >
                                    {assignedMembers.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name} ({m.email})
                                        </option>
                                    ))}
                                    {assignedMembers.length === 0 && (
                                        <option value="">Tidak ada member binaan aktif</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Tujuan / Agenda Sesi</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Evaluasi Kepatuhan Diet 7 Hari & Lonjakan Glukosa Malam"
                                    value={scheduleForm.data.purpose}
                                    onChange={(e) => scheduleForm.setData('purpose', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Waktu Mulai</label>
                                    <input
                                        type="datetime-local"
                                        value={scheduleForm.data.scheduled_start}
                                        onChange={(e) => scheduleForm.setData('scheduled_start', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Waktu Selesai</label>
                                    <input
                                        type="datetime-local"
                                        value={scheduleForm.data.scheduled_end}
                                        onChange={(e) => scheduleForm.setData('scheduled_end', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setShowScheduleModal(false)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={scheduleForm.processing || assignedMembers.length === 0}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {scheduleForm.processing ? 'Menjadwalkan...' : 'Simpan Jadwal'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: Selesaikan Sesi & Catatan SOAP */}
            {selectedConsultation && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setSelectedConsultation(null)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Catatan Evaluasi Pasca-Konsultasi (SOAP)
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Member: {selectedConsultation.member?.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedConsultation(null)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCompleteSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">
                                    Ringkasan Sesi & Arahan Bimbingan
                                </label>
                                <p className="text-[11px] text-on-surface-variant mb-2">
                                    Tuliskan evaluasi subjektif, data biomarker objektif, analisis asesmen, dan rencana intervensi.
                                </p>
                                <textarea
                                    rows="5"
                                    value={completeForm.data.notes}
                                    onChange={(e) => completeForm.setData('notes', e.target.value)}
                                    placeholder="Tuliskan kesimpulan evaluasi nutrisi, saran aktivitas fisik, atau komitmen kebiasaan baru yang disepakati bersama member..."
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setSelectedConsultation(null)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Tutup
                                </button>
                                <button
                                    type="submit"
                                    disabled={completeForm.processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {completeForm.processing ? 'Menyimpan...' : 'Simpan & Tandai Selesai'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}
