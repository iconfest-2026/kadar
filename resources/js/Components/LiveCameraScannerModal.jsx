import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function LiveCameraScannerModal({ isOpen, onClose, onScanned }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('camera'); // 'camera', 'upload', 'presets'

    // Preset test samples
    const samplePresets = [
        {
            id: 'sample_drink',
            name: 'Teh Manis Melati Kemasan 350ml',
            category: 'Minuman Kemasan',
            image: '/image/scan_prod_drink.jpg',
            sugar: '24g (6 sdt gula pasir)',
            sodium: '35mg',
            fat: '0g',
            calories: 110,
            gl: 'Tinggi (GL 22)',
            glLevel: 'HIGH',
            bpom: 'MD 268310001000 - Terverifikasi',
        },
        {
            id: 'sample_food',
            name: 'Biskuit Gandum Serat Tinggi 100g',
            category: 'Makanan Olahan',
            image: '/image/scan_prod_food.jpg',
            sugar: '7g (1.5 sdt)',
            sodium: '110mg',
            fat: '3.5g',
            calories: 145,
            gl: 'Rendah (GL 7)',
            glLevel: 'LOW',
            bpom: 'MD 235609012345 - Terverifikasi',
        },
        {
            id: 'sample_pharma',
            name: 'Tablet Paracetamol 500mg',
            category: 'Obat & Farmasi',
            image: '/image/scan_prod_pharma.jpg',
            sugar: '0g (Aman Gula)',
            sodium: '2mg',
            fat: '0g',
            calories: 0,
            gl: 'Netral (GL 0)',
            glLevel: 'NEUTRAL',
            bpom: 'DKL 8319900110A1 - Resmi BPOM',
        },
    ];

    // Start Webcam
    const startCamera = async () => {
        setCameraError(null);
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setCameraActive(true);
                }
            } else {
                setCameraError('Perangkat tidak mendukung akses kamera langsung. Silakan unggah foto atau gunakan sampel.');
            }
        } catch (err) {
            setCameraError('Izin kamera tidak diberikan atau kamera tidak terdeteksi. Silakan gunakan sampel simulasi atau unggah foto.');
            setCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setCameraActive(false);
        }
    };

    useEffect(() => {
        if (isOpen && activeTab === 'camera') {
            startCamera();
        } else {
            stopCamera();
        }
        return () => {
            stopCamera();
        };
    }, [isOpen, activeTab]);

    // Capture from Camera
    const captureSnapshot = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        submitAnalyze({ image_data: dataUrl });
    };

    // Analyze Preset
    const selectPreset = (presetId) => {
        submitAnalyze({ preset_key: presetId });
    };

    // File Upload Handler
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            submitAnalyze({ image_data: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const submitAnalyze = async (payload) => {
        setAnalyzing(true);
        setScanResult(null);
        setSaveSuccess(false);

        try {
            // Get CSRF token
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const res = await fetch('/member/scanner/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.status === 'success' && data.result) {
                setScanResult(data.result);
                if (onScanned) onScanned(data.result);
            }
        } catch (err) {
            console.error('Scan analyze error:', err);
        } finally {
            setAnalyzing(false);
        }
    };

    // Save to Nutrition Log
    const handleSaveToNutrisi = async () => {
        if (!scanResult) return;
        setSaving(true);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const res = await fetch('/member/scanner/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    product_name: scanResult.product_name,
                    category: scanResult.category,
                    nutrition: scanResult.nutrition,
                    glycemic_load: scanResult.glycemic_load,
                    notes: scanResult.warning || scanResult.clinical_note,
                }),
            });

            const data = await res.json();
            if (data.status === 'success') {
                setSaveSuccess(true);
                setTimeout(() => {
                    onClose();
                    router.reload();
                }, 1500);
            }
        } catch (err) {
            console.error('Save to nutrisi error:', err);
        } finally {
            setSaving(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface rounded-3xl max-w-2xl w-full shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[92vh]">
                
                {/* Header */}
                <div className="p-4 sm:p-5 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-primary">
                                Scanner Open Cam Gizi & Obat
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                OCR Label Komposisi, Verifikasi BPOM & Prediksi Lonjakan Glukosa
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-surface-container px-4 bg-surface-container-lowest/50">
                    <button
                        onClick={() => setActiveTab('camera')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
                            activeTab === 'camera'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                        Kamera Langsung (Open Cam)
                    </button>
                    <button
                        onClick={() => setActiveTab('presets')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
                            activeTab === 'presets'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">fastfood</span>
                        Preset Sampel Demo
                    </button>
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
                            activeTab === 'upload'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        Unggah Foto
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                    
                    {/* CAMERA TAB */}
                    {activeTab === 'camera' && (
                        <div className="space-y-3">
                            <div className="relative rounded-2xl overflow-hidden bg-black aspect-4/3 flex items-center justify-center border-2 border-dashed border-primary/40 shadow-inner">
                                <video
                                    ref={videoRef}
                                    playsInline
                                    muted
                                    className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {/* Camera HUD Overlay */}
                                {cameraActive && (
                                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                                        <div className="w-56 h-56 border-2 border-primary/80 rounded-2xl relative shadow-[0_0_15px_rgba(0,67,62,0.5)]">
                                            {/* Corner brackets */}
                                            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-emerald-400"></div>
                                            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-emerald-400"></div>
                                            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-emerald-400"></div>
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-emerald-400"></div>
                                            
                                            {/* Scanning Line Animation */}
                                            <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse absolute top-1/2 -translate-y-1/2"></div>
                                        </div>
                                        <p className="text-[11px] font-mono text-white/90 bg-black/60 px-3 py-1 rounded-full mt-3">
                                            Arahkan ke tabel gizi atau kemasan produk
                                        </p>
                                    </div>
                                )}

                                {!cameraActive && (
                                    <div className="text-center p-6 text-white space-y-3">
                                        <span className="material-symbols-outlined text-5xl text-white/40">no_photography</span>
                                        <p className="text-xs text-white/80 max-w-xs mx-auto">
                                            {cameraError || 'Menghubungkan ke lensa kamera perangkat...'}
                                        </p>
                                        <button
                                            onClick={startCamera}
                                            className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl"
                                        >
                                            Coba Buka Kamera Lagi
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Camera Action Button */}
                            {cameraActive && (
                                <div className="flex justify-center pt-2">
                                    <button
                                        type="button"
                                        onClick={captureSnapshot}
                                        disabled={analyzing}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all text-sm"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">lens</span>
                                        {analyzing ? 'Menganalisis OCR...' : 'Ambil Foto & Analisis'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PRESETS TAB */}
                    {activeTab === 'presets' && (
                        <div className="space-y-3">
                            <p className="text-xs text-on-surface-variant font-medium">
                                Pilih sampel produk nyata untuk mendemonstrasikan algoritma OCR dan kurva glukosa postprandial:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {samplePresets.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => selectPreset(s.id)}
                                        className="cursor-pointer p-3 rounded-2xl border border-primary/20 bg-surface-container-lowest hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
                                    >
                                        <div>
                                            <img
                                                src={s.image}
                                                alt={s.name}
                                                className="w-full h-24 object-cover rounded-xl mb-2 group-hover:scale-102 transition-transform"
                                            />
                                            <h4 className="text-xs font-bold text-on-surface group-hover:text-primary">
                                                {s.name}
                                            </h4>
                                            <p className="text-[10px] text-on-surface-variant">{s.category}</p>
                                        </div>
                                        <div className="mt-3 pt-2 border-t border-surface-container flex items-center justify-between text-[11px]">
                                            <span className="font-mono font-bold text-primary">{s.calories} kkal</span>
                                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                                s.glLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                                                s.glLevel === 'LOW' ? 'bg-emerald-100 text-emerald-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {s.gl}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* UPLOAD TAB */}
                    {activeTab === 'upload' && (
                        <div className="p-6 border-2 border-dashed border-primary/30 rounded-2xl text-center space-y-3 bg-surface-container-lowest">
                            <span className="material-symbols-outlined text-4xl text-primary/60">add_photo_alternate</span>
                            <div>
                                <h4 className="text-xs font-bold text-on-surface">Pilih Foto dari Galeri / File</h4>
                                <p className="text-[11px] text-on-surface-variant">Mendukung format JPG, PNG, WEBP (maksimal 5MB)</p>
                            </div>
                            <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-primary-container transition-all">
                                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                                <span>Pilih Gambar</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    {/* ANALYZING SPINNER */}
                    {analyzing && (
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/15 flex flex-col items-center justify-center text-center space-y-2 animate-pulse">
                            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <h4 className="text-xs font-bold text-primary">Menganalisis Komposisi Gizi & Resep...</h4>
                            <p className="text-[11px] text-on-surface-variant">Memeriksa nomor registrasi BPOM dan menghitung Glycemic Load</p>
                        </div>
                    )}

                    {/* SCAN RESULT CARD */}
                    {scanResult && !analyzing && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container-low border border-primary/30 shadow-md space-y-4 animate-scale-up">
                            
                            {/* Product Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                                        <span className="material-symbols-outlined text-[14px]">verified</span>
                                        {scanResult.bpom_status}
                                    </div>
                                    <h4 className="font-heading font-bold text-base text-on-surface">
                                        {scanResult.product_name}
                                    </h4>
                                    <p className="text-xs text-on-surface-variant">Kategori: {scanResult.category}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-lg font-black text-primary font-mono">
                                        {scanResult.nutrition.calories}
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant block">Total Kalori</span>
                                </div>
                            </div>

                            {/* Macro Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
                                    <span className="text-[10px] text-amber-800 font-bold block">Gula Pasir</span>
                                    <span className="text-sm font-black text-amber-900 font-mono">
                                        {scanResult.nutrition.sugar_g}g
                                    </span>
                                    <span className="text-[9px] text-amber-700 block">
                                        ({scanResult.nutrition.sugar_teaspoon_equivalent} sdt)
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
                                    <span className="text-[10px] text-blue-800 font-bold block">Natrium/Sodium</span>
                                    <span className="text-sm font-black text-blue-900 font-mono">
                                        {scanResult.nutrition.sodium_mg}mg
                                    </span>
                                    <span className="text-[9px] text-blue-700 block">
                                        {scanResult.nutrition.sodium_mg > 200 ? 'Waspada' : 'Normal'}
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200">
                                    <span className="text-[10px] text-rose-800 font-bold block">Lemak Jenuh</span>
                                    <span className="text-sm font-black text-rose-900 font-mono">
                                        {scanResult.nutrition.saturated_fat_g}g
                                    </span>
                                    <span className="text-[9px] text-rose-700 block">Kolektif</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200">
                                    <span className="text-[10px] text-emerald-800 font-bold block">Glycemic Load</span>
                                    <span className="text-sm font-black text-emerald-900 font-mono">
                                        {scanResult.glycemic_load.score}
                                    </span>
                                    <span className="text-[9px] text-emerald-700 block font-bold">
                                        {scanResult.glycemic_load.level}
                                    </span>
                                </div>
                            </div>

                            {/* Glucose Spike Projection Curve (SVG) */}
                            {scanResult.glucose_spike_curve && (
                                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-on-surface flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-primary">show_chart</span>
                                            Simulasi Kurva Glukosa Postprandial (2 Jam)
                                        </span>
                                        <span className="text-[10px] font-mono text-on-surface-variant">Baseline: 95 mg/dL</span>
                                    </div>

                                    {/* Responsive SVG Curve */}
                                    <div className="h-24 w-full relative">
                                        <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                                            {/* Baseline dotted line */}
                                            <line x1="0" y1="65" x2="300" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                                            <text x="5" y="62" fontSize="8" fill="#64748b">Baseline 95</text>
                                            
                                            {/* Threshold line 140 mg/dL */}
                                            <line x1="0" y1="20" x2="300" y2="20" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                                            <text x="240" y="16" fontSize="8" fill="#f43f5e">Waspada 140</text>

                                            {/* Spike path based on curve points */}
                                            {(() => {
                                                const pts = scanResult.glucose_spike_curve;
                                                const maxVal = 180;
                                                const minVal = 80;
                                                const coords = pts.map((p, idx) => {
                                                    const x = (idx / (pts.length - 1)) * 280 + 10;
                                                    const y = 75 - ((p.glucose_estimate - minVal) / (maxVal - minVal)) * 60;
                                                    return `${x},${y}`;
                                                }).join(' ');

                                                return (
                                                    <>
                                                        <polyline
                                                            fill="none"
                                                            stroke={scanResult.glycemic_load.level === 'TINGGI' ? '#e11d48' : '#00433e'}
                                                            strokeWidth="2.5"
                                                            points={coords}
                                                        />
                                                        {pts.map((p, idx) => {
                                                            const x = (idx / (pts.length - 1)) * 280 + 10;
                                                            const y = 75 - ((p.glucose_estimate - minVal) / (maxVal - minVal)) * 60;
                                                            return (
                                                                <g key={idx}>
                                                                    <circle
                                                                        cx={x}
                                                                        cy={y}
                                                                        r="3"
                                                                        fill={scanResult.glycemic_load.level === 'TINGGI' ? '#e11d48' : '#00433e'}
                                                                    />
                                                                    <text
                                                                        x={x}
                                                                        y={y - 6}
                                                                        fontSize="7"
                                                                        fontWeight="bold"
                                                                        textAnchor="middle"
                                                                        fill="#334155"
                                                                    >
                                                                        {p.glucose_estimate}
                                                                    </text>
                                                                    <text
                                                                        x={x}
                                                                        y={78}
                                                                        fontSize="7"
                                                                        textAnchor="middle"
                                                                        fill="#64748b"
                                                                    >
                                                                        +{p.minutes}m
                                                                    </text>
                                                                </g>
                                                            );
                                                        })}
                                                    </>
                                                );
                                            })()}
                                        </svg>
                                    </div>
                                    <p className="text-[10px] text-on-surface-variant italic">
                                        {scanResult.glycemic_load.clinical_implication}
                                    </p>
                                </div>
                            )}

                            {/* Warning Note */}
                            {scanResult.warning && (
                                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0">warning</span>
                                    <span>{scanResult.warning}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleSaveToNutrisi}
                                    disabled={saving || saveSuccess}
                                    className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {saveSuccess ? 'check_circle' : 'bookmark_add'}
                                    </span>
                                    <span>
                                        {saveSuccess
                                            ? 'Berhasil Dicatat (+15 Poin)!'
                                            : saving
                                            ? 'Menyimpan ke Log...'
                                            : 'Simpan ke Catatan Nutrisi (+15 Poin)'}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScanResult(null)}
                                    className="py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold"
                                >
                                    Pindai Lagi
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Advice */}
                <div className="p-3 bg-surface-container-lowest border-t border-surface-container text-center text-[10px] text-on-surface-variant flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
                    <span>Algoritma HBE memvalidasi barcode BPOM & standar gizi Kemenkes RI untuk pencegahan diabetes dini.</span>
                </div>
            </div>
        </div>
    );
}
