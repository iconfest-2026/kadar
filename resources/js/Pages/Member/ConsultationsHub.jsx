import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function ConsultationsHub({ instructors = [], consultations = [], membership = {}, defaultSlots = [] }) {
    const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'ai_chat', 'my_consultations'
    
    // Booking Form State
    const [selectedDoctor, setSelectedDoctor] = useState(instructors[0] || null);
    const [bookingDate, setBookingDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [selectedSlot, setSelectedSlot] = useState(defaultSlots[0] || '10:00');
    const [availableSlots, setAvailableSlots] = useState(defaultSlots.length > 0 ? defaultSlots : ['09:00', '10:30', '14:00', '16:00']);
    const [fetchingSlots, setFetchingSlots] = useState(false);
    const [complaint, setComplaint] = useState('');
    const [healthContext, setHealthContext] = useState('');
    const [bookingSubmitting, setBookingSubmitting] = useState(false);

    // AI Chat State
    const [messages, setMessages] = useState([]);
    const [aiInput, setAiInput] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const chatEndRef = useRef(null);

    // Load AI History
    useEffect(() => {
        if (activeTab === 'ai_chat' && messages.length === 0) {
            loadAiHistory();
        }
    }, [activeTab]);

    const loadAiHistory = async () => {
        try {
            const res = await fetch('/member/ai-chat/history');
            const data = await res.json();
            if (data.messages && data.messages.length > 0) {
                setMessages(data.messages);
                setConversationId(data.conversation_id);
            } else {
                setMessages([
                    {
                        id: 'init_welcome',
                        role: 'ASSISTANT',
                        content: 'Saya Asisten AI Preventif AEVYRA berbasis pedoman gizi PERKENI dan Kemenkes RI. Silakan ajukan pertanyaan seputar pola makan sehat, pemahaman label gizi pangan, atau pengelolaan risiko pra-diabetes.',
                    }
                ]);
            }
        } catch (err) {
            console.error('Failed to load AI history:', err);
        }
    };

    const handleSendAiMessage = async (e) => {
        e.preventDefault();
        if (!aiInput.trim() || aiLoading) return;

        const userMsg = {
            id: 'temp_' + Date.now(),
            role: 'USER',
            content: aiInput.trim(),
        };

        setMessages(prev => [...prev, userMsg]);
        setAiInput('');
        setAiLoading(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch('/member/ai-chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message: userMsg.content,
                    conversation_id: conversationId,
                }),
            });

            const data = await res.json();
            if (data.reply) {
                setMessages(prev => [...prev, {
                    id: 'ai_' + Date.now(),
                    role: 'ASSISTANT',
                    content: data.reply,
                    provider_used: data.provider_used,
                    is_safety_triggered: data.is_safety_triggered,
                }]);
                if (data.conversation_id) {
                    setConversationId(data.conversation_id);
                }
            }
        } catch (err) {
            console.error('AI chat error:', err);
            setMessages(prev => [...prev, {
                id: 'err_' + Date.now(),
                role: 'ASSISTANT',
                content: 'Mohon maaf, sistem sedang mengalami kendala jaringan sesaat. Silakan coba kembali dalam beberapa detik.',
                provider_used: 'fallback',
            }]);
        } finally {
            setAiLoading(false);
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Slot fetching on doctor or date change
    useEffect(() => {
        if (selectedDoctor && bookingDate) {
            fetchSlots(selectedDoctor.id, bookingDate);
        }
    }, [selectedDoctor, bookingDate]);

    const fetchSlots = async (doctorId, date) => {
        setFetchingSlots(true);
        try {
            const res = await fetch(`/member/booking/slots/${doctorId}?date=${date}`);
            const data = await res.json();
            if (data.slots && data.slots.length > 0) {
                setAvailableSlots(data.slots);
                setSelectedSlot(data.slots[0]);
            } else {
                setAvailableSlots(['09:00', '10:30', '14:00', '16:00']);
                setSelectedSlot('09:00');
            }
        } catch (err) {
            console.error('Fetch slots error:', err);
            setAvailableSlots(['09:00', '10:30', '14:00', '16:00']);
            setSelectedSlot('09:00');
        } finally {
            setFetchingSlots(false);
        }
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        if (!selectedDoctor || !complaint.trim() || !bookingDate || !selectedSlot) return;

        setBookingSubmitting(true);
        router.post('/member/booking/store', {
            instructor_id: selectedDoctor.id,
            scheduled_date: bookingDate,
            scheduled_time: selectedSlot,
            purpose: complaint,
            health_context: healthContext,
        }, {
            onSuccess: () => {
                setComplaint('');
                setHealthContext('');
                setActiveTab('my_consultations');
            },
            onFinish: () => setBookingSubmitting(false),
        });
    };

    const handleCancelBooking = (consultationId) => {
        if (!confirm('Apakah Anda yakin ingin membatalkan jadwal tele-konsultasi ini?')) return;
        router.post(`/member/booking/${consultationId}/cancel`, {}, {
            preserveScroll: true,
        });
    };

    const remainingQuota = (membership?.quota?.total || 0) - (membership?.quota?.used || 0);

    return (
        <AppLayout title="Pusat Konsultasi Terjadwal & AI" activeTab="consultations">
            <Head title="Pusat Konsultasi Medis & AI Assistant - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                
                {/* Header Banner */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-8 text-white overflow-hidden shadow-xs">
                    <div className="absolute -right-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-[15px] text-emerald-300">support_agent</span>
                            <span>PUSAT TELEMEDISIN • DOKTER SPESIALIS IDI & AI PREVENTIF</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight leading-tight">
                            Akses Cepat ke Tenaga Ahli Medis & Asisten Preventif
                        </h1>
                        <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                            Jawab pertanyaan seputar label gizi seketika bersama AI non-diagnostik, atau jadwalkan sesi tele-konsultasi 1-on-1 mendalam bersama dokter spesialis gizi klinis tanpa perlu antre di faskes.
                        </p>

                        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
                            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/10">
                                <span>Tingkatan Member:</span>
                                <span className="font-bold text-amber-300">{membership.tier || 'Gold'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/10">
                                <span>Kuota Sesi Tersisa:</span>
                                <span className="font-bold text-emerald-300 font-mono">
                                    {remainingQuota} / {membership.quota?.total || 3} Sesi
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hub Navigation Tabs */}
                <div className="flex border-b border-surface-container gap-2 overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('booking')}
                        className={`py-3 px-5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'booking'
                                ? 'border-primary text-primary font-bold'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                        <span>Booking Jadwal Dokter</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('my_consultations')}
                        className={`py-3 px-5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'my_consultations'
                                ? 'border-primary text-primary font-bold'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">video_camera_front</span>
                        <span>Jadwal Saya ({consultations.filter(c => c.is_upcoming).length})</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('ai_chat')}
                        className={`py-3 px-5 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                            activeTab === 'ai_chat'
                                ? 'border-primary text-primary font-bold'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                        <span>Konsultasi AI Preventif (24/7)</span>
                    </button>
                </div>

                {/* TAB 1: BOOKING DOKTER TERJADWAL */}
                {activeTab === 'booking' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Doctor Selector List */}
                        <div className="space-y-4">
                            <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-primary text-[18px]">medical_services</span>
                                <span>1. Pilih Dokter / Spesialis:</span>
                            </h3>

                            <div className="space-y-3">
                                {instructors.map((doc) => {
                                    const isSelected = selectedDoctor?.id === doc.id;
                                    return (
                                        <div
                                            key={doc.id}
                                            onClick={() => setSelectedDoctor(doc)}
                                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                                                isSelected
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                                                    : 'border-surface-container bg-white dark:bg-surface hover:border-primary/40'
                                            }`}
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-surface-container border border-surface-container flex items-center justify-center overflow-hidden shrink-0">
                                                <img
                                                    src={doc.avatar || "/image/doctor-portrait.jpg"}
                                                    alt={doc.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="space-y-1 flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h4 className="font-bold text-xs sm:text-sm text-on-surface truncate">
                                                        {doc.title || doc.name}
                                                    </h4>
                                                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 font-mono shrink-0">
                                                        <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                                                        <span>{doc.rating || '4.9'}</span>
                                                    </div>
                                                </div>
                                                <p className="text-[11px] text-primary font-semibold truncate">{doc.specialty || 'Spesialis Gizi Klinis'}</p>
                                                <p className="text-[10px] text-on-surface-variant truncate">{doc.hospital || 'RS Hermina / Mitra AEVYRA'}</p>
                                                <div className="pt-1 flex items-center gap-2 text-[10px] text-on-surface-variant">
                                                    <span className="bg-surface-container px-1.5 py-0.5 rounded font-mono">
                                                        STR: {doc.str_number || '31.1.1.100.2.21.12345'}
                                                    </span>
                                                    <span>• {doc.experience || '8+ Th Pengalaman'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Booking Form (2 cols) */}
                        <div className="lg:col-span-2 space-y-5 p-6 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs">
                            <h3 className="font-heading font-bold text-base text-on-surface flex items-center gap-2 border-b border-surface-container pb-3">
                                <span className="material-symbols-outlined text-primary">event_available</span>
                                <span>Konfirmasi Jadwal Bersama {selectedDoctor?.title || selectedDoctor?.name || 'Dokter'}</span>
                            </h3>

                            <form onSubmit={handleConfirmBooking} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Date Picker */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-on-surface block">
                                            Pilih Tanggal Sesi:
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>

                                    {/* Slot Picker */}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-on-surface block">
                                            Pilih Waktu (WIB):
                                        </label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-2 px-3 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
                                                        selectedSlot === slot
                                                            ? 'bg-primary text-white border-primary shadow-2xs'
                                                            : 'bg-surface-container-low text-on-surface border-surface-container hover:border-primary/40'
                                                    }`}
                                                >
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Purpose / Complaint */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">
                                        Keluhan Utama & Tujuan Konsultasi:
                                    </label>
                                    <textarea
                                        value={complaint}
                                        onChange={(e) => setComplaint(e.target.value)}
                                        rows={3}
                                        placeholder="Contoh: Ingin menyusun pola makan ramah gula darah karena hasil cek glukosa puasa 114 mg/dL dan sering lemas di sore hari..."
                                        className="w-full p-3 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>

                                {/* Health Context */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface block">
                                        Riwayat Obat / Alergi / Catatan Medis (Opsional):
                                    </label>
                                    <input
                                        type="text"
                                        value={healthContext}
                                        onChange={(e) => setHealthContext(e.target.value)}
                                        placeholder="Contoh: Alergi seafood, sedang minum suplemen vitamin D3 1000 IU..."
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                {/* Summary Box */}
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 text-xs">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <span className="text-on-surface-variant">Durasi Sesi Tele-Medis:</span>
                                        <span className="font-bold text-on-surface">45 Menit (Video Call Terenkripsi)</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <span className="text-on-surface-variant">Biaya Konsultasi:</span>
                                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Termasuk dalam Kuota Member {membership.tier || 'Gold'} (Rp 0)</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={bookingSubmitting}
                                    className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                    <span>{bookingSubmitting ? 'Memproses Reservasi...' : 'Konfirmasi Booking Tele-Konsultasi (+10 Poin)'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TAB 2: JADWAL SAYA & ROOM VIDEO */}
                {activeTab === 'my_consultations' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Daftar Jadwal Konsultasi Anda
                            </h3>
                            <button
                                type="button"
                                onClick={() => setActiveTab('booking')}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                <span>Pesan Sesi Baru</span>
                            </button>
                        </div>

                        {consultations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {consultations.map((c) => (
                                    <div
                                        key={c.id}
                                        className={`p-5 rounded-3xl border transition-all space-y-4 bg-white dark:bg-surface shadow-xs ${
                                            c.is_upcoming
                                                ? 'border-primary/40 ring-1 ring-primary/20'
                                                : 'border-surface-container opacity-85'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="space-y-1">
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                                    c.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300' :
                                                    c.status === 'COMPLETED' ? 'bg-indigo-500/10 text-indigo-800 dark:text-indigo-300' :
                                                    c.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-800 dark:text-rose-300' : 'bg-amber-500/10 text-amber-800'
                                                }`}>
                                                    {c.status === 'CONFIRMED'
                                                        ? 'Terkonfirmasi'
                                                        : c.status === 'COMPLETED'
                                                        ? 'Telah Selesai'
                                                        : c.status === 'CANCELLED'
                                                        ? 'Dibatalkan'
                                                        : (c.status ? c.status.replace(/_/g, ' ') : 'Menunggu Jadwal')}
                                                </span>
                                                <h4 className="font-bold text-sm text-on-surface">
                                                    {c.instructor_name || 'Dokter Spesialis'}
                                                </h4>
                                                <p className="text-xs text-primary font-mono font-semibold">
                                                    {c.scheduled_start || c.scheduled_date} WIB
                                                </p>
                                            </div>

                                            {c.is_upcoming && (
                                                <a
                                                    href={c.meeting_url || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-2xs active:scale-95 transition-all cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                                                    <span>Masuk Ruang Sesi</span>
                                                </a>
                                            )}
                                        </div>

                                        <p className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-2xl">
                                            <strong className="text-on-surface block mb-0.5">Topik Konsultasi:</strong>
                                            {c.purpose || '-'}
                                        </p>

                                        {c.notes && (
                                            <p className="text-[11px] text-on-surface-variant italic">
                                                Catatan Dokter: {c.notes}
                                            </p>
                                        )}

                                        {c.is_upcoming && (
                                            <div className="flex justify-end pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancelBooking(c.id)}
                                                    className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                                                >
                                                    Batalkan Jadwal
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center rounded-3xl border border-dashed border-surface-container bg-surface-container-low space-y-3">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">event_busy</span>
                                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                    Anda belum memiliki jadwal tele-konsultasi. Pilih dokter dan reservasi waktu untuk bimbingan gizi personal.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('booking')}
                                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                                >
                                    Booking Konsultasi Sekarang
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: AI CHAT (24/7 PREVENTIVE HEALTH ASSISTANT) */}
                {activeTab === 'ai_chat' && (
                    <div className="rounded-3xl border border-surface-container bg-white dark:bg-surface shadow-xs overflow-hidden flex flex-col h-150">
                        
                        {/* Chat Top Banner */}
                        <div className="p-4 bg-surface-container-low border-b border-surface-container flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-heading font-bold text-sm text-on-surface truncate">
                                            AEVYRA Preventive AI Companion
                                        </h4>
                                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                            Multi-Tier Failover
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant truncate">
                                        Gemini 3.6 Flash &bull; Groq &bull; Cloudflare &bull; Rule Engine
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-semibold bg-surface-container text-on-surface-variant border border-surface-container-high">
                                    <span className="material-symbols-outlined text-[13px] text-emerald-600">shield</span>
                                    Guardrails & Rate Limiter Aktif
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('booking')}
                                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[14px]">call</span>
                                    <span>Konsultasi Dokter</span>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-surface-container-lowest">
                            {messages.map((m) => {
                                const isUser = m.role === 'USER';
                                return (
                                    <div
                                        key={m.id}
                                        className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {!isUser && (
                                            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 mt-1">
                                                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                                            </div>
                                        )}
                                        <div className="space-y-1 max-w-lg">
                                            <div
                                                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs ${
                                                    isUser
                                                        ? 'bg-primary text-white rounded-br-xs'
                                                        : 'bg-surface-container-low text-on-surface border border-surface-container rounded-bl-xs'
                                                }`}
                                            >
                                                {typeof m.content === 'string' ? m.content.replace(/\*/g, '') : m.content}
                                            </div>
                                            {!isUser && m.provider_used && (
                                                <div className="flex items-center gap-1.5 px-1 text-[10px] text-on-surface-variant font-mono">
                                                    <span className="material-symbols-outlined text-[12px] text-emerald-600">bolt</span>
                                                    <span>
                                                        Engine: {m.provider_used === 'gemini' ? 'Google Gemini 3.6 Flash' :
                                                                 m.provider_used === 'groq' ? 'Groq Cloud (Failover)' :
                                                                 m.provider_used === 'cloudflare' ? 'Cloudflare Workers AI (Failover)' :
                                                                 m.provider_used === 'safety_guardrail' ? 'Clinical Safety Guardrail' : 'AEVYRA Local Rule Engine'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {aiLoading && (
                                <div className="flex gap-3 justify-start items-center text-xs text-on-surface-variant">
                                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                                    </div>
                                    <span className="italic">AEVYRA sedang merumuskan panduan preventif...</span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Disclaimer */}
                        <div className="px-4 py-1.5 bg-surface-container-low border-t border-surface-container text-center text-[10px] text-on-surface-variant">
                            AI bertindak sebagai pendamping gaya hidup preventif dan tidak menggantikan diagnosis resmi dokter atau resep obat.
                        </div>

                        {/* Input Box */}
                        <form onSubmit={handleSendAiMessage} className="p-3 bg-white dark:bg-surface border-t border-surface-container flex gap-2">
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                placeholder="Tanyakan seputar pola makan, indeks glikemik makanan, atau tips tidur..."
                                className="flex-1 p-3 rounded-2xl border border-surface-container bg-surface-container-low text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                disabled={aiLoading || !aiInput.trim()}
                                className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
