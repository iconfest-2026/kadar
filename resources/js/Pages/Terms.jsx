import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Terms(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState('all');

    const sections = [
        {
            id: 'pasal-1',
            number: 'Pasal 1',
            title: 'Penerimaan Syarat & Ketentuan Layanan',
            badge: 'Perjanjian Hukum',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Selamat datang di <strong>AEVYRA</strong> ("<strong>Platform</strong>", "<strong>Layanan</strong>"), yang dikelola dan dioperasikan oleh <strong>PT Aevyra Digital Medika</strong> ("<strong>Kami</strong>", "<strong>Perusahaan</strong>").
                    </p>
                    <p>
                        Dengan mendaftar, mengakses, mengunduh, atau menggunakan fitur-fitur di platform AEVYRA (termasuk paket Silver, Gold, Platinum, dan portal instruktur), Anda ("<strong>Pengguna</strong>", "<strong>Anda</strong>") menyatakan telah membaca, memahami, dan menyetujui untuk terikat secara hukum oleh Syarat dan Ketentuan Layanan ini ("<strong>Ketentuan</strong>").
                    </p>
                    <p className="text-xs text-[#52655f] italic">
                        Jika Anda tidak menyetujui salah satu, sebagian, atau seluruh isi dari Ketentuan ini, Anda tidak diperkenankan untuk mengakses atau menggunakan layanan AEVYRA.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-2',
            number: 'Pasal 2',
            title: 'Penafian Medis Esensial & Batasan Layanan Gawat Darurat',
            badge: 'Peringatan Kritis',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[#fff5f2] border border-[#f5cfc6] space-y-2">
                        <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[19px]">emergency</span>
                            <span>PEMBERITAHUAN KRUSIAL: BUKAN PENGGANTI INSTALASI GAWAT DARURAT (IGD)</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5f2317] leading-relaxed">
                            <strong>AEVYRA adalah platform pendamping preventif dan edukasi intervensi gaya hidup dini pra-diabetes.</strong> Layanan, asisten AI, kurva prediksi glukosa, dan skor HBE <strong>BUKAN</strong> merupakan diagnosis klinis akhir, resep terapi medis definitif, atau penanganan kondisi gawat darurat.
                        </p>
                    </div>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            Jika Anda mengalami gejala <strong>hipoglikemia akut</strong> (gula darah &lt; 50 mg/dL, keringat dingin, tremor hebat, kebingungan mental, penurunan kesadaran) atau <strong>krisis hiperglikemia</strong> (gula darah &gt; 350 mg/dL disertai sesak nafas dan muntah proyektil), segera tekan tombol <strong>Siaga Ambulan 119</strong> di platform kami atau segera menuju ke IGD rumah sakit terdekat.
                        </li>
                        <li>
                            Jangan pernah menunda, mengabaikan, atau menghentikan obat resep dokter resmi rumah sakit Anda hanya berdasarkan hasil kalkulasi skor atau algoritma di dalam platform ini.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-3',
            number: 'Pasal 3',
            title: 'Kelayakan Pengguna, Pendaftaran & Keamanan Kredensial',
            badge: 'Kelayakan Akun',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Untuk menggunakan Layanan AEVYRA, Anda wajib memenuhi persyaratan kelayakan sebagai berikut:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            <strong>Batas Usia:</strong> Berusia minimal 18 (delapan belas) tahun atau telah dewasa menurut hukum Republik Indonesia. Pengguna di bawah usia 18 tahun wajib didampingi oleh orang tua atau wali hukum yang sah.
                        </li>
                        <li>
                            <strong>Kebenaran Data:</strong> Wajib memberikan data identitas, usia, riwayat penyakit penyerta, dan metrik tubuh yang jujur, akurat, dan mutakhir saat proses pendaftaran dan pengisian kuesioner awal (<em>onboarding</em>).
                        </li>
                        <li>
                            <strong>Kerahasiaan Akun:</strong> Anda bertanggung jawab penuh atas keamanan kata sandi (<em>password</em>) akun Anda. Segala aktivitas yang terjadi melalui akun Anda dianggap sah sebagai tindakan Anda sendiri, kecuali Anda dapat membuktikan adanya peretasan pihak ketiga tanpa kelalaian Anda.
                        </li>
                    </ol>
                </div>
            ),
        },
        {
            id: 'pasal-4',
            number: 'Pasal 4',
            title: 'Penggunaan Pemindai Kamera Nutrisi & Basis Data BPOM',
            badge: 'AI & Visi Komputer',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Fitur Pemindai Kamera (<em>Live Open Cam Scanner</em>) memanfaatkan teknologi visi komputer dan pengenalan karakter optis (OCR) untuk memindai tabel Informasi Nilai Gizi kemasan makanan/minuman yang teregistrasi di Badan Pengawas Obat dan Makanan (BPOM RI):
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            Tingkat akurasi pembacaan karakter kemasan mencapai 98.4% pada kondisi pencahayaan memadai dan kemasan yang tidak robek/buram.
                        </li>
                        <li>
                            Estimasi beban glikemik (<em>Glycemic Load</em>) dihitung berdasarkan data sains nutrisi PERKENI dan International Tables of Glycemic Index.
                        </li>
                        <li>
                            Pengguna tetap bertanggung jawab untuk membaca label fisik kemasan secara mandiri sebelum mengonsumsi makanan, terutama bagi pengguna yang memiliki alergi makanan berat (alergen kacang, susu sapi, gluten, dll.).
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-5',
            number: 'Pasal 5',
            title: 'Hub Konsultasi Spesialis & Etika Telekesehatan',
            badge: 'Telekonsultasi Medis',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Platform AEVYRA memfasilitasi temu janji dan telekonsultasi virtual dengan dokter spesialis (Sp.PD, Sp.GK) dan instruktur kesehatan bersertifikat:
                    </p>
                    <div className="space-y-2.5">
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                Verifikasi Legalitas Praktisi
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Seluruh dokter mitra AEVYRA telah melewati uji kelayakan dengan memegang Surat Tanda Registrasi (STR) Konsil Kedokteran Indonesia dan Surat Izin Praktik (SIP) yang sah dan aktif.
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                Pembatalan &amp; Penjadwalan Ulang
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Pembatalan atau penyesuaian jadwal konsultasi wajib dilakukan sekurang-kurangnya 2 (dua) jam sebelum sesi berlangsung. Ketidakhadiran pengguna tanpa konfirmasi (<em>no-show</em>) menyebabkan kuota sesi tersebut dianggap telah terpakai.
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                Etika &amp; Tata Krama Virtual
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Pengguna dilarang melakukan pelecehan verbal, perekaman audio-visual ilegal tanpa persetujuan dokter, atau menuntut penerbitan surat sakit palsu dan obat-obatan terlarang/narkotika golongan daftar G.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'pasal-6',
            number: 'Pasal 6',
            title: 'Paket Keanggotaan, Pembayaran & Garansi Pengembalian Dana',
            badge: 'Biaya & Refund',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Ketentuan pembiayaan paket keanggotaan diatur dengan skema transparan sebagai berikut:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            <strong>Paket Silver (Gratis):</strong> Dapat diakses secara gratis selamanya tanpa kewajiban memasukkan nomor kartu kredit atau biaya tersembunyi.
                        </li>
                        <li>
                            <strong>Paket Gold &amp; Platinum:</strong> Berlaku skema langganan bulanan atau tahunan yang diproses melalui gateway pembayaran resmi terlisensi Bank Indonesia (QRIS, Transfer Virtual Account, Kartu Debit/Kredit).
                        </li>
                        <li>
                            <strong>Garansi 14 Hari (Money-Back Guarantee):</strong> Untuk paket berbayar baru pertama kali, Anda berhak mengajukan pengembalian dana 100% dalam waktu 14 hari kalender sejak aktivasi jika layanan pendampingan tidak sesuai dengan spesifikasi yang dijanjikan, dengan syarat sesi konsultasi dokter belum pernah diklaim.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-7',
            number: 'Pasal 7',
            title: 'Pedoman Komunitas & Larangan Perilaku Pengguna',
            badge: 'Integritas Komunitas',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Dalam menggunakan Forum Komunitas dan interaksi antar-pengguna, Anda dilarang keras untuk:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>Menyebarkan informasi kesehatan hoaks, mitos medis berbahaya, atau klaim kesembuhan diabetes instan tanpa bukti ilmiah peer-reviewed.</li>
                        <li>Mempromosikan, menjual, atau menawarkan suplemen ilegal, ramuan tanpa izin edar BPOM, atau zat berbahaya lainnya.</li>
                        <li>Melakukan perundungan (<em>cyberbullying</em>), ujaran kebencian, diskriminasi SARA, atau pelecehan terhadap pasien lain.</li>
                        <li>Mengunggah data medis pribadi milik orang lain tanpa persetujuan tertulis eksplisit dari yang bersangkutan.</li>
                    </ul>
                    <p className="text-xs text-[#52655f]">
                        Moderator klinis AEVYRA berhak menghapus konten yang melanggar dan membekukan akun yang bersangkutan tanpa pemberitahuan sebelumnya.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-8',
            number: 'Pasal 8',
            title: 'Hak Kekayaan Intelektual (HAKI)',
            badge: 'Hak Cipta',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Seluruh hak kekayaan intelektual atas platform AEVYRA — termasuk namun tidak terbatas pada nama merek, logo AEVYRA, desain antarmuka (UI/UX), arsitektur algoritma Health Baseline Engine (HBE), database glikemik pangan terkompilasi, kode sumber peranti lunak, dan materi edukasi grafis — adalah milik eksklusif <strong>PT Aevyra Digital Medika</strong> yang dilindungi oleh Undang-Undang Hak Cipta dan Undang-Undang Merek Republik Indonesia.
                    </p>
                    <p>
                        Pengguna dilarang menyalin, merekayasa balik (<em>reverse-engineer</em>), memodifikasi, mendistribusikan, atau mengeksploitasi materi intelektual platform untuk tujuan komersial tanpa izin tertulis dari manajemen AEVYRA.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-9',
            number: 'Pasal 9',
            title: 'Pembatasan Tanggung Jawab Hukum (Limitation of Liability)',
            badge: 'Batasan Legalitas',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Sejauh yang diperkenankan oleh hukum yang berlaku di Republik Indonesia:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            AEVYRA tidak bertanggung jawab atas kerugian langsung maupun tidak langsung akibat ketidakakuratan data mandiri yang dimasukkan oleh Pengguna ke dalam sistem.
                        </li>
                        <li>
                            AEVYRA tidak bertanggung jawab atas kegagalan teknis peramban, sambungan internet pihak penyedia telekomunikasi Pengguna, atau keterlambatan respon darurat dari pihak ketiga (faskes/ambulans daerah).
                        </li>
                        <li>
                            Total liabilitas finansial maksimum AEVYRA kepada Pengguna atas setiap klaim hukum terbatas pada jumlah biaya yang telah dibayarkan oleh Pengguna untuk paket keanggotaan dalam kurun waktu 3 (tiga) bulan terakhir sebelum klaim diajukan.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-10',
            number: 'Pasal 10',
            title: 'Hukum yang Mengatur & Penyelesaian Sengketa',
            badge: 'Yurisdiksi Hukum',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Ketentuan ini tunduk dan ditafsirkan semata-mata berdasarkan hukum <strong>Negara Kesatuan Republik Indonesia</strong>.
                    </p>
                    <p>
                        Segala sengketa atau perselisihan yang timbul dari atau sehubungan dengan Ketentuan ini terlebih dahulu akan diselesaikan secara musyawarah untuk mufakat dalam jangka waktu 30 (tiga puluh) hari kalender. Apabila musyawarah tidak mencapai kesepakatan, maka sengketa akan diselesaikan secara final melalui yurisdiksi Pengadilan Negeri Jakarta Selatan atau Badan Arbitrase Nasional Indonesia (BANI).
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-11',
            number: 'Pasal 11',
            title: 'Perubahan Ketentuan & Kontak Bantuan Hukum',
            badge: 'Amandemen & Kontak',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Kami berhak memperbarui atau merevisi Ketentuan Layanan ini sewaktu-waktu untuk menyesuaikan dengan regulasi medis terbaru Kementerian Kesehatan RI atau pembaruan fitur platform. Perubahan substansial akan diumumkan melalui notifikasi dalam dasbor atau pemberitahuan email resmi 14 hari sebelum tanggal efektif baru.
                    </p>
                    <div className="p-4 rounded-2xl bg-white border border-[#dbe8e1] space-y-2 text-xs sm:text-sm mt-3">
                        <span className="font-bold text-primary block">Kontak Bantuan &amp; Konseling Legal:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#475b55]">
                            <div>
                                <span className="font-semibold block">Divisi Kepatuhan Hukum:</span>
                                <span>PT Aevyra Digital Medika Legal Desk</span>
                            </div>
                            <div>
                                <span className="font-semibold block">Surel Departemen Legal:</span>
                                <a href="mailto:legal@aevyra.health" className="text-primary hover:underline font-mono">
                                    legal@aevyra.health
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    const filteredSections = useMemo(() => {
        return sections.filter((sec) => {
            if (activeSection !== 'all' && sec.id !== activeSection) return false;
            if (searchQuery.trim() === '') return true;
            const query = searchQuery.toLowerCase();
            return (
                sec.title.toLowerCase().includes(query) ||
                sec.number.toLowerCase().includes(query) ||
                sec.badge.toLowerCase().includes(query)
            );
        });
    }, [activeSection, searchQuery]);

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <MarketingLayout {...props}>
            <Head title="Syarat &amp; Ketentuan Layanan (Terms of Service) - AEVYRA" />

            <div className="relative w-full overflow-hidden bg-[#f7faf8] py-8 sm:py-12 lg:py-16">
                {/* Diffused Natural Light Blooms */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-150 max-w-[90vw] h-87.5 bg-linear-to-b from-[#e3f0e9]/70 via-[#edf6f1]/40 to-transparent blur-3xl rounded-full"
                />

                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-[#586b65]">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Beranda
                        </Link>
                        <span>/</span>
                        <span className="text-[#192b27] font-medium">Syarat &amp; Ketentuan Layanan</span>
                    </nav>

                    {/* Page Header */}
                    <div className="space-y-3.5 border-b border-surface-container-high pb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-on-surface border border-[#d6e7dc] text-[11px] text-primary font-medium tracking-wide w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                            <span>Perjanjian Pengguna Layanan Kesehatan Preventif • Terakhir Diperbarui 2026</span>
                        </div>
                        <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight">
                            Syarat &amp; Ketentuan Penggunaan Platform AEVYRA.
                        </h1>
                        <p className="text-[11px] sm:text-base text-[#4a5e57] max-w-3xl leading-relaxed">
                            Panduan legal, batasan tanggung jawab medis, etika telekonsultasi dokter, kebijakan keanggotaan paket, dan hak serta kewajiban pengguna dalam ekosistem intervensi dini pra-diabetes.
                        </p>

                        {/* Metadata Strip */}
                        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-[#61746e]">
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Berlaku Efektif: <strong>1 Januari 2026</strong>
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Yurisdiksi: <strong>Hukum Republik Indonesia</strong>
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Standar: <strong>Etika Telemedis KKI &amp; Kemenkes</strong>
                            </span>
                        </div>
                    </div>

                    {/* Quick Highlights: 4 Hal Pokok Ketentuan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">medical_services</span>
                            </div>
                            <h3 className="text-xs font-bold text-[#1e322d]">Bukan IGD Rumah Sakit</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Platform preventif edukatif, bukan penanganan gawat darurat atau resep obat mutlak.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Dokter Terverifikasi STR</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Seluruh mitra klinisi memiliki STR resmi Konsil Kedokteran Indonesia dan izin praktek aktif.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Garansi Uang Kembali 14 Hari</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Jaminan pengembalian dana 100% untuk langganan baru jika belum memanfaatkan sesi dokter.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">gavel</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Bebas Hoaks &amp; Spam</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Larangan mutlak promosi obat tanpa izin BPOM dan klaim penyembuhan non-ilmiah di komunitas.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Filter Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="relative w-full sm:w-80">
                            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#637770]">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari pasal, disclaimer medis, refund..."
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#cde0d5] text-xs text-[#1e312d] placeholder:text-[#839790] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-xs"
                            />
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                            <button
                                type="button"
                                onClick={() => setActiveSection('all')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                                    activeSection === 'all'
                                        ? 'bg-primary text-white shadow-2xs'
                                        : 'bg-white border border-[#d5e4dc] text-[#4a5e58] hover:bg-[#edf5f0]'
                                }`}
                            >
                                Semua Bab ({sections.length})
                            </button>
                            <Link
                                href="/privacy"
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#d5e4dc] text-primary hover:bg-[#edf5f0] transition-all whitespace-nowrap inline-flex items-center gap-1"
                            >
                                <span>Buka Kebijakan Privasi (UU PDP)</span>
                                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Layout: Sidebar Table of Contents + Content Stream */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                        {/* Desktop Sticky Index Nav */}
                        <div className="hidden lg:block lg:col-span-4 sticky top-20 bg-white border border-[#dbe8e1] rounded-2xl p-4 shadow-xs space-y-2">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block border-b border-[#edf4f0] pb-2">
                                Daftar Pasal Ketentuan
                            </span>
                            <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                                {sections.map((sec) => (
                                    <button
                                        key={sec.id}
                                        type="button"
                                        onClick={() => scrollToSection(sec.id)}
                                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                                            activeSection === sec.id
                                                ? 'bg-[#edf5f0] text-primary font-bold border border-[#cde0d5]'
                                                : 'text-[#475b55] hover:bg-[#f3f8f5]'
                                        }`}
                                    >
                                        <div className="truncate pr-2">
                                            <span className="font-mono text-[10px] text-primary block">{sec.number}</span>
                                            <span className="truncate">{sec.title}</span>
                                        </div>
                                        <span className="material-symbols-outlined text-[14px] text-[#8aa098] shrink-0">
                                            chevron_right
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Stream */}
                        <div className="lg:col-span-8 space-y-5">
                            {filteredSections.map((sec) => (
                                <article
                                    key={sec.id}
                                    id={sec.id}
                                    className="p-5 sm:p-6 rounded-3xl bg-white border border-[#dce9e2] shadow-xs space-y-3.5 transition-all hover:border-[#bcd6c8]"
                                >
                                    <div className="flex items-center justify-between border-b border-[#edf4f0] pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 rounded-md bg-[#edf5f0] text-primary font-mono text-[11px] font-bold">
                                                {sec.number}
                                            </span>
                                            <h2 className="text-base sm:text-lg font-bold text-[#1a2c28]">
                                                {sec.title}
                                            </h2>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container text-[#5b6f69] font-medium shrink-0">
                                            {sec.badge}
                                        </span>
                                    </div>
                                    <div>{sec.content}</div>
                                </article>
                            ))}

                            {filteredSections.length === 0 && (
                                <div className="p-8 text-center bg-white rounded-3xl border border-[#dce9e2] space-y-2">
                                    <span className="material-symbols-outlined text-4xl text-[#8fa59d]">
                                        search_off
                                    </span>
                                    <h3 className="text-sm font-bold text-[#1f322d]">Tidak ada ketentuan yang cocok</h3>
                                    <p className="text-xs text-[#52655f]">
                                        Coba kata kunci lain atau bersihkan kotak pencarian di atas.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery('');
                                            setActiveSection('all');
                                        }}
                                        className="text-xs text-primary font-medium underline mt-2 cursor-pointer"
                                    >
                                        Tampilkan Semua Bab
                                    </button>
                                </div>
                            )}

                            {/* Official Legal Desk Help Card */}
                            <div className="p-6 rounded-3xl bg-linear-to-br from-[#edf5f0] to-[#e4efe8] border border-[#cbe0d4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-primary">Butuh Informasi Legalitas Lebih Lanjut?</h3>
                                    <p className="text-xs text-[#445b54] max-w-md">
                                        Tim Legal &amp; Regulasi Kesehatan AEVYRA siap membantu klarifikasi klausul perjanjian, verifikasi STR dokter, atau kebijakan pengembalian dana.
                                    </p>
                                </div>
                                <a
                                    href="mailto:legal@aevyra.health"
                                    className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all shadow-xs shrink-0 inline-flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">mail</span>
                                    <span>Hubungi Departemen Legal</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
