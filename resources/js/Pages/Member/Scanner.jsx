import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import LiveCameraScannerModal from '../../Components/LiveCameraScannerModal';

export default function Scanner({ recentScans, todayScanCount, maxScanQuota, tierName }) {
    const { flash } = usePage().props;
    const [scannerModalOpen, setScannerModalOpen] = useState(false);
    const [selectedHistoryScan, setSelectedHistoryScan] = useState(null);

    return (
        <AppLayout title="Scanner Open Cam Gizi & Obat" activeTab="scanner">
            <Head title="Scanner Open Cam Komposisi & Farmasi — AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Header Banner */}
                <div className="relative rounded-3xl bg-linear-to-r from-primary via-[#005a54] to-primary-container p-6 sm:p-10 text-white overflow-hidden shadow-xl">
                    <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                            <span className="material-symbols-outlined text-[16px] text-emerald-300">center_focus_strong</span>
                            <span>Fitur 1: Scanner Open Cam & BPOM OCR Engine</span>
                        </div>
                        <h1 className="font-heading font-black text-2xl sm:text-4xl tracking-tight leading-tight">
                            Pindai Cepat Label Gizi & Obat Tanpa Riset Manual
                        </h1>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                            Arahkan kamera ponsel ke tabel Informasi Nilai Gizi minuman kemasan, makanan olahan, atau etiket obat. AI membaca kandungan gula tersembunyi, natrium, dan memproyeksikan kurva lonjakan glukosa darah Anda dalam hitungan detik.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => setScannerModalOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-primary font-bold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 active:scale-95 transition-all"
                            >
                                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                                <span>Buka Kamera & Pindai Sekarang</span>
                            </button>

                            <div className="flex items-center gap-2 text-xs font-medium bg-black/20 backdrop-blur-xs px-3.5 py-2 rounded-xl">
                                <span>Kuota Harian ({tierName}):</span>
                                <span className="font-bold text-emerald-300">{todayScanCount} / {maxScanQuota} Terpakai</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Urgensi & Edukasi Singkat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-white dark:bg-surface border border-primary/15 shadow-xs space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">nutrition</span>
                        </div>
                        <h3 className="font-bold text-sm text-on-surface">Literasi Label Gizi Rendah</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            Sebagian besar masyarakat Indonesia tidak menyadari 1 botol teh kemasan bisa mengandung 24–32g gula pasir (setara 6–8 sendok teh), melebihi anjuran batas Kemenkes 50g/hari.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-surface border border-primary/15 shadow-xs space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-700 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">ssid_chart</span>
                        </div>
                        <h3 className="font-bold text-sm text-on-surface">Prediksi Lonjakan Glukosa (GL)</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            Algoritma memperkirakan beban glikemik (Glycemic Load) dan respon insulin sel beta pankreas secara visual agar Anda tahu kapan harus mengimbangi dengan jalan kaki.
                        </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white dark:bg-surface border border-primary/15 shadow-xs space-y-2">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[20px]">verified</span>
                        </div>
                        <h3 className="font-bold text-sm text-on-surface">Validasi Registrasi BPOM RI</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                            Mencegah konsumsi obat tradisional tanpa izin edar atau makanan dengan nomor registrasi fiktif guna menjamin keamanan konsumsi jangka panjang.
                        </p>
                    </div>
                </div>

                {/* History Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-heading font-bold text-lg text-on-surface">
                                Riwayat Pemindaian Terkini
                            </h2>
                            <p className="text-xs text-on-surface-variant">
                                Hasil pemindaian nutrisi yang telah dicatat ke jurnal kesehatan harian Anda
                            </p>
                        </div>
                        <button
                            onClick={() => setScannerModalOpen(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-container"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            <span>Pindai Baru</span>
                        </button>
                    </div>

                    {recentScans && recentScans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentScans.map((scan) => (
                                <div
                                    key={scan.id}
                                    className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container hover:border-primary/30 transition-all shadow-xs space-y-3"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary mb-1">
                                                {scan.category}
                                            </span>
                                            <h4 className="font-bold text-sm text-on-surface">{scan.product_name}</h4>
                                            <span className="text-[10px] text-on-surface-variant">{scan.recorded_at}</span>
                                        </div>
                                        <span className="font-mono font-bold text-sm text-primary">{scan.calories} kkal</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-surface-container text-center text-xs">
                                        <div>
                                            <span className="text-[9px] text-on-surface-variant block">Gula</span>
                                            <span className="font-mono font-bold text-on-surface">{scan.sugar_g}g</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] text-on-surface-variant block">Natrium</span>
                                            <span className="font-mono font-bold text-on-surface">{scan.sodium_mg}mg</span>
                                        </div>
                                        <div>
                                            <span className="text-[9px] text-on-surface-variant block">GL Score</span>
                                            <span className={`font-mono font-bold ${
                                                scan.glycemic_load >= 20 ? 'text-rose-600' :
                                                scan.glycemic_load <= 10 ? 'text-emerald-600' : 'text-amber-600'
                                            }`}>
                                                {scan.glycemic_load}
                                            </span>
                                        </div>
                                    </div>

                                    {scan.notes && (
                                        <p className="text-[11px] text-on-surface-variant line-clamp-2 italic">
                                            {scan.notes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center rounded-2xl border border-dashed border-surface-container bg-surface-container-lowest space-y-3">
                            <span className="material-symbols-outlined text-4xl text-on-surface-variant">qr_code_scanner</span>
                            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                                Belum ada riwayat pemindaian. Gunakan Scanner Open Cam untuk mendeteksi komposisi makanan atau minuman pertama Anda dan dapatkan +15 poin!
                            </p>
                            <button
                                onClick={() => setScannerModalOpen(true)}
                                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl"
                            >
                                Mulai Pindai Sekarang
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <LiveCameraScannerModal
                isOpen={scannerModalOpen}
                onClose={() => setScannerModalOpen(false)}
            />
        </AppLayout>
    );
}
