import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import LogoutConfirmModal from '../Components/LogoutConfirmModal';
import NotificationDropdown from '../Components/NotificationDropdown';
import Alert from '../Components/UI/Alert';

export default function InstructorLayout({ children, title, activeNav }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const userStatus = user?.status || 'ACTIVE';

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setUserMenuOpen(false);
        setIsLogoutModalOpen(true);
    };

    const navSections = [
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
                { id: 'chat', name: 'Ruang Chat Pasien', href: '/instructor/chat', icon: 'forum', badge: 'Live' },
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
        {
            title: 'Pengaturan & Akun',
            items: [
                { id: 'account', name: 'Pengaturan Akun & Google', href: '/instructor/account', icon: 'manage_accounts' },
                { id: 'profile', name: 'Profil & Kredensial Medis', href: '/instructor/profile', icon: 'badge' },
            ],
        },
    ];

    const renderStatusBadge = (status) => {
        if (status === 'ACTIVE') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>TERVERIFIKASI IDI</span>
                </span>
            );
        }
        if (status === 'PENDING') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>MENUNGGU REVIEW STR</span>
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>DITANGGUHKAN</span>
            </span>
        );
    };

    return (
        <div className="min-h-screen w-full max-w-full bg-[#f7faf8] text-on-surface flex font-sans antialiased selection:bg-primary selection:text-on-primary relative overflow-x-clip">
            <Head title={title ? `${title} - Panel Instruktur AEVYRA` : 'Instruktur Panel - AEVYRA'} />

            {/* Ambient Background Soft Blobs */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden contain-paint">
                <div className="absolute -top-32 left-1/4 w-150 h-80 bg-linear-to-b from-[#e3f0e9]/50 to-transparent blur-3xl rounded-full pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-120 h-100 bg-[#f4ebe1]/30 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-10 left-1/3 w-130 h-80 bg-linear-to-t from-[#e3f0e9]/40 to-transparent blur-3xl rounded-full pointer-events-none" />
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[calc(100vw-3rem)] bg-white dark:bg-surface border-r border-surface-container flex flex-col transition-transform duration-300 shadow-sm lg:translate-x-0 ${
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="h-16 flex items-center justify-between px-5 border-b border-surface-container shrink-0">
                    <Link href="/instructor/dashboard" className="flex items-center gap-2 group min-w-0">
                        <img
                            src="/image/Logo_EVYRA_Horizontal.png"
                            alt="AEVYRA Healthcare"
                            className="h-7 sm:h-7.5 w-auto object-contain shrink-0 group-hover:opacity-90 transition-opacity"
                        />
                        <span className="px-1.5 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary shrink-0">
                            INSTRUKTUR
                        </span>
                    </Link>

                    <button 
                        type="button"
                        className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Tutup Menu"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Instructor Profile Card in Sidebar */}
                <div className="p-4 mx-3 mt-3 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5 shrink-0">
                    <Link href="/instructor/account" className="flex items-center gap-2.5 min-w-0 group hover:opacity-85 transition-opacity" title="Buka Pengaturan Akun">
                        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 group-hover:bg-primary-container transition-colors overflow-hidden">
                            {user?.avatar_url ? (
                                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0) || 'D'
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">{user?.name || 'Dokter Pendamping'}</p>
                            <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70 group-hover:text-primary transition-colors">chevron_right</span>
                    </Link>

                    <div className="flex items-center justify-between pt-1 border-t border-surface-container/80 text-[10px]">
                        <span className="text-on-surface-variant font-medium">Status Akun:</span>
                        {renderStatusBadge(userStatus)}
                    </div>
                </div>

                {/* Categorized Nav Links */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
                    {navSections.map((sec, idx) => (
                        <div key={idx} className="space-y-1">
                            <span className="px-3 text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant block">
                                {sec.title}
                            </span>
                            <div className="space-y-0.5">
                                {sec.items.map((item) => {
                                    const isActive = activeNav === item.id;
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
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

                    {/* Clinical Responsibility Guide Callout */}
                    <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                            <span className="font-heading font-black text-xs text-on-surface">
                                Panduan Etik Medis
                            </span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                            Intervensi bersifat bimbingan perilaku preventif. Selalu jaga kerahasiaan riwayat biologis member.
                        </p>
                    </div>
                </div>

                {/* Sidebar Footer Utilities */}
                <div className="p-3 border-t border-surface-container space-y-2 shrink-0 bg-white dark:bg-surface">
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

            {/* Main Content Area */}
            <div className="lg:pl-72 flex-1 flex flex-col min-h-screen min-w-0 w-full max-w-full relative z-10">
                
                {/* Top Header Bar */}
                <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-surface/80 backdrop-blur-md border-b border-surface-container flex items-center justify-between px-3 sm:px-6 lg:px-8 min-w-0 w-full">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer shrink-0"
                            aria-label="Buka Menu Sidebar"
                        >
                            <span className="material-symbols-outlined text-[24px]">menu</span>
                        </button>
                        <div className="min-w-0">
                            <span className="text-[10px] font-label-mono font-bold uppercase text-primary tracking-wider hidden sm:block truncate">
                                Portal Tenaga Medis Pendamping
                            </span>
                            <h2 className="font-heading font-black text-sm sm:text-base md:text-lg text-on-surface leading-tight truncate">
                                {title || 'Caseload & Bimbingan'}
                            </h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                        {/* Status Pill in Topbar */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-xl border border-surface-container text-xs shrink-0">
                            <span className="text-[11px] font-medium text-on-surface-variant">Kredensial STR:</span>
                            {renderStatusBadge(userStatus)}
                        </div>

                        {/* Notification Bell Dropdown */}
                        <NotificationDropdown align="right" />

                        {/* User Dropdown */}
                        <div className="relative shrink-0">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-surface-container transition-all cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary overflow-hidden shrink-0">
                                    {user?.avatar_url ? (
                                        <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        user?.name?.charAt(0) || 'D'
                                    )}
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                                    expand_more
                                </span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface rounded-2xl shadow-xl border border-surface-container py-2 z-50 animate-scale-up">
                                    <div className="px-4 py-2 border-b border-surface-container">
                                        <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                                        <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className="inline-block px-1.5 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary">
                                                Instruktur Medis
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/instructor/chat"
                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-[16px] text-primary">forum</span>
                                        <span>Ruang Chat Pasien</span>
                                    </Link>
                                    <Link
                                        href="/instructor/consultations"
                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                                        <span>Jadwal Konsultasi Saya</span>
                                    </Link>
                                    <Link
                                        href="/instructor/reports"
                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-[16px] text-primary">monitoring</span>
                                        <span>Laporan Klinis Kohort</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2 cursor-pointer border-t border-surface-container mt-1 pt-2"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">logout</span>
                                        <span>Keluar Akun</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

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

                {/* Main Body */}
                <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="border-t border-surface-container py-5 mb-24 lg:mb-0 bg-white/50 dark:bg-surface/50 text-xs text-on-surface-variant">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="font-medium text-center sm:text-left">
                            © 2026 AEVYRA — Ruang Bimbingan Klinis & Human-in-the-Loop.
                        </p>
                        <div className="flex items-center gap-4 text-[11px]">
                            <span>Batas Yuridis Terisolasi</span>
                            <span>•</span>
                            <span>Pedoman PERKENI</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Native Mobile Bottom Navigation Bar (Visible on < lg screens) */}
            <nav 
                className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-surface/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_25px_rgba(0,67,62,0.08)] px-2 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]"
                aria-label="Navigasi Bawah Instruktur"
            >
                <div className="flex items-center justify-around max-w-lg mx-auto">
                    <Link
                        href="/instructor/dashboard"
                        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                            activeNav === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <div className="relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">dashboard</span>
                            {activeNav === 'dashboard' && (
                                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-[10px] mt-0.5 tracking-tight font-medium">Caseload</span>
                    </Link>

                    <Link
                        href="/instructor/members"
                        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                            activeNav === 'members' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <div className="relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">groups</span>
                            {activeNav === 'members' && (
                                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-[10px] mt-0.5 tracking-tight font-medium">Member</span>
                    </Link>

                    {/* Center Elevated Action: Rencana Intervensi */}
                    <div className="flex flex-col items-center justify-center flex-1 -mt-6">
                        <Link
                            href="/instructor/interventions"
                            className={`w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-tr from-primary to-[#006059] text-white shadow-lg shadow-primary/30 border-3 border-white dark:border-surface active:scale-90 transition-transform ${
                                activeNav === 'interventions' ? 'ring-2 ring-primary ring-offset-1' : ''
                            }`}
                            title="Rencana Intervensi Klinis"
                        >
                            <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
                        </Link>
                        <span className="text-[10px] mt-1 font-bold text-primary">Intervensi</span>
                    </div>

                    <Link
                        href="/instructor/consultations"
                        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
                            activeNav === 'consultations' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <div className="relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                            {activeNav === 'consultations' && (
                                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-[10px] mt-0.5 tracking-tight font-medium">Jadwal</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                            mobileMenuOpen || activeNav === 'reports' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                        aria-label="Buka Menu Lengkap"
                    >
                        <div className="relative flex items-center justify-center">
                            <span className="material-symbols-outlined text-[22px]">grid_view</span>
                            {activeNav === 'reports' && (
                                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                        </div>
                        <span className="text-[10px] mt-0.5 tracking-tight font-medium">Menu</span>
                    </button>
                </div>
            </nav>

            {/* Logout Confirmation Alert / Modal */}
            <LogoutConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                userRole="Instruktur"
            />
        </div>
    );
}
