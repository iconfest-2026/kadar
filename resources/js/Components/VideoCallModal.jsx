import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function VideoCallModal({
    isOpen = false,
    onClose,
    consultation = null,
    currentUser = null,
    peerName = '',
    peerRole = 'Dokter Spesialis',
}) {
    const [mounted, setMounted] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const modalContainerRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (isOpen) {
            setElapsedSeconds(0);
            interval = setInterval(() => {
                setElapsedSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            setElapsedSeconds(0);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOpen]);

    // Handle Escape Key & Body Scroll Lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    const isClosed = !consultation || consultation.status === 'COMPLETED' || consultation.status === 'CANCELLED';

    if (isClosed) {
        return createPortal(
            <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
                onClick={onClose}
            >
                <div
                    className="bg-white dark:bg-surface rounded-2xl border border-surface-container shadow-2xl max-w-sm w-full p-6 text-center space-y-4 animate-in zoom-in-95 duration-150"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-500/20">
                        <span className="material-symbols-outlined text-[32px]">call_end</span>
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="font-bold text-base text-on-surface">
                            Panggilan Video Tidak Tersedia
                        </h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            {consultation?.status === 'COMPLETED'
                                ? 'Sesi tele-konsultasi ini telah diakhiri dan ditandai selesai. Ruang panggilan video telah ditutup secara permanen.'
                                : 'Sesi tele-konsultasi ini telah dibatalkan. Akses video call ditolak dan dinonaktifkan.'}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors cursor-pointer"
                    >
                        Tutup Jendela
                    </button>
                </div>
            </div>,
            document.body
        );
    }

    // Helper to resolve clean URL
    const resolveMeetingUrl = () => {
        let url = consultation.meeting_url;
        if (url && !url.includes('telemed.aevyra.health')) {
            return url;
        }
        if (url && url.includes('telemed.aevyra.health/')) {
            return url.replace('https://telemed.aevyra.health/', 'https://meet.jit.si/');
        }
        return `https://meet.jit.si/AEVYRA-ROOM-CONS-${consultation.id}`;
    };

    const rawMeetingUrl = resolveMeetingUrl();
    const displayName = encodeURIComponent(currentUser?.name || 'Peserta');
    
    // Iframe URL with jitsi parameters
    const iframeUrl = `${rawMeetingUrl}#userInfo.displayName="${displayName}"&config.prejoinPageEnabled=false&config.startWithAudioMuted=false&config.startWithVideoMuted=false&config.disableDeepLinking=true`;

    const formatTimer = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        const pad = (n) => String(n).padStart(2, '0');
        if (hrs > 0) {
            return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
        }
        return `${pad(mins)}:${pad(secs)}`;
    };

    const handleCopyLink = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(rawMeetingUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const toggleFullscreen = () => {
        if (!modalContainerRef.current) return;
        if (!document.fullscreenElement) {
            modalContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    return createPortal(
        <div
            ref={modalContainerRef}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col p-2 sm:p-4 animate-in fade-in duration-200"
        >
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl mb-2 sm:mb-3">
                {/* Peer & Session Info */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                        <span className="material-symbols-outlined text-[22px]">videocam</span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold text-sm sm:text-base truncate">
                                {peerName || 'Ruang Konsultasi Medis'}
                            </h3>
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                Live WebRTC
                            </span>
                        </div>
                        <p className="text-slate-400 text-xs flex items-center gap-1.5 truncate">
                            <span>{peerRole}</span>
                            <span>•</span>
                            <span className="font-mono text-emerald-400 font-semibold">{formatTimer(elapsedSeconds)}</span>
                        </p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    {/* Salin Tautan Ruang */}
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Salin Link Video Call"
                    >
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">
                            {copied ? 'check' : 'content_copy'}
                        </span>
                        <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
                    </button>

                    {/* Buka Tab Terpisah */}
                    <a
                        href={rawMeetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Buka Panggilan di Tab Browser Baru"
                    >
                        <span className="material-symbols-outlined text-[16px] text-emerald-400">open_in_new</span>
                        <span className="hidden md:inline">Buka Tab Terpisah</span>
                    </a>

                    {/* Toggle Fullscreen */}
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-1 transition-all cursor-pointer"
                        title={isFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                    </button>

                    {/* Akhiri Panggilan */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-950 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                        title="Tutup / Akhiri Panggilan"
                    >
                        <span className="material-symbols-outlined text-[17px]">call_end</span>
                        <span>Akhiri</span>
                    </button>
                </div>
            </div>

            {/* Video Iframe Container */}
            <div className="flex-1 w-full bg-black rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl min-h-[400px]">
                <iframe
                    src={iframeUrl}
                    allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
                    className="w-full h-full border-0"
                    title="Ruang Video Telemedisin"
                />
            </div>

            {/* Quick Helper Footer */}
            <div className="mt-2 px-3 py-1.5 bg-slate-900/80 rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[15px] text-emerald-400">lock</span>
                    <span>Koneksi peer-to-peer terenkripsi TLS 1.3 standar medis.</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <span>Kamera/audio bermasalah?</span>
                    <a
                        href={rawMeetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-0.5 ml-1"
                    >
                        <span>Buka di Tab Baru</span>
                        <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                </div>
            </div>
        </div>,
        document.body
    );
}

