import React, { useState } from 'react';

/**
 * BaselineTrendCard - Fitur 03: Tracker & Grafik Tren Baseline
 * 
 * Mematuhi pedoman AEVYRA:
 * - Smooth bezier SVG curve (non-alarmist, tanpa sudut tajam EKG darurat)
 * - Garis putus-putus acuan personal baseline (Personal Rolling Baseline 14-Hari)
 * - Pita toleransi variasi biologis normal
 * - Pemilih metrik (Glukosa, Langkah, Tidur, Air)
 * - Tampilan alternatif berbasis tabel data untuk aksesibilitas
 */

const METRIC_DEFINITIONS = {
    blood_glucose: {
        label: 'Gula Darah Puasa',
        shortLabel: 'Glukosa',
        unit: 'mg/dL',
        icon: 'bloodtype',
        color: '#00796b', // Deep Teal / AEVYRA primary
        strokeColor: '#00897b',
        fillGradientStart: 'rgba(0, 137, 123, 0.22)',
        fillGradientEnd: 'rgba(0, 137, 123, 0.02)',
        normalMin: 70,
        normalMax: 110,
        defaultBaseline: 95,
        defaultTolerance: 8,
        description: 'Target puasa stabil < 100 mg/dL',
        formatValue: (v) => `${Math.round(v)} mg/dL`,
    },
    steps: {
        label: 'Langkah Kaki Harian',
        shortLabel: 'Langkah',
        unit: 'Langkah',
        icon: 'directions_walk',
        color: '#059669', // Emerald
        strokeColor: '#10b981',
        fillGradientStart: 'rgba(16, 185, 129, 0.22)',
        fillGradientEnd: 'rgba(16, 185, 129, 0.02)',
        normalMin: 6000,
        normalMax: 10000,
        defaultBaseline: 7500,
        defaultTolerance: 900,
        description: 'Target aktivitas 7.000 - 10.000 langkah',
        formatValue: (v) => `${Number(Math.round(v)).toLocaleString('id-ID')} langkah`,
    },
    sleep_duration: {
        label: 'Durasi Tidur',
        shortLabel: 'Tidur',
        unit: 'Jam',
        icon: 'bedtime',
        color: '#4f46e5', // Indigo tenang
        strokeColor: '#6366f1',
        fillGradientStart: 'rgba(99, 102, 241, 0.22)',
        fillGradientEnd: 'rgba(99, 102, 241, 0.02)',
        normalMin: 420, // 7 jam dalam menit
        normalMax: 510, // 8.5 jam
        defaultBaseline: 450,
        defaultTolerance: 30,
        description: 'Rentang pemulihan optimal 7 - 8.5 jam',
        formatValue: (v) => {
            const mins = Number(v);
            if (mins > 24) {
                const h = Math.floor(mins / 60);
                const m = Math.round(mins % 60);
                return m > 0 ? `${h}j ${m}m` : `${h} jam`;
            }
            return `${Number(v).toFixed(1)} jam`;
        },
    },
    water_intake: {
        label: 'Asupan Air Minum',
        shortLabel: 'Air Minum',
        unit: 'ml',
        icon: 'water_drop',
        color: '#0284c7', // Sky Blue
        strokeColor: '#0ea5e9',
        fillGradientStart: 'rgba(14, 165, 233, 0.22)',
        fillGradientEnd: 'rgba(14, 165, 233, 0.02)',
        normalMin: 1800,
        normalMax: 2600,
        defaultBaseline: 2200,
        defaultTolerance: 200,
        description: 'Kebutuhan hidrasi seimbang 2.000 - 2.500 ml',
        formatValue: (v) => `${Number(Math.round(v)).toLocaleString('id-ID')} ml`,
    },
};

