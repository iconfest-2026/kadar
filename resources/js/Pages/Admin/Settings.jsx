import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminBadge from '@/Components/Admin/AdminBadge';
import { Switch, Input, Button, Alert } from '@/Components/UI';

export default function Settings({ featureFlags: initialFlags = [], systemRules = {} }) {
    const [featureFlags, setFeatureFlags] = useState({
        ocrScanner: true,
        aiChatAssistant: true,
        ambulanceSos119: true,
        communityForums: true,
        sensorWearablesSync: false,
    });

    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        max_instructors_per_member: systemRules.max_instructors_per_member ?? 3,
    });

    const toggleFlag = (key) => {
        setFeatureFlags((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSaveRules = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout activeNav="settings" title="Konfigurasi Sistem">
            <Head title="Konfigurasi Sistem & Aturan Kuota — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Konfigurasi & Parameter Platform AEVYRA"
                    subtitle="Kontrol batas kuota instruktur member, sakelar fitur bertahap (Feature Flags), dan parameter operasional sistem."
                    icon="tune"
                    badge={<AdminBadge variant="active">SatuSehat Ready</AdminBadge>}
                />

                {/* System Rules & Coaching Quota Configuration */}
                <div className="bg-white/95 rounded-3xl p-6 shadow-xs border border-primary/15 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-heading font-black text-lg text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined text-[22px]">policy</span>
                                <span>Aturan Pembatasan Kuota & Kebijakan Instruktur</span>
                            </h3>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                Atur batasan relasi pendampingan antara member dan tenaga medis berlisensi.
                            </p>
                        </div>
                        <AdminBadge variant="amber">Rule Control</AdminBadge>
                    </div>

                    {recentlySuccessful && (
                        <Alert variant="success" dismissible>
                            Pengaturan parameter sistem berhasil diperbarui dan diterapkan ke seluruh ekosistem aplikasi.
                        </Alert>
                    )}

                    <form onSubmit={handleSaveRules} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
                        <div className="md:col-span-2 space-y-1">
                            <Input
                                label="Batas Maksimal Instruktur per Member (Standar Sistem: 3)"
                                type="number"
                                min="1"
                                max="10"
                                required
                                value={data.max_instructors_per_member}
                                onChange={(e) => setData('max_instructors_per_member', parseInt(e.target.value) || 1)}
                                helperText="Member bebas memilih hingga batas ini (contoh: dokter gizi, dokter olahraga, dan dietisien). Kepemilikan instruktur tetap bersifat opsional bagi member."
                                leftIcon="groups"
                                error={errors.max_instructors_per_member}
                            />
                        </div>

                        <div className="pb-1">
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                                loading={processing}
                                leftIcon="save"
                                className="w-full"
                            >
                                Simpan Parameter Kuota
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Feature Flags Section */}
                <div className="bg-white/95 rounded-3xl p-6 shadow-xs border border-primary/15 space-y-5">
                    <div>
                        <h3 className="font-heading font-black text-lg text-primary flex items-center gap-2">
                            <span className="material-symbols-outlined text-[22px]">toggle_on</span>
                            <span>Sakelar Fitur Bertahap (Feature Flags)</span>
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Aktifkan atau nonaktifkan modul aplikasi secara langsung tanpa perlu proses deployment ulang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeatureToggleItem
                            title="Pemindai Kamera OCR (Scanner)"
                            description="Analisis komposisi gizi, gula, dan label obat menggunakan kamera perangkat secara instan"
                            enabled={featureFlags.ocrScanner}
                            onToggle={() => toggleFlag('ocrScanner')}
                            icon="qr_code_scanner"
                        />
                        <FeatureToggleItem
                            title="Asisten AI Non-Diagnostik"
                            description="Tanya-jawab panduan gaya hidup preventif berbasis model Google Gemini 2.5 Flash"
                            enabled={featureFlags.aiChatAssistant}
                            onToggle={() => toggleFlag('aiChatAssistant')}
                            icon="smart_toy"
                        />
                        <FeatureToggleItem
                            title="Akses Darurat Ambulans SOS 119"
                            description="Panggilan darurat berbasis lokasi mandiri tanpa melewati filter bot AI"
                            enabled={featureFlags.ambulanceSos119}
                            onToggle={() => toggleFlag('ambulanceSos119')}
                            icon="e911_emergency"
                            badge={<AdminBadge variant="emergency" size="xs">Kritis</AdminBadge>}
                        />
                        <FeatureToggleItem
                            title="Ruang Diskusi & Komunitas"
                            description="Forum pertukaran pengalaman antar-member dengan moderasi berkala"
                            enabled={featureFlags.communityForums}
                            onToggle={() => toggleFlag('communityForums')}
                            icon="forum"
                        />
                        <FeatureToggleItem
                            title="Integrasi Sensor Wearable Eksternal"
                            description="Sinkronisasi otomatis Apple Health dan Google Health Connect"
                            enabled={featureFlags.sensorWearablesSync}
                            onToggle={() => toggleFlag('sensorWearablesSync')}
                            icon="watch"
                            badge={<AdminBadge variant="pending" size="xs">Beta</AdminBadge>}
                        />
                    </div>
                </div>

                {/* System Architecture Specifications */}
                <div className="bg-white/95 rounded-3xl p-6 shadow-xs border border-primary/15 space-y-4">
                    <h3 className="font-heading font-black text-lg text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[22px]">dns</span>
                        <span>Spesifikasi Keamanan & Tata Kelola Data</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 space-y-1">
                            <span className="font-bold text-on-surface flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-teal-600 text-[16px]">lock</span>
                                Enkripsi Data Pribadi
                            </span>
                            <p className="text-on-surface-variant leading-relaxed">
                                Standar enkripsi AES-256 pada seluruh rekaman rekam medis & log audit forensik.
                            </p>
                        </div>

                        <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 space-y-1">
                            <span className="font-bold text-on-surface flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-emerald-600 text-[16px]">health_and_safety</span>
                                Batas Yuridis Medis
                            </span>
                            <p className="text-on-surface-variant leading-relaxed">
                                Asisten AI dibatasi secara keras oleh safe guard rails agar tidak meresepkan obat keras atau memberikan diagnosa medis definitif.
                            </p>
                        </div>

                        <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/10 space-y-1">
                            <span className="font-bold text-on-surface flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-rose-600 text-[16px]">speed</span>
                                Fast-Track Darurat 119
                            </span>
                            <p className="text-on-surface-variant leading-relaxed">
                                Panggilan SPGDT darurat 119 dieksekusi dalam sub-200ms secara independen dari LLM cloud.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function FeatureToggleItem({ title, description, enabled, onToggle, icon, badge }) {
    return (
        <div className="p-4 rounded-2xl bg-white border border-primary/15 shadow-2xs flex items-center justify-between gap-4 hover:border-primary/30 transition-all">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-on-surface">{title}</p>
                        {badge}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{description}</p>
                </div>
            </div>

            <Switch
                checked={enabled}
                onChange={onToggle}
            />
        </div>
    );
}
