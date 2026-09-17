# PRONOIA — Peta Jalan & Rencana Pengiriman MVP (MVP Roadmap & Delivery Plan)

> **Spesifikasi Lengkap Strategi Rilis Minimum Viable Product (MVP), Fondasi Rekayasa Perangkat Lunak Bertahap (Fase 0 s.d. Fase 7), Arsitektur Irisan Vertikal (Vertical Slices), Skenario Demonstrasi Kompetisi Kanonikal, Matriks Ketergantungan Modul, Tata Kelola Utang Teknis, Kriteria Kelayakan Rilis (Definition of Done), serta Validasi Lingkaran Preventif Tertutup (Closed-Loop Preventive Health).**

---

### Informasi Dokumen & Kontrol Versi

| Atribut Metadata | Rincian Dokumen Teknis |
| :--- | :--- |
| **Kode Dokumen** | `PRONOIA-DOC-014` |
| **Versi Spesifikasi** | `v1.0.0-PROD` (Release Ready & Competition Optimized) |
| **Domain Arsitektur** | Delivery Planning, Sprint Cadence, Engineering Milestones, Vertical Slicing, Competition Demo |
| **Tingkat Kerahasiaan** | **Internal Confidential & Audit-Ready** (Departemen Produk, Engineering, & Medis) |
| **Target Ekosistem** | PRONOIA Full-Stack (Laravel Backend, PostgreSQL, Redis, Vue/React/Tailwind Frontend, AI Pipeline) |
| **Penyelarasan Kompetisi** | ICONFEST 2026 / Hackathon / National Healthtech Exhibition Stage |
| **Prinsip Utama** | **"Build the foundation before the intelligence. The MVP is the working preventive health loop."** |
| **Status Validasi** | **61 Seksi Terstruktur Lengkap** (0 Seksi Dihilangkan / 100% Invarian Terpenuhi) |

---

### Ringkasan Eksekutif & Peta Klaster Arsitektur (Architecture Clusters)

Peta jalan (*Roadmap*) PRONOIA bukanlah sekadar daftar fitur yang terisolasi, melainkan sebuah rencana rekayasa terstruktur untuk membuktikan berfungsinya **lingkaran kesehatan preventif tertutup (*Closed-Loop Preventive Health Engine*)**. Pendekatan pengiriman berfokus pada pembangunan fondasi data dan keamanan yang kokoh sebelum menambahkan kecerdasan buatan (*build the foundation before the intelligence*). 

Setiap fase rilis, irisan vertikal (*vertical slice*), dan tonggak pencapaian (*milestone*) dirancang untuk memvalidasi satu rantai nilai klinis utama: **Pengamatan (*Observe*) ──► Pemahaman (*Understand*) ──► Deteksi Perubahan (*Detect Change*) ──► Penjelasan Berbasis Bukti (*Explain*) ──► Intervensi Terarah (*Intervene*) ──► Pemantauan Kemajuan (*Monitor*) ──► Eskalasi Manusiawi (*Escalate*) ──► Perbaikan Gaya Hidup (*Improve*)**.

Seluruh 61 seksi dalam spesifikasi ini dipetakan ke dalam **6 Klaster Strategis**:

```
                                  PETA JALAN & RENCANA PENGIRIMAN MVP PRONOIA
                                  ═══════════════════════════════════════════
  ┌───────────────────────────────────────────────────────┬───────────────────────────────────────────────────────┐
  │ [Klaster 1] Filosofi & Cakupan MVP (Seksi 1 - 12)     │ [Klaster 2] UX, AI, & Fondasi Teknis (Seksi 13 - 22)  │
  │ • Prinsip Inti: Fondasi Mendahului Kecerdasan AI      │ • Dasbor Terpadu: Insight > Action > Progress         │
  │ • Definisi MVP: Eksekusi Lingkaran Preventif Tertutup │ • Portal Instruktur & Alur Konsultasi Telemedisin     │
  │ • Cakupan Fungsional: Baseline, Behavior Engine,      │ • Asisten AI Beretika & Pemindai Kamera Nutrisi       │
  │   Insight Berbasis Bukti, Intervensi & Garis Waktu    │ • Pintasan Darurat Medis & Fondasi Stack Laravel      │
  ├───────────────────────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ [Klaster 3] Rencana Rilis 8 Fase (Seksi 23 - 30)      │ [Klaster 4] Demo Kompetisi & Graf Dependensi (31 - 37)│
  │ • Fase 0: Setup Proyek, Basis Data, & Autentikasi RBAC│ • Dataset Uji Coba Terstandar (Demo User Baseline)    │
  │ • Fase 1: Entri Data Vital Fisiologis & Gaya Hidup    │ • Skenario Kanonikal Demo Panggung (Cerita Tunggal)   │
  │ • Fase 2: Mesin Perilaku & Deteksi Deviasi Baseline   │ • Komparasi "Sebelum vs Sesudah" Intervensi Preventif │
  │ • Fase 3: Intervensi Terarah, Tugas Mikro, & Kemajuan │ • Graf Ketergantungan Modul & 4 Jalur Paralel (A - D) │
  │ • Fase 4 s.d. 7: Dukungan Pakar, AI, & Hardening Demo │ • Struktur Tonggak M0 s.d. M7 Menuju Panggung Juara   │
  ├───────────────────────────────────────────────────────┼───────────────────────────────────────────────────────┤
  │ [Klaster 5] Tata Kelola Rilis & Risiko (Seksi 38 - 48)│ [Klaster 6] Irisan Vertikal & Masa Depan (Seksi 49-61)│
  │ • Matriks Fitur MVP: Wajib vs Ditangguhkan            │ • 6 Irisan Vertikal (E2E Slices #1 hingga #6)         │
  │ • Kebijakan Utang Teknis & Gerbang Kualitas Produksi  │ • Gerbang Kualitas CI/CD, Pengujian, & Metrik Kinerja │
  │ • 5 Skenario Benih Data Demo (Scenarios A s.d. E)     │ • Validasi Bintang Panduan (North Star Completed Loop)│
  │ • Mitigasi 6 Risiko Utama & Aturan Pembekuan Scope    │ • Peta Jalan Pasca-MVP (Fase 8A - 8E) & Prinsip Akhir │
  └───────────────────────────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 1. Tujuan Dokumen & Ruang Lingkup (Document Purpose & Scope)

Dokumen spesifikasi ini mendefinisikan secara menyeluruh peta jalan (*roadmap*) rekayasa perangkat lunak platform PRONOIA, mulai dari pembangunan fondasi arsitektur dasar hingga terwujudnya versi *Minimum Viable Product* (MVP) yang siap diuji, didemonstrasikan di panggung kompetisi (ICONFEST 2026), dan dikembangkan lebih lanjut menuju skala produksi.

Peta jalan ini berfungsi sebagai panduan strategis bagi tim rekayasa untuk:

| Fungsi Panduan Roadmap | Manfaat Bagi Tim Rekayasa & Produk |
| :--- | :--- |
| **Penetapan Prioritas Rilis** | Menentukan urutan implementasi modul secara bertahap dan logis. |
| **Pengendalian Cakupan (*Scope Control*)** | Menjaga agar batas cakupan fitur tidak melebar liar (*anti-feature creep*). |
| **Manajemen Ketergantungan (*Dependency Map*)** | Memetakan dependensi teknis antar-layanan (data ──► engine ──► UI). |
| **Diferensiasi Tahapan Fitur** | Membedakan secara tegas antara fitur wajib MVP dan fitur lanjutan pasca-MVP. |
| **Kesiapan Demonstrasi Kompetisi** | Menjamin ketersediaan satu alur cerita demonstrasi panggung yang utuh dan meyakinkan. |

> [!IMPORTANT]
> Dokumen ini memegang prinsip bahwa **keberhasilan MVP diukur dari bekerjanya satu siklus lingkaran preventif secara tertutup (*Closed-Loop Preventive Health*)**, bukan dari banyaknya jumlah halaman antarmuka atau tombol yang tersedia.

---

## 2. Prinsip Utama Roadmap (Core Roadmap Principles)

Pengembangan platform PRONOIA berakar pada filosofi rekayasa perangkat lunak yang kokoh:

> **"Bangun Fondasinya Terlebih Dahulu Sebelum Menambahkan Kecerdasan Buatan."**
> *(Build the foundation before the intelligence.)*

Fitur kecerdasan buatan (*AI*), pemindai visual (*scanner*), gamifikasi (*gamification*), keanggotaan berbayar (*membership*), dan ruang komunitas **secara mutlak dilarang menjadi fokus awal pengembangan** jika fondasi data medis, otorisasi peran, protokol keselamatan klinis, dan mesin perilaku (*behavioral engine*) belum beroperasi stabil.

### Urutan Hirarki Rekayasa Produk:
```
  [1] Fondasi Sistem & Keamanan (Foundation & RBAC)
            │
            ▼
  [2] Model Data Kesehatan & Normalisasi (Core Health Data)
            │
            ▼
  [3] Garis Acuan Riwayat Pribadi (Personal Baseline Engine)
            │
            ▼
  [4] Deteksi Perubahan Pola (Behavior Detection & Signals)
            │
            ▼
  [5] Wawasan Berbasis Bukti (Explainable Insights)
            │
            ▼
  [6] Rekomendasi Terarah (Actionable Recommendations)
            │
            ▼
  [7] Intervensi Gaya Hidup (Preventive Interventions)
            │
            ▼
  [8] Pelacakan Kemajuan (Progress Tracking & Timeline)
            │
            ▼
  [9] Pendampingan Manusiawi (Human Expert Support)
            │
            ▼
  [10] Akselerasi AI & Scanner (AI Assistance & Vision Engine)
            │
            ▼
  [11] Keterlibatan & Retensi (Gamification & Community)
```

Dengan hierarki ini, PRONOIA terhindar dari jebakan *"kumpulan gimmick fitur terpisah"* dan tampil sebagai **Platform Kesehatan Preventif Berdaulat (*Sovereign Preventive Health Platform*)**.

---

## 3. Strategi Pengiriman Produk (Product Delivery Strategy)

Pengembangan dan rilis perangkat lunak PRONOIA diatur melalui strategi pengiriman 9 fase terstruktur:

| Kode Fase | Nama Fase Pengiriman | Fokus Utama Rilis |
| :--- | :--- | :--- |
| **Fase 0** | *Foundation* | Setup repositori, basis data PostgreSQL, otentikasi, RBAC, dan audit log. |
| **Fase 1** | *Core Health Data* | Skema rekam medis, validasi rentang fisiologis, dan normalisasi satuan. |
| **Fase 2** | *Health Behavior Engine* | Komputasi garis acuan (*baseline*), deteksi tren, dan pembangkitan sinyal deviasi. |
| **Fase 3** | *Preventive Intervention* | Pembangkitan wawasan (*insights*), rekomendasi preventif, dan tugas intervensi. |
| **Fase 4** | *Human Support* | Portal kerja instruktur, penugasan klien, dan alur konsultasi terjadwal. |
| **Fase 5** | *AI & Scanner* | Penjelasan wawasan berbasis AI terpandu dan OCR pemindai label makanan. |
| **Fase 6** | *Engagement* | Buku besar poin idempoten, lencana pencapaian, dan perlindungan *streak*. |
| **Fase 7** | *Competition Hardening* | Dataset benih demo, pengujian skenario panggung, dan optimasi performa. |
| **Fase 8** | *Post-MVP Expansion* | Integrasi perangkat *wearable*, analitik institusional, dan multi-bahasa. |

> [!TIP]
> Tidak semua fitur harus selesai untuk menghasilkan produk yang berbobot tinggi. Target utama MVP adalah membuktikan **satu lingkaran kesehatan preventif lengkap yang dapat diverifikasi ujung-ke-ujung (*end-to-end*)**.

---

## 4. Definisi Minimum Viable Product (Definition of MVP)

Sebuah rilis resmi diakui sebagai **MVP PRONOIA yang Sah** apabila dan hanya apabila seorang Anggota (*Member*) dapat menjalani alur pengalaman preventif tertutup berikut:

```
  Registrasi Akun Baru
           │
           ▼
  Lengkapi Profil & Preferensi Gaya Hidup
           │
           ▼
  Tetapkan Sasaran Kesehatan Preventif
           │
           ▼
  Catat Data Fisiologis Harian (Tidur / Langkah / Hidrasi)
           │
           ▼
  Sistem Membentuk Garis Acuan Riwayat (Personal Baseline)
           │
           ▼
  Sistem Mendeteksi Deviasi Pola yang Bermakna (Behavior Signal)
           │
           ▼
  Sistem Menghasilkan Wawasan yang Dapat Dijelaskan (Explainable Insight)
           │
           ▼
  Sistem Memberikan Rekomendasi Tindakan Mikro (Recommendation)
           │
           ▼
  Pengguna Berkomitmen Menjalankan Aksi (Active Intervention)
           │
           ▼
  Sistem Melacak Keteraturan & Kemajuan (Progress Tracking)
           │
           ▼
  Eskalasi ke Instruktur / Ahli Gizi Saat Diperlukan (Human Support)
