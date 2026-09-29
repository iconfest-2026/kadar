import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button, Input, Textarea, Select, Checkbox, Alert } from '@/Components/UI';

export default function Register() {
    const [accountType, setAccountType] = useState('member'); // 'member' | 'instructor'

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'member',
        specialization: 'Dokter Spesialis Gizi Klinis (Sp.GK)',
        str_number: '',
        sip_number: '',
        institution: '',
        years_of_experience: 3,
        bio: '',
        proof_document: null,
        consent: false,
    });

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
        setData((prev) => ({
            ...prev,
            role: type,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            forceFormData: true,
        });
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
            desc: 'Kelola caseload pasien pra-diabetes, terbitkan intervensi gizi terstandar, dan berikan bimbingan telemedisin terarah.',
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
        <AuthLayout maxWidth="max-w-5xl">
            <Head title="Daftar Akun Baru - AEVYRA HealthCheck" />

            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                {/* Left Column: Registration Form */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-primary/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                        {/* Eyebrow & Headline */}
                        <div className="space-y-2 pb-4 border-b border-primary/10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold border border-primary/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Pendaftaran Pengguna Baru Terverifikasi</span>
                            </div>
                            <h1 className="font-heading font-black text-xl sm:text-3xl text-primary tracking-tight">
                                Buat Akun AEVYRA
                            </h1>
                            <p className="text-[11px] sm:text-xs text-on-surface-variant leading-relaxed">
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
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${accountType === 'member'
                                            ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                                            : 'border-primary/15 bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${accountType === 'member' ? 'bg-primary text-white shadow-xs' : 'bg-white text-on-surface-variant border border-primary/10'
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
                                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${accountType === 'instructor'
                                            ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                                            : 'border-primary/15 bg-surface-container-low hover:border-primary/30 hover:bg-surface-container'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${accountType === 'instructor' ? 'bg-primary text-white shadow-xs' : 'bg-white text-on-surface-variant border border-primary/10'
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

                        {accountType === 'instructor' && (
                            <div className="mt-4">
                                <Alert variant="info" title="Verifikasi Kredensial Medis Diperlukan">
                                    Sesuai standar etika klinis AEVYRA, data STR/SIP dan institusi praktik Anda akan diverifikasi oleh Administrator sebelum akun diaktifkan untuk mendampingi member.
                                </Alert>
                            </div>
                        )}

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                            <Input
                                label={accountType === 'member' ? 'Nama Lengkap' : 'Nama Lengkap Beserta Gelar'}
                                type="text"
                                required
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder={accountType === 'member' ? 'Contoh: Ahmad Fadilah' : 'Contoh: dr. Nabila Putri, Sp.GK'}
                                leftIcon="badge"
                                error={errors.name}
                                autoComplete="name"
                            />

                            <Input
                                label="Alamat Email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                leftIcon="mail"
                                error={errors.email}
                                autoComplete="email"
                            />

                            {/* Additional Fields for Instructor */}
                            {accountType === 'instructor' && (
                                <div className="space-y-3.5 p-4 rounded-2xl bg-surface-container-low border border-primary/15">
                                    <div className="flex items-center gap-2 pb-1.5 border-b border-primary/10">
                                        <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
                                        <h4 className="font-bold text-xs text-primary uppercase tracking-wider">
                                            Kredensial & Legalitas Praktik Medis
                                        </h4>
                                    </div>

                                    <Select
                                        label="Bidang Spesialisasi / Profesi"
                                        required
                                        value={data.specialization}
                                        onChange={(e) => setData('specialization', e.target.value)}
                                        options={[
                                            { value: 'Dokter Spesialis Gizi Klinis (Sp.GK)', label: 'Dokter Spesialis Gizi Klinis (Sp.GK)' },
                                            { value: 'Dokter Spesialis Kedokteran Olahraga (Sp.KO)', label: 'Dokter Spesialis Kedokteran Olahraga (Sp.KO)' },
                                            { value: 'Dokter Spesialis Penyakit Dalam (Sp.PD)', label: 'Dokter Spesialis Penyakit Dalam (Sp.PD)' },
                                            { value: 'Dokter Umum Terverifikasi', label: 'Dokter Umum Terverifikasi' },
                                            { value: 'Fisioterapis Klinis Berlisensi', label: 'Fisioterapis Klinis Berlisensi' },
                                            { value: 'Dietisien / Registered Dietitian (RD)', label: 'Dietisien / Registered Dietitian (RD)' },
                                            { value: 'Psikolog Kesehatan Perilaku', label: 'Psikolog Kesehatan Perilaku' },
                                        ]}
                                        error={errors.specialization}
                                    />

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Input
                                            label="Nomor STR Tenaga Medis"
                                            required
                                            value={data.str_number}
                                            onChange={(e) => setData('str_number', e.target.value)}
                                            placeholder="Contoh: 31.1.1.100.2.21.123456"
                                            leftIcon="verified"
                                            error={errors.str_number}
                                        />

                                        <Input
                                            label="Nomor SIP (Surat Izin Praktik)"
                                            value={data.sip_number}
                                            onChange={(e) => setData('sip_number', e.target.value)}
                                            placeholder="Contoh: SIP.503/446/123/2024"
                                            leftIcon="assignment"
                                            error={errors.sip_number}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div className="sm:col-span-2">
                                            <Input
                                                label="Institusi / RS / Klinik Praktik"
                                                required
                                                value={data.institution}
                                                onChange={(e) => setData('institution', e.target.value)}
                                                placeholder="Contoh: RSUPN Dr. Cipto Mangunkusumo"
                                                leftIcon="apartment"
                                                error={errors.institution}
                                            />
                                        </div>

                                        <Input
                                            label="Pengalaman (Thn)"
                                            type="number"
                                            min="0"
                                            max="60"
                                            required
                                            value={data.years_of_experience}
                                            onChange={(e) => setData('years_of_experience', parseInt(e.target.value) || 0)}
                                            error={errors.years_of_experience}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-on-surface">
                                            Unggah Dokumen Bukti STR / SIP / Ijazah Medis (PDF/JPG/PNG, Max 10MB)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => setData('proof_document', e.target.files[0])}
                                            className="w-full text-xs text-on-surface file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary file:text-white hover:file:bg-primary-container file:cursor-pointer bg-white p-2 rounded-2xl border border-primary/15"
                                        />
                                        {errors.proof_document && (
                                            <p className="mt-1 text-xs text-rose-600 font-medium flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">error</span>
                                                {errors.proof_document}
                                            </p>
                                        )}
                                    </div>

                                    <Textarea
                                        label="Bio Singkat & Pendekatan Klinis"
                                        rows={2}
                                        value={data.bio}
                                        onChange={(e) => setData('bio', e.target.value)}
                                        placeholder="Jelaskan spesialisasi Anda, pendekatan pendampingan gizi/metabolik, dan pengalaman bimbingan..."
                                        error={errors.bio}
                                    />
                                </div>
                            )}

                            {/* Password & Confirm */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Input
                                    label="Kata Sandi"
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Min. 8 karakter"
                                    allowPasswordToggle
                                    error={errors.password}
                                    autoComplete="new-password"
                                />

                                <Input
                                    label="Ulangi Sandi"
                                    type="password"
                                    required
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="Ketik ulang"
                                    allowPasswordToggle
                                    error={errors.password_confirmation}
                                    autoComplete="new-password"
                                />
                            </div>

                            {/* Consent Checkbox */}
                            <div className="pt-1">
                                <Checkbox
                                    id="consent"
                                    required
                                    checked={data.consent}
                                    onChange={(e) => setData('consent', e.target.checked)}
                                    label="Persetujuan Layanan & Standar Etika"
                                    description={
                                        accountType === 'instructor'
                                            ? 'Saya menyatakan bahwa nomor STR/SIP dan dokumen bukti yang diunggah adalah asli, sah, dan dapat dipertanggungjawabkan secara hukum.'
                                            : 'Saya menyetujui Ketentuan Layanan, Kebijakan Privasi data kesehatan pribadi AEVYRA, serta kepatuhan UU PDP No. 27/2022.'
                                    }
                                    error={errors.consent}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                loading={processing}
                                loadingText="Mendaftarkan Akun..."
                                rightIcon="arrow_forward"
                                className="w-full shadow-md mt-3"
                            >
                                {accountType === 'member' ? 'Buat Akun Member Preventif' : 'Ajukan Akun Instruktur Medis'}
                            </Button>
                        </form>
                    </div>

                    {/* Bottom Accreditations */}
                    <div className="pt-4 border-t border-primary/10 text-center space-y-2">
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
                <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-7 rounded-3xl bg-surface-container-low border border-primary/15 shadow-sm relative overflow-hidden">
                    {/* Top Role Badge */}
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentConfig.badge ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-teal-100 text-teal-800 border-teal-300'}`}>
                                {currentConfig.badge}
                            </span>
                            <span className="font-mono text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                Skrining Mandiri
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="font-heading font-bold text-xl text-primary leading-snug">
                                {currentConfig.highlightTitle}
                            </h2>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                {currentConfig.highlightQuote}
                            </p>
                        </div>

                        {/* Image Frame */}
                        <div className="h-44 rounded-2xl overflow-hidden border border-primary/15 shadow-inner relative group bg-white">
                            <img
                                src={currentConfig.image}
                                alt={currentConfig.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                                <span className="text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/20">
                                    {currentConfig.title}
                                </span>
                            </div>
                        </div>

                        {/* Dynamic Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-2">
                            {currentConfig.stats.map((s, idx) => (
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
