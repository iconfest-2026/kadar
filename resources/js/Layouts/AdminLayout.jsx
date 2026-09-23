import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AdminBadge from '../Components/Admin/AdminBadge';

export default function AdminLayout({ children, title, activeNav }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;
    const userStatus = user?.status || 'ACTIVE';

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    const navSections = [
        {
            title: 'Tata Kelola Utama',
            items: [
                { key: 'dashboard', label: 'Dashboard Ringkasan', icon: 'dashboard', href: '/admin/dashboard' },
                { key: 'users', label: 'Pengguna & Peran', icon: 'group', href: '/admin/users' },
                { key: 'instructors', label: 'Verifikasi Instruktur', icon: 'verified_user', href: '/admin/instructors' },
            ],
        },
        {
            title: 'Layanan Medis & AI',
            items: [
                { key: 'scanner', label: 'Scanner Kamera OCR', icon: 'document_scanner', href: '/admin/scanner' },
                { key: 'consultations', label: 'Konsultasi & Booking', icon: 'forum', href: '/admin/consultations' },
                { key: 'health-tracker', label: 'Tracker & Rekam Medis', icon: 'vital_signs', href: '/admin/health-tracker' },
                { key: 'recommendations', label: 'Rekomendasi & HBE', icon: 'psychology', href: '/admin/recommendations' },
            ],
        },
        {
            title: 'Program & Komunitas',
            items: [
                { key: 'programs', label: 'Program Kohor', icon: 'inventory_2', href: '/admin/programs' },
                { key: 'challenges', label: 'Challenge Komunitas', icon: 'emoji_events', href: '/admin/challenges' },
                { key: 'community', label: 'Forum & Diskusi', icon: 'groups', href: '/admin/community' },
                { key: 'gamification', label: 'Badge & Gamifikasi', icon: 'military_tech', href: '/admin/gamification' },
            ],
        },
        {
            title: 'Monetisasi & Keselamatan',
            items: [
                { key: 'memberships', label: 'Tier Membership', icon: 'workspace_premium', href: '/admin/memberships' },
                { key: 'emergency', label: 'Tanggap Darurat 119', icon: 'emergency', href: '/admin/emergency' },
                { key: 'reports', label: 'Laporan & Analitik', icon: 'analytics', href: '/admin/reports' },
                { key: 'audit', label: 'Audit Trail Forensik', icon: 'shield', href: '/admin/audit' },
                { key: 'settings', label: 'Konfigurasi Sistem', icon: 'tune', href: '/admin/settings' },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#f0f8f4] text-on-surface flex font-sans antialiased selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
            <Head title={title ? `${title} — Tata Kelola AEVYRA` : 'Admin Panel — AEVYRA'} />

            {/* Hardware-Accelerated Ambient Background Glow (Isolate Paint Layer) */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden gpu-layer contain-paint">
                <div className="absolute -top-24 left-1/4 w-[650px] h-[350px] bg-gradient-to-tr from-primary-fixed-dim/30 via-primary-fixed/20 to-transparent blur-[80px] rounded-full gpu-layer" />
                <div className="absolute top-[40%] -right-24 w-[500px] h-[450px] bg-gradient-to-bl from-secondary-fixed/25 via-primary-container/15 to-transparent blur-[80px] rounded-full gpu-layer" />
                <div className="absolute bottom-10 left-1/3 w-[550px] h-[350px] bg-gradient-to-tr from-primary-fixed/25 to-transparent blur-[80px] rounded-full gpu-layer" />
                <div className="absolute inset-0 bg-[radial-gradient(#00433e_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.035]" />
            </div>

            {/* Mobile Overlay */}
            {mobileNavOpen && (
                <div 
                    className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setMobileNavOpen(false)}
                />
            )}

            {/* Frosted Glass Sidebar (GPU Layer Promoted) */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/90 backdrop-blur-md border-r border-primary/10 flex flex-col transition-transform duration-300 shadow-[0_4px_30px_rgba(0,67,62,0.04)] lg:translate-x-0 gpu-layer ${
                    mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Header */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-primary/10 shrink-0 bg-white/60">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <img
                            src="/image/Logo_AEVYRA_Icon.png"
                            alt="AEVYRA Logo"
                            className="w-10 h-10 rounded-2xl object-contain shadow-xs group-hover:scale-105 transition-transform"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-heading font-black text-xl tracking-tight text-primary">AEVYRA</span>
                                <span className="px-2 py-0.5 text-[9px] font-label-mono font-bold uppercase rounded-full bg-primary/10 text-primary border border-primary/15">
                                    ADMIN
                                </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant font-medium">Tata Kelola & 11 Modul</p>
                        </div>
                    </Link>
                    <button 
                        className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => setMobileNavOpen(false)}
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Categorized Navigation Menu */}
                <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin">
                    {navSections.map((section, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                            <div className="px-3 pb-1">
                                <span className="text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant/70">
                                    {section.title}
                                </span>
                            </div>
                            <div className="space-y-1">
                                {section.items.map((item) => {
                                    const isActive = activeNav === item.key;
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200 text-xs font-medium ${
                                                isActive 
                                                ? 'bg-primary text-white font-semibold shadow-xs shadow-primary/25 translate-x-1' 
                                                : 'text-on-surface-variant hover:text-primary hover:bg-white/80 hover:translate-x-1 border border-transparent hover:border-primary/10'
                                            }`}
                                            onClick={() => setMobileNavOpen(false)}
                                        >
                                            <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-primary/70'}`}>
                                                {item.icon}
                                            </span>
                                            <span className="truncate">{item.label}</span>
                                            {isActive && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Status Profile Card in Sidebar */}
                <div className="p-4 border-t border-primary/10 shrink-0 bg-white/60">
                    <div className="bg-white/90 rounded-2xl p-3 border border-primary/10 shadow-xs">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading font-black text-primary text-sm">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-on-surface truncate">{user?.name}</p>
                                <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
                            </div>
                        </div>

                        {/* Status pill & role indicator */}
                        <div className="flex items-center justify-between pt-2 border-t border-primary/5">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-on-surface-variant font-medium">Status:</span>
                                <AdminBadge variant={userStatus} size="xs" pulse={userStatus === 'ACTIVE'}>
                                    {userStatus}
                                </AdminBadge>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                                title="Keluar dari sesi Admin"
                            >
                                <span className="material-symbols-outlined text-[16px]">logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:ml-72 relative z-10">
                {/* Optimized Topbar */}
                <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-primary/10 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all gpu-layer">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileNavOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-white/80 hover:text-primary transition-colors border border-primary/10"
                        >
                            <span className="material-symbols-outlined text-[22px]">menu</span>
                        </button>
                        <div>
                            <span className="text-[10px] font-label-mono uppercase tracking-wider text-on-surface-variant/80 font-bold block">
                                Panel Administrator AEVYRA
                            </span>
                            <h1 className="text-lg sm:text-xl font-heading font-bold text-primary tracking-tight">
                                {title || 'Dashboard Tata Kelola'}
                            </h1>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Status Pill in Topbar */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/90 rounded-full border border-primary/10 shadow-xs">
                            <span className="text-[11px] font-medium text-on-surface-variant">Sistem:</span>
                            <AdminBadge variant={userStatus} size="xs" pulse={userStatus === 'ACTIVE'}>
                                {userStatus}
                            </AdminBadge>
                        </div>

                        {/* Notifications */}
                        <button className="p-2.5 rounded-xl bg-white/90 text-on-surface-variant hover:text-primary hover:bg-white border border-primary/10 shadow-xs transition-all relative">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full ring-2 ring-white"></span>
                        </button>
                        
                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-white/90 border border-primary/10 hover:border-primary/20 shadow-xs transition-all"
                            >
                                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-bold text-xs shadow-xs">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <div className="hidden md:flex flex-col text-left">
                                    <span className="text-xs font-bold text-on-surface truncate max-w-28 leading-tight">
                                        {user?.name}
                                    </span>
                                    <span className="text-[10px] font-label-mono text-primary font-semibold leading-tight">
                                        Super Admin
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
                                            <span className="text-[10px] text-on-surface-variant">Status Akses:</span>
                                            <AdminBadge variant={userStatus} size="xs">
                                                {userStatus}
                                            </AdminBadge>
                                        </div>
                                    </div>
                                    <Link
                                        href="/admin/settings"
                                        className="w-full text-left px-4 py-2 text-xs text-on-surface hover:bg-primary/5 flex items-center gap-2 transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                                        <span>Konfigurasi Platform</span>
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

                {/* Main Body with Optimized Rendering */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6 content-visibility-auto">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="p-4 bg-emerald-50 text-emerald-900 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-3 shadow-xs animate-in slide-in-from-top duration-200">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </div>
                            <span className="flex-1">{flash.success}</span>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-rose-50 text-rose-900 text-xs font-semibold rounded-2xl border border-rose-200 flex items-center gap-3 shadow-xs animate-in slide-in-from-top duration-200">
                            <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">error</span>
                            </div>
                            <span className="flex-1">{flash.error}</span>
                        </div>
                    )}

                    {children}
                </main>

                {/* Footer */}
                <footer className="mt-auto border-t border-primary/10 py-5 bg-white/60 text-xs text-on-surface-variant px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="font-medium text-center sm:text-left">
                            © 2026 AEVYRA — Sistem Tata Kelola Kesehatan Preventif & Medis.
                        </p>
                        <div className="flex items-center gap-3 text-[11px] font-label-mono">
                            <span className="px-2 py-0.5 rounded bg-white/80 border border-primary/10">Buku Besar Forensik Imutabel</span>
                            <span>•</span>
                            <span>AES-256 Enkripsi</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
