import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

// ============================================================================
// Web Audio API Synthesizer: Quiet Luxury Medical Visual Novel Sound Engine
// ============================================================================
class MedicalAudio {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.bgmTimer = null;
        this.bgmStep = 0;
        // Relaxing acoustic progression: Fmaj7 - Dm7 - Gm7 - C7
        this.bgmNotes = [
            349.23, 440.00, 523.25, 659.25,
            293.66, 349.23, 440.00, 523.25,
            392.00, 466.16, 587.33, 698.46,
            261.63, 329.63, 392.00, 523.25
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            const now = this.ctx.currentTime;
            osc.frequency.setValueAtTime(640, now);
            osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    }

    playType() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const now = this.ctx.currentTime;
            osc.frequency.setValueAtTime(460 + Math.random() * 40, now);
            gain.gain.setValueAtTime(0.015, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.018);
        } catch (e) {}
    }

    playSuccess() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.05);
                gain.gain.setValueAtTime(0.08, now + idx * 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.05);
                osc.stop(now + idx * 0.05 + 0.15);
            });
        } catch (e) {}
    }

    playWarning() {
        if (this.muted) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            [340, 240, 180].forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(freq, now + idx * 0.07);
                gain.gain.setValueAtTime(0.1, now + idx * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.1);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + idx * 0.07);
                osc.stop(now + idx * 0.07 + 0.1);
            });
        } catch (e) {}
    }

    startBGM() {
        if (this.bgmTimer || this.muted) return;
        this.init();
        if (!this.ctx) return;

        this.bgmTimer = setInterval(() => {
            if (this.muted || !this.ctx) return;
            try {
                const freq = this.bgmNotes[this.bgmStep % this.bgmNotes.length];
                this.bgmStep++;
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.012, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.55);
            } catch (e) {}
        }, 650);
    }

    stopBGM() {
        if (this.bgmTimer) {
            clearInterval(this.bgmTimer);
            this.bgmTimer = null;
        }
    }
}

const audio = new MedicalAudio();

// ============================================================================
// Clinical Nutrition Database for Interactive Nutrition Checking ("Cek Kadar Gizi")
// ============================================================================
const NUTRITION_DATABASE = [
    {
        id: 'nasi_ayam_krispi',
        name: 'Paket Nasi Putih + Ayam Krispi Tepung + Es Teh Manis',
        category: 'lunch',
        calories: 840,
        sugar: 38,
        fiber: 1.8,
        sodium: 1350,
        gi: 'Tinggi (82)',
        gl: 'Tinggi (38)',
        impactTag: 'Lonjakan Glukosa Cepat & Stres Pankreas',
        cardioRisk: 'Tinggi (Minyak Goreng Jelantah & Natrium Berlebih)',
        hormoneImpact: 'Memicu Lonjakan Insulin & Memperparah Kram PMS',
        verdict: 'Hindari: Memicu kantuk berat jam 14:00 dan penumpukan lemak viseral.',
    },
    {
        id: 'pepes_ikan_bayam',
        name: 'Pepes Ikan Mas + Sayur Bening Bayam Wortel + Nasi Merah Separuh',
        category: 'lunch',
        calories: 380,
        sugar: 2,
        fiber: 8.5,
        sodium: 420,
        gi: 'Rendah (44)',
        gl: 'Rendah (9)',
        impactTag: 'Kurva Glukosa Datar & Sensitivitas Insulin Naik',
        cardioRisk: 'Sangat Aman (Omega-3 Melindungi Pembuluh Koroner)',
        hormoneImpact: 'Kaya Zat Besi & Magnesium untuk Fase Menstruasi',
        verdict: 'Rekomendasi Utama: Serat larut menahan absorpsi glukosa, protein ikan merangsang GLP-1.',
    },
    {
        id: 'sup_kakap_kalium',
        name: 'Sup Ikan Kakap Bening + Tempe Kukus + Nasi Jagung',
        category: 'heart',
        calories: 350,
        sugar: 1.5,
        fiber: 7.2,
        sodium: 380,
        gi: 'Rendah (40)',
        gl: 'Rendah (8)',
        impactTag: 'Kardioprotektif & Stabilisasi Tekanan Darah',
        cardioRisk: 'Sangat Rendah (Kalium Tinggi Melebarkan Dinding Arteri)',
        hormoneImpact: 'Meredakan Inflamasi Sistemik',
        verdict: 'Ideal untuk Penderita Hipertensi & Pra-Diabetes: Membantu menjaga elastisitas pembuluh darah.',
    },
    {
        id: 'bayam_tahu_zat_besi',
        name: 'Tumis Bayam Tahu Sutra + Telur Rebus (Menu Fase Luteal)',
        category: 'women',
        calories: 290,
        sugar: 1.0,
        fiber: 6.8,
        sodium: 320,
        gi: 'Sangat Rendah (32)',
        gl: 'Sangat Rendah (4)',
        impactTag: 'Regenerasi Sel Darah & Pengatur Dopamin Alami',
        cardioRisk: 'Aman',
        hormoneImpact: 'Menggantikan Kehilangan Darah Haid & Mencegah Sugar Craving',
        verdict: 'Pilihan Emas Fase Luteal: Magnesium meredakan kram uterus dan menstabilkan suasana hati.',
    },
    {
        id: 'donat_martabak',
        name: 'Donat Lapis Gula Pasir / Martabak Manis Cokelat Keju',
        category: 'snack',
        calories: 460,
        sugar: 44,
        fiber: 0.8,
        sodium: 540,
        gi: 'Tinggi (88)',
        gl: 'Sangat Tinggi (42)',
        impactTag: 'Hipoglikemia Reaktif & Beban Lemak Trans',
        cardioRisk: 'Tinggi (Mempercepat Plak Aterosklerosis)',
        hormoneImpact: 'Memicu Sugar Crash Parah 60 Menit Kemudian',
        verdict: 'Jebakan Dopamin: Mengenyangkan sesaat namun merusak kurva metabolisme seharian.',
    },
    {
        id: 'almond_dark_choco',
        name: 'Segenggam Kacang Almond Panggang + Dark Chocolate 85%',
        category: 'snack',
        calories: 190,
        sugar: 3.5,
        fiber: 5.2,
        sodium: 20,
        gi: 'Sangat Rendah (25)',
        gl: 'Sangat Rendah (3)',
        impactTag: 'Energi Berkelanjutan & Neuroprotektif',
        cardioRisk: 'Melindungi Jantung (Antioksidan Polifenol & HDL Naik)',
        hormoneImpact: 'Meredakan Stres Hormonal & Mengenyangkan Tahan Lama',
        verdict: 'Camilan Cerdas: Lemak tak jenuh ganda dan polifenol meredam peradangan sel.',
    },
    {
        id: 'boba_brown_sugar',
        name: 'Minuman Boba Susu Gula Aren Ukuran Sedang',
        category: 'drink',
        calories: 420,
        sugar: 48,
        fiber: 0.2,
        sodium: 210,
        gi: 'Sangat Tinggi (92)',
        gl: 'Ekstrem (45)',
        impactTag: 'Bom Fruktosa Cair & Perlemakan Hati',
        cardioRisk: 'Menaikkan Trigliserida Darah Secara Agresif',
        hormoneImpact: 'Memperparah Resistensi Insulin Akut',
        verdict: 'Bahaya Metabolik: Fruktosa cair langsung diproses menjadi lemak oleh organ hati.',
    },
    {
        id: 'infused_water_mint',
        name: 'Air Mineral Dingin dengan Irisan Lemon & Daun Mint',
        category: 'drink',
        calories: 8,
        sugar: 0.5,
        fiber: 0.5,
        sodium: 5,
        gi: 'Nol (0)',
        gl: 'Nol (0)',
        impactTag: 'Optimalisasi Filtrasi Ginjal & Hidrasi Sel',
        cardioRisk: 'Menjaga Viskositas Darah Tetap Encer',
        hormoneImpact: 'Menyegarkan Otak Tanpa Lonjakan Insulin',
        verdict: 'Pilihan Sempurna: Membantu pengeluaran kelebihan glukosa melalui filtrasi ginjal alami.',
    },
];

