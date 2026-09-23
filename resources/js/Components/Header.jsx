import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
    const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const dropdownRef = useRef(null);
    const reportsRef = useRef(null);

    // Core Features List with Direct Links for Quick Testing/Checking
    const featureItems = [
        {
            name: 'Scanner Open Cam & BPOM',
            desc: 'Analisis label makanan, minuman, dan izin obat',
            href: '/member/scanner',
            icon: 'document_scanner',
            badge: 'Kamera Live',
            color: 'text-primary bg-primary/10',
        },
        {
            name: 'Konsultasi & Booking Dokter',
            desc: 'Asisten AI 24/7 dan jadwal telemedisin dokter IDI',
            href: '/member/consultations-hub',
            icon: 'video_camera_front',
            badge: 'Dokter IDI',
            color: 'text-emerald-700 bg-emerald-100',
        },
        {
            name: 'Tracker & Metrik Kesehatan',
            desc: 'Glukosa darah, tensi, hidrasi, tidur, dan langkah',
            href: '/member/dashboard',
            icon: 'monitoring',
            badge: 'Baseline HBE',
            color: 'text-blue-700 bg-blue-100',
        },
        {
            name: 'Program Tantangan Sehat',
            desc: 'Misi 14–90 hari remisi glukosa dan habit booster',
            href: '/member/challenges',
            icon: 'military_tech',
            badge: '+Poin Reward',
            color: 'text-amber-700 bg-amber-100',
        },
        {
            name: 'Komunitas & Forum Diskusi',
            desc: 'Berbagi pengalaman, tanya ahli, dan motivasi',
            href: '/member/community',
            icon: 'forum',
            badge: 'Interaktif',
            color: 'text-teal-700 bg-teal-100',
        },
        {
            name: 'Siklus Haid & Vitalitas Pria',
            desc: 'Prediksi fase hormonal wanita & skrining kardiometabolik pria',
            href: '/member/dashboard',
            icon: 'vital_signs',
            badge: 'Personalisasi AI',
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
            href: '#ambulance',
            icon: 'emergency',
            badge: 'Triage Cepat',
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
                <div className="h-full max-w-310 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
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
                            href="/member/scanner"
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
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-135 bg-white dark:bg-surface border border-surface-container-high rounded-3xl p-3.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-3 py-2 border-b border-surface-container flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                                            Modul Fitur &amp; Simulasi AEVYRA
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
                                                onClick={() => setFeaturesDropdownOpen(false)}
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

                        {/* 3. Konsultasi */}
                        <Link
                            href="/member/consultations-hub"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Konsultasi
                        </Link>

                        {/* 4. Tantangan Program */}
                        <Link
                            href="/member/challenges"
                            className="px-3 py-1.5 rounded-full text-xs font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80 transition-all whitespace-nowrap"
                        >
                            Tantangan
                        </Link>

                        {/* 5. Forum Komunitas */}
                        <Link
                            href="/member/community"
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

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
                                    className="px-3 py-2.5 min-h-11 flex items-center justify-between rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-[18px] text-primary">
                                            {r.icon}
                                        </span>
                                        <span>{r.name}</span>
                                    </div>
                                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                                        {r.role}
                                    </span>
                                </Link>
                            ))}
                            <a
                                href="#tiers"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary">card_membership</span>
                                <span>Paket Tingkatan Member (Silver, Gold, Platinum)</span>
                            </a>
                            <a
                                href="#faq"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-3 py-2.5 min-h-11 flex items-center gap-2.5 rounded-xl text-xs font-medium text-[#445652] hover:bg-[#edf5f0] transition-all"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary">quiz</span>
                                <span>Tanya Jawab (FAQ)</span>
                            </a>
                        </div>

                        {/* Group 3: Auth Buttons */}
                        <div className="pt-3 border-t border-surface-container-high grid grid-cols-2 gap-3">
                            <Link
                                href="/login"
                                className="w-full min-h-11 flex items-center justify-center rounded-xl border border-surface-container-high text-xs text-[#52645f] font-medium hover:bg-[#edf5f0]"
                            >
                                Masuk Akun
                            </Link>
                            <Link
                                href="/register"
                                className="w-full min-h-11 flex items-center justify-center rounded-xl bg-primary text-white text-xs font-medium shadow-xs"
                            >
                                Mulai Skrining
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
