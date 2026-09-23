import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';

export default function Register() {
    const [accountType, setAccountType] = useState('member'); // 'member' | 'instructor'
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'member',
        consent: false,
    });

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
        setData('role', type === 'member' ? 'member' : 'instructor');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const roleConfigs = {
        member: {
            title: 'Member Preventif',
            badge: 'Pendaftaran Anggota Mandiri',
            desc: 'Akses penuh scanner gizi kamera, tracker lonjakan gula darah, rencana intervensi personal, dan konsultasi dokter siaga.',
            image: '/image/healthy_nutrition_plate.jpg',
            highlightTitle: 'Investasi terbaik untuk umur panjang berkualitas.',
            highlightQuote: 'Dapatkan pendampingan preventif berbasis metabolik personal dan deteksi dini risiko sindrom metabolik.',
            stats: [
                { label: 'Gratis Skrining', val: '14 Hari' },
                { label: 'Analisis Nutrisi', val: 'AI BPOM' },
                { label: 'Kepatuhan Medis', val: 'PERKENI' },
            ],
        },
        instructor: {
            title: 'Instruktur & Tenaga Medis',
            badge: 'Portal Mitra Klinis Terdaftar',
            desc: 'Kelola caseload pasien pra-diabetes, terbitkan intervensi gizi terstandar, dan berikan telekonsultasi terjadwal.',
            image: '/image/doctor_consultation.jpg',
            highlightTitle: 'Dampingi pasien dengan rekam medis digital terpadu.',
            highlightQuote: 'Platform telemedisin preventif yang terhubung langsung dengan sistem SATUSEHAT Kemenkes RI.',
            stats: [
                { label: 'Verifikasi STR', val: 'Kemenkes' },
                { label: 'Integrasi Faskes', val: 'HL7 FHIR' },
                { label: 'Sistem Telemedisin', val: 'Siaga 24/7' },
            ],
        },
    };

    const currentConfig = roleConfigs[accountType];

    return (
        <AuthLayout>
            <Head title="Daftar Akun Baru — AEVYRA HealthCheck" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-295">
                {/* Left Column: Registration Form */}
                <div className="lg:col-span-7 bg-white dark:bg-surface p-6 sm:p-8 lg:p-10 rounded-3xl border border-surface-container-high shadow-[0_8px_30px_rgba(0,40,36,0.03)] flex flex-col justify-between space-y-6">
                    <div>
                        {/* Eyebrow & Headline */}
                        <div className="space-y-1.5 pb-4 border-b border-surface-container">
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#edf5f0] text-[#1c6454] text-[10px] font-semibold border border-[#d4e8dd]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span>Pendaftaran Pengguna Baru Terverifikasi</span>
                            </div>
                            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#122824]">
                                Buat Akun AEVYRA
                            </h1>
                            <p className="text-xs text-[#52645f] leading-relaxed">
                                {currentConfig.desc}
                            </p>
                        </div>

                        {/* Account Type Selector */}
                        <div className="mt-5 space-y-2">
                            <label className="text-[11px] font-bold text-on-surface uppercase tracking-wider block">
                                Pilih Jenis Registrasi:
                            </label>
                            <div className="grid grid-cols-2 gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => handleAccountTypeChange('member')}
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                        accountType === 'member'
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                                            : 'border-surface-container bg-surface-container-lowest hover:border-primary/30'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                        accountType === 'member' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                                    }`}>
                                        <span className="material-symbols-outlined text-[18px]">person</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className={`text-xs font-bold block truncate ${accountType === 'member' ? 'text-primary' : 'text-on-surface'}`}>
                                            Member Preventif
                                        </span>
                                        <span className="text-[10px] text-on-surface-variant truncate block">
                                            Pengguna Mandiri
                                        </span>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleAccountTypeChange('instructor')}
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                                        accountType === 'instructor'
                                            ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                                            : 'border-surface-container bg-surface-container-lowest hover:border-primary/30'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                        accountType === 'instructor' ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                                    }`}>
                                        <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <span className={`text-xs font-bold block truncate ${accountType === 'instructor' ? 'text-primary' : 'text-on-surface'}`}>
                                            Instruktur / Dokter
                                        </span>
                                        <span className="text-[10px] text-on-surface-variant truncate block">
                                            Tenaga Kesehatan Ahli
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface">Nama Lengkap</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder={accountType === 'member' ? 'Contoh: Ahmad Fadilah' : 'Contoh: dr. Nabila Putri, Sp.GK'}
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                                        badge
                                    </span>
                                </div>
                                {errors.name && <p className="text-[11px] text-rose-600 font-medium">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-on-surface">Alamat Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@email.com"
                                        className="w-full pl-3.5 pr-10 py-2.5 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                                        mail
                                    </span>
                                </div>
                                {errors.email && <p className="text-[11px] text-rose-600 font-medium">{errors.email}</p>}
                            </div>

                            {/* Password & Confirm */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface">Kata Sandi</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Min. 8 karakter"
                                            className="w-full pl-3.5 pr-10 py-2.5 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                {showPassword ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-[11px] text-rose-600 font-medium">{errors.password}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-on-surface">Ulangi Sandi</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Ketik ulang"
                                        className="w-full px-3.5 py-2.5 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                </div>
                            </div>

                            {/* Consent Checkbox */}
                            <div className="flex items-start gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    required
                                    checked={data.consent}
                                    onChange={(e) => setData('consent', e.target.checked)}
                                    className="mt-0.5 rounded border-surface-container text-primary focus:ring-primary"
                                />
                                <label htmlFor="consent" className="text-xs text-on-surface-variant leading-snug cursor-pointer select-none">
                                    Saya menyetujui Ketentuan Layanan, Kebijakan Privasi data kesehatan pribadi AEVYRA, serta kepatuhan UU PDP No. 27/2022.
                                </label>
                            </div>
                            {errors.consent && <p className="text-[11px] text-rose-600 font-medium">{errors.consent}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-3"
                            >
                                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                <span>{processing ? 'Memproses Pendaftaran...' : accountType === 'member' ? 'Buat Akun Member Preventif' : 'Ajukan Akun Instruktur Medis'}</span>
                            </button>
                        </form>
                    </div>

                    {/* Bottom Accreditations */}
                    <div className="pt-4 border-t border-surface-container text-center space-y-2">
                        <p className="text-xs text-on-surface-variant">
                            Sudah memiliki akun terdaftar?{' '}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Masuk ke Portal Akun →
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

                {/* Right Column: Dynamic Editorial Showcase */}
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-7 rounded-3xl bg-[#f2f7f4] border border-[#d6e7dd] relative overflow-hidden shadow-xs">
                    {/* Top Role Badge */}
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300">
                                {currentConfig.badge}
                            </span>
                            <span className="font-mono text-[10px] text-[#48635c]">
                                Skrining Mandiri
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-serif text-2xl font-normal text-[#122824] leading-snug">
                                {currentConfig.highlightTitle}
                            </h2>
                            <p className="text-xs text-[#48635c] leading-relaxed">
                                {currentConfig.highlightQuote}
                            </p>
                        </div>

                        {/* Image Frame */}
                        <div className="h-48 rounded-2xl overflow-hidden border border-[#cfe1d7] shadow-inner relative group">
                            <img
                                src={currentConfig.image}
                                alt={currentConfig.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg">
                                    {currentConfig.title}
                                </span>
                            </div>
                        </div>

                        {/* Dynamic Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            {currentConfig.stats.map((s, idx) => (
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