export default function MetabolicStoryGame() {
    // Game Navigation States: 'prologue', 'select_patient', 'chapter_story', 'chapter_choice', 'chapter_outcome', 'ending'
    const [gameState, setGameState] = useState('prologue');
    const [soundOn, setSoundOn] = useState(true);
    const [selectedCharId, setSelectedCharId] = useState('sarah'); // Default to Sarah to showcase the female menstrual cycle feature requested
    const [chapterIndex, setChapterIndex] = useState(0); // 0..5 (6 Deep Chapters)

    // Visual Novel Typewriter Engine States
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [typeSpeed, setTypeSpeed] = useState(16); // 26 (slow), 16 (normal), 8 (fast)
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
    const [selectedFoodFilter, setSelectedFoodFilter] = useState('all');
    const [inspectedFood, setInspectedFood] = useState(NUTRITION_DATABASE[1]);
    const [lastChosen, setLastChosen] = useState(null);

    // Player Clinical Biomarkers
    const [metrics, setMetrics] = useState({
        glucose: 162,
        hba1c: 6.5,
        energy: 45,
        adherenceScore: 75,
        history: [],
    });

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [clockString, setClockString] = useState('08:00');
    const gameContainerRef = useRef(null);
    const typingTimerRef = useRef(null);
    const autoPlayTimerRef = useRef(null);

    // Dialog history backlog
    const [dialogHistory, setDialogHistory] = useState([]);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setClockString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateClock();
        const t = setInterval(updateClock, 30000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        return () => {
            audio.stopBGM();
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
        };
    }, []);

    const toggleSound = () => {
        const next = !soundOn;
        setSoundOn(next);
        audio.muted = !next;
        if (next) {
            audio.init();
            audio.startBGM();
        } else {
            audio.stopBGM();
        }
    };

    const toggleFullscreen = () => {
        if (!gameContainerRef.current) return;
        if (!document.fullscreenElement) {
            gameContainerRef.current.requestFullscreen?.().catch(() => {});
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.().catch(() => {});
            setIsFullscreen(false);
        }
    };

    // ============================================================================
    // Real Clinical Patient Personas with Distinct Medical Branching
    // ============================================================================
    const characters = {
        sarah: {
            id: 'sarah',
            name: 'Sarah Nindya',
            age: 34,
            gender: 'Perempuan',
            role: 'Brand Strategist & Ibu Bekerja',
            specialCaseTitle: 'Kesehatan Wanita & Fluktuasi Hormon Menstruasi',
            avatar: '/image/habit_morning_walk.jpg',
            baseGlucose: 162,
            baseHbA1c: 6.5,
            initialStatus: 'Resistensi Insulin Hormonal • Fase Luteal (Pra-Menstruasi) & Sugar Craving',
            symptomHistory:
                'Setiap 7 hari menjelang menstruasi (fase luteal), Sarah mengalami lonjakan resistensi insulin fisiologis. Progesteron tinggi memicu rasa lapar karbohidrat hebat (PMS craving), kram perut parah, migrain mendadak 1 jam pasca kopi susu, dan lingkar pinggang membesar.',
            complaint:
                'Menjelang haid, tubuh saya selalu bergetar dan menuntut makanan manis secara kompulsif. Saat jam 3 sore energi saya mendadak ambruk total, perut kram, dan kepala terasa berkabut berat.',
            caseFocus:
                'Manajemen lonjakan glukosa pada fase luteal, substitusi mikronutrien zat besi & magnesium, dan pencegahan risiko PCOS.',
        },
        hendro: {
            id: 'hendro',
            name: 'Ir. Hendro Wibowo',
            age: 52,
            gender: 'Laki-laki',
            role: 'Manajer Proyek Konstruksi',
            specialCaseTitle: 'Komorbid Kardiovaskular, Tekanan Darah & Neuropati',
            avatar: '/image/doctor_bramantyo.jpg',
            baseGlucose: 178,
            baseHbA1c: 6.9,
            initialStatus: 'Pra-Diabetes Menetap • Hipertensi 145/92 mmHg & Tanda Aterosklerosis Jantung',
            symptomHistory:
                'Memiliki riwayat keluarga penyakit jantung dan diabetes melitus. Mengeluhkan sensasi kebas dan kesemutan tebal di ujung jari kaki saat bangun tidur (neuropati perifer awal), nafas terasa berat saat naik tangga proyek, dan luka lecet sepatu lambat sembuh.',
            complaint:
                'Ujung jari kaki saya sering terasa tebal dan kebas. Selain itu, dada saya terasa agak berat saat kelelahan di proyek. Saya cemas terkena serangan jantung koroner seperti almarhum ayah saya.',
            caseFocus:
                'Pencegahan plak aterosklerosis pembuluh darah koroner, penurunan natrium garam, perlindungan miokardium, dan rekam EKG.',
        },
        dimas: {
            id: 'dimas',
            name: 'Dimas Aryo',
            age: 29,
            gender: 'Laki-laki',
            role: 'Software Engineer',
            specialCaseTitle: 'Gaya Hidup Sedenter & Sugar Crash Pasca-Makan',
            avatar: '/image/doctor_consultation.jpg',
            baseGlucose: 154,
            baseHbA1c: 6.3,
            initialStatus: 'Pra-Diabetes Awal • Sedentary 10 Jam & Nokturia Nokturnal',
            symptomHistory:
                'Bekerja 10 hingga 12 jam duduk statis di depan monitor. Kerap mengalami postprandial somnolence (kantuk berat 30 menit pasca makan siang), polidipsia haus malam hari, dan buang air kecil hingga 3 kali saat jam tidur.',
            complaint:
                'Badan saya sering gemetar dan kepala terasa berkabut jika belum minum minuman manis. Saya kira ini hanya kelelahan kerja biasa, tetapi akhir-akhir ini semakin mengganggu.',
            caseFocus:
                'Aktivasi enzim AMPK dan transporter GLUT4 melalui jeda gerak statis, restriksi karbohidrat sederhana di kantin kantor.',
        },
    };

    const activeChar = characters[selectedCharId] || characters.sarah;

    // ============================================================================
    // Comprehensive Prologue: The Silent Phase Before Sickness
    // ============================================================================
    const prologueScript = [
        {
            speaker: 'Narator Medis',
            text: 'Fasilitas Pelayanan Kesehatan Primer Puskesmas AEVYRA. Pagi hari yang sibuk di poli rawat jalan.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: 'Narator Medis',
            text: 'Banyak orang berasumsi bahwa gangguan metabolik datang secara tiba-tiba dalam semalam. Padahal secara biologis, tubuh selalu mengirimkan sinyal peringatan bertahun-tahun sebelum vonis dijatuhkan.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: activeChar.name,
            text: activeChar.complaint,
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: 'Narator Medis',
            text: activeChar.gender === 'Perempuan'
                ? 'Pada wanita, fluktuasi hormon estrogen dan progesteron sepanjang siklus haid berpengaruh langsung terhadap sensitivitas insulin. Fase luteal seringkali memperparah resistensi insulin hingga tiga puluh persen.'
                : 'Pada usia di atas 45 tahun atau pekerja dengan stres tinggi, kelebihan glukosa dalam darah bereaksi dengan protein membentuk produk akhir glikasi (AGEs) yang mengikis dinding arteri jantung dan serabut saraf.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: 'dr. H. Bramantyo, Sp.PD',
            text: 'Kabar baiknya, fase pra-diabetes ini adalah jendela emas terakhir. Sel-sel beta di pankreas Anda belum mati; mereka hanya mengalami kelelahan berat karena terus-menerus dipaksa memproduksi insulin dalam jumlah besar.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: 'Ns. Nadia (Perawat Triase Puskesmas)',
            text: 'Jika kita bertindak sekarang melalui intervensi nutrisi terarah, pengecekan kadar gizi yang cermat, dan bimbingan telemedisin aktif, metabolisme tubuh Anda dapat pulih seratus persen tanpa obat seumur hidup.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
        {
            speaker: 'Sistem Terpadu AEVYRA',
            text: 'Mari kita telusuri perjalanan pasien ini: dari deteksi dini gejala awal di Puskesmas, evaluasi klinis spesifik kondisi pasien, bimbingan chat telemedisin, hingga tercapainya remisi metabolik penuh.',
            bg: '/image/story/vn_puskesmas_exterior.jpg',
        },
    ];

    // ============================================================================
    // Dynamic Chapter Generator Based on Active Patient Condition
    // ============================================================================
    const getDynamicChapters = () => {
        if (selectedCharId === 'sarah') {
            // SARAH: Women's Health, Luteal Phase / Menstrual Cycle & Hormonal Insulin Resistance
            return [
                {
                    id: 'chapter_triage',
                    timelineLabel: 'Triase & Skrining Hormonal',
                    time: '08:15 WIB',
                    phase: 'Babak 1: Triase Khusus Siklus Menstruasi & Glukosa di Puskesmas',
                    location: 'Loket Triase Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_triage.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 08:15 WIB di loket triase Puskesmas AEVYRA. Sarah duduk berhadapan dengan Ners Nadia sambil memegang perut bagian bawah yang terasa nyeri tumpul.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Selamat pagi Ibu Sarah. Saya perhatikan wajah Anda agak pucat dan tampak menahan nyeri. Berdasarkan catatan pendaftaran, Anda berada pada hari ke-24 siklus menstruasi (fase luteal)?',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Betul, Suster... Setiap minggu sebelum haid, tubuh saya selalu gemetar hebat jika tidak makan makanan manis. Tapi setelah minum kopi susu manis, kepala saya malah pusing berdenyut dan badan lemas total.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Mari kita periksa tanda vital: tekanan darah Anda 118/78 mmHg. Sekarang saya usapkan alkohol pada ujung jari manis untuk tes glukosa kapiler...',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Klik halus terdengar saat jarum lancet disentuhkan. Tetes darah kapiler terbaca oleh sensor glukometer digital.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Glukometer berbunyi bip: Angka menunjukkan 162 mg/dL! Nilai ini cukup tinggi untuk kondisi puasa. Peningkatan hormon progesteron saat fase luteal secara biologis memang memicu resistensi insulin sementara pada jaringan otot.',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Apakah lonjakan gula ini membahayakan kesuburan saya, Suster? Apakah ini ada hubungannya dengan risiko PCOS?',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Sangat berkaitan. Resistensi insulin yang dibiarkan dapat memicu hiperinsulinemia yang mengganggu pematangan sel telur. Sebelum bertemu dr. Bramantyo, langkah pemeriksaan apa yang ingin Anda prioritaskan hari ini?',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c1_hormone_lab',
                            code: 'Pilihan A',
                            label: 'Pemeriksaan Darah Vena Terpadu: HbA1c, Profil Hormon Reproduksi, dan Kadar Ferritin (Zat Besi)',
                            desc: 'Mengevaluasi rata-rata glukosa 90 hari, cadangan zat besi pasca-haid, dan keseimbangan rasio estrogen-progesteron.',
                            deltaGlucose: -15,
                            deltaEnergy: +15,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Keputusan klinis sangat tepat untuk wanita usia reproduktif. Mengetahui cadangan zat besi dan HbA1c memberikan dasar komprehensif bagi dr. Bramantyo untuk menyusun terapi gizi anti-inflamasi.',
                            reaction: 'Ns. Nadia melengkapi formulir laboratorium flebotomi darah vena.',
                        },
                        {
                            id: 'sarah_c1_fast_consult',
                            code: 'Pilihan B',
                            label: 'Konsultasi Langsung ke Poli Penyakit Dalam untuk Diskusi Gejala Dismenore & Kelelahan Hormonal',
                            desc: 'Membahas riwayat menstruasi tidak teratur dan lonjakan nafsu makan manis bersama dokter spesialis.',
                            deltaGlucose: -8,
                            deltaEnergy: +10,
                            deltaHbA1c: 0,
                            type: 'healthy',
                            feedback:
                                'Tindakan proaktif. dr. Bramantyo segera meninjau korelasi antara siklus haid dan disregulasi glikemik Sarah.',
                            reaction: 'Sarah dipersilakan menuju ruang periksa spesialis penyakit dalam.',
                        },
                        {
                            id: 'sarah_c1_sugar_pill',
                            code: 'Pilihan C',
                            label: 'Meminta Obat Pereda Nyeri Haid Saja dan Menunda Pemeriksaan Glukosa Lanjutan',
                            desc: 'Menganggap lonjakan glukosa 162 mg/dL hanya efek sesaat PMS yang akan hilang dengan sendirinya.',
                            deltaGlucose: +25,
                            deltaEnergy: -20,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Medis: Obat analgesik hanya membius rasa nyeri tanpa mengatasi peradangan selular akibat hiperglikemia. Sel beta pankreas tetap menerima beban glikemik berat.',
                            reaction: 'Ns. Nadia memberi edukasi mendalam mengenai bahaya menunda intervensi metabolik pada fase pra-diabetes.',
                        },
                    ],
                },
                {
                    id: 'chapter_doctor',
                    timelineLabel: 'Poli Dokter Sp.PD',
                    time: '09:30 WIB',
                    phase: 'Babak 2: Telaah dr. Bramantyo Mengenai Hormon Wanita & Insulin',
                    location: 'Ruang Pemeriksaan Dokter Spesialis Penyakit Dalam',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Selamat pagi Ibu Sarah. Saya sudah mempelajari lembar triase Ners Nadia. Anda mengalami korelasi klasik antara fase luteal siklus haid dan resistensi insulin moderat.',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Dok, mengapa setiap minggu sebelum haid tubuh saya seperti menuntut makanan manis tanpa kendali? Apakah itu sekadar kelemahan tekad saya?',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Bukan kelemahan tekad, Bu Sarah. Ini adalah dorongan neuro-endokrin. Pada fase luteal, kadar hormon serotonin di otak menurun. Otak Anda mencari cara tercepat menaikkan serotonin dengan memicu dorongan konsumsi karbohidrat manis.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Namun pada saat yang bersamaan, progesteron tinggi menghambat translokasi reseptor GLUT4 pada sel otot. Akibatnya, gula menumpuk di darah hingga 162 mg/dL alih-alih masuk ke sel menjadi energi.',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Bagaimana cara memutus rantai lingkaran setan ini, Dok?',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Kuncinya adalah terapi nutrisi mikronutrien: kita harus mencukupi asupan magnesium untuk kofaktor enzim metabolisme glukosa dan zat besi untuk oksigenasi sel. Anda akan dibimbing langsung oleh instruktur gizi klinis kami via chat telemedisin.',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c2_commit',
                            code: 'Pilihan A',
                            label: 'Berkomitmen Menjalankan Protokol Gizi Siklus Hormonal 90 Hari Bersama Instruktur via Chat',
                            desc: 'Menerima panduan diet kaya magnesium, zat besi organik, dan serat larut untuk menstabilkan fase menstruasi.',
                            deltaGlucose: -28,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Protokol resmi disepakati. dr. Bramantyo mendaftarkan Sarah ke modul telemedisin khusus kesehatan hormonal wanita AEVYRA.',
                            reaction: 'dr. Bramantyo: "Ini langkah terbaik. Anda akan merasakan haid bulan depan jauh lebih nyaman tanpa sugar crash."',
                        },
                        {
                            id: 'sarah_c2_birth_control',
                            code: 'Pilihan B',
                            label: 'Meminta Resep Pil Kontrasepsi Hormonal Saja Tanpa Bersedia Memperbaiki Asupan Gula Harian',
                            desc: 'Mencoba menekan gejala hormon secara instan tanpa memperbaiki resistensi insulin mendasar.',
                            deltaGlucose: +15,
                            deltaEnergy: -10,
                            deltaHbA1c: +0.1,
                            type: 'warning',
                            feedback:
                                'Evaluasi Spesialis: Pil hormonal sintetis tanpa modifikasi gaya hidup justru dapat memperberat beban filtrasi hati dan memperburuk resistensi insulin jangka panjang.',
                            reaction: 'Dokter menjelaskan pentingnya pembenahan nutrisi alami sebagai fondasi utama.',
                        },
                        {
                            id: 'sarah_c2_inspect_tool',
                            code: 'Pilihan C',
                            label: 'Kombinasi Terpadu: Program Edukasi Gizi + Pengecekan Kadar Gizi Makanan Real-Time di Ponsel',
                            desc: 'Menggunakan fitur kalkulator gizi AEVYRA untuk memastikan setiap makanan rendah gula dan tinggi magnesium.',
                            deltaGlucose: -32,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.4,
                            type: 'healthy',
                            feedback:
                                'Sangat efektif. Sarah memiliki kendali penuh untuk memeriksa kadar gizi piring makan sebelum memutuskan suapan pertama.',
                            reaction: 'Dokter mengaktifkan fitur Inspektur Gizi pada profil SatuSehat Sarah.',
                        },
                    ],
                },
                {
                    id: 'chapter_chat',
                    timelineLabel: 'Chat Instruktur Gizi',
                    time: '12:30 WIB',
                    phase: 'Babak 3: Bimbingan Chat Khusus Nutrisi Fase Haid bersama Bu Sani, S.Gz',
                    location: 'Meja Konsultasi Telemedisin AEVYRA Care',
                    bg: '/image/story/vn_telemed_chat.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 12:30 WIB di kantor. Sarah membuka ponselnya. Ruang obrolan telemedisin terhubung langsung dengan Bu Sani, S.Gz.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Selamat siang Ibu Sarah. Saya Bu Sani, instruktur gizi klinis Anda. dr. Bramantyo telah meneruskan catatan mengenai fase luteal dan keluhan craving manis Anda. Bagaimana kondisi perut siang ini?',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Siang Bu Sani... Rekan kantor memesan paket ayam krispi jumbo dan minuman boba brown sugar. Perut saya kram dan rasanya ingin sekali menyeruput boba manis dingin untuk meredakan stres.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Waspada, Bu Sarah! Satu gelas boba mengandung hingga 48 gram gula cair murni tanpa serat pelindung. Jika dikonsumsi saat fase luteal, glukosa Anda akan meroket tajam ke 210 mg/dL lalu anjlok, memicu kram uterus makin hebat.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Mari kita buka fitur "Cek Kadar Gizi". Pilihlah menu kaya magnesium dan zat besi untuk merilekskan otot polos rahim dan memulihkan dopamin tanpa lonjakan glukosa.',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c3_magnesium_plate',
                            code: 'Pilihan A',
                            label: 'Pesan Tumis Bayam Tahu Sutra + Telur Rebus + Nasi Merah Separuh & Air Mineral Lemon Mint',
                            desc: 'Menyuplai 8.5 gram serat larut, magnesium alami untuk meredakan kram haid, serta protein pengikat glukosa.',
                            deltaGlucose: -24,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.2,
                            type: 'healthy',
                            feedback:
                                'Bu Sani memuji di chat: "Pilihan menu brilian! Magnesium dalam bayam merelaksasi dinding uterus sehingga kram haid reda, sementara protein telur menjaga rasa kenyang stabil."',
                            reaction: 'Dua jam kemudian di kantor, Sarah merasa segar dan kram perutnya mereda alami.',
                        },
                        {
                            id: 'sarah_c3_emergency_drink',
                            code: 'Pilihan B',
                            label: 'Terlanjur Menyeruput 3 Teguk Boba Rekan Kerja dan Meminta Panduan Koreksi Darurat di Chat',
                            desc: 'Jujur berkonsultasi kepada instruktur setelah mengonsumsi 15 gram gula cair sukrosa.',
                            deltaGlucose: +12,
                            deltaEnergy: +5,
                            deltaHbA1c: 0,
                            type: 'warning',
                            feedback:
                                'Respons Cepat Bu Sani: "Terima kasih atas kejujurannya. Segera minum dua gelas air hangat perasan lemon dan lakukan jalan santai 10 menit untuk memicu serapan glukosa otot."',
                            reaction: 'Sarah segera bangkit dari meja kerja dan berjalan aktif di koridor kantor.',
                        },
                        {
                            id: 'sarah_c3_boba_binge',
                            code: 'Pilihan C',
                            label: 'Menutup Aplikasi Chat dan Menghabiskan Segelas Boba Bersama Sepotong Donat Manis',
                            desc: 'Menyerah pada dorongan emosional fase luteal tanpa memedulikan pemantauan gizi.',
                            deltaGlucose: +50,
                            deltaEnergy: -30,
                            deltaHbA1c: +0.4,
                            type: 'danger',
                            feedback:
                                'Peringatan Darurat: Beban glikemik ekstrem memicu lonjakan glukosa ke 215 mg/dL. Satu jam kemudian, Sarah mengalami migrain hebat dan kram perut tak tertahankan.',
                            reaction: 'Sarah terpaksa izin pulang lebih awal dari kantor karena tubuhnya lunglai.',
                        },
                    ],
                },
                {
                    id: 'chapter_craving',
                    timelineLabel: 'Krisis Sore Jam 16:00',
                    time: '16:00 WIB',
                    phase: 'Babak 4: Mengatasi Serangan Craving Pra-Haid di Meja Kerja',
                    location: 'Ruang Kerja Kantor Sore Hari',
                    bg: '/image/story/vn_office_afternoon.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 16:00 WIB. Jam rawan saat penurunan kortisol sirkadian bertemu dengan puncak ketidakseimbangan neurotransmiter fase luteal.',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Rekan di sebelah meja membawa sekotak martabak manis keju cokelat. Aromanya memenuhi seluruh ruangan kerja.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Pesan Pengingat Chat)',
                            text: 'Tring! Notifikasi AEVYRA masuk: "Ibu Sarah, ingat bahwa craving manis sore ini adalah sinyal sel saraf yang kekurangan mikronutrien, bukan kekurangan gula pasir. Lindungi pembuluh darah Anda!"',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Saya harus mengambil keputusan cerdas untuk melewati godaan sore ini tanpa merusak hasil yang sudah dicapai sejak pagi.',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c4_almond_dark',
                            code: 'Pilihan A',
                            label: 'Konsumsi Segenggam Kacang Almond Panggang + Sepotong Dark Chocolate 85% & Air Putih Dingin',
                            desc: 'Memberikan polifenol antioksidan, magnesium tinggi, dan lemak tak jenuh rantai tunggal pemuas rasa lapar.',
                            deltaGlucose: -14,
                            deltaEnergy: +28,
                            deltaHbA1c: -0.2,
                            type: 'healthy',
                            feedback:
                                'Pilihan Cerdas: Polifenol dark chocolate meningkatkan sensitivitas reseptor insulin sementara magnesium menuntaskan rasa lapar otak tanpa membebani pankreas.',
                            reaction: 'Rasa ingin ngemil lenyap total. Sarah dapat menyelesaikan presentasi sore dengan fokus tajam.',
                        },
                        {
                            id: 'sarah_c4_stretching',
                            code: 'Pilihan B',
                            label: 'Melakukan Peregangan Panggul Ringan 5 Menit di Ruang Istirahat Sambil Minum Teh Chamomile',
                            desc: 'Meredakan spasme otot rahim dan menstimulasi sistem saraf parasimpatis.',
                            deltaGlucose: -10,
                            deltaEnergy: +20,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Tindakan Menenangkan: Teh chamomile menekan mediator inflamasi prostaglandin, meredakan rasa begah perut secara efektif.',
                            reaction: 'Kram perut mereda dan Sarah merasa rileks tanpa butuh camilan manis.',
                        },
                        {
                            id: 'sarah_c4_martabak_fail',
                            code: 'Pilihan C',
                            label: 'Menyerah dan Memakan Dua Potong Martabak Manis Cokelat Keju Tebal',
                            desc: 'Memasukkan lebih dari 55 gram gula pasir sukrosa dan lemak jenuh jenuh trans.',
                            deltaGlucose: +45,
                            deltaEnergy: -25,
                            deltaHbA1c: +0.3,
                            type: 'danger',
                            feedback:
                                'Beban Glikemik Berat: Glukosa kembali meroket, memperparah retensi cairan tubuh dan membuat perut terasa sangat begah saat perjalanan pulang.',
                            reaction: 'Sarah merasa bersalah dan tubuhnya gemetar saat menyetir pulang ke rumah.',
                        },
                    ],
                },
                {
                    id: 'chapter_milestone',
                    timelineLabel: 'Evaluasi Mandiri H+30',
                    time: '06:00 WIB (H+30)',
                    phase: 'Babak 5: Menstruasi yang Bebas Nyeri & Glukometer Mandiri',
                    location: 'Meja Makan Rumah yang Asri & Pemantauan Mandiri',
                    bg: '/image/story/vn_recovery_healthy.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Tiga puluh hari berlalu. Pagi hari yang cerah di rumah Sarah. Hari ini adalah hari pertama siklus menstruasi berikutnya.',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: 'Luar biasa... Untuk pertama kalinya dalam tiga tahun, menstruasi saya datang tanpa rasa sakit kram dismenore yang melumpuhkan! Tidak ada migrain, tidak ada rasa mual, dan mood saya sangat stabil.',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Sarah menyalakan alat tes glukometer mandiri di meja makan dan meneteskan sampel darah puasa pagi...',
                        },
                        {
                            speaker: 'Sarah Nindya',
                            text: `Layar glukometer berbunyi bip pendek: 98 mg/dL! Dari titik awal 162 mg/dL sebulan lalu, angka ini membuktikan bahwa perbaikan nutrisi siklus hormonal berhasil memulihkan sensitivitas insulin saya secara nyata.`,
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Chat Telemedisin AEVYRA)',
                            text: 'Selamat Ibu Sarah! Keberhasilan ini membuktikan bahwa fase luteal dapat dinavigasi dengan sukses melalui asupan gizi yang tepat. Mari kita kunci pencapaian ini menuju evaluasi remisi 90 hari di Puskesmas.',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c5_maintain',
                            code: 'Pilihan A',
                            label: 'Mempertahankan Disiplin Menu Piring Gizi Ramah Hormon dan Rutinitas Jalan Pagi 30 Menit',
                            desc: 'Menjaga ritme tidur sirkadian 7 jam dan asupan magnesium harian menjelang uji lab resmi.',
                            deltaGlucose: -16,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Hasil Optimal: Keseimbangan aksis hipotalamus-hipofisis-ovarium terlindungi, memastikan fungsi sel beta pankreas tetap prima.',
                            reaction: 'Sarah menyongsong evaluasi 90 hari di Puskesmas dengan rasa percaya diri penuh.',
                        },
                        {
                            id: 'sarah_c5_relax_too_early',
                            code: 'Pilihan B',
                            label: 'Menghentikan Pemantauan Karena Merasa Sudah Sembuh dan Kembali Menyeruput Kopi Susu Manis',
                            desc: 'Terjebak rasa aman palsu sebelum evaluasi medis lengkap 90 hari selesai diverifikasi.',
                            deltaGlucose: +20,
                            deltaEnergy: -15,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Relaps: Pemulihan sel beta pankreas membutuhkan stabilitas minimal 90 hari penuh. Bu Sani segera mengingatkan Sarah di chat telemedisin.',
                            reaction: 'Bu Sani memotivasi Sarah agar tetap disiplin menjaga konsistensi hingga garis akhir.',
                        },
                    ],
                },
                {
                    id: 'chapter_remission',
                    timelineLabel: 'Hasil Remisi H+90',
                    time: '08:30 WIB (H+90)',
                    phase: 'Babak 6: Evaluasi Klinis Lengkap di Puskesmas & Sertifikat Remisi Kemenkes',
                    location: 'Ruang Pemeriksaan Poli Penyakit Dalam Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Hari ke-90. Sarah kembali ke Puskesmas AEVYRA. Langkah kakinya terasa mantap dan wajahnya berseri cerah.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Selamat pagi Ibu Sarah! Hasil uji darah vena lengkap dari laboratorium patologi klinik sudah ada di meja dr. Bramantyo.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Mari kita lihat data laboratorium resmi ini bersama-sama: Glukosa puasa Anda: 86 mg/dL! Dan kadar HbA1c Anda turun spektakuler dari 6.5% menjadi 5.2% (Rentang Non-Diabetes Sempurna).',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Siklus menstruasi Anda kini teratur 28 hari, gejala PMS mereda total, dan lingkar pinggang berkurang 6 sentimeter. Ini adalah keberhasilan remisi metabolik hormonal sejati!',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Atas nama Puskesmas AEVYRA dan sistem kesehatan SatuSehat Kemenkes RI, kami dengan bangga menerbitkan Sertifikat Remisi Metabolik Hormonal Grade A untuk Anda.',
                        },
                    ],
                    choices: [
                        {
                            id: 'sarah_c6_lifestyle_lock',
                            code: 'Pilihan A',
                            label: 'Mengunci Kebiasaan Sehat Seumur Hidup: Gizi Sadar Hormon, Hidrasi Cukup, dan Skrining Berkala',
                            desc: 'Menjaga kesehatan organ reproduksi, pankreas, dan pembuluh darah hingga masa menopause kelak.',
                            deltaGlucose: -10,
                            deltaEnergy: +35,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Keberhasilan Paripurna: Sarah terbebas dari ancaman diabetes melitus tipe 2 dan memiliki ketahanan metabolik prima untuk masa depan.',
                            reaction: 'dr. Bramantyo menyerahkan sertifikat resmi SatuSehat Kemenkes bertandatangan digital.',
                        },
                        {
                            id: 'sarah_c6_women_ambassador',
                            code: 'Pilihan B',
                            label: 'Menjadi Duta Edukasi Kesehatan Hormonal bagi Komunitas Perempuan dan Rekan Kerja',
                            desc: 'Mengedukasi rekan perempuan mengenai kaitan erat siklus haid, resistensi insulin, dan pilihan gizi.',
                            deltaGlucose: -8,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Dampak Sosial Berkelanjutan: Pengalaman nyata Sarah menginspirasi puluhan wanita lain untuk tidak menyepelekan gejala pra-haid.',
                            reaction: 'Puskesmas memberikan apresiasi pasien teladan program pencegahan penyakit tidak menular.',
                        },
                    ],
                },
            ];
        } else if (selectedCharId === 'hendro') {
            // HENDRO: Cardiovascular Comorbid, Heart Risk, Hypertension (145/92 mmHg) & Neuropathy
            return [
                {
                    id: 'chapter_triage',
                    timelineLabel: 'Triase Jantung & Glukosa',
                    time: '08:15 WIB',
                    phase: 'Babak 1: Triase Tekanan Darah, EKG & Glukosa di Puskesmas',
                    location: 'Loket Triase Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_triage.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 08:15 WIB. Ir. Hendro Wibowo duduk di kursi triase Puskesmas. Langkah kakinya agak berhati-hati karena sensasi kebas pada ujung jari kaki.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Selamat pagi Bapak Hendro. Dari berkas pendaftaran, Bapak menuliskan keluhan dada terasa agak berat saat menaiki tangga proyek dan ujung jari kaki sering kesemutan tebal?',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Betul Suster... Almarhum ayah saya dulu meninggal karena komplikasi jantung dan diabetes. Akhir-akhir ini nafas saya cepat tersengal dan kaki saya rasanya tebal seperti memakai kaos kaki tebal.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Manset tensimeter dipasang... Tekanan darah Bapak tercatat 145/92 mmHg (Hipertensi Derajat 1). Sekarang mari kita cek kadar gula darah kapiler Bapak...',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Jarum lancet steril disentuhkan pada ujung jari. Bunyi bip sensor glukometer terdengar nyaring.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Gula darah kapiler Bapak menunjukkan angka 178 mg/dL. Ini angka yang cukup tinggi. Kombinasi hipertensi dan glukosa di atas 170 mg/dL memberikan beban mekanis dan osmotik yang berat pada pembuluh darah koroner jantung Anda.',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Apakah pembuluh darah jantung saya sudah mulai tersumbat, Suster? Apa langkah medis darurat yang harus kita lakukan?',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Kita harus bertindak cepat namun terukur. Berikut pilihan alur triase terpadu sebelum Bapak masuk ke ruang periksa dr. Bramantyo:',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c1_ecg_lab',
                            code: 'Pilihan A',
                            label: 'Pemeriksaan Rekam Jantung (EKG 12-Lead) + Pengambilan Darah Vena (Profil Lipid & HbA1c)',
                            desc: 'Memeriksa ada tidaknya iskemia otot jantung, rasio trigliserida/HDL, dan derajat glikasi hemoglobin.',
                            deltaGlucose: -15,
                            deltaEnergy: +15,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Tindakan klinis sangat tepat untuk pasien risiko tinggi kardio-metabolik. Hasil EKG dan profil lipid memberikan data vital untuk mencegah serangan jantung koroner dini.',
                            reaction: 'Ns. Nadia segera mengarahkan Hendro ke ruang EKG dan laboratorium.',
                        },
                        {
                            id: 'hendro_c1_doctor_priority',
                            code: 'Pilihan B',
                            label: 'Rujukan Prioritas Konsultasi Poli Penyakit Dalam untuk Evaluasi Neuropati Perifer & Tensi',
                            desc: 'Pemeriksaan fisik monofilamen pada telapak kaki dan auskultasi bunyi katup jantung bersama dr. Bramantyo.',
                            deltaGlucose: -8,
                            deltaEnergy: +10,
                            deltaHbA1c: 0,
                            type: 'healthy',
                            feedback:
                                'Langkah tanggap. dr. Bramantyo dapat langsung melakukan uji sensibilitas saraf perifer dan evaluasi suara jantung.',
                            reaction: 'Hendro dipersilakan menuju ruang poli spesialis penyakit dalam satu.',
                        },
                        {
                            id: 'hendro_c1_ignore_pressure',
                            code: 'Pilihan C',
                            label: 'Meminta Obat Pereda Kesemutan Saja Karena Harus Segera Kembali Mengawasi Pengecoran Proyek',
                            desc: 'Mengabaikan tensi 145/92 mmHg dan glukosa 178 mg/dL demi urusan pekerjaan konstruksi.',
                            deltaGlucose: +28,
                            deltaEnergy: -20,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Bahaya Medis: Mengabaikan hipertensi dan hiperglikemia bersamaan meningkatkan risiko kejadian kardiovaskular akut hingga 4 kali lipat. Ns. Nadia segera menghentikan pasien demi keselamatannya.',
                            reaction: 'Ns. Nadia menahan pasien dengan tegas dan memberikan penjelasan mengenai risiko serangan jantung mendadak.',
                        },
                    ],
                },
                {
                    id: 'chapter_doctor',
                    timelineLabel: 'Poli Dokter Sp.PD',
                    time: '09:30 WIB',
                    phase: 'Babak 2: Diagnosis dr. Bramantyo Mengenai Jantung & Pembuluh Darah',
                    location: 'Ruang Pemeriksaan Dokter Spesialis Penyakit Dalam',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Silakan duduk Pak Hendro. Rekaman EKG Anda menunjukkan irama sinus reguler tanpa tanda infark akut, namun ada sedikit tanda beban ventrikel kiri akibat tekanan darah tinggi yang berlangsung lama.',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Alhamdulillah belum ada serangan jantung, Dok... Tapi apa kaitan antara gula darah 178 mg/dL dengan kesehatan jantung dan rasa kebas di kaki saya?',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Molekul glukosa bebas yang berlebihan di dalam darah akan mengikat dinding endotel arteri koroner, memicu reaksi peradangan mikro dan mempercepat penumpukan plak kolesterol jahat (aterosklerosis).',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Sementara itu, pembuluh darah mikro (vasa nervorum) yang memberi makan serabut saraf di kaki Anda mulai menyempit, menyebabkan saraf kekurangan oksigen. Itulah asal muasal rasa tebal dan kesemutan di ujung jari kaki Anda.',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Apakah pembuluh darah dan saraf saya ini masih bisa dipulihkan, Dok?',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Bisa, Pak Hendro! Dengan menurunkan beban gula dan natrium secara drastis dalam 90 hari, elastisitas pembuluh darah Anda akan kembali membaik. Instruktur gizi klinis kami akan memantau piring makan ramah jantung Anda setiap hari via telemedisin.',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c2_cardio_diet',
                            code: 'Pilihan A',
                            label: 'Berkomitmen Mengikuti Program Remisi Gizi Kardioprotektif (Rendah Natrium & Indeks Glikemik Rendah)',
                            desc: 'Membatasi garam di bawah 2000 mg/hari, memperbanyak asam lemak omega-3 kalium, dan pemantauan chat harian.',
                            deltaGlucose: -28,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Protokol resmi disetujui. dr. Bramantyo mengaktifkan program pendampingan SatuSehat khusus pencegahan penyakit kardiovaskular.',
                            reaction: 'Dokter: "Pilihan terbaik Pak Hendro. Kita lindungi jantung dan saraf kaki Anda dari kerusakan permanen."',
                        },
                        {
                            id: 'hendro_c2_pills_only',
                            code: 'Pilihan B',
                            label: 'Meminta Tambahan Obat Kimia Penurun Tensi dan Gula Tanpa Mau Mengurangi Makanan Bersantan',
                            desc: 'Mengandalkan farmakoterapi tanpa mengubah kebiasaan makan gulai dan gorengan di lapangan proyek.',
                            deltaGlucose: +15,
                            deltaEnergy: -10,
                            deltaHbA1c: +0.1,
                            type: 'warning',
                            feedback:
                                'Evaluasi Dokter: Obat tidak dapat mengimbangi kerusakan pembuluh darah akibat konsumsi lemak jenuh dan garam berlebih secara terus menerus.',
                            reaction: 'dr. Bramantyo menjelaskan risiko gagal jantung kongestif jika pola makan tidak diperbaiki.',
                        },
                        {
                            id: 'hendro_c2_inspect_sodium',
                            code: 'Pilihan C',
                            label: 'Kombinasi Terpadu: Program Remisi + Pengecekan Kadar Gizi Natrium & Gula Sebelum Makan',
                            desc: 'Menggunakan fitur Inspektur Gizi AEVYRA untuk memastikan setiap makanan di proyek rendah garam dan bebas lemak trans.',
                            deltaGlucose: -32,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.4,
                            type: 'healthy',
                            feedback:
                                'Langkah modern yang luar biasa. Memeriksa kandungan natrium dan gula makanan sebelum makan adalah perisai terbaik bagi penderita hipertensi.',
                            reaction: 'dr. Bramantyo memandu Hendro membuka fitur kalkulator gizi di ponselnya.',
                        },
                    ],
                },
                {
                    id: 'chapter_chat',
                    timelineLabel: 'Chat Instruktur Gizi',
                    time: '12:30 WIB',
                    phase: 'Babak 3: Bimbingan Chat Khusus Menu Ramah Jantung bersama Bu Sani, S.Gz',
                    location: 'Meja Konsultasi Telemedisin AEVYRA Care',
                    bg: '/image/story/vn_telemed_chat.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 12:30 WIB di mess proyek konstruksi. Hendro membuka aplikasi AEVYRA Care dan menerima pesan dari Bu Sani.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Selamat siang Pak Hendro. Saya Bu Sani. dr. Bramantyo telah memberikan instruksi mengenai tekanan darah 145/92 mmHg dan gula darah 178 mg/dL Anda. Bagaimana kondisi dada dan kaki siang ini?',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Siang Bu Sani... Rekan-rekan kontraktor baru saja membeli nasi padang gulai kikil sapi, rendang, dan sambal cabai hijau asin. Wanginya luar biasa sedap, tapi saya ingat pesan dokter tentang garam dan lemak jenuh.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Bagus sekali Anda menahan diri, Pak Hendro! Kuah gulai santan pekat dan garam cabai asin mengandung lebih dari 1800 mg natrium dalam satu porsi. Itu bisa membuat tensi Anda melonjak seketika dan membebani arteri jantung.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Silakan gunakan tombol "Cek Kadar Gizi" di atas untuk memeriksa menu alternatif. Kita butuh kalium tinggi untuk membantu ginjal membuang kelebihan garam dan serat larut untuk menahan glukosa.',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c3_fish_soup',
                            code: 'Pilihan A',
                            label: 'Pesan Sup Ikan Kakap Bening Kuah Sayur + Tempe Kukus + Nasi Jagung & Air Putih Hangat',
                            desc: 'Hanya 380 mg natrium, kaya asam lemak omega-3 EPA/DHA untuk meredakan inflamasi dinding pembuluh koroner.',
                            deltaGlucose: -24,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.2,
                            type: 'healthy',
                            feedback:
                                'Bu Sani membalas: "Menu sempurna untuk jantung dan saraf Anda, Pak Hendro! Asam lemak omega-3 ikan kakap memperbaiki elastisitas endotel pembuluh darah dan menstabilkan ritme jantung."',
                            reaction: 'Dua jam kemudian, dada Hendro terasa lapang dan nafasnya sangat ringan.',
                        },
                        {
                            id: 'hendro_c3_salt_rescue',
                            code: 'Pilihan B',
                            label: 'Terlanjur Mencicipi Dua Sendok Kuah Gulai Santan dan Meminta Arahan Penyelamatan di Chat',
                            desc: 'Jujur mengabarkan kepada instruktur setelah mengonsumsi santan berlemak dan garam tinggi.',
                            deltaGlucose: +10,
                            deltaEnergy: +5,
                            deltaHbA1c: 0,
                            type: 'warning',
                            feedback:
                                'Respons Cepat Bu Sani: "Terima kasih atas kejujurannya. Segera minum dua gelas air putih hangat untuk mengencerkan kepekatan natrium, lalu duduk santai sambil latihan pernapasan dalam 10 menit."',
                            reaction: 'Hendro melakukan latihan napas diafragma dan denyut nadinya kembali stabil.',
                        },
                        {
                            id: 'hendro_c3_padang_binge',
                            code: 'Pilihan C',
                            label: 'Menutup Aplikasi Chat dan Menghabiskan Seporsi Penuh Nasi Padang Gulai Kikil Serta Es Teh Manis',
                            desc: 'Menyerah pada godaan rasa gurih santan minyak jelantah dan gula cair.',
                            deltaGlucose: +52,
                            deltaEnergy: -30,
                            deltaHbA1c: +0.4,
                            type: 'danger',
                            feedback:
                                'Peringatan Kritis: Beban natrium dan lemak jenuh ekstrem memicu lonjakan tekanan darah ke 158/98 mmHg dan glukosa 225 mg/dL. Hendro merasakan tengkuk lehernya kaku dan jantung berdebar keras.',
                            reaction: 'Hendro terpaksa beristirahat di ruang kesehatan proyek karena kepalanya berputar pusing.',
                        },
                    ],
                },
                {
                    id: 'chapter_craving',
                    timelineLabel: 'Krisis Sore Jam 16:00',
                    time: '16:00 WIB',
                    phase: 'Babak 4: Mengatasi Kelelahan & Godaan Kudapan Asin di Kantor Proyek',
                    location: 'Area Kantor Proyek Konstruksi',
                    bg: '/image/story/vn_office_afternoon.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 16:00 WIB. Jam rawan saat kelelahan fisik di lapangan memicu keinginan tubuh untuk mencari stimulus kafein manis dan camilan gurih.',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Mandor proyek menyeduh kopi hitam sachet bergula tebal dan meletakkan sepiring bakwan goreng tepung renyah bergaram di meja rapat.',
                        },
                        {
                            speaker: 'Mandor Proyek',
                            text: 'Pak Hendro, ayo seruput kopi manis dan gorengannya dulu biar tidak loyo mengawasi pengecoran semen sore ini!',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Pesan Pengingat Chat)',
                            text: 'Tring! Notifikasi AEVYRA masuk: "Pak Hendro, gorengan tepung asin mengandung lemak trans yang langsung memicu plak aterosklerosis pembuluh koroner. Pertahankan komitmen pemulihan jantung Anda!"',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c4_walk_banana',
                            code: 'Pilihan A',
                            label: 'Makan 1 Buah Pisang Ambon Kaya Kalium + Seduh Teh Hijau Tanpa Gula & Jalan Santai 10 Menit',
                            desc: 'Menyuplai 450 mg kalium untuk menurunkan tekanan darah dan polifenol EGCG untuk elastisitas arteri.',
                            deltaGlucose: -16,
                            deltaEnergy: +28,
                            deltaHbA1c: -0.2,
                            type: 'healthy',
                            feedback:
                                'Pilihan Brilian: Kalium alami pisang menyeimbangkan pompa natrium-kalium pada miokardium jantung, membuat denyut nadi tenang dan tekanan darah turun.',
                            reaction: 'Rasa lelah sirna dan Hendro dapat mengawasi proyek sore dengan stamina stabil.',
                        },
                        {
                            id: 'hendro_c4_warm_water',
                            code: 'Pilihan B',
                            label: 'Minum 2 Gelas Air Putih Hangat dan Melakukan Peregangan Betis untuk Sirkulasi Kaki',
                            desc: 'Mendorong sirkulasi balik vena dari tungkai bawah menuju jantung.',
                            deltaGlucose: -10,
                            deltaEnergy: +20,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Aktivasi Sirkulasi Perifer: Peregangan betis memompa aliran darah vena ke jantung dan mengurangi sensasi kebas di ujung jari kaki.',
                            reaction: 'Sensasi tebal di kaki berkurang dan langkah kaki terasa lebih mantap.',
                        },
                        {
                            id: 'hendro_c4_gorengan_fail',
                            code: 'Pilihan C',
                            label: 'Menyerah dan Memakan Tiga Buah Bakwan Goreng Tepung Serta Kopi Sachet Manis',
                            desc: 'Memasukkan 40 gram karbohidrat tepung olahan, minyak goreng jenuh, dan 30 gram sukrosa.',
                            deltaGlucose: +42,
                            deltaEnergy: -25,
                            deltaHbA1c: +0.3,
                            type: 'danger',
                            feedback:
                                'Beban Vaskular Berat: Tekanan darah kembali melonjak dan glukosa meroket tajam, menyebabkan tengkuk kaku dan nafas tersengal saat meninjau lapangan.',
                            reaction: 'Hendro merasa dadanya berdebar tidak nyaman saat berjalan menuju area pengecoran.',
                        },
                    ],
                },
                {
                    id: 'chapter_milestone',
                    timelineLabel: 'Evaluasi Mandiri H+30',
                    time: '06:00 WIB (H+30)',
                    phase: 'Babak 5: Pemantauan Tensi 122/80 & Glukometer Mandiri di Rumah',
                    location: 'Meja Makan Rumah yang Asri & Pemantauan Mandiri',
                    bg: '/image/story/vn_recovery_healthy.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Satu bulan berlalu. Suasana pagi yang damai di rumah Hendro. Sinar matahari pagi menyinari alat tensimeter digital dan glukometer di atas meja makan.',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Manset tensimeter dipompa otomatis... Layar menampilkan angka: 122/80 mmHg! Tekanan darah saya kembali ke batas normal sempurna tanpa obat penurun tensi kimia berdosis tinggi.',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Hendro meneteskan sampel darah puasa pada strip glukometer digital...',
                        },
                        {
                            speaker: 'Ir. Hendro Wibowo',
                            text: 'Glukometer berbunyi bip: 102 mg/dL! Dan yang paling membahagiakan, rasa kebas tebal di ujung jari kaki saya saat bangun tidur berkurang lebih dari 70 persen!',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Chat Telemedisin AEVYRA)',
                            text: 'Alhamdulillah! Ini adalah bukti nyata bahwa pembuluh darah mikro vasa nervorum Anda mulai pulih dan suplai oksigen ke saraf kaki kembali lancar. Pertahankan menu rendah natrium ini hingga evaluasi akhir 90 hari.',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c5_maintain',
                            code: 'Pilihan A',
                            label: 'Mempertahankan Disiplin Menu Rendah Natrium, Jalan Kaki Pagi 30 Menit, dan Tidur Teratur',
                            desc: 'Menjaga elastisitas arteri koroner dan sensitivitas sel beta pankreas menjelang uji lab resmi.',
                            deltaGlucose: -16,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Protokol Optimal: Jantung, pembuluh darah, dan serabut saraf tepi Hendro terlindungi dari komplikasi permanen.',
                            reaction: 'Hendro menyongsong jadwal evaluasi akhir di Puskesmas dengan rasa syukur mendalam.',
                        },
                        {
                            id: 'hendro_c5_relax',
                            code: 'Pilihan B',
                            label: 'Merasa Sudah Sembuh dan Kembali Mengonsumsi Kopi Manis Serta Makanan Asin di Proyek',
                            desc: 'Terjebak rasa aman sebelum evaluasi medis lengkap disahkan oleh dokter spesialis.',
                            deltaGlucose: +22,
                            deltaEnergy: -15,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Relaps: Remisi kardio-metabolik membutuhkan kestabilan minimal 90 hari. Bu Sani segera mengirimkan peringatan di chat telemedisin.',
                            reaction: 'Bu Sani mendampingi Hendro agar tetap menjaga disiplin pola makan sehatnya.',
                        },
                    ],
                },
                {
                    id: 'chapter_remission',
                    timelineLabel: 'Hasil Remisi H+90',
                    time: '08:30 WIB (H+90)',
                    phase: 'Babak 6: Evaluasi Kardioprotektif di Puskesmas & Sertifikat Remisi Kemenkes',
                    location: 'Ruang Pemeriksaan Poli Penyakit Dalam Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Hari ke-90. Hendro tiba di Puskesmas AEVYRA dengan langkah kaki yang tegap, tanpa ada lagi keraguan atau rasa kebas di kakinya.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Selamat pagi Pak Hendro! Hasil uji rekam jantung EKG ulang dan profil lipid lengkap sudah selesai ditelaah dr. Bramantyo.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Hasil luar biasa Pak Hendro. Tekanan darah stabil 120/80 mmHg, gula darah puasa 88 mg/dL, HbA1c turun dari 6.9% menjadi 5.4%, dan kadar trigliserida Anda turun lebih dari separuh (dari 240 menjadi 105 mg/dL)!',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Sensasi kebas neuropati perifer Anda hilang total dan risiko aterosklerosis pembuluh koroner berhasil ditekan ke batas sangat aman.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Atas nama Puskesmas AEVYRA dan sistem SatuSehat Kemenkes RI, kami secara resmi menerbitkan Sertifikat Remisi Kardio-Metabolik Grade A untuk Anda.',
                        },
                    ],
                    choices: [
                        {
                            id: 'hendro_c6_lifetime',
                            code: 'Pilihan A',
                            label: 'Mengunci Gaya Hidup Ramah Jantung Seumur Hidup: Gizi Alami, Olahraga Aerobik Terukur & Skrining 6 Bulan',
                            desc: 'Melindungi miokardium jantung dan pembuluh darah agar tetap sehat bugar hingga usia lanjut.',
                            deltaGlucose: -10,
                            deltaEnergy: +35,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Keberhasilan Paripurna: Hendro membuktikan bahwa risiko komplikasi penyakit jantung dan diabetes dapat dibalikkan dengan ketelatenan gaya hidup.',
                            reaction: 'dr. Bramantyo menandatangani sertifikat pemulihan klinis pasien dan menyerahkannya secara resmi.',
                        },
                        {
                            id: 'hendro_c6_safety_ambassador',
                            code: 'Pilihan B',
                            label: 'Menerapkan Standar Kesehatan Preventif bagi Seluruh Pekerja Proyek Konstruksi di Lapangannya',
                            desc: 'Menyediakan fasilitas air mineral dan makanan bergizi seimbang di kantin proyek untuk melindungi ratusan mandor dan tukang.',
                            deltaGlucose: -8,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Dampak Nyata bagi Lingkungan Kerja: Inisiatif Hendro menyelamatkan banyak pekerja konstruksi dari ancaman penyakit tidak menular.',
                            reaction: 'Puskesmas memberikan piagam penghargaan mitra industri peduli kesehatan preventif.',
                        },
                    ],
                },
            ];
        } else {
            // DIMAS: Sedentary IT Worker, Screen Fatigue, Nocturia & Postprandial Crashes
            return [
                {
                    id: 'chapter_triage',
                    timelineLabel: 'Triase Puskesmas',
                    time: '08:15 WIB',
                    phase: 'Babak 1: Triase & Skrining Glukosa di Ruang Tunggu Puskesmas',
                    location: 'Loket Triase Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_triage.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 08:15 WIB. Koridor Puskesmas AEVYRA mulai dipadati warga. Dimas duduk menunggu giliran dengan mata yang lelah akibat begadang dan sering terbangun buang air kecil.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Nomor antrean B-043, silakan menuju loket triase satu. Selamat pagi Mas Dimas. Dari formulir pendaftaran, Anda menuliskan keluhan lemas berat pasca makan siang dan haus berlebihan?',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: activeChar.complaint,
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Tekanan darah Anda 130/85 mmHg, lingkar pinggang 92 cm. Sekarang mari kita ambil sampel darah kapiler di ujung jari manis Anda...',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Klik halus terdengar saat jarum lancet menembus kulit ujung jari manis.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: `Glukometer berbunyi bip: ${activeChar.baseGlucose} mg/dL. Nilai glukosa sewaktu ini berada di atas ambang normal puasa. Kapasitas regulasi insulin tubuh Anda sedang kewalahan.`,
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c1_lab',
                            code: 'Pilihan A',
                            label: 'Ambil Sampel Darah Vena untuk Pemeriksaan Laboratorium Lengkap (HbA1c & Profil Lipid)',
                            desc: 'Mendapatkan data objektif rata-rata glukosa 90 hari terakhir dan rasio trigliserida/HDL.',
                            deltaGlucose: -15,
                            deltaEnergy: +15,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Keputusan klinis tepat. dr. Bramantyo memiliki data akurat untuk memetakan derajat resistensi insulin Dimas.',
                            reaction: 'Ns. Nadia mencetak formulir pengantar lab darah vena.',
                        },
                        {
                            id: 'dimas_c1_doctor',
                            code: 'Pilihan B',
                            label: 'Rujukan Prioritas Konsultasi Langsung ke Poli Penyakit Dalam Bersama dr. Bramantyo',
                            desc: 'Mendiskusikan korelasi gaya hidup duduk 10 jam di depan laptop dengan kelelahan sel beta pankreas.',
                            deltaGlucose: -8,
                            deltaEnergy: +10,
                            deltaHbA1c: 0,
                            type: 'healthy',
                            feedback:
                                'Tindakan proaktif. Rekam medis elektronik Dimas langsung diteruskan ke meja dr. Bramantyo.',
                            reaction: 'Dimas menerima nomor antrean poli spesialis penyakit dalam.',
                        },
                        {
                            id: 'dimas_c1_delay',
                            code: 'Pilihan C',
                            label: 'Meremehkan Hasil Tes Karena Urusan Coding Kantor dan Meminta Resep Vitamin Saja',
                            desc: 'Menganggap gejala ini hanya akibat kelelahan kerja biasa di depan monitor.',
                            deltaGlucose: +25,
                            deltaEnergy: -20,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Medis Serius: Menunda penanganan saat glukosa di atas 150 mg/dL membiarkan proses glikasi protein terus merusak endotel pembuluh darah mikro mata dan ginjal.',
                            reaction: 'Ns. Nadia menahan pasien dengan penuh empati agar tidak menunda pengobatan.',
                        },
                    ],
                },
                {
                    id: 'chapter_doctor',
                    timelineLabel: 'Poli Dokter Sp.PD',
                    time: '09:30 WIB',
                    phase: 'Babak 2: Diagnosis dr. Bramantyo Mengenai Gaya Hidup Sedenter & Sel Beta',
                    location: 'Ruang Pemeriksaan Dokter Spesialis Penyakit Dalam',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Silakan duduk Mas Dimas. Saya sudah membaca lembar triase Ners Nadia. Anda mengalami resistensi insulin klasik pada pekerja teknologi yang duduk statis 10 jam sehari.',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: 'Dok, apakah sel beta pankreas saya sudah rusak permanen? Kenapa setiap habis makan siang kepala saya seperti tertimpa beban karung beras?',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Sel beta Anda belum mati; mereka hanya kelelahan hebat. Saat Anda duduk statis seharian, protein pengangkut glukosa GLUT4 di otot paha dan betis Anda tidur pulas. Akibatnya gula menumpuk di darah dan memicu sugar crash.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Solusi terbaik adalah intervensi gizi terpandu 90 hari dan protokol jeda gerak aktif. Anda akan didampingi instruktur gizi klinis kami via chat telemedisin.',
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c2_commit',
                            code: 'Pilihan A',
                            label: 'Berkomitmen Menjalani Program Remisi Gizi Terpadu 90 Hari Bersama Instruktur via Chat',
                            desc: 'Mengadopsi pola piring makan rendah glikemik dan mengirimkan foto konsumsi harian.',
                            deltaGlucose: -28,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Keputusan tepat. dr. Bramantyo mengaktifkan modul telemedisin pemantauan SatuSehat Dimas.',
                            reaction: 'Dokter: "Selamat Mas Dimas. Kita kembalikan fungsi metabolisme Anda ke performa puncak."',
                        },
                        {
                            id: 'dimas_c2_drug_only',
                            code: 'Pilihan B',
                            label: 'Meminta Obat Kimia Penurun Glukosa Tanpa Bersedia Mengurangi Porsi Nasi Putih Kantin',
                            desc: 'Memilih jalan pintas farmakologis tanpa memperbaiki faktor pemicu utama di meja makan.',
                            deltaGlucose: +15,
                            deltaEnergy: -10,
                            deltaHbA1c: +0.1,
                            type: 'warning',
                            feedback:
                                'Evaluasi Dokter: Obat oral tidak akan mampu menahan lonjakan glukosa jika asupan karbohidrat sederhana tidak diperbaiki.',
                            reaction: 'dr. Bramantyo memberikan penjelasan mengenai pentingnya perbaikan gaya hidup.',
                        },
                        {
                            id: 'dimas_c2_inspect_tool',
                            code: 'Pilihan C',
                            label: 'Kombinasi Terpadu: Program Remisi + Pengecekan Kadar Gizi Makanan Real-Time di Aplikasi',
                            desc: 'Menggunakan fitur Inspektur Gizi AEVYRA untuk memindai beban gula makanan sebelum dikonsumsi.',
                            deltaGlucose: -32,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.4,
                            type: 'healthy',
                            feedback:
                                'Pendekatan sangat efektif. Mengetahui takaran gula tersembunyi memberi perlindungan penuh sebelum makan siang.',
                            reaction: 'Dokter mengaktifkan fitur Inspektur Gizi pada aplikasi pasien.',
                        },
                    ],
                },
                {
                    id: 'chapter_chat',
                    timelineLabel: 'Chat Instruktur Gizi',
                    time: '12:30 WIB',
                    phase: 'Babak 3: Bimbingan Chat Khusus Menu Kantin bersama Bu Sani, S.Gz',
                    location: 'Meja Konsultasi Telemedisin AEVYRA Care',
                    bg: '/image/story/vn_telemed_chat.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 12:30 WIB di kantor. Dimas membuka notifikasi obrolan telemedisin dari Bu Sani.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Selamat siang Mas Dimas. Saya Bu Sani, instruktur gizi klinis Anda. Bagaimana suasana istirahat makan siang di kantor?',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: 'Siang Bu Sani... Teman-teman kantor memesan paket ayam krispi jumbo, nasi putih porsi ganda, dan es teh manis jumbo. Saya bingung harus memesan apa agar tidak mengantuk jam 2 nanti.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Paket tersebut mengandung lebih dari 800 kalori dengan beban glikemik sangat tinggi! Gunakan tombol "Cek Kadar Gizi" di atas untuk melihat detailnya. Pilihlah menu seimbang dengan serat bayam atau pepes ikan.',
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c3_pepes_plate',
                            code: 'Pilihan A',
                            label: 'Pesan Pepes Ikan + Sayur Bening Bayam Wortel Porsi Ganda + Nasi Merah Separuh & Air Putih',
                            desc: 'Kaya serat larut untuk menahan absorpsi glukosa dan protein berkualitas untuk merangsang hormon GLP-1.',
                            deltaGlucose: -24,
                            deltaEnergy: +25,
                            deltaHbA1c: -0.2,
                            type: 'healthy',
                            feedback:
                                'Bu Sani membalas: "Komposisi piring Anda luar biasa! Serat bayam melapisi usus halus sehingga karbohidrat diserap perlahan. Anda terbebas dari kantuk siang."',
                            reaction: 'Dua jam kemudian di depan monitor, Dimas tetap segar dan fokus menyelesaikan baris kodenya.',
                        },
                        {
                            id: 'dimas_c3_tea_rescue',
                            code: 'Pilihan B',
                            label: 'Terlanjur Menyeruput Es Teh Manis Kantin dan Meminta Langkah Koreksi Darurat di Chat',
                            desc: 'Jujur berkonsultasi setelah mengonsumsi 200 ml minuman bergula sukrosa cair.',
                            deltaGlucose: +12,
                            deltaEnergy: +5,
                            deltaHbA1c: 0,
                            type: 'warning',
                            feedback:
                                'Respons Cepat Bu Sani: "Segera minum dua gelas air putih hangat, lalu lakukan jalan aktif di koridor kantor selama 10 menit untuk memicu serapan glukosa oleh otot rangka."',
                            reaction: 'Dimas segera berdiri dan berjalan aktif di koridor kantor.',
                        },
                        {
                            id: 'dimas_c3_junk_binge',
                            code: 'Pilihan C',
                            label: 'Menutup Aplikasi Chat dan Mengonsumsi Paket Nasi Gorengan Serta Minuman Bersoda',
                            desc: 'Memilih menyerah pada godaan makan siang tanpa memedulikan pemantauan telemedisin.',
                            deltaGlucose: +48,
                            deltaEnergy: -28,
                            deltaHbA1c: +0.3,
                            type: 'danger',
                            feedback:
                                'Peringatan Telemetri: Glukosa melonjak tajam ke 205 mg/dL. Satu jam kemudian, Dimas merasakan kantuk berat tak tertahankan dan kepala pusing.',
                            reaction: 'Dimas tertidur di meja kerja dan pekerjaannya terbengkalai.',
                        },
                    ],
                },
                {
                    id: 'chapter_craving',
                    timelineLabel: 'Krisis Sore Jam 16:00',
                    time: '16:00 WIB',
                    phase: 'Babak 4: Mengatasi Serangan Kantuk & Donat Manis di Kantor',
                    location: 'Area Kantor & Konsultasi Chat Lanjutan',
                    bg: '/image/story/vn_office_afternoon.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Pukul 16:00 WIB. Jam rawan saat penurunan kortisol alami tubuh menuntut suntikan glukosa cepat untuk memicu dopamin.',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: 'Rekan di sebelah meja membawa sekotak donat tabur gula cokelat dan mengajak minum kopi instan sachet manis.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Pesan Pengingat Chat)',
                            text: 'Tring! Notifikasi AEVYRA masuk: "Mas Dimas, waspada hipoglikemia reaktif sore hari. Otak Anda hanya butuh hidrasi dan aktivasi otot soleus, bukan donat berlemak trans!"',
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c4_almond_walk',
                            code: 'Pilihan A',
                            label: 'Minum 2 Gelas Air Putih Dingin + Segenggam Kacang Almond Panggang & Jalan Kaki 10 Menit',
                            desc: 'Mengaktifkan translokasi protein GLUT4 pada otot paha tanpa memerlukan sekresi insulin tambahan.',
                            deltaGlucose: -18,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Aktivasi Fisiologis Alami: Kontraksi otot bekerja seperti spons yang menyedot kelebihan glukosa darah langsung. Rasa kantuk hilang total.',
                            reaction: 'Aliran darah segar mengalir ke otak dan Dimas kembali fokus menuntaskan kodenya.',
                        },
                        {
                            id: 'dimas_c4_soleus_push',
                            code: 'Pilihan B',
                            label: 'Melakukan Latihan Pompa Otot Soleus di Bawah Meja Kerja Sambil Minum Teh Hijau Hangat',
                            desc: 'Memanfaatkan serat otot oksidatif lambat soleus yang membakar glukosa lokal saat duduk.',
                            deltaGlucose: -10,
                            deltaEnergy: +20,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Trik Ergonomis Efektif: Pompa otot soleus meningkatkan oksidasi glukosa lokal tanpa menimbulkan kelelahan fisik berlebih.',
                            reaction: 'Dimas merasa kakinya lebih ringan dan rasa kantuk mereda.',
                        },
                        {
                            id: 'dimas_c4_donut_fail',
                            code: 'Pilihan C',
                            label: 'Menyerah Pada Godaan dan Menghabiskan 2 Donat Manis Beserta Kopi Instan Kemasan',
                            desc: 'Memasukkan 45 gram sukrosa dan lemak jenuh trans tepat sebelum jam pulang kerja.',
                            deltaGlucose: +42,
                            deltaEnergy: -25,
                            deltaHbA1c: +0.3,
                            type: 'danger',
                            feedback:
                                'Beban Glikemik Tinggi: Glukosa kembali melonjak tajam, memicu stres oksidatif pada sel pembuluh darah dan membuat tubuh gemetar saat menyetir pulang.',
                            reaction: 'Dimas merasa lemas berat saat perjalanan pulang ke rumah.',
                        },
                    ],
                },
                {
                    id: 'chapter_milestone',
                    timelineLabel: 'Evaluasi Mandiri H+30',
                    time: '06:00 WIB (H+30)',
                    phase: 'Babak 5: Membangun Konsistensi Mandiri & Uji Glukometer di Rumah',
                    location: 'Meja Makan Rumah yang Asri & Pemantauan Mandiri',
                    bg: '/image/story/vn_recovery_healthy.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Tiga puluh hari berlalu. Pagi hari yang cerah di rumah Dimas. Udara fajar terasa sejuk menyegarkan.',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: 'Saya terbangun pukul 05:30 tanpa alarm. Badan terasa begitu ringan, tidak ada lagi rasa haus mencekik di tengah malam, dan saya tidur 7 jam nyenyak tanpa terbangun buang air kecil!',
                        },
                        {
                            speaker: 'Narator Medis',
                            text: 'Dimas meneteskan sampel darah puasa pagi pada alat glukometer mandiri...',
                        },
                        {
                            speaker: 'Dimas Aryo',
                            text: 'Layar glukometer berbunyi bip pendek: 96 mg/dL! Dari titik awal 154 mg/dL sebulan lalu, angka ini membuktikan sel beta pankreas saya benar-benar pulih bernapas lega.',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Chat Telemedisin AEVYRA)',
                            text: 'Selamat Mas Dimas! Kualitas tidur dan energi Anda meningkat drastis. Mari kita kunci pencapaian ini menuju evaluasi remisi 90 hari di Puskesmas.',
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c5_maintain',
                            code: 'Pilihan A',
                            label: 'Mempertahankan Disiplin Menu Piring Gizi, Rutinitas Jalan Pagi 30 Menit, dan Tidur Teratur 7 Jam',
                            desc: 'Menjaga ritme sirkadian dan kebugaran metabolik menjelang uji lab resmi.',
                            deltaGlucose: -16,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.3,
                            type: 'healthy',
                            feedback:
                                'Protokol Optimal: Sinergi antara nutrisi utuh, kebugaran fisik, dan regenerasi sel saat tidur nyenyak memulihkan sensitivitas insulin hingga tingkat optimal.',
                            reaction: 'Dimas menyongsong jadwal evaluasi 90 hari di Puskesmas dengan percaya diri.',
                        },
                        {
                            id: 'dimas_c5_relax',
                            code: 'Pilihan B',
                            label: 'Menghentikan Pemantauan Karena Merasa Sudah Sembuh dan Kembali Begadang Sambil Ngemil Manis',
                            desc: 'Terjebak rasa aman palsu sebelum evaluasi medis lengkap 90 hari disahkan oleh dokter.',
                            deltaGlucose: +22,
                            deltaEnergy: -15,
                            deltaHbA1c: +0.2,
                            type: 'danger',
                            feedback:
                                'Peringatan Relaps: Remisi metabolik membutuhkan konsistensi minimal 90 hari agar sel darah merah lama digantikan sepenuhnya. Bu Sani segera mengingatkan Dimas di chat.',
                            reaction: 'Bu Sani memotivasi Dimas agar tidak lengah menjelang garis akhir.',
                        },
                    ],
                },
                {
                    id: 'chapter_remission',
                    timelineLabel: 'Hasil Remisi H+90',
                    time: '08:30 WIB (H+90)',
                    phase: 'Babak 6: Evaluasi Klinis Lengkap di Puskesmas & Sertifikat Remisi Kemenkes',
                    location: 'Ruang Pemeriksaan Poli Penyakit Dalam Puskesmas AEVYRA',
                    bg: '/image/story/vn_puskesmas_doctor.jpg',
                    script: [
                        {
                            speaker: 'Narator Medis',
                            text: 'Hari ke-90. Dimas kembali ke Puskesmas AEVYRA dengan langkah ringan dan senyum penuh optimisme.',
                        },
                        {
                            speaker: 'Ns. Nadia (Perawat Triase)',
                            text: 'Selamat pagi Mas Dimas! Hasil uji lab vena komprehensif sudah keluar dari bagian patologi klinik.',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Mari kita telaah bersama: Gula darah puasa Anda: 86 mg/dL! HbA1c turun dari 6.3% menjadi 5.3% (Non-Diabetes Sempurna). Dan lingkar pinggang Anda berkurang 7 sentimeter!',
                        },
                        {
                            speaker: 'Bu Sani, S.Gz (Instruktur Gizi Klinis)',
                            text: 'Skor kepatuhan chat telemedisin Anda luar biasa. Anda membuktikan bahwa pra-diabetes dapat dibalikkan seratus persen tanpa obat seumur hidup!',
                        },
                        {
                            speaker: 'dr. H. Bramantyo, Sp.PD',
                            text: 'Atas nama Puskesmas AEVYRA dan sistem kesehatan SatuSehat Kemenkes RI, kami secara resmi menerbitkan Sertifikat Remisi Metabolik Grade A untuk Anda.',
                        },
                    ],
                    choices: [
                        {
                            id: 'dimas_c6_lifetime',
                            code: 'Pilihan A',
                            label: 'Mengunci Kebiasaan Sehat Seumur Hidup: Gizi Utuh, Kebugaran Fisik, dan Skrining Berkala 6 Bulan',
                            desc: 'Menjadikan gaya hidup sadar glukosa sebagai identitas permanen demi menjaga kesehatan organ.',
                            deltaGlucose: -10,
                            deltaEnergy: +35,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Keberhasilan Paripurna: Dimas resmi bebas dari risiko sindrom metabolik aktif dan memiliki ketahanan fisik prima.',
                            reaction: 'dr. Bramantyo menandatangani sertifikat pemulihan klinis pasien dan menyerahkannya secara resmi.',
                        },
                        {
                            id: 'dimas_c6_tech_ambassador',
                            code: 'Pilihan B',
                            label: 'Menjadi Duta Kesehatan Preventif bagi Komunitas Programmer dan Rekan Kantor',
                            desc: 'Membagikan pengalaman nyata pemulihan pra-diabetes untuk menyelamatkan rekan sesama developer dari penyakit kronis.',
                            deltaGlucose: -8,
                            deltaEnergy: +30,
                            deltaHbA1c: -0.1,
                            type: 'healthy',
                            feedback:
                                'Dampak Nyata: Komunitas teknologi tempat Dimas bekerja mulai menerapkan kebijakan camilan sehat dan workstation ergonomis.',
                            reaction: 'Puskesmas memberikan penghargaan pasien teladan edukasi kesehatan preventif.',
                        },
                    ],
                },
            ];
        }
    };

    const medicalChapters = getDynamicChapters();
    const currentChapter = medicalChapters[chapterIndex] || medicalChapters[0];

    // ============================================================================
    // Typewriter Engine Implementation
    // ============================================================================
    const startTypewriter = (text, speaker) => {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);

        setDisplayedText('');
        setIsTyping(true);

        // Record to backlog
        setDialogHistory((prev) => [...prev, { speaker, text }]);

        let i = 0;
        typingTimerRef.current = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                if (i % 3 === 0) audio.playType();
                i++;
            } else {
                clearInterval(typingTimerRef.current);
                setIsTyping(false);

                // If Auto-Play is active, wait 2.2 seconds then advance
                if (isAutoPlay) {
                    autoPlayTimerRef.current = setTimeout(() => {
                        handleAdvanceDialogue();
                    }, 2200);
                }
            }
        }, typeSpeed);
    };

    useEffect(() => {
        if (gameState === 'prologue') {
            const line = prologueScript[currentLineIndex];
            if (line) startTypewriter(line.text, line.speaker);
        } else if (gameState === 'chapter_story') {
            const line = currentChapter.script[currentLineIndex];
            if (line) startTypewriter(line.text, line.speaker);
        }
    }, [gameState, currentLineIndex, chapterIndex, selectedCharId]);

    const handleAdvanceDialogue = () => {
        audio.playClick();

        if (isTyping) {
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            if (gameState === 'prologue') {
                setDisplayedText(prologueScript[currentLineIndex].text);
            } else if (gameState === 'chapter_story') {
                setDisplayedText(currentChapter.script[currentLineIndex].text);
            }
            setIsTyping(false);
            return;
        }

        if (gameState === 'prologue') {
            if (currentLineIndex < prologueScript.length - 1) {
                setCurrentLineIndex(currentLineIndex + 1);
            } else {
                setGameState('select_patient');
            }
        } else if (gameState === 'chapter_story') {
            if (currentLineIndex < currentChapter.script.length - 1) {
                setCurrentLineIndex(currentLineIndex + 1);
            } else {
                setGameState('chapter_choice');
            }
        }
    };

    const handleSelectPatient = (charId) => {
        audio.playSuccess();
        setSelectedCharId(charId);
        setChapterIndex(0);
        setCurrentLineIndex(0);
        setMetrics({
            glucose: characters[charId].baseGlucose,
            hba1c: characters[charId].baseHbA1c,
            energy: 48,
            adherenceScore: 75,
            history: [],
        });
        setGameState('chapter_story');
    };

    const handlePickChoice = (choice) => {
        audio.playClick();
        if (choice.type === 'danger') {
            audio.playWarning();
        } else {
            audio.playSuccess();
        }

        const newGlucose = Math.max(78, Math.min(235, metrics.glucose + choice.deltaGlucose));
        const newEnergy = Math.max(20, Math.min(100, metrics.energy + choice.deltaEnergy));
        const newHbA1c = Math.max(5.1, Math.min(8.2, +(metrics.hba1c + choice.deltaHbA1c).toFixed(1)));
        const newScore =
            choice.type === 'healthy'
                ? Math.min(100, metrics.adherenceScore + 8)
                : Math.max(20, metrics.adherenceScore - 12);

        setMetrics({
            glucose: newGlucose,
            energy: newEnergy,
            hba1c: newHbA1c,
            adherenceScore: newScore,
            history: [
                ...metrics.history,
                {
                    phase: currentChapter.phase,
                    choice: choice.label,
                    type: choice.type,
                    deltaGlucose: choice.deltaGlucose,
                },
            ],
        });

        setLastChosen(choice);
        setGameState('chapter_outcome');
        startTypewriter(choice.feedback, 'Diagnosis & Evaluasi Klinis');
    };

    const handleNextChapter = () => {
        audio.playClick();
        setLastChosen(null);

        if (chapterIndex < medicalChapters.length - 1) {
            setChapterIndex(chapterIndex + 1);
            setCurrentLineIndex(0);
            setGameState('chapter_story');
        } else {
            setGameState('ending');
        }
    };

    const handleRestart = () => {
        audio.playClick();
        setGameState('prologue');
        setCurrentLineIndex(0);
        setChapterIndex(0);
        setLastChosen(null);
        setDialogHistory([]);
    };

    const cycleSpeed = () => {
        audio.playClick();
        if (typeSpeed === 26) setTypeSpeed(16); // Normal
        else if (typeSpeed === 16) setTypeSpeed(8); // Fast
        else setTypeSpeed(26); // Slow
    };

    const getCurrentBg = () => {
        if (gameState === 'prologue') return '/image/story/vn_puskesmas_exterior.jpg';
        if (gameState === 'select_patient') return '/image/story/vn_puskesmas_triage.jpg';
        if (gameState === 'ending') return '/image/story/vn_recovery_healthy.jpg';
        return currentChapter.bg;
    };

    const currentSpeaker =
        gameState === 'prologue'
            ? prologueScript[currentLineIndex]?.speaker || 'Narator Medis'
            : gameState === 'chapter_story'
            ? currentChapter.script[currentLineIndex]?.speaker || 'Perawat Triase'
            : lastChosen
            ? 'Hasil Diagnosis Klinis'
            : 'AEVYRA Care';

    const filteredFoods =
        selectedFoodFilter === 'all'
            ? NUTRITION_DATABASE
            : NUTRITION_DATABASE.filter((f) => f.category === selectedFoodFilter);

    return (
        <div
            ref={gameContainerRef}
            className={`w-full bg-[#121917] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col select-none transition-all ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'max-w-7xl min-w-0 mx-auto'
            }`}
        >
            {/* Top Retro WebGL Bar */}
            <div className="bg-[#1a2320] px-2.5 sm:px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                    <span className="font-mono font-bold text-gray-200 text-[11px] sm:text-xs truncate">
                        AEVYRA STORY
                    </span>
                    <span className="hidden md:inline-block font-mono text-gray-400 text-xs truncate">
                        : Perjalanan Medis Pasien
                    </span>
                    <span className="hidden lg:inline-block px-2 py-0.5 rounded bg-emerald-950/80 text-[10px] text-emerald-300 font-mono border border-emerald-500/30 shrink-0">
                        Standar PERKENI &amp; SatuSehat Kemenkes
                    </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 overflow-x-auto scrollbar-none justify-end">
                    {/* Interactive Nutritional Inspector Button ("Cek Kadar Gizi") */}
                    <button
                        type="button"
                        onClick={() => setIsNutritionModalOpen(true)}
                        className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors text-[9px] sm:text-[11px] font-mono font-bold flex items-center gap-0.5 sm:gap-1 cursor-pointer shadow-xs border border-emerald-500/40 shrink-0 whitespace-nowrap"
                        title="Buka Alat Inspeksi & Cek Kadar Gizi Makanan"
                    >
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">nutrition</span>
                        <span>Cek Gizi</span>
                    </button>

                    {/* Log Backlog Button */}
                    <button
                        type="button"
                        onClick={() => setIsLogOpen(true)}
                        className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors text-[9px] sm:text-[11px] font-mono cursor-pointer shrink-0 whitespace-nowrap"
                        title="Lihat Riwayat Percakapan Lengkap"
                    >
                        Log
                    </button>

                    {/* Speed Toggle */}
                    <button
                        type="button"
                        onClick={cycleSpeed}
                        className="px-1 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors text-[9px] sm:text-[11px] font-mono cursor-pointer shrink-0 whitespace-nowrap"
                        title="Atur Kecepatan Teks"
                    >
                        {typeSpeed === 26 ? '1x' : typeSpeed === 16 ? '2x' : '3x'}
                    </button>

                    {/* Auto-Play Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded transition-colors text-[9px] sm:text-[11px] font-mono cursor-pointer shrink-0 whitespace-nowrap ${
                            isAutoPlay ? 'bg-emerald-600 text-white font-bold' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                        title="Otomatis Lanjut Dialog"
                    >
                        AUTO
                    </button>

                    {/* Sound Toggle */}
                    <button
                        type="button"
                        onClick={toggleSound}
                        className="p-1 sm:px-2 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                        title={soundOn ? 'Matikan Audio' : 'Nyalakan Audio'}
                    >
                        <span className="material-symbols-outlined text-[13px] sm:text-[15px]">
                            {soundOn ? 'volume_up' : 'volume_off'}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-mono hidden sm:inline">{soundOn ? 'BGM' : 'MUTE'}</span>
                    </button>

                    {/* Fullscreen */}
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                        title="Layar Penuh"
                    >
                        <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
                            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                        </span>
                    </button>

                    {/* Reset */}
                    <button
                        type="button"
                        onClick={handleRestart}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500/80 hover:bg-rose-500 text-white flex items-center justify-center text-[9px] sm:text-[10px] font-bold cursor-pointer transition-transform active:scale-95 shrink-0"
                        title="Mulai Ulang Cerita"
                    >
                        ✕
                    </button>
                </div>
            </div>

            {/* TIMELINE PROGRESS CONTINUUM (6 Stages) */}
            {gameState !== 'prologue' && gameState !== 'select_patient' && (
                <div className="bg-[#141e1a] px-3 sm:px-6 py-2 border-b border-white/10 flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
                    {medicalChapters.map((ch, idx) => {
                        const isActive = idx === chapterIndex;
                        const isDone = idx < chapterIndex;
                        return (
                            <div
                                key={ch.id}
                                className={`flex items-center gap-1.5 px-2 py-1 rounded-md shrink-0 transition-colors ${
                                    isActive
                                        ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 font-bold'
                                        : isDone
                                        ? 'text-gray-400 bg-black/30'
                                        : 'text-gray-600 bg-transparent'
                                }`}
                            >
                                <span
                                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                        isActive
                                            ? 'bg-emerald-400 text-black'
                                            : isDone
                                            ? 'bg-emerald-800 text-white'
                                            : 'bg-white/10 text-gray-400'
                                    }`}
                                >
                                    {isDone ? '✓' : idx + 1}
                                </span>
                                <span className="hidden sm:inline">{ch.timelineLabel}</span>
                                {idx < medicalChapters.length - 1 && (
                                    <span className="text-gray-600 text-[10px]">→</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MAIN 16:9 2D VISUAL NOVEL CANVAS */}
            <div className="relative w-full aspect-4/3 sm:aspect-video min-h-[380px] sm:min-h-135 bg-black flex flex-col justify-between overflow-hidden">
                {/* 2D Scenic Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url(${getCurrentBg()})` }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-black/30 pointer-events-none" />
                </div>

                {/* Top Medical HUD: Live Patient Biomarkers */}
                {gameState !== 'prologue' && gameState !== 'select_patient' && (
                    <div className="relative z-20 p-2 sm:p-4 flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap animate-in fade-in duration-300">
                        {/* Phase & Time Indicator */}
                        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono shadow-md">
                            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            <span className="font-bold text-emerald-300">{currentChapter.time}</span>
                            <span className="text-gray-300">• {currentChapter.phase}</span>
                        </div>

                        {/* Real-Time Clinical Strip (Clean Typography, Zero Emojis) */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {/* Condition Tag */}
                            <div className="hidden lg:flex items-center px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                                {activeChar.specialCaseTitle}
                            </div>

                            {/* Glucose Monitor */}
                            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md">
                                <span className="text-[10px] sm:text-[11px] text-gray-300 font-mono uppercase">Glukosa:</span>
                                <span
                                    className={`font-mono font-bold text-xs sm:text-sm ${
                                        metrics.glucose > 140
                                            ? 'text-rose-400 animate-pulse'
                                            : metrics.glucose > 100
                                            ? 'text-amber-300'
                                            : 'text-emerald-400'
                                    }`}
                                >
                                    {metrics.glucose} mg/dL
                                </span>
                            </div>

                            {/* HbA1c */}
                            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md text-xs font-mono">
                                <span className="text-[11px] text-gray-300">HbA1c:</span>
                                <span
                                    className={`font-bold ${
                                        metrics.hba1c >= 6.5
                                            ? 'text-rose-400'
                                            : metrics.hba1c >= 5.7
                                            ? 'text-amber-300'
                                            : 'text-emerald-400'
                                    }`}
                                >
                                    {metrics.hba1c}%
                                </span>
                            </div>

                            {/* Patient Badge */}
                            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-md text-[10px] sm:text-xs">
                                <img
                                    src={activeChar.avatar}
                                    alt={activeChar.name}
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover ring-1 ring-white/50"
                                />
                                <span className="font-medium text-white truncate max-w-20 sm:max-w-none">
                                    {activeChar.name}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* SCENE: PATIENT SELECTION (BEFORE SICKNESS PHASE) */}
                {/* ============================================================== */}
                {gameState === 'select_patient' && (
                    <div className="relative z-20 flex-1 flex flex-col justify-center items-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300 overflow-y-auto max-h-full">
                        <div className="max-w-4xl w-full text-center space-y-3 sm:space-y-4 my-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/90 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-white">
                                <span>PILIH KASUS KLINIS PASIEN • ALUR &amp; INTERVENSI KHUSUS</span>
                            </div>

                            <h2 className="font-serif text-xl sm:text-3xl text-white font-normal drop-shadow-md">
                                Pilih Profil Pasien yang Mengunjungi Puskesmas Hari Ini
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left max-h-[65vh] sm:max-h-none overflow-y-auto">
                                {Object.values(characters).map((char) => (
                                    <div
                                        key={char.id}
                                        onClick={() => handleSelectPatient(char.id)}
                                        className={`group bg-[#fcf9f4]/98 text-[#1b2824] p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all hover:scale-102 hover:shadow-2xl flex flex-col justify-between space-y-2.5 ${
                                            selectedCharId === char.id
                                                ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                                                : 'border-transparent hover:border-emerald-500'
                                        }`}
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2.5">
                                                <img
                                                    src={char.avatar}
                                                    alt={char.name}
                                                    className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl object-cover ring-2 ring-emerald-600/30 shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <h3 className="font-heading font-bold text-xs sm:text-sm text-primary truncate">
                                                        {char.name}
                                                    </h3>
                                                    <p className="text-[9px] sm:text-[10px] text-gray-500 font-mono truncate">
                                                        {char.age} Tahun • {char.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Special Case Badge */}
                                            <div className="px-2 py-1 rounded bg-[#edf5f0] text-emerald-900 text-[9px] sm:text-[10px] font-bold font-mono border border-emerald-200 truncate">
                                                {char.specialCaseTitle}
                                            </div>

                                            <p className="text-[10px] sm:text-[11px] text-gray-700 leading-snug line-clamp-3">
                                                {char.symptomHistory}
                                            </p>
                                        </div>

                                        <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-gray-600">
                                                GDS: <b className="text-rose-600">{char.baseGlucose}</b> mg/dL
                                            </span>
                                            <span className="text-[11px] sm:text-xs text-primary font-bold group-hover:translate-x-1 transition-transform">
                                                Mulai Triase →
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* SCENE: CLINICAL DECISION CHOICES (Clean Typography, Zero Emojis) */}
                {/* ============================================================== */}
                {gameState === 'chapter_choice' && (
                    <div className="relative z-20 mt-auto pb-3 px-3 sm:px-8 py-2 sm:py-3 max-w-2xl mx-auto w-full space-y-2 sm:space-y-2.5 animate-in slide-in-from-bottom-6 duration-300 max-h-[70%] overflow-y-auto">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] sm:text-[11px] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-black/85 backdrop-blur-md text-emerald-300 font-mono font-bold border border-white/20">
                                KEPUTUSAN KLINIS: {activeChar.name.toUpperCase()}
                            </span>

                            <button
                                type="button"
                                onClick={() => setIsNutritionModalOpen(true)}
                                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer shadow-md"
                            >
                                <span className="material-symbols-outlined text-[12px] sm:text-[13px]">nutrition</span>
                                <span>Cek Gizi</span>
                            </button>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                            {currentChapter.choices.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => handlePickChoice(c)}
                                    className={`w-full p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all active:scale-98 flex items-center justify-between gap-2.5 sm:gap-3 shadow-lg cursor-pointer border ${
                                        c.type === 'danger'
                                            ? 'bg-[#fff7f7]/98 hover:bg-rose-50 text-rose-950 border-rose-300'
                                            : c.type === 'healthy'
                                            ? 'bg-[#f4fbf6]/98 hover:bg-emerald-50 text-emerald-950 border-emerald-300'
                                            : 'bg-[#fffcf4]/98 hover:bg-amber-50 text-amber-950 border-amber-300'
                                    }`}
                                >
                                    <div className="space-y-0.5 sm:space-y-1 min-w-0">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-black/10 text-gray-800 shrink-0">
                                                {c.code}
                                            </span>
                                            <span className="text-[11px] sm:text-sm font-bold text-gray-900 leading-snug truncate">
                                                {c.label}
                                            </span>
                                        </div>
                                        <p className="text-[10px] sm:text-[11px] text-gray-600 leading-snug pl-1 line-clamp-2 sm:line-clamp-none">
                                            {c.desc}
                                        </p>
                                    </div>

                                    <div className="shrink-0 text-right font-mono font-bold text-[10px] sm:text-xs">
                                        <span
                                            className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border ${
                                                c.deltaGlucose < 0
                                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                                    : 'bg-rose-100 text-rose-800 border-rose-300'
                                            }`}
                                        >
                                            {c.deltaGlucose > 0 ? `+${c.deltaGlucose}` : c.deltaGlucose} mg/dL
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* SCENE: ENDING CLINICAL PROGNOSIS & REMISSION CERTIFICATE */}
                {/* ============================================================== */}
                {gameState === 'ending' && (
                    <div className="relative z-20 flex-1 flex flex-col justify-center items-center p-4 sm:p-6 bg-black/65 backdrop-blur-xs animate-in zoom-in-95 duration-300 overflow-y-auto">
                        <div className="bg-[#fcfaf5] text-[#1b2824] max-w-xl w-full p-6 sm:p-7 rounded-3xl shadow-2xl border-2 border-emerald-600/30 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div>
                                    <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase tracking-wider block">
                                        SERTIFIKAT REMISI SATUSEHAT KEMENKES RI
                                    </span>
                                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-primary">
                                        Hasil Evaluasi Klinis: {activeChar.name}
                                    </h3>
                                    <span className="text-[11px] text-gray-500 font-mono">
                                        Fokus: {activeChar.specialCaseTitle}
                                    </span>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-600 text-white shadow-xs">
                                    REMISI SUKSES (GRADE A)
                                </span>
                            </div>

                            {/* Comparison Stats: Before vs After */}
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                                    <span className="text-[10px] text-gray-500 uppercase block font-mono">
                                        Glukosa Puasa
                                    </span>
                                    <div className="flex items-center justify-center gap-1.5 mt-1">
                                        <span className="text-xs text-rose-500 line-through font-mono">
                                            {activeChar.baseGlucose}
                                        </span>
                                        <span className="text-xs text-gray-400">→</span>
                                        <span className="font-serif text-lg font-bold text-emerald-700">
                                            {metrics.glucose} mg/dL
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                                    <span className="text-[10px] text-gray-500 uppercase block font-mono">
                                        HbA1c Lab
                                    </span>
                                    <div className="flex items-center justify-center gap-1.5 mt-1">
                                        <span className="text-xs text-rose-500 line-through font-mono">
                                            {activeChar.baseHbA1c}%
                                        </span>
                                        <span className="text-xs text-gray-400">→</span>
                                        <span className="font-serif text-lg font-bold text-emerald-700">
                                            {metrics.hba1c}%
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                                    <span className="text-[10px] text-gray-500 uppercase block font-mono">
                                        Kepatuhan Chat
                                    </span>
                                    <span className="font-serif text-lg font-bold text-primary block mt-1">
                                        {metrics.adherenceScore}%
                                    </span>
                                </div>
                            </div>

                            {/* Clinical Statement by dr. Bramantyo */}
                            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src="/image/doctor_bramantyo.jpg"
                                        alt="dr. Bramantyo"
                                        className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-600"
                                    />
                                    <div>
                                        <span className="text-xs font-bold text-emerald-950 block">
                                            dr. H. Bramantyo, Sp.PD (Konsultan Penyakit Dalam)
                                        </span>
                                        <span className="text-[10px] text-emerald-700 font-mono">
                                            Verifikator Medis Terdaftar IDI &amp; Kemenkes RI
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed italic pl-11">
                                    "Pasien {activeChar.name} membuktikan bahwa pra-diabetes dengan kondisi khusus ({activeChar.specialCaseTitle}) dapat dibalikkan sepenuhnya melalui deteksi dini sebelum jatuh sakit di Puskesmas, evaluasi laboratorium berkala, serta bimbingan aktif instruktur gizi klinis via chat telemedisin AEVYRA."
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={handleRestart}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition-all active:scale-95 cursor-pointer text-center"
                                >
                                    Coba Kasus Pasien Lain ↺
                                </button>
                                <Link
                                    href="/member/consultations-hub"
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-primary border border-primary/30 text-xs font-bold hover:bg-gray-50 transition-all text-center"
                                >
                                    Buka Konsultasi Dokter / AI
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* THE ICONIC FLOATING DIALOGUE BOX (KOPMART RETRO VN STYLE) */}
                {/* ============================================================== */}
                {gameState !== 'select_patient' && gameState !== 'chapter_choice' && gameState !== 'ending' && (
                    <div className="relative z-20 mt-auto pb-3 sm:pb-6 px-2.5 sm:px-6 w-full">
                        <div
                            onClick={handleAdvanceDialogue}
                            className="group max-w-2xl mx-auto bg-[#f4eee5]/95 text-[#1b2a26] p-3.5 sm:p-5 rounded-2xl sm:rounded-[30px] border border-[#dcd1c2] shadow-[0_12px_32px_rgba(0,0,0,0.35)] cursor-pointer relative transition-transform active:scale-[0.99] space-y-1.5 sm:space-y-2 backdrop-blur-md"
                        >
                            {/* Dialogue Header */}
                            <div className="flex items-center justify-between gap-2">
                                <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#1b7058] text-white text-[10px] sm:text-[11px] font-mono font-bold shadow-xs shrink-0">
                                    <span>{currentSpeaker}</span>
                                </div>

                                <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono truncate">
                                    <span className="hidden sm:inline">[Klik kotak atau tekan Spasi untuk lanjut]</span>
                                    <span className="sm:hidden">[Ketuk untuk lanjut]</span>
                                </span>
                            </div>

                            {/* Main Typewriter Text (Clean Literary Prose) */}
                            <p className="font-sans text-xs sm:text-sm text-[#142320] leading-relaxed min-h-10 select-text">
                                {displayedText}
                            </p>

                            {/* Bottom Indicators */}
                            <div className="flex items-center justify-between pt-1">
                                <div className="text-[9px] sm:text-[10px] text-gray-400 font-mono truncate">
                                    AEVYRA Medical Story Engine • {activeChar.name}
                                </div>

                                {/* Bouncing Red Arrow (1:1 with Screenshot) */}
                                {!isTyping && gameState !== 'chapter_outcome' && (
                                    <div className="text-[#c94a38] text-xs sm:text-sm animate-bounce font-black select-none shrink-0 ml-1">
                                        ▼
                                    </div>
                                )}

                                {gameState === 'chapter_outcome' && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleNextChapter();
                                        }}
                                        className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary text-white text-[11px] sm:text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-md flex items-center gap-1 shrink-0"
                                    >
                                        <span>Lanjut Babak</span>
                                        <span>→</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Retro Unity WebGL Bar */}
            <div className="bg-[#141d1a] px-4 py-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-gray-300 font-bold font-mono text-[11px]">
                        <span className="w-3.5 h-3.5 bg-gray-300 inline-block [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]"></span>
                        <span>Unity</span>
                    </div>

                    <span className="text-[10px] font-mono text-gray-500 hidden sm:inline">
                        Puskesmas &amp; Telemedisin Sim
                    </span>
                </div>

                <div className="text-[11px] font-mono text-gray-400 hidden sm:block">
                    AEVYRA Medical Story • Kemenkes SatuSehat Protocol
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-gray-400">{clockString}</span>

                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="Perbesar Layar"
                    >
                        <span className="material-symbols-outlined text-[17px]">
                            {isFullscreen ? 'fullscreen_exit' : 'open_in_full'}
                        </span>
                    </button>
                </div>
            </div>

            {/* ============================================================== */}
            {/* MODAL: INTERACTIVE NUTRITIONAL INSPECTOR ("Cek Kadar Gizi") */}
            {/* ============================================================== */}
            {isNutritionModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#fcfaf5] text-[#1a2522] max-w-3xl w-full max-h-[85vh] rounded-3xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-primary-container">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">nutrition</span>
                                <div>
                                    <h3 className="font-heading font-bold text-sm">
                                        Inspektur Kadar Gizi &amp; Dampak Metabolik Makanan
                                    </h3>
                                    <p className="text-[10px] text-emerald-200 font-mono">
                                        Basis Data Standar Kemenkes RI &amp; PERKENI
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsNutritionModalOpen(false)}
                                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Filter Tabs */}
                        <div className="px-5 pt-3 flex items-center gap-2 overflow-x-auto border-b border-gray-200 text-xs">
                            {[
                                { id: 'all', label: 'Semua Makanan' },
                                { id: 'lunch', label: 'Menu Siang & Kantin' },
                                { id: 'women', label: 'Khusus Wanita & Fase Haid' },
                                { id: 'heart', label: 'Khusus Jantung & Tensi' },
                                { id: 'snack', label: 'Camilan & Kudapan' },
                                { id: 'drink', label: 'Minuman' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setSelectedFoodFilter(tab.id)}
                                    className={`px-3 py-1.5 rounded-t-lg font-mono text-[11px] whitespace-nowrap cursor-pointer transition-colors border-b-2 ${
                                        selectedFoodFilter === tab.id
                                            ? 'border-primary text-primary font-bold bg-emerald-50/50'
                                            : 'border-transparent text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Modal Body: Two-Column Inspector */}
                        <div className="p-5 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            {/* Left: Food List */}
                            <div className="space-y-2 pr-1 max-h-[50vh] overflow-y-auto">
                                <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">
                                    Pilih Item untuk Diperiksa ({filteredFoods.length} Menu)
                                </span>
                                {filteredFoods.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setInspectedFood(item)}
                                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                                            inspectedFood.id === item.id
                                                ? 'bg-emerald-50 border-primary text-emerald-950 shadow-xs'
                                                : 'bg-white border-gray-200 hover:border-emerald-300 text-gray-800'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <strong className="text-xs font-bold block">{item.name}</strong>
                                            <span
                                                className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                                                    item.sugar > 25
                                                        ? 'bg-rose-100 text-rose-800'
                                                        : item.sugar > 10
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-emerald-100 text-emerald-800'
                                                }`}
                                            >
                                                Gula {item.sugar}g
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-mono mt-1">
                                            {item.impactTag}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Right: Detailed Nutrition Facts Card */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col justify-between space-y-3">
                                <div className="space-y-3">
                                    <div className="border-b border-gray-200 pb-2">
                                        <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">
                                            HASIL INSPEKSI GIZI KLINIS
                                        </span>
                                        <h4 className="font-serif text-base font-bold text-primary">
                                            {inspectedFood.name}
                                        </h4>
                                    </div>

                                    {/* Nutrition Indicators */}
                                    <div className="grid grid-cols-2 gap-2 text-center font-mono">
                                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-[10px] text-gray-500 block">Kadar Gula</span>
                                            <span
                                                className={`font-bold text-sm ${
                                                    inspectedFood.sugar > 25
                                                        ? 'text-rose-600'
                                                        : inspectedFood.sugar > 10
                                                        ? 'text-amber-600'
                                                        : 'text-emerald-700'
                                                }`}
                                            >
                                                {inspectedFood.sugar} Gram
                                            </span>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-[10px] text-gray-500 block">Natrium (Garam)</span>
                                            <span
                                                className={`font-bold text-sm ${
                                                    inspectedFood.sodium > 800 ? 'text-rose-600' : 'text-emerald-700'
                                                }`}
                                            >
                                                {inspectedFood.sodium} mg
                                            </span>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-[10px] text-gray-500 block">Serat Larut</span>
                                            <span className="font-bold text-sm text-emerald-700">
                                                {inspectedFood.fiber} Gram
                                            </span>
                                        </div>

                                        <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-[10px] text-gray-500 block">Indeks Glikemik</span>
                                            <span className="font-bold text-sm text-gray-800">
                                                {inspectedFood.gi}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Clinical Impacts */}
                                    <div className="space-y-1.5 text-[11px]">
                                        <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                                            <strong className="text-emerald-950 font-bold block">
                                                Dampak Hormon &amp; Menstruasi (Wanita):
                                            </strong>
                                            <p className="text-gray-700">{inspectedFood.hormoneImpact}</p>
                                        </div>

                                        <div className="p-2 rounded-lg bg-cyan-50/70 border border-cyan-200/60">
                                            <strong className="text-cyan-950 font-bold block">
                                                Dampak Jantung &amp; Kardiovaskular:
                                            </strong>
                                            <p className="text-gray-700">{inspectedFood.cardioRisk}</p>
                                        </div>
                                    </div>

                                    <div className="p-2.5 rounded-lg bg-gray-50 text-[11px] text-gray-600 italic">
                                        "{inspectedFood.verdict}"
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsNutritionModalOpen(false)}
                                    className="w-full py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container cursor-pointer transition-colors text-center"
                                >
                                    Kembali ke Simulasi Cerita
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* MODAL: DIALOGUE HISTORY BACKLOG (Standard VN Feature) */}
            {/* ============================================================== */}
            {isLogOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#fcfaf5] text-[#1a2522] max-w-2xl w-full max-h-[80vh] rounded-3xl shadow-2xl border border-gray-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-primary-container">
                            <div className="flex items-center gap-2">
                                <span className="font-heading font-bold text-sm">
                                    Riwayat Percakapan &amp; Catatan Medis (Log)
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-mono">
                                    {dialogHistory.length} Baris
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsLogOpen(false)}
                                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-xs">
                            {dialogHistory.map((item, idx) => (
                                <div key={idx} className="space-y-0.5 border-b border-gray-100 pb-2">
                                    <span className="font-bold text-primary font-mono text-[11px] block">
                                        [{item.speaker}]
                                    </span>
                                    <p className="text-gray-700 leading-relaxed select-text">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-3 bg-gray-100 border-t border-gray-200 text-right">
                            <button
                                type="button"
                                onClick={() => setIsLogOpen(false)}
                                className="px-5 py-1.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container cursor-pointer"
                            >
                                Tutup Riwayat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
