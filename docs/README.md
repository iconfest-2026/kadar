# AEVYRA / HealthCheck — Platform Intervensi Dini & Kesehatan Preventif Personal (Personal Preventive Health & Early Intervention Platform)

> **Dokumen Kanonikal Produk & Panduan Pengembang**: Repositori ini memuat implementasi lengkap **AEVYRA / HealthCheck**, sebuah ekosistem kesehatan preventif berbasis *Health Behavior Engine (HBE)*, kecerdasan buatan terpandu (*Guided AI*), arsitektur web progresif (*PWA Offline-First*), dan keterlibatan manusia dalam lingkaran keputusan (*Human-in-the-Loop*). Dokumen ini berfungsi sebagai gerbang utama bagi pemangku kepentingan produk, pengembang perangkat lunak, dan agen koding otonom dalam memahami arsitektur, menjalankan instalasi lokal, dan memperluas kapabilitas sistem.

---

## Metadata Dokumen Kanonikal

| Parameter Metrik | Rincian Spesifikasi Teknis |
| :--- | :--- |
| **Identitas Dokumen** | `AEVYRA-DOC-000` (Master Product & Developer Specification) |
| **Nama Produk Resmi** | **AEVYRA / HealthCheck** |
| **Repositori Target** | `c:\laragon\www\kadar` |
| **Versi Platform** | `v1.4.2-enterprise-release` |
| **Status Repositori** | `Production-Ready / Active Development` |
| **Target Pengguna** | Anggota Komunitas (*Member*), Instruktur Kesehatan (*Instructor*), Administrator Sistem (*Admin*) |
| **Tumpukan Teknologi** | Laravel 11.x (PHP 8.2+), MySQL 8.0, Alpine.js / Blade / Tailwind CSS, PWA (Workbox Service Worker) |
| **Prinsip Utama** | *Preventive, Not Diagnostic; Server-Authoritative; Personal Baseline Over Generic Scoring; Privacy by Default (UU PDP No. 27/2022)* |

---

## Ringkasan Eksekutif & Topologi 8 Klaster Sistem

Dokumen README ini merangkum 41 bagian direktif teknis dan operasional yang dikelompokkan ke dalam **8 Klaster Ekosistem AEVYRA**:

```text
+---------------------------------------------------------------------------------------------------+
|                        AEVYRA SYSTEM & PRODUCT TOPOLOGY (41 SECTIONS)                            |
+---------------------------------------------------------------------------------------------------+
|  [Klaster 1: Bagian 1-4]    Visi Produk, Ide Inti, Pembeda Utama (HBE), & Arsitektur Sistem       |
|  [Klaster 2: Bagian 5-7]    16 Fitur Utama, 3 Peran Pengguna, & Siklus Hidup Preventif            |
|  [Klaster 3: Bagian 8-13]   Ruang Lingkup MVP, Peta Jalan, Tech Stack, Repositori, Dokumen, & AI  |
|  [Klaster 4: Bagian 14-21]  Panduan Lengkap Instalasi: Prasyarat, Setup Backend/DB/Frontend & Dev |
|  [Klaster 5: Bagian 22-24]  Standar Pengujian Mutu (Pest/PHPUnit), Kebersihan Kode, & Variabel Env|
|  [Klaster 6: Bagian 25-29]  Keamanan Peladen, Keselamatan Medis, Pagar Pembatas AI, PWA, & UX/UI  |
|  [Klaster 7: Bagian 30-34]  Filosofi Data Otoritatif, Pemisahan Domain, Prioritas Dev, DoD, & MVP |
|  [Klaster 8: Bagian 35-41]  Narasi Kompetisi, Metrik North Star, Fokus P0-P3, Git Komit, & Lisensi|
+---------------------------------------------------------------------------------------------------+
```

### Tabel Pemetaan 8 Klaster Ekosistem Produk

