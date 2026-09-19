# AEVYRA — UX/UI Design System & Interaction Architecture (Spesifikasi Desain Antarmuka & Pengalaman Pengguna)

> Dokumen spesifikasi arsitektur komprehensif untuk **Pengalaman Pengguna (*User Experience / UX*)**, **Desain Antarmuka (*User Interface / UI*)**, dan **Sistem Desain Visual (*Visual Design System*)** platform AEVYRA. Dokumen ini mendefinisikan filosofi desain berpusat pada manusia (*Human-Centered Design*), model interaksi preventif lingkaran tertutup (*Observe, Understand, Act, Monitor, Improve*), hierarki prioritas UX (Keselamatan > Kejelasan > Aksesibilitas > Tugas > Estetika), arsitektur informasi dan hierarki kognitif layar, prinsip pengungkapan bertahap (*Progressive Disclosure*), reduksi beban kognitif, fokus satu tindakan utama tunggal (*One Primary Action*), arsitektur sistem navigasi responsif berbasis peran (*Member, Instructor, Admin*), penegasan identitas ruang kerja (*Workspace Identity*), sistem kisi tata letak 12 kolom, skala spasi kanonikal kelipatan 8 (*8-point Spacing Scale*), hierarki kontainer kartu (*Primary, Secondary, Muted*), filosofi dasbor berbasis tindakan preventif, sapaan empatis kontekstual, kartu wawasan tren utama, pusat akses cepat tindakan (*Quick Actions Hub*), alur pencatatan biometrik minim gesekan, prinsip formulir masukan dengan kejelasan label permanen dan visibilitas satuan kanonikal, validasi interaktif sebaris (*Inline Validation*), penanganan status pemuatan data (*Loading*), kerangka tulang berdenyut (*Skeleton Shimmer*), status ruang data kosong (*Empty States*), penanganan galat ramah (*Error Handling*), mode luring dan visualisasi status sinkronisasi data lokal (*Offline & Sync States PWA*), interaktivitas tombol 6 status, perlakuan tombol nonaktif dengan teks bantuan, dialog konfirmasi sadar, perlindungan tindakan destruktif, notifikasi melayang (*Toast*) dan umpan balik sebaris (*Inline Alerts*), pedoman modal terfokus dan panel laci samping (*Drawer*), fondasi sistem tipografi modern dan skala hierarki terpadu (Plus Jakarta Sans / Inter), standar keterbacaan teks bodi minimal 14px, sistem palet warna terkalibrasi (Teal, Slate, Indigo), semantik warna fungsional netral non-menakut-nakuti, kepatuhan rasio kontras aksesibilitas WCAG 2.1 Level AA, adaptasi tema gelap (*Dark Mode*), sistem ikonografi baku dan tombol ikon aksesibel, pustaka komponen modular mandiri, koleksi komponen khusus kesehatan, komponen antarmuka cerdas AI, komponen ruang instruktur, komponen dasbor admin, terminologi status sistem seragam, terminologi sinyal deviasi perilaku, desain kartu wawasan 4 elemen, penyajian bukti data pendukung wawasan, filosofi visualisasi grafik biometrik untuk menjawab pertanyaan, visualisasi garis acuan normal pengguna (*Baseline Reference Chart*), pencegahan grafik informasi berlebih, aksesibilitas grafik data (ringkasan teks sebaris dan tabel alternatif), indikator tren teks, visualisasi kemajuan sasaran tanpa angka presisi desimal semu, diksi kemajuan tanpa menghakimi, antarmuka sesi obrolan asisten AI, transparansi persona AI, rekomendasi pertanyaan awal pintar (*Prompt Chips*), dialog konfirmasi eksekusi alat sistem oleh AI (*Tool Confirmation*), penafian keselamatan AI permanen, alur pengalihan kasus ke staf manusia (*Human Handoff*), pengalaman pemindai visual kamera makanan 6 tahap, tata letak bingkai bidik (*Viewfinder*), edukasi izin kamera perangkat ramah, penyajian hasil estimasi zat gizi, penanganan pemindaian meragukan (*Scanner Low Confidence*), konfirmasi draf rekam biologis, alur penjadwalan bimbingan 5 langkah, kalender ketersediaan sesi, bukti konfirmasi pemesanan, pengingat jadwal bimbingan ramah, tata letak dasbor kerja instruktur 4 kuadran, antrean sinyal deviasi klien, tampilan profil anggota berbasis tab horizontal, formulir perancangan intervensi instruktur, dasbor pemantauan operasional administrator, tabel data terstruktur, perlindungan tabel rekam medis sensitif, tabel jejak audit forensik kekal, penanganan kolom masukan sensitif, pusat pengaturan privasi terpadu (7 menu), bahasa kebijakan privasi transparan, permintaan izin perangkat kontekstual (*In-Context*), edukasi izin notifikasi push, pengalaman akses bantuan darurat medis cepat, penempatan tombol darurat cepat, konfirmasi panggilan darurat instan 119/112, integrasi fasilitas IGD terdekat dan fail-safe tanpa GPS, pengalaman ruang komunitas sehat, penyusun unggahan diskusi dengan peringatan privasi otomatis, antarmuka pelaporan dan moderasi konten, etika gamifikasi bernada suportif, lencana pencapaian sehat, pengalaman keanggotaan transparan bebas superioritas medis, diksi inklusif keanggotaan, pencarian global cepat dan status kosong, fondasi aksesibilitas universal 4 pilar WCAG, dukungan penuh navigasi keyboard, indikator cincin fokus visual berkontras tinggi (2px solid), dukungan pembaca layar semantik murni, pembaruan dinamis suara (*Live Regions aria-live="polite"*), aksesibilitas label formulir terhubung eksplisit, indikator kesalahan masukan aksesibel (`aria-invalid`), area target sentuh minimal 48x48 piksel, animasi lembut dan preferensi gerak (*Reduced Motion*), prinsip desain responsif fleksibel (5 breakpoint), strategi ponsel pintar pertama (*Mobile-First*), optimalisasi tablet 2 kolom, pemanfaatan ruang desktop layar lebar, adaptasi tabel responsif (kartu mandiri / gulir horizontal), adaptasi grafik tren dinamis, adaptasi panel obrolan AI responsif, persepsi kinerja antarmuka (*Perceived Performance* & App Shell), panduan kerangka tulang vs pemutar putar, peningkatan persepsi responsivitas tombol, batasan pembaruan antarmuka optimistik, umpan balik alur penyimpanan data, visualisasi komputasi mesin perilaku, pemuatan teks asisten AI bertahap (*Streaming Response*), penanganan kegagalan koneksi AI ramah, status pemuatan pemindai radar, status konfirmasi pemesanan sesi, bahasa kesalahan otorisasi manusiawi (penyamaran 403), perlindungan privasi bagi instruktur dan admin, visualisasi asal-usul sumber data biometrik, visualisasi kartu garis acuan normal pengguna, visualisasi sinyal deviasi perilaku, penghapusan visual peringatan medis menakutkan (sirine/tengkorak), kartu rekomendasi tindakan mikro harian, konfirmasi penyelesaian tindakan, garis waktu siklus kebiasaan (*Habit Timeline*), pengumpulan umpan balik berkala non-memaksa, penyaringan masukan sensitif, konsistensi istilah antarmuka lintas modul, pencegahan pergeseran istilah baku, standar lokalisasi Bahasa Indonesia luwes, format tanggal dan jam lokal (17 September 2026, 15.00 WIB), format angka desimal dan ribuan, format satuan biometrik akrab, 5 pilar penulisan teks antarmuka empatis (*UX Copywriting*), 6 studi kasus perbandingan teks baik vs buruk, teks penegasan otonomi penuh pengguna (*User Agency*), teks konstruktif ruang kosong dan kondisi galat, teks transparan dialog konfirmasi, batas visual keselamatan kesehatan (larangan melebih-lebihkan kepastian), penyajian derajat keyakinan algoritma kualitatif, visualisasi jejak asal riwayat data (*Data Provenance*), penyuntingan dan koreksi mandiri data biologis, riwayat perubahan catatan biometrik, transparansi konteks data masukan AI, kendali privasi personalisasi asisten AI, indikator status pembagian data ke instruktur, indikator visibilitas publik komunitas, etika penamaan paket berlangganan non-medis, spanduk instalasi aplikasi PWA tepat waktu, pengalaman penggunaan saat jaringan internet terputus, sinkronisasi otomatis luring ke daring, notifikasi pembaruan versi PWA ramah, urutan permintaan izin bertahap (*Just-in-Time*), alur pemulihan saat izin perangkat ditolak, sinergi aksesibilitas dan keselamatan kesehatan, aksesibilitas khusus alur darurat medis, metodologi pengujian keterpakaian pengguna (5 segmen), skenario tugas uji keterpakaian inti (Member, Instructor, Admin), metrik evaluasi UX kuantitatif (Penyelesaian Tugas, Waktu Tugas, SUS Skor), metrik khusus keselamatan UX (Tingkat Pemahaman Wawasan, Ketiadaan Salah Tafsir Diagnostik), eksperimentasi A/B bertanggung jawab, arsitektur sistem desain visual (14 pilar), standarisasi radius sudut lengkung, standarisasi lapisan bayangan elevasi atmosferik, standarisasi garis pembatas netral lembut, struktur token desain kanonikal terpusat, strategi konfigurasi Tailwind CSS, prinsip penggunaan ulang komponen, desain API props komponen terprediksi, penegakan kontrak aksesibilitas komponen, konsistensi visual dan interaksi seluruh sistem, ringkasan topologi arsitektur UX terpadu AEVYRA, siklus pengalaman inti anggota (*Observe-Understand-Act-Monitor*), siklus pengalaman kerja instruktur pendamping, siklus pengalaman operasional administrator, taksonomi 7 anti-pola desain antarmuka terlarang (Banjir Data Berlebih, Dominasi AI di Setiap Sudut, Inflasi Peringatan Alarmist, Sandiwara Medis Semu, Presisi Desimal Palsu, Stigmatisasi Pengguna, Desain Manipulatif Menjebak), 7 daftar periksa kepatuhan penerimaan desain (*Acceptance Checklists*), Prinsip Utama Pengalaman Pengguna Berdaulat (*Final UX Sovereign Principle*), Model Interaksi Lingkaran Tertutup Preventif, Prinsip Pamungkas Sistem Desain Visual, serta Pernyataan Pengalaman Bintang Panduan (*North-Star Human Experience*).

---

### Informasi Dokumen Kontrak Teknis
| Atribut Spesifikasi | Detail Konfigurasi Arsitektur |
| :--- | :--- |
| **Identitas Dokumen** | `AEVYRA-DOC-012` |
| **Klasifikasi Dokumen** | Dokumen Arsitektur Inti (*Restricted / Design System & User Experience Specification*) |
| **Versi Spesifikasi** | `v1.0.0-PROD` (Pondasi Kanonikal Produksi) |
| **Standar Aksesibilitas** | W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA Compliant |
| **Kerangka Kerja UI** | Tailwind CSS v3.4+, Blade Modular Components, Alpine.js / Vue.js Reactive Islands |
| **Sistem Spasi & Tipografi** | 8-Point Canonical Spacing Scale, Plus Jakarta Sans / Inter, Mobile-First Scale |
| **Model Interaksi Inti** | Closed-Loop Preventive Wellness (Observe ➔ Understand ➔ Act ➔ Monitor ➔ Improve) |
| **Arsitektur Responsif** | Mobile-First Fluid Grid (Mobile <768px, Tablet 768–1023px, Desktop ≥1024px) |
| **Metrik Keterpakaian** | System Usability Scale (SUS) Target ≥ 80 (Grade A), Task Completion Rate ≥ 90% |
| **Prinsip Utama Rekayasa** | *Safety First*, *One Primary Action*, *Progressive Disclosure*, *Non-Alarmist Aesthetics* |

---

### Ringkasan Eksekutif & Peta 8 Klaster Modul Pengalaman Pengguna
Spesifikasi desain antarmuka dan pengalaman pengguna ini disusun dalam 8 klaster arsitektur utama yang mencakup 238 bagian teknis terstruktur:

1. **Klaster 1 (Bagian 1 – 35): Filosofi Desain, Arsitektur Navigasi, Tata Letak, & Dasbor Tindakan**
   - Tujuan & filosofi UX (Simple, Clear, Calm, Actionable), siklus 4 tahap (Observe, Understand, Act, Monitor), sasaran pokok transformasi pemahaman data, hierarki prioritas UX (Safety > Clarity > Accessibility > Task > Aesthetics), desain berpusat manusia, hierarki struktur informasi, pengungkapan bertahap (*Progressive Disclosure*), reduksi beban kognitif, fokus satu tindakan utama (*One Primary Action*), arsitektur navigasi peran (Member, Instructor, Admin), navigasi bilah bawah ponsel (*Bottom Nav*), bilah sisi desktop, navigasi responsif, penegasan identitas ruang kerja (*Workspace Badge*), bilah tajuk (*Header*), rekam jejak (*Breadcrumbs*), batas lebar kanvas (1200–1440px), kisi tata letak 12 kolom, skala spasi kanonikal 8-point, bantalan halaman (*Page Padding*), hierarki kontainer kartu (*Primary, Secondary, Muted*), filosofi dasbor berbasis tindakan, struktur dasbor anggota, komponen sapaan berwaktu, kartu wawasan tren utama, pusat akses cepat tindakan (*Quick Actions Hub*), desain tombol tindakan cepat, pengalaman pencatatan biometrik cepat, prinsip formulir masukan, kejelasan label permanen, serta visibilitas satuan kanonikal.
2. **Klaster 2 (Bagian 36 – 65): Status Antarmuka, Interaktivitas Tombol, Tipografi, & Sistem Warna**
   - Validasi formulir sebaris (*Inline Validation*), penyampaian pesan galat konstruktif, desain status pemuatan (*Loading*), kerangka tulang berdenyut (*Skeleton Shimmer*), status ruang data kosong (*Empty States: General, Insight, Challenge*), penanganan status galat sistem (*Error State*), mode konektivitas luring PWA (*Offline UX*), indikator status koneksi, visualisasi status sinkronisasi data lokal (*Sync States: Stored, Syncing, Synced, Failed*), 6 status interaksi tombol (Default, Hover, Focus, Pressed, Disabled, Loading), perlakuan tombol nonaktif dengan teks bantuan, kotak dialog konfirmasi sadar, pengamanan tindakan destruktif, notifikasi melayang (*Toast*), umpan balik kontekstual sebaris (*Inline Alerts*), penggunaan modal dialog terfokus & larangan modal bertumpuk, panel laci samping (*Drawer*), fondasi sistem tipografi modern, skala hierarki tipografi terpadu (Display, H1, H2, H3, Body, Caption), standar keterbacaan teks bodi minimal 14px, keseimbangan tinggi baris (*Line Height*), distribusi bobot font (*Regular, Medium, Semibold, Bold*), sistem palet warna terkalibrasi (Teal, Slate, Indigo), semantik warna netral non-menakut-nakuti, aksesibilitas rasio kontras warna (4.5:1 / 3.0:1), adaptasi tema gelap (*Dark Mode*), serta sistem ikonografi baku dan tombol ikon aksesibel.
3. **Klaster 3 (Bagian 66 – 89): Sistem Komponen Modular, Visualisasi Grafik Biometrik, & Antarmuka Asisten AI**
   - Arsitektur sistem komponen mandiri, koleksi komponen khusus kesehatan (`HealthMetricCard`, `BehaviorSignalCard`, `BaselineCard`, `HabitProgressTimeline`), komponen khusus AI, komponen ruang instruktur, komponen dasbor admin, desain lencana status & kategori, standardisasi terminologi status sistem, terminologi sinyal deviasi perilaku, desain kartu wawasan 4 elemen, penyajian bukti data pendukung (*Insight Evidence*), filosofi visualisasi grafik biometrik untuk menjawab pertanyaan, visualisasi garis acuan normal pengguna (*Baseline Chart*), pencegahan grafik informasi berlebih, aksesibilitas grafik data (ringkasan teks sebaris & tampilan tabel alternatif), indikator pergerakan tren teks, visualisasi kemajuan menuju sasaran, pencegahan angka presisi desimal semu, diksi kemajuan tanpa menghakimi, antarmuka sesi obrolan asisten AI, transparansi identitas dan peran asisten AI, rekomendasi pertanyaan awal pintar (*Prompt Chips*), dialog konfirmasi eksekusi perkakas sistem oleh AI (*Tool Confirmation*), pemberitahuan batas keselamatan AI permanen, serta antarmuka pengalihan kasus ke staf manusia (*Human Handoff Flow*).
4. **Klaster 4 (Bagian 90 – 120): Pemindai Nutrisi Visual, Sesi Bimbingan, Dasbor Instruktur, & Pusat Privasi/Darurat**
   - Pengalaman pemindai kamera visual 6 tahap, tata letak bingkai bidik kamera (*Viewfinder*), edukasi izin kamera perangkat ramah, penyajian hasil estimasi zat gizi masakan, penanganan pemindaian meragukan (*Low Confidence Handling*), konfirmasi pengguna sebelum penyimpanan data biometrik, alur kerja pemesanan sesi bimbingan 5 langkah, kalender ketersediaan jadwal, halaman bukti konfirmasi pemesanan, pengingat jadwal bimbingan ramah, tata letak dasbor kerja instruktur (4 kuadran), antrean sinyal deviasi klien, tampilan profil anggota berbasis tab horizontal, formulir perancangan arahan intervensi instruktur, dasbor pemantauan operasional administrator, tabel data terstruktur (Cari, Filter, Urutkan, Paginasi, Aksi), perlindungan tabel data rekam medis sensitif, tabel jejak audit forensik kekal, penanganan kolom masukan sensitif, antarmuka pusat pengaturan privasi (7 menu), bahasa kebijakan privasi transparan, permintaan izin perangkat kontekstual (*In-Context*), edukasi izin notifikasi push, filosofi pengalaman akses darurat medis, penempatan tombol darurat cepat, konfirmasi panggilan darurat instan 119/112, penyajian fasilitas IGD terdekat dan fail-safe tanpa GPS, pengalaman ruang komunitas sehat, penyusun unggahan diskusi, peringatan privasi otomatis unggahan komunitas, serta antarmuka pelaporan & moderasi konten.
5. **Klaster 5 (Bagian 121 – 150): Gamifikasi Etis, Aksesibilitas Universal (WCAG 2.1 AA), Desain Responsif, & Persepsi Kinerja**
   - Etika gamifikasi bernada suportif bebas hukuman, penyajian lencana pencapaian sehat, pengalaman tingkatan keanggotaan transparan bebas klaim superioritas medis, diksi inklusif keanggotaan, pengalaman pencarian global cepat, penanganan status hasil pencarian kosong, fondasi aksesibilitas universal 4 prinsip WCAG, dukungan penuh navigasi keyboard (Tab, Enter, Escape), indikator cincin fokus visual berkontras tinggi (2px solid), dukungan pembaca layar semantik murni & atribut ARIA, penyampaian pembaruan suara dinamis (*Live Regions aria-live="polite"*), aksesibilitas label formulir terhubung eksplisit, indikator kesalahan masukan aksesibel (`aria-invalid`), area target sentuh minimal 48x48 piksel, animasi lembut dan penghormatan preferensi gerak (*Reduced Motion*), alternatif teks untuk visual grafik, prinsip sistem desain responsif fleksibel (5 breakpoint), strategi tata letak ponsel pintar pertama (*Mobile-First*), optimalisasi kanvas tablet 2 kolom, pemanfaatan ruang layar lebar desktop, adaptasi tabel responsif (kartu mandiri / gulir horizontal), adaptasi grafik tren dinamis, adaptasi panel obrolan AI responsif, persepsi kecepatan antarmuka (*Perceived Performance* & App Shell), panduan kerangka tulang vs pemutar putar, peningkatan persepsi responsivitas tombol, batasan pembaruan antarmuka optimistik, umpan balik alur penyimpanan data kesehatan, visualisasi komputasi mesin perilaku, serta pemuatan teks asisten AI bertahap (*Streaming Response*).
