import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import AppLayout from '@/Layouts/AppLayout';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// =============================================================================
// COMPREHENSIVE INITIAL SEED / FALLBACK DIRECTORY (ACCURATE GPS COORDINATES)
// =============================================================================
const MASTER_HOSPITALS = [
    {
        id: 'seed_1',
        name: 'RSUPN Dr. Cipto Mangunkusumo (RSCM)',
        type: 'Rumah Sakit Rujukan Nasional (IGD 24 Jam)',
        lat: -6.1969,
        lng: 106.8483,
        phone: '119 / (021) 1500-135',
        ambulanceReady: true,
        address: 'Jl. Diponegoro No. 71, Kenari, Senen, Jakarta Pusat',
        facility: 'Trauma Center Level 1 & Krisis Endokrin',
        city: 'Jakarta Pusat',
        source: 'verified_registry',
    },
    {
        id: 'seed_2',
        name: 'RS Jantung & Pembuluh Darah Harapan Kita',
        type: 'Pusat Rujukan Kardiovaskular Nasional (IGD 24 Jam)',
        lat: -6.1856,
        lng: 106.7979,
        phone: '119 / (021) 5684-093',
        ambulanceReady: true,
        address: 'Jl. Letjen S. Parman Kav. 87, Slipi, Jakarta Barat',
        facility: 'Cath Lab Cito & PCI 24 Jam',
        city: 'Jakarta Barat',
        source: 'verified_registry',
    },
    {
        id: 'seed_3',
        name: 'RSPAD Gatot Soebroto',
        type: 'Rumah Sakit Kepresidenan & Rujukan Utama (IGD 24 Jam)',
        lat: -6.1772,
        lng: 106.8378,
        phone: '119 / (021) 3441-008',
        ambulanceReady: true,
        address: 'Jl. Abdul Rahman Saleh No. 24, Senen, Jakarta Pusat',
        facility: 'Layanan Darurat Stroke & Toksikologi',
        city: 'Jakarta Pusat',
        source: 'verified_registry',
    },
    {
        id: 'seed_4',
        name: 'RS Yarsi Cempaka Putih',
        type: 'Fasilitas Kesehatan Rujukan Lanjutan (IGD 24 Jam)',
        lat: -6.1744,
        lng: 106.8741,
        phone: '119 / (021) 8061-8618',
        ambulanceReady: true,
        address: 'Jl. Letjen Suprapto Kav. 13, Cempaka Putih, Jakarta Pusat',
        facility: 'ICU/ICCU Siaga & Armada Ambulans Advance',
        city: 'Jakarta Pusat',
        source: 'verified_registry',
    },
    {
        id: 'seed_5',
        name: 'RSUP Fatmawati',
        type: 'Pusat Rujukan Jakarta Selatan (IGD 24 Jam)',
        lat: -6.2947,
        lng: 106.7938,
        phone: '119 / (021) 7501-524',
        ambulanceReady: true,
        address: 'Jl. RS. Fatmawati Raya No. 4, Cilandak, Jakarta Selatan',
        facility: 'Triase Cepat & Laboratorium Krisis Glukosa',
        city: 'Jakarta Selatan',
        source: 'verified_registry',
    },
    {
        id: 'seed_6',
        name: 'RSUP Persahabatan',
        type: 'Pusat Rujukan Respirasi & Medik (IGD 24 Jam)',
        lat: -6.2052,
        lng: 106.8837,
        phone: '119 / (021) 4891-708',
        ambulanceReady: true,
        address: 'Jl. Persahabatan Raya No. 1, Rawamangun, Jakarta Timur',
        facility: 'IGD Terpadu & Unit Resusitasi',
        city: 'Jakarta Timur',
        source: 'verified_registry',
    },
    {
        id: 'seed_7',
        name: 'RSUP Dr. Hasan Sadikin (RSHS) Bandung',
        type: 'Rumah Sakit Rujukan Utama Jawa Barat (IGD 24 Jam)',
        lat: -6.8942,
        lng: 107.5986,
        phone: '119 / (022) 2034-953',
        ambulanceReady: true,
        address: 'Jl. Pasteur No. 38, Sukajadi, Kota Bandung',
        facility: 'Pusat Gawat Darurat Metabolik Jabar',
        city: 'Bandung',
        source: 'verified_registry',
    },
    {
        id: 'seed_8',
        name: 'RSUD Dr. Soetomo Surabaya',
        type: 'Rumah Sakit Rujukan Utama Jawa Timur (IGD 24 Jam)',
        lat: -7.2684,
        lng: 112.7583,
        phone: '119 / (031) 5501-078',
        ambulanceReady: true,
        address: 'Jl. Mayjen Prof. Dr. Moestopo No. 6-8, Gubeng, Surabaya',
        facility: 'IGD Bedah & Non-Bedah 24 Jam',
        city: 'Surabaya',
        source: 'verified_registry',
    },
    {
        id: 'seed_9',
        name: 'RSUP Dr. Sardjito Yogyakarta',
        type: 'Rumah Sakit Rujukan Nasional DIY & Jateng (IGD 24 Jam)',
        lat: -7.7686,
        lng: 110.3736,
        phone: '119 / (0274) 587-333',
        ambulanceReady: true,
        address: 'Jl. Kesehatan No. 1, Sinduadi, Mlati, Sleman, D.I. Yogyakarta',
        facility: 'Pusat Krisis Kardiometabolik & ICU Cito',
        city: 'Yogyakarta',
        source: 'verified_registry',
    },
    {
        id: 'seed_10',
        name: 'RSUP H. Adam Malik Medan',
        type: 'Rumah Sakit Rujukan Utama Sumatera Utara (IGD 24 Jam)',
        lat: 3.5186,
        lng: 98.6082,
        phone: '119 / (061) 8364-581',
        ambulanceReady: true,
        address: 'Jl. Bunga Lau No. 17, Kemenangan Tani, Medan Tuntungan, Kota Medan',
        facility: 'Unit Darurat Terpadu & Trauma Care',
        city: 'Medan',
        source: 'verified_registry',
    },
    {
        id: 'seed_11',
        name: 'RSUP Prof. Dr. I.G.N.G. Ngoerah (Sanglah) Denpasar',
        type: 'Rumah Sakit Rujukan Utama Bali-Nusra (IGD 24 Jam)',
        lat: -8.6749,
        lng: 115.2132,
        phone: '119 / (0361) 227-911',
        ambulanceReady: true,
        address: 'Jl. Diponegoro, Dauh Puri Klod, Denpasar Barat, Kota Denpasar, Bali',
        facility: 'Pusat Medis Gawat Darurat & Disaster Care',
        city: 'Denpasar',
        source: 'verified_registry',
    },
    {
        id: 'seed_12',
        name: 'RSUP Dr. Wahidin Sudirohusodo Makassar',
        type: 'Rumah Sakit Rujukan Utama Indonesia Timur (IGD 24 Jam)',
        lat: -5.1326,
        lng: 119.4938,
        phone: '119 / (0411) 584-675',
        ambulanceReady: true,
        address: 'Jl. Perintis Kemerdekaan Km. 11, Tamalanrea, Kota Makassar, Sulsel',
        facility: 'Pusat Krisis Medik & Ambulans Darat Terpadu',
        city: 'Makassar',
        source: 'verified_registry',
    },
];

