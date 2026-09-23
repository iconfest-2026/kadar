import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [selectedRole, setSelectedRole] = useState('member'); // 'member' | 'instructor' | 'admin'
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: 'member@aevyra.health',
        password: 'password',
        remember: true,
    });

    const roleConfigs = {
        member: {
            name: 'Member',
            title: 'Member Preventif',
            subtitle: 'Pasien & Anggota Sehat',
            email: 'member@aevyra.health',
            icon: 'person',
            color: 'from-primary to-primary-container',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            buttonText: 'Masuk sebagai Member Preventif',
            desc: 'Akses scanner kamera makanan/obat BPOM, tracker glukosa darah, program habit 14-90 hari, dan konsultasi dokter.',
            previewBadge: 'Portal Member • HealthCheck 2026',
            previewTitle: 'Deteksi dampak nutrisi sebelum suapan pertama.',
            previewQuote: 'Membedah komposisi gizi, gula tersembunyi, dan izin resmi BPOM dalam 0.4 detik untuk mencegah lonjakan glukosa darah.',
            previewImage: '/image/hero_lifestyle_scan.jpg',
            previewStats: [
                { label: 'Database BPOM', val: '120.000+' },
                { label: 'Kecepatan', val: '< 0.4 Detik' },
                { label: 'Akurasi OCR', val: '98.4%' },
            ],
        },
        instructor: {
            name: 'Instruktur',
            title: 'Instruktur Klinis',
            subtitle: 'Dokter Spesialis & Dietisien',
            email: 'instruktur@aevyra.health',
            icon: 'health_and_safety',
            color: 'from-emerald-700 to-teal-800',
            badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
            buttonText: 'Masuk Portal Dokter / Instruktur',
            desc: 'Kelola caseload pasien binaan, verifikasi jadwal telemedisin, terbitkan intervensi diet, dan evaluasi laporan kepatuhan.',
            previewBadge: 'Konsol Dokter IDI • Verifikasi STR',
            previewTitle: 'Bimbingan klinis 1-on-1 berbasis bukti ilmiah.',
            previewQuote: 'Mendampingi pasien pra-diabetes menuju remisi glukosa menggunakan panduan PERKENI dan rekam medis terpadu.',
            previewImage: '/image/doctor_consultation.jpg',
            previewStats: [
                { label: 'SLA Respon', val: '< 5 Menit' },
                { label: 'Standar Medis', val: 'PERKENI' },
                { label: 'Koneksi Faskes', val: 'SatuSehat' },
            ],
        },
        admin: {
            name: 'Admin',
            title: 'Administrator',
            subtitle: 'Tata Kelola Medis & Sistem',
            email: 'admin@aevyra.health',
            icon: 'admin_panel_settings',
            color: 'from-slate-800 to-slate-900',
            badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
            buttonText: 'Masuk Konsol Administrator',
            desc: 'Manajemen hak akses pengguna, persetujuan STR instruktur, audit forensik keamanan, dan pemantauan siaga ambulans 119.',
            previewBadge: 'Konsol Tata Kelola Medis & Audit',
            previewTitle: 'Pengawasan privasi dan keamanan sistem kesehatan.',
            previewQuote: 'Memastikan kepatuhan UU PDP No. 27/2022, audit forensik rekam medis digital, dan keandalan failover AI 24/7.',
            previewImage: '/image/doctor_bramantyo.jpg',
            previewStats: [
                { label: 'Kepatuhan Regulasi', val: 'UU PDP' },
                { label: 'Enkripsi Data', val: 'AES-256' },
                { label: 'Sistem Failover', val: '4-Tier AI' },
            ],
        },
    };

    const handleRoleSelect = (roleKey) => {
        setSelectedRole(roleKey);
        setData('email', roleConfigs[roleKey].email);
        setData('password', 'password');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const activeConfig = roleConfigs[selectedRole];

    return (
        <AuthLayout>
            <Head title="Masuk Akun — AEVYRA HealthCheck" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-295">
                {/* Left Column: Form & Role Switcher */}
                <div className="lg:col-span-7 bg-white dark:bg-surface p-6 sm:p-8 lg:p-10 rounded-3xl border border-surface-container-high shadow-[0_8px_30px_rgba(0,40,36,0.03)] flex flex-col justify-between space-y-6">
                    <div>
                        {/* Eyebrow & Headline */}
                        <div className="space-y-1.5 pb-4 border-b border-surface-container">
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#edf5f0] text-[#1c6454] text-[10px] font-semibold border border-[#d4e8dd]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span>Gerbang Autentikasi Pengguna Terverifikasi</span>
                            </div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#122824]">
                                Masuk ke Portal AEVYRA
                            </h1>
                            <p className="text-xs text-[#52645f] leading-relaxed">
                                {activeConfig.desc}
                            </p>
                        </div>

                        {/* Interactive Role Switcher Tabs */}
                        <div className="mt-5 space-y-2">
                            <label className="text-[11px] font-bold text-on-surface uppercase tracking-wider block">
                                Pilih Peran Masuk (Demo Cepat 1-Klik):
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.keys(roleConfigs).map((key) => {
                                    const role = roleConfigs[key];
                                    const isSelected = selectedRole === key;
                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleRoleSelect(key)}
                                            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                                                isSelected
                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                                                    : 'border-surface-container bg-surface-container-lowest hover:border-primary/30'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                                                    isSelected ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                                                }`}>
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        {role.icon}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                                )}
                                            </div>
                                            <span className={`text-xs font-bold block ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                                                {role.name}
                                            </span>
                                            <span className="text-[10px] text-on-surface-variant truncate block">
                                                {role.subtitle}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                                    <span>Alamat Email</span>
                                    <span className="text-[10px] text-primary font-mono font-semibold">
                                        Peran: {activeConfig.title}
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@aevyra.health"
                                        className="w-full pl-3.5 pr-10 py-3 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                                        mail
                                    </span>
                                </div>
                                {errors.email && (
                                    <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <label className="font-bold text-on-surface">Kata Sandi</label>
                                    <span className="text-[10px] text-on-surface-variant font-mono">
                                        Demo: password
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-3.5 pr-10 py-3 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface cursor-pointer p-0.5"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-[11px] text-rose-600 font-medium">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-xs pt-1">
                                <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-surface-container text-primary focus:ring-primary"
                                    />
                                    <span>Ingat sesi saya di peramban ini</span>
                                </label>
                                <span className="text-primary hover:underline cursor-pointer text-[11px]">
                                    Lupa sandi?
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">login</span>
                                <span>{processing ? 'Memverifikasi Akses...' : activeConfig.buttonText}</span>
                            </button>
                        </form>
                    </div>

                    {/* Bottom Accreditation Note */}
                    <div className="pt-4 border-t border-surface-container text-center space-y-2">
                        <p className="text-xs text-on-surface-variant">
                            Belum memiliki akun?{' '}
                            <Link href="/register" className="text-primary font-bold hover:underline">
                                Mulai Skrining Mandiri Gratis →
                            </Link>
                        </p>
                        <div className="flex items-center justify-center gap-3 text-[10px] text-on-surface-variant/80 font-mono">
                            <span>SatuSehat Terhubung</span>
                            <span>•</span>
                            <span>UU PDP No. 27/2022</span>
                            <span>•</span>
                            <span>SSL 256-Bit</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Role Showcase (Theme Aligned with Landing Page) */}
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-7 rounded-3xl bg-[#f2f7f4] border border-[#d6e7dd] relative overflow-hidden shadow-xs">
                    {/* Top Role Badge */}
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${activeConfig.badgeBg}`}>
                                {activeConfig.previewBadge}
                            </span>
                            <span className="font-mono text-[10px] text-[#48635c]">
                                Lingkungan Aman
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-serif text-2xl font-normal text-[#122824] leading-snug">
                                {activeConfig.previewTitle}
                            </h2>
                            <p className="text-xs text-[#48635c] leading-relaxed">
                                {activeConfig.previewQuote}
                            </p>
                        </div>

                        {/* Image Frame */}
                        <div className="h-48 rounded-2xl overflow-hidden border border-[#cfe1d7] shadow-inner relative group">
                            <img
                                src={activeConfig.previewImage}
                                alt={activeConfig.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg">
                                    {activeConfig.title}
                                </span>
                            </div>
                        </div>

                        {/* Dynamic Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            {activeConfig.previewStats.map((s, idx) => (
                                <div key={idx} className="p-2.5 rounded-xl bg-white/90 border border-[#cfe1d7] text-center">
                                    <span className="font-serif text-sm font-bold text-primary block leading-tight">
                                        {s.val}
                                    </span>
                                    <span className="text-[10px] text-[#556e67] block mt-0.5">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Medical Advisor Quote */}
                    <div className="pt-4 border-t border-[#d6e7dd] relative z-10 flex items-center gap-3">
                        <img
                            src="/image/doctor_bramantyo.jpg"
                            alt="dr. Bramantyo"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                        />
                        <div className="text-xs leading-tight">
                            <span className="font-serif font-bold text-[#142622] block">
                                dr. H. Bramantyo, Sp.PD
                            </span>
                            <span className="text-[10px] text-[#637d76]">
                                Dewan Penasihat Medis AEVYRA
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