6. **Klaster 6 (Bagian 151 – 182): Penanganan Galat, Sinyal Perilaku, Diksi Copywriting Empatis, & Otonomi Pengguna**
   - Penanganan kegagalan koneksi AI ramah, status pemuatan analisis pemindai radar, status konfirmasi pemesanan sesi, bahasa kesalahan otorisasi manusiawi (penyamaran 403), perlindungan privasi klien bagi instruktur, perlindungan privasi anggota bagi admin, visualisasi asal-usul sumber data biometrik, visualisasi kartu garis acuan normal pengguna, visualisasi kartu sinyal deviasi perilaku, penghapusan visual peringatan medis menakutkan (sirine/tengkorak), kartu rekomendasi tindakan mikro harian, konfirmasi penyelesaian tindakan, garis waktu rekam jejak kebiasaan (*Habit Timeline*), pengumpulan umpan balik berkala non-memaksa, penyaringan masukan sensitif, konsistensi istilah antarmuka lintas modul, pencegahan pergeseran istilah baku, standar lokalisasi Bahasa Indonesia luwes, standardisasi format tanggal dan jam lokal (17 September 2026, 15.00 WIB), standardisasi format angka desimal dan ribuan, standardisasi format satuan biometrik akrab, 5 pilar penulisan teks antarmuka empatis (*UX Copywriting*), 6 studi kasus perbandingan teks baik vs buruk, teks penegasan otonomi penuh pengguna (*User Agency*), teks konstruktif untuk status kosong, teks solutif untuk kondisi galat, serta teks transparan untuk dialog konfirmasi tindakan.
7. **Klaster 7 (Bagian 183 – 215): Batas Keselamatan UX, Provenance Data, PWA Luring, Desain Sistem Visual, & Token Desain**
   - Batas visual keselamatan kesehatan (larangan melebih-lebihkan kepastian), penyajian derajat keyakinan algoritma kualitatif, visualisasi jejak asal riwayat data (*Data Provenance*), pengalaman penyuntingan dan koreksi mandiri data biologis, riwayat perubahan catatan biometrik, transparansi konteks data masukan AI, kendali privasi personalisasi asisten AI, indikator status pembagian data ke instruktur, indikator visibilitas publik komunitas, etika penamaan paket berlangganan non-medis, spanduk instalasi aplikasi PWA tepat waktu, pengalaman penggunaan saat jaringan internet terputus, sinkronisasi otomatis luring ke daring, alur notifikasi pembaruan versi PWA ramah, urutan permintaan izin bertahap (*Just-in-Time*), alur pemulihan saat izin perangkat ditolak (kamera/lokasi), sinergi aksesibilitas dan keselamatan kesehatan, aksesibilitas khusus alur darurat medis, metodologi pengujian keterpakaian pengguna (5 segmen), skenario tugas uji keterpakaian inti (Member, Instructor, Admin), metrik evaluasi UX kuantitatif (Penyelesaian Tugas, Waktu Tugas, SUS Skor), metrik khusus keselamatan UX (Tingkat Pemahaman Wawasan, Ketiadaan Salah Tafsir Diagnostik), eksperimentasi A/B bertanggung jawab, arsitektur sistem desain visual (14 pilar), standarisasi radius sudut lengkung (Small, Medium, Large, XL, Pill), standarisasi lapisan bayangan elevasi atmosferik, standarisasi garis pembatas netral lembut, struktur token desain kanonikal terpusat, strategi konfigurasi Tailwind CSS, prinsip penggunaan ulang komponen antarmuka, desain API props komponen terprediksi, penegakan kontrak aksesibilitas komponen, serta konsistensi visual dan interaksi seluruh sistem.
8. **Klaster 8 (Bagian 216 – 238): Topologi UX Terpadu, Taksonomi 7 Anti-Pola, 7 Daftar Periksa Kepatuhan, & Bintang Panduan Pamungkas**
   - Ringkasan topologi arsitektur UX terpadu AEVYRA (Ruang Anggota, Ruang Instruktur, Ruang Admin), siklus pengalaman inti anggota (*Observe-Understand-Act-Monitor*), siklus pengalaman kerja instruktur pendamping, siklus pengalaman operasional administrator, taksonomi 7 anti-pola desain antarmuka terlarang (Banjir Data Berlebih, Dominasi AI di Setiap Sudut, Inflasi Peringatan Alarmist, Sandiwara Medis Semu, Presisi Desimal Palsu, Stigmatisasi/Mempermalukan Pengguna, Desain Manipulatif Menjebak), 7 daftar periksa kepatuhan penerimaan desain (*Acceptance Checklists: Overall UX, Dashboard, AI UI, Scanner UI, Instructor UI, Admin UI, Mobile Experience*), Prinsip Utama Pengalaman Pengguna Berdaulat (*Final UX Sovereign Principle*), Model Interaksi Lingkaran Tertutup Preventif, Prinsip Pamungkas Sistem Desain Visual, serta Pernyataan Pengalaman Bintang Panduan (*North-Star Human Experience: "Saya memahami apa yang berubah, saya tahu apa yang bisa saya lakukan berikutnya, dan saya bisa melihat apa yang terjadi setelahnya"*).

---

## 1. Tujuan & Ruang Lingkup Spesifikasi UX/UI (Purpose & Scope)

Dokumen spesifikasi ini mendefinisikan standar komprehensif bagi **Pengalaman Pengguna (*User Experience / UX*)** dan **Desain Antarmuka (*User Interface / UI*)** dalam ekosistem platform **AEVYRA**.

Standar ini mencakup:
- Filosofi desain berpusat pada manusia (*Human-Centered Design*).
- Arsitektur informasi (*Information Architecture*) dan hierarki kognitif layar.
- Sistem navigasi responsif berbasis peran (*Role-Based Navigation: Member, Instructor, Admin*).
- Sistem tata letak (*Layout Grid*), skala spasi kanonikal (*Spacing Scale*), dan wadah kontainer (*Card Hierarchy*).
- Rancangan dasbor berbasis tindakan preventif (*Action-Oriented Dashboard*).
- Pengalaman pencatatan data biometrik cepat (*Frictionless Health Data Entry*).
- Desain formulir masukan, kejelasan label, dan visibilitas satuan kanonikal.
- Penanganan status antarmuka: pemuatan data (*Loading*), kerangka tulang (*Skeleton*), ruang data kosong (*Empty States*), serta galat (*Error Handling*).
- Desain tombol interaksi, dialog konfirmasi sadar (*Confirmation Dialogs*), dan umpan balik melayang (*Toast Notifications*).

Dokumen ini merupakan rujukan wajib untuk:
- Implementasi komponen Blade, Vue/React, dan CSS framework (Tailwind CSS).
- Evaluasi pengujian kegunaan (*Usability Testing*) dan kepatuhan aksesibilitas (*WCAG 2.1 AA Compliance*).

---

## 2. Filosofi Pengalaman Pengguna (UX Philosophy)

Filosofi pengalaman pengguna (*UX Philosophy*) AEVYRA dibangun untuk menciptakan atmosfer kesehatan yang menenangkan, memberdayakan, dan terpercaya.

Prinsip dasar karakteristik antarmuka:

```text
┌────────────────────────────────────────────────────────┐
│             FILOSOFI PENGALAMAN PENGGUNA               │
├────────────────────────────────────────────────────────┤
│  ✔ Sederhana (Simple)      → Bebas kebisingan visual   │
│  ✔ Jelas (Clear)           → Makna data mudah dipahami │
│  ✔ Tenang (Calm)           → Tidak memicu kecemasan    │
│  ✔ Terpercaya (Trustworthy)→ Transparan dan terbukti   │
│  ✔ Bermanfaat (Useful)     → Menyelesaikan masalah nyata│
│  ✔ Personal (Personal)     → Kontekstual pada individu │
│  ✔ Aksi Nyata (Actionable) → Mengarah ke tindakan sehat│
└────────────────────────────────────────────────────────┘
```

**Pola yang Ditolak Keras:**
- Antarmuka yang rumit dan penuh grafik klinis asing (*Clinical-looking clutter*).
- Visual alarmist dengan warna merah mencolok yang menakut-nakuti pengguna.
- Hujan notifikasi agresif yang membebani mental (*Notification fatigue*).

---

## 3. Prinsip Utama Siklus Pengalaman Pengguna (Core UX Principle)

AEVYRA **bukan sekadar repositori penyimpan angka kesehatan** (*Data Dump Dashboard*), melainkan sistem bimbingan perilaku tertutup (*Closed-Loop Preventive Guidance*).

Setiap layar antarmuka wajib mencerminkan siklus 4 tahap:

```text
AMATI (Observe) ➔ PAHAMI (Understand) ➔ BERTINDAK (Act) ➔ PANTAU (Monitor)
```

Setiap elemen antarmuka yang disajikan kepada pengguna harus mampu menjawab pertanyaan mendasar:
> *"Informasi penting apa yang sedang terjadi pada tubuh saya saat ini, dan tindakan praktis apa yang dapat saya ambil berikutnya?"*

---

## 4. Sasaran Pokok Pengalaman Pengguna (Primary UX Goal)

Tujuan utama pengalaman pengguna (*Primary UX Goal*) adalah memfasilitasi transformasi kognitif pengguna secara bertahap dan bermakna:

```text
1. "Saya memiliki rekaman data biologis." (Data Awareness)
                     ↓
2. "Saya memahami pola apa yang berubah dari tubuh saya." (Pattern Understanding)
                     ↓
3. "Saya tahu persis tindakan mikro apa yang bisa saya lakukan." (Actionable Clarity)
                     ↓
4. "Saya bisa melihat dampak positif yang terjadi setelahnya." (Outcome Visibility)
```

---

## 5. Hierarki Prioritas Desain Antarmuka (UX Priority Hierarchy)

Ketika terjadi pertentangan kepentingan dalam perancangan antarmuka, hierarki prioritas keputusan desain (*UX Decision Hierarchy*) wajib ditegakkan:

```text
1. KESELAMATAN PENGGUNA (Safety & Harm Avoidance)
   ↓
2. KEJELASAN MAKNA (Clarity & Readability)
   ↓
3. AKSESIBILITAS UNIVERSAL (Accessibility & WCAG Compliance)
   ↓
4. PENYELESAIAN TUGAS (Task Completion & Flow Efficiency)
   ↓
5. KONSISTENSI SISTEM (Design System Consistency)
   ↓
6. ESTETIKA VISUAL (Visual Aesthetics & Polish)
   ↓
7. ANIMASI & EFEK (Micro-animations & Visual Flair)
```
Efek visual atau animasi transisi tidak boleh mengorbankan keterbacaan, aksesibilitas, atau keselamatan pengguna.

---

## 6. Desain Berpusat pada Manusia (User-Centered Design)

Setiap layar dan antarmuka modul AEVYRA wajib memiliki 5 atribut desain berpusat pada pengguna (*User-Centered Design*):
1. **Tujuan Pengguna yang Jelas (*Clear User Goal*):** Pengguna mengerti tujuan berada di layar tersebut dalam waktu <3 detik.
2. **Tindakan Utama Menonjol (*Primary Action*):** Aksi terpenting disajikan dengan penekanan visual yang tegas.
3. **Informasi Pendukung Relevan (*Contextual Data*):** Hanya menampilkan metrik yang mendasari tindakan tersebut.
4. **Umpan Balik Responsif (*Immediate Feedback*):** Sistem mengonfirmasi setiap interaksi pengguna secara instan.
5. **Jalur Pemulihan Galat (*Clear Recovery Path*):** Pengguna selalu diberikan jalan keluar jika terjadi kegagalan sistem.

---

## 7. Hierarki Struktur Informasi Layar (Information Hierarchy)

Tata letak konten pada setiap halaman wajib mengikuti hierarki informasi (*Information Hierarchy*) yang konsisten:

```text
┌────────────────────────────────────────────────────────┐
│  1. Judul Halaman & Konteks Singkat (Page Title)       │
├────────────────────────────────────────────────────────┤
│  2. Wawasan / Sinyal Terpenting Hari Ini (Primary Info)│
├────────────────────────────────────────────────────────┤
│  3. Tombol Tindakan Pokok (Primary Action Call-to-Action)│
├────────────────────────────────────────────────────────┤
│  4. Rincian Metrik & Grafik Pendukung (Supporting Data)│
├────────────────────────────────────────────────────────┤
│  5. Aksi Sekunder & Opsi Tambahan (Secondary Actions)  │
└────────────────────────────────────────────────────────┘
```

---

## 8. Penyajian Informasi Bertahap (Progressive Disclosure)

Informasi analitis yang mendalam disajikan menggunakan prinsip pengungkapan bertahap (*Progressive Disclosure*):
- **Tingkat 1 (Ringkasan Cepat):** *"Pola tidur malam Anda bergeser lebih larut dari biasanya pekan ini."*
- **Tingkat 2 (Konteks Garis Pangkal):** *"Rerata jam tidur tercatat 5 jam 40 menit, dibandingkan dengan garis acuan normal Anda 7 jam 15 menit."*
- **Tingkat 3 (Rincian Analitis Mendalam):** Tombol *[Lihat Rincian Grafik & Riwayat]* untuk membuka log data lengkap.

Hindari membanjiri layar utama dengan seluruh parameter statistik sekaligus yang membingungkan pengguna awam.

---

## 9. Reduksi Beban Kognitif Pengguna (Cognitive Load Reduction)

Pengurangan beban kognitif (*Cognitive Load Reduction*) diwujudkan melalui:
- **Pengelompokan Logis (*Chunking*):** Menyatukan metrik yang saling berkaitan dalam satu kontainer kartu visual.
- **Label yang Familiar:** Menggunakan istilah bahasa Indonesia yang ramah dan umum daripada akronim medis asing.
- **Komponen Standar:** Menggunakan kontrol masukan yang sudah dikenal secara intuitif (sakelar, pemilih tanggal).
- **Konsistensi Navigasi:** Letak menu dan tombol kembali selalu berada pada posisi yang sama.

---

## 10. Fokus Tindakan Utama Tunggal (One Primary Action Focus)

Setiap layar antarmuka harus memusatkan perhatian pada **Satu Tindakan Utama Tunggal (*One Primary Action*)**:

| Layar / Modul | Tindakan Utama (Primary Action) | Tindakan Sekunder (Secondary Action) |
| :--- | :--- | :--- |
| **Kartu Wawasan Tren** | *[Ambil Tindakan Kebiasaan]* | *[Tanyakan ke Asisten AI]* |
| **Pemesanan Sesi Bimbingan** | *[Konfirmasi Jadwal Bimbingan]* | *[Lihat Portofolio Instruktur]* |
| **Pemindaian Makanan** | *[Simpan Catatan Makanan]* | *[Ubah Porsi Secara Manual]* |
| **Pencatatan Data Biometrik** | *[Simpan Rekaman]* | *[Batal & Kembali]* |

---

## 11. Pencegahan Kompetisi Tindakan Visual (Avoid Action Competition)

Mencegah kompetisi visual antartombol (*Avoid Action Competition*):
- Dilarang menyajikan banyak tombol dengan tingkat visualisasi (*visual weight*) yang sama kuat dalam satu tampilan.
- Tombol aksi utama menggunakan gaya kontras tertinggi (*Primary Filled Button*), aksi sekunder menggunakan gaya garis luar (*Outline Button*), dan aksi tersier menggunakan teks polos (*Ghost Text Button*).

---

## 12. Arsitektur Sistem Navigasi Aplikasi (Navigation Architecture)

Arsitektur navigasi aplikasi (*Navigation Architecture*) dirancang terpisah menurut domain fungsional:

```text
┌─────────────────────────────────────────────────────────┐
│              ARSITEKTUR NAVIGASI ANGGOTA                │
├─────────────────────────────────────────────────────────┤
│  Navigasi Utama:                                        │
│  • Beranda (Home / Dashboard)                           │
│  • Wawasan (Insights & Health Signals)                  │
│  • Catat (Track & Log Data)                             │
│  • Asisten AI (AI Preventive Companion)                 │
│  • Profil & Pengaturan (Profile & Settings)             │
│                                                         │
│  Navigasi Pendukung:                                    │
│  • Tantangan Sehat (Community Challenges)               │
│  • Komunitas (Community Feed)                           │
│  • Bimbingan Instruktur (Consultation Hub)              │
│  • Langganan (Membership & Transparency Center)         │
└─────────────────────────────────────────────────────────┘
```

---

## 13. Navigasi Bawah Aplikasi Ponsel (Mobile Bottom Navigation)

Pada perangkat ponsel pintar (*Mobile Smartphone*), navigasi utama diletakkan pada bilah bawah (*Bottom Navigation Bar*):
- Membatasi jumlah destinasi utama maksimal 4 hingga 5 ikon untuk menjaga target sentuh yang lega.
- Dilengkapi label teks eksplisit di bawah ikon untuk mencegah ambiguitas visual.
- Memiliki ketinggian minimal 56–64px untuk kenyamanan sentuhan jempol tangan.

---

## 14. Navigasi Sisi Layar Lebar Desktop (Desktop Sidebar Navigation)

Pada tampilan layar lebar desktop (*Desktop Layout*), navigasi diimplementasikan sebagai bilah sisi kiri (*Left Sidebar Navigation*):
- Menampilkan identitas logo AEVYRA, daftar menu fungsional dengan ikon dan teks, indikator ruang kerja aktif (*Workspace Badge*), serta avatar profil pengguna di bagian bawah.
- Dapat diperkecil (*collapsible sidebar*) menjadi mode ikon untuk memperluas area kanvas kerja analitik.

---

## 15. Perilaku Navigasi Responsif Lintas Perangkat (Responsive Navigation)

Perilaku adaptasi navigasi responsif lintas ukuran layar:

| Ukuran Layar | Breakpoint Lebar | Bentuk Navigasi yang Diterapkan |
| :--- | :--- | :--- |
| **Ponsel (*Mobile*)** | `< 768px` | Bilah Bawah Statis (*Fixed Bottom Navigation Bar*). |
| **Tablet (*Tablet*)** | `768px – 1023px` | Bilah Sisi Kompak (*Icon-only Rail Navigation*). |
| **Desktop (*Desktop*)** | `≥ 1024px` | Bilah Sisi Lengkap (*Full Expanded Sidebar Navigation*). |

---

## 16. Navigasi Berbasis Peran Pengguna (Role-Based Navigation)

Navigasi antarmuka disesuaikan secara dinamis berdasarkan peran pengguna yang terotentikasi (*Role-Based Navigation*):
- **Anggota (*Member*):** Beranda, Wawasan, Catat Data, Asisten AI, Komunitas, Profil.
- **Instruktur (*Instructor*):** Dasbor Pembimbing, Antrean Sinyal Anggota, Rencana Intervensi, Jadwal Sesi, Laporan Kemajuan.
- **Administrator (*Admin*):** Dasbor Operasional, Tata Kelola Pengguna, Moderasi Komunitas, Manajemen Tantangan, Jejak Audit Forensik, Konfigurasi Sistem.

---

## 17. Penegasan Identitas Ruang Kerja (Workspace Identity)

Penegasan identitas ruang kerja (*Workspace Identity*):
- Antarmuka wajib menampilkan lencana visual yang jelas ketika pengguna berpindah antara mode anggota, mode instruktur, atau mode administrator.
- Menggunakan aksen warna bilah tajuk yang berbeda agar staf operasional selalu sadar akan konteks wewenang akun yang sedang aktif digunakan.

---

## 18. Desain Komponen Bilah Tajuk (Header Bar Design)

Komponen bilah tajuk atas (*Header Bar*) menyajikan konteks navigasi global:
- Judul halaman aktif atau rekam jejak navigasi (*Breadcrumbs*).
- Tombol pemilih ruang kerja (*Workspace Switcher*, khusus staf multi-peran).
- Pusat notifikasi melayang (*Notification Bell with Unread Badge*).
- Tombol pemicu darurat cepat 119/112 (*Quick Emergency Access*).
- Menu dropdown profil akun dan opsi keluar (*Logout*).

---