```

### Standar Pembuktian Teknis:
Alur di atas wajib berjalan mulus dengan:
1. **Penyimpanan Data Riil**: Tersimpan secara persisten pada basis data relasional.
2. **Kalkulasi Deterministik**: Logika mesin perilaku menghasilkan status yang dapat direproduksi dan diaudit.
3. **Pemberian Wawasan Transparan**: Menjelaskan bukti pendukung tanpa diagnosa semu.
4. **Keamanan & Otorisasi**: Pembatasan hak akses peran teruji ketat.

---

## 5. Cakupan Fungsional MVP (MVP Scope Breakdown)

Cakupan fungsional minimum yang wajib tersedia pada MVP terbagi menjadi 3 subsistem dasar:

### 5.1 Identitas & Akses Pengguna (*Identity & Access Control*)
- **Manajemen Akun**: Registrasi mandiri, verifikasi kredensial, *login*, *logout*, dan pemulihan kata sandi (*password reset*).
- **Otorisasi Berbasis Peran (*RBAC*)**: Penegakan hak akses terpisah untuk 3 peran kanonikal: `Member`, `Instructor`, dan `Admin`.
- **Manajemen Sesi Aman**: Pengelolaan token sesi, kedaluwarsa sesi, dan pengaturan profil dasar.

### 5.2 Profil Anggota (*Member Profile*)
- **Data Demografis Aman**: Rentang usia / tanggal lahir, jenis kelamin biologis (untuk normalisasi rentang metabolik jika relevan), zona waktu lokal.
- **Informasi Gaya Hidup & Sasaran**: Sasaran kesehatan preventif (misal: stabilitas ritme tidur, manajemen kelelahan), riwayat kondisi kesehatan yang dilaporkan mandiri, dan persetujuan privasi data (*consent state*).

### 5.3 Pencatatan Data Kesehatan Inti (*Core Health Data Logging*)
Setiap entri data fisiologis wajib merekam metadata lengkap:
```
  • Jenis Metrik  : Durasi Tidur, Aktivitas Fisik (Langkah), Hidrasi, Log Makanan
  • Sumber Data   : Input Manual Terverifikasi / Integrasi Data Uji Coba
  • Waktu Rekam   : Timestamp Berzona Waktu Presisi
  • Nilai & Satuan: Angka Numerik dengan Satuan Baku (Jam, Menit, Langkah, mL)
  • Kualitas Data : Status Kualitas (Valid, Anomali, Butuh Tinjauan)
```

---

## 6. Mesin Garis Acuan MVP (MVP Baseline Engine)

Sistem wajib memiliki modul pembentukan **Garis Acuan Riwayat Pribadi (*Personal Baseline Engine*)**:

```
  JENDELA OBSERVASI (OBSERVATION WINDOW: 14 - 28 HARI)
  Merekam fluktuasi alami kebiasaan hidup individu.
                       │
                       ▼
  RATA-RATA & DISTRIBUSI NORMAL PRIBADI (PERSONAL BASELINE)
  Contoh: Rata-rata Durasi Tidur = 7 Jam 20 Menit (Rentang Wajar: 7j s.d. 7j30m)
                       │
                       ▼
  DATA TIKET AKTUAL HARI INI: 5 Jam 15 Menit
                       │
                       ▼
  DEVIASI TERDETEKSI: Penurunan Persisten di Bawah Garis Acuan Sendiri
```

> [!NOTE]
> Garis acuan pribadi **BUKAN merupakan standar baku ideal medis populasi**, melainkan cerminan pola riwayat hidup pengguna bersangkutan untuk mengidentifikasi pergeseran kebiasaan secara objektif.

---

## 7. Mesin Perilaku Kesehatan MVP (MVP Health Behavior Engine)

Mesin Perilaku Kesehatan (*Health Behavior Engine*) adalah jantung analitik preventif platform PRONOIA. 

### Alur Kerja Pemrosesan (*Engine Processing Pipeline*):
```
  Entri Rekam Medis
         │
         ▼
  Normalisasi Satuan & Pembersihan Data
         │
         ▼
  Validasi Kualitas Data Fisiologis
         │
         ▼
  Pencocokan Terhadap Garis Acuan Pribadi
         │
         ▼
  Ekstraksi Fitur & Deteksi Tren Perilaku
         │
         ▼
  Kualifikasi Perubahan Bermakna (Persistensi)
         │
         ▼
  Pembangkitan Sinyal Deviasi Perilaku (Behavior Signal)
         │
         ▼
  Penerbitan Wawasan Berbasis Bukti (Insight)
         │
         ▼
  Penyusunan Rekomendasi Preventif (Recommendation)
```

Pada fase MVP, mesin ini mengutamakan **aturan deterministik transparan (*deterministic rules*)** daripada *black-box machine learning*, sehingga setiap keputusan sistem dapat dijelaskan dan dipertanggungjawabkan secara medis.

---

## 8. Mesin Wawasan Cerdas MVP (MVP Insight Engine)

Setiap wawasan kesehatan (*Insight*) yang diterbitkan oleh sistem wajib memenuhi formula komunikasi 5 pilar:

| Elemen Wawasan | Pertanyaan Kunci | Contoh Rumusan Wawasan Sistem PRONOIA |
| :--- | :--- | :--- |
| **Apa yang Berubah?** | *What changed?* | *"Rata-rata durasi tidur malam Anda mengalami penurunan dibandingkan garis acuan rutin Anda."* |
| **Mengapa Penting?** | *Why it matters?* | *"Penurunan durasi tidur yang berulang dapat memengaruhi stabilitas energi dan fokus kerja siang hari."* |
| **Apa Bukti Nyatanya?** | *What is the evidence?* | *"Selama 5 malam pencatatan terakhir, durasi tidur Anda berada di angka 5 jam 15 menit (dibandingkan garis acuan 7 jam 20 menit)."* |
| **Apa Tindakan Solusinya?**| *What can user do?* | *"Cobalah mempertahankan jadwal rebahan yang konsisten pada pukul 22.30 selama 7 hari ke depan."* |
| **Kapan Evaluasi Ulang?** | *When to reassess?* | *"Sistem akan meninjau kembali kestabilan ritme tidur Anda pada akhir pekan ini."* |

> [!CAUTION]
> Wawasan dilarang mendiagnosis penyakit kronis secara sepihak, dilarang menyatakan vonis medis mutlak, dan dilarang menggunakan nada menakut-nakuti (*fear-mongering*).

---

## 9. Sistem Rekomendasi Terarah MVP (MVP Recommendation System)

Sistem Rekomendasi (*Recommendation Engine*) menyajikan saran tindakan preventif yang realistis, terukur, dan kontekstual:

```
┌─────────────────────────────────────────────────────────────┐
│                 STRUKTUR ENTITAS REKOMENDASI                │
├─────────────────────────────────────────────────────────────┤
│ • Pemicu Sinyal (Trigger) : Penurunan durasi tidur 5 hari.  │
│ • Rasional Medis (Reason) : Menjaga stabilitas sirkadian.   │
│ • Aksi Konkret (Action)   : Matikan layar 30 mnt sblm tidur.│
│ • Durasi Target (Duration): Program komitmen 7 hari.        │
│ • Target Pantauan (Metric): Durasi tidur kembali mendekat.  │
│ • Rencana Tindak Lanjut   : Evaluasi mingguan bersama ahli. │
└─────────────────────────────────────────────────────────────┘
```

Rekomendasi dirancang dengan beban kognitif ringan (*micro-habits*) agar pengguna tidak merasa kewalahan dalam menjalankannya.

---

## 10. Intervensi Preventif Terstruktur MVP (MVP Preventive Intervention)

Intervensi (*Preventive Intervention*) adalah fase di mana pengguna berkomitmen mengubah rekomendasi menjadi tindakan nyata yang tercatat di sistem:

```
  Wawasan Diterbitkan ──► Rekomendasi Disajikan ──► Pengguna Menerima ──► Intervensi Aktif Dibuat
                                                                                   │
                                                                                   ▼
                                                                        Pemantauan Kemajuan Harian
```

### Format Intervensi yang Didukung pada MVP:
- **Rutinitas Kebiasaan Harian (*Habit Track*)**: Menandai kepatuhan jadwal tidur atau hidrasi pagi.
- **Pengingat Cerdas (*Smart Reminders*)**: Pesan pendorong pada jam-jam strategis harian.
- **Tantangan Mikro Terstruktur (*Micro-Challenge*)**: Program 7 hari pembentukan kebiasaan sehat.
- **Modul Edukasi Singkat (*Bite-Sized Learning*)**: Membaca artikel wawasan preventif terkurasi.
- **Pemeriksaan Kemajuan Mandiri (*Check-in*)**: Kuesioner singkat evaluasi kesegaran fisik.

---

## 11. Pelacakan Kemajuan Perilaku MVP (MVP Progress Tracking)

Setiap program intervensi yang aktif memiliki siklus status yang terdefinisi dengan jelas pada basis data:

| Status Intervensi | Definisi Operasional Status |
| :--- | :--- |
| `PENDING` | Rekomendasi disetujui, menunggu hari pertama pelaksanaan jadwal. |
| `ACTIVE` | Pengguna sedang dalam masa aktif pelaksanaan tugas harian. |
| `COMPLETED` | Seluruh rangkaian tugas terselesaikan sesuai kriteria keberhasilan. |
| `SKIPPED` | Pengguna memilih melewatkan tugas tertentu dengan alasan kenyamanan fisik. |
| `EXPIRED` | Batas waktu pelaksanaan terlampaui tanpa aksi yang memadai. |
| `CANCELLED` | Program dibatalkan secara damai oleh pengguna atau atas anjuran instruktur. |

### Standar Diksi Kemajuan:
Sistem dilarang menyatakan: *"Intervensi ini berhasil menyembuhkan Anda secara medis."*
Diksi yang benar dan aman: *"Pola durasi tidur tercatat Anda kini bergerak semakin dekat menuju garis acuan wajar Anda."*

---

## 12. Garis Waktu & Riwayat Tren MVP (MVP Timeline & Historical View)

Garis Waktu Terpadu (*Longitudinal Health Timeline*) adalah komponen kunci pada antarmuka MVP yang membuktikan hubungan kausalitas antar-peristiwa kesehatan:

```
  HARI KE-1   : Entri data tidur rutin dicatat (7j 15m).
  HARI KE-5   : Terdeteksi pola penurunan tidur selama beberapa malam.
  HARI KE-8   : Sinyal deviasi terpicu (Behavior Signal BS-024).
  HARI KE-8   : Wawasan terbit & Pengguna menyetujui komitmen rekomendasi.
  HARI KE-12  : Intervensi berjalan, kepatuhan jadwal tidur mencapai 80%.
  HARI KE-15  : Sesi check-in mingguan mencatat kenaikan tingkat kesegaran bangun.
  HARI KE-21  : Garis acuan baru dievaluasi ulang, kestabilan ritme tidur pulih.
