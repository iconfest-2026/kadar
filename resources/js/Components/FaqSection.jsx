import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setOpenIndex(null);
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
            a: 'Sistem visi komputer AEVYRA dikalibrasi menggunakan basis data produk pangan dan farmasi yang terdaftar resmi di BPOM RI, dengan tingkat akurasi pemetaan mencapai 98.4%. Sistem membedah kadar sukrosa bebas, natrium, dan beban glikemik dalam hitungan <0.4 detik.',
        },
        {
            category: 'security',
            q: 'Bagaimana keamanan data pribadi dan catatan biomarker kesehatan saya?',
            a: 'Seluruh data kesehatan akun dienkripsi menggunakan protokol keamanan standar industri dan mematuhi amanat UU Perlindungan Data Pribadi (UU No. 27/2022). Hanya Anda dan tenaga medis berlisensi yang Anda beri otorisasi yang dapat meninjau buku harian glukosa Anda.',
        },
        {
            category: 'medical',
            q: 'Berapa lama durasi program hingga tampak pembalikan risiko metabolik?',
            a: 'Siklus standar evaluasi klinis berkala adalah 90 hari, menyesuaikan dengan masa hidup sel darah merah untuk pengujian ulang kadar HbA1c laboratorium. Namun, peningkatan stabilitas energi dan berkurangnya rasa kantuk pasca-makan umumnya mulai dirasakan dalam 14 hari pertama program bebas gula cair.',
        },
        {
            category: 'security',
            q: 'Apakah resume medis dapat diekspor untuk BPJS Kesehatan dan dokter keluarga?',
            a: 'Ya. AEVYRA mengadopsi standar format pelaporan ringkasan klinis yang dapat Anda ekspor sebagai PDF resmi untuk dibawa saat rujukan ke Puskesmas, Klinik Prolanis, atau rumah sakit keluarga Anda.',
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

    // Limit to 5 questions on landing page, rest accessed via dedicated /faq page
    const displayedFaqs = filteredFaqs.slice(0, 5);

    return (
        <section className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl min-w-0 mx-auto" id="faq">
            <div className="space-y-5">
                {/* Header */}
                <div className="pb-2 border-b border-surface-container-high">
                    <div className="space-y-1">
                        <span className="text-[10px] sm:text-[11px] text-primary font-medium tracking-wide uppercase block">
                            FAQ • Transparansi &amp; Standar Medis
                        </span>
                        <h2 className="font-serif text-xl sm:text-2xl lg:text-[32px] font-normal text-[#142320]">
                            Jawaban seputar pemindai, data klinis, dan privasi.
                        </h2>
                    </div>
                </div>

                {/* Category Filters (Clean, No Emojis, Standard Touch Target) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('all')}
                        className={`min-h-7.5 sm:min-h-8 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            activeCategory === 'all'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white/80 text-[#4e605b] hover:text-primary hover:bg-[#edf5f0]'
                        }`}
                    >
                        Semua Pertanyaan
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('medical')}
                        className={`min-h-7.5 sm:min-h-8 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            activeCategory === 'medical'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white/80 text-[#4e605b] hover:text-primary hover:bg-[#edf5f0]'
                        }`}
                    >
                        Protokol Medis
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('ai')}
                        className={`min-h-7.5 sm:min-h-8 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            activeCategory === 'ai'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white/80 text-[#4e605b] hover:text-primary hover:bg-[#edf5f0]'
                        }`}
                    >
                        Akurasi Pemindai
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('security')}
                        className={`min-h-7.5 sm:min-h-8 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            activeCategory === 'security'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white/80 text-[#4e605b] hover:text-primary hover:bg-[#edf5f0]'
                        }`}
                    >
                        Keamanan &amp; Privasi
                    </button>
                    <button
                        type="button"
                        onClick={() => handleCategoryChange('billing')}
                        className={`min-h-7.5 sm:min-h-8 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                            activeCategory === 'billing'
                                ? 'bg-primary text-white shadow-2xs'
                                : 'bg-white/80 text-[#4e605b] hover:text-primary hover:bg-[#edf5f0]'
                        }`}
                    >
                        Biaya &amp; Akses
                    </button>
                </div>

                {/* Harmonious Accordions with Smooth Expand/Collapse Animation (Max 5 on Landing) */}
                <div className="space-y-2.5 pt-0.5">
                    {displayedFaqs.map((item, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                                    isOpen
                                        ? 'bg-white border-[#1c6454]/40 shadow-[0_4px_20px_rgba(0,40,36,0.04)]'
                                        : 'bg-white/70 border-surface-container-high hover:border-[#cfe0d6] hover:bg-white'
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left text-xs sm:text-sm font-serif text-[#182926] cursor-pointer gap-4"
                                    aria-expanded={isOpen}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-[11px] sm:text-xs font-mono text-[#1c6454] font-semibold">
                                            0{idx + 1}.
                                        </span>
                                        <span className="font-medium text-[#182926]">{item.q}</span>
                                    </span>
                                    <span
                                        className={`w-6.5 sm:w-7 h-6.5 sm:h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? 'bg-primary text-white rotate-180 shadow-2xs'
                                                : 'bg-[#edf5f0] text-[#1c6454] rotate-0'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[16px] sm:text-[18px] leading-none">
                                            expand_more
                                        </span>
                                    </span>
                                </button>
                                
                                {/* Smooth Animated Accordion Drawer */}
                                <div
                                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 sm:px-5 pb-4 text-[11px] sm:text-xs text-[#4d605a] leading-relaxed border-t border-[#f0f5f2] pt-3">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View Full FAQ Page Link */}
                <div className="pt-2 flex justify-center">
                    <Link
                        href="/faq"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-xs font-semibold hover:bg-[#edf5f0] border border-[#d6e7dd] transition-all shadow-2xs hover:shadow-xs active:scale-98"
                    >
                        <span>Lihat Selengkapnya (Total 20 Pertanyaan FAQ)</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

