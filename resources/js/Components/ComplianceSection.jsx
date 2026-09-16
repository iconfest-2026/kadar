import React from 'react';

export default function ComplianceSection() {
    const compliances = [
        {
            icon: 'verified_user',
            title: 'Kemenkes SatuSehat',
            code: 'HL7 FHIR Rev 4.0',
            desc: 'Sinkronisasi profil biomarker langsung ke SatuSehat ID warga negara.',
        },
        {
            icon: 'shield',
            title: 'ISO/IEC 27001:2022',
            code: 'Keamanan Data ISMS',
            desc: 'Proteksi enkripsi end-to-end AES-256 bit dan transmisi aman TLS 1.3.',
        },
        {
            icon: 'local_hospital',
            title: 'Akreditasi KARS Paripurna',
            code: 'Standar Keselamatan',
            desc: 'Protokol supervisi medis memenuhi standar keselamatan pasien RS nasional.',
        },
        {
            icon: 'policy',
            title: 'UU PDP No. 27/2022',
            code: 'Privasi Data Pribadi',
            desc: 'Kendali penuh hak hapus, unduh, atau cabut izin akses riwayat medis.',
        },
        {
            icon: 'gavel',
            title: 'Permenkes No. 24/2022',
            code: 'Rekam Medis Elektronik',
            desc: 'Format rekam medis elektronik resmi diakui faskes rujukan sekunder.',
        },
        {
            icon: 'app_registration',
            title: 'PSE Kominfo RI',
            code: 'Reg: 008921.01/DJAI.PSE',
            desc: 'Penyelenggara Sistem Elektronik resmi sektor strategis kesehatan.',
        },
    ];

    return (
        <section className="w-full bg-surface py-space-xl px-gutter lg:px-margin" id="satusehat-integration">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ KEPATUHAN &amp; LEGALITAS ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Standar Regulasi &amp; Keamanan Data
                        </h2>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Terverifikasi resmi otoritas kesehatan dan hukum Republik Indonesia.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm">
                    {compliances.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-space-md bg-surface-container-low rounded-2xl border border-surface-container hover:shadow-sm transition-shadow flex items-start gap-space-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary shrink-0 border border-surface-container">
                                <span className="material-symbols-outlined text-[22px]">
                                    {item.icon}
                                </span>
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
                                        {item.title}
                                    </h4>
                                </div>
                                <span className="font-label-mono text-[10px] text-primary uppercase font-medium block">
                                    {item.code}
                                </span>
                                <p className="text-body-sm text-xs text-on-surface-variant pt-0.5 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
