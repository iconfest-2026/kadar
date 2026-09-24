import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [clinicalDropdownOpen, setClinicalDropdownOpen] = useState(false);
    const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
    const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
    const [activeClinicalTab, setActiveClinicalTab] = useState('diagnostic');
    const [isScrolled, setIsScrolled] = useState(false);

    // Mobile collapsible accordion states
    const [mobileClinicalOpen, setMobileClinicalOpen] = useState(true);
    const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
    const [mobileReportsOpen, setMobileReportsOpen] = useState(false);

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
    const programsRef = useRef(null);
    const reportsRef = useRef(null);

    // Data Struktur: Menu di dalam Menu untuk Layanan Klinis (Submenu bersarang)
    const clinicalSubmenus = [
        {
            id: 'diagnostic',
            title: 'Pemeriksaan & Konsultasi',
            desc: 'Deteksi nutrisi kamera & temu spesialis',
            icon: 'biotech',
            badge: 'Klinis',
            items: [
                {
                    name: 'Pemindai Label & BPOM',
                    desc: 'Deteksi instan kadar gula bebas, sodium, kalori & risiko glikemik',
                    href: '/member/scanner',
                    icon: 'document_scanner',
                    badge: 'AI 0.4 Detik',
                },
                {
                    name: 'Konsultasi Dokter & AI',
                    desc: 'Telekonsultasi spesialis Sp.PD, Sp.GK, dan pendampingan 24/7',
                    href: '/member/consultations-hub',
                    icon: 'video_camera_front',
                    badge: 'Spesialis',
                },
                {
                    name: 'Instruktur & Dokter Spesialis',
                    desc: 'Direktori dokter klinis dan instruktur bersertifikasi STR/SIP',
                    href: '/member/instructors',
                    icon: 'medical_services',
                    badge: 'Terverifikasi',
                },
            ],
        },
        {
            id: 'monitoring',
            title: 'Pemantauan & Rekam Medis',
            desc: 'Tracker kurva biomarker & catatan kesehatan',
            icon: 'monitoring',
            badge: 'Biomarker',
            items: [
                {
                    name: 'Tracker & Metrik Kesehatan',
                    desc: 'Kurva glukosa harian, tensi darah, hidrasi, dan skor kesehatan',
                    href: '/member/dashboard',
                    icon: 'monitoring',
                    badge: 'Metrik HBE',
                },
                {
                    name: 'Timeline Riwayat Medis',
                    desc: 'Kronologi perkembangan resistensi insulin & catatan intervensi',
                    href: '/member/timeline',
                    icon: 'timeline',
                    badge: 'Rekam Medis',
                },
                {
                    name: 'Siklus & Skrining Kardiometabolik',
                    desc: 'Prediksi fase hormonal wanita & evaluasi kardiometabolik pria',
                    href: '/member/dashboard',
                    icon: 'vital_signs',
                    badge: 'Personalisasi',
                },
            ],
        },
        {
            id: 'emergency',
            title: 'Siaga Medis Darurat',
            desc: 'Hotline 119 & instalasi gawat darurat',
            icon: 'emergency',
            badge: 'Siaga 24/7',
            items: [
                {
                    name: 'Siaga Ambulan 119 Nasional',
                    desc: 'Hotline darurat medis nasional 1-klik dengan transmisi koordinat GPS',
                    href: '/#ambulance',
                    icon: 'emergency',
                    badge: 'Darurat 24/7',
                },
                {
                    name: 'Faskes & IGD Terdekat',
                    desc: 'Jaringan rumah sakit dan puskesmas rujukan siap siaga',
                    href: '/member/instructors',
                    icon: 'local_hospital',
                    badge: 'SatuSehat',
                },
            ],
        },
    ];

    // Submenu untuk Program & Komunitas
    const programItems = [
        {
            name: 'Tantangan Remisi 90 Hari',
            desc: 'Program mikro harian terarah untuk pembalikan resistensi insulin dan HbA1c',
            href: '/member/challenges',
            icon: 'military_tech',
            badge: 'Program 90 Hari',
        },
        {
            name: 'Forum Komunitas Sehat',
            desc: 'Berbagi inspirasi menu rendah glikemik dan tanya jawab sesama pejuang remisi',
            href: '/member/community',
            icon: 'forum',
            badge: 'Diskusi Aktif',
        },
        {
            name: 'Arena Gim Glucose Dash',
            desc: 'Simulasi edukatif interaktif mengenali lonjakan glukosa dari pangan harian',
            href: '/arcade',
            icon: 'sports_esports',
            badge: 'Play',
        },
    ];

    // Submenu untuk Laporan & Tata Kelola
    const reportItems = [
        {
            name: 'Laporan Instruktur',
            desc: 'Metrik kepatuhan member, caseload, dan efektivitas intervensi klinis',
            href: '/instructor/reports',
            icon: 'assignment_turned_in',
            role: 'Instruktur',
        },
        {
            name: 'Laporan Admin',
            desc: 'Tata kelola platform, audit sistem, dan statistik pemindaian terpadu',
            href: '/admin/reports',
            icon: 'admin_panel_settings',
            role: 'Admin',
        },
    ];

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (clinicalRef.current && !clinicalRef.current.contains(e.target)) {
                setClinicalDropdownOpen(false);
            }
            if (programsRef.current && !programsRef.current.contains(e.target)) {
                setProgramsDropdownOpen(false);
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

    const activeClinicalGroup = clinicalSubmenus.find((g) => g.id === activeClinicalTab) || clinicalSubmenus[0];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 h-14 transition-all duration-200 ${
                    isScrolled
                        ? 'bg-[#f7faf8]/95 backdrop-blur-md border-b border-surface-container-high shadow-[0_2px_12px_rgba(0,40,36,0.03)]'
                        : 'bg-[#f7faf8]/85 backdrop-blur-sm border-b border-surface-container-high/60'
                }`}
            >
                <div className="h-full max-w-310 mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    {/* Official AEVYRA Brand Logo */}
                    <div
                        className="flex items-center shrink-0 select-none cursor-default"
                        title="AEVYRA Healthcare"
                    >
                        <img
                            src="/image/Logo_AEVYRA_Horizontal.png"
                            alt="AEVYRA - Your Health, Ahead"
                            className="h-7 sm:h-8 w-auto object-contain shrink-0"
                        />
                    </div>

                    {/* Desktop Clean Navigation (Menu Luar Ringkas & Submenu Berjenjang) */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {/* 1. Beranda */}
                        <Link
                            href="/"
                            className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                                isActive('/')
                                    ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da] shadow-2xs'
                                    : 'font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                            }`}
                        >
                            Beranda
                        </Link>

                        {/* 2. Layanan Klinis (Menu di Dalam Menu) */}
                        <div className="relative" ref={clinicalRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setClinicalDropdownOpen(!clinicalDropdownOpen);
                                    setProgramsDropdownOpen(false);
                                    setReportsDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    clinicalDropdownOpen || isActive('/member/scanner') || isActive('/member/consultations-hub') || isActive('/member/timeline')
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                                }`}
                            >
                                <span>Layanan Klinis</span>
                                <span className="material-symbols-outlined text-[15px] transition-transform duration-200">
                                    {clinicalDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {/* Dropdown Panel "Menu di Dalam Menu" */}
                            {clinicalDropdownOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-165 bg-white border border-surface-container-high rounded-3xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* Submenu Header Strip */}
                                    <div className="pb-3 mb-3 border-b border-surface-container flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                            <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider">
                                                Layanan Klinis &amp; Diagnostik Terpadu
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-primary font-medium bg-[#edf5f0] px-2.5 py-0.5 rounded-full border border-[#d2e5da]">
                                            Kompatibel SatuSehat Kemenkes
                                        </span>
                                    </div>

                                    {/* Layout Menu di Dalam Menu: Kolom Kiri (Kategori Menu) & Kolom Kanan (Sub-Item Menu) */}
                                    <div className="grid grid-cols-12 gap-3 items-stretch">
                                        {/* Kolom Kiri: Menu Kategori */}
                                        <div className="col-span-5 border-r border-surface-container pr-2 space-y-1">
                                            <span className="text-[10px] font-semibold text-[#70827d] uppercase tracking-wider px-2 block mb-1.5">
                                                Kategori Menu:
                                            </span>
                                            {clinicalSubmenus.map((cat) => {
                                                const isCatActive = cat.id === activeClinicalTab;
                                                return (
                                                    <button
                                                        key={cat.id}
                                                        type="button"
                                                        onMouseEnter={() => setActiveClinicalTab(cat.id)}
                                                        onClick={() => setActiveClinicalTab(cat.id)}
                                                        className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                                                            isCatActive
                                                                ? 'bg-[#edf5f0] text-primary border border-[#cbe0d4] shadow-2xs'
                                                                : 'hover:bg-surface-container-low text-[#475b56]'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2.5 overflow-hidden">
                                                            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                                                isCatActive ? 'bg-primary text-white' : 'bg-surface-container text-[#4e615b] group-hover:bg-[#dcefe5] group-hover:text-primary'
                                                            }`}>
                                                                <span className="material-symbols-outlined text-[16px]">
                                                                    {cat.icon}
                                                                </span>
                                                            </div>
                                                            <div className="overflow-hidden">
                                                                <span className={`text-xs block truncate ${isCatActive ? 'font-bold text-primary' : 'font-medium'}`}>
                                                                    {cat.title}
                                                                </span>
                                                                <span className="text-[10px] text-[#70827d] block truncate">
                                                                    {cat.desc}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className={`material-symbols-outlined text-[15px] shrink-0 transition-transform ${
                                                            isCatActive ? 'text-primary translate-x-0.5' : 'text-[#a1b3ad]'
                                                        }`}>
                                                            chevron_right
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Kolom Kanan: Isi Submenu dari Kategori Terpilih */}
                                        <div className="col-span-7 pl-1 space-y-1.5">
                                            <div className="flex items-center justify-between pb-1.5">
                                                <span className="text-[10px] font-semibold text-[#70827d] uppercase tracking-wider block">
                                                    Sub-Item: {activeClinicalGroup.title}
                                                </span>
                                                <span className="text-[9px] px-2 py-0.5 rounded-md bg-surface-container text-primary font-medium">
                                                    {activeClinicalGroup.badge}
                                                </span>
                                            </div>

                                            <div className="space-y-1.5">
                                                {activeClinicalGroup.items.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.href}
                                                        onClick={() => setClinicalDropdownOpen(false)}
                                                        className="p-2.5 rounded-2xl hover:bg-[#edf5f0]/80 transition-all flex items-start gap-2.5 group border border-transparent hover:border-[#cbe0d4]"
                                                    >
                                                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-150">
                                                            <span className="material-symbols-outlined text-[18px]">
                                                                {item.icon}
                                                            </span>
                                                        </div>
                                                        <div className="space-y-0.5 overflow-hidden flex-1">
                                                            <div className="flex items-center justify-between gap-1">
                                                                <h4 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                                                                    {item.name}
                                                                </h4>
                                                                <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-[#edf5f0] text-primary font-mono font-medium shrink-0">
                                                                    {item.badge}
                                                                </span>
                                                            </div>
                                                            <p className="text-[10px] text-on-surface-variant line-clamp-1">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="mt-3 pt-2.5 border-t border-surface-container flex items-center justify-between text-[10px] text-[#6e807b]">
                                        <span>Protokol Klinis PERKENI &amp; Kemenkes RI</span>
                                        <span className="text-primary font-medium">Enkripsi Medis Terstandar AES-256</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. Program & Komunitas (Submenu) */}
                        <div className="relative" ref={programsRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setProgramsDropdownOpen(!programsDropdownOpen);
                                    setClinicalDropdownOpen(false);
                                    setReportsDropdownOpen(false);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    programsDropdownOpen || isActive('/member/challenges') || isActive('/member/community') || isActive('/arcade')
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                                }`}
                            >
                                <span>Program &amp; Komunitas</span>
                                <span className="material-symbols-outlined text-[15px]">
                                    {programsDropdownOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {/* Dropdown Program */}
                            {programsDropdownOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-92 bg-white border border-surface-container-high rounded-2xl p-2.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                                    <div className="px-2.5 py-1.5 border-b border-surface-container flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                                            Aktivitas, Remisi &amp; Komunitas
                                        </span>
                                        <span className="text-[9px] text-primary font-semibold">
                                            Mikro-Habit
                                        </span>
                                    </div>
                                    {programItems.map((prog, pIdx) => (
                                        <Link
                                            key={pIdx}
                                            href={prog.href}
                                            onClick={() => setProgramsDropdownOpen(false)}
                                            className="p-2.5 rounded-xl hover:bg-[#edf5f0]/80 transition-all flex items-start gap-2.5 group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {prog.icon}
                                                </span>
                                            </div>
                                            <div className="space-y-0.5 overflow-hidden flex-1">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="text-xs font-bold text-on-surface block group-hover:text-primary">
                                                        {prog.name}
                                                    </span>
                                                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-[#edf5f0] text-primary font-mono font-bold shrink-0">
                                                        {prog.badge}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-on-surface-variant block line-clamp-1">
                                                    {prog.desc}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 4. Paket Keanggotaan */}
                        <Link
                            href="/paket"
                            className={`px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                                isActive('/paket')
                                    ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da] shadow-2xs'
                                    : 'font-medium text-[#4e615b] hover:text-primary hover:bg-[#edf5f0]/80'
                            }`}
                        >
                            Paket
                        </Link>

                        {/* 5. FAQ */}
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

                        {/* 6. Laporan Dropdown */}
                        <div className="relative" ref={reportsRef}>
                            <button
                                type="button"
                                onClick={() => {
                                    setReportsDropdownOpen(!reportsDropdownOpen);
                                    setClinicalDropdownOpen(false);
                                    setProgramsDropdownOpen(false);
                                }}
                                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                                    reportsDropdownOpen || isActive('/instructor/reports') || isActive('/admin/reports')
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
                                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-surface-container-high rounded-2xl p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="px-2.5 py-1.5 border-b border-surface-container flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                                            Tata Kelola &amp; Audit
                                        </span>
                                    </div>
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

                {/* Mobile Drawer dengan Submenu Berjenjang Terstruktur */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-surface-container-high px-4 sm:px-6 py-4 space-y-3 animate-in fade-in duration-200 shadow-xl max-h-[85vh] overflow-y-auto">
                        {/* 1. Direct Primary Nav: Beranda, Paket, FAQ */}
                        <div className="grid grid-cols-3 gap-2">
                            <Link
                                href="/"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`py-2 px-2.5 rounded-xl text-center text-xs transition-all ${
                                    isActive('/') ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da]' : 'bg-surface-container text-[#475b56]'
                                }`}
                            >
                                Beranda
                            </Link>
                            <Link
                                href="/paket"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`py-2 px-2.5 rounded-xl text-center text-xs transition-all ${
                                    isActive('/paket') ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da]' : 'bg-surface-container text-[#475b56]'
                                }`}
                            >
                                Paket
                            </Link>
                            <Link
                                href="/faq"
                                onClick={() => setMobileMenuOpen(false)}
                                className={`py-2 px-2.5 rounded-xl text-center text-xs transition-all ${
                                    isActive('/faq') ? 'bg-[#edf5f0] text-primary font-bold border border-[#d2e5da]' : 'bg-surface-container text-[#475b56]'
                                }`}
                            >
                                FAQ
                            </Link>
                        </div>

                        {/* 2. Layanan Klinis Accordion (Menu di dalam Menu) */}
                        <div className="border border-surface-container rounded-2xl overflow-hidden bg-white">
                            <button
                                type="button"
                                onClick={() => setMobileClinicalOpen(!mobileClinicalOpen)}
                                className="w-full px-3.5 py-3 flex items-center justify-between bg-[#edf5f0]/50 text-xs font-bold text-primary cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">biotech</span>
                                    <span>Layanan Klinis &amp; Diagnostik</span>
                                </div>
                                <span className="material-symbols-outlined text-[16px]">
                                    {mobileClinicalOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {mobileClinicalOpen && (
                                <div className="p-2 space-y-3">
                                    {clinicalSubmenus.map((cat) => (
                                        <div key={cat.id} className="space-y-1">
                                            <span className="text-[10px] font-semibold text-[#6e807b] uppercase tracking-wider px-2 block">
                                                {cat.title}
                                            </span>
                                            {cat.items.map((sub, sIdx) => (
                                                <Link
                                                    key={sIdx}
                                                    href={sub.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="px-2.5 py-2 rounded-xl flex items-center justify-between text-xs text-[#3d504c] hover:bg-[#edf5f0] hover:text-primary transition-all"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-[16px] text-primary">
                                                            {sub.icon}
                                                        </span>
                                                        <span>{sub.name}</span>
                                                    </div>
                                                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface-container text-primary font-mono">
                                                        {sub.badge}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3. Program & Komunitas Accordion */}
                        <div className="border border-surface-container rounded-2xl overflow-hidden bg-white">
                            <button
                                type="button"
                                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                                className="w-full px-3.5 py-3 flex items-center justify-between bg-[#edf5f0]/50 text-xs font-bold text-primary cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                                    <span>Program &amp; Komunitas</span>
                                </div>
                                <span className="material-symbols-outlined text-[16px]">
                                    {mobileProgramsOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {mobileProgramsOpen && (
                                <div className="p-2 space-y-1">
                                    {programItems.map((prog, pIdx) => (
                                        <Link
                                            key={pIdx}
                                            href={prog.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-2.5 py-2.5 rounded-xl flex items-center justify-between text-xs text-[#3d504c] hover:bg-[#edf5f0] hover:text-primary transition-all"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-primary">
                                                    {prog.icon}
                                                </span>
                                                <span>{prog.name}</span>
                                            </div>
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface-container text-primary font-mono">
                                                {prog.badge}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 4. Portal Laporan Accordion */}
                        <div className="border border-surface-container rounded-2xl overflow-hidden bg-white">
                            <button
                                type="button"
                                onClick={() => setMobileReportsOpen(!mobileReportsOpen)}
                                className="w-full px-3.5 py-3 flex items-center justify-between bg-surface-container-low text-xs font-bold text-[#445752] cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                                    <span>Laporan &amp; Tata Kelola</span>
                                </div>
                                <span className="material-symbols-outlined text-[16px]">
                                    {mobileReportsOpen ? 'expand_less' : 'expand_more'}
                                </span>
                            </button>

                            {mobileReportsOpen && (
                                <div className="p-2 space-y-1">
                                    {reportItems.map((r, rIdx) => (
                                        <Link
                                            key={rIdx}
                                            href={r.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="px-2.5 py-2 rounded-xl flex items-center justify-between text-xs text-[#3d504c] hover:bg-[#edf5f0] hover:text-primary transition-all"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-[16px] text-primary">
                                                    {r.icon}
                                                </span>
                                                <span>{r.name}</span>
                                            </div>
                                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface-container text-primary font-semibold">
                                                {r.role}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 5. Auth Buttons */}
                        <div className="pt-2 grid grid-cols-2 gap-3">
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