```

Garis waktu ini membuktikan kepada juri dan pengguna bahwa PRONOIA adalah sistem kesehatan preventif berbasis bukti jangka panjang (*longitudinal evidence-based platform*).

---

## 13. Dasbor Kesehatan Terpadu MVP (MVP Health Dashboard)

Dasbor Anggota (*Member Dashboard*) dirancang untuk menjawab empat pertanyaan eksistensial kesehatan pengguna secara instan:

```
┌─────────────────────────────────────────────────────────────┐
│                 EMPAT PERTANYAAN KUNCI DASBOR               │
├─────────────────────────────────────────────────────────────┤
│ 1. Bagaimana Kondisi Saya Saat Ini?   (How am I doing?)     │
│ 2. Apa yang Berubah dari Kebiasaan?   (What changed?)       │
│ 3. Mengapa Hal Tersebut Penting?      (Why does it matter?) │
│ 4. Apa Tindakan Saya Selanjutnya?     (What should I do?)   │
└─────────────────────────────────────────────────────────────┘
```

### Hierarki Tata Letak Antarmuka Dasbor:
```
  [1] Header Sapaan Berwaktu & Status Sesi
            │
            ▼
  [2] Ringkasan Metrik Fisiologis Utama Hari Ini (Overview)
            │
            ▼
  [3] Kartu Deteksi Perubahan Perilaku (Behavior Changes)
            │
            ▼
  [4] Kartu Wawasan Utama Berbasis Bukti (Important Insights)
            │
            ▼
  [5] Hub Tindakan Rekomendasi Terarah (Recommended Actions)
            │
            ▼
  [6] Bilah Kemajuan Intervensi Aktif (Progress Tracking)
            │
            ▼
  [7] Garis Waktu Riwayat Perjalanan Preventif (Timeline)
```

> [!TIP]
> Dasbor dilarang dipenuhi oleh angka-angka mentah atau grafik dekoratif yang tidak memiliki relevansi dengan pengambilan keputusan perilaku hidup sehat pengguna.

---

## 14. Portal Instruktur & Ahli MVP (MVP Instructor Portal)

Portal Instruktur (*Instructor Portal*) adalah bukti nyata implementasi prinsip pendampingan manusiawi (*Human-in-the-Loop*) pada PRONOIA:

| Fitur Portal Instruktur | Fungsi Spesifik Pada Fase MVP |
| :--- | :--- |
| **Autentikasi Peran Khusus** | Pintu masuk terpisah dengan hak akses peran `Instructor`. |
| **Daftar Klien Tertugaskan** | Hanya menampilkan anggota yang terikat penugasan resmi (*Strict Assignment*). |
| **Ringkasan Tren Klien** | Tinjauan kepatuhan jadwal tidur, aktivitas, dan sinyal deviasi klien. |
| **Pelacak Status Intervensi** | Memantau program intervensi gaya hidup yang sedang dijalankan klien. |
| **Catatan Kolaboratif Ahli** | Ruang catatan klinis privat instruktur untuk bahan konsultasi. |
| **Manajemen Tiket Handoff** | Menerima pengalihan kasus yang dieskalasi oleh Asisten AI. |

Instruktur dilarang mengakses rekam medis anggota di luar daftar penugasan aktif mereka guna menegakkan kerahasiaan data medis.

---

## 15. Alur Konsultasi & Telemedisin MVP (MVP Consultation Workflow)

Alur kerja pemesanan dan pelaksanaan sesi konsultasi (*Consultation Workflow*):

```
  ANGGOTA (MEMBER)
  Mengajukan Permintaan Konsultasi
                │
                ▼
  PEMILIHAN JADWAL KETERSEDIAAN (SLOT SELECTION)
  Memilih slot waktu yang dibuka oleh instruktur
                │
                ▼
  PEMBUATAN TIKET BOOKING (BOOKING CREATED)
  Status awal: 'requested'
                │
                ▼
  KONFIRMASI INSTRUKTUR (INSTRUCTOR CONFIRMATION)
  Status beralih: 'confirmed'
                │
                ▼
  PELAKSANAAN SESI (IN_PROGRESS ──► COMPLETED)
  Tatap muka telemedisin / chat terenkripsi
                │
                ▼
  NOTULENSI & RENCANA TINDAK LANJUT (FOLLOW-UP)
  Instruktur mencatat rekomendasi yang disepakati
```

### Mesin Status Konsultasi:
Sistem mengelola 7 status resmi: `requested`, `confirmed`, `rescheduled`, `in_progress`, `completed`, `cancelled`, dan `no_show`.

---

## 16. Kapabilitas Asisten AI Beretika MVP (MVP AI Assistant Capabilities)

Asisten AI diintegrasikan setelah fondasi data model dan mesin perilaku beroperasi stabil. Pada fase MVP, asisten AI mengemban 4 tugas utama:

### 16.1 Penjelasan Konteks Kesehatan (*Health Context Explanation*)
Asisten AI menerima data bukti terstruktur dari aplikasi untuk menjawab pertanyaan reflektif anggota:
> *"Apa saja perubahan pola tidur dan langkah kaki yang saya alami dalam 2 minggu terakhir?"*

### 16.2 Pembinaan Kebiasaan Preventif (*Preventive Coaching*)
Asisten AI memandu pengguna mencari solusi atas kendala hidup sehat:
> *"Saya sering kesulitan tidur tepat waktu saat lembur kerja. Apa langkah kecil yang bisa saya coba?"*
AI merespons dengan tips manajemen sirkadian tanpa memberikan resep obat tidur.

### 16.3 Penjelasan Wawasan Sistem (*Insight Explanation*)
Asisten AI bertindak sebagai penerjemah wawasan deterministik yang telah dibentuk oleh mesin perilaku:
```
  Mesin Perilaku ──► Wawasan Terstruktur JSON ──► Asisten AI Narator ──► Pengguna
```
AI dilarang mengarang kesimpulan medis mandiri di luar bukti terstruktur yang disediakan aplikasi.

### 16.4 Pengalihan Otomatis ke Ahli Manusia (*Instructor Handoff*)
Jika percakapan mendeteksi kecemasan tinggi, sinyal depresi, atau pertanyaan klinis kompleks:
```
  Anggota Chat AI ──► Deteksi Batas Keamanan ──► Tombol Tawarkan Bantuan Instruktur / Dokter
```

---

## 17. Pemindai Kamera Nutrisi & Lab MVP (MVP Vision & OCR Scanner)

Fitur Pemindai (*Vision & OCR Scanner*) adalah instrumen pengurang friksi pencatatan yang sangat menarik dalam sesi demonstrasi kompetisi:

```
  Buka Kamera Aplikasi
           │
           ▼
  Ambil Foto Makanan / Label Gizi / Lembar Lab
           │
           ▼
  Analisis Visi Komputer & Ekstraksi Teks OCR
           │
           ▼
  Penyajian Estimasi Kandungan Terstruktur (Kalori, Gula, Natrium)
           │
           ▼
  Konfirmasi & Penyesuaian Mandiri oleh Pengguna
           │
           ▼
  Penyimpanan ke Buku Catatan Kesehatan
```

> [!IMPORTANT]
> Keluaran pemindai kamera wajib dikomunikasikan sebagai **estimasi bantuan AI (*AI-assisted estimation*)**, bukan kebenaran mutlak laboratorium. Pengguna selalu diberikan kendali penuh untuk mengoreksi angka sebelum disimpan.

---

## 18. Pintasan Darurat Medis MVP (MVP Emergency Shortcut)

Pintasan Tanggap Darurat (*Emergency Shortcut*) dirancang dengan logika deterministik instan tanpa hambatan komputasi:

```
  TEKAN TOMBOL DARURAT MEDIS (EMERGENCY SOS)
                      │
                      ▼
  TAMPILKAN PANDUAN PERTOLONGAN PERTAMA SEKETIKA
                      │
                      ▼
  BACA LOKASI GPS (JIKA DIIZINKAN PENGGUNA)
                      │
                      ▼
  BUKA PANGGILAN LANGSUNG KE 119 / 112 & PETA IGD TERDEKAT
```

### Aturan Keselamatan Darurat:
- **DILARANG Tergantung pada AI**: Alur darurat dilarang meminta AI menganalisis tingkat kegawatan terlebih dahulu.
- **Bekerja Secara Lokal (*Offline First*)**: Nomor darurat dan panduan dasar pertolongan pertama disimpan secara lokal di memori perangkat klien.

---

## 19. Mekanisme Gamifikasi Sehat MVP (MVP Gamification & Loyalty)

Cakupan gamifikasi pada fase MVP dibatasi pada pilar motivasi yang sehat dan non-toksik:

- **Buku Besar Poin (*Points Ledger*)**: Saldo terakumulasi dari pencatatan log mandiri dan penyelesaian modul belajar.
- **Lencana Tonggak Awal (*Basic Badges*)**: Penghargaan lencana digital untuk aksi perdana (*First Health Log*, *First 7-Day Consistency*).
- **Rangkaian Konsistensi (*Streaks*)**: Menghitung hari berturut-turut penyelesaian aksi kualifikasi sah.
- **Tantangan Sederhana (*Simple Challenges*)**: Program tantangan 7 hari rutinitas tidur atau hidrasi teratur.

Gamifikasi secara mutlak dilarang memeringkat keparahan penyakit atau memberikan imbalan untuk penurunan bobot tubuh ekstrem.

---

## 20. Tingkatan Keanggotaan MVP (MVP Membership & Entitlements)

Matriks hak istimewa keanggotaan (*Membership Entitlements*) pada fase MVP:

| Fitur Layanan Platform | Paket Perak (Silver) | Paket Emas (Gold) | Paket Platina (Platinum) |
| :--- | :---: | :---: | :---: |
| **Pencatatan Mandiri & Metrik Vital** | Termasuk Penuh (✓) | Termasuk Penuh (✓) | Termasuk Penuh (✓) |
| **Wawasan Preventif Deterministik Dasar** | Termasuk Penuh (✓) | Termasuk Penuh (✓) | Termasuk Penuh (✓) |
| **Kueri Percakapan Asisten AI** | Kuota Terbatas (30/bln)| Kuota Luas (100/bln) | Tanpa Batas Wajar |
| **Analitik Wawasan Multimodal Tingkat Lanjut** | — | Termasuk (✓) | Termasuk (✓) |
| **Sesi Konsultasi Instruktur / Ahli Gizi** | Bayar Terpisah | 1 Sesi Termasuk / bln | 3 Sesi Termasuk / bln |
| **Ekspor Berkas Ringkasan Laporan PDF** | — | Termasuk (✓) | Termasuk (✓) |
| **Prioritas Jalur Triase Gawat Darurat Medis**| **DILARANG (—)** | **DILARANG (—)** | **DILARANG (—)** |

> [!CAUTION]
> Status keanggotaan berbayar dilarang keras memberikan 'hak prioritas medis darurat'. Triase klinis diatur murni berdasarkan tingkat keparahan ancaman jiwa pasien.

---

## 21. Ruang Komunitas Positif MVP (MVP Community Space)

Fitur Komunitas (*Community Space*) bersifat opsional dan tidak menjadi syarat penghambat (*non-blocking*) rilis inti:

- **Cakupan Minimum Jika Diaktifkan**:
  - Publikasi kiriman cerita berbagi tips gaya hidup sehat.
  - Komentar apresiasi positif antar-anggota.
  - Fitur pelaporan konten mencurigakan (*Report & Moderation*).
  - Kategori topik sehat terkurasi (Nutrisi, Olahraga Ringan, Manajemen Waktu Istirahat).
- Komunitas tidak memiliki dependensi fungsional dengan Mesin Perilaku Kesehatan (*Health Behavior Engine*).

---

## 22. Fondasi Teknis Perangkat Lunak MVP (MVP Technical Foundation)

Fondasi arsitektur perangkat lunak yang wajib stabil sebelum logika kecerdasan kesehatan diimplementasikan:

### 22.1 Lapisan Backend (Laravel Modern Stack)
- **Framework & Routing**: Laravel 11/12 dengan versi API terstruktur (`/api/v1/...`).
- **Keamanan & Otorisasi**: Autentikasi token berbasis Laravel Sanctum, otorisasi peran via Laravel Policies & Gates.
- **Asinkron & Penjadwalan**: Antrean latar belakang (*Queued Jobs* via Redis) dan penjadwal cron (*Task Scheduler*).
- **Penanganan Kesalahan & Audit**: Format respons error JSON terstandar dan pencatatan riwayat audit kekal (*Audit Logs*).

### 22.2 Lapisan Antarmuka Frontend (Responsive Web & PWA)
- **Framework Desain**: Tailwind CSS dengan sistem token warna atmosferik dan skala spasi kanonikal 8-point.
- **Sistem Komponen Modular**: Pustaka komponen mandiri (`HealthMetricCard`, `InsightCard`, `ActionModal`).
- **Kelengkapan Status UI**: Setiap komponen wajib menangani 5 status antarmuka: *Default, Loading (Skeleton Shimmer), Error, Empty State, dan Offline Mode*.

### 22.3 Lapisan Basis Data Relasional (PostgreSQL)
Tabel-tabel fondasi wajib yang telah dimigrasi dan diindeks:
```
  • users, profiles, roles, permissions
  • health_records, goals, baselines
  • behavior_features, behavior_signals, insights
  • recommendations, interventions, intervention_tasks
  • points_ledger, achievements, user_achievements, user_streaks
  • audit_logs, consultations, instructor_assignments