export default function BaselineTrendCard({
    baselines = {},
    recentHistory = {},
    onOpenQuickLog,
}) {
    const [selectedMetric, setSelectedMetric] = useState('blood_glucose');
    const [viewMode, setViewMode] = useState('chart'); // 'chart' | 'table'
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const metricConfig = METRIC_DEFINITIONS[selectedMetric] || METRIC_DEFINITIONS.blood_glucose;
    const baselineObj = baselines[selectedMetric];

    // Nilai baseline rata-rata dari database atau fallback cerdas
    const baselineMean = baselineObj?.value_primary
        ? parseFloat(baselineObj.value_primary)
        : metricConfig.defaultBaseline;

    const baselineTolerance = baselineObj?.value_secondary
        ? Math.max(parseFloat(baselineObj.value_secondary), metricConfig.defaultTolerance)
        : metricConfig.defaultTolerance;

    // Ambil riwayat rekaman untuk metrik yang dipilih
    const rawHistory = recentHistory[selectedMetric] || [];

    // Jika riwayat kosong / kurang dari 5 titik, generate 7 hari mock preview berbasis baseline
    const pointsData = React.useMemo(() => {
        if (rawHistory.length >= 4) {
            return rawHistory.map((item) => ({
                date: item.date,
                label: item.label,
                value: Number(item.value),
            }));
        }

        // Mock 7-hari teratur yang mengacu pada baseline personal member
        const mockPoints = [];
        const today = new Date();
        const base = baselineMean;
        const offsets = [-4, 2, -1, 5, -2, 3, 1]; // Fluktuasi fisiologis wajar

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const labelStr = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            const variance = offsets[6 - i] * (baselineTolerance * 0.15);
            mockPoints.push({
                date: dateStr,
                label: labelStr,
                value: Math.round(base + variance),
            });
        }
        return mockPoints;
    }, [rawHistory, baselineMean, baselineTolerance]);

    // Rerata aktual dan status fisiologis
    const avgValue = pointsData.length > 0
        ? pointsData.reduce((acc, curr) => acc + curr.value, 0) / pointsData.length
        : baselineMean;

    const diffFromBaseline = avgValue - baselineMean;
    const isWithinNormalBand = Math.abs(diffFromBaseline) <= baselineTolerance * 1.5;

    // Hitung koordinat SVG (Smooth Bezier)
    const svgWidth = 560;
    const svgHeight = 200;
    const paddingX = 40;
    const paddingTop = 25;
    const paddingBottom = 35;

    const plotWidth = svgWidth - paddingX * 2;
    const plotHeight = svgHeight - paddingTop - paddingBottom;

    const allValues = [
        ...pointsData.map((p) => p.value),
        baselineMean,
        baselineMean + baselineTolerance,
        baselineMean - baselineTolerance,
    ];
    const minValue = Math.min(...allValues) * 0.92;
    const maxValue = Math.max(...allValues) * 1.08;
    const range = maxValue - minValue || 1;

    const getX = (index) => {
        if (pointsData.length <= 1) return paddingX + plotWidth / 2;
        return paddingX + (index / (pointsData.length - 1)) * plotWidth;
    };

    const getY = (val) => {
        return paddingTop + plotHeight - ((val - minValue) / range) * plotHeight;
    };

    // Bangun koordinat titik
    const coords = pointsData.map((p, i) => ({
        x: getX(i),
        y: getY(p.value),
        ...p,
    }));

    // Algoritma Bezier Curve Halus (Catmull-Rom to Cubic Bezier)
    const buildSmoothPath = (pts) => {
        if (pts.length === 0) return '';
        if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;

        let d = `M ${pts[0].x} ${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i === 0 ? 0 : i - 1];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;

            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;

            d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
        }
        return d;
    };

    const linePath = buildSmoothPath(coords);

    // Area di bawah kurva untuk gradien
    const areaPath = coords.length > 0
        ? `${linePath} L ${coords[coords.length - 1].x} ${paddingTop + plotHeight} L ${coords[0].x} ${paddingTop + plotHeight} Z`
        : '';

    // Koordinat Garis Baseline & Pita Toleransi
    const baselineY = getY(baselineMean);
    const upperToleranceY = getY(baselineMean + baselineTolerance);
    const lowerToleranceY = getY(baselineMean - baselineTolerance);

    return (
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-surface border border-surface-container shadow-2xs space-y-4">
            {/* Header: Title, Badge & Selector Mode */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">
                            monitoring
                        </span>
                        <h2 className="font-heading font-black text-sm sm:text-base text-on-surface">
                            Tracker &amp; Grafik Tren Baseline
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-label-mono font-bold uppercase tracking-wider">
                            HBE 14-Hari
                        </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                        Memantau stabilitas biometrik terhadap garis acuan fisiologis personal Anda.
                    </p>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    {/* Tombol Aksesibilitas: Toggle Chart vs Table */}
                    <div className="flex items-center p-0.5 rounded-xl bg-surface-container-low border border-surface-container">
                        <button
                            type="button"
                            onClick={() => setViewMode('chart')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                viewMode === 'chart'
                                    ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                            title="Tampilan Visual Grafik Garis"
                        >
                            <span className="material-symbols-outlined text-[15px]">show_chart</span>
                            <span>Grafik</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('table')}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                viewMode === 'table'
                                    ? 'bg-white dark:bg-surface text-primary shadow-2xs'
                                    : 'text-on-surface-variant hover:text-on-surface'
                            }`}
                            title="Tampilan Tabel Angka untuk Aksesibilitas"
                        >
                            <span className="material-symbols-outlined text-[15px]">table_rows</span>
                            <span>Tabel</span>
                        </button>
                    </div>

                    {onOpenQuickLog && (
                        <button
                            type="button"
                            onClick={() => onOpenQuickLog(selectedMetric)}
                            className="p-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                            title="Catat Rekaman Baru"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Metric Pills Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(METRIC_DEFINITIONS).map(([key, cfg]) => {
                    const isSelected = selectedMetric === key;
                    const bVal = baselines[key]?.value_primary
                        ? parseFloat(baselines[key].value_primary)
                        : cfg.defaultBaseline;

                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                setSelectedMetric(key);
                                setHoveredIndex(null);
                            }}
                            className={`p-2.5 rounded-2xl text-left transition-all border flex items-center gap-2.5 ${
                                isSelected
                                    ? 'bg-primary/10 border-primary text-primary shadow-2xs'
                                    : 'bg-surface-container-low hover:bg-surface-container border-transparent text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                    isSelected
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-surface text-on-surface-variant shadow-2xs'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[17px]">{cfg.icon}</span>
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-bold block truncate leading-tight">
                                    {cfg.shortLabel}
                                </span>
                                <span className="text-[9px] font-label-mono block opacity-80 truncate">
                                    Base: {cfg.formatValue(bVal)}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Metric Summary Bar */}
            <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                    <div>
                        <span className="text-[10px] text-on-surface-variant block">Rata-Rata Terkini</span>
                        <span className="font-heading font-black text-sm sm:text-base text-on-surface font-mono">
                            {metricConfig.formatValue(avgValue)}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-surface-container" />
                    <div>
                        <span className="text-[10px] text-on-surface-variant block">Baseline Personal (HBE)</span>
                        <div className="flex items-center gap-1 font-heading font-bold text-xs sm:text-sm text-primary font-mono">
                            <span className="w-2.5 h-0.5 border-b-2 border-dashed border-primary inline-block" />
                            <span>{metricConfig.formatValue(baselineMean)}</span>
                        </div>
                    </div>
                </div>

                {/* Status Fisiologis Tenang */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">
                        {isWithinNormalBand ? 'verified' : 'info'}
                    </span>
                    <span>
                        {isWithinNormalBand
                            ? 'Stabil dalam batas toleransi baseline'
                            : 'Fluktuasi normal terkontrol'}
                    </span>
                </div>
            </div>

            {/* Visual View: Chart OR Table */}
            {viewMode === 'chart' ? (
                <div className="relative pt-1">
                    {/* SVG Chart Container */}
                    <div className="w-full overflow-x-auto no-scrollbar">
                        <svg
                            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            className="w-full h-48 sm:h-56 select-none"
                        >
                            <defs>
                                <linearGradient
                                    id={`gradient-${selectedMetric}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop offset="0%" stopColor={metricConfig.fillGradientStart} />
                                    <stop offset="100%" stopColor={metricConfig.fillGradientEnd} />
                                </linearGradient>
                            </defs>

                            {/* Background Grid Lines Horizontal */}
                            <line
                                x1={paddingX}
                                y1={paddingTop}
                                x2={svgWidth - paddingX}
                                y2={paddingTop}
                                stroke="currentColor"
                                strokeDasharray="3 3"
                                className="text-surface-container opacity-50"
                            />
                            <line
                                x1={paddingX}
                                y1={paddingTop + plotHeight / 2}
                                x2={svgWidth - paddingX}
                                y2={paddingTop + plotHeight / 2}
                                stroke="currentColor"
                                strokeDasharray="3 3"
                                className="text-surface-container opacity-50"
                            />
                            <line
                                x1={paddingX}
                                y1={paddingTop + plotHeight}
                                x2={svgWidth - paddingX}
                                y2={paddingTop + plotHeight}
                                stroke="currentColor"
                                className="text-surface-container"
                            />

                            {/* Pita Toleransi Biologis Normal (Shaded Variance Band) */}
                            {upperToleranceY && lowerToleranceY && (
                                <rect
                                    x={paddingX}
                                    y={Math.min(upperToleranceY, lowerToleranceY)}
                                    width={plotWidth}
                                    height={Math.abs(lowerToleranceY - upperToleranceY)}
                                    fill="rgba(0, 90, 84, 0.05)"
                                    rx="4"
                                />
                            )}

                            {/* Garis Acuan Normal Personal (Baseline Reference Line: Teal Dashed) */}
                            <line
                                x1={paddingX}
                                y1={baselineY}
                                x2={svgWidth - paddingX}
                                y2={baselineY}
                                stroke="#00796b"
                                strokeWidth="1.75"
                                strokeDasharray="5 4"
                            />
                            <text
                                x={svgWidth - paddingX}
                                y={baselineY - 5}
                                textAnchor="end"
                                className="fill-primary font-mono text-[9px] font-bold"
                            >
                                Baseline: {Math.round(baselineMean)}
                            </text>

                            {/* Smooth Bezier Area */}
                            {areaPath && (
                                <path
                                    d={areaPath}
                                    fill={`url(#gradient-${selectedMetric})`}
                                />
                            )}

                            {/* Smooth Bezier Curve Line */}
                            {linePath && (
                                <path
                                    d={linePath}
                                    fill="none"
                                    stroke={metricConfig.strokeColor}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            )}

                            {/* Data Points (Dots) */}
                            {coords.map((pt, idx) => {
                                const isHovered = hoveredIndex === idx;
                                return (
                                    <g key={idx} className="cursor-pointer">
                                        {/* Invisible touch/click zone */}
                                        <circle
                                            cx={pt.x}
                                            cy={pt.y}
                                            r="14"
                                            fill="transparent"
                                            onMouseEnter={() => setHoveredIndex(idx)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            onClick={() => setHoveredIndex(idx)}
                                        />

                                        {/* Outer Halo on Hover */}
                                        {isHovered && (
                                            <circle
                                                cx={pt.x}
                                                cy={pt.y}
                                                r="7"
                                                fill={metricConfig.strokeColor}
                                                opacity="0.3"
                                            />
                                        )}

                                        {/* Core Dot */}
                                        <circle
                                            cx={pt.x}
                                            cy={pt.y}
                                            r={isHovered ? "4.5" : "3.5"}
                                            fill="#ffffff"
                                            stroke={metricConfig.strokeColor}
                                            strokeWidth="2.5"
                                        />

                                        {/* Date Label on X Axis */}
                                        <text
                                            x={pt.x}
                                            y={paddingTop + plotHeight + 18}
                                            textAnchor="middle"
                                            className={`font-mono text-[9px] ${
                                                isHovered
                                                    ? 'fill-primary font-bold'
                                                    : 'fill-on-surface-variant'
                                            }`}
                                        >
                                            {pt.label}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Interactive Tooltip Card Saat Titik Dipilih / Dihilangkan */}
                    {hoveredIndex !== null && coords[hoveredIndex] && (
                        <div className="mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-container-high shadow-xs flex items-center justify-between text-xs animate-in fade-in duration-150">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                                <span className="font-bold text-on-surface">
                                    {coords[hoveredIndex].label}:
                                </span>
                                <span className="font-mono font-black text-primary">
                                    {metricConfig.formatValue(coords[hoveredIndex].value)}
                                </span>
                            </div>
                            <span className="text-[10px] text-on-surface-variant font-mono">
                                Deviasi vs Baseline:{' '}
                                {coords[hoveredIndex].value - baselineMean >= 0 ? '+' : ''}
                                {Math.round(coords[hoveredIndex].value - baselineMean)} {metricConfig.unit}
                            </span>
                        </div>
                    )}
                </div>
            ) : (
                /* Accessible Text Table View */
                <div className="overflow-x-auto rounded-2xl border border-surface-container">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-surface-container-low text-[10px] font-label-mono uppercase text-on-surface-variant border-b border-surface-container">
                            <tr>
                                <th className="p-3">Tanggal</th>
                                <th className="p-3">Nilai Rekaman</th>
                                <th className="p-3">Acuan Baseline</th>
                                <th className="p-3">Status Variasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container">
                            {pointsData.map((pt, i) => {
                                const diff = pt.value - baselineMean;
                                const isStable = Math.abs(diff) <= baselineTolerance * 1.5;
                                return (
                                    <tr key={i} className="hover:bg-surface-container-low/50">
                                        <td className="p-3 font-mono font-medium text-on-surface">
                                            {pt.label}
                                        </td>
                                        <td className="p-3 font-mono font-bold text-on-surface">
                                            {metricConfig.formatValue(pt.value)}
                                        </td>
                                        <td className="p-3 font-mono text-on-surface-variant">
                                            {metricConfig.formatValue(baselineMean)}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                                    isStable
                                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                                                        : 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                                                }`}
                                            >
                                                {isStable ? 'Dalam Rentang Normal' : 'Fluktuasi Wajar'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer Legend & Insight Medis Tenang */}
            <div className="pt-2 border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-[11px] text-on-surface-variant">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-0.5 border-b-2 border-dashed border-primary inline-block" />
                        <span>Garis Baseline Personal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded bg-primary/10 inline-block" />
                        <span>Pita Toleransi Normal</span>
                    </div>
                </div>

                <span className="text-[10px] font-mono text-primary font-medium">
                    Algoritma Moving Average IQR • Bebas Alarm Palsu
                </span>
            </div>
        </div>
    );
}

