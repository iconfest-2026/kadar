import React, { useState, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import InstructorLayout from '../../Layouts/InstructorLayout';

export default function Account({ user, profile }) {
    const fileInputRef = useRef(null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatarError, setAvatarError] = useState(null);

    const [isUnlinkModalOpen, setIsUnlinkModalOpen] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Form Edit Nama Akun
    const nameForm = useForm({
        name: user?.name || '',
    });

    // Form Ubah Password
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSaveName = (e) => {
        e.preventDefault();
        nameForm.post('/instructor/account', {
            preserveScroll: true,
        });
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        passwordForm.post('/instructor/account/password', {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
            },
        });
    };

    const handleUnlinkGoogle = () => {
        router.post('/auth/google/unlink', {}, {
            preserveScroll: true,
            onFinish: () => setIsUnlinkModalOpen(false),
        });
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
            setAvatarError('Format file harus JPEG, PNG, JPG, atau WEBP.');
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            setAvatarError('Ukuran file maksimal 3 MB.');
            return;
        }

        setAvatarError(null);
        setPreviewUrl(URL.createObjectURL(file));
        setIsUploadingAvatar(true);

        const formData = new FormData();
        formData.append('avatar', file);

        router.post('/instructor/account/avatar', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsUploadingAvatar(false);
            },
            onError: (errors) => {
                setIsUploadingAvatar(false);
                setAvatarError(errors.avatar || 'Gagal mengunggah foto profil.');
            },
        });
    };

    return (
        <InstructorLayout activeNav="account">
            <Head title="Pengaturan Akun & Keamanan - Instruktur" />

            <div className="max-w-4xl mx-auto space-y-6 pb-12">
                {/* Header Page */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h1 className="font-heading font-black text-xl sm:text-2xl text-primary dark:text-emerald-400">
                            Pengaturan Akun &amp; Keamanan
                        </h1>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                            Kelola data pribadi, foto profil, autentikasi kata sandi, dan integrasi Google SSO
                        </p>
                    </div>

                    <Link
                        href="/instructor/profile"
                        className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 self-start transition-colors"
                    >
                        <span className="material-symbols-outlined text-[17px] text-primary">verified_user</span>
                        <span>Profil Kredensial Medis &amp; STR</span>
                    </Link>
                </div>

                {/* 1. RINGKASAN AKUN INSTRUKTUR DENGAN UPLOAD FOTO */}
                <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-md relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4 min-w-0">
                            {/* Avatar Picker Interaktif */}
                            <div className="relative group shrink-0">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    {previewUrl || user.avatar_url ? (
                                        <img
                                            src={previewUrl || user.avatar_url}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-heading font-black text-2xl text-white">
                                            {(user?.name || 'I').charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                {/* Floating Camera Button */}
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    disabled={isUploadingAvatar}
                                    className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white text-primary hover:bg-emerald-50 shadow-md flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer border border-white/60"
                                    title="Pilih & Unggah Foto Baru"
                                    aria-label="Unggah Foto Profil Instruktur"
                                >
                                    {isUploadingAvatar ? (
                                        <span className="material-symbols-outlined text-[15px] animate-spin">progress_activity</span>
                                    ) : (
                                        <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                                    )}
                                </button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarSelect}
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="hidden"
                                />
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="font-heading font-black text-lg text-white truncate">
                                        {user.name}
                                    </h2>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-white/20 text-emerald-200">
                                        Instruktur Medis
                                    </span>
                                </div>
                                <p className="text-xs text-white/80 truncate mt-0.5">{user.email}</p>
                                <p className="text-xs text-emerald-200 font-medium mt-1">
                                    {profile?.specialization || 'Dokter Spesialis'} &bull; {profile?.institution || 'Konsultan Klinis AEVYRA'}
                                </p>
                            </div>
                        </div>

                        {/* Status Verifikasi Badge & Tombol Ganti Foto */}
                        <div className="flex flex-col sm:items-end gap-2.5 shrink-0">
                            <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                                    profile?.is_verified
                                        ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30'
                                        : 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[14px]">
                                    {profile?.is_verified ? 'verified' : 'hourglass_top'}
                                </span>
                                <span>
                                    {profile?.is_verified ? 'Terverifikasi Resmi' : 'Menunggu Verifikasi'}
                                </span>
                            </span>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={triggerFileInput}
                                    disabled={isUploadingAvatar}
                                    className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs border border-white/30 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[16px]">
                                        {isUploadingAvatar ? 'progress_activity' : 'upload'}
                                    </span>
                                    <span>{isUploadingAvatar ? 'Mengunggah...' : 'Ganti Foto'}</span>
                                </button>
                            </div>

                            <p className="text-[11px] text-white/70">
                                Bergabung: {user.created_at}
                            </p>
                        </div>
                    </div>

                    {avatarError && (
                        <div className="mt-3 px-3 py-1.5 rounded-xl bg-rose-500/30 border border-rose-300/50 text-rose-100 text-[11px] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            <span>{avatarError}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 2. KARTU INTEGRASI KONEKSI GOOGLE */}
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 sm:p-6 shadow-xs space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 border border-surface-container-high">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-sm text-on-surface leading-tight">
                                        Koneksi Akun Google
                                    </h3>
                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                        {user.is_google_connected
                                            ? 'Google SSO aktif untuk akun ini'
                                            : 'Tautkan akun Google untuk kemudahan login'}
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono uppercase shrink-0 ${
                                    user.is_google_connected
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                                }`}
                            >
                                {user.is_google_connected ? 'Terhubung' : 'Belum Terhubung'}
                            </span>
                        </div>

                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            {user.is_google_connected
                                ? 'Akun Anda telah terintegrasi dengan Google SSO. Anda dapat masuk langsung kapan saja tanpa perlu mengingat password.'
                                : 'Hubungkan akun Google Anda agar login ke dashboard instruktur menjadi lebih praktis dan terproteksi keamanan Google.'}
                        </p>

                        <div className="pt-2 border-t border-surface-container flex justify-end">
                            {user.is_google_connected ? (
                                <button
                                    type="button"
                                    onClick={() => setIsUnlinkModalOpen(true)}
                                    className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition-all cursor-pointer"
                                >
                                    Putuskan Koneksi Google
                                </button>
                            ) : (
                                <a
                                    href="/auth/google/link?return_url=/instructor/account"
                                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                                >
                                    <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
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
                                    <span>Hubungkan ke Google</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* 3. EDIT NAMA & IDENTITAS */}
                    <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 sm:p-6 shadow-xs space-y-5">
                        <div className="flex items-center gap-2.5 border-b border-surface-container pb-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">badge</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-sm text-on-surface leading-tight">
                                    Nama Akun Instruktur
                                </h3>
                                <p className="text-[11px] text-on-surface-variant">
                                    Identitas nama yang ditampilkan kepada member
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveName} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                    Nama Lengkap (Beserta Gelar) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">
                                        person
                                    </span>
                                    <input
                                        type="text"
                                        value={nameForm.data.name}
                                        onChange={(e) => nameForm.setData('name', e.target.value)}
                                        placeholder="Contoh: dr. Andi Wijaya, Sp.PD"
                                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-xs text-on-surface focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                                        required
                                    />
                                </div>
                                {nameForm.errors.name && (
                                    <p className="text-[11px] text-rose-500 mt-1">{nameForm.errors.name}</p>
                                )}
                            </div>

                            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-xs text-on-surface-variant flex items-center justify-between gap-3">
                                <div>
                                    <span className="font-bold text-on-surface block">Kredensial Medis STR / SIP:</span>
                                    <span className="font-mono text-[11px] text-on-surface-variant">
                                        {profile?.str_number ? `No. STR: ${profile.str_number}` : 'Nomor STR belum diinput'}
                                    </span>
                                </div>
                                <Link
                                    href="/instructor/profile"
                                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-primary hover:bg-surface-container font-bold text-xs shrink-0 transition-colors shadow-2xs"
                                >
                                    Ubah STR &amp; Faskes
                                </Link>
                            </div>

                            <div className="pt-2 border-t border-surface-container flex justify-end">
                                <button
                                    type="submit"
                                    disabled={nameForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">save</span>
                                    <span>{nameForm.processing ? 'Menyimpan...' : 'Simpan Nama'}</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 4. KEAMANAN KATA SANDI */}
                    <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 sm:p-6 shadow-xs space-y-5">
                        <div className="flex items-center gap-2.5 border-b border-surface-container pb-3">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">lock</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-sm text-on-surface leading-tight">
                                    Ubah Kata Sandi Akun
                                </h3>
                                <p className="text-[11px] text-on-surface-variant">
                                    Pastikan kata sandi Anda kuat untuk mengamankan akses ke dasbor instruktur
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSavePassword} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                    Kata Sandi Saat Ini
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">
                                        key
                                    </span>
                                    <input
                                        type={showCurrentPass ? 'text' : 'password'}
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        placeholder="Masukkan kata sandi saat ini"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-xs text-on-surface focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                        title={showCurrentPass ? 'Sembunyikan' : 'Tampilkan'}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showCurrentPass ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                <p className="text-[11px] text-on-surface-variant mt-1">
                                    * Kosongkan jika Anda mendaftar pertama kali menggunakan akun Google.
                                </p>
                                {passwordForm.errors.current_password && (
                                    <p className="text-[11px] text-rose-500 mt-1">{passwordForm.errors.current_password}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                        Kata Sandi Baru <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">
                                            lock
                                        </span>
                                        <input
                                            type={showNewPass ? 'text' : 'password'}
                                            value={passwordForm.data.password}
                                            onChange={(e) => passwordForm.setData('password', e.target.value)}
                                            placeholder="Minimal 8 karakter"
                                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-xs text-on-surface focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPass(!showNewPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                            title={showNewPass ? 'Sembunyikan' : 'Tampilkan'}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {showNewPass ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                    {passwordForm.errors.password && (
                                        <p className="text-[11px] text-rose-500 mt-1">{passwordForm.errors.password}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                                        Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">
                                            verified_user
                                        </span>
                                        <input
                                            type={showConfirmPass ? 'text' : 'password'}
                                            value={passwordForm.data.password_confirmation}
                                            onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                            placeholder="Ulangi kata sandi baru"
                                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-lowest text-xs text-on-surface focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                                            title={showConfirmPass ? 'Sembunyikan' : 'Tampilkan'}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">
                                                {showConfirmPass ? 'visibility_off' : 'visibility'}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-surface-container flex justify-end">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">lock_reset</span>
                                    <span>{passwordForm.processing ? 'Memperbarui...' : 'Perbarui Kata Sandi'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL KONFIRMASI PUTUSKAN GOOGLE */}
            {isUnlinkModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-surface rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-surface-container space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-[26px]">link_off</span>
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Putuskan Akun Google?
                            </h3>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Setelah diputuskan, Anda tidak bisa lagi masuk menggunakan 1-klik Google SSO. Pastikan Anda mengingat kata sandi akun Anda.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsUnlinkModalOpen(false)}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleUnlinkGoogle}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
                            >
                                Ya, Putuskan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </InstructorLayout>
    );
}