```

---

## 23. Fase 0 — Fondasi Sistem & Keamanan (Phase 0 — Foundation)

### 23.1 Sasaran Utama (*Objective*)
Membangun fondasi rekayasa perangkat lunak terstandar, batas keamanan (*security boundaries*), infrastruktur basis data, dan konfigurasi lingkungan pengembangan yang bersih dan dapat direproduksi (*reproducible*).

### 23.2 Ruang Lingkup Pengerjaan (*Scope*)
```
  Setup Repositori & ENV ──► PostgreSQL DDL ──► Sanctum Auth ──► RBAC Matrix ──► Layout Shell UI ──► CI/CD Pipeline
```

### 23.3 Hasil Rilis Konkret (*Deliverables*)
| Komponen Deliverable | Spesifikasi Teknis yang Dibangun |
| :--- | :--- |
| **Aplikasi Inti Laravel** | Kerangka kerja Laravel 11/12 dengan struktur modul DDD (*Domain-Driven Design*). |
| **Koneksi Basis Data** | PostgreSQL dengan skema terisolasi dan skrip migrasi terindeks. |
| **Autentikasi & RBAC** | Login token Sanctum, tabel peran (*roles: Member, Instructor, Admin*), dan gerbang Policies. |
| **Antarmuka Dasar (*App Shell*)**| Kerangka tata letak navigasi responsif dengan Tailwind CSS dan token desain. |
| **Fondasi Pengujian & Log** | Konfigurasi PHPUnit/Pest, basis data SQLite in-memory untuk CI, dan log terstruktur. |

### 23.4 Kriteria Kelulusan (*Exit Criteria*)
- [ ] Pengguna dapat mendaftar (*register*) dan masuk (*login*) dengan token otentikasi valid.
- [ ] Rute privat terlindungi penuh; akses tanpa izin menghasilkan respons `401 Unauthorized` atau `403 Forbidden`.
- [ ] Seluruh migrasi dan seeder data dapat dijalankan ulang dari nol (`migrate:fresh --seed`) tanpa galat.
- [ ] Lingkungan lokal dapat di-booting sempurna melalui kontainer Docker / Laragon.

---

## 24. Fase 1 — Data Kesehatan Inti (Phase 1 — Core Health Data)

### 24.1 Sasaran Utama (*Objective*)
Membangun sumber kebenaran tunggal (*single source of truth*) untuk pencatatan rekam medis fisiologis dan profil gaya hidup anggota.

### 24.2 Ruang Lingkup Pengerjaan (*Scope*)
- **Manajemen Profil & Sasaran**: Pengisian profil demografi dasar, preferensi kesehatan, dan penetapan target preventif.
- **Entri Data Fisiologis Inti**: Formulir pencatatan durasi tidur, konsistensi ritme, langkah harian, hidrasi, dan log nutrisi.
- **Validasi & Provenance**: Pengecekan rentang masuk akal fisiologis (*range validation*), pencatatan sumber (*provenance*), dan timestamp berzona waktu lokal.
- **Visualisasi Garis Waktu Riwayat**: Antarmuka riwayat log kronologis (*Health Timeline*).

### 24.3 Hasil Rilis Konkret (*Deliverables*)
```
  Entitas MemberProfile  ──►  Tabel health_records  ──►  Tabel health_goals  ──►  UI Health Timeline
```

### 24.4 Kriteria Kelulusan (*Exit Criteria*)
Seorang anggota terdaftar dapat menyelesaikan perjalanan mandiri:
```
  Buat Profil Lengkap ──► Tetapkan Sasaran Sehat ──► Catat Log Fisiologis ──► Lihat Riwayat di Timeline
```

---

## 25. Fase 2 — Mesin Perilaku Kesehatan (Phase 2 — Health Behavior Engine)

### 25.1 Sasaran Utama (*Objective*)
Mengaktifkan teknologi pembeda utama PRONOIA: **Mesin Analisis Perilaku Kesehatan (*Health Behavior Engine*)** berbasis aturan deterministik transparan.

### 25.2 Ruang Lingkup Pengerjaan (*Scope*)
- **Normalisasi & Kualitas Data**: Filter data anomali, penanganan entri bolong (*missing data imputation*), dan pengecekan konsistensi.
- **Komputasi Garis Acuan (*Baseline Computation*)**: Perhitungan rerata bergerak (*moving average*) dan deviasi standar riwayat 14–28 hari.
- **Ekstraksi Fitur & Deteksi Tren**: Mengidentifikasi pergeseran arah tren (penurunan konstan, kenaikan tiba-tiba, pola variabilitas).
- **Pembangkitan Sinyal Deviasi (*Behavior Signals*)**: Penerbitan entitas sinyal deviasi dengan bukti data kuantitatif yang tak terbantahkan.

### 25.3 Hasil Rilis Konkret (*Deliverables*)
| Modul Engine | Tugas Utama Pemrosesan |
| :--- | :--- |
| `BaselineEngine` | Menghitung rentang wajar pribadi untuk setiap metrik vital. |
| `TrendDetector` | Menilai apakah perubahan berlangsung sesaat atau persisten (> 3–5 hari). |
| `BehaviorSignalService`| Menghasilkan catatan `behavior_signals` dengan metadata bukti lengkap. |
| `InsightEngine` | Mengubah sinyal matematis menjadi wawasan berbasis bukti ramah manusia. |

### 25.4 Kriteria Kelulusan (*Exit Criteria*)
Untuk sekumpulan dataset uji coba yang diberikan (*known seeded dataset*), sistem wajib menghasilkan:
$$\text{Dataset Masukan} \longrightarrow \text{Garis Acuan Valid} + \text{Sinyal Deviasi Presisi} + \text{Wawasan Berbukti}$$
secara deterministik, dapat direproduksi 100%, dan bebas dari halusinasi probabilitas.

---

## 26. Fase 3 — Intervensi Preventif Terarah (Phase 3 — Preventive Intervention)

### 26.1 Sasaran Utama (*Objective*)
Menjembatani wawasan analitik menjadi tindakan nyata pengguna dengan meluncurkan modul **Rekomendasi Terarah & Intervensi Preventif**.

### 26.2 Ruang Lingkup Pengerjaan (*Scope*)
- **Pembangkitan Rekomendasi Kontekstual**: Menyusun saran tindakan mikro yang sesuai dengan sinyal deviasi terdeteksi.
- **Konfirmasi Komitmen Intervensi**: Alur pengguna menyetujui rekomendasi untuk dijadikan program kebiasaan aktif.
- **Pengingat & Tugas Harian Mikro**: Checklist tugas harian interaktif pada dasbor anggota.
- **Pencatatan Kemajuan & Hasil (*Outcome Recording*)**: Membandingkan data fisiologis selama intervensi dengan garis acuan awal.

### 26.3 Hasil Rilis Konkret (*Deliverables*)
```
  Rekomendasi Disetujui ──► Entitas Intervention Dibuat ──► Tugas Harian Dimulai ──► Evaluasi Outcome Mingguan
```

### 26.4 Kriteria Kelulusan (*Exit Criteria*)
- [ ] Satu wawasan sistem terbukti berhasil menghasilkan entitas rekomendasi yang dapat diklik.
- [ ] Persetujuan pengguna berhasil memicu pembuatan rekaman intervensi aktif berstatus `ACTIVE`.
- [ ] Sistem berhasil mencatat status penyelesaian tugas harian dan menghasilkan rekam hasil (*outcome record*).

---

## 27. Fase 4 — Dukungan Tenaga Ahli (Phase 4 — Human Support)

### 27.1 Sasaran Utama (*Objective*)
Menyediakan infrastruktur keterlibatan tenaga ahli (*Human-in-the-Loop*) untuk mendampingi pengguna pada kasus-kasus yang memerlukan sentuhan klinis manusia.

### 27.2 Ruang Lingkup Pengerjaan (*Scope*)
- **Portal Kerja Instruktur (*Instructor Workspace*)**: Antarmuka terdedikasi untuk memantau anggota yang didelegasikan.
- **Sistem Delegasi & Hak Akses (*Client Assignment*)**: Menjamin instruktur hanya dapat melihat klien yang terdaftar resmi pada portofolionya.
- **Alur Pemesanan Konsultasi (*Consultation Booking*)**: Pemilihan jadwal, konfirmasi sesi, notulensi ahli, dan rencana tindak lanjut.
- **Jalur Eskalasi Kasus**: Menerima pengalihan penanganan langsung dari percakapan asisten AI.

### 27.3 Hasil Rilis Konkret (*Deliverables*)
```
  Dasbor Instruktur ──► Daftar Klien Tertugaskan ──► Tinjauan Sinyal Deviasi ──► Catatan Ahli ──► Sesi Konsultasi
```

### 27.4 Kriteria Kelulusan (*Exit Criteria*)
- [ ] Pengguna dengan peran `Instructor` berhasil mengakses portal kerja khusus instruktur.
- [ ] Penegakan kebijakan otorisasi (*Policy Gate*) berhasil memblokir instruktur dari melihat data anggota non-klien.
- [ ] Sesi konsultasi berhasil dijadwalkan, dikonfirmasi, dan notulensi tersimpan dalam jejak audit aman.

---

## 28. Fase 5 — Asisten AI & Pemindai Kamera (Phase 5 — AI & Scanner)

### 28.1 Sasaran Utama (*Objective*)
Mengintegrasikan kecerdasan buatan (*AI Assistant*) dan pemindai visi komputer (*Vision Scanner*) sebagai lapisan interaksi cerdas yang mempercepat adopsi gaya hidup sehat.

### 28.2 Asisten AI Beretika (*AI Assistant Scope*)
- **Penjelasan Wawasan Kontekstual**: AI menerjemahkan wawasan deterministik menjadi bahasa yang ramah dan empatis.
- **Pembinaan Gaya Hidup Mikro**: Panduan pembentukan kebiasaan tanpa meresepkan terapi obat-obatan.
- **Batas Keamanan & Eskalasi**: AI secara proaktif mengalihkan pengguna ke instruktur manusia saat pertanyaan melampaui batas edukasi preventif.

### 28.3 Pemindai Visi Nutrisi & Lab (*Scanner Scope*)
- **Pengambilan Foto & Pengunggahan**: Antarmuka kamera responsif dengan konfirmasi pratinjau.
- **Ekstraksi Informasi Terstruktur**: Mengidentifikasi perkiraan porsi makanan, makronutrisi, atau nilai uji laboratorium dasar.
- **Verifikasi Mandiri Pengguna**: Pengguna wajib meninjau dan menyetujui angka sebelum disimpan ke basis data.

### 28.4 Kriteria Kelulusan (*Exit Criteria*)
- [ ] AI terbukti tidak dapat melanggar batas keselamatan medis (*zero unsolicited diagnoses*).
- [ ] Percakapan AI tidak membocorkan data antar-pengguna (*zero privacy leakage*).
- [ ] Pemindai kamera menghasilkan estimasi terstruktur yang dapat disunting manual oleh pengguna sebelum disimpan.

---

## 29. Fase 6 — Keterlibatan & Retensi (Phase 6 — Engagement)

### 29.1 Sasaran Utama (*Objective*)
Memperkuat retensi penggunaan jangka panjang melalui gamifikasi etis, pengelolaan langganan transparan, dan ruang sosial yang positif.

### 29.2 Prioritas Implementasi Bertahap:
```
  [1] Program Tantangan Sehat (Challenges)
            │
            ▼
  [2] Buku Besar Poin Idempoten (Points Ledger)
            │
            ▼
  [3] Lencana Pencapaian Digital (Badges & Milestones)
            │
            ▼
  [4] Rangkaian Konsistensi & Toleransi (Streaks & Grace Window)
            │
            ▼
  [5] Orkestrasi Notifikasi Santun (Quiet Hours & Batching)
            │
            ▼
  [6] Tingkatan Keanggotaan & Entitlement (Membership Tiers)
            │
            ▼
  [7] Ruang Komunitas Positif (Community Moderated Space - Optional)
