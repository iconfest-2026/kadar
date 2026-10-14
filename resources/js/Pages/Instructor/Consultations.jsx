import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import { Table } from '@/Components/UI';
import axios from 'axios';

export default function Consultations({
    consultations = { data: [], links: [] },
    assignedMembers = [],
}) {
    const { auth } = usePage().props;
    const authUser = auth?.user || null;

    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const [cancelConsultation, setCancelConsultation] = useState(null);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [chatConsultation, setChatConsultation] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatSubmitting, setChatSubmitting] = useState(false);
    const chatEndRef = useRef(null);

    // Live polling for chat modal when open: every 2.0s
    useEffect(() => {
        if (!chatConsultation?.id) return;
        if (chatConsultation.status === 'CANCELLED') return;

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`/instructor/consultations/${chatConsultation.id}/messages`);
                const data = res.data;
                if (data?.messages) {
                    setChatMessages((prev) => {
                        const serverMsgs = data.messages || [];
                        const pendingTemps = prev.filter((m) => {
                            if (!String(m.id).startsWith('temp_')) return false;
                            const alreadyPersisted = serverMsgs.some(
                                (sm) => sm.sender_role === m.sender_role && sm.message === m.message
                            );
                            return !alreadyPersisted;
                        });

                        const prevServerMsgs = prev.filter((m) => !String(m.id).startsWith('temp_'));
                        const prevLastServer = prevServerMsgs[prevServerMsgs.length - 1];
                        const newLastServer = serverMsgs[serverMsgs.length - 1];

                        const hasNewServerMessages =
                            prevServerMsgs.length !== serverMsgs.length ||
                            prevLastServer?.id !== newLastServer?.id;
                        const pendingCountChanged =
                            pendingTemps.length !== prev.filter((m) => String(m.id).startsWith('temp_')).length;

                        if (hasNewServerMessages || pendingCountChanged) {
                            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
                            return [...serverMsgs, ...pendingTemps];
                        }
                        return prev;
                    });
                }
                if (data?.consultation && data.consultation.status !== chatConsultation.status) {
                    setChatConsultation((prev) => ({
                        ...prev,
                        ...data.consultation,
                    }));
                }
            } catch (err) {}
        }, 2000);

        return () => clearInterval(interval);
    }, [chatConsultation?.id, chatConsultation?.status]);

    const openChatModal = async (cons) => {
        setChatConsultation(cons);
        setChatLoading(true);
        try {
            const res = await axios.get(`/instructor/consultations/${cons.id}/messages`);
            const data = res.data;
            setChatMessages(data.messages || []);
            if (data.consultation) {
                setChatConsultation((prev) => ({
                    ...prev,
                    ...data.consultation,
                }));
            }
        } catch (err) {
            console.error('Failed to load chat:', err);
        } finally {
            setChatLoading(false);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    };

    const handleSendInstructorMessage = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!chatInput.trim() || chatSubmitting || !chatConsultation || chatConsultation.status === 'CANCELLED') return;

        const text = chatInput.trim();
        setChatInput('');
        setChatSubmitting(true);

        const tempId = 'temp_' + Date.now();
        const tempMsg = {
            id: tempId,
            sender_id: authUser?.id || 0,
            sender_role: 'INSTRUCTOR',
            message: text,
            created_at: new Date().toISOString(),
            sender: { name: authUser?.name || 'Dokter/Instruktur' },
        };
        setChatMessages((prev) => [...prev, tempMsg]);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

        try {
            const res = await axios.post(`/instructor/consultations/${chatConsultation.id}/messages`, {
                message: text,
            });
            if (res.data?.message) {
                const confirmedMsg = res.data.message;
                setChatMessages((prev) => {
                    const hasTemp = prev.some((m) => m.id === tempId);
                    if (hasTemp) {
                        return prev.map((m) => (m.id === tempId ? confirmedMsg : m));
                    }
                    const alreadyHas = prev.some((m) => m.id === confirmedMsg.id);
                    if (!alreadyHas) {
                        return [...prev, confirmedMsg];
                    }
                    return prev;
                });
            }
        } catch (err) {
            console.error('Send error:', err);
            // Remove failed optimistic message
            setChatMessages((prev) => prev.filter((m) => m.id !== tempId));
            // Restore input text so instructor doesn't lose their message
            setChatInput(text);
            const errMsg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                'Gagal mengirim pesan. Silakan coba beberapa saat lagi.';
            alert('Gagal mengirim pesan: ' + errMsg);
        } finally {
            setChatSubmitting(false);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    };

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

    // Cancel Consultation Form
    const cancelForm = useForm({
        reason: 'Penyesuaian jadwal tindakan klinis instruktur.',
    });

    const openCompleteModal = (cons) => {
        setSelectedConsultation(cons);
        completeForm.setData('notes', cons.notes || '');
    };

    const openCancelModal = (cons) => {
        setCancelConsultation(cons);
        cancelForm.setData('reason', 'Penyesuaian jadwal tindakan klinis instruktur.');
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
                if (chatConsultation?.id === selectedConsultation.id) {
                    setChatConsultation((prev) => ({ ...prev, status: 'COMPLETED' }));
                }
            },
        });
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        cancelForm.post(`/instructor/consultations/${cancelConsultation.id}/cancel`, {
            preserveScroll: true,
            onSuccess: () => {
                const cancelledId = cancelConsultation.id;
                const reasonUsed = cancelForm.data.reason;
                setCancelConsultation(null);
                cancelForm.reset();
                if (chatConsultation?.id === cancelledId) {
                    setChatConsultation((prev) => ({
                        ...prev,
                        status: 'CANCELLED',
                        cancellation_reason: reasonUsed,
                    }));
                }
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
                    {cons.cancellation_reason && cons.status === 'CANCELLED' ? (
                        <div className="text-rose-600 dark:text-rose-400 text-[11px] font-medium mt-0.5 line-clamp-2">
                            Alasan Batal: {cons.cancellation_reason}
                        </div>
                    ) : cons.notes ? (
                        <div className="text-on-surface-variant text-[11px] italic mt-0.5 line-clamp-1">
                            Catatan: {cons.notes}
                        </div>
                    ) : null}
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
                            : ''}{' '}
                        WIB
                    </div>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status Sesi',
            render: (cons) => {
                const isCompleted = cons.status === 'COMPLETED';
                const isCancelled = cons.status === 'CANCELLED';

                return (
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold border ${
                            isCompleted
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : isCancelled
                                ? 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20'
                                : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20'
                        }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${
                                isCompleted
                                    ? 'bg-primary'
                                    : isCancelled
                                    ? 'bg-rose-500'
                                    : 'bg-emerald-500'
                            }`}
                        />
                        {isCompleted
                            ? 'Selesai'
                            : isCancelled
                            ? 'Dibatalkan'
                            : cons.status === 'CONFIRMED' || cons.status === 'SCHEDULED'
                            ? 'Terjadwal'
                            : cons.status ? cons.status.replace(/_/g, ' ') : 'Terjadwal'}
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
                const isCancelled = cons.status === 'CANCELLED';
                const isScheduled = cons.status === 'SCHEDULED' || cons.status === 'CONFIRMED';

                return (
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        <Link
                            href={`/instructor/chat?consultation_id=${cons.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 font-bold text-xs transition-all shadow-2xs cursor-pointer"
                            title="Buka percakapan telemedisin di Ruang Chat"
                        >
                            <span className="material-symbols-outlined text-[14px]">
                                forum
                            </span>
                            <span>Chat</span>
                        </Link>

                        {isScheduled && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => openCompleteModal(cons)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        check_circle
                                    </span>
                                    <span>Selesaikan</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openCancelModal(cons)}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs shadow-2xs transition-all active:scale-95 cursor-pointer"
                                    title="Batalkan konsultasi dan pulihkan kuota member"
                                >
                                    <span className="material-symbols-outlined text-[14px]">
                                        cancel
                                    </span>
                                    <span>Batalkan</span>
                                </button>
                            </>
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
                                <span>Catatan</span>
                            </button>
                        )}

                        {isCancelled && cons.cancellation_reason && (
                            <button
                                type="button"
                                onClick={() => openChatModal(cons)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant border border-surface-container text-[11px] font-medium hover:text-primary transition-all cursor-pointer"
                                title={cons.cancellation_reason}
                            >
                                <span className="material-symbols-outlined text-[13px] text-rose-500">info</span>
                                <span>Detail Batal</span>
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
    const cancelledCount = items.filter((c) => c.status === 'CANCELLED').length;

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

                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                        <Link
                            href="/instructor/chat"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">forum</span>
                            <span>Ruang Chat Pasien</span>
                        </Link>
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
                        <span className="text-[10px] text-on-surface-variant block">Riwayat sesi terdata</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Sesi Terjadwal</span>
                        <div className="text-2xl font-heading font-black text-emerald-700 dark:text-emerald-400 font-mono">
                            {scheduledCount}
                        </div>
                        <span className="text-[10px] text-emerald-600 block">Menunggu pelaksanaan</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Selesai &amp; Terekam</span>
                        <div className="text-2xl font-heading font-black text-primary font-mono">
                            {completedCount}
                        </div>
                        <span className="text-[10px] text-on-surface-variant block">Catatan klinis tersimpan</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <span className="text-xs text-on-surface-variant font-medium">Sesi Dibatalkan</span>
                        <div className="text-2xl font-heading font-black text-rose-600 dark:text-rose-400 font-mono">
                            {cancelledCount}
                        </div>
                        <span className="text-[10px] text-rose-500 block">Kuota dipulihkan ke member</span>
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
                                    Ringkasan Sesi &amp; Arahan Bimbingan
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

            {/* MODAL: Batalkan Sesi Konsultasi */}
            {cancelConsultation && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setCancelConsultation(null)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-rose-600 dark:text-rose-400 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[22px]">warning</span>
                                    <span>Batalkan Jadwal Tele-Konsultasi</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Member: {cancelConsultation.member?.name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCancelConsultation(null)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Quota Restored Info Alert */}
                        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">restore</span>
                            <div className="space-y-0.5">
                                <span className="font-bold block">Pemulihan Kuota Otomatis</span>
                                <p className="text-[11px] leading-relaxed">
                                    Sistem akan otomatis mengembalikan 1 kuota sesi konsultasi kepada member binaan dan mengirimkan notifikasi resmi ke akun mereka.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleCancelSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">
                                    Alasan Pembatalan Jadwal:
                                </label>
                                <textarea
                                    rows="3"
                                    value={cancelForm.data.reason}
                                    onChange={(e) => cancelForm.setData('reason', e.target.value)}
                                    placeholder="Contoh: Jadwal bertabrakan dengan tindakan klinis emergensi, atau permintaan penjadwalan ulang..."
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs text-on-surface font-medium leading-relaxed"
                                    required
                                />

                                {/* Quick reason chips */}
                                <div className="mt-2 space-y-1">
                                    <span className="text-[10px] text-on-surface-variant font-medium">Pilih alasan cepat:</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {[
                                            'Penyesuaian jadwal tindakan klinis instruktur.',
                                            'Pasien meminta jadwal diundur ke hari lain.',
                                            'Kondisi darurat medis tidak dapat ditinggalkan.',
                                            'Kendala jaringan telekomunikasi / teknis.',
                                        ].map((preset) => (
                                            <button
                                                key={preset}
                                                type="button"
                                                onClick={() => cancelForm.setData('reason', preset)}
                                                className="px-2 py-1 rounded-lg text-[10px] font-medium bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface transition-all text-left"
                                            >
                                                {preset}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setCancelConsultation(null)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={cancelForm.processing}
                                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {cancelForm.processing ? 'Membatalkan...' : 'Konfirmasi Batalkan Sesi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: Ruang Chat Telemedisin Instruktur */}
            {chatConsultation && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
                    onClick={() => setChatConsultation(null)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-2xl w-full flex flex-col h-[640px] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Chat Modal Header */}
                        <div className="p-4 border-b border-surface-container flex items-center justify-between gap-3 bg-surface-container-lowest">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-base shrink-0 border border-primary/20">
                                    {chatConsultation.member?.name?.charAt(0) || 'M'}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-sm text-on-surface truncate">
                                            {chatConsultation.member?.name || 'Member Binaan'}
                                        </h3>
                                        <span
                                            className={`text-[10px] px-2 py-0.2 rounded-full font-bold border ${
                                                chatConsultation.status === 'COMPLETED'
                                                    ? 'bg-primary/10 text-primary border-primary/20'
                                                    : chatConsultation.status === 'CANCELLED'
                                                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                            }`}
                                        >
                                            {chatConsultation.status === 'COMPLETED'
                                                ? 'Selesai'
                                                : chatConsultation.status === 'CANCELLED'
                                                ? 'Dibatalkan'
                                                : 'Sesi Bimbingan'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant truncate">
                                        Topik: {chatConsultation.purpose}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {(chatConsultation.status === 'SCHEDULED' || chatConsultation.status === 'CONFIRMED') && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => openCompleteModal(chatConsultation)}
                                            className="px-2.5 py-1.5 rounded-xl bg-primary text-white text-[11px] font-bold hover:bg-primary-container transition-all"
                                        >
                                            Selesaikan
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openCancelModal(chatConsultation)}
                                            className="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold hover:bg-rose-100 transition-all"
                                        >
                                            Batalkan
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setChatConsultation(null)}
                                    className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Notice Banner if Cancelled */}
                        {chatConsultation.status === 'CANCELLED' && (
                            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border-b border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-2.5 text-xs">
                                <span className="material-symbols-outlined text-[20px] text-rose-600 shrink-0">cancel</span>
                                <div className="space-y-0.5">
                                    <span className="font-bold block">Sesi Tele-Konsultasi Ini Telah Dibatalkan</span>
                                    <p className="text-[11px] leading-relaxed">
                                        Alasan: "{chatConsultation.cancellation_reason || 'Dibatalkan oleh pihak pengguna/instruktur'}". Kuota sesi konsultasi telah dipulihkan ke member binaan.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Notice Banner if Completed */}
                        {chatConsultation.status === 'COMPLETED' && (
                            <div className="p-3 bg-primary/10 border-b border-primary/20 text-primary flex items-center gap-2 text-xs">
                                <span className="material-symbols-outlined text-[18px]">task_alt</span>
                                <span className="text-[11px] font-semibold">
                                    Sesi konsultasi ini telah selesai dan diarsipkan bersama catatan evaluasi klinis.
                                </span>
                            </div>
                        )}

                        {/* Messages Feed */}
                        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 bg-[#fbfdfc] dark:bg-surface/50 text-xs">
                            {chatLoading ? (
                                <div className="py-12 text-center text-on-surface-variant space-y-2">
                                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                    <p className="text-xs">Memuat riwayat chat...</p>
                                </div>
                            ) : chatMessages.length === 0 ? (
                                <div className="py-12 text-center text-on-surface-variant space-y-2">
                                    <span className="material-symbols-outlined text-3xl text-primary/40">chat_bubble_outline</span>
                                    <p className="text-xs">Belum ada pesan pada sesi ini.</p>
                                </div>
                            ) : (
                                chatMessages.map((m) => {
                                    const isSystem = m.sender_role === 'SYSTEM';
                                    const isInstructor = m.sender_role === 'INSTRUCTOR';
                                    const hasMetric = m.metric_payload && typeof m.metric_payload === 'object';

                                    if (isSystem) {
                                        return (
                                            <div key={m.id} className="py-2 px-3 my-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-center text-[11px] max-w-lg mx-auto leading-relaxed">
                                                <div className="flex items-center justify-center gap-1 font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                                                    <span className="material-symbols-outlined text-[15px]">info</span>
                                                    <span>Sistem AEVYRA</span>
                                                </div>
                                                <p className="whitespace-pre-wrap">{m.message}</p>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={m.id}
                                            className={`flex flex-col ${isInstructor ? 'items-end' : 'items-start'} space-y-1`}
                                        >
                                            <span className="text-[10px] text-on-surface-variant font-mono px-1">
                                                {isInstructor ? 'Anda (Instruktur)' : (chatConsultation.member?.name || 'Member')} •{' '}
                                                {m.created_at
                                                    ? new Date(m.created_at).toLocaleTimeString('id-ID', {
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                      })
                                                    : 'Sekarang'}
                                            </span>

                                            <div
                                                className={`p-3.5 sm:p-4 rounded-3xl max-w-[85%] leading-relaxed shadow-2xs space-y-2 ${
                                                    isInstructor
                                                        ? 'bg-[#00433e] text-white rounded-br-xs'
                                                        : 'bg-white dark:bg-surface-container border border-surface-container-high text-on-surface rounded-bl-xs'
                                                }`}
                                            >
                                                {hasMetric && (
                                                    <div className={`p-2.5 rounded-2xl border text-left space-y-1 ${
                                                        isInstructor
                                                            ? 'bg-white/10 border-white/20 text-white'
                                                            : 'bg-surface-container-low border-surface-container text-on-surface'
                                                    }`}>
                                                        <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                                                            <span>{m.metric_payload.title || 'Data Telemetri Pasien'}</span>
                                                            <span className="text-[9px] opacity-80">{m.metric_payload.recorded_at}</span>
                                                        </div>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-base font-mono font-black">{m.metric_payload.value}</span>
                                                            {m.metric_payload.unit && (
                                                                <span className="text-xs font-mono">{m.metric_payload.unit}</span>
                                                            )}
                                                        </div>
                                                        {m.metric_payload.status && (
                                                            <div className="text-[10px] font-bold">
                                                                Status: {m.metric_payload.status}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                <p className="text-xs whitespace-pre-wrap">{m.message}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Instructor Chat Input */}
                        <form
                            onSubmit={handleSendInstructorMessage}
                            className="p-3 border-t border-surface-container bg-white dark:bg-surface flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={chatInput}
                                disabled={chatConsultation.status === 'CANCELLED'}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder={
                                    chatConsultation.status === 'CANCELLED'
                                        ? 'Sesi tele-konsultasi telah dibatalkan. Tidak dapat mengirim pesan.'
                                        : 'Tuliskan arahan klinis atau tanggapan untuk member...'
                                }
                                className="flex-1 px-4 py-2.5 rounded-full border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <button
                                type="submit"
                                disabled={!chatInput.trim() || chatSubmitting || chatConsultation.status === 'CANCELLED'}
                                className="px-5 py-2.5 rounded-full bg-[#00433e] hover:bg-[#0c5348] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">send</span>
                                <span className="hidden sm:inline">Kirim Arahan</span>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}
