import React from 'react';

export default function MemberFeaturesSection() {
    const features = [
        {
            num: '01',
            icon: 'photo_camera',
            title: 'Scanner Open Cam',
            subtitle: 'Makanan, Minuman & Obat',
            urgency: 'Pahami kandungan gizi dan keamanan obat instan tanpa perlu riset manual.',
            tag: 'Literasi Gizi Instan',
        },
        {
            num: '02',
            icon: 'forum',
            title: 'Konsultasi Chat AI & Instruktur',
            subtitle: 'Tanya Jawab Cepat',
            urgency: 'Konsultasi praktis tanpa antre di RS untuk pertanyaan ringan sehari-hari.',
            tag: 'Akses 24/7',
        },
        {
            num: '03',
            icon: 'monitoring',
            title: 'Riwayat & Tracker Pribadi',
            subtitle: 'Glukosa, Tensi & Asupan',
            urgency: 'Pencatatan berkelanjutan untuk mendeteksi penurunan kondisi lebih dini.',
            tag: 'Deteksi Dini',
        },
        {
            num: '04',
            icon: 'person_pin',
            title: 'Rekomendasi Profil Personal',
            subtitle: 'Alergi, Diabetes & Target',
            urgency: 'Saran nutrisi disesuaikan dengan kondisi spesifik Anda, bukan generik.',
            tag: 'Aman & Presisi',
        },
        {
            num: '05',
            icon: 'flag',
            title: 'Program Challenge Kesehatan',
            subtitle: 'Target 14–90 Hari',
            urgency: 'Target terstruktur terjadwal untuk menjaga konsistensi pola hidup sehat.',
            tag: 'Perubahan Perilaku',
        },
        {
            num: '06',
            icon: 'event_available',
            title: 'Booking Konsultasi Terjadwal',
            subtitle: 'Jadwal Instruktur Ahli',
            urgency: 'Kepastian waktu dan sesi bimbingan mendalam bersama tenaga ahli sungguhan.',
            tag: 'Tenaga Ahli Nyata',
        },
        {
            num: '07',
            icon: 'groups',
            title: 'Komunitas & Forum Diskusi',
            subtitle: 'Dukungan Antar Member',
            urgency: 'Dukungan sosial positif agar Anda termotivasi dan tidak merasa berjuang sendiri.',
            tag: 'Dukungan Sosial',
        },
        {
            num: '08',
            icon: 'military_tech',
            title: 'Badge & Gamifikasi',
            subtitle: 'Reward & Level Capaian',
            urgency: 'Apresiasi nyata atas konsistensi hidup sehat agar Anda terus termotivasi.',
            tag: 'Tingkatkan Retensi',
        },
    ];

    return (
        <section className="w-full bg-surface-container-low py-space-xl px-gutter lg:px-margin" id="features">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ FITUR &amp; SOLUSI PWA KADAR ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            8 Fitur Unggulan untuk Member
                        </h2>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Dirancang langsung menjawab kebutuhan pemantauan mandiri dan bimbingan terarah.
                    </p>
                </div>

                {/* 8 Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-space-md bg-surface rounded-2xl border border-surface-container hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-space-xs"
                        >
                            <div className="space-y-space-xs">
                                <div className="flex items-center justify-between">
                                    <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-[20px]">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="font-label-mono text-[10px] text-on-surface-variant font-bold">
                                        #{item.num}
                                    </span>
                                </div>
                                <h3 className="font-headline-sm text-base font-semibold text-on-surface">
                                    {item.title}
                                </h3>
                                <span className="font-label-mono text-[10px] text-primary block">
                                    {item.subtitle}
                                </span>
                                <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed pt-1">
                                    {item.urgency}
                                </p>
                            </div>

                            <div className="pt-2 border-t border-surface-container-low flex items-center gap-1.5 font-label-mono text-[10px] text-primary font-medium">
                                <span className="material-symbols-outlined text-[14px]">verified</span>
                                <span>{item.tag}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
