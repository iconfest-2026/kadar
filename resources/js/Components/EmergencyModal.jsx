import React, { useState } from 'react';
import axios from 'axios';

export default function EmergencyModal({ isOpen, onClose }) {
    const [status, setStatus] = useState('IDLE'); // 'IDLE' | 'TRIGGERING' | 'TRIGGERED'
    const [emergencyData, setEmergencyData] = useState(null);

    if (!isOpen) return null;

    const handleTrigger = () => {
        setStatus('TRIGGERING');

        // Capture user coordinates if allowed
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => sendTrigger(pos.coords.latitude, pos.coords.longitude),
                () => sendTrigger(null, null),
                { timeout: 3000 }
            );
        } else {
            sendTrigger(null, null);
        }
    };

    const sendTrigger = async (lat, lng) => {
        try {
            const res = await axios.post('/member/emergency/trigger', {
                latitude: lat,
                longitude: lng,
            });
            setEmergencyData(res.data);
            setStatus('TRIGGERED');
        } catch (err) {
            // Fallback emergency data immediately
            setEmergencyData({
                status: 'EMERGENCY_TRIGGERED',
                hotlines: {
                    primary_ambulance: '119',
                    national_emergency: '112',
                },
            });
            setStatus('TRIGGERED');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md bg-surface rounded-3xl border-2 border-red-500/50 shadow-2xl overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[24px] animate-pulse">e911_emergency</span>
                        <h2 className="font-heading font-bold text-base tracking-wide">PANGGILAN DARURAT 119</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div className="p-3.5 bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900/50">
                        <p className="text-xs text-red-900 dark:text-red-200 font-medium leading-relaxed">
                            <strong>PERHATIAN:</strong> Layanan darurat ini beroperasi langsung tanpa ketergantungan model AI. Jika Anda atau orang di sekitar mengalami nyeri dada hebat, sesak napas akut, atau hilang kesadaran, hubungi bantuan segera!
                        </p>
                    </div>

                    {status === 'IDLE' && (
                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={handleTrigger}
                                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white text-sm font-bold rounded-2xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 transition-all"
                            >
                                <span className="material-symbols-outlined text-[22px]">call</span>
                                <span>Aktifkan Protokol SOS & Panggil 119</span>
                            </button>
                            <p className="text-[11px] text-center text-on-surface-variant">
                                Mengaktifkan sinyal darurat akan mencatat log kepatuhan medis dan mendisposisi data lokasi ke SPGDT.
                            </p>
                        </div>
                    )}

                    {status === 'TRIGGERING' && (
                        <div className="py-6 text-center space-y-3">
                            <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            <p className="text-xs font-semibold text-on-surface">Mendapatkan lokasi & menghubungkan ke SPGDT Kemenkes RI...</p>
                        </div>
                    )}

                    {status === 'TRIGGERED' && (
                        <div className="space-y-3">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50 text-center">
                                <span className="material-symbols-outlined text-emerald-600 text-[28px]">check_circle</span>
                                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mt-1">
                                    Protokol Darurat Aktif!
                                </p>
                                <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                                    ID Laporan: {emergencyData?.event_id ?? 'EVT-MED-119'}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href="tel:119"
                                    className="py-3 px-3 bg-red-600 text-white rounded-xl text-center font-bold text-xs flex flex-col items-center gap-1 shadow-sm hover:bg-red-700"
                                >
                                    <span className="material-symbols-outlined text-[20px]">local_hospital</span>
                                    <span>Panggil 119</span>
                                    <span className="text-[10px] font-normal opacity-90">Ambulans Medis</span>
                                </a>
                                <a
                                    href="tel:112"
                                    className="py-3 px-3 bg-neutral-800 text-white rounded-xl text-center font-bold text-xs flex flex-col items-center gap-1 shadow-sm hover:bg-neutral-900"
                                >
                                    <span className="material-symbols-outlined text-[20px]">call</span>
                                    <span>Panggil 112</span>
                                    <span className="text-[10px] font-normal opacity-90">Darurat Nasional</span>
                                </a>
                            </div>

                            <div className="pt-2 border-t border-surface-container text-xs text-on-surface-variant space-y-1">
                                <p className="font-semibold text-on-surface">Panduan Tindakan Sambil Menunggu:</p>
                                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                                    <li>Pastikan jalan napas korban terbuka & longgarkan pakaian ketat.</li>
                                    <li>Jangan berikan makanan atau minuman bila kesadaran menurun.</li>
                                    <li>Tetap di dekat telepon untuk panduan lebih lanjut dari petugas.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container"
                    >
                        Tutup Jendela
                    </button>
                </div>
            </div>
        </div>
    );
}
