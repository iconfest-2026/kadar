import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import MarketingLayout from '../Layouts/MarketingLayout';

export default function Privacy(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState('all');

    const sections = [
        {
            id: 'pasal-1',
            number: 'Pasal 1',
            title: 'Landasan Hukum & Komitmen Privasi',
            badge: 'Regulasi',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Kebijakan Privasi ini merupakan wujud kepatuhan PT Aevyra Digital Medika ("<strong>AEVYRA</strong>", "<strong>Kami</strong>") terhadap peraturan perundang-undangan perlindungan data yang berlaku di Republik Indonesia, khususnya:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li><strong>Undang-Undang No. 27 Tahun 2022</strong> tentang Pelindungan Data Pribadi (UU PDP).</li>
                        <li><strong>Undang-Undang No. 17 Tahun 2023</strong> tentang Kesehatan.</li>
                        <li><strong>Peraturan Menteri Kesehatan RI No. 24 Tahun 2022</strong> tentang Rekam Medis Elektronik.</li>
                        <li><strong>Peraturan Pemerintah No. 71 Tahun 2019</strong> tentang Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE).</li>
                    </ul>
                    <p>
                        Kami memandang data kesehatan dan rekam biomarker sebagai data spesifik yang bersifat sangat rahasia. Kebijakan ini menjelaskan secara transparan bagaimana kami mengumpulkan, menyimpan, mengenkripsi, memproses, dan melindungi data pribadi Anda saat menggunakan platform web AEVYRA.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-2',
            number: 'Pasal 2',
            title: 'Definisi Istilah & Terminologi Legal',
            badge: 'Definisi',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>Dalam Kebijakan Privasi ini, istilah-istilah di bawah ini memiliki makna sebagai berikut:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-3 rounded-2xl bg-white border border-[#dbe8e1] space-y-1">
                            <span className="text-xs font-bold text-primary block">Subjek Data Pribadi</span>
                            <p className="text-xs text-[#52655f]">
                                Orang perseorangan yang pada dirinya melekat Data Pribadi, dalam hal ini adalah pengguna terdaftar atau pengunjung platform AEVYRA.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-[#dbe8e1] space-y-1">
                            <span className="text-xs font-bold text-primary block">Pengendali Data Pribadi</span>
                            <p className="text-xs text-[#52655f]">
                                PT Aevyra Digital Medika yang menentukan tujuan dan kendali pemrosesan Data Pribadi di dalam ekosistem sistem.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-[#dbe8e1] space-y-1">
                            <span className="text-xs font-bold text-primary block">Data Pribadi Umum</span>
                            <p className="text-xs text-[#52655f]">
                                Data nama lengkap, alamat surel (email), nomor telepon seluler, dan data login kredensial akun.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white border border-[#dbe8e1] space-y-1">
                            <span className="text-xs font-bold text-primary block">Data Pribadi Spesifik (Sensitif)</span>
                            <p className="text-xs text-[#52655f]">
                                Data dan informasi kesehatan, riwayat glukosa darah, estimasi HbA1c, tensi darah, data siklus hormonal wanita, dan catatan konsultasi klinis.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'pasal-3',
            number: 'Pasal 3',
            title: 'Kategori Data Pribadi yang Dikumpulkan',
            badge: 'Klasifikasi Data',
            content: (
                <div className="space-y-4 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Kami membatasi pengumpulan data hanya pada informasi yang relevan dan dibutuhkan secara medis untuk program pencegahan dan intervensi dini pra-diabetes:
                    </p>
                    <div className="space-y-2.5">
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                1. Data Identitas &amp; Profil Akun
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Nama lengkap, nama tampilan publik, alamat email, usia, tinggi badan, berat badan saat ini, jenis kelamin biologis, serta target kebugaran metabolik harian.
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                2. Data Biometrik &amp; Catatan Kesehatan HBE (Health Baseline Engine)
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Nilai glukosa darah kapiler (mg/dL), jam tidur dan kualitas istirahat, asupan air minum harian (ml), jumlah langkah kaki, denyut nadi, dan catatan siklus fase bulanan (khusus profil wanita).
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                3. Data Citra Pemindai Kamera Label Pangan &amp; Obat BPOM
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Foto tangkapan kamera dari label kemasan makanan/minuman yang diunggah untuk diekstraksi nilai gram gula bebas, natrium, dan beban glikemik. Gambar diproses secara otomatis oleh sistem visi komputer dan tidak dipublikasikan ke pihak luar.
                            </p>
                        </div>
                        <div className="p-3.5 rounded-2xl bg-white border border-[#dbe8e1]">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                                4. Rekam Telekonsultasi &amp; Catatan Instruktur Medis
                            </h4>
                            <p className="text-xs text-[#52655f]">
                                Catatan klinis, saran dietetik, dan rekomendasi intervensi gaya hidup yang diberikan oleh dokter spesialis (Sp.PD/Sp.GK) atau instruktur berlisensi selama sesi konsultasi terjadwal.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'pasal-4',
            number: 'Pasal 4',
            title: 'Dasar Pemrosesan & Tujuan Pemanfaatan Data',
            badge: 'Tujuan Pemrosesan',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Sesuai Pasal 20 UU PDP, pemrosesan Data Pribadi dilakukan atas dasar <strong>Persetujuan Eksplisit yang Sah</strong> yang Anda berikan saat mendaftar dan menyetujui ketentuan ini. Data dimanfaatkan untuk tujuan:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>Menghitung estimasi kurva lonjakan glukosa darah 2 jam pasca-makan berdasarkan pangan yang Anda konsumsi.</li>
                        <li>Menyajikan rekomendasi gaya hidup adaptif AI (pola hidrasi, jam tidur, aktivitas ringan pasca-karbohidrat tinggi).</li>
                        <li>Memfasilitasi pemantauan klinis oleh dokter spesialis atau instruktur pendamping pilihan Anda.</li>
                        <li>Mengirimkan notifikasi pengingat minum obat, log glukosa, dan status partisipasi tantangan remisi 90 hari.</li>
                        <li>Penyusunan statistik anonim (teragregasi tanpa identitas personal) untuk riset pencegahan prevalensi pra-diabetes nasional.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-5',
            number: 'Pasal 5',
            title: 'Hak-Hak Anda sebagai Subjek Data Pribadi (UU PDP)',
            badge: 'Hak Anda',
            content: (
                <div className="space-y-4 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Berdasarkan Bab IV Pasal 5 hingga Pasal 13 UU No. 27 Tahun 2022, Anda selaku Subjek Data memiliki hak-hak yang kami lindungi sepenuhnya:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">1. Hak Kejelasan &amp; Informasi (Pasal 5)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak memperoleh informasi lengkap tentang identitas pengendali, dasar legalitas, dan akuntabilitas pemrosesan data Anda.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">2. Hak Akses &amp; Salinan Data (Pasal 6)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak meminta dan mengunduh salinan seluruh riwayat biomarker dan log medis dalam format terstruktur (JSON/PDF).
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">3. Hak Memperbaiki Kesalahan (Pasal 7)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak melengkapi, memperbarui, atau memperbaiki kekeliruan data profil dan riwayat catatan yang tidak akurat.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">4. Hak Menghapus / Pemusnahan (Pasal 8)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak mengakhiri pemrosesan dan meminta pemusnahan total data Anda (<em>Right to Erasure</em>) dari server aktif kami.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">5. Hak Menarik Persetujuan (Pasal 9)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak menarik kembali persetujuan pemrosesan Data Pribadi yang sebelumnya telah Anda berikan kepada AEVYRA.
                            </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-[#edf5f0] border border-[#d2e5da] space-y-1">
                            <span className="text-xs font-bold text-primary block">6. Hak Portabilitas Data (Pasal 13)</span>
                            <p className="text-xs text-[#486058]">
                                Berhak mentransfer riwayat data kesehatan Anda ke fasilitas kesehatan atau penyedia layanan lain yang kompatibel.
                            </p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'pasal-6',
            number: 'Pasal 6',
            title: 'Jaminan Anti-Komersialisasi & Penjualan Data',
            badge: 'Jaminan Mutlak',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[#fff8f6] border border-[#f5d5ce] space-y-2">
                        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[18px]">verified_user</span>
                            <span>Prinsip Etika Kedokteran &amp; Janji Perlindungan Pasien</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5f2b23]">
                            <strong>AEVYRA TIDAK PERNAH dan TIDAK AKAN PERNAH</strong> menjual, menyewakan, meminjamkan, atau memperdagangkan Data Pribadi maupun Rekam Biomarker Anda kepada perusahaan asuransi komersial, biro broker data, pemasar obat bebas, atau agensi periklanan pihak ketiga dengan alasan apapun.
                        </p>
                    </div>
                    <p>
                        Data kesehatan Anda hanya dapat diakses oleh dokter spesialis atau instruktur yang Anda tunjuk secara sukarela di dalam platform untuk keperluan konsultasi klinis, dan hanya dapat dibuka kepada otoritas hukum berwenang apabila diwajibkan secara tegas oleh undang-undang atau perintah pengadilan Republik Indonesia yang berkekuatan hukum tetap.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-7',
            number: 'Pasal 7',
            title: 'Standar Keamanan Siber & Enkripsi AES-256',
            badge: 'Teknologi Keamanan',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Untuk menjaga integritas dan kerahasiaan Data Pribadi terhadap akses tanpa hak, pengubahan, atau kebocoran data, kami menerapkan standar keamanan berlapis:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#465b55]">
                        <li>
                            <strong>Enkripsi Data saat Transit (In-Transit):</strong> Seluruh pertukaran data antara peramban (browser) Anda dan server kami dienkripsi menggunakan protokol Transport Layer Security (TLS 1.3) berkekuatan tinggi.
                        </li>
                        <li>
                            <strong>Enkripsi Data saat Disimpan (At-Rest):</strong> Database rekam medis dan data sensitif dilindungi menggunakan algoritma enkripsi Advanced Encryption Standard (AES-256-GCM).
                        </li>
                        <li>
                            <strong>Pseudonimisasi &amp; Pemisahan Tabel:</strong> Rekam biomarker glukosa disimpan terpisah secara logis dari tabel identitas personal (PII) untuk mencegah rekonstruksi data jika terjadi anomali teknis.
                        </li>
                        <li>
                            <strong>Audit Kepatuhan &amp; Uji Penetrasi:</strong> Peninjauan keamanan dan pemindaian kerentanan sistem dilakukan secara berkala sesuai standar ISO/IEC 27001 dan regulasi BSSN RI.
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-8',
            number: 'Pasal 8',
            title: 'Interoperabilitas Ekosistem SatuSehat Kemenkes RI',
            badge: 'Kemenkes RI',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Format pencatatan data kesehatan di AEVYRA dirancang selaras dengan standar terminologi <strong>HL7 FHIR</strong> (<em>Fast Healthcare Interoperability Resources</em>) yang ditetapkan Kementerian Kesehatan Republik Indonesia.
                    </p>
                    <p>
                        Penyaluran resume remisi metabolik atau ringkasan konsultasi ke akun <strong>SatuSehat ID</strong> Anda hanya akan berlangsung jika Anda secara sadar mengaktifkan fitur integrasi SatuSehat dan memberikan persetujuan otorisasi digital. Anda dapat mencabut integrasi ini sewaktu-waktu tanpa memengaruhi akses fitur esensial platform.
                    </p>
                </div>
            ),
        },
        {
            id: 'pasal-9',
            number: 'Pasal 9',
            title: 'Masa Retensi & Prosedur Penghapusan Akun',
            badge: 'Retensi Data',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Data pribadi Anda akan disimpan selama akun Anda aktif dan Anda terus memanfaatkan layanan AEVYRA. Sesuai Permenkes No. 24 Tahun 2022, rekam medis elektronik disimpan sekurang-kurangnya selama 5 (lima) tahun terhitung sejak tanggal terakhir pasien berobat/berkonsultasi.
                    </p>
                    <p>
                        Jika Anda ingin menghapus seluruh data Anda dari sistem sebelum batas masa retensi:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>Kirimkan permohonan tertulis melalui email resmi ke <code>dpo@aevyra.health</code> dengan subjek "Permohonan Penghapusan Data Pribadi (Right to Erasure)".</li>
                        <li>Tim Kepatuhan DPO kami akan melakukan verifikasi identitas kepemilikan akun dalam 1x24 jam.</li>
                        <li>Setelah terverifikasi, data identitas personal dan kredensial login Anda akan dihapus secara permanen dari server aktif kami dalam waktu maksimal 3x24 jam kerja.</li>
                    </ol>
                </div>
            ),
        },
        {
            id: 'pasal-10',
            number: 'Pasal 10',
            title: 'Prosedur Insiden Siber & Pemberitahuan Kebocoran Data',
            badge: 'Mitigasi Insiden',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Sesuai amanat Pasal 46 UU PDP, apabila dalam keadaan kahar atau serangan siber tak terduga terjadi insiden kegagalan pelindungan Data Pribadi:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#465b55]">
                        <li>Kami wajib menyampaikan pemberitahuan tertulis kepada Subjek Data dan Lembaga Pelindungan Data Pribadi dalam waktu maksimal <strong>3 x 24 jam</strong> sejak insiden terkonfirmasi.</li>
                        <li>Pemberitahuan mencakup rincian kategori data yang terdampak, langkah pemulihan dan penanggulangan yang telah ditempuh, serta rekomendasi mitigasi yang dapat dilakukan oleh pengguna.</li>
                    </ul>
                </div>
            ),
        },
        {
            id: 'pasal-11',
            number: 'Pasal 11',
            title: 'Pejabat Pelindung Data Pribadi (DPO) & Kontak Pengaduan',
            badge: 'Kontak Resmi',
            content: (
                <div className="space-y-3 text-sm text-[#3b4e49] leading-relaxed">
                    <p>
                        Untuk pertanyaan, pelaksanaan hak subjek data, atau pelaporan kekhawatiran terkait privasi data Anda, silakan menghubungi <em>Data Protection Officer (DPO)</em> resmi AEVYRA:
                    </p>
                    <div className="p-4 rounded-2xl bg-white border border-[#dbe8e1] space-y-2 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#475b55]">
                            <div>
                                <span className="font-bold text-primary block">Unit Kepatuhan:</span>
                                <span>Kantor Pejabat Pelindung Data Pribadi (DPO)</span>
                            </div>
                            <div>
                                <span className="font-bold text-primary block">Surel Kepatuhan Privasi:</span>
                                <a href="mailto:dpo@aevyra.health" className="text-primary hover:underline font-mono">
                                    dpo@aevyra.health
                                </a>
                            </div>
                            <div>
                                <span className="font-bold text-primary block">Dukungan Pengguna:</span>
                                <a href="mailto:care@aevyra.health" className="text-primary hover:underline font-mono">
                                    care@aevyra.health
                                </a>
                            </div>
                            <div>
                                <span className="font-bold text-primary block">Alamat Kantor Operasional:</span>
                                <span>AEVYRA Health Innovation Hub, Jakarta Selatan, DKI Jakarta 12950</span>
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
            <Head title="Kebijakan Privasi &amp; Perlindungan Data Pribadi (UU PDP No. 27/2022) - AEVYRA" />

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
                        <span className="text-[#192b27] font-medium">Kebijakan Privasi (UU PDP)</span>
                    </nav>

                    {/* Page Header */}
                    <div className="space-y-3.5 border-b border-surface-container-high pb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-inverse-on-surface border border-[#d6e7dc] text-[11px] text-primary font-medium tracking-wide w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1c6454]"></span>
                            <span>Kepatuhan Regulasi Nasional • UU No. 27 Tahun 2022 &amp; Permenkes No. 24/2022</span>
                        </div>
                        <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-normal text-[#142320] leading-tight">
                            Kebijakan Privasi &amp; Pelindungan Data Medis Pribadi.
                        </h1>
                        <p className="text-[11px] sm:text-base text-[#4a5e57] max-w-3xl leading-relaxed">
                            Penjelasan transparan dan menyeluruh mengenai tata kelola pengumpulan, pemrosesan, perlindungan enkripsi AES-256, serta hak-hak hukum Anda selaku subjek data kesehatan di platform AEVYRA.
                        </p>

                        {/* Metadata Strip */}
                        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-[#61746e]">
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Versi Dokumen: <strong>v2.4 (Terakhir Diperbarui 2026)</strong>
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Standar Enkripsi: <strong>AES-256-GCM / TLS 1.3</strong>
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-surface-container border border-[#d9e7e0]">
                                Kepatuhan: <strong>UU PDP No. 27/2022</strong>
                            </span>
                        </div>
                    </div>

                    {/* Quick Highlights: 4 Pilar Kepatuhan Privasi AEVYRA */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">lock</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Enkripsi Medis AES-256</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Seluruh rekam glukosa dan biomarker terenkripsi saat diam maupun dalam perjalanan.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">block</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Bebas Jual-Beli Data</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Tidak ada pembagian atau komersialisasi data kepada perusahaan asuransi atau pengiklan.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Hak Kendali Penuh</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Hak mengunduh salinan data (ekspor), mengoreksi, dan menghapus akun mandiri sewaktu-waktu.
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-[#d9e7e0] shadow-xs space-y-1.5">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                            </div>
                            <h3 className="text-xs font-bold text-primary">Standar SatuSehat</h3>
                            <p className="text-[11px] text-[#556963] leading-relaxed">
                                Format interoperabilitas data sesuai protokol HL7 FHIR resmi Kementerian Kesehatan RI.
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
                                placeholder="Cari pasal, kata kunci, hak data..."
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
                                href="/terms"
                                className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#d5e4dc] text-primary hover:bg-[#edf5f0] transition-all whitespace-nowrap inline-flex items-center gap-1"
                            >
                                <span>Buka Syarat &amp; Ketentuan</span>
                                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content Layout: Sidebar Table of Contents + Content Stream */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
                        {/* Desktop Sticky Index Nav */}
                        <div className="hidden lg:block lg:col-span-4 sticky top-20 bg-white border border-[#dbe8e1] rounded-2xl p-4 shadow-xs space-y-2">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block border-b border-[#edf4f0] pb-2">
                                Daftar Pasal Kebijakan
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
                                    <h3 className="text-sm font-bold text-[#1f322d]">Tidak ada pasal yang cocok</h3>
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
                                        Tampilkan Semua Pasal
                                    </button>
                                </div>
                            )}

                            {/* Official DPO Help Card */}
                            <div className="p-6 rounded-3xl bg-linear-to-br from-[#edf5f0] to-[#e4efe8] border border-[#cbe0d4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-primary">Punya Pertanyaan Mengenai Hak Data Anda?</h3>
                                    <p className="text-xs text-[#445b54] max-w-md">
                                        Pejabat Pelindung Data Pribadi (DPO) kami siap melayani klarifikasi legalitas, permintaan ekspor data, atau permohonan penghapusan riwayat medis.
                                    </p>
                                </div>
                                <a
                                    href="mailto:dpo@aevyra.health"
                                    className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-medium hover:bg-primary-container transition-all shadow-xs shrink-0 inline-flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-[16px]">mail</span>
                                    <span>Hubungi Tim DPO</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