## 19. Navigasi Jejak Rekam Halaman (Breadcrumbs Navigation)

Penggunaan navigasi rekam jejak (*Breadcrumbs*) pada layar desktop:
- Wajib digunakan pada alur kerja hierarkis yang mendalam (misal: *Dasbor Admin ➔ Pengguna ➔ Detail Anggota ➔ Riwayat Log*).
- Membantu pengguna memahami posisi kedalaman halaman saat ini dan dapat kembali ke tingkat sebelumnya dengan 1 ketukan.

---

## 20. Tata Letak Kerangka Halaman (Page Layout Framework)

Kerangka tata letak halaman (*Page Layout Framework*):
- Membatasi lebar kontainer konten maksimal (*Max-Width*) pada rentang **1200px – 1440px** pada layar lebar guna mencegah baris teks meregang terlalu panjang yang menurunkan kenyamanan membaca (*reading fatigue*).
- Memastikan konten selalu terpusat (*centered layout*) pada monitor beresolusi tinggi (4K/Ultrawide).

---

## 21. Sistem Kisi Tata Letak Kanonikal (Layout Grid System)

Sistem kisi tata letak kanonikal (*Layout Grid System*):
- **Layar Desktop (≥1024px):** Mengadopsi sistem kisi 12 kolom (*12-Column Grid*) dengan jarak parit (*gutter*) 24px.
- **Layar Tablet (768px – 1023px):** Mengadopsi sistem kisi 8 kolom (*8-Column Grid*) dengan jarak parit 16px.
- **Layar Ponsel (<768px):** Mengadopsi sistem kisi 4 kolom (*4-Column Grid*) dengan jarak parit 16px.

---

## 22. Sistem Spasi Berbasis Skala 8-Point (Spacing System)

Sistem spasi kanonikal berbasis skala kelipatan 8 (*8-Point Spacing Scale*):

```text
┌────────────────────────────────────────────────────────┐
│             SKALA SPASI KANONIKAL (8-PT SCALE)         │
├────────────────────────────────────────────────────────┤
│  • 4px  (0.25rem / space-1)  → Spasi mikro antarikon  │
│  • 8px  (0.50rem / space-2)  → Jarak label ke input   │
│  • 12px (0.75rem / space-3)  → Padding tombol kompak  │
│  • 16px (1.00rem / space-4)  → Padding internal kartu │
│  • 24px (1.50rem / space-6)  → Jarak antarkartu       │
│  • 32px (2.00rem / space-8)  → Jarak antarseksi layar │
│  • 48px (3.00rem / space-12) → Pemisah blok utama     │
│  • 64px (4.00rem / space-16) → Margin tajuk besar     │
└────────────────────────────────────────────────────────┘
```
Dilarang menggunakan nilai spasi acak (*arbitrary random values*) di seluruh kode tampilan.

---

## 23. Bantalan Batas Tepi Halaman (Page Padding Guidelines)

Bantalan batas tepi halaman (*Page Padding Guidelines*):
- **Ponsel (*Mobile*):** Padding horizontal `16px` (`px-4`) untuk memaksimalkan area layar yang sempit.
- **Tablet (*Tablet*):** Padding horizontal `24px` (`px-6`).
- **Desktop (*Desktop*):** Padding horizontal `32px` (`px-8`).

---

## 24. Standar Desain Komponen Kartu (Card Design Guidelines)

Standar desain komponen kontainer kartu (*Card Design Guidelines*):
- Digunakan untuk mengelompokkan informasi yang berkaitan dalam satu kesatuan visual yang utuh.
- Memiliki struktur baku: Judul Kartu (*Card Title*), Konteks Ringkas (*Subtitle/Badge*), Tubuh Konten (*Card Body*), serta Tombol Tindakan Opsional (*Card Footer Actions*).
- Hindari pembuatan kartu di dalam kartu (*nested cards*) yang bertingkat-tingkat secara berlebihan.

---

## 25. Hierarki Visual Kontainer Kartu (Card Hierarchy & Elevation)

Hierarki elevasi dan ketegasan kontainer kartu (*Card Hierarchy*):
- **Kartu Utama (*Primary Card*):** Berisi wawasan tren terpenting atau status sinyal hari ini. Menggunakan latar belakang halus beraksen cerah dengan batas tepi (*border*) lembut.
- **Kartu Sekunder (*Secondary Card*):** Berisi metrik pelengkap atau riwayat aktivitas. Menggunakan latar belakang putih/netral standar.
- **Kartu Tersier (*Muted Card*):** Berisi informasi arsip atau opsi tambahan. Menggunakan latar belakang abu-abu transparan (*subtle fill*).

---

## 26. Filosofi Dasbor Berbasis Tindakan (Dashboard Philosophy)

Filosofi dasbor berorientasi pada tindakan sehat (*Action-Oriented Dashboard*):
- Dasbor bukan tempat menumpuk seluruh grafik tanpa tujuan.
- Urutan tata letak elemen pada dasbor anggota:
  1. Fokus Sasaran Kesehatan Aktif Pengguna.
  2. Kartu Wawasan Deviasi Perilaku Terpenting Hari Ini.
  3. Akses Cepat Tindakan Harian (*Quick Actions Hub*).
  4. Indikator Kemajuan Menuju Target Kebiasaan Sehat.
  5. Rincian Metrik Pendukung & Pelacak Harian.

---

## 27. Struktur Dasbor Anggota Komunitas (Member Dashboard Structure)

Struktur tata letak dasbor anggota komunitas (*Member Dashboard Wireframe*):

```text
┌────────────────────────────────────────────────────────┐
│ Selamat pagi, Fikri!                                   │
│ Sasaran Aktif: Membangun Keteraturan Jam Istirahat     │
├────────────────────────────────────────────────────────┤
│ 💡 WAWASAN TREN HARI INI                               │
│ Waktu tidur malam Anda tercatat lebih larut pekan ini. │
│ [Lihat Analisis Pola]                                  │
├────────────────────────────────────────────────────────┤
│ AKSES CEPAT:                                           │
│ [ + Catat Data ]   [ 📷 Pindai Makanan ]   [ ✨ Tanya AI ]│
├────────────────────────────────────────────────────────┤
│ KEMAJUAN TANTANGAN: Jalan Sehat 7 Hari (Hari ke-4/7)   │
├────────────────────────────────────────────────────────┤
│ RINGKASAN METRIK HARIAN:                               │
│ • Tidur: 6j 15m   • Langkah: 6.420   • Hidrasi: 1.8L   │
└────────────────────────────────────────────────────────┘
```

---

## 28. Komponen Sapaan Empatis Berwaktu (Contextual Greeting Header)

Komponen sapaan kontekstual (*Contextual Greeting Header*):
- Menyapa nama panggilan pengguna secara hangat dan personal.
- Menyesuaikan salam berdasarkan waktu setempat (*Selamat pagi / siang / sore / malam*).
- Menyertakan pengingat fokus sehat yang sedang dijalankan secara singkat dan bersahabat.

---

## 29. Kartu Wawasan Tren Utama (Dashboard Insight Card)

Desain kartu wawasan tren utama (*Dashboard Insight Card*):
- Menampilkan ikon sinyal kesehatan yang netral dan ramah.
- Menampilkan judul ringkas perubahan pola biologis.
- Menyajikan kalimat penjelasan 1 baris yang mudah dicerna.
- Menyediakan tombol panggilan aksi langsung (*Take Action / View Insight*).

---

## 30. Akses Cepat Tindakan Harian (Quick Actions Hub)

Pusat akses cepat tindakan harian (*Quick Actions Hub*):
- Mengelompokkan aksi-aksi paling sering dilakukan pengguna: Catat Kebiasaan (*Log*), Pindai Nutrisi (*Scan*), Tanya Asisten (*Ask AI*), dan Pesan Sesi (*Book*).
- Dibatasi maksimal 3 hingga 4 aksi utama pada layar beranda untuk menghindari kebingungan pilihan.

---

## 31. Desain Tombol Tindakan Cepat (Quick Action Button Design)

Desain tombol tindakan cepat (*Quick Action Button Design*):
- Menggabungkan **Ikon Visual + Label Teks yang Jelas**.
- **Dilarang menyajikan tombol hanya berupa ikon tanpa teks** (misal hanya `[+]` atau `[📷]`) karena menimbulkan ambiguitas bagi pengguna awam dan pembaca layar disabilitas.

---

## 32. Pengalaman Pencatatan Data Biometrik (Health Data Entry UX)

Pengalaman pencatatan data biometrik yang cepat dan minim gesekan (*Frictionless Health Data Entry*):
- Alur ideal harus selesai dalam **3 langkah sederhana: Pilih Kategori ➔ Masukkan Angka ➔ Tekan Simpan**.
- Formulir mengingat nilai input terakhir atau menyediakan tombol pintas (*quick chips*, misal: +250ml air, 30 menit jalan) untuk mempercepat pencatatan harian.

---

## 33. Prinsip Desain Formulir Masukan (Form Design Principles)

Prinsip desain formulir masukan data (*Form Design Principles*):
- Mengelompokkan bidang masukan yang berkaitan secara vertikal satu kolom (*single-column layout*) untuk alur pindai mata yang alami.
- Memberikan contoh format masukan yang valid (*example placeholder*).
- Menghindari kolom masukan opsional yang tidak memiliki nilai analitis esensial.

---

## 34. Kejelasan Label Formulir Masukan (Form Label Clarity)

Kejelasan label formulir masukan (*Form Label Clarity*):
- **Dilarang menggunakan teks placeholder sebagai pengganti label utama**, karena teks placeholder akan lenyap seketika pengguna mulai mengetik.
- Label formulir wajib selalu terlihat di atas bidang masukan (*persistent top label*).

---

## 35. Visibilitas Satuan Kanonikal Masukan (Unit Visibility Standards)

Visibilitas satuan kanonikal masukan (*Canonical Unit Visibility*):
- Satuan ukuran wajib tercetak secara permanen di sisi kanan kolom masukan (misal: `mg/dL`, `menit`, `ml`, `langkah`).
- Dilarang membuat pengguna menebak satuan apa yang diharapkan oleh sistem.

---

## 36. Validasi Formulir Interaktif Seketika (Inline Input Validation)

Validasi formulir interaktif seketika (*Inline Input Validation*):
- Memberikan tanda centang hijau halus ketika format data yang diinput pengguna valid setelah bidang kehilangan fokus (*on-blur validation*).
- Validasi instan di sisi antarmuka (*client-side*) berfungsi untuk kenyamanan pengguna, sedangkan validasi server (*backend*) tetap menjadi benteng otoritatif utama.

---

## 37. Penyampaian Pesan Kesalahan Masukan (Input Error Messaging)

Penyampaian pesan kesalahan masukan (*Input Error Messaging*):
- Pesan galat wajib memenuhi formula 2 lapis: **Apa masalahnya + Bagaimana cara memperbaikinya**.

```text
❌ SALAH (Membingungkan):
   "Input tidak valid."

✔ BENAR (Membantu & Jelas):
   "Durasi tidur harus berada di antara rentang 1 hingga 24 jam. 
    Silakan masukkan angka dalam jam atau menit yang sesuai."
```

---

## 38. Desain Status Pemuatan Data (Loading State Design)

Desain status pemuatan data (*Loading State Design*):
- Saat memproses penyimpanan data, tombol interaksi wajib beralih menampilkan indikator putar (*spinner*) disertai teks status seperti *"Menyimpan catatan..."*.
- Tombol dinonaktifkan sementara (*disabled state*) untuk mencegah pengiriman ganda akibat klik berulang (*double submit*).

---

## 39. Pemuatan Kerangka Tulang Visual (Skeleton Loading UX)

Pemuatan kerangka tulang visual (*Skeleton Loading UX*):
- Menggunakan animasi kerangka abu-abu berdenyut halus (*shimmer effect*) yang meniru bentuk kartu wawasan dan grafik sebelum data selesai dimuat dari API.
- Menghindari layar putih polos (*blank white screen*) yang menimbulkan kesan aplikasi membeku (*freeze*).

---

## 40. Status Ruang Data Kosong (Empty State Design)

Desain status ruang data kosong (*Empty State Design*):
- Status kosong wajib menjelaskan 3 elemen secara ramah:
  1. **Apa yang sedang kosong** (*"Belum ada catatan aktivitas kebugaran"*).
  2. **Mengapa hal tersebut penting** (*"Mencatat aktivitas membantu membangun garis acuan tubuh Anda"*).
  3. **Tindakan nyata untuk memulai** (*Tombol [+ Mulai Catat Hari Ini]*).

---

## 41. Status Kosong Kartu Wawasan Tren (Empty Insight State)

Desain status kosong pada kartu wawasan tren perilaku (*Empty Insight State*):
- Ketika sistem belum mendeteksi pergeseran pola yang signifikan atau data riwayat belum mencukupi:

```text
┌────────────────────────────────────────────────────────┐
│ 💡 BELUM ADA PERGESERAN POLA BARU                      │
│ Kebiasaan harian Anda berjalan stabil sesuai garis     │
│ acuan normal Anda. Terus pertahankan ritme sehat ini!  │
│                                                        │
│ [ + Catat Kebiasaan Hari Ini ]                         │
└────────────────────────────────────────────────────────┘
```
Pesan ini menegaskan bahwa ketiadaan sinyal wawasan adalah kabar baik yang menandakan stabilitas fisiologis, bukan kerusakan aplikasi.

---

## 42. Status Kosong Katalog Tantangan (Empty Challenge State)

Desain status kosong pada katalog tantangan komunitas (*Empty Challenge State*):
- Jika belum ada program tantangan yang aktif: *"Belum ada tantangan komunitas baru saat ini. Anda tetap dapat melanjutkan target kebiasaan mandiri Anda di halaman Catat."*
- Hindari bahasa yang membuat pengguna merasa bersalah atau mengira mereka tertinggal kewajiban.

---

## 43. Penanganan Status Kesalahan Sistem (Error State Design)

Penanganan status kegagalan pemuatan data (*Error State Design*):
- Pesan galat antarmuka dilarang menampilkan kode pengecualian teknis mentah (*raw exception / stack trace*) seperti `500 Internal Server Error` atau `SQLSTATE[HY000]`.
- Sajikan pesan ramah yang menenangkan: *"Kami sedang mengalami kendala saat memuat grafik garis waktu Anda. Data Anda tersimpan aman."* disertai tombol tindakan **[Coba Muat Ulang]**.

---

## 44. Penanganan Status Jaringan Luring (Offline State UX)

Penanganan status koneksi terputus pada aplikasi PWA (*Offline State UX*):
- Banner informasi lembut di bilah atas: *"Anda sedang berada dalam mode luring (offline). Anda tetap dapat mencatat kebiasaan harian; data akan otomatis disinkronkan saat koneksi kembali aktif."*
- Tombol yang memerlukan internet dinonaktifkan dengan penjelasan kontekstual.

---

## 45. Indikator Status Konektivitas Jaringan (Connection Indicator)

Indikator status konektivitas jaringan (*Connection Indicator*):
- Menampilkan status visual yang halus di sudut layar: **Tersambung (*Online*)**, **Terputus (*Offline*)**, atau **Sedang Menyinkronkan (*Syncing...*)**.
- Memadukan ikon sinyal dengan teks penjelasan agar dapat diidentifikasi secara mandiri tanpa bergantung pada warna semata.

---

## 46. Visualisasi Status Sinkronisasi Data (Sync State UX)

Visualisasi status sinkronisasi data antrean lokal (*Sync State UX*):

| Status Sinkronisasi | Tampilan Visual & Ikon | Keterangan & Harapan Pengguna |
| :--- | :--- | :--- |
| **Tersimpan Lokal** | Ikon Jam Pasir Abu-abu (*Clock*) | Data tercatat di perangkat, menunggu koneksi internet stabil. |
| **Menyinkronkan** | Ikon Putar Biru (*Sync Spinner*) | Data sedang diunggah ke peladen pusat AEVYRA. |
| **Tersinkronisasi** | Ikon Centang Hijau (*Checkmark*) | Data telah diverifikasi dan masuk ke basis data cloud otoritatif. |
| **Gagal Sinkron** | Ikon Peringatan Oranye (*Warning*) | Terjadi benturan koneksi; tombol *[Coba Lagi]* tersedia. |

---

## 47. Status Interaksi Komponen Tombol (Button Interaction States)

Status interaktivitas komponen tombol (*Button Interaction States*):
- Setiap tombol wajib memiliki 6 status visual yang terdefinisi dengan jelas:
  1. **Bawaan (*Default*):** Warna tegas kontras tinggi.
  2. **Sorot (*Hover*):** Perubahan saturasi 10% lebih pekat saat kursor diarahkan.
  3. **Fokus (*Focus Ring*):** Cincin garis luar berjarak 2px berkontras tinggi untuk navigasi keyboard.
  4. **Tekan (*Active/Pressed*):** Efek skala mikro (misal: `scale-95`) yang memberikan umpan balik taktil.
  5. **Nonaktif (*Disabled*):** Warna abu-abu redup (*opacity 50%*) dan kursor `not-allowed`.
  6. **Pemuatan (*Loading*):** Ikon pemutar tersemat dan teks aksi dikunci.

---

## 48. Perlakuan Visual Tombol Nonaktif (Disabled Button Guidelines)

Perlakuan visual tombol nonaktif (*Disabled Button Guidelines*):
- Dilarang hanya mematikan tombol tanpa menjelaskan alasan mengapa tombol tersebut tidak dapat ditekan.
- Sediakan teks keterangan bantuan kecil (*helper text / tooltip*) di bawah tombol (misal: *"Tombol konfirmasi aktif setelah seluruh bidang wajib terisi"*).

---

## 49. Dialog Konfirmasi Tindakan Pengguna (Confirmation Dialogs)

Penggunaan kotak dialog konfirmasi (*Confirmation Dialogs*):
- Hanya digunakan untuk tindakan yang memiliki dampak signifikan (misal: menghapus data biomarker, membatalkan sesi bimbingan, keluar dari program tantangan).
- Jangan memunculkan dialog konfirmasi untuk tindakan ringan yang mudah dibalikkan (*reversible*), karena akan menciptakan kepenatan dialog (*dialog fatigue*).

---

## 50. Pencegahan Tindakan Merusak Data (Destructive Actions Safeguards)

Pengamanan tindakan yang merusak data (*Destructive Actions Safeguards*):
- Tombol aksi destruktif (misal: *Hapus Riwayat*) menggunakan warna merah fungsional (*semantic red*).
- Dialog konfirmasi wajib menjelaskan konsekuensi nyata: *"Apakah Anda yakin ingin menghapus catatan glukosa ini? Tindakan ini tidak dapat dibatalkan."*

---

## 51. Notifikasi Melayang Umpan Balik (Toast Notifications)

Notifikasi melayang konfirmasi cepat (*Toast Notifications*):
- Digunakan untuk konfirmasi peristiwa singkat yang sukses: *"Catatan tidur berhasil disimpan"*, *"Target pengingat diperbarui"*.
- Menghilang secara otomatis dalam rentang waktu **3 hingga 5 detik**.
- **Dilarang menaruh informasi keselamatan kritis atau peringatan medis penting hanya di dalam toast**, karena pesan toast cepat lenyap dan mudah terlewatkan.

---

## 52. Umpan Balik Kontekstual Sebaris (Inline Feedback UX)

Umpan balik kontekstual sebaris (*Persistent Inline Feedback*):
- Untuk pembaruan status sistem yang penting (misal: pengingat berhasil dijadwalkan atau data gagal terkirim), utamakan kotak pesan sebaris (*inline alert banner*) yang menetap di halaman sampai ditutup oleh pengguna.

---

## 53. Pedoman Penggunaan Kotak Dialog Modal (Modal Dialog Usage)

Pedoman penggunaan kotak dialog modal (*Modal Dialog Usage*):
- Digunakan secara selektif untuk tugas yang membutuhkan konsentrasi penuh (*focused tasks*), pemilih tanggal bimbingan, atau formulir pencatatan cepat.
- **Dilarang menumpuk modal di atas modal (*modal stacking*)**, karena merusak navigasi dan membingungkan pembaca layar.