```

> [!NOTE]
> Fitur komunitas dapat ditangguhkan (*deprioritized*) ke fase pasca-MVP apabila waktu sprint menjelang kompetisi sangat terbatas.

---

## 30. Fase 7 — Pengerasan Sistem Kompetisi (Phase 7 — Competition Hardening)

Fase Pengerasan Sistem (*Competition Hardening*) didedikasikan khusus untuk mematangkan seluruh build aplikasi sebelum dipresentasikan di hadapan dewan juri kompetisi (ICONFEST 2026).

### 30.1 Sasaran Utama (*Objective*)
Bukan menambah daftar fitur baru, melainkan **menjamin keandalan performa, kesempurnaan estetika antarmuka, ketiadaan bug fatal, dan kelancaran alur demonstrasi langsung secara ujung-ke-ujung**.

### 30.2 Daftar Fokus Pengerasan Sistem:
| Area Pengerasan | Tindakan Rekayasa Spesifik |
| :--- | :--- |
| **Polesan Antarmuka (UI Polish)** | Menghaluskan animasi mikro, konsistensi tipografi, dan padding 8-point. |
| **Status UI Komprehensif** | Memastikan status *Skeleton Loading, Empty States*, dan *Error States* tampil elegan. |
| **Ketahanan Jaringan (Offline UX)**| Memastikan aplikasi menampilkan indikator ramah saat koneksi internet terputus. |
| **Dataset Benih Demo Deterministik**| Menyiapkan data riwayat pengguna demo yang menceritakan pergeseran pola secara gamblang. |
| **Audit Kepatuhan Keselamatan**| Memastikan seluruh *disclaimer* medis dan tombol darurat 119/112 berfungsi sempurna. |
| **Kesiapan Skenario Presentasi**| Melakukan simulasi gladi bersih alur pitch panggung (*Stage Demo Rehearsal*). |

---

## 31. Dataset Demonstrasi Kompetisi (Competition Demo Dataset)

Untuk menjamin keberhasilan presentasi panggung tanpa risiko kegagalan koneksi atau data kosong, PRONOIA menggunakan dataset benih uji coba (*Canonical Seeded Dataset*) yang memperlihatkan pergeseran kebiasaan secara gamblang:

```
  PROFIL PENGGUNA DEMO (DEMO USER PROFILE)
  ═══════════════════════════════════════════════════════════════
  Nama Subjek   : Budi Santoso (Member ID: USR-DEMO-001)
  Usia / Gender : 34 Tahun / Laki-laki
  Sasaran Sehat : Menjaga Kebugaran Mental & Ritme Sirkadian
  
  GARIS ACUAN RIWAYAT 28 HARI (PERSONAL BASELINE):
  • Rata-rata Durasi Tidur : 7 Jam 20 Menit (Rentang: 07:00 - 07:30)
  • Rata-rata Aktivitas   : 6.500 Langkah / Hari
  • Rata-rata Hidrasi     : 1.800 mL / Hari

  DATA REKAM MEDIS 5 HARI TERAKHIR (RECENT REALITY):
  • Rata-rata Durasi Tidur : 5 Jam 15 Menit (Penurunan Persisten -28%)
  • Rata-rata Aktivitas   : 3.900 Langkah / Hari (Penurunan Mobilitas)
  • Rata-rata Hidrasi     : 1.100 mL / Hari (Asupan Kurang)
```

Mesin Perilaku Kesehatan (*Behavior Engine*) secara otomatis mendeteksi:
$$\Delta \text{Sleep} = -125\text{ menit}, \quad \text{Status} = \text{PERSISTENT\_DECREASE} \longrightarrow \text{Sinyal Terbit}$$

---

## 32. Skenario Kanonikal Kompetisi (Canonical Competition Scenario)

Demonstrasi utama di hadapan dewan juri wajib mengikuti **satu narasi cerita tunggal yang kohesif (*Single Storyline*)**:

```
  [1] Member Melakukan Login ke Aplikasi
            │
            ▼
  [2] Dasbor Menampilkan Garis Acuan Sehat Pribadi (Personal Baseline)
            │
            ▼
  [3] Entri Rekam Medis Baru Dicatat (Input Log Hari Ini)
            │
            ▼
  [4] Sistem Mendeteksi Deviasi Pola yang Bermakna (Behavior Signal BS-024)
            │
            ▼
  [5] Wawasan Cerdas Menerangkan Akar Perubahan (Explainable Insight INS-011)
            │
            ▼
  [6] Rekomendasi Terarah Disajikan (Recommendation REC-005)
            │
            ▼
  [7] Pengguna Memulai Intervensi Kebiasaan 7 Hari (Active Intervention)
            │
            ▼
  [8] Sistem Menampilkan Pemulihan Tren & Pengalihan ke Instruktur Ahli
```

> [!TIP]
> Skenario kanonikal ini membuktikan bekerjanya seluruh rantai nilai preventif PRONOIA dalam waktu presentasi 5 hingga 7 menit tanpa terputus.

---

## 33. Narasi Komparasi 'Sebelum vs Sesudah' (Demo 'Before vs After')

Untuk menegaskan keunggulan inovasi platform kepada juri, sesi demo menyajikan komparasi paradigma:

| Aspek Pengalaman | Aplikasi Kesehatan Konvensional | Platform Preventif Cerdas PRONOIA |
| :--- | :--- | :--- |
| **Pencatatan Data** | Sekadar buku catatan pasif (*passive log book*). | Data dianalisis secara aktif terhadap garis acuan pribadi. |
| **Penyajian Masalah** | Memberikan grafik rumit tanpa kesimpulan. | Menghasilkan sinyal deviasi berbasis bukti nyata. |
| **Tindak Lanjut** | Pengguna dibiarkan bingung mengartikan grafik.| Rekomendasi tindakan mikro terarah seketika disajikan. |
| **Dukungan Pakar** | Terisolasi dari dokter atau instruktur. | Alur konsultasi terintegrasi (*Human-in-the-Loop*). |
| **Kecerdasan AI** | Chatbot umum yang sering berhalusinasi klinis. | Asisten AI beretika yang berpijak pada data terstruktur. |

---

## 34. Graf Ketergantungan Modul MVP (MVP Dependency Graph)

Struktur ketergantungan teknis (*Technical Dependency Graph*) antar-layanan pada PRONOIA:

```
  AUTENTIKASI (Sanctum)
     │
     ├──► PROFIL PENGGUNA (Profile) ──► TARGET KESEHATAN (Goals)
     │
     └──► PERAN & KEBIJAKAN (Roles & Policies)

  REKAM MEDIS (Health Records)
     │
     ├──► GARIS WAKTU (Timeline)
     │
     └──► FILTER KUALITAS DATA (Data Quality)
               │
               └──► GARIS ACUAN (Baseline Engine)
                         │
                         ├──► FITUR PERILAKU (Behavior Features)
                         │
                         ├──► DETEKTOR TREN (Trend Detection)
                         │
                         └──► SINYAL DEVIASI (Behavior Signals)
                                   │
                                   └──► WAWASAN SISTEM (Insights)
                                             │
                                             └──► REKOMENDASI (Recommendations)
                                                       │
                                                       └──► INTERVENSI (Interventions)
                                                                 │
                                                                 └──► KEMAJUAN & HASIL (Outcomes)
```

### Integrasi Modul Satelit:
- **Dukungan Pakar**: `Behavior Signals` ──► `Instructor Workspace` ──► `Consultations`.
- **Asisten AI**: `Structured Evidence Context` ──► `AI Pipeline` ──► `Explanations & Handoff`.
- **Pemindai Kamera**: `Vision Capture` ──► `OCR Extraction` ──► `User Confirmation` ──► `Health Records`.
- **Gamifikasi**: `Intervention Tasks Completed` ──► `Points Ledger` & `Badges`.
- **Keanggotaan**: `Subscriptions` ──► `Entitlements` ──► `Feature Middleware`.

---

## 35. Jalur Pengembangan Paralel (Parallel Development Tracks)

Setelah fondasi dasar (Fase 0) selesai dibangun, tim rekayasa dapat bergerak serentak melalui 6 jalur kerja paralel (*Parallel Development Tracks*):

```
  ┌───────────────────────────┐      ┌───────────────────────────┐
  │ Track A: Backend Platform │      │ Track B: Frontend UI / UX │
  │ Models, Migrations, APIs  │      │ Design System, Dashboards │
  └─────────────┬─────────────┘      └─────────────┬─────────────┘
                │                                  │
  ┌─────────────┴─────────────┐      ┌─────────────┴─────────────┐
  │ Track C: Behavior Engine  │      │ Track D: AI & Vision OCR  │
  │ Baseline, Signals, Insights│     │ Prompts, Tooling, Scanner │
  └─────────────┬─────────────┘      └─────────────┬─────────────┘
                │                                  │
  ┌─────────────┴─────────────┐      ┌─────────────┴─────────────┐
  │ Track E: Clinical Safety  │      │ Track F: QA & Hardening   │
  │ Disclaimers, Triage, Audit│      │ E2E Tests, Seed Data Demo │
  └───────────────────────────┘      └───────────────────────────┘
```

Meskipun bekerja secara paralel, setiap jalur wajib mematuhi kontrak API yang telah dibakukan pada dokumen [09-api-contracts.md](file:///c:/laragon/www/kadar/docs/docs/09-api-contracts.md).

---

## 36. Urutan Implementasi yang Disarankan (Suggested Implementation Order)

Daftar 29 langkah urutan implementasi teknis bertahap yang direkomendasikan (*29-Step Implementation Sequence*):

```
  01. Inisialisasi Repositori & Environment
  02. Arsitektur Basis Data PostgreSQL
  03. Autentikasi Pengguna (Sanctum Tokens)
  04. Pengaturan Hak Akses Peran (RBAC Policies)
  05. Formulir & Profil Anggota (Member Profiles)
  06. Sasaran Kesehatan Preventif (Health Goals)
  07. Entri Rekam Medis Fisiologis (Health Records)
  08. Garis Waktu Riwayat (Health Timeline)
  09. Filter Validasi Kualitas Data Fisiologis
  10. Mesin Garis Acuan Riwayat (Baseline Engine)
  11. Ekstraksi Fitur Perilaku (Behavior Features)
  12. Pembangkitan Sinyal Deviasi (Behavior Signals)
  13. Mesin Wawasan Berbasis Bukti (Insight Engine)
  14. Sistem Rekomendasi Terarah (Recommendation)
  15. Pelaksanaan Intervensi Gaya Hidup (Interventions)
  16. Pelacakan Kemajuan & Hasil (Progress Tracking)
  17. Portal & Delegasi Instruktur (Instructor Workspace)
  18. Alur Konsultasi & Booking Jadwal (Consultations)
  19. Asisten AI Beretika (AI Explanation & Coaching)
  20. Pemindai Kamera Label Makanan (Vision Scanner)
  21. Mesin Orkestrasi Notifikasi (Notification Engine)
  22. Buku Besar Poin & Lencana (Points Ledger & Badges)
  23. Tingkatan Keanggotaan & Hak Akses (Membership Tiers)
  24. Ruang Komunitas Moderasi (Community Space)
  25. Ekspor Ringkasan Laporan PDF (Reporting System)
  26. Pengerasan Kinerja Luring PWA (Offline Hardening)
  27. Audit Kepatuhan Keamanan & Privasi (Security Audit)
  28. Optimasi Indeks & Performa Database (Query Tuning)
  29. Polesan Akhir Demonstrasi Kompetisi (Competition Polish)
