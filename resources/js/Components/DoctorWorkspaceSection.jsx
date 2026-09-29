import React, { useState } from 'react';

export default function DoctorWorkspaceSection() {
    const [activeRow, setActiveRow] = useState('#KDR-7029');

    const patients = [
        {
            rm: '#KDR-7029',
            name: 'Tn. S. Hartono (48 th)',
            biomarker: 'GDP: 194 mg/dL [↑]',
            status: 'KRITIS',
            statusBadge: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
            action: 'Prioritas tinjau terapi & dosis insulin',
        },
        {
            rm: '#KDR-6811',
            name: 'Ny. D. Kartika (42 th)',
            biomarker: 'GDP: 104 mg/dL [√]',
            status: 'STABIL',
            statusBadge: 'bg-primary-fixed text-on-primary-fixed-variant',
            action: 'Target remisi 90 hari tercapai on-track',
        },
        {
            rm: '#KDR-6902',
            name: 'Tn. B. Wicaksono (55 th)',
            biomarker: 'TD: 155/95 mmHg [↑]',
            status: 'WASPADA',
            statusBadge: 'bg-secondary-fixed text-on-secondary-fixed-variant',
            action: 'Evaluasi asupan natrium & jadwal telekonsultasi',
        },
    ];

    return (
        <section className="w-full py-space-xl px-gutter lg:px-margin bg-surface" id="role-ecosystem">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ DASHBOARD DOKTER SPESIALIS (DPJP) ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Monitoring Pasien Tanpa Beban Manual
                        </h2>
                    </div>
                    <p className="text-body-sm text-on-surface-variant max-w-sm">
                        Triase otomatis mengutamakan pasien yang butuh intervensi vaskular cepat.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
                    {/* Left: Interactive Triage Queue Table */}
                    <div className="lg:col-span-8 p-space-md bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm space-y-space-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="font-label-mono text-xs text-primary font-semibold uppercase">
                                    ANTREAN TRIASE PASIEN REAL-TIME
                                </span>
                            </div>
                            <span className="font-label-mono text-[10px] text-on-surface-variant">
                                TERINTEGRASI SATUSEHAT
                            </span>
                        </div>

                        {/* Interactive rows */}
                        <div className="space-y-1.5">
                            {patients.map((p) => {
                                const isSelected = activeRow === p.rm;
                                return (
                                    <div
                                        key={p.rm}
                                        onClick={() => setActiveRow(p.rm)}
                                        className={`p-space-sm rounded-xl cursor-pointer transition-all duration-200 border ${
                                            isSelected
                                                ? 'bg-surface-container-low border-primary ring-1 ring-primary'
                                                : 'bg-surface border-surface-container-low hover:bg-surface-container-low/60'
                                        }`}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-space-sm">
                                                <span className="font-label-mono text-xs text-primary font-bold">
                                                    {p.rm}
                                                </span>
                                                <span className="text-body-sm font-medium text-on-surface">
                                                    {p.name}
                                                </span>
                                                <span className="font-data-sm text-xs font-semibold text-primary">
                                                    {p.biomarker}
                                                </span>
                                            </div>
                                            <span className={`font-label-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.statusBadge}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                        {isSelected && (
                                            <div className="mt-2 pt-2 border-t border-surface-container text-xs text-on-surface-variant flex items-center justify-between">
                                                <span className="flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[15px] text-primary">assignment</span>
                                                    <span>Catatan Rekomendasi: {p.action}</span>
                                                </span>
                                                <span className="text-primary font-medium hover:underline text-[11px] inline-flex items-center gap-0.5">
                                                    <span>Buka Lembar RME</span>
                                                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-on-surface-variant border-t border-surface-container">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-primary text-[16px]">check</span>
                                Rekam Medis Standar Permenkes 24/2022
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-primary text-[16px]">file_download</span>
                                Ekspor PDF Sekali Klik
                            </span>
                        </div>
                    </div>

                    {/* Right: 2 Quick Highlight Cards */}
                    <div className="lg:col-span-4 space-y-space-sm">
                        <div className="p-space-md bg-surface-container rounded-2xl border border-surface-container-high space-y-1">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <span className="material-symbols-outlined text-[20px]">chat_bubble_outline</span>
                                <h4 className="text-sm font-headline-sm">Chat &amp; Floating Telemetry</h4>
                            </div>
                            <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                Grafik glukosa 7 hari & foto makanan pasien tersaji langsung di jendela konsultasi tanpa pindah tab.
                            </p>
                        </div>

                        <div className="p-space-md bg-surface-container rounded-2xl border border-surface-container-high space-y-1">
                            <div className="flex items-center gap-2 text-primary font-semibold">
                                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                                <h4 className="text-sm font-headline-sm">Kalender &amp; Rujukan RME</h4>
                            </div>
                            <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                Atur kuota telekonsultasi, jadwal cek HbA1c 90 hari, dan terbitkan rujukan faskes bila ditemukan risiko tinggi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
