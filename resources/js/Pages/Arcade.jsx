import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import MarketingLayout from '../Layouts/MarketingLayout';
import MetabolicStoryGame from '../Components/MetabolicStoryGame';

export default function Arcade({ leaderboard: initialLeaderboard = [] }) {
    const { auth } = usePage().props;
    const isAuthenticated = !!auth?.user;

    const patientPersonas = [
        {
            name: 'Sarah Nindya',
            age: '34 Tahun',
            role: 'Brand Strategist & Ibu Bekerja',
            avatar: '/image/habit_morning_walk.jpg',
            focus: 'Kesehatan Wanita & Fluktuasi Hormon Menstruasi',
            badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
            baseGlucose: 162,
            baseHbA1c: '6.5%',
            challenge: 'Resistensi insulin fisiologis melonjak 7 hari menjelang haid (fase luteal). Mengalami sugar craving hebat dan energi ambruk jam 15:00.',
            goal: 'Menstabilkan kurva glukosa tanpa pemicu inflamasi dengan asupan tinggi magnesium, zat besi, dan serat sayuran hijau.',
            icon: 'female',
        },
        {
            name: 'Ir. Hendro Wibowo',
            age: '52 Tahun',
            role: 'Manajer Proyek Konstruksi',
            avatar: '/image/doctor_bramantyo.jpg',
            focus: 'Komorbid Kardiovaskular, Hipertensi & Neuropati',
            badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
            baseGlucose: 178,
            baseHbA1c: '6.9%',
            challenge: 'Riwayat keluarga diabetes & jantung, tekanan darah 145/92 mmHg, serta sensasi kebas kesemutan tebal di ujung jari kaki saat bangun pagi.',
            goal: 'Mengontrol natrium garam, mencegah plak aterosklerosis pembuluh koroner, dan meredakan beban kerja jantung.',
            icon: 'cardiology',
        },
        {
            name: 'Dimas Aryo',
            age: '29 Tahun',
            role: 'Software Engineer',
            avatar: '/image/doctor_consultation.jpg',
            focus: 'Gaya Hidup Sedenter & Sugar Crash Pasca-Makan',
            badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
            baseGlucose: 154,
            baseHbA1c: '6.3%',
            challenge: 'Bekerja 10–12 jam duduk statis, sering mengalami kantuk berat 30 menit setelah makan siang (postprandial somnolence), dan gemetar jika belum minum manis.',
            goal: 'Aktivasi transporter GLUT4 melalui jeda gerak teratur dan menghentikan ketergantungan pada minuman boba/kopi berpemanis cair.',
            icon: 'laptop_mac',
        },
    ];

    const gameSteps = [
        {
            step: '01',
            icon: 'person_search',
            title: 'Pilih Kasus Klinis Pasien',
            desc: 'Pilih salah satu dari 3 profil pasien dengan latar belakang biologis berbeda: siklus hormonal wanita, komorbid kardiometabolik usia 50+, atau sindrom sedenter pekerja muda.',
        },
        {
            step: '02',
            icon: 'schedule',
            title: 'Telusuri 6 Babak Waktu (24 Jam)',
            desc: 'Jalani 6 fase waktu krusial mulai dari sarapan pagi (07:30), stres kerja (10:30), kantin siang (12:45), titik nadir sore (15:30), santap malam (19:00), hingga tidur restoratif (22:30).',
        },
        {
            step: '03',
            icon: 'nutrition',
            title: 'Gunakan Alat "Cek Gizi" Klinis',
            desc: 'Sebelum memilih menu makanan atau aktivitas, buka fitur Inspektur Gizi di pojok atas untuk melihat gram gula, natrium, serat larut, dan beban glikemik secara transparan.',
        },
        {
            step: '04',
            icon: 'verified',
            title: 'Amati Kurva & Raih Remisi',
            desc: 'Setiap keputusan berdampak langsung pada indikator GDS dan HbA1c. Jaga glukosa dalam batas sehat (70–140 mg/dL) untuk meraih Sertifikat Remisi Kemenkes Grade A.',
        },
    ];

    const clinicalMetrics = [
        {
            icon: 'monitoring',
            name: 'Glukosa Darah Sewaktu (GDS)',
            target: 'Target: 70 – 140 mg/dL',
            desc: 'Mengukur konsentrasi gula bebas di aliran darah secara seketika. Lonjakan di atas 140 mg/dL setelah makan (postprandial) memicu stres pada sel beta pankreas dan kelelahan seluler.',
            badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        },
        {
            icon: 'speed',
            name: 'Indeks & Beban Glikemik (GI & GL)',
            target: 'Target: Makanan Rendah GI (<55)',
            desc: 'Indeks Glikemik mengukur seberapa cepat karbohidrat dipecah menjadi glukosa darah. Makanan tinggi GI memicu lonjakan insulin mendadak yang diikuti hipoglikemia reaktif (sugar crash).',
            badge: 'bg-amber-50 text-amber-800 border-amber-200',
        },
        {
            icon: 'shield_with_heart',
            name: 'Hemoglobin Terglikasi (HbA1c)',
            target: 'Target Remisi: <5.7% (Ideal) / <6.5%',
            desc: 'Mencerminkan rata-rata kadar gula darah selama 90 hari terakhir melalui ikatan molekul glukosa pada sel darah merah. Parameter utama remisi pra-diabetes & diabetes melitus tipe 2.',
            badge: 'bg-blue-50 text-blue-800 border-blue-200',
        },
    ];

    const foodCards = [
        {
            icon: 'eco',
            name: 'Brokoli & Serat Hijau',
            type: 'Nutrisi Super',
            impact: '-15 mg/dL Glukosa',
            desc: 'Memperlambat absorbsi karbohidrat, meratakan kurva lonjakan glukosa setelah makan.',
            badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        },
        {
            icon: 'water_drop',
            name: 'Air Mineral & Elektrolit',
            type: 'Hidrasi Sel',
            impact: 'Stabilkan Ginjal & Hemokonsentrasi',
            desc: 'Membantu ginjal menyaring kelebihan gula dalam darah secara alami.',
            badge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        },
        {
            icon: 'bakery_dining',
            name: 'Donat Tepung Halus',
            type: 'Jebakan Karbo Cepat',
            impact: '+28 mg/dL Lonjakan',
            desc: 'Tinggi gula sukrosa dan tepung olahan, memicu lonjakan insulin mendadak lalu hipoglikemia reaktif.',
            badge: 'bg-rose-100 text-rose-800 border-rose-200',
        },
        {
            icon: 'local_cafe',
            name: 'Boba Gula Aren Pekat',
            type: 'Bom Fruktosa Cair',
            impact: '+35 mg/dL Lonjakan',
            desc: 'Mengandung hingga 40-50 gram gula cair per gelas tanpa serat pelindung sama sekali.',
            badge: 'bg-amber-100 text-amber-800 border-amber-200',
        },
    ];

    const content = (
        <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12">
            {/* Hero Header */}
            <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto pt-2 sm:pt-4">
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#122824] leading-tight">
                    Kuasai Respon Glukosa &amp; Keputusan Gizi Klinis 24 Jam
                </h1>

                <p className="text-xs sm:text-sm text-[#4d665f] leading-relaxed max-w-2xl mx-auto">
                    Masuki peran pendamping kesehatan preventif. Tentukan pilihan diet, aktivitas, dan hidrasi bersama pasien Puskesmas dalam perjalanan 24 jam interaktif berbasis standar PERKENI 2026.
                </p>

                {/* Quick Info Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-surface-container text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">groups</span>
                        3 Profil Pasien
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-surface-container text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">timer</span>
                        6 Fase Babak 24 Jam
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-surface-container text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">biotech</span>
                        Inspektur Gizi Interaktif
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-low border border-surface-container text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-700">workspace_premium</span>
                        Evaluasi Remisi Klinis
                    </span>
                </div>
            </div>

            {/* Primary Feature Stage: 24-Hour Clinical Story Game */}
            <section className="space-y-3">
                <MetabolicStoryGame />
            </section>

            {/* Section 1: Alur & Mekanisme Permainan */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-surface-container-high shadow-xs space-y-6">
                <div className="border-b border-surface-container pb-4">
                    <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-1">
                        <span className="material-symbols-outlined text-[18px]">alt_route</span>
                        <span>Mekanisme &amp; Alur Simulasi</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-2xl text-on-surface">
                        Bagaimana Simulasi Kasus 24 Jam Bekerja?
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                        Alur 4 tahap yang menghubungkan keputusan gaya hidup sehari-hari dengan respon kurva biologis tubuh.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                    {gameSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-3 flex flex-col justify-between hover:border-primary/40 transition-all"
                        >
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-primary border border-emerald-200 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">{step.icon}</span>
                                    </div>
                                    <span className="font-mono text-xs font-bold text-on-surface-variant/70">
                                        LANGKAH {step.step}
                                    </span>
                                </div>
                                <h4 className="font-bold text-xs sm:text-sm text-on-surface leading-snug">
                                    {step.title}
                                </h4>
                                <p className="text-[11px] text-[#52645f] leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 2: Studi Kasus 3 Profil Pasien */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-surface-container-high shadow-xs space-y-6">
                <div className="border-b border-surface-container pb-4">
                    <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-1">
                        <span className="material-symbols-outlined text-[18px]">badge</span>
                        <span>Profil Triase Pasien Puskesmas</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-2xl text-on-surface">
                        3 Studi Kasus Pasien yang Dapat Anda Dampingi
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                        Setiap pasien memiliki latar belakang hormonal, risiko komorbiditas, dan tantangan gaya hidup yang unik.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                    {patientPersonas.map((char, idx) => (
                        <div
                            key={idx}
                            className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col justify-between space-y-3.5 hover:border-primary/40 transition-all"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={char.avatar}
                                        alt={char.name}
                                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h4 className="font-heading font-bold text-sm sm:text-base text-on-surface truncate">
                                            {char.name}
                                        </h4>
                                        <p className="text-[10px] text-on-surface-variant font-mono">
                                            {char.age} • {char.role}
                                        </p>
                                    </div>
                                </div>

                                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono border ${char.badgeColor}`}>
                                    {char.focus}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-center font-mono py-1">
                                    <div className="p-2 rounded-xl bg-white border border-surface-container">
                                        <span className="text-[9px] text-on-surface-variant uppercase block">GDS Awal</span>
                                        <b className="text-rose-600 text-xs sm:text-sm">{char.baseGlucose} mg/dL</b>
                                    </div>
                                    <div className="p-2 rounded-xl bg-white border border-surface-container">
                                        <span className="text-[9px] text-on-surface-variant uppercase block">HbA1c Lab</span>
                                        <b className="text-amber-700 text-xs sm:text-sm">{char.baseHbA1c}</b>
                                    </div>
                                </div>

                                <div className="space-y-1.5 text-[11px] leading-relaxed">
                                    <p className="text-[#3b4e48]">
                                        <strong className="text-on-surface font-semibold block">Keluhan Klinis:</strong>
                                        {char.challenge}
                                    </p>
                                    <p className="text-[#3b4e48] pt-1">
                                        <strong className="text-primary font-semibold block">Target Terapi:</strong>
                                        {char.goal}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 3: Indikator & Parameter Klinis yang Dipantau */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-surface-container-high shadow-xs space-y-6">
                <div className="border-b border-surface-container pb-4">
                    <div className="flex items-center gap-2 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-1">
                        <span className="material-symbols-outlined text-[18px]">vital_signs</span>
                        <span>Panduan Biomarker Medis</span>
                    </div>
                    <h3 className="font-serif font-bold text-lg sm:text-2xl text-on-surface">
                        Biomarker Vital yang Anda Kendalikan dalam Permainan
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                        Memahami angka di balik setiap pilihan makanan dan dampaknya terhadap metabolisme jangka panjang.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
                    {clinicalMetrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-3 flex flex-col justify-between"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-primary border border-emerald-200 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[18px]">{metric.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-xs sm:text-sm text-on-surface leading-tight">
                                        {metric.name}
                                    </h4>
                                </div>
                                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border inline-block ${metric.badge}`}>
                                    {metric.target}
                                </span>
                                <p className="text-[11px] text-[#52645f] leading-relaxed pt-1">
                                    {metric.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 4: Glycemic Impact & Food Education Guide */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-surface-container-high shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container pb-4 gap-2">
                    <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-[22px] sm:text-[24px]">biotech</span>
                        <div>
                            <h3 className="font-serif font-bold text-base sm:text-lg text-on-surface">
                                Kamus Glikemik &amp; Dampak Metabolik Klinis
                            </h3>
                            <p className="text-xs text-on-surface-variant">
                                Panduan rujukan respon glukosa darah dan beban insulin berdasarkan konsensus PERKENI 2026.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            PERKENI 2026
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {foodCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container space-y-2.5 hover:border-primary/30 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">{card.icon}</span>
                                        <span className="text-[10px] font-mono uppercase text-on-surface-variant font-bold truncate">{card.type}</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-xs sm:text-sm text-on-surface">{card.name}</h4>
                                <p className="text-[11px] text-[#52645f] leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                            <div className="pt-2 border-t border-surface-container/60">
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border inline-block ${card.badge}`}>
                                    {card.impact}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Banner to Real Life Application */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#edf5f0] border border-[#cfe1d7] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-primary">
                            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                            <strong className="text-xs sm:text-sm font-bold">
                                Ingin Pindai Makanan Nyata Anda Menggunakan Kamera?
                            </strong>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#4d665f] max-w-2xl">
                            Arahkan kamera ke label kemasan makanan untuk deteksi gula, natrium, dan estimasi beban glikemik otomatis dalam waktu kurang dari 0.4 detik.
                        </p>
                    </div>
                    <Link
                        href="/member/scanner"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold transition-all shrink-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[17px]">center_focus_strong</span>
                        <span>Buka Scanner Kamera</span>
                    </Link>
                </div>
            </div>

            {/* Section 5: Tips Sukses Menuntaskan Simulasi */}
            <div className="bg-[#122824] text-white rounded-3xl p-5 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
                    <span>Petunjuk Praktis Simulasi</span>
                </div>
                <h3 className="font-serif text-lg sm:text-2xl font-normal leading-tight">
                    3 Tips Mendapatkan Evaluasi Remisi Klinis Grade A
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-emerald-300 font-bold block text-xs">
                            1. Selalu Cek Gizi Sebelum Memilih
                        </strong>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                            Tekan tombol <span className="text-emerald-300 font-mono">Cek Gizi</span> di pojok kanan atas untuk memeriksa kandungan gula, natrium, dan serat secara akurat sebelum membuat keputusan.
                        </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-emerald-300 font-bold block text-xs">
                            2. Dampingi Karbohidrat dengan Serat
                        </strong>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                            Serat sayuran hijau membentuk jaring pelindung di usus halus yang memperlambat penyerapan glukosa, mencegah lonjakan tajam dan rasa kantuk berat.
                        </p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <strong className="text-emerald-300 font-bold block text-xs">
                            3. Perhatikan Pola Hidrasi &amp; Stres
                        </strong>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                            Kurang minum saat stres kerja meningkatkan hemokonsentrasi darah. Air mineral membantu filtrasi ginjal alami untuk mengeluarkan kelebihan gula darah.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    if (isAuthenticated) {
        return (
            <AppLayout title="Simulasi Kasus Metabolik 24 Jam" activeTab="arcade">
                <Head title="Simulasi Kasus Metabolik 24 Jam & Edukasi Glikemik | AEVYRA" />
                {content}
            </AppLayout>
        );
    }

    return (
        <MarketingLayout>
            <Head title="Simulasi Kasus Metabolik 24 Jam & Edukasi Glikemik | AEVYRA" />
            <div className="py-6 sm:py-10 px-3 sm:px-6">
                {content}
            </div>
        </MarketingLayout>
    );
}

