import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import LogoutConfirmModal from '../../Components/LogoutConfirmModal';

export default function MenuHub({ user, profile, membership, streak, totalPoints }) {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || '',
        display_name: profile?.display_name || user?.name || '',
        occupation: profile?.occupation || '',
        sex: profile?.sex || 'MALE',
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        post('/member/menu/profile', {
            onSuccess: () => setIsEditProfileOpen(false),
            preserveScroll: true,
        });
    };

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const menuSections = [
        {
            title: 'Layanan Kesehatan & AI',
            items: [
                {
                    name: 'Scanner Gizi & BPOM (AI)',
                    desc: 'Pindai makanan & evaluasi beban glikemik',
                    href: '/member/scanner',
                    icon: 'photo_camera',
                    color: 'bg-emerald-500/10 text-emerald-600',
                },
                {
                    name: 'Timeline & Riwayat Medis',
                    desc: 'Jurnal rekam jejak biomarker terverifikasi',
                    href: '/member/timeline',
                    icon: 'history_edu',
                    color: 'bg-primary/10 text-primary',
                },
                {
                    name: 'Tele-Konsultasi Dokter',
                    desc: 'Booking sesi privat bersama dokter spesialis',
                    href: '/member/consultations-hub',
                    icon: 'support_agent',
                    color: 'bg-indigo-500/10 text-indigo-600',
                },
                {
                    name: 'Tracker & Tren Baseline',
                    desc: 'Grafik interaktif kurva biologis personal 14-hari',
                    href: '/member/tracker',
                    icon: 'monitoring',
                    color: 'bg-primary/10 text-primary',
                },
                {
                    name: 'Kesehatan Spesifik Gender',
                    desc: 'Siklus haid wanita & skrining vitalitas pria',
                    href: '/member/vitality',
                    icon: 'vital_signs',
                    color: 'bg-rose-500/10 text-rose-600',
                },
                {
                    name: 'Dokter Pendamping Binaan',
                    desc: 'Daftar instruktur & tim klinis',
                    href: '/member/instructors',
                    icon: 'medical_services',
                    color: 'bg-teal-500/10 text-teal-600',
                },
            ],
        },
        {
            title: 'Program & Komunitas',
            items: [
                {
                    name: 'Tantangan Sehat',
                    desc: 'Ikuti challenge 14-90 hari bersama member',
                    href: '/member/challenges',
                    icon: 'emoji_events',
                    color: 'bg-amber-500/10 text-amber-600',
                },
                {
                    name: 'Forum Komunitas',
                    desc: 'Diskusi pola makan, resep & tips kesehatan',
                    href: '/member/community',
                    icon: 'groups',
                    color: 'bg-sky-500/10 text-sky-600',
                },
                {
                    name: 'Game Edukasi 2D Metabolisme',
                    desc: 'Permainan edukatif asupan gizi interaktif',
                    href: '/arcade',
                    icon: 'sports_esports',
                    color: 'bg-purple-500/10 text-purple-600',
                },
            ],
        },
        {
            title: 'Pengaturan & Layanan',
            items: [
                {
                    name: 'Informasi & Pengaturan Akun',
                    desc: 'Edit profil, ubah kata sandi & koneksi Google SSO',
                    href: '/member/account',
                    icon: 'manage_accounts',
                    color: 'bg-primary/10 text-primary',
                    badge: user?.is_google_connected ? 'Google Terhubung' : null,
                },
                {
                    name: 'Paket Langganan SaaS',
                    desc: membership?.has_pending_downgrade 
                        ? `Beralih ke ${membership.pending_downgrade?.tier_name} (${membership.pending_downgrade?.effective_at})`
                        : `Paket aktif: ${membership?.current_tier || 'Gratis'} - Kelola di sini`,
                    href: '/paket',
                    icon: 'workspace_premium',
                    color: 'bg-amber-500/10 text-amber-600',
                },
                {
                    name: 'Pusat Bantuan & FAQ',
                    desc: 'Pertanyaan seputar aplikasi dan privasi',
                    href: '/faq',
                    icon: 'help_outline',
                    color: 'bg-slate-500/10 text-slate-600',
                },
                {
                    name: 'Ambulans Darurat GPS 119',
                    desc: 'Panggilan tanggap darurat ambulans medis',
                    href: '/demo/emergency',
                    icon: 'emergency',
                    color: 'bg-rose-500/10 text-rose-600',
                },
            ],
        },
    ];

    return (
        <AppLayout title="Menu & Profil" activeTab="menu">
            <Head title="Menu Utama & Profil - AEVYRA" />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 space-y-4 pb-2">
                
                {/* 1. TOP HEAD PROFILE CARD (APP-STYLE) */}
                <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-xs space-y-3">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                            {/* Avatar */}
                            {user?.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt={user.name}
                                    className="w-13 h-13 rounded-2xl object-cover border border-white/30 shadow-xs shrink-0"
                                />
                            ) : (
                                <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center font-heading font-black text-xl text-white shrink-0">
                                    {(user?.name || 'U').charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Name & Occupation */}
                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h1 className="font-heading font-black text-base sm:text-lg text-white truncate leading-tight">
                                        {profile?.display_name || user?.name}
                                    </h1>
                                    <span className="px-2 py-0.2 rounded-full bg-white/20 text-[9px] font-bold font-label-mono text-emerald-200 uppercase shrink-0">
                                        {membership?.current_tier || membership?.tier || 'Gratis'}
                                    </span>
                                    {membership?.has_pending_downgrade && (
                                        <span className="px-2 py-0.2 rounded-full bg-amber-400/30 text-[9px] font-bold font-label-mono text-amber-200 shrink-0">
                                            Jadwal: {membership.pending_downgrade?.tier_name}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-white/80 truncate mt-0.5">
                                    {profile?.occupation || user?.email}
                                </p>
                            </div>
                        </div>

                        {/* Detail & Pengaturan Akun Button */}
                        <Link
                            href="/member/account"
                            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
                            title="Buka Informasi & Pengaturan Akun"
                        >
                            <span className="material-symbols-outlined text-[15px]">manage_accounts</span>
                            <span>Detail Akun</span>
                        </Link>
                    </div>

                    {/* Streak & Points Mini Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/15 text-center">
                        <div className="py-1 px-2 rounded-xl bg-black/15 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-amber-300 text-[18px]">local_fire_department</span>
                            <span className="text-xs font-bold">{streak?.current || 1} Hari Disiplin</span>
                        </div>
                        <div className="py-1 px-2 rounded-xl bg-black/15 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-emerald-300 text-[18px]">stars</span>
                            <span className="text-xs font-bold">{totalPoints || 0} Poin Reward</span>
                        </div>
                    </div>
                </div>

                {/* 2. MENU SECTIONS LIST */}
                <div className="space-y-4">
                    {menuSections.map((sec, secIdx) => (
                        <div key={secIdx} className="space-y-1.5">
                            <span className="text-[10px] font-label-mono font-bold uppercase tracking-wider text-on-surface-variant px-1 block">
                                {sec.title}
                            </span>

                            <div className="rounded-2xl bg-white dark:bg-surface border border-surface-container overflow-hidden divide-y divide-surface-container/60 shadow-2xs">
                                {sec.items.map((item, itemIdx) => (
                                    <Link
                                        key={itemIdx}
                                        href={item.href}
                                        className="p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:bg-surface-container-low transition-colors group active:scale-[0.99]"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-xs text-on-surface truncate group-hover:text-primary transition-colors">
                                                        {item.name}
                                                    </h3>
                                                    {item.badge && (
                                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-label-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-on-surface-variant truncate mt-0.5">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="material-symbols-outlined text-on-surface-variant/50 group-hover:text-primary transition-colors text-[18px] shrink-0">
                                            chevron_right
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. LOGOUT BUTTON */}
                <div className="pt-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full py-3 px-4 rounded-2xl bg-white dark:bg-surface border border-rose-500/20 text-rose-600 hover:bg-rose-500/5 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        <span>Keluar dari Akun</span>
                    </button>
                </div>

                {/* ========================================================================= */}
                {/* EDIT PROFILE MODAL (POP-UP SEDERHANA)                                      */}
                {/* ========================================================================= */}
                {isEditProfileOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                        <div 
                            className="bg-white dark:bg-surface w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-surface-container space-y-4 animate-in zoom-in-95 duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between border-b border-surface-container pb-3">
                                <h3 className="font-heading font-black text-base text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">manage_accounts</span>
                                    <span>Edit Profil Anda</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setIsEditProfileOpen(false)}
                                    className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleSaveProfile} className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-on-surface block">
                                        Nama Lengkap:
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    {errors.name && <p className="text-[10px] text-rose-600 font-medium">{errors.name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-on-surface block">
                                        Nama Panggilan:
                                    </label>
                                    <input
                                        type="text"
                                        value={data.display_name}
                                        onChange={(e) => setData('display_name', e.target.value)}
                                        placeholder="Nama yang disapa aplikasi"
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-on-surface block">
                                        Pekerjaan / Aktivitas:
                                    </label>
                                    <input
                                        type="text"
                                        value={data.occupation}
                                        onChange={(e) => setData('occupation', e.target.value)}
                                        placeholder="Contoh: Pegawai Kantor, Dokter, dll"
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-on-surface block">
                                        Jenis Kelamin:
                                    </label>
                                    <select
                                        value={data.sex}
                                        onChange={(e) => setData('sex', e.target.value)}
                                        className="w-full p-2.5 rounded-xl border border-surface-container bg-surface-container-low text-xs text-on-surface font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
                                    >
                                        <option value="MALE">Laki-laki</option>
                                        <option value="FEMALE">Perempuan</option>
                                    </select>
                                </div>

                                <div className="pt-2 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditProfileOpen(false)}
                                        className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Logout Confirmation Modal */}
                <LogoutConfirmModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    userRole="Member"
                />
            </div>
        </AppLayout>
    );
}

