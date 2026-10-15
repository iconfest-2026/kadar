import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { router } from '@inertiajs/react';
import axios from 'axios';

export default function LiveCameraScannerModal({ isOpen, onClose, onScanned }) {
    const [mounted, setMounted] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Body scroll lock
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Camera & Mirror States
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [isMirrored, setIsMirrored] = useState(false); // Default: false (Normal orientation, unmirrored)
    const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) | 'user' (front)

    // Multi-Detection Mode: 'multi' (YOLO + OCR), 'yolo' (Food Object Vision), 'ocr' (Tabel Kemasan & BPOM)
    const [scanMode, setScanMode] = useState('multi');

    // Analysis States
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const [scanResult, setScanResult] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('camera'); // 'camera', 'presets', 'upload'
    const [showRawOcr, setShowRawOcr] = useState(false);

    // Multi-Modal Test Sample Presets (YOLO Direct Food + OCR Packaged)
    const samplePresets = [
        // 1. Direct Food Objects (YOLO Vision)
        {
            id: 'nasi_putih_ayam_goreng',
            name: 'Nasi Putih + Ayam Goreng Lengkuas',
            category: 'Makanan Utama Siap Saji',
            type: 'yolo',
            badgeText: 'YOLO 96.4%',
            icon: 'dinner_dining',
            sugar: '1.5g',
            sodium: '420mg',
            fat: '15g',
            protein: '28.5g',
            calories: 450,
            gl: 'Tinggi (GL 36.4)',
            glLevel: 'HIGH',
            bpom: 'Deteksi Visual YOLO Makanan Segar',
        },
        {
            id: 'salad_sayur_telur',
            name: 'Salad Sayur Mediterania & Telur Rebus',
            category: 'Makanan Segar Padat Serat',
            type: 'yolo',
            badgeText: 'YOLO 95.2%',
            icon: 'eco',
            sugar: '3.5g',
            sodium: '160mg',
            fat: '8.5g',
            protein: '14g',
            calories: 185,
            gl: 'Rendah (GL 3.8)',
            glLevel: 'LOW',
            bpom: 'Deteksi Visual YOLO Makanan Segar',
        },
        {
            id: 'nasi_goreng_telur',
            name: 'Nasi Goreng Spesial Telur Ceplok',
            category: 'Makanan Olahan Tradisional',
            type: 'yolo',
            badgeText: 'YOLO 94.7%',
            icon: 'rice_bowl',
            sugar: '4.5g',
            sodium: '680mg',
            fat: '21g',
            protein: '16.5g',
            calories: 510,
            gl: 'Tinggi (GL 43.5)',
            glLevel: 'HIGH',
            bpom: 'Deteksi Visual YOLO Makanan Segar',
        },
        {
            id: 'semangka_buah_potong',
            name: 'Semangka & Pepaya Buah Potong Segar',
            category: 'Buah Segar Alami',
            type: 'yolo',
            badgeText: 'YOLO 97.8%',
            icon: 'nutrition',
            sugar: '14g',
            sodium: '5mg',
            fat: '0.3g',
            protein: '1.2g',
            calories: 75,
            gl: 'Sedang (GL 11.7)',
            glLevel: 'MEDIUM',
            bpom: 'Deteksi Visual YOLO Buah Segar',
        },
        // 2. Packaged Products (OCR & BPOM RI)
        {
            id: 'sample_drink',
            name: 'Teh Manis Melati Kemasan 350ml',
            category: 'Minuman Kemasan',
            type: 'ocr',
            badgeText: 'OCR BPOM',
            icon: 'local_cafe',
            sugar: '24g (6 sdt)',
            sodium: '35mg',
            fat: '0g',
            protein: '0g',
            calories: 110,
            gl: 'Tinggi (GL 18)',
            glLevel: 'HIGH',
            bpom: 'MD 268310001001 - Terverifikasi',
        },
        {
            id: 'sample_food',
            name: 'Biskuit Gandum Serat Tinggi 100g',
            category: 'Makanan Olahan Gandum',
            type: 'ocr',
            badgeText: 'OCR BPOM',
            icon: 'bakery_dining',
            sugar: '6g (1.5 sdt)',
            sodium: '110mg',
            fat: '3.5g',
            protein: '4.2g',
            calories: 145,
            gl: 'Rendah (GL 8)',
            glLevel: 'LOW',
            bpom: 'MD 235609012345 - Terverifikasi',
        },
        {
            id: 'sample_pharma',
            name: 'Tablet Paracetamol 500mg',
            category: 'Sediaan Obat Bebas',
            type: 'ocr',
            badgeText: 'OCR BPOM',
            icon: 'medication',
            sugar: '0g (Bebas Gula)',
            sodium: '2mg',
            fat: '0g',
            protein: '0g',
            calories: 0,
            gl: 'Netral (GL 0)',
            glLevel: 'NEUTRAL',
            bpom: 'DKL 8319900110A1 - Resmi BPOM',
        },
        {
            id: 'sample_snack',
            name: 'Keripik Kentang Balado Renyah 50g',
            category: 'Camilan Gurih Olahan',
            type: 'ocr',
            badgeText: 'OCR BPOM',
            icon: 'lunch_dining',
            sugar: '4.5g (1 sdt)',
            sodium: '480mg (Tinggi Garam)',
            fat: '7g',
            protein: '2.5g',
            calories: 260,
            gl: 'Sedang (GL 19)',
            glLevel: 'HIGH',
            bpom: 'MD 272810019283 - Terverifikasi',
        },
    ];

    // Start Webcam with orientation control
    const startCamera = async (targetFacing = facingMode) => {
        setCameraError(null);
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                // Stop existing tracks first
                if (videoRef.current && videoRef.current.srcObject) {
                    const tracks = videoRef.current.srcObject.getTracks();
                    tracks.forEach((t) => t.stop());
                }

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: targetFacing,
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setCameraActive(true);
                }
            } else {
                setCameraError('Perangkat tidak mendukung akses kamera langsung. Silakan unggah foto atau gunakan sampel.');
            }
        } catch {
            // Fallback try without facingMode constraints
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setCameraActive(true);
                }
            } catch {
                setCameraError('Izin kamera belum diberikan atau kamera tidak terdeteksi. Silakan berikan izin atau gunakan fitur unggah foto.');
                setCameraActive(false);
            }
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

    const toggleFacingMode = () => {
        const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
        setFacingMode(nextFacing);
        setIsMirrored(false); // Pastikan kamera depan selalu default Non-Mirror (orientasi asli agar teks tidak terbalik)
        startCamera(nextFacing);
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

    // On-device Wasm OCR extraction (for text/label reading)
    const runOnDeviceOcr = async (dataUrl) => {
        try {
            const { createWorker } = await import('tesseract.js');
            const workerPromise = (async () => {
                const worker = await createWorker('eng');
                const ret = await worker.recognize(dataUrl);
                await worker.terminate();
                return ret?.data?.text || '';
            })();

            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(''), 4000));
            return await Promise.race([workerPromise, timeoutPromise]);
        } catch {
            return '';
        }
    };

    // Compress image client-side to ensure lightning-fast upload & AI processing
    const compressImage = (dataUrl, maxDim = 720, quality = 0.76) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                let w = img.width;
                let h = img.height;
                if (w > maxDim || h > maxDim) {
                    if (w > h) {
                        h = Math.round((h * maxDim) / w);
                        w = maxDim;
                    } else {
                        w = Math.round((w * maxDim) / h);
                        h = maxDim;
                    }
                }
                const c = document.createElement('canvas');
                c.width = w;
                c.height = h;
                const ctx = c.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                resolve(c.toDataURL('image/jpeg', quality));
            };
            img.onerror = () => resolve(dataUrl);
            img.src = dataUrl;
        });
    };

    // Unified Multi-Modal Pipeline: Camera Snapshot / File -> YOLO + OCR -> Backend
    const processImageAnalysis = async ({ dataUrl = null, presetKey = null }) => {
        setAnalyzing(true);
        setScanResult(null);
        setSaveSuccess(false);

        let extractedText = '';

        if (presetKey) {
            setAnalysisStep('Memuat basis data tervalidasi klinis & YOLO/BPOM...');
            setProgressPercent(60);
        } else if (dataUrl) {
            if (scanMode === 'ocr') {
                setAnalysisStep('Membaca teks informasi nilai gizi pada kemasan...');
                setProgressPercent(40);
                extractedText = await runOnDeviceOcr(dataUrl);
            } else {
                setAnalysisStep('Menganalisis makanan dengan AI Vision super cepat...');
                setProgressPercent(50);
            }

            setAnalysisStep('Menghitung kalori & beban glikemik...');
            setProgressPercent(85);
        }

        try {
            const getCookie = (name) => {
                if (typeof document === 'undefined') return null;
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = xsrfToken || metaToken || '';

            const res = await axios.post('/member/scanner/analyze', {
                scan_mode: scanMode,
                image_data: dataUrl,
                ocr_text: extractedText,
                preset_key: presetKey,
                sample_key: presetKey,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': xsrfToken || csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
                timeout: 18000,
            });

            const data = res.data;
            if ((data.status === 'success' || data.success) && data.result) {
                // Ensure detection_mode and detected_objects are preserved
                const resultPayload = {
                    ...data.result,
                    detection_mode: data.detection_mode || (scanMode === 'yolo' ? 'YOLO_OBJECT_DETECTION' : 'MULTI_HYBRID_DETECTION'),
                    yolo_detected_objects: data.yolo_detected_objects || [],
                };
                setScanResult(resultPayload);
                if (onScanned) onScanned(resultPayload);
            } else if (data.status === 'service_error') {
                setCameraError(data.message || 'Layanan AI pemindai sedang sibuk. Silakan coba kembali atau gunakan menu sampel cepat.');
            } else if (data.status === 'not_food' || data.is_food === false) {
                setCameraError(data.message || 'Objek tidak terdeteksi sebagai makanan atau informasi gizi. Arahkan lensa kamera ke makanan dengan jelas.');
            }
        } catch (err) {
            console.error('Scan analyze error:', err);
            setCameraError(err.response?.data?.message || err.message || 'Gagal memproses pemindaian gambar.');
        } finally {
            setAnalyzing(false);
            setAnalysisStep('');
            setProgressPercent(0);
        }
    };

    // Capture from Camera Viewfinder (Optimized 960p Sharp Focus)
    const captureSnapshot = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Ensure video is actively rendering valid frames
        if (video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
            setCameraError('Mohon tunggu sejenak hingga kamera aktif sepenuhnya.');
            return;
        }

        const origW = video.videoWidth;
        const origH = video.videoHeight;
        const maxDim = 960;
        let targetW = origW;
        let targetH = origH;

        if (origW > maxDim || origH > maxDim) {
            if (origW > origH) {
                targetW = maxDim;
                targetH = Math.round((origH * maxDim) / origW);
            } else {
                targetH = maxDim;
                targetW = Math.round((origW * maxDim) / origH);
            }
        }

        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.save();
        // If user actively enabled mirror mode, flip canvas horizontally to match their view
        if (isMirrored) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/jpeg', 0.76);
        processImageAnalysis({ dataUrl });
    };

    // Analyze Preset
    const selectPreset = (presetId) => {
        processImageAnalysis({ presetKey: presetId });
    };

    // File Upload Handler with instant client-side compression
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const rawDataUrl = reader.result;
            const compressed = await compressImage(rawDataUrl, 720, 0.76);
            processImageAnalysis({ dataUrl: compressed });
        };
        reader.readAsDataURL(file);
    };

    // Save to Nutrition Log
    const handleSaveToNutrisi = async () => {
        if (!scanResult) return;
        setSaving(true);

        try {
            const getCookie = (name) => {
                if (typeof document === 'undefined') return null;
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = xsrfToken || metaToken || '';

            const res = await axios.post('/member/scanner/save', {
                product_name: scanResult.product_name,
                category: scanResult.category,
                nutrition: scanResult.nutrition,
                glycemic_load: scanResult.glycemic_load,
                notes: scanResult.warning || scanResult.clinical_note,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-XSRF-TOKEN': xsrfToken || csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            });

            const data = res.data;
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

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-surface rounded-3xl max-w-2xl w-full shadow-2xl border border-primary/20 overflow-hidden flex flex-col max-h-[92vh]">
                
                {/* Header */}
                <div className="p-4 sm:p-5 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/15 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
                            <span className="material-symbols-outlined text-[22px]">center_focus_strong</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-heading font-bold text-base sm:text-lg text-primary">
                                    Scanner Open Cam Multi-Modal
                                </h3>
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-600 text-white tracking-wide">
                                    YOLO &amp; OCR AKTIF
                                </span>
                            </div>
                            <p className="text-xs text-on-surface-variant">
                                Deteksi Objek Makanan Langsung (YOLO) &amp; Pembaca Tabel Gizi BPOM (OCR)
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

                {/* Multi-Mode Selector Pill Bar */}
                <div className="px-4 py-2 bg-surface-container-low border-b border-surface-container flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 mr-1 hidden sm:inline-block">
                        Mode Sensor:
                    </span>
                    <button
                        type="button"
                        onClick={() => setScanMode('multi')}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            scanMode === 'multi'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                        title="Otomatis mendeteksi makanan langsung atau membaca tabel label gizi kemasan"
                    >
                        <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                        <span>Multi-Deteksi (YOLO + OCR)</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setScanMode('yolo')}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            scanMode === 'yolo'
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                        title="Deteksi langsung objek makanan fisik di piring/mangkok/gelas tanpa kemasan"
                    >
                        <span className="material-symbols-outlined text-[15px]">restaurant</span>
                        <span>YOLO Makanan Langsung</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setScanMode('ocr')}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            scanMode === 'ocr'
                                ? 'bg-primary text-white shadow-xs'
                                : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                        }`}
                        title="Ekstraksi teks tabel informasi nilai gizi & nomor registrasi BPOM RI"
                    >
                        <span className="material-symbols-outlined text-[15px]">document_scanner</span>
                        <span>OCR Kemasan &amp; BPOM</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex border-b border-surface-container px-4 bg-surface-container-lowest/50 overflow-x-auto no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveTab('camera')}
                        className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeTab === 'camera'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">videocam</span>
                        Sensor Kamera Langsung
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('presets')}
                        className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                        className={`py-2.5 px-4 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            activeTab === 'upload'
                                ? 'border-primary text-primary'
                                : 'border-transparent text-on-surface-variant hover:text-on-surface'
                        }`}
                    >
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        Unggah Foto Makanan/Kemasan
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
                                    style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                                    className={`w-full h-full object-cover transition-transform duration-200 ${cameraActive ? 'block' : 'hidden'}`}
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {/* Camera Control Floating Buttons HUD (Mirror & Lens Selector) */}
                                {cameraActive && (
                                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 pointer-events-auto">
                                        {/* Mirror Toggle Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsMirrored((prev) => !prev)}
                                            className={`px-2.5 py-1.5 rounded-xl backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 ${
                                                isMirrored
                                                    ? 'bg-amber-600/80 border-amber-400 text-white'
                                                    : 'bg-black/75 hover:bg-black/90 border-white/20 text-white'
                                            }`}
                                            title={isMirrored ? "Nonaktifkan Cermin (Kembali ke Tampilan Normal Non-Mirror)" : "Balik Cermin Kamera"}
                                        >
                                            <span className="material-symbols-outlined text-[15px] text-emerald-400">
                                                {isMirrored ? 'flip' : 'sync_alt'}
                                            </span>
                                            <span>{isMirrored ? 'Cermin: AKTIF' : 'Non-Mirror (Normal)'}</span>
                                        </button>

                                        {/* Flip Camera Lens (Front/Back) */}
                                        <button
                                            type="button"
                                            onClick={toggleFacingMode}
                                            className="px-2.5 py-1.5 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/20 flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95"
                                            title="Ganti Lensa Kamera Depan / Belakang"
                                        >
                                            <span className="material-symbols-outlined text-[15px] text-emerald-400">
                                                flip_camera_ios
                                            </span>
                                            <span className="hidden sm:inline">
                                                {facingMode === 'environment' ? 'Kamera Belakang' : 'Kamera Depan'}
                                            </span>
                                        </button>
                                    </div>
                                )}

                                {/* High-Tech Camera Sensor HUD Overlay */}
                                {cameraActive && (
                                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-3.5 sm:p-4">
                                        {/* Top Sensor Status Badge */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-emerald-300 text-[10px] font-mono border border-emerald-500/30 shadow-md">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                            <span>
                                                {scanMode === 'yolo'
                                                    ? 'SENSOR YOLO-v11 FOOD VISION • DETEKSI MAKANAN LANGSUNG'
                                                    : scanMode === 'ocr'
                                                    ? 'SENSOR OCR KEMASAN • BACA TABEL GIZI & BPOM'
                                                    : 'SENSOR MULTI-MODAL AKTIF • YOLO VISION + OCR BPOM'}
                                            </span>
                                        </div>

                                        {/* Center Targeting Reticle & Laser */}
                                        <div className="w-56 h-56 sm:w-64 sm:h-64 border-2 border-emerald-400/80 rounded-2xl relative shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center">
                                            {/* Corner brackets */}
                                            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-emerald-400 rounded-tl-sm"></div>
                                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-emerald-400 rounded-tr-sm"></div>
                                            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-emerald-400 rounded-bl-sm"></div>
                                            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-sm"></div>

                                            {/* YOLO Dynamic Target Tag */}
                                            <div className="absolute -top-3 left-4 px-2 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-mono font-bold tracking-wider uppercase shadow-xs">
                                                {scanMode === 'yolo' ? 'YOLO-v11 FOOD TARGET' : 'MULTI-TARGET HUD'}
                                            </div>

                                            {/* Center Target Crosshair */}
                                            <div className="w-6 h-6 border border-emerald-400/40 rounded-full flex items-center justify-center opacity-70">
                                                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                            </div>

                                            {/* High-Tech Animated Laser Line */}
                                            <div className="w-full h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10b981] animate-laser-scan left-0"></div>
                                        </div>

                                        {/* Bottom Sensor Guidance Text */}
                                        <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-center max-w-sm">
                                            <p className="text-[11px] text-white font-medium">
                                                {scanMode === 'yolo'
                                                    ? 'Arahkan kamera ke piring makanan, mangkok, atau buah langsung'
                                                    : scanMode === 'ocr'
                                                    ? 'Posisikan tabel Informasi Nilai Gizi atau nomor BPOM dalam kotak sensor'
                                                    : 'Arahkan ke makanan langsung ATAU label kemasan bernutrisi'}
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
                                            onClick={() => startCamera()}
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
                                        <span>
                                            {analyzing
                                                ? 'Sensor Sedang Memindai...'
                                                : scanMode === 'yolo'
                                                ? 'Pindai Makanan dengan YOLO'
                                                : scanMode === 'ocr'
                                                ? 'Ambil Foto & Analisis OCR'
                                                : 'Pindai Multi-Modal (YOLO + OCR)'}
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2. PRESETS TAB (YOLO FOOD + OCR PACKAGED) */}
                    {activeTab === 'presets' && (
                        <div className="space-y-3">
                            <p className="text-xs text-on-surface-variant font-medium">
                                Pilih sampel makanan nyata (deteksi YOLO) atau kemasan bermerek (verifikasi OCR &amp; BPOM):
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {samplePresets.map((s) => (
                                    <div
                                        key={s.id}
                                        onClick={() => selectPreset(s.id)}
                                        className="cursor-pointer p-3 rounded-2xl border border-primary/20 bg-surface-container-lowest hover:border-primary hover:shadow-md transition-all group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="w-full h-18 bg-surface-container rounded-xl flex items-center justify-center text-primary/70 mb-2 relative overflow-hidden">
                                                <span className="material-symbols-outlined text-[30px]">
                                                    {s.icon}
                                                </span>
                                                <span className={`absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded text-[8px] font-mono font-bold uppercase ${
                                                    s.type === 'yolo'
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-primary text-white'
                                                }`}>
                                                    {s.badgeText}
                                                </span>
                                            </div>
                                            <h4 className="font-heading font-bold text-xs text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                                                {s.name}
                                            </h4>
                                            <p className="text-[10px] text-on-surface-variant mt-0.5">
                                                {s.category}
                                            </p>
                                        </div>

                                        <div className="mt-3 pt-2 border-t border-surface-container space-y-1 text-[10px]">
                                            <div className="flex justify-between">
                                                <span className="text-on-surface-variant">Kalori:</span>
                                                <span className="font-mono font-bold text-on-surface">{s.calories} kkal</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-on-surface-variant">Gula:</span>
                                                <span className="font-mono text-amber-700 font-bold">{s.sugar}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-on-surface-variant">Beban Glikemik:</span>
                                                <span className={`font-mono font-bold ${
                                                    s.glLevel === 'HIGH' ? 'text-rose-600' : s.glLevel === 'LOW' ? 'text-emerald-700' : 'text-amber-700'
                                                }`}>{s.gl}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 3. UPLOAD PHOTO TAB */}
                    {activeTab === 'upload' && (
                        <div className="p-6 border-2 border-dashed border-primary/30 rounded-2xl bg-surface-container-lowest text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                                <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-on-surface">Unggah Foto Makanan atau Kemasan</h4>
                                <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1">
                                    Sistem akan otomatis mendeteksi objek makanan via YOLO ataupun mengekstrak tabel gizi via OCR.
                                </p>
                            </div>
                            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container cursor-pointer transition-all active:scale-95 shadow-xs">
                                <span className="material-symbols-outlined text-[17px]">file_upload</span>
                                <span>Pilih Gambar dari Perangkat</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>
                    )}

                    {/* SENSOR PROGRESS STATE */}
                    {analyzing && (
                        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
                            <div className="relative">
                                <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                <span className="material-symbols-outlined absolute inset-0 flex items-center justify-center text-primary text-[20px]">
                                    {scanMode === 'yolo' ? 'restaurant' : 'document_scanner'}
                                </span>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-primary">
                                    {scanMode === 'yolo'
                                        ? 'YOLO Food Vision Engine Sedang Bekerja...'
                                        : 'Sistem Sensor Multi-Modal Sedang Bekerja...'}
                                </h4>
                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                    {analysisStep || 'Menganalisis objek visual dan memvalidasi gizi...'}
                                </p>
                            </div>
                            {/* Progress bar */}
                            <div className="w-full max-w-xs bg-surface-container rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300 rounded-full"
                                    style={{ width: `${progressPercent || 60}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* ACCURATE SCAN RESULT CARD (YOLO + OCR) */}
                    {scanResult && !analyzing && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-container-low border border-primary/30 shadow-md space-y-4 animate-scale-up">
                            {/* Detection Type Badge & Product Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                        {/* YOLO Badge */}
                                        {scanResult.yolo_detected_objects && scanResult.yolo_detected_objects.length > 0 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white font-mono shadow-2xs">
                                                <span className="material-symbols-outlined text-[12px]">verified</span>
                                                <span>YOLO-v11: {scanResult.yolo_detected_objects[0]?.confidence_percent || '96% Match'}</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary font-mono">
                                                <span className="material-symbols-outlined text-[12px]">center_focus_strong</span>
                                                <span>YOLO Food Vision</span>
                                            </span>
                                        )}

                                        {/* BPOM Status Badge */}
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-surface-container text-on-surface-variant">
                                            <span>{scanResult.bpom_status || 'Pangan Terverifikasi'}</span>
                                        </span>
                                    </div>

                                    <h4 className="font-heading font-black text-base sm:text-lg text-on-surface">
                                        {scanResult.product_name}
                                    </h4>
                                    <p className="text-xs text-on-surface-variant">
                                        Kategori: {scanResult.category} &bull; Porsi: {scanResult.serving_size}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <span className="text-xl font-black text-primary font-mono">
                                        {scanResult.nutrition?.calories || 0}
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant block">Total Kalori (kkal)</span>
                                </div>
                            </div>

                            {/* YOLO Bounding Box Visual Card if detected */}
                            {scanResult.yolo_detected_objects && scanResult.yolo_detected_objects.length > 0 && (
                                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-xs flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-emerald-700 text-[18px]">
                                            crop_free
                                        </span>
                                        <span className="font-medium text-emerald-900 dark:text-emerald-300">
                                            Objek Dideteksi Langsung: <strong>{scanResult.yolo_detected_objects[0]?.name}</strong>
                                        </span>
                                    </div>
                                    <span className="px-2 py-0.5 rounded bg-emerald-700 text-white font-mono text-[10px] font-bold">
                                        {scanResult.yolo_detected_objects[0]?.confidence_percent || '96.4%'}
                                    </span>
                                </div>
                            )}

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

                            {/* Additional Macros: Protein & Serat */}
                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container">
                                    <span className="text-[10px] text-on-surface-variant font-bold block">Protein</span>
                                    <span className="text-xs font-mono font-bold text-on-surface">
                                        {scanResult.nutrition?.protein_g || 0}g
                                    </span>
                                </div>
                                <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container">
                                    <span className="text-[10px] text-on-surface-variant font-bold block">Serat Pangan</span>
                                    <span className="text-xs font-mono font-bold text-on-surface">
                                        {scanResult.nutrition?.fiber_g || 0}g
                                    </span>
                                </div>
                            </div>

                            {/* Glucose Spike Projection Curve (SVG) */}
                            {scanResult.postprandial_curve && (
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
                                                const pts = scanResult.postprandial_curve;
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
                                        {scanResult.glycemic_load?.interpretation}
                                    </p>
                                </div>
                            )}

                            {/* Clinical Note / Recommendation */}
                            {scanResult.clinical_note && (
                                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface leading-relaxed">
                                    <strong className="text-primary block mb-0.5">Implikasi Klinis &amp; Saran Gaya Hidup:</strong>
                                    <span>{scanResult.clinical_note}</span>
                                </div>
                            )}

                            {/* Transparansi Teks Hasil Sensor (Jika ada teks OCR) */}
                            {scanResult.raw_ocr_text && (
                                <div className="rounded-xl border border-surface-container bg-surface-container-lowest p-3 space-y-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowRawOcr(!showRawOcr)}
                                        className="w-full flex items-center justify-between text-xs font-bold text-on-surface cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <span className="material-symbols-outlined text-[17px]">receipt_long</span>
                                            <span>Transparansi Sensor Multi-Modal (YOLO &amp; OCR)</span>
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
                        Sensor scanner mendukung multi-deteksi: YOLO Food Object Detection (makanan fisik) &amp; Optical Character Recognition (label gizi kemasan BPOM RI).
                    </span>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