```

---

## 37. Struktur Tonggak Rilis Proyek (Milestone Structure: M0 – M7)

Struktur 8 tonggak rilis utama (*Engineering Milestones M0 – M7*):

| Kode Milestone | Nama Tonggak Rilis | Definisi Selesai (*Definition of Done*) |
| :--- | :--- | :--- |
| **M0** | *Technical Foundation* | Aplikasi boot normal, database terhubung, auth dan pengujian dasar aktif. |
| **M1** | *Health Data Foundation* | Profil, sasaran, rekam medis harian, dan timeline berfungsi konsisten. |
| **M2** | *Behavioral Intelligence* | Garis acuan dihitung, sinyal deviasi terbit, wawasan terbukti secara deterministik. |
| **M3** | *Preventive Loop* | Rekomendasi disetujui, intervensi aktif berjalan, kemajuan berhasil dilacak. |
| **M4** | *Human-in-the-Loop* | Instruktur berhasil memantau klien, notulensi konsultasi tersimpan rapi. |
| **M5** | *Intelligent Interaction* | Asisten AI dan pemindai kamera terintegrasi mulus dengan model data inti. |
| **M6** | *Engagement & Loyalty* | Tantangan preventif, buku besar poin, dan streaks beroperasi aman. |
| **M7** | *Competition Ready* | Seluruh skenario demo panggung berjalan sempurna tanpa intervensi developer. |

> [!IMPORTANT]
> **Milestone M2 dan M3 adalah tonggak paling krusial**, karena pada tahap inilah proposisi nilai unik (*unique value proposition*) PRONOIA terbukti secara teknis.

---

## 38. Matriks Fitur MVP (MVP Feature Matrix)

Matriks penentuan prioritas fitur platform PRONOIA:

| Nama Fitur / Modul | Skala Prioritas | Status MVP | Modul Ketergantungan | Relevansi Panggung Demo |
| :--- | :---: | :---: | :--- | :---: |
| **Autentikasi & Sesi** | `P0` | **Wajib** | Fondasi Sistem | Ya (Pintu Masuk) |
| **Peran & Otorisasi** | `P0` | **Wajib** | Autentikasi | Ya (Role Switch) |
| **Profil & Sasaran** | `P0` | **Wajib** | Autentikasi | Ya (Personalisasi) |
| **Rekam Medis Harian** | `P0` | **Wajib** | Profil | Ya (Bukti Entri) |
| **Garis Waktu (Timeline)**| `P0` | **Wajib** | Rekam Medis | Ya (Bukti Riwayat) |
| **Garis Acuan Pribadi** | `P0` | **Wajib** | Rekam Medis | **Pembeda Utama** |
| **Sinyal Deviasi Perilaku**| `P0`| **Wajib** | Garis Acuan | **Pembeda Utama** |
| **Wawasan Cerdas Berbukti**| `P0`| **Wajib** | Sinyal Deviasi | **Pembeda Utama** |
| **Rekomendasi Terarah** | `P0` | **Wajib** | Wawasan | **Pembeda Utama** |
| **Intervensi Preventif** | `P0` | **Wajib** | Rekomendasi | **Pembeda Utama** |
| **Pelacakan Kemajuan** | `P0` | **Wajib** | Intervensi | **Pembeda Utama** |
| **Portal Instruktur** | `P1` | **Wajib** | Sinyal Deviasi | Ya (Human Support) |
| **Sesi Konsultasi** | `P1` | **Wajib** | Portal Instruktur | Ya (Telemedisin) |
| **Asisten AI Beretika** | `P1` | **Wajib** | Konteks Terstruktur | Ya (Interaktivitas) |
| **Pemindai Kamera OCR** | `P1` | **Wajib** | Rekam Medis | Ya (Daya Tarik Visual) |
| **Pintasan Darurat Medis**| `P0 Safety`| **Wajib** | Kanal Perangkat | Ya (Kepatuhan Medis) |
| **Tantangan & Poin Gamifikasi**| `P2` | Opsional | Intervensi | Ya (Retensi Pengguna)|
| **Ruang Komunitas Sehat**| `P2` | Opsional | Moderasi | Pendukung Tambahan |
| **Langganan Keanggotaan**| `P2` | Opsional | Entitlements | Model Monetisasi |
| **Integrasi Jam Wearable**| `P3` | Ditangguhkan | Bluetooth / Web API | Pasca-MVP |

---

## 39. Hal-Hal yang DILARANG Menghambat MVP (What Should NOT Block MVP)

Fitur dan kompleksitas arsitektur berikut **secara tegas DILARANG menunda jadwal rilis MVP (*Non-Blocking Features*)**:

```
  DAFTAR FITUR YANG TIDAK BOLEH MENJADI PENGHAMBAT RILIS MVP:
  ⛔ Model Machine Learning Deep-Learning yang rumit dan berat komputasi.
  ⛔ Algoritma pemeringkatan rekomendasi berbasis probabilitas kompleks.
  ⛔ Fitur sosial jaringan pertemanan berskala besar (*Complex Social Graph*).
  ⛔ Multi-gateway pembayaran internasional (cukup 1 gateway lokal/mocking).
  ⛔ Integrasi perangkat keras *wearable* langsung via Bluetooth low-energy.
  ⛔ Gudang data analitik skala enterprise (*Data Lake / BigQuery Warehouse*).
  ⛔ Integrasi multi-provider LLM redundan (cukup 1 adapter LLM stabil).
  ⛔ Arsitektur Multi-Tenancy institusi rumah sakit yang rumit.
```

PRONOIA harus membuktikan rantai nilai preventif terlebih dahulu sebelum menambah kompleksitas infrastruktur.

---

## 40. Kebijakan Manajemen Utang Teknis (Technical Debt Policy)

Kebijakan toleransi utang teknis (*Technical Debt Policy*) selama masa sprint kompetisi:

### Area yang DITOLERANSI Utang Teknis Sementara:
- Animasi antarmuka non-kritis dan efek transisi kosmetik.
- Panel analitik admin yang belum menggunakan visualisasi grafik canggih.
- Skrip pelaporan bulanan yang masih menggunakan pemrosesan sinkron sederhana.
- Fitur gamifikasi sekunder (pilihan tema avatar atau bingkai lencana).

### Area yang DILARANG KERAS Memiliki Utang Teknis (*Zero Tolerance*):
```
┌─────────────────────────────────────────────────────────────┐
│              AREA DENGAN TOLERANSI UTANG TEKNIS NOL         │
├─────────────────────────────────────────────────────────────┤
│ ⛔ Otorisasi Peran & Kebijakan Hak Akses (Security Gateways)│
│ ⛔ Integritas Fisiologis Rekam Medis (Data Sanitization)    │
│ ⛔ Protokol Jalur Darurat Medis 119/112 (Emergency Flow)   │
│ ⛔ Batasan Keselamatan Klinis AI (No Unsolicited Diagnosis) │
│ ⛔ Rekam Jejak Audit Forensik Kekal (Audit Logging)         │
│ ⛔ Formula Matematis Garis Acuan (Baseline Math Precision)  │
│ ⛔ Penegakan Idempotensi Transaksi Buku Besar Poin          │
└─────────────────────────────────────────────────────────────┘
```

---

## 41. Strategi Rilis Perangkat Lunak (Release Strategy)

Strategi penerapan dan rilis perangkat lunak PRONOIA mengelola 3 tingkatan lingkungan terisolasi:

```
  LINGKUNGAN PENGEMBANGAN LOKAL (LOCAL / DOCKER)
  Untuk pengkodean harian dan unit test cepat.
                        │
                        ▼
  LINGKUNGAN PENGUJIAN TERPADU (STAGING SERVER)
  Replika produksi untuk verifikasi E2E dan latihan demo.
                        │
                        ▼
  LINGKUNGAN PRODUKSI / STAGE KOMPETISI (PRODUCTION / DEMO BUILD)
  Build terkunci dengan perlindungan data dan performa tinggi.
