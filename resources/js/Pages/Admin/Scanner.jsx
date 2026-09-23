import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import AdminPageHeader from '@/Components/Admin/AdminPageHeader';
import AdminStatCard from '@/Components/Admin/AdminStatCard';
import AdminFilterBar from '@/Components/Admin/AdminFilterBar';
import AdminDataTable from '@/Components/Admin/AdminDataTable';
import AdminBadge from '@/Components/Admin/AdminBadge';
import AdminModal from '@/Components/Admin/AdminModal';

export default function Scanner({ scanLogs = [], stats = {} }) {
    const [search, setSearch] = useState('');
    const [selectedLog, setSelectedLog] = useState(null);

    const filteredLogs = scanLogs.filter((log) =>
        log.target_name.toLowerCase().includes(search.toLowerCase()) ||
        log.user_name.toLowerCase().includes(search.toLowerCase())
    );

    const columns = [
        {
            key: 'target_name',
            label: 'Objek / Produk Terdeteksi',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">
                            {row.scan_type === 'MEDICINE_LABEL' ? 'medication' : 'nutrition'}
                        </span>
                    </div>
                    <div>
                        <p className="font-bold text-on-surface text-xs">{row.target_name}</p>
                        <span className="text-[10px] font-label-mono text-on-surface-variant">
                            Pengguna: {row.user_name}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            key: 'scan_type',
            label: 'Kategori Scan',
            render: (row) => {
                const isMed = row.scan_type === 'MEDICINE_LABEL';
                return (
                    <AdminBadge variant={isMed ? 'rose' : 'emerald'}>
                        {isMed ? 'Label Obat' : 'Label Gizi'}
                    </AdminBadge>
                );
            },
        },
        {
            key: 'details',
            label: 'Ekstraksi Nilai Kunci',
            render: (row) => (
                <span className="font-label-mono text-xs font-semibold text-primary">
                    {row.calories ? `${row.calories} • ${row.sugar_content}` : row.dosage || row.blood_glucose}
                </span>
            ),
        },
        {
            key: 'ocr_accuracy',
            label: 'Akurasi OCR AI',
            render: (row) => (
                <div className="flex items-center gap-1.5">
                    <span className="font-label-mono font-bold text-xs text-on-surface">
                        {row.ocr_accuracy}%
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-label-mono">
                        ({row.latency_ms}ms)
                    </span>
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Kualifikasi Data',
            render: (row) => (
                <AdminBadge variant={row.status === 'WARNING_ISSUED' ? 'attention' : 'active'}>
                    {row.status}
                </AdminBadge>
            ),
        },
        {
            key: 'actions',
            label: 'Inspeksi',
            align: 'right',
            render: (row) => (
                <button
                    type="button"
                    onClick={() => setSelectedLog(row)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-primary/5 text-primary border border-primary/15 font-semibold text-xs transition-all flex items-center gap-1 ml-auto"
                >
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                    <span>Detail</span>
                </button>
            ),
        },
    ];

    return (
        <AdminLayout activeNav="scanner" title="Scanner Kamera & OCR">
            <Head title="Scanner Kamera & OCR — AEVYRA" />

            <div className="space-y-6">
                <AdminPageHeader
                    title="Pemindai Kamera OCR (Open Cam Vision)"
                    subtitle="Pengawasan log pemrosesan label nutrisi makanan/minuman, barcode obat-obatan, dan display perangkat glukometer secara real-time."
                    icon="document_scanner"
                    badge={<AdminBadge variant="active" pulse>AI Vision Engine Aktif</AdminBadge>}
                />

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <AdminStatCard
                        title="Total Scan Hari Ini"
                        value={stats.totalScansToday || 0}
                        icon="qr_code_scanner"
                        accent="primary"
                        subtitle="Pemindaian label sukses"
                        trend={{ value: '+32%', isPositive: true }}
                    />
                    <AdminStatCard
                        title="Rata-rata Akurasi OCR"
                        value={stats.avgAccuracy || '98%'}
                        icon="verified"
                        accent="emerald"
                        subtitle="Confidence score deteksi teks"
                    />
                    <AdminStatCard
                        title="Kecepatan Respon Model"
                        value={stats.avgLatency || '395ms'}
                        icon="speed"
                        accent="indigo"
                        subtitle="Latency inferensi on-device + cloud"
                    />
                    <AdminStatCard
                        title="Model AI Aktif"
                        value="Gemini Vision"
                        icon="smart_toy"
                        accent="amber"
                        subtitle="Integrasi multimodal otomatis"
                    />
                </div>

                {/* Filter Bar */}
                <AdminFilterBar
                    searchPlaceholder="Cari objek, nama produk, atau member..."
                    searchValue={search}
                    onSearchChange={setSearch}
                    activeCount={search ? 1 : 0}
                    onReset={() => setSearch('')}
                />

                {/* Data Table */}
                <AdminDataTable
                    columns={columns}
                    data={filteredLogs}
                    emptyMessage="Belum ada rekaman pemindaian kamera OCR."
                    emptyIcon="document_scanner"
                />

                {/* Inspection Modal */}
                <AdminModal
                    isOpen={!!selectedLog}
                    onClose={() => setSelectedLog(null)}
                    title={`Detail Pemindaian: ${selectedLog?.target_name}`}
                    subtitle={`ID Log #${selectedLog?.id} • Pengguna: ${selectedLog?.user_name}`}
                    icon="document_scanner"
                    footer={
                        <button
                            type="button"
                            onClick={() => setSelectedLog(null)}
                            className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                        >
                            Tutup
                        </button>
                    }
                >
                    {selectedLog && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3 p-4 bg-surface-container-low rounded-2xl border border-primary/10">
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Tipe Scan</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedLog.scan_type}</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Waktu Scan</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{new Date(selectedLog.scanned_at).toLocaleString('id-ID')}</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Akurasi Deteksi</span>
                                    <p className="font-bold text-xs text-emerald-700 mt-0.5">{selectedLog.ocr_accuracy}%</p>
                                </div>
                                <div>
                                    <span className="font-label-mono text-[10px] uppercase text-on-surface-variant">Waktu Inferensi</span>
                                    <p className="font-bold text-xs text-on-surface mt-0.5">{selectedLog.latency_ms} ms</p>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-2xl border border-primary/10 space-y-2">
                                <h4 className="font-bold text-xs text-on-surface flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
                                    <span>Hasil Ekstraksi & Nilai Parameter:</span>
                                </h4>
                                <ul className="space-y-1 text-xs text-on-surface-variant font-label-mono">
                                    {selectedLog.calories && <li>• Kalori: {selectedLog.calories}</li>}
                                    {selectedLog.sugar_content && <li>• Kandungan Gula: {selectedLog.sugar_content}</li>}
                                    {selectedLog.dosage && <li>• Anjuran Dosis: {selectedLog.dosage}</li>}
                                    {selectedLog.blood_glucose && <li>• Nilai Glukosa: {selectedLog.blood_glucose}</li>}
                                </ul>
                            </div>
                        </div>
                    )}
                </AdminModal>
            </div>
        </AdminLayout>
    );
}

