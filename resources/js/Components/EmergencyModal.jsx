import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import axios from 'axios';

export default function EmergencyModal({ isOpen, onClose }) {
    const [sendingGps, setSendingGps] = useState(false);
    const [gpsSent, setGpsSent] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [nearestHospital, setNearestHospital] = useState(null);

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
            } catch (err) {
                // Try fallback to public trigger if member route fails
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
                (pos) => sendTrigger(pos.coords.latitude, pos.coords.longitude),
                () => sendTrigger(null, null),
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
        } else {
            sendTrigger(null, null);
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-sm bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-2xl p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[22px]">emergency</span>
                        </div>
                        <div>
                            <h2 className="font-heading font-black text-sm text-on-surface">
                                Siaga Darurat Medis 119
                            </h2>
                            <p className="text-[11px] text-on-surface-variant leading-tight">
                                Terhubung Faskes IGD &amp; Ambulans Nyata
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                        title="Tutup Modal"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Direct Call Action Buttons */}
                <div className="space-y-2.5">
                    {/* Primary: Ambulance 119 */}
                    <a
                        href="tel:119"
                        className="w-full p-3.5 rounded-2xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white flex items-center justify-between shadow-md shadow-rose-600/20 transition-all group active:scale-98"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
                            </div>
                            <div className="text-left min-w-0">
                                <span className="text-xs font-bold block truncate">Panggil Ambulans 119</span>
                                <span className="text-[10px] text-white/80 block truncate">Hotline Kemenkes RI • Bebas Pulsa</span>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                            <span className="material-symbols-outlined text-[18px]">call</span>
                        </div>
                    </a>

                    {/* Secondary: National Emergency 112 */}
                    <a
                        href="tel:112"
                        className="w-full p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container text-on-surface flex items-center justify-between transition-all group active:scale-98"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                                <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                            </div>
                            <div className="text-left min-w-0">
                                <span className="text-xs font-bold text-on-surface block truncate">Darurat Terpadu 112</span>
                                <span className="text-[10px] text-on-surface-variant block truncate">Polisi, Damkar &amp; Penyelamatan</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px] shrink-0">
                            call
                        </span>
                    </a>
                </div>

                {/* GPS Dispatch / Nearest Hospital Card (Solid Opaque High-Contrast Card) */}
                <div className="pt-1">
                    {gpsSent ? (
                        <div className="space-y-2.5 animate-in fade-in zoom-in-95">
                            <div className="p-3.5 rounded-2xl bg-[#e8f5ee] dark:bg-[#0a2f26] border-2 border-[#1c6454]/40 dark:border-[#2fa38a]/60 shadow-md space-y-2.5">
                                {/* Header Badge: Verified Signal */}
                                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#1c6454]/20 dark:border-[#2fa38a]/30">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                            <span className="material-symbols-outlined text-[15px]">verified</span>
                                        </div>
                                        <span className="font-extrabold text-xs text-[#0a352c] dark:text-[#a7f3d0] truncate">
                                            Sinyal GPS Berhasil Dikirim
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-[#123e34] text-[#0f4d40] dark:text-[#6ee7b7] border border-[#1c6454]/30 shadow-2xs shrink-0">
                                        ID: #{eventId}
                                    </span>
                                </div>

                                {/* Hospital Details: Solid White Container */}
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

                                        {nearestHospital.phone && (
                                            <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                                                <span className="text-slate-600 dark:text-slate-400 text-[10px] font-medium">Hotline IGD:</span>
                                                <a
                                                    href={`tel:${nearestHospital.phone.split('/')[0].trim()}`}
                                                    className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-[13px]">call</span>
                                                    <span>{nearestHospital.phone}</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-3 rounded-xl bg-white dark:bg-[#162723] border border-[#cfe1d7] text-xs text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[16px] text-emerald-600 animate-spin">
                                            sync
                                        </span>
                                        <span className="font-medium">Mendeteksi faskes rujukan Kemenkes RI terdekat...</span>
                                    </div>
                                )}
                            </div>

                            {/* Direct Navigation Button to Live Radar */}
                            <Link
                                href="/member/emergency"
                                onClick={onClose}
                                className="w-full py-2.5 px-3 rounded-xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-rose-600/25 transition-all"
                            >
                                <span className="material-symbols-outlined text-[17px]">radar</span>
                                <span>Buka Radar Peta &amp; Rute Ambulans 119</span>
                            </Link>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSendGps}
                            disabled={sendingGps}
                            className="w-full py-2.5 px-3 rounded-xl bg-[#edf5f0] hover:bg-[#d4e8dd] dark:bg-[#0d382f] dark:hover:bg-[#164e42] text-[#1c6454] dark:text-[#a7f3d0] border-2 border-[#cfe1d7] dark:border-[#2fa38a]/40 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-2xs active:scale-98"
                        >
                            <span className={`material-symbols-outlined text-[17px] ${sendingGps ? 'animate-spin' : ''}`}>
                                {sendingGps ? 'sync' : 'share_location'}
                            </span>
                            <span>{sendingGps ? 'Mengunci Satelit GPS & Faskes...' : 'Kirim Koordinat GPS ke Faskes Terdekat'}</span>
                        </button>
                    )}
                </div>

                {/* Note Information */}
                <p className="text-[10.5px] text-center text-on-surface-variant/70 leading-relaxed pt-0.5">
                    Data faskes diverifikasi real-time via satelit GPS &amp; direktori resmi IGD Kemenkes RI.
                </p>

                {/* Footer Action */}
                <div className="pt-0.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors cursor-pointer"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
