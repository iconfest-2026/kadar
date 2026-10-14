import React, { useState, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import AppLayout from '@/Layouts/AppLayout';

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
        mealPlan: {
            breakfast: 'Oatmeal hangat dengan biji labu panggang, irisan pisang kepok, dan taburan kayu manis murni (0g gula pasir).',
            lunch: 'Sup bayam bening dengan irisan daging sapi tanpa lemak & tempe bacem kukus-panggang (Zat besi heme + Vitamin C alami).',
            snack: '1 cangkir seduhan teh chamomile hangat + 2 kotak cokelat hitam 85% kaya magnesium relaksasi otot rahim.',
            dinner: 'Pepes ikan kembung bumbu kunyit + tumis sawi putih bawang putih + nasi merah porsi terukur.',
            rationale: 'Mengganti cadangan ferritin darah haid, melancarkan sirkulasi panggul, dan meredakan peradangan prostaglandin PGE2.',
        },
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
        insulinSensitivityLabel: 'Sangat Tinggi (Puncak Toleransi Karbohidrat)',
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
        mealPlan: {
            breakfast: 'Telur orak-arik (2 butir) dengan alpukat potong, tomat panggang, dan 1 lembar roti gandum utuh panggang.',
            lunch: 'Quinoa bowl atau nasi merah dengan dada ayam panggang rempah, brokoli kukus minyak wijen (DIM untuk regulasi estrogen).',
            snack: 'Greek yogurt plain dengan buah beri segar (stroberi/blueberry) & kacang kenari (nutrisi estrobolome usus).',
            dinner: 'Salmon panggang atau fillet ikan kakap dengan ubi jalar rebus & tumis asparagus minyak zaitun extra virgin.',
            rationale: 'Memaksimalkan sensitivitas reseptor GLUT-4 puncak untuk mengisi cadangan glikogen otot dan mendukung pematangan folikel oosit.',
        },
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
        mealPlan: {
            breakfast: 'Smoothie hijau padat nutrisi: bayam segar, bubuk whey/pea protein murni, chia seed, susu almond tawar, dan setengah alpukat.',
            lunch: 'Nasi basmati dengan ikan tongkol bakar rica dabu-dabu, urap sayuran hijau kacang panjang, dan tahu kukus.',
            snack: 'Buah delima merah segar atau potongan buah apel hijau dengan selai kacang almond murni (antioksidan ovum).',
            dinner: 'Tumis daging sapi lada hitam dengan paprika merah, jamur champignon, dan nasi kembang kol / beras merah porsi sedang.',
            rationale: 'Fokus antioksidan kuat untuk menetralkan stres oksidatif folikel ovum di tengah lonjakan hormon luteinisasi (LH).',
        },
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
        mealPlan: {
            breakfast: 'Telur rebus (2 butir) + tumis buncis wortel bawang putih + ubi jalar rebus 1 buah sedang (karbohidrat glisemik rendah).',
            lunch: 'Sup ayam kampung bening dengan wortel, kentang, dan buncis (Terapkan urutan makan: sayur serat dulu, baru ayam dan kentang).',
            snack: 'Biji bunga matahari panggang (kuaci kupas) + edamame rebus hangat (Kaya vitamin B6 & seng untuk sintesis progesteron).',
            dinner: 'Pepes ayam jamur suwir + lalapan daun selada, mentimun + sambal terasi tomat segar + nasi merah porsi terukur.',
            rationale: 'Menambahkan +150 kkal berkualitas untuk mengimbangi kenaikan metabolisme basal korpus luteum dan menahan resistensi insulin fisiologis.',
        },
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
        mealPlan: {
            breakfast: 'Chia seed pudding dibuat dengan susu almond tawar, bubuk kakao murni (cacao), taburan kacang mete, dan kayu manis penurun glukosa.',
            lunch: 'Steak tempe panggang saus jamur lada hitam + tumis brokoli wortel bawang putih + nasi jagung / shirataki tinggi serat pangan.',
            snack: 'Alpukat potong segar dengan taburan biji chia dan perasan jeruk nipis dingin (tanpa susu kental manis).',
            dinner: 'Sup ikan patin kuah asam kunyit kemangi + tumis bayam jepang (Bebas gula olahan untuk mencegah insomnia dan mimpi buruk PMS).',
            rationale: 'Mencegah fluktuasi glukosa tajam yang memicu sugar craving parah, kembung retensi air, dan mood swing akibat anjloknya estrogen.',
        },
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

const CLINICAL_BIOMARKERS = [
    {
        name: 'HOMA-IR',
        sub: 'Homeostatic Model Assessment',
        male: '< 1.4',
        female: '< 1.5 (Fase Folikular)',
        rationale: 'Mendeteksi hiperinsulinemia kompensatorik 5-10 tahun sebelum glukosa puasa naik atau terdiagnosis prediabetes.',
    },
    {
        name: 'Rasio Trigliserida / HDL',
        sub: 'Surrogate sdLDL Marker',
        male: '< 2.0 (Optimal < 1.5)',
        female: '< 2.0 (Optimal < 1.5)',
        rationale: 'Rasio > 3.0 mengindikasikan dominasi partikel LDL kecil padat (small dense LDL) yang mudah teroksidasi memicu aterosklerosis arteri.',
    },
    {
        name: 'Total Testosterone',
        sub: 'Androgen Primer',
        male: '400 - 900 ng/dL',
        female: '15 - 70 ng/dL',
        rationale: 'Pria: insulin tinggi & aromatase lemak perut memangkas testosteron. Wanita: insulin tinggi merangsang ovarium overproduksi testosteron (PCOS).',
    },
    {
        name: 'SHBG',
        sub: 'Sex Hormone-Binding Globulin',
        male: '20 - 60 nmol/L',
        female: '30 - 100 nmol/L',
        rationale: 'Diproduksi di hati. Kadar insulin tinggi secara langsung menekan sintesis SHBG, meningkatkan fraksi testosteron bebas yang memicu gejala virilisasi atau disfungsi ereksi.',
    },
    {
        name: 'HbA1c',
        sub: 'Hemoglobin Glikasi 90 Hari',
        male: '< 5.4%',
        female: '< 5.4%',
        rationale: 'Rentang non-diabetik optimal untuk mencegah mikro-angiopati vaskular endotel, neuropati otonom, dan disfungsi ovulasi folikular.',
    },
    {
        name: 'Rasio WHtR (Pinggang / TB)',
        sub: 'Waist-to-Height Ratio',
        male: '< 0.50 (LP < 90 cm)',
        female: '< 0.48 (LP < 80 cm)',
        rationale: 'Surrogate non-invasif paling akurat terhadap volume timbunan visceral adipose tissue (VAT) di sekitar hepar dan pankreas.',
    },
];

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

    // Male ADAM & Cardiometabolic Screening State (Validated St. Louis ADAM Criteria)
    const [maleScreening, setMaleScreening] = useState({
        libido: true,
        postPrandialTiredness: true,
        visceralBelly: true,
        lossOfStrength: false,
        snoring: false,
    });

    // ADAM & Cardiometabolic Score Calculation
    const maleScreeningScore = useMemo(() => {
        let count = 0;
        if (maleScreening.libido) count += 25;
        if (maleScreening.postPrandialTiredness) count += 20;
        if (maleScreening.visceralBelly) count += 25;
        if (maleScreening.lossOfStrength) count += 15;
        if (maleScreening.snoring) count += 15;
        return count;
    }, [maleScreening]);

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
                mealPlan: {
                    title: 'Protokol Sarapan Presisi Hormonal Pria',
                    menu: '3 Butir telur ayam kampung (rebus / dadar minyak zaitun) + 1/2 buah alpukat mentega + tumis bayam bawang putih + segelas air lemon hangat.',
                    rationale: 'Kombinasi kolesterol alami dan asam lemak tak jenuh ganda menjadi substrat sintesis testosteron pagi tanpa memicu lonjakan insulin saat kortisol (CAR) tinggi.',
                },
            };
        }
        if (maleTimeHour >= 11 && maleTimeHour <= 15) {
            return {
                period: 'Siang Hari (11:00 - 15:00 WIB)',
                testosterone: 'Level Stabil Moderat (~75%)',
                cortisol: 'Menurun Bertahap',
                insulinStatus: 'Sensitivitas Insulin Puncak Harian',
                recommendation: 'Waktu terbaik mengonsumsi porsi makan terbesar hari ini dengan karbohidrat kompleks. Lakukan jalan kaki ringan 10 menit setelah santap siang untuk mengaktifkan GLUT-4.',
                mealPlan: {
                    title: 'Protokol Santap Siang Pengisi Glikogen Otot',
                    menu: 'Nasi beras merah/hitam atau ubi kukus (150g) + dada ayam panggang herbal / ikan kembung bakar (150g) + sayur bening kelor & labu siam + lalapan mentimun.',
                    rationale: 'Sensitivitas insulin seluler mencapai efisiensi tertinggi harian. Karbohidrat kompleks diserap optimal ke cadangan glikogen otot rangka (bukan disimpan di lemak viseral).',
                },
            };
        }
        if (maleTimeHour >= 16 && maleTimeHour <= 19) {
            return {
                period: 'Sore Hari (16:00 - 19:00 WIB)',
                testosterone: 'Level Stabil (~65%)',
                cortisol: 'Rendah',
                insulinStatus: 'Suhu Tubuh Inti & Kekuatan Otot Maksimal',
                recommendation: 'Jendela waktu optimal untuk latihan beban berat (squat, deadlift, bench press) atau latihan kardio interval. Kapasitas sintesis protein otot sangat efisien.',
                mealPlan: {
                    title: 'Protokol Camilan Pra/Pasca Latihan Fisik',
                    menu: '1 mangkuk kecil edamame rebus / tempe mendoan oven + air kelapa murni tanpa sirup (sumber elektrolit alami kalium & magnesium).',
                    rationale: 'Mendukung sintesis protein otot tanpa membebani sistem pencernaan sebelum atau setelah aktivitas kontraksi otot besar.',
                },
            };
        }
        return {
            period: 'Malam Hari (20:00 - 05:00 WIB)',
            testosterone: 'Titik Terendah Sebelum Tidur, Sintesis NREM Dimulai',
            cortisol: 'Minimal (Harus Rendah untuk Rilis Melatonin)',
            insulinStatus: 'Sensitivitas Insulin Anjlok (Metabolisme Istirahat)',
            recommendation: 'Hentikan makan karbohidrat berat 3 jam sebelum tidur. Paparan gula malam hari menekan sekresi Growth Hormone (GH) dan merusak sintesis testosteron nokturnal.',
            mealPlan: {
                title: 'Protokol Nutrisi Nokturnal Pemulihan Sel',
                menu: 'Puasa metabolik malam (Water fasting). Jika lapar: Seduhan teh chamomile hangat + 1 genggam biji labu (pumpkin seeds) tinggi zinc & magnesium.',
                rationale: 'Pencernaan istirahat total memungkinkan sekresi hormon pertumbuhan (GH) dan testosteron memuncak selama fase tidur pulas (NREM deep sleep).',
            },
        };
    }, [maleTimeHour]);

    const { auth } = usePage().props;
    const isAuthenticated = !!auth?.user;
    const Layout = isAuthenticated ? AppLayout : MarketingLayout;
    const layoutProps = isAuthenticated
        ? { title: 'Siklus & Vitalitas (AI)', activeTab: 'gender-vitality' }
        : {};

    return (
        <Layout {...layoutProps}>
            <Head title="Demo Personalisasi Biologis Hormon & Vitalitas Gender - AEVYRA" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
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
                    <div className="w-full sm:w-auto p-1 sm:p-1.5 bg-[#edf5f0] rounded-2xl border border-[#cfe2d7] flex sm:inline-flex items-center gap-1 sm:gap-2 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setSelectedGender('female')}
                            className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                                selectedGender === 'female'
                                    ? 'bg-rose-600 text-white shadow-xs'
                                    : 'text-[#2b443b] hover:text-[#10241f]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] shrink-0">female</span>
                            <span className="hidden md:inline">Wanita • Siklus Haid &amp; Sinkronisasi Glukosa</span>
                            <span className="hidden sm:inline md:hidden">Wanita • Siklus Haid</span>
                            <span className="sm:hidden">Wanita • Siklus</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setSelectedGender('male')}
                            className={`flex-1 sm:flex-initial px-3 sm:px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                                selectedGender === 'male'
                                    ? 'bg-sky-700 text-white shadow-xs'
                                    : 'text-[#2b443b] hover:text-[#10241f]'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px] shrink-0">male</span>
                            <span className="hidden md:inline">Pria • Kardiometabolik &amp; Lemak Viseral</span>
                            <span className="hidden sm:inline md:hidden">Pria • Kardiometabolik</span>
                            <span className="sm:hidden">Pria • Vitalitas</span>
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
                                    <span className="text-rose-700 whitespace-nowrap">
                                        <span className="hidden sm:inline">Hari 1 (Haid Dimulai)</span>
                                        <span className="sm:hidden">Hari 1</span>
                                    </span>
                                    <span className="text-emerald-700 whitespace-nowrap text-center">
                                        <span className="hidden sm:inline">Hari 14 (Ovulasi)</span>
                                        <span className="sm:hidden">Hari 14</span>
                                    </span>
                                    <span className="text-amber-700 whitespace-nowrap text-center">
                                        <span className="hidden sm:inline">Hari 21 (Puncak Luteal)</span>
                                        <span className="sm:hidden">Hari 21</span>
                                    </span>
                                    <span className="text-rose-700 whitespace-nowrap text-right">
                                        <span className="hidden sm:inline">Hari 28 (Pra-Menses)</span>
                                        <span className="sm:hidden">Hari 28</span>
                                    </span>
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

                            {/* Hormonal & Glycemic Wave Matrix (Interactive SVG Graphic) */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h4 className="font-heading font-black text-sm text-[#10241f] flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[17px] text-primary">show_chart</span>
                                            <span>Kurva Fluktuasi Hormon &amp; Sensitivitas Glukosa (28 Hari)</span>
                                        </h4>
                                        <p className="text-[11px] text-[#445652] font-medium">
                                            Penanda vertikal bergerak dinamis mengikuti hari siklus pilihan Anda (Hari Ke-{currentCycleDay}).
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-mono font-bold flex-wrap">
                                        <span className="flex items-center gap-1 text-emerald-800">
                                            <span className="w-2.5 h-1 rounded bg-emerald-600"></span> Estrogen (E2)
                                        </span>
                                        <span className="flex items-center gap-1 text-amber-800">
                                            <span className="w-2.5 h-1 rounded bg-amber-600"></span> Progesteron (P4)
                                        </span>
                                        <span className="flex items-center gap-1 text-rose-800">
                                            <span className="w-2.5 h-1 rounded bg-rose-600"></span> Sensitivitas Insulin
                                        </span>
                                    </div>
                                </div>

                                {/* SVG Wave Visualizer */}
                                <div className="w-full overflow-hidden bg-white rounded-xl border border-[#d8e8de] p-2.5 relative shadow-inner">
                                    <svg viewBox="0 0 600 135" className="w-full h-28 sm:h-36">
                                        {/* Background Phase Bands */}
                                        <rect x="20" y="10" width="100" height="98" fill="#ffe4e6" opacity="0.35" rx="4" />
                                        <rect x="120" y="10" width="160" height="98" fill="#d1fae5" opacity="0.35" rx="4" />
                                        <rect x="280" y="10" width="60" height="98" fill="#ccfbf1" opacity="0.35" rx="4" />
                                        <rect x="340" y="10" width="140" height="98" fill="#fef3c7" opacity="0.35" rx="4" />
                                        <rect x="480" y="10" width="100" height="98" fill="#ffe4e6" opacity="0.45" rx="4" />

                                        {/* Grid lines */}
                                        <line x1="20" y1="35" x2="580" y2="35" stroke="#edf4f0" strokeDasharray="3 3" />
                                        <line x1="20" y1="65" x2="580" y2="65" stroke="#edf4f0" strokeDasharray="3 3" />
                                        <line x1="20" y1="95" x2="580" y2="95" stroke="#edf4f0" strokeDasharray="3 3" />

                                        {/* Phase Labels */}
                                        <text x="70" y="22" fontSize="9" fill="#9f1239" fontWeight="bold" textAnchor="middle">Menstruasi</text>
                                        <text x="200" y="22" fontSize="9" fill="#065f46" fontWeight="bold" textAnchor="middle">Folikular</text>
                                        <text x="310" y="22" fontSize="9" fill="#115e59" fontWeight="bold" textAnchor="middle">Ovulasi</text>
                                        <text x="410" y="22" fontSize="9" fill="#92400e" fontWeight="bold" textAnchor="middle">Luteal Awal</text>
                                        <text x="530" y="22" fontSize="9" fill="#9f1239" fontWeight="bold" textAnchor="middle">Luteal PMS</text>

                                        {/* Curve 1: Estrogen E2 (Emerald) */}
                                        <path
                                            d="M 20 85 C 60 85, 100 80, 160 55 C 220 30, 260 20, 280 20 C 300 20, 320 60, 360 65 C 420 50, 460 55, 520 80 C 550 90, 570 95, 580 95"
                                            fill="none"
                                            stroke="#059669"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />

                                        {/* Curve 2: Progesterone P4 (Amber) */}
                                        <path
                                            d="M 20 98 C 100 98, 200 98, 280 98 C 310 95, 340 70, 380 40 C 420 25, 460 30, 500 55 C 540 85, 560 98, 580 98"
                                            fill="none"
                                            stroke="#d97706"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />

                                        {/* Curve 3: Insulin Sensitivity (Rose Dashed) */}
                                        <path
                                            d="M 20 60 C 60 55, 120 35, 180 30 C 240 28, 280 35, 320 45 C 380 65, 440 85, 500 95 C 540 102, 560 105, 580 105"
                                            fill="none"
                                            stroke="#e11d48"
                                            strokeWidth="2.5"
                                            strokeDasharray="4 2"
                                            strokeLinecap="round"
                                        />

                                        {/* Dynamic Tracker Indicator for currentCycleDay */}
                                        {(() => {
                                            const posX = 20 + ((currentCycleDay - 1) / 27) * 560;
                                            return (
                                                <g>
                                                    <line x1={posX} y1="12" x2={posX} y2="108" stroke="#be123c" strokeWidth="2" strokeDasharray="2 2" />
                                                    <circle cx={posX} cy="60" r="4.5" fill="#be123c" stroke="#ffffff" strokeWidth="1.5" />
                                                    <rect x={posX - 22} y="112" width="44" height="16" rx="4" fill="#be123c" />
                                                    <text x={posX} y="123" fontSize="8.5" fill="#ffffff" fontWeight="bold" textAnchor="middle">
                                                        Hari {currentCycleDay}
                                                    </text>
                                                </g>
                                            );
                                        })()}
                                    </svg>
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
                                    <div className="flex flex-col sm:items-end sm:text-right space-y-1 shrink-0">
                                        <span className="text-[11px] font-mono text-[#344d44] font-semibold block text-left sm:text-right">
                                            Sensitivitas Reseptor Insulin:
                                        </span>
                                        <div className="flex items-center gap-2 justify-start sm:justify-end">
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
                                        <span className="text-[10px] font-mono font-bold text-primary block text-left sm:text-right">
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

                        {/* Interactive 5 Pillars of Female Metabolic Care */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-5">
                            <div className="pb-3 border-b border-[#e2eee6]">
                                <h4 className="font-heading font-black text-lg text-[#10241f]">
                                    Protokol Preskriptif 5 Pilar Sesuai Fase: {activeFemalePhase.name}
                                </h4>
                                <p className="text-xs text-[#344d44] font-medium mt-0.5">
                                    Panduan gizi klinis, menu harian, intensitas latihan, mitigasi gejala, dan referensi standar konsensus POGI.
                                </p>
                            </div>

                            {/* Pillar Navigation Tabs - Full Width Grid Without Scroll */}
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                                {[
                                    { id: 'nutrition', label: '1. Panduan Gizi' },
                                    { id: 'meals', label: '2. Menu Harian' },
                                    { id: 'exercise', label: '3. Latihan Fisik' },
                                    { id: 'symptoms', label: '4. Redam Gejala' },
                                    { id: 'glucose', label: '5. Trik Glukosa' },
                                ].map((tab, idx) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setFemaleActivePillar(tab.id)}
                                        className={`w-full py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer text-center flex items-center justify-center ${
                                            idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                                        } ${
                                            femaleActivePillar === tab.id
                                                ? 'bg-primary text-white shadow-2xs'
                                                : 'bg-[#edf5f0] text-[#2b443b] hover:bg-[#dfeee5]'
                                        }`}
                                    >
                                        <span className="truncate">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Pillar 1: Nutrition */}
                            {femaleActivePillar === 'nutrition' && (
                                <div className="space-y-3 animate-in fade-in duration-150">
                                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                                        <b className="font-bold text-sm text-emerald-950 block mb-1">Fokus Gizi Klinis Fase {activeFemalePhase.name}:</b>
                                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
                                            {activeFemalePhase.dietAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 2: Meals (Daily Meal Plan Prescription) */}
                            {femaleActivePillar === 'meals' && (
                                <div className="space-y-4 animate-in fade-in duration-150">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                        {/* Breakfast */}
                                        <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                                                    <span>Sarapan Pagi</span>
                                                </span>
                                                <p className="font-semibold text-[#10241f] text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.breakfast}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-gray-500 pt-1 border-t border-[#e2eee6] block">
                                                06:30 - 08:30 WIB
                                            </span>
                                        </div>

                                        {/* Lunch */}
                                        <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">lunch_dining</span>
                                                    <span>Makan Siang</span>
                                                </span>
                                                <p className="font-semibold text-[#10241f] text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.lunch}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-gray-500 pt-1 border-t border-[#e2eee6] block">
                                                12:00 - 13:30 WIB
                                            </span>
                                        </div>

                                        {/* Snack */}
                                        <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-rose-800 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">cookie</span>
                                                    <span>Camilan Sore</span>
                                                </span>
                                                <p className="font-semibold text-[#10241f] text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.snack}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-gray-500 pt-1 border-t border-[#e2eee6] block">
                                                16:00 - 17:00 WIB
                                            </span>
                                        </div>

                                        {/* Dinner */}
                                        <div className="p-3.5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-teal-800 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">nights_stay</span>
                                                    <span>Makan Malam</span>
                                                </span>
                                                <p className="font-semibold text-[#10241f] text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.dinner}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-gray-500 pt-1 border-t border-[#e2eee6] block">
                                                18:30 - 19:45 WIB
                                            </span>
                                        </div>
                                    </div>

                                    {/* Clinical Rationale Box */}
                                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium flex items-start gap-2">
                                        <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">restaurant</span>
                                        <div>
                                            <span className="font-bold block">Rasional Klinis Menu Fase Ini:</span>
                                            <p className="leading-relaxed mt-0.5">{activeFemalePhase.mealPlan.rationale}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 3: Exercise */}
                            {femaleActivePillar === 'exercise' && (
                                <div className="space-y-3 animate-in fade-in duration-150">
                                    <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-950 font-medium">
                                        <b className="font-bold text-sm text-teal-950 block mb-1">Preskripsi Olahraga &amp; Zona Detak Jantung:</b>
                                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
                                            {activeFemalePhase.exerciseAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Pillar 4: Symptoms */}
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

                            {/* Pillar 5: Glucose Hacks */}
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
                                            <span className="material-symbols-outlined text-[18px]">query_stats</span>
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

                            {/* Chrono-nutritional Meal Plan for Men */}
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-primary font-bold text-xs">
                                        <span className="material-symbols-outlined text-[19px]">restaurant</span>
                                        <span>{maleCircadianInfo.mealPlan.title}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">
                                        Chrono-Nutrition
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-white border border-[#d5e5db] space-y-1.5 shadow-2xs">
                                    <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">
                                        Rekomendasi Menu Santap:
                                    </span>
                                    <p className="text-xs text-[#10241f] font-medium leading-relaxed">
                                        {maleCircadianInfo.mealPlan.menu}
                                    </p>
                                </div>
                                <div className="flex items-start gap-2 text-xs text-[#344d44] bg-[#edf5f0] p-3 rounded-xl border border-[#cfe2d7]">
                                    <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">verified</span>
                                    <div>
                                        <span className="font-bold text-[#10241f] block text-[11px]">Rasionalisasi Fisiologis:</span>
                                        <p className="text-[11px] leading-relaxed mt-0.5">{maleCircadianInfo.mealPlan.rationale}</p>
                                    </div>
                                </div>
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

                        {/* Interactive ADAM Screener Tool for Men */}
                        <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e2eee6]">
                                <div>
                                    <span className="text-[10px] font-mono font-bold text-sky-700 uppercase">
                                        Skrining Klinis Mandiri
                                    </span>
                                    <h4 className="font-heading font-black text-lg text-[#10241f] mt-0.5">
                                        Evaluasi Risiko Resistensi Insulin &amp; Defisiensi Androgen Pria (ADAM Score)
                                    </h4>
                                    <p className="text-xs text-[#344d44] font-medium">
                                        Berdasarkan kuesioner validasi <em>Saint Louis University ADAM (Androgen Deficiency in Aging Males)</em> dan konsensus kardiometabolik.
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-mono text-gray-500 block">Skor Waspada:</span>
                                    <span className="text-lg font-mono font-black text-sky-800">{maleScreeningScore}%</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                                {[
                                    { key: 'libido', label: 'Penurunan gairah seksual (libido) atau frekuensi ereksi pagi (morning wood) berkurang drastis' },
                                    { key: 'postPrandialTiredness', label: 'Mudah mengantuk berat, lemas & brain fog terutama 30-60 menit setelah makan siang berkarbohidrat' },
                                    { key: 'visceralBelly', label: 'Perut buncit lingkar pinggang > 90 cm yang sulit susut meski sudah mencoba diet rendah kalori' },
                                    { key: 'lossOfStrength', label: 'Penurunan kekuatan fisik, daya tahan angkat beban, atau hilangnya definisi massa otot lengan & dada' },
                                    { key: 'snoring', label: 'Sering mendengkur keras, nafas tersendat saat tidur (sleep apnea), atau bangun pagi dalam kondisi lelah' },
                                ].map((item) => (
                                    <label
                                        key={item.key}
                                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                                            maleScreening[item.key]
                                                ? 'bg-sky-50 border-sky-300 text-sky-950 font-bold'
                                                : 'bg-[#f6faf7] border-[#d8e8de] text-[#10241f] hover:bg-[#edf5f0]'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={maleScreening[item.key]}
                                            onChange={(e) =>
                                                setMaleScreening((prev) => ({ ...prev, [item.key]: e.target.checked }))
                                            }
                                            className="w-4 h-4 rounded text-sky-700 focus:ring-sky-600 accent-sky-700 shrink-0 cursor-pointer"
                                        />
                                        <span className="leading-snug">{item.label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Assessment Feedback Banner */}
                            <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="space-y-0.5">
                                    <span className="font-bold text-[#10241f] block">
                                        Hasil Evaluasi: {maleScreeningScore >= 50 ? '⚠️ Indikasi Waspada Andropause Dini & Lemak Viseral Aktif' : '✓ Profil Kardiometabolik & Androgen Stabil'}
                                    </span>
                                    <p className="text-[11px] text-[#344d44] leading-relaxed">
                                        {maleScreeningScore >= 50
                                            ? 'Pola keluhan menunjukkan kemungkinan penurunan bioavailabilitas testosteron bebas yang sering dipicu oleh aromatase lemak viseral dan hiperinsulinemia. Disarankan pemeriksaan lab profil lipid, HOMA-IR, dan Total Testosterone.'
                                            : 'Indikator hormonal dan toleransi glukosa Anda dalam batas fisiologis normal. Pertahankan latihan beban compound dan pembatasan karbohidrat malam hari.'}
                                    </p>
                                </div>
                                <Link
                                    href="/demo/consultations"
                                    className="px-4 py-2 rounded-xl bg-primary hover:bg-[#07664c] text-white font-bold text-xs shrink-0 text-center shadow-xs transition-all"
                                >
                                    Konsul dr. H. Bramantyo Sp.PD
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================================== */}
                {/* SECTION: CLINICAL BIOMARKER REFERENCE MATRIX (PRIA VS WANITA) */}
                {/* ============================================================== */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e2eee6]">
                        <div>
                            <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                Standar Laboratorium &amp; Diagnostik Terpadu
                            </span>
                            <h3 className="font-heading font-black text-xl text-[#10241f] mt-0.5">
                                Matriks Biomarker Laboratorium: Pria vs Wanita
                            </h3>
                            <p className="text-xs text-[#344d44] font-medium">
                                Parameter kunci untuk mendeteksi dismetabolisme perifer dan disfungsi hormon reproduksi sebelum muncul komplikasi vaskular kronis.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf5f0] border border-[#cfe2d7] text-[11px] font-mono font-bold text-primary">
                            <span className="material-symbols-outlined text-[16px]">biotech</span>
                            <span>Ref: PERKENI, PERKI &amp; POGI</span>
                        </div>
                    </div>

                    {/* Mobile View: Clean Responsive Cards (Visible on mobile/tablet < md) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden">
                        {CLINICAL_BIOMARKERS.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-3 text-xs">
                                <div className="border-b border-[#cfe2d7] pb-2">
                                    <h5 className="font-bold text-[#10241f] text-sm">{item.name}</h5>
                                    <span className="text-[10px] font-mono text-gray-500 block mt-0.5">{item.sub}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div className="p-2.5 rounded-xl bg-white border border-[#d5e5db] space-y-0.5 shadow-2xs">
                                        <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">Target Pria</span>
                                        <span className="font-mono font-bold text-sky-900 text-xs block">{item.male}</span>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-white border border-[#d5e5db] space-y-0.5 shadow-2xs">
                                        <span className="text-[10px] font-mono font-bold text-rose-800 uppercase block">Target Wanita</span>
                                        <span className="font-mono font-bold text-rose-900 text-xs block">{item.female}</span>
                                    </div>
                                </div>

                                <div className="p-3 rounded-xl bg-white border border-[#d5e5db] space-y-1 shadow-2xs">
                                    <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                        Korelasi Resistensi Insulin:
                                    </span>
                                    <p className="text-[11px] text-[#344d44] leading-relaxed">
                                        {item.rationale}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View: Full Table (Visible on md and larger) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full min-w-175 text-left border-collapse text-xs">
                            <thead>
                                <tr className="border-b border-[#cfe2d7] bg-[#f4f9f6] text-[#10241f]">
                                    <th className="py-3 px-3.5 font-bold rounded-l-xl w-1/4">Biomarker &amp; Fungsi</th>
                                    <th className="py-3 px-3.5 font-bold text-sky-900 w-1/6">Target Ideal Pria</th>
                                    <th className="py-3 px-3.5 font-bold text-rose-900 w-1/6">Target Ideal Wanita</th>
                                    <th className="py-3 px-3.5 font-bold rounded-r-xl">Korelasi Resistensi Insulin</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8f2ec] text-[#2b443b]">
                                {CLINICAL_BIOMARKERS.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3 px-3.5 font-bold text-[#10241f]">
                                            <div>{item.name}</div>
                                            <span className="text-[10px] font-normal text-gray-500 font-mono block">{item.sub}</span>
                                        </td>
                                        <td className="py-3 px-3.5 font-mono font-bold text-sky-800">{item.male}</td>
                                        <td className="py-3 px-3.5 font-mono font-bold text-rose-800">{item.female}</td>
                                        <td className="py-3 px-3.5 text-[11px] leading-relaxed">
                                            {item.rationale}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* SECTION: CLINICAL FAQ & SCIENTIFIC CONSENSUS GROUNDING */}
                {/* ============================================================== */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#d5e5db] shadow-xs space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e2eee6]">
                        <div>
                            <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                Konsensus Medis &amp; Literatur Ilmiah
                            </span>
                            <h3 className="font-heading font-black text-xl text-[#10241f] mt-0.5">
                                Tanya Jawab Klinis: Fisiologi Glukosa &amp; Hormon Seksual
                            </h3>
                            <p className="text-xs text-[#344d44] font-medium">
                                Penjelasan berbasis bukti ilmiah mengenai perbedaan mekanisme biologis antara pria dan wanita.
                            </p>
                        </div>
                        <span className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950 text-xs font-mono font-bold shrink-0">
                            Evidence-Based Medicine
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        {/* Q1 */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 font-mono text-[10px] font-bold">
                                    Konsensus POGI &amp; EMAS
                                </span>
                            </div>
                            <h5 className="font-bold text-[#10241f] text-sm leading-snug">
                                Mengapa wanita sering sulit mengontrol gula darah pada 7 hari sebelum menstruasi (Fase Luteal Akhir)?
                            </h5>
                            <p className="text-[#344d44] leading-relaxed">
                                Setelah ovulasi, progesteron melonjak untuk mempersiapkan dinding rahim. Secara evolusi biologis, progesteron tinggi menginduksi resistensi insulin transien sekitar 25-30% pada otot rangka agar lebih banyak glukosa beredar untuk potensi implantasi sel telur. Pada pola makan modern tinggi gula, hal ini bermanifestasi sebagai *sugar craving* hebat, kelelahan mendadak (*energy crash*), dan retensi cairan pemicu kembung.
                            </p>
                        </div>

                        {/* Q2 */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 font-mono text-[10px] font-bold">
                                    The Endocrine Society
                                </span>
                            </div>
                            <h5 className="font-bold text-[#10241f] text-sm leading-snug">
                                Bagaimana lemak perut (visceral fat) pada pria bisa memangkas kadar hormon testosteron?
                            </h5>
                            <p className="text-[#344d44] leading-relaxed">
                                Jaringan adiposa viseral di sekitar rongga abdomen kaya akan enzim <strong>aromatase</strong>. Enzim ini secara aktif mengubah molekul testosteron menjadi estradiol (estrogen). Di sisi lain, hiperinsulinemia menekan pelepasan hormon LH dari kelenjar hipofisis otak. Kondisi ini menciptakan lingkaran setan: lemak perut bertambah menekan testosteron, dan rendahnya testosteron menyebabkan hilangnya massa otot dan penurunan laju metabolisme basal.
                            </p>
                        </div>

                        {/* Q3 */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-mono text-[10px] font-bold">
                                    Konsensus PERKENI
                                </span>
                            </div>
                            <h5 className="font-bold text-[#10241f] text-sm leading-snug">
                                Apakah pria atau wanita dengan berat badan normal (BMI normal) bisa mengalami resistensi insulin?
                            </h5>
                            <p className="text-[#344d44] leading-relaxed">
                                Bisa, kondisi ini disebut <strong>MONW (Metabolically Obese Normal Weight)</strong> atau fenotipe <em>TOFI (Thin on the Outside, Fat on the Inside)</em>. Ditandai dengan massa otot rangka yang sangat rendah (sarcopenia tersembunyi) disertai infiltrasi lemak ektopik di dalam sel hati (*hepatic steatosis*) dan pankreas. Karena itu, pengukuran rasio lingkar pinggang (WHtR) dan uji HOMA-IR jauh lebih akurat daripada sekadar melihat timbangan berat badan.
                            </p>
                        </div>

                        {/* Q4 */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-[#f4f9f6] border border-[#cfe2d7] space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[10px] font-bold">
                                    Konsensus PERKI &amp; ACSM
                                </span>
                            </div>
                            <h5 className="font-bold text-[#10241f] text-sm leading-snug">
                                Berapa lama adaptasi gaya hidup terpadu ini membuahkan hasil klinis pada biomarker darah?
                            </h5>
                            <p className="text-[#344d44] leading-relaxed">
                                Pengaktifan transporter GLUT-4 non-insulin melalui latihan otot soleus dan compound lift bekerja seketika (menurunkan lonjakan glukosa pasca makan hingga 40-50%). Peningkatan sensitivitas insulin liver dan penurunan kadar trigliserida darah umumnya terukur secara signifikan dalam <strong>4 hingga 8 minggu</strong>, sedangkan regenerasi eritrosit untuk perbaikan HbA1c optimal terlihat pada evaluasi <strong>90 hari</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final Diagnostic Callout Action Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-br from-primary to-[#07664c] text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                            Langkah Selanjutnya Menuju Remisi Dismetabolik
                        </span>
                        <h4 className="font-heading font-black text-xl sm:text-2xl text-white">
                            Siap Melakukan Sinkronisasi Profil Biologis Anda?
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                            Daftarkan diri Anda untuk mendapatkan pembacaan kurva glukosa real-time (CGM), analisis lab hormon komprehensif, dan pendampingan dokter spesialis di platform AEVYRA.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                        <Link
                            href="/demo/consultations"
                            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-primary text-xs font-bold hover:bg-emerald-50 text-center shadow-xs transition-all cursor-pointer"
                        >
                            Jadwalkan Konsultasi Klinis
                        </Link>
                        <Link
                            href="/member/dashboard"
                            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold text-center border border-emerald-600/50 shadow-xs transition-all"
                        >
                            Masuk Dasbor Member
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
