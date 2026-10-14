import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button, Input, Textarea, Select, Checkbox, Alert } from '@/Components/UI';
import GoogleRoleSelectModal from '@/Components/GoogleRoleSelectModal';

export default function Register() {
    const [accountType, setAccountType] = useState('member'); // 'member' | 'instructor'
    const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

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
        <AuthLayout maxWidth="max-w-xl">
            <Head title="Daftar Akun Baru - AEVYRA HealthCheck" />

            <div className="w-full bg-white rounded-3xl border border-primary/15 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div>
                        {/* Eyebrow & Headline */}
                        <div className="space-y-2 pb-4 border-b border-primary/10">
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
                                            : 'Saya menyetujui Ketentuan Layanan serta Kebijakan Privasi data kesehatan pribadi AEVYRA.'
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

                            {/* Social Register Divider */}
                            <div className="flex items-center gap-3 my-4">
                                <div className="flex-1 h-px bg-primary/15"></div>
                                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider whitespace-nowrap">
                                    atau daftar dengan
                                </span>
                                <div className="flex-1 h-px bg-primary/15"></div>
                            </div>

                            {/* Google Register Button */}
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
                                <span>Daftar Cepat dengan Google ({accountType === 'member' ? 'Member' : 'Instruktur'})</span>
                            </button>
                        </form>
                    </div>

                    {/* Bottom Accreditations */}
                    <div className="pt-4 border-t border-primary/10 text-center">
                        <p className="text-xs text-on-surface-variant">
                            Sudah memiliki akun terdaftar?{' '}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Masuk ke Portal Akun →
                            </Link>
                        </p>
                    </div>

                    {/* Google Role Selection Modal */}
                    <GoogleRoleSelectModal
                        isOpen={isGoogleModalOpen}
                        onClose={() => setIsGoogleModalOpen(false)}
                        defaultRole={accountType}
                        context="register"
                    />
            </div>
        </AuthLayout>
    );
}
