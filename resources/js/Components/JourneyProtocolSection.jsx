import React from 'react';

export default function JourneyProtocolSection() {
    const steps = [
        {
            num: '01',
            title: 'Skrining FINDRISC',
            action: 'Isi kuesioner mandiri 3 menit & upload data lab awal (GDP/HbA1c).',
            time: 'Hari ke-1',
        },
        {
            num: '02',
            title: 'Pemadanan Dokter',
            action: 'Sistem memasangkan Anda dengan DPJP Spesialis Penyakit Dalam / Gizi.',
            time: 'Hari ke 2–3',
        },
        {
            num: '03',
            title: 'Scan & Log Harian',
            action: 'Pindai makanan kemasan, pantau kurva gula, & ikuti evaluasi mingguan.',
            time: 'Hari ke 4–89',
        },
        {
            num: '04',
            title: 'Evaluasi & Sertifikat',
            action: 'Tes lab ulang 90 hari & terima Resume Medis Remisi resmi SatuSehat.',
            time: 'Hari ke-90',
            highlight: true,
        },
    ];

    return (
        <section className="w-full py-space-xl px-gutter lg:px-margin bg-surface-container-low" id="clinical-methodology">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ PROSES 4 TAHAP SEDERHANA ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Alur 90 Hari Menuju Remisi Metabolik
                        </h2>
                    </div>
                    <span className="font-label-mono text-xs text-on-surface-variant font-medium">
                        DURASI LENGKAP: 90 HARI
                    </span>
                </div>

                {/* 4-Step Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`p-space-md rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between space-y-space-sm ${
                                step.highlight
                                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                                    : 'bg-surface text-on-surface border-surface-container'
                            }`}
                        >
                            <div className="space-y-space-xs">
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-label-mono text-xs font-bold ${
                                            step.highlight
                                                ? 'bg-primary-container text-on-primary'
                                                : 'bg-surface-container text-primary'
                                        }`}
                                    >
                                        {step.num}
                                    </span>
                                    <span
                                        className={`font-label-mono text-[11px] font-medium ${
                                            step.highlight ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                                        }`}
                                    >
                                        {step.time}
                                    </span>
                                </div>

                                <h3 className="font-headline-sm text-base font-semibold">
                                    {step.title}
                                </h3>

                                <p
                                    className={`text-body-sm text-xs leading-relaxed ${
                                        step.highlight ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                                    }`}
                                >
                                    {step.action}
                                </p>
                            </div>

                            <div className={`pt-2 border-t text-[11px] font-label-mono flex items-center gap-1 ${
                                step.highlight ? 'border-primary-container text-primary-fixed' : 'border-surface-container-low text-primary'
                            }`}>
                                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                <span>Langkah {idx + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
