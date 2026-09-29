import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';

// =============================================================================
// COMPREHENSIVE FEMALE 28-DAY METABOLIC & HORMONE DATABASE (POGI & ENDOCRINE GROUNDED)
// =============================================================================
const FEMALE_PHASES = {
    menstrual: {
        id: 'menstrual',
        dayRange: 'Hari 1 - 5',
        name: 'Fase Menstruasi',
        subName: 'Deskuamasi Endometrium & Reset Hormonal',
        insulinSensitivityScore: 68,
        insulinSensitivityLabel: 'Sedang (Sensitivitas Normal)',
        hormoneStatus: 'Estrogen Rendah, Progesteron Rendah, LH & FSH Basal',
        metabolicRate: 'Metabolisme basal melambat (-50 s/d -100 kkal/hari)',
        glucoseDynamics: 'Toleransi glukosa stabil. Resiko lonjakan fluktuasi lebih rendah dibanding luteal, namun energi sistemik relatif menurun.',
        colorBadge: 'bg-rose-100 text-rose-950 border-rose-300',
        colorTheme: 'rose',
        dietAdvice: [
            'Prioritaskan zat besi organik (heme iron): daging sapi tanpa lemak, hati ayam, bayam kukus, dan lentil untuk memulihkan cadangan ferritin.',
            'Kombinasikan dengan Vitamin C (jeruk peras, paprika) untuk melipatgandakan penyerapan zat besi non-heme hingga 300%.',
            'Hidrasi hangat dengan air jahe atau rebusan kunyit (kurkumin) untuk meredakan kram prostaglandin miometrium.',
            'Kurangi kafein berlebih dan makanan terlalu asin untuk mencegah vasokonstriksi panggul.',
        ],
        exerciseAdvice: [
            'Yoga restoratif, Yin yoga, dan latihan mobilitas panggul.',
            'Jalan santai di luar ruangan berdurasi 20-30 menit.',
            'Hindari latihan beban maksimal atau inverted poses (kepala di bawah) jika kram aktif.',
        ],
        symptomProtocol: {
            cramps: 'Kompres hangat panggul + asupan asam lemak Omega-3 1.000 mg untuk meredakan mediator inflamasi PGE2.',
            energy: 'Tidur 8 jam penuh; jangan paksakan defisit kalori ekstrem pada fase ini.',
            craving: 'Pilih cokelat hitam 85% kaya magnesium untuk meredakan ketegangan otot rahim.',
        },
        groundingRef: 'Konsensus Endokrinologi Reproduksi POGI 2023 & Clinical Nutrition Journal (Menses Metabolic Profile)',
    },
    follicular: {
        id: 'follicular',
        dayRange: 'Hari 6 - 13',
        name: 'Fase Folikular (Proliferatif)',
        subName: 'Kematangan Folikel & Lonjakan Estrogen Progresif',
        insulinSensitivityScore: 95,
        insulinSensitivityLabel: 'Sangat Tinggi (Puncak Sensitivitas Insulin & Toleransi Karbohidrat)',
        hormoneStatus: 'Estrogen (Estradiol E2) Meningkat Tajam, Progesteron Tetap Rendah',
        metabolicRate: 'Pemanfaatan glukosa intraseluler optimal via transporter GLUT-4',
        glucoseDynamics: 'Jendela emas tubuh membakar dan menyimpan glukosa ke glikogen otot secara efisien. Resiko sugar crash minimal.',
        colorBadge: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        colorTheme: 'emerald',
        dietAdvice: [
            'Waktu terbaik menikmati karbohidrat kompleks berkualitas: oat utuh, ubi jalar, nasi merah, dan quinoa.',
            'Asupan protein berkualitas tinggi (telur utuh, dada ayam, ikan kembung) untuk mendukung sintesis jaringan otot dan folikel.',
            'Makanan fermentasi (kimchi, tempe, kefir) untuk memelihara mikrobioma usus yang memetabolisme kelebihan estrogen (estrobolome).',
            'Sayuran cruciferous (brokoli, kubis, kembang kol) yang kaya Diindolylmethane (DIM) untuk regulasi metabolit estrogen.',
        ],
        exerciseAdvice: [
            'High Intensity Interval Training (HIIT) dan sprint interval.',
            'Latihan beban progresif (Progressive Overload) untuk membangun massa otot tanpa lemak.',
            'Waktu pemulihan otot tercepat karena efek anabolik alami estrogen.',
        ],
        symptomProtocol: {
            cramps: 'Kram nihil; energi fisik dan fokus kognitif berada pada tingkat tertinggi.',
            energy: 'Optimalkan untuk memulai proyek baru, latihan kekuatan rekor pribadi (PR), dan target produktivitas.',
            craving: 'Nafsu makan stabil dan terkontrol alami.',
        },
        groundingRef: 'American College of Obstetricians and Gynecologists (ACOG) & Sports Medicine Glycemic Response 2023',
    },
    ovulation: {
        id: 'ovulation',
        dayRange: 'Hari 14 - 16',
        name: 'Fase Ovulasi',
        subName: 'Pelepasan Oosit, Lonjakan Hormon LH & Estrogen Maksimal',
        insulinSensitivityScore: 88,
        insulinSensitivityLabel: 'Optimal & Vitalitas Puncak',
        hormoneStatus: 'LH Surge Puncak, Estradiol Puncak, Testosteron Bebas Meningkat Singkat',
        metabolicRate: 'Suhu tubuh basal naik ~0.3 - 0.5°C pasca lonjakan LH',
        glucoseDynamics: 'Energi tinggi dan resistensi jaringan sangat rendah. Waspadai sedikit peningkatan nafsu makan sesaat menjelang ovulasi.',
        colorBadge: 'bg-teal-100 text-teal-950 border-teal-300',
        colorTheme: 'teal',
        dietAdvice: [
            'Tingkatkan antioksidan polifenol tinggi (buah delima, buah beri, teh hijau) untuk meredam stres oksidatif pelepasan ovum.',
            'Asupan lemak sehat Omega-3 (salmon liar, chia seed, alpukat) untuk mendukung kualitas cairan folikel dan membran sel.',
            'Sayuran hijau gelap kaya folat alami untuk metabolisme seluler optimal.',
            'Hidrasi kaya elektrolit untuk mengimbangi kenaikan suhu basal.',
        ],
        exerciseAdvice: [
            'Latihan kardiovaskular intensif, tenis, badminton, atau lari jarak menengah.',
            'Latihan beban kompon berat (squat, bench press, deadlift).',
            'Perhatikan kestabilan sendi: lonjakan estrogen dapat meningkatkan laksitas ligamen (ACL strain).',
        ],
        symptomProtocol: {
            cramps: 'Mungkin terasa sedikit nyeri tumpul sesisi panggul (Mittelschmerz) selama beberapa jam.',
            energy: 'Rasa percaya diri, daya tarik sosial, dan stamina kardiovaskular mencapai puncak bulanan.',
            craving: 'Pilih camilan padat nutrisi seperti kacang almond dan buah beri segar.',
        },
        groundingRef: 'Endocrine Society Clinical Practice Guideline on Reproductive Hormone Dynamics 2023',
    },
    luteal_early: {
        id: 'luteal_early',
        dayRange: 'Hari 17 - 23',
        name: 'Fase Luteal Awal',
        subName: 'Transisi Korpus Luteum & Kenaikan Hormon Progesteron',
        insulinSensitivityScore: 65,
        insulinSensitivityLabel: 'Mulai Menurun (-15% Sensitivitas)',
        hormoneStatus: 'Progesteron Dominan, Estrogen Gelombang Kedua, Penurunan LH/FSH',
        metabolicRate: 'Kebutuhan kalori basal meningkat +100 s/d +200 kkal/hari',
        glucoseDynamics: 'Progesteron mulai menginduksi resistensi insulin fisiologis. Waktu pembersihan glukosa darah pasca makan sedikit melambat.',
        colorBadge: 'bg-amber-100 text-amber-950 border-amber-300',
        colorTheme: 'amber',
        dietAdvice: [
            'Tingkatkan porsi serat pangan larut (buncis, wortel, apel utuh) untuk memperlambat pengosongan lambung dan menahan lonjakan glukosa.',
            'Tambahkan kalori sehat berkualitas (+150 kkal) agar tubuh tidak memicu sinyal kelaparan ekstrem.',
            'Perbanyak makanan kaya seng dan Vitamin B6 (daging ayam, pisang kepok, biji bunga matahari) untuk mendukung fase luteal.',
            'Terapkan protokol urutan santap: Serat sayur hijau dahulu, disusul protein & lemak, lalu karbohidrat.',
        ],
        exerciseAdvice: [
            'Latihan beban intensitas sedang dengan repetisi teratur (8-12 repetisi).',
            'Pilates reformer, berenang santai, atau bersepeda statis santai.',
            'Aktivasi otot soleus dan jalan kaki santai 15-20 menit pasca makan malam.',
        ],
        symptomProtocol: {
            cramps: 'Sensasi sedikit begah atau retensi cairan awal.',
            energy: 'Energi mulai stabil menuju tenang (efek sedatif alami neurosteroid alopregnanolon).',
            craving: 'Keinginan makanan hangat dan gurih meningkat secara bertahap.',
        },
        groundingRef: 'Journal of Clinical Endocrinology & Metabolism (JCEM) Progesterone-Induced Insulin Action',
    },
    luteal_late: {
        id: 'luteal_late',
        dayRange: 'Hari 24 - 28',
        name: 'Fase Luteal Akhir (Fase PMS)',
        subName: 'Penurunan Drastis Progesteron & Estrogen (Lonjakan Craving)',
        insulinSensitivityScore: 48,
        insulinSensitivityLabel: 'Resistensi Tertinggi (Sensitivitas Anjlok -30%)',
        hormoneStatus: 'Progesteron & Estrogen Menukik Turun jika Tidak Terjadi Implantasi',
        metabolicRate: 'Nafsu makan dan kecenderungan retensi air (bloating) memuncak',
        glucoseDynamics: 'Toleransi glukosa terendah dalam siklus 28 hari. Makanan manis olahan akan memicu lonjakan glukosa tinggi lalu crash mendadak (lemas, gemetar, lapar karbohidrat lagi).',
        colorBadge: 'bg-rose-100 text-rose-950 border-rose-300',
        colorTheme: 'rose',
        dietAdvice: [
            'Wajib batasi gula bebas murni, minuman manis kemasan, boba, dan tepung terigu olahan.',
            'Konsumsi Magnesium Glycinate 300-400 mg (biji labu, kacang mete, cokelat 85%) untuk menstabilkan neurotransmitter serotonin dan GABA.',
            'Gunakan bumbu kayu manis (cinnamon) dan cuka apel sebelum makan untuk meningkatkan sensitivitas insulin perifer.',
            'Perbanyak kalium (air kelapa murni, alpukat) untuk mengimbangi retensi natrium yang memicu kembung payudara dan lingkar pinggang membesar.',
        ],
        exerciseAdvice: [
            'Jalan kaki santai outdoor di pagi hari terpapar sinar matahari.',
            'Stretching panggul, yoga peregangan lembut, dan latihan pernapasan dalam (Box Breathing).',
            'Hindari latihan HIIT yang memicu kortisol berlebih karena sistem saraf sedang sensitif.',
        ],
        symptomProtocol: {
            cramps: 'Kembung, kram ringan pra-haid, dan nyeri payudara.',
            energy: 'Mudah lelah di sore hari; jadwalkan istirahat lebih awal.',
            craving: 'Puncak sugar craving: redam dengan chia seed pudding cokelat hitam tanpa gula pasir.',
        },
        groundingRef: 'PERKENI 2021 & European Menopause and Andropause Society (EMAS) Metabolic Fluctuations',
    },
};

