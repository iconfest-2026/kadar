import React, { useState, useEffect, useRef } from 'react';
import { Head, router, usePage, Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import Alert from '../../Components/UI/Alert';
import Toast from '../../Components/UI/Toast';
import VideoCallModal from '../../Components/VideoCallModal';
import axios from 'axios';

export default function ConsultationsHub({
    instructors = [],
    consultations = [],
    assignedInstructorIds = [],
    healthMetrics = {},
    membership = {},
    defaultSlots = [],
}) {
    const { flash, auth } = usePage().props;
    const authUser = auth?.user || null;

    // Toast Notification State
    const [toast, setToast] = useState(null); // { type, title, message }
    const showToast = (type, title, message) => {
        setToast({ type, title, message });
    };

    // Auto display flash notifications via Toast
    useEffect(() => {
        if (flash?.error) {
            showToast('error', 'Pemberitahuan', flash.error);
        } else if (flash?.success) {
            showToast('success', 'Berhasil', flash.success);
        }
    }, [flash]);

    // Filter consultations by upcoming or active
    const upcomingConsultations = consultations.filter(
        (c) => c.is_upcoming || c.status === 'CONFIRMED' || c.status === 'IN_PROGRESS' || c.status === 'SCHEDULED'
    );
    const pastConsultations = consultations.filter(
        (c) => c.status === 'COMPLETED' || c.status === 'CANCELLED'
    );

    // Default tab: if user has any active consultation, go to 'live_chat', else 'booking'
    const [activeTab, setActiveTab] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tabParam = urlParams.get('tab');
        if (tabParam && ['live_chat', 'booking', 'history'].includes(tabParam)) {
            return tabParam;
        }
        return upcomingConsultations.length > 0 ? 'live_chat' : 'booking';
    });

    // Active Consultation for Chatting
    const [selectedConsultation, setSelectedConsultation] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const consIdParam = urlParams.get('consultation_id');
        if (consIdParam) {
            const found = consultations.find((c) => String(c.id) === String(consIdParam));
            if (found) return found;
        }
        return upcomingConsultations[0] || consultations[0] || null;
    });

    // Chat Messages State for active consultation
    const [chatMessages, setChatMessages] = useState([]);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatSubmitting, setChatSubmitting] = useState(false);
    const [showTelemetryDrawer, setShowTelemetryDrawer] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const chatEndRef = useRef(null);
    const memberFeedRef = useRef(null);

    const scrollToBottom = (smooth = true) => {
        if (memberFeedRef.current) {
            memberFeedRef.current.scrollTo({
                top: memberFeedRef.current.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto',
            });
        }
    };

    const formatSchedule = (dateStr) => {
        if (!dateStr) return '-';
        try {
            const cleanStr = String(dateStr).replace(/WIB/gi, '').trim();
            let d;
            let timeStr = '';
            if (cleanStr.includes('T')) {
                d = new Date(cleanStr);
                const h = String(d.getHours()).padStart(2, '0');
                const m = String(d.getMinutes()).padStart(2, '0');
                timeStr = `${h}:${m}`;
            } else {
                const parts = cleanStr.replace(/\s+/g, ' ').split(' ');
                const dateParts = parts[0].split('-');
                timeStr = parts[1] || '';
                d = new Date(parseInt(dateParts[0], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10));
            }
            if (isNaN(d.getTime())) return dateStr;

            const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            const dayName = dayNames[d.getDay()] || '';
            const day = d.getDate();
            const month = monthNames[d.getMonth()] || '';
            const year = d.getFullYear();

            return timeStr
                ? `${dayName}, ${day} ${month} ${year} • ${timeStr} WIB`
                : `${dayName}, ${day} ${month} ${year}`;
        } catch {
            return dateStr;
        }
    };

    const getCleanDoctorNotes = (notes) => {
        if (!notes) return null;
        const clean = notes
            .replace(/Sesi tele-konsultasi preventif terjadwal\.\s*Pasien dipersiapkan dengan data rekam medis 7 hari terakhir\./gi, '')
            .replace(/\[Dibatalkan oleh .*?\]/gi, '')
            .replace(/Sesi bimbingan klinis dibuka oleh instruktur pendamping\./gi, '')
            .replace(/Sesi bimbingan dijadwalkan oleh instruktur\./gi, '')
            .trim();
        return clean.length > 0 ? clean : null;
    };

    // Cancel Consultation Modal State
    const [cancelModalCons, setCancelModalCons] = useState(null);
    const [cancelReason, setCancelReason] = useState('Ada agenda mendadak');
    const [customCancelReason, setCustomCancelReason] = useState('');
    const [cancelSubmitting, setCancelSubmitting] = useState(false);

    // Booking Form State
    const [selectedDoctor, setSelectedDoctor] = useState(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const docIdParam = urlParams.get('instructor_id');
        if (docIdParam) {
            const found = instructors.find((i) => String(i.id) === String(docIdParam));
            if (found) return found;
        }
        return instructors[0] || null;
    });
    const [bookingDate, setBookingDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [selectedSlot, setSelectedSlot] = useState(defaultSlots[0] || '10:00');
    const [availableSlots, setAvailableSlots] = useState(
        defaultSlots.length > 0 ? defaultSlots : ['09:00', '10:30', '14:00', '16:00']
    );
    const [complaint, setComplaint] = useState('');
    const [healthContext, setHealthContext] = useState('');
    const [bookingSubmitting, setBookingSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Fetch Chat Messages whenever selectedConsultation changes
    useEffect(() => {
        if (selectedConsultation?.id) {
            loadConsultationMessages(selectedConsultation.id);
        }
    }, [selectedConsultation?.id]);

    const loadConsultationMessages = async (consultationId) => {
        setChatLoading(true);
        try {
            const res = await fetch(`/member/consultations/${consultationId}/messages`);
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
                scrollToBottom(false);
            }, 80);
        }
    };

    // Real-time near-instant polling for Member Chat: every 2.0 seconds
    useEffect(() => {
        if (!selectedConsultation?.id) return;
        if (selectedConsultation.status === 'CANCELLED') return;

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`/member/consultations/${selectedConsultation.id}/messages`);
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
                            setTimeout(() => scrollToBottom(true), 50);
                            return [...serverMsgs, ...pendingTemps];
                        }
                        return prev;
                    });
                }
                if (data?.consultation) {
                    if (data.consultation.status !== selectedConsultation.status) {
                        setSelectedConsultation((prev) => ({
                            ...prev,
                            ...data.consultation,
                        }));
                    }
                    if (data.consultation.status === 'COMPLETED' || data.consultation.status === 'CANCELLED') {
                        setShowVideoModal(false);
                    }
                }
            } catch (err) {}
        }, 2000);

        return () => clearInterval(interval);
    }, [selectedConsultation?.id, selectedConsultation?.status]);

    // Slot fetching on doctor or date change
    useEffect(() => {
        if (selectedDoctor && bookingDate) {
            fetchSlots(selectedDoctor.id, bookingDate);
        }
    }, [selectedDoctor, bookingDate]);

    const fetchSlots = async (doctorId, date) => {
        try {
            const res = await axios.get(`/member/booking/slots/${doctorId}?date=${date}`);
            const data = res.data;
            if (data.slots && data.slots.length > 0) {
                setAvailableSlots(data.slots);
                setSelectedSlot(data.slots[0]);
            } else {
                setAvailableSlots(['09:00', '10:30', '14:00', '16:00']);
                setSelectedSlot('09:00');
            }
        } catch {
            setAvailableSlots(['09:00', '10:30', '14:00', '16:00']);
            setSelectedSlot('09:00');
        }
    };

    // Send Message inside Consultation Chat
    const handleSendMessage = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (
            !chatInput.trim() ||
            chatSubmitting ||
            !selectedConsultation ||
            selectedConsultation.status === 'CANCELLED' ||
            selectedConsultation.status === 'COMPLETED'
        ) {
            return;
        }

        const text = chatInput.trim();
        setChatInput('');
        setChatSubmitting(true);

        const tempId = 'temp_' + Date.now();
        const tempMsg = {
            id: tempId,
            sender_id: authUser?.id || 0,
            sender_role: 'MEMBER',
            message: text,
            created_at: new Date().toISOString(),
            sender: { name: authUser?.name || 'Saya' },
        };
        setChatMessages((prev) => [...prev, tempMsg]);
        setTimeout(() => scrollToBottom(true), 50);

        try {
            const res = await axios.post(`/member/consultations/${selectedConsultation.id}/messages`, {
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
            console.error('Send message error:', err);
            // Remove failed optimistic message
            setChatMessages((prev) => prev.filter((m) => m.id !== tempId));
            // Restore input text
            setChatInput(text);
            const errMsg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                'Gagal mengirim pesan. Silakan coba beberapa saat lagi.';
            showToast('error', 'Gagal Mengirim Pesan', errMsg);
        } finally {
            setChatSubmitting(false);
            setTimeout(() => scrollToBottom(true), 50);
        }
    };

    // Quick Metric Share: Shares real, measured quantitative health telemetry directly into chat
    const handleShareMetric = async (type) => {
        if (
            !selectedConsultation ||
            chatSubmitting ||
            selectedConsultation.status === 'CANCELLED' ||
            selectedConsultation.status === 'COMPLETED'
        ) {
            return;
        }

        let payload = null;
        let shareText = '';

        if (type === 'glucose') {
            const val = healthMetrics.blood_glucose?.value || 108;
            payload = {
                type: 'blood_glucose',
                title: 'Data Glukosa Darah Puasa Terkini',
                value: val,
                unit: 'mg/dL',
                status: val < 100 ? 'Optimal (Normal)' : val <= 125 ? 'Pre-Diabetes (Waspada)' : 'Tinggi (DM)',
                statusColor: val < 100 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50',
                recorded_at: healthMetrics.blood_glucose?.recorded_at || 'Hari ini, 07:15 WIB',
            };
            shareText = `[Data Terukur] Glukosa Darah Puasa saya tercatat ${val} mg/dL (${payload.status}). Mohon evaluasi pola konsumsi saya, Dokter.`;
        } else if (type === 'diet') {
            const cal = healthMetrics.calories?.value || 1650;
            payload = {
                type: 'diet_summary',
                title: 'Ringkasan Asupan Kalori & Beban Glikemik',
                value: `${cal} kkal`,
                glycemicLoad: 'Beban Glikemik: Sedang (42 GL)',
                recorded_at: 'Hari ini',
            };
            shareText = `[Data Terukur] Rata-rata asupan kalori saya hari ini ${cal} kkal dengan beban glikemik terkontrol.`;
        } else if (type === 'sleep') {
            const sleepVal = healthMetrics.sleep_duration?.value || 7.2;
            payload = {
                type: 'sleep_vitals',
                title: 'Durasi & Kualitas Tidur Sirkadian',
                value: `${sleepVal} Jam`,
                status: sleepVal >= 7 ? 'Cukup & Stabil' : 'Defisit Tidur',
                statusColor: sleepVal >= 7 ? 'text-emerald-700 bg-emerald-50' : 'text-rose-800 bg-rose-50',
                recorded_at: healthMetrics.sleep_duration?.recorded_at || 'Malam terakhir',
            };
            shareText = `[Data Terukur] Rekam durasi tidur saya tadi malam: ${sleepVal} jam (${payload.status}).`;
        } else if (type === 'steps') {
            const stepsVal = healthMetrics.steps?.value || 8420;
            payload = {
                type: 'physical_activity',
                title: 'Aktivitas Langkah Kaki Harian',
                value: `${stepsVal.toLocaleString('id-ID')} Langkah`,
                status: stepsVal >= 7500 ? 'Target Tercapai (Aktif)' : 'Kurang Bergerak',
                statusColor: stepsVal >= 7500 ? 'text-emerald-700 bg-emerald-50' : 'text-amber-800 bg-amber-50',
                recorded_at: 'Akumulasi hari ini',
            };
            shareText = `[Data Terukur] Aktivitas langkah kaki harian saya mencapai ${stepsVal.toLocaleString('id-ID')} langkah.`;
        }

        if (!payload) return;

        setChatSubmitting(true);
        const tempId = 'temp_' + Date.now();
        const tempMsg = {
            id: tempId,
            sender_id: authUser?.id || 0,
            sender_role: 'MEMBER',
            message: shareText,
            metric_payload: payload,
            created_at: new Date().toISOString(),
            sender: { name: authUser?.name || 'Saya' },
        };
        setChatMessages((prev) => [...prev, tempMsg]);
        setTimeout(() => scrollToBottom(true), 50);

        try {
            const res = await axios.post(`/member/consultations/${selectedConsultation.id}/messages`, {
                message: shareText,
                metric_payload: payload,
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
            console.error('Metric share error:', err);
            setChatMessages((prev) => prev.filter((m) => m.id !== tempId));
            const errMsg =
                err.response?.data?.error ||
                err.response?.data?.message ||
                err.message ||
                'Gagal membagikan data biomarker.';
            showToast('error', 'Gagal Membagikan Data', errMsg);
        } finally {
            setChatSubmitting(false);
            setTimeout(() => scrollToBottom(true), 50);
        }
    };

    // Booking Submission
    const handleConfirmBooking = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setFormErrors({});

        if (!canBook) {
            setFormErrors({ general: quota.reason || 'Kuota konsultasi Anda tidak mencukupi untuk paket ini.' });
            return;
        }

        if (!selectedDoctor) {
            setFormErrors({ general: 'Silakan pilih dokter spesialis terlebih dahulu.' });
            return;
        }
        if (!bookingDate) {
            setFormErrors({ scheduled_date: 'Silakan pilih tanggal konsultasi.' });
            return;
        }
        if (!selectedSlot) {
            setFormErrors({ scheduled_time: 'Silakan tentukan jam konsultasi.' });
            return;
        }
        if (!complaint.trim()) {
            setFormErrors({ purpose: 'Mohon tuliskan keluhan atau topik konsultasi minimal singkat.' });
            return;
        }

        setBookingSubmitting(true);
        router.post(
            '/member/booking/store',
            {
                instructor_id: selectedDoctor.id,
                scheduled_date: bookingDate,
                scheduled_time: selectedSlot,
                purpose: complaint.trim(),
                health_context: healthContext.trim() || undefined,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setComplaint('');
                    setHealthContext('');
                    setFormErrors({});
                    setActiveTab('live_chat');
                },
                onError: (errs) => {
                    setFormErrors(errs || {});
                },
                onFinish: () => setBookingSubmitting(false),
            }
        );
    };

    const openCancelModal = (cons) => {
        setCancelModalCons(cons);
        setCancelReason('Ada agenda mendadak');
        setCustomCancelReason('');
    };

    const handleConfirmCancel = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!cancelModalCons || cancelSubmitting) return;

        const finalReason = cancelReason === 'Lainnya' ? (customCancelReason.trim() || 'Lainnya') : cancelReason;

        setCancelSubmitting(true);
        router.post(
            `/member/booking/${cancelModalCons.id}/cancel`,
            { reason: finalReason },
            {
                preserveScroll: true,
                onSuccess: () => {
                    const cancelledId = cancelModalCons.id;
                    setCancelModalCons(null);
                    setCancelReason('Ada agenda mendadak');
                    setCustomCancelReason('');
                    showToast('success', 'Sesi Dibatalkan', 'Sesi tele-konsultasi berhasil dibatalkan dan kuota Anda telah dipulihkan.');
                    if (selectedConsultation?.id === cancelledId) {
                        setSelectedConsultation((prev) => ({
                            ...prev,
                            status: 'CANCELLED',
                            cancellation_reason: finalReason,
                        }));
                    }
                },
                onError: (errs) => {
                    const msg = errs?.reason || errs?.error || 'Gagal membatalkan sesi konsultasi.';
                    showToast('error', 'Gagal Membatalkan', msg);
                },
                onFinish: () => setCancelSubmitting(false),
            }
        );
    };

    const quota = membership?.quota || {
        total: 0,
        used: 0,
        remaining: 0,
        is_unlimited: false,
        can_book: false,
        reason: 'Paket langganan Anda tidak memiliki kuota konsultasi.',
    };

    const isUnlimited = Boolean(quota.is_unlimited || quota.total === -1);
    const totalQuota = isUnlimited ? 'Unlimited' : (Number(quota.total) || 0);
    const remainingQuota = isUnlimited ? 'Bebas' : Math.max(0, Number(quota.remaining) || 0);
    const canBook = Boolean(quota.can_book);

    return (
        <AppLayout title="Konsultasi & Telemedisin Instruktur" activeTab="consultations">
            <Head title="Konsultasi Terukur Dokter & Instruktur Medis - AEVYRA" />

            {activeTab === 'live_chat' ? (
                /* SINGLE-PAGE AI CHATBOT INTERFACE (NO OUTER SCROLLING) */
                <div className="max-w-4xl mx-auto px-2 sm:px-4 py-1 sm:py-2">
                    <div className="h-[calc(100vh-5.5rem)] min-h-[560px] max-h-[860px] flex flex-col bg-white dark:bg-surface border border-surface-container rounded-3xl overflow-hidden shadow-xs relative">
                        {/* 1. Pinned Sticky Top Header Bar */}
                        <div className="p-2.5 sm:px-4 border-b border-surface-container flex items-center justify-between gap-2.5 bg-surface-container-lowest shrink-0 z-20 shadow-2xs">
                            <div className="flex items-center gap-2.5 min-w-0">
                                {selectedConsultation ? (
                                    <>
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 overflow-hidden ring-2 ring-primary/20 shrink-0 relative flex items-center justify-center font-bold text-primary text-sm shadow-2xs">
                                            <img
                                                src={selectedConsultation.instructor_avatar || '/image/doctor_bramantyo.jpg'}
                                                alt={selectedConsultation.instructor_name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                            {selectedConsultation.status !== 'CANCELLED' && (
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0 animate-pulse" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <h2 className="font-bold text-xs sm:text-sm text-on-surface truncate">
                                                    {selectedConsultation.instructor_name}
                                                </h2>
                                                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase border shrink-0 ${
                                                    selectedConsultation.status === 'CANCELLED'
                                                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                        : selectedConsultation.status === 'COMPLETED'
                                                        ? 'bg-primary/10 text-primary border-primary/20'
                                                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                                }`}>
                                                    {selectedConsultation.status === 'CANCELLED'
                                                        ? 'Batal'
                                                        : selectedConsultation.status === 'COMPLETED'
                                                        ? 'Selesai'
                                                        : 'Aktif'}
                                                </span>
                                            </div>
                                            <p className="text-[10px] sm:text-[11px] text-on-surface-variant truncate">
                                                {selectedConsultation.instructor_specialization || 'Spesialis Gizi Klinis & Pre-Diabetes'}
                                                {selectedConsultation.scheduled_start && (
                                                    <span className="hidden sm:inline"> • {selectedConsultation.scheduled_start.slice(11, 16)} WIB</span>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-2xs">
                                            <span className="material-symbols-outlined text-[22px]">support_agent</span>
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="font-bold text-xs sm:text-sm text-on-surface truncate">
                                                Ruang Konsultasi Dokter
                                            </h2>
                                            <p className="text-[10px] sm:text-[11px] text-on-surface-variant truncate">
                                                {canBook ? 'Belum Ada Sesi Konsultasi Aktif' : 'Memerlukan Paket Berlangganan Aktif'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Center: Switch room if > 1 consultation */}
                            {consultations.length > 1 && (
                                <div className="hidden md:flex items-center gap-1">
                                    <select
                                        value={selectedConsultation?.id || ''}
                                        onChange={(e) => {
                                            const found = consultations.find((c) => String(c.id) === String(e.target.value));
                                            if (found) setSelectedConsultation(found);
                                        }}
                                        className="px-2 py-1 bg-surface-container-low rounded-xl border border-surface-container text-[11px] text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-37.5 truncate"
                                    >
                                        {consultations.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.instructor_name} ({c.status === 'CONFIRMED' || c.status === 'SCHEDULED' ? 'Aktif' : c.status === 'COMPLETED' ? 'Selesai' : 'Batal'})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Right: Actions */}
                            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                                {/* Sisa Kuota pill */}
                                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-surface-container-low border border-surface-container text-[10px] font-mono">
                                    <span className="text-on-surface-variant">Kuota:</span>
                                    <span className="font-bold text-primary">{isUnlimited ? 'Bebas' : `${remainingQuota}/${totalQuota}`}</span>
                                </div>

                                {/* Upgrade Action if Quota is 0 / not eligible */}
                                {!canBook && (
                                    <Link
                                        href="/paket"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-2xs transition-all active:scale-95"
                                        title="Upgrade paket untuk mendapatkan kuota telekonsultasi dokter"
                                    >
                                        <span className="material-symbols-outlined text-[15px]">upgrade</span>
                                        <span>Upgrade</span>
                                    </Link>
                                )}

                                {/* Video Call Meeting button - Hanya aktif jika sesi aktif */}
                                {selectedConsultation && (selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'IN_PROGRESS' || selectedConsultation.status === 'SCHEDULED') && (
                                    <button
                                        type="button"
                                        onClick={() => setShowVideoModal(true)}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-all active:scale-95 cursor-pointer"
                                        title="Mulai / Masuk Ruang Video Call Tatap Muka"
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                        </span>
                                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                                        <span className="hidden sm:inline">Video Call</span>
                                    </button>
                                )}

                                {/* Sesi Detail modal button */}
                                {selectedConsultation && (
                                    <button
                                        type="button"
                                        onClick={() => setShowDetailModal(true)}
                                        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container text-xs font-medium flex items-center gap-1 cursor-pointer"
                                        title="Detail Sesi & Catatan Dokter"
                                    >
                                        <span className="material-symbols-outlined text-[17px] text-primary">clinical_notes</span>
                                        <span className="hidden sm:inline">Info Sesi</span>
                                    </button>
                                )}

                                {/* Switch to Booking */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('booking')}
                                    className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container text-xs font-medium flex items-center gap-1 cursor-pointer"
                                    title="Jadwalkan Konsultasi Baru"
                                >
                                    <span className="material-symbols-outlined text-[17px] text-primary">calendar_add_on</span>
                                    <span className="hidden lg:inline">Jadwal</span>
                                </button>

                                {/* Switch to History */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('history')}
                                    className="p-1.5 sm:px-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container text-xs font-medium flex items-center gap-1 cursor-pointer"
                                    title="Riwayat Sesi"
                                >
                                    <span className="material-symbols-outlined text-[17px] text-on-surface-variant">history</span>
                                    <span className="hidden xl:inline">({pastConsultations.length})</span>
                                </button>
                            </div>
                        </div>

                        {/* 2. Cancelled Banner if cancelled */}
                        {selectedConsultation?.status === 'CANCELLED' && (
                            <div className="p-2.5 sm:p-3 bg-rose-50 dark:bg-rose-950/30 border-b border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 flex items-start gap-2 text-xs shrink-0">
                                <span className="material-symbols-outlined text-[18px] text-rose-600 shrink-0">cancel</span>
                                <div className="space-y-0.5">
                                    <span className="font-bold block">Sesi Tele-Konsultasi Dibatalkan</span>
                                    <p className="text-[11px] leading-relaxed">
                                        Alasan: "{selectedConsultation.cancellation_reason || 'Dibatalkan oleh pengguna/dokter'}". Kuota telah dikembalikan.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 3. Messages Feed */}
                        {selectedConsultation ? (
                            <div
                                ref={memberFeedRef}
                                className="flex-1 p-3.5 sm:p-5 overflow-y-auto bg-[#fbfdfc] dark:bg-surface/50 text-xs min-h-0"
                            >
                                <div className="max-w-2xl mx-auto space-y-3 pb-2">
                                    {/* Welcoming AI Chatbot Style Greeting */}
                                    <div className="py-3 px-4 rounded-2xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 text-center max-w-lg mx-auto space-y-1 my-2">
                                        <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center mx-auto text-sm font-bold shadow-2xs">
                                            <span className="material-symbols-outlined text-[18px]">verified</span>
                                        </div>
                                        <p className="font-bold text-xs text-on-surface">
                                            Konsultasi Telemedisin: {selectedConsultation.instructor_name}
                                        </p>
                                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                            Topik: <span className="text-primary font-medium">{selectedConsultation.purpose}</span>.
                                            Diskusikan keluhan klinis atau kirimkan data biomarker harian Anda melalui tombol cepat di bawah.
                                        </p>
                                    </div>

                                    {chatLoading ? (
                                        <div className="py-16 text-center text-on-surface-variant space-y-2">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                                            <p className="text-xs">Memuat pesan...</p>
                                        </div>
                                    ) : chatMessages.length === 0 ? (
                                        <div className="py-12 text-center text-on-surface-variant space-y-2">
                                            <span className="material-symbols-outlined text-3xl text-primary/50">chat_bubble_outline</span>
                                            <p className="text-xs font-semibold text-on-surface">Mulai percakapan dengan dokter pendamping Anda</p>
                                            <p className="text-[11px]">Kirimkan salam atau sampaikan perkembangan pola makan Anda hari ini.</p>
                                        </div>
                                    ) : (
                                        chatMessages.map((msg) => {
                                            const isSystem = msg.sender_role === 'SYSTEM';
                                            const isUser = msg.sender_role === 'MEMBER';
                                            const hasMetric = msg.metric_payload && typeof msg.metric_payload === 'object';

                                            if (isSystem) {
                                                return (
                                                    <div key={msg.id} className="py-2 px-3.5 my-2 rounded-2xl bg-[#fffbeb] dark:bg-[#2a1b05] border border-[#f59e0b]/40 text-[#78350f] dark:text-[#fef3c7] text-center text-[11px] max-w-lg mx-auto leading-relaxed shadow-xs">
                                                        <div className="flex items-center justify-center gap-1 font-bold text-[#b45309] dark:text-[#fde68a] mb-0.5">
                                                            <span className="material-symbols-outlined text-[15px]">info</span>
                                                            <span>Pemberitahuan Sistem</span>
                                                        </div>
                                                        <p className="whitespace-pre-wrap font-medium">{msg.message}</p>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                                                >
                                                    <span className="text-[10px] text-on-surface-variant font-mono px-1">
                                                        {isUser ? 'Anda' : (selectedConsultation.instructor_name?.split(',')[0] || 'Dokter')} •{' '}
                                                        {msg.created_at
                                                            ? new Date(msg.created_at).toLocaleTimeString('id-ID', {
                                                                  hour: '2-digit',
                                                                  minute: '2-digit',
                                                              })
                                                            : 'Sekarang'}
                                                    </span>

                                                    <div
                                                        className={`p-3 sm:p-3.5 rounded-2xl max-w-[85%] sm:max-w-[78%] leading-relaxed shadow-2xs space-y-2 ${
                                                            isUser
                                                                ? 'bg-primary text-white rounded-br-xs'
                                                                : 'bg-white dark:bg-surface-container border border-surface-container-high text-on-surface rounded-bl-xs'
                                                        }`}
                                                    >
                                                        {/* Quantitative Metric Card */}
                                                        {hasMetric && (
                                                            <div className={`p-2.5 rounded-xl border text-left space-y-1 ${
                                                                isUser 
                                                                    ? 'bg-white/10 border-white/20 text-white' 
                                                                    : 'bg-surface-container-low border-surface-container text-on-surface'
                                                            }`}>
                                                                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider">
                                                                    <span className="flex items-center gap-1">
                                                                        <span className="material-symbols-outlined text-[14px] text-emerald-400">vital_signs</span>
                                                                        <span>{msg.metric_payload.title || 'Data Klinis Terukur'}</span>
                                                                    </span>
                                                                    <span className="text-[9px] opacity-80">{msg.metric_payload.recorded_at}</span>
                                                                </div>
                                                                <div className="flex items-baseline gap-1">
                                                                    <span className="text-lg font-mono font-black">{msg.metric_payload.value}</span>
                                                                    {msg.metric_payload.unit && (
                                                                        <span className="text-xs font-mono">{msg.metric_payload.unit}</span>
                                                                    )}
                                                                </div>
                                                                {msg.metric_payload.status && (
                                                                    <div className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-md bg-black/10 text-[9.5px] font-bold">
                                                                        <span>Status:</span>
                                                                        <span>{msg.metric_payload.status}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}

                                                        <p className="text-xs sm:text-[12.5px] whitespace-pre-wrap">{msg.message}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                            </div>
                        ) : (
                            /* State when no consultations exist */
                            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                                <div className="w-14 h-14 rounded-3xl bg-[#eef7f2] border border-[#d3e7dc] text-primary flex items-center justify-center mx-auto shadow-xs">
                                    <span className="material-symbols-outlined text-3xl">chat_bubble_outline</span>
                                </div>
                                <div className="space-y-1 max-w-sm">
                                    <h3 className="font-serif text-lg font-normal text-on-surface">
                                        Belum Ada Sesi Konsultasi Aktif
                                    </h3>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {canBook
                                            ? 'Anda belum memiliki jadwal sesi bimbingan bersama dokter pendamping. Jadwalkan sesi tele-konsultasi Anda sekarang.'
                                            : (quota.reason || 'Paket langganan aktif Anda tidak mencakup kuota konsultasi dokter. Tingkatkan paket langganan untuk menjadwalkan konsultasi.')}
                                    </p>
                                </div>
                                {canBook ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('booking')}
                                        className="px-6 py-2.5 rounded-full bg-primary hover:bg-[#0c5348] text-white text-xs font-semibold shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                                        <span>Jadwalkan Sesi Sekarang</span>
                                    </button>
                                ) : (
                                    <Link
                                        href="/paket"
                                        className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">upgrade</span>
                                        <span>Upgrade Paket Sekarang</span>
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* 4. Quick Biomarker Prompt Chips (Chatbot Suggested Prompts) */}
                        {selectedConsultation && selectedConsultation.status !== 'CANCELLED' && selectedConsultation.status !== 'COMPLETED' && (
                            <div className="px-3 sm:px-4 py-2 bg-white/95 dark:bg-surface/95 backdrop-blur border-t border-surface-container shrink-0">
                                <div className="max-w-2xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px] text-primary">add_chart</span>
                                        <span>Kirim Data:</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleShareMetric('glucose')}
                                        disabled={chatSubmitting}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 border border-surface-container hover:border-emerald-300 text-[10.5px] font-medium text-on-surface transition-all shrink-0 cursor-pointer disabled:opacity-40"
                                        title="Bagikan Data Gula Darah Puasa"
                                    >
                                        <span className="material-symbols-outlined text-[13px] text-rose-500">water_drop</span>
                                        <span>Glukosa {healthMetrics.blood_glucose?.value || 108} mg/dL</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleShareMetric('diet')}
                                        disabled={chatSubmitting}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 border border-surface-container hover:border-emerald-300 text-[10.5px] font-medium text-on-surface transition-all shrink-0 cursor-pointer disabled:opacity-40"
                                        title="Bagikan Ringkasan Asupan Kalori"
                                    >
                                        <span className="material-symbols-outlined text-[13px] text-emerald-600">restaurant</span>
                                        <span>Nutrisi {healthMetrics.calories?.value || 1650} kkal</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleShareMetric('sleep')}
                                        disabled={chatSubmitting}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 border border-surface-container hover:border-emerald-300 text-[10.5px] font-medium text-on-surface transition-all shrink-0 cursor-pointer disabled:opacity-40"
                                        title="Bagikan Durasi Tidur"
                                    >
                                        <span className="material-symbols-outlined text-[13px] text-indigo-500">bedtime</span>
                                        <span>Tidur {healthMetrics.sleep_duration?.value || 7.2} Jam</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleShareMetric('steps')}
                                        disabled={chatSubmitting}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-emerald-50 hover:text-emerald-800 border border-surface-container hover:border-emerald-300 text-[10.5px] font-medium text-on-surface transition-all shrink-0 cursor-pointer disabled:opacity-40"
                                        title="Bagikan Akumulasi Langkah Kaki"
                                    >
                                        <span className="material-symbols-outlined text-[13px] text-amber-500">directions_walk</span>
                                        <span>{(healthMetrics.steps?.value || 8420).toLocaleString('id-ID')} Langkah</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* 5. Sticky Bottom Chat Composer */}
                        {selectedConsultation && (
                            <form
                                onSubmit={handleSendMessage}
                                className="p-2.5 sm:p-3 bg-white dark:bg-surface border-t border-surface-container shrink-0"
                            >
                                <div className="max-w-2xl mx-auto flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        disabled={selectedConsultation.status === 'CANCELLED' || selectedConsultation.status === 'COMPLETED'}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder={
                                            selectedConsultation.status === 'CANCELLED'
                                                ? 'Sesi tele-konsultasi telah dibatalkan.'
                                                : selectedConsultation.status === 'COMPLETED'
                                                ? 'Sesi tele-konsultasi ini telah selesai dan diarsipkan.'
                                                : 'Ketik pesan atau konsultasikan keluhan Anda...'
                                        }
                                        className="flex-1 px-4 py-2.5 rounded-full border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!chatInput.trim() || chatSubmitting || selectedConsultation.status === 'CANCELLED'}
                                        className="w-10 h-10 rounded-full bg-[#00433e] hover:bg-[#0c5348] text-white flex items-center justify-center shadow-xs transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                                        title="Kirim Pesan"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-4 pb-2">
                    {/* 1. Header & Quota Overview Banner */}
                    <div className="rounded-2xl bg-linear-to-r from-[#00433e] via-[#08544e] to-[#0f5c56] p-4 sm:p-5 text-white shadow-xs relative overflow-hidden">
                        <div 
                            aria-hidden="true" 
                            className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl" 
                        />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1 max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-white/15 text-white border border-white/20">
                                    <span className="material-symbols-outlined text-[14px]">clinical_notes</span>
                                    <span>Konsultasi Dokter</span>
                                </div>
                                <h1 className="text-lg sm:text-2xl font-serif font-normal text-white tracking-tight leading-snug">
                                    Ruang Konsultasi Dokter
                                </h1>
                                <p className="text-xs sm:text-sm text-white/85 leading-relaxed hidden sm:block">
                                    Diskusikan data glukosa, pola makan, dan gaya hidup Anda secara personal bersama dokter spesialis berlisensi.
                                </p>
                            </div>

                            {/* Quota & Quick Action */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                                <div className="bg-black/25 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-white/15 text-center min-w-28 sm:min-w-36">
                                    <span className="text-[10px] font-mono font-bold uppercase text-white/80 block">
                                        Sisa Kuota
                                    </span>
                                    <div className="flex items-baseline justify-center gap-1 mt-0.5">
                                        {isUnlimited ? (
                                            <span className="font-mono font-black text-lg sm:text-xl text-white">Bebas Batas</span>
                                        ) : (
                                            <>
                                                <span className="font-mono font-black text-xl sm:text-2xl text-white">{remainingQuota}</span>
                                                <span className="text-[11px] sm:text-xs font-mono text-white/70">/ {totalQuota} Sesi</span>
                                            </>
                                        )}
                                    </div>
                                    <span className="text-[9px] font-mono text-white/70 block mt-0.5">
                                        Paket: {membership?.tier || quota.tier_name || 'Silver'}
                                    </span>
                                </div>

                                {!canBook && (
                                    <Link
                                        href="/paket"
                                        className="inline-flex items-center gap-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold transition-all shadow-xs"
                                        title="Tingkatkan paket untuk menambah sesi konsultasi"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">upgrade</span>
                                        <span>Upgrade</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 2. Clear Segmented Tabs */}
                    <div className="grid grid-cols-3 p-1 rounded-2xl bg-surface-container border border-surface-container-high/60 gap-1">
                        <button
                            type="button"
                            onClick={() => setActiveTab('live_chat')}
                            className={`py-2 px-1.5 sm:px-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
                                activeTab === 'live_chat'
                                    ? 'bg-white dark:bg-surface text-primary shadow-xs font-bold'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[17px] sm:text-[18px]">chat</span>
                            <span className="truncate">Chat Dokter</span>
                            {upcomingConsultations.length > 0 && (
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse hidden sm:inline-block" />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('booking')}
                            className={`py-2 px-1.5 sm:px-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
                                activeTab === 'booking'
                                    ? 'bg-white dark:bg-surface text-primary shadow-xs font-bold'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[17px] sm:text-[18px]">calendar_add_on</span>
                            <span className="truncate">Jadwalkan</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab('history')}
                            className={`py-2 px-1.5 sm:px-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
                                activeTab === 'history'
                                    ? 'bg-white dark:bg-surface text-primary shadow-xs font-bold'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[17px] sm:text-[18px]">history_edu</span>
                            <span className="truncate">Riwayat ({pastConsultations.length})</span>
                        </button>
                    </div>

                {/* TAB 2: JADWALKAN KONSULTASI (ALUR 2 LANGKAH YANG JELAS & TIDAK PUSING) */}
                {activeTab === 'booking' && (
                    <div className="space-y-5">
                        
                        {/* Flash Messages */}
                        {(Object.keys(formErrors).length > 0 || flash?.error) && (
                            <Alert variant="destructive" dismissible>
                                <div className="space-y-0.5 text-xs">
                                    {flash?.error && <p className="font-semibold">{flash.error}</p>}
                                    {Object.values(formErrors).map((err, idx) => (
                                        <p key={idx}>{err}</p>
                                    ))}
                                </div>
                            </Alert>
                        )}
                        {flash?.success && (
                            <Alert variant="success" dismissible>
                                <span className="text-xs">{flash.success}</span>
                            </Alert>
                        )}

                        {/* Quota Exhausted or No Quota Notice Banner (Solid Opaque High-Contrast Card) */}
                        {!canBook && (
                            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#fffbeb] dark:bg-[#2a1b05] border border-amber-300 dark:border-amber-700/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                                <div className="flex items-center sm:items-start gap-3 min-w-0 flex-1">
                                    <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300/50 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-snug">
                                            {Number(quota.total) === 0 ? 'Konsultasi Belum Tersedia' : 'Kuota Konsultasi Habis'}
                                        </h4>
                                        <p className="text-[11px] sm:text-xs font-medium text-amber-900/85 dark:text-amber-200/90 mt-0.5 leading-relaxed">
                                            {quota.reason || 'Tingkatkan paket untuk konsultasi dokter privat.'}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/paket"
                                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-primary hover:bg-[#0c5348] text-white text-xs font-bold shrink-0 transition-all text-center flex items-center justify-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">upgrade</span>
                                    <span>Upgrade Paket</span>
                                </Link>
                            </div>
                        )}

                        <div className="space-y-4">
                            
                            {/* LANGKAH 1: PILIH DOKTER SPESIALIS */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                                        <span>Pilih Dokter <span className="hidden sm:inline">Spesialis</span></span>
                                    </span>
                                    <span className="text-[11px] text-on-surface-variant font-mono">
                                        {instructors.length} Dokter
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {instructors.map((doc) => {
                                        const isSelected = selectedDoctor?.id === doc.id;
                                        const isAssigned = assignedInstructorIds.includes(doc.id);

                                        return (
                                            <div
                                                key={doc.id}
                                                onClick={() => setSelectedDoctor(doc)}
                                                className={`p-3 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                                                    isSelected
                                                        ? 'border-primary bg-[#eef7f2]/50 shadow-xs ring-1 ring-primary/30'
                                                        : 'border-surface-container bg-white dark:bg-surface hover:border-primary/40'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-surface-container border border-surface-container flex items-center justify-center overflow-hidden shrink-0">
                                                        <img
                                                            src={doc.avatar || '/image/doctor_bramantyo.jpg'}
                                                            alt={doc.name}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.currentTarget.src = '/image/doctor_bramantyo.jpg'; }}
                                                        />
                                                    </div>
                                                    <div className="min-w-0 space-y-0.5">
                                                        <div className="flex items-center gap-1.5">
                                                            <h4 className="font-bold text-xs sm:text-sm text-on-surface truncate">
                                                                {doc.title || doc.name}
                                                            </h4>
                                                            {isAssigned && (
                                                                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold shrink-0">
                                                                    Binaan Anda
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-primary font-medium truncate">
                                                            {doc.specialty || 'Spesialis Gizi Klinis'}
                                                        </p>
                                                        <p className="text-[10px] text-on-surface-variant font-mono truncate">
                                                            <span className="sm:hidden">STR Terverifikasi</span>
                                                            <span className="hidden sm:inline">{doc.str_number || 'STR Kemenkes Terverifikasi'}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600 font-mono">
                                                        <span className="material-symbols-outlined text-[15px] text-amber-500">star</span>
                                                        <span>{doc.rating || '4.9'}</span>
                                                    </div>
                                                    <div
                                                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                                                            isSelected
                                                                ? 'bg-primary border-primary text-white'
                                                                : 'border-surface-container-high'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <span className="material-symbols-outlined text-[14px]">check</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* LANGKAH 2 & 3: FORM JADWAL & KELUHAN KLINIS */}
                            <div className="space-y-3">
                                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 px-1">
                                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
                                    <span>Jadwal &amp; Topik Konsultasi</span>
                                </span>

                                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4">
                                    <form onSubmit={handleConfirmBooking} className="space-y-4">
                                        
                                        {/* Tanggal & Jam */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-on-surface block">
                                                Pilih Tanggal:
                                            </label>
                                            <input
                                                type="date"
                                                value={bookingDate}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                className="w-full px-3.5 py-2.5 rounded-2xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                                required
                                            />
                                        </div>

                                        {/* Time Slots Chips */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-on-surface block">
                                                Pilih Jam Sesi (WIB):
                                            </label>
                                            <div className="flex flex-wrap gap-1.5">
                                                {availableSlots.map((slot) => (
                                                    <button
                                                        key={slot}
                                                        type="button"
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`py-2 px-3 rounded-xl text-xs font-bold font-mono border transition-all cursor-pointer ${
                                                            selectedSlot === slot
                                                                ? 'bg-primary text-white border-primary shadow-xs'
                                                                : 'bg-surface-container-low text-on-surface border-surface-container hover:border-primary/40'
                                                        }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Keluhan Utama */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-on-surface block">
                                                Keluhan atau Topik Evaluasi:
                                            </label>
                                            <textarea
                                                value={complaint}
                                                onChange={(e) => setComplaint(e.target.value)}
                                                rows={2}
                                                placeholder="Contoh: Evaluasi hasil gula darah, target nutrisi harian, keluhan gejala..."
                                                className="w-full p-3 rounded-2xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                                                required
                                            />
                                        </div>

                                        {/* Konteks Tambahan (Opsional) */}
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-medium text-on-surface-variant block">
                                                Catatan / Obat Dikonsumsi (Opsional):
                                            </label>
                                            <input
                                                type="text"
                                                value={healthContext}
                                                onChange={(e) => setHealthContext(e.target.value)}
                                                placeholder="Contoh: Metformin 500mg, suplemen..."
                                                className="w-full px-3 py-2 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={bookingSubmitting || !canBook}
                                            className="w-full py-3 rounded-full bg-primary hover:bg-[#0c5348] text-white font-medium text-xs sm:text-sm shadow-xs transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {canBook ? 'verified' : 'lock'}
                                            </span>
                                            <span className="truncate">
                                                {bookingSubmitting
                                                    ? 'Memproses Jadwal...'
                                                    : !canBook
                                                    ? (Number(quota.total) === 0
                                                        ? 'Upgrade Paket untuk Booking'
                                                        : 'Kuota Habis • Upgrade Paket')
                                                    : 'Konfirmasi Jadwal (+10 Poin)'}
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: RIWAYAT KONSULTASI & CATATAN EVALUASI DOKTER */}
                {activeTab === 'history' && (
                    <div className="space-y-3">
                        {consultations.length > 0 ? (
                            consultations.map((c) => {
                                const isCompleted = c.status === 'COMPLETED';
                                const isCancelled = c.status === 'CANCELLED';
                                const doctorNotes = getCleanDoctorNotes(c.notes);

                                return (
                                    <div
                                        key={c.id}
                                        className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-3.5"
                                    >
                                        {/* Status & Schedule Header */}
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                                        isCompleted
                                                            ? 'bg-primary/10 text-primary border-primary/20'
                                                            : isCancelled
                                                            ? 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                                                            : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                                                    }`}
                                                >
                                                    {isCompleted ? 'Selesai' : isCancelled ? 'Dibatalkan' : 'Terjadwal'}
                                                </span>
                                                <span className="text-xs text-on-surface-variant font-medium">
                                                    {formatSchedule(c.scheduled_start)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedConsultation(c);
                                                        setActiveTab('live_chat');
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-semibold text-xs border border-surface-container transition-all cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[15px]">chat</span>
                                                    <span>{isCancelled ? 'Lihat Chat' : 'Buka Chat'}</span>
                                                </button>

                                                {(c.is_upcoming || c.status === 'CONFIRMED' || c.status === 'SCHEDULED') && (
                                                    <button
                                                        type="button"
                                                        onClick={() => openCancelModal(c)}
                                                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 transition-colors cursor-pointer"
                                                    >
                                                        Batalkan
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Doctor & Purpose Info */}
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/20">
                                                {c.instructor_name?.charAt(0) || 'D'}
                                            </div>
                                            <div className="min-w-0 flex-1 space-y-0.5">
                                                <h4 className="font-bold text-sm text-on-surface truncate">
                                                    {c.instructor_name}
                                                </h4>
                                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                                    <span className="text-on-surface-variant">Topik:</span>{' '}
                                                    <span className="text-on-surface font-medium">{c.purpose || 'Konsultasi Kesehatan'}</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Cancellation Details (Clean, Professional, Non-Slop) */}
                                        {isCancelled && (
                                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs">
                                                <div className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="material-symbols-outlined text-[15px]">event_busy</span>
                                                </div>
                                                <div className="space-y-0.5 min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center justify-between gap-1">
                                                        <span className="font-semibold text-xs text-on-surface">
                                                            Sesi Dibatalkan
                                                        </span>
                                                        <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-medium">
                                                            Kuota Dipulihkan (+1)
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                                        Alasan:{' '}
                                                        <span className="text-on-surface font-medium">
                                                            "{c.cancellation_reason || 'Dibatalkan oleh pihak pengguna/instruktur'}"
                                                        </span>
                                                        {c.cancelled_at && ` • ${formatSchedule(c.cancelled_at)}`}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Catatan Dokter (Hanya jika sesi selesai dan ada evaluasi medis nyata) */}
                                        {isCompleted && doctorNotes && (
                                            <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container space-y-1.5 text-xs">
                                                <div className="flex items-center gap-1.5 font-semibold text-primary">
                                                    <span className="material-symbols-outlined text-[16px]">prescriptions</span>
                                                    <span>Rekomendasi &amp; Catatan Klinis Dokter:</span>
                                                </div>
                                                <p className="text-on-surface leading-relaxed whitespace-pre-line pl-3 border-l-2 border-primary/30">
                                                    {doctorNotes}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-10 text-center rounded-3xl bg-white dark:bg-surface border border-dashed border-surface-container space-y-3">
                                <span className="material-symbols-outlined text-4xl text-on-surface-variant">history</span>
                                <h3 className="font-bold text-sm text-on-surface">Belum Ada Riwayat Konsultasi</h3>
                                <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                    Riwayat bimbingan tele-konsultasi Anda bersama dokter spesialis akan tercatat otomatis di sini.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL: Informasi Sesi Konsultasi */}
            {showDetailModal && selectedConsultation && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setShowDetailModal(false)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-2xl border border-surface-container shadow-xl max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">calendar_today</span>
                                <h3 className="font-bold text-sm text-on-surface">
                                    Detail Sesi Konsultasi
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowDetailModal(false)}
                                className="w-7 h-7 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center cursor-pointer transition-colors"
                                title="Tutup"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        {/* Doctor info */}
                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 overflow-hidden shrink-0 border border-primary/20 flex items-center justify-center font-bold text-primary">
                                <img
                                    src="/image/doctor-portrait.jpg"
                                    alt="Dokter"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-bold text-xs text-on-surface truncate">
                                    {selectedConsultation.instructor_name}
                                </p>
                                <p className="text-[11px] text-on-surface-variant font-mono">
                                    {formatSchedule(selectedConsultation.scheduled_start)}
                                </p>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'SCHEDULED'
                                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                    : selectedConsultation.status === 'COMPLETED'
                                    ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                            }`}>
                                {selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'SCHEDULED'
                                    ? 'Aktif'
                                    : selectedConsultation.status === 'COMPLETED'
                                    ? 'Selesai'
                                    : 'Batal'}
                            </span>
                        </div>

                        {/* Focus / Purpose */}
                        {selectedConsultation.purpose && (
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-on-surface-variant">Topik / Keluhan:</span>
                                <p className="text-xs text-on-surface p-2.5 rounded-xl bg-surface-container-low border border-surface-container leading-relaxed">
                                    {selectedConsultation.purpose}
                                </p>
                            </div>
                        )}

                        {/* Cancellation Reason if cancelled */}
                        {selectedConsultation.status === 'CANCELLED' && (
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-rose-600">Alasan Pembatalan:</span>
                                <p className="text-xs text-on-surface p-2.5 rounded-xl bg-rose-500/5 border border-rose-500/15 leading-relaxed">
                                    "{selectedConsultation.cancellation_reason || 'Dibatalkan oleh pihak pengguna/instruktur'}"
                                </p>
                            </div>
                        )}

                        {/* Doctor Notes if any */}
                        {selectedConsultation.status === 'COMPLETED' && getCleanDoctorNotes(selectedConsultation.notes) && (
                            <div className="space-y-1">
                                <span className="text-[11px] font-semibold text-primary">Catatan Evaluasi Dokter:</span>
                                <p className="text-xs text-on-surface p-2.5 rounded-xl bg-primary/5 border border-primary/15 leading-relaxed">
                                    {getCleanDoctorNotes(selectedConsultation.notes)}
                                </p>
                            </div>
                        )}

                        {/* Actions in Modal */}
                        <div className="pt-1 space-y-2">
                            {selectedConsultation && (selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'IN_PROGRESS' || selectedConsultation.status === 'SCHEDULED') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        setShowVideoModal(true);
                                    }}
                                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
                                >
                                    <span className="material-symbols-outlined text-[16px]">videocam</span>
                                    <span>Mulai Video Call</span>
                                </button>
                            )}

                            {(selectedConsultation.is_upcoming || selectedConsultation.status === 'CONFIRMED' || selectedConsultation.status === 'SCHEDULED') && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        openCancelModal(selectedConsultation);
                                    }}
                                    className="w-full py-2 px-3 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[15px]">event_busy</span>
                                    <span>Batalkan Sesi</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: Batalkan Sesi */}
            {cancelModalCons && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
                    onClick={() => setCancelModalCons(null)}
                >
                    <div
                        className="bg-white dark:bg-surface rounded-2xl border border-surface-container shadow-xl max-w-sm w-full p-5 space-y-4 animate-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-surface-container pb-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-rose-600 text-[20px]">event_busy</span>
                                <h3 className="font-bold text-sm text-on-surface">
                                    Batalkan Sesi
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCancelModalCons(null)}
                                className="w-7 h-7 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center cursor-pointer transition-colors"
                                title="Tutup"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>

                        {/* Confirmation text */}
                        <p className="text-xs text-on-surface leading-relaxed">
                            Apakah Anda yakin ingin membatalkan jadwal konsultasi ini?
                        </p>

                        {/* Doctor & Schedule Summary */}
                        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs space-y-1.5">
                            <div className="flex justify-between items-center text-on-surface">
                                <span className="text-on-surface-variant text-[11px]">Dokter:</span>
                                <span className="font-semibold text-on-surface">{cancelModalCons.instructor_name}</span>
                            </div>
                            <div className="flex justify-between items-center text-on-surface">
                                <span className="text-on-surface-variant text-[11px]">Jadwal:</span>
                                <span className="font-semibold text-on-surface">{formatSchedule(cancelModalCons.scheduled_start)}</span>
                            </div>
                            {cancelModalCons.purpose && (
                                <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-surface-container">
                                    <span className="text-on-surface-variant text-[11px] shrink-0">Keluhan:</span>
                                    <span className="text-on-surface text-right truncate max-w-[190px]">{cancelModalCons.purpose}</span>
                                </div>
                            )}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleConfirmCancel} className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-on-surface block">
                                    Alasan Pembatalan:
                                </label>
                                <select
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-container text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 cursor-pointer"
                                >
                                    <option value="Ada agenda mendadak">Ada agenda mendadak</option>
                                    <option value="Kondisi kesehatan sudah membaik">Kondisi kesehatan sudah membaik</option>
                                    <option value="Perlu pemeriksaan lab terlebih dahulu">Perlu pemeriksaan lab terlebih dahulu</option>
                                    <option value="Ingin menjadwalkan ulang di waktu lain">Ingin menjadwalkan ulang di waktu lain</option>
                                    <option value="Lainnya">Alasan lainnya...</option>
                                </select>

                                {cancelReason === 'Lainnya' && (
                                    <textarea
                                        rows="2"
                                        value={customCancelReason}
                                        onChange={(e) => setCustomCancelReason(e.target.value)}
                                        placeholder="Tuliskan alasan Anda..."
                                        className="w-full px-3 py-2 bg-surface-container-low rounded-xl border border-surface-container text-xs text-on-surface font-medium focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none mt-1.5"
                                        required
                                    />
                                )}
                            </div>

                            <p className="text-[11px] text-on-surface-variant">
                                * Kuota sesi akan otomatis dikembalikan ke akun Anda.
                            </p>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setCancelModalCons(null)}
                                    className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={cancelSubmitting || (cancelReason === 'Lainnya' && !customCancelReason.trim())}
                                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50 cursor-pointer active:scale-98"
                                >
                                    {cancelSubmitting ? 'Memproses...' : 'Ya, Batalkan Sesi'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: Video Call Telemedisin Terpadu */}
            <VideoCallModal
                isOpen={showVideoModal}
                onClose={() => setShowVideoModal(false)}
                consultation={selectedConsultation}
                currentUser={authUser}
                peerName={selectedConsultation?.instructor_name || 'Dokter Spesialis'}
                peerRole={selectedConsultation?.instructor_specialty || 'Dokter / Instruktur Pendamping'}
            />
        </AppLayout>
    );
}