| Klaster | Cakupan Bagian | Domain Fokus Rekayasa | Dokumen Rujukan Terkait |
| :--- | :--- | :--- | :--- |
| **Klaster 1** | Bagian 1 – 4 | Ikhtisar Produk, Ide Inti Perubahan Perilaku, Inovasi Pembeda Utama (*Health Behavior Engine*), dan Topologi Arsitektur Sistem Berlapis. | `docs/01-product-vision.md`, `docs/10-system-architecture.md` |
| **Klaster 2** | Bagian 5 – 7 | 16 Modul Fitur Utama Sistem (5.1 s.d. 5.16), 3 Peran Pengguna (*Member, Instructor, Admin*), dan Siklus Hidup Preventif (*Observe-Understand-Detect-Explain-Intervene-Monitor-Escalate-Improve*). | `docs/03-features.md`, `docs/04-user-journeys.md` |
| **Klaster 3** | Bagian 8 – 13 | Ruang Lingkup MVP, Peta Jalan Rilis (Fase 0 s.d. Fase 3), Tumpukan Teknologi Penuh, Struktur Pohon Direktori Repositori, Peta 12 Dokumen Kanonikal, dan Panduan AI Coding Agent. | `docs/14-mvp-roadmap.md`, `docs/AGENTS.md` |
| **Klaster 4** | Bagian 14 – 21 | Panduan Lengkap Instalasi: Persyaratan Minimum (PHP 8.2+, Composer, Node, MySQL), Kloning Git, Konfigurasi Backend/DB, Build Aset Frontend, Peladen Dev, Queue Worker, dan Task Scheduler. | `docs/15-runbook.md` |
| **Klaster 5** | Bagian 22 – 24 | Standar Pengujian Otomatis (Unit, Feature, Arch, Safety Gates), Kebersihan Format Kode (Pint / PHPStan), dan Tata Kelola Variabel Lingkungan (`.env.example`). | `docs/rules/08-testing.md`, `docs/15-testing-acceptance.md` |
| **Klaster 6** | Bagian 25 – 29 | Keamanan Peladen & Otorisasi RBAC, Pagar Pembatas Keselamatan Medis (Anti-Diagnosis Palsu), Keselamatan AI Generatif, Ketahanan PWA Luring, dan Panduan Desain UX/UI (*#0F172A* deep slate). | `docs/rules/02-security.md`, `docs/11-health-safety.md`, `docs/12-ux-ui.md` |
| **Klaster 7** | Bagian 30 – 34 | Filosofi Data (*Authoritative, Derived, AI-Generated*), Pemisahan Batas Domain Inti, Prioritas Alur Implementasi, Definisi Ketuntasan Fitur (*DoD*), dan Kriteria Keberhasilan MVP. | `docs/05-health-behavior-engine.md`, `docs/08-data-model.md` |
| **Klaster 8** | Bagian 35 – 41 | Narasi Keunggulan Kompetisi, Metrik Bintang Utara (*Actionable Intervention Rate*), Fokus Strategis P0–P3, Panduan Kontribusi, Standar Pesan Komit Git, Lisensi Perangkat Lunak, dan Prinsip Pamungkas. | `docs/01-product-vision.md`, `docs/rules/00-project-context.md` |

---

## 1. Ikhtisar Produk (Product Overview)

Mayoritas aplikasi pelacak kesehatan di pasaran saat ini terjebak dalam perangkap siklus yang tidak efektif:

```text
[ PARADIGMA LAMA YANG TIDAK EFEKTIF ]:
Catat Data (Track)  ──>  Tampilkan Angka Generik (Display)  ──>  Dilupakan Pengguna (Forget)
```

Pengguna disuguhi grafik angka yang padat dan skor kesehatan generik yang dihitung berdasarkan rata-rata populasi umum tanpa mempertimbangkan konteks fisiologis unik masing-masing individu. Akibatnya, pengguna tidak memahami makna di balik data tersebut dan tidak memperoleh arahan praktis mengenai tindakan nyata apa yang harus dilakukan.

**AEVYRA / HealthCheck** mentransformasikan paradigma tersebut secara mendasar menjadi **Ekosistem Intervensi Dini & Tindakan Preventif**:

```text
[ SIKLUS PREVENTIF AKTIF AEVYRA ]:
Observe (Amati)  ──>  Understand (Pahami Tren)  ──>  Detect Change (Deteksi Deviasi)
       │                                                         │
       ▼                                                         ▼
Explain (Beri Bukti) ──> Intervene (Aksi Nyata) ──> Monitor (Pantau Kepatuhan)
       │                                                         │
       ▼                                                         ▼
Escalate (Dukungan Ahli Manusia)              <──> Improve (Evaluasi Dampak)
```

AEVYRA dirancang bukan sebagai sistem diagnosis medis statis, melainkan sebagai pendamping cerdas yang memberdayakan pengguna untuk membangun kesadaran biologis mandiri, mendeteksi anomali gaya hidup sejak dini, dan mengeksekusi kebiasaan mikro (*micro-habits*) yang realistis.

---

## 2. Ide Inti Produk (Core Product Idea)

Inovasi konseptual AEVYRA berakar pada satu keyakinan ilmiah: **Kesehatan Preventif Berkelanjutan Ditentukan oleh Perubahan Perilaku Personal, Bukan Sekadar Angka Skor Statis**.

```text
+-----------------------------------------------------------------------------------------+
|                  FOKUS INTI: PERBANDINGAN LONGITUDINAL TERHADAP DIRI SENDIRI            |
|                                LEBIH DIUTAMAKAN DARIPADA                                |
|                  SKOR KESEHATAN GENERIK POPULASI YANG TIDAK DIPERSONALISASI             |
+-----------------------------------------------------------------------------------------+
```

### Mengapa Garis Pangkal Pribadi Bersifat Esensial?

1. **Keunikan Ritme Biologis**: Setiap individu memiliki garis pangkal (*baseline*) fisiologis yang berbeda. Seseorang yang secara teratur tidur 8 jam sehari akan mengalami penurunan imunitas dan konsentrasi yang signifikan jika durasi tidurnya berkurang menjadi 6 jam. Sebaliknya, bagi individu yang memiliki baseline tidur 6,5 jam, durasi 6 jam tidak memicu sinyal risiko yang sama.
2. **Konteks Historis**: AEVYRA tidak menghakimi pengguna berdasarkan tolok ukur yang kaku, melainkan memetakan pola historis minimal 7 hingga 30 hari terakhir untuk mendeteksi kapan kebiasaan pengguna mulai bergeser secara mengkhawatirkan.
3. **Pemberdayaan Mandiri**: Dengan memahami deviasi baseline personal, pengguna memiliki kendali penuh atas keputusan gaya hidupnya sendiri.

---

## 3. Pembeda Teknis Utama (Core Differentiator)

Pembeda teknis utama (*core technical differentiator*) yang membedakan AEVYRA dari seluruh aplikasi kesehatan konvensional adalah:

### Health Behavior Engine (HBE)

**Health Behavior Engine (HBE)** merupakan mesin komputasi deterministik tingkat tinggi yang beroperasi pada lapisan peladen backend Laravel. HBE mengeksekusi pemrosesan data melalui prinsip matematika yang transparan dan dapat diaudit:

```text
[ Data Biometrik Mentah (Langkah, Tidur, Nutrisi, Hidrasi, Tekanan Darah) ]
                                    │
                                    ▼
[ Normalisasi & Validasi Kualitas Data (Deteksi Outlier & Missing Values) ]
                                    │
                                    ▼
[ Kalibrasi Garis Pangkal Personal Dinamis (Moving Average & Median) ]
                                    │
                                    ▼
[ Mesin Deteksi Sinyal Perilaku (Threshold & Moving Variance Analysis) ]
                                    │
                                    ▼
[ Konstruksi Bukti Eksplisit (Evidence Attachment: Nilai Riil vs Baseline) ]
                                    │
                                    ▼
[ Formulasi Wawasan & Rekomendasi Intervensi Mikro Praktis ]
```

* **Kedudukan Fitur Sekunder**: Modul asisten AI (*LLM*), pemindai label nutrisi kamera (*OCR*), lencana tantangan (*Gamification*), dan portal langganan (*Membership*) hanyalah instrumen pendukung yang dirancang untuk memperkuat dan melayani pipa data *Health Behavior Engine*.

---

## 4. Arsitektur Produk & Topologi Sistem (Product Architecture)

Arsitektur sistem AEVYRA dibangun dengan pola **Modular Monolith Berlapis** yang menjamin keandalan, keterpisahan tanggung jawab, dan kemudahan pemeliharaan:

```text
+-----------------------------------------------------------------------------------------+
|                                KANAL PENGGUNA (PRESENTATION)                            |
+-----------------------------------------------------------------------------------------+
|  [ Web Browser: Blade + Alpine.js ]     [ PWA: Workbox Cache & IndexedDB Offline Queue ]|
|  [ Responsif Seluler (Tailwind CSS) ]   [ Integrasi Media Kamera & Panggilan 119 ]      |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼
+-----------------------------------------------------------------------------------------+
|                          LAPISAN APLIKASI & ORKESTRASI (LARAVEL 11)                     |
+-----------------------------------------------------------------------------------------+
|  - Rute Terpadu: routes/web.php & routes/api.php                                        |
|  - Penjaga Keamanan: Form Requests, Rate Limiting, CSRF, Session/Sanctum Auth           |
|  - Pengontrol Tipis (Controllers): Delegasi Tugas & Transformasi JsonResource           |
|  - Kebijakan Otorisasi Sisi Peladen: Policies (RBAC: Member, Instructor, Admin)          |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼
+-----------------------------------------------------------------------------------------+
|                           INTI DOMAIN KESEHATAN (CORE SERVICES)                         |
+-----------------------------------------------------------------------------------------+
|  - Health Behavior Engine (HBE): Baseline Calculator, Signal Detector, Evidence Builder|
|  - Intervention Lifecycle Service: Mesin Status Terbatas (FSM: Draft/Active/Completed)  |
|  - Consultation & Booking Service: Validasi Slot Waktu Bebas Konflik                    |
|  - Emergency Direct Routing Service: Navigasi IGD & Telepon Darurat 119                 |
+-----------------------------------------------------------------------------------------+
                    │                                        │
                    ▼                                        ▼
+---------------------------------------+   +---------------------------------------------+
|    ABSTRAKSI PENYEDIA EKSTERNAL       |   |       LAPISAN BASIS DATA RELASIONAL         |
+---------------------------------------+   +---------------------------------------------+
| - AiProviderInterface (OpenAI/Mock)   |   | - MySQL 8.0 (InnoDB, ACID Transactions)     |
| - ScannerProviderInterface (OCR/Mock) |   | - Eloquent ORM dengan Eager Loading Ketat   |
| - NotificationProviderInterface       |   | - Kunci Asing & Kunci Idempotensi Unik      |
+---------------------------------------+   +---------------------------------------------+
```

---

## 5. Fitur Utama Sistem (Main Features)

Sistem AEVYRA menyediakan 16 modul fitur fungsional yang saling terintegrasi secara harmonis:

### 5.1 Profil Kesehatan Personal (Personal Health Profile)
Pencatatan profil demografis, riwayat alergi, kondisi medis kronis, preferensi diet, dan parameter biologis dasar yang menjadi landasan kalibrasi sistem.

### 5.2 Pelacakan Data Kesehatan (Health Data Tracking)
Pencatatan harian metrik gaya hidup esensial: durasi tidur, jumlah langkah kaki, asupan air putih, kalori makanan, denyut nadi, dan tingkat stres subjektif.

### 5.3 Garis Pangkal Personal (Personal Baseline)
Kalkulasi otomatis rata-rata bergerak (*moving average*) dan deviasi standar metrik pengguna selama jendela pengamatan 7 hingga 30 hari terakhir.

### 5.4 Deteksi Perubahan Perilaku (Behavioral Change Detection)
Algoritma pendeteksi pergeseran kebiasaan (*trend shift*) yang mengidentifikasi anomali negatif sebelum berkembang menjadi gejala fisik yang merugikan.

### 5.5 Wawasan Berbasis Bukti (Explainable Insights)
Penyajian wawasan analitik yang selalu menyertakan bukti data pendukung (*supporting evidence*) transparan tanpa konsep *black box*.

### 5.6 Rekomendasi Personal (Personalized Recommendations)
Formulasi saran aksi pencegahan mikro yang disesuaikan secara khusus dengan preferensi, keterbatasan fisik, dan lingkungan harian pengguna.

### 5.7 Rencana Intervensi & Progres (Intervention & Progress)
Penyusunan target kebiasaan terstruktur (misal: *"Jalan kaki 15 menit pasca makan malam selama 7 hari"*) yang dipantau kepatuhannya secara terukur.

### 5.8 Asisten Cerdas AI (AI Assistant)
Antarmuka percakapan berbasis AI terpandu yang bertindak sebagai pendamping edukatif dan motivator ramah, dibatasi pagar pembatas etika medis ketat.

### 5.9 Eskalasi AI ke Manusia (AI + Human Handoff)
Mekanisme pengalihan otomatis dari obrolan AI ke konsultasi instruktur manusia berlisensi ketika terdeteksi indikasi risiko yang memerlukan keahlian klinis.

### 5.10 Pemindai Nutrisi Kamera (Scanner)
Ekstraksi teks informasi nilai gizi pada kemasan makanan menggunakan kamera ponsel peramban untuk mempercepat pencatatan kalori harian.

### 5.11 Manajemen Instruktur Ahli (Instructor)
Portal khusus bagi instruktur kebugaran dan nutrisionis terverifikasi untuk meninjau riwayat tren kesehatan anggota binaannya secara etis.

### 5.12 Sesi Konsultasi Terjadwal (Consultation)
Sistem reservasi jadwal konsultasi tatap muka atau panggilan daring antara anggota dan instruktur dengan manajemen kuota dan slot waktu bebas konflik.

### 5.13 Gamifikasi Kebiasaan Positif (Gamification)
Pemberian poin loyalitas, rekor kepatuhan berturut-turut (*streaks*), dan lencana apresiasi atas konsistensi pengguna dalam menjalankan intervensi preventif.

### 5.14 Keanggotaan & Hak Istimewa (Membership)
Pengelolaan tingkatan langganan (Free vs Premium) yang membuka akses ke kuota konsultasi instruktur tambahan dan analitik tren jangka panjang.

### 5.15 Ruang Saling Dukung Komunitas (Community)
Forum interaksi sosial positif bagi sesama anggota untuk saling berbagi inspirasi pola hidup sehat dalam lingkungan yang dimoderasi ketat.

### 5.16 Pintasan Tombol Darurat (Emergency Shortcut)
Akses instan bebas hambatan ke tombol panggilan ambulans nasional **119** dan direktori rute fasilitas Instalasi Gawat Darurat (IGD) rumah sakit terdekat.

---

## 6. Peran & Hak Akses Pengguna (User Roles)

Sistem AEVYRA menegakkan kontrol akses berbasis peran (*Role-Based Access Control / RBAC*) yang memisahkan wewenang ke dalam tiga entitas utama:

```text
+-----------------------------------------------------------------------------------------+
|                               3 PERAN PENGGUNA RESMI:                                   |
|               [ MEMBER ]    •    [ INSTRUCTOR ]    •    [ ADMIN ]                       |
+-----------------------------------------------------------------------------------------+
```

### 1. Peran Anggota (Member)
* Merupakan pengguna akhir platform yang mencatat data gaya hidup pribadi.
* Berhak melihat garis pangkal personal, wawasan bukti, dan mengeksekusi rencana intervensi.
* Mengakses obrolan asisten AI, pemindai nutrisi, forum komunitas, dan memesan konsultasi.
* Memiliki kedaulatan penuh atas data pribadinya sesuai mandat UU PDP No. 27 Tahun 2022.

### 2. Peran Instruktur (Instructor)
* Merupakan tenaga ahli kebugaran, dietisien, atau praktisi kesehatan preventif bersertifikasi.
* Hanya dapat mengakses data kesehatan anggota yang secara eksplisit memesan sesi bimbingan dengannya.
* Berwenang memvalidasi rencana intervensi anggota, memberikan catatan panduan, dan memimpin sesi konsultasi.

### 3. Peran Administrator (Admin)
* Bertanggung jawab atas stabilitas operasional sistem, manajemen akun, dan saklar fitur (*feature flags*).
* Memantau log audit keamanan, tingkat latensi integrasi pihak ketiga, dan kesehatan infrastruktur peladen.
* Dilarang mengakses rincian data biometrik privat anggota tanpa dasar investigasi resmi yang tercatat.

---

## 7. Siklus Hidup Preventif Inti (Core Preventive Health Loop)

Seluruh pengalaman pengguna dalam aplikasi berputar mengelilingi **Siklus Hidup Preventif Inti 8 Tahap**:

```text
[ 1. Observe ]    ──> Pengguna mencatat metrik biometrik harian (tidur, langkah, makanan)
         │
         ▼
[ 2. Understand ] ──> HBE memetakan data terhadap garis pangkal personal 7-30 hari
         │
         ▼
[ 3. Detect ]     ──> HBE mendeteksi anomali tren (misal: defisit tidur beruntun)
         │
         ▼
[ 4. Explain ]    ──> Sistem menyajikan bukti eksplisit mengenai penyebab deviasi
         │
         ▼
[ 5. Intervene ]  ──> Pengguna mengaktifkan rencana intervensi mikro yang realistis
         │
         ▼
[ 6. Monitor ]    ──> Sistem memantau kepatuhan eksekusi intervensi setiap hari
         │
         ▼
[ 7. Escalate ]   ──> Menghubungkan ke instruktur manusia jika deviasi berlanjut
         │
         ▼
[ 8. Improve ]    ──> Evaluasi progres kebugaran dan kalibrasi ulang garis pangkal
```

Setiap fitur baru yang ditambahkan ke dalam repositori wajib memperkuat satu atau lebih tahapan dalam siklus hidup preventif di atas.

---

## 8. Ruang Lingkup MVP (Minimum Viable Product)

Pengembangan tahap awal difokuskan pada pemenuhan **Minimum Viable Product (MVP)** yang solid, teruji, dan bebas celah:

### Cakupan Wajib MVP (P0 Priority)
* **Autentikasi & Profil**: Registrasi aman, login berbasis sesi/token Sanctum, dan persetujuan privasi digital.
* **Pelacakan Data Esensial**: Formulir pencatatan metrik tidur, langkah, dan air minum dengan validasi ketat.
* **Health Behavior Engine Inti**: Kalkulasi garis pangkal 7 hari dan penerbitan sinyal deviasi tren.
* **Wawasan Bukti Transparan**: Tampilan kartu wawasan yang menyertakan data pembanding baseline.
* **Rencana Aksi Sederhana**: Pengaktifan satu rencana intervensi mikro dan pelacakan ceklis harian.
* **Pintasan Darurat 119**: Tombol panggilan cepat darurat dan pencarian rute IGD yang dapat diakses instan.

Fitur sekunder yang kompleks (seperti turnamen gamifikasi lintas komunitas atau integrasi smartwatch Bluetooth otomatis) ditangguhkan ke fase berikutnya demi menjaga kualitas alur inti MVP.

---

## 9. Peta Jalan Pengembangan (Development Roadmap)

Peta jalan rekayasa perangkat lunak AEVYRA dibagi ke dalam 4 fase strategis:

```text
+---------------------+   +---------------------+   +---------------------+   +---------------------+
|       FASE 0        |   |       FASE 1        |   |       FASE 2        |   |       FASE 3        |
| Fondasi & Mesin HBE |──>|      Rilis MVP      |──>| Instruktur & Sosial |──>| Skalabilitas Global |
+---------------------+   +---------------------+   +---------------------+   +---------------------+
| • Skema DB Relasional|   | • Siklus Preventif  |   | • Portal Instruktur |   | • Integrasi IoT/BLE |
| • Logika Baseline HBE|   | • PWA Luring Shell  |   | • Booking Konsultasi|   | • Ekosistem Korporat|
| • Kebijakan RBAC    |   | • Asisten Cerdas AI |   | • Ruang Komunitas   |   | • Sertifikasi Medis |
+---------------------+   +---------------------+   +---------------------+   +---------------------+
```

---

## 10. Tumpukan Teknologi Sistem (Technology Stack)

Aplikasi AEVYRA dibangun menggunakan kombinasi teknologi modern yang teruji keandalan dan kecepatannya di lingkungan produksi:

### Komposisi Tumpukan Teknologi Resmi

* **Lapisan Backend**:
  * **Framework**: Laravel 11.x (arsitektur Modular Monolith).
  * **Bahasa Pemrograman**: PHP 8.2+ dengan pengetikan ketat (`declare(strict_types=1)`).
  * **Otentikasi & API**: Laravel Sanctum dengan token sesi berbasis cookie HTTP-Only.
  * **Antrean & Penjadwal**: Laravel Queues (driver Database/Redis) dan Laravel Task Scheduler.
* **Lapisan Frontend**:
  * **Templating**: Laravel Blade Components (modular, terpakai ulang).
  * **Reaktivitas Antarmuka**: Alpine.js v3 (reaktif, ringan, bebas kompilasi runtime berat).
  * **Desain & Styling**: Tailwind CSS v3 (utilitas terstruktur, palet warna *#0F172A* deep slate).
  * **Build Tooling**: Vite 5.x untuk *hot-reloading* kilat dan pengemasan aset yang optimal.
* **Lapisan Basis Data & Cache**:
  * **Basis Data Relasional**: MySQL 8.0 (InnoDB engine, transaksi ACID, indeks kunci asing).
  * **Penyimpanan Klien**: CacheStorage (PWA App Shell) dan IndexedDB (Antrean Sinkronisasi Luring).
* **Kecerdasan Buatan & Pemindai**:
  * **Model Bahasa**: OpenAI GPT-4o / Claude 3.5 Sonnet melalui pola *AiProviderInterface*.
  * **Pemindai Nutrisi**: Tesseract OCR / Google Cloud Vision API melalui *ScannerProviderInterface*.
* **Infrastruktur & Penyebaran**:
  * **Lingkungan Lokal**: Laragon / PHP Built-in Server / MySQL.
  * **Web Server Produksi**: Nginx 1.24+ dengan HTTPS & TLS 1.3 mandatori.

---

## 11. Struktur Repositori Proyek (Repository Structure)

Repositori AEVYRA diorganisasikan dengan struktur berkas modular yang memisahkan instruksi orkestrasi agentik, aturan domain, kode aplikasi, dan spesifikasi dokumentasi:

```text
c:\laragon\www\kadar/
├── AGENTS.md                                   <-- Master Panduan & Instruksi AI Coding Agent
├── README.md                                    <-- Panduan Utama Produk & Pengembang Sistem
│
├── .agents/                                     <-- Direktori Khusus Penyelarasan Agen AI
│   ├── agents/                                  <-- Persona Spesialisasi Domain Rekayasa
│   │   ├── health-architect/agent.md            <-- Spesialis Arsitektur HBE & Batas Domain
│   │   ├── health-safety/agent.md               <-- Spesialis Etika Medis, UU PDP, & AI Guard
│   │   └── laravel-engineer/agent.md            <-- Spesialis Konvensi Laravel & Efisiensi DB
│   └── rules/                                   <-- 10 Berkas Aturan Kanonikal Repositori
│       ├── 00-project-context.md                <-- Konteks Sistem & 5 Pilar Produk
│       ├── 01-architecture.md                   <-- Pola Modular Monolith & Service Layer
│       ├── 02-security.md                       <-- Keamanan Peladen, RBAC, & Kepatuhan UU PDP
│       ├── 03-health-safety.md                  <-- Pagar Pembatas Medis & Alur Darurat 119
│       ├── 04-frontend.md                       <-- Standar Blade, Alpine.js, & 5 UI States
│       ├── 05-backend.md                        <-- Service Layer, Transaksi ACID, & Validasi
│       ├── 06-database.md                       <-- Skema Relasional, Indeks, & Integritas
│       ├── 07-api.md                            <-- Kontrak RESTful API & Kunci Idempotensi
│       ├── 08-testing.md                        <-- Piramida Pengujian & Safety Gates
│       └── 09-pwa.md                            <-- Service Worker, Cache, & Mode Luring
│
├── docs/                                        <-- 15 Spesifikasi Fungsional Produk Lengkap
│   ├── 00-index.md s.d. 15-runbook.md           <-- Dokumen Arsitektur & Operasional Sistem
│   └── rules/                                   <-- Salinan Sinkron Aturan Rekayasa
│
├── app/                                         <-- Lapisan Kode Aplikasi Backend Laravel
│   ├── Http/Controllers/                        <-- Pengontrol Tipis (Web & API)
│   ├── Http/Requests/                           <-- Validasi Form Request Sisi Peladen
│   ├── Models/                                  <-- Entitas Eloquent dengan Casting Ketat
│   ├── Policies/                                <-- Kebijakan Otorisasi Server-Authoritative
│   └── Services/HealthBehaviorEngine/           <-- Inti Komputasi Deterministik Mesin HBE
│
├── database/                                    <-- Migrasi Skema & Benih Data Pengujian
├── resources/views/                             <-- Tampilan Antarmuka (Blade + Tailwind)
├── routes/                                      <-- Deklarasi Rute (web.php, api.php)
└── tests/                                       <-- Pengujian Otomatis (Unit, Feature, Arch)
```

---

## 12. Peta Dokumentasi Kanonikal (Documentation)

Dokumentasi sistem AEVYRA disusun secara tematik dalam direktori `docs/` untuk menjadi sumber spesifikasi resmi:

| Berkas Spesifikasi | Domain Pembahasan | Fokus Tanggung Jawab Resmi |
| :--- | :--- | :--- |
| `docs/00-index.md` | Indeks Navigasi | Peta silsilah dokumentasi dan panduan pembacaan. |
| `docs/01-product-vision.md` | Visi Produk | Proposisi nilai preventif dan metrik keberhasilan. |
| `docs/02-problem-and-users.md` | Analisis Persona | Persona Member, Instructor, dan Admin. |
| `docs/03-features.md` | Spesifikasi Fitur | Rincian fungsional 16 modul platform. |
| `docs/04-user-journeys.md` | Alur Navigasi | Peta perjalanan pengguna dari onboarding hingga evaluasi. |
| `docs/05-health-behavior-engine.md`| Mesin Perilaku | Formula baseline personal dan algoritma deteksi sinyal. |
| `docs/06-ai-assistant.md` | Asisten Cerdas AI | Arsitektur prompt terpandu dan mitigasi halusinasi. |
| `docs/07-instructor-admin.md` | Portal Manajemen | Alur kerja instruktur, verifikasi data, dan audit admin. |
| `docs/08-data-model.md` | Kamus Data & ERD | Relasi entitas basis data, tipe data, dan aturan indeks. |
| `docs/09-api-contracts.md` | Kontrak API | Format amplop JSON, kode galat, dan header idempotensi. |
| `docs/10-system-architecture.md` | Arsitektur Sistem | Topologi infrastruktur, pola desain, dan batas komponen. |
| `docs/11-security-and-privacy.md`| Keamanan & Privasi | Enkripsi data, sanitasi log, dan kepatuhan UU PDP. |
| `docs/12-ux-ui.md` | Desain Antarmuka | Panduan palet warna, tipografi, dan komponen Blade. |
| `docs/13-gamification-membership.md`| Gamifikasi Etis | Sistem poin loyalitas mikro dan tingkatan keanggotaan. |
| `docs/14-mvp-roadmap.md` | Peta Jalan MVP | Strategi rilis bertahap dan mitigasi risiko teknis. |
| `docs/15-runbook.md` | Panduan Operasional | Prosedur deployment, pencadangan, dan respons insiden. |

---

## 13. Panduan Orkestrasi AI Coding Agent (AI Coding Agent Instructions)

Repositori ini dirancang agar sepenuhnya kompatibel dengan alur kerja **Agen Koding Berbasis AI (*AI Coding Agents*)** seperti Antigravity, Cursor, Windsurf, dan Claude Code.

### Protokol Wajib bagi Agen Koding

Sebelum mengeksekusi perubahan kode sumber, setiap agen koding **wajib menjalankan 4 langkah orkestrasi**:
1. **Muat Dokumen Master**: Baca berkas `AGENTS.md` pada direktori root repositori untuk memahami batas kewenangan dan hirarki instruksi.
2. **Aktifkan Aturan Selalu Aktif**: Selalu patuhi `00-project-context.md`, `01-architecture.md`, `02-security.md`, dan `03-health-safety.md`.
3. **Patuhi Batas Kedaulatan HBE**: Dilarang mengganti komputasi deterministik peladen dengan estimasi model bahasa AI.
4. **Tegakkan 8 Kriteria Tuntas (*Definition of Complete*)**: Jangan pernah menutup tugas sebelum otorisasi, pengujian, 5 status antarmuka, dan sinkronisasi dokumentasi terpenuhi.

---

## 14. Persyaratan & Prasyarat Instalasi (Installation Requirements)

Pastikan lingkungan komputer pengembangan Anda telah memenuhi spesifikasi minimum perangkat lunak berikut sebelum memulai proses instalasi:

### Tabel Prasyarat Lingkungan Pengembangan

| Perangkat Lunak | Versi Minimum | Keterangan & Ekstensi yang Dibutuhkan |
| :--- | :--- | :--- |
| **PHP** | `8.2.0` atau lebih baru | Wajib mengaktifkan ekstensi: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`, `gd`. |
| **Composer** | `2.6.0` atau lebih baru | Manajer dependensi resmi untuk pustaka backend PHP. |
| **Node.js** | `18.18.0` atau `20.x LTS` | Lingkungan eksekusi JavaScript runtime untuk kompilasi aset frontend. |
| **NPM** | `9.x` atau lebih baru | Manajer paket dependensi frontend. |
| **MySQL** | `8.0.x` atau MariaDB `10.6+`| Mesin basis data relasional dengan dukungan penyimpanan InnoDB dan JSON. |
| **Web Server** | Laragon / Nginx / Apache | Laragon sangat direkomendasikan pada lingkungan Windows OS. |
| **Git** | `2.40.0` atau lebih baru | Sistem pengontrol versi untuk pelacakan kode repositori. |

---

## 15. Kloning Repositori Git (Clone Repository)

Kloning repositori kode sumber dari sistem pengontrol versi Git ke direktori web server lokal Anda:

```bash
# Kloning repositori menggunakan protokol Git
git clone <repository-url> kadar

# Masuk ke dalam direktori proyek
cd kadar
```

Jika menggunakan Laragon pada sistem operasi Windows, tempatkan repositori ini pada jalur `c:\\laragon\\www\\kadar` untuk memfasilitasi pembuatan *virtual host* otomatis (`http://kadar.test`).

---

## 16. Konfigurasi Backend Laravel (Backend Setup)

Konfigurasikan pustaka backend Laravel dan siapkan kunci enkripsi aplikasi:

```bash
# 1. Pasang seluruh dependensi PHP via Composer
composer install

# 2. Gandakan berkas konfigurasi lingkungan dari templat
cp .env.example .env

# 3. Hasilkan kunci enkripsi aplikasi unik (APP_KEY)
php artisan key:generate

# 4. Buat tautan simbolik untuk penyimpanan berkas publik (storage)
php artisan storage:link
```

Pastikan berkas `.env` telah memiliki nilai `APP_KEY` yang terisi sebelum melangkah ke tahap berikutnya.

---

## 17. Konfigurasi Basis Data & Migrasi (Database Setup)

Buka berkas `.env` dan sesuaikan kredensial koneksi basis data MySQL lokal Anda:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kadar_db
DB_USERNAME=root
DB_PASSWORD=
```

Setelah basis data `kadar_db` dibuat di MySQL, jalankan migrasi skema dan benih data awal (*seeder*):

```bash
# Eksekusi migrasi skema tabel dan isi data awal simulasi
php artisan migrate --seed
```

Perintah di atas akan membangun seluruh tabel relasional (profil, data metrik, garis pangkal, sinyal perilaku, intervensi, tantangan, dan sesi instruktur) beserta data demonstrasi sintetis selama 30 hari.

---

## 18. Konfigurasi Dependensi Frontend (Frontend Setup)

Pasang pustaka dependensi JavaScript dan lakukan pengemasan aset antarmuka menggunakan Vite:

```bash
# Pasang paket dependensi Node.js via NPM
npm install

# Opsi A: Kompilasi aset untuk pengujian produksi (Production Build)
npm run build

# Opsi B: Jalankan peladen Vite Hot Module Replacement untuk pengembangan aktif
npm run dev
```

---

## 19. Menjalankan Peladen Pengembangan (Start Development Server)

Jalankan peladen pengembangan lokal Laravel untuk mengakses antarmuka aplikasi:

```bash
# Menjalankan peladen pengembangan lokal Laravel
php artisan serve
```

Aplikasi kini dapat diakses melalui peramban web pada alamat:
* **Default Artisan**: `http://127.0.0.1:8000`
* **Laragon Virtual Host**: `http://kadar.test` (jika Laragon telah dikonfigurasi).

### Kredensial Akun Demonstrasi Bawaan (Seeder)
* **Anggota (Member)**: `member@aevyra.test` / kata sandi: `password`
* **Instruktur (Instructor)**: `instructor@aevyra.test` / kata sandi: `password`
* **Administrator (Admin)**: `admin@aevyra.test` / kata sandi: `password`

---

## 20. Pemroses Antrean Latar Belakang (Queue Worker)

Untuk pemrosesan tugas-tugas intensif di latar belakang (seperti kalkulasi garis pangkal harian, pengiriman notifikasi pengingat, dan inferensi AI eksternal), jalankan *worker* antrean Laravel:

```bash
# Jalankan pemroses antrean latar belakang
php artisan queue:work --tries=3 --timeout=60
```

Pada lingkungan pengembangan lokal, pastikan variabel `QUEUE_CONNECTION=database` telah disetel pada berkas `.env`.

---

## 21. Penjadwal Tugas Otomatis (Scheduler)

Platform AEVYRA memanfaatkan penjadwal tugas (*Task Scheduler*) untuk mengeksekusi tugas pemeliharaan berkala secara otomatis (seperti evaluasi defisit tidur mingguan dan agregasi data kebugaran):

```bash
# Jalankan simulasi penjadwal tugas pada lingkungan lokal
php artisan schedule:work
```

Pada peladen produksi Linux, daftarkan entri Cron berikut pada sistem operasi:

```cron
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

---

## 22. Pengujian Otomatis Sistem (Testing)

Repositori AEVYRA mewajibkan verifikasi mutu otomatis secara ketat menggunakan *test suite* Laravel berbasis Pest / PHPUnit:

```bash
# Menjalankan seluruh rangkaian pengujian otomatis
php artisan test

# Menjalankan pengujian khusus logika Health Behavior Engine
php artisan test --filter=HealthBehaviorEngineTest

# Menjalankan pengujian khusus pagar pembatas keselamatan medis (Safety Gates)
php artisan test --filter=MedicalSafetyGuardrailTest

# Menjalankan pengujian dengan kalkulasi cakupan kode (Code Coverage)
php artisan test --coverage
```

### Kategori Pengujian Wajib
* **Uji Unit (*Unit Tests*)**: Menguji kebenaran formula matematika baseline personal, algoritma deviasi HBE, dan sanitasi masukan teks.
* **Uji Fitur (*Feature Tests*)**: Menguji rute HTTP, otentikasi Sanctum, otorisasi *Policy* RBAC, transaksi basis data, dan format amplop respons API.
* **Uji Keselamatan Medis (*Safety Gates*)**: Memverifikasi bahwa respons sistem dan asisten AI tidak pernah mengeluarkan klaim diagnosis klinis atau meresepkan obat.

---

## 23. Standar Kualitas & Format Kode (Code Quality)

Sebelum mengajukan perubahan kode sumber (*Pull Request*), seluruh pengembang dan agen koding wajib menjalankan perkakas analisis statis dan pemformat kode otomatis:

```bash
# 1. Pemformatan kode PHP otomatis sesuai standar PSR-12 (Laravel Pint)
./vendor/bin/pint

# 2. Analisis statis tipe data dan potensi bug (PHPStan level 8+)
./vendor/bin/phpstan analyse

# 3. Pemeriksaan sintaks dan kebersihan skrip antarmuka JavaScript
npm run lint
```

Kode yang tidak lolos analisis statis atau melanggar konvensi pengetikan ketat dilarang untuk digabungkan ke cabang utama (*main branch*).

---

## 24. Tata Kelola Variabel Lingkungan (Environment Variables)

Seluruh kredensial rahasia, kunci enkripsi peladen, dan token API pihak ketiga **DILARANG KERAS** dicatat secara permanen (*hardcoded*) di dalam kode sumber atau dikomit ke repositori Git:

### Nilai Sensitif yang Wajib Dikelola Melalui `.env`

```dotenv
# Kunci Enkripsi Aplikasi
APP_KEY=base64:uniquegeneratedkeyhere...

# Kredensial Akses Basis Data
DB_PASSWORD=super_secret_db_password

# Kredensial Penyedia AI Eksternal
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# Kredensial Notifikasi Push Web
VAPID_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VAPID_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Pastikan berkas `.gitignore` selalu mengecualikan berkas `.env`. Pengembang baru wajib menggunakan berkas templat `.env.example` yang hanya memuat nilai penampung (*dummy placeholders*).

---

## 25. Standar Keamanan & Perlindungan Data (Security)

Data kesehatan pribadi (*Personal Health Information / PHI*) diperlakukan sebagai **Aset Sangat Rahasia** dengan perlindungan keamanan berlapis:

```text
[ ARSITEKTUR KEAMANAN SISTEM AEVYRA ]
• Privacy by Default       --> Data tertutup rapat secara baku
• Least Privilege          --> Akses hanya diberikan sesuai kebutuhan peran
• Server-Authoritative     --> Otorisasi diverifikasi mutlak di peladen backend
• Zero-Trust Client        --> Masukan dari klien selalu divalidasi dan disanitasi
• Enkripsi At-Rest & Transit--> HTTPS / TLS 1.3 dan hashing kata sandi Argon2id
```

### Praktik Keamanan Mandatori
1. **Pencegahan IDOR (*Insecure Direct Object Reference*)**: Setiap kueri data kesehatan wajib diisolasi berdasarkan ID pengguna yang sedang terotentikasi (`where('user_id', auth()->id())`).
2. **Penyensoran Log Peladen (*Log Masking*)**: Dilarang mencatat parameter biometrik, riwayat penyakit, atau token sesi ke dalam berkas `storage/logs/laravel.log`.
3. **Proteksi Serangan Siber Umum**: Proteksi penuh terhadap serangan SQL Injection (via PDO Binding), Cross-Site Scripting / XSS (via Blade auto-escaping), dan Cross-Site Request Forgery / CSRF (via `@csrf`).

---

## 26. Batasan Keselamatan Medis & Klinis (Health Safety)

Sistem AEVYRA adalah platform kesehatan preventif dan intervensi gaya hidup dini, **BUKAN FASILITAS DIAGNOSIS MEDIS KLINIS**:

```text
+-----------------------------------------------------------------------------------------+
|                  BATASAN HAKIKI KESELAMATAN KESEHATAN AEVYRA:                          |
+-----------------------------------------------------------------------------------------+
| SISTEM MEMILIKI WEWENANG UNTUK:                                                         |
| • Memetakan pola kebiasaan harian dan membandingkannya dengan garis pangkal personal.   |
| • Memberikan materi edukasi kesehatan preventif berbasis bukti ilmiah resmi.            |
| • Menyarankan kebiasaan mikro (*micro-habits*) gaya hidup sehat yang aman dan praktis.  |
| • Menghubungkan pengguna dengan instruktur atau tenaga medis profesional.               |
|                                                                                         |
| SISTEM DILARANG KERAS UNTUK:                                                            |
| • Mengeluarkan vonis nama penyakit medis (misal: "Anda terdiagnosis hipertensi akut").  |
| • Mengklaim kepastian klinis tanpa pemeriksaan fisik oleh dokter berlisensi.            |
| • Memberikan dosis obat farmakologis atau meresepkan terapi obat keras.                 |
| • Mengambil alih atau menghambat jalur pertolongan gawat darurat medis (119 / IGD).     |
+-----------------------------------------------------------------------------------------+
```

---

## 27. Pagar Pembatas Keselamatan AI (AI Safety)

Lapisan kecerdasan buatan (*AI Assistant*) beroperasi secara terpandu di dalam koridor aman yang ditetapkan oleh aplikasi peladen backend:

```text
[ Data Terstruktur Peladen (Deterministik) ]
                    │
                    ▼
[ Context Injection Guard (Pagar Pembatas & Sanitasi Masukan) ]
                    │
                    ▼
[ Pemanggilan Model AI Terstandar (OpenAI / Claude) ]
                    │
                    ▼
[ Pemeriksaan Keluaran Peladen (Anti-Halusinasi & Anti-Klaim Medis) ]
                    │
                    ▼
[ Tampilan Respons Bersahabat ke Pengguna ]
```

### Kaidah Keselamatan AI
* **Pertahanan Terhadap Prompt Injection**: Teks yang dimasukkan pengguna atau hasil ekstraksi OCR kamera dianggap sebagai masukan nir-percaya dan disanitasi dari upaya *jailbreak*.
* **Larangan Fabrikasi Data**: Jika data biometrik pengguna belum mencukupi untuk menarik kesimpulan, model AI wajib menyatakan ketidakpastian tersebut secara transparan alih-alih mengarang nilai fiktif.
* **Kepatuhan Privasi Konteks**: AI hanya diberikan konteks data kesehatan milik pengguna aktif dalam sesi yang bersangkutan.

---

## 28. Aplikasi Web Progresif & Ketahanan Luring (PWA)

AEVYRA dirancang dengan kapabilitas **Progressive Web App (PWA)** untuk memberikan pengalaman aplikasi yang cepat, responsif, dan tangguh saat terjadi gangguan jaringan:

```text
+-----------------------------------------------------------------------------------------+
|                              FITUR PROGRESSIVE WEB APP (PWA):                           |
|  - Dapat Diinstal ke Layar Utama Ponsel (*Add to Home Screen / Standalone Display*)     |
|  - Pemuatan Instan Kerangka Aplikasi (*App Shell Cache < 800ms*)                        |
|  - Dukungan Luring Cerdas (*Offline-First Health Logging via IndexedDB Queue*)          |
|  - Sinkronisasi Otomatis Pasca-Luring (*Background Sync dengan Kunci Idempotensi*)      |
|  - Notifikasi Dorong Terjadwal (*Web Push Notifications via VAPID*)                     |
+-----------------------------------------------------------------------------------------+
```

* **Keamanan Cache Luring**: Hanya kerangka antarmuka statis dan materi edukasi publik yang disimpan di *CacheStorage*. Data kesehatan terotentikasi tidak boleh di-cache secara publik guna mencegah kebocoran privasi pada perangkat gawai yang digunakan bersama.

---

## 29. Prinsip Desain Pengalaman Pengguna (Design Principles)

Pengalaman visual dan interaksi antarmuka AEVYRA dirancang berlandaskan pada 5 prinsip filosofi desain `docs/12-ux-ui.md`:

```text
+-------------+---------------------------------------------------------------------------+
| Prinsip     | Definisi Implementasi Antarmuka Pengguna                                  |
+-------------+---------------------------------------------------------------------------+
| 1. Simple   | Tata letak bersih, bebas kekacauan visual, satu tindakan utama per layar. |
| 2. Clear    | Tipografi proporsional, grafik tren mudah dibaca, navigasi intuitif.      |
| 3. Calm     | Palet warna gelap elegan (#0F172A) yang menenangkan dan ramah bagi mata.  |
| 4. Trusted  | Transparansi bukti data, privasi terlindungi, bebas manipulasi *dark-mode*|
| 5. Actionable| Setiap wawasan kesehatan selalu disertai tombol aksi intervensi nyata.   |
+-------------+---------------------------------------------------------------------------+
```

Antarmuka dibangun dengan pendekatan *Mobile-First* yang nyaman dioperasikan dengan satu tangan (*Thumb Zone Optimization*) dan mematuhi standar aksesibilitas WCAG 2.1 AA.

---

## 30. Filosofi Tata Kelola Data (Core Data Philosophy)

Sistem AEVYRA mengklasifikasikan data ke dalam tiga tingkatan otoritas yang berbeda secara fundamental:

```text
+-----------------------------------------------------------------------------------------+
|                               3 TINGKATAN DATA SISTEM:                                  |
+-----------------------------------------------------------------------------------------+
| 1. DATA OTORITATIF   --> Logika Peladen + Status Basis Data MySQL (Kebenaran Mutlak)    |
| 2. DATA DERIVATIF    --> Garis Pangkal & Sinyal Perilaku Hasil Komputasi HBE (Determinis)|
| 3. DATA GENERATIF AI --> Narasi Penjelasan & Dialog Edukasi Asisten AI (Representasi)   |
+-----------------------------------------------------------------------------------------+
```

Model AI **tidak pernah diizinkan** menjadi sumber kebenaran untuk menentukan hak akses pengguna, pemotongan kuota konsultasi, status kepatuhan intervensi, atau evaluasi rute darurat medis.

---

## 31. Pemisahan Batas Domain Inti (Core Domain Separation)

Untuk menjaga skalabilitas dan mencegah keterikatan kode yang rapuh (*tight coupling*), repositori AEVYRA menegakkan batas-batas domain yang tidak boleh dilanggar:

```text
[ Data Kesehatan Mentah ]   !=   [ Garis Pangkal Personal ]   !=   [ Sinyal Perilaku ]
            │                                                              │
            ▼                                                              ▼
[ Wawasan Bukti Eksplisit ]  !=   [ Rekomendasi Tindakan ]     !=   [ Intervensi Aktif ]
```

### Batasan Integrasi Tambahan

1. **Respons AI vs Keputusan Peladen**: Narasi teks dari AI adalah instrumen penyajian, bukan keputusan otoritatif sistem.
2. **Keluaran OCR Pemindai vs Rekam Nutrisi Resmi**: Hasil ekstraksi teks kemasan makanan adalah draf masukan sementara yang wajib dikonfirmasi pengguna sebelum disimpan ke basis data.
3. **Poin Gamifikasi vs Derajat Kesehatan**: Perolehan lencana poin kepatuhan tidak boleh dipertukarkan atau disamakan dengan indikator stabilitas klinis pengguna.
4. **Tingkat Langganan vs Akses Kedaruratan**: Pengguna gratis (*Free Tier*) dan berbayar (*Premium*) memiliki hak dan kecepatan akses yang sama persis terhadap tombol darurat 119 dan pencarian fasilitas IGD.

---

## 32. Prioritas Eksekusi Rekayasa (Development Priorities)

Untuk menjaga fokus rekayasa dan efisiensi waktu penyampaian produk, urutan prioritas implementasi fitur ditetapkan secara berurutan:

```text
01. Autentikasi Pengguna & Sesi Aman (Authentication & Sanctum)
02. Otorisasi Peran & Kebijakan Akses (Roles & Policies: Member/Instructor/Admin)
03. Profil Kesehatan & Preferensi Biometrik (Health Profile & Onboarding)
04. Pencatatan Data Kesehatan Harian (Health Data Logging & Validation)
05. Logika Garis Pangkal Personal Dinamis (Personal Baseline Engine)
06. Mesin Deteksi Sinyal Perubahan Perilaku (Behavior Signal Detection)
07. Konstruksi Bukti Metrik Eksplisit (Evidence Builder)
08. Formulasi Rekomendasi Mikro Personal (Personalized Recommendations)
09. Rencana Intervensi & Mesin Status (Intervention Lifecycle FSM)
10. Pemantauan Kepatuhan Harian (Progress & Compliance Tracking)
11. Rute Kedaruratan Independen (Emergency Shortcut 119 & Direktori IGD)
12. Portal Instruktur & Reservasi Konsultasi (Instructor Booking)
13. Asisten Cerdas AI Terpandu (Guided AI Assistant)
14. Pemindai Nutrisi Kamera Luring (Nutrition OCR Scanner)
15. Gamifikasi Etis & Ruang Saling Dukung Komunitas (Badges & Community)
```

Dilarang keras memulai pengerjaan fitur gamifikasi atau integrasi AI sebelum mata rantai fondasi 01 hingga 11 teruji dan stabil.

---

## 33. Definisi Ketuntasan Fitur (Definition of Done)

Sebuah fitur atau modul sistem AEVYRA **HANYA DIAKUI SELESAI (*DONE*)** jika telah memenuhi seluruh kriteria ketuntasan holistik:

```text
[ DEFINISI KETUNTASAN FITUR (DEFINITION OF DONE) ]
[ ] 1. Implementasi Kode Sesuai Spesifikasi Desain & Standar Laravel 11.
[ ] 2. Validasi Form Request Sisi Peladen Aktif Menolak Masukan Tidak Sah.
[ ] 3. Kebijakan Otorisasi (Policy) Mencegah Celah Akses Antar-Pengguna (IDOR).
[ ] 4. Komponen Antarmuka Menangani 5 Status (Loading, Success, Error, Empty, Offline).
[ ] 5. Uji Unit & Fitur Otomatis Ditambahkan dan Lulus 100% pada Test Suite.
[ ] 6. Tinjauan Keselamatan Medis Memastikan Bebas Klaim Diagnosis Palsu.
[ ] 7. Tinjauan Privasi Memastikan Kepatuhan UU PDP (Tanpa PHI di Log).
[ ] 8. Dokumentasi Kanonikal di direktori docs/* Disinkronkan Selaras dengan Kode.
```

---

## 34. Kriteria Keberhasilan MVP (MVP Success Criteria)

Keberhasilan rilis Minimum Viable Product (MVP) AEVYRA diukur dari kemampuannya mengeksekusi satu skenario pengguna dari hulu ke hilir secara sempurna tanpa galat:

```text
[ SKENARIO EMAS KEBERHASILAN MVP (GOLDEN JOURNEY) ]
Anggota Mendaftar & Mengisi Profil Biometrik
                   │
                   ▼
Mencatat Metrik Gaya Hidup (Tidur, Langkah, Makanan) Selama 7 Hari
                   │
                   ▼
HBE Membangun Garis Pangkal Personal & Mendeteksi Defisit Tidur
                   │
                   ▼
Sistem Menampilkan Wawasan Bukti: "Rata-rata tidur turun 1,8 jam dari baseline"
                   │
                   ▼
Anggota Mengaktifkan Intervensi: "Jadwal Relaksasi 22.00 WIB Selama 5 Hari"
                   │
                   ▼
Anggota Memantau Kepatuhan Harian & Melihat Pemulihan Kebugaran
                   │
                   ▼
(Opsional) Anggota Memesan Sesi Konsultasi Klarifikasi dengan Instruktur
```

Jika alur terpadu di atas dapat dijalankan secara lancar, responsif, dan bebas galat di peramban ponsel, maka MVP dinyatakan sukses besar.

---

## 35. Narasi Posisi Kompetisi (Competition Narrative)

Dalam pameran inovasi teknologi, kompetisi perangkat lunak, maupun presentasi dewan juri, proposisi nilai AEVYRA diposisikan secara tegas:

> **"AEVYRA bukan sekadar aplikasi pelacak angka. AEVYRA adalah platform kesehatan preventif personal yang memahami perubahan bermakna dalam perilaku biologis harian Anda dan memandu tindakan intervensi nyata sebelum berkembang menjadi risiko klinis."**

### Pilar Narasi Keunggulan Bersaing

* **Bukan Sekadar AI Gimmick**: Kami tidak mengandalkan obrolan AI semu yang berbahaya, melainkan komputasi deterministik *Health Behavior Engine* yang berakar pada bukti matematis.
* **Kedaulatan Privasi Tinggi**: Dibangun dengan kepatuhan penuh terhadap UU PDP No. 27/2022, menjamin data kesehatan pengguna terlindungi secara mutlak.
* **Keandalan Tanpa Kerusakan (*Zero-Crash Reliability*)**: Seluruh alur kerja telah diuji secara mendalam dengan perlindungan mode luring PWA yang tangguh.

---

## 36. Metrik Bintang Utara Produk (Product North Star)

Metrik evaluasi tertinggi yang menjadi kompas pemandu seluruh keputusan produk AEVYRA adalah:

### Metrik Bintang Utara (North Star Metric)

```text
+-----------------------------------------------------------------------------------------+
|                              METRIK BINTANG UTARA KAMI:                                 |
|               JUMLAH SIKLUS PREVENTIF YANG DISELESAIKAN PENGGUNA                        |
|                     (Completed Preventive Health Loops)                                 |
+-----------------------------------------------------------------------------------------+
```

Sebuah siklus preventif dihitung sukses dan bermakna hanya ketika:
1. Sistem mendeteksi adanya pergeseran perilaku yang terbukti melalui data.
2. Pengguna menerima penjelasan wawasan dan memilih satu rencana intervensi preventif.
3. Pengguna mengeksekusi dan mematuhi rencana intervensi tersebut hingga tuntas.
4. Terjadi perbaikan terukur pada metrik biometrik pengguna pasca-intervensi.

Tujuan kami bukan memaksimalkan durasi waktu pengguna menatap layar (*screen time*), melainkan memaksimalkan kualitas kebiasaan hidup sehat pengguna di dunia nyata.

---

## 37. Fokus Strategis Pengembangan Saat Ini (Current Strategic Focus)

Pengembangan repositori saat ini difokuskan pada pemenuhan matriks prioritas strategis berikut:

### Prioritas Mutlak (P0 - Critical Foundations)
* Keamanan otentikasi sesi Sanctum dan otorisasi peladen multi-tenant berbasis *Policy*.
* Validasi ketat pengumpulan metrik kesehatan harian dan pencegahan nilai anomali biologis.
* Komputasi deterministik rata-rata bergerak 7 hari pada *Health Behavior Engine*.
* Penyajian kartu wawasan berbasis bukti dengan pembanding garis pangkal personal.
* Akses bebas hambatan ke tombol panggilan darurat 119 dan direktori IGD terdekat.

### Prioritas Tinggi (P1 - Core Enhancements)
* Dialog percakapan ramah asisten cerdas AI yang dibatasi konteks privat pengguna.
* Portal instruktur terverifikasi dan reservasi jadwal konsultasi bebas konflik waktu.
* Pemindai kamera OCR informasi nilai gizi pada kemasan makanan dengan validasi pengguna.

### Prioritas Menengah (P2 - Engagement & Retention)
* Rekor kepatuhan berturut-turut (*streaks*) dan lencana apresiasi tantangan intervensi.
* Ruang komunitas saling dukung pola hidup sehat dengan sistem moderasi aktif.

### Prioritas Mendatang (P3 - Long-Term Horizon)
* Sinkronisasi data otomatis dengan sensor perangkat wearable (Apple Health, Google Fit, Garmin).
* Integrasi portal korporat untuk program kesehatan karyawan terpadu (*Corporate Wellness*).

---

## 38. Panduan Berkontribusi pada Repositori (Contributing)

Kami menyambut kontribusi rekayasa berkualitas tinggi dari pengembang perangkat lunak. Sebelum mengajukan kontribusi, patuhi alur berikut:

1. **Pahami Arsitektur**: Baca `docs/01-product-vision.md`, `docs/10-system-architecture.md`, dan `docs/AGENTS.md`.
2. **Periksa Isu Terbuka**: Pastikan kontribusi Anda menyelesaikan tiket atau permasalahan yang telah terdaftar resmi.
3. **Patuhi Aturan Domain**: Tunduk pada direktif yang tertera di direktori `.agents/rules/*.md`.
4. **Tulis Rangkaian Uji Otomatis**: Setiap penambahan fitur wajib disertai uji Unit atau Feature yang relevan.
5. **Jalankan Format Kode**: Pastikan seluruh kode lulus pemformatan `./vendor/bin/pint` dan analisis `./vendor/bin/phpstan`.
6. **Ajukan Pull Request**: Sertakan ringkasan perubahan, analisis risiko, dan konfirmasi uji pada deskripsi PR.

---

## 39. Konvensi Pesan Komit Git (Commit Convention)

Repositori ini menerapkan konvensi penamaan pesan komit Git terstandar (*Conventional Commits v1.0.0*):

```text
[tipe]([lingkup]): [deskripsi imperatif huruf kecil tanpa titik]

Daftar Awalan Resmi:
• feat     : Penambahan fitur fungsional baru (misal: feat(hbe): tambah kalkulasi deviasi baseline)
• fix      : Perbaikan bug atau celah kesalahan (misal: fix(auth): perbaiki otorisasi jadwal instruktur)
• refactor : Restrukturisasi kode tanpa mengubah perilaku eksternal
• test     : Penambahan atau pembaruan pengujian otomatis (Unit/Feature)
• docs     : Modifikasi berkas dokumentasi atau spesifikasi teknis
• perf     : Optimasi efisiensi kueri atau pemuatan aset antarmuka
• security : Penguatan perlindungan data atau penanganan kerentanan sistem
• chore    : Pemeliharaan berkas konfigurasi dependensi Composer/NPM
```

---

## 40. Lisensi Repositori (License)

Hak cipta dan ketentuan lisensi kode sumber repositori AEVYRA / HealthCheck diatur sebagai berikut:

```text
Hak Cipta (c) 2026 AEVYRA Engineering Guild & Tim Pengembang Platform.
Seluruh Hak Cipta Dilindungi Undang-Undang.

Lisensi Resmi: Proprietary / Restricted Enterprise Software License.
Penggunaan, penyalinan, modifikasi, dan pendistribusian kode sumber ini tunduk pada
perjanjian lisensi internal resmi. Dilarang mendistribusikan ulang repositori ini
ke ranah publik tanpa izin tertulis dari pemegang hak cipta.
```

Untuk informasi lisensi khusus kompetisi atau pengujian akademik, silakan hubungi tim arsitektur repositori.

---

## 41. Prinsip Pamungkas Proyek (Project Principle)

Sebagai penutup panduan rekayasa ini, camkan selalu prinsip fundamental yang melandasi eksistensi platform AEVYRA:

```text
+-----------------------------------------------------------------------------------------+
|                  PRINSIP REKAYASA PAMUNGKAS AEVYRA / HEALTHCHECK                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|      AEVYRA BUKANLAH SEKADAR GABUNGAN FITUR-FITUR TEKNOLOGI YANG TERISOLASI.           |
|                                                                                         |
|                     AEVYRA ADALAH SATU SIKLUS HIDUP PREVENTIF:                         |
|                                                                                         |
|       Observe  ──>  Understand  ──>  Detect  ──>  Explain  ──>  Intervene               |
|                                                                                         |
|                                         ──>  Monitor  ──>  Escalate  ──>  Improve       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

Setiap baris kode, setiap pengontrol, setiap kueri basis data, dan setiap komponen antarmuka yang Anda bangun di repositori ini memiliki satu tujuan mulia: **memperkuat dan menjaga keutuhan siklus preventif tersebut demi melindungi kesehatan dan kualitas hidup pengguna**.

> **"Bangun dan sempurnakan siklus hidup kesehatan preventif terlebih dahulu. Seluruh fitur lainnya hadir untuk melayani dan memperkokoh siklus tersebut."**

---