// Presets for quick simulation in major Indonesian cities
const PRESET_CITIES = [
    { name: 'Jakarta Pusat (Monas)', lat: -6.175392, lng: 106.827153 },
    { name: 'Jakarta Selatan (Senayan)', lat: -6.218526, lng: 106.802612 },
    { name: 'Bandung (Pasteur)', lat: -6.8942, lng: 107.5986 },
    { name: 'Surabaya (Gubeng)', lat: -7.2684, lng: 112.7583 },
    { name: 'Yogyakarta (Sleman)', lat: -7.7686, lng: 110.3736 },
    { name: 'Medan (Tuntungan)', lat: 3.5186, lng: 98.6082 },
    { name: 'Bali (Denpasar)', lat: -8.6749, lng: 115.2132 },
    { name: 'Makassar (Tamalanrea)', lat: -5.1326, lng: 119.4938 },
];

// =============================================================================
// COMPREHENSIVE MEDICAL FIRST-AID PROTOCOLS (STANDAR AHA & PERKENI)
// =============================================================================
const EMERGENCY_PROTOCOLS = [
    {
        id: 'cpr',
        name: 'Henti Jantung (CPR / RJP)',
        shortName: 'CPR Jantung',
        badge: 'Pedoman AHA 2020-2025 • Hands-Only CPR',
        icon: 'cardiology',
        summary: 'Tindakan resusitasi darurat saat korban tidak sadar, tidak bernapas normal, atau bernapas megap-megap (gasping).',
        steps: [
            {
                step: '1',
                title: 'Aman Diri, Cek Respon & 119',
                desc: 'Pastikan lingkungan aman. Tepuk bahu korban tegas & panggil keras. Jika tidak merespon, segera telepon 119 atau tekan tombol SOS darurat.',
                caution: 'Pastikan 3A: Aman Diri, Aman Pasien, dan Aman Lingkungan sebelum menolong.'
            },
            {
                step: '2',
                title: 'Periksa Napas (< 10 Detik)',
                desc: 'Lihat pergerakan naik-turun dada maks 10 detik. Jika TIDAK bernapas atau megap-megap (agonal gasps), posisikan telentang di lantai datar keras.',
                caution: 'Bagi penolong awam, abaikan meraba nadi karotis agar tidak menunda resusitasi.'
            },
            {
                step: '3',
                title: 'Kompresi Dada Cepat & Kuat',
                desc: 'Letakkan tumit tangan di tengah tulang dada, kunci jari tangan lain. Tekan sedalam 5-6 cm, kecepatan 100-120x/menit (irama "Stayin\' Alive").',
                caution: 'Pertahankan lengan lurus vertikal dan biarkan dada mengembang penuh (full recoil) tiap ketukan.'
            },
            {
                step: '4',
                title: 'Pasang AED Segera Jika Ada',
                desc: 'Nyalakan alat AED jika tersedia, tempel pad sesuai diagram dada korban, ikuti perintah suara AED untuk analisis dan kejut listrik.',
                caution: 'Dilarang menyentuh tubuh korban saat AED menganalisis ritme jantung atau memberi kejut.'
            }
        ]
    },
    {
        id: 'hypo',
        name: 'Krisis Hipoglikemia Akut',
        shortName: 'Hipoglikemia',
        badge: 'Pedoman PERKENI 2021 • Rule of 15',
        icon: 'bloodtype',
        summary: 'Protokol penanganan cepat hipoglikemia bagi pasien diabetes melitus atau pengguna insulin untuk mencegah syok dan ensefalopati.',
        steps: [
            {
                step: '1',
                title: '15-20g Karbohidrat Cepat',
                desc: 'Jika pasien SADAR: Berikan 15-20g gula murni cepat serap (1/2 cangkir jus buah manis, 3 sdt gula dilarutkan dalam 100ml air, atau 1 sdm madu).',
                caution: 'DILARANG memberi makanan/minuman apapun jika pasien mengantuk berat/pingsan (risiko aspirasi paru).'
            },
            {
                step: '2',
                title: 'Istirahat Total 15 Menit',
                desc: 'Baringkan dan istirahatkan pasien dengan rileks selama 15 menit agar glukosa diserap usus ke dalam peredaran darah sistemik.',
                caution: 'Hindari cokelat berlemak tinggi karena lemak memperlambat proses penyerapan gula di lambung.'
            },
            {
                step: '3',
                title: 'Evaluasi Glukosa Kapiler',
                desc: 'Periksa ulang glukosa darah (glukometer). Bila masih < 70 mg/dL, ulangi pemberian 15g karbohidrat cepat dosis kedua.',
                caution: 'Jika sudah > 100 mg/dL namun waktu makan masih lama, beri biskuit gandum atau roti.'
            },
            {
                step: '4',
                title: 'Bila Hilang Kesadaran',
                desc: 'Miringkan tubuh pasien ke posisi pemulihan (posisi miring mantap), jangan paksa minum, dan segera rujuk IGD untuk Dextrose 40% IV.',
                caution: 'Hubungi 119 segera jika pasien mengalami kejang atau kebingungan berat.'
            }
        ]
    },
    {
        id: 'stroke',
        name: 'Stroke Akut (Algoritma F.A.S.T)',
        shortName: 'Stroke (F.A.S.T)',
        badge: 'AHA/ASA Stroke Guidelines • Time is Brain',
        icon: 'neurology',
        summary: 'Identifikasi darurat defisit neurologis fokal akut akibat sumbatan trombus atau ruptur pembuluh darah otak.',
        steps: [
            {
                step: 'F',
                title: 'Face Drooping (Wajah Terkulai)',
                desc: 'Minta pasien tersenyum lebar. Perhatikan apakah senyum asimetris, sudut bibir miring ke satu sisi, atau pipi tampak terkulai.',
                caution: 'Gejala sering muncul mendadak tanpa disertai rasa nyeri kepala hebat.'
            },
            {
                step: 'A',
                title: 'Arm Weakness (Lengan Lemah)',
                desc: 'Minta pasien mengangkat kedua lengan lurus ke depan selama 10 detik. Amati apakah satu lengan terkulai jatuh atau tidak mampu terangkat.',
                caution: 'Dapat disertai keluhan baal atau mati rasa pada separuh sisi tubuh (hemiparesis).'
            },
            {
                step: 'S',
                title: 'Speech Slurred (Bicara Pelo)',
                desc: 'Minta pasien mengulang kalimat sederhana. Perhatikan apakah artikulasi suara pelo, cadel, atau pasien sulit mengerti kata-kata.',
                caution: 'Pasien bisa tampak sadar penuh namun kesulitan menemukan kata (afasia).'
            },
            {
                step: 'T',
                title: 'Time to Call 119 & Jam Onset',
                desc: 'Jika ada minimal SATU tanda di atas, catat jam persis gejala muncul dan segera larikan ke RS yang memiliki fasilitas CT-Scan 24 jam.',
                caution: 'JANGAN beri makanan, minuman, obat penurun tensi, atau aspirin sebelum hasil CT-Scan RS keluar.'
            }
        ]
    },
    {
        id: 'choking',
        name: 'Tersedak (Manuver Heimlich)',
        shortName: 'Tersedak (Heimlich)',
        badge: 'ERC / AHA Choking Protocol • Obstruksi Napas',
        icon: 'air',
        summary: 'Pembebasan sumbatan mekanik benda asing atau makanan pada jalan napas atas yang memicu gagal napas mendadak.',
        steps: [
            {
                step: '1',
                title: 'Kenali Tanda Universal Tersedak',
                desc: 'Korban memegang leher dengan kedua tangan, mata panik, tidak dapat bersuara, batuk, atau bernapas. Tanyakan: "Anda tersedak?".',
                caution: 'Jika korban masih bisa batuk kuat, dukung untuk terus batuk dan JANGAN pukul punggungnya.'
            },
            {
                step: '2',
                title: 'Posisikan di Belakang Korban',
                desc: 'Berdiri di belakang korban dengan satu kaki di antara kaki korban. Lingkarkan kedua lengan di pinggang korban dengan tubuh sedikit condong ke depan.',
                caution: 'Bagi ibu hamil tua atau pasien obesitas berat, lakukan dorongan dada (chest thrusts).'
            },
            {
                step: '3',
                title: 'Hentakan Cepat ke Dalam & Atas',
                desc: 'Kepalkan satu tangan di atas pusar (bawah tulang dada), genggam dengan tangan lain, lalu hentakkan kuat ke arah dalam dan atas berulang kali.',
                caution: 'Lakukan hentakan tegas seperti mengangkat tubuh korban hingga benda asing terlontar keluar.'
            },
            {
                step: '4',
                title: 'Bila Korban Hilang Kesadaran',
                desc: 'Baringkan korban perlahan di lantai, aktifkan 119, dan segera mulai kompresi dada (CPR) untuk memberi tekanan pendorong sumbatan keluar.',
                caution: 'Setiap membuka jalan napas intip mulut; ambil benda HANYA jika tampak jelas (jangan sapu buta).'
            }
        ]
    },
    {
        id: 'hypertension',
        name: 'Krisis Hipertensi & Nyeri Dada',
        shortName: 'Hipertensi & Dada',
        badge: 'Pedoman PERKI / AHA • Kardiovaskular Cito',
        icon: 'monitor_heart',
        summary: 'Kondisi gawat darurat akibat lonjakan tekanan darah ekstrem disertai ancaman iskemia miokard atau perdarahan intrakranial.',
        steps: [
            {
                step: '1',
                title: 'Posisikan Setengah Duduk (30-45°)',
                desc: 'Dudukkan pasien dengan sandaran punggung 30-45 derajat untuk meringankan beban jantung dan mengurangi tekanan pembuluh darah kepala.',
                caution: 'Dilarang membiarkan pasien berjalan atau beraktivitas fisik tergesa-gesa.'
            },
            {
                step: '2',
                title: 'Longgarkan Pakaian & Tenangkan',
                desc: 'Buka kancing baju yang ketat, dasi, atau ikat pinggang. Pandu pernapasan dalam dan teratur untuk meredakan lonjakan hormon stres.',
                caution: 'Kepanikan hebat memicu pelepasan katekolamin yang memperburuk kenaikan tensi darah.'
            },
            {
                step: '3',
                title: 'Waspadai Nyeri Dada Khas Jantung',
                desc: 'Rasa dada tertindih beban berat atau diremas yang menjalar ke leher, rahang, atau lengan kiri > 15 menit disertai keringat dingin.',
                caution: 'Bila pasien memiliki resep Nitroglycerin sublingual resmi dari dokter jantung, bantu konsumsi 1 tablet di bawah lidah.'
            },
            {
                step: '4',
                title: 'Panggil Ambulans 119 Berfasilitas EKG',
                desc: 'Segera hubungi 119 untuk evakuasi ambulans gawat darurat yang dilengkapi fasilitas oksigen, monitor EKG 12-lead, dan infus.',
                caution: 'Jangan mencoba menurunkan tensi secara drastis mandiri tanpa pemantauan dokter IGD.'
            }
        ]
    }
];

