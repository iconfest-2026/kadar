import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: 'member@kadar.id',
        password: 'password',
        remember: true,
    });

    const handleRoleSelect = (roleEmail) => {
        setData('email', roleEmail);
        setData('password', 'password');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AuthLayout
            title="Masuk ke Akun Kadar"
            subtitle="Akses dashboard kesehatan, pemantauan baseline, dan pendampingan Anda"
        >
            <Head title="Masuk Akun - Kadar" />

            {/* Quick Demo Credentials Switcher */}
            <div className="mb-5 p-3 rounded-2xl bg-surface-container-low border border-surface-container/60">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-label-mono text-[10px] uppercase font-bold text-primary tracking-wider">
                        Demo Login Cepat
                    </span>
                    <span className="text-[11px] text-on-surface-variant">Klik untuk mengisi:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('member@kadar.id')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all ${
                            data.email === 'member@kadar.id'
                                ? 'bg-primary text-on-primary border-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border-surface-container'
                        }`}
                    >
                        Member
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('instruktur@kadar.id')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all ${
                            data.email === 'instruktur@kadar.id'
                                ? 'bg-primary text-on-primary border-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border-surface-container'
                        }`}
                    >
                        Instruktur
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSelect('admin@kadar.id')}
                        className={`py-1.5 px-2 text-xs font-semibold rounded-xl border transition-all ${
                            data.email === 'admin@kadar.id'
                                ? 'bg-primary text-on-primary border-primary shadow-xs'
                                : 'bg-surface text-on-surface-variant hover:text-on-surface border-surface-container'
                        }`}
                    >
                        Admin
                    </button>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                        Alamat Email
                    </label>
                    <div className="relative">
                        <input
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="user@kadar.id"
                            className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            mail
                        </span>
                    </div>
                    {errors.email && (
                        <p className="text-[11px] text-error font-medium">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold">
                            Kata Sandi
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-[18px] flex items-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-[11px] text-error font-medium">{errors.password}</p>
                    )}
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="rounded text-primary focus:ring-primary border-surface-container"
                    />
                    <label htmlFor="remember" className="text-xs text-on-surface-variant cursor-pointer select-none">
                        Ingat sesi saya
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-2"
                >
                    {processing ? (
                        <>
                            <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                            <span>Memproses Masuk...</span>
                        </>
                    ) : (
                        <>
                            <span>Masuk Sekarang</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </>
                    )}
                </button>

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
