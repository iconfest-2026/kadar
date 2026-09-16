import React from 'react';

export default function AdminGovernanceSection() {
    const pillars = [
        {
            icon: 'analytics',
            title: 'Analisis Kohort Nasional',
            desc: 'Pantau makro angka remisi pra-diabetes & tren kepatuhan per wilayah.',
            tag: 'EPIDEMIOLOGI',
        },
        {
            icon: 'admin_panel_settings',
            title: 'Verifikasi SIP/STR Dokter',
            desc: 'Validasi silang nomor izin praktik dengan Konsil Kedokteran Indonesia (KKI).',
            tag: 'KREDENSIALISASI',
        },
        {
            icon: 'spellcheck',
            title: 'Filter Otomatis Hoaks & Herbal',
            desc: 'Kamus medis menyaring klaim obat tanpa izin & suplemen berbahaya.',
            tag: 'ZERO HOAKS',
        },
        {
            icon: 'lock_clock',
            title: 'Audit Trail Kriptografis',
            desc: 'Log akses rekam medis immutable sesuai UU Perlindungan Data Pribadi.',
            tag: 'ISO 27001',
        },
    ];

    return (
        <section className="w-full bg-surface-container-low py-space-xl px-gutter lg:px-margin">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ TATA KELOLA &amp; AUDIT ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Integritas Data &amp; Kepatuhan Institusional
                        </h2>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Dirancang untuk pengawasan rumah sakit, jejaring faskes, dan Dinas Kesehatan.
                    </p>
                </div>

                {/* 4-Column Governance Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                    {pillars.map((item, index) => (
                        <div
                            key={index}
                            className="p-space-md bg-surface rounded-2xl border border-surface-container hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-space-xs"
                        >
                            <div className="space-y-space-xs">
                                <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-[20px]">
                                        {item.icon}
                                    </span>
                                </div>
                                <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
                                    {item.title}
                                </h4>
                                <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <span className="font-label-mono text-[10px] text-primary uppercase font-semibold pt-2 border-t border-surface-container-low block">
                                {item.tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
