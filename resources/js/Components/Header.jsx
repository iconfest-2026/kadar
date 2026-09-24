import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = user?.roles || [];
    const isAdmin = roles.includes('admin');
    const isInstructor = roles.includes('instructor');
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
    const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
    const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dropdownRef = useRef(null);
    const reportsRef = useRef(null);
    const userDropdownRef = useRef(null);

    const handleLogout = () => {
        router.post('/logout');
    };

    // Core Features List with Direct Links to Public Interactive Demo Showcase
    const featureItems = [
        {
            name: 'Scanner Open Cam & BPOM',
            desc: 'Analisis label makanan, minuman, dan izin obat',
            href: '/demo/scanner',
            icon: 'document_scanner',
            badge: 'Demo Scanner',
            color: 'text-primary bg-primary/10',
        },
        {
            name: 'Konsultasi & Booking Dokter',
            desc: 'Asisten AI 24/7 dan jadwal telemedisin dokter IDI',
            href: '/demo/consultations',
            icon: 'video_camera_front',
            badge: 'Demo Konsultasi',
            color: 'text-emerald-700 bg-emerald-100',
        },
        {
            name: 'Tracker & Metrik Kesehatan',
            desc: 'Glukosa darah, tensi, hidrasi, tidur, dan langkah',
            href: '/demo/tracker',
            icon: 'monitoring',
            badge: 'Demo Baselines',
            color: 'text-blue-700 bg-blue-100',
        },
        {
            name: 'Program Tantangan Sehat',
            desc: 'Misi 14–90 hari remisi glukosa dan habit booster',
            href: '/demo/challenges',
            icon: 'military_tech',
            badge: 'Demo Tantangan',
            color: 'text-amber-700 bg-amber-100',
        },
        {
            name: 'Komunitas & Forum Diskusi',
            desc: 'Berbagi pengalaman, tanya ahli, dan motivasi',
            href: '/demo/community',
            icon: 'forum',
            badge: 'Demo Forum',
            color: 'text-teal-700 bg-teal-100',
        },
        {
            name: 'Siklus Haid & Vitalitas Pria',
            desc: 'Prediksi fase hormonal wanita & skrining kardiometabolik pria',
            href: '/demo/gender-vitality',
            icon: 'vital_signs',
            badge: 'Demo Hormon',
            color: 'text-rose-700 bg-rose-100',
        },
        {
            name: 'Arena Gamifikasi 2D',
            desc: 'Game 2D Glucose Dash & Simulasi Kasus Interaktif',
            href: '/arcade',
            icon: 'sports_esports',
            badge: 'Game 2D',
            color: 'text-emerald-700 bg-emerald-100',
        },
        {
            name: 'Siaga Ambulan 119 Lokasi GPS',
            desc: 'Hotline darurat nasional 1-klik dan IGD faskes terdekat',
            href: '/demo/emergency',
            icon: 'emergency',
            badge: 'Demo Darurat',
            color: 'text-red-700 bg-red-100',
        },
    ];

    const reportItems = [
        {
            name: 'Laporan Instruktur',
            desc: 'Metrik kepatuhan member, caseload, dan efektivitas intervensi',
            href: '/instructor/reports',
            icon: 'assignment_turned_in',
            role: 'Instruktur',
        },
        {
            name: 'Laporan Admin',
            desc: 'Tata kelola platform, audit sistem, dan statistik pemindaian',
            href: '/admin/reports',
            icon: 'admin_panel_settings',
            role: 'Admin',
        },
    ];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setFeaturesDropdownOpen(false);
            }
            if (reportsRef.current && !reportsRef.current.contains(e.target)) {
                setReportsDropdownOpen(false);
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
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 min-w-0 w-full">
                    {/* Official AEVYRA Brand Logo */}
                    <Link
                        href="/"
                        className="flex items-center group shrink-0 select-none transition-transform active:scale-95"
                    >
                        <img
                            src="/image/Logo_AEVYRA_Horizontal.png"
                            alt="AEVYRA — Your Health, Ahead"
                            className="h-7 sm:h-8 w-auto object-contain shrink-0"
                        />
                    </Link>

                    {/* Desktop Rich Navigation Menu */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-container-high shadow-2xs">
                        {/* 1. Pemindai Kamera Quick Link */}
                        <Link
                            href="/demo/scanner"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Pemindai
                        </Link>

                        {/* 2. Interactive Feature Mega/Dropdown Menu */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setFeaturesDropdownOpen(!featuresDropdownOpen);
                                    setReportsDropdownOpen(false);
                                    setUserDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    featuresDropdownOpen
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                                }`}
                            >
                                <span>Fitur</span>
                                <span className="material-symbols-outlined text-[14px]">
                                    {featuresDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {/* Dropdown Panel */}
                            {featuresDropdownOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] max-w-[90vw] bg-white dark:bg-surface border border-surface-container-high rounded-3xl p-3.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-3 py-2 border-b border-surface-container flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                                            Modul Fitur &amp; Simulasi AEVYRA
                                        </span>
                                        <span className="text-[10px] text-primary font-mono font-semibold">
                                            Akses Cepat 1-Klik
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                                        {featureItems.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.href}
                                                onClick={() => setFeaturesDropdownOpen(false)}
                                                className={`p-2.5 rounded-2xl transition-all flex items-start gap-2.5 group border min-w-0 ${
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
                                                <div className="space-y-0.5 overflow-hidden min-w-0 flex-1">
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

                        {/* 3. Konsultasi */}
                        <Link
                            href="/demo/consultations"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Konsultasi
                        </Link>

                        {/* 4. Tantangan Program */}
                        <Link
                            href="/demo/challenges"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Tantangan
                        </Link>

                        {/* 5. Forum Komunitas */}
                        <Link
                            href="/demo/community"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Komunitas
                        </Link>

                        {/* 6. Arena Gamifikasi 2D (Dedicated Page) */}
                        <Link
                            href="/arcade"
                            className="px-3 py-1.5 rounded-full text-xs font-semibold text-primary bg-[#edf5f0] hover:bg-[#e1eee6] border border-[#d2e5da] transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-2xs"
                        >
                            <span>Game 2D</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-primary text-white font-mono font-bold">
                                Play
                            </span>
                        </Link>

                        {/* 7. Laporan Dropdown */}
                        <div className="relative" ref={reportsRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setReportsDropdownOpen(!reportsDropdownOpen);
                                    setFeaturesDropdownOpen(false);
                                    setUserDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    reportsDropdownOpen
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                                }`}
                            >
                                <span>Laporan</span>
                                <span className="material-symbols-outlined text-[14px]">
                                    {reportsDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {reportsDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-surface border border-surface-container-high rounded-2xl p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {reportItems.map((r, idx) => (
                                        <Link
                                            key={idx}
                                            href={r.href}
                                            onClick={() => setReportsDropdownOpen(false)}
                                            className="p-2.5 rounded-xl hover:bg-[#edf5f0]/70 transition-all flex items-start gap-2.5 group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                                <span className="material-symbols-outlined text-[17px]">{r.icon}</span>
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-on-surface block group-hover:text-primary">
                                                    {r.name}
                                                </span>
                                                <span className="text-[10px] text-on-surface-variant block">
                                                    {r.desc}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 8. Paket Keanggotaan */}
                        <a
                            href="#tiers"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Paket
                        </a>

                        {/* 9. FAQ */}
                        <a
                            href="#faq"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            FAQ
                        </a>
                    </nav>

                    {/* Right Actions: Authenticated vs Guest */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {user ? (
                            /* Authenticated User Actions */
                            <div className="flex items-center gap-2 sm:gap-2.5">
                                {/* Direct Dashboard CTA Link */}
                                <Link
                                    href={dashboardHref}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-9 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-2xs whitespace-nowrap select-none"
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                    </span>
                                    <span>{dashboardLabel}</span>
                                </Link>

                                {/* User Dropdown */}
                                <div className="relative" ref={userDropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserDropdownOpen(!userDropdownOpen);
                                            setFeaturesDropdownOpen(false);
                                            setReportsDropdownOpen(false);
                                        }}
                                        className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container-low transition-all cursor-pointer border border-surface-container bg-white/80"
                                        title={user.name}
                                    >
                                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <span className="material-symbols-outlined text-[15px] text-on-surface-variant pr-0.5 hidden sm:block">
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
                            </div>
                        ) : (
                            /* Guest Actions (Not Logged In) */
                            <>
                                <Link
                                    href="/login"
                                    className="text-xs text-[#52645f] hover:text-primary font-medium px-2.5 py-1.5 min-h-9.5 flex items-center transition-colors whitespace-nowrap select-none"
                                >
                                    Masuk
                                </Link>

                                <Link
                                    href="/register"
                                    className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-9.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 shadow-xs whitespace-nowrap select-none"
                                >
                                    Mulai Skrining
                                </Link>
                            </>
                        )}

                        {/* Mobile Hamburger Toggle */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-primary hover:bg-[#edf5f0] transition-all cursor-pointer"
                            aria-label="Menu navigasi"
                        >
                            <span className="material-symbols-outlined text-[22px]">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer with Comprehensive Categorized Menus */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-surface-container-high px-4 sm:px-6 py-4 space-y-4 animate-in fade-in duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
                        {/* User Profile Card for Authenticated User */}
                        {user && (
                            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold flex items-center justify-center text-sm shadow-2xs shrink-0">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                                            <p className="text-[10px] text-on-surface-variant font-mono truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border shrink-0 ${roleColor}`}>
                                        {roleBadge}
                                    </span>
                                </div>

                                <Link
                                    href={dashboardHref}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full min-h-10 flex items-center justify-center gap-2 rounded-xl bg-primary text-white text-xs font-bold shadow-2xs hover:bg-primary-container transition-all"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {isAdmin ? 'admin_panel_settings' : isInstructor ? 'clinical_notes' : 'space_dashboard'}
                                    </span>
                                    <span>Buka {dashboardLabel}</span>
                                </Link>
                            </div>
                        )}

                        {/* Group 1: Member Health Features */}
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-2 block">
                                Fitur Utama Member
                            </span>
                            {featureItems.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-3 py-2.5 min-h-11 flex items-center justify-between gap-2 rounded-xl text-xs transition-all min-w-0 ${
                                        item.href === '/arcade'
                                            ? 'font-bold text-emerald-900 bg-[#edf5f0] hover:bg-[#e2efe8]'
                                            : 'font-medium text-[#445652] hover:bg-[#edf5f0]'
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                                            {item.icon}
                                        </span>
                                        <span className="truncate">{item.name}</span>
                                    </div>
                                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-[#cfe2d7] text-primary font-mono font-bold shrink-0">
                                        {item.badge}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Group 2: Reports & Governance */}
                        <div className="pt-2 border-t border-surface-container space-y-1">
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-2 block">
                                Portal Laporan &amp; Keanggotaan
                            </span>
                            {reportItems.map((r, idx) => (
                                <Link
                                    key={idx}
                                    href={r.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-3 py-2.5 min-h-11 flex items-center justify-between gap-2 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all min-w-0"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                        <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                                            {r.icon}
                                        </span>
                                        <span className="truncate">{r.name}</span>
                                    </div>
                                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold shrink-0">
                                        {r.role}
                                    </span>
                                </Link>
                            ))}
                            <a
                                href="#tiers"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all min-w-0"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">card_membership</span>
                                <span className="truncate">Paket Tingkatan Member (Silver, Gold, Platinum)</span>
                            </a>
                            <a
                                href="#faq"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all min-w-0"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">quiz</span>
                                <span className="truncate">Tanya Jawab (FAQ)</span>
                            </a>
                        </div>

                        {/* Group 3: Auth Buttons / Logout */}
                        <div className="pt-3 border-t border-surface-container-high">
                            {user ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full min-h-11 flex items-center justify-center gap-2 rounded-xl border border-rose-200 text-xs text-rose-700 font-bold hover:bg-rose-50 transition-all cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    <span>Keluar Akun ({user.name})</span>
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
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
                    </div>
                )}
            </header>
        </>
    );
}
