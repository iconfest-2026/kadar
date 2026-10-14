import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

export default function Scanner({ tier, profile, recentScans = [] }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    // Camera states
    const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
    const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) | 'user' (front)
    const [isMirrored, setIsMirrored] = useState(false); // Non-mirror default for text and unreversed scanning
    const [torchOn, setTorchOn] = useState(false);
    const [supportsTorch, setSupportsTorch] = useState(false);

    // Analysis & result states
    const [capturedImage, setCapturedImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [savedRecord, setSavedRecord] = useState(null);
    const [pointsEarned, setPointsEarned] = useState(15);
    const [viewMode, setViewMode] = useState('camera'); // 'camera' | 'result'
    const [showPresets, setShowPresets] = useState(false);
    const [scanToast, setScanToast] = useState(null); // { type: 'warning'|'error', title: string, message: string }
    const toastTimerRef = useRef(null);

    // Sample Presets for instant fallback / testing
    const samplePresets = [
        {
            id: 'nasi_putih_ayam_goreng',
            name: 'Nasi Putih + Ayam Goreng Lengkuas',
            category: 'Makanan Utama Siap Saji',
            icon: 'dinner_dining',
            calories: 450,
            sugar: '1.5g',
            carbs: '52g',
            protein: '28.5g',
            fat: '15g',
            sodium: '420mg',
            gl: 'Tinggi (GL 36.4)',
            glLevel: 'HIGH',
        },
        {
            id: 'salad_sayur_telur',
            name: 'Salad Sayur Mediterania & Telur Rebus',
            category: 'Makanan Segar Padat Serat',
            icon: 'eco',
            calories: 185,
            sugar: '3.5g',
            carbs: '12g',
            protein: '14g',
            fat: '8.5g',
            sodium: '160mg',
            gl: 'Rendah (GL 3.8)',
            glLevel: 'LOW',
        },
        {
            id: 'kopi_susu_gula_aren',
            name: 'Kopi Susu Es Gula Aren',
            category: 'Minuman Manis Kemasan',
            icon: 'coffee',
            calories: 210,
            sugar: '26g',
            carbs: '32g',
            protein: '4g',
            fat: '8g',
            sodium: '85mg',
            gl: 'Tinggi (GL 21.0)',
            glLevel: 'HIGH',
        },
        {
            id: 'semangka_buah_potong',
            name: 'Semangka & Pepaya Buah Potong',
            category: 'Buah Segar Alami',
            icon: 'nutrition',
            calories: 75,
            sugar: '14g',
            carbs: '18g',
            protein: '1.2g',
            fat: '0.3g',
            sodium: '5mg',
            gl: 'Sedang (GL 11.7)',
            glLevel: 'MEDIUM',
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
                        facingMode: { ideal: targetFacing },
                        width: { ideal: 1920, max: 2560 },
                        height: { ideal: 1080, max: 1440 },
                    },
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                    setCameraActive(true);

                    // Check torch capability
                    const track = stream.getVideoTracks()[0];
                    if (track && track.getCapabilities) {
                        const caps = track.getCapabilities();
                        setSupportsTorch(!!caps.torch);
                    }
                }
            } else {
                setCameraError('Browser atau perangkat ini belum mendukung akses kamera langsung. Silakan unggah foto makanan.');
            }
        } catch (err) {
            console.warn('Primary camera error, trying fallback:', err);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                    setCameraActive(true);
                }
            } catch (fallbackErr) {
                console.error('Camera access failed:', fallbackErr);
                setCameraError('Izin akses kamera belum diaktifkan. Berikan izin browser atau gunakan tombol Unggah Foto.');
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
        // Pastikan orientasi kamera depan default tidak terbalik / non-mirror
        setIsMirrored(false);
        startCamera(nextFacing);
    };

    const toggleMirror = () => {
        setIsMirrored((prev) => !prev);
    };

    const toggleTorch = async () => {
        if (!videoRef.current || !videoRef.current.srcObject) return;
        const track = videoRef.current.srcObject.getVideoTracks()[0];
        if (!track) return;

        try {
            const next = !torchOn;
            if (track.applyConstraints) {
                await track.applyConstraints({
                    advanced: [{ torch: next }],
                });
            }
            setTorchOn(next);
        } catch {
            setTorchOn(!torchOn);
        }
    };

    // Auto-start camera when in camera mode
    useEffect(() => {
        if (viewMode === 'camera') {
            startCamera();
        } else {
            stopCamera();
        }
        return () => {
            stopCamera();
        };
    }, [viewMode]);

    // Send Image to Backend (Processes via Gemini Vision from .env & Automatically Saves to Database)
    const processImageAnalysis = async ({ dataUrl = null, presetKey = null }) => {
        setIsAnalyzing(true);
        setCapturedImage(dataUrl);
        setAnalysisStep('Menghubungkan ke Gemini AI Vision & Model Gizi TKPI...');

        try {
            const getCookie = (name) => {
                if (typeof document === 'undefined') return null;
                const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
                return match ? decodeURIComponent(match[3]) : null;
            };
            const metaToken = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') : '';
            const xsrfToken = getCookie('XSRF-TOKEN');
            const csrfToken = xsrfToken || metaToken || '';

            setAnalysisStep('Mendeteksi objek makanan, takaran porsi, dan komposisi gizi...');

            const res = await axios.post('/member/scanner/analyze', {
                scan_mode: 'multi',
                image_data: dataUrl,
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
            });

            const data = res.data;

            // KONDISI: Objek tidak terdeteksi sebagai makanan / gizi (Layaknya QRIS E-Wallet)
            if (data.status === 'not_food' || data.is_food === false || (!data.success && !data.result)) {
                if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                setScanToast({
                    type: 'warning',
                    title: 'Tidak Terdeteksi',
                    message: data.message || 'Objek tidak terdeteksi sebagai makanan atau informasi gizi. Silakan arahkan kamera ke makanan atau label gizi dengan jelas.',
                });

                // Auto dismiss toast setelah 4 detik
                toastTimerRef.current = setTimeout(() => {
                    setScanToast(null);
                }, 4000);

                // Pastikan video camera tetap berjalan lancar tanpa redirect
                videoRef.current?.play()?.catch(() => {});
                return;
            }

            setAnalysisStep('Menyimpan otomatis ke database jurnal nutrisi & memvalidasi glukosa...');

            if (data.status === 'success' || data.success) {
                const resData = data.result || data;
                setScanResult(resData);
                setSavedRecord(data.saved_record || null);
                if (data.points_earned) {
                    setPointsEarned(data.points_earned);
                }

                // Stop camera and immediately transition to Result View
                stopCamera();
                setViewMode('result');
            } else {
                throw new Error(data.message || 'Gagal memproses pemindaian');
            }
        } catch (err) {
            console.error('Scan error:', err);
            const errMsg = err.response?.data?.message || err.message || 'Silakan coba lagi atau gunakan gambar yang lebih jelas.';
            if (err.response?.status === 419) {
                alert('Sesi keamanan Anda telah berakhir. Halaman akan dimuat ulang...');
                window.location.reload();
            } else {
                if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
                setScanToast({
                    type: 'error',
                    title: 'Gagal Memproses',
                    message: errMsg,
                });
                toastTimerRef.current = setTimeout(() => {
                    setScanToast(null);
                }, 4000);
            }
        } finally {
            setIsAnalyzing(false);
            setAnalysisStep('');
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

    // Capture Snapshot from Live Camera Viewfinder (Ultra-Fast 720p Optimized)
    const handleCapture = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const origW = video.videoWidth || 1280;
        const origH = video.videoHeight || 720;
        const maxDim = 720;
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

        // Draw snapshot respecting mirror state
        ctx.save();
        if (isMirrored) {
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/jpeg', 0.76);
        processImageAnalysis({ dataUrl });
    };

    // Upload from Gallery / Disk File with instant client-side compression
    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            const rawUrl = reader.result;
            const optimizedUrl = await compressImage(rawUrl, 720, 0.76);
            processImageAnalysis({ dataUrl: optimizedUrl });
        };
        reader.readAsDataURL(file);
    };

    // Select preset sample
    const handleSelectPreset = (presetId) => {
        setShowPresets(false);
        processImageAnalysis({ presetKey: presetId });
    };

    // Reset back to live camera
    const handleResetScanner = () => {
        setScanResult(null);
        setSavedRecord(null);
        setCapturedImage(null);
        setViewMode('camera');
    };

    return (
        <div className="fixed inset-0 z-50 bg-black text-white flex flex-col overflow-hidden font-sans select-none">
            <Head title="Live Camera Scanner - AEVYRA" />

            {/* Hidden Helper Canvas & File Input */}
            <canvas ref={canvasRef} className="hidden" />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileUpload}
            />

            {/* ========================================================================= */}
            {/* VIEW 1: FULL-PAGE LIVE CAMERA SIMULATION VIEW                             */}
            {/* ========================================================================= */}
            {viewMode === 'camera' && (
                <div className="relative w-full h-full flex-1 flex flex-col justify-between overflow-hidden">
                    
                    {/* Live Video Feed Background */}
                    <div className="absolute inset-0 z-0 bg-neutral-950 flex items-center justify-center overflow-hidden">
                        {cameraError ? (
                            <div className="p-6 text-center max-w-sm space-y-4 z-10">
                                <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                                    <span className="material-symbols-outlined text-3xl">videocam_off</span>
                                </div>
                                <p className="text-xs text-white/80 leading-relaxed">{cameraError}</p>
                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-all"
                                    >
                                        Pilih Foto dari Galeri
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => startCamera()}
                                        className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all"
                                    >
                                        Coba Aktifkan Kamera Lagi
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <video
                                ref={videoRef}
                                playsInline
                                autoPlay
                                muted
                                style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}
                                className="w-full h-full object-cover transition-transform duration-200"
                            />
                        )}

                        {/* Simulated Torch Overlay */}
                        {torchOn && (
                            <div className="absolute inset-0 pointer-events-none bg-amber-100/10 mix-blend-screen" />
                        )}
                    </div>

                    {/* TOP CONTROLS OVERLAY */}
                    <div className="relative z-20 pt-safe px-4 pt-4 pb-2 flex items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent">
                        {/* Tombol Kembali (Back Button) */}
                        <Link
                            href="/member/dashboard"
                            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all shadow-lg"
                            title="Kembali ke Dashboard"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </Link>

                        {/* Status Header Badge */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white/90 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>AEVYRA AI Vision</span>
                            <span className="text-white/40">•</span>
                            <span className="text-emerald-300 font-mono text-[10px]">
                                {facingMode === 'user' ? 'Kamera Depan' : (tier?.name || 'Member')}
                            </span>
                        </div>

                        {/* Top Right Utilities (Torch, Mirror & Flip Camera) */}
                        <div className="flex items-center gap-2">
                            {/* Tombol Balik Cermin / Mirror Toggle */}
                            <button
                                type="button"
                                onClick={toggleMirror}
                                className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                                    isMirrored
                                        ? 'bg-amber-500/80 text-white border-amber-300 shadow-[0_0_15px_#f59e0b]'
                                        : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                                }`}
                                title={isMirrored ? "Cermin AKTIF (Klik untuk mode Non-Mirror / Asli)" : "Mode Non-Mirror (Klik untuk balik seperti Cermin)"}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {isMirrored ? 'flip' : 'sync_alt'}
                                </span>
                            </button>

                            {/* Tombol Senter (Torch) */}
                            <button
                                type="button"
                                onClick={toggleTorch}
                                className={`w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                                    torchOn
                                        ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_#fbbf24]'
                                        : 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                                }`}
                                title={torchOn ? 'Matikan Senter' : 'Nyalakan Senter'}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {torchOn ? 'flashlight_on' : 'flashlight_off'}
                                </span>
                            </button>

                            {/* Tombol Ganti Kamera Depan/Belakang */}
                            <button
                                type="button"
                                onClick={toggleFacingMode}
                                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all shadow-lg"
                                title={`Ganti ke ${facingMode === 'environment' ? 'Kamera Depan' : 'Kamera Belakang'}`}
                            >
                                <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
                            </button>
                        </div>
                    </div>

                    {/* QRIS / E-WALLET STYLE FLOATING NOTIFICATION TOAST */}
                    {scanToast && (
                        <div className="absolute top-20 inset-x-4 z-40 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className={`backdrop-blur-xl text-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-3 max-w-sm pointer-events-auto border ${
                                scanToast.type === 'error'
                                    ? 'bg-rose-950/90 border-rose-500/50 shadow-rose-950/50'
                                    : 'bg-neutral-950/90 border-amber-500/60 shadow-amber-950/50'
                            }`}>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                    scanToast.type === 'error'
                                        ? 'bg-rose-500/20 text-rose-400'
                                        : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                    <span className="material-symbols-outlined text-[22px]">
                                        {scanToast.type === 'error' ? 'error' : 'search_off'}
                                    </span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className={`text-xs font-bold leading-tight ${
                                        scanToast.type === 'error' ? 'text-rose-300' : 'text-amber-300'
                                    }`}>
                                        {scanToast.title || 'Objek Tidak Terdeteksi'}
                                    </p>
                                    <p className="text-[11px] text-gray-200 leading-snug mt-0.5">
                                        {scanToast.message}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setScanToast(null)}
                                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CENTER VIEWFINDER & TITIK FOKUS */}
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pointer-events-none">
                        {/* Target Bounding Box Viewfinder */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 max-w-[85vw] max-h-[85vw] rounded-3xl overflow-hidden">
                            {/* 4 Corner Bracket Accents (Neon Emerald) */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-emerald-400 rounded-tl-2xl shadow-[0_0_10px_#34d399]" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-emerald-400 rounded-tr-2xl shadow-[0_0_10px_#34d399]" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-emerald-400 rounded-bl-2xl shadow-[0_0_10px_#34d399]" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-emerald-400 rounded-br-2xl shadow-[0_0_10px_#34d399]" />

                            {/* Animated Laser Scanning Line */}
                            <div className="absolute inset-x-0 h-0.5 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-[scannerLine_2.2s_ease-in-out_infinite]" />

                            {/* TITIK FOKUS DI TENGAH (CENTER FOCUS POINT WITH CROSSHAIR) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative flex items-center justify-center">
                                    {/* Outer pulsing ring */}
                                    <div className="w-16 h-16 rounded-full border border-emerald-400/40 animate-ping opacity-60" />
                                    
                                    {/* Focus circle reticle */}
                                    <div className="absolute w-12 h-12 rounded-full border-2 border-emerald-400/80 flex items-center justify-center shadow-[0_0_8px_#34d399]">
                                        {/* Crosshairs */}
                                        <div className="absolute w-2 h-0.5 bg-emerald-400 -left-1" />
                                        <div className="absolute w-2 h-0.5 bg-emerald-400 -right-1" />
                                        <div className="absolute h-2 w-0.5 bg-emerald-400 -top-1" />
                                        <div className="absolute h-2 w-0.5 bg-emerald-400 -bottom-1" />

                                        {/* Center glowing focal point dot */}
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Instruction Badge */}
                        <div className="mt-5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium text-center shadow-md flex items-center justify-center gap-1.5">
                            <span>Arahkan titik fokus ke makanan atau label gizi produk</span>
                            {facingMode === 'user' && (
                                <span className="text-emerald-400 font-semibold font-mono text-[11px]">
                                    • {isMirrored ? 'Cermin Aktif' : 'Non-Mirror (Asli)'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* BOTTOM CONTROLS (UPLOAD, SHUTTER, SAMPLES) */}
                    <div className="relative z-20 pb-safe px-6 pb-6 pt-3 bg-linear-to-t from-black/90 via-black/50 to-transparent flex items-center justify-around max-w-lg mx-auto w-full">
                        {/* Tombol Upload Gambar (Galeri) */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all cursor-pointer group active:scale-95"
                            title="Unggah dari Galeri Foto"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-all shadow-md">
                                <span className="material-symbols-outlined text-[24px]">photo_library</span>
                            </div>
                            <span className="text-[10px] font-semibold tracking-tight text-white/70">Galeri</span>
                        </button>

                        {/* TOMBOL SHUTTER KAMERA (MAIN CAPTURE BUTTON) */}
                        <button
                            type="button"
                            onClick={handleCapture}
                            disabled={isAnalyzing || cameraError}
                            className="relative flex items-center justify-center active:scale-90 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                            title="Pindai Sekarang"
                        >
                            {/* Outer Neon Glow Ring */}
                            <div className="w-20 h-20 rounded-full border-3 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_25px_rgba(52,211,153,0.8)] transition-all">
                                {/* Inner Shutter Button */}
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover:scale-95 transition-transform">
                                    <span className="material-symbols-outlined text-neutral-900 text-[26px]">photo_camera</span>
                                </div>
                            </div>
                        </button>

                        {/* Tombol Sampel Cepat (Presets) */}
                        <button
                            type="button"
                            onClick={() => setShowPresets(!showPresets)}
                            className="flex flex-col items-center gap-1 text-white/80 hover:text-white transition-all cursor-pointer group active:scale-95"
                            title="Pilih Sampel Makanan"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-all shadow-md">
                                <span className="material-symbols-outlined text-[24px]">restaurant_menu</span>
                            </div>
                            <span className="text-[10px] font-semibold tracking-tight text-white/70">Sampel</span>
                        </button>
                    </div>

                    {/* PRESETS DRAWER POPUP */}
                    {showPresets && (
                        <div className="absolute inset-x-0 bottom-0 z-30 bg-neutral-900/95 backdrop-blur-xl border-t border-white/20 rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-emerald-400">fastfood</span>
                                    <span>Uji Coba Sampel Pangan Cepat</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPresets(false)}
                                    className="p-1 rounded-full text-white/60 hover:text-white"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 pt-3 max-h-60 overflow-y-auto">
                                {samplePresets.map((preset) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => handleSelectPreset(preset.id)}
                                        className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all active:scale-95 flex flex-col justify-between"
                                    >
                                        <div className="flex items-start gap-2">
                                            <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                                                {preset.icon}
                                            </span>
                                            <div>
                                                <p className="font-bold text-xs text-white line-clamp-1">{preset.name}</p>
                                                <span className="text-[10px] text-white/60 block">{preset.category}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                                            <span className="text-emerald-300 font-bold">{preset.calories} kkal</span>
                                            <span className="text-white/60">Gula: {preset.sugar}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 2: ANALYZING OVERLAY (FREEZE FRAME + AI PROGRESS)                    */}
            {/* ========================================================================= */}
            {isAnalyzing && (
                <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
                    {/* Freeze frame preview if available */}
                    {capturedImage && (
                        <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.4)] animate-pulse">
                            <img src={capturedImage} alt="Capture" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Radar Pulse Animation */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full border-2 border-emerald-400 animate-ping opacity-50" />
                        <div className="absolute w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-[0_0_20px_#34d399]">
                            <span className="material-symbols-outlined text-2xl text-emerald-300 animate-spin">
                                sync
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2 max-w-sm">
                        <h3 className="font-heading font-black text-lg text-white">
                            Google Gemini AI Vision & Model Gizi
                        </h3>
                        <p className="text-xs text-emerald-300 font-medium">
                            {analysisStep || 'Sedang mendeteksi komposisi pangan dan menghitung kalori...'}
                        </p>
                        <p className="text-[11px] text-white/60 leading-relaxed">
                            Data akan otomatis tersimpan ke jurnal nutrisi harian Anda begitu selesai dianalisis.
                        </p>
                    </div>
                </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW 3: RESULT VIEW (AUTO-SAVED NUTRITION & CLINICAL METRICS)             */}
            {/* ========================================================================= */}
            {viewMode === 'result' && scanResult && (
                <div className="relative w-full h-full flex-1 flex flex-col bg-[#f0f8f4] text-neutral-900 overflow-y-auto">
                    {/* Top Result Navigation Bar */}
                    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-primary/10 px-4 py-3 flex items-center justify-between shadow-xs">
                        <button
                            type="button"
                            onClick={handleResetScanner}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs hover:bg-primary/20 transition-all cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            <span>Pindai Makanan Lain</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-label-mono">
                                +{pointsEarned} Poin Diperoleh
                            </span>
                            <Link
                                href="/member/dashboard"
                                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-all"
                                title="Tutup ke Dashboard"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </Link>
                        </div>
                    </div>

                    {/* Result Content Body */}
                    <div className="max-w-xl mx-auto w-full p-4 sm:p-6 space-y-5 pb-16">
                        {/* Auto-Saved Notification Banner */}
                        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-900">
                            <span className="material-symbols-outlined text-2xl text-emerald-600 shrink-0">
                                check_circle
                            </span>
                            <div className="text-xs">
                                <p className="font-bold text-emerald-900">
                                    Tersimpan Otomatis ke Database & Jurnal Nutrisi!
                                </p>
                                <p className="text-[11px] text-emerald-800/80">
                                    Catatan kalori telah masuk ke riwayat kesehatan dan Anda memperoleh +15 poin gamifikasi.
                                </p>
                            </div>
                        </div>

                        {/* Product Header Card with Snapshot */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-primary/15 shadow-2xs space-y-3">
                            <div className="flex items-start gap-3">
                                {capturedImage ? (
                                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 border border-primary/10 shrink-0 shadow-2xs">
                                        <img src={capturedImage} alt="Snapshot" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-2xl">restaurant</span>
                                    </div>
                                )}

                                <div className="space-y-0.5 flex-1 min-w-0">
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-primary/10 text-primary font-label-mono">
                                        {scanResult.category || 'Pangan Terdeteksi'}
                                    </span>
                                    <h2 className="font-heading font-bold text-sm sm:text-base text-primary truncate leading-tight">
                                        {scanResult.product_name || scanResult.name || 'Produk Pangan'}
                                    </h2>
                                    <div className="flex items-baseline gap-1 pt-0.5">
                                        <span className="font-heading font-extrabold text-xl text-on-surface">
                                            {scanResult.calories ?? 0}
                                        </span>
                                        <span className="text-[11px] font-medium text-on-surface-variant font-mono">kkal / porsi</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Macronutrient Metric Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div className="p-2.5 rounded-xl bg-white border border-primary/10 shadow-2xs text-center space-y-0.5">
                                <span className="text-[9px] font-bold text-on-surface-variant uppercase font-label-mono block">Gula</span>
                                <span className="font-mono font-bold text-sm text-amber-600 block">
                                    {scanResult.sugar_g ?? 0}g
                                </span>
                                <span className="text-[8px] text-on-surface-variant block">
                                    {scanResult.sugar_g > 15 ? 'Waspada' : 'Terkontrol'}
                                </span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-primary/10 shadow-2xs text-center space-y-0.5">
                                <span className="text-[9px] font-bold text-on-surface-variant uppercase font-label-mono block">Karbohidrat</span>
                                <span className="font-mono font-bold text-sm text-primary block">
                                    {scanResult.carbs_g ?? 0}g
                                </span>
                                <span className="text-[8px] text-on-surface-variant block">Energi Cepat</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-primary/10 shadow-2xs text-center space-y-0.5">
                                <span className="text-[9px] font-bold text-on-surface-variant uppercase font-label-mono block">Protein</span>
                                <span className="font-mono font-bold text-sm text-emerald-600 block">
                                    {scanResult.protein_g ?? 0}g
                                </span>
                                <span className="text-[8px] text-on-surface-variant block">Massa Otot</span>
                            </div>

                            <div className="p-2.5 rounded-xl bg-white border border-primary/10 shadow-2xs text-center space-y-0.5">
                                <span className="text-[9px] font-bold text-on-surface-variant uppercase font-label-mono block">Natrium</span>
                                <span className="font-mono font-bold text-sm text-indigo-600 block">
                                    {scanResult.sodium_mg ?? 0}mg
                                </span>
                                <span className="text-[8px] text-on-surface-variant block">Elektrolit</span>
                            </div>
                        </div>

                        {/* Glycemic Load & Blood Sugar Impact */}
                        <div className="p-5 rounded-3xl bg-white border border-primary/15 shadow-xs space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-heading font-bold text-sm text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[20px]">ssid_chart</span>
                                    <span>Beban Glikemik (Glycemic Load)</span>
                                </h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-label-mono ${
                                    (scanResult.glycemic_load?.level === 'TINGGI' || scanResult.glycemic_load_level === 'TINGGI')
                                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                        : (scanResult.glycemic_load?.level === 'RENDAH' || scanResult.glycemic_load_level === 'RENDAH')
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                                }`}>
                                    {scanResult.glycemic_load?.level || scanResult.glycemic_load_level || 'SEDANG'}
                                </span>
                            </div>

                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Skor Beban Glikemik: <strong>{scanResult.glycemic_load?.score || scanResult.glycemic_load_score || '15'}</strong>. 
                                {' '}Proyeksi lonjakan glukosa darah pasca makan diperkirakan mencapai puncak di rentang 45–60 menit.
                            </p>
                        </div>

                        {/* Clinical Insight / AI Recommendation */}
                        {(scanResult.clinical_note || scanResult.recommendation) && (
                            <div className="p-5 rounded-3xl bg-surface-container-low border border-primary/10 space-y-2">
                                <h4 className="font-bold text-xs text-primary flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[17px]">tips_and_updates</span>
                                    <span>Wawasan Klinis & Saran Gaya Hidup AI</span>
                                </h4>
                                <p className="text-xs text-on-surface leading-relaxed">
                                    {scanResult.clinical_note || scanResult.recommendation}
                                </p>
                            </div>
                        )}

                        {/* Bottom Actions */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                            <button
                                type="button"
                                onClick={handleResetScanner}
                                className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                                <span>Pindai Makanan Lainnya</span>
                            </button>

                            <Link
                                href="/member/timeline?metric=FOOD_LOG"
                                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
                            >
                                <span className="material-symbols-outlined text-[20px]">history_edu</span>
                                <span>Lihat di Riwayat (Timeline)</span>
                            </Link>

                            <Link
                                href="/member/dashboard"
                                className="w-full py-3.5 px-6 rounded-2xl bg-white border border-primary/20 text-primary font-bold text-sm hover:bg-surface-container-low active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
                            >
                                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                                <span>Ke Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animation Keyframes for Scanner Laser */}
            <style>{`
                @keyframes scannerLine {
                    0% { top: 5%; opacity: 0; }
                    15% { opacity: 1; }
                    85% { opacity: 1; }
                    100% { top: 95%; opacity: 0; }
                }
            `}</style>
        </div>
    );
}
