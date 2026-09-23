import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings({ membershipTiers = [] }) {
    const [featureFlags, setFeatureFlags] = useState({
        ocrScanner: true,
        aiChatAssistant: true,
        ambulanceSos119: true,
        communityForums: true,
        sensorWearablesSync: false,
    });

    const toggleFlag = (key) => {
        setFeatureFlags(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <AdminLayout activeNav="settings" title="Konfigurasi & Parameter Sistem">
            <Head title="Pengaturan Sistem — Admin Kadar" />
            <Head title="Pengaturan Sistem — Admin AEVYRA" />

            <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/10 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
                            <h2 className="text-xl font-heading font-bold text-primary">Konfigurasi Parameter Platform</h2>
                        </div>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Kontrol sakelar fitur bertahap (Feature Flags), batasan API, dan tingkat keanggotaan
                        </p>
                    </div>

                    <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-label-mono font-bold self-start md:self-auto">
                        Infrastruktur Kemenkes SatuSehat
                    </span>
                </div>

                {/* Feature Flags Section */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 shadow-xs border border-primary/10">
                    <div className="mb-5">
                        <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">toggle_on</span>
                            Sakelar Fitur Bertahap (Feature Flags)
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Aktifkan atau nonaktifkan modul aplikasi secara langsung tanpa perlu proses deployment ulang
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeatureToggleItem
                            title="Pemindai Kamera OCR (Scanner)"
                            description="Analisis komposisi gizi, gula, dan label obat menggunakan kamera perangkat"
                            enabled={featureFlags.ocrScanner}
                            onToggle={() => toggleFlag('ocrScanner')}
                            icon="qr_code_scanner"
                        />
                        <FeatureToggleItem
                            title="Asisten AI Non-Diagnostik"
                            description="Tanya-jawab panduan gaya hidup preventif berbasis model Google Gemini"
                            enabled={featureFlags.aiChatAssistant}
                            onToggle={() => toggleFlag('aiChatAssistant')}
                            icon="smart_toy"
                        />
                        <FeatureToggleItem
                            title="Akses Darurat Ambulan SOS 119"
                            description="Panggilan darurat berbasis lokasi mandiri tanpa melewati filter bot AI"
                            enabled={featureFlags.ambulanceSos119}
                            onToggle={() => toggleFlag('ambulanceSos119')}
                            icon="e911_emergency"
                            badge="Kritis"
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
                            badge="Beta"
                        />
                    </div>
                </div>

                {/* Membership Tiers Overview */}
                <div className="bg-white/75 backdrop-blur-md rounded-3xl p-6 shadow-xs border border-primary/10">
                    <div className="mb-5">
                        <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                            Tingkatan Akses Layanan (Membership Tiers)
                        </h3>
                        <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                            Prinsip Keselamatan Universal: Algoritma deviasi bekerja identik untuk seluruh member
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="p-5 rounded-2xl bg-white/80 border border-primary/10 shadow-xs space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-heading font-bold text-base text-primary">Silver (Dasar)</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary/10 text-primary">GRATIS</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Pelacakan metrik dasar (glukosa, tidur, hidrasi), asisten AI standar, dan konten edukasi preventif umum.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/80 border border-secondary/20 shadow-xs space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-heading font-bold text-base text-secondary">Gold (Menengah)</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-secondary-fixed/40 text-secondary-container">POPULER</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Analitik korelasi tren lanjutan, partisipasi challenge berhadiah poin, dan AI proaktif riwayat panjang.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/80 border border-primary/20 shadow-xs space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-heading font-bold text-base text-primary">Platinum (Tinggi)</span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-label-mono font-bold bg-primary text-white">HUMAN-IN-THE-LOOP</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Pendampingan instruktur manusia personal, rencana intervensi berkala mingguan, dan sesi konsultasi tatap muka 1-on-1.
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
        <div className="p-4 rounded-2xl bg-white/80 border border-primary/10 shadow-xs flex items-center justify-between gap-4 hover:border-primary/25 transition-all">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-on-surface">{title}</p>
                        {badge && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-label-mono font-bold bg-secondary/10 text-secondary uppercase">
                                {badge}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{description}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    enabled ? 'bg-primary' : 'bg-surface-container-high'
                }`}
            >
                <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
}

