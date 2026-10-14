import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import Alert from '@/Components/UI/Alert';

const PRESET_MESSAGES = [
    'Pola glukosa Anda menunjukkan tren membaik. Pertahankan porsi karbohidrat kompleks dan perbanyak serat saat santap siang.',
    'Mohon pastikan hidrasi harian minimal 2.5 liter air putih dan batasi konsumsi minuman manis kemasan.',
    'Bisa tolong bagikan hasil rekam glukosa darah 2 jam setelah makan siang hari ini?',
    'Target aktivitas langkah kaki 7.500 langkah harian Anda telah tercapai dengan baik, pertahankan konsistensi ini!',
    'Prioritaskan tidur berkualitas minimal 7 jam malam ini untuk mendukung sensitivitas insulin dan regulasi kortisol sirkadian.',
];

const METRIC_LABELS = {
    blood_glucose: { label: 'Gula Darah Puasa', unit: 'mg/dL', icon: 'bloodtype', optimal: '< 100 mg/dL' },
    sleep_duration: { label: 'Durasi Tidur', unit: 'Jam', icon: 'bedtime', optimal: '7 - 8.5 Jam' },
    steps: { label: 'Langkah Kaki', unit: 'Langkah', icon: 'directions_walk', optimal: '≥ 7.500' },
    water_intake: { label: 'Asupan Air', unit: 'mL', icon: 'water_drop', optimal: '≥ 2.000 mL' },
    calories: { label: 'Asupan Kalori', unit: 'kkal', icon: 'restaurant', optimal: 'Sesuai BMR' },
    blood_pressure_systolic: { label: 'Tekanan Darah Sistolik', unit: 'mmHg', icon: 'favorite', optimal: '< 120 mmHg' },
};

