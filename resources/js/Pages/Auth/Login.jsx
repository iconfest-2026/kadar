import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import { Button, Input, Checkbox } from '@/Components/UI';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: 'member@aevyra.health',
        password: 'password',
        remember: true,
    });

    const handleRoleSelect = (roleEmail) => {
        setData((prev) => ({
            ...prev,
            email: roleEmail,
            password: 'password',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout
            title="Masuk ke Akun AEVYRA"
            subtitle="Akses dashboard kesehatan, pemantauan baseline, dan pendampingan Anda"
        >
            <Head title="Masuk Akun — AEVYRA" />

            {/* Quick Demo Credentials Switcher */}
            <div className="mb-5 p-3 rounded-2xl bg-surface-container-low border border-surface-container/60">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-[10px] uppercase font-bold text-primary tracking-wider">
                        Demo Login Cepat
                    </span>
                    <span className="text-[11px] text-on-surface-variant">Klik untuk mengisi:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    <Button
                        type="button"
                        size="xs"
                        variant={data.email.startsWith('member') ? 'primary' : 'outline'}
                        onClick={() => handleRoleSelect('member@aevyra.health')}
                        className="w-full text-xs font-semibold"
                    >
                        Member
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant={data.email.startsWith('instruktur') ? 'primary' : 'outline'}
                        onClick={() => handleRoleSelect('instruktur@aevyra.health')}
                        className="w-full text-xs font-semibold"
                    >
                        Instruktur
                    </Button>
                    <Button
                        type="button"
                        size="xs"
                        variant={data.email.startsWith('admin') ? 'primary' : 'outline'}
                        onClick={() => handleRoleSelect('admin@aevyra.health')}
                        className="w-full text-xs font-semibold"
                    >
                        Admin
                    </Button>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Alamat Email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="user@aevyra.health"
                    rightIcon="mail"
                    error={errors.email}
                    autoComplete="username"
                />

                <Input
                    label="Kata Sandi"
                    type="password"
                    required
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Masukkan kata sandi"
                    showPasswordToggle
                    error={errors.password}
                    autoComplete="current-password"
                />

                <div className="pt-0.5">
                    <Checkbox
                        id="remember"
                        label="Ingat sesi saya"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={processing}
                    loadingText="Memproses Masuk..."
                    rightIcon="arrow_forward"
                    className="w-full shadow-md mt-2"
                >
                    Masuk Sekarang
                </Button>

                <div className="pt-2 text-center text-xs text-on-surface-variant">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-primary font-semibold hover:underline">
                        Daftar Sebagai Member Baru →
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