---

## 54. Pedoman Penggunaan Panel Laci Samping (Drawer Panel Usage)

Pedoman penggunaan panel laci samping (*Drawer / Slide-Over Panel Usage*):
- Sangat ideal untuk penyaringan data tabel (*filters*), rincian profil singkat anggota, dan navigasi sekunder pada perangkat seluler.
- Menggunakan animasi geser (*slide-in*) yang mulus dari tepi kanan atau bawah layar.

---

## 55. Fondasi Sistem Tipografi Aplikasi (Typography System Foundation)

Fondasi sistem tipografi aplikasi (*Typography System Foundation*):
- Mengutamakan jenis huruf tanpa kait (*sans-serif*) modern dengan keterbacaan tinggi (*high x-height*) seperti **Plus Jakarta Sans**, **Inter**, atau **Outfit**.
- Menjamin keterbacaan yang nyaman pada layar ponsel beresolusi tinggi maupun monitor desktop.

---

## 56. Hierarki Skala Tipografi Terpadu (Typography Scale & Hierarchy)

Hierarki skala tipografi terpadu (*Typography Hierarchy Scale*):

```text
┌────────────────────────────────────────────────────────┐
│             SKALA TIPOGRAFI KANONIKAL                  │
├────────────────────────────────────────────────────────┤
│  • Tampilan Utama (Display) : 32px / 2.00rem (Bold)    │
│  • Judul Halaman (H1)       : 24px / 1.50rem (Bold)    │
│  • Judul Seksi (H2)         : 20px / 1.25rem (Semibold)│
│  • Judul Kartu (H3)         : 16px / 1.00rem (Semibold)│
│  • Teks Bodi (Body Text)    : 14px – 16px (Regular)    │
│  • Keterangan Mikro (Caption): 12px / 0.75rem (Medium) │
└────────────────────────────────────────────────────────┘
```

---

## 57. Standar Keterbacaan Teks Bodi (Body Text Readability)

Standar keterbacaan teks bodi (*Body Text Readability*):
- Ukuran dasar teks konten tidak boleh lebih kecil dari **14px** pada perangkat seluler demi kenyamanan mata pengguna berbagai usia.
- Batasan panjang baris teks paragraf dijaga antara **50 hingga 75 karakter per baris** (*measure*) untuk menghindari kelelahan membaca.

---

## 58. Keseimbangan Jarak Antarbaris Teks (Line Height Proportions)

Keseimbangan jarak antarbaris teks (*Line Height Proportions*):
- Judul tajuk besar menggunakan *line-height* rapat: `1.2` hingga `1.25`.
- Teks bodi dan narasi wawasan edukatif menggunakan *line-height* lega: `1.5` hingga `1.6` (`leading-relaxed`) guna menjamin keterbacaan paragraf yang optimal.

---

## 59. Distribusi Ketebalan Huruf Antarmuka (Font Weight Distribution)

Distribusi ketebalan huruf antarmuka (*Font Weight Distribution*):
- Gunakan variasi ketebalan bobot font (*Regular 400, Medium 500, Semibold 600, Bold 700*) untuk membangun hierarki visual, bukan memperbesar ukuran huruf secara berlebihan.

---

## 60. Sistem Palet Warna Terkalibrasi (Calibrated Color System)

Sistem palet warna terkalibrasi (*Calibrated Color System*):
- Menghindari penggunaan warna murni neon yang menyilaukan mata (*harsh saturated primaries*).
- Mengadopsi palet warna kesehatan modern berbasis HSL yang sejuk, bersih, dan berwibawa:
  - **Primer (Teal / Zamrud Sejuk):** Melambangkan vitalitas dan pemulihan tubuh.
  - **Netral (Slate / Koral Lembut):** Latar belakang kanvas dan kontainer kartu.
  - **Aksen Wawasan (Indigo / Biru Laut):** Penekanan informasi analitis AI.

---

## 61. Semantik Warna Fungsional Netral (Semantic Color System)

Semantik warna fungsional netral (*Semantic Colors*):
- Dilarang mengaitkan warna secara simplistis dengan vonis medis (misal: Merah = Sakit Parah, Hijau = Mutlak Sembuh).
- Gunakan semantik perilaku:
  - **Biru / Slate:** Pola normal stabil (*Stable Baseline*).
  - **Kuning / Amber:** Perubahan pola yang perlu diamati (*Pattern Shift*).
  - **Hijau Sejuk:** Kemajuan positif menuju target (*Positive Progress*).
  - **Merah Halus:** Peringatan galat sistem atau aksi destruktif.

---

## 62. Aksesibilitas Kontras Rasio Warna (Color Contrast Accessibility)

Aksesibilitas kontras rasio warna (*Color Contrast Accessibility*):
- Seluruh teks antarmuka wajib memenuhi rasio kontras minimal **4.5:1** terhadap latar belakangnya untuk teks normal, dan **3.0:1** untuk teks besar (standar WCAG 2.1 Level AA).

---

## 63. Adaptasi Tema Gelap & Terang (Dark Mode Architecture)

