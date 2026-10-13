import React, { useState, useEffect } from 'react';

/**
 * PwaInstallPrompt
 * Notifikasi rekomendasi instalasi PWA yang ringkas, ramping, dan elegan (horizontal compact card).
 * Selaras dengan tema AEVYRA (Emerald #00433e, minimalis, dan tidak mengganggu alur pengguna).
 */
export default function PwaInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [showIosGuide, setShowIosGuide] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // 1. Cek apakah sudah berjalan dalam mode standalone (aplikasi sudah terpasang)
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;

        if (isStandalone) {
            setIsInstalled(true);
            return;
        }

        // 2. Cek apakah pengguna sudah pernah menginstal
        if (localStorage.getItem('aevyra_pwa_installed') === 'true') {
            setIsInstalled(true);
            return;
        }

        // 3. Cek preferensi dismiss (cooldown 7 hari)
        const dismissedAt = localStorage.getItem('aevyra_pwa_dismissed_at');
        if (dismissedAt) {
            const daysSinceDismissed = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) {
                return;
            }
        }

        // 4. Deteksi perangkat iOS (Safari)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
        setIsIos(isIosDevice);

        // 5. Listener event standard beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);

            setTimeout(() => {
                if (!window.location.pathname.includes('/member/scanner')) {
                    setIsVisible(true);
                }
            }, 3000);
        };

        // 6. Listener custom event ladumor pwa-installable
        const handleCustomInstallable = (e) => {
            if (e?.detail?.prompt) {
                setDeferredPrompt(e.detail.prompt);
                setTimeout(() => {
                    if (!window.location.pathname.includes('/member/scanner')) {
                        setIsVisible(true);
                    }
                }, 3000);
            }
        };

        // 7. Listener saat aplikasi berhasil dipasang
        const handleAppInstalled = () => {
            setIsVisible(false);
            setIsInstalled(true);
            localStorage.setItem('aevyra_pwa_installed', 'true');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('pwa-installable', handleCustomInstallable);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Fallback untuk iOS
        if (isIosDevice && !isStandalone) {
            const iosTimer = setTimeout(() => {
                if (!window.location.pathname.includes('/member/scanner')) {
                    setIsVisible(true);
                }
            }, 4500);
            return () => {
                clearTimeout(iosTimer);
                window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
                window.removeEventListener('pwa-installable', handleCustomInstallable);
                window.removeEventListener('appinstalled', handleAppInstalled);
            };
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('pwa-installable', handleCustomInstallable);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIos) {
            setShowIosGuide(!showIosGuide);
            return;
        }

        if (!deferredPrompt) {
            if (window.laravelPwaInstall && typeof window.laravelPwaInstall.showPrompt === 'function') {
                window.laravelPwaInstall.showPrompt();
            }
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setIsVisible(false);
                localStorage.setItem('aevyra_pwa_installed', 'true');
            } else {
                handleDismiss();
            }
            setDeferredPrompt(null);
        } catch {
            setIsVisible(false);
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setShowIosGuide(false);
        try {
            localStorage.setItem('aevyra_pwa_dismissed_at', Date.now().toString());
        } catch {}
    };

    if (!isVisible || isInstalled) {
        return null;
    }

    return (
        <aside
            aria-label="Saran Instalasi Aplikasi AEVYRA"
            className="fixed bottom-4 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 animate-fade-in"
        >
            <div className="bg-white/95 dark:bg-surface/95 backdrop-blur-md rounded-2xl border border-primary/20 shadow-xl shadow-black/5 p-3 sm:py-2.5 sm:px-3.5 max-w-sm sm:max-w-md transition-all">
                {/* Horizontal Slim Content */}
                <div className="flex items-center gap-3">
                    {/* Clean Icon Logo */}
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 p-1">
                        <img
                            src="/image/Logo_AEVYRA_Icon.png"
                            alt="AEVYRA"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Text Body */}
                    <div className="min-w-0 flex-1">
                        <p className="font-heading font-bold text-xs text-primary leading-tight truncate">
                            Instal Aplikasi AEVYRA
                        </p>
                        <p className="text-[11px] text-on-surface-variant leading-tight truncate mt-0.5">
                            Akses cepat langsung dari layar utama Anda.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        <button
                            type="button"
                            onClick={handleInstallClick}
                            className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[15px]">
                                {isIos ? 'help' : 'download'}
                            </span>
                            <span>{isIos ? 'Info' : 'Instal'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="w-7 h-7 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container flex items-center justify-center transition-colors cursor-pointer"
                            title="Tutup"
                            aria-label="Tutup"
                        >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                    </div>
                </div>

                {/* iOS Safari Guide (Collapsible) */}
                {showIosGuide && (
                    <div className="mt-2.5 pt-2 border-t border-surface-container text-[11px] text-on-surface-variant space-y-1">
                        <p className="font-semibold text-primary">Cara Pasang di Safari iOS:</p>
                        <p>1. Tekan tombol <strong>Bagikan (Share)</strong> di menu bawah Safari.</p>
                        <p>2. Pilih <strong>&quot;Tambahkan ke Layar Utama&quot;</strong> lalu tekan Tambah.</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