```

### Gerbang Kelulusan Rilis (*Deployment Pipeline Gates*):
1. **Tinjauan Kode (*Peer Code Review*)**: Minimal satu persetujuan dari *tech lead*.
2. **Pengujian Otomatis (*Automated CI Pipeline*)**: Lolos pengujian unit, integrasi, dan kontrak API.
3. **Pemeriksaan Keamanan Statis (*Static Analysis*)**: Tidak ada kebocoran kunci rahasia (*secret scanning*) atau celah IDOR.
4. **Tinjauan Keselamatan Klinis**: Menjamin ketiadaan klaim diagnosis mandiri atau peringatan palsu.
5. **Gladi Bersih Staging**: Simulasi alur demo panggung 100% mulus.

---

## 42. Kriteria Kelayakan Rilis MVP (Release Criteria — MVP)

Rilis MVP tidak boleh dianggap selesai hanya karena halaman web dapat dimuat di peramban. Rilis wajib memenuhi 5 dimensi kriteria kelayakan (*Definition of Done*):

| Dimensi Kelayakan | Syarat Mutlak Penerimaan Produksi (*Acceptance Criteria*) |
| :--- | :--- |
| **Kesiapan Fungsional** | Autentikasi, RBAC 3 peran, pencatatan log, kalkulasi baseline, deteksi sinyal, wawasan berbukti, dan intervensi beroperasi normal. |
| **Integritas Data** | Satuan data baku konsisten, stempel waktu presisi, sumber data tercatat (*provenance*), dan pencegahan duplikasi entri aktif. |
| **Keselamatan Medis** | Ketiadaan vonis medis, alur darurat 119/112 independen dari koneksi AI, dan tombol eskalasi manusia tersedia. |
| **Keamanan Sistem** | Tidak ada celah IDOR/BOLA, otorisasi Policies teruji, pembatasan kecepatan (*rate limiting*) aktif, dan log audit kekal. |
| **Kualitas Antarmuka (UX)**| Tata letak responsif ponsel pintar, penanganan status loading (*skeleton shimmer*), empty state informatif, dan offline PWA. |

---

## 43. Skenario Penerimaan Sistem MVP (MVP Acceptance Scenario: Given-When-Then)

Skenario pengujian penerimaan utama (*End-to-End Acceptance Scenario*) menggunakan format BDD (*Behavior-Driven Development*):

### Kondisi Awal (GIVEN):
- Anggota telah memiliki riwayat observasi tidur 28 hari dengan rata-rata garis acuan wajar:
  $$\text{Personal Baseline} = 7\text{ Jam } 20\text{ Menit}$$
- Anggota memasukkan data tidur 5 hari terakhir dengan penurunan signifikan:
  `[05:40, 05:35, 05:50, 05:30, 05:45]`

### Pemicu Kejadian (WHEN):
Sistem mengeksekusi kalkulasi ulang status perilaku (*recalculate behavioral state*).

### Hasil yang Diharapkan (THEN):
1. Sistem memvalidasi kualitas data (lolos filter fisiologis).
2. Sistem membandingkan data terkini terhadap garis acuan pribadi.
3. Sistem mendeteksi pergeseran pola persisten (penurunan > 20% selama 5 hari).
4. Sistem membangkitkan rekaman sinyal deviasi `BS-024` beserta bukti data pendukung.
5. Sistem menerbitkan wawasan ramah `INS-011` yang menjelaskan apa yang berubah.
6. Sistem menyajikan rekomendasi tindakan mikro `REC-005` (jadwal tidur konsisten 7 hari).
7. Pengguna menerima rekomendasi, sistem membuat intervensi aktif berstatus `ACTIVE`.
8. Dasbor menampilkan bilah pelacakan kemajuan tugas harian secara interaktif.
9. Jika pengguna meminta bantuan lebih lanjut, sistem menyediakan tombol eskalasi instan ke instruktur manusia dengan riwayat data lengkap.

---

## 44. Skenario Benih Data Demo (Demo Seed Scenarios: A – E)

Untuk mengantisipasi berbagai pertanyaan pengujian dewan juri, PRONOIA menyiapkan 5 skenario benih data demo (*5 Canonical Seed Scenarios*):

| Skenario Benih | Karakteristik Pola Data | Respons Sistem yang Ditampilkan |
| :--- | :--- | :--- |
| **Skenario A: Stabil & Bugar** | Pola tidur dan aktivitas konsisten berada di rentang garis acuan pribadi. | Penguatan positif (*positive reinforcement*), tanpa intervensi buatan yang mengada-ada. |
| **Skenario B: Pergeseran Bertahap**| Penurunan bertahap durasi tidur selama 5 hari berturut-turut. | Pembangkitan sinyal deviasi, wawasan berbukti, dan rekomendasi program 7 hari (*Main Demo*). |
| **Skenario C: Data Bolong / Anomali**| Terdapat hari tanpa log atau nilai ekstrem yang tidak wajar (misal tidur 25 jam). | Peringatan kualitas data ramah (*data quality notice*), sistem tidak menerbitkan sinyal palsu. |
| **Skenario D: Eskalasi ke Manusia** | Anggota menanyakan keluhan stres berkepanjangan pada chat AI. | AI mendeteksi batas kewenangan, menyajikan ringkasan, dan memicu handoff ke instruktur. |
| **Skenario E: Pemicu Darurat Medis**| Anggota menekan tombol SOS atau melaporkan nyeri dada menjalar akut. | Protokol darurat deterministik aktif: panduan P3K, nomor darurat 119/112, peta IGD terdekat. |

---

## 45. Manajemen Risiko Roadmap (Roadmap Risk Management: Risks 1 – 6)

Strategi mitigasi terhadap 6 risiko terbesar dalam pengembangan produk preventif:

### Risiko 1: Melebarnya Cakupan Fitur (*Feature Sprawl*)
- **Masalah**: Tim terlalu sibuk membuat puluhan modul pelengkap sebelum lingkaran preventif inti selesai.
- **Mitigasi**: Menetapkan siklus lingkaran preventif (`Baseline ──► Signal ──► Insight ──► Intervention ──► Progress`) sebagai syarat mutlak pemblokir rilis (*Release Blocker*).

### Risiko 2: AI Mengaburkan Inti Produk (*AI Becomes the Product*)
- **Masalah**: Pengembangan terfokus pada kemegahan chatbot daripada keakuratan logika mesin perilaku.
- **Mitigasi**: Mewajibkan AI murni bertindak sebagai konsumen konteks terstruktur yang telah dihasilkan oleh mesin deterministik.

### Risiko 3: Pemindai Kamera Mendominasi Arsitektur (*Scanner Dominance*)
- **Masalah**: Menghabiskan waktu sprint berminggu-minggu melatih model visi komputer yang rumit.
- **Mitigasi**: Memposisikan scanner murni sebagai alat bantu input data (*data acquisition layer*) yang hasilnya wajib diverifikasi manual oleh pengguna.

### Risiko 4: Gamifikasi Diartikan Sebagai Vonis Kesehatan (*Gamification Health Scoring*)
- **Masalah**: Pengguna menganggap poin tinggi berarti bebas penyakit biologis.
- **Mitigasi**: Penegakan pemisahan semantik mutlak pada seluruh antarmuka: `Poin ≠ Skor Kesehatan`, `Lencana ≠ Kesembuhan Medis`.

### Risiko 5: Ketergantungan Demo Panggung Pada API Eksternal (*Live AI Dependency*)
- **Masalah**: Demo kompetisi gagal total akibat koneksi internet gedung macet atau server OpenAI/Gemini down.
- **Mitigasi**: Menyediakan data demo deterministik dan *mock provider fallback* yang tersimpan lokal di aplikasi.

### Risiko 6: Klaim Medis Berlebihan (*Overclaiming Health Impact*)
- **Masalah**: Tim menyatakan prototipe dapat menyembuhkan penyakit diabetes dalam 7 hari.
- **Mitigasi**: Menggunakan terminologi ilmu perilaku preventif berbasis bukti: perubahan kebiasaan, stabilitas ritme, dan perbaikan gaya hidup.

---

## 46. Aturan Pembekuan Cakupan (Scope Freeze Rules)

Ketika fase pengerasan kompetisi (*Competition Hardening*) dimulai, sistem memberlakukan aturan pembekuan cakupan ketat (*Scope Freeze Policy*).

Fitur baru hanya diizinkan masuk jika memenuhi minimal satu dari 6 kriteria darurat berikut:
1. Secara langsung mendukung kelancaran lingkaran preventif tertutup.
2. Memperbaiki lubang keselamatan kesehatan pengguna.
3. Meningkatkan kejelasan pemahaman juri terhadap alur demonstrasi utama.
4. Memperbaiki cacat kode fatal (*critical bug / crash*).
5. Mengatasi celah keamanan data pribadi atau pelanggaran otorisasi.
6. Menyelesaikan butir penghambat pada daftar periksa kriteria penerimaan produksi.

Dilarang keras memperkenalkan modul baru (seperti modul e-commerce atau dompet digital) selama masa pembekuan.

---

## 47. Kepemilikan Peran Tim Rekayasa (Recommended Team Ownership)

Struktur pembagian tanggung jawab (*Role Ownership*) pada tim rekayasa PRONOIA:

| Peran Rekayasa | Fokus Tanggung Jawab Modul Sistem |
| :--- | :--- |
| **Backend Engineer** | Skema PostgreSQL, REST API `/api/v1`, Sanctum auth, Laravel Policies, antrean Redis, dan log audit. |
| **Frontend Engineer** | Pustaka komponen Tailwind, dasbor responsif ponsel, status loading skeleton, dan alur PWA. |
| **Health Behavior Engineer**| Algoritma baseline, rumus deteksi tren, pustaka aturan sinyal deviasi, dan logika wawasan. |
| **AI & Prompt Engineer** | Integrasi adapter LLM, rekayasa konteks masukan, filter keselamatan respon, dan alur handoff. |
| **QA & Security Specialist** | Pengujian regresi otomatis, audit celah otorisasi (BOLA/IDOR), dan verifikasi dataset demo. |

Untuk tim berukuran kecil, satu personil dapat merangkap beberapa peran, namun pembagian tanggung jawab modul tetap terikat eksplisit.

---

## 48. Struktur Siklus Sprint (Suggested Sprint Structure)

Pengembangan PRONOIA mengadopsi struktur pengiriman berbasis irisan vertikal (*Vertical Slice Sprints*):

```
  PENDEKATAN SALAH (HORIZONTAL SILO - DILARANG):
  ❌ Sprint 1 : Membuat 30 tabel database kosong tanpa UI.
  ❌ Sprint 2 : Mendesain 40 halaman antarmuka statis tanpa integrasi API.
  ❌ Sprint 3 : Mencoba menghubungkan semuanya di akhir secara terburu-buru (Integrasi Meledak).

  PENDEKATAN BENAR PRONOIA (VERTICAL SLICE SPRINT):
  ✅ Setiap Sprint menghasilkan SATU ALUR PENGGUNA LENGKAP ujung-ke-ujung:
     Database Model + Logika Domain Service + REST API Controller + Validasi + UI Dashboard + Unit Test.
```

Dengan metode ini, produk selalu berada dalam status siap didemonstrasikan (*always-demoable state*) pada setiap akhir siklus sprint.

---

## 49. Irisan Vertikal #1: Autentikasi & Profil (Vertical Slice #1)

Irisan Vertikal Pertama (*Vertical Slice #1*) berfokus pada pembuktian siklus hidup data (*Data Lifecycle*):

```
  Registrasi & Login Akun (Auth)
                │
                ▼
  Pengisian Data Demografi & Sasaran (Profile & Goals)
                │
                ▼
  Pencatatan Rekam Medis Fisiologis Pertama (Health Record)
                │
                ▼
  Penayangan Riwayat Kronologis (Health Timeline)
```

**Tujuan Pengujian (*Milestone Goal*)**: Membuktikan bahwa platform mampu menerima, memvalidasi rentang biologis, mengenkripsi, dan menyimpan data kesehatan pengguna secara persisten ke dalam basis data PostgreSQL, serta menampilkannya kembali secara akurat pada antarmuka web responsif.

---

## 50. Irisan Vertikal #2: Pencatatan & Garis Acuan (Vertical Slice #2)

Irisan Vertikal Kedua (*Vertical Slice #2*) berfokus pada pembuktian diferensiasi teknologi inti (*Technical Differentiation*):

```
  Kumpulan Data Rekam Medis 28 Hari (Health Records)
                │
                ▼
  Kalkulasi Rata-rata & Variabilitas Wajar (Personal Baseline)
                │
                ▼
  Deteksi Pergeseran Pola Persisten (Trend & Behavior Signal)
                │
                ▼
  Penerbitan Kartu Wawasan Terstruktur Berbasis Bukti (Insight)
```

**Tujuan Pengujian (*Milestone Goal*)**: Membuktikan kemampuan algoritma deterministik dalam mendeteksi anomali perilaku tanpa mengandalkan LLM eksternal, sehingga menghasilkan sinyal yang 100% dapat diaudit dan dijelaskan (*explainable*).

---

## 51. Irisan Vertikal #3: Deteksi Sinyal & Wawasan (Vertical Slice #3)

Irisan Vertikal Ketiga (*Vertical Slice #3*) berfokus pada pembuktian lingkaran preventif berorientasi tindakan (*Preventive Loop Proof*):

```
  Kartu Wawasan Muncul di Dasbor (Insight)
                │
                ▼
  Penyajian Saran Tindakan Mikro yang Masuk Akal (Recommendation)
                │
                ▼
  Pengguna Menekan Tombol Komitmen ("Mulai Program 7 Hari")
                │
                ▼
  Pembuatan Rekaman Program Aktif (Active Intervention)
                │
                ▼
  Pelacakan Kepatuhan Harian & Evaluasi Dampak (Progress Tracking)
```

**Tujuan Pengujian (*Milestone Goal*)**: Membuktikan bahwa wawasan tidak berhenti sebagai informasi pasif, melainkan bertransformasi menjadi intervensi nyata yang terukur perkembangannya.

---

## 52. Irisan Vertikal #4: Rekomendasi & Intervensi (Vertical Slice #4)

Irisan Vertikal Keempat (*Vertical Slice #4*) berfokus pada pembuktian pendampingan tenaga ahli manusia (*Human-in-the-Loop Proof*):

```
  Sinyal Deviasi Persisten Terdeteksi pada Anggota
                │
                ▼
  Notifikasi Masuk ke Dasbor Kerja Instruktur Tertugaskan
                │
                ▼
  Instruktur Meninjau Riwayat Tren & Menuliskan Catatan Klinis
                │
                ▼
  Pemesanan Sesi Konsultasi Telemedisin Terjadwal
                │
                ▼
  Pelaksanaan Sesi & Notulensi Rencana Tindak Lanjut
```

**Tujuan Pengujian (*Milestone Goal*)**: Memvalidasi batas kedaulatan data dan isolasi peran instruktur, memastikan instruktur hanya dapat mengakses data anggota yang didelegasikan secara sah.

---

## 53. Irisan Vertikal #5: Asistensi AI Terpandu (Vertical Slice #5)

Irisan Vertikal Kelima (*Vertical Slice #5*) berfokus pada pembuktian kecerdasan buatan sebagai lapisan interaksi cerdas (*AI as Interaction Layer*):

```
  Anggota Membuka Ruang Chat Asisten AI PRONOIA
                │
                ▼
  Sistem Menyuntikkan Konteks Bukti Terstruktur (Structured Context)
                │
                ▼
  AI Menjelaskan Wawasan Perilaku Secara Empatis & Santun
                │
                ▼
  Anggota Menanyakan Gejala Klinis Rumit / Di Luar Lingkup
                │
                ▼
  Filter Keselamatan AI Aktif ──► Tawarkan Handoff ke Instruktur
