import React, { useState, useRef } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import { DatePicker } from '../../Components/UI';

export default function Account({ user, profile, membership }) {
    const fileInputRef = useRef(null);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [avatarError, setAvatarError] = useState(null);
    const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

    const [isUnlinkModalOpen, setIsUnlinkModalOpen] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Form Edit Profil & Akun
    const profileForm = useForm({
        name: user?.name || '',
        display_name: profile?.display_name || user?.name || '',
        occupation: profile?.occupation || '',
        sex: profile?.sex || 'MALE',
        date_of_birth: profile?.date_of_birth || '',
    });

    // Form Ubah Password
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        profileForm.post('/member/account', {
            preserveScroll: true,
        });
    };

    const handleSavePassword = (e) => {
        e.preventDefault();
        passwordForm.post('/member/account/password', {
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
        setAvatarLoadFailed(false);
        setPreviewUrl(URL.createObjectURL(file));
        setIsUploadingAvatar(true);

        const formData = new FormData();
        formData.append('avatar', file);

        router.post('/member/account/avatar', formData, {
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
        <AppLayout title="Detail & Pengaturan Akun" activeTab="menu">
            <Head title="Informasi & Pengaturan Akun - AEVYRA" />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5 pb-10">
                {/* Header Navigasi Kembali */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/member/menu"
                            className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
                            title="Kembali ke Menu"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </Link>
                        <div>
                            <h1 className="font-heading font-black text-lg sm:text-xl text-primary dark:text-emerald-400 leading-tight">
                                Informasi &amp; Pengaturan Akun
                            </h1>
                            <p className="text-xs text-on-surface-variant">
                                Kelola data pribadi, foto profil, keamanan, dan integrasi Google
                            </p>
                        </div>
                    </div>
                </div>

                {/* 1. KARTU RINGKASAN AKUN DENGAN UPLOAD FOTO PROFIL */}
                <div className="p-4 sm:p-5 rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container text-white shadow-md relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-center gap-4 min-w-0">
                            {/* Avatar Picker Interaktif */}
                            <div className="relative group shrink-0">
                                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md bg-white/20 backdrop-blur-md flex items-center justify-center">
                                    {(previewUrl || user.avatar_url) && !avatarLoadFailed ? (
                                        <img
                                            src={previewUrl || user.avatar_url}
                                            alt={user.name}
                                            referrerPolicy="no-referrer"
                                            crossOrigin="anonymous"
                                            onError={() => setAvatarLoadFailed(true)}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-heading font-black text-2xl text-white">
                                            {(user?.name || 'U').charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>


                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarSelect}
                                    accept="image/png,image/jpeg,image/jpg,image/webp"
                                    className="hidden"
                                />
                            </div>

                            {/* Identitas Pengguna */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="font-heading font-black text-base sm:text-lg text-white truncate">
                                        {user.name}
                                    </h2>
                                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold font-label-mono text-emerald-200 uppercase tracking-wide">
                                        {membership?.tier || 'Member'}
                                    </span>
                                </div>
                                <p className="text-xs text-white/80 truncate mt-0.5">{user.email}</p>
                                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/70">
                                    <span>Bergabung: {user.created_at}</span>
                                    <span>&bull;</span>
                                    <span className="text-emerald-300 font-semibold">Status: Aktif</span>
                                </div>
                            </div>
                        </div>

                        {/* Tombol Cepat Ganti Foto */}
                        <div className="flex items-center gap-2 sm:self-center shrink-0">
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={isUploadingAvatar}
                                className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs border border-white/30 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-2xs disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[16px]">
                                    {isUploadingAvatar ? 'progress_activity' : 'upload'}
                                </span>
                                <span>{isUploadingAvatar ? 'Mengunggah...' : 'Ganti Foto'}</span>
                            </button>
                        </div>
                    </div>

                    {avatarError && (
                        <div className="mt-3 px-3 py-1.5 rounded-xl bg-rose-500/30 border border-rose-300/50 text-rose-100 text-[11px] flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[14px]">error</span>
                            <span>{avatarError}</span>
                        </div>
                    )}
                </div>

                {/* 2. KARTU INTEGRASI KONEKSI GOOGLE */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 border border-surface-container-high">
                                {/* SVG Logo Google */}
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
                                        ? 'Akun terhubung untuk Single Sign-On (SSO) instan'
                                        : 'Hubungkan untuk login cepat 1-klik dengan Google'}
                                </p>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-label-mono uppercase shrink-0 ${
                                user.is_google_connected
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                            }`}
                        >
                            {user.is_google_connected ? 'Terhubung' : 'Belum Terhubung'}
                        </span>
                    </div>

                    <div className="pt-2 border-t border-surface-container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            {user.is_google_connected ? (
                                <>
                                    Akun Google Anda saat ini tertaut dengan aman. Anda dapat masuk langsung ke AEVYRA tanpa mengetik kata sandi.
                                </>
                            ) : (
                                <>
                                    Akun Google belum ditautkan. Hubungkan akun sekarang untuk mempermudah login di perangkat mobile maupun desktop.
                                </>
                            )}
                        </p>

                        {user.is_google_connected ? (
                            <button
                                type="button"
                                onClick={() => setIsUnlinkModalOpen(true)}
                                className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold border border-rose-200 transition-all shrink-0 cursor-pointer"
                            >
                                Putuskan Koneksi
                            </button>
                        ) : (
                            <a
                                href="/auth/google/link?return_url=/member/account"
                                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 active:scale-95"
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

                {/* 3. FORM EDIT INFORMASI PROFIL */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 sm:p-7 shadow-xs space-y-6">
                    <div className="flex items-center justify-between border-b border-surface-container pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">person</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface leading-tight">
                                    Informasi Pribadi &amp; Profil
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Perbarui data identitas diri dan profil kesehatan Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            {/* Baris 1: Nama Lengkap & Nama Panggilan */}
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Nama Lengkap <span className="text-rose-500">*</span>
                                </label>
                                <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                        badge
                                    </span>
                                    <input
                                        type="text"
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        autoComplete="name"
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden"
                                        required
                                    />
                                </div>
                                {profileForm.errors.name && (
                                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[14px]">error</span>
                                        {profileForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Nama Panggilan (Display Name)
                                </label>
                                <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                        sentiment_satisfied
                                    </span>
                                    <input
                                        type="text"
                                        value={profileForm.data.display_name}
                                        onChange={(e) => profileForm.setData('display_name', e.target.value)}
                                        placeholder="Nama sapaan"
                                        autoComplete="nickname"
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            {/* Baris 2: Pekerjaan & Jenis Kelamin */}
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Pekerjaan / Aktivitas
                                </label>
                                <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                        work
                                    </span>
                                    <input
                                        type="text"
                                        value={profileForm.data.occupation}
                                        onChange={(e) => profileForm.setData('occupation', e.target.value)}
                                        placeholder="Contoh: Karyawan Swasta, Wirausaha"
                                        autoComplete="organization-title"
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden placeholder:text-on-surface-variant/40"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Jenis Kelamin
                                </label>
                                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                    {[
                                        { value: 'MALE', label: 'Laki-laki', icon: 'male' },
                                        { value: 'FEMALE', label: 'Perempuan', icon: 'female' },
                                        { value: 'OTHER', label: 'Lainnya', icon: 'person' },
                                    ].map((option) => {
                                        const isSelected = profileForm.data.sex === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => profileForm.setData('sex', option.value)}
                                                className={`flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1 sm:px-2 rounded-2xl text-[11px] sm:text-xs transition-all border cursor-pointer active:scale-95 ${
                                                    isSelected
                                                        ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                                        : 'bg-surface-container-lowest dark:bg-surface text-on-surface hover:bg-surface-container-low border-surface-container-high font-semibold'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[15px] shrink-0">
                                                    {option.icon}
                                                </span>
                                                <span className="whitespace-nowrap">{option.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Baris 3: Tanggal Lahir & Email Akun */}
                            <DatePicker
                                label="Tanggal Lahir"
                                value={profileForm.data.date_of_birth}
                                onChange={(val) => profileForm.setData('date_of_birth', val)}
                                placeholder="Pilih tanggal lahir..."
                                leftIcon="calendar_today"
                                error={profileForm.errors.date_of_birth}
                            />

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                        Alamat Email Terdaftar
                                    </label>
                                    <span className="text-[10px] font-semibold text-on-surface-variant/70 bg-surface-container px-2 py-0.5 rounded-full">
                                        Terkunci
                                    </span>
                                </div>
                                <div className="relative flex items-center rounded-2xl border border-surface-container bg-surface-container-low text-on-surface-variant shadow-2xs opacity-85">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/50 text-[18px]">
                                        mail
                                    </span>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                        autoComplete="email"
                                        className="w-full pl-10 pr-3.5 py-2.5 bg-transparent text-xs font-medium cursor-not-allowed select-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-surface-container flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[17px]">save</span>
                                <span>{profileForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* 4. FORM PENGATURAN KATA SANDI */}
                <div className="rounded-3xl bg-white dark:bg-surface border border-surface-container p-5 sm:p-7 shadow-xs space-y-6">
                    <div className="flex items-center justify-between border-b border-surface-container pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">lock</span>
                            </div>
                            <div>
                                <h3 className="font-heading font-bold text-base text-on-surface leading-tight">
                                    Keamanan Kata Sandi
                                </h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Perbarui kata sandi akun untuk menjaga keamanan akses
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSavePassword} className="space-y-5">
                        {/* Hidden username field for browser password managers & DOM accessibility (fixes goo.gl/9p2vKq) */}
                        <input
                            type="text"
                            name="username"
                            value={user?.email || user?.name || ''}
                            autoComplete="username"
                            readOnly
                            tabIndex={-1}
                            aria-hidden="true"
                            className="hidden"
                        />

                        {/* Baris 1: Kata Sandi Lama */}
                        <div className="space-y-1.5">
                            <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                Kata Sandi Lama
                            </label>
                            <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                    key
                                </span>
                                <input
                                    type={showCurrentPass ? 'text' : 'password'}
                                    value={passwordForm.data.current_password}
                                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                    placeholder="Masukkan kata sandi saat ini"
                                    autoComplete="current-password"
                                    className="w-full pl-10 pr-11 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden placeholder:text-on-surface-variant/40"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                                    className="absolute right-3 p-1 rounded-lg text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                                    title={showCurrentPass ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {showCurrentPass ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                            <p className="text-[11px] text-on-surface-variant">
                                * Kosongkan jika Anda mendaftar pertama kali menggunakan akun Google.
                            </p>
                            {passwordForm.errors.current_password && (
                                <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-1">
                                    <span className="material-symbols-outlined text-[14px]">error</span>
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
                        </div>

                        {/* Baris 2: Kata Sandi Baru & Konfirmasi Kata Sandi */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Kata Sandi Baru <span className="text-rose-500">*</span>
                                </label>
                                <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                        lock
                                    </span>
                                    <input
                                        type={showNewPass ? 'text' : 'password'}
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        placeholder="Minimal 8 karakter"
                                        autoComplete="new-password"
                                        className="w-full pl-10 pr-11 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden placeholder:text-on-surface-variant/40"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPass(!showNewPass)}
                                        className="absolute right-3 p-1 rounded-lg text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                                        title={showNewPass ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showNewPass ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="text-[11px] text-rose-500 font-medium flex items-center gap-1 mt-1">
                                        <span className="material-symbols-outlined text-[14px]">error</span>
                                        {passwordForm.errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold text-on-surface tracking-wider uppercase">
                                    Konfirmasi Kata Sandi Baru <span className="text-rose-500">*</span>
                                </label>
                                <div className="group relative flex items-center rounded-2xl border border-surface-container-high bg-surface-container-lowest hover:border-primary/40 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all shadow-2xs">
                                    <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant/60 group-focus-within:text-primary transition-colors text-[18px]">
                                        verified_user
                                    </span>
                                    <input
                                        type={showConfirmPass ? 'text' : 'password'}
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        placeholder="Ulangi kata sandi baru"
                                        autoComplete="new-password"
                                        className="w-full pl-10 pr-11 py-2.5 bg-transparent text-xs text-on-surface font-medium focus:outline-hidden placeholder:text-on-surface-variant/40"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute right-3 p-1 rounded-lg text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-container transition-all cursor-pointer"
                                        title={showConfirmPass ? 'Sembunyikan Kata Sandi' : 'Tampilkan Kata Sandi'}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {showConfirmPass ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-surface-container flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="px-6 py-2.5 rounded-2xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[17px]">lock_reset</span>
                                <span>{passwordForm.processing ? 'Memperbarui...' : 'Perbarui Kata Sandi'}</span>
                            </button>
                        </div>
                    </form>
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
        </AppLayout>
    );
}

