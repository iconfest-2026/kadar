import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function InstructorLayout({ children, title, activeNav }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const userStatus = user?.status || 'ACTIVE';

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const navItems = [
        { id: 'dashboard', name: 'Dashboard Caseload', href: '/instructor/dashboard', icon: 'dashboard' },
        { id: 'members', name: 'Member Binaan', href: '/instructor/members', icon: 'groups' },
        { id: 'interventions', name: 'Rencana Intervensi', href: '/instructor/interventions', icon: 'clinical_notes' },
        { id: 'consultations', name: 'Jadwal Konsultasi', href: '/instructor/consultations', icon: 'calendar_month' },
        { id: 'reports', name: 'Laporan Klinis & Kohort', href: '/instructor/reports', icon: 'monitoring' },
    ];

    const renderStatusBadge = (status) => {
        if (status === 'ACTIVE') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    TERVERIFIKASI
                </span>
            );
        }
        if (status === 'PENDING') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-amber-500/10 text-amber-800 border border-amber-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    MENUNGGU REVIEW
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-rose-500/10 text-rose-800 border border-rose-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                DITANGGUHKAN
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#f0f8f4] text-on-surface flex font-sans antialiased selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
            <Head title={title ? `${title} — Instruktur Bimbingan AEVYRA` : 'Instruktur Panel — AEVYRA'} />

            {/* Ambient Background Glow Orbs (Matching Welcome.jsx) */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute -top-20 left-1/3 w-150 h-87.5 bg-linear-to-tr from-primary-fixed-dim/35 via-primary-fixed/25 to-transparent blur-[120px] rounded-full" />
                <div className="absolute top-[45%] -left-20 w-137.5 h-112.5 bg-linear-to-br from-secondary-fixed/30 via-primary-fixed/15 to-transparent blur-[130px] rounded-full" />
                <div className="absolute bottom-5 right-10 w-125 h-87.5 bg-linear-to-bl from-primary-container/20 to-transparent blur-[140px] rounded-full" />
                <div className="absolute inset-0 bg-[radial-gradient(#00433e_1.5px,transparent_1.5px)] bg-size-[32px_32px] opacity-[0.035]" />
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Frosted Glass Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-primary/10 flex flex-col transition-all duration-300 shadow-[0_4px_30px_rgba(0,67,62,0.04)] lg:translate-x-0 ${
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-primary/10 shrink-0 bg-white/40">
                    <Link href="/instructor/dashboard" className="flex items-center gap-3 group">
                        <img
                            src="/image/Logo_AEVYRA_Icon.png"
                            alt="AEVYRA Logo"
                            className="w-10 h-10 rounded-2xl object-contain shadow-xs group-hover:scale-105 transition-transform"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-heading font-black text-xl tracking-tight text-primary">AEVYRA</span>
                                <span className="px-2 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded-full bg-secondary-fixed/40 text-secondary-container border border-secondary/20">
                                    INSTRUKTUR
                                </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant font-medium">Bimbingan & Intervensi</p>
                        </div>
                    </Link>
                    <button 
                        className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="px-6 pt-5 pb-2">
                    <span className="text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant/70">
                        Workspace Pendampingan
                    </span>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 space-y-1.5 scrollbar-thin">
                    {navItems.map((item) => {
                        const isActive = activeNav === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 text-sm font-medium ${
                                    isActive 
                                    ? 'bg-primary text-white font-semibold shadow-xs shadow-primary/25 translate-x-1' 
                                    : 'text-on-surface-variant hover:text-primary hover:bg-white/80 hover:translate-x-1 border border-transparent hover:border-primary/10'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-white' : 'text-primary/70'}`}>
                                    {item.icon}
                                </span>
                                <span>{item.name}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Elevated Status Profile Card in Sidebar */}
                <div className="p-4 border-t border-primary/10 shrink-0 bg-white/40">
                    <div className="bg-white/85 backdrop-blur-md rounded-2xl p-3.5 border border-primary/10 shadow-xs">
                        <div className="flex items-center gap-3 mb-2.5">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center font-heading font-black text-secondary text-base">
                                    {user?.name?.charAt(0) || 'I'}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-on-surface truncate">{user?.name}</p>
                                <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                            </div>
                        </div>

                        {/* Status pill & role indicator */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-on-surface-variant font-medium">Status:</span>
                                {renderStatusBadge(userStatus)}
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Keluar dari sesi Instruktur"
                            >
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-72 relative z-10">
                {/* Frosted Glass Topbar */}
                <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-primary/10 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-white/80 hover:text-primary transition-colors border border-primary/10"
                        >
                            <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                        <div>
                            <span className="text-[10px] font-label-mono uppercase tracking-wider text-on-surface-variant/80 font-bold block">
                                Portal Instruktur Binaan
                            </span>
                            <h1 className="text-xl font-heading font-bold text-primary tracking-tight">
                                {title || 'Caseload & Bimbingan'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Status Pill in Topbar */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/75 backdrop-blur-md rounded-full border border-primary/10 shadow-xs">
                            <span className="text-[11px] font-medium text-on-surface-variant">Kredensial:</span>
                            {renderStatusBadge(userStatus)}
                        </div>

                        {/* Notifications */}
                        <button className="p-2.5 rounded-xl bg-white/75 backdrop-blur-md text-on-surface-variant hover:text-primary hover:bg-white border border-primary/10 shadow-xs transition-all relative">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full ring-2 ring-white"></span>
                        </button>
                        
                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/75 backdrop-blur-md border border-primary/10 hover:border-primary/20 shadow-xs transition-all"
                            >
                                <div className="w-8 h-8 rounded-xl bg-secondary text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs">
                                    {user?.name?.charAt(0) || 'I'}
                                </div>
                                <div className="hidden md:flex flex-col text-left">
                                    <span className="text-xs font-bold text-on-surface truncate max-w-28 leading-tight">
                                        {user?.name}
                                    </span>
                                    <span className="text-[10px] font-label-mono text-secondary font-semibold leading-tight">
                                        Tenaga Ahli
                                    </span>
                                </div>
                                <span className="material-symbols-outlined text-[16px] text-on-surface-variant ml-0.5">
                                    expand_more
                                </span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-primary/10 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-4 py-2.5 border-b border-primary/10 mb-1">
                                        <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                                        <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-[10px] text-on-surface-variant">Status Lisensi:</span>
                                            {renderStatusBadge(userStatus)}
                                        </div>
                                    </div>
                                    <Link
                                        href="/instructor/consultations"
                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-primary/5 flex items-center gap-2 transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-[16px] text-primary">calendar_month</span>
                                        <span>Kelola Jadwal Bimbingan</span>
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors mt-1 border-t border-primary/5 pt-2"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">logout</span>
                                        <span>Keluar Akun</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Body */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
                    {/* Flash Messages with Frosted Glass Styling */}
                    {flash?.success && (
                        <div className="p-4 bg-emerald-50/90 backdrop-blur-md text-emerald-900 text-xs font-semibold rounded-2xl border border-emerald-200/80 flex items-center gap-3 shadow-xs animate-in slide-in-from-top duration-200">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </div>
                            <span className="flex-1">{flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-rose-50/90 backdrop-blur-md text-rose-900 text-xs font-semibold rounded-2xl border border-rose-200/80 flex items-center gap-3 shadow-xs animate-in slide-in-from-top duration-200">
                            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">error</span>
                            </div>
                            <span className="flex-1">{flash.error}</span>
                        </div>
                    )}

                    {children}
                </main>

                {/* Minimalist Glassmorphic Footer */}
                <footer className="mt-auto border-t border-primary/10 py-5 bg-white/40 backdrop-blur-sm text-xs text-on-surface-variant px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="font-medium text-center sm:text-left">
                            © 2026 AEVYRA — Standar Intervensi Non-Alarmist & Human-in-the-Loop.
                        </p>
                        <div className="flex items-center gap-3 text-[11px] font-label-mono">
                            <span className="px-2 py-0.5 rounded bg-white/80 border border-primary/10">Batas Yuridis Terisolasi</span>
                            <span>•</span>
                            <span>UU PDP No. 27/2022</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
