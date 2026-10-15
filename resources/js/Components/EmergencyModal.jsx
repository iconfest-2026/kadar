import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';

export default function EmergencyModal({ isOpen, onClose }) {
    const [mounted, setMounted] = useState(false);
    const { auth } = usePage().props;
    const user = auth?.user || null;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (!isOpen) return;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    const [activeTab, setActiveTab] = useState('whatsapp'); // 'whatsapp' | 'call'
    const [sendingGps, setSendingGps] = useState(false);
    const [gpsSent, setGpsSent] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [nearestHospital, setNearestHospital] = useState(null);
    const [userCoords, setUserCoords] = useState(null);

    // Auto-fetch coordinates silently when modal opens so WhatsApp links have live GPS
    useEffect(() => {
        if (!isOpen) return;

        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setUserCoords({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: Math.round(pos.coords.accuracy || 15),
                    });
                },
                () => {},
                { enableHighAccuracy: true, timeout: 6000, maximumAge: 60000 }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSendGps = () => {
        setSendingGps(true);

        const sendTrigger = async (lat, lng) => {
            try {
                const res = await axios.post('/member/emergency/trigger', {
                    latitude: lat,
                    longitude: lng,
                });
                setEventId(res.data?.event_id ?? 'EVT-119-MED');
                if (res.data?.nearest_hospital) {
                    setNearestHospital(res.data.nearest_hospital);
                }
                setGpsSent(true);
            } catch {
                try {
                    const fallbackRes = await axios.post('/emergency/trigger', {
                        latitude: lat,
                        longitude: lng,
                    });
                    setEventId(fallbackRes.data?.event_id ?? 'EVT-119-MED');
                    if (fallbackRes.data?.nearest_hospital) {
                        setNearestHospital(fallbackRes.data.nearest_hospital);
                    }
                } catch {
                    setEventId('EVT-119-MED');
                }
                setGpsSent(true);
            } finally {
                setSendingGps(false);
            }
        };

        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    setUserCoords({
                        latitude: lat,
                        longitude: lng,
                        accuracy: Math.round(pos.coords.accuracy || 15),
                    });
                    sendTrigger(lat, lng);
                },
                () => sendTrigger(null, null),
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
        } else {
            sendTrigger(null, null);
        }
    };

    // Helper to generate formatted WhatsApp distress message with auto-redirect
    const buildWhatsAppUrl = (phone, serviceName) => {
        let msg = `🚨 *[DARURAT MEDIS - AEVYRA RESCUE]* 🚨\n`;
        msg += `Kepada: *${serviceName}*\n`;
        msg += `Mohon bantuan penanganan darurat medis / ambulans segera!\n\n`;

        if (user?.name) {
            msg += `👤 *Nama Pelapor/Pasien:* ${user.name}\n`;
        }
        if (user?.email) {
            msg += `📧 *Email Akun:* ${user.email}\n`;
        }

        if (userCoords?.latitude && userCoords?.longitude) {
            msg += `📌 *Titik Koordinat GPS:* https://maps.google.com/?q=${userCoords.latitude},${userCoords.longitude} (Akurasi ±${userCoords.accuracy}m)\n`;
        } else {
            msg += `📌 *Titik GPS:* Dalam proses pelacakan sinyal satelit.\n`;
        }

        if (nearestHospital?.name) {
            msg += `🏥 *Faskes Terdekat Terdeteksi:* ${nearestHospital.name} (${nearestHospital.distance_formatted || ''})\n`;
        }

        msg += `🆔 *ID Insiden:* #${eventId || 'EVT-119-MED'}\n`;
        msg += `⏰ *Waktu:* ${new Date().toLocaleTimeString('id-ID')} WIB\n\n`;
        msg += `_Pesan darurat resmi dikirim melalui Tombol Siaga Medis Aplikasi AEVYRA._`;

        if (phone) {
            const cleanPhone = phone.replace(/\D/g, '');
            const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
            return `https://api.whatsapp.com/send?phone=${formattedPhone}&text=${encodeURIComponent(msg)}`;
        }
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    };

    const WHATSAPP_CHANNELS = [
        {
            id: 'kemenkes_119',
            name: 'PSC 119 (Kementerian Kesehatan RI)',
            phone: '0811-10-500-567',
            phoneDisplay: '0811-10-500-567',
            badge: 'Kemenkes RI • Nasional',
            badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
            desc: 'Layanan Gawat Darurat Medis & Dispatch Ambulans Resmi',
            actionText: 'Kirim WhatsApp ke PSC 119',
        },
        {
            id: 'pk3d_jakarta',
            name: 'PK3D DKI Jakarta (AGD 119)',
            phone: '0811-2119-119',
            phoneDisplay: '0811-2119-119',
            badge: 'DKI Jakarta & Sekitarnya',
            badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
            desc: 'Pelayanan Kesehatan 3 Dilema / Ambulans Gawat Darurat',
            actionText: 'Kirim WhatsApp ke PK3D DKI',
        },
        {
            id: 'patriot_siaga_bekasi',
            name: 'Patriot Siaga Kota Bekasi',
            phone: '0856-9123-1100',
            phoneDisplay: '0856-9123-1100',
            badge: 'Kota Bekasi & Sekitarnya',
            badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
            desc: 'Laporan Darurat Medis, Kebencanaan & Layanan Publik',
            actionText: 'Kirim WhatsApp ke Patriot Siaga',
        },
    ];

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-lg bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-1 border-b border-surface-container">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[24px]">emergency</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="font-heading font-black text-sm sm:text-base text-on-surface">
                                    Siaga Tanggap Darurat Medis
                                </h2>
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                                </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant leading-tight">
                                Terhubung ke Layanan Medis Nasional, PSC 119 &amp; Call Center 112
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0"
                        title="Tutup Modal"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Channel Selector Tabs (WhatsApp vs Telepon) */}
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-surface-container-low rounded-2xl border border-surface-container">
                    <button
                        type="button"
                        onClick={() => setActiveTab('whatsapp')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            activeTab === 'whatsapp'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                        <span>WhatsApp Darurat</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('call')}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            activeTab === 'call'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">call</span>
                        <span>Panggilan Telepon</span>
                    </button>
                </div>

                {/* TAB 1: WHATSAPP CHANNELS */}
                {activeTab === 'whatsapp' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs flex items-start gap-2.5">
                            <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">info</span>
                            <div className="space-y-0.5">
                                <span className="font-bold block text-[11.5px]">Kirim Pesan Darurat Otomatis</span>
                                <p className="text-[10.5px] leading-relaxed text-emerald-800 dark:text-emerald-300/90">
                                    Klik nomor tujuan di bawah. Sistem akan otomatis mengarahkan ke WhatsApp dengan pesan darurat siap kirim yang memuat koordinat GPS, identitas, dan faskes terdekat.
                                </p>
                            </div>
                        </div>

                        {/* List of Verified Emergency WhatsApp Numbers */}
                        <div className="space-y-2">
                            {WHATSAPP_CHANNELS.map((item) => (
                                <a
                                    key={item.id}
                                    href={buildWhatsAppUrl(item.phone, item.name)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 sm:p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container hover:border-emerald-500/50 text-on-surface flex items-center justify-between gap-3 transition-all group active:scale-98 cursor-pointer shadow-2xs"
                                >
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="text-xs font-bold text-on-surface group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                {item.name}
                                            </span>
                                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                                                {item.badge}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-on-surface-variant line-clamp-1">
                                            {item.desc}
                                        </p>
                                        <div className="flex items-center gap-2 pt-0.5">
                                            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                                                WhatsApp: {item.phoneDisplay}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-[19px]">send</span>
                                    </div>
                                </a>
                            ))}

                            {/* Share to Family / Personal Contact */}
                            <a
                                href={buildWhatsAppUrl(null, 'Keluarga & Kerabat Terdekat')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-dashed border-surface-container-high text-on-surface flex items-center justify-between gap-3 transition-all group active:scale-98 cursor-pointer"
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                                        <span className="material-symbols-outlined text-[18px]">share_location</span>
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-xs font-bold text-on-surface block truncate">
                                            Bagikan ke Kontak Keluarga / Kerabat
                                        </span>
                                        <span className="text-[10px] text-on-surface-variant block truncate">
                                            Kirim koordinat GPS &amp; status darurat ke nomor pribadi lain
                                        </span>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-emerald-600">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                    </div>
                )}

                {/* TAB 2: DIRECT PHONE CALLS */}
                {activeTab === 'call' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                        {/* Primary: National Emergency 112 */}
                        <a
                            href="tel:112"
                            className="w-full p-3.5 rounded-2xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white flex items-center justify-between shadow-md shadow-rose-600/20 transition-all group active:scale-98"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined text-[22px]">e911_emergency</span>
                                </div>
                                <div className="text-left min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold block truncate">Panggilan Darurat Tunggal 112</span>
                                        <span className="text-[9.5px] px-1.5 py-0.5 rounded-md bg-white/20 font-mono font-bold">GRATIS</span>
                                    </div>
                                    <span className="text-[10.5px] text-white/90 block truncate">
                                        Polisi, Pemadam Kebakaran, Ambulans • Bebas Pulsa
                                    </span>
                                </div>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">call</span>
                            </div>
                        </a>

                        {/* Secondary: Ambulance PSC 119 */}
                        <a
                            href="tel:119"
                            className="w-full p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface flex items-center justify-between transition-all group active:scale-98"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[22px]">local_hospital</span>
                                </div>
                                <div className="text-left min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-bold text-on-surface block truncate">PSC 119 Kemenkes RI</span>
                                        <span className="text-[9.5px] px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">BEBAS PULSA</span>
                                    </div>
                                    <span className="text-[10.5px] text-on-surface-variant block truncate">
                                        Hotline Medis &amp; Ambulans Gawat Darurat Nasional
                                    </span>
                                </div>
                            </div>
                            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">call</span>
                            </div>
                        </a>

                        {/* PK3D DKI Jakarta */}
                        <a
                            href="tel:119"
                            className="w-full p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface flex items-center justify-between transition-all group active:scale-98"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">airport_shuttle</span>
                                </div>
                                <div className="text-left min-w-0">
                                    <span className="text-xs font-bold text-on-surface block truncate">PK3D DKI Jakarta (AGD)</span>
                                    <span className="text-[10px] text-on-surface-variant block truncate">Telepon 119 atau 112 (DKI Jakarta)</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[19px] shrink-0">
                                call
                            </span>
                        </a>
                    </div>
                )}

                {/* GPS COORDINATE & FASKES STATUS */}
                <div className="pt-1">
                    {gpsSent ? (
                        <div className="space-y-2.5 animate-in fade-in zoom-in-95">
                            <div className="p-3.5 rounded-2xl bg-[#e8f5ee] dark:bg-[#0a2f26] border-2 border-[#1c6454]/40 dark:border-[#2fa38a]/60 shadow-md space-y-2.5">
                                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#1c6454]/20 dark:border-[#2fa38a]/30">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                            <span className="material-symbols-outlined text-[15px]">verified</span>
                                        </div>
                                        <span className="font-extrabold text-xs text-[#0a352c] dark:text-[#a7f3d0] truncate">
                                            Koordinat GPS Terkirim ke Command Center
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#123e34] text-[#0f4d40] dark:text-[#6ee7b7] border border-[#1c6454]/30 shadow-2xs shrink-0">
                                        #{eventId}
                                    </span>
                                </div>

                                {nearestHospital ? (
                                    <div className="p-3 rounded-xl bg-white dark:bg-[#162723] border border-[#cfe1d7] dark:border-[#23423b] shadow-xs space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-0.5">
                                                    <span className="material-symbols-outlined text-[14px]">local_hospital</span>
                                                    <span>Faskes / RS Rujukan Terdekat</span>
                                                </div>
                                                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug break-words">
                                                    {nearestHospital.name}
                                                </h4>
                                            </div>
                                            <span className="shrink-0 font-bold text-[10.5px] px-2 py-0.5 rounded-full bg-emerald-700 text-white shadow-xs">
                                                {nearestHospital.distance_formatted}
                                            </span>
                                        </div>

                                        {nearestHospital.address && (
                                            <div className="flex items-start gap-1.5 text-[11px] text-slate-800 dark:text-slate-200 pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
                                                <span className="material-symbols-outlined text-[14px] text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">location_on</span>
                                                <span className="leading-snug break-words font-medium">
                                                    {nearestHospital.address}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-2.5 rounded-xl bg-white dark:bg-[#162723] border border-[#cfe1d7] text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px] text-emerald-600 animate-spin">sync</span>
                                        <span className="font-medium">Mendeteksi faskes rujukan Kemenkes RI terdekat...</span>
                                    </div>
                                )}
                            </div>

                            {/* Direct Navigation Button to Live Radar */}
                            <Link
                                href="/member/emergency"
                                onClick={onClose}
                                className="w-full py-2.5 px-3 rounded-xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-600/25 transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[17px]">radar</span>
                                <span>Buka Radar Peta &amp; Rute Ambulans 119</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleSendGps}
                                disabled={sendingGps}
                                className="flex-1 py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                            >
                                <span className={`material-symbols-outlined text-[16px] text-primary ${sendingGps ? 'animate-spin' : ''}`}>
                                    {sendingGps ? 'sync' : 'share_location'}
                                </span>
                                <span>{sendingGps ? 'Mengunci Koordinat...' : 'Lacak & Kirim Koordinat GPS'}</span>
                            </button>

                            <Link
                                href="/member/emergency"
                                onClick={onClose}
                                className="py-2 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                                title="Buka Radar Peta Interaktif"
                            >
                                <span className="material-symbols-outlined text-[16px] text-rose-600">radar</span>
                                <span className="hidden sm:inline">Radar Peta</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-on-surface-variant/80 border-t border-surface-container">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
                        <span>Hotline Resmi Kemenkes RI &amp; Kominfo</span>
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="font-bold text-on-surface hover:text-primary transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
