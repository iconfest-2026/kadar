import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InstructorLayout from '@/Layouts/InstructorLayout';
import { Button, Alert, Badge } from '@/Components/UI';
import AdminBadge from '@/Components/Admin/AdminBadge';

const SPECIALIZATIONS = [
    'Dokter Umum',
    'Dokter Spesialis Penyakit Dalam (Sp.PD)',
    'Dokter Spesialis Gizi Klinis (Sp.GK)',
    'Dokter Spesialis Kedokteran Olahraga (Sp.KO)',
    'Dokter Spesialis Jantung & Pembuluh Darah (Sp.JP)',
    'Dokter Spesialis Kedokteran Jiwa / Psikiater (Sp.KJ)',
    'Dokter Spesialis Obstetri & Ginekologi (Sp.OG)',
    'Fisioterapis Klinis Terdaftar',
    'Clinical Nutritionist / Ahli Gizi Dietisien',
];

export default function InstructorProfile({ instructor, profile }) {
    const isVerified = Boolean(profile?.is_verified);
    const isSuspended = instructor?.status === 'SUSPENDED';
    const isRejected = instructor?.status === 'REJECTED' || Boolean(profile?.rejection_reason);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: instructor?.name || '',
        specialization: profile?.specialization || 'Dokter Umum',
        institution: profile?.institution || '',
        str_number: profile?.str_number || '',
        sip_number: profile?.sip_number || '',
        years_of_experience: profile?.years_of_experience || 0,
        bio: profile?.bio || '',
        proof_document: null,
    });

    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('proof_document', file);
            setFileName(file.name);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/instructor/profile', {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <InstructorLayout title="Profil & Kredensial Medis" activeNav="profile">
            <Head title="Profil & Kredensial Medis Instruktur - AEVYRA" />

            <div className="max-w-4xl mx-auto space-y-6 pb-12">
                {/* Header Banner */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl shrink-0">
                            {instructor?.avatar_url ? (
                                <img
                                    src={instructor.avatar_url}
                                    alt={instructor.name}
                                    className="w-full h-full rounded-2xl object-cover"
                                />
                            ) : (
                                <span>{instructor?.name?.charAt(0) || 'D'}</span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-heading font-black text-on-surface">
                                Profil & Kredensial Medis
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                                Lengkapi legalitas nomor STR dan institusi faskes Anda untuk validasi verifikasi oleh Administrator.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0 flex-wrap">
                        <Link
                            href="/instructor/account"
                            className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface flex items-center gap-1.5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px] text-primary">manage_accounts</span>
                            <span>Pengaturan Akun &amp; Google</span>
                        </Link>

                        {isVerified ? (
                            <AdminBadge variant="published" size="sm" icon="verified">
                                Terverifikasi Resmi
                            </AdminBadge>
                        ) : isRejected ? (
                            <AdminBadge variant="attention" size="sm" icon="error">
                                Perlu Revisi Data
                            </AdminBadge>
                        ) : isSuspended ? (
                            <AdminBadge variant="suspended" size="sm" icon="block">
                                Akun Dibekukan
                            </AdminBadge>
                        ) : (
                            <AdminBadge variant="notice" size="sm" pulse icon="schedule">
                                Menunggu Verifikasi Admin
                            </AdminBadge>
                        )}
                    </div>
                </div>

                {/* Verification Notice Banner */}
                {!isVerified ? (
                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
                        <span className="material-symbols-outlined text-amber-700 text-2xl shrink-0 mt-0.5">
                            warning
                        </span>
                        <div className="space-y-1 text-xs text-amber-900">
                            <p className="font-bold text-sm">
                                Akun Instruktur Belum Terverifikasi
                            </p>
                            <p className="leading-relaxed">
                                Pendaftaran via Google atau akun baru belum otomatis terverifikasi. Untuk mendapatkan otorisasi akses ke dasbor operasional dan mengelola caseload binaan, <strong>Anda wajib mengisi Nomor STR, Institusi Praktik, serta mengunggah berkas kredensial fisik</strong> di bawah ini agar dapat ditinjau dan disahkan oleh Administrator platform AEVYRA.
                            </p>
                            {isRejected && profile?.rejection_reason && (
                                <div className="mt-2 p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-800 font-medium">
                                    Catatan Verifikator: {profile.rejection_reason}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-700 text-xl shrink-0">
                            verified
                        </span>
                        <p className="text-xs text-emerald-900 font-medium">
                            Kredensial medis Anda aktif dan telah disahkan oleh Administrator. Data Anda memenuhi regulasi SatuSehat dan UU PDP 27/2022.
                        </p>
                    </div>
                )}

                {/* Success Notification */}
                {recentlySuccessful && (
                    <Alert variant="success" title="Profil Berhasil Disimpan">
                        Biodata dan kredensial STR Anda telah diperbarui. Tim Administrator AEVYRA akan memeriksa dan memvalidasi berkas Anda.
                    </Alert>
                )}

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1: Identitas & Praktik */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-2xs space-y-5">
                        <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                            <h2 className="font-heading font-black text-base text-primary">
                                1. Identitas & Keahlian Profesional
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Nama Lengkap & Gelar */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Nama Lengkap & Gelar Akademik <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Contoh: dr. Bramantyo, Sp.PD, K-GEH"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25"
                                    required
                                />
                                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                            </div>

                            {/* Alamat Email (Readonly) */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Email Akun Terdaftar
                                </label>
                                <input
                                    type="email"
                                    value={instructor?.email || ''}
                                    disabled
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container/60 text-xs text-on-surface-variant cursor-not-allowed font-mono"
                                />
                                <span className="text-[10px] text-on-surface-variant block mt-1">
                                    Email terikat dengan otentikasi akun Google / AEVYRA Anda.
                                </span>
                            </div>

                            {/* Spesialisasi Klinis */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Spesialisasi Klinis <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25"
                                    required
                                >
                                    {SPECIALIZATIONS.map((spec) => (
                                        <option key={spec} value={spec}>
                                            {spec}
                                        </option>
                                    ))}
                                </select>
                                {errors.specialization && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.specialization}</p>
                                )}
                            </div>

                            {/* Pengalaman Praktik */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Pengalaman Praktik Klinis (Tahun) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="60"
                                    value={data.years_of_experience}
                                    onChange={(e) => setData('years_of_experience', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25"
                                    required
                                />
                                {errors.years_of_experience && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.years_of_experience}</p>
                                )}
                            </div>

                            {/* Institusi / Fasilitas Kesehatan */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Institusi / Rumah Sakit / Klinik Praktik Utama <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.institution}
                                    onChange={(e) => setData('institution', e.target.value)}
                                    placeholder="Contoh: RSUP Dr. Sardjito Yogyakarta / Klinik AEVYRA Preventif"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25"
                                    required
                                />
                                {errors.institution && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.institution}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Legalitas Medis (STR / SIP / Berkas Bukti) */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-2xs space-y-5">
                        <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                            <h2 className="font-heading font-black text-base text-primary">
                                2. Legalitas Medis & Verifikasi Kemenkes (Wajib)
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Nomor STR */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Nomor STR (Surat Tanda Registrasi) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.str_number}
                                    onChange={(e) => setData('str_number', e.target.value)}
                                    placeholder="Contoh: 33.1.1.100.1.22.123456"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary/25"
                                    required
                                />
                                <span className="text-[10px] text-on-surface-variant block mt-1">
                                    Nomor STR diterbitkan oleh KKI atau KTKI untuk profesi medis Anda.
                                </span>
                                {errors.str_number && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.str_number}</p>
                                )}
                            </div>

                            {/* Nomor SIP */}
                            <div>
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Nomor SIP (Surat Izin Praktik) <span className="text-on-surface-variant font-normal">(Opsional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.sip_number}
                                    onChange={(e) => setData('sip_number', e.target.value)}
                                    placeholder="Contoh: 503/SIP.DU/123/2023"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface font-mono focus:outline-none focus:ring-2 focus:ring-primary/25"
                                />
                                <span className="text-[10px] text-on-surface-variant block mt-1">
                                    Nomor izin praktik aktif yang diterbitkan Dinas Kesehatan setempat.
                                </span>
                                {errors.sip_number && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.sip_number}</p>
                                )}
                            </div>

                            {/* Berkas Fisik Bukti STR / SIP */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-on-surface mb-1.5">
                                    Unggah Berkas Dokumen STR / SIP / Ijazah Profesi
                                </label>
                                
                                <div className="border-2 border-dashed border-primary/20 rounded-2xl p-5 bg-surface-container-lowest text-center space-y-2 hover:bg-surface-container-low/50 transition-colors">
                                    <span className="material-symbols-outlined text-primary/70 text-3xl">
                                        upload_file
                                    </span>
                                    <div className="text-xs">
                                        <label className="font-bold text-primary hover:underline cursor-pointer">
                                            <span>Pilih berkas dokumen</span>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={handleFileChange}
                                                className="sr-only"
                                            />
                                        </label>
                                        <span className="text-on-surface-variant"> atau seret ke sini</span>
                                    </div>
                                    <p className="text-[10px] text-on-surface-variant">
                                        Format file yang diterima: PDF, JPG, JPEG, PNG (Maksimal 10 MB).
                                    </p>

                                    {fileName && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mt-2">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            <span>{fileName}</span>
                                        </div>
                                    )}

                                    {profile?.document_proof_path && !fileName && (
                                        <div className="pt-2 text-xs text-on-surface-variant flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-[16px] text-emerald-600">task</span>
                                            <span>Berkas tersimpan di sistem.</span>
                                            <a
                                                href={`/storage/${profile.document_proof_path}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary font-bold hover:underline"
                                            >
                                                Lihat Berkas Saat Ini
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {errors.proof_document && (
                                    <p className="text-[11px] text-rose-600 mt-1">{errors.proof_document}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Bio & Pendekatan Klinis */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-primary/10 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                            <h2 className="font-heading font-black text-base text-primary">
                                3. Profil Singkat & Pendekatan Pelayanan Klinis
                            </h2>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-on-surface mb-1.5">
                                Pendekatan Klinis & Filosofi Pendampingan Pasien <span className="text-on-surface-variant font-normal">(Maks. 2000 karakter)</span>
                            </label>
                            <textarea
                                rows={4}
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Jelaskan fokus bimbingan preventif Anda (misal: penanganan resistensi insulin, pemulihan kebugaran metabolik, diet siklus ritme sirkadian, dll.)."
                                className="w-full px-3.5 py-2.5 rounded-xl border border-primary/20 bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/25 leading-relaxed"
                            />
                            {errors.bio && <p className="text-[11px] text-rose-600 mt-1">{errors.bio}</p>}
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <Link
                            href="/instructor/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors font-semibold"
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            <span>Kembali ke Halaman Status / Dashboard</span>
                        </Link>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                leftIcon="save"
                                disabled={processing}
                                className="w-full sm:w-auto"
                            >
                                {processing ? 'Menyimpan & Mengajukan...' : 'Simpan & Ajukan Verifikasi ke Admin'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}

