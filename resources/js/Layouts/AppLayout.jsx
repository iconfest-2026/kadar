import React, { useState, useEffect } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import EmergencyModal from '../Components/EmergencyModal';
import QuickLogModal from '../Components/QuickLogModal';
import LiveCameraScannerModal from '../Components/LiveCameraScannerModal';
import MembershipTierModal from '../Components/MembershipTierModal';
import MemberFloatingAiChat from '../Components/MemberFloatingAiChat';
import AppSidebar from '../Components/Sidebar/AppSidebar';
import LogoutConfirmModal from '../Components/LogoutConfirmModal';
import NotificationDropdown from '../Components/NotificationDropdown';
import Alert from '../Components/UI/Alert';

export default function AppLayout({ children, title, activeTab }) {

    const page = usePage();
    const { auth, flash, membership } = page.props;
    const pageUrl = page.url || '';
    const user = auth?.user;
    const roles = auth?.roles || [];
    const isMember = roles.includes('member') || (!roles.includes('admin') && !roles.includes('instructor'));
    const isInstructor = roles.includes('instructor');
    const isAdmin = roles.includes('admin');

    const currentTierName = membership?.current_tier || 'Silver';
    const currentTierSlug = membership?.current_tier_slug || 'silver';
    const activeTiers = membership?.active_tiers || [];

    const currentTierObj = activeTiers.find((t) =>
        (t.slug && currentTierSlug && t.slug.toLowerCase() === currentTierSlug.toLowerCase()) ||
        (t.name && currentTierName && t.name.toLowerCase() === currentTierName.toLowerCase()) ||
        (t.id && membership?.tier_id && t.id === membership.tier_id)
    ) || null;

    const scannerQuotaText = currentTierObj
        ? (currentTierObj.max_scanner === -1 ? 'Unlimited scan kamera gizi' : (currentTierObj.max_scanner > 0 ? `${currentTierObj.max_scanner}x scan kamera gizi / hari` : 'Skrining dasar'))
        : (membership?.max_scanner === -1 ? 'Unlimited scan kamera gizi' : (membership?.max_scanner > 0 ? `${membership.max_scanner}x scan kamera gizi / hari` : '10x scan gizi / hari'));

    const consultationQuotaText = currentTierObj
        ? (currentTierObj.max_consultations === -1 ? 'konsultasi dokter tanpa batas' : (currentTierObj.max_consultations > 0 ? `${currentTierObj.max_consultations} sesi konsultasi dokter / bln` : 'tanpa kuota konsultasi'))
        : (membership?.max_consultations === -1 ? 'konsultasi dokter tanpa batas' : (membership?.max_consultations > 0 ? `${membership.max_consultations} sesi konsultasi dokter / bln` : 'tanpa kuota konsultasi'));

    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
    const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isTierModalOpen, setIsTierModalOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenAiChat = () => setIsAiChatOpen(true);
        const handleOpenLogout = () => setIsLogoutModalOpen(true);
        window.addEventListener('open-ai-chat', handleOpenAiChat);
        window.addEventListener('open-logout-modal', handleOpenLogout);
        return () => {
            window.removeEventListener('open-ai-chat', handleOpenAiChat);
            window.removeEventListener('open-logout-modal', handleOpenLogout);
        };
    }, []);

    useEffect(() => {
        if (pageUrl.includes('chat=ai') || pageUrl.includes('open_ai_chat=1')) {
            setIsAiChatOpen(true);
        }
        if (typeof window !== 'undefined' && (window.location.hash === '#ambulance' || pageUrl.includes('#ambulance'))) {
            setIsEmergencyOpen(true);
        }
    }, [pageUrl]);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    return (
        <div className="min-h-screen w-full max-w-full bg-[#f7faf8] text-on-surface flex font-sans antialiased selection:bg-primary selection:text-on-primary relative overflow-x-clip">
            
            {/* Ambient Background Soft Blobs */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden contain-paint">
                <div className="absolute -top-32 left-1/4 w-150 h-80 bg-linear-to-b from-[#e3f0e9]/50 to-transparent blur-3xl rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-120 h-100 bg-[#f4ebe1]/30 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-10 left-1/3 w-130 h-80 bg-linear-to-t from-[#e3f0e9]/40 to-transparent blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Modular Sidebar Component */}
            <AppSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                user={user}
                roles={roles}
                activeTab={activeTab}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                onOpenQuickLog={() => setIsQuickLogOpen(true)}
                onOpenScanner={() => setIsScannerOpen(true)}
                onOpenTierModal={() => setIsTierModalOpen(true)}
                onOpenAiChat={() => setIsAiChatOpen(true)}
                onLogout={handleLogout}
            />

            {/* Main Application Shell (Shifted for sidebar on desktop) */}
            <div className="lg:pl-64 flex-1 flex flex-col min-h-screen min-w-0 w-full max-w-full relative">
                
                {/* Top Header Bar - HANYA untuk mobile (< lg). Di desktop (lg), navbar dihapus karena menggunakan sidebar permanen */}
                <header className="lg:hidden sticky top-0 z-20 h-14 bg-white/90 dark:bg-surface/90 backdrop-blur-md border-b border-surface-container flex items-center justify-between px-3 sm:px-4 min-w-0 w-full">
                    {/* Left: Mobile Toggle & Page Title */}
                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="p-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
                            aria-label="Buka Menu Sidebar"
                        >
                            <span className="material-symbols-outlined text-[24px]">menu</span>
                        </button>

                        <div className="min-w-0">
                            <span className="text-[9px] font-label-mono font-bold uppercase text-primary tracking-wider block truncate">
                                AEVYRA Platform
                            </span>
                            <h2 className="font-heading font-black text-sm text-on-surface leading-tight truncate">
                                {title || 'Dashboard'}
                            </h2>
                        </div>
                    </div>

                    {/* Right: Quick Action & SOS */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        <NotificationDropdown align="right" />
                        <button
                            type="button"
                            onClick={() => setIsEmergencyOpen(true)}
                            className="flex items-center gap-1 py-1 px-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                            title="Akses Darurat 119 Tanpa AI"
                        >
                            <span className="material-symbols-outlined text-[15px]">e911_emergency</span>
                            <span>SOS 119</span>
                        </button>
                    </div>
                </header>

                {/* Mobile Header Spacer to prevent content from hiding underneath fixed header */}
                <div className="lg:hidden h-14 shrink-0" aria-hidden="true" />

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                        <Alert variant="success" dismissible>
                            {flash.success}
                        </Alert>
                    </div>
                )}
                {flash?.error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                        <Alert variant="destructive" dismissible>
                            {flash.error}
                        </Alert>
                    </div>
                )}

                {/* Main Content View */}
                <main className="flex-1 w-full pb-4 lg:pb-6">
                    {children}
                </main>

                {/* Footer (Compact Mobile-Friendly with clearance for fixed bottom nav) */}
                <footer className="border-t border-surface-container/60 py-3.5 mb-24 lg:mb-0 bg-white/40 dark:bg-surface/40 text-[10px] text-on-surface-variant/75">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                        <p className="font-medium text-[10.5px] text-center">
                            © 2026 AEVYRA • Platform Kesehatan Preventif
                        </p>
                    </div>
                </footer>
            </div>

            {/* Native Mobile Bottom Navigation Bar (Visible on mobile/tablet < lg) */}
            <nav 
                className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-white/95 dark:bg-surface/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_25px_rgba(0,67,62,0.08)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
                aria-label="Navigasi Bawah Mobile"
            >
                <div className="flex items-center justify-around max-w-lg mx-auto">
                    {isInstructor ? (
                        <>
                            {/* Instructor Bottom Nav */}
                            <Link
                                href="/instructor/dashboard"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'dashboard'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        dashboard
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Caseload
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/instructor/members"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'members'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        groups
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Member
                                    </span>
                                </div>
                            </Link>

                            <div className="group flex flex-col items-center justify-center flex-1 -mt-5">
                                <Link
                                    href="/instructor/interventions"
                                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center bg-linear-to-br from-emerald-600 via-primary to-[#004d46] text-white shadow-[0_10px_22px_-2px_rgba(0,67,62,0.38)] border-2 border-white dark:border-surface transition-all duration-300 cursor-pointer active:scale-95 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-primary/50 ${
                                        activeTab === 'interventions' ? 'ring-3 ring-emerald-500/40 ring-offset-2 ring-offset-white dark:ring-offset-surface scale-105' : ''
                                    }`}
                                    title="Manajemen Intervensi Klinis"
                                >
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/15 to-white/20 pointer-events-none" />
                                    <span className="material-symbols-outlined text-[23px] transition-transform duration-300 group-hover:scale-110 relative z-10">
                                        clinical_notes
                                    </span>
                                </Link>
                                <span className="text-[10px] mt-1 font-bold text-primary tracking-tight transition-colors duration-200 group-hover:text-emerald-700">
                                    Intervensi
                                </span>
                            </div>

                            <Link
                                href="/instructor/consultations"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'consultations'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        calendar_month
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Jadwal
                                    </span>
                                </div>
                            </Link>

                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div className="w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6">
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        grid_view
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight font-medium group-hover:text-primary transition-colors duration-200">
                                        Menu
                                    </span>
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Member & Public Bottom Nav */}
                            <Link
                                href="/member/dashboard"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'dashboard'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        monitoring
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Beranda
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/member/timeline"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'timeline'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        history_edu
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Riwayat
                                    </span>
                                </div>
                            </Link>

                            {/* Center Elevated Action: Scan AI */}
                            <div className="group flex flex-col items-center justify-center flex-1 -mt-5">
                                <Link
                                    href="/member/scanner"
                                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center bg-linear-to-br from-emerald-600 via-primary to-[#004d46] text-white shadow-[0_10px_22px_-2px_rgba(0,67,62,0.38)] border-2 border-white dark:border-surface transition-all duration-300 cursor-pointer active:scale-95 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-primary/50 group-hover:from-emerald-500 group-hover:to-primary ${
                                        activeTab === 'scanner'
                                            ? 'ring-3 ring-emerald-500/40 ring-offset-2 ring-offset-white dark:ring-offset-surface scale-105'
                                            : ''
                                    }`}
                                    title="Pindai Gizi & BPOM OCR (AI Scanner)"
                                >
                                    {/* Subtle internal glass sheen */}
                                    <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/15 to-white/20 pointer-events-none" />

                                    {/* Camera icon with hover scale */}
                                    <span className="material-symbols-outlined text-[24px] transition-transform duration-300 group-hover:scale-110 relative z-10">
                                        photo_camera
                                    </span>
                                </Link>
                                <span className={`text-[10px] mt-1 font-bold tracking-tight transition-colors duration-200 flex items-center gap-0.5 ${
                                    activeTab === 'scanner' ? 'text-primary' : 'text-primary/90 group-hover:text-primary group-hover:scale-105'
                                }`}>
                                    Scan AI
                                </span>
                            </div>

                            <Link
                                href="/member/consultations-hub"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'consultations' || activeTab === 'instructors'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        support_agent
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Konsultasi
                                    </span>
                                </div>
                            </Link>

                            <Link
                                href="/member/menu"
                                className="group flex flex-col items-center justify-center flex-1 py-0.5 transition-all cursor-pointer"
                                aria-label="Menu & Profil Lengkap"
                            >
                                <div
                                    className={`w-full max-w-17 px-1.5 py-1 rounded-2xl transition-all duration-200 flex flex-col items-center justify-center ${
                                        activeTab === 'menu' || activeTab === 'onboarding' || activeTab === 'profile'
                                            ? 'bg-primary/10 border border-primary/20 text-primary shadow-xs font-bold'
                                            : 'text-on-surface-variant/80 group-hover:text-primary group-hover:bg-primary/6'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[21px] transition-transform duration-200 group-hover:-translate-y-0.5">
                                        grid_view
                                    </span>
                                    <span className="text-[10px] mt-0.5 tracking-tight transition-colors duration-200">
                                        Menu
                                    </span>
                                </div>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Emergency Modal */}
            <EmergencyModal
                isOpen={isEmergencyOpen}
                onClose={() => setIsEmergencyOpen(false)}
            />

            {/* Quick Log Modal */}
            <QuickLogModal
                isOpen={isQuickLogOpen}
                onClose={() => setIsQuickLogOpen(false)}
            />

            {/* Scanner Open Cam Modal */}
            <LiveCameraScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
            />

            {/* Membership Tier Modal */}
            <MembershipTierModal
                isOpen={isTierModalOpen}
                onClose={() => setIsTierModalOpen(false)}
                currentTier={currentTierName}
                availableTiers={activeTiers}
            />

            {/* Authenticated Member WhatsApp AI Chat Drawer */}
            {isMember && (
                <MemberFloatingAiChat
                    isOpen={isAiChatOpen}
                    onClose={() => setIsAiChatOpen(false)}
                />
            )}

            {/* Logout Confirmation Alert / Modal */}
            <LogoutConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                userRole={isMember ? 'Member' : (isInstructor ? 'Instruktur' : (isAdmin ? 'Admin' : undefined))}
            />
        </div>
    );
}
