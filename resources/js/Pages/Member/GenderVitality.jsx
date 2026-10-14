import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import MenstrualTrackerCard from '../../Components/MenstrualTrackerCard';

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
            'Kombinasikan dengan Vitamin C (jeruk peras, tomat, paprika) untuk melipatgandakan penyerapan zat besi non-heme hingga 300%.',
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
            breakfast: 'Smoothie hijau padat nutrisi: bayam segar, bubuk protein murni, chia seed, susu almond tawar, dan setengah alpukat.',
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
        rationale: 'Diproduksi di hati. Kadar insulin tinggi menekan sintesis SHBG, meningkatkan fraksi testosteron bebas yang memicu gejala virilisasi atau disfungsi ereksi.',
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

export default function GenderVitality({
    user = {},
    sex = 'FEMALE',
    profile = {},
    lastScreening = {},
}) {
    const isFemale = sex === 'FEMALE';

    // Active sub-navigation tabs
    // Female tabs: 'kalender' | 'simulator' | 'protokol' | 'skrining' | 'biomarker'
    // Male tabs: 'whtr' | 'sirkadian' | 'latihan' | 'skrining' | 'biomarker'
    const [femaleTab, setFemaleTab] = useState('kalender');
    const [maleTab, setMaleTab] = useState('whtr');

    // -------------------------------------------------------------------------
    // FEMALE STATE
    // -------------------------------------------------------------------------
    const [currentCycleDay, setCurrentCycleDay] = useState(21);
    const [femaleActivePillar, setFemaleActivePillar] = useState('nutrition');

    const initialPcosAnswers = lastScreening?.female_pcos?.metadata?.answers || {
        irregularCycle: false,
        severeCravings: false,
        jawlineAcne: false,
        abdominalFat: false,
        facialHair: false,
    };
    const [pcosAnswers, setPcosAnswers] = useState(initialPcosAnswers);
    const [savingPcos, setSavingPcos] = useState(false);

    const activeFemalePhase = useMemo(() => {
        if (currentCycleDay >= 1 && currentCycleDay <= 5) return FEMALE_PHASES.menstrual;
        if (currentCycleDay >= 6 && currentCycleDay <= 13) return FEMALE_PHASES.follicular;
        if (currentCycleDay >= 14 && currentCycleDay <= 16) return FEMALE_PHASES.ovulation;
        if (currentCycleDay >= 17 && currentCycleDay <= 23) return FEMALE_PHASES.luteal_early;
        return FEMALE_PHASES.luteal_late;
    }, [currentCycleDay]);

    const pcosScore = useMemo(() => {
        let count = 0;
        if (pcosAnswers.irregularCycle) count += 35;
        if (pcosAnswers.severeCravings) count += 20;
        if (pcosAnswers.jawlineAcne) count += 15;
        if (pcosAnswers.abdominalFat) count += 15;
        if (pcosAnswers.facialHair) count += 15;
        return count;
    }, [pcosAnswers]);

    const handleSavePcosScreening = () => {
        setSavingPcos(true);
        router.post('/member/vitality/screening', {
            screening_type: 'female_pcos',
            score: pcosScore,
            answers: pcosAnswers,
        }, {
            preserveScroll: true,
            onFinish: () => setSavingPcos(false),
        });
    };

    // -------------------------------------------------------------------------
    // MALE STATE
    // -------------------------------------------------------------------------
    const [maleHeight, setMaleHeight] = useState(profile?.height_cm || 172);
    const [maleWaist, setMaleWaist] = useState(profile?.waist_cm || 84);
    const [maleAge, setMaleAge] = useState(profile?.age || 32);
    const [maleTimeHour, setMaleTimeHour] = useState(14);
    const [savingMetrics, setSavingMetrics] = useState(false);

    const initialMaleScreening = lastScreening?.male_adam?.metadata?.answers || {
        libido: false,
        postPrandialTiredness: false,
        visceralBelly: false,
        lossOfStrength: false,
        snoring: false,
    };
    const [maleScreening, setMaleScreening] = useState(initialMaleScreening);
    const [savingAdam, setSavingAdam] = useState(false);

    const maleScreeningScore = useMemo(() => {
        let count = 0;
        if (maleScreening.libido) count += 25;
        if (maleScreening.postPrandialTiredness) count += 20;
        if (maleScreening.visceralBelly) count += 25;
        if (maleScreening.lossOfStrength) count += 15;
        if (maleScreening.snoring) count += 15;
        return count;
    }, [maleScreening]);

    const whtrRatio = useMemo(() => {
        if (!maleHeight || maleHeight <= 0) return 0;
        return Math.round((maleWaist / maleHeight) * 100) / 100;
    }, [maleHeight, maleWaist]);

    const whtrStatus = useMemo(() => {
        if (whtrRatio < 0.4) {
            return {
                label: 'Di Bawah Standar (< 0.40)',
                color: 'text-amber-800 bg-amber-100 border-amber-300',
                description: 'Cadangan lemak tubuh minimal, disarankan evaluasi kecukupan massa otot rangka.',
                visceralRisk: 'Sangat Rendah',
            };
        }
        if (whtrRatio <= 0.49) {
            return {
                label: 'Ideal & Sehat (0.40 - 0.49)',
                color: 'text-emerald-950 bg-emerald-100 border-emerald-300 font-bold',
                description: 'Rasio lemak sentral optimal. Risiko resistensi insulin & kardiometabolik sangat rendah.',
                visceralRisk: 'Rendah (Optimal)',
            };
        }
        if (whtrRatio <= 0.59) {
            return {
                label: 'Waspada Lemak Sentral (0.50 - 0.59)',
                color: 'text-amber-950 bg-amber-100 border-amber-300 font-bold',
                description: 'Penimbunan lemak viseral di rongga abdomen mulai menekan fungsi metabolisme organ hepar.',
                visceralRisk: 'Sedang (Perlu Intervensi)',
            };
        }
        return {
            label: 'Risiko Kardiometabolik Tinggi (≥ 0.60)',
            color: 'text-rose-950 bg-rose-100 border-rose-300 font-bold',
            description: 'Indikasi kuat penumpukan visceral adipose tissue tinggi dan risiko sindrom metabolik / aterosklerosis.',
            visceralRisk: 'Tinggi (Rujukan Medis Diperlukan)',
        };
    }, [whtrRatio]);

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

    const handleSaveMetrics = () => {
        setSavingMetrics(true);
        router.post('/member/vitality/metrics', {
            waist_cm: maleWaist,
            height_cm: maleHeight,
        }, {
            preserveScroll: true,
            onFinish: () => setSavingMetrics(false),
        });
    };

    const handleSaveAdamScreening = () => {
        setSavingAdam(true);
        router.post('/member/vitality/screening', {
            screening_type: 'male_adam',
            score: maleScreeningScore,
            answers: maleScreening,
        }, {
            preserveScroll: true,
            onFinish: () => setSavingAdam(false),
        });
    };

    const handleToggleSex = () => {
        router.post('/member/profile/toggle-sex');
    };

    return (
        <AppLayout title={isFemale ? 'Kesehatan Hormonal & Siklus' : 'Vitalitas & Skrining Pria'} activeTab="vitality">
            <Head title={isFemale ? 'Siklus Hormonal & Haid - AEVYRA' : 'Vitalitas & Lemak Viseral Pria - AEVYRA'} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container pb-5">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium mb-1">
                            <Link href="/member/dashboard" className="hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-primary font-bold">
                                {isFemale ? 'Siklus & Hormonal' : 'Vitalitas & Skrining Pria'}
                            </span>
                        </div>
                        <h1 className="font-heading font-black text-xl sm:text-2xl text-on-surface tracking-tight">
                            {isFemale ? 'Siklus Hormonal, Haid & Skrining Resistensi Insulin' : 'Skrining Lemak Viseral, Kardiometabolik & Vitalitas Pria'}
                        </h1>
                        <p className="text-xs text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
                            {isFemale
                                ? 'Kalender pintar prediksi siklus haid, fase ovulasi, dan panduan metabolisme karbohidrat berbasis fluktuasi hormon estrogen-progesteron serta evaluasi risiko PCOS.'
                                : 'Pemantauan rasio lingkar pinggang terhadap tinggi badan (WHtR), pencegahan sindrom metabolik, jam biologis sirkadian testosteron, dan kuesioner validasi Saint Louis ADAM.'}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <span className="px-3 py-1 rounded-full text-xs font-label-mono font-bold uppercase tracking-wider bg-primary/10 text-primary">
                            {isFemale ? 'Akun Wanita' : 'Akun Pria'}
                        </span>

                        <button
                            type="button"
                            onClick={handleToggleSex}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-on-surface-variant transition-colors cursor-pointer border border-surface-container"
                            title={isFemale ? 'Beralih ke mode skrining pria' : 'Beralih ke mode siklus hormonal wanita'}
                        >
                            <span className="material-symbols-outlined text-[15px]">
                                {isFemale ? 'male' : 'female'}
                            </span>
                            <span>{isFemale ? 'Uji Akun Pria' : 'Uji Akun Wanita'}</span>
                        </button>
                    </div>
                </div>

                {/* Comparative Benchmark Bar: 4 Facts of Biological Differences */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase block">Wanita • Variasi Glukosa</span>
                        <div className="font-heading text-lg sm:text-xl font-bold text-on-surface">±30% Fluktuasi</div>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Sensitivitas insulin turun drastis pada fase luteal pra-menstruasi.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase block">Wanita • Prevalensi PCOS</span>
                        <div className="font-heading text-lg sm:text-xl font-bold text-on-surface">1 dari 10 Wanita</div>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Mengalami resistensi insulin ovarium yang mengganggu siklus ovulasi.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">Pria • Lemak Viseral</span>
                        <div className="font-heading text-lg sm:text-xl font-bold text-on-surface">2.5x Lebih Rentan</div>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Menimbun lemak di rongga perut yang memicu perlemakan hati (NAFLD).</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-surface border border-surface-container space-y-1 shadow-2xs">
                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">Pria • Penurunan Androgen</span>
                        <div className="font-heading text-lg sm:text-xl font-bold text-on-surface">-40% Testosteron</div>
                        <p className="text-[11px] text-on-surface-variant leading-snug">Aromatase lemak perut memangkas produksi testosteron alami pria.</p>
                    </div>
                </div>

                {/* ============================================================== */}
                {/* FEMALE VIEW */}
                {/* ============================================================== */}
                {isFemale && (
                    <div className="space-y-6">
                        {/* Female Sub-Nav Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-surface-container">
                            {[
                                { id: 'kalender', label: '1. Kalender & Catatan Haid', icon: 'calendar_month' },
                                { id: 'simulator', label: '2. Siklus & Kurva Hormon', icon: 'show_chart' },
                                { id: 'protokol', label: '3. Protokol 5 Pilar Gizi', icon: 'restaurant' },
                                { id: 'skrining', label: '4. Skrining PCOS & Insulin', icon: 'health_and_safety' },
                                { id: 'biomarker', label: '5. Matriks Biomarker Lab', icon: 'biotech' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setFemaleTab(tab.id)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                                        femaleTab === tab.id
                                            ? 'bg-primary text-white shadow-xs'
                                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab 1: Kalender & Log Haid */}
                        {femaleTab === 'kalender' && (
                            <div className="animate-in fade-in duration-150">
                                <MenstrualTrackerCard />
                            </div>
                        )}

                        {/* Tab 2: Simulator Siklus 28 Hari & Kurva Gelombang Hormon */}
                        {femaleTab === 'simulator' && (
                            <div className="space-y-6 animate-in fade-in duration-150">
                                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                                        <div>
                                            <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase">
                                                Female Cycle-Syncing Engine
                                            </span>
                                            <h3 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                                Simulator Interaktif Siklus Menstruasi 28 Hari
                                            </h3>
                                            <p className="text-xs text-on-surface-variant">
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
                                        <div className="flex items-center justify-between text-xs font-mono font-bold text-on-surface">
                                            <span className="text-rose-700 whitespace-nowrap">Hari 1 (Haid)</span>
                                            <span className="text-emerald-700 whitespace-nowrap text-center">Hari 14 (Ovulasi)</span>
                                            <span className="text-amber-700 whitespace-nowrap text-center">Hari 21 (Puncak Luteal)</span>
                                            <span className="text-rose-700 whitespace-nowrap text-right">Hari 28 (Pra-Menses)</span>
                                        </div>

                                        <input
                                            type="range"
                                            min="1"
                                            max="28"
                                            value={currentCycleDay}
                                            onChange={(e) => setCurrentCycleDay(parseInt(e.target.value))}
                                            className="w-full h-3 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-rose-600"
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
                                                            : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container'
                                                    }`}
                                                >
                                                    <span className="block truncate">{p.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hormonal & Glycemic Wave Matrix (SVG Graphic) */}
                                    <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <div>
                                                <h4 className="font-heading font-black text-sm text-on-surface flex items-center gap-1.5">
                                                    <span className="material-symbols-outlined text-[17px] text-primary">show_chart</span>
                                                    <span>Kurva Fluktuasi Hormon &amp; Sensitivitas Glukosa (28 Hari)</span>
                                                </h4>
                                                <p className="text-[11px] text-on-surface-variant font-medium">
                                                    Penanda vertikal bergerak dinamis mengikuti hari pilihan Anda (Hari Ke-{currentCycleDay}).
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] font-mono font-bold flex-wrap">
                                                <span className="flex items-center gap-1 text-emerald-700">
                                                    <span className="w-2.5 h-1 rounded bg-emerald-600"></span> Estrogen (E2)
                                                </span>
                                                <span className="flex items-center gap-1 text-amber-700">
                                                    <span className="w-2.5 h-1 rounded bg-amber-600"></span> Progesteron (P4)
                                                </span>
                                                <span className="flex items-center gap-1 text-rose-700">
                                                    <span className="w-2.5 h-1 rounded bg-rose-600"></span> Sensitivitas Insulin
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full overflow-hidden bg-white dark:bg-surface rounded-xl border border-surface-container p-2.5 relative shadow-inner">
                                            <svg viewBox="0 0 600 135" className="w-full h-28 sm:h-36">
                                                <rect x="20" y="10" width="100" height="98" fill="#ffe4e6" opacity="0.35" rx="4" />
                                                <rect x="120" y="10" width="160" height="98" fill="#d1fae5" opacity="0.35" rx="4" />
                                                <rect x="280" y="10" width="60" height="98" fill="#ccfbf1" opacity="0.35" rx="4" />
                                                <rect x="340" y="10" width="140" height="98" fill="#fef3c7" opacity="0.35" rx="4" />
                                                <rect x="480" y="10" width="100" height="98" fill="#ffe4e6" opacity="0.45" rx="4" />

                                                <line x1="20" y1="35" x2="580" y2="35" stroke="#edf4f0" strokeDasharray="3 3" />
                                                <line x1="20" y1="65" x2="580" y2="65" stroke="#edf4f0" strokeDasharray="3 3" />
                                                <line x1="20" y1="95" x2="580" y2="95" stroke="#edf4f0" strokeDasharray="3 3" />

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

                                    {/* Active Phase Diagnostic Box */}
                                    <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border bg-rose-100 text-rose-950 border-rose-300">
                                                        {activeFemalePhase.dayRange}
                                                    </span>
                                                    <h4 className="font-heading font-black text-base text-on-surface">
                                                        {activeFemalePhase.name}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                                    {activeFemalePhase.subName}
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:items-end sm:text-right space-y-1 shrink-0">
                                                <span className="text-[11px] font-mono text-on-surface-variant font-semibold block text-left sm:text-right">
                                                    Sensitivitas Reseptor Insulin:
                                                </span>
                                                <div className="flex items-center gap-2 justify-start sm:justify-end">
                                                    <div className="w-32 sm:w-40 h-3 bg-gray-200 dark:bg-surface-container-high rounded-full overflow-hidden">
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
                                                    <span className="text-xs font-mono font-black text-on-surface">
                                                        {activeFemalePhase.insulinSensitivityScore}%
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-mono font-bold text-primary block text-left sm:text-right">
                                                    {activeFemalePhase.insulinSensitivityLabel}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container space-y-1">
                                                <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                                    Status Hormon Dominan
                                                </span>
                                                <p className="font-semibold text-on-surface leading-snug">
                                                    {activeFemalePhase.hormoneStatus}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container space-y-1">
                                                <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                                    Dinamika Laju Metabolisme
                                                </span>
                                                <p className="font-semibold text-on-surface leading-snug">
                                                    {activeFemalePhase.metabolicRate}
                                                </p>
                                            </div>

                                            <div className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container space-y-1">
                                                <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                                    Toleransi Gula &amp; Fluktuasi
                                                </span>
                                                <p className="font-semibold text-on-surface leading-snug">
                                                    {activeFemalePhase.glucoseDynamics}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Protokol Preskriptif 5 Pilar */}
                        {femaleTab === 'protokol' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="pb-3 border-b border-surface-container">
                                    <h4 className="font-heading font-black text-lg text-on-surface">
                                        Protokol Preskriptif 5 Pilar Sesuai Fase: {activeFemalePhase.name}
                                    </h4>
                                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                                        Panduan gizi klinis, menu harian, intensitas latihan, mitigasi gejala, dan referensi standar konsensus POGI.
                                    </p>
                                </div>

                                {/* Pillar Navigation Tabs */}
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
                                                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                            }`}
                                        >
                                            <span className="truncate">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Pillar 1: Gizi */}
                                {femaleActivePillar === 'nutrition' && (
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                                        <b className="font-bold text-sm block mb-1">Fokus Gizi Klinis Fase {activeFemalePhase.name}:</b>
                                        <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs">
                                            {activeFemalePhase.dietAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Pillar 2: Meals */}
                                {femaleActivePillar === 'meals' && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">wb_sunny</span>
                                                    <span>Sarapan Pagi</span>
                                                </span>
                                                <p className="font-semibold text-on-surface text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.breakfast}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-on-surface-variant pt-1 border-t border-surface-container block">
                                                06:30 - 08:30 WIB
                                            </span>
                                        </div>

                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-amber-700 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">lunch_dining</span>
                                                    <span>Makan Siang</span>
                                                </span>
                                                <p className="font-semibold text-on-surface text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.lunch}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-on-surface-variant pt-1 border-t border-surface-container block">
                                                12:00 - 13:30 WIB
                                            </span>
                                        </div>

                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-primary uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">bakery_dining</span>
                                                    <span>Camilan Sore</span>
                                                </span>
                                                <p className="font-semibold text-on-surface text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.snack}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-on-surface-variant pt-1 border-t border-surface-container block">
                                                16:00 - 16:30 WIB
                                            </span>
                                        </div>

                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-mono font-bold text-rose-700 uppercase flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px]">dinner_dining</span>
                                                    <span>Makan Malam</span>
                                                </span>
                                                <p className="font-semibold text-on-surface text-xs mt-1 leading-snug">
                                                    {activeFemalePhase.mealPlan.dinner}
                                                </p>
                                            </div>
                                            <span className="text-[9.5px] font-mono text-on-surface-variant pt-1 border-t border-surface-container block">
                                                18:30 - 19:30 WIB
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Pillar 3: Exercise */}
                                {femaleActivePillar === 'exercise' && (
                                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 font-medium space-y-2">
                                        <b className="font-bold text-sm block">Panduan Aktivitas Fisik Fase {activeFemalePhase.name}:</b>
                                        <ul className="list-disc pl-5 space-y-1.5">
                                            {activeFemalePhase.exerciseAdvice.map((item, idx) => (
                                                <li key={idx} className="leading-relaxed">{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Pillar 4: Symptoms */}
                                {femaleActivePillar === 'symptoms' && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                            <span className="text-[10px] font-mono font-bold text-rose-700 uppercase block">Kram &amp; Nyeri Panggul</span>
                                            <p className="text-on-surface leading-snug">{activeFemalePhase.symptomProtocol.cramps}</p>
                                        </div>
                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                            <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Manajemen Energi &amp; Tidur</span>
                                            <p className="text-on-surface leading-snug">{activeFemalePhase.symptomProtocol.energy}</p>
                                        </div>
                                        <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">Sugar &amp; Salt Cravings</span>
                                            <p className="text-on-surface leading-snug">{activeFemalePhase.symptomProtocol.craving}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Pillar 5: Glucose Hacks */}
                                {femaleActivePillar === 'glucose' && (
                                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 font-medium space-y-2">
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
                            </div>
                        )}

                        {/* Tab 4: Skrining PCOS & Resistensi Insulin Ovarium */}
                        {femaleTab === 'skrining' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-400 uppercase">
                                            Skrining Mandiri Validasi Klinis
                                        </span>
                                        <h4 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Evaluasi Risiko Resistensi Insulin &amp; PCOS (Polycystic Ovary Syndrome)
                                        </h4>
                                        <p className="text-xs text-on-surface-variant font-medium">
                                            Beri tanda centang pada gejala yang sering Anda rasakan untuk mendeteksi potensi disfungsi ovulasi metabolik.
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono text-on-surface-variant block">Skor Waspada:</span>
                                        <span className="text-xl font-mono font-black text-rose-700">{pcosScore}%</span>
                                    </div>
                                </div>

                                {lastScreening?.female_pcos && (
                                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px] text-primary">history</span>
                                            <span>Skrining Terakhir: <strong>Skor {lastScreening.female_pcos.score}%</strong> ({lastScreening.female_pcos.recorded_at})</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-primary/10 text-primary">Tersimpan</span>
                                    </div>
                                )}

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
                                                    ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 text-rose-950 dark:text-rose-200 font-bold'
                                                    : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container'
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
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                                    <div className="space-y-1">
                                        <span className="font-bold text-on-surface block text-sm">
                                            Hasil Evaluasi: {pcosScore >= 50 ? '⚠️ Indikasi Waspada Resistensi Luteal / PCOS' : '✓ Profil Risiko Rendah Terkendali'}
                                        </span>
                                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                            {pcosScore >= 50
                                                ? 'Pola gejala menunjukkan potensi penurunan sensitivitas insulin perifer yang dapat mempengaruhi ovulasi teratur. Disarankan konsultasi ginekologi & skrining USG pelvis.'
                                                : 'Kondisi metabolik siklus Anda dalam batas fisiologis normal. Lanjutkan panduan sinkronisasi nutrisi 4 fase.'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={handleSavePcosScreening}
                                            disabled={savingPcos}
                                            className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-dim transition-all cursor-pointer disabled:opacity-50"
                                        >
                                            {savingPcos ? 'Menyimpan...' : 'Simpan Hasil Skrining'}
                                        </button>
                                        <Link
                                            href="/demo/consultations"
                                            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs shadow-xs transition-all border border-surface-container text-center"
                                        >
                                            Konsultasi Dokter
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 5: Matriks Biomarker Laboratorium */}
                        {femaleTab === 'biomarker' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Standar Laboratorium &amp; Diagnostik
                                        </span>
                                        <h3 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Matriks Biomarker Laboratorium Wanita &amp; Pria
                                        </h3>
                                        <p className="text-xs text-on-surface-variant">
                                            Parameter kunci untuk mendeteksi dismetabolisme perifer dan disfungsi hormon sebelum komplikasi kronis.
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-[11px] font-mono font-bold text-primary">
                                        <span className="material-symbols-outlined text-[16px]">biotech</span>
                                        <span>Ref: PERKENI, PERKI &amp; POGI</span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px] text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-surface-container text-on-surface-variant font-mono">
                                                <th className="py-2.5 px-3 font-bold">Biomarker</th>
                                                <th className="py-2.5 px-3 font-bold text-rose-700">Target Wanita</th>
                                                <th className="py-2.5 px-3 font-bold text-primary">Target Pria</th>
                                                <th className="py-2.5 px-3 font-bold">Rasionalisasi Klinis</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-surface-container">
                                            {CLINICAL_BIOMARKERS.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                                                    <td className="py-3 px-3">
                                                        <span className="font-bold text-on-surface block">{item.name}</span>
                                                        <span className="text-[10px] text-on-surface-variant">{item.sub}</span>
                                                    </td>
                                                    <td className="py-3 px-3 font-mono font-bold text-rose-700">{item.female}</td>
                                                    <td className="py-3 px-3 font-mono font-bold text-primary">{item.male}</td>
                                                    <td className="py-3 px-3 text-[11px] text-on-surface-variant leading-relaxed">{item.rationale}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ============================================================== */}
                {/* MALE VIEW */}
                {/* ============================================================== */}
                {!isFemale && (
                    <div className="space-y-6">
                        {/* Male Sub-Nav Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-surface-container">
                            {[
                                { id: 'whtr', label: '1. Rasio WHtR & Lemak Viseral', icon: 'straighten' },
                                { id: 'sirkadian', label: '2. Jam Biologis 24 Jam', icon: 'schedule' },
                                { id: 'latihan', label: '3. Protokol Latihan GLUT-4', icon: 'fitness_center' },
                                { id: 'skrining', label: '4. Skrining Validasi ADAM', icon: 'assignment' },
                                { id: 'biomarker', label: '5. Matriks Biomarker Lab', icon: 'biotech' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setMaleTab(tab.id)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                                        maleTab === tab.id
                                            ? 'bg-primary text-white shadow-xs'
                                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant'
                                    }`}
                                >
                                    <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab 1: Kalkulator WHtR & Lemak Viseral */}
                        {maleTab === 'whtr' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-6 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Male Cardiometabolic Screening
                                        </span>
                                        <h3 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Kalkulator Rasio Lingkar Pinggang (WHtR) &amp; Lemak Viseral
                                        </h3>
                                        <p className="text-xs text-on-surface-variant">
                                            Pedoman British Medical Journal &amp; PERKI membuktikan Rasio Pinggang-ke-Tinggi (WHtR) jauh lebih akurat dibanding BMI dalam memprediksi risiko diabetes &amp; serangan jantung pria.
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-2xs ${whtrStatus.color}`}>
                                        WHtR {whtrRatio}
                                    </span>
                                </div>

                                {/* Inputs for Height, Waist, Age */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="space-y-2 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                                        <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                                            <span>Tinggi Badan (TB):</span>
                                            <span className="font-mono text-primary text-sm">{maleHeight} cm</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="140"
                                            max="210"
                                            value={maleHeight}
                                            onChange={(e) => setMaleHeight(parseInt(e.target.value))}
                                            className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-[10px] font-mono text-on-surface-variant block">Rentang: 140 - 210 cm</span>
                                    </div>

                                    <div className="space-y-2 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                                        <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                                            <span>Lingkar Pinggang (LP):</span>
                                            <span className="font-mono text-primary text-sm">{maleWaist} cm</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="60"
                                            max="140"
                                            value={maleWaist}
                                            onChange={(e) => setMaleWaist(parseInt(e.target.value))}
                                            className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-[10px] font-mono text-on-surface-variant block">Batas Waspada Pria Asia: ≥ 90 cm</span>
                                    </div>

                                    <div className="space-y-2 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                                        <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                                            <span>Usia:</span>
                                            <span className="font-mono text-primary text-sm">{maleAge} Tahun</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="18"
                                            max="80"
                                            value={maleAge}
                                            onChange={(e) => setMaleAge(parseInt(e.target.value))}
                                            className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <span className="text-[10px] font-mono text-on-surface-variant block">Kelompok Umur Produktif</span>
                                    </div>
                                </div>

                                {/* Diagnostic Result Card */}
                                <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-container pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                                <span className="material-symbols-outlined text-[18px]">query_stats</span>
                                            </span>
                                            <div>
                                                <h4 className="font-bold text-xs text-on-surface">Klasifikasi Klinis Rasio Pinggang:</h4>
                                                <span className="text-sm font-black text-primary">{whtrStatus.label}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-mono text-on-surface-variant block">Tingkat Risiko Lemak Viseral:</span>
                                            <span className="text-xs font-bold font-mono text-emerald-700">{whtrStatus.visceralRisk}</span>
                                        </div>
                                    </div>

                                    <p className="text-xs text-on-surface-variant leading-relaxed">
                                        {whtrStatus.description} Rumus baku PERKI: <em>"Jaga ukuran lingkar pinggang Anda di bawah separuh tinggi badan (LP &lt; 0.5 × TB)"</em>. Pada tinggi badan {maleHeight} cm, lingkar pinggang ideal maksimal Anda adalah <strong>{Math.round(maleHeight * 0.5)} cm</strong>.
                                    </p>

                                    <div className="pt-2 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={handleSaveMetrics}
                                            disabled={savingMetrics}
                                            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-dim transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">save</span>
                                            <span>{savingMetrics ? 'Menyimpan...' : 'Simpan Ukuran Tubuh'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Jam Biologis Sirkadian 24 Jam Pria */}
                        {maleTab === 'sirkadian' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Circadian Endocrinology
                                        </span>
                                        <h4 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Jam Biologis 24 Jam Pria: Testosteron &amp; Efisiensi Glukosa
                                        </h4>
                                        <p className="text-xs text-on-surface-variant">
                                            Pilih jam aktivitas untuk melihat interaksi hormon androgen, kortisol, dan pembakaran kalori harian.
                                        </p>
                                    </div>

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
                                                        ? 'bg-primary text-white shadow-2xs'
                                                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                                                }`}
                                            >
                                                {h.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                            Level Testosteron Alami
                                        </span>
                                        <p className="font-bold text-on-surface text-sm">
                                            {maleCircadianInfo.testosterone}
                                        </p>
                                        <p className="text-[11px] text-on-surface-variant">Dipengaruhi kualitas tidur NREM deep sleep.</p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">
                                            Ritme Hormon Kortisol
                                        </span>
                                        <p className="font-bold text-on-surface text-sm">
                                            {maleCircadianInfo.cortisol}
                                        </p>
                                        <p className="text-[11px] text-on-surface-variant">Kortisol tinggi malam hari merusak sel beta pankreas.</p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1">
                                        <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">
                                            Sensitivitas Insulin Seluler
                                        </span>
                                        <p className="font-bold text-on-surface text-sm">
                                            {maleCircadianInfo.insulinStatus}
                                        </p>
                                        <p className="text-[11px] text-on-surface-variant">Tubuh paling efisien mengolah glukosa di siang hari.</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-primary/5 dark:bg-primary/10 border border-primary/20 text-xs text-on-surface font-medium space-y-1">
                                    <b className="font-bold block text-primary">
                                        Strategi Preskriptif {maleCircadianInfo.period}:
                                    </b>
                                    <p className="leading-relaxed">
                                        {maleCircadianInfo.recommendation}
                                    </p>
                                </div>

                                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs">
                                            <span className="material-symbols-outlined text-[19px]">restaurant</span>
                                            <span>{maleCircadianInfo.mealPlan.title}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-on-surface-variant font-bold uppercase tracking-wider">
                                            Chrono-Nutrition
                                        </span>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-white dark:bg-surface border border-surface-container space-y-1.5 shadow-2xs">
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase block">
                                            Rekomendasi Menu Santap:
                                        </span>
                                        <p className="text-xs text-on-surface font-medium leading-relaxed">
                                            {maleCircadianInfo.mealPlan.menu}
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-on-surface-variant bg-surface-container p-3 rounded-xl border border-surface-container">
                                        <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">verified</span>
                                        <div>
                                            <span className="font-bold text-on-surface block text-[11px]">Rasionalisasi Fisiologis:</span>
                                            <p className="text-[11px] leading-relaxed mt-0.5">{maleCircadianInfo.mealPlan.rationale}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Protokol Latihan GLUT-4 Otot */}
                        {maleTab === 'latihan' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-4 animate-in fade-in duration-150">
                                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase">
                                            Muscle-to-Glucose Sink
                                        </span>
                                        <h4 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            3 Latihan Utama Penguras Cadangan Glukosa Pria
                                        </h4>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-mono font-bold border border-emerald-300">
                                        Aktivasi GLUT-4 Non-Insulin
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                            <span>Soleus Pushup (Duduk)</span>
                                        </div>
                                        <p className="text-on-surface-variant leading-relaxed">
                                            Otot soleus betis membakar glukosa lokal tanpa memicu kelelahan sistemik. Mampu menurunkan fluktuasi gula darah hingga 52% saat duduk bekerja di depan laptop.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                                            <span>Zone 2 Cardio (Incline Walk)</span>
                                        </div>
                                        <p className="text-on-surface-variant leading-relaxed">
                                            Jalan cepat di treadmill elevasi 8-10% berdurasi 35-45 menit. Memaksa mitokondria membakar asam lemak bebas viseral dan mengembalikan sensitivitas insulin perifer.
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                                            <span>Compound Lift (Squat/Deadlift)</span>
                                        </div>
                                        <p className="text-on-surface-variant leading-relaxed">
                                            Latihan beban otot paha dan punggung besar meningkatkan kapasitas tangki glikogen otot hingga 300 gram, mencegah kelebihan karbohidrat diubah jadi lemak hati.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Skrining Saint Louis University ADAM & Kardiometabolik */}
                        {maleTab === 'skrining' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Skrining Klinis Mandiri Validasi
                                        </span>
                                        <h4 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Evaluasi Risiko Resistensi Insulin &amp; Defisiensi Androgen Pria (ADAM Score)
                                        </h4>
                                        <p className="text-xs text-on-surface-variant font-medium">
                                            Berdasarkan kuesioner validasi <em>Saint Louis University ADAM (Androgen Deficiency in Aging Males)</em> dan konsensus kardiometabolik.
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono text-on-surface-variant block">Skor Waspada:</span>
                                        <span className="text-xl font-mono font-black text-primary">{maleScreeningScore}%</span>
                                    </div>
                                </div>

                                {lastScreening?.male_adam && (
                                    <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[16px] text-primary">history</span>
                                            <span>Skrining Terakhir: <strong>Skor {lastScreening.male_adam.score}%</strong> ({lastScreening.male_adam.recorded_at})</span>
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-primary/10 text-primary">Tersimpan</span>
                                    </div>
                                )}

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
                                                    ? 'bg-primary/10 dark:bg-primary/20 border-primary/40 text-on-surface font-bold'
                                                    : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={maleScreening[item.key]}
                                                onChange={(e) =>
                                                    setMaleScreening((prev) => ({ ...prev, [item.key]: e.target.checked }))
                                                }
                                                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary shrink-0 cursor-pointer"
                                            />
                                            <span className="leading-snug">{item.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Assessment Feedback Banner */}
                                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                                    <div className="space-y-1">
                                        <span className="font-bold text-on-surface block text-sm">
                                            Hasil Evaluasi: {maleScreeningScore >= 50 ? '⚠️ Indikasi Waspada Andropause Dini & Lemak Viseral Aktif' : '✓ Profil Kardiometabolik & Androgen Stabil'}
                                        </span>
                                        <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                            {maleScreeningScore >= 50
                                                ? 'Pola keluhan menunjukkan kemungkinan penurunan bioavailabilitas testosteron bebas yang sering dipicu oleh aromatase lemak viseral dan hiperinsulinemia. Disarankan pemeriksaan lab profil lipid, HOMA-IR, dan Total Testosterone.'
                                                : 'Indikator hormonal dan toleransi glukosa Anda dalam batas fisiologis normal. Pertahankan latihan beban compound dan pembatasan karbohidrat malam hari.'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            type="button"
                                            onClick={handleSaveAdamScreening}
                                            disabled={savingAdam}
                                            className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-primary-dim transition-all cursor-pointer disabled:opacity-50"
                                        >
                                            {savingAdam ? 'Menyimpan...' : 'Simpan Hasil Skrining'}
                                        </button>
                                        <Link
                                            href="/demo/consultations"
                                            className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs shadow-xs transition-all border border-surface-container text-center"
                                        >
                                            Konsultasi Dokter
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 5: Matriks Biomarker Laboratorium */}
                        {maleTab === 'biomarker' && (
                            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-xs space-y-5 animate-in fade-in duration-150">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container">
                                    <div>
                                        <span className="text-[10px] font-mono font-bold text-primary uppercase">
                                            Standar Laboratorium &amp; Diagnostik
                                        </span>
                                        <h3 className="font-heading font-black text-lg text-on-surface mt-0.5">
                                            Matriks Biomarker Laboratorium Pria &amp; Wanita
                                        </h3>
                                        <p className="text-xs text-on-surface-variant">
                                            Parameter kunci untuk mendeteksi dismetabolisme perifer dan disfungsi hormon sebelum komplikasi kronis.
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-[11px] font-mono font-bold text-primary">
                                        <span className="material-symbols-outlined text-[16px]">biotech</span>
                                        <span>Ref: PERKENI, PERKI &amp; POGI</span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[600px] text-left border-collapse text-xs">
                                        <thead>
                                            <tr className="border-b border-surface-container text-on-surface-variant font-mono">
                                                <th className="py-2.5 px-3 font-bold">Biomarker</th>
                                                <th className="py-2.5 px-3 font-bold text-primary">Target Pria</th>
                                                <th className="py-2.5 px-3 font-bold text-rose-700">Target Wanita</th>
                                                <th className="py-2.5 px-3 font-bold">Rasionalisasi Klinis</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-surface-container">
                                            {CLINICAL_BIOMARKERS.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                                                    <td className="py-3 px-3">
                                                        <span className="font-bold text-on-surface block">{item.name}</span>
                                                        <span className="text-[10px] text-on-surface-variant">{item.sub}</span>
                                                    </td>
                                                    <td className="py-3 px-3 font-mono font-bold text-primary">{item.male}</td>
                                                    <td className="py-3 px-3 font-mono font-bold text-rose-700">{item.female}</td>
                                                    <td className="py-3 px-3 text-[11px] text-on-surface-variant leading-relaxed">{item.rationale}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
