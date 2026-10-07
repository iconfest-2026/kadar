import React, { useState, useEffect } from 'react';
import { Link, usePage, router, Head } from '@inertiajs/react';
import EmergencyModal from '../Components/EmergencyModal';
import QuickLogModal from '../Components/QuickLogModal';
import LiveCameraScannerModal from '../Components/LiveCameraScannerModal';
import MembershipTierModal from '../Components/MembershipTierModal';
import MemberFloatingAiChat from '../Components/MemberFloatingAiChat';

export default function AppLayout({ children, title, activeTab }) {
    const { auth, flash, membership } = usePage().props;
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
        : (membership?.max_consultations === -1 ? 'konsultasi dokter tanpa batas' : (membership?.max_consultations > 0 ? `${membership.max_consultations} sesi konsultasi dokter / bln` : '1 sesi konsultasi dokter'));

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

    const handleLogout = () => {
        router.post('/logout');
    };

    const memberNavSections = [
        {
            title: 'Metabolisme & Biomarker',
            items: [
                { id: 'dashboard', name: 'Dashboard Baseline', href: '/member/dashboard', icon: 'monitoring', badge: 'HBE' },
                { id: 'scanner', name: 'Scanner Gizi & BPOM', href: '/member/scanner', icon: 'photo_camera', badge: 'OCR' },
                { id: 'timeline', name: 'Timeline & Riwayat', href: '/member/timeline', icon: 'history_edu' },
            ],
        },
        {
            title: 'Telemedisin & Tenaga Medis',
            items: [
                { id: 'consultations', name: 'Pusat Tele-Konsultasi', href: '/member/consultations-hub', icon: 'support_agent' },
                { id: 'instructors', name: 'Tim Dokter Pendamping', href: '/member/instructors', icon: 'medical_services' },
                { id: 'ai-consultation', name: 'Asisten AI', action: 'open_ai_chat', icon: 'smart_toy' },
                { id: 'emergency', name: 'Siaga Ambulans GPS', href: '/demo/emergency', icon: 'emergency', badge: '119' },
            ],
        },
        {
            title: 'Program & Komunitas',
            items: [
                { id: 'challenges', name: 'Tantangan Sehat', href: '/member/challenges', icon: 'emoji_events', badge: '14-90 H' },
                { id: 'community', name: 'Forum Komunitas', href: '/member/community', icon: 'groups' },
                { id: 'arcade', name: 'Game Edukasi 2D', href: '/arcade', icon: 'sports_esports' },
                { id: 'gender-vitality', name: 'Siklus & Vitalitas', href: '/demo/gender-vitality', icon: 'vital_signs', badge: 'AI' },
            ],
        },
        {
            title: 'Layanan & Bantuan',
            items: [
                { id: 'home', name: 'Beranda Utama Web', href: '/', icon: 'home', badge: 'Web' },
                { id: 'packages', name: 'Paket Langganan', href: '/paket', icon: 'workspace_premium', badge: currentTierName },
                { id: 'faq', name: 'Pusat Bantuan & FAQ', href: '/faq', icon: 'help_outline' },
            ],
        },
        {
            title: 'Pengaturan & Akun',
            items: [
                { id: 'onboarding', name: 'Profil & Gaya Hidup', href: '/member/onboarding', icon: 'tune' },
                { id: 'tier', name: 'Kelola Paket Member', action: 'tier_modal', icon: 'badge', badge: 'Aktif' },
            ],
        },
    ];

    const instructorNavSections = [
        {
            title: 'Pengawasan Caseload & Sinyal',
            items: [
                { id: 'dashboard', name: 'Dashboard Caseload', href: '/instructor/dashboard', icon: 'dashboard' },
                { id: 'members', name: 'Member Binaan', href: '/instructor/members', icon: 'groups', badge: 'Kohor' },
            ],
        },
        {
            title: 'Tindakan Klinis & Intervensi',
            items: [
                { id: 'interventions', name: 'Rencana Intervensi', href: '/instructor/interventions', icon: 'clinical_notes', badge: 'HBE' },
                { id: 'consultations', name: 'Jadwal Tele-Konsultasi', href: '/instructor/consultations', icon: 'calendar_month' },
            ],
        },
        {
            title: 'Evaluasi & Laporan',
            items: [
                { id: 'reports', name: 'Laporan Klinis & Kohort', href: '/instructor/reports', icon: 'monitoring', badge: 'Fitur 9' },
            ],
        },
    ];

    const adminNavSections = [
        {
            title: 'Tata Kelola Platform',
            items: [
                { id: 'admin', name: 'Tata Kelola & Audit', href: '/admin/dashboard', icon: 'dashboard' },
                { id: 'reports', name: 'Laporan & Ambulans', href: '/admin/reports', icon: 'analytics' },
            ],
        },
    ];

    const currentSections = isAdmin ? adminNavSections : isInstructor ? instructorNavSections : memberNavSections;

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

            {/* Sidebar Navigation */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[calc(100vw-3rem)] bg-white dark:bg-surface border-r border-surface-container flex flex-col transition-transform duration-300 shadow-sm lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-surface-container shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-2.5 group min-w-0">
                        <img 
                            src="/image/Logo_AEVYRA_Icon.png" 
                            alt="AEVYRA Logo" 
                            className="w-8 h-8 rounded-xl object-contain shadow-2xs group-hover:scale-105 transition-transform shrink-0" 
                        />
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="font-heading font-black text-lg text-primary tracking-tight">AEVYRA</span>
                                <span className="px-1.5 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary shrink-0">
                                    {isAdmin ? 'Admin' : isInstructor ? 'Instruktur' : 'Preventif'}
                                </span>
                            </div>
                        </div>
                    </Link>

                    <div className="flex items-center gap-1">
                        <Link 
                            href="/"
                            className="p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
                            title="Ke Beranda Web Utama"
                        >
                            <span className="material-symbols-outlined text-[19px]">home</span>
                        </Link>
                        <button 
                            type="button"
                            className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Tutup Menu"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Member Profile Widget */}
                {isMember && (
                    <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 shrink-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                                {user?.name?.charAt(0) || 'M'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-on-surface truncate">{user?.name || 'Member Sehat'}</p>
                                <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1.5 border-t border-surface-container/70 text-[11px]">
                            <button
                                type="button"
                                onClick={() => setIsTierModalOpen(true)}
                                className="inline-flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors cursor-pointer group min-w-0"
                                title="Lihat Status & Kelola Paket"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-semibold text-[10px] truncate text-on-surface group-hover:text-primary">
                                    {currentTierName}
                                </span>
                            </button>
                            <Link
                                href="/member/onboarding"
                                className="text-[10px] text-on-surface-variant hover:text-primary transition-colors shrink-0"
                            >
                                Edit Profil
                            </Link>
                        </div>
                    </div>
                )}

                {!isMember && user && (
                    <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-surface-container-low border border-surface-container space-y-2 shrink-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                                <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Action Buttons (Pindai Gizi & Catat Metrik - Dipindahkan dari Navbar) */}
                {isMember && (
                    <div className="px-3 pt-2.5 pb-1 grid grid-cols-2 gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsQuickLogOpen(true)}
                            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-primary hover:bg-[#005a54] text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                            title="Catat Glukosa, Tensi, Tidur, Langkah"
                        >
                            <span className="material-symbols-outlined text-[17px]">add</span>
                            <span>Catat Metrik</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsScannerOpen(true)}
                            className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer border border-surface-container"
                            title="Buka Kamera Pindai Cepat Gizi & BPOM"
                        >
                            <span className="material-symbols-outlined text-[17px]">photo_camera</span>
                            <span>Pindai Gizi</span>
                        </button>
                    </div>
                )}



                {/* Nav Links Feed */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
                    {currentSections.map((sec, idx) => (
                        <div key={idx} className="space-y-1">
                            <span className="px-3 text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant block">
                                {sec.title}
                            </span>
                            <div className="space-y-0.5">
                                {sec.items.map((item) => {
                                    const isActive = activeTab === item.id;
                                    if (item.action === 'open_ai_chat') {
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => {
                                                    setSidebarOpen(false);
                                                    setIsAiChatOpen(true);
                                                }}
                                                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all min-w-0 cursor-pointer text-left"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                    <span className="material-symbols-outlined text-[18px] shrink-0 text-primary">
                                                        {item.icon}
                                                    </span>
                                                    <span className="truncate">{item.name}</span>
                                                </div>
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 bg-surface-container text-on-surface-variant">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    }
                                    if (item.action === 'tier_modal') {
                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => {
                                                    setSidebarOpen(false);
                                                    setIsTierModalOpen(true);
                                                }}
                                                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-all min-w-0 cursor-pointer text-left"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                    <span className="material-symbols-outlined text-[18px] shrink-0 text-amber-600">
                                                        {item.icon}
                                                    </span>
                                                    <span className="truncate">{item.name}</span>
                                                </div>
                                                {item.badge && (
                                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 bg-surface-container text-on-surface-variant">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all min-w-0 ${
                                                isActive
                                                    ? 'bg-primary text-white font-bold shadow-2xs'
                                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                <span className={`material-symbols-outlined text-[18px] shrink-0 ${
                                                    isActive ? 'text-white' : 'text-primary'
                                                }`}>
                                                    {item.icon}
                                                </span>
                                                <span className="truncate">{item.name}</span>
                                            </div>

                                            {item.badge && (
                                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-mono shrink-0 ${
                                                    isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-surface-container text-on-surface-variant'
                                                }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Status Paket Minimalis (Member only) */}
                    {isMember && (
                        <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">workspace_premium</span>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold text-on-surface truncate leading-tight">
                                        Paket {currentTierName}
                                    </p>
                                    <p className="text-[10px] text-on-surface-variant truncate leading-tight">
                                        Status Aktif
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsTierModalOpen(true)}
                                className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-primary hover:bg-surface-container border border-surface-container transition-colors cursor-pointer shrink-0"
                            >
                                Kelola
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar Footer Utilities */}
                <div className="p-3 border-t border-surface-container space-y-2 shrink-0 bg-white dark:bg-surface">
                    {/* SOS Emergency Hotline Trigger */}
                    <button
                        type="button"
                        onClick={() => setIsEmergencyOpen(true)}
                        className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer animate-pulse"
                    >
                        <span className="material-symbols-outlined text-[17px]">e911_emergency</span>
                        <span>Hotline Siaga SOS 119</span>
                    </button>

                    {/* Logout Button */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-2 px-3 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        <span>Keluar Akun</span>
                    </button>
                </div>
            </aside>

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
                            className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs shadow-2xs cursor-pointer active:scale-95 border border-surface-container"
                            title="Asisten AI Preventif"
                            aria-label="Buka Asisten AI"
                        >
                            <span className="material-symbols-outlined text-[17px]">smart_toy</span>
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
                            © 2026 AEVYRA - Platform Kesehatan Preventif Berbasis Perilaku & Intervensi Dini.
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
        </div>
    );
}
