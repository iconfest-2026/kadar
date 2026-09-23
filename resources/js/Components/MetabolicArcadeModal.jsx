import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

// Lightweight standalone zero-dependency confetti effect
const triggerConfetti = () => {
    if (typeof window === 'undefined') return;
    try {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#00695c', '#00897b', '#4db6ac', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'];
        for (let i = 0; i < 60; i++) {
            pieces.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 100,
                y: canvas.height * 0.5,
                w: Math.random() * 8 + 4,
                h: Math.random() * 6 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.8) * 14,
                gravity: 0.35,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                alpha: 1,
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;
            for (const p of pieces) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rot += p.rotSpeed;
                p.alpha -= 0.015;

                if (p.alpha > 0) {
                    active = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rot * Math.PI) / 180);
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                }
            }

            if (active) {
                requestAnimationFrame(render);
            } else {
                canvas.remove();
            }
        };
        render();
    } catch (e) {
        // Fallback gracefully
    }
};

export default function MetabolicArcadeModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    // Simulation Stages: 'SELECT_PLAYER' | 'STORY' | 'REPORT'
    const [stage, setStage] = useState('SELECT_PLAYER');
    const [selectedPlayerId, setSelectedPlayerId] = useState('dimas');
    const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
    const [chosenPath, setChosenPath] = useState([]); // array of choices selected
    const [currentMetrics, setCurrentMetrics] = useState({
        glucose: 114,
        energy: 70,
        insulinStrain: 'Normal',
        history: [114],
    });
    const [lastSelectedChoice, setLastSelectedChoice] = useState(null);

    const PLAYERS = [
        {
            id: 'dimas',
            name: 'Dimas Aryo',
            age: 31,
            role: 'Product Manager Startup',
            avatar: '/image/hero_lifestyle_scan.jpg',
            condition: 'Pra-Diabetes Asimtomatik',
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
            baseline: {
                glucose: 114,
                hba1c: '5.9%',
                waist: '92 cm',
                sleep: '5.5 jam',
                complaint: 'Sering brain fog jam 2 siang & ngantuk berat setelah makan.',
            },
            bio: 'Dimas menghabiskan 10-12 jam sehari duduk di depan laptop. Jadwal meeting yang padat membuatnya sering meraih makanan cepat saji, kopi manis gula aren, dan cemilan pantry kantor.',
            mission: 'Menjaga glukosa darah di zona euglikemik (80–130 mg/dL) agar terhindar dari eskalasi ke diabetes melitus tipe 2.',
        },
        {
            id: 'sarah',
            name: 'Sarah Nindya',
            age: 27,
            role: 'Senior UI/UX Designer',
            avatar: '/image/habit_morning_walk.jpg',
            condition: 'PCOS & Resistensi Insulin',
            badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
            baseline: {
                glucose: 104,
                hba1c: '5.6%',
                waist: '79 cm',
                sleep: '6.5 jam',
                complaint: 'Siklus haid tidak teratur & craving karbohidrat parah di sore hari.',
            },
            bio: 'Sarah didiagnosis PCOS metabolik. Konsumsi karbohidrat olahan sedikit saja memicu lonjakan hormon insulin berlebih yang memperparah peradangan dan kelelahan kronis.',
            mission: 'Meredam hiperinsulinemia postprandial dan mengembalikan ritme metabolisme sensitif insulin.',
        },
        {
            id: 'hendro',
            name: 'Ir. Hendro Wibowo',
            age: 48,
            role: 'Manajer Proyek Konstruksi',
            avatar: '/image/doctor_bramantyo.jpg',
            condition: 'Hipertensi & Dislipidemia',
            badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
            baseline: {
                glucose: 136,
                hba1c: '6.4%',
                waist: '98 cm',
                sleep: '5.0 jam',
                complaint: 'Sering makan malam jam 21:30 bersama vendor & kopi instan sachet 4x sehari.',
            },
            bio: 'Hendro bekerja dengan tingkat stres tinggi di proyek lapangan. Gaya hidup makan malam larut dan asupan natrium tinggi menempatkannya pada risiko tinggi komplikasi kardiovaskular.',
            mission: 'Mencegah lonjakan glukosa nokturnal dan menurunkan beban vaskular arterial.',
        },
    ];

    const CHAPTERS = [
        {
            id: 1,
            time: '07:15 WIB',
            phase: 'Pagi Hari',
            title: 'Ritual Sarapan Sebelum Jam Sibuk',
            scenario: 'Alarm berbunyi keras. Tokoh Anda terbangun terburu-buru untuk mengejar meeting jam 08:00. Perut mulai terasa lapar dan energi belum stabil. Di stasiun/perjalanan, Anda harus memilih asupan pertama hari ini.',
            choices: [
                {
                    id: 'A',
                    title: 'Kopi Susu Gula Aren + Croissant Cokelat Manis',
                    subtitle: 'Praktis di minimarket stasiun • 46g Gula Bebas',
                    deltaGlucose: +56,
                    energyDelta: -10,
                    insulinStrain: 'Sangat Tinggi',
                    badge: 'Spike Tajam (>160 mg/dL)',
                    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Karbohidrat olahan cair tanpa serat diserap dinding usus dalam 15 menit. Sel beta pankreas terpaksa memompa insulin dosis masif untuk meredam glukosa darah."',
                },
                {
                    id: 'B',
                    title: 'Telur Rebus 2 Butir + Oatmeal Biji Chia + Kopi Hitam Tanpa Gula',
                    subtitle: 'Padat Protein (16g) & Serat Beta-Glukan Larut',
                    deltaGlucose: +12,
                    energyDelta: +30,
                    insulinStrain: 'Normal / Stabil',
                    badge: 'Optimal (Zona Sehat)',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Beta-glukan membentuk matriks gel di lambung yang memperlambat laju penyerapan glukosa. Kurva gula darah tetap landai di kisaran 100–115 mg/dL."',
                },
                {
                    id: 'C',
                    title: 'Melewatkan Sarapan & Kopi Hitam Panas dengan Stres Tinggi',
                    subtitle: 'Perut kosong karena buru-buru • Memicu Hormon Kortisol',
                    deltaGlucose: +26,
                    energyDelta: +5,
                    insulinStrain: 'Sedang (Stres Adrenal)',
                    badge: 'Glukoneogenesis Hati',
                    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Saat perut kosong dan stres tinggi, hormon kortisol memicu hati melepaskan cadangan glikogen ke darah. Ini juga memicu risiko makan berlebih saat siang."',
                },
            ],
        },
        {
            id: 2,
            time: '12:30 WIB',
            phase: 'Siang Hari',
            title: 'Makan Siang Kantor & Ajakan Minuman Boba',
            scenario: 'Rekan kerja satu tim memesan makanan via aplikasi ojek online dan menawarkan segelas es boba manis gula aren porsi jumbo. Anda harus menentukan makan siang Anda.',
            choices: [
                {
                    id: 'A',
                    title: 'Nasi Putih Jumbo + Ayam Goreng Tepung Crispy + Es Boba Manis',
                    subtitle: 'Tinggi Lemak Jenuh & Fruktosa Cair • Kalori >950 kkal',
                    deltaGlucose: +68,
                    energyDelta: -35,
                    insulinStrain: 'Puncak Ekstrem (Kritis)',
                    badge: 'Krisis Glikemik (>180 mg/dL)',
                    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Kombinasi tepung putih, minyak jelantah, dan sirup fruktosa memicu disfungsi endotel akut dan rasa kantuk berat (Food Coma) 45 menit kemudian."',
                },
                {
                    id: 'B',
                    title: 'Gado-Gado Telur Tempe Tahu + Nasi Merah Sedikit + Es Teh Tawar',
                    subtitle: 'Makan Sayur Serat Lebih Dulu (Food Sequencing)',
                    deltaGlucose: +18,
                    energyDelta: +25,
                    insulinStrain: 'Terkontrol',
                    badge: 'Terkendali Baik',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Menghabiskan serat sayuran sebelum karbohidrat terbukti secara klinis memangkas puncak lonjakan glukosa hingga 40% pada pasien pra-diabetes."',
                },
                {
                    id: 'C',
                    title: 'Nasi Padang Lauk Ikan Bakar + Daun Singkong + Jalan Santai 10 Menit',
                    subtitle: 'Minim Tepung + Aktivasi GLUT-4 Otot Rangka',
                    deltaGlucose: +14,
                    energyDelta: +30,
                    insulinStrain: 'Sangat Rendah (Bantuan Otot)',
                    badge: 'Metabolik Terbantu Otot',
                    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Kontraksi otot rangka saat berjalan kaki santai 10 menit pasca-makan mengaktifkan transporter GLUT-4 yang menyerap gula darah langsung tanpa butuh banyak insulin."',
                },
            ],
        },
        {
            id: 3,
            time: '16:00 WIB',
            phase: 'Sore Hari',
            title: 'Krisis Lemas 4 Sore (The 4 PM Sugar Crash)',
            scenario: 'Mata terasa berat dan konsentrasi buyar di depan spreadsheet. Di meja pantry kantor, seorang rekan membawakan sekotak donat manis bertabur meses cokelat.',
            choices: [
                {
                    id: 'A',
                    title: 'Makan 2 Donat Manis + Minuman Berenergi Kaleng',
                    subtitle: 'Mencari "Sugar Rush" Cepat • Beban Glikemik 38',
                    deltaGlucose: +48,
                    energyDelta: -25,
                    insulinStrain: 'Spike Sekunder',
                    badge: 'Rebound Hipoglikemia',
                    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Suntikan gula di saat tubuh lelah hanya memberi ilusi bertenaga selama 20 menit sebelum terjun bebas dalam rebound hipoglikemia yang memperparah stres sel."',
                },
                {
                    id: 'B',
                    title: '500ml Air Dingin + Segenggam Kacang Almond & Dark Chocolate 85%',
                    subtitle: 'Hidrasi Elektrolit, Lemak Sehat & Magnesium',
                    deltaGlucose: +6,
                    energyDelta: +20,
                    insulinStrain: 'Sangat Rendah',
                    badge: 'Restoratif Alami',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Seringkali rasa lemas jam 4 sore sebenarnya adalah dehidrasi sub-klinis dan kelelahan saraf. Air dingin dan magnesium kacang almond memulihkan fokus secara sejati."',
                },
                {
                    id: 'C',
                    title: 'Peregangan Bahu 5 Menit + Kopi Espresso Hitam + Naik Turun Tangga',
                    subtitle: 'Stimulus Neuromuskular Tanpa Tambahan Kalori',
                    deltaGlucose: +8,
                    energyDelta: +22,
                    insulinStrain: 'Minimal',
                    badge: 'Oksigenasi Otak',
                    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Gerakan fisik tangga memompa aliran darah segar dan oksigen ke korteks prefrontal otak tanpa memicu beban pemecahan glikogen tambahan."',
                },
            ],
        },
        {
            id: 4,
            time: '21:30 WIB',
            phase: 'Malam Hari',
            title: 'Waktu Istirahat Sirkadian & Godaan Midnight Snack',
            scenario: 'Setelah perjalanan pulang yang melelahkan, Anda bersantai di sofa. Menonton streaming series larut malam membuat Anda tergoda memesan camilan malam.',
            choices: [
                {
                    id: 'A',
                    title: 'Pesan Mie Instan Kuah Telur Kornet + Begadang Hingga Jam 01:00',
                    subtitle: 'Tinggi Karbohidrat & Natrium • Paparan Cahaya Biru HP',
                    deltaGlucose: +58,
                    energyDelta: -40,
                    insulinStrain: 'Hiperglikemia Nokturnal',
                    badge: 'Disrupsi Sirkadian Akut',
                    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Sensitivitas insulin di malam hari menurun drastis. Kalori karbohidrat malam hari langsung disimpan sebagai lemak visceral di hepar dan mengacaukan regenerasi tidur."',
                },
                {
                    id: 'B',
                    title: 'Matikan Gadget Jam 22:00, Teh Chamomile Hangat, & Tidur Jam 22:30',
                    subtitle: 'Jendela Puasa Malam 10 Jam & Kamar Gelap Sejuk',
                    deltaGlucose: -25,
                    energyDelta: +45,
                    insulinStrain: 'Regenerasi Total Sel Beta',
                    badge: 'Pemulihan Sirkadian Sempurna',
                    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Hormon melatonin bekerja maksimal saat gelap dan tanpa beban cerna, memungkinkan sel beta pankreas beristirahat dan memulihkan sensitivitas insulin untuk esok hari."',
                },
                {
                    id: 'C',
                    title: 'Susu Kental Manis Hangat + Biskuit Gandum Jam 23:00',
                    subtitle: 'Menganggap Susu Membantu Tidur • Mengandung 35g Sukrosa',
                    deltaGlucose: +38,
                    energyDelta: -15,
                    insulinStrain: 'Tinggi di Jam Istirahat',
                    badge: 'Beban Gula Nokturnal',
                    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
                    doctorNote: 'dr. Bramantyo, Sp.PD: "Susu kental manis didominasi gula sirup, bukan protein susu murni. Gula darah akan tetap melambung sepanjang tidur dan menghambat hormon pertumbuhan (HGH)."',
                },
            ],
        },
    ];

    const activePlayer = PLAYERS.find((p) => p.id === selectedPlayerId) || PLAYERS[0];
    const activeChapter = CHAPTERS[currentChapterIdx] || CHAPTERS[0];

    const handleSelectPlayer = (player) => {
        setSelectedPlayerId(player.id);
        setCurrentMetrics({
            glucose: player.baseline.glucose,
            energy: 70,
            insulinStrain: 'Normal',
            history: [player.baseline.glucose],
        });
        setCurrentChapterIdx(0);
        setChosenPath([]);
        setLastSelectedChoice(null);
        setStage('STORY');
    };

    const handleMakeChoice = (choice) => {
        setLastSelectedChoice(choice);
        const newGlucose = Math.max(75, Math.min(220, currentMetrics.glucose + choice.deltaGlucose));
        const newEnergy = Math.max(20, Math.min(100, currentMetrics.energy + choice.energyDelta));
        const updatedHistory = [...currentMetrics.history, newGlucose];

        setCurrentMetrics({
            glucose: newGlucose,
            energy: newEnergy,
            insulinStrain: choice.insulinStrain,
            history: updatedHistory,
        });

        setChosenPath([...chosenPath, { chapter: activeChapter, choice, resultingGlucose: newGlucose }]);
    };

    const handleNextChapter = () => {
        if (currentChapterIdx + 1 < CHAPTERS.length) {
            setCurrentChapterIdx(currentChapterIdx + 1);
            setLastSelectedChoice(null);
        } else {
            // Trigger confetti if good score
            triggerConfetti();
            setStage('REPORT');
        }
    };

    const handleRestart = () => {
        setStage('SELECT_PLAYER');
        setCurrentChapterIdx(0);
        setChosenPath([]);
        setLastSelectedChoice(null);
    };

    // Calculate final metrics
    const timeInRangeCount = currentMetrics.history.filter((g) => g >= 80 && g <= 140).length;
    const timeInRangePct = Math.round((timeInRangeCount / currentMetrics.history.length) * 100);
    const maxGlucose = Math.max(...currentMetrics.history);
    const minGlucose = Math.min(...currentMetrics.history);
    const glycemicVariability = maxGlucose - minGlucose;

    let prognosisTitle = '';
    let prognosisGrade = '';
    let prognosisColor = '';
    let prognosisText = '';

    if (timeInRangePct >= 80 && glycemicVariability < 45) {
        prognosisGrade = 'A+';
        prognosisTitle = 'Remisi Glikemik Sempurna';
        prognosisColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
        prognosisText = `Luar biasa! Karakter ${activePlayer.name} berhasil mempertahankan 24 jam dalam rentang euglikemik (Time in Range ${timeInRangePct}%). Pilihan serat terdepan dan aktivitas fisik menjaga fungsi pankreas tetap awet muda.`;
    } else if (timeInRangePct >= 60) {
        prognosisGrade = 'B';
        prognosisTitle = 'Metabolik Terjaga dengan Catatan';
        prognosisColor = 'text-teal-700 bg-teal-50 border-teal-300';
        prognosisText = `Hasil cukup baik dengan Time in Range ${timeInRangePct}%. Terdapat beberapa fluktuasi ringan, namun masih dalam batas kompensasi sel beta.`;
    } else {
        prognosisGrade = 'D';
        prognosisTitle = 'Peringatan: Stres Metabolik Akut';
        prognosisColor = 'text-rose-700 bg-rose-50 border-rose-300';
        prognosisText = `Peringatan klinis! Terjadi lonjakan glukosa ekstrem hingga ${maxGlucose} mg/dL dengan variabilitas tinggi (${glycemicVariability} mg/dL). Pola ini mempercepat kelelahan sel beta pankreas dan berisiko memicu resistensi insulin kronis.`;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white dark:bg-surface border border-surface-container-high rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
                {/* Modal Top Header */}
                <div className="px-6 py-4 border-b border-surface-container flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px]">timeline</span>
                        </div>
                        <div>
                            <h3 className="font-serif text-base sm:text-lg font-bold text-on-surface">
                                Simulasi Kasus Klinis 24 Jam
                            </h3>
                            <p className="text-[11px] text-on-surface-variant">
                                Story-Driven Metabolic Decision Simulator • Panduan PERKENI
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {stage !== 'SELECT_PLAYER' && (
                            <button
                                type="button"
                                onClick={handleRestart}
                                className="text-xs text-primary font-semibold hover:underline cursor-pointer hidden sm:inline"
                            >
                                Ganti Tokoh
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Main Body */}
                <div className="p-6 sm:p-8 flex-1">
                    {/* STAGE 1: SELECT PLAYER / MODEL */}
                    {stage === 'SELECT_PLAYER' && (
                        <div className="space-y-6">
                            <div className="text-center max-w-xl mx-auto space-y-2">
                                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                                    Langkah 1: Pilih Pasien / Karakter
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface">
                                    Tentukan Kasus Metabolik yang Ingin Anda Bimbing
                                </h2>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Setiap karakter memiliki kondisi biologis, tantangan pekerjaan, dan profil risiko yang berbeda. Uji bagaimana setiap keputusan Anda dalam 24 jam mempengaruhi kurva gula darah mereka.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                {PLAYERS.map((player) => (
                                    <div
                                        key={player.id}
                                        onClick={() => handleSelectPlayer(player)}
                                        className="p-5 rounded-3xl border border-surface-container bg-surface-container-lowest hover:border-primary/60 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group space-y-4 text-left"
                                    >
                                        <div className="space-y-3">
                                            {/* Photo & Role */}
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={player.avatar}
                                                    alt={player.name}
                                                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0 group-hover:scale-105 transition-transform"
                                                />
                                                <div className="overflow-hidden">
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border block w-fit mb-1 ${player.badgeColor}`}>
                                                        {player.condition}
                                                    </span>
                                                    <h4 className="font-serif text-base font-bold text-on-surface truncate">
                                                        {player.name} ({player.age} Th)
                                                    </h4>
                                                    <p className="text-[11px] text-on-surface-variant truncate">
                                                        {player.role}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Bio & Backstory */}
                                            <p className="text-xs text-[#52645f] leading-relaxed line-clamp-3">
                                                {player.bio}
                                            </p>

                                            {/* Clinical Baseline Specs */}
                                            <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-[11px] space-y-1">
                                                <div className="flex justify-between">
                                                    <span className="text-on-surface-variant">Gula Darah Puasa:</span>
                                                    <span className="font-bold font-mono text-primary">{player.baseline.glucose} mg/dL</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-on-surface-variant">HbA1c Terakhir:</span>
                                                    <span className="font-bold font-mono text-on-surface">{player.baseline.hba1c}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-on-surface-variant">Durasi Tidur Rata-rata:</span>
                                                    <span className="font-bold text-on-surface">{player.baseline.sleep}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs group-hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                        >
                                            <span>Mulai Kasus 24 Jam</span>
                                            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: STORY CHAPTER INTERACTION */}
                    {stage === 'STORY' && (
                        <div className="space-y-6">
                            {/* HUD: Patient Status & Live Glucose Bar */}
                            <div className="p-4 sm:p-5 rounded-3xl bg-[#edf5f0] border border-[#d4e8dd] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5">
                                    <img
                                        src={activePlayer.avatar}
                                        alt={activePlayer.name}
                                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/30 shrink-0"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-serif text-sm sm:text-base font-bold text-on-surface">
                                                {activePlayer.name} ({activePlayer.age} Th)
                                            </h4>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white font-medium border border-[#cfe1d7]">
                                                {activePlayer.role}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#4d665f] mt-0.5">
                                            Babak {activeChapter.id} dari 4: <span className="font-bold text-primary">{activeChapter.phase} ({activeChapter.time})</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Dynamic Bio-Markers HUD */}
                                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                    <div className="p-2.5 rounded-2xl bg-white border border-[#cfe1d7] text-center min-w-27.5">
                                        <span className="text-[10px] text-[#556e67] block uppercase font-mono font-semibold">Gula Darah</span>
                                        <span className={`font-serif text-lg font-bold block ${
                                            currentMetrics.glucose > 140 ? 'text-rose-600' : currentMetrics.glucose > 115 ? 'text-amber-600' : 'text-emerald-700'
                                        }`}>
                                            {currentMetrics.glucose} <span className="text-[10px] font-sans font-normal">mg/dL</span>
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-2xl bg-white border border-[#cfe1d7] text-center min-w-27.5">
                                        <span className="text-[10px] text-[#556e67] block uppercase font-mono font-semibold">Beban Insulin</span>
                                        <span className="font-sans text-xs font-bold text-on-surface block mt-1">
                                            {currentMetrics.insulinStrain}
                                        </span>
                                    </div>

                                    <div className="p-2.5 rounded-2xl bg-white border border-[#cfe1d7] text-center min-w-22.5">
                                        <span className="text-[10px] text-[#556e67] block uppercase font-mono font-semibold">Fokus Energi</span>
                                        <span className="font-sans text-xs font-bold text-primary block mt-1">
                                            {currentMetrics.energy}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Story Narrative Box */}
                            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-surface-container space-y-3 shadow-xs">
                                <div className="flex items-center gap-2 text-xs text-primary font-mono font-bold">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                                    <span>{activeChapter.time} • {activeChapter.title}</span>
                                </div>
                                <p className="text-sm text-[#273834] leading-relaxed font-serif">
                                    "{activeChapter.scenario}"
                                </p>
                            </div>

                            {/* Decision Choices (Before selection) */}
                            {!lastSelectedChoice ? (
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                                        Pilih Keputusan Gaya Hidup untuk {activePlayer.name}:
                                    </label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {activeChapter.choices.map((choice) => (
                                            <button
                                                key={choice.id}
                                                type="button"
                                                onClick={() => handleMakeChoice(choice)}
                                                className="p-4 rounded-2xl border border-surface-container bg-surface-container-lowest hover:border-primary hover:bg-[#f7faf8] transition-all duration-200 cursor-pointer text-left flex items-start justify-between gap-4 group"
                                            >
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface font-mono font-bold text-xs flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                            {choice.id}
                                                        </span>
                                                        <h4 className="text-xs sm:text-sm font-bold text-on-surface group-hover:text-primary">
                                                            {choice.title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs text-[#52645f] pl-8">
                                                        {choice.subtitle}
                                                    </p>
                                                </div>

                                                <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary shrink-0 mt-1">
                                                    touch_app
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Feedback & Doctor Analysis (After selection) */
                                <div className="space-y-5 animate-in fade-in duration-300">
                                    <div className="p-5 rounded-3xl bg-[#f2f7f4] border border-[#cfe1d7] space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${lastSelectedChoice.badgeColor}`}>
                                                {lastSelectedChoice.badge}
                                            </span>
                                            <span className="text-xs font-mono font-bold text-primary">
                                                Dampak Glukosa: {lastSelectedChoice.deltaGlucose > 0 ? `+${lastSelectedChoice.deltaGlucose}` : lastSelectedChoice.deltaGlucose} mg/dL
                                            </span>
                                        </div>

                                        <div className="space-y-1">
                                            <h4 className="text-sm font-bold text-on-surface">
                                                Pilihan Anda: {lastSelectedChoice.title}
                                            </h4>
                                            <p className="text-xs text-[#4e635d]">
                                                {lastSelectedChoice.subtitle}
                                            </p>
                                        </div>

                                        {/* Doctor Advisory Quote */}
                                        <div className="pt-3 border-t border-[#d4e8dd] flex items-start gap-3">
                                            <img
                                                src="/image/doctor_bramantyo.jpg"
                                                alt="dr. Bramantyo"
                                                className="w-9 h-9 rounded-full object-cover ring-2 ring-white shrink-0 mt-0.5"
                                            />
                                            <div className="space-y-0.5">
                                                <span className="text-[11px] font-bold text-[#142622] block">
                                                    Analisis Fisiologis dr. Bramantyo, Sp.PD:
                                                </span>
                                                <p className="text-xs text-[#48635c] italic leading-relaxed">
                                                    {lastSelectedChoice.doctorNote}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Step Button */}
                                    <button
                                        type="button"
                                        onClick={handleNextChapter}
                                        className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-container transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                    >
                                        <span>
                                            {currentChapterIdx + 1 < CHAPTERS.length
                                                ? `Lanjut ke Babak ${currentChapterIdx + 2}: ${CHAPTERS[currentChapterIdx + 1].phase} (${CHAPTERS[currentChapterIdx + 1].time})`
                                                : 'Selesaikan Simulasi & Lihat Laporan Prognosis 24 Jam'}
                                        </span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STAGE 3: CLINICAL PROGNOSIS REPORT */}
                    {stage === 'REPORT' && (
                        <div className="space-y-6">
                            <div className="text-center max-w-xl mx-auto space-y-2">
                                <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full border ${prognosisColor}`}>
                                    Prognosis: {prognosisGrade} • {prognosisTitle}
                                </span>
                                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-on-surface">
                                    Hasil Simulasi 24 Jam: {activePlayer.name}
                                </h2>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    {prognosisText}
                                </p>
                            </div>

                            {/* Summary Metric Cards */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="p-3.5 rounded-2xl bg-white border border-surface-container text-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Time in Range</span>
                                    <span className="font-serif text-xl font-bold text-primary block mt-1">{timeInRangePct}%</span>
                                    <span className="text-[10px] text-emerald-700">Target ADA &gt;70%</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-surface-container text-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Glukosa Tertinggi</span>
                                    <span className="font-serif text-xl font-bold text-rose-600 block mt-1">{maxGlucose} mg/dL</span>
                                    <span className="text-[10px] text-on-surface-variant">Puncak Postprandial</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-surface-container text-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Variabilitas Glikemik</span>
                                    <span className="font-serif text-xl font-bold text-amber-600 block mt-1">{glycemicVariability} mg/dL</span>
                                    <span className="text-[10px] text-on-surface-variant">Amplitudo Fluktuasi</span>
                                </div>

                                <div className="p-3.5 rounded-2xl bg-white border border-surface-container text-center">
                                    <span className="text-[10px] text-on-surface-variant uppercase font-mono block">Fokus Energi Akhir</span>
                                    <span className="font-serif text-xl font-bold text-teal-700 block mt-1">{currentMetrics.energy}%</span>
                                    <span className="text-[10px] text-on-surface-variant">Ketahanan Kognitif</span>
                                </div>
                            </div>

                            {/* Chronological Decision Path Review */}
                            <div className="p-5 rounded-3xl bg-surface-container-lowest border border-surface-container space-y-3">
                                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                    Kronologi Keputusan 24 Jam:
                                </h4>
                                <div className="space-y-2">
                                    {chosenPath.map((item, idx) => (
                                        <div key={idx} className="p-3 rounded-2xl bg-white border border-surface-container flex items-center justify-between text-xs gap-3">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <span className="text-[10px] font-mono font-bold text-primary shrink-0 px-2 py-0.5 rounded-md bg-primary/10">
                                                    {item.chapter.time}
                                                </span>
                                                <span className="font-medium text-on-surface truncate">
                                                    {item.choice.title}
                                                </span>
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${item.choice.badgeColor}`}>
                                                {item.resultingGlucose} mg/dL
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action for Real Life */}
                            <div className="p-5 rounded-3xl bg-linear-to-r from-emerald-800 to-primary text-white space-y-4">
                                <div className="space-y-1">
                                    <h4 className="font-serif text-base font-bold">
                                        Terapkan Prinsip Ini pada Tubuh Anda Sendiri
                                    </h4>
                                    <p className="text-xs text-emerald-100 leading-relaxed">
                                        Gunakan alat scanner kamera BPOM AEVYRA untuk mendeteksi gula tersembunyi, ikuti tantangan 14 hari, dan konsultasikan pola makan Anda langsung bersama dokter spesialis.
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 pt-1">
                                    <Link
                                        href="/member/scanner"
                                        onClick={onClose}
                                        className="px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-xs hover:bg-emerald-50 transition-colors"
                                    >
                                        Buka Pemindai Nutrisi Kamera →
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleRestart}
                                        className="px-4 py-2.5 rounded-xl bg-black/25 text-white border border-white/20 font-semibold text-xs hover:bg-black/35 transition-colors cursor-pointer"
                                    >
                                        Uji Karakter Lain
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
