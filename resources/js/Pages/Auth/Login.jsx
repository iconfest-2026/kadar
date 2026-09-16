import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
    const [role, setRole] = useState('member'); // 'member' | 'instruktur' | 'admin'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        remember: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Simulasi masuk berhasil sebagai ${role === 'member' ? 'Member' : role === 'instruktur' ? 'Instruktur' : 'Admin'}!`);
        }, 500);
    };

    return (
        <AuthLayout
            title="Masuk ke Akun Kadar"
            subtitle="Akses dashboard kesehatan, scanner, dan konsultasi Anda"
        >
            <Head title="Masuk Akun - Kadar PWA" />

            {/* Role Switcher: 3 Roles (Member, Instruktur, Admin) */}
            <div className="flex p-1 bg-surface-container-low rounded-xl border border-surface-container mb-5">
                <button
                    type="button"
                    onClick={() => setRole('member')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        role === 'member'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Member
                </button>
                <button
                    type="button"
                    onClick={() => setRole('instruktur')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        role === 'instruktur'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Instruktur
                </button>
                <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        role === 'admin'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Admin
                </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                        {role === 'member'
                            ? 'Email / Nomor WhatsApp'
                            : role === 'instruktur'
                            ? 'Email Instruktur / ID Tenaga Ahli'
                            : 'Email / Username Admin'}
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            required
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            placeholder={
                                role === 'member'
                                    ? 'user@email.com / 0812xxxx'
                                    : role === 'instruktur'
                                    ? 'instruktur@kadar.id'
                                    : 'admin@kadar.id'
                            }
                            className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                            {role === 'member' ? 'person' : role === 'instruktur' ? 'co_present' : 'admin_panel_settings'}
                        </span>
                    </div>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold">
                            Kata Sandi
                        </label>
                        <a href="#forgot" className="font-label-mono text-[10px] text-primary hover:underline">
                            Lupa Sandi?
                        </a>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={formData.remember}
                        onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                        className="rounded text-primary focus:ring-primary border-surface-container"
                    />
                    <label htmlFor="remember" className="text-xs text-on-surface-variant cursor-pointer select-none">
                        Ingat sesi di perangkat ini
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-2"
                >
                    {loading ? (
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
                        Daftar Sebagai Member / Instruktur →
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