```

**Tujuan Pengujian (*Milestone Goal*)**: Membuktikan bahwa Asisten AI PRONOIA beroperasi dengan etika ketat, bebas halusinasi diagnosis, dan patuh terhadap protokol eskalasi manusia.

---

## 54. Irisan Vertikal #6: Sinergi Instruktur & Dasbor (Vertical Slice #6)

Irisan Vertikal Keenam (*Vertical Slice #6*) berfokus pada pembuktian akuisisi data multimodal (*Multimodal Data Acquisition*):

```
  Pengguna Membuka Fitur Kamera Pemindai
                │
                ▼
  Pengambilan Foto Label Gizi Makanan Kemasan / Piring Nutrisi
                │
                ▼
  Pemrosesan Ekstraksi Nilai Gizi Otomatis (OCR & Vision AI)
                │
                ▼
  Layar Pratinjau: Pengguna Mengoreksi & Menyetujui Angka
                │
                ▼
  Data Tersimpan Resmi ke Dalam Buku Rekam Medis (Health Records)
```

**Tujuan Pengujian (*Milestone Goal*)**: Menunjukkan kecanggihan teknologi computer vision yang mempermudah pencatatan harian tanpa mengorbankan validasi kedaulatan pengguna.

---

## 55. Gerbang Kualitas Produksi (Quality Gates)

Setiap tonggak rilis rekayasa (*Engineering Milestone*) wajib melewati **5 Gerbang Kualitas (*5 Quality Gates*)**:

```
┌─────────────────────────────────────────────────────────────┐
│                 LIMA GERBANG KUALITAS PRODUKSI              │
├─────────────────────────────────────────────────────────────┤
│ Gate 1: Kelayakan Fungsional  (Functional Verification)     │
│ Gate 2: Integritas Basis Data (Data Integrity & Range Audit)│
│ Gate 3: Ketahanan Keamanan    (Security & RBAC Enforcement) │
│ Gate 4: Keselamatan Medis     (Health Safety & Anti-Harm)   │
│ Gate 5: Kualitas Pengalaman   (UX Accessibility & Polish)   │
└─────────────────────────────────────────────────────────────┘
```

> [!WARNING]
> Sebuah fitur tidak boleh dianggap selesai (*Done*) apabila hanya lolos uji coba fungsionalitas dasar tetapi mengabaikan gerbang integritas data atau batasan keselamatan medis.

---

## 56. Metrik Kinerja Selama Pengembangan MVP (Metrics During MVP Development)

Metrik kuantitatif yang dipantau secara berkala selama fase rekayasa MVP:

| Kategori Metrik | Indikator Kunci yang Dipantau | Ambang Batas Target Rilis |
| :--- | :--- | :---: |
| **Metrik Produk** | Rasio penyelesaian orientasi akun (*Onboarding Rate*). | `> 90%` |
| | Kesiapan kalkulasi garis acuan (*Baseline Readiness*). | `100% Data Valid` |
| | Rasio penerimaan rekomendasi preventif (*Acceptance Rate*). | `> 65%` |
| | Rasio kelulusan program intervensi (*Completion Rate*). | `> 75%` |
| **Metrik Sistem** | Latensi respons API inti (`p95`). | `< 250 ms` |
| | Tingkat kegagalan antrean background worker. | `< 0.1%` |
| | Latensi generasi respons inferensi AI. | `< 3.0 detik` |
| | Waktu henti sistem (*Downtime*) selama pengujian. | `0% Unplanned` |
| **Metrik Keselamatan**| Kesalahan inferensi status kesehatan biologis palsu. | **Toleransi 0 (Nol)** |
| | Kebocoran data rekam medis lintas pengguna (*IDOR*). | **Toleransi 0 (Nol)** |
| | Kegagalan eksekusi alur tombol darurat medis 119/112. | **Toleransi 0 (Nol)** |

---

## 57. Validasi Bintang Panduan (North Star Validation Loop)

Peta jalan pengembangan PRONOIA diarahkan pada satu metrik utama: **Jumlah Lingkaran Preventif Tertutup yang Sukses Diselesaikan (*Completed Preventive Health Loops*)**.

Satu siklus lingkaran preventif diakui lengkap apabila seluruh rantai pembuktian (*Audit Traceability Chain*) dapat ditelusuri dengan utuh:

```
  REKAM DATA MEDIS VALID
  ID: HR-001 (Durasi tidur 5j 15m tercatat stabil selama 5 hari)
            │
            ▼
  SINYAL DEVIASI PERILAKU
  ID: BS-024 (Penurunan persisten terdeteksi di bawah garis acuan)
            │
            ▼
  WAWASAN BERBASIS BUKTI
  ID: INS-011 (Penjelasan sebab-akibat yang ramah dan dapat dijelaskan)
            │
            ▼
  REKOMENDASI TERARAH
  ID: REC-005 (Jadwal tidur sirkadian 7 hari tanpa gadget sebelum tidur)
            │
            ▼
  INTERVENSI GAYA HIDUP AKTIF
  ID: INT-009 (Pengguna berkomitmen dan menuntaskan 7 dari 7 tugas harian)
            │
            ▼
  EVALUASI HASIL PREVENTIF
  ID: OUT-004 (Durasi tidur rata-rata pulih menjadi 7j 10m mendekati baseline)
```

Keterlacakan rantai ID (*ID Traceability Chain*) ini adalah bukti ilmiah terkuat bahwa PRONOIA beroperasi sebagai platform kesehatan preventif berbasis bukti nyata.

---

## 58. Kriteria Keberhasilan MVP (MVP Success Criteria)

Rilis MVP PRONOIA dinyatakan **Sukses Sempurna secara Produk dan Teknis** apabila:

### 1. Kapabilitas Pengguna Terpenuhi Penuh:
- Anggota dapat membuat profil, menentukan sasaran hidup sehat, dan mencatat data vital harian.
- Anggota memiliki garis acuan riwayat pribadi yang terbentuk secara otomatis.
- Anggota menerima sinyal deviasi dan wawasan berbasis bukti saat pola kebiasaan terganggu.
- Anggota menerima rekomendasi konkret, menjalankan intervensi, dan melihat kemajuannya.
- Anggota dapat menjadwalkan konsultasi dengan instruktur manusia untuk bimbingan mendalam.

### 2. Kapabilitas Rekayasa Sistem Terpenuhi Penuh:
- Sistem melindungi kedaulatan data medis sesuai regulasi UU PDP No. 27/2022.
- Otorisasi peran (RBAC) ditegakkan secara mutlak di seluruh endpoint backend.
- Seluruh mutasi data terekam dalam jejak audit kekal (*tamper-proof audit trail*).
- Sistem menangani ketidakpastian data fisiologis secara jujur dan transparan.
- **Logika inti kesehatan preventif dapat berjalan 100% tanpa ketergantungan pada koneksi API AI pihak ketiga**.

---

## 59. Peta Jalan Pasca-MVP (Post-MVP Roadmap: Phases 8A – 8E)

Setelah rilis MVP stabil dan sukses dipresentasikan pada kompetisi, pengembangan dilanjutkan ke Fase 8 (*Post-MVP Expansion*):

### Fase 8A — Personalisasi Tingkat Lanjut (*Advanced Personalization*)
- Rekomendasi adaptif berbasis mesin pemelajaran mesin terawasi.
- Pengelompokan kohort perilaku (*Behavior Clustering*) untuk penyesuaian intensitas intervensi.

### Fase 8B — Kecerdasan Buatan Generasi Baru (*Advanced AI*)
- Memori percakapan jangka panjang terenkripsi (*Long-Term Contextual Memory*).
- *Instructor Copilot*: Asisten AI terdedikasi untuk membantu instruktur merangkum tren rekam medis klien secara otomatis.

### Fase 8C — Integrasi Perangkat Luar (*Wearables & Device Integrations*)
- Integrasi otomatis dengan Apple HealthKit, Google Health Connect, Garmin, dan Fitbit melalui model data kanonikal PRONOIA.

### Fase 8D — Analitik & Riset Populasi (*Population Analytics*)
- Analitik agregat anonim untuk mengukur efektivitas program intervensi gaya hidup pada populasi perkotaan.

### Fase 8E — Platform Institusional & Korporat (*Institutional Platform*)
- Program kesehatan preventif untuk universitas (*Campus Wellness*), korporasi (*Corporate Wellness*), dan komunitas klinik kesehatan primer.

---

## 60. Arah Arsitektur Jangka Panjang (Long-Term Architecture Direction)

Arsitektur target jangka panjang platform PRONOIA (*Target Enterprise Topology*):

```
                               ┌─────────────────────────┐
                               │     PENGGUNA (USER)     │
                               └────────────┬────────────┘
                                            │
                               ┌────────────▼────────────┐
                               │   APLIKASI PRONOIA WEB  │
                               │     (Responsive PWA)    │
                               └────────────┬────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               ▼                            ▼                            ▼
      REKAM MEDIS KANONIKAL        PEMINDAI VISI AI OCR         ASISTEN AI BERETIKA
     (Manual & Jam Pintar)        (Nutrisi & Hasil Lab)        (Edukasi & Pendamping)
               │                            │                            │
               └────────────────────────────┼────────────────────────────┘
                                            ▼
                           PLATFORM DATA KESEHATAN TERPADU
                                            │
                                            ▼
                           MESIN PERILAKU KESEHATAN PREVENTIF
                                            │
                       ┌────────────────────┼────────────────────┐
                       ▼                    ▼                    ▼
                SINYAL DEVIASI       WAWASAN CERDAS       REKOMENDASI AKSI
                       │                    │                    │
                       └────────────────────┼────────────────────┘
                                            ▼
                                INTERVENSI PREVENTIF AKTIF
                                            │
                                            ▼
                                HASIL PERBAIKAN GAYA HIDUP
                                            │
                       ┌────────────────────┴────────────────────┐
                       ▼                                         ▼
           INSTRUKTUR & TENAGA MEDIS                   ANALITIK & RISET POPULASI
             (Human Support Loop)                     (Evidence-Based Research)
```

---

## 61. Prinsip Pamungkas Pengembangan Produk (Final Product Development Principle)

> [!IMPORTANT]
> **Prinsip Pamungkas Rekayasa PRONOIA:**
> **"PRONOIA tidak perlu memenangkan kompetisi dengan memiliki fitur terbanyak. Keunggulan mutlak PRONOIA dibuktikan dengan menghadirkan satu sistem yang dapat bekerja secara nyata dari hulu ke hilir: Mengamati (Observe) ──► Memahami (Understand) ──► Mendeteksi Perubahan (Detect Change) ──► Menjelaskan Sebab (Explain) ──► Mengintervensi (Intervene) ──► Memantau (Monitor) ──► Mengeskalasi ke Ahli (Escalate) ──► Memperbaiki Kualitas Hidup (Improve)."**

### Pernyataan Kunci Produk:
> **"The MVP is not the collection of features. The MVP is the working preventive health loop."**
*(MVP bukanlah sekadar kumpulan fitur yang banyak. MVP adalah bekerjanya lingkaran kesehatan preventif yang nyata.)*

Setiap usulan fitur baru wajib menjawab minimal satu dari 7 pertanyaan penguji:
```
  1. Apakah fitur ini meningkatkan ketelitian pengamatan data?  (Improve observation?)
  2. Apakah fitur ini memperdalam pemahaman pola kebiasaan?     (Improve understanding?)
  3. Apakah fitur ini mempertajam deteksi perubahan bermakna?    (Improve detection?)
  4. Apakah fitur ini memperjelas transparansi bukti wawasan?    (Improve explanation?)
  5. Apakah fitur ini mempermudah eksekusi intervensi nyata?     (Improve intervention?)
  6. Apakah fitur ini meningkatkan keakuratan pelacakan hasil?   (Improve monitoring?)
  7. Apakah fitur ini memperkuat sinergi pendampingan manusia?   (Improve human support?)
```

Apabila sebuah usulan fitur tidak mampu menjawab 'YA' pada salah satu pertanyaan di atas, fitur tersebut **dilarang menjadi prioritas rilis MVP**.

---
