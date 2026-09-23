import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
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

    return (
        <AuthLayout
            title={accountType === 'member' ? 'Daftar Akun Member' : 'Pendaftaran Tenaga Medis / Instruktur'}
            subtitle={
                accountType === 'member'
                    ? 'Mulai pantau baseline kesehatan mandiri dan raih pendampingan gaya hidup preventif'
                    : 'Daftarkan izin praktik dan kredensial medis Anda untuk menjadi pendamping terverifikasi'
            }
        >
            <Head title="Daftar Akun — AEVYRA" />

            {/* Account Type Selector: Member vs Instruktur */}
            <div className="flex p-1 bg-surface-container-low rounded-2xl border border-surface-container/60 mb-5">
                <Button
                    type="button"
                    variant={accountType === 'member' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleAccountTypeChange('member')}
                    className="flex-1 text-xs"
                >
                    Member (Pengguna Mandiri)
                </Button>
                <Button
                    type="button"
                    variant={accountType === 'instructor' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleAccountTypeChange('instructor')}
                    className="flex-1 text-xs"
                >
                    Instruktur (Tenaga Medis)
                </Button>
            </div>

            {accountType === 'instructor' && (
                <div className="mb-4">
                    <Alert variant="info" title="Verifikasi Kredensial Medis Diperlukan">
                        Sesuai standar etika klinis AEVYRA, data STR/SIP dan institusi praktik Anda akan diverifikasi oleh Administrator sebelum akun diaktifkan.
                    </Alert>
                </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label={accountType === 'member' ? 'Nama Lengkap' : 'Nama Lengkap Beserta Gelar'}
                    type="text"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder={accountType === 'member' ? 'Contoh: Ahmad Fadilah' : 'Contoh: dr. Nabila Sarah, Sp.GK'}
                    leftIcon="person"
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
                    <div className="space-y-4 p-4 rounded-2xl bg-surface-container-low/60 border border-primary/10">
                        <div className="flex items-center gap-2 pb-1 border-b border-primary/10">
                            <span className="material-symbols-outlined text-[18px] text-primary">badge</span>
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
                                label="Nomor STR Dokter / Tenaga Medis"
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
                                    label="Institusi / Rumah Sakit / Klinik Praktik"
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

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant/80 mb-1.5">
                                Unggah Dokumen Bukti STR / SIP / Ijazah Medis (PDF/JPG/PNG, Max 10MB)
                            </label>
                            <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => setData('proof_document', e.target.files[0])}
                                className="w-full text-xs text-on-surface file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer bg-white p-1.5 rounded-2xl border border-primary/15"
                            />
                            {errors.proof_document && (
                                <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {errors.proof_document}
                                </p>
                            )}
                        </div>

                        <Textarea
                            label="Bio Singkat & Pendekatan Klinis / Preventif"
                            rows={2}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Jelaskan spesialisasi Anda, pendekatan pendampingan gizi/aktivitas/tidur, dan rekam jejak bimbingan pasien..."
                            error={errors.bio}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                        label="Kata Sandi"
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Min. 8 karakter"
                        showPasswordToggle
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
                        showPasswordToggle
                        error={errors.password_confirmation}
                        autoComplete="new-password"
                    />
                </div>

                <div className="pt-1">
                    <Checkbox
                        id="consent"
                        required
                        checked={data.consent}
                        onChange={(e) => setData('consent', e.target.checked)}
                        label="Persetujuan Layanan & Standar Etika"
                        description={
                            accountType === 'instructor'
                                ? 'Saya menyatakan bahwa data nomor STR/SIP dan dokumen bukti yang diunggah adalah asli, sah, dan dapat dipertanggungjawabkan secara hukum.'
                                : 'Saya menyetujui Ketentuan Layanan & Kebijakan Privasi data kesehatan pribadi AEVYRA.'
                        }
                        error={errors.consent}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={processing}
                    loadingText="Mendaftarkan Akun..."
                    rightIcon="arrow_forward"
                    className="w-full shadow-md mt-3"
                >
                    {accountType === 'member' ? 'Buat Akun Member' : 'Daftarkan Kredensial Instruktur'}
                </Button>

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
