import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Register() {
    const [accountType, setAccountType] = useState('member'); // 'member' | 'instruktur'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        specialization: '',
        password: '',
        passwordConfirm: '',
        consent: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) {
            alert('Konfirmasi kata sandi tidak cocok!');
            return;
        }
        if (!formData.consent) {
            alert('Harap setujui syarat & ketentuan layanan.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert(`Pendaftaran berhasil sebagai ${accountType === 'member' ? 'Member Kadar' : 'Instruktur Kesehatan'}!`);
        }, 500);
    };

    return (
        <AuthLayout
            title={accountType === 'member' ? 'Daftar Akun Member' : 'Pendaftaran Instruktur'}
            subtitle={
                accountType === 'member'
                    ? 'Mulai pantau kesehatan, scan nutrisi/obat, dan ikuti challenge'
                    : 'Bergabung sebagai tenaga ahli & pendamping kesehatan member'
            }
        >
            <Head title="Daftar Akun - Kadar PWA" />

            {/* Account Type Selector: Member vs Instruktur */}
            <div className="flex p-1 bg-surface-container-low rounded-xl border border-surface-container mb-4">
                <button
                    type="button"
                    onClick={() => setAccountType('member')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        accountType === 'member'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Member (Pengguna)
                </button>
                <button
                    type="button"
                    onClick={() => setAccountType('instruktur')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        accountType === 'instruktur'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Instruktur (Tenaga Ahli)
                </button>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={accountType === 'member' ? 'Contoh: Ahmad Fadilah' : 'Contoh: Ns. Ahmad Fadilah, S.Kep / Ahli Gizi'}
                        className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                    />
                </div>

                {accountType === 'instruktur' && (
                    <div className="space-y-1">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                            Bidang Keahlian / Sertifikasi
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.specialization}
                            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                            placeholder="Contoh: Ahli Gizi Klinis / Fitness Coach / Perawat"
                            className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                            Nomor WhatsApp
                        </label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="0812xxxxxxxx"
                            className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="nama@email.com"
                            className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                            Kata Sandi
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Min. 8 karakter"
                            className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                            Ulangi Sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.passwordConfirm}
                                onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                                placeholder="Ketik ulang"
                                className="w-full px-3 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px] flex items-center"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                    <input
                        type="checkbox"
                        id="consent"
                        required
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded text-primary focus:ring-primary border-surface-container"
                    />
                    <label htmlFor="consent" className="text-[11px] text-on-surface-variant leading-snug cursor-pointer select-none">
                        Saya menyetujui Ketentuan Layanan & Kebijakan Privasi data kesehatan pribadi Kadar.
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-2 mt-2"
                >
                    {loading ? (
                        <>
                            <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                            <span>Mendaftarkan Akun...</span>
                        </>
                    ) : (
                        <>
                            <span>{accountType === 'member' ? 'Buat Akun Member' : 'Daftar Sebagai Instruktur'}</span>
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </>
                    )}
                </button>

                <div className="pt-2 text-center text-xs text-on-surface-variant">
                    Sudah memiliki akun?{' '}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                        Masuk ke Akun →
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
