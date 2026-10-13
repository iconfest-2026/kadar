import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button, Input, Checkbox } from '@/Components/UI';
import GoogleRoleSelectModal from '@/Components/GoogleRoleSelectModal';

export default function Login() {
    const [selectedRole, setSelectedRole] = useState('member'); // 'member' | 'instructor' | 'admin'
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

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
        <AuthLayout maxWidth="max-w-xl">
            <Head title="Masuk Akun - AEVYRA HealthCheck" />

            <div className="w-full bg-white rounded-3xl border border-primary/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                        {/* Header Badge & Title */}
                        <div className="space-y-2 pb-4 border-b border-primary/10">
                            <h1 className="font-heading font-black text-xl sm:text-3xl text-primary tracking-tight">
                                Masuk ke Portal AEVYRA
                            </h1>
                            <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
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
                                            className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                                                    ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                                                    : 'border-primary/15 bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between w-full mb-1">
                                                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isSelected ? 'bg-primary text-white shadow-xs' : 'bg-white text-on-surface-variant border border-primary/10'
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
                                error={errors.email}
                                autoComplete="username"
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

                            {/* Social Login Divider */}
                            <div className="flex items-center gap-3 my-4">
                                <div className="flex-1 h-px bg-primary/15"></div>
                                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                                    atau masuk dengan
                                </span>
                                <div className="flex-1 h-px bg-primary/15"></div>
                            </div>

                            {/* Google Sign-In Button */}
                            <button
                                type="button"
                                onClick={() => setIsGoogleModalOpen(true)}
                                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-2xl border border-primary/20 bg-white hover:bg-surface-container-low text-xs sm:text-sm font-bold text-on-surface transition-all shadow-2xs hover:shadow-xs hover:border-primary/40 active:scale-[0.99] cursor-pointer"
                            >
                                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                    />
                                </svg>
                                <span>Masuk dengan Google</span>
                            </button>
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

                    {/* Google Role Selection Modal */}
                    <GoogleRoleSelectModal
                        isOpen={isGoogleModalOpen}
                        onClose={() => setIsGoogleModalOpen(false)}
                        defaultRole={selectedRole === 'instructor' ? 'instructor' : 'member'}
                        context="login"
                    />
            </div>
        </AuthLayout>
    );
}
