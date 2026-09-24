import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button, Input, Checkbox } from '@/Components/UI';

export default function Login() {
    const [selectedRole, setSelectedRole] = useState('member'); // 'member' | 'instructor' | 'admin'

    const { data, setData, post, processing, errors } = useForm({
        email: 'member@aevyra.health',
        password: 'password',
        remember: true,
    });

    const roleConfigs = {
        member: {
            name: 'Member',
            title: 'Member Preventif',
            subtitle: 'Pasien & Pengguna Mandiri',
            email: 'member@aevyra.health',
            icon: 'person',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
            buttonText: 'Masuk sebagai Member Preventif',
            desc: 'Akses scanner nutrisi makanan/obat BPOM, tracker glukosa darah, habit mikro 14-90 hari, dan konsultasi dokter siaga.',
            previewBadge: 'Portal Member • HealthCheck 2026',
            previewTitle: 'Deteksi dampak nutrisi sebelum suapan pertama.',
            previewQuote: 'Membedah komposisi gizi, gula tersembunyi, dan izin resmi BPOM dalam hitungan detik untuk mencegah lonjakan glukosa darah.',
            previewImage: '/image/hero_lifestyle_scan.jpg',
            previewStats: [
                { label: 'Database BPOM', val: '120.000+' },
                { label: 'Kecepatan Analisis', val: '< 0.4 Detik' },
                { label: 'Akurasi OCR', val: '98.4%' },
            ],
        },
        instructor: {
            name: 'Instruktur',
            title: 'Instruktur Klinis',
            subtitle: 'Dokter Spesialis & Dietisien',
            email: 'instruktur@aevyra.health',
            icon: 'health_and_safety',
            badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
            buttonText: 'Masuk Portal Dokter / Instruktur',
            desc: 'Kelola caseload pasien binaan, verifikasi jadwal telemedisin, terbitkan rencana intervensi klinis, dan evaluasi laporan kepatuhan.',
            previewBadge: 'Konsol Dokter IDI • Verifikasi STR',
            previewTitle: 'Bimbingan klinis 1-on-1 berbasis bukti ilmiah.',
            previewQuote: 'Mendampingi pasien pra-diabetes menuju remisi glukosa menggunakan panduan klinis PERKENI dan rekam medis terpadu.',
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
            badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
            buttonText: 'Masuk Konsol Administrator',
            desc: 'Manajemen hak akses pengguna, verifikasi STR instruktur, audit forensik keamanan, pemantauan ambulans 119, dan kontrol parameter sistem.',
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
        setData((prev) => ({
            ...prev,
            email: roleConfigs[roleKey].email,
            password: 'password',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const activeConfig = roleConfigs[selectedRole];

    return (
        <AuthLayout maxWidth="max-w-5xl">
            <Head title="Masuk Akun - AEVYRA HealthCheck" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Left Column: Form & Role Switcher */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-primary/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                        {/* Header Badge & Title */}
                        <div className="space-y-2 pb-4 border-b border-primary/10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold border border-primary/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Gerbang Autentikasi Pengguna Terverifikasi</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-3xl text-primary tracking-tight">
                                Masuk ke Portal AEVYRA
                            </h1>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
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
                                                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                                                    : 'border-primary/15 bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                                                    isSelected ? 'bg-primary text-white shadow-xs' : 'bg-white text-on-surface-variant border border-primary/10'
                                                }`}>
                                                    <span className="material-symbols-outlined text-[16px]">
                                                        {role.icon}
                                                    </span>
                                                </div>
                                                {isSelected && (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
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
                            <Input
                                label="Alamat Email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@aevyra.health"
                                leftIcon="mail"
                                error={errors.email}
                                autoComplete="username"
                                helperText={`Peran aktif: ${activeConfig.title}`}
                            />

                            <Input
                                label="Kata Sandi"
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                allowPasswordToggle
                                error={errors.password}
                                autoComplete="current-password"
                                helperText="Demo: password"
                            />

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-xs pt-1">
                                <Checkbox
                                    id="remember"
                                    label="Ingat sesi saya di peramban ini"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="text-primary hover:underline cursor-pointer text-[11px] font-semibold">
                                    Lupa sandi?
                                </span>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                loading={processing}
                                loadingText="Memverifikasi Akses..."
                                leftIcon="login"
                                className="w-full shadow-md mt-2"
                            >
                                {activeConfig.buttonText}
                            </Button>
                        </form>
                    </div>

                    {/* Bottom Links */}
                    <div className="pt-4 border-t border-primary/10 text-center space-y-2">
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

                {/* Right Column: Dynamic Role Showcase */}
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-7 rounded-3xl bg-surface-container-low border border-primary/15 shadow-sm relative overflow-hidden">
                    {/* Top Role Badge */}
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${activeConfig.badgeBg}`}>
                                {activeConfig.previewBadge}
                            </span>
                            <span className="font-mono text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                Lingkungan Aman
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-heading font-bold text-xl text-primary leading-snug">
                                {activeConfig.previewTitle}
                            </h2>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                {activeConfig.previewQuote}
                            </p>
                        </div>

                        {/* Image Frame */}
                        <div className="h-44 rounded-2xl overflow-hidden border border-primary/15 shadow-inner relative group bg-white">
                            <img
                                src={activeConfig.previewImage}
                                alt={activeConfig.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/20">
                                    {activeConfig.title}
                                </span>
                            </div>
                        </div>

                        {/* Dynamic Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            {activeConfig.previewStats.map((s, idx) => (
                                <div key={idx} className="p-2.5 rounded-xl bg-white border border-primary/15 text-center shadow-2xs">
                                    <span className="font-heading font-black text-xs sm:text-sm text-primary block leading-tight">
                                        {s.val}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] text-on-surface-variant block mt-0.5 font-medium">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Medical Advisor Quote */}
                    <div className="pt-4 border-t border-primary/10 relative z-10 flex items-center gap-3">
                        <img
                            src="/image/doctor_bramantyo.jpg"
                            alt="dr. Bramantyo"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shadow-xs shrink-0"
                        />
                        <div className="text-xs leading-tight">
                            <span className="font-heading font-bold text-primary block">
                                dr. H. Bramantyo, Sp.PD
                            </span>
                            <span className="text-[10px] text-on-surface-variant">
                                Dewan Penasihat Medis AEVYRA
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
