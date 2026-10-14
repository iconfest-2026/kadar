import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ChallengesDemo() {
    let authUser = null;
    try {
        const page = usePage();
        authUser = page?.props?.auth?.user || null;
    } catch {
        authUser = null;
    }

    // Active challenge & filter
    const [activeChallenge, setActiveChallenge] = useState('sugar_zero');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'calendar' | 'leaderboard' | 'clinical'
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // Progress & Security State
    const [simulatedProgress, setSimulatedProgress] = useState(6); // Currently at Day 6 completed
    const [isCheckedInToday, setIsCheckedInToday] = useState(false); // False = ready for Day 7, True = locked
    const [lastCheckInTimestamp, setLastCheckInTimestamp] = useState(null);
    const [auditSecurityHash, setAuditSecurityHash] = useState(null);
    const [streakCount, setStreakCount] = useState(6);
    const [userXp, setUserXp] = useState(1850);
    const [freezeTokens, setFreezeTokens] = useState(1);

    // Interactive Modals & Banners
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [selectedHistoryDay, setSelectedHistoryDay] = useState(null);
    const [securityAlert, setSecurityAlert] = useState(null);
    const [proofMethod, setProofMethod] = useState('photo'); // 'photo' | 'sensor' | 'declaration'
    const [proofNote, setProofNote] = useState('');
    const [photoUploaded, setPhotoUploaded] = useState(false);

    // Daily Micro-habits task checklist for the current day
    const [dailyTasks, setDailyTasks] = useState({
        task1: true,
        task2: true,
        task3: false,
    });

    // Time remaining until midnight cooldown
    const [timeUntilReset, setTimeUntilReset] = useState('14 Jam 28 Menit');

    useEffect(() => {
        // Calculate remaining time until next day (00:00 WIB)
        const updateCooldown = () => {
            const now = new Date();
            const midnight = new Date();
            midnight.setHours(24, 0, 0, 0);
            const diffMs = midnight - now;
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            setTimeUntilReset(`${hours} Jam ${minutes} Menit`);
        };
        updateCooldown();
        const timer = setInterval(updateCooldown, 60000);
        return () => clearInterval(timer);
    }, []);

    // =========================================================================
    // 1. COMPREHENSIVE CLINICAL CHALLENGE CATALOG (4 Verified Cohorts)
    // =========================================================================
    const challenges = {
        sugar_zero: {
            id: 'sugar_zero',
            title: '14 Hari Bebas Minuman Manis (Liquid Sugar Zero)',
            durationDays: 14,
            durationLabel: '14 Hari',
            category: 'Pola Nutrisi & Glukosa',
            categorySlug: 'nutrition',
            badgeTitle: 'Sugar Freedom Master',
            xpReward: 350,
            dailyXp: 25,
            image: '/image/scan_tea_drink.jpg',
            leadDoctor: 'dr. Sarah Nindya, M.Gizi, Sp.GK, AIFO-K',
            doctorRole: 'Spesialis Gizi Klinis & Terapi Nutrisi Medis',
            doctorAvatar: '/image/doctor_consultation.jpg',
            target: 'Ganti semua minuman berpemanis cair (boba, teh manis kemasan, sirup, soda) dengan air mineral, infused water, atau teh hijau tawar.',
            clinicalGoal: 'Menghilangkan lonjakan glukosa darah akut postprandial dan merestorasi afinitas reseptor rasa manis alami pada papila lidah.',
            scientificBasis: 'Konsensus PERKENI 2021 Hal. 24 & ADA Standards of Care: Karbohidrat cair diserap tanpa matriks serat lambung, memicu rata-rata lonjakan glukosa +65 mg/dL dalam 30 menit serta membebani de novo lipogenesis di organ hepar.',
            milestones: [
                {
                    phase: 'Hari 1–4',
                    title: 'Fase Detoksifikasi Reseptor & Sugar Craving',
                    desc: 'Gejala sugar craving dan kantuk reaktif mulai mereda. Tubuh beralih ke metabolisme energi glukosa stabil.',
                },
                {
                    phase: 'Hari 5–9',
                    title: 'Stabilisasi Kurva Glukosa & Sirkadian Energi',
                    desc: 'Sensasi kantuk 1 jam pasca makan (postprandial somnolence) hilang total. Tingkat fokus mental meningkat.',
                },
                {
                    phase: 'Hari 10–14',
                    title: 'Resensitisasi Reseptor Insulin Hepatosit',
                    desc: 'Sensitivitas reseptor GLUT-4 meningkat signifikan. Potensi remisi penumpukan lemak trigliserida hati (NAFLD).',
                },
            ],
            microHabits: [
                { id: 'task1', time: '07:00 WIB', title: 'Hidrasi Pagi Bebas Kalori', desc: 'Minum minimal 500ml air putih netral saat bangun tidur sebelum sarapan.' },
                { id: 'task2', time: '12:30 WIB', title: 'Tolak Minuman Manis Siang', desc: 'Pilih air putih atau teh tawar dingin pendamping santap siang (0g gula tambahan).' },
                { id: 'task3', time: '20:00 WIB', title: 'Evaluasi Craving & Teh Herbal', desc: 'Bila timbul keinginan manis malam hari, seduh chamomile atau infused water lemon mint.' },
            ],
            participantsCount: 1420,
            activeCohort: 'Kohor Jakarta-Surabaya Batch 18',
        },
        steps_10k: {
            id: 'steps_10k',
            title: '30 Hari Jalan Kaki 10.000 Langkah & Post-Meal Walk',
            durationDays: 30,
            durationLabel: '30 Hari',
            category: 'Aktivitas Fisik & Kinetik',
            categorySlug: 'activity',
            badgeTitle: 'Metabolic Soleus Walker',
            xpReward: 600,
            dailyXp: 20,
            image: '/image/habit_morning_walk.jpg',
            leadDoctor: 'dr. Rayhan Pratama, Sp.JP, FIHA',
            doctorRole: 'Spesialis Jantung & Pembuluh Darah (Kardiologi Preventif)',
            doctorAvatar: '/image/hero_lifestyle_scan.jpg',
            target: 'Akumulasi minimal 10.000 langkah harian dan wajib jalan santai teratur 15–20 menit segera setelah santap malam.',
            clinicalGoal: 'Memicu translokasi transporter glukosa GLUT-4 non-insulin dependent pada otot rangka tungkai untuk menyerap gula darah langsung tanpa membebani pankreas.',
            scientificBasis: 'Sports Medicine 2023 Meta-Analysis: Berjalan santai 15 menit pasca makan menurunkan kenaikan glukosa darah postprandial sebesar 32% dan memperbaiki kelenturan vaskular endotel.',
            milestones: [
                {
                    phase: 'Hari 1–10',
                    title: 'Adaptasi Otot Soleus & Rutinitas Langkah',
                    desc: 'Otot betis (soleus) beradaptasi sebagai "second heart" metabolisme untuk meningkatkan sirkulasi balik vena.',
                },
                {
                    phase: 'Hari 11–20',
                    title: 'Penurunan Fluktuasi Glukosa Darah Malam',
                    desc: 'Glukosa darah sebelum tidur turun stabil di kisaran 100–115 mg/dL. Tekanan darah sistolik mulai menurun 4–6 mmHg.',
                },
                {
                    phase: 'Hari 21–30',
                    title: 'Peningkatan VO2Max & Pembersihan Lemak Darah',
                    desc: 'Profil lipid (trigliserida) membaik dan kapasitas kardiometabolik terbukti meningkat secara terukur.',
                },
            ],
            microHabits: [
                { id: 'task1', time: '06:30 WIB', title: 'Brisk Walk Pagi 20 Menit', desc: 'Jalan santai pagi di bawah sinar matahari (minimal 2.500 langkah awal).' },
                { id: 'task2', time: '14:00 WIB', title: 'Break Tangga & Gerak Aktif', desc: 'Pilih tangga dan hindari duduk diam lebih dari 60 menit berturut-turut.' },
                { id: 'task3', time: '19:30 WIB', title: 'Post-Dinner Walk 15 Menit', desc: 'Jalan santai di sekitar rumah segera setelah suapan makan malam selesai.' },
            ],
            participantsCount: 890,
            activeCohort: 'Kohor Jantung & Kinetik Batch 9',
        },
        sleep_hygiene: {
            id: 'sleep_hygiene',
            title: '21 Hari Transisi Sirkadian & Kualitas Restoratif Tidur',
            durationDays: 21,
            durationLabel: '21 Hari',
            category: 'Ritme Sirkadian & Pemulihan',
            categorySlug: 'circadian',
            badgeTitle: 'Circadian Restorer',
            xpReward: 450,
            dailyXp: 22,
            image: '/image/doctor_consultation.jpg',
            leadDoctor: 'dr. H. Bramantyo, Sp.PD, K-EMD, FINASIM',
            doctorRole: 'Spesialis Penyakit Dalam & Konsultan Endokrinologi',
            doctorAvatar: '/image/doctor_bramantyo.jpg',
            target: 'Matikan gawai 45 menit sebelum tidur, hindari makan berat di atas pukul 20:00 WIB, dan tidur teratur pada pukul 22:30 WIB.',
            clinicalGoal: 'Menekan lonjakan hormon kortisol malam hari dan mencegah fenomena fajar abnormal (Dawn Phenomenon) yang memicu lonjakan glukosa puasa.',
            scientificBasis: 'Endocrine Society Clinical Practice 2023: Restriksi tidur kronis (< 6 jam/malam) menurunkan sensitivitas insulin perifer sebesar 24% dan memicu pelepasan asam lemak bebas nocturnal.',
            milestones: [
                {
                    phase: 'Hari 1–7',
                    title: 'Pembersihan Blue Light & Waktu Hening',
                    desc: 'Produksi melatonin endogen meningkat alami saat paparan layar gawai dihentikan sebelum jam tidur.',
                },
                {
                    phase: 'Hari 8–14',
                    title: 'Peningkatan Proporsi Fase Deep Sleep (N3)',
                    desc: 'Fase deep restorative sleep bertambah durasinya, memulihkan cadangan glikogen dan memperbaiki kurva inflamasi.',
                },
                {
                    phase: 'Hari 15–21',
                    title: 'Stabilisasi Glukosa Darah Puasa (GDP)',
                    desc: 'GDP pagi hari turun konsisten di bawah 100 mg/dL tanpa episode kenaikan lonjakan subuh.',
                },
            ],
            microHabits: [
                { id: 'task1', time: '14:00 WIB', title: 'Batas Akhir Konsumsi Kafein', desc: 'Hindari kopi, minuman berenergi, atau teh berkafein tinggi setelah jam makan siang.' },
                { id: 'task2', time: '21:30 WIB', title: 'Digital Sunset (Gawai Off)', desc: 'Matikan notifikasi gawai dan redupkan lampu kamar menjadi temaram hangat.' },
                { id: 'task3', time: '22:30 WIB', title: 'Tidur Tepat Waktu & Suhu Sejuk', desc: 'Atur suhu kamar 22–24°C dan mulai istirahat dengan teknik pernapasan 4-7-8.' },
            ],
            participantsCount: 670,
            activeCohort: 'Kohor Sirkadian Mandiri Batch 12',
        },
        remission_90: {
            id: 'remission_90',
            title: '90 Hari Protokol Multidisiplin Remisi Pre-Diabetes',
            durationDays: 90,
            durationLabel: '90 Hari',
            category: 'Protokol Medis Kohor',
            categorySlug: 'medical',
            badgeTitle: 'Remission Champion',
            xpReward: 1500,
            dailyXp: 18,
            image: '/image/healthy_nutrition_plate.jpg',
            leadDoctor: 'Panel Terpadu IDI: Sp.PD, Sp.GK & Sp.JP',
            doctorRole: 'Dewan Konsultan Klinis Spesialis AEVYRA',
            doctorAvatar: '/image/doctor_bramantyo.jpg',
            target: 'Kombinasi nutrisi rendah beban glisemik, latihan resistensi otot 3x/minggu, log glukometer harian, dan evaluasi lab berkala 90 hari.',
            clinicalGoal: 'Menurunkan kadar HbA1c hingga < 5.7% (kategori normoglikemik) serta membalikkan resistensi insulin secara permanen tanpa obat seumur hidup.',
            scientificBasis: 'Pedoman Pengelolaan DM Tipe 2 PERKENI 2021: Intervensi gaya hidup intensif selama 90 hari terbukti membalikkan 87.4% pra-diabetes menjadi kondisi metabolisme normal reversibel.',
            milestones: [
                {
                    phase: 'Bulan 1 (Hari 1–30)',
                    title: 'Eliminasi Pemicu Lonjakan & Stabilisasi GDP',
                    desc: 'Pemutusan siklus reactive hypoglycemia dan penurunan rerata glukosa harian di bawah 110 mg/dL.',
                },
                {
                    phase: 'Bulan 2 (Hari 31–60)',
                    title: 'Peningkatan Biomassa Mitokondria Otot',
                    desc: 'Latihan resistensi progresif meningkatkan kapasitas oksidasi lemak dan serapan glukosa perifer.',
                },
                {
                    phase: 'Bulan 3 (Hari 61–90)',
                    title: 'Pemeriksaan Darah HbA1c Lab Target Remisi',
                    desc: 'Evaluasi biomarker klinis lengkap di laboratorium mitra: HbA1c target < 5.7% dan lipid profil ideal.',
                },
            ],
            microHabits: [
                { id: 'task1', time: '07:30 WIB', title: 'Catat Angka Glukosa Puasa', desc: 'Periksa atau catat biomarker glukosa pagi di tracker digital AEVYRA.' },
                { id: 'task2', time: '13:00 WIB', title: 'Piring Glikemik Seimbang', desc: 'Terapkan metode food sequencing: serat sayur hijau terlebih dahulu, lalu protein, dan karbohidrat kompleks.' },
                { id: 'task3', time: '18:00 WIB', title: 'Latihan Otot / Resistance 20 Menit', desc: 'Lakukan squat, push up dinding, atau latihan dumbel ringan untuk membakar glikogen.' },
            ],
            participantsCount: 530,
            activeCohort: 'Kohor Medis Intensif Batch 6',
        },
    };

    const current = challenges[activeChallenge];
    const totalDays = current.durationDays;
    const progressPercent = Math.min(100, Math.round((simulatedProgress / totalDays) * 100));

    // Filter catalog
    const filteredChallengeEntries = Object.entries(challenges).filter(([_, item]) => {
        if (categoryFilter === 'all') return true;
        return item.categorySlug === categoryFilter;
    });

    // =========================================================================
    // 2. SECURITY PROTOCOL & DAILY ANTI-SPAM LOCK ENFORCEMENT
    // =========================================================================
    const handleAttemptCheckIn = () => {
        if (isCheckedInToday) {
            setSecurityAlert({
                title: 'Proteksi Integritas Medis Aktif!',
                message: `Anda sudah menyelesaikan check-in Hari Ke-${simulatedProgress} hari ini pada pk ${lastCheckInTimestamp || '09:15 WIB'}. Untuk menjaga keabsahan klinis biomarker dan mencegah manipulasi streak poin, sistem mengunci check-in tambahan hingga esok hari.`,
                type: 'locked',
            });
            return;
        }

        setIsVerificationModalOpen(true);
    };

    const handleConfirmVerification = () => {
        setDailyTasks({ task1: true, task2: true, task3: true });

        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const hashStr = 'AEV-SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + simulatedProgress;

        setIsCheckedInToday(true);
        setLastCheckInTimestamp(`${dateStr}, ${timeStr}`);
        setAuditSecurityHash(hashStr);

        const nextDay = Math.min(simulatedProgress + 1, totalDays);
        setSimulatedProgress(nextDay);
        setStreakCount((prev) => prev + 1);
        setUserXp((prev) => prev + current.dailyXp);

        setIsVerificationModalOpen(false);

        setSecurityAlert({
            title: 'Check-in Hari Ini Berhasil & Terkunci!',
            message: `Kepatuhan Hari Ke-${nextDay} telah divalidasi resmi dengan Hash Audit #${hashStr}. Status check-in telah DIKUNCI selama 24 jam untuk menjaga integritas data Anda.`,
            type: 'success',
        });
    };

    // Evaluator Sandbox Controls
    const handleSimulateNextDay = () => {
        setIsCheckedInToday(false);
        setDailyTasks({ task1: true, task2: false, task3: false });
        setSecurityAlert({
            title: 'Simulasi Tanggal Kalender Dimajukan (Besok Hari)',
            message: `Sistem disimulasikan memasuki hari berikutnya. Tombol check-in untuk Hari Ke-${simulatedProgress + 1} kini terbuka kembali untuk 1 kali pencatatan resmi.`,
            type: 'info',
        });
    };

    const handleResetTodayStatus = () => {
        setIsCheckedInToday(false);
        if (simulatedProgress > 1) {
            setSimulatedProgress(simulatedProgress - 1);
            setStreakCount(Math.max(1, streakCount - 1));
        }
        setSecurityAlert(null);
    };

    // Cohort Community Leaderboard
    const cohortLeaderboard = [
        { rank: 1, name: 'Dimas Aryo (29 th)', streak: 14, completion: '100%', xp: 2150, badge: 'Sugar Free Titan' },
        { rank: 2, name: 'dr. Sarah Nindya, Sp.GK (Coach)', streak: 14, completion: '100%', xp: 2100, badge: 'Clinical Leader' },
        { rank: 3, name: 'Anda (Peserta Terverifikasi)', streak: streakCount, completion: `${progressPercent}%`, xp: userXp, badge: isCheckedInToday ? 'Hari Ini Terkunci' : 'Siap Check-in', isUser: true },
        { rank: 4, name: 'Ir. Hendro Wibowo (52 th)', streak: 6, completion: '43%', xp: 1720, badge: 'Metabolic Fighter' },
        { rank: 5, name: 'Nadia Salsabila (31 th)', streak: 5, completion: '36%', xp: 1640, badge: 'Insulin Defender' },
    ];

    // Clinical Comparison Rows
    const comparisonRows = [
        {
            dimension: 'Integritas Pencatatan',
            conventional: 'Bebas klik berulang kali tanpa batas, rentan kecurangan streak',
            aevyra: '1 Hari = 1 Log Resmi Terkunci dengan Hash Audit Kriptografis',
        },
        {
            dimension: 'Validasi Kepatuhan',
            conventional: 'Hanya centang mandiri tanpa bukti atau verifikasi sensor',
            aevyra: 'Multi-metode verifikasi: Foto, Smartwatch sensor, & audit medis',
        },
        {
            dimension: 'Supervisi Klinis',
            conventional: 'Aplikasi tanpa pengawasan dokter atau dasar ilmiah terstandar',
            aevyra: 'Protokol berbasis Konsensus PERKENI 2021 & bimbingan dokter IDI',
        },
        {
            dimension: 'Proteksi Kegagalan',
            conventional: 'Streak hangus seketika saat terlewat 1 hari, memicu demotivasi',
            aevyra: 'Streak Shield Token melindungi catatan saat kondisi darurat',
        },
        {
            dimension: 'Integrasi Rekam Medis',
            conventional: 'Data terisolasi di dalam game tanpa faedah untuk evaluasi klinis',
            aevyra: 'Tersinkronisasi otomatis ke rekam medis SatuSehat & telekonsultasi',
        },
    ];

    return (
        <MarketingLayout>
            <Head title="Demo Program Tantangan Sehat & Anti-Spam - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
                {/* 1. Header */}
                <div className="space-y-3 border-b border-[#cfe0d5] pb-6">
                    <div className="flex items-center gap-2 text-xs text-[#222222] font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Program Tantangan Sehat</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-black tracking-tight">
                                Program Tantangan Klinis 14–90 Hari
                            </h1>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium mt-1 max-w-2xl leading-relaxed">
                                Bangun kebiasaan preventif berbasis konsensus PERKENI 2021. Dilengkapi sistem proteksi anti-spam (1 Check-in per Hari), audit trail kepatuhan, pelindung streak, dan bimbingan dokter spesialis.
                            </p>
                        </div>

                        <Link
                            href={authUser ? '/member/challenges' : '/register'}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 whitespace-nowrap self-start md:self-auto"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {authUser ? 'military_tech' : 'person_add'}
                            </span>
                            <span>
                                {authUser ? 'Katalog Tantangan Member' : 'Daftar Akun Baru'}
                            </span>
                        </Link>
                    </div>
                </div>


                {/* 3. 4 Stat Cards: Health Passport & Security Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* 1. Flame Streak */}
                    <div className="p-3.5 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-2 sm:space-y-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between gap-1.5">
                                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 whitespace-nowrap shrink-0">
                                    1.5x Multiplier
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#445652] block tracking-wide truncate">
                                Streak Kepatuhan
                            </span>
                            <div className="text-xl sm:text-3xl font-heading font-black text-amber-700 font-mono leading-none">
                                {streakCount} <span className="text-xs font-bold text-[#333333] font-sans">Hari Berturut</span>
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#222222] font-medium leading-snug">
                            Konsistensi log harian tanpa jeda. Bonus XP aktif.
                        </p>
                    </div>

                    {/* 2. Streak Shield */}
                    <div className="p-3.5 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-2 sm:space-y-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between gap-1.5">
                                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">shield</span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 whitespace-nowrap shrink-0">
                                    {freezeTokens} Token Siap
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#445652] block tracking-wide truncate">
                                Pelindung Streak
                            </span>
                            <div className="text-xl sm:text-3xl font-heading font-black text-primary font-mono leading-none">
                                Aktif <span className="text-xs font-bold text-[#333333] font-sans">({freezeTokens} Token)</span>
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#222222] font-medium leading-snug">
                            Melindungi rekor streak jika terjadi halangan tak terduga.
                        </p>
                    </div>

                    {/* 3. User XP & Level */}
                    <div className="p-3.5 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-2 sm:space-y-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between gap-1.5">
                                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 whitespace-nowrap shrink-0">
                                    Level 4
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#445652] block tracking-wide truncate">
                                Tingkat Gamifikasi
                            </span>
                            <div className="text-xl sm:text-3xl font-heading font-black text-emerald-800 font-mono leading-none">
                                {userXp.toLocaleString('id-ID')} <span className="text-xs font-bold text-[#333333] font-sans">XP</span>
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#222222] font-medium leading-snug">
                            Preventive Warrior (150 XP menuju Level 5 Master).
                        </p>
                    </div>

                    {/* 4. Today's Security Status */}
                    <div className="p-3.5 sm:p-5 rounded-3xl bg-white border border-[#c4dcce] shadow-xs space-y-2 sm:space-y-2.5 flex flex-col justify-between">
                        <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between gap-1.5">
                                <div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-200 text-black flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">lock_clock</span>
                                </div>
                                <span
                                    className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                                        isCheckedInToday
                                            ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                                            : 'bg-amber-50 text-amber-950 border-amber-300'
                                    }`}
                                >
                                    {isCheckedInToday ? 'TERKUNCI' : 'SIAP CHECK-IN'}
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase text-[#445652] block tracking-wide truncate">
                                Status Hari Ini
                            </span>
                            <div className="text-xl sm:text-3xl font-heading font-black text-black font-mono leading-none truncate">
                                {isCheckedInToday ? 'Selesai' : 'Siap Log'}
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-[11px] text-[#222222] font-medium leading-snug">
                            {isCheckedInToday
                                ? `Terkunci hingga besok (${timeUntilReset})`
                                : '1 kuota check-in tersedia untuk hari ini.'}
                        </p>
                    </div>
                </div>

                {/* 4. WORKFLOW / 3-STEP PATHWAY: Bagaimana Program Tantangan Bekerja? */}
                <div className="p-3.5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-container-lowest border border-[#c4dcce] shadow-xs space-y-4 sm:space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-1.5 sm:space-y-2">
                        <h2 className="font-heading font-black text-base sm:text-3xl text-black">
                            Bagaimana Program Tantangan AEVYRA Bekerja?
                        </h2>
                        <p className="text-[11px] sm:text-sm text-[#222222] font-medium leading-relaxed">
                            Metodologi 3 tahap terstruktur yang memastikan kebiasaan sehat terbentuk secara konsisten tanpa kecurangan data.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-6">
                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                1
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Pilih Kohor &amp; Target</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Pilih program tantangan klinis 14–90 hari sesuai target biomarker Anda, didampingi dokter spesialis.
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                2
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Jalankan Micro-Habits</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Jalankan 3 tugas kebiasaan mikro harian terarah (hidrasi, eliminasi gula cair, jalan 15 menit pasca makan).
                            </p>
                        </div>

                        <div className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-1.5 sm:space-y-3 relative text-center flex flex-col items-center">
                            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center mx-auto shrink-0 shadow-xs">
                                3
                            </span>
                            <h4 className="font-bold text-[10px] sm:text-sm text-black leading-tight sm:leading-snug">Verifikasi 1x / Hari</h4>
                            <p className="text-[8.5px] sm:text-xs text-[#222222] font-medium leading-tight sm:leading-relaxed">
                                Unggah bukti kepatuhan harian dengan kunci kriptografis 24 jam untuk validitas rekam medis SatuSehat.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. CHALLENGE CATALOG SELECTOR (2 Cards per Row on Mobile) */}
                <div className="space-y-4">
                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                                Katalog Program Tantangan Klinis
                            </h2>
                            <p className="text-xs sm:text-sm text-[#222222] font-medium">
                                Kurasi program preventif teruji dengan bimbingan dokter spesialis konsultan IDI.
                            </p>
                        </div>

                        {/* Category filter tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap text-xs pb-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {[
                                { id: 'all', label: 'Semua Kategori' },
                                { id: 'nutrition', label: 'Pola Nutrisi' },
                                { id: 'activity', label: 'Aktivitas Kinetik' },
                                { id: 'circadian', label: 'Ritme Sirkadian' },
                                { id: 'medical', label: 'Kohor Medis 90H' },
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => setCategoryFilter(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        categoryFilter === cat.id
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : 'bg-white text-black border border-gray-400 hover:border-primary hover:text-primary font-bold'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Catalog Cards: 2 Columns on Mobile, 4 Columns on Large Screens */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                        {filteredChallengeEntries.map(([key, item]) => {
                            const isSelected = activeChallenge === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => {
                                        setActiveChallenge(key);
                                        setSimulatedProgress(6);
                                        setIsCheckedInToday(false);
                                        setSecurityAlert(null);
                                    }}
                                    className={`p-3 sm:p-5 rounded-2xl sm:rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 sm:space-y-3 relative overflow-hidden group ${
                                        isSelected
                                            ? 'bg-primary/5 border-primary shadow-xs ring-2 ring-primary/30'
                                            : 'bg-white border-[#c4dcce] hover:border-primary/50 hover:shadow-xs'
                                    }`}
                                >
                                    <div className="space-y-1.5 sm:space-y-2">
                                        {/* Top Row: Duration Pill & (if selected) AKTIF Badge */}
                                        <div className="flex items-center justify-between gap-1.5">
                                            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] sm:text-[10px] font-mono font-bold border border-primary/20 shrink-0">
                                                {item.durationLabel}
                                            </span>
                                            {isSelected && (
                                                <span className="bg-primary text-white px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold flex items-center gap-0.5 shrink-0 whitespace-nowrap shadow-2xs">
                                                    <span className="material-symbols-outlined text-[11px] sm:text-[12px]">check</span>
                                                    <span>AKTIF</span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Reward Line */}
                                        <div className="text-[9px] sm:text-[10px] font-mono text-[#445652] font-bold">
                                            +{item.dailyXp} XP/hari
                                        </div>

                                        <h4 className="font-heading font-bold text-xs sm:text-sm text-black leading-snug line-clamp-2">
                                            {item.title}
                                        </h4>

                                        <p className="text-[10px] sm:text-xs text-[#222222] font-medium line-clamp-2 leading-relaxed">
                                            {item.target}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-[#e2eee6] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#222222]">
                                        <span className="flex items-center gap-1 font-bold">
                                            <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-primary">group</span>
                                            <span>{item.participantsCount.toLocaleString('id-ID')}</span>
                                        </span>
                                        {isSelected ? (
                                            <span className="text-primary font-bold flex items-center gap-0.5">
                                                <span className="material-symbols-outlined text-[12px]">check_circle</span>
                                                <span>Terpilih</span>
                                            </span>
                                        ) : (
                                            <span className="text-primary font-bold">Pilih →</span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 6. MAIN INTERACTIVE SIMULATOR (Tab Navigation & Security Core) */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] shadow-xs p-4 sm:p-8 space-y-6 overflow-hidden">
                    {/* Simulator Header & Tab Switcher */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e2eee6] pb-5 w-full min-w-0">
                        <div className="space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold border border-primary/20">
                                    {current.category}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-[#445652] uppercase tracking-wider">
                                    Simulasi Kepatuhan
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-[10px] font-mono text-[#222222] font-bold">
                                    {current.activeCohort}
                                </span>
                            </div>
                            <h2 className="font-heading font-black text-xl sm:text-2xl text-black">
                                {current.title}
                            </h2>
                            <p className="text-xs text-[#222222] font-medium max-w-3xl leading-relaxed">
                                {current.target}
                            </p>
                        </div>

                        {/* Sub Tab Navigation */}
                        <div className="w-full lg:w-auto max-w-full min-w-0 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-1 bg-[#edf5f0] border border-[#d8e8de] rounded-2xl text-xs font-mono font-bold flex items-center gap-1.5 shrink-0">
                            {[
                                { id: 'tracker', label: 'Pelacak Harian', icon: 'task_alt' },
                                { id: 'calendar', label: 'Matriks Kalender', icon: 'calendar_month' },
                                { id: 'leaderboard', label: 'Leaderboard Kohor', icon: 'leaderboard' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setActiveTab(t.id)}
                                    className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                                        activeTab === t.id
                                            ? 'bg-primary text-white shadow-2xs'
                                            : 'text-black hover:text-primary font-bold'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Security Alert Notice Box */}
                    {securityAlert && (
                        <div
                            className={`p-4 rounded-2xl text-xs flex items-start gap-3 border animate-in fade-in duration-200 ${
                                securityAlert.type === 'locked'
                                    ? 'bg-rose-50 text-rose-950 border-rose-300'
                                    : securityAlert.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300'
                                    : 'bg-blue-50 text-blue-950 border-blue-300'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">
                                {securityAlert.type === 'locked'
                                    ? 'lock'
                                    : securityAlert.type === 'success'
                                    ? 'verified'
                                    : 'info'}
                            </span>
                            <div className="space-y-1 min-w-0 flex-1">
                                <span className="font-bold block text-sm">{securityAlert.title}</span>
                                <p className="leading-relaxed text-[11px] font-medium">{securityAlert.message}</p>
                                {securityAlert.type === 'locked' && (
                                    <div className="pt-1 flex items-center gap-2 font-mono text-[10px] font-bold">
                                        <span className="px-2 py-0.5 rounded bg-rose-200/60 text-rose-950">
                                            COOLDOWN RESET: {timeUntilReset}
                                        </span>
                                        <span className="text-gray-600">
                                            Gunakan panel tester di bawah jika ingin menguji alur esok hari.
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setSecurityAlert(null)}
                                className="text-gray-500 hover:text-black cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    {/* TAB 1: TRACKER & DAILY LOG */}
                    {activeTab === 'tracker' && (
                        <div className="space-y-6">
                            {/* Progress & Check-in Control Banner */}
                            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#f6faf7] border border-[#c4dcce] space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <span className="text-xs font-bold text-black block">
                                            Progres Tantangan: Hari Ke-{simulatedProgress} dari {totalDays} Hari
                                        </span>
                                        <span className="text-[11px] text-[#222222] font-mono font-medium">
                                            {totalDays - simulatedProgress} hari tersisa menuju lencana {current.badgeTitle}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-xs font-mono font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                                            {progressPercent}% Tuntas
                                        </span>
                                        <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                                            +{current.dailyXp} XP per Log
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-[#d8e8de] rounded-full h-3.5 overflow-hidden p-0.5">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-500 relative"
                                        style={{ width: `${progressPercent}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                                    </div>
                                </div>

                                {/* Single Daily Check-in Button Area (Anti-Spam Protected) */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#e2eee6]">
                                    <div className="space-y-0.5 text-xs text-[#222222]">
                                        <span className="font-bold text-black flex items-center gap-1.5">
                                            {isCheckedInToday ? (
                                                <>
                                                    <span className="material-symbols-outlined text-[16px] text-emerald-800 shrink-0">check_circle</span>
                                                    <span>Kepatuhan Hari Ini Sudah Tercatat &amp; Terkunci</span>
                                                </>
                                            ) : (
                                                <span>Hari Ini (Hari Ke-{simulatedProgress + 1}): Siap untuk Diverifikasi</span>
                                            )}
                                        </span>
                                        <span className="text-[11px] font-medium">
                                            {isCheckedInToday
                                                ? `Tervalidasi pada ${lastCheckInTimestamp}. Check-in berikutnya terbuka dalam ${timeUntilReset}.`
                                                : 'Selesaikan 3 tugas harian di bawah, lalu klik verifikasi untuk mengunci log hari ini.'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        {isCheckedInToday ? (
                                            <button
                                                type="button"
                                                onClick={handleAttemptCheckIn}
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold shadow-xs hover:bg-emerald-200 transition-all cursor-pointer"
                                                title="Klik untuk melihat penjelasan keamanan 1 check-in per hari"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">lock</span>
                                                <span>Sudah Check-In Hari Ini (Terkunci)</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleAttemptCheckIn}
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-all active:scale-95 cursor-pointer animate-pulse"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                                <span>Verifikasi &amp; Check-In Hari Ke-{simulatedProgress + 1}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Daily Micro-Habits Checklist for Today */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-heading font-bold text-sm text-black flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">checklist</span>
                                        <span>Daftar Tugas Kepatuhan Hari Ini (Micro-Habits):</span>
                                    </h4>
                                    <span className="text-[11px] font-mono text-[#222222] font-bold">
                                        Wajib selesai sebelum check-in
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {current.microHabits.map((task) => {
                                        const isChecked = dailyTasks[task.id];
                                        return (
                                            <div
                                                key={task.id}
                                                onClick={() => {
                                                    if (!isCheckedInToday) {
                                                        setDailyTasks((prev) => ({
                                                            ...prev,
                                                            [task.id]: !prev[task.id],
                                                        }));
                                                    }
                                                }}
                                                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                                                    isChecked
                                                        ? 'bg-primary/5 border-primary shadow-xs'
                                                        : 'bg-white border-[#c4dcce] hover:border-primary/50'
                                                } ${isCheckedInToday ? 'opacity-85 cursor-default' : ''}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="px-2 py-0.5 rounded-md bg-black/5 font-mono text-[10px] font-bold text-black">
                                                        {task.time}
                                                    </span>
                                                    <div
                                                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                                            isChecked
                                                                ? 'bg-primary text-white'
                                                                : 'border border-gray-400 text-transparent'
                                                        }`}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h5 className="font-bold text-xs sm:text-sm text-black leading-tight">
                                                        {task.title}
                                                    </h5>
                                                    <p className="text-[11px] text-[#222222] font-medium leading-relaxed">
                                                        {task.desc}
                                                    </p>
                                                </div>

                                                <span className="text-[10px] font-mono font-bold text-primary pt-1 border-t border-[#e2eee6] block">
                                                    {isChecked ? '✓ Tuntas Dijalankan' : 'Ketuk untuk Menandai'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 3 Milestones Roadmap */}
                            <div className="space-y-3 pt-2">
                                <h4 className="font-heading font-bold text-sm text-black flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                                    <span>Roadmap Tahapan Transformasi Biologis (PERKENI):</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {current.milestones.map((m, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-white border border-[#c4dcce] space-y-1.5"
                                        >
                                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold border border-primary/20">
                                                {m.phase}
                                            </span>
                                            <h5 className="text-xs sm:text-sm font-bold text-black leading-snug">{m.title}</h5>
                                            <p className="text-[11px] text-[#222222] font-medium leading-relaxed">{m.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: INTERACTIVE DAY-BY-DAY CALENDAR MATRIX */}
                    {activeTab === 'calendar' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div>
                                    <h4 className="font-heading font-bold text-sm text-black">
                                        Matriks Kepatuhan Harian ({totalDays} Hari Kalender):
                                    </h4>
                                    <p className="text-[11px] text-[#222222] font-medium">
                                        Klik pada hari yang sudah selesai untuk memeriksa log audit &amp; stempel waktu.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 font-mono text-[10px] font-bold">
                                    <span className="flex items-center gap-1 text-emerald-800">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Selesai
                                    </span>
                                    <span className="flex items-center gap-1 text-amber-700">
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Hari Ini
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-400">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block" /> Terkunci
                                    </span>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                                {Array.from({ length: totalDays }, (_, i) => {
                                    const dayNum = i + 1;
                                    const isPast = dayNum <= simulatedProgress;
                                    const isCurrent = dayNum === simulatedProgress + 1;
                                    const isFuture = dayNum > simulatedProgress + 1;

                                    return (
                                        <div
                                            key={dayNum}
                                            onClick={() => {
                                                if (isPast) {
                                                    setSelectedHistoryDay({
                                                        day: dayNum,
                                                        timestamp: `8 Okt 2026, 08:${10 + dayNum} WIB`,
                                                        status: 'Terverifikasi 100%',
                                                        hash: `AEV-AUDIT-${dayNum * 1234}`,
                                                        method: 'Foto Gelas & Deklarasi Mandiri',
                                                    });
                                                }
                                            }}
                                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between h-24 ${
                                                isPast
                                                    ? 'bg-emerald-50 border-emerald-300 hover:shadow-xs'
                                                    : isCurrent
                                                    ? isCheckedInToday
                                                        ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-500/30'
                                                        : 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/40 animate-pulse'
                                                    : 'bg-[#f6faf7] border-[#c4dcce] opacity-60 cursor-not-allowed'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between font-mono text-[10px]">
                                                <span className="font-bold text-black">Hari {dayNum}</span>
                                                {isPast && (
                                                    <span className="material-symbols-outlined text-[15px] text-emerald-700 font-bold">
                                                        check_circle
                                                    </span>
                                                )}
                                                {isCurrent && (
                                                    <span className="material-symbols-outlined text-[15px] text-amber-700 font-bold">
                                                        schedule
                                                    </span>
                                                )}
                                                {isFuture && (
                                                    <span className="material-symbols-outlined text-[14px] text-gray-400">
                                                        lock
                                                    </span>
                                                )}
                                            </div>

                                            <div className="my-auto">
                                                <span className="text-[11px] font-bold block leading-tight text-black">
                                                    {isPast
                                                        ? '+25 XP'
                                                        : isCurrent
                                                        ? isCheckedInToday
                                                            ? 'Selesai'
                                                            : 'Siap Log'
                                                        : 'Belum'}
                                                </span>
                                            </div>

                                            <span className="text-[9px] font-mono text-[#222222] font-semibold block truncate">
                                                {isPast
                                                    ? 'Tervalidasi'
                                                    : isCurrent
                                                    ? isCheckedInToday
                                                        ? 'Terkunci'
                                                        : 'Hari Ini'
                                                    : 'Terkunci'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Detail popup when clicking past days */}
                            {selectedHistoryDay && (
                                <div className="p-4 rounded-2xl bg-[#f6faf7] border border-[#c4dcce] flex items-center justify-between text-xs animate-in fade-in">
                                    <div className="space-y-0.5">
                                        <span className="font-bold text-black block">
                                            Audit Log Hari Ke-{selectedHistoryDay.day}
                                        </span>
                                        <p className="text-[11px] text-[#222222] font-medium">
                                            Waktu Pencatatan: <strong>{selectedHistoryDay.timestamp}</strong> • Metode: {selectedHistoryDay.method}
                                        </p>
                                        <span className="font-mono text-[10px] text-emerald-800 font-bold block">
                                            Hash Kriptografis: #{selectedHistoryDay.hash}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedHistoryDay(null)}
                                        className="px-3.5 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-black hover:bg-white transition-colors cursor-pointer"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 3: COHORT COMMUNITY LEADERBOARD */}
                    {activeTab === 'leaderboard' && (
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <div>
                                    <h4 className="font-heading font-bold text-sm text-black">
                                        Papan Peringkat Kohor Terverifikasi:
                                    </h4>
                                    <p className="text-[11px] text-[#222222] font-medium">
                                        Peserta yang konsisten menyelesaikan tantangan harian dengan audit kepatuhan anti-fraud.
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono text-[10px] font-bold">
                                    Anti-Bot Verified
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[#e2eee6] text-black font-mono text-[11px]">
                                            <th className="py-2.5 px-3 font-bold">Rank</th>
                                            <th className="py-2.5 px-3 font-bold">Peserta</th>
                                            <th className="py-2.5 px-3 font-bold">Streak Harian</th>
                                            <th className="py-2.5 px-3 font-bold">Kepatuhan</th>
                                            <th className="py-2.5 px-3 font-bold">Total XP</th>
                                            <th className="py-2.5 px-3 font-bold">Status Log Hari Ini</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e2eee6]">
                                        {cohortLeaderboard.map((user) => (
                                            <tr
                                                key={user.rank}
                                                className={user.isUser ? 'bg-primary/5 font-bold' : ''}
                                            >
                                                <td className="py-3 px-3 font-mono font-bold text-black">
                                                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-black">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 font-mono text-amber-700 font-bold">
                                                    🔥 {user.streak} Hari
                                                </td>
                                                <td className="py-3 px-3 font-mono font-bold text-primary">
                                                    {user.completion}
                                                </td>
                                                <td className="py-3 px-3 font-mono font-bold text-black">
                                                    {user.xp} XP
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 font-mono text-[10px] font-bold">
                                                        {user.badge}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                    {/* Evaluator Sandbox Control Bar */}
                    <div className="pt-4 border-t border-[#e2eee6]">
                        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-amber-950">
                                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                                    <span className="font-bold font-mono">
                                        Mode Sandbox Penguji: Evaluasi Siklus Keamanan 24 Jam
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSimulateNextDay}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-[11px] font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                                        title="Simulasikan pergantian tanggal kalender ke besok"
                                    >
                                        <span className="material-symbols-outlined text-[15px]">fast_forward</span>
                                        <span>Simulasikan Pergantian Hari (Besok)</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResetTodayStatus}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-950 font-mono text-[11px] font-bold hover:bg-amber-100 cursor-pointer transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[15px] text-amber-800">restart_alt</span>
                                        <span>Reset Status Hari Ini</span>
                                    </button>
                                </div>
                            </div>
                            <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                                Fitur sandbox ini disediakan untuk evaluator sistem agar dapat menguji transisi antar-hari tanpa harus menunggu 24 jam kalender sesungguhnya. Saat status terkunci, tombol check-in dicegah untuk diklik berulang kali di hari yang sama.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 7. CLINICAL COMPARISON: Tantangan Biasa vs Program Tantangan Klinis AEVYRA */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="font-heading font-black text-xl sm:text-3xl text-black">
                            Pencatatan Tantangan Biasa vs Program Tantangan Klinis AEVYRA
                        </h2>
                        <p className="text-xs sm:text-sm text-[#222222] font-medium">
                            Kebanyakan aplikasi kebiasaan hanya mengandalkan checklist mandiri yang mudah dicurangi. AEVYRA menerapkan protokol integritas medis komprehensif.
                        </p>
                    </div>

                    {/* Mobile Comparison Cards (Sebaris 2 Isi: grid-cols-2) */}
                    <div className="sm:hidden grid grid-cols-2 gap-2.5">
                        {comparisonRows.map((row, idx) => (
                            <div
                                key={idx}
                                className="p-2.5 rounded-2xl bg-surface-container-low border border-[#c4dcce] space-y-2 flex flex-col justify-between"
                            >
                                <div className="font-bold text-[11px] text-black border-b border-[#d8e8de] pb-1 min-w-0">
                                    <span className="truncate block">{row.dimension}</span>
                                </div>
                                <div className="space-y-1.5 text-xs flex-1 flex flex-col justify-between">
                                    <div className="p-2 rounded-xl bg-white border border-gray-200 text-[#333333] space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-gray-500 uppercase block">
                                            Konvensional
                                        </span>
                                        <p className="text-[10px] leading-snug">{row.conventional}</p>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-black space-y-0.5">
                                        <span className="text-[8.5px] font-mono font-bold text-primary uppercase block">
                                            Program Tantangan AEVYRA
                                        </span>
                                        <p className="text-[10px] font-semibold text-primary leading-snug">{row.aevyra}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Comparison Table */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#e2eee6] text-black font-mono">
                                    <th className="py-3 px-4 font-bold">Dimensi Evaluasi</th>
                                    <th className="py-3 px-4 text-[#333333] font-bold">Pencatatan Konvensional</th>
                                    <th className="py-3 px-4 text-primary font-bold bg-primary/5 rounded-t-xl">Program Tantangan AEVYRA</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e2eee6]">
                                {comparisonRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3.5 px-4 font-bold text-black">{row.dimension}</td>
                                        <td className="py-3.5 px-4 text-[#222222] font-medium">{row.conventional}</td>
                                        <td className="py-3.5 px-4 font-bold text-primary bg-primary/5">{row.aevyra}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 8. FAQ ACCORDION (Landing Page Accordion Style) */}
                <div className="bg-white rounded-3xl border border-[#c4dcce] p-6 sm:p-8 space-y-6 shadow-xs">
                    <div className="space-y-1">
                        <h2 className="font-heading font-black text-xl sm:text-2xl text-black">
                            Pertanyaan Umum Seputar Program Tantangan &amp; Proteksi Anti-Spam
                        </h2>
                    </div>

                    <div className="space-y-2.5">
                        {[
                            {
                                q: 'Mengapa AEVYRA membatasi check-in hanya 1 kali per hari?',
                                a: 'Kepatuhan metabolik tidak dapat dirapel atau dipalsukan. Pembatasan 1 check-in per hari menjaga integritas data biologis pasien dan memastikan pembentukan kebiasaan baru (neuroplastisitas) terjadi secara bertahap dan nyata.',
                            },
                            {
                                q: 'Bagaimana jika saya lupa melakukan check-in dalam 1 hari?',
                                a: 'Sistem menyediakan fitur "Streak Shield" (Pelindung Streak). Token ini otomatis melindungi catatan kepatuhan Anda jika terjadi halangan tak terduga, sehingga Anda tidak kehilangan motivasi untuk melanjutkan.',
                            },
                            {
                                q: 'Apakah bukti foto saya akan diperiksa oleh dokter?',
                                a: 'Ya, pada kohor medis intensif (seperti Protokol Remisi 90 Hari), log foto dan data sensor dievaluasi secara berkala oleh tim dokter spesialis pendamping untuk memberikan masukan nutrisi yang presisi.',
                            },
                            {
                                q: 'Apa manfaat mengumpulkan XP dan lencana tantangan?',
                                a: 'XP dan lencana merepresentasikan rekor kepatuhan Anda di Health Passport AEVYRA. Poin ini dapat ditukarkan dengan potongan biaya telekonsultasi dokter spesialis, voucher lab mitra, atau token pelindung streak tambahan.',
                            },
                            {
                                q: 'Apakah tantangan ini aman bagi penderita diabetes yang sedang mengonsumsi obat?',
                                a: 'Seluruh tantangan AEVYRA dirancang berdasarkan Konsensus Klinis PERKENI. Sebelum memulai kohor intensif, sistem menyarankan Anda berkonsultasi dengan dokter penanggung jawab untuk penyesuaian dosis obat yang aman.',
                            },
                        ].map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? 'bg-white border-[#1c6454]/40 shadow-[0_4px_20px_rgba(0,40,36,0.06)]'
                                            : 'bg-white/80 border-[#d5e5db] hover:border-[#1c6454]/30 hover:bg-white'
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-black cursor-pointer gap-4"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-primary font-bold">
                                                0{idx + 1}.
                                            </span>
                                            <span className="font-bold text-black">{faq.q}</span>
                                        </span>
                                        <span
                                            className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                                                isOpen
                                                    ? 'bg-primary text-white rotate-180 shadow-2xs'
                                                    : 'bg-[#edf5f0] text-primary rotate-0'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[18px] leading-none">
                                                expand_more
                                            </span>
                                        </span>
                                    </button>

                                    <div
                                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-5 pb-4 text-xs text-[#222222] font-medium leading-relaxed border-t border-[#f0f5f2] pt-3">
                                                {faq.a}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 9. BOTTOM CALL TO ACTION BANNER (Landing Page CtaBanner Style) */}
                <div className="relative overflow-hidden p-6 sm:p-10 lg:p-12 bg-primary text-white rounded-2xl sm:rounded-3xl space-y-4 text-center shadow-[0_12px_40px_rgba(0,67,62,0.18)]">
                    {/* Ambient Glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#1c6454]/30 rounded-full blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-primary-container/40 rounded-full blur-3xl"
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-3.5 max-w-2xl mx-auto">
                        <h3 className="font-serif text-xl sm:text-3xl lg:text-[40px] leading-[1.2] font-normal text-white">
                            Mulai Tantangan Sehat &amp; Bangun Kepatuhan Nyata
                        </h3>

                        <p className="text-xs sm:text-sm text-[#d4ebe0] max-w-xl mx-auto leading-relaxed">
                            Bergabunglah dengan ribuan peserta dalam kohor terverifikasi. Raih biomarker ideal didampingi dokter spesialis terpercaya.
                        </p>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white text-primary text-[11px] sm:text-xs font-bold hover:bg-[#f3f9f5] transition-all active:scale-95 shadow-xs text-center gap-1.5 cursor-pointer"
                            >
                                <span>Daftar Akun Gratis</span>
                                <span className="ml-1 text-xs">→</span>
                            </Link>
                            <Link
                                href="/demo/tracker"
                                className="inline-flex items-center justify-center min-h-10 sm:min-h-12 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/10 backdrop-blur-xs text-white text-[11px] sm:text-xs font-semibold hover:bg-white/20 transition-all active:scale-95 border border-white/20 text-center gap-1.5 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[16px]">monitoring</span>
                                <span>Lihat Demo Tracker Baseline</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* VERIFICATION PROOF MODAL (Anti-Cheat Single Log Entry) */}
            {isVerificationModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white text-black max-w-lg w-full p-6 sm:p-7 rounded-3xl shadow-2xl border border-[#c4dcce] space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-[#e2eee6] pb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                    <span className="material-symbols-outlined text-[22px]">verified</span>
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-base text-black">
                                        Verifikasi Kepatuhan Hari Ke-{simulatedProgress + 1}
                                    </h3>
                                    <p className="text-xs text-[#222222] font-mono font-medium">
                                        {current.title}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsVerificationModalOpen(false)}
                                className="text-gray-400 hover:text-black p-1 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>

                        {/* Checklist Confirmation */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-black block">
                                Konfirmasi Penyelesaian 3 Tugas Harian:
                            </label>
                            <div className="space-y-2 text-xs">
                                {current.microHabits.map((task) => (
                                    <label
                                        key={task.id}
                                        className="p-3 rounded-xl border border-[#c4dcce] bg-[#f6faf7] flex items-center gap-3 cursor-pointer hover:bg-emerald-50/50 transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={dailyTasks[task.id]}
                                            onChange={(e) =>
                                                setDailyTasks((prev) => ({
                                                    ...prev,
                                                    [task.id]: e.target.checked,
                                                }))
                                            }
                                            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                                        />
                                        <div className="min-w-0">
                                            <span className="font-bold block text-black">{task.title}</span>
                                            <span className="text-[11px] text-[#222222] font-medium block">{task.desc}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Proof Submission Tabs */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-black block">
                                Pilih Bukti Kepatuhan Hari Ini:
                            </label>
                            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                                {[
                                    { id: 'photo', label: 'Foto Bukti', icon: 'photo_camera' },
                                    { id: 'sensor', label: 'Sinkron Sensor', icon: 'watch' },
                                    { id: 'declaration', label: 'Deklarasi Mandiri', icon: 'signature' },
                                ].map((m) => (
                                    <button
                                        key={m.id}
                                        type="button"
                                        onClick={() => setProofMethod(m.id)}
                                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                                            proofMethod === m.id
                                                ? 'bg-primary text-white border-primary shadow-xs font-bold'
                                                : 'bg-white border-gray-300 text-black hover:border-primary font-medium'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                                        <span className="text-[10px]">{m.label}</span>
                                    </button>
                                ))}
                            </div>

                            {proofMethod === 'photo' && (
                                <div className="p-4 rounded-2xl bg-[#f6faf7] border border-dashed border-[#c4dcce] text-center space-y-2">
                                    <span className="material-symbols-outlined text-[28px] text-primary">add_a_photo</span>
                                    <p className="text-xs text-[#222222] font-medium">
                                        {photoUploaded
                                            ? '✓ Foto gelas air / piring berhasil diunggah'
                                            : 'Unggah foto botol air mineral / piring makan hari ini'}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setPhotoUploaded(true)}
                                        className="px-3.5 py-1.5 rounded-xl bg-white border border-[#c4dcce] text-xs font-bold text-primary hover:bg-gray-50 cursor-pointer shadow-2xs"
                                    >
                                        {photoUploaded ? 'Ganti Foto' : 'Pilih dari Galeri / Kamera'}
                                    </button>
                                </div>
                            )}

                            {proofMethod === 'sensor' && (
                                <div className="p-3.5 rounded-2xl bg-[#f6faf7] border border-[#c4dcce] text-xs flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[20px] text-emerald-700">sync_saved_locally</span>
                                        <div>
                                            <span className="font-bold block text-black">Smartwatch Sensor Sinkron</span>
                                            <span className="text-[10px] text-[#222222] font-medium">Apple Health / Google Fit Protocol</span>
                                        </div>
                                    </div>
                                    <span className="font-mono text-[10px] font-bold text-emerald-950 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                                        Terhubung
                                    </span>
                                </div>
                            )}

                            {proofMethod === 'declaration' && (
                                <div className="p-3.5 rounded-2xl bg-[#f6faf7] border border-[#c4dcce] text-xs space-y-1">
                                    <span className="font-bold text-black block">Pernyataan Integritas Pasien:</span>
                                    <p className="text-[11px] text-[#222222] font-medium leading-relaxed">
                                        "Saya menyatakan dengan jujur telah mematuhi protokol bebas gula cair hari ini demi keselamatan dan perbaikan kesehatan metabolik saya sendiri."
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Security Stamp Notice */}
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-950 flex items-center gap-2 font-mono font-medium">
                            <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
                            <span>Kunci Otomatis 24 Jam • Mencegah Duplikasi Log di Hari yang Sama</span>
                        </div>

                        {/* Modal Actions */}
                        <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#e2eee6]">
                            <button
                                type="button"
                                onClick={() => setIsVerificationModalOpen(false)}
                                className="px-4 py-2.5 rounded-full border border-gray-300 text-xs font-bold text-black hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmVerification}
                                className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[16px]">lock</span>
                                <span>Konfirmasi &amp; Kunci Log Hari Ini</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MarketingLayout>
    );
}