export default function GenderVitalityDemo() {
    // -------------------------------------------------------------------------
    // TOP-LEVEL GENDER TAB: 'female' | 'male'
    // -------------------------------------------------------------------------
    const [selectedGender, setSelectedGender] = useState('female');

    // -------------------------------------------------------------------------
    // FEMALE SIMULATOR STATE
    // -------------------------------------------------------------------------
    const [currentCycleDay, setCurrentCycleDay] = useState(21); // Default Day 21 (Luteal Peak)
    const [femaleActivePillar, setFemaleActivePillar] = useState('nutrition'); // 'nutrition' | 'exercise' | 'symptoms' | 'glucose'
    
    // PCOS Questionnaire State
    const [pcosAnswers, setPcosAnswers] = useState({
        irregularCycle: false,
        severeCravings: true,
        jawlineAcne: false,
        abdominalFat: true,
        facialHair: false,
    });

    // Determine active phase based on currentCycleDay
    const activeFemalePhase = useMemo(() => {
        if (currentCycleDay >= 1 && currentCycleDay <= 5) return FEMALE_PHASES.menstrual;
        if (currentCycleDay >= 6 && currentCycleDay <= 13) return FEMALE_PHASES.follicular;
        if (currentCycleDay >= 14 && currentCycleDay <= 16) return FEMALE_PHASES.ovulation;
        if (currentCycleDay >= 17 && currentCycleDay <= 23) return FEMALE_PHASES.luteal_early;
        return FEMALE_PHASES.luteal_late;
    }, [currentCycleDay]);

    // PCOS Risk Calculation
    const pcosScore = useMemo(() => {
        let count = 0;
        if (pcosAnswers.irregularCycle) count += 35;
        if (pcosAnswers.severeCravings) count += 20;
        if (pcosAnswers.jawlineAcne) count += 15;
        if (pcosAnswers.abdominalFat) count += 15;
        if (pcosAnswers.facialHair) count += 15;
        return count;
    }, [pcosAnswers]);

    // -------------------------------------------------------------------------
    // MALE SIMULATOR STATE
    // -------------------------------------------------------------------------
    const [maleHeight, setMaleHeight] = useState(172); // cm
    const [maleWaist, setMaleWaist] = useState(86);   // cm
    const [maleAge, setMaleAge] = useState(35);       // years
    const [maleTimeHour, setMaleTimeHour] = useState(14); // 08, 14, 18, 23
    const [maleActivePillar, setMaleActivePillar] = useState('whtr'); // 'whtr' | 'circadian' | 'workout' | 'screening'

    // Male STOP-BANG / Cardio Screening State
    const [maleScreening, setMaleScreening] = useState({
        snoring: false,
        postPrandialTiredness: true,
        highBP: false,
        neckCircumference: false,
    });

    // WHtR Calculation
    const whtrRatio = useMemo(() => {
        if (!maleHeight || maleHeight <= 0) return 0;
        return Math.round((maleWaist / maleHeight) * 100) / 100;
    }, [maleHeight, maleWaist]);

    const whtrStatus = useMemo(() => {
        if (whtrRatio < 0.4) {
            return {
                label: 'Di Bawah Standar (< 0.40)',
                color: 'text-amber-800 bg-amber-100 border-amber-300',
                description: 'Cadangan lemak tubuh minimal, periksa massa otot rangka.',
                visceralRisk: 'Sangat Rendah',
            };
        }
        if (whtrRatio <= 0.49) {
            return {
                label: 'Ideal & Sehat (0.40 - 0.49)',
                color: 'text-emerald-950 bg-emerald-100 border-emerald-300 font-bold',
                description: 'Rasio lemak sentral optimal. Resiko resistensi insulin & kardiometabolik sangat rendah.',
                visceralRisk: 'Rendah (Optimal)',
            };
        }
        if (whtrRatio <= 0.59) {
            return {
                label: 'Waspada Lemak Sentral (0.50 - 0.59)',
                color: 'text-amber-950 bg-amber-100 border-amber-300 font-bold',
                description: 'Penimbunan lemak viseral di sekitar rongga abdomen mulai menekan fungsi metabolik organ hati.',
                visceralRisk: 'Sedang (Perlu Intervensi)',
            };
        }
        return {
            label: 'Risiko Kardiometabolik Tinggi (≥ 0.60)',
            color: 'text-rose-950 bg-rose-100 border-rose-300 font-bold',
            description: 'Indikasi kuat penumpukan visceral adipose tissue tinggi dan resiko sindrom metabolik / aterosklerosis.',
            visceralRisk: 'Tinggi (Rujukan Medis Diperlukan)',
        };
    }, [whtrRatio]);

    // Circadian Hour Content for Men
    const maleCircadianInfo = useMemo(() => {
        if (maleTimeHour >= 5 && maleTimeHour <= 10) {
            return {
                period: 'Pagi Hari (06:00 - 10:00 WIB)',
                testosterone: 'Puncak Alami Harian (100% Peak)',
                cortisol: 'Kortisol Bangun Tidur (CAR) Tinggi Fisiologis',
                insulinStatus: 'Sensitivitas Glukosa Sedang-Tinggi',
                recommendation: 'Sarapan kaya protein & serat (hindari sereal/donat manis yang memicu lonjakan insulin saat kortisol tinggi). Terpapar sinar matahari pagi 15 menit untuk mengunci ritme sirkadian.',
            };
        }
        if (maleTimeHour >= 11 && maleTimeHour <= 15) {
            return {
                period: 'Siang Hari (11:00 - 15:00 WIB)',
                testosterone: 'Level Stabil Moderat (~75%)',
                cortisol: 'Menurun Bertahap',
                insulinStatus: 'Sensitivitas Insulin Puncak Harian',
                recommendation: 'Waktu terbaik mengonsumsi porsi makan terbesar hari ini dengan karbohidrat kompleks. Lakukan jalan kaki ringan 10 menit setelah santap siang untuk mengaktifkan GLUT-4.',
            };
        }
        if (maleTimeHour >= 16 && maleTimeHour <= 19) {
            return {
                period: 'Sore Hari (16:00 - 19:00 WIB)',
                testosterone: 'Level Stabil (~65%)',
                cortisol: 'Rendah',
                insulinStatus: 'Suhu Tubuh Inti & Kekuatan Otot Maksimal',
                recommendation: 'Jendela waktu optimal untuk latihan beban berat (squat, deadlift, bench press) atau latihan kardio interval. Kapasitas sintesis protein otot sangat efisien.',
            };
        }
        return {
            period: 'Malam Hari (20:00 - 05:00 WIB)',
            testosterone: 'Titik Terendah Sebelum Tidur, Sintesis NREM Dimulai',
            cortisol: 'Minimal (Harus Rendah untuk Rilis Melatonin)',
            insulinStatus: 'Sensitivitas Insulin Anjlok (Metabolisme Istirahat)',
            recommendation: 'Hentikan makan karbohidrat berat 3 jam sebelum tidur. Paparan gula malam hari menekan sekresi Growth Hormone (GH) dan merusak sintesis testosteron nokturnal.',
        };
    }, [maleTimeHour]);

    return (
        <MarketingLayout>
            <Head title="Demo Personalisasi Biologis Hormon & Vitalitas Gender - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
                {/* Header & Breadcrumb */}
                <div className="space-y-3 border-b border-[#e2eee6] pb-6">
                    <div className="flex items-center gap-2 text-xs text-[#40564f] font-medium">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-bold">Demo Siklus Haid &amp; Vitalitas Pria</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-mono font-bold mb-2 border border-emerald-300 shadow-2xs">
                                <span className="material-symbols-outlined text-[16px] text-primary">vital_signs</span>
                                <span>SIMULATOR INTERAKTIF • FITUR 6</span>
                            </div>
                            <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#10241f] tracking-tight">
                                Personalisasi Biologis Berbasis Gender &amp; Hormon
                            </h1>
                            <p className="text-xs sm:text-sm text-[#344d44] mt-1 max-w-2xl leading-relaxed font-medium">
                                Fisiologi metabolik pria dan wanita bekerja dengan mekanisme hormon yang sangat berbeda. AEVYRA mempersonalisasi rekomendasi nutrisi, toleransi glukosa, dan latihan fisik sesuai fase siklus menstruasi wanita atau profil kardiometabolik &amp; lemak viseral pria.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <Link
                                href="/demo/consultations"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-[#d5e5db] text-[#10241f] text-xs font-bold hover:bg-[#edf5f0] shadow-2xs transition-all cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[17px] text-primary">medical_services</span>
                                <span>Konsultasi Dokter Sp.OG / Sp.PD</span>
                            </Link>
                            <Link
                                href="/member/dashboard"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-[#07664c] shadow-2xs transition-all active:scale-95 whitespace-nowrap"
                            >
                                <span className="material-symbols-outlined text-[17px]">favorite</span>
                                <span>Buka Modul Biologis Member</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Comparative Benchmark Bar: 4 Facts of Biological Differences */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white border border-[#d5e5db] space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">Wanita • Variasi Glukosa</span>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#10241f]">±30% Fluktuasi</div>
                        <p className="text-[11px] text-[#40564f] leading-snug">Sensitivitas insulin berubah drastis antara fase folikular dan luteal.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#d5e5db] space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">Wanita • Prevalensi PCOS</span>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#10241f]">1 dari 10 Wanita</div>
                        <p className="text-[11px] text-[#40564f] leading-snug">Mengalami resistensi insulin tersembunyi yang mengganggu ovulasi.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#d5e5db] space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">Pria • Lemak Viseral</span>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#10241f]">2.5x Lebih Rentan</div>
                        <p className="text-[11px] text-[#40564f] leading-snug">Menimbun lemak di rongga perut yang memicu perlemakan hati (NAFLD).</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#d5e5db] space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">Pria • Dampak Sindrom</span>
                        <div className="font-serif text-lg sm:text-xl font-bold text-[#10241f]">-40% Testosteron</div>
                        <p className="text-[11px] text-[#40564f] leading-snug">Resistensi insulin berat menurunkan produksi androgen alami pria.</p>
                    </div>
                </div>

                {/* Primary Gender Selection Tabs */}
                <div className="flex justify-center">
                    <div className="p-1.5 bg-[#edf5f0] rounded-2xl border border-[#cfe2d7] inline-flex items-center gap-2 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setSelectedGender('female')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                selectedGender === 'female'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'text-[#2b443b] hover:text-[#10241f]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">female</span>
                            <span>Wanita • Siklus Haid &amp; Sinkronisasi Glukosa</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedGender('male')}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                selectedGender === 'male'
                                    ? 'bg-sky-700 text-white shadow-xs'
                                    : 'text-[#2b443b] hover:text-[#10241f]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">male</span>
                            <span>Pria • Kardiometabolik &amp; Lemak Viseral</span>
                        </button>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* MODE 1: WANITA (Female Cycle-Syncing & Metabolic Synchronization) */}
                {/* ============================================================== */}
                {selectedGender === 'female' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        {/* Interactive 28-Day Interactive Day Slider & Cycle Wheel */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">
                                        Female Cycle-Syncing Engine
                                    </span>
                                    <h3 className="font-heading font-black text-xl text-[#10241f] mt-0.5">
                                        Simulator Interaktif Siklus Menstruasi 28 Hari
                                    </h3>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Geser slider untuk melihat bagaimana hormon estrogen &amp; progesteron mengubah toleransi gula darah Anda setiap hari.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-2xs bg-rose-50 text-rose-950 border-rose-300">
                                        Hari Ke-{currentCycleDay} dari 28
                                    </span>
                                </div>
                            </div>

                            {/* Interactive Day Slider Bar */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#10241f]">
                                    <span className="text-rose-700">Hari 1 (Haid Dimulai)</span>
                                    <span className="text-emerald-700">Hari 14 (Ovulasi)</span>
                                    <span className="text-amber-700">Hari 21 (Puncak Luteal)</span>
                                    <span className="text-rose-700">Hari 28 (Pra-Menses)</span>
                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="28"
                                    value={currentCycleDay}
                                    onChange={(e) => setCurrentCycleDay(parseInt(e.target.value))}
                                    className="w-full h-3 bg-[#e2eee6] rounded-lg appearance-none cursor-pointer accent-rose-600"
                                />

                                {/* 4-Phase Quick Jump Selector */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                                    {[
                                        { day: 2, label: 'Menstruasi (Hari 1-5)', phaseId: 'menstrual' },
                                        { day: 9, label: 'Folikular (Hari 6-13)', phaseId: 'follicular' },
                                        { day: 15, label: 'Ovulasi (Hari 14-16)', phaseId: 'ovulation' },
                                        { day: 24, label: 'Luteal PMS (Hari 17-28)', phaseId: 'luteal_late' },
                                    ].map((p) => (
                                        <button
                                            key={p.phaseId}
                                            type="button"
                                            onClick={() => setCurrentCycleDay(p.day)}
                                            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer font-medium ${
                                                activeFemalePhase.id.includes(p.phaseId.replace('_late', ''))
                                                    ? 'bg-rose-600 text-white border-rose-600 shadow-2xs font-bold'
                                                    : 'bg-[#f6faf7] border-[#d8e8de] text-[#10241f] hover:bg-[#edf5f0]'
                                            }`}
                                        >
                                            <span className="block truncate">{p.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Active Phase Live Diagnostic Box */}
                            <div className="p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#cfe2d7]">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border bg-rose-100 text-rose-950 border-rose-300">
                                                {activeFemalePhase.dayRange}
                                            </span>
                                            <h4 className="font-heading font-black text-base text-[#10241f]">
                                                {activeFemalePhase.name}
                                            </h4>
                                        </div>
                                        <p className="text-xs text-[#344d44] font-medium mt-0.5">
                                            {activeFemalePhase.subName}
                                        </p>
                                    </div>

                                    {/* Insulin Sensitivity Gauge Bar */}
                                    <div className="sm:text-right space-y-1">
                                        <span className="text-[11px] font-mono text-[#344d44] font-semibold block">
                                            Sensitivitas Reseptor Insulin:
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 sm:w-40 h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-300 ${
                                                        activeFemalePhase.insulinSensitivityScore >= 80
                                                            ? 'bg-emerald-600'
                                                            : activeFemalePhase.insulinSensitivityScore >= 60
                                                            ? 'bg-amber-600'
                                                            : 'bg-rose-600'
                                                    }`}
                                                    style={{ width: `${activeFemalePhase.insulinSensitivityScore}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono font-black text-[#10241f]">
                                                {activeFemalePhase.insulinSensitivityScore}%
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-primary block">
                                            {activeFemalePhase.insulinSensitivityLabel}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                    <div className="p-3 rounded-xl bg-white border border-[#cfe2d7] space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                            Status Hormon Dominan
                                        </span>
                                        <p className="font-semibold text-[#10241f] leading-snug">
                                            {activeFemalePhase.hormoneStatus}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-white border border-[#cfe2d7] space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                            Dinamika Laju Metabolisme
                                        </span>
                                        <p className="font-semibold text-[#10241f] leading-snug">
                                            {activeFemalePhase.metabolicRate}
                                        </p>
                                    </div>

                                    <div className="p-3 rounded-xl bg-white border border-[#cfe2d7] space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                            Toleransi Gula &amp; Fluktuasi
                                        </span>
                                        <p className="font-semibold text-[#10241f] leading-snug">
                                            {activeFemalePhase.glucoseDynamics}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive 4 Pillars of Female Metabolic Care */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2eee6]">
                                <div>
                                    <h4 className="font-heading font-black text-lg text-[#10241f]">
                                        Protokol Preskriptif 4 Pilar Sesuai Fase: {activeFemalePhase.name}
                                    </h4>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Panduan gizi klinis, intensitas latihan, mitigasi gejala, dan referensi standar konsensus POGI.
                                    </p>
                                </div>

                                {/* Pillar Navigation Tabs */}
                                <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
                                    {[
                                        { id: 'nutrition', label: '1. Panduan Gizi' },
                                        { id: 'exercise', label: '2. Latihan Fisik' },
                                        { id: 'symptoms', label: '3. Redam Gejala' },
                                        { id: 'glucose', label: '4. Trik Glukosa' },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setFemaleActivePillar(tab.id)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                                                femaleActivePillar === tab.id
                                                    ? 'bg-primary text-white shadow-2xs'
                                                    : 'bg-[#edf5f0] text-[#2b443b] hover:bg-[#dfeee5]'
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pillar 1: Nutrition */}
                            {femaleActivePillar === 'nutrition' && (
                                <div className="space-y-3 animate-in fade-in duration-150">
                                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                                        <b className="font-bold">Fokus Gizi Klinis Fase {activeFemalePhase.name}:</b>
                                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
                                            {activeFemalePhase.dietAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 2: Exercise */}
                            {femaleActivePillar === 'exercise' && (
                                <div className="space-y-3 animate-in fade-in duration-150">
                                    <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium">
                                        <b className="font-bold">Preskripsi Olahraga &amp; Zona Detak Jantung:</b>
                                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
                                            {activeFemalePhase.exerciseAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 3: Symptoms */}
                            {femaleActivePillar === 'symptoms' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-in fade-in duration-150">
                                    <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5">
                                        <span className="font-bold text-rose-800 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[17px]">healing</span>
                                            Kram &amp; Kenyamanan Panggul
                                        </span>
                                        <p className="text-[#10241f] leading-relaxed">
                                            {activeFemalePhase.symptomProtocol.cramps}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5">
                                        <span className="font-bold text-amber-800 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[17px]">battery_charging_full</span>
                                            Manajemen Stamina &amp; Tidur
                                        </span>
                                        <p className="text-[#10241f] leading-relaxed">
                                            {activeFemalePhase.symptomProtocol.energy}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5">
                                        <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[17px]">cookie</span>
                                            Mitigasi Sugar Cravings
                                        </span>
                                        <p className="text-[#10241f] leading-relaxed">
                                            {activeFemalePhase.symptomProtocol.craving}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 4: Glucose Hacks */}
                            {femaleActivePillar === 'glucose' && (
                                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium space-y-2 animate-in fade-in duration-150">
                                    <b className="font-bold text-sm block">Protokol Anti-Lonjakan Glukosa:</b>
                                    <p className="leading-relaxed">
                                        Pada fase progesteron tinggi (luteal), transporter GLUT-4 di jaringan adiposa dan otot membutuhkan hingga 25-30% lebih banyak insulin untuk memasukkan glukosa yang sama. Terapkan 3 trik sederhana ini:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-1 text-xs">
                                        <li><b>Food Sequencing:</b> Santap sayuran hijau berserat tinggi 10 menit sebelum nasi atau karbohidrat.</li>
                                        <li><b>Soleus Activation:</b> Lakukan soleus calf raise saat duduk bekerja pasca-makan siang selama 5-10 menit.</li>
                                        <li><b>Cuka Apel Terlarut:</b> 1 sendok makan cuka apel dalam segelas air sebelum santap malam mengurangi lonjakan glukosa pasca makan hingga 20%.</li>
                                    </ol>
                                </div>
                            )}

                            {/* Clinical Grounding Note */}
                            <div className="p-3 rounded-xl bg-[#e5f1ea] border border-[#c1ded0] text-[11px] font-mono text-[#0d3b2f] flex items-center gap-2 font-medium">
                                <span className="material-symbols-outlined text-[16px] text-primary shrink-0">verified</span>
                                <span>Grounding Konsensus: <strong>{activeFemalePhase.groundingRef}</strong></span>
                            </div>
                        </div>

                        {/* Interactive PCOS & Insulin Resistance Screener Tool */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-rose-700 uppercase">
                                        Skrining Mandiri Cepat
                                    </span>
                                    <h4 className="font-heading font-black text-lg text-[#10241f] mt-0.5">
                                        Evaluasi Risiko Resistensi Insulin &amp; PCOS (Polycystic Ovary Syndrome)
                                    </h4>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Beri tanda centang pada gejala yang sering Anda rasakan untuk mendeteksi potensi disfungsi ovulasi metabolik.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-mono text-gray-500 block">Skor Waspada:</span>
                                    <span className="text-lg font-mono font-black text-rose-700">{pcosScore}%</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                {[
                                    { key: 'irregularCycle', label: 'Siklus haid sering terlambat (> 35 hari) atau tidak beraturan' },
                                    { key: 'severeCravings', label: 'Kecanduan makanan manis & lemas gemetar 1 jam setelah makan' },
                                    { key: 'jawlineAcne', label: 'Jerawat meradang di sepanjang garis rahang & dagu menjelang haid' },
                                    { key: 'abdominalFat', label: 'Penumpukan lingkar pinggang membesar di perut bawah (visceral)' },
                                    { key: 'facialHair', label: 'Pertumbuhan rambut halus di area atas bibir, dagu, atau dada (hirsutisme)' },
                                ].map((item) => (
                                    <label
                                        key={item.key}
                                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                                            pcosAnswers[item.key]
                                                ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                                                : 'bg-[#f6faf7] border-[#d8e8de] text-[#10241f] hover:bg-[#edf5f0]'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={pcosAnswers[item.key]}
                                            onChange={(e) =>
                                                setPcosAnswers((prev) => ({ ...prev, [item.key]: e.target.checked }))
                                            }
                                            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 shrink-0 cursor-pointer"
                                        />
                                        <span className="leading-snug">{item.label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Assessment Feedback Banner */}
                            <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="space-y-0.5">
                                    <span className="font-bold text-[#10241f] block">
                                        Hasil Evaluasi: {pcosScore >= 50 ? '⚠️ Indikasi Waspada Resistensi Luteal / PCOS' : '✓ Profil Risiko Rendah Terkendali'}
                                    </span>
                                    <p className="text-[11px] text-[#344d44] leading-relaxed">
                                        {pcosScore >= 50
                                            ? 'Pola gejala menunjukkan potensi penurunan sensitivitas insulin perifer yang dapat mempengaruhi ovulasi teratur. Disarankan konsultasi ginekologi & skrining USG pelvis.'
                                            : 'Kondisi metabolik siklus Anda dalam batas fisiologis normal. Lanjutkan panduan sinkronisasi nutrisi 4 fase.'}
                                    </p>
                                </div>
                                <Link
                                    href="/demo/consultations"
                                    className="px-4 py-2 rounded-xl bg-primary hover:bg-[#07664c] text-white font-bold text-xs shrink-0 text-center shadow-xs transition-all"
                                >
                                    Konsul dr. Nadia Sp.OG
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* MODE 2: PRIA (Male Cardiometabolic, Visceral Fat & Vitality) */}
                {/* ============================================================== */}
                {selectedGender === 'male' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                        {/* Interactive Waist-to-Height Ratio (WHtR) Visceral Fat Calculator */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">
                                        Male Cardiometabolic Screening
                                    </span>
                                    <h3 className="font-heading font-black text-xl text-[#10241f] mt-0.5">
                                        Kalkulator Rasio Lingkar Pinggang (WHtR) &amp; Lemak Viseral
                                    </h3>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Pedoman British Medical Journal &amp; PERKI membuktikan Rasio Pinggang-ke-Tinggi (WHtR) jauh lebih akurat dibanding BMI dalam memprediksi risiko diabetes &amp; serangan jantung pria.
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-2xs ${whtrStatus.color}`}>
                                    WHtR {whtrRatio}
                                </span>
                            </div>

                            {/* Interactive Input Sliders for Height & Waist */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2 p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7]">
                                    <div className="flex items-center justify-between text-xs font-bold text-[#10241f]">
                                        <span>Tinggi Badan (TB):</span>
                                        <span className="font-mono text-primary text-sm">{maleHeight} cm</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="150"
                                        max="200"
                                        value={maleHeight}
                                        onChange={(e) => setMaleHeight(parseInt(e.target.value))}
                                        className="w-full h-2.5 bg-[#d5e5db] rounded-lg appearance-none cursor-pointer accent-sky-700"
                                    />
                                    <span className="text-[10px] font-mono text-gray-500 block">Rentang: 150 - 200 cm</span>
                                </div>

                                <div className="space-y-2 p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7]">
                                    <div className="flex items-center justify-between text-xs font-bold text-[#10241f]">
                                        <span>Lingkar Pinggang (LP):</span>
                                        <span className="font-mono text-sky-700 text-sm">{maleWaist} cm</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="65"
                                        max="130"
                                        value={maleWaist}
                                        onChange={(e) => setMaleWaist(parseInt(e.target.value))}
                                        className="w-full h-2.5 bg-[#d5e5db] rounded-lg appearance-none cursor-pointer accent-sky-700"
                                    />
                                    <span className="text-[10px] font-mono text-gray-500 block">Batas Waspada Pria Asia: ≥ 90 cm</span>
                                </div>

                                <div className="space-y-2 p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7]">
                                    <div className="flex items-center justify-between text-xs font-bold text-[#10241f]">
                                        <span>Usia Pasien:</span>
                                        <span className="font-mono text-primary text-sm">{maleAge} Tahun</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="18"
                                        max="75"
                                        value={maleAge}
                                        onChange={(e) => setMaleAge(parseInt(e.target.value))}
                                        className="w-full h-2.5 bg-[#d5e5db] rounded-lg appearance-none cursor-pointer accent-sky-700"
                                    />
                                    <span className="text-[10px] font-mono text-gray-500 block">Kelompok Umur Produktif</span>
                                </div>
                            </div>

                            {/* Diagnostic Result Card */}
                            <div className="p-5 rounded-2xl bg-[#edf5f0] border border-[#cfe2d7] space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cfe2d7] pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm">
                                            📊
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-xs text-[#10241f]">Klasifikasi Klinis Rasio Pinggang:</h4>
                                            <span className="text-sm font-black text-sky-900">{whtrStatus.label}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono text-gray-600 block">Tingkat Risiko Lemak Viseral:</span>
                                        <span className="text-xs font-bold font-mono text-emerald-900">{whtrStatus.visceralRisk}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-[#2b443b] leading-relaxed">
                                    {whtrStatus.description} Rumus baku: <em>"Jaga ukuran lingkar pinggang Anda di bawah separuh tinggi badan Anda (LP &lt; 0.5 × TB)"</em>. Pada tinggi badan {maleHeight} cm, lingkar pinggang ideal maksimal adalah <strong>{Math.round(maleHeight * 0.5)} cm</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Interactive 24-Hour Circadian Testosterone & Glucose Clock */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">
                                        Circadian Endocrinology
                                    </span>
                                    <h4 className="font-heading font-black text-lg text-[#10241f] mt-0.5">
                                        Jam Biologis 24 Jam Pria: Testosteron &amp; Efisiensi Glukosa
                                    </h4>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Pilih jam aktivitas untuk melihat interaksi hormon androgen, kortisol, dan pembakaran kalori harian.
                                    </p>
                                </div>

                                {/* Hour Selector Chips */}
                                <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
                                    {[
                                        { hour: 8, label: '08:00 Pagi' },
                                        { hour: 14, label: '14:00 Siang' },
                                        { hour: 18, label: '18:00 Sore' },
                                        { hour: 23, label: '23:00 Malam' },
                                    ].map((h) => (
                                        <button
                                            key={h.hour}
                                            type="button"
                                            onClick={() => setMaleTimeHour(h.hour)}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                                                maleTimeHour === h.hour
                                                    ? 'bg-sky-800 text-white shadow-2xs'
                                                    : 'bg-[#edf5f0] text-[#2b443b] hover:bg-[#dfeee5]'
                                            }`}
                                        >
                                            {h.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Circadian Diagnostic Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1">
                                    <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">
                                        Level Testosteron Alami
                                    </span>
                                    <p className="font-bold text-[#10241f] text-sm">
                                        {maleCircadianInfo.testosterone}
                                    </p>
                                    <p className="text-[11px] text-gray-600">Dipengaruhi kualitas tidur NREM deep sleep.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1">
                                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase block">
                                        Ritme Hormon Kortisol
                                    </span>
                                    <p className="font-bold text-[#10241f] text-sm">
                                        {maleCircadianInfo.cortisol}
                                    </p>
                                    <p className="text-[11px] text-gray-600">Kortisol tinggi di malam hari merusak sel beta pankreas.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1">
                                    <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">
                                        Sensitivitas Insulin Seluler
                                    </span>
                                    <p className="font-bold text-[#10241f] text-sm">
                                        {maleCircadianInfo.insulinStatus}
                                    </p>
                                    <p className="text-[11px] text-gray-600">Tubuh paling efisien mengolah glukosa di siang hari.</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 font-medium space-y-1">
                                <b className="font-bold block text-sky-900">
                                    Strategi Preskriptif {maleCircadianInfo.period}:
                                </b>
                                <p className="leading-relaxed">
                                    {maleCircadianInfo.recommendation}
                                </p>
                            </div>
                        </div>

                        {/* Interactive Metabolic Exercise Protocol (Compound & Soleus) */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">
                                        Muscle-to-Glucose Sink
                                    </span>
                                    <h4 className="font-heading font-black text-lg text-[#10241f] mt-0.5">
                                        3 Latihan Utama Penguras Cadangan Glukosa Pria
                                    </h4>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-mono font-bold border border-emerald-300">
                                    Aktivasi GLUT-4 Non-Insulin
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                        <span>Soleus Pushup (Duduk)</span>
                                    </div>
                                    <p className="text-[#344d44] leading-relaxed">
                                        Otot soleus betis membakar glukosa lokal tanpa memicu kelelahan sistemik. Mampu menurunkan fluktuasi gula darah hingga 52% saat duduk bekerja di depan laptop.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                                        <span>Zone 2 Cardio (Incline Walk)</span>
                                    </div>
                                    <p className="text-[#344d44] leading-relaxed">
                                        Jalan cepat di treadmill elevasi 8-10% berdurasi 35-45 menit. Memaksa mitokondria membakar asam lemak bebas viseral dan mengembalikan sensitivitas insulin perifer.
                                    </p>
                                </div>

                                <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                                        <span>Compound Lift (Squat/Deadlift)</span>
                                    </div>
                                    <p className="text-[#344d44] leading-relaxed">
                                        Latihan beban otot paha dan punggung besar meningkatkan kapasitas tangki glikogen otot hingga 300 gram, mencegah kelebihan karbohidrat diubah jadi lemak hati.
                                    </p>
                                </div>
                            </div>

                            {/* Clinical Consult Gateway */}
                            <div className="p-4 rounded-2xl bg-[#edf5f0] border border-[#cfe2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="space-y-0.5">
                                    <span className="font-bold text-[#10241f] block">
                                        Konsultasikan Profil Kardiometabolik Pria Bersama Dokter Spesialis
                                    </span>
                                    <p className="text-[11px] text-[#344d44]">
                                        Dapatkan evaluasi profil lipid (Trigliserida/HDL), tes HOMA-IR, dan panduan latihan beban aman bersama dr. H. Bramantyo, Sp.PD &amp; dr. Rayhan Pratama, Sp.JP.
                                    </p>
                                </div>
                                <Link
                                    href="/demo/consultations"
                                    className="px-4 py-2 rounded-xl bg-primary hover:bg-[#07664c] text-white font-bold text-xs shrink-0 text-center shadow-xs transition-all"
                                >
                                    Pilih Jadwal Konsultasi
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MarketingLayout>
    );
}
