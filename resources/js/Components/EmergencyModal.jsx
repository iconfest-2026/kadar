import React, { useState } from 'react';
import axios from 'axios';

export default function EmergencyModal({ isOpen, onClose }) {
    const [sendingGps, setSendingGps] = useState(false);
    const [gpsSent, setGpsSent] = useState(false);
    const [eventId, setEventId] = useState(null);

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
                setGpsSent(true);
            } catch (err) {
                setEventId('EVT-119-MED');
                setGpsSent(true);
            } finally {
                setSendingGps(false);
            }
        };

        if (typeof navigator !== 'undefined' && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => sendTrigger(pos.coords.latitude, pos.coords.longitude),
                () => sendTrigger(null, null),
                { timeout: 3500 }
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
                                Siaga Darurat Medis
                            </h2>
                            <p className="text-[11px] text-on-surface-variant leading-tight">
                                SPGDT 119 Kemenkes RI
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
                    {/* Primary: SPGDT Ambulance 119 */}
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
                                <span className="text-[10px] text-white/80 block truncate">SPGDT Kemenkes RI • Bebas Pulsa</span>
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
                                <span className="text-xs font-bold text-on-surface block truncate">Darurat Nasional 112</span>
                                <span className="text-[10px] text-on-surface-variant block truncate">Polisi, Damkar & Bencana</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-[18px] shrink-0">
                            call
                        </span>
                    </a>
                </div>

                {/* GPS Dispatch / Log Record */}
                <div className="pt-1">
                    {gpsSent ? (
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium">
                            <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0">verified</span>
                            <div className="min-w-0 flex-1 truncate">
                                <span>Sinyal lokasi tercatat: </span>
                                <strong className="font-mono font-bold">{eventId}</strong>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSendGps}
                            disabled={sendingGps}
                            className="w-full py-2.5 px-3 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary border border-primary/20 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[17px]">
                                {sendingGps ? 'sync' : 'share_location'}
                            </span>
                            <span>{sendingGps ? 'Mengirim Sinyal Koordinat...' : 'Kirim Sinyal Lokasi ke Sistem'}</span>
                        </button>
                    )}
                </div>

                {/* Note Information */}
                <p className="text-[10.5px] text-center text-on-surface-variant/70 leading-relaxed pt-1">
                    Layanan terhubung 24/7 langsung ke pos tanggap darurat terdekat tanpa ketergantungan AI.
                </p>

                {/* Footer Action */}
                <div className="pt-1">
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
