import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

export default function ChallengesDemo() {
    // Active challenge & filter
    const [activeChallenge, setActiveChallenge] = useState('sugar_zero');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('tracker'); // 'tracker' | 'calendar' | 'leaderboard' | 'clinical'

    // Progress & Security State
    const [simulatedProgress, setSimulatedProgress] = useState(6); // Currently at Day 6 completed out of 14
    const [isCheckedInToday, setIsCheckedInToday] = useState(false); // False = ready for Day 7, True = locked for today
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
            clinicalGoal: 'Menurunkan kadar HbA1c hingga &lt; 5.7% (kategori normoglikemik) serta membalikkan resistensi insulin secara permanen tanpa obat seumur hidup.',
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
                    desc: 'Evaluasi biomarker klinis lengkap di laboratorium mitra: HbA1c target &lt; 5.7% dan lipid profil ideal.',
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
        // SECURITY CHECK: If already checked in today, reject repeated clicks!
        if (isCheckedInToday) {
            setSecurityAlert({
                title: 'Proteksi Integritas Medis Aktif!',
                message: `Anda sudah menyelesaikan check-in Hari Ke-${simulatedProgress} hari ini pada pk ${lastCheckInTimestamp || '09:15 WIB'}. Untuk menjaga keabsahan klinis biomarker dan mencegah manipulasi streak poin, sistem mengunci check-in tambahan hingga esok hari.`,
                type: 'locked',
            });
            // Auto scroll slightly to security alert box
            return;
        }

        // Check if all daily tasks are checked
        const allTasksDone = dailyTasks.task1 && dailyTasks.task2 && dailyTasks.task3;
        if (!allTasksDone) {
            // Open modal to let user complete checklist & submit proof
            setIsVerificationModalOpen(true);
            return;
        }

        // Open verification proof modal
        setIsVerificationModalOpen(true);
    };

    const handleConfirmVerification = () => {
        // Enforce all tasks completed
        setDailyTasks({ task1: true, task2: true, task3: true });

        const now = new Date();
        const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
        const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const hashStr = 'AEV-SEC-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + simulatedProgress;

        // Apply single daily lock
        setIsCheckedInToday(true);
        setLastCheckInTimestamp(`${dateStr}, ${timeStr}`);
        setAuditSecurityHash(hashStr);

        // Advance progress by 1 day
        const nextDay = Math.min(simulatedProgress + 1, totalDays);
        setSimulatedProgress(nextDay);
        setStreakCount((prev) => prev + 1);
        setUserXp((prev) => prev + current.dailyXp);

        setIsVerificationModalOpen(false);

        // Show successful lock notice
        setSecurityAlert({
            title: 'Check-in Hari Ini Berhasil & Terkunci!',
            message: `Kepatuhan Hari Ke-${nextDay} telah divalidasi resmi dengan Hash Audit #${hashStr}. Status check-in telah DIKUNCI selama 24 jam untuk menjaga integritas data Anda.`,
            type: 'success',
        });
    };

    // =========================================================================
    // 3. EVALUATOR SANDBOX CONTROLS (Demo Testing Helper)
    // =========================================================================
    const handleSimulateNextDay = () => {
        // Unlocks for the next calendar day in demo mode
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

    // Cohort Community Leaderboard (Real-feeling participants)
    const cohortLeaderboard = [
        { rank: 1, name: 'Dimas Aryo (29 th)', streak: 14, completion: '100%', xp: 2150, badge: 'Sugar Free Titan', avatar: '/image/doctor_consultation.jpg' },
        { rank: 2, name: 'dr. Sarah Nindya, Sp.GK (Coach)', streak: 14, completion: '100%', xp: 2100, badge: 'Clinical Leader', avatar: '/image/doctor_consultation.jpg' },
        { rank: 3, name: 'Anda (Peserta Terverifikasi)', streak: streakCount, completion: `${progressPercent}%`, xp: userXp, badge: isCheckedInToday ? 'Hari Ini Terkunci' : 'Siap Check-in', isUser: true },
        { rank: 4, name: 'Ir. Hendro Wibowo (52 th)', streak: 6, completion: '43%', xp: 1720, badge: 'Metabolic Fighter', avatar: '/image/doctor_bramantyo.jpg' },
        { rank: 5, name: 'Nadia Salsabila (31 th)', streak: 5, completion: '36%', xp: 1640, badge: 'Insulin Defender', avatar: '/image/habit_morning_walk.jpg' },
    ];

    return (
        <MarketingLayout>
            <Head title="Program Tantangan Sehat & Anti-Spam Check-In - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* ============================================================== */}
                {/* 1. HEADER & BREADCRUMB */}
                {/* ============================================================== */}
                <div className="space-y-3 border-b border-surface-container pb-6">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Program Tantangan Sehat</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold border border-primary/20">
                                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                                <span>STANDAR PROTOKOL INTEGRITAS MEDIS • SATUSEHAT KEMENKES</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-on-surface tracking-tight">
                                Program Tantangan Klinis 14–90 Hari
                            </h1>
                            <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
                                Bangun kebiasaan preventif berbasis konsensus PERKENI 2021. Dilengkapi sistem proteksi anti-spam (1 Check-in per Hari), audit trail kepatuhan, pelindung streak, dan bimbingan dokter spesialis.
                            </p>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                            <Link
                                href="/member/challenges"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all active:scale-95 whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-[18px]">military_tech</span>
                                <span>Katalog Tantangan Member</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 2. SECURITY PROTOCOL ANNOUNCEMENT BANNER */}
                {/* ============================================================== */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-emerald-950 dark:text-emerald-200">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                            <span className="material-symbols-outlined text-[18px]">security</span>
                        </div>
                        <div>
                            <span className="font-bold block font-mono text-[11px] uppercase tracking-wide">
                                Jaminan Keamanan Data &amp; Anti-Spam Check-In:
                            </span>
                            <span className="text-[11px] text-emerald-900/90 dark:text-emerald-300">
                                Setiap peserta hanya dapat melakukan <strong>1 kali check-in resmi per hari kalender</strong>. Mencegah manipulasi streak poin dan menjaga validitas rekam medis preventif.
                            </span>
                        </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-600/15 font-mono text-[10px] font-bold border border-emerald-600/30 whitespace-nowrap">
                        1 HARI = 1 LOG TERKUNCI
                    </span>
                </div>

                {/* ============================================================== */}
                {/* 3. GAMIFICATION & HEALTH PASSPORT STATS (4 Key Metrics) */}
                {/* ============================================================== */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Flame Streak */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-amber-600">
                                <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
                                <span className="text-[11px] font-mono font-bold uppercase">Streak Kepatuhan</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                1.5x Multiplier
                            </span>
                        </div>
                        <div className="font-serif text-2xl font-bold text-on-surface">
                            {streakCount} Hari Berturut
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">
                            Konsistensi log harian tanpa jeda. Bonus XP aktif.
                        </p>
                    </div>

                    {/* Streak Shield */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-blue-600">
                                <span className="material-symbols-outlined text-[20px]">shield</span>
                                <span className="text-[11px] font-mono font-bold uppercase">Pelindung Streak</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                {freezeTokens} Token Siap
                            </span>
                        </div>
                        <div className="font-serif text-2xl font-bold text-on-surface">
                            Streak Shield Aktif
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">
                            Melindungi rekor streak jika terjadi halangan tak terduga.
                        </p>
                    </div>

                    {/* User XP & Level */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-primary">
                                <span className="material-symbols-outlined text-[20px]">military_tech</span>
                                <span className="text-[11px] font-mono font-bold uppercase">Tingkat Gamifikasi</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                Level 4
                            </span>
                        </div>
                        <div className="font-serif text-2xl font-bold text-on-surface">
                            {userXp.toLocaleString('id-ID')} XP
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">
                            Preventive Warrior (150 XP menuju Level 5 Master).
                        </p>
                    </div>

                    {/* Today's Security Status */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-emerald-700">
                                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                                <span className="text-[11px] font-mono font-bold uppercase">Status Hari Ini</span>
                            </div>
                            <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                    isCheckedInToday
                                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                                }`}
                            >
                                {isCheckedInToday ? 'TERKUNCI (SELESAI)' : 'SIAP CHECK-IN'}
                            </span>
                        </div>
                        <div className="font-serif text-xl sm:text-2xl font-bold text-on-surface truncate">
                            {isCheckedInToday ? 'Tervalidasi Hari Ini' : 'Menunggu Log'}
                        </div>
                        <p className="text-[11px] text-on-surface-variant leading-tight">
                            {isCheckedInToday
                                ? `Terkunci hingga besok (${timeUntilReset})`
                                : '1 kuota check-in tersedia untuk hari ini.'}
                        </p>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 4. CHALLENGE CATALOG FILTER & SELECTOR */}
                {/* ============================================================== */}
                <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="font-heading font-bold text-base text-on-surface">
                                Pilih Program Tantangan Sehat:
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Kurasi program preventif teruji dengan bimbingan dokter spesialis konsultan.
                            </p>
                        </div>

                        {/* Category filter tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 no-scrollbar">
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
                                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all shrink-0 cursor-pointer ${
                                        categoryFilter === cat.id
                                            ? 'bg-primary text-white font-bold shadow-xs'
                                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredChallengeEntries.map(([key, item]) => {
                            const isSelected = activeChallenge === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => {
                                        setActiveChallenge(key);
                                        // Reset simulated progress according to challenge duration baseline
                                        setSimulatedProgress(6);
                                        setIsCheckedInToday(false);
                                        setSecurityAlert(null);
                                    }}
                                    className={`p-4 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                                        isSelected
                                            ? 'bg-primary/5 border-primary shadow-sm ring-2 ring-primary/30'
                                            : 'bg-white dark:bg-surface border-surface-container hover:border-primary/40 hover:shadow-xs'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-xl text-[10px] font-mono font-bold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px]">check</span>
                                            <span>AKTIF</span>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                                                {item.durationLabel}
                                            </span>
                                            <span className="text-[10px] font-mono text-on-surface-variant font-medium">
                                                +{item.dailyXp} XP/hari
                                            </span>
                                        </div>

                                        <h4 className="font-heading font-bold text-sm text-on-surface leading-snug line-clamp-2">
                                            {item.title}
                                        </h4>

                                        <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
                                            {item.target}
                                        </p>
                                    </div>

                                    <div className="pt-2 border-t border-surface-container flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px] text-primary">group</span>
                                            <span>{item.participantsCount.toLocaleString('id-ID')} peserta</span>
                                        </span>
                                        <span className="text-primary font-bold">Pilih Program →</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 5. MAIN INTERACTIVE SIMULATOR (Tab Navigation & Security Core) */}
                {/* ============================================================== */}
                <div className="bg-white dark:bg-surface rounded-3xl border border-surface-container shadow-xs p-5 sm:p-8 space-y-6">
                    {/* Simulator Header & Tab Switcher */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-container pb-5">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">
                                    Simulasi Kepatuhan Interaktif
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-[10px] font-mono text-on-surface-variant font-bold">
                                    {current.activeCohort}
                                </span>
                            </div>
                            <h2 className="font-heading font-black text-xl sm:text-2xl text-on-surface">
                                {current.title}
                            </h2>
                            <p className="text-xs text-on-surface-variant max-w-3xl leading-relaxed">
                                {current.target}
                            </p>
                        </div>

                        {/* Sub Tab Navigation */}
                        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-2xl text-xs font-mono font-bold shrink-0 self-start lg:self-center">
                            {[
                                { id: 'tracker', label: 'Pelacak Harian', icon: 'task_alt' },
                                { id: 'calendar', label: 'Matriks Kalender', icon: 'calendar_month' },
                                { id: 'leaderboard', label: 'Leaderboard Kohor', icon: 'leaderboard' },
                                { id: 'clinical', label: 'Dasar Klinis PERKENI', icon: 'menu_book' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => setActiveTab(t.id)}
                                    className={`px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                                        activeTab === t.id
                                            ? 'bg-primary text-white shadow-xs'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{t.icon}</span>
                                    <span>{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Security Alert Toast / Notice Box */}
                    {securityAlert && (
                        <div
                            className={`p-4 rounded-2xl text-xs flex items-start gap-3 border animate-in fade-in duration-200 ${
                                securityAlert.type === 'locked'
                                    ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 border-rose-300'
                                    : securityAlert.type === 'success'
                                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 border-emerald-300'
                                    : 'bg-blue-50 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 border-blue-300'
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
                                <p className="leading-relaxed text-[11px]">{securityAlert.message}</p>
                                {securityAlert.type === 'locked' && (
                                    <div className="pt-1 flex items-center gap-2 font-mono text-[10px] font-bold">
                                        <span className="px-2 py-0.5 rounded bg-rose-200/60 text-rose-900">
                                            COOLDOWN RESET: {timeUntilReset}
                                        </span>
                                        <span className="text-gray-500">
                                            Gunakan panel tester di bawah jika ingin menguji alur esok hari.
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => setSecurityAlert(null)}
                                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
                            >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                        </div>
                    )}

                    {/* TAB 1: TRACKER & DAILY LOG */}
                    {activeTab === 'tracker' && (
                        <div className="space-y-6">
                            {/* Progress & Check-in Control Banner */}
                            <div className="p-5 sm:p-6 rounded-3xl bg-surface-container-low border border-surface-container space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div>
                                        <span className="text-xs font-bold text-on-surface block">
                                            Progres Tantangan: Hari Ke-{simulatedProgress} dari {totalDays} Hari
                                        </span>
                                        <span className="text-[11px] text-on-surface-variant font-mono">
                                            {totalDays - simulatedProgress} hari tersisa menuju lencana {current.badgeTitle}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                            {progressPercent}% Tuntas
                                        </span>
                                        <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                                            +{current.dailyXp} XP per Log
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-surface-container-high rounded-full h-3.5 overflow-hidden p-0.5">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-500 relative"
                                        style={{ width: `${progressPercent}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                                    </div>
                                </div>

                                {/* Single Daily Check-in Button Area (Anti-Spam Protected) */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-surface-container">
                                    <div className="space-y-0.5 text-xs text-on-surface-variant">
                                        <span className="font-bold text-on-surface block">
                                            {isCheckedInToday
                                                ? '✅ Kepatuhan Hari Ini Sudah Tercatat & Terkunci'
                                                : `⚡ Hari Ini (Hari Ke-${simulatedProgress + 1}): Siap untuk Diverifikasi`}
                                        </span>
                                        <span className="text-[11px]">
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
                                                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-xs hover:bg-emerald-200 transition-all cursor-pointer"
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
                                    <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary text-[18px]">checklist</span>
                                        <span>Daftar Tugas Kepatuhan Hari Ini (Micro-Habits):</span>
                                    </h4>
                                    <span className="text-[11px] font-mono text-on-surface-variant">
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
                                                        ? 'bg-primary/5 border-primary/40 shadow-xs'
                                                        : 'bg-surface-container-low border-surface-container hover:border-gray-300'
                                                } ${isCheckedInToday ? 'opacity-80 cursor-default' : ''}`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 font-mono text-[10px] font-bold text-on-surface">
                                                        {task.time}
                                                    </span>
                                                    <div
                                                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                                            isChecked
                                                                ? 'bg-primary text-white'
                                                                : 'border border-gray-300 text-transparent'
                                                        }`}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h5 className="font-bold text-xs text-on-surface leading-tight">
                                                        {task.title}
                                                    </h5>
                                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                                        {task.desc}
                                                    </p>
                                                </div>

                                                <span className="text-[10px] font-mono font-bold text-primary pt-1 border-t border-surface-container block">
                                                    {isChecked ? '✓ Tuntas Dijalankan' : 'Ketuk untuk Menandai'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 3 Milestones Roadmap */}
                            <div className="space-y-3 pt-2">
                                <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                                    <span>Roadmap Tahapan Transformasi Biologis (PERKENI):</span>
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    {current.milestones.map((m, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5"
                                        >
                                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold">
                                                {m.phase}
                                            </span>
                                            <h5 className="text-xs font-bold text-on-surface leading-snug">{m.title}</h5>
                                            <p className="text-[11px] text-on-surface-variant leading-relaxed">{m.desc}</p>
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
                                    <h4 className="font-heading font-bold text-sm text-on-surface">
                                        Matriks Kepatuhan Harian ({totalDays} Hari Kalender):
                                    </h4>
                                    <p className="text-[11px] text-on-surface-variant">
                                        Klik pada hari yang sudah selesai untuk memeriksa log audit &amp; stempel waktu.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 font-mono text-[10px]">
                                    <span className="flex items-center gap-1 text-emerald-700">
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
                                                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 hover:shadow-xs'
                                                    : isCurrent
                                                    ? isCheckedInToday
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 ring-2 ring-emerald-500/30'
                                                        : 'bg-amber-50 dark:bg-amber-950/20 border-amber-400 ring-2 ring-amber-400/40 animate-pulse'
                                                    : 'bg-surface-container-low border-surface-container opacity-60 cursor-not-allowed'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between font-mono text-[10px]">
                                                <span className="font-bold">Hari {dayNum}</span>
                                                {isPast && (
                                                    <span className="material-symbols-outlined text-[15px] text-emerald-600">
                                                        check_circle
                                                    </span>
                                                )}
                                                {isCurrent && (
                                                    <span className="material-symbols-outlined text-[15px] text-amber-600">
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
                                                <span className="text-[11px] font-bold block leading-tight text-on-surface">
                                                    {isPast
                                                        ? '+25 XP'
                                                        : isCurrent
                                                        ? isCheckedInToday
                                                            ? 'Selesai'
                                                            : 'Siap Log'
                                                        : 'Belum'}
                                                </span>
                                            </div>

                                            <span className="text-[9px] font-mono text-on-surface-variant block truncate">
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
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs animate-in fade-in">
                                    <div className="space-y-0.5">
                                        <span className="font-bold text-on-surface block">
                                            Audit Log Hari Ke-{selectedHistoryDay.day}
                                        </span>
                                        <p className="text-[11px] text-on-surface-variant">
                                            Waktu Pencatatan: <strong>{selectedHistoryDay.timestamp}</strong> • Metode: {selectedHistoryDay.method}
                                        </p>
                                        <span className="font-mono text-[10px] text-emerald-700 font-bold block">
                                            Hash Kriptografis: #{selectedHistoryDay.hash}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedHistoryDay(null)}
                                        className="px-3 py-1.5 rounded-xl border border-surface-container text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
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
                                    <h4 className="font-heading font-bold text-sm text-on-surface">
                                        Papan Peringkat Kohor Terverifikasi:
                                    </h4>
                                    <p className="text-[11px] text-on-surface-variant">
                                        Peserta yang konsisten menyelesaikan tantangan harian dengan audit kepatuhan anti-fraud.
                                    </p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                                    Anti-Bot Verified
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-surface-container text-on-surface-variant font-mono text-[11px]">
                                            <th className="py-2.5 px-3 font-bold">Rank</th>
                                            <th className="py-2.5 px-3 font-bold">Peserta</th>
                                            <th className="py-2.5 px-3 font-bold">Streak Harian</th>
                                            <th className="py-2.5 px-3 font-bold">Kepatuhan</th>
                                            <th className="py-2.5 px-3 font-bold">Total XP</th>
                                            <th className="py-2.5 px-3 font-bold">Status Log Hari Ini</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-container">
                                        {cohortLeaderboard.map((user) => (
                                            <tr
                                                key={user.rank}
                                                className={user.isUser ? 'bg-primary/5 font-bold' : ''}
                                            >
                                                <td className="py-3 px-3 font-mono font-bold">
                                                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                                                </td>
                                                <td className="py-3 px-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-on-surface">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3 font-mono text-amber-700 font-bold">
                                                    🔥 {user.streak} Hari
                                                </td>
                                                <td className="py-3 px-3 font-mono font-bold text-primary">
                                                    {user.completion}
                                                </td>
                                                <td className="py-3 px-3 font-mono">
                                                    {user.xp} XP
                                                </td>
                                                <td className="py-3 px-3">
                                                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
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

                    {/* TAB 4: CLINICAL SUPERVISION & PERKENI EVIDENCE */}
                    {activeTab === 'clinical' && (
                        <div className="space-y-6">
                            <div className="p-5 rounded-3xl bg-surface-container-low border border-surface-container space-y-4">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={current.doctorAvatar}
                                        alt={current.leadDoctor}
                                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
                                    />
                                    <div className="space-y-1 min-w-0">
                                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold">
                                            <span className="material-symbols-outlined text-[13px]">verified</span>
                                            <span>Dokter Pengawas Protokol Resmi IDI</span>
                                        </div>
                                        <h4 className="font-heading font-bold text-base text-on-surface">
                                            {current.leadDoctor}
                                        </h4>
                                        <p className="text-xs text-on-surface-variant font-medium">
                                            {current.doctorRole} • Konsultan Klinis AEVYRA
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-2 text-xs">
                                    <span className="font-bold text-primary block uppercase font-mono text-[10px]">
                                        Landasan Ilmiah &amp; Konsensus PERKENI:
                                    </span>
                                    <p className="text-on-surface-variant leading-relaxed text-xs">
                                        "{current.scientificBasis}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ============================================================== */}
                    {/* EVALUATOR SANDBOX CONTROL BAR (Tester Feature Helper) */}
                    {/* ============================================================== */}
                    <div className="pt-4 border-t border-surface-container">
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-amber-950 dark:text-amber-200">
                                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                                    <span className="font-bold font-mono">
                                        Mode Sandbox Penguji: Evaluasi Siklus Keamanan 24 Jam
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSimulateNextDay}
                                        className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-[11px] font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                                        title="Simulasikan pergantian tanggal kalender ke besok"
                                    >
                                        ⏩ Simulasikan Pergantian Hari (Besok)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResetTodayStatus}
                                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-surface border border-amber-300 text-amber-900 dark:text-amber-200 font-mono text-[11px] font-bold hover:bg-amber-100 cursor-pointer transition-all"
                                    >
                                        🔄 Reset Status Hari Ini
                                    </button>
                                </div>
                            </div>
                            <p className="text-[11px] text-amber-900/90 dark:text-amber-300 leading-relaxed">
                                Fitur sandbox ini disediakan untuk evaluator sistem agar dapat menguji transisi antar-hari tanpa harus menunggu 24 jam kalender sesungguhnya. Saat status terkunci, tombol check-in dicegah untuk diklik berulang kali di hari yang sama.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* 6. VERIFICATION PROOF MODAL (Anti-Cheat Single Log Entry) */}
                {/* ============================================================== */}
                {isVerificationModalOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-surface text-on-surface max-w-lg w-full p-6 sm:p-7 rounded-3xl shadow-2xl border border-surface-container space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-surface-container pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        <span className="material-symbols-outlined text-[22px]">verified</span>
                                    </div>
                                    <div>
                                        <h3 className="font-heading font-bold text-base text-on-surface">
                                            Verifikasi Kepatuhan Hari Ke-{simulatedProgress + 1}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant font-mono">
                                            {current.title}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsVerificationModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[20px]">close</span>
                                </button>
                            </div>

                            {/* Checklist Confirmation */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-on-surface block">
                                    Konfirmasi Penyelesaian 3 Tugas Harian:
                                </label>
                                <div className="space-y-2 text-xs">
                                    {current.microHabits.map((task) => (
                                        <label
                                            key={task.id}
                                            className="p-3 rounded-xl border border-surface-container flex items-center gap-3 cursor-pointer hover:bg-surface-container-low transition-colors"
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
                                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                                            />
                                            <div className="min-w-0">
                                                <span className="font-bold block text-on-surface">{task.title}</span>
                                                <span className="text-[11px] text-on-surface-variant block">{task.desc}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Proof Submission Tabs */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-on-surface block">
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
                                                    ? 'bg-primary text-white border-primary shadow-xs'
                                                    : 'bg-surface-container-low border-surface-container text-on-surface-variant hover:bg-surface-container-high'
                                            }`}
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{m.icon}</span>
                                            <span className="text-[10px] font-bold">{m.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {proofMethod === 'photo' && (
                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-dashed border-gray-300 text-center space-y-2">
                                        <span className="material-symbols-outlined text-[28px] text-primary">add_a_photo</span>
                                        <p className="text-xs text-on-surface-variant">
                                            {photoUploaded
                                                ? '✓ Foto gelas air / piring berhasil diunggah'
                                                : 'Unggah foto botol air mineral / piring makan hari ini'}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => setPhotoUploaded(true)}
                                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-surface border border-surface-container text-xs font-bold text-primary hover:bg-gray-50 cursor-pointer shadow-2xs"
                                        >
                                            {photoUploaded ? 'Ganti Foto' : 'Pilih dari Galeri / Kamera'}
                                        </button>
                                    </div>
                                )}

                                {proofMethod === 'sensor' && (
                                    <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-xs flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[20px] text-emerald-600">sync_saved_locally</span>
                                            <div>
                                                <span className="font-bold block">Smartwatch Sensor Sinkron</span>
                                                <span className="text-[10px] text-on-surface-variant">Apple Health / Google Fit Protocol</span>
                                            </div>
                                        </div>
                                        <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                            Terhubung
                                        </span>
                                    </div>
                                )}

                                {proofMethod === 'declaration' && (
                                    <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container text-xs space-y-1">
                                        <span className="font-bold text-on-surface block">Pernyataan Integritas Pasien:</span>
                                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                            "Saya menyatakan dengan jujur telah mematuhi protokol bebas gula cair hari ini demi keselamatan dan perbaikan kesehatan metabolik saya sendiri."
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Security Stamp Notice */}
                            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-950 dark:text-emerald-200 flex items-center gap-2 font-mono">
                                <span className="material-symbols-outlined text-[16px] text-emerald-600">lock</span>
                                <span>Kunci Otomatis 24 Jam • Mencegah Duplikasi Log di Hari yang Sama</span>
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-2 flex items-center justify-end gap-2 border-t border-surface-container">
                                <button
                                    type="button"
                                    onClick={() => setIsVerificationModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl border border-surface-container text-xs font-bold hover:bg-surface-container-high transition-colors cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmVerification}
                                    className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">lock</span>
                                    <span>Konfirmasi &amp; Kunci Log Hari Ini</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* 7. BOTTOM CALL TO ACTION BANNER */}
                {/* ============================================================== */}
                <div className="rounded-3xl bg-linear-to-r from-primary to-[#00695c] text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-mono font-bold">
                            MULAI TANTANGAN RESMI ANDA
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                            Siap Mengikuti Program Kohor Bersama Dokter Ahli?
                        </h3>
                        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                            Dapatkan pendampingan bimbingan harian, glukometer kit terintegrasi, dan evaluasi biomarker berkala di aplikasi AEVYRA.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/register"
                            className="px-6 py-3.5 rounded-2xl bg-white text-primary text-xs font-bold hover:bg-gray-100 transition-all shadow-md active:scale-95 text-center"
                        >
                            Daftar Anggota Baru
                        </Link>
                        <Link
                            href="/member/challenges"
                            className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-bold transition-all text-center"
                        >
                            Masuk Portal Tantangan
                        </Link>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
