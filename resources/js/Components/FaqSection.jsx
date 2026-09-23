import React, { useState } from 'react';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            q: 'Apakah Kadar menggantikan dokter tatap muka di RS?',
            a: 'Tidak. Kadar bertindak sebagai pendamping preventif harian (companion care) untuk mencegah pra-diabetes berkembang menjadi diabetes kronis. Jika terjadi kondisi darurat/kritis, DPJP akan langsung merujuk ke RS terdekat.',
            q: 'Apakah AEVYRA menggantikan dokter tatap muka di RS?',
            a: 'Tidak. AEVYRA bertindak sebagai pendamping preventif harian (companion care) untuk mencegah pra-diabetes berkembang menjadi diabetes kronis. Jika terjadi kondisi darurat/kritis, DPJP akan langsung merujuk ke RS terdekat.',
        },
        {
            q: 'Bagaimana keamanan data & rekam medis saya?',
            a: 'Data kesehatan dienkripsi AES-256 bit dan terlindungi UU Perlindungan Data Pribadi (UU No. 27/2022). Hanya dokter wali yang Anda setujui yang dapat mengakses riwayat Anda.',
        },
        {
            q: 'Berapa lama durasi program hingga remisi pra-diabetes?',
            a: 'Siklus standar adalah 90 hari (sesuai siklus hidup sel darah merah untuk evaluasi HbA1c ulang). Perbaikan energi dan stabilitas gula umumnya mulai terasa dalam 14 hari pertama.',
        },
        {
            q: 'Apakah terhubung dengan BPJS & SatuSehat?',
            a: 'Ya. Terintegrasi penuh dengan ekosistem SatuSehat Kemenkes RI. Data resume medis dapat diekspor secara resmi untuk dokter faskes tingkat pertama (FKTP) / Prolanis.',
        },
    ];

    return (
        <section className="w-full relative py-space-xl px-gutter lg:px-margin" id="faq">
            <div className="max-w-3xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="text-center space-y-1.5">
                    <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                        [ FAQ // TANYA JAWAB ]
                    </span>
                    <h2 className="font-headline-lg text-3xl sm:text-4xl font-normal text-primary">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-body-sm text-xs sm:text-sm text-on-surface-variant max-w-lg mx-auto">
                        Semua jawaban penting seputar integrasi medis, keamanan data, dan mekanisme pendampingan kesehatan.
                    </p>
                </div>

                {/* Smooth Glassmorphic Accordions */}
                <div className="space-y-3 pt-2">
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`group backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen
                                        ? 'bg-white/95 border-primary/40 shadow-lg shadow-primary/5'
                                        : 'bg-white/75 border-white/80 hover:border-primary-fixed-dim/70 hover:bg-white/95 shadow-[0_4px_20px_-2px_rgba(0,67,62,0.04)]'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-primary transition-colors cursor-pointer gap-3"
                                >
                                    <span>{item.q}</span>
                                    <span
                                        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                                            isOpen
                                                ? 'bg-primary text-on-primary rotate-180 shadow-xs'
                                                : 'bg-primary/5 text-primary group-hover:bg-primary/10'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            expand_more
                                        </span>
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-primary/10 pt-3 animate-in fade-in duration-200">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
