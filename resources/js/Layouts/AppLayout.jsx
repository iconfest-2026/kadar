import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import EmergencyModal from '../Components/EmergencyModal';
import QuickLogModal from '../Components/QuickLogModal';

export default function AppLayout({ children, title, activeTab }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const roles = auth?.roles || [];
    const isMember = roles.includes('member');
    const isInstructor = roles.includes('instructor');
    const isAdmin = roles.includes('admin');

    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
    const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-surface-container-lowest text-on-surface flex flex-col selection:bg-primary selection:text-on-primary font-sans antialiased">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surface-container">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                    {/* Brand */}
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
                            </div>
                            <div>
                                <span className="font-heading font-black text-lg text-primary tracking-tight">KADAR</span>
                                <span className="font-heading font-black text-lg text-primary tracking-tight">AEVYRA</span>
                                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-label-mono font-bold uppercase rounded bg-surface-container text-on-surface-variant">
                                    {isAdmin ? 'Admin Panel' : isInstructor ? 'Instruktur' : 'Preventif'}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
                            {isMember && (
                                <>
                                    <Link
                                        href="/member/dashboard"
                                        className={`px-3 py-2 rounded-xl transition-all ${
                                            activeTab === 'dashboard'
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                        }`}
                                    >
                                        Ringkasan Baseline
                                    </Link>
                                    <Link
                                        href="/member/timeline"
                                        className={`px-3 py-2 rounded-xl transition-all ${
                                            activeTab === 'timeline'
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                        }`}
                                    >
                                        Timeline Kesehatan
                                    </Link>
                                </>
                            )}
                            {isInstructor && (
                                <Link
                                    href="/instructor/dashboard"
                                    className={`px-3 py-2 rounded-xl transition-all ${
                                        activeTab === 'caseload'
                                            ? 'bg-primary/10 text-primary font-bold'
                                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                    }`}
                                >
                                    Caseload Member & Sinyal
                                </Link>
                            )}
                            {isAdmin && (
                                <Link
                                    href="/admin/dashboard"
                                    className={`px-3 py-2 rounded-xl transition-all ${
                                        activeTab === 'admin'
                                            ? 'bg-primary/10 text-primary font-bold'
                                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                                    }`}
                                >
                                    Tata Kelola & Audit Forensik
                                </Link>
                            )}
                        </nav>
                    </div>

                    {/* Right Utilities */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Quick Log Action (Member only) */}
                        {isMember && (
                            <button
                                type="button"
                                onClick={() => setIsQuickLogOpen(true)}
                                className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all shadow-xs"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                <span>Catat Metrik</span>
                            </button>
                        )}

                        {/* Emergency 119 Call Button (Instant, Red, High Visibility) */}
                        <button
                            type="button"
                            onClick={() => setIsEmergencyOpen(true)}
                            className="flex items-center gap-1 py-1.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-transform active:scale-95 animate-pulse"
                            title="Akses Darurat 119 Tanpa AI"
                        >
                            <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
                            <span>SOS 119</span>
                        </button>

                        {/* User Menu Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-container transition-all"
                            >
                                <div className="w-8 h-8 rounded-full bg-surface-container-high border border-surface-container flex items-center justify-center font-bold text-xs text-primary">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <span className="hidden lg:inline text-xs font-semibold text-on-surface truncate max-w-30">
                                    {user?.name}
                                </span>
                                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                                    expand_more
                                </span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-surface rounded-2xl shadow-xl border border-surface-container py-2 z-50 animate-scale-up">
                                    <div className="px-4 py-2 border-b border-surface-container">
                                        <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                                        <p className="text-[11px] text-on-surface-variant truncate">{user?.email}</p>
                                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded bg-primary/10 text-primary">
                                            {roles[0] || 'Member'}
                                        </span>
                                    </div>
                                    {isMember && (
                                        <Link
                                            href="/member/onboarding"
                                            className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <span className="material-symbols-outlined text-[16px]">tune</span>
                                            <span>Atur Profil & Gaya Hidup</span>
                                        </Link>
                                    )}
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">logout</span>
                                        <span>Keluar Akun</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
                        >
                            <span className="material-symbols-outlined text-[22px]">
                                {mobileNavOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileNavOpen && (
                    <div className="md:hidden border-t border-surface-container px-4 py-3 space-y-2 bg-surface">
                        {isMember && (
                            <>
                                <Link
                                    href="/member/dashboard"
                                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                                    onClick={() => setMobileNavOpen(false)}
                                >
                                    Ringkasan Baseline
                                </Link>
                                <Link
                                    href="/member/timeline"
                                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                                    onClick={() => setMobileNavOpen(false)}
                                >
                                    Timeline Kesehatan
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileNavOpen(false);
                                        setIsQuickLogOpen(true);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                    <span>Catat Metrik Sekarang</span>
                                </button>
                            </>
                        )}
                        {isInstructor && (
                            <Link
                                href="/instructor/dashboard"
                                className="block px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                                onClick={() => setMobileNavOpen(false)}
                            >
                                Caseload Member & Sinyal
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                href="/admin/dashboard"
                                className="block px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container-low"
                                onClick={() => setMobileNavOpen(false)}
                            >
                                Tata Kelola & Audit Forensik
                            </Link>
                        )}
                    </div>
                )}
            </header>

            {/* Flash Messages */}
            {flash?.success && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                    <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs font-semibold rounded-2xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 shadow-xs">
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                        <span>{flash.success}</span>
                    </div>
                </div>
            )}
            {flash?.error && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 w-full">
                    <div className="p-3.5 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 text-xs font-semibold rounded-2xl border border-red-200 dark:border-red-800 flex items-center gap-2 shadow-xs">
                        <span className="material-symbols-outlined text-[18px] text-red-600">error</span>
                        <span>{flash.error}</span>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-surface-container py-6 bg-surface/50 text-xs text-on-surface-variant">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="font-medium text-center sm:text-left">
                        © 2026 Kadar (AEVYRA) — Platform Kesehatan Preventif Berbasis Perilaku & Intervensi Dini.
                        © 2026 AEVYRA — Platform Kesehatan Preventif Berbasis Perilaku & Intervensi Dini.
                    </p>
                    <div className="flex items-center gap-4 text-[11px]">
                        <span>UU PDP No. 27/2022 Patuh</span>
                        <span>•</span>
                        <span>Non-Diagnostik</span>
                        <span>•</span>
                        <span>SPGDT 119 Mandiri</span>
                    </div>
                </div>
            </footer>

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
        </div>
    );
}
