import React, { useState, useEffect, useRef } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import Alert from '../../Components/UI/Alert';

export default function ConsultationsHub({ instructors = [], consultations = [], membership = {}, defaultSlots = [] }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('booking'); // 'booking', 'my_consultations', 'ai_chat'
    
    // Booking Form State
    const [selectedDoctor, setSelectedDoctor] = useState(instructors[0] || null);
    const [bookingDate, setBookingDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [selectedSlot, setSelectedSlot] = useState(defaultSlots[0] || '10:00');
    const [availableSlots, setAvailableSlots] = useState(defaultSlots.length > 0 ? defaultSlots : ['09:00', '10:30', '14:00', '16:00']);
    const [complaint, setComplaint] = useState('');
    const [bookingSubmitting, setBookingSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

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
                        content: 'Halo! Saya Asisten AI AEVYRA. Tanyakan seputar pola makan sehat, indeks glikemik, atau kebiasaan gaya hidup Anda.',
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
                content: 'Terjadi gangguan jaringan sesaat. Silakan coba kembali.',
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
            setAvailableSlots(['09:00', '10:30', '14:00', '16:00']);
            setSelectedSlot('09:00');
        }
    };

    const handleConfirmBooking = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setFormErrors({});

        if (!selectedDoctor) {
            setFormErrors({ general: 'Silakan pilih dokter terlebih dahulu.' });
            return;
        }
        if (!bookingDate) {
            setFormErrors({ scheduled_date: 'Silakan pilih tanggal konsultasi.' });
            return;
        }
        if (!selectedSlot) {
            setFormErrors({ scheduled_time: 'Silakan pilih jam konsultasi.' });
            return;
        }
        if (!complaint.trim()) {
            setFormErrors({ purpose: 'Mohon tuliskan keluhan atau topik konsultasi minimal singkat.' });
            return;
        }

        setBookingSubmitting(true);
        router.post('/member/booking/store', {
            instructor_id: selectedDoctor.id,
            scheduled_date: bookingDate,
            scheduled_time: selectedSlot,
            purpose: complaint.trim(),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setComplaint('');
                setFormErrors({});
                setActiveTab('my_consultations');
            },
            onError: (errs) => {
                setFormErrors(errs || {});
            },
            onFinish: () => setBookingSubmitting(false),
        });
    };

    const handleCancelBooking = (consultationId) => {
        if (!confirm('Batalkan jadwal konsultasi ini?')) return;
        router.post(`/member/booking/${consultationId}/cancel`, {}, {
            preserveScroll: true,
        });
    };

    const remainingQuota = (membership?.quota?.total || 0) - (membership?.quota?.used || 0);

    return (
        <AppLayout title="Konsultasi Dokter" activeTab="consultations">
            <Head title="Konsultasi & Telemedisin - AEVYRA" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-4 pb-2">
                
                {/* 1. Mobile-Style Compact Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-heading font-black text-lg sm:text-xl text-on-surface">
                            Konsultasi Medis
                        </h1>
                        <p className="text-[11px] text-on-surface-variant">
                            Kuota: <strong className="text-emerald-600 font-mono">{remainingQuota} Sesi</strong> ({membership.tier || 'Silver'})
                        </p>
                    </div>

                    {/* Quick Mode Toggle */}
                    <button
                        type="button"
                        onClick={() => setActiveTab(activeTab === 'ai_chat' ? 'booking' : 'ai_chat')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            activeTab === 'ai_chat'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                        <span>{activeTab === 'ai_chat' ? 'Ke Booking Dokter' : 'Tanya AI (24/7)'}</span>
                    </button>
                </div>

                {/* 2. Top Segmented Filter / Tab Bar (Mobile App Style) */}
                <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-container gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('booking')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                            activeTab === 'booking'
                                ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Pilih &amp; Booking Dokter
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('my_consultations')}
                        className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                            activeTab === 'my_consultations'
                                ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        Jadwal Saya ({consultations.filter(c => c.is_upcoming).length})
                    </button>
                </div>

                {/* TAB 1: BOOKING DOKTER (SIMPLE & INTUITIVE) */}
                {activeTab === 'booking' && (
                    <div className="space-y-4">
                        {/* Doctor List */}
                        <div className="space-y-2">
                            <span className="text-[11px] font-label-mono font-bold uppercase text-on-surface-variant block px-1">
                                Pilih Dokter
                            </span>

                            <div className="space-y-2">
                                {instructors.map((doc) => {
                                    const isSelected = selectedDoctor?.id === doc.id;
                                    return (
                                        <div
                                            key={doc.id}
                                            onClick={() => setSelectedDoctor(doc)}
                                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                                isSelected
                                                    ? 'border-primary bg-primary/5 shadow-2xs'
                                                    : 'border-surface-container bg-white dark:bg-surface hover:border-primary/30'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-surface-container border border-surface-container flex items-center justify-center overflow-hidden shrink-0">
                                                    <img
                                                        src={doc.avatar || "/image/doctor-portrait.jpg"}
                                                        alt={doc.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-xs text-on-surface truncate">
                                                        {doc.title || doc.name}
                                                    </h4>
                                                    <p className="text-[11px] text-primary truncate font-medium">
                                                        {doc.specialty || 'Spesialis Gizi Klinis'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <div className="flex items-center gap-0.5 text-[11px] font-bold text-amber-600 font-mono">
                                                    <span className="material-symbols-outlined text-[14px] text-amber-500">star</span>
                                                    <span>{doc.rating || '4.9'}</span>
                                                </div>
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                                    isSelected ? 'bg-primary border-primary text-white' : 'border-surface-container-high'
                                                }`}>
                                                    {isSelected && <span className="material-symbols-outlined text-[13px]">check</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Booking Form Card */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-3.5 shadow-2xs">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-on-surface block">
                                    Reservasi bersama {selectedDoctor?.name?.split(',')[0] || 'Dokter'}
                                </span>
                                {selectedDoctor?.specialty && (
                                    <span className="text-[10px] text-primary font-medium">
                                        {selectedDoctor.specialty}
                                    </span>
                                )}
                            </div>

                            {/* Flash or Form Errors Alert */}
                            {(Object.keys(formErrors).length > 0 || flash?.error) && (
                                <Alert variant="destructive" dismissible>
                                    <div className="space-y-0.5">
                                        {flash?.error && <p className="font-semibold">{flash.error}</p>}
                                        {Object.values(formErrors).map((err, idx) => (
                                            <p key={idx}>{err}</p>
                                        ))}
                                    </div>
                                </Alert>
                            )}

                            {flash?.success && (
                                <Alert variant="success" dismissible>
                                    {flash.success}
                                </Alert>
                            )}

                            <form action="#" method="POST" onSubmit={handleConfirmBooking} className="space-y-3">
                                {/* Date & Slots */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-on-surface-variant block">
                                            Tanggal:
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setBookingDate(e.target.value)}
                                            className="w-full p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[11px] font-medium text-on-surface-variant block">
                                            Jam (WIB):
                                        </label>
                                        <div className="flex flex-wrap gap-1">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-1.5 px-2.5 rounded-lg text-[11px] font-bold font-mono border transition-all cursor-pointer ${
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

                                {/* Complaint */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-medium text-on-surface-variant block">
                                        Keluhan / Topik Konsultasi:
                                    </label>
                                    <textarea
                                        value={complaint}
                                        onChange={(e) => setComplaint(e.target.value)}
                                        rows={2}
                                        placeholder="Contoh: Diskusi hasil lab gula darah puasa & rencana makan..."
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={bookingSubmitting}
                                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    <span>{bookingSubmitting ? 'Menyimpan...' : 'Konfirmasi Jadwal (+10 Poin)'}</span>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* TAB 2: JADWAL SAYA */}
                {activeTab === 'my_consultations' && (
                    <div className="space-y-2.5">
                        {consultations.length > 0 ? (
                            consultations.map((c) => (
                                <div
                                    key={c.id}
                                    className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-2 shadow-2xs"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold font-label-mono ${
                                                c.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-800' :
                                                c.status === 'COMPLETED' ? 'bg-indigo-500/10 text-indigo-800' :
                                                c.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-800' : 'bg-amber-500/10 text-amber-800'
                                            }`}>
                                                {c.status === 'CONFIRMED' ? 'Terkonfirmasi' : c.status || 'Menunggu'}
                                            </span>
                                            <h4 className="font-bold text-xs text-on-surface truncate mt-1">
                                                {c.instructor_name || 'Dokter Spesialis'}
                                            </h4>
                                            <p className="text-[11px] text-primary font-mono font-semibold">
                                                {c.scheduled_start || c.scheduled_date} WIB
                                            </p>
                                        </div>

                                        {c.is_upcoming && (
                                            <a
                                                href={c.meeting_url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-xl bg-primary text-white text-[11px] font-bold shadow-2xs active:scale-95 transition-all flex items-center gap-1 shrink-0"
                                            >
                                                <span className="material-symbols-outlined text-[14px]">videocam</span>
                                                <span>Masuk Sesi</span>
                                            </a>
                                        )}
                                    </div>

                                    {c.purpose && (
                                        <p className="text-[11px] text-on-surface-variant bg-surface-container-low p-2 rounded-xl">
                                            {c.purpose}
                                        </p>
                                    )}

                                    {c.is_upcoming && (
                                        <div className="flex justify-end pt-0.5">
                                            <button
                                                type="button"
                                                onClick={() => handleCancelBooking(c.id)}
                                                className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                                            >
                                                Batalkan
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center rounded-2xl border border-dashed border-surface-container bg-surface-container-low space-y-2">
                                <span className="material-symbols-outlined text-3xl text-on-surface-variant">event_busy</span>
                                <p className="text-xs text-on-surface-variant">
                                    Belum ada jadwal konsultasi tersimpan.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('booking')}
                                    className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                                >
                                    Pilih Jadwal
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* TAB 3: AI CHAT COMPACT */}
                {activeTab === 'ai_chat' && (
                    <div className="rounded-2xl border border-surface-container bg-white dark:bg-surface shadow-2xs overflow-hidden flex flex-col h-120">
                        {/* Messages Box */}
                        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 bg-surface-container-lowest text-xs">
                            {messages.map((m) => {
                                const isUser = m.role === 'USER';
                                return (
                                    <div
                                        key={m.id}
                                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`p-2.5 sm:p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                                                isUser
                                                    ? 'bg-primary text-white rounded-br-xs'
                                                    : 'bg-surface-container-low text-on-surface border border-surface-container rounded-bl-xs'
                                            }`}
                                        >
                                            {typeof m.content === 'string' ? m.content.replace(/\*/g, '') : m.content}
                                        </div>
                                    </div>
                                );
                            })}
                            {aiLoading && (
                                <div className="text-[11px] text-on-surface-variant italic">
                                    AI sedang mengetik...
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Box */}
                        <form onSubmit={handleSendAiMessage} className="p-2 border-t border-surface-container flex gap-1.5 bg-white dark:bg-surface">
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                placeholder="Tanyakan seputar gizi & makanan..."
                                className="flex-1 p-2 rounded-xl border border-surface-container bg-surface-container-low text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                disabled={aiLoading || !aiInput.trim()}
                                className="px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-xs cursor-pointer disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[16px]">send</span>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