export default function ChatHub({
    consultations = [],
    assignedMembers = [],
    initialConsultationId = null,
    memberMetrics = {},
}) {
    const { auth, flash } = usePage().props;
    const authUser = auth?.user || null;

    // Filter consultations
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, ACTIVE, COMPLETED

    // Active Consultation
    const [selectedConsultation, setSelectedConsultation] = useState(() => {
        if (initialConsultationId) {
            const found = consultations.find((c) => c.id === initialConsultationId);
            if (found) return found;
        }
        // Prefer active / scheduled first
        const active = consultations.find((c) => c.status === 'SCHEDULED' || c.status === 'CONFIRMED' || c.status === 'IN_PROGRESS');
        return active || consultations[0] || null;
    });

    // Chat state
    const [chatMessages, setChatMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatSubmitting, setChatSubmitting] = useState(false);
    const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
    const chatEndRef = useRef(null);

    // Modals
    const [showStartChatModal, setShowStartChatModal] = useState(false);
    const [selectedCompleteCons, setSelectedCompleteCons] = useState(null);
    const [selectedCancelCons, setSelectedCancelCons] = useState(null);

    // Forms
    const completeForm = useForm({
        notes: '',
    });

    const cancelForm = useForm({
        reason: 'Penyesuaian jadwal tindakan klinis instruktur.',
    });

    const newChatForm = useForm({
        member_id: assignedMembers[0]?.id || '',
        purpose: 'Sesi Bimbingan & Konsultasi Telemedisin Terarah',
        scheduled_start: new Date().toISOString().slice(0, 16),
        scheduled_end: new Date(Date.now() + 45 * 60 * 1000).toISOString().slice(0, 16),
    });

    // Local consultations list state for dynamic real-time updates
    const [consultationsList, setConsultationsList] = useState(consultations);

    // Keep consultationsList in sync if prop changes
    useEffect(() => {
        setConsultationsList(consultations);
    }, [consultations]);

    // Load messages when selected consultation changes
    useEffect(() => {
        if (selectedConsultation?.id) {
            loadMessages(selectedConsultation.id);
        } else {
            setChatMessages([]);
        }
    }, [selectedConsultation?.id]);

    // Near Real-time Polling: active chat messages every 2.0 seconds
    useEffect(() => {
        if (!selectedConsultation?.id) return;
        if (selectedConsultation.status === 'CANCELLED') return;

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/instructor/consultations/${selectedConsultation.id}/messages`);
                if (res.ok) {
                    const data = await res.json();
                    if (data?.messages) {
                        setChatMessages((prev) => {
                            const prevLast = prev[prev.length - 1];
                            const newLast = data.messages[data.messages.length - 1];
                            const hasNew = prev.length !== data.messages.length || (prevLast?.id !== newLast?.id);
                            if (hasNew) {
                                setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
                                return data.messages;
                            }
                            return prev;
                        });
                    }
                    if (data?.consultation && data.consultation.status !== selectedConsultation.status) {
                        setSelectedConsultation((prev) => ({
                            ...prev,
                            ...data.consultation,
                        }));
                    }
                }
            } catch (err) {}
        }, 2000);

        return () => clearInterval(interval);
    }, [selectedConsultation?.id, selectedConsultation?.status]);

    // Real-time sync for conversations list & unread badges every 4.0 seconds
    useEffect(() => {
        const convInterval = setInterval(async () => {
            try {
                const res = await fetch('/instructor/chat/conversations');
                if (res.ok) {
                    const data = await res.json();
                    if (data?.consultations) {
                        setConsultationsList(data.consultations);
                    }
                }
            } catch (err) {}
        }, 4000);

        return () => clearInterval(convInterval);
    }, []);

    const loadMessages = async (consultationId) => {
        setChatLoading(true);
        try {
            const res = await fetch(`/instructor/consultations/${consultationId}/messages`);
            if (res.ok) {
                const data = await res.json();
                setChatMessages(data.messages || []);
                if (data.consultation) {
                    setSelectedConsultation((prev) => ({
                        ...prev,
                        ...data.consultation,
                    }));
                }
            }
        } catch (err) {
            console.error('Failed to load consultation messages:', err);
        } finally {
            setChatLoading(false);
            setTimeout(() => {
                chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 80);
        }
    };

    const handleSendMessage = async (customText = null) => {
        const text = (typeof customText === 'string' ? customText : chatInput).trim();
        if (!text || chatSubmitting || !selectedConsultation || selectedConsultation.status === 'CANCELLED') return;

        if (!customText) setChatInput('');
        setChatSubmitting(true);

        const tempMsg = {
            id: 'temp_' + Date.now(),
            sender_id: authUser?.id || 0,
            sender_role: 'INSTRUCTOR',
            message: text,
            created_at: new Date().toISOString(),
            sender: { name: authUser?.name || 'Dokter/Instruktur' },
        };
        setChatMessages((prev) => [...prev, tempMsg]);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch(`/instructor/consultations/${selectedConsultation.id}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.message) {
                    setChatMessages((prev) =>
                        prev.map((m) => (m.id === tempMsg.id ? data.message : m))
                    );
                    setConsultationsList((prev) =>
                        prev.map((c) =>
                            c.id === selectedConsultation.id
                                ? {
                                      ...c,
                                      last_message: {
                                          text: data.message.message,
                                          created_at: new Date(data.message.created_at).toLocaleTimeString('id-ID', {
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          }),
                                          sender_role: 'INSTRUCTOR',
                                      },
                                  }
                                : c
                        )
                    );
                }
            }
        } catch (err) {
            console.error('Failed to send message:', err);
        } finally {
            setChatSubmitting(false);
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
        }
    };

    const handleCompleteSubmit = (e) => {
        e.preventDefault();
        if (!selectedCompleteCons) return;

        completeForm.patch(`/instructor/consultations/${selectedCompleteCons.id}/complete`, {
            preserveScroll: true,
            onSuccess: () => {
                const id = selectedCompleteCons.id;
                setSelectedCompleteCons(null);
                completeForm.reset();
                if (selectedConsultation?.id === id) {
                    setSelectedConsultation((prev) => ({
                        ...prev,
                        status: 'COMPLETED',
                    }));
                    loadMessages(id);
                }
            },
        });
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();
        if (!selectedCancelCons) return;

        cancelForm.post(`/instructor/consultations/${selectedCancelCons.id}/cancel`, {
            preserveScroll: true,
            onSuccess: () => {
                const id = selectedCancelCons.id;
                const reasonUsed = cancelForm.data.reason;
                setSelectedCancelCons(null);
                cancelForm.reset();
                if (selectedConsultation?.id === id) {
                    setSelectedConsultation((prev) => ({
                        ...prev,
                        status: 'CANCELLED',
                        cancellation_reason: reasonUsed,
                    }));
                    loadMessages(id);
                }
            },
        });
    };

    const handleNewChatSubmit = (e) => {
        e.preventDefault();
        newChatForm.post('/instructor/consultations', {
            preserveScroll: true,
            onSuccess: () => {
                setShowStartChatModal(false);
                newChatForm.reset();
                router.reload();
            },
        });
    };

    // Filtered consultations list
    const filteredConsultations = consultationsList.filter((c) => {
        const matchesSearch =
            (c.member_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.purpose || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.member_email || '').toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (statusFilter === 'ACTIVE') {
            return c.status === 'SCHEDULED' || c.status === 'CONFIRMED' || c.status === 'IN_PROGRESS';
        }
        if (statusFilter === 'COMPLETED') {
            return c.status === 'COMPLETED';
        }
        return true;
    });

    const activeMemberId = selectedConsultation?.member_id;
    const currentMemberMetrics = activeMemberId && memberMetrics[activeMemberId] ? memberMetrics[activeMemberId] : {};

    return (
        <InstructorLayout activeNav="chat" title="Ruang Chat Pasien & Telemedisin">
            <Head title="Ruang Chat Pasien & Telemedisin - Instruktur AEVYRA" />

            <div className="space-y-4 max-w-7xl mx-auto">
                {/* 1. Header Overview Banner */}
                <div className="rounded-3xl bg-linear-to-r from-[#003833] via-[#004e47] to-[#0a5c54] p-5 sm:p-6 text-white shadow-xs relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl"
                    />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5 max-w-2xl">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20">
                                <span className="material-symbols-outlined text-[15px]">support_agent</span>
                                <span>Human-in-the-Loop Telemedicine Room</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-serif font-normal text-white tracking-tight leading-snug">
                                Ruang Chat Tele-Konsultasi Pasien
                            </h1>
                            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                                Jalin komunikasi langsung 1-on-1 dengan member binaan Anda, evaluasi data biomarker kuantitatif secara real-time, dan berikan arahan gaya hidup presisi.
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                            <button
                                type="button"
                                onClick={() => setShowStartChatModal(true)}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                            >
                                <span className="material-symbols-outlined text-[18px]">add_comment</span>
                                <span>Mulai Chat Pasien Baru</span>
                            </button>

                            <Link
                                href="/instructor/consultations"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-semibold transition-all shadow-xs"
                            >
                                <span className="material-symbols-outlined text-[17px]">calendar_month</span>
                                <span>Lihat Tabel Jadwal</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Main Two-Pane Chat Hub Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[750px] min-h-[600px] rounded-3xl overflow-hidden border border-surface-container bg-white dark:bg-surface shadow-xs">
                    
                    {/* LEFT PANEL: Daftar Pasien / Percakapan (Cols 1 to 4) */}
                    <div className="lg:col-span-4 border-r border-surface-container flex flex-col h-full bg-[#fcfefd] dark:bg-surface">
                        {/* Search & Filter Header */}
                        <div className="p-3.5 border-b border-surface-container space-y-2.5 bg-surface-container-lowest">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                                    search
                                </span>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Cari pasien atau topik..."
                                    className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                />
                            </div>

                            {/* Filter Chips */}
                            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                                {[
                                    { key: 'ALL', label: 'Semua' },
                                    { key: 'ACTIVE', label: 'Aktif / Terjadwal' },
                                    { key: 'COMPLETED', label: 'Selesai' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setStatusFilter(tab.key)}
                                        className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                                            statusFilter === tab.key
                                                ? 'bg-primary text-white shadow-2xs'
                                                : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Conversations List */}
                        <div className="flex-1 overflow-y-auto divide-y divide-surface-container/60 p-1.5 space-y-1">
                            {filteredConsultations.length === 0 ? (
                                <div className="py-16 text-center text-on-surface-variant px-4 space-y-2">
                                    <span className="material-symbols-outlined text-3xl text-primary/40">forum</span>
                                    <p className="text-xs font-semibold text-on-surface">Tidak ada percakapan ditemukan</p>
                                    <p className="text-[11px]">
                                        {searchTerm ? 'Coba ubah kata kunci pencarian Anda.' : 'Gunakan tombol "Mulai Chat Pasien Baru" untuk membuka sesi bimbingan.'}
                                    </p>
                                </div>
                            ) : (
                                filteredConsultations.map((cons) => {
                                    const isSelected = selectedConsultation?.id === cons.id;
                                    const isCompleted = cons.status === 'COMPLETED';
                                    const isCancelled = cons.status === 'CANCELLED';

                                    return (
                                        <div
                                            key={cons.id}
                                            onClick={() => setSelectedConsultation(cons)}
                                            className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start gap-3 select-none ${
                                                isSelected
                                                    ? 'bg-primary/10 border border-primary/30 shadow-2xs'
                                                    : 'hover:bg-surface-container-low border border-transparent'
                                            }`}
                                        >
                                            {/* Avatar */}
                                            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-sm shrink-0 shadow-2xs">
                                                {cons.member_name?.charAt(0) || 'M'}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                                    <span className="font-bold text-xs text-on-surface truncate">
                                                        {cons.member_name}
                                                    </span>
                                                    <span className="text-[10px] text-on-surface-variant font-mono shrink-0">
                                                        {cons.last_message?.created_at || (cons.scheduled_start ? cons.scheduled_start.slice(11, 16) : '')}
                                                    </span>
                                                </div>

                                                <p className="text-[11px] text-primary font-medium truncate mb-1">
                                                    {cons.purpose}
                                                </p>

                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-[11px] text-on-surface-variant line-clamp-1 truncate">
                                                        {cons.last_message
                                                            ? `${cons.last_message.sender_role === 'INSTRUCTOR' ? 'Anda: ' : ''}${cons.last_message.text}`
                                                            : 'Ketuk untuk membuka ruang chat'}
                                                    </p>

                                                    {/* Status Badge */}
                                                    <span
                                                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase shrink-0 border ${
                                                            isCompleted
                                                                ? 'bg-primary/10 text-primary border-primary/20'
                                                                : isCancelled
                                                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                        }`}
                                                    >
                                                        {isCompleted ? 'Selesai' : isCancelled ? 'Batal' : 'Aktif'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Bottom Summary Pill */}
                        <div className="p-3 border-t border-surface-container bg-surface-container-lowest text-[11px] text-on-surface-variant flex items-center justify-between">
                            <span>{consultations.length} total sesi terdata</span>
                            <span className="font-bold text-primary">{assignedMembers.length} member binaan</span>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Ruang Percakapan Chat & Clinical Telemetry (Cols 5 to 12) */}
                    <div className="lg:col-span-8 flex flex-col h-full bg-white dark:bg-surface relative">
                        {selectedConsultation ? (
                            <>
                                {/* Chat Header */}
                                <div className="p-3.5 sm:p-4 border-b border-surface-container flex items-center justify-between gap-3 bg-surface-container-lowest shrink-0">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                                            {selectedConsultation.member_name?.charAt(0) || 'M'}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h2 className="font-bold text-sm text-on-surface truncate">
                                                    {selectedConsultation.member_name}
                                                </h2>
                                                <span
                                                    className={`text-[10px] px-2 py-0.2 rounded-full font-bold border ${
                                                        selectedConsultation.status === 'COMPLETED'
                                                            ? 'bg-primary/10 text-primary border-primary/20'
                                                            : selectedConsultation.status === 'CANCELLED'
                                                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                    }`}
                                                >
                                                    {selectedConsultation.status === 'COMPLETED'
                                                        ? 'Selesai'
                                                        : selectedConsultation.status === 'CANCELLED'
                                                        ? 'Dibatalkan'
                                                        : 'Sesi Aktif'}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-on-surface-variant truncate">
                                                Agenda: {selectedConsultation.purpose} • {selectedConsultation.member_email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Header Tools */}
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {/* Telemetry Drawer Toggle Button */}
                                        <button
                                            type="button"
                                            onClick={() => setShowTelemetryDrawer(!showTelemetryDrawer)}
                                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                                showTelemetryDrawer
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'bg-surface-container-low hover:bg-surface-container text-primary border-surface-container'
                                            }`}
                                            title="Tampilkan / Sembunyikan biomarker kuantitatif pasien"
                                        >
                                            <span className="material-symbols-outlined text-[17px]">vital_signs</span>
                                            <span className="hidden sm:inline">Telemetri</span>
                                        </button>

                                        {/* Video Call Meeting Room */}
                                        {selectedConsultation.meeting_url && selectedConsultation.status !== 'CANCELLED' && (
                                            <a
                                                href={selectedConsultation.meeting_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer"
                                                title="Buka Ruang Video Call Telemedisin"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">videocam</span>
                                                <span className="hidden md:inline">Video Call</span>
                                            </a>
                                        )}

                                        {/* View Member Clinical Medical Record */}
                                        <Link
                                            href={`/instructor/members/${selectedConsultation.member_id}`}
                                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container text-xs font-semibold transition-all"
                                            title="Buka Profil Lengkap & Riwayat Klinis Member"
                                        >
                                            <span className="material-symbols-outlined text-[16px] text-primary">clinical_notes</span>
                                            <span className="hidden lg:inline">Rekam Medis</span>
                                        </Link>

                                        {/* Status actions: Complete / Cancel */}
                                        {(selectedConsultation.status === 'SCHEDULED' || selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'IN_PROGRESS') && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCompleteCons(selectedConsultation);
                                                        completeForm.setData('notes', selectedConsultation.notes || '');
                                                    }}
                                                    className="px-2.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all cursor-pointer"
                                                    title="Selesaikan sesi konsultasi dan simpan catatan evaluasi"
                                                >
                                                    Selesaikan
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCancelCons(selectedConsultation);
                                                        cancelForm.setData('reason', 'Penyesuaian jadwal tindakan klinis instruktur.');
                                                    }}
                                                    className="px-2 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer"
                                                    title="Batalkan sesi konsultasi"
                                                >
                                                    Batalkan
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Cancelled Banner Notice */}
                                {selectedConsultation.status === 'CANCELLED' && (
                                    <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border-b border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-2.5 text-xs">
                                        <span className="material-symbols-outlined text-[20px] text-rose-600 shrink-0">cancel</span>
                                        <div className="space-y-0.5">
                                            <span className="font-bold block">Sesi Tele-Konsultasi Ini Telah Dibatalkan</span>
                                            <p className="text-[11px] leading-relaxed">
                                                Alasan: "{selectedConsultation.cancellation_reason || 'Dibatalkan oleh pihak pengguna/instruktur'}". Kuota sesi konsultasi telah dipulihkan ke akun member binaan.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Completed Banner Notice */}
                                {selectedConsultation.status === 'COMPLETED' && (
                                    <div className="p-3 bg-primary/10 border-b border-primary/20 text-primary flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[18px]">task_alt</span>
                                            <span className="text-[11px] font-semibold">
                                                Sesi bimbingan ini telah ditandai selesai dan catatan evaluasi telah terekam.
                                            </span>
                                        </div>
                                        {selectedConsultation.notes && (
                                            <span className="text-[10px] font-mono text-primary/80 italic max-w-xs truncate">
                                                Catatan: {selectedConsultation.notes}
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Chat Body Area with optional Telemetry Drawer overlay */}
                                <div className="flex-1 flex overflow-hidden relative">
                                    
                                    {/* Messages Feed */}
                                    <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-[#fbfdfc] dark:bg-surface/50 text-xs">
                                        {chatLoading ? (
                                            <div className="py-20 text-center text-on-surface-variant space-y-2">
                                                <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                                <p className="text-xs">Memuat percakapan telemedisin...</p>
                                            </div>
                                        ) : chatMessages.length === 0 ? (
                                            <div className="py-20 text-center text-on-surface-variant space-y-2">
                                                <span className="material-symbols-outlined text-4xl text-primary/40">chat_bubble_outline</span>
                                                <p className="text-xs font-semibold text-on-surface">Belum ada pesan pada sesi ini</p>
                                                <p className="text-[11px]">Kirimkan pesan sapaan klinis atau evaluasi awal menggunakan formulir di bawah.</p>
                                            </div>
                                        ) : (
                                            chatMessages.map((m) => {
                                                const isSystem = m.sender_role === 'SYSTEM';
                                                const isInstructor = m.sender_role === 'INSTRUCTOR';
                                                const hasMetric = m.metric_payload && typeof m.metric_payload === 'object';

                                                if (isSystem) {
                                                    return (
                                                        <div
                                                            key={m.id}
                                                            className="py-2.5 px-4 my-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-center text-[11px] max-w-lg mx-auto leading-relaxed shadow-2xs"
                                                        >
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
                                                            {isInstructor ? 'Anda (Instruktur)' : (selectedConsultation.member_name || 'Member')} •{' '}
                                                            {m.created_at
                                                                ? new Date(m.created_at).toLocaleTimeString('id-ID', {
                                                                      hour: '2-digit',
                                                                      minute: '2-digit',
                                                                  })
                                                                : 'Sekarang'}
                                                        </span>

                                                        <div
                                                            className={`p-3.5 sm:p-4 rounded-3xl max-w-[85%] leading-relaxed shadow-2xs space-y-2.5 ${
                                                                isInstructor
                                                                    ? 'bg-[#00433e] text-white rounded-br-xs'
                                                                    : 'bg-white dark:bg-surface-container border border-surface-container-high text-on-surface rounded-bl-xs'
                                                            }`}
                                                        >
                                                            {/* Render Metric Card if Shared by Patient */}
                                                            {hasMetric && (
                                                                <div
                                                                    className={`p-3 rounded-2xl border text-left space-y-1.5 ${
                                                                        isInstructor
                                                                            ? 'bg-white/10 border-white/20 text-white'
                                                                            : 'bg-surface-container-low border-surface-container text-on-surface'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                                                                        <span className="flex items-center gap-1.5">
                                                                            <span className="material-symbols-outlined text-[15px] text-emerald-400">
                                                                                analytics
                                                                            </span>
                                                                            <span>{m.metric_payload.title || 'Data Telemetri Pasien'}</span>
                                                                        </span>
                                                                        <span className="text-[9px] opacity-80">{m.metric_payload.recorded_at}</span>
                                                                    </div>
                                                                    <div className="flex items-baseline gap-1.5">
                                                                        <span className="text-xl font-mono font-black">{m.metric_payload.value}</span>
                                                                        {m.metric_payload.unit && (
                                                                            <span className="text-xs font-mono">{m.metric_payload.unit}</span>
                                                                        )}
                                                                    </div>
                                                                    {m.metric_payload.status && (
                                                                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/10 text-[10px] font-bold">
                                                                            <span>Status:</span>
                                                                            <span>{m.metric_payload.status}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}

                                                            <p className="text-xs sm:text-[13px] whitespace-pre-wrap">{m.message}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>

                                    {/* Collapsible Patient Telemetry Drawer */}
                                    {showTelemetryDrawer && (
                                        <div className="w-72 sm:w-80 border-l border-surface-container bg-surface-container-lowest p-4 overflow-y-auto space-y-4 shrink-0 transition-all">
                                            <div className="flex items-center justify-between border-b border-surface-container pb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-primary text-[18px]">vital_signs</span>
                                                    <span className="font-heading font-black text-xs text-on-surface">
                                                        Telemetri Klinis Terukur
                                                    </span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowTelemetryDrawer(false)}
                                                    className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                                </button>
                                            </div>

                                            {/* Patient Biomarkers */}
                                            <div className="space-y-2.5">
                                                {Object.entries(METRIC_LABELS).map(([key, config]) => {
                                                    const valObj = currentMemberMetrics[key];
                                                    return (
                                                        <div
                                                            key={key}
                                                            className="p-3 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1 shadow-2xs"
                                                        >
                                                            <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
                                                                <span className="flex items-center gap-1 font-bold">
                                                                    <span className="material-symbols-outlined text-[14px] text-primary">
                                                                        {config.icon}
                                                                    </span>
                                                                    <span>{config.label}</span>
                                                                </span>
                                                                <span>{valObj?.recorded_at || 'Terbaru'}</span>
                                                            </div>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-base font-mono font-black text-primary">
                                                                    {valObj ? valObj.value : '-'}
                                                                </span>
                                                                <span className="text-[10px] font-mono text-on-surface-variant">
                                                                    {config.unit}
                                                                </span>
                                                            </div>
                                                            <span className="text-[9px] text-on-surface-variant block">
                                                                Target optimal: {config.optimal}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Link to Full Profile */}
                                            <Link
                                                href={`/instructor/members/${selectedConsultation.member_id}`}
                                                className="w-full py-2.5 px-3 rounded-xl bg-primary text-white hover:bg-primary-container text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all text-center block"
                                            >
                                                <span>Tinjau Profil Penuh &amp; HBE</span>
                                                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Recommendation Chips */}
                                {selectedConsultation.status !== 'CANCELLED' && (
                                    <div className="px-3.5 py-2 border-t border-surface-container bg-[#fcfefd] dark:bg-surface overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                                        <span className="text-[10px] font-bold text-on-surface-variant uppercase shrink-0">
                                            Saran Cepat:
                                        </span>
                                        {PRESET_MESSAGES.map((preset, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setChatInput(preset)}
                                                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container shrink-0 transition-all text-left max-w-xs truncate cursor-pointer"
                                                title={preset}
                                            >
                                                {preset}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Chat Composer Input */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                    className="p-3 border-t border-surface-container bg-white dark:bg-surface flex items-center gap-2 shrink-0"
                                >
                                    <input
                                        type="text"
                                        value={chatInput}
                                        disabled={selectedConsultation.status === 'CANCELLED'}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder={
                                            selectedConsultation.status === 'CANCELLED'
                                                ? 'Sesi tele-konsultasi telah dibatalkan. Tidak dapat mengirim pesan baru.'
                                                : 'Ketik arahan klinis, evaluasi nutrisi, atau respon untuk member...'
                                        }
                                        className="flex-1 px-4 py-2.5 rounded-full border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!chatInput.trim() || chatSubmitting || selectedConsultation.status === 'CANCELLED'}
                                        className="px-5 py-2.5 rounded-full bg-[#00433e] hover:bg-[#0c5348] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">send</span>
                                        <span className="hidden sm:inline">Kirim Arahan</span>
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Empty State when no conversation is selected */
                            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                                <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-3xl shadow-xs">
                                    <span className="material-symbols-outlined text-4xl">support_agent</span>
                                </div>
                                <div className="max-w-md space-y-1.5">
                                    <h3 className="font-heading font-black text-lg text-on-surface">
                                        Pilih Sesi Konsultasi Pasien
                                    </h3>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        Pilih salah satu percakapan member dari panel sebelah kiri atau mulai sesi tele-konsultasi baru untuk memberikan bimbingan klinis preventif.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowStartChatModal(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add_comment</span>
                                    <span>Mulai Sesi Chat Pasien Baru</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL: Mulai Sesi Chat Pasien Baru */}
            {showStartChatModal && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowStartChatModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary">
                                    Mulai Sesi Chat Pasien Baru
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Pilih member binaan dan tentukan agenda tele-konsultasi
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowStartChatModal(false)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleNewChatSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">Pilih Member Binaan</label>
                                <select
                                    value={newChatForm.data.member_id}
                                    onChange={(e) => newChatForm.setData('member_id', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                >
                                    <option value="">-- Pilih Member Binaan --</option>
                                    {assignedMembers.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.name} ({m.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="font-bold text-on-surface block mb-1">Topik / Agenda Bimbingan</label>
                                <input
                                    type="text"
                                    value={newChatForm.data.purpose}
                                    onChange={(e) => newChatForm.setData('purpose', e.target.value)}
                                    placeholder="Contoh: Evaluasi Pola Makan Mingguan & Target Glukosa"
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Waktu Mulai</label>
                                    <input
                                        type="datetime-local"
                                        value={newChatForm.data.scheduled_start}
                                        onChange={(e) => newChatForm.setData('scheduled_start', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-bold text-on-surface block mb-1">Waktu Selesai</label>
                                    <input
                                        type="datetime-local"
                                        value={newChatForm.data.scheduled_end}
                                        onChange={(e) => newChatForm.setData('scheduled_end', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setShowStartChatModal(false)}
                                    className="px-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-semibold hover:bg-surface-container-high transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={newChatForm.processing}
                                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-container shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
                                >
                                    {newChatForm.processing ? 'Membuka Sesi...' : 'Mulai Sesi Chat & Telemedisin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: Selesaikan Konsultasi (SOAP Evaluation) */}
            {selectedCompleteCons && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setSelectedCompleteCons(null)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl max-w-lg w-full p-6 space-y-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div>
                                <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[22px]">check_circle</span>
                                    <span>Tandai Selesai &amp; Rekam SOAP</span>
                                </h3>
                                <p className="text-xs text-on-surface-variant">
                                    Member: {selectedCompleteCons.member_name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCompleteCons(null)}
                                className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCompleteSubmit} className="space-y-4 text-xs">
                            <div>
                                <label className="font-bold text-on-surface block mb-1">
                                    Ringkasan Evaluasi Klinis &amp; Arahan Lanjutan
                                </label>
                                <p className="text-[11px] text-on-surface-variant mb-2">
                                    Tuliskan evaluasi subjektif pasien, observasi biomarker objektif, analisis asesmen gizi, dan rekomendasi tindak lanjut.
                                </p>
                                <textarea
                                    rows="5"
                                    value={completeForm.data.notes}
                                    onChange={(e) => completeForm.setData('notes', e.target.value)}
                                    placeholder="Tuliskan kesimpulan evaluasi nutrisi, saran aktivitas fisik, atau komitmen kebiasaan baru yang disepakati..."
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs text-on-surface font-medium leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCompleteCons(null)}
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
            {selectedCancelCons && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setSelectedCancelCons(null)}
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
                                    Member: {selectedCancelCons.member_name}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCancelCons(null)}
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
                                    Alasan Pembatalan:
                                </label>
                                <textarea
                                    rows="3"
                                    value={cancelForm.data.reason}
                                    onChange={(e) => cancelForm.setData('reason', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-rose-500 text-xs text-on-surface font-medium leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setSelectedCancelCons(null)}
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
        </InstructorLayout>
    );
}
