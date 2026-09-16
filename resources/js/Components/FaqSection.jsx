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
        <section className="w-full py-space-xl px-gutter lg:px-margin bg-surface-container-low" id="faq">
            <div className="max-w-3xl mx-auto space-y-space-md">
                {/* Header */}
                <div className="text-center space-y-1">
                    <span className="font-label-mono text-xs text-primary font-semibold uppercase tracking-wider block">
                        [ FAQ // TANYA JAWAB ]
                    </span>
                    <h2 className="font-headline-lg text-3xl font-normal text-primary">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                </div>

                {/* Smooth Accordions */}
                <div className="space-y-2">
                    {faqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className="bg-surface rounded-xl border border-surface-container overflow-hidden transition-colors"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-4 flex items-center justify-between text-left text-sm font-semibold text-primary hover:bg-surface-container-low/60 transition-colors"
                                >
                                    <span>{item.q}</span>
                                    <span
                                        className={`material-symbols-outlined text-primary text-[20px] transform transition-transform duration-300 shrink-0 ml-2 ${
                                            isOpen ? 'rotate-180' : 'rotate-0'
                                        }`}
                                    >
                                        expand_more
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-4 pb-4 text-xs text-on-surface-variant leading-relaxed border-t border-surface-container-low pt-2 animate-in fade-in duration-200">
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