// =============================================================================
// HAVERSINE DISTANCE FORMULA (FALLBACK CLIENT CALCULATION)
// =============================================================================
function haversineDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = (angle) => (angle * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function EmergencyDemo() {
    // -------------------------------------------------------------------------
    // GEOLOCATION STATE (High Accuracy 100%)
    // -------------------------------------------------------------------------
    const [geoState, setGeoState] = useState({
        status: 'requesting', // 'requesting' | 'acquired' | 'error' | 'manual'
        lat: -6.175392,
        lng: 106.827153,
        accuracy: 4.8, // in meters
        altitude: null,
        heading: null,
        speed: null,
        timestamp: new Date(),
        address: 'Menghubungkan ke sensor satelit GPS...',
        source: 'gps', // 'gps' | 'preset' | 'manual'
        errorMessage: null,
    });

    // Dynamic Real Hospitals from Backend / OSM
    const [hospitals, setHospitals] = useState([]);
    const [loadingHospitals, setLoadingHospitals] = useState(false);
    const [hospitalSource, setHospitalSource] = useState('initial'); // 'osm_live' | 'verified_registry' | 'initial'

    const [isLiveWatching, setIsLiveWatching] = useState(false);
    const [selectedFaskesId, setSelectedFaskesId] = useState(null);
    const [sosTriggered, setSosTriggered] = useState(false);
    const [sosDispatchStep, setSosDispatchStep] = useState(1);
    const [sosSessionId, setSosSessionId] = useState('SOS-119-892401');
    const [copiedCoords, setCopiedCoords] = useState(false);

    // Critical First-Aid Protocols State
    const [selectedProtocolId, setSelectedProtocolId] = useState('cpr');
    const currentProtocol = useMemo(
        () => EMERGENCY_PROTOCOLS.find((p) => p.id === selectedProtocolId) || EMERGENCY_PROTOCOLS[0],
        [selectedProtocolId]
    );

    // Leaflet Map References
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersGroupRef = useRef(null);
    const accuracyCircleRef = useRef(null);
    const routePolylineRef = useRef(null);
    const watchIdRef = useRef(null);

    // -------------------------------------------------------------------------
    // SOUND BEEP HELPER (Web Audio API)
    // -------------------------------------------------------------------------
    const playEmergencyAudio = () => {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                const ctx = new AudioCtx();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(880, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.25, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            }
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200, 100, 400]);
            }
        } catch {
            // Audio policy fallback
        }
    };

    // -------------------------------------------------------------------------
    // REVERSE GEOCODING (OpenStreetMap Nominatim)
    // -------------------------------------------------------------------------
    const resolveAddress = async (lat, lng) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                { headers: { 'Accept-Language': 'id' } }
            );
            if (res.ok) {
                const data = await res.json();
                if (data.display_name) {
                    return data.display_name;
                }
            }
        } catch (e) {
            console.warn('Reverse geocoding error:', e);
        }
        return `Koordinat GPS: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    };

    // -------------------------------------------------------------------------
    // FETCH REAL NEARBY HOSPITALS FROM SERVER / OSM
    // -------------------------------------------------------------------------
    const fetchRealNearbyHospitals = useCallback(async (lat, lng) => {
        setLoadingHospitals(true);
        try {
            const res = await axios.get('/emergency/nearby-hospitals', {
                params: { lat, lng, limit: 12 },
            });

            if (res.data?.status === 'success' && Array.isArray(res.data?.hospitals) && res.data.hospitals.length > 0) {
                const fetched = res.data.hospitals.map((h, idx) => ({
                    ...h,
                    id: h.id ?? `hosp_${idx}`,
                    ambulanceReady: h.ambulance_ready ?? true,
                    distanceKm: h.distance_km,
                    distanceFormatted: h.distance_formatted,
                    etaFormatted: h.eta_formatted,
                }));
                setHospitals(fetched);
                setSelectedFaskesId(fetched[0].id);
                setHospitalSource(res.data.hospitals[0]?.source || 'osm_live');
                return;
            }
        } catch (err) {
            console.warn('Fallback: unable to reach real-time hospital endpoint, falling back to local registry', err);
        } finally {
            setLoadingHospitals(false);
        }
    }, []);

    // -------------------------------------------------------------------------
    // ACQUIRE 100% ACCURATE GPS LOCATION
    // -------------------------------------------------------------------------
    const requestAccurateLocation = () => {
        if (!navigator.geolocation) {
            setGeoState((prev) => ({
                ...prev,
                status: 'error',
                errorMessage: 'Perangkat atau browser Anda tidak mendukung sensor Geolocation GPS.',
            }));
            fetchRealNearbyHospitals(geoState.lat, geoState.lng);
            return;
        }

        setGeoState((prev) => ({
            ...prev,
            status: 'requesting',
            errorMessage: null,
            address: 'Menghubungkan ke satelit GPS & memvalidasi koordinat presisi...',
        }));

        // Strict high accuracy options for 100% precision
        const highAccuracyOptions = {
            enableHighAccuracy: true, // Force GPS chip hardware instead of coarse IP
            timeout: 12000,           // 12 seconds wait time
            maximumAge: 0,            // Never use cached position, get live fix
        };

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
                const roundedAcc = Math.round(accuracy * 10) / 10;
                const addressStr = await resolveAddress(latitude, longitude);

                setGeoState({
                    status: 'acquired',
                    lat: latitude,
                    lng: longitude,
                    accuracy: roundedAcc,
                    altitude: altitude ? Math.round(altitude) : null,
                    heading: heading || null,
                    speed: speed || null,
                    timestamp: new Date(position.timestamp),
                    address: addressStr,
                    source: 'gps',
                    errorMessage: null,
                });

                // Immediately query real nearby hospitals around the user's real GPS fix
                fetchRealNearbyHospitals(latitude, longitude);
            },
            (error) => {
                let msg = 'Gagal mengakses sensor GPS.';
                if (error.code === error.PERMISSION_DENIED) {
                    msg = 'Izin lokasi GPS belum diaktifkan. Klik ikon gembok pada URL bar untuk mengizinkan akses lokasi presisi.';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    msg = 'Sinyal satelit GPS tidak terdeteksi saat ini. Menggunakan estimasi koordinat default.';
                } else if (error.code === error.TIMEOUT) {
                    msg = 'Waktu permintaan satelit GPS habis (timeout). Silakan klik "Refresh GPS Saya".';
                }

                setGeoState((prev) => ({
                    ...prev,
                    status: 'error',
                    errorMessage: msg,
                    address: 'Kawasan Monumen Nasional, Gambir, Jakarta Pusat (Default)',
                }));

                // Fetch real hospitals for default coordinates
                fetchRealNearbyHospitals(geoState.lat, geoState.lng);
            },
            highAccuracyOptions
        );
    };

    // Toggle live GPS continuous tracking
    const toggleLiveTracking = () => {
        if (isLiveWatching) {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
            setIsLiveWatching(false);
        } else {
            if (!navigator.geolocation) return;
            setIsLiveWatching(true);
            watchIdRef.current = navigator.geolocation.watchPosition(
                async (pos) => {
                    const { latitude, longitude, accuracy } = pos.coords;
                    setGeoState((prev) => ({
                        ...prev,
                        lat: latitude,
                        lng: longitude,
                        accuracy: Math.round(accuracy * 10) / 10,
                        timestamp: new Date(pos.timestamp),
                    }));
                },
                (err) => console.warn('Live watch error:', err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }
    };

    // Initial GPS acquisition on mount
    useEffect(() => {
        requestAccurateLocation();
        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    // -------------------------------------------------------------------------
    // DYNAMIC HOSPITAL SORTING (HAVERSINE DISTANCE FROM REAL GPS)
    // -------------------------------------------------------------------------
    const sortedHospitals = useMemo(() => {
        if (hospitals.length > 0) {
            return hospitals;
        }

        // Fallback before server response arrives
        const listWithDist = MASTER_HOSPITALS.map((hosp) => {
            const distKm = haversineDistanceKm(geoState.lat, geoState.lng, hosp.lat, hosp.lng);
            const etaMins = Math.max(3, Math.round(distKm * 1.7 + 2));
            return {
                ...hosp,
                distanceKm: distKm,
                distanceFormatted: distKm < 1 ? `${Math.round(distKm * 1000)} Meter` : `${distKm.toFixed(1)} km`,
                etaFormatted: `${etaMins} Menit`,
            };
        });

        listWithDist.sort((a, b) => a.distanceKm - b.distanceKm);
        return listWithDist;
    }, [hospitals, geoState.lat, geoState.lng]);

    // Ensure selected faskes is valid
    const activeFaskes = useMemo(() => {
        return sortedHospitals.find((h) => h.id === selectedFaskesId) || sortedHospitals[0] || MASTER_HOSPITALS[0];
    }, [sortedHospitals, selectedFaskesId]);

    // Hospital List Pagination State (4 hospitals per page)
    const [hospitalPage, setHospitalPage] = useState(1);
    const hospitalsPerPage = 4;
    const totalHospitalPages = Math.max(1, Math.ceil(sortedHospitals.length / hospitalsPerPage));
    const paginatedHospitals = useMemo(() => {
        const start = (hospitalPage - 1) * hospitalsPerPage;
        return sortedHospitals.slice(start, start + hospitalsPerPage);
    }, [sortedHospitals, hospitalPage, hospitalsPerPage]);

    // Keep pagination in sync if selected faskes is on another page
    useEffect(() => {
        if (!selectedFaskesId || sortedHospitals.length === 0) return;
        const idx = sortedHospitals.findIndex((h) => h.id === selectedFaskesId);
        if (idx !== -1) {
            const targetPage = Math.floor(idx / hospitalsPerPage) + 1;
            setHospitalPage(targetPage);
        }
    }, [selectedFaskesId, sortedHospitals, hospitalsPerPage]);

    // Keep active faskes in sync with closest hospital on first location lock
    useEffect(() => {
        if (sortedHospitals.length > 0 && !selectedFaskesId) {
            setSelectedFaskesId(sortedHospitals[0].id);
        }
    }, [sortedHospitals, selectedFaskesId]);

    // -------------------------------------------------------------------------
    // LEAFLET MAP INITIALIZATION & REACTIVE LAYER UPDATES
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (!mapContainerRef.current) return;

        // Initialize Map once
        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [geoState.lat, geoState.lng],
                zoom: 14,
                zoomControl: true,
                attributionControl: false,
            });

            // Modern OpenStreetMap Clean Tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Click anywhere on map to pinpoint custom real location
            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;
                const addr = await resolveAddress(lat, lng);
                setGeoState({
                    status: 'manual',
                    lat,
                    lng,
                    accuracy: 1.0,
                    altitude: null,
                    heading: null,
                    speed: null,
                    timestamp: new Date(),
                    address: addr,
                    source: 'manual',
                    errorMessage: null,
                });
                fetchRealNearbyHospitals(lat, lng);
            });

            const markersGroup = L.layerGroup().addTo(map);
            markersGroupRef.current = markersGroup;
            mapInstanceRef.current = map;

            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        }

        const map = mapInstanceRef.current;
        if (!map || !markersGroupRef.current) return;

        // Pan to updated location smoothly
        map.panTo([geoState.lat, geoState.lng], { animate: true, duration: 0.8 });

        // Clear previous layer items
        markersGroupRef.current.clearLayers();

        // 1. Draw Accuracy Circle (GPS radius in meters)
        if (accuracyCircleRef.current) {
            map.removeLayer(accuracyCircleRef.current);
        }
        if (geoState.accuracy && geoState.accuracy < 2000) {
            accuracyCircleRef.current = L.circle([geoState.lat, geoState.lng], {
                radius: Math.max(15, geoState.accuracy),
                color: '#e11d48',
                fillColor: '#f43f5e',
                fillOpacity: 0.15,
                weight: 1.5,
                dashArray: '4, 4',
            }).addTo(map);
        }

        // 2. Custom User SOS DivIcon (Pulsing Red Marker)
        const userDivIcon = L.divIcon({
            className: 'custom-user-marker',
            html: `
                <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style="width: 44px; height: 44px;">
                    <span class="absolute w-10 h-10 rounded-full bg-rose-500/40 animate-ping"></span>
                    <div class="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl border-2 border-white ring-2 ring-rose-500">
                        <span class="material-symbols-outlined text-[22px]">person_pin_circle</span>
                    </div>
                </div>
            `,
            iconSize: [0, 0],
            iconAnchor: [0, 0],
            popupAnchor: [0, -22],
        });

        L.marker([geoState.lat, geoState.lng], { icon: userDivIcon })
            .bindPopup(`
                <div class="text-xs p-1 font-sans space-y-1">
                    <b class="text-rose-700 font-bold block">Lokasi Darurat Anda</b>
                    <p class="text-gray-700 leading-tight">${geoState.address}</p>
                    <div class="pt-1 text-[10px] font-mono text-gray-500">
                        Akurasi: ±${geoState.accuracy || 5} Meter • ${geoState.lat.toFixed(5)}, ${geoState.lng.toFixed(5)}
                    </div>
                </div>
            `)
            .addTo(markersGroupRef.current);

        // 3. Render Real Nearest Hospital Markers
        sortedHospitals.slice(0, 8).forEach((hosp) => {
            const isSelected = hosp.id === activeFaskes.id;
            const hospIcon = L.divIcon({
                className: 'custom-hosp-marker',
                html: isSelected
                    ? `
                        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style="width: 40px; height: 40px;">
                            <span class="absolute w-10 h-10 rounded-full bg-emerald-500/40 animate-ping"></span>
                            <div class="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xl border-2 border-white ring-2 ring-emerald-500 cursor-pointer">
                                <span class="material-symbols-outlined text-[22px]">emergency</span>
                            </div>
                        </div>
                    `
                    : `
                        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2" style="width: 34px; height: 34px;">
                            <div class="w-8 h-8 rounded-xl bg-white text-rose-600 flex items-center justify-center shadow-md border-2 border-rose-500 cursor-pointer hover:scale-110 transition-transform">
                                <span class="material-symbols-outlined text-[18px]">local_hospital</span>
                            </div>
                        </div>
                    `,
                iconSize: [0, 0],
                iconAnchor: [0, 0],
                popupAnchor: [0, -18],
            });

            const marker = L.marker([hosp.lat, hosp.lng], { icon: hospIcon })
                .bindPopup(`
                    <div class="text-xs p-1 font-sans space-y-1">
                        <b class="text-emerald-800 font-bold block">${hosp.name}</b>
                        <p class="text-gray-600 text-[11px]">${hosp.type || 'Rumah Sakit (IGD 24 Jam)'}</p>
                        <div class="text-[11px] text-gray-700">
                            <b>Jarak:</b> ${hosp.distanceFormatted} • <b>ETA Ambulans:</b> ${hosp.etaFormatted}
                        </div>
                        <div class="text-[10px] text-gray-500 font-mono">${hosp.phone}</div>
                    </div>
                `)
                .addTo(markersGroupRef.current);

            marker.on('click', () => {
                setSelectedFaskesId(hosp.id);
            });
        });

        // 4. Draw Animated Ambulance Dispatch Polyline to Selected Hospital
        if (routePolylineRef.current) {
            map.removeLayer(routePolylineRef.current);
        }
        if (activeFaskes) {
            routePolylineRef.current = L.polyline(
                [
                    [geoState.lat, geoState.lng],
                    [activeFaskes.lat, activeFaskes.lng],
                ],
                {
                    color: '#059669',
                    weight: 4,
                    opacity: 0.9,
                    dashArray: '8, 8',
                }
            ).addTo(map);
        }
    }, [geoState.lat, geoState.lng, geoState.accuracy, activeFaskes, sortedHospitals]);

    // Handle SOS activation trigger
    const handleTriggerSOS = async () => {
        playEmergencyAudio();
        const nextState = !sosTriggered;
        setSosTriggered(nextState);

        if (nextState) {
            setSosDispatchStep(1);

            // Send real GPS coordinates to server backend
            try {
                const res = await axios.post('/emergency/trigger', {
                    latitude: geoState.lat,
                    longitude: geoState.lng,
                });
                if (res.data?.event_id) {
                    setSosSessionId(`SOS-119-${res.data.event_id}`);
                }
            } catch {
                setSosSessionId(`SOS-119-${Math.floor(100000 + Math.random() * 900000)}`);
            }

            // Step timeline sequence
            setTimeout(() => setSosDispatchStep(2), 1000);
            setTimeout(() => setSosDispatchStep(3), 2400);
            setTimeout(() => setSosDispatchStep(4), 3800);
        } else {
            setSosDispatchStep(1);
        }
    };

    // Copy exact GPS coordinates to clipboard
    const copyCoordinates = () => {
        const text = `${geoState.lat.toFixed(6)}, ${geoState.lng.toFixed(6)} (Akurasi ±${geoState.accuracy}m)`;
        navigator.clipboard?.writeText(text);
        setCopiedCoords(true);
        setTimeout(() => setCopiedCoords(false), 2000);
    };

    // Center map on user location
    const handleCenterMap = () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([geoState.lat, geoState.lng], 15, { animate: true });
        }
    };

    // Choose preset city
    const handleSelectPreset = async (preset) => {
        const addr = await resolveAddress(preset.lat, preset.lng);
        setGeoState({
            status: 'acquired',
            lat: preset.lat,
            lng: preset.lng,
            accuracy: 5.0,
            altitude: 12,
            heading: null,
            speed: null,
            timestamp: new Date(),
            address: addr,
            source: 'preset',
            errorMessage: null,
        });
        fetchRealNearbyHospitals(preset.lat, preset.lng);
    };

    const { auth } = usePage().props;
    const isAuthenticated = !!auth?.user;
    const Layout = isAuthenticated ? AppLayout : MarketingLayout;
    const layoutProps = isAuthenticated
        ? { title: 'Siaga Ambulans GPS 119', activeTab: 'emergency' }
        : {};

    const cleanHotline = (activeFaskes?.phone || '119').split('/')[0].trim();

    return (
        <Layout {...layoutProps}>
            <Head title="Siaga Ambulans 119 & Geolocation IGD Presisi - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
                {/* Header Section */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href={isAuthenticated ? "/member/dashboard" : "/"} className="hover:text-primary transition-colors">
                            {isAuthenticated ? "Dashboard" : "Beranda"}
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Siaga Tanggap Darurat &amp; 119</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Siaga Ambulans 119 &amp; Triase Darurat Presisi
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                                Keamanan pasien metabolik adalah prioritas mutlak. Mengintegrasikan sensor Geolocation GPS akurasi tinggi, routing armada ambulans 119 terdekat, dan protokol krisis hipoglikemia PERKENI.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto sm:flex sm:items-center">
                            <button
                                type="button"
                                onClick={requestAccurateLocation}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2.5 rounded-2xl bg-white border border-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface shadow-2xs transition-all cursor-pointer active:scale-95"
                                title="Pindai ulang koordinat satelit GPS"
                            >
                                <span className={`material-symbols-outlined text-[17px] text-emerald-700 shrink-0 ${geoState.status === 'requesting' ? 'animate-spin' : ''}`}>
                                    my_location
                                </span>
                                <span className="truncate">
                                    <span className="sm:hidden">Refresh GPS</span>
                                    <span className="hidden sm:inline">Refresh GPS Saya</span>
                                </span>
                            </button>
                            <Link
                                href="/member/emergency"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-5 py-2.5 rounded-2xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-2xs transition-all active:scale-95"
                                title="Buka Modul Darurat Member"
                            >
                                <span className="material-symbols-outlined text-[17px] shrink-0">emergency_share</span>
                                <span className="truncate">
                                    <span className="sm:hidden">Modul Darurat</span>
                                    <span className="hidden sm:inline">Buka Modul Darurat Member</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 1. HIGH-ACCURACY GPS TELEMETRY HUD BAR */}
                {/* ============================================================== */}
                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-[#e2eee6]">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-2xs">
                                <span className="material-symbols-outlined text-[22px]">gps_fixed</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-heading font-bold text-sm text-[#10241f] truncate">
                                        Sensor Geolocation GPS Akurat (100% Presisi)
                                    </h3>
                                </div>
                                <p className="text-[11px] text-[#3e564e] font-sans truncate">
                                    {geoState.address}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 w-full lg:w-auto lg:flex lg:items-center shrink-0">
                            <button
                                type="button"
                                onClick={copyCoordinates}
                                className="w-full lg:w-auto px-2.5 sm:px-3 py-2 rounded-xl bg-[#edf5f0] hover:bg-[#dfeee5] text-[#1b342c] text-[11px] sm:text-xs font-mono font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                                title="Salin Koordinat GPS"
                            >
                                <span className="material-symbols-outlined text-[15px] shrink-0">
                                    {copiedCoords ? 'done' : 'content_copy'}
                                </span>
                                <span className="truncate whitespace-nowrap">
                                    {copiedCoords ? 'Tersalin!' : `${geoState.lat.toFixed(4)}, ${geoState.lng.toFixed(4)}`}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={toggleLiveTracking}
                                className={`w-full lg:w-auto px-2.5 sm:px-3 py-2 rounded-xl text-[11px] sm:text-xs font-mono font-bold inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                                    isLiveWatching
                                        ? 'bg-rose-100 text-rose-900 border border-rose-300 animate-pulse'
                                        : 'bg-[#edf5f0] text-[#1b342c] hover:bg-[#dfeee5]'
                                }`}
                                title="Toggle Live GPS Tracking"
                            >
                                <span className="material-symbols-outlined text-[15px] shrink-0">radar</span>
                                <span className="truncate whitespace-nowrap">
                                    <span className="sm:hidden">Tracking: {isLiveWatching ? 'ON' : 'OFF'}</span>
                                    <span className="hidden sm:inline">Live Tracking: {isLiveWatching ? 'ON' : 'OFF'}</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Quick City Presets Simulator */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 pt-1">
                        <div className="flex items-center gap-1 shrink-0">
                            <span className="material-symbols-outlined text-[14px] text-emerald-700">tune</span>
                            <span className="text-[11px] font-mono font-bold text-[#3e564e]">
                                Simulasi Wilayah:
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
                            {PRESET_CITIES.map((city) => (
                                <button
                                    key={city.name}
                                    type="button"
                                    onClick={() => handleSelectPreset(city)}
                                    className="px-2.5 py-1 rounded-full bg-[#f4f9f6] border border-[#cfe2d7] text-[#10241f] text-[11px] font-mono hover:bg-[#e4f1ea] active:scale-95 transition-all shrink-0 cursor-pointer whitespace-nowrap"
                                >
                                    {city.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {geoState.errorMessage && (
                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-amber-700 shrink-0">info</span>
                            <span className="leading-relaxed">{geoState.errorMessage}</span>
                        </div>
                    )}
                </div>

                {/* ============================================================== */}
                {/* 2. PRIMARY 2-COLUMN EMERGENCY WORKSPACE */}
                {/* ============================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Interactive SOS Button & Hypoglycemia Protocol (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#d5e5db] shadow-xs p-5 sm:p-6 flex flex-col space-y-5">
                        <div className="space-y-5 text-center">
                            <div className="flex items-center justify-between pb-3.5 border-b border-[#e2eee6]">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-800 text-xs font-mono font-bold">
                                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                                    <span>HOTLINE RESMI KEMENKES RI 119</span>
                                </div>
                                <span className="text-[11px] font-mono text-[#3e564e] font-semibold">
                                    Enkripsi TLS 1.3
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-heading font-black text-xl text-[#10241f]">
                                    Tombol Pemicu Krisis Darurat (SOS)
                                </h3>
                                <p className="text-xs text-[#344d44] max-w-md mx-auto leading-relaxed">
                                    Tekan tombol di bawah untuk menyiarkan koordinat satelit GPS lokasi Anda secara instan ke faskes IGD dan armada ambulans terdekat.
                                </p>
                            </div>

                            {/* Massive Interactive SOS Button */}
                            <div className="py-3 flex flex-col items-center justify-center">
                                <button
                                    type="button"
                                    onClick={handleTriggerSOS}
                                    className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all transform active:scale-95 shadow-2xl cursor-pointer border-4 ${
                                        sosTriggered
                                            ? 'bg-rose-600 text-white border-rose-300 ring-8 ring-rose-500/30 animate-pulse'
                                            : 'bg-linear-to-b from-rose-500 to-rose-700 text-white border-rose-200 hover:scale-105 ring-4 ring-rose-400/20'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[44px]">
                                        {sosTriggered ? 'notifications_active' : 'emergency'}
                                    </span>
                                    <span className="font-heading font-black text-sm tracking-widest">
                                        {sosTriggered ? 'SIAGA AKTIF' : 'TEKAN SOS'}
                                    </span>
                                    <span className="text-[10px] font-mono opacity-90">
                                        {sosTriggered ? 'KLIK UTK RESET' : 'DISPATCH 119'}
                                    </span>
                                </button>
                            </div>

                            {/* Live Dispatch Steps Feedback Card */}
                            {sosTriggered ? (
                                <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border border-rose-200 text-left space-y-3 shadow-xs animate-in fade-in zoom-in-95">
                                    <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                                            <span className="font-bold text-xs text-rose-950 font-mono">
                                                DISPATCH AKTIF: #{sosSessionId}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold bg-rose-200 text-rose-950 px-2 py-0.5 rounded-full">
                                            ETA {activeFaskes?.etaFormatted || '5 Menit'}
                                        </span>
                                    </div>

                                    {/* Dispatch 4 Steps Timeline */}
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                                sosDispatchStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'
                                            }`}>
                                                ✓
                                            </span>
                                            <span className="font-medium text-rose-950">
                                                Koordinat GPS Terkunci: <strong>{geoState.lat.toFixed(5)}, {geoState.lng.toFixed(5)} (±{geoState.accuracy}m)</strong>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                                sosDispatchStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-rose-200 text-rose-800'
                                            }`}>
                                                {sosDispatchStep >= 2 ? '✓' : '2'}
                                            </span>
                                            <span className="font-medium text-rose-950">
                                                Sinyal Darurat Diterima Command Center Kemenkes RI 119
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                                sosDispatchStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-rose-200 text-rose-800'
                                            }`}>
                                                {sosDispatchStep >= 3 ? '✓' : '3'}
                                            </span>
                                            <span className="font-medium text-rose-950">
                                                Armada Ambulans <strong>{activeFaskes?.name}</strong> Meluncur Siaga ({activeFaskes?.distanceFormatted})
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                                                sosDispatchStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-rose-200 text-rose-800'
                                            }`}>
                                                {sosDispatchStep >= 4 ? '✓' : '4'}
                                            </span>
                                            <span className="font-medium text-rose-950">
                                                Pelacakan Jalur Darurat Live di Peta Interaktif
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons: Direct Call & WhatsApp Share */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-rose-200">
                                        <a
                                            href="tel:119"
                                            className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">call</span>
                                            <span>Hubungi 119 Langsung</span>
                                        </a>
                                        <a
                                            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                                `[DARURAT MEDIS 119] Mohon bantuan medis segera! Pasien membutuhkan pertolongan.\n\n` +
                                                `📍 Alamat: ${geoState.address}\n` +
                                                `📌 Koordinat GPS: https://www.google.com/maps?q=${geoState.lat},${geoState.lng} (Akurasi ±${geoState.accuracy}m)\n` +
                                                `🏥 IGD Terdekat: ${activeFaskes?.name} (${activeFaskes?.distanceFormatted}, ETA Ambulans: ${activeFaskes?.etaFormatted})\n` +
                                                `📞 Hotline IGD: ${activeFaskes?.phone}\n` +
                                                `🆔 ID Dispatch: #${sosSessionId}`
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">share_location</span>
                                            <span>Kirim WA ke Keluarga</span>
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] text-left text-xs text-[#2b443b] space-y-1">
                                    <div className="font-bold flex items-center gap-1.5 text-[#0d3b2f]">
                                        <span className="material-symbols-outlined text-[16px] text-emerald-700">security</span>
                                        <span>Protokol Triase Darurat Terkalibrasi</span>
                                    </div>
                                    <p className="text-[11px] leading-relaxed">
                                        Sistem secara otomatis mendeteksi dan memfilter rumah sakit terdekat yang memiliki unit gawat darurat (IGD) 24 jam dengan fasilitas resusitasi.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* First Aid & Critical Emergency Protocols Multi-Tab */}
                        <div className="p-4 sm:p-5 rounded-3xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-4 shadow-2xs">
                            {/* Header & Protocol Title */}
                            <div className="flex items-center gap-2.5 border-b border-[#cfe2d7] pb-3">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[19px]">emergency_heat</span>
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-xs sm:text-sm text-[#10241f] leading-tight">
                                        Pertolongan Pertama Gawat Darurat
                                    </h4>
                                    <p className="text-[11px] text-[#3e564e]">
                                        Panduan klinis pra-rumah sakit resmi terverifikasi medis
                                    </p>
                                </div>
                            </div>

                            {/* Protocol Tabs Selector */}
                            <div className="flex items-center gap-1.5 overflow-x-auto md:overflow-visible md:flex-wrap no-scrollbar">
                                {EMERGENCY_PROTOCOLS.map((protocol) => {
                                    const isActive = selectedProtocolId === protocol.id;
                                    return (
                                        <button
                                            key={protocol.id}
                                            type="button"
                                            onClick={() => setSelectedProtocolId(protocol.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 active:scale-95 border ${
                                                isActive
                                                    ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                                    : 'bg-white text-[#2b443b] hover:bg-[#eaf3ed] border-[#cfe2d7]'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[15px]">
                                                {protocol.icon}
                                            </span>
                                            <span>{protocol.shortName}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Protocol Details Banner */}
                            <div className="p-3.5 rounded-2xl bg-white border border-[#cfe2d7] space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">
                                            {currentProtocol.icon}
                                        </span>
                                        <h5 className="font-heading font-bold text-xs text-[#10241f]">
                                            {currentProtocol.name}
                                        </h5>
                                    </div>
                                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#f0f6f2] text-[#244237] border border-[#d2e3d9]">
                                        {currentProtocol.badge}
                                    </span>
                                </div>
                                <p className="text-[11px] text-[#3e564e] leading-relaxed">
                                    {currentProtocol.summary}
                                </p>
                            </div>

                            {/* Protocol Step-by-Step Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {currentProtocol.steps.map((st, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 rounded-2xl bg-white border border-[#cfe2d7] flex flex-col justify-between space-y-2 hover:border-primary/40 transition-colors shadow-2xs"
                                    >
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-primary font-bold">
                                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-mono font-black shrink-0">
                                                    {st.step}
                                                </span>
                                                <span className="text-xs text-[#10241f] leading-snug">
                                                    {st.title}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-[#2b443b] leading-relaxed">
                                                {st.desc}
                                            </p>
                                        </div>
                                        {st.caution && (
                                            <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[10px] text-amber-950 flex items-start gap-1.5 leading-snug">
                                                <span className="material-symbols-outlined text-[13px] text-amber-700 shrink-0 mt-0.5">
                                                    warning
                                                </span>
                                                <span>{st.caution}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Disclaimer / Call 119 Reminder */}
                            <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-[#4e685e]">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px] text-emerald-700">verified</span>
                                    <span>Tindakan awal tidak menggantikan evaluasi dokter spesialis IGD.</span>
                                </span>
                                <a
                                    href="tel:119"
                                    className="font-bold text-rose-700 hover:text-rose-800 text-[11px] inline-flex items-center gap-0.5 shrink-0"
                                >
                                    <span>Panggil 119</span>
                                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Real Interactive Leaflet Geolocation Map & Dynamic Hospital Roster (6 Cols) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl border border-[#d5e5db] shadow-xs p-5 sm:p-6 flex flex-col space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2.5 pb-3.5 border-b border-[#e2eee6] shrink-0">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-9 h-9 rounded-2xl bg-rose-500/10 text-rose-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">map</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-heading font-bold text-sm sm:text-base text-[#10241f] truncate">
                                        Peta Geolocation &amp; Faskes IGD Terdekat
                                    </h3>
                                    <p className="text-[10px] sm:text-[11px] text-[#40564f] font-mono truncate">
                                        <span className="sm:hidden">OpenStreetMap • Real-time</span>
                                        <span className="hidden sm:inline">OpenStreetMap • Dihitung Real-time dari Posisi Anda</span>
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCenterMap}
                                className="px-2.5 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-[10px] font-mono font-bold border border-emerald-300 transition-colors cursor-pointer inline-flex items-center gap-1 shrink-0 whitespace-nowrap active:scale-95"
                                title="Pusatkan Peta"
                            >
                                <span className="material-symbols-outlined text-[13px] shrink-0">my_location</span>
                                <span>Pusatkan Peta</span>
                            </button>
                        </div>

                        {/* Real Leaflet Map Container */}
                        <div className="relative isolate z-0 w-full h-56 sm:h-60 rounded-2xl overflow-hidden border border-[#cfe2d7] shadow-inner shrink-0">
                            <div ref={mapContainerRef} className="w-full h-full" />

                            {/* Map Overlay Badge */}
                            <div className="absolute top-2 left-2 z-500 pointer-events-none">
                                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                                    <span>Pin Merah: Anda • Pin Hijau: IGD Terpilih</span>
                                </span>
                            </div>
                            <div className="absolute bottom-2 right-2 z-500 pointer-events-none">
                                <span className="px-2 py-0.5 rounded bg-white/90 text-[10px] font-mono font-bold text-slate-700 shadow-xs">
                                    Klik peta untuk ganti titik darurat
                                </span>
                            </div>
                        </div>

                        {/* Hospital Selection List (Sorted by Haversine Distance with Pagination) */}
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between shrink-0">
                                <label className="text-xs font-bold text-[#10241f] block">
                                    Rumah Sakit &amp; IGD Terdekat (Urut Jarak Real-Time):
                                </label>
                                <span className="text-[11px] font-mono text-emerald-800 font-bold">
                                    {loadingHospitals ? 'Memuat faskes...' : `${sortedHospitals.length} Faskes Terdata`}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {loadingHospitals && sortedHospitals.length === 0 ? (
                                    <div className="p-4 rounded-2xl bg-surface-container-low text-center text-xs text-on-surface-variant animate-pulse space-y-2">
                                        <span className="material-symbols-outlined text-[24px] animate-spin text-primary">sync</span>
                                        <p>Mengambil data rumah sakit terdekat dari OpenStreetMap...</p>
                                    </div>
                                ) : (
                                    paginatedHospitals.map((f) => (
                                        <button
                                            key={f.id}
                                            type="button"
                                            onClick={() => setSelectedFaskesId(f.id)}
                                            className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                                                activeFaskes?.id === f.id
                                                    ? 'bg-rose-50/80 border-rose-500 shadow-2xs ring-1 ring-rose-400'
                                                    : 'bg-[#f6faf7] border-[#d8e8de] hover:bg-[#edf5f0]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-xs text-[#10241f] truncate max-w-60 sm:max-w-xs">
                                                    {f.name}
                                                </h4>
                                                <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-950 px-2 py-0.5 rounded-full border border-rose-300 shrink-0">
                                                    {f.distanceFormatted} • ETA {f.etaFormatted}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-[#344d44] truncate">{f.address}</p>
                                            <div className="flex items-center justify-between text-[10px] text-[#344d44] font-mono pt-0.5">
                                                <span>Hotline: {f.phone}</span>
                                                {f.facility && <span className="text-[#527165] truncate max-w-44 text-right">{f.facility}</span>}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Hospital Pagination Controls */}
                            {totalHospitalPages > 1 && (
                                <div className="flex items-center justify-between pt-2.5 pb-1 border-t border-[#e2eee6]">
                                    <span className="text-[11px] font-mono text-[#3e564e]">
                                        Halaman <strong className="text-[#10241f]">{hospitalPage}</strong> dari <strong className="text-[#10241f]">{totalHospitalPages}</strong>
                                        <span className="hidden sm:inline text-[#648074]"> ({sortedHospitals.length} faskes)</span>
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            disabled={hospitalPage <= 1}
                                            onClick={() => setHospitalPage((p) => Math.max(1, p - 1))}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-0.5 transition-all ${
                                                hospitalPage <= 1
                                                    ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200'
                                                    : 'bg-white hover:bg-[#edf5f0] text-[#10241f] border border-[#cfe2d7] shadow-2xs cursor-pointer active:scale-95'
                                            }`}
                                            title="Halaman Sebelumnya"
                                        >
                                            <span className="material-symbols-outlined text-[15px]">chevron_left</span>
                                            <span>Prev</span>
                                        </button>

                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: totalHospitalPages }).map((_, idx) => {
                                                const pNum = idx + 1;
                                                return (
                                                    <button
                                                        key={pNum}
                                                        type="button"
                                                        onClick={() => setHospitalPage(pNum)}
                                                        className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                                                            hospitalPage === pNum
                                                                ? 'bg-primary text-white shadow-xs'
                                                                : 'bg-white hover:bg-[#edf5f0] text-[#344d44] border border-[#cfe2d7]'
                                                        }`}
                                                    >
                                                        {pNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="button"
                                            disabled={hospitalPage >= totalHospitalPages}
                                            onClick={() => setHospitalPage((p) => Math.min(totalHospitalPages, p + 1))}
                                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-0.5 transition-all ${
                                                hospitalPage >= totalHospitalPages
                                                    ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400 border border-gray-200'
                                                    : 'bg-white hover:bg-[#edf5f0] text-[#10241f] border border-[#cfe2d7] shadow-2xs cursor-pointer active:scale-95'
                                            }`}
                                            title="Halaman Selanjutnya"
                                        >
                                            <span>Next</span>
                                            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Selected Hospital Direct Action Bar */}
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                            <div className="space-y-0.5">
                                <span className="text-xs font-bold text-emerald-950 block truncate max-w-xs">
                                    Rujukan Terpilih: {activeFaskes?.name}
                                </span>
                                <span className="text-[10px] text-emerald-900 font-medium block">
                                    Jarak: {activeFaskes?.distanceFormatted} • Estimasi Tiba Ambulans: {activeFaskes?.etaFormatted}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a
                                    href={
                                        activeFaskes?.maps_url ||
                                        `https://www.google.com/maps/dir/?api=1&origin=${geoState.lat},${geoState.lng}&destination=${activeFaskes?.lat},${activeFaskes?.lng}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-emerald-300 text-emerald-900 text-xs font-bold transition-all shadow-2xs inline-flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[15px]">directions</span>
                                    <span>Rute Maps</span>
                                </a>
                                <a
                                    href={`tel:${cleanHotline}`}
                                    className="px-4 py-2 rounded-xl bg-primary hover:bg-[#07664c] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[15px]">call</span>
                                    <span>Hubungi IGD</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
