import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import LogoutConfirmModal from './LogoutConfirmModal';
import NotificationDropdown from './NotificationDropdown';

export default function Header() {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    const user = authUser;
    const roles = user?.roles || [];
    const isAdmin = roles.includes('admin') || user?.role === 'admin';
    const isInstructor = roles.includes('instructor') || user?.role === 'instructor';
    const isMember = roles.includes('member') || (!isAdmin && !isInstructor && !!user);

    let dashboardHref = '/member/dashboard';
    let dashboardLabel = 'Dashboard';
    let roleBadge = 'Member';
    let roleColor = 'bg-primary/10 text-primary border-primary/20';

    if (isAdmin) {
        dashboardHref = '/admin/dashboard';
        dashboardLabel = 'Panel Admin';
        roleBadge = 'Admin';
        roleColor = 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20';
    } else if (isInstructor) {
        dashboardHref = '/instructor/dashboard';
        dashboardLabel = 'Panel Instruktur';
        roleBadge = 'Instruktur Medis';
        roleColor = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
    }

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [clinicalDropdownOpen, setClinicalDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    let currentPath = '';
    try {
        const page = usePage();
        currentPath = page?.url || '';
    } catch {
        currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    }

    const isActive = (path) => {
        if (!currentPath) return false;
        const cleanCurrent = currentPath.split('?')[0].split('#')[0];
        if (path === '/') {
            return cleanCurrent === '/' || cleanCurrent === '';
        }
        return cleanCurrent === path || cleanCurrent.startsWith(`${path}/`);
    };

    const clinicalRef = useRef(null);
    const userDropdownRef = useRef(null);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        setIsLogoutModalOpen(true);
    };

    // Core Features List with Direct Links for Quick Testing/Checking
    const featureItems = [
        {
            name: 'Scanner Kamera & BPOM',
            desc: 'Analisis label makanan, minuman, dan izin obat',
            href: user ? '/member/scanner' : '/demo/scanner',
            icon: 'document_scanner',
            badge: 'AI Vision',
            color: 'text-primary bg-primary/10',
        },
        {
            name: 'Konsultasi & Booking Dokter',
            desc: 'Asisten AI 24/7 dan jadwal telemedisin dokter IDI',
            href: user ? '/member/consultations-hub' : '/demo/consultations',
            icon: 'video_camera_front',
            badge: 'Dokter IDI',
            color: 'text-emerald-700 bg-emerald-100',
        },
        {
            name: 'Tracker & Metrik Kesehatan',
            desc: 'Glukosa darah, tensi, hidrasi, tidur, dan langkah',
            href: user ? '/member/dashboard' : '/demo/tracker',
            icon: 'monitoring',
            badge: 'Baseline HBE',
            color: 'text-blue-700 bg-blue-100',
        },
        {
            name: 'Program Tantangan Sehat',
            desc: 'Misi 14–90 hari remisi glukosa dan habit booster',
            href: user ? '/member/challenges' : '/demo/challenges',
            icon: 'military_tech',
            badge: '+Poin Reward',
            color: 'text-amber-700 bg-amber-100',
        },
        {
            name: 'Komunitas & Forum Diskusi',
            desc: 'Berbagi pengalaman, tanya ahli, dan motivasi',
            href: user ? '/member/community' : '/demo/community',
            icon: 'forum',
            badge: 'Interaktif',
            color: 'text-teal-700 bg-teal-100',
        },
        {
            name: 'Siklus Haid & Vitalitas Pria',
            desc: 'Prediksi fase hormonal wanita & skrining kardiometabolik pria',
            href: user ? '/member/dashboard' : '/demo/gender-vitality',
            icon: 'vital_signs',
            badge: 'Personalisasi AI',
            color: 'text-rose-700 bg-rose-100',
        },
        {
            name: 'Story Game Metabolik',
            desc: 'Simulasi Keputusan Kasus Klinis 24 Jam Interaktif',
            href: '/arcade',
            icon: 'auto_stories',
            badge: 'Interaktif',
            color: 'text-purple-700 bg-purple-100',
        },
        {
            name: 'Siaga Ambulan 119 Lokasi GPS',
            desc: 'Hotline darurat nasional 1-klik dan IGD faskes terdekat',
            href: user ? '/member/dashboard#ambulance' : '/demo/emergency',
            icon: 'emergency',
            badge: 'Triage Cepat',
            color: 'text-red-700 bg-red-100',
        },
    ];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (clinicalRef.current && !clinicalRef.current.contains(e.target)) {
                setClinicalDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 h-14 transition-all duration-200 ${
                    isScrolled
                        ? 'bg-[#f7faf8]/95 backdrop-blur-md border-b border-surface-container-high shadow-[0_2px_12px_rgba(0,40,36,0.03)]'
                        : 'bg-[#f7faf8]/85 backdrop-blur-sm border-b border-surface-container-high/60'
                }`}
            >
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
                    {/* Official AEVYRA Brand Logo */}
                    <Link
                        href="/"
                        className="flex items-center shrink-0 select-none cursor-pointer"
                        title="AEVYRA Healthcare"
                    >
                        <img
                            src="/image/Logo_EVYRA_Horizontal.png"
                            alt="AEVYRA - Your Health, Ahead"
                            className="h-7 sm:h-8 w-auto object-contain shrink-0"
                        />
                    </Link>

                    {/* Desktop Clean Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {/* 1. Beranda */}
                        <Link
                            href="/"
                            className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                                isActive('/')
                                    ? 'bg-primary text-white font-bold shadow-2xs'
                                    : 'font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                            }`}
                        >
                            Beranda
                        </Link>

                        {/* 2. Layanan Klinis & Modul */}
                        <div className="relative" ref={clinicalRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setClinicalDropdownOpen(!clinicalDropdownOpen);
                                    setUserDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    clinicalDropdownOpen || featureItems.some((item) => isActive(item.href))
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                                }`}
                            >
                                <span>Layanan &amp; Fitur</span>
                                <span className="material-symbols-outlined text-[15px] transition-transform duration-200">
                                    {clinicalDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {/* Dropdown Panel */}
                            {clinicalDropdownOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-135 bg-white dark:bg-surface border border-surface-container-high rounded-3xl p-3.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-3 py-2 border-b border-surface-container flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                                            Modul Fitur &amp; Eksplorasi AEVYRA
                                        </span>
                                        <span className="text-[10px] text-primary font-mono font-semibold">
                                            Akses Cepat 1-Klik
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1.5 pt-2">
                                        {featureItems.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                onClick={() => setClinicalDropdownOpen(false)}
                                                className={`p-2.5 rounded-2xl transition-all flex items-start gap-2.5 group border ${
                                                    item.href === '/arcade'
                                                        ? 'bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/60'
                                                        : 'hover:bg-[#edf5f0]/70 border-transparent hover:border-surface-container'
                                                }`}
                                            >
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${item.color}`}>
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {item.icon}
                                                    </span>
                                                </div>
                                                <div className="space-y-0.5 overflow-hidden">
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="text-xs font-bold text-on-surface truncate group-hover:text-primary">
                                                            {item.name}
                                                        </h4>
                                                    </div>
                                                    <p className="text-[10px] text-on-surface-variant line-clamp-1">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 5. Paket Keanggotaan */}
                        <Link
                            href="/paket"
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                                isActive('/paket')
                                    ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da] shadow-2xs'
                                    : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                            }`}
                        >
                            Paket
                        </Link>

                        {/* 6. FAQ */}
                        <Link
                            href="/faq"
                            className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                                isActive('/faq')
                                    ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da] shadow-2xs'
                                    : 'font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                            }`}
                        >
                            FAQ
                        </Link>

                    </nav>

                    {/* Right Actions: Authenticated vs Guest */}
                    <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                        {user ? (
                            /* Authenticated User Actions */
                            <div className="flex items-center gap-2">
                                {/* Direct Dashboard CTA Link (Desktop & Tablet) */}
                                <Link
                                    href={dashboardHref}
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-9 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-2xs whitespace-nowrap select-none"
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                    </span>
                                    <span>{dashboardLabel}</span>
                                </Link>

                                {/* Notifications Dropdown */}
                                <NotificationDropdown align="right" />

                                {/* Desktop User Dropdown (lg+ screens) */}
                                <div className="hidden lg:block relative" ref={userDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserDropdownOpen(!userDropdownOpen);
                                            setClinicalDropdownOpen(false);
                                        }}
                                        className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container-low transition-all cursor-pointer border border-surface-container bg-white/80"
                                        title={user.name}
                                    >
                                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
                                            {user.avatar_url ? (
                                                <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name?.charAt(0) || 'U'
                                            )}
                                        </div>
                                        <span className="material-symbols-outlined text-[15px] text-on-surface-variant pr-0.5">
                                            {userDropdownOpen ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </button>

                                    {userDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-surface rounded-2xl shadow-xl border border-surface-container py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                                            <div className="px-4 py-2 border-b border-surface-container">
                                                <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                                                <p className="text-[10px] text-on-surface-variant font-mono truncate">{user.email}</p>
                                                <div className="mt-1.5">
                                                    <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase border ${roleColor}`}>
                                                        {roleBadge}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                href={dashboardHref}
                                                onClick={() => setUserDropdownOpen(false)}
                                                className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-[16px] text-primary">
                                                    {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                                </span>
                                                <span className="font-semibold">Buka {dashboardLabel}</span>
                                            </Link>

                                            {isMember && (
                                                <>
                                                    <Link
                                                        href="/member/scanner"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
                                                        <span>Scanner Gizi &amp; BPOM</span>
                                                    </Link>
                                                    <Link
                                                        href="/member/consultations-hub"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">video_camera_front</span>
                                                        <span>Pusat Konsultasi Dokter</span>
                                                    </Link>
                                                    <Link
                                                        href="/member/timeline"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">history_edu</span>
                                                        <span>Riwayat &amp; Timeline</span>
                                                    </Link>
                                                </>
                                            )}

                                            {isInstructor && (
                                                <>
                                                    <Link
                                                        href="/instructor/members"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                                                        <span>Member Binaan (Caseload)</span>
                                                    </Link>
                                                    <Link
                                                        href="/instructor/interventions"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">assignment_turned_in</span>
                                                        <span>Rencana Intervensi (HBE)</span>
                                                    </Link>
                                                    <Link
                                                        href="/instructor/reports"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">monitoring</span>
                                                        <span>Laporan Klinis Kohort</span>
                                                    </Link>
                                                </>
                                            )}

                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        href="/admin/users"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">group</span>
                                                        <span>Kelola Pengguna</span>
                                                    </Link>
                                                    <Link
                                                        href="/admin/instructors"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
                                                        <span>Verifikasi Instruktur</span>
                                                    </Link>
                                                    <Link
                                                        href="/admin/reports"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                                                        <span>Laporan &amp; Analitik</span>
                                                    </Link>
                                                    <Link
                                                        href="/admin/audit"
                                                        onClick={() => setUserDropdownOpen(false)}
                                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-surface-container-low flex items-center gap-2"
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] text-primary">shield</span>
                                                        <span>Audit Trail Forensik</span>
                                                    </Link>
                                                </>
                                            )}

                                            <div className="border-t border-surface-container mt-1 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer font-semibold"
                                                >
                                                    <span className="material-symbols-outlined text-[16px]">logout</span>
                                                    <span>Keluar Akun</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Compact Dashboard Icon Button (< sm screens) */}
                                <Link
                                    href={dashboardHref}
                                    className="sm:hidden flex items-center justify-center w-8.5 h-8.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border border-primary/20 shadow-2xs"
                                    title={`Buka ${dashboardLabel}`}
                                    aria-label={dashboardLabel}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                    </span>
                                </Link>
                            </div>
                        ) : (
                            /* Guest Actions (Not Logged In) */
                            <>
                                <Link
                                    href="/login"
                                    className="text-xs text-[#52645f] hover:text-primary font-medium px-2.5 py-1.5 min-h-9 flex items-center transition-colors whitespace-nowrap select-none"
                                >
                                    Masuk
                                </Link>

                                <Link
                                    href="/register"
                                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-9 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-xs whitespace-nowrap select-none"
                                >
                                    Mulai Skrining
                                </Link>
                            </>
                        )}

                        {/* Mobile Hamburger Toggle Button (ALWAYS cleanly visible and accessible on mobile) */}
                        <button
                            type="button"
                            onClick={() => {
                                setMobileMenuOpen(!mobileMenuOpen);
                                setUserDropdownOpen(false);
                            }}
                            className="lg:hidden w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 flex items-center justify-center rounded-xl bg-white border border-[#d2e2d8] text-primary hover:bg-[#edf5f0] transition-all cursor-pointer shadow-2xs shrink-0"
                            aria-label="Menu navigasi"
                        >
                            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer Backdrop & Menu */}
                {mobileMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 top-14 bg-black/30 backdrop-blur-xs z-30 lg:hidden animate-in fade-in duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <div className="fixed top-14 left-0 right-0 z-40 lg:hidden bg-white/98 backdrop-blur-xl border-b border-surface-container-high px-4 sm:px-6 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto">
                            {/* Group 0: Authenticated User Profile Summary Card */}
                            {user && (
                                <div className="space-y-3">
                                    <div className="p-3.5 bg-linear-to-r from-[#edf5f0] to-[#e4f0e8] border border-[#d2e5da] rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0 overflow-hidden">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    user.name?.charAt(0) || 'U'
                                                )}
                                            </div>
                                            <div className="overflow-hidden space-y-0.5">
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-xs font-bold text-[#192b27] truncate">{user.name}</p>
                                                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase border ${roleColor}`}>
                                                        {roleBadge}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-[#556963] font-mono truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href={dashboardHref}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-3 py-1.5 rounded-xl bg-primary text-white text-[11px] font-bold shrink-0 hover:bg-primary-container shadow-2xs flex items-center gap-1"
                                        >
                                            <span>{dashboardLabel}</span>
                                            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                        </Link>
                                    </div>

                                    {/* Quick Shortcut Buttons for Logged in Member */}
                                    {isMember && (
                                        <div className="space-y-2">
                                            <Link
                                                href="/member/dashboard?chat=ai"
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    window.dispatchEvent(new CustomEvent('open-ai-chat'));
                                                }}
                                                className="w-full p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-all flex items-center justify-between text-xs font-bold text-emerald-950 border border-emerald-200 shadow-2xs"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-[18px] text-primary">smart_toy</span>
                                                    <span>Chat &amp; Curhat AI Medis</span>
                                                </div>
                                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary text-white font-mono font-medium flex items-center gap-1">
                                                    Buka Chat
                                                    <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                                                </span>
                                            </Link>
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link
                                                    href="/member/scanner"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                                >
                                                    <span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
                                                    <span>Scanner Gizi</span>
                                                </Link>
                                                <Link
                                                    href="/member/consultations-hub"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                                >
                                                    <span className="material-symbols-outlined text-[18px] text-primary">video_camera_front</span>
                                                    <span>Konsultasi Dokter</span>
                                                </Link>
                                                <Link
                                                    href="/member/timeline"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                                >
                                                    <span className="material-symbols-outlined text-[18px] text-primary">history_edu</span>
                                                    <span>Riwayat Lab</span>
                                                </Link>
                                                <Link
                                                    href="/member/challenges"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                                >
                                                    <span className="material-symbols-outlined text-[18px] text-primary">military_tech</span>
                                                    <span>Tantangan Sehat</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}

                                    {/* Quick Shortcut Buttons for Logged in Instructor */}
                                    {isInstructor && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href="/instructor/members"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">groups</span>
                                                <span>Member Binaan</span>
                                            </Link>
                                            <Link
                                                href="/instructor/interventions"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">clinical_notes</span>
                                                <span>Intervensi HBE</span>
                                            </Link>
                                            <Link
                                                href="/instructor/consultations"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
                                                <span>Jadwal Konsul</span>
                                            </Link>
                                            <Link
                                                href="/instructor/reports"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">monitoring</span>
                                                <span>Laporan Klinis</span>
                                            </Link>
                                        </div>
                                    )}

                                    {/* Quick Shortcut Buttons for Logged in Admin */}
                                    {isAdmin && (
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href="/admin/users"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">group</span>
                                                <span>Kelola User</span>
                                            </Link>
                                            <Link
                                                href="/admin/instructors"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                                                <span>Instruktur</span>
                                            </Link>
                                            <Link
                                                href="/admin/reports"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">analytics</span>
                                                <span>Laporan &amp; Analitik</span>
                                            </Link>
                                            <Link
                                                href="/admin/audit"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="p-2.5 rounded-xl bg-[#f2f7f4] hover:bg-[#e7f1eb] transition-all flex items-center gap-2 text-xs font-semibold text-[#1f332d] border border-[#d8e8de]"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">shield</span>
                                                <span>Audit Forensik</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Group 1: Member Health Features */}
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-2 block">
                                    Fitur &amp; Layanan Utama
                                </span>
                                {featureItems.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-3 py-2.5 min-h-11 flex items-center justify-between rounded-xl text-xs transition-all ${
                                            item.href === '/arcade'
                                                ? 'font-bold text-emerald-900 bg-[#edf5f0] hover:bg-[#e2efe8]'
                                                : 'font-medium text-[#445652] hover:bg-[#edf5f0]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-[18px] text-primary">
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#cfe2d7] text-primary font-mono font-bold">
                                            {item.badge}
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            {/* Group 2: Public Navigation */}
                            <div className="pt-2 border-t border-surface-container space-y-1">
                                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-2 block">
                                    Navigasi Platform
                                </span>
                                <Link
                                    href="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">home</span>
                                    <span>Beranda Utama</span>
                                </Link>
                                <Link
                                    href="/paket"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">card_membership</span>
                                    <span>Pilihan Paket Keanggotaan</span>
                                </Link>
                                <Link
                                    href="/faq"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px] text-primary">quiz</span>
                                    <span>Pusat Bantuan &amp; FAQ Medis</span>
                                </Link>
                            </div>

                            {/* Group 4: Auth Actions (Guest vs Logged In) */}
                            {user ? (
                                <div className="pt-2 border-t border-surface-container">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="w-full min-h-11 px-3 py-2.5 flex items-center justify-center gap-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-all cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        <span>Keluar Akun ({user.name})</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-3 border-t border-surface-container-high grid grid-cols-2 gap-3">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full min-h-11 flex items-center justify-center rounded-xl border border-surface-container-high text-xs text-[#52645f] font-medium hover:bg-[#edf5f0]"
                                    >
                                        Masuk Akun
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full min-h-11 flex items-center justify-center rounded-xl bg-primary text-white text-xs font-medium shadow-xs"
                                    >
                                        Mulai Skrining
                                    </Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </header>

            {/* Confirmation Alert / Modal for Logout */}
            <LogoutConfirmModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                userRole={roleBadge}
            />
        </>
    );
}
