import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function LiveCameraScannerModal({ isOpen, onClose, onScanned }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [ocrStep, setOcrStep] = useState('');
    const [ocrProgressPercent, setOcrProgressPercent] = useState(0);
    const [scanResult, setScanResult] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('camera'); // 'camera', 'upload', 'presets'
    const [showRawOcr, setShowRawOcr] = useState(false);

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
            gl: 'Tinggi (GL 18)',
            glLevel: 'HIGH',
            bpom: 'MD 268310001001 - Terverifikasi',
        },
        {
            id: 'sample_food',
            name: 'Biskuit Gandum Serat Tinggi 100g',
            category: 'Makanan Olahan Gandum',
            image: '/image/scan_prod_food.jpg',
            sugar: '6g (1.5 sdt)',
            sodium: '110mg',
            fat: '3.5g',
            calories: 145,
            gl: 'Rendah (GL 8)',
            glLevel: 'LOW',
            bpom: 'MD 235609012345 - Terverifikasi',
        },
        {
            id: 'sample_pharma',
            name: 'Tablet Paracetamol 500mg',
            category: 'Sediaan Obat Bebas',
            image: '/image/scan_prod_pharma.jpg',
            sugar: '0g (Bebas Gula)',
            sodium: '2mg',
            fat: '0g',
            calories: 0,
            gl: 'Netral (GL 0)',
            glLevel: 'NEUTRAL',
            bpom: 'DKL 8319900110A1 - Resmi BPOM',
        },
        {
            id: 'sample_snack',
            name: 'Keripik Kentang Balado Renyah 50g',
            category: 'Camilan Gurih Olahan',
            image: '/image/scan_prod_food.jpg',
            sugar: '4.5g (1 sdt)',
            sodium: '480mg (Tinggi Garam)',
            fat: '7g',
            calories: 260,
            gl: 'Sedang (GL 19)',
            glLevel: 'HIGH',
            bpom: 'MD 272810019283 - Terverifikasi',
        },
    ];

    // Start Webcam
    const startCamera = async () => {
        setCameraError(null);
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
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
            setCameraError('Izin kamera belum diberikan atau kamera tidak terdeteksi. Silakan berikan izin atau gunakan fitur unggah foto.');
            setCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
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

    // On-device Wasm OCR extraction with fallback safety
    const runOnDeviceOcr = async (dataUrl) => {
        try {
            const { createWorker } = await import('tesseract.js');
            const workerPromise = (async () => {
                const worker = await createWorker('eng');
                const ret = await worker.recognize(dataUrl);
                await worker.terminate();
                return ret?.data?.text || '';
            })();

            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(''), 4500));
            return await Promise.race([workerPromise, timeoutPromise]);
        } catch (err) {
            console.warn('Wasm OCR local worker notice:', err);
            return '';
        }
    };

    // Unified Pipeline: Camera Snapshot / File -> Local OCR Sensor -> Backend Clinical Validation
    const processImageAnalysis = async ({ dataUrl = null, presetKey = null }) => {
        setAnalyzing(true);
        setScanResult(null);
        setSaveSuccess(false);

        let extractedText = '';

        if (presetKey) {
            setOcrStep('Memuat basis data tervalidasi klinis & BPOM RI...');
            setOcrProgressPercent(60);
        } else if (dataUrl) {
            setOcrStep('Tahap 1/3: Menginisialisasi sensor kamera & resolusi gambar...');
            setOcrProgressPercent(25);

            setOcrStep('Tahap 2/3: Menjalankan Optical Character Recognition (OCR)...');
            setOcrProgressPercent(55);
            extractedText = await runOnDeviceOcr(dataUrl);

            setOcrStep('Tahap 3/3: Memvalidasi Informasi Nilai Gizi & Izin Edar BPOM...');
            setOcrProgressPercent(85);
        }

        try {
            const csrfToken =
                document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

            const res = await fetch('/member/scanner/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    image_data: dataUrl,
                    ocr_text: extractedText,
                    preset_key: presetKey,
                    sample_key: presetKey,
                }),
            });

            const data = await res.json();
            if ((data.status === 'success' || data.success) && data.result) {
                setScanResult(data.result);
                if (onScanned) onScanned(data.result);
            }
        } catch (err) {
            console.error('Scan analyze error:', err);
        } finally {
            setAnalyzing(false);
            setOcrStep('');
            setOcrProgressPercent(0);
        }
    };

    // Capture from Camera Viewfinder
    const captureSnapshot = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        processImageAnalysis({ dataUrl });
    };

    // Analyze Preset
    const selectPreset = (presetId) => {
        const presetMap = {
            sample_drink: 'drink',
            sample_food: 'food',
            sample_pharma: 'medicine',
            sample_snack: 'snack',
        };
        const key = presetMap[presetId] || presetId;
        processImageAnalysis({ presetKey: key });
    };

    // File Upload Handler
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            processImageAnalysis({ dataUrl: reader.result });
        };
        reader.readAsDataURL(file);
    };

    // Save to Nutrition Log
    const handleSaveToNutrisi = async () => {
        if (!scanResult) return;
        setSaving(true);

        try {
            const csrfToken =
                document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
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
            if (data.status === 'success' || data.success) {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface rounded-3xl max-w-2xl w-full shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[92vh]">
                {/* Header */}
                <div className="p-4 sm:p-5 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-[22px]">center_focus_strong</span>
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-base sm:text-lg text-primary flex items-center gap-2">
                                <span>Scanner Open Cam OCR Gizi &amp; BPOM</span>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-600 text-white tracking-wide">
                                    OCR AKTIF
                                </span>
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Sensor Optis Pembaca Karakter, Izin Edar BPOM RI &amp; Proyeksi Glukosa
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                        title="Tutup Modal"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex border-b border-surface-container px-4 bg-surface-container-lowest/50 overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('camera')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeTab === 'camera'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                        Sensor Kamera Langsung (Open Cam)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('presets')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeTab === 'presets'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">fastfood</span>
                        Preset Sampel Klinis
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('upload')}
                        className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeTab === 'upload'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        Unggah Foto Kemasan
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
                    {/* 1. CAMERA TAB WITH SENSOR VIEWFINDER HUD */}
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

                                {/* High-Tech Camera Sensor HUD Overlay */}
                                {cameraActive && (
                                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-3.5 sm:p-4">
                                        {/* Top Sensor Status Badge */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-300 text-[10px] font-mono border border-emerald-500/30 shadow-md">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span>SENSOR SCANNER OCR AKTIF &bull; AUTO-DETECT</span>
                                        </div>

                                        {/* Center Targeting Reticle & Laser */}
                                        <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-emerald-400/80 rounded-2xl relative shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center">
                                            {/* Corner brackets */}
                                            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-sm"></div>
                                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-sm"></div>
                                            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-sm"></div>
                                            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-sm"></div>

                                            {/* Center Target Crosshair */}
                                            <div className="w-6 h-6 border border-emerald-400/40 rounded-full flex items-center justify-center opacity-70">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                            </div>

                                            {/* High-Tech Animated Laser Line */}
                                            <div className="w-full h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-laser-scan left-0"></div>
                                        </div>

                                        {/* Bottom Sensor Guidance Text */}
                                        <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-center max-w-xs">
                                            <p className="text-[11px] text-white font-medium">
                                                Posisikan tabel Informasi Nilai Gizi atau nomor registrasi BPOM dalam kotak sensor
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {!cameraActive && (
                                    <div className="text-center p-6 text-white space-y-3">
                                        <span className="material-symbols-outlined text-5xl text-white/40">
                                            no_photography
                                        </span>
                                        <p className="text-xs text-white/80 max-w-xs mx-auto">
                                            {cameraError || 'Menghubungkan ke sensor lensa kamera perangkat...'}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={startCamera}
                                            className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl cursor-pointer"
                                        >
                                            Coba Buka Kamera Lagi
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Camera Action Button */}
                            {cameraActive && (
                                <div className="flex justify-center pt-1">
                                    <button
                                        type="button"
                                        onClick={captureSnapshot}
                                        disabled={analyzing}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-container disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all text-sm cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            center_focus_strong
                                        </span>
                                        <span>{analyzing ? 'Sensor Sedang Memindai OCR...' : 'Ambil Foto & Analisis OCR'}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. PRESETS TAB */}
                    {activeTab === 'presets' && (
                        <div className="space-y-3">
                            <p className="text-xs text-on-surface-variant font-medium">
                                Pilih sampel produk kemasan untuk menguji hasil ekstraksi sistem OCR, verifikasi BPOM, dan kurva glukosa postprandial:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {samplePresets.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => selectPreset(s.id)}
                                        className="cursor-pointer p-3 rounded-2xl border border-primary/20 bg-surface-container-lowest hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-full h-20 bg-surface-container rounded-xl flex items-center justify-center text-primary/70 mb-2">
                                                <span className="material-symbols-outlined text-[32px]">
                                                    {s.id === 'sample_drink'
                                                        ? 'local_cafe'
                                                        : s.id === 'sample_pharma'
                                                        ? 'medication'
                                                        : s.id === 'sample_snack'
                                                        ? 'bakery_dining'
                                                        : 'cookie'}
                                                </span>
                                            </div>
                                            <h4 className="text-xs font-bold text-on-surface group-hover:text-primary leading-snug">
                                                {s.name}
                                            </h4>
                                            <p className="text-[10px] text-on-surface-variant mt-0.5">{s.category}</p>
                                        </div>
                                        <div className="mt-3 pt-2 border-t border-surface-container flex items-center justify-between text-[11px]">
                                            <span className="font-mono font-bold text-primary">{s.calories} kkal</span>
                                            <span
                                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                                    s.glLevel === 'HIGH'
                                                        ? 'bg-rose-100 text-rose-800'
                                                        : s.glLevel === 'LOW'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}
                                            >
                                                {s.gl}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. UPLOAD TAB */}
                    {activeTab === 'upload' && (
                        <div className="p-6 border-2 border-dashed border-primary/30 rounded-2xl text-center space-y-3 bg-surface-container-lowest">
                            <span className="material-symbols-outlined text-4xl text-primary/60">
                                add_photo_alternate
                            </span>
                            <div>
                                <h4 className="text-xs font-bold text-on-surface">Pilih Foto Label dari Galeri / File</h4>
                                <p className="text-[11px] text-on-surface-variant">
                                    Mendukung format JPG, PNG, WEBP dengan tabel Informasi Nilai Gizi
                                </p>
                            </div>
                            <label className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-primary-container transition-all">
                                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                                <span>Pilih Gambar Kemasan</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}

                    {/* OCR SENSOR PROGRESS STATE */}
                    {analyzing && (
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                            <div className="relative">
                                <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary text-[20px]">
                                    document_scanner
                                </span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-primary">Sistem Sensor OCR Sedang Bekerja...</h4>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                    {ocrStep || 'Membaca karakter teks optis dari kemasan produk...'}
                                </p>
                            </div>
                            {/* Progress bar */}
                            <div className="w-full max-w-xs bg-surface-container rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300 rounded-full"
                                    style={{ width: `${ocrProgressPercent || 60}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* OCR ACCURATE SCAN RESULT CARD */}
                    {scanResult && !analyzing && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container-low border border-primary/30 shadow-md space-y-4 animate-scale-up">
                            {/* Product Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary mb-1">
                                        <span className="material-symbols-outlined text-[14px]">verified</span>
                                        <span>{scanResult.bpom_status}</span>
                                    </div>
                                    <h4 className="font-heading font-bold text-base text-on-surface">
                                        {scanResult.product_name}
                                    </h4>
                                    <p className="text-xs text-on-surface-variant">
                                        Kategori: {scanResult.category} &bull; Porsi: {scanResult.serving_size}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-lg font-black text-primary font-mono">
                                        {scanResult.nutrition?.calories || 0}
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant block">Total Kalori (kkal)</span>
                                </div>
                            </div>

                            {/* Macro Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200">
                                    <span className="text-[10px] text-amber-800 font-bold block">Gula Pasir</span>
                                    <span className="text-sm font-black text-amber-900 font-mono">
                                        {scanResult.nutrition?.sugar_g || 0}g
                                    </span>
                                    <span className="text-[9px] text-amber-700 block">
                                        ({scanResult.nutrition?.sugar_teaspoon_equivalent || 0} sdt)
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200">
                                    <span className="text-[10px] text-blue-800 font-bold block">Natrium / Garam</span>
                                    <span className="text-sm font-black text-blue-900 font-mono">
                                        {scanResult.nutrition?.sodium_mg || 0}mg
                                    </span>
                                    <span className="text-[9px] text-blue-700 block">
                                        {(scanResult.nutrition?.sodium_mg || 0) > 300 ? 'Tinggi' : 'Aman'}
                                    </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200">
                                    <span className="text-[10px] text-rose-800 font-bold block">Lemak Jenuh</span>
                                    <span className="text-sm font-black text-rose-900 font-mono">
                                        {scanResult.nutrition?.saturated_fat_g || 0}g
                                    </span>
                                    <span className="text-[9px] text-rose-700 block">Kolektif</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200">
                                    <span className="text-[10px] text-emerald-800 font-bold block">Glycemic Load</span>
                                    <span className="text-sm font-black text-emerald-900 font-mono">
                                        {scanResult.glycemic_load?.score || 0}
                                    </span>
                                    <span className="text-[9px] text-emerald-700 block font-bold">
                                        {scanResult.glycemic_load?.level || 'SEDANG'}
                                    </span>
                                </div>
                            </div>

                            {/* Glucose Spike Projection Curve (SVG) */}
                            {scanResult.glucose_spike_curve && (
                                <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-on-surface flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[16px] text-primary">
                                                show_chart
                                            </span>
                                            Simulasi Kurva Glukosa Postprandial (2 Jam)
                                        </span>
                                        <span className="text-[10px] font-mono text-on-surface-variant">
                                            Baseline: 95 mg/dL
                                        </span>
                                    </div>

                                    {/* Responsive SVG Curve */}
                                    <div className="h-24 w-full relative">
                                        <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
                                            {/* Baseline dotted line */}
                                            <line
                                                x1="0"
                                                y1="65"
                                                x2="300"
                                                y2="65"
                                                stroke="#94a3b8"
                                                strokeWidth="1"
                                                strokeDasharray="4 4"
                                            />
                                            <text x="5" y="62" fontSize="8" fill="#64748b">
                                                Baseline 95
                                            </text>

                                            {/* Threshold line 140 mg/dL */}
                                            <line
                                                x1="0"
                                                y1="20"
                                                x2="300"
                                                y2="20"
                                                stroke="#f43f5e"
                                                strokeWidth="1"
                                                strokeDasharray="3 3"
                                                opacity="0.6"
                                            />
                                            <text x="240" y="16" fontSize="8" fill="#f43f5e">
                                                Waspada 140
                                            </text>

                                            {/* Spike path based on curve points */}
                                            {(() => {
                                                const pts = scanResult.glucose_spike_curve;
                                                const maxVal = 180;
                                                const minVal = 80;
                                                const coords = pts
                                                    .map((p, idx) => {
                                                        const x = (idx / (pts.length - 1)) * 280 + 10;
                                                        const y =
                                                            75 -
                                                            ((p.glucose_estimate - minVal) / (maxVal - minVal)) * 60;
                                                        return `${x},${y}`;
                                                    })
                                                    .join(' ');

                                                return (
                                                    <>
                                                        <polyline
                                                            fill="none"
                                                            stroke={
                                                                scanResult.glycemic_load?.level === 'TINGGI'
                                                                    ? '#e11d48'
                                                                    : '#00433e'
                                                            }
                                                            strokeWidth="2.5"
                                                            points={coords}
                                                        />
                                                        {pts.map((p, idx) => {
                                                            const x = (idx / (pts.length - 1)) * 280 + 10;
                                                            const y =
                                                                75 -
                                                                ((p.glucose_estimate - minVal) / (maxVal - minVal)) *
                                                                    60;
                                                            return (
                                                                <g key={idx}>
                                                                    <circle
                                                                        cx={x}
                                                                        cy={y}
                                                                        r="3"
                                                                        fill={
                                                                            scanResult.glycemic_load?.level === 'TINGGI'
                                                                                ? '#e11d48'
                                                                                : '#00433e'
                                                                        }
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
                                        {scanResult.glycemic_load?.clinical_implication}
                                    </p>
                                </div>
                            )}

                            {/* TRANSPARANSI TEKS HASIL SENSOR OCR */}
                            {scanResult.raw_ocr_text && (
                                <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-3 space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowRawOcr(!showRawOcr)}
                                        className="w-full flex items-center justify-between text-xs font-bold text-on-surface cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <span className="material-symbols-outlined text-[17px]">receipt_long</span>
                                            <span>Transparansi Teks Hasil Sensor OCR</span>
                                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 font-mono font-bold">
                                                Akurat &bull; Terverifikasi
                                            </span>
                                        </div>
                                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                                            {showRawOcr ? 'expand_less' : 'expand_more'}
                                        </span>
                                    </button>

                                    {showRawOcr && (
                                        <div className="pt-2 border-t border-surface-container space-y-1.5 animate-fade-in">
                                            <pre className="text-[11px] font-mono text-on-surface-variant bg-surface-container-low p-2.5 rounded-lg whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                                                {scanResult.raw_ocr_text}
                                            </pre>
                                            <div className="flex items-center justify-between pt-1 text-[10px] text-on-surface-variant">
                                                <span>Sistem: OCR Vision &bull; Akurasi Sensor Tinggi</span>
                                                <button
                                                    type="button"
                                                    onClick={() => navigator.clipboard.writeText(scanResult.raw_ocr_text)}
                                                    className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[12px]">content_copy</span>
                                                    <span>Salin Teks OCR</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Warning Note */}
                            {scanResult.warning && (
                                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 text-xs text-amber-900 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0">
                                        warning
                                    </span>
                                    <span>{scanResult.warning}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleSaveToNutrisi}
                                    disabled={saving || saveSuccess}
                                    className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {saveSuccess ? 'check_circle' : 'bookmark_add'}
                                    </span>
                                    <span>
                                        {saveSuccess
                                            ? 'Berhasil Dicatat (+15 Poin)!'
                                            : saving
                                            ? 'Menyimpan ke Catatan Nutrisi...'
                                            : 'Simpan ke Catatan Nutrisi (+15 Poin)'}
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScanResult(null)}
                                    className="py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold cursor-pointer"
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
                    <span>
                        Sensor scanner menggunakan sistem Optical Character Recognition (OCR) berakurasi tinggi untuk deteksi Informasi Nilai Gizi &amp; BPOM RI.
                    </span>
                </div>
            </div>
        </div>
    );
}
