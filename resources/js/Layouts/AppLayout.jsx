import React, { useState, useEffect } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import EmergencyModal from '../Components/EmergencyModal';
import QuickLogModal from '../Components/QuickLogModal';
import LiveCameraScannerModal from '../Components/LiveCameraScannerModal';
import MembershipTierModal from '../Components/MembershipTierModal';
import MemberFloatingAiChat from '../Components/MemberFloatingAiChat';
import AppSidebar from '../Components/Sidebar/AppSidebar';

export default function AppLayout({ children, title, activeTab }) {
    const page = usePage();
    const { auth, flash } = page.props;
    const pageUrl = page.url || '';
    const user = auth?.user;
    const roles = auth?.roles || [];
    const isMember = roles.includes('member') || (!roles.includes('admin') && !roles.includes('instructor'));
    const isInstructor = roles.includes('instructor');
    const isAdmin = roles.includes('admin');

    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
    const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [isTierModalOpen, setIsTierModalOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isAiChatOpen, setIsAiChatOpen] = useState(false);

    useEffect(() => {
        const handleOpenAiChat = () => setIsAiChatOpen(true);
        window.addEventListener('open-ai-chat', handleOpenAiChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenAiChat);
    }, []);

    useEffect(() => {
        if (pageUrl.includes('chat=ai') || pageUrl.includes('open_ai_chat=1')) {
            setIsAiChatOpen(true);
        }
    }, [pageUrl]);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen w-full max-w-full bg-[#f7faf8] text-on-surface flex font-sans antialiased selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
            
            {/* Ambient Background Soft Blobs */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden contain-paint">
                <div className="absolute -top-32 left-1/4 w-150 h-80 bg-linear-to-b from-[#e3f0e9]/50 to-transparent blur-3xl rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-120 h-100 bg-[#f4ebe1]/30 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-10 left-1/3 w-130 h-80 bg-linear-to-t from-[#e3f0e9]/40 to-transparent blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
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
            <div className="lg:pl-72 flex-1 flex flex-col min-h-screen min-w-0 w-full max-w-full relative z-10">
                
                {/* Top Header Bar - HANYA untuk mobile (< lg). Di desktop (lg), navbar dihapus karena menggunakan sidebar permanen */}
                <header className="lg:hidden sticky top-0 z-30 h-14 bg-white/90 dark:bg-surface/90 backdrop-blur-md border-b border-surface-container flex items-center justify-between px-3 sm:px-4 min-w-0 w-full">
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
                        <button
                            type="button"
                            onClick={() => setIsEmergencyOpen(true)}
                            className="flex items-center gap-1 py-1 px-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold shadow-2xs transition-transform active:scale-95 cursor-pointer shrink-0"
                            title="Akses Darurat 119 Tanpa AI"
                        >
                            <span className="material-symbols-outlined text-[15px]">e911_emergency</span>
                            <span>SOS 119</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsAiChatOpen(true)}
                            className="w-8 h-8 rounded-full bg-[#008069] text-white flex items-center justify-center font-bold text-xs shadow-xs cursor-pointer active:scale-95"
                            title="Buka Chat AI WhatsApp"
                        >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                        </button>
                    </div>
                </header>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                        <div className="p-3.5 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 text-xs font-semibold rounded-2xl border border-emerald-500/30 flex items-center gap-2 shadow-2xs">
                            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}
                {flash?.error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                        <div className="p-3.5 bg-rose-500/10 text-rose-900 dark:text-rose-200 text-xs font-semibold rounded-2xl border border-rose-500/30 flex items-center gap-2 shadow-2xs">
                            <span className="material-symbols-outlined text-[18px] text-rose-600">error</span>
                            <span>{flash.error}</span>
                        </div>
                    </div>
                )}

                {/* Main Content View with mobile bottom bar padding */}
                <main className="flex-1 w-full pb-24 lg:pb-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-surface-container py-6 mb-16 lg:mb-0 bg-white/50 dark:bg-surface/50 text-xs text-on-surface-variant">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="font-medium text-center sm:text-left">
                            © 2026 AEVYRA — Platform Kesehatan Preventif Berbasis Perilaku & Intervensi Dini.
                        </p>
                        <div className="flex items-center gap-4 text-[11px]">
                            <span>UU PDP No. 27/2022 Patuh</span>
                            <span>•</span>
                            <span>Non-Diagnostik</span>
                            <span>•</span>
                            <span>SPGDT 119 Terhubung</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Native Mobile Bottom Navigation Bar (Visible on mobile/tablet < lg) */}
            <nav 
                className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-surface/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_25px_rgba(0,67,62,0.08)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
                aria-label="Navigasi Bawah Mobile"
            >
                <div className="flex items-center justify-around max-w-lg mx-auto">
                    {isMember ? (
                        <>
                            {/* 1. Dashboard / Beranda */}
                            <Link
                                href="/member/dashboard"
                                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                                    activeTab === 'dashboard'
                                        ? 'text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <div className="relative flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">
                                        monitoring
                                    </span>
                                    {activeTab === 'dashboard' && (
                                        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className="text-[10px] mt-0.5 tracking-tight font-medium">Beranda</span>
                            </Link>

                            {/* 2. Timeline / Riwayat */}
                            <Link
                                href="/member/timeline"
                                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                                    activeTab === 'timeline'
                                        ? 'text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <div className="relative flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">
                                        history_edu
                                    </span>
                                    {activeTab === 'timeline' && (
                                        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className="text-[10px] mt-0.5 tracking-tight font-medium">Riwayat</span>
                            </Link>

                            {/* 3. Center Elevated Action Button: AI Health Scanner */}
                            <div className="flex flex-col items-center justify-center flex-1 -mt-6">
                                <Link
                                    href="/member/scanner"
                                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-primary to-[#006059] text-white shadow-lg shadow-primary/30 border-3 border-white dark:border-surface active:scale-90 transition-transform ${
                                        activeTab === 'scanner' ? 'ring-2 ring-primary ring-offset-1' : ''
                                    }`}
                                    title="Pindai Gizi & BPOM OCR"
                                >
                                    <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                                </Link>
                                <span className={`text-[10px] mt-1 font-bold ${activeTab === 'scanner' ? 'text-primary' : 'text-primary'}`}>
                                    Scan AI
                                </span>
                            </div>

                            {/* 4. Konsultasi Klinis */}
                            <Link
                                href="/member/consultations-hub"
                                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                                    activeTab === 'consultations' || activeTab === 'instructors'
                                        ? 'text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <div className="relative flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">
                                        support_agent
                                    </span>
                                    {(activeTab === 'consultations' || activeTab === 'instructors') && (
                                        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className="text-[10px] mt-0.5 tracking-tight font-medium">Konsultasi</span>
                            </Link>

                            {/* 5. Menu Drawer / Opsi Lengkap */}
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                                    sidebarOpen || ['challenges', 'community', 'arcade', 'onboarding'].includes(activeTab)
                                        ? 'text-primary font-bold'
                                        : 'text-on-surface-variant hover:text-on-surface'
                                }`}
                                aria-label="Buka Menu Lengkap"
                            >
                                <div className="relative flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[22px]">
                                        grid_view
                                    </span>
                                    {['challenges', 'community', 'arcade', 'onboarding'].includes(activeTab) && (
                                        <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                                    )}
                                </div>
                                <span className="text-[10px] mt-0.5 tracking-tight font-medium">Menu</span>
                            </button>
                        </>
                    ) : isInstructor ? (
                        <>
                            {/* Instructor Bottom Nav */}
                            <Link
                                href="/instructor/dashboard"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                                <span className="text-[10px] mt-0.5">Caseload</span>
                            </Link>
                            <Link
                                href="/instructor/members"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'members' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">groups</span>
                                <span className="text-[10px] mt-0.5">Member</span>
                            </Link>
                            <div className="flex flex-col items-center justify-center flex-1 -mt-6">
                                <Link
                                    href="/instructor/interventions"
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-primary to-[#006059] text-white shadow-lg shadow-primary/30 border-3 border-white dark:border-surface active:scale-90 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
                                </Link>
                                <span className="text-[10px] font-bold text-primary mt-1">Intervensi</span>
                            </div>
                            <Link
                                href="/instructor/consultations"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'consultations' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                                <span className="text-[10px] mt-0.5">Jadwal</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="flex flex-col items-center justify-center flex-1 py-1 text-on-surface-variant hover:text-primary cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[22px]">grid_view</span>
                                <span className="text-[10px] mt-0.5">Menu</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Admin Bottom Nav */}
                            <Link
                                href="/admin/dashboard"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'admin' || activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">dashboard</span>
                                <span className="text-[10px] mt-0.5">Admin</span>
                            </Link>
                            <Link
                                href="/admin/users"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'users' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">group</span>
                                <span className="text-[10px] mt-0.5">Users</span>
                            </Link>
                            <div className="flex flex-col items-center justify-center flex-1 -mt-6">
                                <Link
                                    href="/admin/scanner"
                                    className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-primary to-[#006059] text-white shadow-lg shadow-primary/30 border-3 border-white dark:border-surface active:scale-90 transition-transform"
                                >
                                    <span className="material-symbols-outlined text-[24px]">document_scanner</span>
                                </Link>
                                <span className="text-[10px] font-bold text-primary mt-1">Scanner</span>
                            </div>
                            <Link
                                href="/admin/reports"
                                className={`flex flex-col items-center justify-center flex-1 py-1 ${activeTab === 'reports' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
                            >
                                <span className="material-symbols-outlined text-[22px]">analytics</span>
                                <span className="text-[10px] mt-0.5">Laporan</span>
                            </Link>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="flex flex-col items-center justify-center flex-1 py-1 text-on-surface-variant hover:text-primary cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[22px]">grid_view</span>
                                <span className="text-[10px] mt-0.5">Menu</span>
                            </button>
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
                currentTier="Gold"
            />

            {/* Authenticated Member WhatsApp AI Chat Drawer */}
            {isMember && (
                <MemberFloatingAiChat
                    isOpen={isAiChatOpen}
                    onClose={() => setIsAiChatOpen(false)}
                />
            )}
        </div>
    );
}