Adaptasi tema gelap dan terang (*Dark Mode Architecture*):
- Tema gelap (*Dark Mode*) dirancang untuk kenyamanan membaca di malam hari:
  - Latar belakang menggunakan warna abu-abu arang lembut (*Slate-900*), bukan hitam pekat pekat (*Pure #000000*).
  - Saturasi warna grafik diturunkan sedikit agar tidak menyilaukan pupil mata di ruangan redup.

---

## 64. Sistem Ikonografi Fungsional Baku (Iconography Standards)

Sistem ikonografi fungsional baku (*Iconography Standards*):
- Menggunakan pustaka ikon dengan gaya garis yang konsisten (misal: Lucide Icons / Heroicons Outline 24px).
- Ikon harus selalu memiliki makna representasi dunia nyata yang intuitif dan universal.

---

## 65. Aksesibilitas Tombol Berbasis Ikon (Icon Button Accessibility)

Aksesibilitas tombol berbasis ikon (*Icon Button Accessibility*):
- Tombol yang hanya menyajikan ikon visual (seperti tombol silang tutup modal atau tombol lonceng notifikasi) **wajib menyertakan atribut `aria-label="Tutup Dialog"`** agar dapat dibaca oleh pembaca layar tunanetra.

---

## 66. Arsitektur Sistem Komponen Mandiri (Component System Architecture)

Arsitektur sistem komponen mandiri (*Component System Architecture*):
- Seluruh elemen antarmuka dibangun sebagai komponen modular yang dapat digunakan kembali (*reusable atomic components*): `Button`, `Input`, `Select`, `Modal`, `Badge`, `Card`, `Toast`, `Dropdown`, `Pagination`, `Tabs`, `Table`.

---

## 67. Komponen Khusus Domain Kesehatan (Health-Specific Components)

Koleksi komponen khusus domain kesehatan (*Health-Specific UI Components*):
- `HealthMetricCard`: Menampilkan metrik tunggal, satuan, dan indikator tren.
- `BehaviorSignalCard`: Menampilkan kartu anomali deviasi pola harian.
- `BaselineCard`: Menampilkan perbandingan performa terkini vs rata-rata 30 hari.
- `HabitProgressTimeline`: Garis waktu konsistensi rutinitas kebiasaan.

---

## 68. Komponen Khusus Antarmuka Cerdas AI (AI-Specific UI Components)

Koleksi komponen khusus antarmuka cerdas AI (*AI-Specific UI Components*):
- `AIChatBubble`: Gelembung percakapan dengan label peran asisten yang transparan.
- `SuggestedPromptChips`: Tombol pintas pertanyaan awal untuk memandu pengguna.
- `ToolActionCard`: Kartu konfirmasi sebelum AI mengeksekusi tindakan perubahan jadwal.

---

## 69. Komponen Khusus Ruang Instruktur (Instructor-Specific Components)

Koleksi komponen khusus ruang instruktur (*Instructor UI Components*):
- `MemberSignalQueue`: Daftar antrean anggota yang mengalami deviasi kebiasaan.
- `InterventionBuilder`: Formulir perancangan saran latihan mikro bagi klien.
- `ConsultationCalendar`: Tampilan slot ketersediaan waktu bimbingan tatap muka.

---

## 70. Komponen Khusus Dasbor Administrator (Admin-Specific Components)

Koleksi komponen khusus dasbor administrator (*Admin UI Components*):
- `AdminMetricCard`: Ringkasan metrik kesehatan sistem dan jumlah anggota aktif.
- `SensitiveDataTable`: Tabel data dengan kolom tersamar (*masked columns*) dan jejak audit.
- `ModerationCard`: Kartu tinjauan konten komunitas yang dilaporkan pengguna.

---

## 71. Desain Lencana Status & Kategori (Badge & Tag Design)

Standar desain lencana status dan kategori (*Badge & Tag Design*):
- Lencana status menggunakan teks ringkas (1-2 kata) dengan latar belakang warna pastel lembut (*muted fill*).
- Menghindari penggunaan warna lencana yang saling bertabrakan secara berlebihan.

---

## 72. Standarisasi Terminologi Status Sistem (Status Terminology Standards)

Standarisasi terminologi status sistem (*Status Terminology Standards*):
- Menggunakan kata baku yang seragam di seluruh aplikasi:
  - Gunakan **Aktif (*Active*)**, bukan Berjalan/Live.
  - Gunakan **Selesai (*Completed*)**, bukan Selesai/Beres/Finish secara bergantian.
  - Gunakan **Dibatalkan (*Cancelled*)**, bukan Batal/Batalan.

---

## 73. Terminologi Sinyal Deviasi Perilaku (Health Signal Terminology)

Terminologi sinyal deviasi perilaku (*Health Signal Terminology*):
- Gunakan diksi ramah: **"Pola Berubah"**, **"Perlu Diamati"**, **"Fluktuasi Harian"**.
- **Hindari diksi menakut-nakuti:** *"Peringatan Medis"*, *"Bahaya Penyakit"*, *"Kondisi Kritis"*.

---

## 74. Desain Kartu Wawasan Perilaku Sehat (Behavioral Insight Design)

Desain kartu wawasan perilaku sehat (*Behavioral Insight Card Design*):
- Struktur wajib 4 elemen:
  1. **Judul:** Observasi singkat (*"Waktu istirahat Anda bergeser"*).
  2. **Konteks:** Perbandingan dengan garis acuan normal pengguna.
  3. **Relevansi:** Mengapa keteraturan tidur penting bagi kebugaran harian.
  4. **Langkah Berikutnya:** Saran aksi kebiasaan mikro yang praktis.

---

## 75. Penyajian Bukti Data Pendukung Wawasan (Insight Evidence Display)

Penyajian bukti data pendukung wawasan (*Insight Evidence Display*):
- Menyertakan panel rincian data pendukung:
  - Garis Acuan Normal: *7 jam 10 menit*.
  - Rata-rata 5 Hari Terakhir: *5 jam 50 menit*.
  - Rentang Periode Pengamatan: *5 hari pencatatan aktif*.
Transparansi data membangun kepercayaan penuh pengguna terhadap sistem.

---

## 76. Filosofi Visualisasi Grafik Biometrik (Biometric Chart Philosophy)

Filosofi visualisasi grafik biometrik (*Biometric Chart Philosophy*):
- Grafik data kesehatan bukan ajang pamer kompleksitas matematika.
- Grafik harus dirancang untuk menjawab 1 pertanyaan spesifik pengguna: *"Bagaimana perbandingan pola kebiasaan saya saat ini terhadap ritme normal tubuh saya?"*

---

## 77. Visualisasi Garis Pangkal Kebiasaan (Baseline Reference Chart)

Visualisasi grafik garis pangkal kebiasaan (*Baseline Reference Chart*):
- Garis putus-putus horizontal berwarna netral melambangkan **Garis Acuan Pribadi (*Personal Baseline*)**.
- Garis solid tebal melambangkan rekaman data riil harian pengguna.
- Menghindari garis kurva tajam yang menciptakan ilusi ketidakstabilan ekstrem.

---

## 78. Pencegahan Grafik Informasi Berlebih (Avoid Overloaded Charts)

Pencegahan grafik informasi berlebih (*Avoid Overloaded Charts*):
- Dilarang menaruh 10 metrik berbeda, 4 sumbu koordinat Y, dan 8 warna kontras ke dalam 1 grafik sempit.
- Pisahkan grafik tidur, grafik langkah, dan grafik hidrasi ke dalam kartu visual mandiri.

---

## 79. Aksesibilitas Visual Grafik Data (Accessible Data Charts)

Aksesibilitas visual grafik data (*Accessible Data Charts*):
- Setiap grafik wajib dilengkapi tabel data alternatif (*Accessible Table View*) yang dapat dibaca oleh pembaca layar.
- Perbedaan antargaris tren tidak boleh hanya mengandalkan warna, melainkan juga gaya garis (putus-putus, bertitik, tebal-tipis) atau bentuk titik penanda (*markers*).

---

## 80. Indikator Visual Pergerakan Tren (Trend Indicators & Micro-visuals)

Indikator visual pergerakan tren (*Trend Indicators & Micro-visuals*):
- Tampilkan panah pergerakan tren disertai label teks eksplisit:
  - **Meningkat (*Trending Up*)**
  - **Menurun (*Trending Down*)**
  - **Stabil (*Stable*)**
  - **Bervariasi (*Variable*)**
Dilarang hanya menggunakan simbol panah tanpa teks penjelas.

---

## 81. Visualisasi Kemajuan Menuju Sasaran (Goal Progress Visualization)

Visualisasi kemajuan menuju sasaran (*Goal Progress Visualization*):
- Menampilkan 4 parameter utama secara terstruktur:
  1. **Sasaran Sehat (*Goal Name*):** Misal *"Keteraturan Pola Tidur Malam"*.
  2. **Capaian Saat Ini (*Current Metric*):** *72% konsistensi harian*.
  3. **Target Sasaran (*Target Metric*):** *85% konsistensi*.
  4. **Perubahan Progres (*Progress Change*):** *+8% dibandingkan tinjauan 14 hari sebelumnya*.
- Hanya menampilkan persentase yang memiliki definisi matematis bermakna, bukan angka abstrak tanpa dasar.

---

## 82. Pencegahan Angka Presisi Semu (Avoid False Precision)

Pencegahan angka presisi semu (*Avoid False Precision*):
- Dilarang menyajikan angka kesehatan dengan presisi desimal berlebihan seperti *"Kebugaran Anda membaik 73.829%"*.
- Gunakan pembulatan bilangan bulat atau satu desimal yang masuk akal biologis (misal: *74%* atau *+0.4 kg*) agar tidak menciptakan kesan kepastian laboratorium palsu.

---

## 83. Diksi Kemajuan Tanpa Menghakimi (Non-Judgmental Progress Language)

Diksi kemajuan tanpa menghakimi (*Non-Judgmental Progress Language*):

```text
❌ DILARANG (Klaim Medis Absolut / Menghakimi):
   "Kesehatan Anda sudah 83% lebih sembuh dari pekan lalu."
   "Anda masih kurang 28% untuk menjadi orang sehat."

✔ DIREKOMENDASIKAN (Observasi Perilaku & Usaha Positif):
   "Konsistensi rutinitas Anda bergerak semakin mendekati target sasaran yang Anda tentukan."
   "Tercatat perbaikan keteraturan waktu istirahat dalam 7 hari terakhir."
```

---

## 84. Antarmuka Sesi Percakapan Asisten AI (AI Chat Interface)

Antarmuka sesi percakapan asisten cerdas AI (*AI Chat Interface*):

```text
┌────────────────────────────────────────────────────────┐
│ 🤖 ASISTEN GAYA HIDUP AEVYRA                          │
│ [Status: Aktif Mendampingi]                            │
├────────────────────────────────────────────────────────┤
│ AI: Halo Fikri, ada wawasan pola kebiasaan yang ingin  │
│     Anda pelajari lebih dalam hari ini?                │
│                                                        │
│ Anda: Mengapa grafik tidur saya tercatat menurun?      │
│                                                        │
│ AI: Berdasarkan data 5 hari terakhir, Anda rata-rata   │
│     tertidur 45 menit lebih larut dari garis acuan...  │
├────────────────────────────────────────────────────────┤
│ REKOMENDASI PERTANYAAN:                                │
│ [Bagaimana memulihkan ritme?]  [Jadwalkan alarm tidur] │
├────────────────────────────────────────────────────────┤
│ [Ketik pertanyaan gaya hidup Anda di sini...]  [Kirim] │
└────────────────────────────────────────────────────────┘
```

---

## 85. Kejelasan Identitas & Peran Asisten AI (AI Identity & Persona Clarity)

Kejelasan identitas dan peran asisten AI (*AI Identity & Persona Clarity*):
- Bilah tajuk obrolan wajib menyematkan label transparan: **"Asisten AI AEVYRA (Kecerdasan Buatan)"**.
- Wajah avatar, gaya bahasa, dan lencana visual wajib secara tegas membedakan asisten AI dari profil instruktur manusia nyata (*Human Instructor*).

---

## 86. Daftar Rekomendasi Pertanyaan Awal AI (AI Suggested Prompts)

Daftar rekomendasi pertanyaan awal AI kontekstual (*AI Suggested Prompts Chips*):
- Menampilkan 3-4 pilihan pertanyaan pintar berdasarkan kondisi data terkini pengguna:
  - *[Jelaskan arti wawasan ini]*
  - *[Apa langkah mikro yang bisa saya lakukan hari ini?]*
  - *[Bantu saya menyusun rutinitas istirahat santai]*
  - *[Hubungkan saya dengan instruktur pendamping]*

---

## 87. Dialog Konfirmasi Eksekusi Alat AI (AI Tool Confirmation UI)

Dialog konfirmasi eksekusi alat sistem oleh AI (*AI Tool Confirmation UI*):

```text
┌────────────────────────────────────────────────────────┐
│ ⚙ KONFIRMASI TINDAKAN ASISTEN AI                       │
├────────────────────────────────────────────────────────┤
│ AI mengusulkan untuk membuat pengingat istirahat malam:│
│ • Jadwal : Pukul 22:15 WIB                             │
│ • Rutinitas : Setiap Hari Kerja (Senin–Jumat)          │
│ • Metode : Notifikasi Pengingat Halus                  │
│                                                        │
│ [ Batalkan ]                  [ Setujui & Jadwalkan ]  │
└────────────────────────────────────────────────────────┘
```
AI dilarang keras memanipulasi jadwal atau data pengguna di balik layar tanpa persetujuan eksplisit.

---

## 88. Pemberitahuan Batas Keselamatan AI (AI Safety Notice & Disclaimer)

Pemberitahuan batas keselamatan AI (*AI Safety Notice & Disclaimer*):
- Menampilkan teks catatan kaki permanen yang elegan di bawah kotak masukan obrolan:
  > *"Asisten AI AEVYRA menyajikan edukasi kebiasaan preventif dan bukan pengganti saran atau diagnosis medis dokter."*
- Hindari spanduk peringatan merah mencolok yang mengganggu kenyamanan berdialog.

---

## 89. Antarmuka Pengalihan ke Staf Manusia (Human Handoff UI Flow)

Antarmuka pengalihan kasus ke staf manusia (*Human Handoff UI Flow*):
- Ketika pengguna membutuhkan penanganan lebih mendalam atau AI menyentuh batas cakupannya:
  - Sistem menampilkan kartu undangan hangat: *"Ingin berdiskusi lebih lanjut dengan pembimbing kebugaran kami? Coach Budi siap meninjau rencana latihan Anda."*
  - Pengguna menekan tombol *[Hubungkan ke Instruktur]* dengan transparansi data yang akan dibagikan.

---

## 90. Pengalaman Antarmuka Pemindai Visual (Scanner Camera UX)

Pengalaman antarmuka pemindai visual kamera (*Scanner Camera UX Flow*):
- Alur 6 langkah mulus: **Buka Pemindai ➔ Bidik Citra Makanan ➔ Tekan Ambil Foto ➔ Analisis Cepat ➔ Tinjau Estimasi Zat Gizi ➔ Konfirmasi Simpan**.

---

## 91. Tata Letak Bidang Pandang Kamera (Scanner Viewfinder UI)

Tata letak bidang pandang kamera pemindai (*Scanner Viewfinder UI*):
- Menyajikan bingkai bidik (*viewfinder frame*) bertepi sudut lengkung dengan panduan visual: *"Posisikan piring makanan atau label kemasan di dalam bingkai"*.
- Tombol rana kamera (*Shutter Button*) berukuran besar (minimal 64x64px) di bagian bawah tengah layar.

---

## 92. Persetujuan Izin Kamera Perangkat (Scanner Permission Onboarding)

Edukasi persetujuan izin kamera perangkat (*Scanner Permission Onboarding*):
- Sebelum peramban memunculkan dialog izin natif (*native camera prompt*), antarmuka menyajikan layar pengantar ramah: *"AEVYRA memerlukan akses kamera untuk memindai komposisi makanan Anda secara praktis. Foto Anda tidak dibagikan ke publik."*

---

## 93. Penyajian Hasil Pemindaian Makanan (Scanner Result Presentation)

Penyajian hasil estimasi pemindaian makanan (*Scanner Result Presentation*):
- Menampilkan kandidat nama masakan terdeteksi (misal: *"Gado-Gado dengan Bumbu Kacang"*).
- Menampilkan estimasi kandungan zat gizi: porsi karbohidrat, perkiraan serat, protein, dan kalori.
- Menyediakan tombol *[Gunakan Data Ini]* dan *[Sesuaikan Porsi Secara Manual]*.

---

## 94. Penanganan Hasil Pemindaian Meragukan (Scanner Low Confidence UX)

Penanganan hasil pemindaian meragukan (*Scanner Low Confidence UX*):
- Jika foto buram atau objek tidak dapat dikenali secara meyakinkan (*Confidence < 0.70*):
  - Sistem dilarang memaksakan tebakan sepihak.
  - Tampilkan pesan sopan: *"Kami belum dapat mengenali makanan ini dengan jelas. Anda dapat mengambil foto ulang dengan pencahayaan lebih terang atau mencatat nama menu secara manual."*

---

## 95. Konfirmasi Pengguna Sebelum Penyimpanan (Health Record Confirmation)

Konfirmasi pengguna sebelum penyimpanan data biometrik (*Health Record Confirmation*):
- Seluruh data yang dihasilkan oleh pemindai kecerdasan buatan dikategorikan sebagai **Draf Calon Data (*Candidate Draft*)**.
- Pengguna wajib menekan tombol konfirmasi simpan secara sadar sebelum data tersebut resmi tercatat ke basis data rekam biologis.

---

## 96. Pengalaman Penjadwalan Bimbingan (Consultation Booking UX)

Pengalaman alur kerja penjadwalan bimbingan (*Consultation Booking UX Flow*):
- Alur 5 langkah intuitif: **Pilih Instruktur ➔ Pilih Tanggal ➔ Pilih Jam Konsultasi ➔ Tulis Catatan Topik Diskusi ➔ Halaman Bukti Konfirmasi Selesai**.

---

## 97. Kalender Ketersediaan Sesi Bimbingan (Consultation Calendar Picker)

Kalender ketersediaan sesi bimbingan (*Consultation Calendar Picker*):
- Menampilkan status slot waktu secara visual:
  - **Tersedia (*Available*):** Tombol putih/terang dengan batas tegas.
  - **Terpilih (*Selected*):** Warna primer solid beraksen cerah.
  - **Penuh / Tutup (*Unavailable/Booked*):** Teks abu-abu coret dengan label eksplisit.

---

## 98. Halaman Bukti Konfirmasi Pemesanan (Booking Confirmation Screen)

Halaman bukti konfirmasi pemesanan sesi (*Booking Confirmation Screen*):
- Menampilkan kartu ringkasan jadwal lengkap: Nama Instruktur, Spesialisasi, Hari & Jam, Tautan Ruang Bimbingan, Kebijakan Pembatalan, dan tombol pintas *[Tambahkan ke Google Calendar / Apple Calendar]*.

---

## 99. Pengingat Jadwal Sesi Pendampingan (Consultation Reminder UI)

Pengingat jadwal sesi pendampingan (*Consultation Reminder UI*):
- Notifikasi pengingat kontekstual yang ramah: *"Sesi bimbingan kebiasaan sehat Anda bersama Coach Budi akan dimulai besok pukul 15:00 WIB."*
- Meminimalkan rincian informasi medis di dalam pesan notifikasi pengingat.

---

## 100. Dasbor Kerja Instruktur Bimbingan (Instructor Dashboard UX)

Dasbor kerja instruktur bimbingan (*Instructor Dashboard UX Layout*):
- Membagi ruang kerja pembimbing ke dalam 4 kuadran fokus:
  1. **Daftar Klien Bimbingan Aktif (*Assigned Members*).**
  2. **Antrean Sinyal Deviasi Kebiasaan (*Signal Queue*).**
  3. **Jadwal Sesi Konsultasi Hari Ini (*Today's Sessions*).**
  4. **Tugas Tindak Lanjut Rencana Intervensi (*Pending Follow-ups*).**

---

## 101. Antrean Sinyal Anggota Bimbingan (Instructor Member Signal Queue)

Antrean sinyal anggota bimbingan (*Instructor Member Signal Queue*):
- Setiap kartu sinyal menyajikan informasi padat: Nama Samaran/Inisial Anggota, Sasaran Aktif, Anomali Pola yang Terdeteksi, Waktu Terdeteksi, Derajat Prioritas, dan tombol aksi *[Tinjau Profil]*.

---

## 102. Tampilan Rincian Profil Anggota Bimbingan (Instructor Member Detail View)

Tampilan rincian profil anggota bimbingan (*Instructor Member Detail View*):
- Menggunakan struktur tab navigasi horizontal untuk mencegah gulir halaman tanpa batas:
  - **Tab Ikhtisar (*Overview*)**
  - **Tab Sasaran (*Goals*)**
  - **Tab Sinyal Perilaku (*Signals*)**
  - **Tab Rencana Intervensi (*Interventions*)**
  - **Tab Riwayat Konsultasi (*Consultations*)**

---

## 103. Formulir Perancangan Arahan Intervensi (Instructor Intervention Form)

Formulir perancangan arahan intervensi instruktur (*Instructor Intervention Form*):
- Memuat bidang terstruktur: Identitas Anggota Terpilih, Sinyal Pemicu, Sasaran Kebiasaan, Jenis Saran Latihan/Nutrisi, Pesan Motivasi Personal, Tanggal Mulai, dan Tanggal Evaluasi Ulang.
- Disertai peringatan batas keselamatan: instruktur dilarang meresepkan obat atau mendiagnosis penyakit.

---

## 104. Dasbor Pemantauan Administrator (Admin Operational Dashboard)

Dasbor pemantauan administrator operasional (*Admin Operational Dashboard*):
- Dirancang dengan kerapatan informasi (*information density*) yang teratur untuk pemantauan sistem: metrik pengguna aktif, volume pemindaian makanan harian, antrean laporan moderasi, dan status kesehatan peladen.

---

## 105. Tabel Data Administratif Terstruktur (Admin Data Table Standards)

Standar tabel data administratif terstruktur (*Admin Data Table Standards*):
- Wajib mendukung 5 kapabilitas interaksi data: **Pencarian Cepat (*Search*)**, **Penyaringan Kategori (*Filter*)**, **Pengurutan Kolom (*Sortable Columns*)**, **Paginasi Halaman (*Pagination*)**, dan **Aksi Baris Cepat (*Row Action Menu*)**.

---

## 106. Tabel Data Rekam Medis Sangat Sensitif (Sensitive Health Data Tables)

Tabel data rekam medis sangat sensitif (*Sensitive Health Data Tables*):
- Dilarang menampilkan kolom data kesehatan privat (berat badan, riwayat biomarker, transkrip curhat) secara terbuka pada tabel administrator umum.
- Administrator teknis hanya diizinkan melihat metrik operasional teragregat dan data anonim.

---

## 107. Tabel Jejak Audit Forensik Sistem (Forensic Audit Trail Table)

Tabel jejak audit forensik sistem (*Forensic Audit Trail Table*):
- Menyajikan catatan kekal (*immutable audit log*): Stempel Waktu (WIB), Tipe Aktor (*User/Admin/AI*), Jenis Peristiwa Keselamatan, ID Sumber Daya, dan Status Tindakan.
- Metadata sensitif disamarkan (*masked*) dan hanya dapat dibuka dengan verifikasi wewenang khusus.

---

## 108. Penanganan Kolom Masukan Sensitif (Forms & Sensitive Input Fields)

Penanganan kolom masukan sensitif pada formulir (*Forms & Sensitive Input Fields*):
- Setiap kolom yang meminta informasi data biologis pribadi wajib menyertakan keterangan transparan: mengapa data ini dibutuhkan, siapa yang berhak melihatnya, serta penegasan bahwa kolom tersebut opsional.

---

## 109. Antarmuka Pusat Pengaturan Privasi (Privacy Center Settings UX)

Antarmuka pusat pengaturan privasi pengguna (*Privacy Center Settings UX*):
- Pusat kendali privasi terpadu memuat 7 menu navigasi yang jelas:
  1. **Visibilitas Profil Publik Komunitas.**
  2. **Izin Berbagi Data ke Instruktur Pendamping.**
  3. **Personalisasi Model Asisten AI.**
  4. **Koneksi Integrasi Layanan Pihak Ketiga.**
  5. **Unduh Ekspor Salinan Data Mandiri (*Portabilitas*).**
  6. **Riwayat Persetujuan Syarat & Ketentuan.**
  7. **Penghapusan Akun & Pemusnahan Data Permanen.**

---

## 110. Gaya Bahasa Kebijakan Privasi Transparan (Transparent Privacy Copy)

Gaya bahasa kebijakan privasi yang transparan (*Transparent Privacy Copy*):

```text
❌ DILARANG (Ambiguitas Hukum yang Menakutkan):
   "Data Anda dapat dibagikan kepada mitra terafiliasi dan pihak ketiga tepercaya untuk keperluan operasional tanpa batas."

✔ DIREKOMENDASIKAN (Lugas, Jujur, & Terkendali):
   "Data biologis Anda bersifat privat secara bawaan. Anda memegang kendali penuh untuk menentukan apakah data catatan tidur dan olahraga Anda boleh dilihat oleh instruktur pendamping Anda."
```

---

## 111. Penyampaian Permintaan Izin Perangkat (In-Context Permission Requests)

Penyampaian permintaan izin perangkat secara kontekstual (*In-Context Permission Requests*):
- Jangan meminta izin kamera, lokasi, atau notifikasi secara serentak saat pengguna pertama kali membuka aplikasi.
- Mintalah izin hanya pada momen pengguna hendak menggunakannya (misal: meminta izin kamera saat tombol *Pindai Makanan* ditekan).

---

## 112. Edukasi Izin Notifikasi Push (Push Notification Permission Flow)

Edukasi izin notifikasi push (*Push Notification Permission Flow*):
- Jelaskan manfaat nyata sebelum memicu dialog izin peramban: *"Aktifkan pengingat ramah untuk membantu Anda memelihara konsistensi rutinitas minum air dan waktu istirahat malam."*

---

## 113. Pengalaman Akses Kedaruratan Medis (Emergency Assistance UX)

Pengalaman akses bantuan kedaruratan medis (*Emergency Assistance UX Principles*):
- Tombol darurat wajib memenuhi 3 kriteria: **Mudah Ditemukan (*High Discoverability*)**, **Terlindungi dari Ketidaksengajaan (*Guarded Intent*)**, dan **Seketika Bertindak (*Zero Latency*)**.

---

## 114. Penempatan Menonjol Tombol Bantuan Darurat (Emergency Button Placement)

Penempatan menonjol tombol bantuan darurat (*Emergency Button Placement*):
- Dapat diakses dengan mudah dari bilah tajuk atas, menu pengaturan akun, dan bagian bawah sesi percakapan asisten cerdas AI.
- Berada di posisi visual yang konsisten dan mudah dijangkau saat situasi panik.

---

## 115. Konfirmasi Tindakan Panggilan Darurat (Emergency Intent Confirmation)

Konfirmasi tindakan panggilan darurat (*Emergency Intent Confirmation*):
- Menampilkan dialog konfirmasi satu ketukan cepat dengan nomor resmi: **Hubungi Ambulans (119)** atau **Panggilan Darurat Terpadu (112)**.
- Dilarang menahan pengguna dengan pertanyaan diagnostik yang berbelit-belit.

---

## 116. Penyajian Lokasi Fasilitas Kesehatan Darurat (Emergency Location UX)

Penyajian lokasi fasilitas kesehatan darurat (*Emergency Location UX*):
- Jika pengguna memberikan izin GPS: tampilkan peta fasilitas IGD rumah sakit terdekat dan nomor telepon langsung.
- Jika sinyal GPS tidak tersedia atau ditolak: antarmuka **tetap langsung menampilkan tombol pemanggil nomor darurat nasional 119/112**. Pengguna tidak boleh diblokir oleh kendala GPS.

---

## 117. Pengalaman Interaksi Ruang Komunitas (Community Health Experience)

Pengalaman interaksi ruang komunitas kesehatan (*Community Health Experience*):
- Struktur navigasi terbagi rapi: **Diskusi Terbuka (*Discussions*)**, **Tantangan Bersama (*Challenges*)**, **Unggahan Saya (*My Posts*)**, dan **Tersimpan (*Bookmarks*)**.

---

## 118. Penyusun Unggahan Diskusi Komunitas (Community Post Composer)

Penyusun unggahan diskusi komunitas (*Community Post Composer*):
- Formulir sederhana: Judul Diskusi, Isi Cerita Pengalaman, Pilihan Topik Kategori Sehat, dan Indikator Visibilitas Publik.
- Menyertakan kotak centang kesadaran privasi sebelum tombol terbitkan aktif.

---

## 119. Peringatan Privasi Otomatis Unggahan (Community Privacy Warning)

Peringatan privasi otomatis pada penyusun unggahan (*Community Privacy Warning*):
- Peringatan lembut permanen di atas tombol kirim unggahan: *"Ingat: Ruang komunitas dapat dibaca oleh seluruh anggota. Hindari mencantumkan resep obat pribadi, alamat rumah, atau nomor identitas Anda."*

---

## 120. Antarmuka Pelaporan & Moderasi Konten (Reporting & Moderation UI)

Antarmuka pelaporan dan moderasi konten (*Reporting & Moderation UI*):
- Setiap unggahan dilengkapi tombol bendera *[Laporkan]*.
- Pengguna cukup memilih alasan pelanggaran: Misinformasi Medis Berbahaya, Penjualan Obat Ilegal, Pelecehan/Spam, atau Pelanggaran Privasi, lalu menekan tombol *[Kirim Laporan]*.

---

## 121. Etika Gamifikasi & Motivasi Positif (Gamification UX Principles)

Etika gamifikasi dan motivasi positif (*Gamification UX Principles*):
- Fitur gamifikasi dirancang untuk memelihara semangat pembentukan kebiasaan sehat, bukan menciptakan persaingan toksik atau kecemasan.
- **Umpan Balik Positif:** *"Selamat! Anda berhasil menyelesaikan target hidrasi 7 hari berturut-turut (+50 Poin Motivasi)"*.
- **Larangan Diksi Hukuman:** Dilarang menampilkan visual patah hati, skor berkurang drastis, atau label *"GAGAL"* ketika pengguna melewatkan suatu hari istirahat.

---

## 122. Penyajian Lencana Prestasi Sehat (Badge Achievement UI)

Penyajian lencana prestasi sehat (*Badge Achievement UI*):
- Setiap lencana digital (*badge*) wajib menjelaskan secara transparan alasan perolehannya:
  - **Nama Lencana:** *Konsistensi 7 Hari*.
  - **Deskripsi:** *Diberikan atas keberhasilan menyelesaikan pencatatan kebiasaan secara konsisten selama 7 hari berturut-turut*.
  - **Kategori:** *Gaya Hidup & Pola Istirahat*.

---

## 123. Pengalaman Tingkat Keanggotaan Transparan (Membership Tier UX)

Pengalaman tingkat keanggotaan transparan (*Membership Tier UX*):
- Antarmuka paket langganan wajib membedakan secara tegas: Paket Aktif Pengguna, Manfaat Tambahan, Batasan Fitur, Harga Transparan, dan Periode Penagihan.
- **Larangan Superioritas Medis:** Antarmuka dilarang memberi kesan visual bahwa keanggotaan berbayar menjamin *"kesehatan yang lebih baik"* atau *"kesembuhan lebih cepat"*.

---

## 124. Diksi Bebas Diskriminasi Keanggotaan (Membership Inclusive Language)

Diksi bebas diskriminasi keanggotaan (*Membership Inclusive Language*):

```text
❌ DILARANG (Menyiratkan Diskriminasi Kesehatan):
   "Tingkatkan ke paket Gold untuk mendapatkan kesehatan yang jauh lebih baik!"

✔ DIREKOMENDASIKAN (Transparan & Fungsional):
   "Paket Gold mencakup fitur wawasan analitik mendalam dan sesi bimbingan personal bersama instruktur kebugaran."
```

---

## 125. Pengalaman Pencarian Terpadu Cepat (Global Search Experience)

Pengalaman pencarian terpadu cepat (*Global Search Experience*):
- Antarmuka pencarian menyediakan 5 elemen terpadu: Bidang Masukan Pencarian Cepat (*Search Bar*), Saran Kata Kunci Populer, Daftar Hasil yang Terkategori (Wawasan, Menu Nutrisi, Panduan Olahraga), Filter Cepat, dan Status Hasil Tidak Ditemukan.

---

## 126. Status Hasil Pencarian Tidak Ditemukan (Search Empty State UX)

Status hasil pencarian tidak ditemukan (*Search Empty State UX*):
- Menampilkan pesan bantuan solutif: *"Tidak ditemukan hasil untuk 'keto ekstrem'. Coba gunakan kata kunci lain seperti 'pola makan seimbang' atau telusuri topik kategori di bawah ini."* disertai daftar tombol pintas kategori populer.

---

## 127. Fondasi Aksesibilitas Universal WCAG 2.1 AA (Accessibility Baseline)

Fondasi aksesibilitas universal sesuai standar WCAG 2.1 Level AA (*Accessibility Baseline*):
- Memenuhi 4 prinsip pokok aksesibilitas antarmuka:
  1. **Dapat Dipersepsi (*Perceivable*):** Informasi dapat ditangkap oleh indra penglihatan dan pendengaran.
  2. **Dapat Dioperasikan (*Operable*):** Seluruh elemen dapat dikontrol via keyboard, layar sentuh, atau suara.
  3. **Dapat Dipahami (*Understandable*):** Tata letak dan instruksi konsisten serta mudah dicerna.
  4. **Kuat & Kompatibel (*Robust*):** Dapat diurai dengan andal oleh berbagai teknologi asistif modern.

---

## 128. Dukungan Penuh Navigasi Papan Tik (Keyboard Navigation Standards)

Dukungan penuh navigasi papan tik (*Keyboard Navigation Standards*):
- Seluruh tautan, tombol, bidang formulir, dan menu dropdown wajib dapat diakses menggunakan tombol `Tab`, `Shift+Tab`, `Enter`, `Space`, dan tombol panah.
- Menekan tombol `Escape` wajib menutup modal, dropdown, atau panel laci samping secara otomatis.

---

## 129. Indikator Fokus Visual Berkontras Tinggi (Focus Ring & State Visibility)

Indikator fokus visual berkontras tinggi (*Focus Ring & State Visibility*):
- Setiap elemen interaktif yang sedang menerima fokus navigasi wajib menampilkan cincin fokus visual (*Focus Ring*) yang jelas: `outline: 2px solid #0D9488; outline-offset: 2px;`.
- **Dilarang keras mematikan outline fokus (`outline: none`)** tanpa menyediakan gaya visual pengganti yang setara.

---

## 130. Dukungan Pembaca Layar Terintegrasi (Screen Reader ARIA Support)

Dukungan pembaca layar terintegrasi (*Screen Reader ARIA Support*):
- Menggunakan elemen HTML5 semantik murni (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<button>`).
- Menyediakan atribut `aria-label`, `aria-labelledby`, dan `aria-describedby` untuk memperjelas konteks tombol atau masukan yang ambigu.

---

## 131. Penyampaian Pembaruan Dinamis Suara (Live Regions for Dynamic Updates)

Penyampaian pembaruan dinamis melalui suara (*Live Regions for Dynamic Updates*):
- Menggunakan kontainer `aria-live="polite"` untuk mengumumkan peristiwa penting secara otomatis kepada pengguna tunanetra:
  - Notifikasi penyimpanan berhasil (*"Catatan tidur berhasil disimpan"*).
  - Status pembaruan asisten AI (*"Asisten AI sedang menyusun penjelasan..."*).
  - Peringatan galat validasi formulir.

---

## 132. Aksesibilitas Label & Masukan Formulir (Accessible Form Labeling)

Aksesibilitas label dan masukan formulir (*Accessible Form Labeling*):
- Setiap elemen `<input>` wajib memiliki elemen `<label>` yang terhubung secara eksplisit via atribut `for="..."` dan `id="..."`.
- Teks bantuan dihubungkan menggunakan `aria-describedby` agar dibacakan bersamaan saat kursor masuk ke dalam bidang masukan.

---

## 133. Aksesibilitas Indikator Kesalahan Masukan (Accessible Error Identification)

Aksesibilitas indikator kesalahan masukan (*Accessible Error Identification*):
- Bidang masukan yang mengalami kesalahan validasi wajib diberi atribut `aria-invalid="true"`.
- Pesan kesalahan dihubungkan dengan `aria-errormessage` sehingga pengguna pembaca layar langsung mengetahui bagian mana yang perlu diperbaiki.

---

## 134. Area Target Sentuh Minimal 48x48px (Touch Target Size Standards)

Ukuran area target sentuh minimal 48x48 piksel (*Touch Target Size Standards*):
- Seluruh tombol interaksi pada antarmuka perangkat seluler wajib memiliki dimensi area sentuh minimal **48x48 piksel** (`min-w-[48px] min-h-[48px]`) dengan jarak antartombol minimal **8 piksel** guna mencegah kesalahan ketukan jari (*fat-finger errors*).

---

## 135. Animasi Lembut & Penghormatan Preferensi Gerak (Reduced Motion UX)

Animasi lembut dan penghormatan preferensi gerak (*Reduced Motion UX*):
- Antarmuka wajib mematuhi kueri media CSS `@media (prefers-reduced-motion: reduce)`.
- Ketika pengguna mengaktifkan mode minim gerak di pengaturan sistem operasi gawai, seluruh animasi transisi dinonaktifkan atau diganti dengan efek pemudaran sederhana (*instant opacity fade*).

---

## 136. Aksesibilitas Grafik & Visual Data Kompleks (Accessible Charts & Alternatives)

Aksesibilitas grafik dan visual data biometrik kompleks (*Accessible Charts & Alternatives*):
- Setiap visualisasi grafik tren biometrik wajib disertai ringkasan teks deskriptif sebaris:
  > *"Grafik menunjukkan durasi tidur rata-rata Anda mengalami penurunan 45 menit dibandingkan garis acuan 14 hari terakhir."*
- Sediakan tombol pintas *[Buka Tampilan Tabel Data]* untuk menyajikan angka mentah dalam format baris tabel yang mudah diakses pembaca layar.

---

## 137. Prinsip Desain Responsif Fleksibel (Fluid Responsive Design)

Prinsip desain responsif fleksibel (*Fluid Responsive Design System*):
- Titik henti responsif (*breakpoints*) didasarkan pada kebutuhan tata letak konten, bukan nama merek perangkat tertentu:
  - **Ponsel Kecil (*xs*):** `< 480px`
  - **Ponsel Standar (*sm*):** `480px – 767px`
  - **Tablet (*md*):** `768px – 1023px`
  - **Desktop Ringkas (*lg*):** `1024px – 1279px`
  - **Desktop Layar Lebar (*xl*):** `≥ 1280px`

---

## 138. Pendekatan Ponsel Pintar Pertama (Mobile-First Layout Strategy)

Pendekatan ponsel pintar pertama (*Mobile-First Layout Strategy*):
- Seluruh arsitektur CSS dan komponen dasar dibangun dengan memprioritaskan kenyamanan layar ponsel pintar:
  - Pencatatan kebiasaan biometrik harian mayoritas dilakukan pengguna melalui gawai ponsel.
  - Pengambilan foto pemindai nutrisi membutuhkan akses kamera fisik ponsel.
  - Panggilan darurat 119/112 membutuhkan dialer natif perangkat seluler.

---

## 139. Optimalisasi Tampilan Perangkat Tablet (Tablet Layout Optimization)

Optimalisasi tampilan pada perangkat tablet (*Tablet Layout Optimization*):
- Memanfaatkan ruang horizontal tablet secara proporsional dengan tata letak 2 kolom seimbang, bukan meregangkan satu kontainer kartu secara berlebihan hingga sulit dibaca.

---

## 140. Pemanfaatan Ruang Layar Lebar Desktop (Desktop Canvas Utilization)

Pemanfaatan ruang kanvas layar lebar desktop (*Desktop Canvas Utilization*):
- Layar desktop dioptimalkan untuk kerapatan informasi yang teratur: mendukung tata letak multi-kolom, tabel audit forensik dengan banyak atribut, dasbor antrean sinyal instruktur, dan panel wawasan berdampingan (*side-by-side comparison*).

---

## 141. Adaptasi Tabel Data Responsif (Responsive Table Adaptation)

Adaptasi tabel data responsif lintas ukuran layar (*Responsive Table Adaptation*):
- Pada layar sempit ponsel pintar (<768px), tabel data besar diadaptasikan menjadi **Tumpukan Kartu Mandiri (*Stacked Card Rows*)** atau menyematkan bilah geser horizontal halus (*smooth horizontal scroll*) dengan kolom nama terkunci (*sticky column*).
- Dilarang mengecilkan ukuran font tabel secara ekstrem hingga tidak terbaca.

---

## 142. Adaptasi Grafik Tren Responsif (Responsive Chart Adaptation)

Adaptasi grafik tren data responsif (*Responsive Chart Adaptation*):
- Grafik menyesuaikan ukuran kanvas secara proporsional (*SVG viewBox auto-scaling*).
- Pada layar ponsel, label sumbu tanggal disederhanakan (misal: hanya menampilkan hari Senin–Minggu, bukan tanggal lengkap) untuk mencegah teks saling tumpang tindih.

---

## 143. Adaptasi Panel Obrolan AI Responsif (Responsive AI Chat Layout)

Adaptasi tata letak panel obrolan AI responsif (*Responsive AI Chat Layout*):
- **Ponsel:** Layar obrolan mengambil ruang penuh (*full-screen view*) dengan bilah masukan yang menempel di atas papan ketik virtual.
- **Desktop:** Obrolan disajikan sebagai panel laci samping atau halaman dua kolom dengan ringkasan wawasan di sisi kanan.

---

## 144. Persepsi Kecepatan & Kinerja Antarmuka (Perceived Performance UX)

Persepsi kecepatan dan kinerja antarmuka (*Perceived Performance UX*):
- Waktu muat awal (*Initial Page Load*) memprioritaskan pemuatan kerangka aplikasi (*App Shell*), teks wawasan utama, dan tombol aksi harian.
- Komponen grafik berat, tabel audit riwayat, dan modul sekunder dimuat secara bertahap (*Lazy-Loaded Components*).

---

## 145. Pemilihan Kerangka Tulang vs Indikator Putar (Skeleton vs Spinner Usage)

Panduan pemilihan kerangka tulang vs indikator putar (*Skeleton vs Spinner Usage*):
- Gunakan **Kerangka Tulang (*Skeleton Shimmer*)** untuk memuat struktur halaman dasbor, kartu wawasan, dan daftar anggota.
- Gunakan **Indikator Putar (*Spinner*)** untuk aksi tombol mikro yang selesai dalam <2 detik (Simpan Catatan, Konfirmasi Jadwal).

---

## 146. Teknik Peningkatan Persepsi Responsivitas (Perceived Responsiveness)

Teknik peningkatan persepsi responsivitas (*Perceived Responsiveness*):
- Berikan umpan balik visual seketika saat tombol ditekan (efek depresi tombol taktil dan perubahan teks tombol menjadi *"Menyimpan..."*) sehingga pengguna yakin aksinya telah diproses oleh sistem.

---

## 147. Pembaruan Antarmuka Optimistik (Optimistic UI Updates)

Pembaruan antarmuka optimistik (*Optimistic UI Updates*):
- Boleh diterapkan pada interaksi berisiko rendah: memberi tanda suka (*Like*), menandai notifikasi terbaca, atau mencoret tugas harian.
- **Dilarang pada transaksi sensitif:** Pemesanan jadwal bimbingan berbayar, modifikasi profil kesehatan sensitif, dan perubahan izin akun wajib menunggu konfirmasi resmi peladen sebelum antarmuka diperbarui.

---

## 148. Umpan Balik Penyimpanan Data Kesehatan (Health Data Save Feedback)

Umpan balik alur penyimpanan data kesehatan (*Health Data Save Feedback*):
- Setelah pengguna menekan tombol simpan:
  1. Tombol menampilkan status *"Tersimpan"* dengan centang hijau halus.
  2. Muncul teks sebaris: *"Data berhasil dicatat. Mesin analitik sedang memperbarui garis acuan personal Anda."*

---

## 149. Visualisasi Komputasi Mesin Perilaku (Behavioral Processing Feedback)

Visualisasi komputasi mesin inferensi perilaku (*Behavioral Processing Feedback*):
- Jika analisis tren membutuhkan waktu pemrosesan beberapa detik di latar belakang, tampilkan pesan: *"Sedang memvalidasi pergeseran pola biologis..."*.
- Jangan terburu-buru menampilkan status *"Tidak ada perubahan"* sebelum komputasi deterministik selesai sepenuhnya.

---

## 150. Status Pemuatan Teks Asisten AI (AI Streaming & Loading UX)

Status pemuatan teks respons asisten AI (*AI Streaming & Loading UX*):
- Menerapkan pengiriman teks bertahap (*Streaming Text Response*) yang meniru aliran pemikiran alami, bukan menahan layar beku selama 10 detik lalu memunculkan seluruh paragraf sekaligus.

---

## 151. Penanganan Kegagalan Layanan AI Ramah (Graceful AI Error Handling)

Penanganan kegagalan layanan AI yang ramah (*Graceful AI Error Handling*):
- Jika sambungan ke model AI terputus: *"Asisten cerdas kami sedang rehat sejenak. Anda tetap dapat meninjau grafik wawasan mandiri atau menghubungi instruktur kebugaran Anda."* disertai tombol *[Coba Sambungkan Lagi]*.

---

## 152. Status Pemuatan Analisis Pemindai (Scanner Processing State UX)

Status pemuatan analisis pemindai citra (*Scanner Processing State UX*):
- Selama citra makanan diproses, tampilkan animasi radar pemindaian halus disertai teks status: *"Menganalisis komposisi piring... (Estimasi zat gizi)"* dengan batas waktu henti (*timeout*) maksimal 8 detik.

---

## 153. Status Konfirmasi Pemesanan Sesi (Consultation Booking Loading)

Status konfirmasi pemesanan sesi bimbingan (*Consultation Booking Loading*):
- Menampilkan status *"Memeriksa ketersediaan jadwal Coach Budi..."* dan mengunci tombol untuk mencegah pemesanan ganda (*anti-duplicate booking guard*).

---

## 154. Pengalaman Keamanan & Perlindungan Akun (Account Security UX)

Pengalaman keamanan dan perlindungan akun (*Security UX Standards*):
- Pesan kesalahan otorisasi disajikan dengan bahasa manusiawi yang sopan:
  - Gunakan: *"Anda tidak memiliki wewenang untuk melihat catatan ini."*
  - Hindari: Menampilkan kode mentah `403 FORBIDDEN / ACCESS DENIED BY POLICY`.

---

## 155. Perlindungan Privasi Anggota bagi Instruktur (Instructor Privacy Safeguards)

Perlindungan privasi anggota bagi instruktur pendamping (*Instructor Privacy Safeguards*):
- Pada tampilan data klien bimbingan, tampilkan penanda etis: *"Data ini dibagikan oleh Fikri secara khusus untuk program bimbingan kebugaran aktif Anda."*

---

## 156. Perlindungan Privasi Anggota bagi Admin (Admin Privacy Safeguards)

Perlindungan privasi anggota bagi administrator (*Admin Privacy Safeguards*):
- Area dasbor administratif menampilkan lencana penegasan konteks: **"Ruang Kerja Data Operasional Agregat — Rekam Medis Individu Dilindungi Kebijakan Privasi"**.

---

## 157. Visualisasi Asal-Usul Sumber Data (Data Provenance & Source Tagging)

Visualisasi asal-usul sumber data biologis (*Data Provenance & Source Tagging*):
- Menampilkan label asal data secara transparan:
  - `[Catatan Mandiri]` (diinput pengguna).
  - `[Pemindai AI]` (hasil estimasi kamera).
  - `[Apple Health / Garmin]` (disinkronkan dari sensor jam pintar terhubung).

---

## 158. Visualisasi Garis Acuan Normal Pengguna (User Baseline Visualization)

Visualisasi garis acuan normal pengguna (*User Baseline UI Card*):
- Menampilkan kartu ringkasan: *"Garis Acuan Pribadi: Rerata tidur 7j 15m (dihitung dari 14 hari pencatatan aktif). Diperbarui hari ini."*

---

## 159. Visualisasi Sinyal Deviasi Perilaku (Behavioral Signal Indicator)

Visualisasi sinyal deviasi perilaku (*Behavioral Signal Indicator*):
- Disajikan sebagai kartu wawasan lembut berlatar belakang amber halus: *"Observasi: Waktu istirahat Anda tercatat lebih singkat dari garis acuan normal. [Lihat Rincian]"*.

---

## 160. Penghapusan Visual Peringatan Menakutkan (Avoid Alarmist Medical Visuals)

Penghapusan visual peringatan medis yang menakutkan (*Avoid Medical Alarm Visuals*):
- **Dilarang menggunakan simbol sirine darurat (🚨), tanda bahaya nuklir/tengkorak, atau latar belakang merah darah menyala** untuk fluktuasi kebiasaan harian biasa. Simpan penekanan visual kontras tinggi semata-mata untuk alur panggilan darurat nyata (119/112).

---

## 161. Kartu Rekomendasi Tindakan Mikro (Micro-Habit Recommendation Card)

Kartu rekomendasi tindakan kebiasaan mikro (*Micro-Habit Recommendation Card*):

```text
┌────────────────────────────────────────────────────────┐
│ 🎯 LANGKAH MIKRO REKOMENDASI HARI INI                  │
├────────────────────────────────────────────────────────┤
│ Kembali ke Jadwal Istirahat Normal Anda                │
│                                                        │
│ Alasan: Rata-rata jam tidur Anda 5 hari terakhir lebih │
│ singkat 45 menit dibandingkan garis acuan tubuh Anda.  │
│                                                        │
│ Target Aksi: Bersiap tidur pukul 22:30 malam ini       │
│                                                        │
│ [ Ambil Tindakan Ini ]        [ Ingatkan Nanti ]       │
└────────────────────────────────────────────────────────┘
```

---

## 162. Konfirmasi Sadar Penyelesaian Tindakan (Action Completion Confirmation)

Konfirmasi sadar penyelesaian tindakan (*Action Completion Confirmation*):
- Ketika pengguna menandai rekomendasi telah selesai dijalankan:
  - Tampilkan umpan balik apresiatif: *"Langkah mikro dimulai! AEVYRA akan memantau tren keteraturan kebiasaan Anda dalam beberapa hari ke depan."*
  - Hindari klaim berlebihan bahwa satu tindakan telah menyelesaikan seluruh masalah kesehatan.

---

## 163. Garis Waktu Rekam Jejak Kebiasaan (Habit Progress Timeline)

Garis waktu rekam jejak siklus kebiasaan (*Habit Progress Timeline*):
- Membantu pengguna memahami loop bimbingan preventif tertutup:
  ```text
  Garis Acuan Normal ➔ Sinyal Pergeseran ➔ Tindakan Mikro ➔ Pemantauan ➔ Hasil Tren Positif
  ```

---

## 164. Pengumpulan Umpan Balik Pengalaman Pengguna (User Feedback Collection)

Pengumpulan umpan balik pengalaman pengguna (*User Feedback Collection*):
- Setelah menyelesaikan suatu program kebiasaan selama 7 hari, sistem dapat menampilkan pertanyaan reflektif santai:
  > *"Bagaimana perasaan tubuh Anda setelah menjalankan rutinitas peregangan pagi ini?"*
- Opsi respon sederhana: *[Terasa Lebih Bugar]*, *[Biasa Saja]*, *[Kurang Cocok Bagi Saya]*.
- Dilarang memaksa pengisian umpan balik setiap kali pengguna membuka aplikasi.

---

## 165. Penyaringan Masukan Sensitif Berisiko (Safety-Aware Feedback Loops)

Penyaringan masukan sensitif berisiko (*Safety-Aware Feedback Loops*):
- Masukan pengguna digunakan untuk menyempurnakan relevansi rekomendasi personal, **namun tidak boleh secara otomatis mengubah aturan keselamatan klinis sistem** hanya berdasarkan opini subjektif satu pengguna.

---

## 166. Konsistensi Istilah Antarmuka Lintas Modul (UI Terminology Consistency)

Konsistensi istilah antarmuka lintas seluruh modul (*UI Terminology Consistency*):
- Menjaga keseragaman penamaan konsep di seluruh layar:
  - **Catatan Biometrik (*Health Record*)**
  - **Sinyal Deviasi (*Behavior Signal*)**
  - **Wawasan Tren (*Insight*)**
  - **Rekomendasi Kebiasaan (*Recommendation*)**
  - **Rencana Intervensi (*Intervention*)**
  - **Sesi Bimbingan (*Consultation*)**

---

## 167. Pencegahan Pergeseran Istilah Baku (Avoid Terminology Drift)

Pencegahan pergeseran istilah baku (*Avoid Terminology Drift*):
- Dilarang menggunakan kata yang berbeda-beda untuk konsep yang sama (misal bergantian menyebut *Sinyal*, *Peringatan*, *Bahaya*, *Isu*, *Ancaman*). Gunakan istilah baku **Sinyal Perilaku (*Behavioral Signal*)**.

---

## 168. Standar Lokalisasi Bahasa Indonesia (Indonesian Localization Standards)

Standar lokalisasi Bahasa Indonesia baku (*Indonesian Localization Standards*):
- Antarmuka mengutamakan bahasa Indonesia yang luwes, santun, dan alami, bukan terjemahan mesin harfiah yang kaku (*literal machine translation*).
- Berkas lokalisasi bahasa (`lang/id/`) dipisahkan secara ketat dari logika komputasi aplikasi.

---

## 169. Standardisasi Format Tanggal & Jam Lokal (Date & Time Formatting)

Standardisasi format tanggal dan jam lokal (*Date & Time Formatting*):
- **Format Tanggal Indonesia:** `17 September 2026` (bukan format Amerika `09/17/2026`).
- **Format Jam Indonesia:** `15.00 WIB` atau `22.30 WIB` (menggunakan titik dan zona waktu lokal).
- Penyimpanan internal basis data peladen tetap mengadopsi standar internasional ISO 8601 UTC.

---

## 170. Standardisasi Format Angka & Desimal (Number & Decimal Formatting)

Standardisasi format angka dan desimal (*Number & Decimal Formatting*):
- Mengadopsi tanda titik untuk pemisah ribuan (*3.500 langkah*) dan tanda koma untuk angka desimal (*1,5 liter air*), sesuai kaidah Bahasa Indonesia baku.

---

## 171. Standardisasi Format Satuan Biometrik (Health Metric Unit Formatting)

Standardisasi format satuan biometrik yang akrab (*Health Metric Unit Formatting*):
- Gunakan satuan yang lazim dipahami pengguna awam:
  - Durasi Tidur: `6 jam 15 menit` (bukan 375 menit).
  - Aktivitas Gerak: `6.420 langkah` (bukan 6.42k).
  - Konsumsi Cairan: `750 ml` atau `1,5 L`.
  - Glukosa Darah: `95 mg/dL`.

---

## 172. Prinsip Penulisan Teks Antarmuka Empatis (UX Copywriting Principles)

Prinsip penulisan teks antarmuka yang empatis (*UX Copywriting Principles*):
- Teks antarmuka kesehatan AEVYRA wajib memenuhi 5 pilar: **Jelas (*Clear*)**, **Tenang (*Calm*)**, **Menghargai (*Respectful*)**, **Bebas Penghakiman (*Non-judgmental*)**, dan **Dapat Ditindaklanjuti (*Actionable*)**.

---

## 173. Contoh Teks Baik: Wawasan Tren Perilaku (Good Copy: Behavioral Insights)

Contoh Teks Baik: Wawasan Tren Aktivitas (*Good Copy: Activity Insight*):
> *"Aktivitas fisik harian Anda tercatat sedikit lebih rendah dibandingkan ritme biasanya pekan ini. Mari luangkan 15 menit untuk jalan santai sore ini."*

---

## 174. Contoh Teks Buruk: Klaim Medis Menghakimi (Bad Copy: Judgmental Medical Claims)

Contoh Teks Buruk: Klaim Menghakimi (*Bad Copy: Judgmental Claim*):
> ❌ *"Aktivitas Anda sangat buruk dan tidak sehat! Anda berisiko terkena penyakit kardiovaskular jika malas bergerak."*

---

## 175. Contoh Teks Baik: Bimbingan Pola Tidur (Good Copy: Sleep Hygiene)

Contoh Teks Baik: Bimbingan Keteraturan Tidur (*Good Copy: Sleep Hygiene*):
> *"Waktu tidur Anda tercatat bervariasi dalam beberapa hari terakhir. Menjaga waktu tidur yang konsisten dapat membantu memulihkan kesegaran tubuh di pagi hari."*

---

## 176. Contoh Teks Buruk: Diagnosis Tidur Sepihak (Bad Copy: Premature Sleep Verdict)

Contoh Teks Buruk: Diagnosis Tidur Sepihak (*Bad Copy: Premature Diagnosis*):
> ❌ *"Anda mengalami gangguan Insomnia akut. Anda harus segera mengonsumsi suplemen melatonin."*

---

## 177. Contoh Teks Baik: Bimbingan Aktivitas Fisik (Good Copy: Physical Activity)

Contoh Teks Baik: Pemantauan Data Awal (*Good Copy: Baseline Building*):
> *"AEVYRA sedang mengumpulkan rekaman harian Anda untuk membangun garis acuan tubuh yang akurat. Terus catat kebiasaan Anda beberapa hari ke depan."*

---

## 178. Contoh Teks Buruk: Tuntutan Olahraga Memaksa (Bad Copy: Coercive Exercise Target)

Contoh Teks Buruk: Kepastian Palsu Tanpa Data (*Bad Copy: False Certainty*):
> ❌ *"Kesehatan tubuh Anda 100% sempurna tanpa masalah apa pun."* (Menyesatkan saat data baru 1 hari tercatat).

---

## 179. Teks Penegasan Otonomi Penuh Pengguna (User Agency & Autonomy Copy)

Teks penegasan otonomi penuh pengguna (*User Agency & Autonomy Copy*):
- Gunakan kata ajakan yang memberdayakan: **"Coba pertimbangkan"**, **"Anda dapat memilih"**, **"Mari jelajahi langkah kecil"**.
- **Hindari kata pemaksaan moral:** *"Anda wajib"*, *"Anda gagal"*, *"Anda telah melanggar target"*.

---

## 180. Teks Konstruktif untuk Ruang Kosong (Constructive Empty-State Copy)

Teks konstruktif untuk ruang data kosong (*Constructive Empty-State Copy*):
- Menyertakan arahan langkah pertama: *"Belum ada data garis acuan kebugaran. Mulai catat rutinitas hari ini agar AEVYRA dapat mengenali ritme unik tubuh Anda."* disertai tombol *[+ Catat Sekarang]*.

---

## 181. Teks Solutif untuk Kondisi Galat (Helpful & Actionable Error Copy)

Teks solutif untuk kondisi galat sistem (*Helpful & Actionable Error Copy*):
- Memberi kepastian rasa aman: *"Kami belum dapat menyimpan rekaman hidrasi Anda karena gangguan sambungan internet. Catatan Anda aman tersimpan di ponsel ini dan dapat dikirim ulang."* disertai tombol *[Coba Simpan Ulang]*.

---

## 182. Teks Transparan untuk Dialog Konfirmasi (Explicit Confirmation Copy)

Teks transparan untuk dialog konfirmasi tindakan (*Explicit Confirmation Copy*):
- Pertanyaan lugas dengan penegasan status: *"Apakah Anda yakin ingin menghapus catatan waktu tidur ini? Data yang terhapus tidak dapat dipulihkan kembali."*

---

## 183. Batas Pengalaman Keselamatan Kesehatan (Health-Safety UX Boundary)

Batas visual pengalaman keselamatan kesehatan (*Health-Safety UX Boundary*):
- Tampilan visual dilarang menyiratkan tingkat kepastian yang lebih tinggi daripada fakta data yang sebenarnya.
- Jika status data adalah **"Perubahan Pola Teramati"**, antarmuka dilarang keras melabelinya sebagai **"Vonis Masalah Medis Terkonfirmasi"**.

---

## 184. Penyajian Derajat Keyakinan Algoritma (Algorithmic Confidence Display)

Penyajian derajat keyakinan algoritma (*Algorithmic Confidence Display*):
- Untuk pemindai citra makanan: gunakan label kualitatif sederhana: **Keyakinan Tinggi (*High*)**, **Keyakinan Sedang (*Medium*)**, atau **Perlu Verifikasi Ulang (*Needs Verification*)**.
- Untuk wawasan analitik: hindari menampilkan angka persentase probabilitas semu yang membingungkan orang awam.

---

## 185. Visualisasi Jejak Asal Riwayat Data (Data Provenance & Lineage UI)

Visualisasi jejak asal riwayat data (*Data Provenance UI*):
- Menyajikan informasi sumber data secara bersahaja di bawah kartu metrik:
  > *"Sumber: Catatan Mandiri • Waktu: Hari ini, pukul 07.15 WIB"*
- Membantu pengguna memvalidasi keakuratan data pribadinya.

---

## 186. Pengalaman Penyuntingan & Koreksi Data (Edit & Correct Data UX)

Pengalaman penyuntingan dan koreksi data (*Edit & Correct Data UX*):
- Pengguna berhak mengoreksi data yang salah diinput kapan saja.
- Tombol *[Sunting Catatan]* membuka formulir dengan nilai lama terisi, dan penyimpanan koreksi secara otomatis memicu pembaruan garis acuan (*recalculation*).

---

## 187. Riwayat Perubahan Catatan Biometrik (Data Audit & History View)

Riwayat perubahan catatan biometrik (*Data Audit & History View*):
- Jika data pernah disunting, antarmuka dapat menampilkan tanda halus `[Telah Disunting]` disertai riwayat nilai sebelumnya bagi keperluan transparansi audit.

---

## 188. Transparansi Konteks Masukan AI (AI Context Disclosure UX)

Transparansi konteks masukan asisten AI (*AI Context Disclosure UX*):
- Saat asisten AI memberikan penjelasan, sediakan tombol kecil *[Konteks yang Digunakan]*:
  > *"Penjelasan ini disusun berdasarkan: Rangkuman durasi tidur 7 hari terakhir, Garis acuan normal Anda (7j 15m), dan Sasaran aktif Anda."*
- Meningkatkan kepercayaan pengguna bahwa AI tidak mengarang informasi.

---

## 189. Kendali Privasi Interaksi Asisten AI (AI Privacy Control Hub)

Kendali privasi interaksi asisten AI (*AI Privacy Control Hub*):
- Pengguna memiliki sakelar kendali: *"Gunakan riwayat catatan biometrik untuk mempersonalisasi obrolan AI [Aktif / Nonaktif]"*.

---

## 190. Indikator Status Berbagi ke Instruktur (Instructor Sharing Badge)

Indikator status berbagi ke instruktur pendamping (*Instructor Sharing Badge*):
- Pada halaman riwayat latihan dan wawasan, tampilkan lencana kecil: `🔒 Dibagikan dengan Coach Budi` agar pengguna selalu sadar akan visibilitas datanya.

---

## 191. Indikator Visibilitas Konten Komunitas (Community Visibility Pill)

Indikator visibilitas konten komunitas (*Community Visibility Pill*):
- Pada bilah formulir unggahan diskusi komunitas, tampilkan lencana penanda tegas: `🌐 Terbuka untuk Seluruh Anggota Komunitas`.

---

## 192. Etika Penawaran Tingkat Berlangganan (Ethical Subscription Upgrades)

Etika penawaran tingkat berlangganan (*Ethical Subscription Upgrades*):
- Gunakan penamaan paket yang profesional dan fungsional: **Silver**, **Gold**, **Platinum**.
- **Dilarang keras menggunakan label kesehatan eksklusif** seperti *"Paket Manusia Lebih Sehat"* atau *"Paket Bebas Sakit"*, karena menyesatkan secara medis.

---

## 193. Pengalaman Pemasangan Aplikasi PWA (PWA Installation Prompt UX)

Pengalaman pemasangan aplikasi PWA (*PWA Installation Prompt UX*):
- Tampilkan spanduk ajakan instalasi (*Install App Banner*) hanya setelah pengguna merasakan manfaat aplikasi (misal setelah 2-3 kali mencatat kebiasaan dengan sukses).
- **Dilarang memunculkan pop-up instalasi agresif seketika saat pertama kali halaman terbuka**.

---

## 194. Pengalaman Penggunaan Saat Koneksi Terputus (Offline Capability UX)

Pengalaman penggunaan saat koneksi internet terputus (*Offline Capability UX*):
- Jelaskan secara transparan fitur yang tetap berfungsi luring (Pencatatan data mandiri, melihat grafik wawasan tersimpan, membaca panduan edukasi) vs fitur yang membutuhkan internet (Obrolan AI cerdas, pemesanan sesi bimbingan).

---

## 195. Pengalaman Sinkronisasi Luring ke Daring (Offline-to-Online Sync UX)

Pengalaman sinkronisasi luring ke daring (*Offline-to-Online Sync UX*):
- Ketika sambungan internet pulih, sistem menyinkronkan antrean data di latar belakang secara otomatis dan menampilkan konfirmasi melayang lembut: *"3 catatan kebiasaan luring berhasil disinkronkan ke cloud."*

---

## 196. Pemberitahuan Pembaruan Versi Aplikasi PWA (PWA Version Update Flow)

Pemberitahuan pembaruan versi aplikasi PWA (*PWA Version Update Flow*):
- Ketika rilis versi baru aplikasi tersedia di server:
  - Tampilkan bilah pengingat ramah: *"Versi terbaru AEVYRA telah siap dengan pembaruan performa yang lebih mulus. [Perbarui Sekarang]"*.
  - Hindari memuat ulang (*reload*) halaman secara paksa di tengah-tengah pengguna sedang mengetik formulir.

---

## 197. Edukasi Permintaan Izin Berkelanjutan (Just-in-Time Permission UX)

Edukasi permintaan izin berkelanjutan (*Just-in-Time Permission UX*):
- Terapkan urutan 4 tahap: **Aksi Pengguna ➔ Edukasi Manfaat Singkat ➔ Dialog Izin Peramban ➔ Lanjutkan Alur / Opsi Cadangan Manual**.

---

## 198. Alur Pemulihan Saat Izin Ditolak Pengguna (Permission Denied Recovery Flow)

Alur pemulihan saat izin perangkat ditolak pengguna (*Permission Denied Recovery Flow*):
- Jangan pernah membiarkan pengguna terjebak di jalan buntu (*never dead-end*).
- Jika izin kamera ditolak: berikan tombol alternatif **[Catat Nutrisi Secara Manual Tanpa Foto]** dan panduan cara mengaktifkan izin di pengaturan peramban jika diinginkan.

---

## 199. Sinergi Aksesibilitas & Keselamatan Kesehatan (Accessibility + Health Safety)

Sinergi aksesibilitas dan keselamatan kesehatan (*Accessibility + Health Safety*):
- Informasi keselamatan kesehatan vital (sinyal deviasi, tombol bantuan darurat, penafian medis) wajib dapat diakses secara setara melalui teks, struktur heading yang runtut, dan pembaca layar tunanetra, bukan hanya lewat warna visual.

---

## 200. Aksesibilitas Khusus Alur Kedaruratan Medis (Accessible Emergency Workflow)

Aksesibilitas khusus alur kedaruratan medis (*Accessible Emergency Workflow*):
- Tombol darurat 119/112 wajib memiliki teks label besar berkontras tinggi (rasio >7:1), target sentuh ekstra lega (minimal 56x56px), label ARIA eksplisit, dan dapat dipicu melalui tombol pintas keyboard.

---

## 201. Metodologi Pengujian Pengalaman Pengguna (Usability Testing Methodology)

Metodologi pengujian pengalaman pengguna (*Usability Testing Methodology*):
- Pengujian keterpakaian wajib melibatkan 5 segmen pengguna nyata:
  1. **Pengguna Baru (*First-Time User*):** Menguji kejelasan alur pengenalan (*onboarding*) dan pemahaman awal.
  2. **Pengguna Rutin (*Returning Active Member*):** Menguji kecepatan pencatatan harian dan kemudahan navigasi wawasan.
  3. **Pengguna Rendah Keterlibatan (*Low-Engagement Member*):** Menguji faktor hambatan psikologis atau kejenuhan fitur.
  4. **Instruktur Pendamping (*Fitness & Wellness Coach*):** Menguji efisiensi penanganan antrean sinyal klien.
  5. **Administrator Sistem (*Operational Admin*):** Menguji kecepatan moderasi dan audit kepatuhan.

---

## 202. Skenario Tugas Uji Keterpakaian Inti (Core Usability Testing Tasks)

Skenario tugas uji keterpakaian inti (*Core Usability Testing Tasks*):

| Peran Pengguna | Tugas Pengujian Inti (Core Tasks) | Kriteria Keberhasilan |
| :--- | :--- | :--- |
| **Anggota (*Member*)** | Mendaftar akun ➔ Mencatat durasi tidur ➔ Membaca kartu wawasan ➔ Bertanya ke AI ➔ Mengambil rekomendasi ➔ Memesan sesi bimbingan. | Selesai mandiri tanpa asistensi <5 menit. |
| **Instruktur (*Instructor*)** | Membuka antrean sinyal klien ➔ Meninjau deviasi pola ➔ Menyusun rencana intervensi ➔ Menetapkan jadwal evaluasi. | Selesai dalam <3 menit per anggota. |
| **Admin (*Admin*)** | Meninjau laporan konten komunitas ➔ Melakukan moderasi ➔ Meninjau jejak audit perubahan peran akun. | Eksekusi akurat tanpa kebocoran data medis. |

---

## 203. Metrik Evaluasi Pengalaman Pengguna (UX Performance Metrics)

Metrik evaluasi kuantitatif pengalaman pengguna (*UX Performance Metrics*):
- **Tingkat Penyelesaian Tugas (*Task Completion Rate*):** Target minimal **≥ 90%**.
- **Waktu Penyelesaian Tugas (*Time on Task*):** Target pencatatan data harian **< 30 detik**.
- **Tingkat Kesalahan Masukan (*Error Rate*):** Target **< 5%** pada formulir biometrik.
- **Skor Keterpakaian Sistem (*System Usability Scale / SUS*):** Target skor rata-rata **≥ 80 (Grade A)**.

---

## 204. Metrik Khusus Keselamatan Pengguna (Health UX Safety Metrics)

Metrik khusus keselamatan pengalaman kesehatan (*Health UX Safety Metrics*):
- **Tingkat Pemahaman Wawasan (*Insight Comprehension Rate*):** Persentase pengguna yang memahami arti grafik deviasi secara benar (**target ≥ 95%**).
- **Tingkat Salah Tafsir Diagnostik (*False Diagnostic Interpretation Rate*):** Persentase pengguna yang salah mengira wawasan kebiasaan sebagai vonis penyakit (**target 0.00%**).
- **Tingkat Kelulusan Uji Darurat (*Emergency Flow Accessibility Rate*):** Kemampuan menemukan dan memicu alur panggilan darurat dalam **< 5 detik**.

---

## 205. Eksperimentasi A/B Bertanggung Jawab (Responsible UX Experimentation)

Eksperimentasi pengujian A/B yang bertanggung jawab (*Responsible UX Experimentation*):
- Pengujian variasi antarmuka (A/B testing) diizinkan untuk: urutan kartu dasbor, formulasi teks ajakan kebiasaan mikro, atau warna tombol aksen wawasan.
- **Dilarang keras mengeksperimenkan batas keselamatan:** Dilarang menguji penghapusan penafian medis, pelonggaran filter obat AI, atau menyembunyikan tombol darurat demi mengejar metrik konversi klik (*engagement traps*).

---

## 206. Arsitektur Sistem Desain Visual AEVYRA (Visual Design System Blueprint)

Arsitektur sistem desain visual AEVYRA (*Visual Design System Blueprint*):
- Membangun bahasa visual tunggal yang kohesif mencakup 14 fondasi:
  `Colors`, `Typography`, `Spacing`, `Border Radius`, `Elevation Shadows`, `Borders & Dividers`, `Buttons`, `Inputs`, `Cards`, `Badges`, `Icons`, `Charts`, `Responsive Breakpoints`, dan `Motion Physics`.

---

## 207. Standarisasi Radius Sudut Lengkung (Border Radius Scale)

Standarisasi skala radius sudut lengkung (*Border Radius Scale*):

```text
┌────────────────────────────────────────────────────────┐
│             SKALA RADIUS KANONIKAL                     │
├────────────────────────────────────────────────────────┤
│  • Kecil (Small - 6px / rounded-md)   → Checkbox, Tag  │
│  • Sedang (Medium - 10px / rounded-lg)→ Input, Button  │
│  • Besar (Large - 16px / rounded-2xl) → Card Kontainer │
│  • Ekstra (XL - 24px / rounded-3xl)   → Modal, Drawer  │
│  • Bulat Penuh (Pill - 9999px)        → Avatar, Status │
└────────────────────────────────────────────────────────┘
```
Menghindari penggunaan nilai radius acak yang merusak keharmonisan visual.

---

## 208. Standarisasi Lapisan Bayangan Elevasi (Box Shadow & Elevation Scale)

Standarisasi lapisan bayangan elevasi (*Box Shadow & Elevation Scale*):
- Mengadopsi bayangan atmosferik lembut (*soft ambient shadows*):
  - `shadow-sm`: Kontur halus tombol dan kartu masukan.
  - `shadow-md`: Kartu wawasan aktif dan menu dropdown.
  - `shadow-xl`: Kotak dialog modal dan panel darurat.
Hindari bayangan hitam pekat bergaya retro yang membuat antarmuka terasa kotor.

---

## 209. Standarisasi Garis Batas & Pembatas Konten (Borders & Dividers Standards)

Standarisasi garis batas dan pembatas konten (*Borders & Dividers*):
- Menggunakan garis tepi netral lembut (`border-slate-200` pada mode terang, `border-slate-800` pada mode gelap) dengan ketebalan 1px.
- Garis batas berfungsi mempertegas kelompok konten tanpa mendominasi pandangan mata.

---

## 210. Struktur Token Desain Kanonikal (Design Tokens Architecture)

Struktur token desain kanonikal (*Design Tokens Architecture*):
- Seluruh variabel visual diabstraksikan ke dalam berkas konfigurasi desain terpusat:
  - `tokens/colors.json`
  - `tokens/spacing.json`
  - `tokens/typography.json`
  - `tokens/radii.json`
  - `tokens/shadows.json`

---

## 211. Strategi Implementasi dengan Tailwind CSS (Tailwind CSS Framework Strategy)

Strategi implementasi dengan Tailwind CSS (*Tailwind CSS Framework Strategy*):
- Menghindari kelas utilitas ad-hoc dengan nilai sembarang seperti `w-[347px]` atau `bg-[#12a9bc]`.
- Seluruh token warna dan spasi didaftarkan pada `tailwind.config.js` sehingga tim rekayasa selalu menggunakan kelas kanonikal (misal: `bg-teal-600`, `p-card`, `rounded-card`).

---

## 212. Prinsip Penggunaan Ulang Komponen Antarmuka (Component Reusability Matrix)

Prinsip penggunaan ulang komponen antarmuka (*Component Reusability Matrix*):
- Sebelum menciptakan komponen baru, pengembang wajib memeriksa pustaka komponen bersama.
- Hindari duplikasi kode seperti `HealthCardA`, `HealthCardB`, `HealthCardC`; gunakan satu komponen terpadu `HealthMetricCard` yang dapat dikonfigurasi melalui *props*.

---

## 213. Desain Antarmuka Pemrograman Komponen (Component Props API Design)

Desain antarmuka pemrograman komponen (*Component Props API Design*):
- Komponen dirancang dengan kontrak *props* yang terprediksi:
  ```html
  <x-health-metric-card 
      title="Durasi Tidur Malam"
      value="6 jam 15 menit"
      unit="WIB"
      status="pattern-shift"
      trend="down"
      :evidence="$sleepEvidence" />
  ```

---

## 214. Penegakan Aksesibilitas di Tingkat Komponen (Component Accessibility Contract)

Penegakan aksesibilitas di tingkat komponen (*Component Accessibility Contract*):
- Setiap komponen wajib menyertakan perilaku aksesibilitas internalnya secara mandiri:
  - Komponen Modal wajib mengunci fokus (*Focus Trap*), menangani tombol `Escape`, dan menyematkan `role="dialog"`.
  - Komponen Dropdown wajib mendukung navigasi tombol panah atas/bawah.

---

## 215. Konsistensi Visual & Interaksi Seluruh Sistem (Systemwide Visual Consistency)

Konsistensi visual dan interaksi seluruh sistem (*Systemwide Visual Consistency*):
- Pola interaksi tombol, formulir, pemilih tanggal, dan animasi harus berperilaku sama persis di ruang Anggota, ruang Instruktur, maupun ruang Administrator.

---

## 216. Ringkasan Topologi Arsitektur UX Terpadu (Comprehensive UX Topology)

Ringkasan topologi arsitektur pengalaman pengguna terpadu AEVYRA (*Comprehensive UX Topology*):

```text
                                PENGALAMAN PENGGUNA AEVYRA
                                             │
               ┌─────────────────────────────┼─────────────────────────────┐
               ▼                             ▼                             ▼
       RUANG KERJA ANGGOTA          RUANG KERJA INSTRUKTUR        RUANG KERJA ADMIN
          (Member Space)              (Instructor Space)            (Admin Space)
               │                             │                             │
               ▼                             ▼                             ▼
       SEDERHANA & TENANG            KERAPATAN DATA TINGGI         KONTROL OPERASIONAL
      (Actionable Wellness)         (Signal & Case Management)     (Governance & Audit)
               │                             │                             │
               └─────────────────────────────┼─────────────────────────────┘
                                             ▼
                             SISTEM DESAIN KANONIKAL BERSAMA
                             (Design Tokens, Atomic UI Library)
                                             │
               ┌─────────────────────────────┼─────────────────────────────┐
               ▼                             ▼                             ▼
      KOMPONEN MODULAR              AKSESIBILITAS PENUH           TATA LETAK RESPONSIF
      (Blade & Tailwind)             (WCAG 2.1 Level AA)          (Mobile-First & PWA)
               │                             │                             │
               └─────────────────────────────┼─────────────────────────────┘
                                             ▼
                               KEPERCAYAAN & KESELAMATAN JIWA
                                (Safe, Transparent, Sovereign)
```

---

## 217. Siklus Pengalaman Inti Anggota Komunitas (Core Member UX Journey)

Siklus pengalaman inti anggota komunitas (*Core Member UX Journey*):

```text
Dasbor Beranda ➔ Baca Wawasan Tren ➔ Pahami Deviasi ➔ Ambil Rekomendasi Mikro ➔ Jalani Rutinitas ➔ Pantau Hasil Positif
```

---

## 218. Siklus Pengalaman Kerja Instruktur Pendamping (Core Instructor UX Workflow)

Siklus pengalaman kerja instruktur pendamping (*Core Instructor UX Workflow*):

```text
Dasbor Pembimbing ➔ Tinjau Antrean Sinyal ➔ Evaluasi Konteks Klien ➔ Rancang Arahan Intervensi ➔ Jadwalkan Sesi Konsultasi ➔ Pantau Kepatuhan
```

---

## 219. Siklus Pengalaman Kerja Administrator Sistem (Core Admin UX Workflow)

Siklus pengalaman kerja administrator sistem (*Core Admin UX Workflow*):

```text
Dasbor Operasional ➔ Deteksi Peristiwa Anomali ➔ Tinjau Laporan Moderasi ➔ Eksekusi Tindakan Kebijakan ➔ Rekam ke Jejak Audit Forensik
```

---

## 220. Taksonomi Anti-Pola Desain Antarmuka (UX Anti-Patterns Taxonomy)

Taksonomi anti-pola desain antarmuka (*UX Anti-Patterns Taxonomy*):
- Antarmuka AEVYRA wajib bebas dari 7 anti-pola desain yang merusak pengalaman pengguna:
  1. Banjir Data Berlebih (*Data Dump*).
  2. Dominasi AI di Setiap Sudut (*AI Everywhere*).
  3. Inflasi Peringatan Alarmist (*Alert Everything*).
  4. Sandiwara Medis Semu (*Medical Theater*).
  5. Presisi Desimal Palsu (*False Precision*).
  6. Stigmatisasi & Mempermalukan Pengguna (*Shame & Guilt*).
  7. Desain Manipulatif Menjebak (*Dark Patterns*).

---

## 221. Anti-Pola UX: Banjir Data Berlebih (UX Anti-Pattern — Data Dump)

Anti-Pola UX 1: Banjir Data Berlebih (*UX Anti-Pattern — Data Dump*):
- **Pola Buruk:** Menampilkan 20 grafik biometrik dan 15 angka statistik sekaligus di layar utama tanpa hierarki, membingungkan pengguna awam.
- **Pola Rekomendasi AEVYRA:** 1 Wawasan Tren Utama + 3 Metrik Terkait + 1 Tindakan Mikro Nyata Hari Ini.

---

## 222. Anti-Pola UX: Dominasi AI di Setiap Sudut (UX Anti-Pattern — AI Everywhere)

Anti-Pola UX 2: Dominasi AI di Setiap Sudut (*UX Anti-Pattern — AI Everywhere*):
- **Pola Buruk:** Menempelkan tombol *"Tanya AI"* pada setiap sudut tabel dan kartu tanpa tujuan fungsional yang jelas.
- **Pola Rekomendasi AEVYRA:** Asisten AI dihadirkan pada ruang khusus yang membutuhkan pendalaman dialog edukatif terpandu.

---

## 223. Anti-Pola UX: Inflasi Peringatan Alarmist (UX Anti-Pattern — Alert Everything)

Anti-Pola UX 3: Inflasi Peringatan Alarmist (*UX Anti-Pattern — Alert Everything*):
- **Pola Buruk:** Mengirimkan notifikasi darurat merah menyala untuk setiap perubahan kecil jam tidur harian, memicu kejenuhan peringatan (*alert fatigue*).
- **Pola Rekomendasi AEVYRA:** Hanya memunculkan sinyal jika deviasi konsisten terjadi minimal 3-5 hari berturut-turut.

---

## 224. Anti-Pola UX: Sandiwara Medis Semu (UX Anti-Pattern — Medical Theater)

Anti-Pola UX 4: Sandiwara Medis Semu (*UX Anti-Pattern — Medical Theater*):
- **Pola Buruk:** Mendesain antarmuka menyerupai monitor ruang rawat inap rumah sakit lengkap dengan istilah *Pasien*, *Diagnosis*, *Risiko Kematian*.
- **Pola Rekomendasi AEVYRA:** Menggunakan pendekatan sahabat bimbingan gaya hidup sehat yang tenang, modern, dan bersahabat.

---

## 225. Anti-Pola UX: Presisi Desimal Palsu (UX Anti-Pattern — False Precision)

Anti-Pola UX 5: Presisi Desimal Palsu (*UX Anti-Pattern — False Precision*):
- **Pola Buruk:** Menampilkan *"Skor Kebugaran Anda 83.742%"* yang memberi ilusi kepastian laboratorium semu.
- **Pola Rekomendasi AEVYRA:** Menggunakan pembulatan bilangan bulat dan kategori tren deskriptif.

---

## 226. Anti-Pola UX: Stigmatisasi & Mempermalukan Pengguna (UX Anti-Pattern — Shame & Guilt)

Anti-Pola UX 6: Stigmatisasi & Mempermalukan Pengguna (*UX Anti-Pattern — Shame & Guilt*):
- **Pola Buruk:** Menggunakan kata-kata *"Anda Malas"*, *"Gagal Mencapai Target"*, atau visual orang menangis saat pengguna beristirahat.
- **Pola Rekomendasi AEVYRA:** Nada suportif yang memvalidasi kebutuhan istirahat tubuh: *"Dengarkan sinyal tubuh Anda; mari mulai kembali langkah kecil esok hari."*

---

## 227. Anti-Pola UX: Desain Manipulatif Menjebak (UX Anti-Pattern — Dark Patterns)

Anti-Pola UX 7: Desain Manipulatif Menjebak (*UX Anti-Pattern — Dark Patterns*):
- **Pola Buruk:** Menyembunyikan tombol pembatalan langganan, memaksa persetujuan pembagian data privasi, atau menghitung mundur waktu palsu (*fake urgency*).
- **Pola Rekomendasi AEVYRA:** Menghormati otonomi penuh pengguna dengan kontrol privasi transparan dan alur pembatalan yang jujur.

---

## 228. Daftar Periksa Kepatuhan Desain Pengalaman (UX Acceptance Checklist)

Daftar periksa kepatuhan desain pengalaman pengguna (*Comprehensive UX Acceptance Checklist*):

- [ ] Sasaran halaman terdefinisi dan jelas bagi pengguna dalam <3 detik.
- [ ] Terdapat satu tindakan utama tunggal (*Primary Action*) yang menonjol.
- [ ] Arsitektur navigasi konsisten di seluruh perangkat.
- [ ] Tata letak responsif penuh dari ponsel hingga desktop lebar.
- [ ] Memenuhi standar kepatuhan aksesibilitas WCAG 2.1 Level AA.
- [ ] Seluruh status pemuatan data (*Loading / Skeleton*) terpasang.
- [ ] Seluruh status ruang data kosong (*Empty States*) memuat panduan aksi.
- [ ] Penanganan galat sistem menyajikan instruksi pemulihan yang ramah.
- [ ] Mode luring PWA teruji dan menampilkan umpan balik yang jelas.
- [ ] Panel pengaturan privasi terhubung dan berfungsi transparan.
- [ ] Bahasa antarmuka telah ditinjau bebas dari vonis medis dan rasa takut.
- [ ] Konsistensi istilah baku terverifikasi di seluruh modul.
- [ ] Bebas dari 7 anti-pola desain antarmuka manipulatif (*Dark Patterns*).

---

## 229. Daftar Periksa Kepatuhan Layar Dasbor (Dashboard Acceptance Checklist)

Daftar periksa kepatuhan layar dasbor (*Dashboard Acceptance Checklist*):

- [ ] Sasaran aktif pengguna terlihat jelas di bilah tajuk.
- [ ] Kartu wawasan deviasi terpenting disajikan di bagian atas.
- [ ] Tombol tindakan cepat (*Quick Actions*) mudah dijangkau jempol tangan.
- [ ] Indikator kemajuan target harian tersaji tanpa angka presisi semu.
- [ ] Tidak terjadi penumpukan grafik berlebih (*Data Dump Free*).
- [ ] Teroptimasi sempurna pada layar ponsel pintar (*Mobile-First*).
- [ ] Waktu pemuatan awal dasbor (*First Contentful Paint*) di bawah 1.5 detik.

---

## 230. Daftar Periksa Kepatuhan Antarmuka Asisten AI (AI UI Acceptance Checklist)

Daftar periksa kepatuhan antarmuka asisten AI (*AI UI Acceptance Checklist*):

- [ ] Identitas asisten AI dinyatakan secara jujur dan transparan.
- [ ] Dialog obrolan mendukung pembaca layar dan navigasi keyboard penuh.
- [ ] Status pemuatan teks bertahap (*Streaming Response*) berfungsi mulus.
- [ ] Rekomendasi pertanyaan awal pintar (*Prompt Chips*) tersedia.
- [ ] Penjelasan menyertakan transparansi konteks data riwayat yang digunakan.
- [ ] Eksekusi tindakan sistem wajib melalui dialog konfirmasi eksplisit.
- [ ] Tombol pengalihan ke staf pendamping manusia (*Human Handoff*) aktif.
- [ ] Bebas dari klaim vonis diagnosis medis atau resep obat farmasi.

---

## 231. Daftar Periksa Kepatuhan Antarmuka Pemindai (Scanner UI Acceptance Checklist)

Daftar periksa kepatuhan antarmuka pemindai nutrisi (*Scanner UI Acceptance Checklist*):

- [ ] Penjelasan kebutuhan izin kamera disajikan sebelum dialog peramban.
- [ ] Bingkai bidik kamera memiliki rasio pandang yang jelas dan lega.
- [ ] Animasi pemindaian mengindikasikan proses estimasi dengan jelas.
- [ ] Hasil pemindaian menampilkan derajat keyakinan secara kualitatif.
- [ ] Pengguna diberikan opsi koreksi porsi makanan secara manual.
- [ ] Skenario keyakinan rendah menyediakan tombol foto ulang dan catat manual.
- [ ] Data pemindai berstatus draf calon data sebelum dikonfirmasi simpan.

---

## 232. Daftar Periksa Kepatuhan Ruang Instruktur (Instructor UI Acceptance Checklist)

Daftar periksa kepatuhan ruang kerja instruktur (*Instructor UI Acceptance Checklist*):

- [ ] Ruang kerja secara tegas menampilkan identitas *Instructor Workspace*.
- [ ] Antrean sinyal klien menyajikan informasi deviasi yang terprioritisasi.
- [ ] Detail profil anggota dibagi ke dalam tab navigasi yang teratur.
- [ ] Formulir intervensi membatasi saran pada ranah kebugaran dan nutrisi.
- [ ] Kalender ketersediaan sesi bimbingan mudah diatur dan disinkronkan.
- [ ] Batas privasi rekam medis ditegakkan sesuai kontrak bimbingan aktif.

---

## 233. Daftar Periksa Kepatuhan Ruang Administrator (Admin UI Acceptance Checklist)

Daftar periksa kepatuhan ruang kerja administrator (*Admin UI Acceptance Checklist*):

- [ ] Dasbor operasional menyajikan metrik sistem agregat secara teratur.
- [ ] Tata kelola akun pengguna mendukung pencarian, filter, dan paginasi cepat.
- [ ] Tabel rekam medis sensitif menyamarkan data privat anggota.
- [ ] Tabel jejak audit forensik mencatat seluruh mutasi wewenang kekal.
- [ ] Formulir konfigurasi sistem memvalidasi masukan secara ketat.

---

## 234. Daftar Periksa Kepatuhan Pengalaman Ponsel Pintar (Mobile Acceptance Checklist)

Daftar periksa kepatuhan pengalaman ponsel pintar (*Mobile Acceptance Checklist*):

- [ ] Navigasi bilah bawah (*Bottom Nav*) mudah dijangkau satu jempol tangan.
- [ ] Seluruh elemen interaktif memiliki area target sentuh minimal 48x48px.
- [ ] Formulir masukan tidak tertutup oleh kemunculan keyboard virtual gawai.
- [ ] Alur pemindai kamera berfungsi mulus pada kamera belakang ponsel.
- [ ] Tombol panggilan darurat 119/112 langsung memicu dialer telepon perangkat.
- [ ] Grafik biometrik dapat dibaca tanpa teks yang saling bertumpuk.

---

## 235. Prinsip Utama Pengalaman Pengguna Berdaulat (Final UX Sovereign Principle)

Prinsip utama pengalaman pengguna berdaulat (*Final UX Sovereign Principle*):

> [!IMPORTANT]
> **PRINSIP PENGALAMAN MANUSIAWI AEVYRA:**  
> *"AEVYRA hadir sebagai sahabat pendamping gaya hidup preventif yang tenang, memberdayakan, dan terpercaya — bukan sistem sirine alarm medis yang menakut-nakuti, dan bukan sekadar kotak obrolan AI tanpa tujuan nyata."*

Pengalaman pengguna dirancang untuk terus mengalir menuju:
```text
KEJELASAN MAKNA ➔ RASA PERCAYA DIRI ➔ AKSI KEBIASAAN NYATA ➔ UMPAN BALIK POSITIF
```
tanpa pernah menciptakan ketakutan, kebingungan, banjir informasi, atau ketergantungan semu.

---

## 236. Model Interaksi Lingkaran Tertutup Preventif (Final Interaction Loop Model)

Model interaksi lingkaran tertutup preventif (*Final Interaction Loop Model*):

```text
               KEINGINAN PENGGUNA (User Intent)
                              │
                              ▼
             INTERAKSI RINGAN & SEDERHANA (Simple UX)
                              │
                              ▼
             UMPAN BALIK INSTAN & JELAS (Clear Feedback)
                              │
                              ▼
            WAWASAN TREN YANG RELEVAN (Contextual Insight)
                              │
                              ▼
              TINDAKAN MIKRO AMAN (Safe Preventive Action)
                              │
                              ▼
             KEMAJUAN NYATA TERLIHAT (Visible Progress)
```

---

## 237. Prinsip Pamungkas Sistem Desain Visual (Final Design System Principle)

Prinsip pamungkas sistem desain visual AEVYRA (*Final Design System Principle*):
- Setiap halaman, komponen, dan interaksi wajib terasa sebagai bagian tak terpisahkan dari satu ekosistem yang utuh.
- Keharmonisan visual ditegakkan tanpa kompromi pada: **Tata Letak (*Layout*)**, **Tipografi (*Typography*)**, **Palet Warna (*Color*)**, **Spasi (*Spacing*)**, **Komponen (*Components*)**, **Terminologi (*Terminology*)**, **Aksesibilitas (*Accessibility*)**, dan **Standar Keselamatan (*Safety*)**.

---

## 238. Bintang Panduan Pengalaman Manusiawi AEVYRA (North-Star Human Experience)

Bintang panduan pengalaman manusiawi AEVYRA (*North-Star Human Experience*):

> [!NOTE]
> **Pernyataan Pengalaman Bintang Panduan (North-Star UX):**  
> Desain antarmuka AEVYRA berhasil memenuhi takdirnya ketika pengguna merasakan:  
> *"Saya memahami apa yang berubah pada ritme tubuh saya, saya tahu persis tindakan mikro apa yang dapat saya lakukan hari ini, dan saya dapat melihat dampak positif yang terjadi setelahnya."*  
>   
> **Bukan:** *"Aplikasi ini membombardir saya dengan tumpukan grafik dan angka yang membuat saya cemas."*

Siklus Pengalaman Inti Terpadu:
```text
AMATI (Observe) ➔ PAHAMI (Understand) ➔ BERTINDAK (Act) ➔ PANTAU (Monitor) ➔ TINGKATKAN (Improve)
```
Dan seluruh desain visual antarmuka AEVYRA wajib senantiasa memperkuat lingkaran tertutup yang menyehatkan ini.
