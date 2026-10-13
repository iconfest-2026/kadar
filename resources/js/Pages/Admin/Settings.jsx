import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import { Switch, Input, Button, Alert, Modal, Badge, Card, CardHeader, CardTitle, CardContent } from '@/Components/UI';
import AdminBadge from '@/Components/Admin/AdminBadge';

export default function Settings({ 
    featureFlags: initialFlags = {}, 
    systemRules = {}, 
    serverInfo = {} 
}) {
    const [featureFlags, setFeatureFlags] = useState({
        ocrScanner: initialFlags?.ocrScanner ?? true,
        aiChatAssistant: initialFlags?.aiChatAssistant ?? true,
        ambulanceSos119: initialFlags?.ambulanceSos119 ?? true,
        communityForums: initialFlags?.communityForums ?? true,
        sensorWearablesSync: initialFlags?.sensorWearablesSync ?? false,
    });
    const [flagsProcessing, setFlagsProcessing] = useState(false);
    const [serverActionProcessing, setServerActionProcessing] = useState(false);
    const [activeActionName, setActiveActionName] = useState('');
    const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false);
    const [maintenanceSecret, setMaintenanceSecret] = useState('admin-emergency-bypass');

    const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
        max_instructors_per_member: systemRules.max_instructors_per_member ?? 3,
    });

    const toggleFlag = (key) => {
        setFeatureFlags((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSaveFlags = () => {
        setFlagsProcessing(true);
        router.post('/admin/settings/flags', { flags: featureFlags }, {
            preserveScroll: true,
            onFinish: () => setFlagsProcessing(false),
        });
    };

    const handleSaveRules = (e) => {
        e.preventDefault();
        post('/admin/settings', {
            preserveScroll: true,
        });
    };

    const handleClearCache = (type = 'all') => {
        const labels = {
            all: 'Semua Cache (Optimasi & Config)',
            route: 'Cache Routing',
            config: 'Cache Konfigurasi',
            view: 'Cache View Blade',
        };
        setActiveActionName(labels[type] || 'Cache');
        setServerActionProcessing(true);
        router.post('/admin/settings/cache-clear', { type }, {
            preserveScroll: true,
            onFinish: () => {
                setServerActionProcessing(false);
                setActiveActionName('');
            },
        });
    };

    const handleOptimizeServer = () => {
        setActiveActionName('Optimasi Server');
        setServerActionProcessing(true);
        router.post('/admin/settings/optimize', {}, {
            preserveScroll: true,
            onFinish: () => {
                setServerActionProcessing(false);
                setActiveActionName('');
            },
        });
    };

    const handleToggleMaintenance = () => {
        setActiveActionName('Toggle Maintenance');
        setServerActionProcessing(true);
        router.post('/admin/settings/maintenance-toggle', { secret: maintenanceSecret }, {
            preserveScroll: true,
            onFinish: () => {
                setServerActionProcessing(false);
                setActiveActionName('');
                setMaintenanceModalOpen(false);
            },
        });
    };

    return (
        <AdminLayout activeNav="settings" title="Konfigurasi & Parameter Sistem">
            <Head title="Pengaturan & Diagnostik Server - Admin AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Konfigurasi & Parameter Platform AEVYRA"
                    subtitle="Kontrol batas kuota instruktur member, sakelar fitur bertahap (Feature Flags), pemeliharaan server, dan diagnostik performa."
                    icon="tune"
                    badge={<AdminBadge variant="active">SatuSehat Ready</AdminBadge>}
                />

                {/* Server Maintenance Alert Banner (if down) */}
                {serverInfo?.maintenance_mode && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-amber-600 text-[28px] animate-pulse">engineering</span>
                            <div>
                                <h4 className="font-heading font-black text-amber-900 text-sm">Mode Maintenance Sedang Aktif!</h4>
                                <p className="text-xs text-amber-800">
                                    Pengguna umum saat ini melihat halaman pemeliharaan 503. Anda dapat menonaktifkannya kapan saja.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            loading={serverActionProcessing && activeActionName === 'Toggle Maintenance'}
                            onClick={() => setMaintenanceModalOpen(true)}
                            className="bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                            leftIcon="power_settings_new"
                        >
                            Nonaktifkan Maintenance
                        </Button>
                    </div>
                )}

                {/* Section 1: Server Status Diagnostics & Emergency Shortcuts */}
                <div className="bg-white/95 rounded-3xl p-6 shadow-xs border border-primary/15 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-heading font-black text-lg text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[22px]">dns</span>
                                    <span>Kesehatan Server & Tindakan Cepat (Shortcuts)</span>
                                </h3>
                                <Badge variant={serverInfo?.maintenance_mode ? 'warning' : 'success'}>
                                    {serverInfo?.maintenance_mode ? 'Maintenance Active' : 'Server Online'}
                                </Badge>
                            </div>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                Monitor metrik operasional backend dan eksekusi tindakan pemulihan jika server mengalami latensi atau masalah cache.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link href="/admin/logs">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    leftIcon="terminal"
                                    className="border-primary/20 hover:border-primary text-primary"
                                >
                                    Buka Log Error Server
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Server Diagnostic Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Runtime PHP</span>
                                <span className="material-symbols-outlined text-[16px] text-primary">code</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface truncate">
                                {serverInfo?.php_version || 'N/A'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                                Framework v{serverInfo?.laravel_version || '11'}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Basis Data</span>
                                <span className="material-symbols-outlined text-[16px] text-teal-600">database</span>
                            </div>
                            <div className="font-heading font-black text-sm text-teal-700 truncate flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                {serverInfo?.database_status === 'Connected' ? 'Terkoneksi' : 'Terputus'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 uppercase truncate">
                                Driver: {serverInfo?.database_driver || 'mysql'}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Alokasi RAM</span>
                                <span className="material-symbols-outlined text-[16px] text-indigo-600">memory</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface truncate">
                                {serverInfo?.memory_usage || 'N/A'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                                Batas: {serverInfo?.memory_limit || '512M'}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Ruang Harddisk</span>
                                <span className="material-symbols-outlined text-[16px] text-cyan-600">hard_drive</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface truncate">
                                {serverInfo?.disk_free_space || 'N/A'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                                Total: {serverInfo?.disk_total_space || 'N/A'}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Environment</span>
                                <span className="material-symbols-outlined text-[16px] text-amber-600">public</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface uppercase truncate">
                                {serverInfo?.environment || 'production'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                                Debug: {serverInfo?.debug_mode ? 'AKTIF' : 'OFF'}
                            </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-primary/10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-on-surface-variant mb-1">
                                <span className="text-[11px] font-bold">Cache Driver</span>
                                <span className="material-symbols-outlined text-[16px] text-purple-600">bolt</span>
                            </div>
                            <div className="font-heading font-black text-sm text-on-surface uppercase truncate">
                                {serverInfo?.cache_driver || 'file'}
                            </div>
                            <span className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                                Queue: {serverInfo?.queue_connection || 'database'}
                            </span>
                        </div>
                    </div>

                    {/* Emergency Actions & Shortcuts Panel */}
                    <div className="p-5 rounded-2xl bg-surface-container-lowest border border-primary/15 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[18px] text-primary">fast_forward</span>
                                    <span>Shortcut Tindakan Operasional Darurat & Cache</span>
                                </h4>
                                <p className="text-xs text-on-surface-variant">
                                    Gunakan tombol tindakan berikut jika website terasa lambat, perubahan konfigurasi tidak muncul, atau butuh perbaikan darurat.
                                </p>
                            </div>
                            {serverActionProcessing && (
                                <Badge variant="info" className="animate-pulse">
                                    Memproses: {activeActionName}...
                                </Badge>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Action 1: Clear All Cache */}
                            <div className="p-4 rounded-xl bg-white border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-700 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">cleaning_services</span>
                                        </div>
                                        <p className="font-bold text-xs text-on-surface">Bersihkan Semua Cache</p>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        Kosongkan cache config, route, cache query, dan view blade sekaligus.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-xs"
                                    leftIcon="delete_sweep"
                                    loading={serverActionProcessing && activeActionName === 'Semua Cache (Optimasi & Config)'}
                                    disabled={serverActionProcessing}
                                    onClick={() => handleClearCache('all')}
                                >
                                    Flush All Cache
                                </Button>
                            </div>

                            {/* Action 2: Optimize Server */}
                            <div className="p-4 rounded-xl bg-white border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-700 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">speed</span>
                                        </div>
                                        <p className="font-bold text-xs text-on-surface">Optimasi Server (Cache)</p>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        Kompilasi route, konfigurasi, dan class framework untuk performa maksimal.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-xs"
                                    leftIcon="offline_bolt"
                                    loading={serverActionProcessing && activeActionName === 'Optimasi Server'}
                                    disabled={serverActionProcessing}
                                    onClick={handleOptimizeServer}
                                >
                                    Jalankan Optimize
                                </Button>
                            </div>

                            {/* Action 3: Maintenance Mode Toggle */}
                            <div className="p-4 rounded-xl bg-white border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={`w-8 h-8 rounded-lg ${serverInfo?.maintenance_mode ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'} flex items-center justify-center shrink-0`}>
                                            <span className="material-symbols-outlined text-[18px]">engineering</span>
                                        </div>
                                        <p className="font-bold text-xs text-on-surface">Mode Maintenance</p>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        {serverInfo?.maintenance_mode 
                                            ? 'Server sedang ditutup. Klik untuk menghidupkan kembali akses publik.' 
                                            : 'Kunci akses publik sementara waktu saat migrasi atau perbaikan genting.'}
                                    </p>
                                </div>
                                <Button
                                    variant={serverInfo?.maintenance_mode ? 'primary' : 'outline'}
                                    size="sm"
                                    className="w-full text-xs"
                                    leftIcon="power_settings_new"
                                    disabled={serverActionProcessing}
                                    onClick={() => setMaintenanceModalOpen(true)}
                                >
                                    {serverInfo?.maintenance_mode ? 'Pulihkan Akses' : 'Aktifkan Maintenance'}
                                </Button>
                            </div>

                            {/* Action 4: Server Error Logs */}
                            <div className="p-4 rounded-xl bg-white border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between space-y-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-700 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">bug_report</span>
                                        </div>
                                        <p className="font-bold text-xs text-on-surface">Log Error Server</p>
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                        Inspeksi berkas laravel.log langsung dari dashboard tanpa akses SSH/terminal.
                                    </p>
                                </div>
                                <Link href="/admin/logs">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full text-xs text-rose-700 hover:text-rose-800 border-rose-200 hover:border-rose-300"
                                        leftIcon="read_more"
                                    >
                                        Buka Log Viewer
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Granular Cache Flush Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-primary/10 text-xs text-on-surface-variant">
                            <span className="font-bold text-[11px]">Pembersihan Khusus:</span>
                            <button
                                type="button"
                                disabled={serverActionProcessing}
                                onClick={() => handleClearCache('route')}
                                className="px-2.5 py-1 rounded-lg bg-white border border-primary/10 hover:border-primary/30 text-on-surface text-[11px] font-medium transition-colors hover:bg-surface-container-low"
                            >
                                Clear Route Cache
                            </button>
                            <button
                                type="button"
                                disabled={serverActionProcessing}
                                onClick={() => handleClearCache('config')}
                                className="px-2.5 py-1 rounded-lg bg-white border border-primary/10 hover:border-primary/30 text-on-surface text-[11px] font-medium transition-colors hover:bg-surface-container-low"
                            >
                                Clear Config Cache
                            </button>
                            <button
                                type="button"
                                disabled={serverActionProcessing}
                                onClick={() => handleClearCache('view')}
                                className="px-2.5 py-1 rounded-lg bg-white border border-primary/10 hover:border-primary/30 text-on-surface text-[11px] font-medium transition-colors hover:bg-surface-container-low"
                            >
                                Clear Blade View Cache
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 2: System Rules & Coaching Quota Configuration */}
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

                {/* Section 3: Feature Flags Section */}
                <div className="bg-white/95 rounded-3xl p-6 shadow-xs border border-primary/15 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="font-heading font-black text-lg text-primary flex items-center gap-2">
                                <span className="material-symbols-outlined text-[22px]">toggle_on</span>
                                <span>Sakelar Fitur Bertahap (Feature Flags)</span>
                            </h3>
                            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                Aktifkan atau nonaktifkan modul aplikasi secara langsung tanpa perlu proses deployment ulang.
                            </p>
                        </div>
                        <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            loading={flagsProcessing}
                            leftIcon="save"
                            onClick={handleSaveFlags}
                        >
                            Simpan Perubahan Sakelar
                        </Button>
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
                            title="Asisten AI Gaya Hidup & Wawasan"
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

                {/* Section 4: System Architecture Specifications */}
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
                                Panggilan darurat ambulans 119 dieksekusi dalam sub-200ms secara independen dari LLM cloud.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Maintenance Mode */}
            <Modal
                isOpen={maintenanceModalOpen}
                onClose={() => setMaintenanceModalOpen(false)}
                title={serverInfo?.maintenance_mode ? 'Nonaktifkan Mode Maintenance' : 'Aktifkan Mode Maintenance'}
                size="md"
            >
                <div className="space-y-4">
                    <div className={`p-4 rounded-2xl ${serverInfo?.maintenance_mode ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'} flex items-start gap-3`}>
                        <span className={`material-symbols-outlined ${serverInfo?.maintenance_mode ? 'text-emerald-600' : 'text-amber-600'} text-[24px] shrink-0 mt-0.5`}>
                            {serverInfo?.maintenance_mode ? 'check_circle' : 'warning'}
                        </span>
                        <div className="text-xs space-y-1">
                            <p className="font-bold text-on-surface">
                                {serverInfo?.maintenance_mode
                                    ? 'Apakah Anda yakin ingin memulihkan akses publik sekarang?'
                                    : 'Perhatian: Aplikasi akan menampilkan halaman 503 Service Unavailable bagi seluruh pengguna umum.'}
                            </p>
                            <p className="text-on-surface-variant leading-relaxed">
                                {serverInfo?.maintenance_mode
                                    ? 'Seluruh member dan instruktur akan langsung dapat mengakses aplikasi kembali secara normal.'
                                    : 'Admin tetap dapat mengakses aplikasi melalui URL bypass secret token di bawah ini.'}
                            </p>
                        </div>
                    </div>

                    {!serverInfo?.maintenance_mode && (
                        <div>
                            <Input
                                label="Bypass Secret Token"
                                type="text"
                                value={maintenanceSecret}
                                onChange={(e) => setMaintenanceSecret(e.target.value)}
                                helperText={`Akses khusus saat maintenance: ${window.location.origin}/${maintenanceSecret}`}
                                leftIcon="key"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-primary/10">
                        <Button
                            variant="ghost"
                            size="md"
                            disabled={serverActionProcessing}
                            onClick={() => setMaintenanceModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant={serverInfo?.maintenance_mode ? 'primary' : 'warning'}
                            size="md"
                            loading={serverActionProcessing}
                            onClick={handleToggleMaintenance}
                            leftIcon="power_settings_new"
                        >
                            {serverInfo?.maintenance_mode ? 'Ya, Buka Akses Publik' : 'Ya, Aktifkan Mode Maintenance'}
                        </Button>
                    </div>
                </div>
            </Modal>
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
