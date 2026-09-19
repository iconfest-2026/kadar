import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Onboarding({ user, existingProfile, existingLifestyle, existingGoal }) {
    const { data, setData, post, processing, errors } = useForm({
        // Profile
        display_name: existingProfile?.display_name || user?.name || '',
        date_of_birth: existingProfile?.date_of_birth || '1996-05-14',
        sex: existingProfile?.sex || 'MALE',
        occupation: existingProfile?.occupation || 'Profesional & Pekerja Kantor',

        // Lifestyle
        work_pattern: existingLifestyle?.work_pattern || 'SEDENTARY',
        typical_sleep_bed: existingLifestyle?.typical_sleep_bed || '23:00',
        typical_sleep_wake: existingLifestyle?.typical_sleep_wake || '06:30',
        meal_pattern: existingLifestyle?.meal_pattern || '3_MEALS',
        dietary_pref: existingLifestyle?.dietary_pref || ['low_sugar'],

        // Primary Goal
        goal_title: existingGoal?.title || 'Menjaga Kestabilan Energi & Ritme Tidur',
        goal_type: existingGoal?.type || 'SLEEP_ROUTINE',
        target_metric: 'sleep_duration',
        target_value: '450', // 7.5 hours
        target_unit: 'minutes',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/member/onboarding');
    };

    return (
        <AppLayout title="Inisialisasi Profil & Baseline" activeTab="onboarding">
            <Head title="Pengaturan Profil Baseline - Kadar" />

            <div className="max-w-3xl mx-auto space-y-6 py-4">
                <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-2">
                    <span className="font-label-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                        Langkah Penting Fondasi HBE
                    </span>
                    <h1 className="font-heading font-bold text-2xl text-on-surface">
                        Pengaturan Profil Kesehatan & Rutinitas Harian
                    </h1>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        Data ini digunakan oleh Health Behavior Engine (HBE) untuk menetapkan konteks biologis, mengevaluasi kualitas pencatatan (DQS), dan mempersonalisasi ambang batas deteksi sinyal Anda.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section 1: Data Diri */}
                    <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
                        <h2 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">badge</span>
                            <span>1. Informasi Identitas Diri</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Nama Panggilan / Tampilan
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.display_name}
                                    onChange={(e) => setData('display_name', e.target.value)}
                                    placeholder="Contoh: Reza"
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                {errors.display_name && <p className="text-[11px] text-error font-medium">{errors.display_name}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Pekerjaan / Aktivitas Utama
                                </label>
                                <input
                                    type="text"
                                    value={data.occupation}
                                    onChange={(e) => setData('occupation', e.target.value)}
                                    placeholder="Contoh: Pegawai Kantor, Wiraswasta"
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Tanggal Lahir
                                </label>
                                <input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Jenis Kelamin
                                </label>
                                <select
                                    value={data.sex}
                                    onChange={(e) => setData('sex', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                >
                                    <option value="MALE">Laki-laki</option>
                                    <option value="FEMALE">Perempuan</option>
                                    <option value="OTHER">Lainnya</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Gaya Hidup & Rutinitas */}
                    <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
                        <h2 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">timelapse</span>
                            <span>2. Pola Kerja & Rutinitas Tidur</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Pola Aktivitas Kerja
                                </label>
                                <select
                                    value={data.work_pattern}
                                    onChange={(e) => setData('work_pattern', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                >
                                    <option value="SEDENTARY">Banyak Duduk (Desk / Remote Work)</option>
                                    <option value="SHIFT_WORK">Pekerja Shift (Berganti Pagi/Malam)</option>
                                    <option value="ACTIVE_LABOR">Pekerja Lapangan / Banyak Bergerak</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Pola Jam Makan
                                </label>
                                <select
                                    value={data.meal_pattern}
                                    onChange={(e) => setData('meal_pattern', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                >
                                    <option value="3_MEALS">3 Kali Makan Teratur</option>
                                    <option value="INTERMITTENT">Intermittent Fasting (Jendela Makan)</option>
                                    <option value="UNSTRUCTURED">Waktu Makan Fleksibel / Tidak Tetap</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Target Waktu Tidur Malam
                                </label>
                                <input
                                    type="time"
                                    value={data.typical_sleep_bed}
                                    onChange={(e) => setData('typical_sleep_bed', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Target Waktu Bangun Pagi
                                </label>
                                <input
                                    type="time"
                                    value={data.typical_sleep_wake}
                                    onChange={(e) => setData('typical_sleep_wake', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Sasaran Utama */}
                    <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-surface-container shadow-xs space-y-4">
                        <h2 className="font-heading font-bold text-base text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[20px]">flag</span>
                            <span>3. Sasaran Perubahan Kebiasaan Utama (Primary Goal)</span>
                        </h2>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                    Judul Sasaran
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.goal_title}
                                    onChange={(e) => setData('goal_title', e.target.value)}
                                    placeholder="Contoh: Tidur teratur 7.5 jam & bebas begadang"
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                />
                                {errors.goal_title && <p className="text-[11px] text-error font-medium">{errors.goal_title}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                        Kategori Kebiasaan
                                    </label>
                                    <select
                                        value={data.goal_type}
                                        onChange={(e) => setData('goal_type', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    >
                                        <option value="SLEEP_ROUTINE">Rutinitas & Durasi Tidur</option>
                                        <option value="PHYSICAL_ACTIVITY">Aktivitas Fisik & Langkah Kaki</option>
                                        <option value="HYDRATION">Kecukupan Hidrasi Air</option>
                                        <option value="METABOLIC_HEALTH">Kestabilan Glukosa Metabolik</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                        Target Numerik (Menit / Jumlah)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.target_value}
                                        onChange={(e) => setData('target_value', e.target.value)}
                                        placeholder="450 (menit = 7.5 jam)"
                                        className="w-full px-3.5 py-2.5 bg-surface-container-low text-xs rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="py-3 px-6 rounded-2xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold shadow-xs flex items-center gap-2 transition-all"
                        >
                            {processing ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                                    <span>Menyimpan Pengaturan...</span>
                                </>
                            ) : (
                                <>
                                    <span>Simpan Profil & Mulai Pantau Baseline</span>
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
