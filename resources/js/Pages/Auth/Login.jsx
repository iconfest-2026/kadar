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
            buttonText: 'Masuk sebagai Member Preventif',
            desc: 'Akses scanner nutrisi makanan/obat BPOM, tracker glukosa darah, habit mikro 14-90 hari, dan konsultasi dokter siaga.',
        },
        instructor: {
            name: 'Instruktur',
            title: 'Instruktur Klinis',
            subtitle: 'Dokter Spesialis & Dietisien',
            email: 'instruktur@aevyra.health',
            icon: 'health_and_safety',
            buttonText: 'Masuk Portal Dokter / Instruktur',
            desc: 'Kelola caseload pasien binaan, verifikasi jadwal telemedisin, terbitkan rencana intervensi klinis, dan evaluasi laporan kepatuhan.',
        },
        admin: {
            name: 'Admin',
            title: 'Administrator',
            subtitle: 'Tata Kelola Medis & Sistem',
            email: 'admin@aevyra.health',
            icon: 'admin_panel_settings',
            buttonText: 'Masuk Konsol Administrator',
            desc: 'Manajemen hak akses pengguna, verifikasi STR instruktur, audit forensik keamanan, pemantauan ambulans 119, dan kontrol parameter sistem.',
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

            {/* Login Card */}
            <div className="w-full bg-white rounded-3xl border border-primary/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                    {/* Header Badge & Title */}
                    <div className="space-y-2 pb-4 border-b border-primary/10">
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
                <div className="pt-4 border-t border-primary/10 text-center">
                    <p className="text-xs text-on-surface-variant">
                        Belum memiliki akun?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline inline-flex items-center gap-1">
                            <span>Mulai Skrining Mandiri Gratis</span>
                            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
