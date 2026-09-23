import React, { useState } from 'react';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            category: 'medical',
            q: 'Apakah AEVYRA menggantikan konsultasi dokter tatap muka di rumah sakit?',
            a: 'Tidak. AEVYRA bertindak sebagai pendamping preventif harian (companion care) untuk mencegah kondisi pra-diabetes berkembang menjadi diabetes kronis. Jika terjadi indikasi kritis atau kondisi darurat, tim kami langsung merekomendasikan rujukan ke dokter spesialis atau fasilitas kesehatan terdekat.',
        },
        {
            category: 'ai',
            q: 'Seberapa akurat pemindai kamera membaca label informasi gizi kemasan?',
            a: 'Sistem visi komputer AEVYRA dikalibrasi menggunakan basis data lebih dari 120.000 produk pangan dan farmasi yang terdaftar resmi di BPOM RI, dengan tingkat akurasi pemetaan mencapai 98.4%. Sistem membedah kadar sukrosa bebas, natrium, dan beban glikemik dalam hitungan <0.4 detik.',
        },
        {
            category: 'security',
            q: 'Bagaimana keamanan data pribadi dan catatan biomarker kesehatan saya?',
            a: 'Seluruh data kesehatan dienkripsi end-to-end menggunakan standar militer AES-256 bit dan mematuhi amanat UU Perlindungan Data Pribadi (UU No. 27/2022). Hanya tenaga medis berlisensi yang Anda beri otorisasi yang dapat meninjau buku harian glukosa Anda.',
        },
        {
            category: 'medical',
            q: 'Berapa lama durasi program hingga tampak pembalikan risiko metabolik?',
            a: 'Siklus standar evaluasi klinis berkala adalah 90 hari, menyesuaikan dengan masa hidup sel darah merah untuk pengujian ulang kadar HbA1c laboratorium. Namun, peningkatan stabilitas energi dan berkurangnya rasa kantuk pasca-makan umumnya mulai dirasakan dalam 14 hari pertama program bebas gula cair.',
        },
        {
            category: 'security',
            q: 'Apakah resume medis dapat diekspor untuk BPJS Kesehatan dan SatuSehat?',
            a: 'Ya. AEVYRA mengadopsi standar interoperabilitas HL7 FHIR Kemenkes RI SatuSehat. Anda dapat mengekspor resume riwayat biomarker terstandar resmi dalam format PDF untuk dibawa saat rujukan ke Puskesmas, Klinik Prolanis, atau rumah sakit keluarga Anda.',
        },
        {
            category: 'billing',
            q: 'Apakah fitur pemindai kamera makanan dan obat dapat digunakan secara gratis?',
            a: 'Ya. Paket Silver 100% bebas biaya selamanya. Anda dapat mengarahkan kamera ke label kemasan pangan, memanfaatkan pencatatan glukosa mandiri, dan berdiskusi dengan asisten AI tanpa kewajiban memasukkan kartu kredit.',
        },
    ];

    const filteredFaqs = faqs.filter((item) => {
        if (activeCategory === 'all') return true;
        return item.category === activeCategory;
    });

    return (
        <section className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-300 mx-auto" id="faq">
            <div className="space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-surface-container-high">
                    <div className="space-y-2">
                        <span className="text-[11px] text-primary font-medium tracking-wide uppercase block">
                            FAQ • Transparansi &amp; Standar Medis
                        </span>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#142320]">
                            Jawaban seputar pemindai, data klinis, dan privasi.
                        </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#546661] max-w-sm leading-relaxed">
                        Ketahui cara kerja algoritma visi gizi, keabsahan data laboratorium, interoperabilitas SatuSehat, dan ketentuan paket keanggotaan.
                    </p>
                </div>

                {/* Category Filters (Clean, No Emojis, Standard 42px Touch Target) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <button
                        type="button"
                        onClick={() => setActiveCategory('all')}
                        className={`min-h-10.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center ${
                            activeCategory === 'all'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-[#4e605b] hover:text-primary hover:bg-white'
                        }`}
                    >
                        Semua Pertanyaan
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('medical')}
                        className={`min-h-10.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center ${
                            activeCategory === 'medical'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-[#4e605b] hover:text-primary hover:bg-white'
                        }`}
                    >
                        Protokol Medis
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('ai')}
                        className={`min-h-10.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center ${
                            activeCategory === 'ai'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-[#4e605b] hover:text-primary hover:bg-white'
                        }`}
                    >
                        Akurasi Pemindai
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('security')}
                        className={`min-h-10.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center ${
                            activeCategory === 'security'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-[#4e605b] hover:text-primary hover:bg-white'
                        }`}
                    >
                        Keamanan &amp; SatuSehat
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveCategory('billing')}
                        className={`min-h-10.5 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center ${
                            activeCategory === 'billing'
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-[#4e605b] hover:text-primary hover:bg-white'
                        }`}
                    >
                        Biaya &amp; Akses
                    </button>
                </div>

                {/* Harmonious Accordions */}
                <div className="space-y-3 pt-1">
                    {filteredFaqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all ${
                                    isOpen
                                        ? 'bg-white border-[#1c6454]/40 shadow-[0_4px_20px_rgba(0,40,36,0.03)]'
                                        : 'bg-white/70 border-surface-container-high hover:border-[#cfe0d6]'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm sm:text-base font-serif text-[#182926] cursor-pointer gap-4"
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-[#1c6454]">
                                            0{idx + 1}.
                                        </span>
                                        <span>{item.q}</span>
                                    </span>
                                    <span
                                        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs transition-transform ${
                                            isOpen
                                                ? 'bg-[#edf5f0] text-[#1c6454] rotate-180'
                                                : 'bg-[#f4f7f5] text-[#5e716c]'
                                        }`}
                                    >
                                        ↓
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#4d605a] leading-relaxed border-t border-[#f0f5f2] pt-3.5">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Direct Medical Counseling Support Card */}
                <div className="p-5 sm:p-6 bg-[#f0f6f3] rounded-2xl border border-[#d6e7dd] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="space-y-1">
                        <span className="font-serif text-sm sm:text-base font-medium text-[#182926] block">
                            Punya pertanyaan klinis khusus seputar kondisi Anda?
                        </span>
                        <span className="text-xs text-[#52655f] block">
                            Tim edukator dan dokter konsultan kami siap mengarahkan skrining yang tepat.
                        </span>
                    </div>
                    <a
                        href="mailto:care@aevyra.health"
                        className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap shadow-xs"
                    >
                        Tanya Tim Dokter
                    </a>
                </div>
            </div>
        </section>
    );
}

