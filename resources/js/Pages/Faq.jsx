import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Faq(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openKey, setOpenKey] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const categories = [
        { id: 'all', label: 'Semua Pertanyaan', count: 20 },
        { id: 'medical', label: 'Protokol Medis', count: 5 },
        { id: 'scanner', label: 'Pemindai Nutrisi AI', count: 5 },
        { id: 'security', label: 'Privasi & Keamanan Data', count: 5 },
        { id: 'membership', label: 'Biaya & Keanggotaan', count: 5 },
    ];

    const faqs = [
        // Category: medical (1 - 5)
        {
            category: 'medical',
            categoryLabel: 'Protokol Medis',
            q: 'Apakah AEVYRA menggantikan konsultasi dokter tatap muka di rumah sakit?',
            a: 'Tidak. AEVYRA bertindak sebagai pendamping preventif harian (companion care) untuk mencegah kondisi pra-diabetes berkembang menjadi diabetes kronis. Jika terjadi indikasi kritis atau kondisi darurat, tim kami langsung merekomendasikan rujukan ke dokter spesialis atau fasilitas kesehatan terdekat.',
        },
        {
            category: 'medical',
            categoryLabel: 'Protokol Medis',
            q: 'Berapa lama durasi program hingga tampak pembalikan risiko metabolik?',
            a: 'Siklus standar evaluasi klinis berkala adalah 90 hari, menyesuaikan dengan masa hidup sel darah merah untuk pengujian ulang kadar HbA1c laboratorium. Namun, peningkatan stabilitas energi dan berkurangnya rasa kantuk pasca-makan umumnya mulai dirasakan dalam 14 hari pertama program bebas gula cair.',
        },
        {
            category: 'medical',
            categoryLabel: 'Protokol Medis',
            q: 'Apa perbedaan mendasar antara pra-diabetes dengan diabetes melitus tipe 2?',
            a: 'Pra-diabetes adalah kondisi ketika kadar gula darah puasa berada pada kisaran 100–125 mg/dL (atau HbA1c 5.7%–6.4%), lebih tinggi dari batas normal tetapi belum mencapai kriteria diabetes melitus (≥126 mg/dL atau HbA1c ≥6.5%). Kondisi pra-diabetes bersifat reversible (dapat pulih sepenuhnya ke kadar normal) melalui intervensi pola makan rendah glikemik dan pembiasaan fisik terarah sebelum sel beta pankreas mengalami kerusakan permanen.',
        },
        {
            category: 'medical',
            categoryLabel: 'Protokol Medis',
            q: 'Mengapa fokus utama AEVYRA adalah beban glikemik, bukan sekadar menghitung kalori?',
            a: 'Kalori hanya mengukur kuantitas energi, sedangkan beban glikemik (Glycemic Load) memperhitungkan seberapa cepat dan tinggi karbohidrat tersebut memicu lonjakan glukosa darah. Makanan dengan kalori sama (misalnya 150 kkal dari brokoli vs 150 kkal dari minuman boba) memiliki dampak hormonal insulin yang bertolak belakang. Menekan lonjakan glikemik terbukti secara klinis merupakan kunci mencegah resistensi insulin.',
        },
        {
            category: 'medical',
            categoryLabel: 'Protokol Medis',
            q: 'Bagaimana dokter spesialis dan instruktur klinis memantau perkembangan saya?',
            a: 'Dokter konsultan dan instruktur diet memiliki portal clinician workspace khusus. Mereka memantau linimasa kepatuhan log nutrisi, tren grafik glukosa, dan catatan tensi darah Anda secara berkala, kemudian memberikan penyesuaian target gizi harian serta catatan rekomendasi preventif langsung di dasbor anggota Anda.',
        },

        // Category: scanner (6 - 10)
        {
            category: 'scanner',
            categoryLabel: 'Pemindai Nutrisi AI',
            q: 'Seberapa akurat pemindai kamera membaca label informasi gizi kemasan?',
            a: 'Sistem visi komputer AEVYRA dikalibrasi menggunakan basis data produk pangan dan farmasi yang terdaftar resmi di BPOM RI, dengan tingkat akurasi pengenalan teks mencapai 98.4%. Sistem membedah takaran saji, kadar sukrosa bebas, natrium, dan beban glikemik seketika dalam hitungan kurang dari 0.4 detik.',
        },
        {
            category: 'scanner',
            categoryLabel: 'Pemindai Nutrisi AI',
            q: 'Bagaimana sistem mendeteksi gula tersembunyi yang disamarkan dalam komposisi?',
            a: 'Banyak produk kemasan tidak mencantumkan kata "gula" secara eksplisit, melainkan menggunakan istilah industri seperti maltodekstrin, sirup jagung fruktosa tinggi (HFCS), dekstrosa, invert sugar, konsentrat sari buah, atau sukrosa. Algoritma pemindai AEVYRA mengenali lebih dari 60 nama turunan gula tersembunyi dan langsung menghitung dampaknya pada beban glikemik total.',
        },
        {
            category: 'scanner',
            categoryLabel: 'Pemindai Nutrisi AI',
            q: 'Apakah pemindai dapat mengenali nomor registrasi dan keaslian obat BPOM RI?',
            a: 'Ya. Optical Character Recognition (OCR) kami dilatih untuk memindai format kode izin edar resmi BPOM (seperti POM TR, POM SD, POM DKL) serta barcode kemasan untuk memverifikasi kesesuaian kategori obat, peringatan kontraindikasi gula pada sediaan sirup, dan validitas registrasi farmasi.',
        },
        {
            category: 'scanner',
            categoryLabel: 'Pemindai Nutrisi AI',
            q: 'Apakah pemindai memerlukan koneksi internet aktif untuk memproses label?',
            a: 'Pemrosesan inferensi dasar teks dan deteksi angka gizi dapat berjalan secara lokal di perangkat Anda (on-device processing). Namun, pencocokan basis data produk BPOM komprehensif dan perhitungan rekomendasi dokter memerlukan koneksi internet aktif agar selalu mendapatkan data mutakhir.',
        },
        {
            category: 'scanner',
            categoryLabel: 'Pemindai Nutrisi AI',
            q: 'Mengapa grafik estimasi glukosa memperlihatkan respons puncak pada menit ke-45?',
            a: 'Berdasarkan studi kinetika absorpsi glukosa (pedoman PERKENI), sukrosa dan karbohidrat cair diserap sangat cepat oleh mukosa usus halus dan mencapai konsentrasi puncak dalam sirkulasi darah antara menit ke-30 hingga ke-45 pasca-konsumsi. Kurva simulasi kami memvisualisasikan fenomena ini agar Anda memahami efek langsung makanan sebelum mengonsumsinya.',
        },

        // Category: security (11 - 15)
        {
            category: 'security',
            categoryLabel: 'Privasi & Keamanan Data',
            q: 'Bagaimana keamanan data pribadi dan catatan biomarker kesehatan saya?',
            a: 'Keamanan data anggota merupakan prioritas utama. Kata sandi akun dienkripsi menggunakan algoritma hashing standar industri (Bcrypt/Argon2id), dan seluruh transmisi data jaringan dilindungi sertifikat SSL/TLS HTTPS terenkripsi. Data kesehatan Anda bersifat privat dan hanya dapat diakses oleh Anda dan tenaga medis yang Anda beri izin melalui platform.',
        },
        {
            category: 'security',
            categoryLabel: 'Privasi & Keamanan Data',
            q: 'Apakah resume medis dapat diekspor untuk dokter keluarga atau faskes saya?',
            a: 'Ya. AEVYRA menyediakan fitur ekspor ringkasan catatan kesehatan (Health Summary Report) berformat PDF resmi yang merangkum rata-rata glukosa, riwayat kepatuhan nutrisi, dan tren tekanan darah. Laporan ini dirancang dengan terminologi klinis standar sehingga dapat Anda tunjukkan kepada dokter di Puskesmas, Klinik Pratama, atau Rumah Sakit keluarga Anda.',
        },
        {
            category: 'security',
            categoryLabel: 'Privasi & Keamanan Data',
            q: 'Apakah data rekam medis saya akan diperjualbelikan kepada pihak ketiga atau asuransi?',
            a: 'Sama sekali tidak. AEVYRA menerapkan prinsip etika kedokteran dan kepatuhan privasi data. Data kesehatan biomarker Anda tidak pernah dan tidak akan pernah dijual, disewakan, atau dibagikan kepada perusahaan asuransi komersial maupun biro periklanan pihak ketiga tanpa persetujuan tertulis eksplisit dari Anda.',
        },
        {
            category: 'security',
            categoryLabel: 'Privasi & Keamanan Data',
            q: 'Bagaimana status integrasi dengan ekosistem SatuSehat Kemenkes RI?',
            a: 'Format pencatatan data biomarker di AEVYRA dirancang mengadopsi standar terminologi HL7 FHIR Kemenkes RI. Integrasi langsung pertukaran data API SatuSehat secara bertahap masuk dalam peta jalan pengembangan sistem (roadmap integrasi nasional) agar di masa depan resume remisi metabolik dapat terhubung langsung ke SatuSehat ID warga negara.',
        },
        {
            category: 'security',
            categoryLabel: 'Privasi & Keamanan Data',
            q: 'Apa yang terjadi jika saya ingin menghapus seluruh data saya dari sistem?',
            a: 'Sesuai amanat UU Perlindungan Data Pribadi (UU PDP No. 27/2022), Anda memiliki hak penuh untuk meminta penghapusan akun dan seluruh riwayat catatan biomarker Anda (right to erasure). Anda dapat mengajukan permohonan melalui menu Pengaturan Akun atau menghubungi email tim kepatuhan data kami.',
        },

        // Category: membership (16 - 20)
        {
            category: 'membership',
            categoryLabel: 'Biaya & Keanggotaan',
            q: 'Apakah fitur pemindai kamera makanan dan obat dapat digunakan secara gratis?',
            a: 'Ya. Paket Silver 100% bebas biaya selamanya. Anda dapat mengarahkan kamera ke label kemasan pangan, memanfaatkan pencatatan glukosa mandiri, dan berdiskusi dengan asisten AI tanpa kewajiban memasukkan kartu kredit maupun biaya berlangganan tersembunyi.',
        },
        {
            category: 'membership',
            categoryLabel: 'Biaya & Keanggotaan',
            q: 'Apa saja fasilitas tambahan yang didapat pada keanggotaan Gold dan Platinum?',
            a: 'Keanggotaan Gold dan Platinum ditujukan bagi individu yang memerlukan pendampingan intensif: meliputi sesi telekonsultasi terjadwal bersama dokter spesialis penyakit dalam (Sp.PD) dan spesialis gizi klinik (Sp.GK), modul rencana makan personal mingguan, pengantaran kit glukometer mandiri ke rumah, serta akses prioritas tombol bantuan darurat.',
        },
        {
            category: 'membership',
            categoryLabel: 'Biaya & Keanggotaan',
            q: 'Apakah saya wajib memiliki alat Continuous Glucose Monitor (CGM) untuk menggunakan platform ini?',
            a: 'Tidak wajib. AEVYRA dirancang inklusif untuk seluruh masyarakat. Anda dapat menggunakan pemindai kamera label gizi, memasukkan hasil cek glukosa darah kapiler (finger-prick) biasa dari puskesmas/apotek, atau bahkan sekadar mencatat log makanan dan aktivitas harian tanpa alat khusus.',
        },
        {
            category: 'membership',
            categoryLabel: 'Biaya & Keanggotaan',
            q: 'Bagaimana cara memesan sesi telekonsultasi dengan dokter spesialis di platform?',
            a: 'Anda dapat masuk ke menu Konsultasi Dokter & AI, memilih profil dokter spesialis yang sesuai (dengan nomor STR/SIP yang terverifikasi), melihat jadwal praktek yang tersedia, dan memilih waktu konsultasi virtual tatap muka yang nyaman bagi Anda.',
        },
        {
            category: 'membership',
            categoryLabel: 'Biaya & Keanggotaan',
            q: 'Apakah AEVYRA menyediakan layanan ambulans gawat darurat jika terjadi krisis hiperglikemia?',
            a: 'AEVYRA menyediakan integrasi tombol panggil darurat satu-klik yang langsung terhubung ke Hotline Ambulans Medis Nasional 119 Kemenkes RI serta mendeteksi lokasi GPS Anda untuk memandu tim tanggap darurat menuju faskes IGD terdekat jika terjadi krisis hiperglikemia akut atau kegawatdaruratan kardiovaskular.',
        },
    ];

    const toggleFaq = (questionText) => {
        setOpenKey((prev) => (prev === questionText ? null : questionText));
    };

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1);
        setOpenKey(null);
    };

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
        setOpenKey(null);
    };

    const filteredFaqs = useMemo(() => {
        return faqs.filter((item) => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesQuery =
                searchQuery.trim() === '' ||
                item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesQuery;
        });
    }, [activeCategory, searchQuery]);

    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage) || 1;
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

    const paginatedFaqs = useMemo(() => {
        const start = (validCurrentPage - 1) * itemsPerPage;
        return filteredFaqs.slice(start, start + itemsPerPage);
    }, [filteredFaqs, validCurrentPage, itemsPerPage]);

    const startItem = filteredFaqs.length === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(validCurrentPage * itemsPerPage, filteredFaqs.length);

    const goToPage = (page) => {
        setCurrentPage(page);
        setOpenKey(null);
        const listEl = document.getElementById('faq-list-anchor');
        if (listEl) {
            listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <MarketingLayout {...props}>
            <Head title="Pusat Bantuan &amp; Direktori FAQ Klinis (20 Pertanyaan) - AEVYRA" />

            <div className="relative w-full overflow-hidden bg-[#f7faf8] py-8 sm:py-12 lg:py-16">
                {/* Diffused Natural Light Blooms */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-150 max-w-[90vw] h-87.5 bg-linear-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
                />

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-[#586b65]">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-[#192b27] font-medium">FAQ &amp; Pusat Pengetahuan Medis</span>
                    </nav>

                    {/* Page Header */}
                    <div className="space-y-3.5 border-b border-surface-container-high pb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-on-surface border border-[#d6e7dc] text-[11px] text-primary font-medium tracking-wide w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                            <span>Pusat Bantuan • Direktori Pengetahuan Klinis Lengkap (Total 20 Pertanyaan)</span>
                        </div>
                        <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight">
                            Jawaban Lengkap seputar Skrining, Data Klinis &amp; Layanan.
                        </h1>
                        <p className="text-[11px] sm:text-base text-[#4a5e57] max-w-2xl leading-relaxed">
                            Pelajari cara kerja algoritma visi gizi, landasan ilmiah beban glikemik PERKENI, jaminan keamanan privasi data, dan cara memaksimalkan pendampingan dokter.
                        </p>
                    </div>

                    {/* Interactive Search Bar */}
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#637770]">
                            search
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Cari topik pertanyaan (misal: gula, kalori, BPOM, dokter, privasi, gratis, ambulans)..."
                            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-[#d6e5dd] text-sm text-[#182a26] placeholder-[#7d8f89] shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => handleSearchChange('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7d8f89] hover:text-primary px-1.5 py-0.5 rounded bg-gray-100 cursor-pointer"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`min-h-9 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                                    activeCategory === cat.id
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'bg-white text-[#4e605b] hover:text-primary hover:bg-[#edf5f0] border border-[#d8e6df]'
                                }`}
                            >
                                <span>{cat.label}</span>
                                <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                        activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-[#5f736d]'
                                    }`}
                                >
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Results Counter Anchor */}
                    <div id="faq-list-anchor" className="scroll-mt-24 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5e716b] px-1 gap-2">
                        <span>
                            {filteredFaqs.length === 0 ? (
                                'Tidak ada pertanyaan yang sesuai dengan kriteria filter.'
                            ) : (
                                <>
                                    Menampilkan <strong>{startItem} - {endItem}</strong> dari <strong>{filteredFaqs.length}</strong> pertanyaan
                                    {totalPages > 1 && (
                                        <span className="text-[#7d918a] ml-1.5 font-normal">
                                            (Halaman {validCurrentPage} dari {totalPages})
                                        </span>
                                    )}
                                </>
                            )}
                            {searchQuery && ` untuk kata kunci "${searchQuery}"`}
                        </span>
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => handleSearchChange('')}
                                className="text-primary hover:underline font-medium self-start sm:self-auto cursor-pointer"
                            >
                                Bersihkan Pencarian
                            </button>
                        )}
                    </div>

                    {/* FAQ Accordion List */}
                    <div className="space-y-3">
                        {filteredFaqs.length === 0 ? (
                            <div className="p-8 text-center bg-white rounded-3xl border border-[#d8e6df] space-y-3">
                                <span className="material-symbols-outlined text-4xl text-[#8e9f99]">search_off</span>
                                <p className="text-sm font-medium text-[#192b27]">
                                    Tidak ditemukan pertanyaan yang cocok dengan "{searchQuery}".
                                </p>
                                <p className="text-xs text-[#5e716b]">
                                    Coba gunakan kata kunci lain atau hubungi tim konsultan medis kami secara langsung.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleSearchChange('')}
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white text-xs font-medium cursor-pointer"
                                >
                                    Reset Pencarian
                                </button>
                            </div>
                        ) : (
                            paginatedFaqs.map((item, idx) => {
                                const isOpen = openKey === item.q;
                                const globalIndex = (validCurrentPage - 1) * itemsPerPage + idx + 1;
                                const formattedIndex = globalIndex < 10 ? `0${globalIndex}.` : `${globalIndex}.`;

                                return (
                                    <div
                                        key={item.q}
                                        className={`rounded-2xl border transition-all duration-300 ease-in-out ${
                                            isOpen
                                                ? 'bg-white border-[#1c6454]/40 shadow-[0_4px_20px_rgba(0,40,36,0.04)]'
                                                : 'bg-white/85 border-[#dce7e1] hover:border-[#cfe0d6] hover:bg-white'
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(item.q)}
                                            className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-sm sm:text-base font-serif text-[#182926] cursor-pointer gap-4"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="flex items-start sm:items-center gap-3">
                                                <span className="text-xs font-mono text-[#1c6454] font-semibold mt-0.5 sm:mt-0 shrink-0">
                                                    {formattedIndex}
                                                </span>
                                                <span className="font-medium text-[#182926] leading-snug">
                                                    {item.q}
                                                </span>
                                            </span>
                                            <span
                                                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? 'bg-primary text-white rotate-180 shadow-2xs'
                                                        : 'bg-[#edf5f0] text-[#1c6454] rotate-0'
                                                }`}
                                            >
                                                <span className="material-symbols-outlined text-[18px] leading-none">
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
                                                <div className="px-5 pb-5 text-xs sm:text-sm text-[#4d605a] leading-relaxed border-t border-[#f0f5f2] pt-3.5 space-y-2">
                                                    <p>{item.a}</p>
                                                    <div className="pt-2 flex items-center gap-2 text-[10px] text-[#71857f] font-mono">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                                        <span>Kategori: {item.categoryLabel}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#dce7e1]">
                            <div className="text-xs text-[#5e716b]">
                                Halaman <strong className="text-[#192b27]">{validCurrentPage}</strong> dari <strong className="text-[#192b27]">{totalPages}</strong> (10 data per halaman)
                            </div>

                            <div className="flex items-center gap-1.5">
                                {/* Previous Page Button */}
                                <button
                                    type="button"
                                    disabled={validCurrentPage === 1}
                                    onClick={() => goToPage(validCurrentPage - 1)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                        validCurrentPage === 1
                                            ? 'opacity-40 cursor-not-allowed bg-white text-[#7d8f89] border border-[#dce5dd]'
                                            : 'bg-white text-[#2a403a] hover:bg-[#edf5f0] hover:text-primary border border-[#d2e2d8] cursor-pointer shadow-2xs'
                                    }`}
                                    aria-label="Halaman sebelumnya"
                                >
                                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                                    <span className="hidden sm:inline">Sebelumnya</span>
                                </button>

                                {/* Page Number Buttons */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        type="button"
                                        onClick={() => goToPage(pageNum)}
                                        className={`w-8.5 h-8.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                                            validCurrentPage === pageNum
                                                ? 'bg-primary text-white font-semibold shadow-2xs'
                                                : 'bg-white text-[#4e605b] hover:text-primary hover:bg-[#edf5f0] border border-[#d8e6df]'
                                        }`}
                                        aria-label={`Ke halaman ${pageNum}`}
                                        aria-current={validCurrentPage === pageNum ? 'page' : undefined}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                {/* Next Page Button */}
                                <button
                                    type="button"
                                    disabled={validCurrentPage === totalPages}
                                    onClick={() => goToPage(validCurrentPage + 1)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                                        validCurrentPage === totalPages
                                            ? 'opacity-40 cursor-not-allowed bg-white text-[#7d8f89] border border-[#dce5dd]'
                                            : 'bg-white text-[#2a403a] hover:bg-[#edf5f0] hover:text-primary border border-[#d2e2d8] cursor-pointer shadow-2xs'
                                    }`}
                                    aria-label="Halaman selanjutnya"
                                >
                                    <span className="hidden sm:inline">Selanjutnya</span>
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bottom Support Banner */}
                    <div className="p-6 sm:p-8 bg-primary text-white rounded-3xl shadow-[0_8px_30px_rgba(0,67,62,0.12)] space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1.5 max-w-lg">
                            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 text-[11px] text-[#d6ede2] border border-white/15">
                                <span className="material-symbols-outlined text-[14px]">support_agent</span>
                                <span>Layanan Konsultasi Klinis Siaga</span>
                            </div>
                            <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                                Masih memiliki pertanyaan spesifik mengenai biomarker Anda?
                            </h3>
                            <p className="text-xs sm:text-sm text-[#c8e6d8] leading-relaxed">
                                Diskusikan hasil skrining pemindai Anda bersama tim dokter konsultan IDI kami untuk mendapatkan panduan preventif yang presisi.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                            <Link
                                href="/member/consultations-hub"
                                className="px-5 py-2.5 rounded-full bg-white text-primary text-xs font-semibold hover:bg-[#f3f9f5] transition-all shadow-xs"
                            >
                                Hubungi Tim Dokter
                            </Link>
                            <Link
                                href="/"
                                className="px-4 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/15 transition-all border border-white/20"
                            >
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
