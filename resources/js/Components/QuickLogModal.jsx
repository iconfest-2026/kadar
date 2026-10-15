import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from '@inertiajs/react';

const METRIC_OPTIONS = [
    { type: 'sleep_duration', label: 'Durasi Tidur', unit: 'hours', placeholder: '7.5', icon: 'bedtime', step: '0.1' },
    { type: 'water_intake', label: 'Asupan Air Minum', unit: 'ml', placeholder: '500', icon: 'water_drop', step: '50' },
    { type: 'steps', label: 'Langkah Kaki', unit: 'steps', placeholder: '6000', icon: 'directions_walk', step: '100' },
    { type: 'blood_glucose', label: 'Gula Darah Puasa', unit: 'mg/dL', placeholder: '95', icon: 'bloodtype', step: '1' },
    { type: 'mood_score', label: 'Suasana Hati (Skor 1-5)', unit: 'score', placeholder: '4', icon: 'sentiment_satisfied', step: '1' },
];

export default function QuickLogModal({ isOpen, onClose, defaultMetric = 'sleep_duration' }) {
    const [mounted, setMounted] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState(defaultMetric);

    const activeConfig = METRIC_OPTIONS.find((m) => m.type === selectedMetric) || METRIC_OPTIONS[0];

    const { data, setData, post, processing, reset, errors } = useForm({
        metric_type: activeConfig.type,
        value: '',
        unit: activeConfig.unit,
        notes: '',
        source: 'manual',
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Body scroll lock & reset state when opening
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSelectMetric = (metric) => {
        setSelectedMetric(metric.type);
        setData((prev) => ({
            ...prev,
            metric_type: metric.type,
            unit: metric.unit,
            value: '',
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/member/quick-log', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="w-full max-w-md bg-surface rounded-3xl border border-surface-container shadow-2xl overflow-hidden animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[22px]">add_circle</span>
                        <h2 className="font-heading font-bold text-base text-on-surface">Catat Metrik Harian</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer transition-colors"
                        aria-label="Tutup"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                {/* Metric Selector Pills */}
                <div className="p-6 pb-2 space-y-4">
                    <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                        {METRIC_OPTIONS.map((metric) => (
                            <button
                                key={metric.type}
                                type="button"
                                onClick={() => handleSelectMetric(metric)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                                    selectedMetric === metric.type
                                        ? 'bg-primary text-on-primary shadow-xs'
                                        : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[16px]">{metric.icon}</span>
                                <span>{metric.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3.5">
                        <div className="space-y-1">
                            <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                Nilai ({activeConfig.label})
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step={activeConfig.step}
                                    required
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    placeholder={`Contoh: ${activeConfig.placeholder}`}
                                    className="w-full px-3.5 py-2.5 bg-surface-container-low text-sm font-semibold text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-label-mono text-on-surface-variant font-medium">
                                    {activeConfig.unit}
                                </span>
                            </div>
                            {errors.value && <p className="text-[11px] text-error font-medium">{errors.value}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="font-label-mono text-[11px] text-primary uppercase font-semibold block">
                                Catatan / Konteks Tambahan (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Contoh: Tidur lebih awal, minum setelah berolahraga"
                                className="w-full px-3.5 py-2 bg-surface-container-low text-xs text-on-surface rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="p-3 bg-surface-container-low rounded-xl text-[11px] text-on-surface-variant flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                            <span>Data otomatis divalidasi kualitas biologis (DQS) dan memperbarui baseline 14 hari Anda (+10 poin).</span>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-xs font-semibold text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container cursor-pointer transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="py-2.5 px-5 bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition-colors"
                            >
                                {processing ? (
                                    <>
                                        <span className="w-3.5 h-3.5 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                                        <span>Menyimpan...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Simpan Catatan</span>
                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
