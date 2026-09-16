import React, { useState } from 'react';

export default function InstrukturAdminSection() {
    const [viewMode, setViewMode] = useState('instruktur'); // 'instruktur' | 'admin'

    const instructorReports = [
        {
            member: 'Ahmad F. (42 th)',
            tier: 'Gold',
            hba1c: '6.4% [↓ -0.6%]',
            scanActivity: '18 Scan / Minggu',
            note: 'Kepatuhan porsi karbohidrat membaik, target defisit gula tercapai.',
        },
        {
            member: 'Siti R. (38 th)',
            tier: 'Platinum',
            hba1c: '7.1% [Stabil]',
            scanActivity: '24 Scan / Minggu',
            note: 'Terdeteksi camilan tinggi natrium; saran modifikasi menu makan malam.',
        },
    ];

    const adminInsights = [
        { label: 'Total Pengguna PWA', val: '4.850+', sub: 'Member aktif se-Indonesia' },
        { label: 'Rata-rata Scan Open Cam', val: '12.4k / bln', sub: 'Pangan, minuman & obat' },
        { label: 'Keberhasilan Challenge', val: '89.2%', sub: 'Penyelesaian program 90 hari' },
        { label: 'Tingkat Kepuasan Instruktur', val: '4.9 / 5.0', sub: 'Efisiensi lembar laporan' },
    ];

    return (
        <section className="w-full py-space-xl px-gutter lg:px-margin bg-surface-container-low" id="reports">
            <div className="max-w-7xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
                    <div>
                        <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                            [ FITUR 09 // LAPORAN OBJEKTIF &amp; INSIGHT ANALITIK ]
                        </span>
                        <h2 className="font-headline-lg text-3xl font-normal text-primary">
                            Dashboard Laporan untuk Instruktur &amp; Admin
                        </h2>
                    </div>
                    {/* Switcher Tab */}
                    <div className="flex p-1 bg-surface rounded-xl border border-surface-container w-fit">
                        <button
                            type="button"
                            onClick={() => setViewMode('instruktur')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                viewMode === 'instruktur'
                                    ? 'bg-primary text-on-primary shadow-xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            Laporan Instruktur
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('admin')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                viewMode === 'admin'
                                    ? 'bg-primary text-on-primary shadow-xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            Laporan Admin
                        </button>
                    </div>
                </div>

                {/* Dynamic View based on Switcher */}
                {viewMode === 'instruktur' ? (
                    <div className="p-space-md bg-surface rounded-2xl border border-surface-container space-y-space-sm shadow-sm animate-in fade-in duration-200">
                        <div className="flex items-center justify-between border-b border-surface-container pb-2">
                            <span className="font-headline-sm text-sm font-semibold text-primary">
                                Data Objektif Bimbingan Member (Bukan Tebak-Tebakan)
                            </span>
                            <span className="font-label-mono text-[10px] text-on-surface-variant">
                                2 Member Perlu Evaluasi Hari Ini
                            </span>
                        </div>

                        <div className="space-y-2">
                            {instructorReports.map((r, i) => (
                                <div
                                    key={i}
                                    className="p-3 bg-surface-container-low rounded-xl border border-surface-container flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                                >
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-on-surface">{r.member}</span>
                                            <span className="font-label-mono text-[10px] px-2 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-medium">
                                                Tier {r.tier}
                                            </span>
                                            <span className="font-data-sm text-[11px] font-bold text-primary">
                                                HbA1c: {r.hba1c}
                                            </span>
                                        </div>
                                        <p className="text-on-surface-variant text-[11px]">
                                            📊 {r.note}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 font-label-mono text-[11px]">
                                        <span className="px-2 py-1 bg-surface rounded text-primary font-medium border border-surface-container">
                                            {r.scanActivity}
                                        </span>
                                        <button
                                            type="button"
                                            className="px-3 py-1 bg-primary text-on-primary rounded-lg text-xs hover:bg-primary-container transition-colors"
                                        >
                                            Kirim Bimbingan
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm animate-in fade-in duration-200">
                        {adminInsights.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-space-md bg-surface rounded-2xl border border-surface-container space-y-1 shadow-sm"
                            >
                                <span className="font-label-mono text-[11px] text-on-surface-variant uppercase block">
                                    {item.label}
                                </span>
                                <span className="font-data-lg text-2xl font-bold text-primary block">
                                    {item.val}
                                </span>
                                <span className="text-body-sm text-xs text-on-surface-variant">
                                    {item.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

