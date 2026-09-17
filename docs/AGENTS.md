# PRONOIA / HealthCheck — Panduan & Instruksi Lengkap AI Coding Agent (AI Coding Agent Master Instructions)

> **Dokumen Kanonikal Otoritatif Sistem**: Dokumen ini merupakan panduan orkestrasi tertinggi (*primary orchestrator*) bagi seluruh Agen Koding Berbasis AI (*AI Coding Agents*) seperti Antigravity, Cursor, Windsurf, Claude Code, dan pengembang manusia dalam merekayasa, memperluas, menguji, dan memelihara repositori **PRONOIA / HealthCheck**. Seluruh arsitektur, batas domain, otorisasi peladen, mitigasi risiko kesehatan, dan alur kerja wajib tunduk pada direktif yang didefinisikan dalam dokumen ini.

---

## Metadata Dokumen Kanonikal

| Parameter Metrik | Rincian Spesifikasi Teknis |
| :--- | :--- |
| **Identitas Dokumen** | `PRONOIA-AGENTS-001` (Master Agentic Orchestration Directive) |
| **Nama Sistem Resmi** | **PRONOIA / HealthCheck** (Platform Intervensi Dini & Kesehatan Preventif Personal) |
| **Versi Dokumen** | `v1.4.2-enterprise-agentic` |
| **Status Berlaku** | `Active / Authoritative Standard` |
| **Tingkat Kepatuhan** | **Mandatori Mutlak (*Strict Enforcement*)** — Pelanggaran terhadap batas keselamatan atau otorisasi dianggap sebagai regresi arsitektural kritis |
| **Klasifikasi Akses** | Internal Engineering, Architecture Guild, & Autonomous Coding Agents |
| **Repositori Target** | `c:\laragon\www\kadar` |
| **Teknologi Utama** | Laravel 11.x (PHP 8.2+), MySQL 8.0, Alpine.js / Blade / Tailwind CSS, Progressive Web App (PWA / Workbox) |
| **Prinsip Utama** | *Preventive, Not Diagnostic; Server-Authoritative; Deterministic Safety First; Personal Baseline Over Generic Scoring* |

---

## Ringkasan Eksekutif & Topologi 10 Klaster Instruksi

Dokumen orkestrasi ini merangkum 60 bagian direktif teknis yang dikelompokkan ke dalam **10 Klaster Rekayasa Agentik** yang kohesif. Setiap agen yang beroperasi di repositori ini diwajibkan memahami perannya sebelum menuliskan sebaris kode:

```text
+---------------------------------------------------------------------------------------------------+
|                     PRONOIA AGENTIC ORCHESTRATION ARCHITECTURE (60 SECTIONS)                      |
+---------------------------------------------------------------------------------------------------+
|  [Klaster 1: Bagian 1-6]    Identitas Sistem, Sasaran Rekayasa, 5 Prinsip Inti, & Hirarki Agen    |
|  [Klaster 2: Bagian 7-12]   Matriks Aktivasi Aturan, Peta Dokumen, & Batasan Domain Inti          |
|  [Klaster 3: Bagian 13-20]  Tanggung Jawab Deterministik vs AI, Kualitas Data, & Protokol Darurat |
|  [Klaster 4: Bagian 21-26]  Rekayasa Frontend, Backend, Database, Kontrak API, & State Machine    |
|  [Klaster 5: Bagian 27-30]  Standar Pengujian Mutu, Definisi Tuntas, Penanganan Galat, & Audit    |
|  [Klaster 6: Bagian 31-36]  PWA Luring, Anggaran Kinerja, Ketergantungan, & Kebersihan Kode       |
|  [Klaster 7: Bagian 37-40]  Keamanan Migrasi DB, Konsistensi UI/UX, & Kesiapan Demo Kompetisi     |
|  [Klaster 8: Bagian 41-47]  Alur Implementasi, Protokol Pra/Pasca Edit, & Anti-Overengineering     |
|  [Klaster 9: Bagian 48-54]  Arsitektur Rujukan, Abstraksi Provider, Feature Flags, & Git Etiket  |
|  [Klaster 10: Bagian 55-60] Daftar Periksa Review Final, Aturan Non-Negosiasi, & Prinsip Pamungkas|
+---------------------------------------------------------------------------------------------------+
```

### Tabel Pemetaan 10 Klaster Rekayasa Agentik

| Klaster | Cakupan Bagian | Domain Fokus Rekayasa | Dokumen Rujukan Terkait |
| :--- | :--- | :--- | :--- |
| **Klaster 1** | Bagian 1 – 6 | Identitas Produk, Sasaran Rekayasa, 5 Prinsip Preventif, Struktur Repositori, Hirarki Instruksi, dan Spesialisasi Agen (*health-architect, health-safety, laravel-engineer*). | `00-project-context.md`, `01-architecture.md` |
| **Klaster 2** | Bagian 7 – 12 | Matriks Aktivasi Aturan (*Always On* vs *Model Decision*), Peta Dokumentasi, Checklist Pra-Perubahan, Klasifikasi Tipe Perubahan (A/B/C/D), Batasan Domain, dan Sumber Kebenaran Otoritatif. | `01-architecture.md`, `02-security.md` |
| **Klaster 3** | Bagian 13 – 20 | Pembagian Tugas Deterministik vs AI, Prioritas *Health Behavior Engine*, Standar Kualitas Data, Otorisasi RBAC, Sanitasi Keamanan, Privasi UU PDP, Pagar Pembatas AI, dan Protokol Gawat Darurat (119 / IGD). | `02-security.md`, `03-health-safety.md` |
| **Klaster 4** | Bagian 21 – 26 | Standar Rekayasa Frontend (Alpine.js/Blade), Backend (Service Layer), Basis Data (Integritas Relasional), Kontrak API RESTful, Penegakan Idempotensi Mutlak, dan *State Machine* Deterministik. | `04-frontend.md`, `05-backend.md`, `06-database.md`, `07-api.md` |
| **Klaster 5** | Bagian 27 – 30 | Standar Cakupan Pengujian (Unit, Feature, Safety Gates), Definisi Ketuntasan (*Definition of Complete*), Normalisasi Respon Galat, serta Telemetri, Audit Trail, & Observabilitas Sistem. | `08-testing.md`, `02-security.md` |
| **Klaster 6** | Bagian 31 – 36 | Standar PWA & Ketahanan Mode Luring, Anggaran Kinerja Sistem (*Core Web Vitals*), Tata Kelola Ketergantungan Eksternal, Konvensi Idiom Laravel, Standar Kebersihan Kode, dan Prinsip *Existing Code First*. | `09-pwa.md`, `05-backend.md` |
| **Klaster 7** | Bagian 37 – 40 | Keselamatan Migrasi Skema Basis Data Non-Destruktif, Konsistensi Desain Antarmuka Pengguna (UI/UX), Disiplin Batasan Ruang Lingkup Produk, serta Prinsip Keandalan Demo Kompetisi (*Zero-Crash Guarantee*). | `04-frontend.md`, `06-database.md` |
| **Klaster 8** | Bagian 41 – 47 | Standar Alur Kerja Eksekusi, Protokol Pra-Penyuntingan Kode, Protokol Verifikasi Pasca-Penyuntingan, Sinkronisasi Dokumentasi, Larangan Perubahan Kontrak Terselubung, *Safe Defaults*, dan Anti-Overengineering. | Seluruh Berkas Rules `00`–`09` |
| **Klaster 9** | Bagian 48 – 54 | Arsitektur Rujukan Berlapis, Pola Abstraksi Penyedia (*Provider Pattern*), Tata Kelola Saklar Fitur (*Feature Flags*), Isolasi Data Demo vs Produksi, Perlindungan Data Sensitif Lokal, Disiplin Git, dan Standar PR. | `01-architecture.md`, `02-security.md` |
| **Klaster 10** | Bagian 55 – 60 | Daftar Periksa Tinjauan Akhir 7 Dimensi, Standar Ketuntasan Operasional, 15 Kaidah Non-Negosiasi, Kaidah Integritas Karakter Produk, Prinsip Siklus Hidup Inti, dan Prinsip Rekayasa Pamungkas. | `00-project-context.md` – `09-pwa.md` |

---

## 1. Identitas Proyek (Project Identity)

Repositori ini memuat **PRONOIA / HealthCheck**, sebuah *Platform Intervensi Dini dan Kesehatan Preventif Personal* (*Personal Preventive Health & Early Intervention Platform*).

Tujuan fundamental dari platform PRONOIA adalah memberdayakan pengguna melalui 8 kapabilitas sistem terpadu:
1. **Pengumpulan Data Gaya Hidup & Biometrik**: Menghimpun data aktivitas fisik, durasi tidur, asupan nutrisi harian, dan metrik kesehatan rutin secara aman.
2. **Pemahaman Pola Historis**: Menganalisis riwayat longitudinal untuk memahami kebiasaan unik masing-masing individu.
3. **Penyusunan Garis Pangkal Perilaku Personal (*Personal Behavioral Baseline*)**: Membangun ambang batas rujukan yang dipersonalisasi, bukan menggunakan skor generik statis.
4. **Deteksi Perubahan Perilaku Bermakna**: Mengidentifikasi anomali, deviasi tren negatif, atau pergeseran kebiasaan sebelum berkembang menjadi risiko klinis.
5. **Penjelasan Berbasis Bukti Eksplisit (*Evidence-Based Explanation*)**: Menguraikan akar penyebab sinyal deviasi menggunakan data faktual yang transparan tanpa konsep *black box*.
6. **Rekomendasi Tindakan Preventif Praktis**: Merumuskan saran perubahan gaya hidup mikro (*micro-habits*) yang realistis dan dapat dicapai pengguna.
7. **Pelacakan Intervensi & Evaluasi Progres**: Mengukur kepatuhan terhadap rencana aksi serta memantau dampak intervensi secara terukur.
8. **Eskalasi Dukungan Manusia Beretika**: Menghubungkan pengguna dengan instruktur kebugaran berlisensi atau fasilitas medis ketika batas risiko terlampaui.

### Siklus Hidup Produk Inti (*Core Product Loop*)

Setiap modul, alur kerja, dan pengontrol yang dibangun dalam sistem ini wajib menopang siklus hidup preventif berikut:

```text
+-----------+     +--------------+     +-------------------+     +-------------+
|  Observe  | --> |  Understand  | --> |   Detect Change   | --> |   Explain   |
| (Pantau)  |     | (Pahami Tren)|     | (Deteksi Anomali) |     | (Beri Bukti)|
+-----------+     +--------------+     +-------------------+     +-------------+
      ^                                                                 |
      |                                                                 v
+-----------+     +--------------+     +-------------------+     +-------------+
|  Improve  | <-- |   Escalate   | <-- |      Monitor      | <-- |  Intervene  |
| (Evaluasi)|     |  (Eskalasi)  |     | (Pantau Progres)  |     | (Aksi Nyata)|
+-----------+     +--------------+     +-------------------+     +-------------+
```

PRONOIA dirancang sebagai sistem pendamping kebiasaan hidup sehat yang berakar pada kedaulatan data pengguna, kejelasan ilmiah, dan transparansi teknologi.

---

## 2. Sasaran Rekayasa Utama (Primary Engineering Objective)

Ketika memodifikasi, memperluas, atau merefaktor kode sumber dalam repositori ini, seluruh teknisi dan agen koding diwajibkan mempertahankan arsitektur hierarki preventif berikut secara murni:

```text
[ Profil Pengguna (User Profile) ]
               │
               ▼
[ Data Kesehatan Mentah (Health Data) ]
               │
               ▼
[ Garis Pangkal Personal (Personal Baseline) ]
               │
               ▼
[ Deteksi Perubahan Perilaku (Behavioral Change Detection) ]
               │
               ▼
[ Wawasan Berbasis Bukti (Explainable Insight) ]
               │
               ▼
[ Rencana Intervensi Personal (Personalized Intervention) ]
               │
               ▼
[ Pemantauan Progres Kepatuhan (Progress Monitoring) ]
               │
               ▼
[ Dukungan Manusia & Eskalasi (Human Support / Escalation) ]
               │
               ▼
[ Evaluasi Hasil Kesehatan (Health Outcome) ]
```

### Kedaulatan Health Behavior Engine

1. **Pembeda Utama (*Core Differentiator*)**: Keunggulan hakiki dari PRONOIA terletak pada **Health Behavior Engine (HBE)** yang berjalan secara deterministik pada lapisan peladen backend.
2. **Fitur Pendukung (*Supporting Capabilities*)**: Modul kecerdasan buatan (*AI Assistant*), pemindai label nutrisi (*OCR Scanner*), gamifikasi tantangan, forum komunitas, dan langganan keanggotaan (*Membership*) hanyalah kapabilitas pendukung yang berfungsi melayani siklus preventif.
3. **Larangan Degradasi Arsitektur**: Dilarang keras membiarkan fitur-fitur sekunder (seperti animasi antarmuka, perolehan lencana poin, atau percakapan obrolan AI) mengaburkan, menggantikan, atau melemahkan akurasi pipa data *Health Behavior Engine*.

---

## 3. Prinsip Inti Produk (Core Product Principles)

Seluruh keputusan implementasi rekayasa perangkat lunak dalam repositori PRONOIA wajib berpijak teguh pada lima pilar filosofis produk:

### 3.1 Bersifat Preventif, Bukan Diagnostik (Preventive, Not Diagnostic)

Sistem PRONOIA beroperasi pada ranah gaya hidup dan pencegahan primer. Batasan wewenang sistem diatur secara tegas:

* **Tindakan yang Diizinkan Sistem**:
  * Mengidentifikasi pergeseran pola perilaku dan rutinitas harian pengguna.
  * Menyajikan visualisasi tren historis (misal: penurunan rata-rata durasi tidur mingguan).
  * Membandingkan kondisi biometrik saat ini dengan garis pangkal personal masa lalu.
  * Memberikan materi edukasi kesehatan preventif berbasis literatur medis terakreditasi.
  * Menyarankan tindakan kebiasaan mikro (*micro-habits*) yang aman dan praktis.
  * Memfasilitasi konsultasi langsung dengan instruktur atau tenaga kesehatan profesional.
* **Larangan Mutlak bagi Sistem**:
  * Mengeluarkan vonis diagnosis penyakit klinis tertentu (misal: menyatakan *"Anda menderita diabetes tipe 2"*).
  * Mengklaim kepastian medis definitif atas suatu gejala fisik.
  * Memberikan resep obat-obatan keras, antibiotik, atau dosis terapi farmakologis.
  * Menentukan tingkat keparahan triase gawat darurat medis secara sepihak melalui kalkulasi AI.
  * Menyajikan keluaran probabilitas model AI sebagai kebenaran klinis yang mutlak.

---

### 3.2 Garis Pangkal Pribadi di Atas Skor Generik (Personal Baseline Over Generic Scoring)

Tubuh dan ritme biologis setiap manusia bersifat unik. Dalam setiap kalkulasi analitik, sistem mengutamakan:

```text
[ Evaluasi Longitudinal Terhadap Garis Pangkal Pribadi Pengguna Sendiri ]
                                  LEBIH DIUTAMAKAN DARIPADA
[ Skor Angka Arbitrer Generik Berdasarkan Populasi Umum yang Seragam ]
```

* **Personalisasi Kontekstual**: Skor Kesiapan (*Readiness Score*) dan indikator kebugaran wajib dikalibrasi terhadap data historis individu minimal 7 hingga 30 hari terakhir.
* **Anti-Generalisasi Menyesatkan**: Penurunan durasi tidur 1 jam pada atlet yang terbiasa tidur 9 jam memiliki makna fisiologis yang sangat berbeda dibandingkan pada pekerja malam yang memiliki baseline 6 jam. Sistem wajib menghargai disparitas baseline ini.

---

### 3.3 Penjelasan Berbasis Bukti secara Baku (Explainability by Default)

Sistem menolak prinsip *black box* dalam setiap bentuk visualisasi maupun rekomendasi kesehatan:

* **Keterlacakan Rekomendasi (*Traceability*)**: Setiap kali sistem menyajikan sinyal perubahan perilaku atau rencana intervensi, sistem wajib menyertakan bukti pendukung konkret (*supporting evidence*).
* **Komponen Bukti Wajib**:
  1. Parameter metrik yang mengalami deviasi (misal: rata-rata langkah harian).
  2. Nilai garis pangkal rujukan (*baseline reference value*).
  3. Rentang waktu pengamatan terjadinya deviasi (*observation window*).
  4. Dampak fungsional yang melatarbelakangi rekomendasi intervensi.

---

### 3.4 Keterlibatan Manusia dalam Lingkaran Keputusan (Human-in-the-Loop)

Teknologi cerdas berfungsi mendampingi dan memperkuat hubungan antarmanusia, bukan menggantikannya:

* **Batas Kewenangan Otomasi**: Ketika algoritma mendeteksi anomali yang berpotensi memiliki implikasi kesehatan signifikan, sistem tidak boleh mengambil tindakan sepihak yang berisiko.
* **Jembatan Konsultasi**: Sistem wajib menyediakan alur yang mulus untuk menghubungkan pengguna dengan instruktur kebugaran terverifikasi atau menyarankan pemeriksaan lanjutan ke fasilitas kesehatan berizin.

---

### 3.5 Mengutamakan Keselamatan di Atas Kenyamanan (Safety Over Convenience)

Ketika terjadi benturan antara kemudahan interaksi pengguna dengan keselamatan data atau privasi kesehatan, prinsip keselamatan mutlak dimenangkan:

* **Kehati-hatian Algoritma**: Jika data sensor meragukan, tidak lengkap, atau mengandung artefak kebisingan yang ekstrem, sistem wajib memilih opsi *"Data Belum Memadai"* daripada memaksakan keluaran analitik yang menyesatkan.
* **Protokol Kegagalan Anggun (*Graceful Failure*)**: Antarmuka pengguna harus memberikan penegasan yang jelas mengenai keterbatasan data tanpa pernah mengaburkan risiko bahaya.

---

## 4. Struktur Repositori Proyek (Repository Structure)

Berikut adalah struktur kanonikal repositori proyek PRONOIA yang menjadi acuan organisasi berkas:

```text
c:\laragon\www\kadar/
├── AGENTS.md                                   <-- Master Orchestrator Instruksi Agen Koding
├── README.md                                    <-- Ringkasan Repositori & Petunjuk Instalasi
│
├── .agents/                                     <-- Konfigurasi & Direktif Penyelarasan Agen
│   ├── agents/                                  <-- Persona & Batasan Spesialisasi Agen Koding
│   │   ├── health-architect/agent.md            <-- Spesialis Arsitektur Sistem & Domain HBE
│   │   ├── health-safety/agent.md               <-- Spesialis Keselamatan Medis, Privasi, & AI
│   │   └── laravel-engineer/agent.md            <-- Spesialis Pola Idiomatis & Performa Laravel
│   └── rules/                                   <-- 10 Berkas Aturan Kanonikal Repositori
│       ├── 00-project-context.md                <-- Konteks Proyek & Prinsip Rekayasa Inti
│       ├── 01-architecture.md                   <-- Arsitektur Sistem & Batasan Komponen
│       ├── 02-security.md                       <-- Standar Keamanan, RBAC, & Kepatuhan UU PDP
│       ├── 03-health-safety.md                  <-- Protokol Keselamatan Medis & Pagar Pembatas AI
│       ├── 04-frontend.md                       <-- Desain Antarmuka, Standar Alpine.js/Blade
│       ├── 05-backend.md                        <-- Arsitektur Layanan Laravel & Bisnis Logika
│       ├── 06-database.md                       <-- Integritas Skema Relasional, Transaksi DB
│       ├── 07-api.md                            <-- Desain Kontrak RESTful API & Idempotensi
│       ├── 08-testing.md                        <-- Piramida Pengujian & Validasi Keselamatan
│       └── 09-pwa.md                            <-- Service Worker, Penyimpanan Luring, & Push
│
├── docs/                                        <-- Dokumentasi Kanonikal Spesifikasi Produk
│   ├── 01-product-vision.md s.d. 15-runbook.md  <-- 15 Spesifikasi Fungsional Produk
│   └── rules/                                   <-- Salinan Cermin Aturan Rekayasa
│
├── app/                                         <-- Lapisan Aplikasi Backend Laravel
│   ├── Http/
│   │   ├── Controllers/                         <-- Pengontrol Web & RESTful API Terotentikasi
│   │   ├── Middleware/                          <-- Otorisasi, Rate Limiting, & Context Guard
│   │   └── Requests/                            <-- Form Request Validation Berbasis Formatter
│   ├── Models/                                  <-- Eloquent Entities dengan Casting Ketat
│   ├── Policies/                                <-- Kebijakan Otorisasi Server-Authoritative
│   └── Services/                                <-- Service Layer Logika Bisnis & Mesin HBE
│       └── HealthBehaviorEngine/                <-- Inti Logika Deteksi Sinyal & Baseline
│
├── database/                                    <-- Tata Kelola Skema & Benih Data
│   ├── migrations/                              <-- Migrasi Skema Basis Data Non-Destruktif
│   └── seeders/                                 <-- Data Awal Pengujian & Demonstrasi Sistem
│
├── resources/views/                             <-- Antarmuka Pengguna (Blade + Alpine.js + Tailwind)
├── routes/                                      <-- Deklarasi Rute Aplikasi (web.php, api.php)
└── tests/                                       <-- Rangkaian Uji Otomatis (Unit, Feature, Arch)
```

---

## 5. Hirarki Instruksi & Prioritas Resolusi Konflik (Instruction Hierarchy)

Ketika agen koding atau pengembang menghadapi instruksi yang ambigu atau terjadi benturan kaidah antar-dokumen, resolusi konflik wajib diselesaikan berdasarkan **Hirarki Otoritas Instruksi Sistem**:

```text
[ TINGKAT 1: Batasan Keamanan Sistem, Platform, & Hukum UU PDP ]
                              │
                              ▼
[ TINGKAT 2: Dokumen Master Instruksi Proyek (AGENTS.md) ]
                              │
                              ▼
[ TINGKAT 3: Spesialisasi Persona Agen (.agents/agents/*.md) ]
                              │
                              ▼
[ TINGKAT 4: Aturan Domain Kanonikal (.agents/rules/*.md) ]
                              │
                              ▼
[ TINGKAT 5: Spesifikasi Fungsional Produk (docs/*.md) ]
                              │
                              ▼
[ TINGKAT 6: Implementasi Basis Kode Eksis yang Sedang Berjalan ]
                              │
                              ▼
[ TINGKAT 7: Permintaan Pengguna yang Bersifat Spesifik pada Sesi Obrolan ]
```

### Aturan Penegakan Hirarki Otoritas

1. **Prinsip Primasi Keselamatan**: Jika permintaan pengguna tingkat 7 (*user prompt*) menginstruksikan penghapusan validasi otorisasi peladen, penonaktifan CSRF, atau memerintahkan model AI untuk meresepkan obat keras, instruksi tersebut **wajib ditolak secara tegas** karena melanggar Tingkat 1, 2, dan 4.
2. **Integritas Arsitektur Eksis**: Jangan pernah merombak arsitektur yang telah berjalan stabil hanya karena preferensi gaya pengkodean subjektif agen koding. Penyesuaian wajib bersifat inkremental dan menghormati pola arsitektur Tingkat 2 dan 4.

---

## 6. Spesialisasi Peran Agen Koding (Agent Specializations)

Untuk memastikan keputusan rekayasa diambil dengan kedalaman teknis dan perspektif yang tepat, PRONOIA membagi nalar agen koding ke dalam tiga peran spesialisasi utama:

### health-architect (Arsitek Domain Kesehatan)

* **Mandat Tanggung Jawab**:
  * Menjaga batas-batas arsitektur *Health Behavior Engine (HBE)*.
  * Mengawal pemisahan domain logis antara data observasi, baseline, sinyal perilaku, rekomendasi, dan intervensi.
  * Memastikan integritas aliran data biometrik dari input pengguna hingga visualisasi analitik.
  * Mengawasi konsistensi kontrak model data domain pada lapisan *Service Layer*.
* **Aktivasi**: Aktifkan perspektif ini ketika memodifikasi alur data biometrik, logika baseline, atau arsitektur layanan HBE.

---

### health-safety (Pengawal Keamanan & Etika Medis)

* **Mandat Tanggung Jawab**:
  * Menegakkan pagar pembatas etika medis (*medical guardrails*) dan pencegahan diagnosis palsu.
  * Mengawal alur gawat darurat (penyediaan rute bebas hambatan ke tombol 119 dan fasilitas IGD terdekat).
  * Mengamankan interaksi AI generatif agar tidak berhalusinasi atau memberikan rekomendasi berbahaya.
  * Menjamin kedaulatan pengguna (*user agency*) dan perlindungan privasi data rekam kesehatan sensitif.
* **Aktivasi**: Aktifkan perspektif ini setiap kali menangani antarmuka rekomendasi kesehatan, respons AI, atau modul darurat.

---

### laravel-engineer (Teknisi Rekayasa Backend Laravel)

* **Mandat Tanggung Jawab**:
  * Menegakkan konvensi arsitektur idiomatik Laravel 11.x dan PHP 8.2+.
  * Mengoptimalkan efisiensi kueri Eloquent ORM (pencegahan masalah *N+1 query* melalui *eager loading* selektif).
  * Mengawal integritas transaksi basis data (*ACID transactions*) pada operasi multi-tabel.
  * Memastikan keamanan pengontrol, otorisasi *Form Request*, serta perancangan kontrak RESTful API yang konsisten.
* **Aktivasi**: Aktifkan perspektif ini saat menulis pengontrol, model Eloquent, migrasi basis data, pengujian otomatis, atau rute API.

---

## 7. Matriks Aktivasi Aturan (Rule Activation Matrix)

Aturan rekayasa PRONOIA dibagi menjadi dua kategori operasional: **Aturan Selalu Aktif (*Always On*)** dan **Aturan Kontekstual Berbasis Tugas (*Model Decision*)**.

### Aturan Selalu Aktif (Always On Rules)

Empat dokumen aturan berikut merupakan fondasi dasar sistem yang **wajib dimuat dan dipatuhi pada setiap tugas rekayasa** tanpa terkecuali:

```text
+-------------------------+-------------------------------------------------------------------------+
| Berkas Aturan           | Fokus Mandatori Utama                                                   |
+-------------------------+-------------------------------------------------------------------------+
| 00-project-context.md   | Konteks sistem, 5 prinsip produk, struktur repositori, etika preventif. |
| 01-architecture.md      | Batasan lapisan sistem, pemisahan dependensi, Service Layer, anti-leak.  |
| 02-security.md          | Otorisasi peladen, RBAC, proteksi CSRF/XSS, enkripsi data, UU PDP.     |
| 03-health-safety.md     | Pagar pembatas medis, rute darurat 119/IGD, mitigasi halusinasi AI.     |
+-------------------------+-------------------------------------------------------------------------+
```

---

### Aturan Berbasis Konteks Tugas (Model Decision Rules)

Muat berkas aturan spesifik berikut sesuai dengan domain tugas teknis yang sedang dikerjakan:

```text
                    +--------------------------------------------------+
                    | APAKAH TUGAS ANDA MELIBATKAN DOMAIN TEKNIS INI?  |
                    +--------------------------------------------------+
                             │           │          │          │
            ┌────────────────┘           │          │          └────────────────┐
            ▼                            ▼          ▼                           ▼
    [ Antarmuka Web ]             [ Logika Backend/API ] [ Basis Data ]        [ PWA / Luring ]
            │                            │          │          │                │
            ▼                            ▼          ▼          ▼                ▼
     04-frontend.md               05-backend.md  07-api.md 06-database.md    09-pwa.md
                                         │
                                         ▼
                            [ Seluruh Tugas Rekayasa ]
                                         │
                                         ▼
                                   08-testing.md
```

* **Tugas Antarmuka Pengguna (Frontend Task)**: Wajib mengaktifkan `04-frontend.md`.
* **Tugas Logika Bisnis & API (Backend/API Task)**: Wajib mengaktifkan `05-backend.md` dan `07-api.md`.
* **Tugas Skema & Migrasi (Database Task)**: Wajib mengaktifkan `06-database.md`.
* **Tugas Verifikasi & Mutu (Testing Task)**: Wajib mengaktifkan `08-testing.md`.
* **Tugas Service Worker & Dukungan Luring (PWA Task)**: Wajib mengaktifkan `09-pwa.md`.

---

## 8. Peta Dokumentasi Kanonikal Sistem (Documentation Map)

Dokumentasi kanonikal merupakan spesifikasi formal yang mendefinisikan perilaku dan batas sistem PRONOIA. Seluruh implementasi kode wajib merujuk pada pemetaan berikut:

| Domain Fungsional | Berkas Sumber Spesifikasi | Deskripsi Cakupan Resmi |
| :--- | :--- | :--- |
| **Visi & Posisi Produk** | `docs/01-product-vision.md` | Visi jangka panjang, proposisi nilai preventif, dan kriteria keberhasilan produk. |
| **Pengguna & Permasalahan** | `docs/02-problem-and-users.md` | Karakteristik persona (Member, Instructor, Admin) dan analisis masalah kesehatan. |
| **Ruang Lingkup Fitur** | `docs/03-features.md` | Daftar spesifikasi fitur fungsional MVP dan batasan cakupan sistem. |
| **Alur Perjalanan Pengguna** | `docs/04-user-journeys.md` | Alur navigasi antarmuka untuk onboarding, pencatatan metrik, dan intervensi. |
| **Mesin Perilaku Kesehatan** | `docs/05-health-behavior-engine.md` | Formula baseline personal, algoritma deteksi deviasi, dan matriks sinyal perilaku. |
| **Asisten Cerdas AI** | `docs/06-ai-assistant.md` | Arsitektur prompt, penegakan pagar pembatas medis, dan batasan nalar AI. |
| **Portal Instruktur & Admin** | `docs/07-instructor-admin.md` | Alur kerja verifikasi data, sesi konsultasi ahli, dan manajemen keanggotaan. |
| **Model & Skema Data** | `docs/08-data-model.md` | Diagram relasi entitas (ERD), kamus data terstruktur, dan aturan indeks basis data. |
| **Kontrak Antarmuka API** | `docs/09-api-contracts.md` | Spesifikasi payload JSON RESTful API, header otentikasi, dan format kode galat. |
| **Arsitektur Sistem & Komponen**| `docs/10-system-architecture.md` | Topologi infrastruktur, pola desain lapisan aplikasi, dan integrasi antarkomponen. |
| **Standar Keamanan & Kepatuhan**| `docs/11-security-and-privacy.md` | Protokol enkripsi at-rest/in-transit, audit trail, dan kepatuhan UU PDP No. 27/2022. |
| **Buku Panduan Operasional** | `docs/15-runbook.md` | Prosedur peluncuran produksi, strategi mitigasi insiden, dan pemulihan bencana. |

---

## 9. Daftar Periksa Sebelum Melakukan Perubahan (Before Making Changes)

Sebelum menuliskan atau memodifikasi satu baris kode pun dalam repositori, agen koding dan teknisi wajib menjalankan **8 Langkah Pemeriksaan Pra-Penyuntingan**:

1. **Inspeksi Implementasi Eksis**: Telaah pengontrol, model, atau komponen antarmuka yang telah berjalan untuk memahami pola yang sudah terpasang.
2. **Identifikasi Domain Terdampak**: Tentukan secara akurat apakah perubahan menyentuh domain metrik, otorisasi, kontrak API, atau antarmuka publik.
3. **Baca Aturan Terkait**: Muat dan telaah aturan kanonikal yang relevan dari repositori `.agents/rules/*.md`.
4. **Pahami Batasan Keamanan & Otorisasi**: Pastikan rencana perubahan tidak melonggarkan kebijakan *server-side authorization* atau mengekspos data pribadi.
5. **Analisis Implikasi Keselamatan Medis**: Evaluasi apakah perubahan berpotensi memicu klaim diagnostik palsu atau memblokir akses rute kedaruratan.
6. **Pelajari Rangkaian Pengujian yang Ada**: Jalankan uji otomatis terkait untuk memastikan pemahaman terhadap *baseline* perilaku yang diharapkan.
7. **Patuhi Batasan Kontrak**: Jangan pernah mengubah nama kolom basis data atau kunci respons JSON publik tanpa strategi migrasi terencana.
8. **Hindari Perombakan Berlebih (*No Unnecessary Refactoring*)**: Jangan merombak arsitektur fungsional yang sudah stabil hanya demi preferensi gaya koding teoritis.

---

## 10. Klasifikasi Tipe Perubahan Kode (Change Classification)

Setiap perubahan kode dalam sistem PRONOIA wajib diklasifikasikan ke dalam salah satu dari empat kategori untuk menentukan tingkat ketelitian mitigasi risiko:

### Tipe A — Perubahan Lokal Terisolasi (Type A: Local Change)

* **Karakteristik**: Perubahan kosmetik antarmuka (copy teks, perbaikan margin CSS, pembersihan komentar kode, perbaikan typo terisolasi).
* **Prosedur Verifikasi**: Uji visual pada peramban dan pastikan tidak ada regresi tampilan pada perangkat seluler.

---

### Tipe B — Perubahan Logika Domain (Type B: Domain Change)

* **Karakteristik**: Modifikasi rumus perhitungan baseline personal, kriteria pemicu sinyal perilaku, alur siklus hidup rencana intervensi, atau aturan verifikasi data insturktur.
* **Prosedur Verifikasi**: Wajib melibatkan tinjauan ganda terhadap integritas *Health Behavior Engine*, verifikasi kepatuhan terhadap pagar pembatas medis, dan penambahan uji unit komprehensif.

---

### Tipe C — Perubahan Kontrak & Skema (Type C: Contract Change)

* **Karakteristik**: Modifikasi struktur skema migrasi tabel basis data, penambahan/penghapusan field pada respons JSON API, atau perubahan tanda tangan metode pada *Service Layer*.
* **Prosedur Verifikasi**: Wajib memastikan kompatibilitas mundur (*backward compatibility*), sinkronisasi dokumentasi API, dan penyesuaian pada seluruh konsumen endpoint (termasuk klien PWA).

---

### Tipe D — Perubahan Lintas-Domain Sistem (Type D: Cross-Cutting Change)

* **Karakteristik**: Modifikasi sistem otentikasi global, konfigurasi middleware keamanan, perubahan tata kelola sesi, atau perombakan arsitektur PWA Service Worker.
* **Prosedur Verifikasi**: Memerlukan evaluasi keamanan mendalam, verifikasi matriks otorisasi lintas peran (Member, Instructor, Admin), serta eksekusi pengujian regresi menyeluruh (*Full Regression Suite*).

---

## 11. Batasan & Garis Pemisah Domain Inti (Core Domain Boundaries)

Untuk menjaga modularitas dan mencegah keterikatan erat (*high coupling*) yang berbahaya, sistem PRONOIA menegakkan batas-batas domain yang tidak boleh dicampuradukkan:

```text
[ Data Biometrik Mentah ]  !=  [ Garis Pangkal Personal ]  !=  [ Sinyal Perilaku ]
            │                                                      │
            ▼                                                      ▼
[ Wawasan Bukti Eksplisit ] != [ Rekomendasi Tindakan ]     !=  [ Intervensi Aktif ]
```

### Garis Demarkasi Tambahan yang Wajib Dijaga

1. **Respons AI vs Keputusan Aplikasi**: Respons naratif AI adalah representasi antarmuka, sedangkan keputusan sistem (status intervensi, kuota, poin) diputuskan mutlak oleh logika aplikasi peladen.
2. **Keluaran Pemindai vs Rekam Medis Otoritatif**: Ekstraksi teks nutrisi dari kamera hanyalah draf masukan sementara yang wajib diverifikasi pengguna sebelum diakui sebagai rekam asupan resmi.
3. **Poin Gamifikasi vs Status Fisiologis**: Poin atau lencana kepatuhan tidak boleh disamakan atau ditukar sebagai indikator derajat keparahan klinis kesehatan pengguna.
4. **Tingkat Keanggotaan vs Prioritas Kedaruratan**: Akses fitur premium tidak pernah boleh mempengaruhi kecepatan atau ketersediaan tombol panggilan darurat 119 dan navigasi IGD.

---

## 12. Kaidah Sumber Kebenaran Otoritatif (Source of Truth Rules)

Untuk seluruh keputusan yang berdampak pada keselamatan pengguna, integritas data klinis, dan hak akses operasional, **Sumber Kebenaran Tunggal (*Single Source of Truth*)** didefinisikan secara tegas:

```text
+-----------------------------------------------------------------------------------------+
|                              SUMBER KEBENARAN OTORITATIF:                               |
|        Logika Bisnis Peladen Backend  +  Status Basis Data  +  Kebijakan Eksplisit      |
+-----------------------------------------------------------------------------------------+
```

### Ranah Larangan Mutlak Otoritas AI

Model kecerdasan buatan (*AI Model*) **dilarang keras** dijadikan sebagai sumber kebenaran untuk:
* Penentuan izin akses pengguna, penetapan peran (*roles*), dan kebijakan otorisasi (RBAC).
* Validasi status langganan keanggotaan (*membership entitlement*) dan kuota konsultasi.
* Penilaian derajat kegawatdaruratan medis dan pemilihan jalur navigasi pertolongan pertama.
* Kepemilikan dan hak penyuntingan atas data rekam kesehatan personal.
* Perhitungan matematis garis pangkal personal (*personal baseline*) dan deviasi metrik.
* Pencatatan transaksi keuangan, poin loyalitas, serta riwayat audit sistem.

---

## 13. Pembagian Tanggung Jawab Deterministik vs Kecerdasan Buatan (Deterministic vs AI Responsibilities)

Dalam merancang fitur, pengembang wajib memisahkan secara ketat mana tugas yang diselesaikan dengan komputasi deterministik peladen dan mana yang didelegasikan ke model AI:

| Ranah Komputasi Deterministik Peladen (Wajib PHP/DB) | Ranah Pemrosesan AI Generatif (Opsional & Pendamping) |
| :--- | :--- |
| Validasi tipe data, format angka, dan rentang biometrik | Penerjemahan data teknis ke dalam bahasa percakapan hangat |
| Penegakan otorisasi peran (*Policy & Form Request*) | Penyusunan narasi penjelasan kontekstual berbasis bukti |
| Kalkulasi rata-rata bergerak, median, dan baseline personal | Penyampaian motivasi dan tips kebiasaan mikro personal |
| Evaluasi ambang batas deteksi sinyal perubahan tren | Rangkuman intisari riwayat kebugaran mingguan pengguna |
| Verifikasi jadwal konsultasi instruktur tanpa bentrok waktu | Bantuan navigasi pencarian fitur aplikasi melalui percakapan |
| Eksekusi tombol darurat 119 dan pencarian koordinat IGD | Dialog edukasi gizi preventif umum yang bersahabat |

### Alur Kerja Data Deterministik Menuju AI

```text
[ Data Biometrik Terstruktur ]
               │
               ▼
[ Mesin Peladen Backend (Deterministik) ] ──> Menghitung Deviasi & Menetapkan Batas Keamanan
               │
               ▼
[ Prompt Builder dengan Konteks Eksplisit ] ──> Menginjeksikan Metrik & Pagar Pembatas
               │
               ▼
[ Model Bahasa AI (LLM) ] ──────────────────> Menghasilkan Bahasa Manusia yang Empatik
               │
               ▼
[ Sanitasi & Validasi Respons di Peladen ] ──> Memastikan Bebas Klaim Medis & Halusinasi
               │
               ▼
[ Tampilan Antarmuka Pengguna ]
```

---

## 14. Prioritas Arsitektur Health Behavior Engine (Health Behavior Engine Priority)

*Health Behavior Engine (HBE)* merupakan jantung komputasi dari seluruh platform PRONOIA. Alur pemrosesan data perilaku wajib mengikuti 12 tahapan sekuensial berikut:

```text
1. Data Kesehatan Mentah (Raw Health Data Ingestion)
   │
2. Normalisasi Format & Satuan Metrik (Metric Normalization)
   │
3. Validasi Integritas & Kualitas Data (Data Quality Check)
   │
4. Pemutakhiran Garis Pangkal Personal (Personal Baseline Calibration)
   │
5. Ekstraksi Fitur Tren Perilaku (Behavioral Feature Extraction)
   │
6. Deteksi Pergeseran & Anomali Tren (Trend Shift Detection)
   │
7. Kualifikasi Derajat Signifikansi Perubahan (Change Qualification)
   │
8. Penerbitan Sinyal Perilaku Terstandar (Behavior Signal Generation)
   │
9. Pengaitan Bukti Data Eksplisit (Evidence Attachment)
   │
10. Formulasi Wawasan Kesehatan Bermakna (Insight Formulation)
   │
11. Penyusunan Rencana Rekomendasi Mikro (Actionable Recommendation)
   │
12. Pemantauan Kepatuhan & Evaluasi Dampak (Intervention & Outcome Evaluation)
```

Setiap penyuntingan kode pada satu tahap dalam pipa data di atas wajib mempertimbangkan efek riam (*downstream cascade*) pada tahapan-tahapan berikutnya.

---

## 15. Standar Kualitas & Kredibilitas Data (Data Quality Rules)

Ketersediaan data dalam basis data tidak secara otomatis membuktikan bahwa data tersebut valid atau layak dijadikan bukti analitik. Sistem wajib menerapkan filter kualitas data yang ketat:

### Matriks Pengecekan Kualitas Data Biometrik

* **Nilai Hilang (*Missing Values*)**: Tangani secara elegan tanpa melakukan imputasi palsu yang mengubah profil kesehatan pengguna.
* **Duplikasi Catatan (*Duplicate Entries*)**: Cegah penyimpanan ganda melalui validasi stempel waktu dan kunci idempotensi masukan.
* **Nilai Ekstrem & Anomali (*Outliers*)**: Tolak atau tandai nilai fisiologis yang mustahil secara biologis (misal: denyut jantung 400 bpm atau tidur 28 jam dalam sehari).
* **Inkonsistensi Satuan (*Unit Mismatch*)**: Pastikan seluruh data biometrik dikonversi ke satuan standar internasional sebelum diproses (misal: kilogram, centimeter, jam, kkal).
* **Keabsahan Stempel Waktu (*Timestamp Validation*)**: Tolak pencatatan data dengan stempel waktu masa depan (*future timestamps*).
* **Kredibilitas Sumber (*Source Reliability*)**: Bedakan pembobotan antara input manual pengguna dengan data telemetri sensor terverifikasi.
* **Jendela Pengamatan Cukup (*Observation Window*)**: Jangan menerbitkan sinyal tren jangka panjang bila data observasi baru terkumpul kurang dari 7 hari.

### Prinsip Utama Pembuktian Data

```text
+-----------------------------------------------------------------------------------------+
|                  BUKTI BELUM CUKUP JAUH LEBIH BAIK DAN AMAN DARIPADA                    |
|                        PRESISI PALSU YANG MENYESATKAN PENGGUNA                          |
+-----------------------------------------------------------------------------------------+
```

Jika data tidak memadai untuk menarik kesimpulan analitik yang kredibel, sistem wajib menyajikan status *"Memerlukan Pengamatan Lebih Lanjut"* daripada menampilkan persentase probabilitas yang menyesatkan.

---

## 16. Kaidah Otorisasi & Kontrol Akses Berbasis Peran (Authorization Rules)

Setiap sumber daya sensitif dalam sistem PRONOIA wajib dilindungi oleh dua lapis pertahanan tak terpisahkan:

```text
+-----------------------------------------------------------------------------------------+
|                  AUTENTIKASI (Siapa Anda?)  +  OTORISASI (Boleh Akses Apa?)             |
+-----------------------------------------------------------------------------------------+
```

### Prinsip Penegakan Kontrol Akses

1. **Kedaulatan Otorisasi Sisi Peladen (*Server-Authoritative Enforcement*)**:
   * Otorisasi wajib dieksekusi secara ketat pada lapisan backend menggunakan Laravel Policies (`Gate::authorize()` atau `$this->authorize()`).
   * Pemeriksaan kondisi antarmuka di sisi klien (seperti `v-if` atau `@can` pada template Blade) hanyalah elemen estetika UX untuk menyembunyikan tombol, **bukan benteng keamanan**.
2. **Isolasi Kepemilikan Data (*Multi-Tenant Data Scoping*)**:
   * Pengguna dengan peran *Member* hanya berhak membaca dan mengubah data biometrik miliknya sendiri (`user_id === auth()->id()`).
   * Upaya mengakses ID rekam medis atau rencana intervensi milik pengguna lain wajib menghasilkan respons HTTP `403 Forbidden` atau `404 Not Found`.
3. **Pemisahan Peran Tegas (RBAC)**:
   * Hak akses dikelompokkan ke dalam tiga peran formal: `Member`, `Instructor`, dan `Admin`.
   * Peran *Instructor* hanya dapat melihat data anggota yang secara eksplisit telah memesan sesi konsultasi dengannya.
   * Peran *Admin* dilarang melihat data biometrik privat anggota tanpa dasar audit investigasi yang tercatat resmi.

---

## 17. Kaidah Keamanan Sistem & Sanitasi Data (Security Rules)

Seluruh data kesehatan dan biometrik wajib diperlakukan sebagai **Data Pribadi yang Bersifat Spesifik/Sensitif** dengan standar keamanan tertinggi:

### Kaidah Keamanan Mandatori Repositori

* **Penyensoran Log Peladen (*Log Sanitization*)**: Dilarang keras mencatat informasi kesehatan pribadi (*Personal Health Information / PHI*), riwayat penyakit, atau kredensial otentikasi ke dalam berkas log aplikasi (`storage/logs/laravel.log`). Gunakan penyamaran (*masking*) atau catat hanya entitas ID tanpa muatan data biometrik.
* **Larangan Kebocoran Rahasia di Klien (*No Frontend Secrets*)**: Jangan pernah menaruh API key pihak ketiga, token rahasia webhook, atau kredensial peladen di dalam skrip JavaScript, template Blade, atau berkas manifest PWA. Seluruh panggilan eksternal wajib melalui peladen backend.
* **Penolakan Validasi Klien Semata (*Never Trust Client Input*)**: Seluruh data yang dikirimkan melalui permintaan HTTP wajib divalidasi ulang secara menyeluruh di sisi peladen menggunakan Laravel Form Request.
* **Perlindungan Pemalsuan Permintaan Lintas Situs (*CSRF Protection*)**: Seluruh formulir web wajib menyertakan token `@csrf`. Rute API terotentikasi wajib menggunakan Laravel Sanctum dengan perlindungan token sesi terenkripsi.

---

## 18. Kaidah Privasi & Kepatuhan UU PDP (Privacy Rules)

Repositori ini tunduk patuh pada mandat **Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022)** Republik Indonesia. Setiap agen koding wajib menegakkan 5 pilar privasi:

```text
[ Privacy by Default ]   -->   Privasi terpasang ketat secara baku tanpa perlu aksi pengguna
[ Least Privilege ]      -->   Akses hanya diberikan seminimal mungkin sesuai kebutuhan tugas
[ Data Minimization ]    -->   Hanya menghimpun metrik biometrik yang benar-benar esensial
[ Purpose Limitation ]   -->   Data kesehatan tidak boleh digunakan untuk tujuan selain preventif
[ Auditability ]         -->   Setiap akses dan modifikasi data sensitif meninggalkan jejak audit
```

### Hak Subjek Data & Retensi

* **Persetujuan Eksplisit (*Explicit Consent*)**: Fitur pelacakan data dan pemrosesan analisis AI wajib memiliki catatan persetujuan digital yang tersimpan dalam tabel `user_consents`.
* **Hak Portabilitas & Penghapusan (*Right to Erasure*)**: Sistem wajib menyediakan mekanisme bagi pengguna untuk mengekspor riwayat kesehatannya atau mengajukan penghapusan akun beserta seluruh data biometrik secara permanen (*anonymization / hard delete*).

---

## 19. Kaidah Keselamatan & Pagar Pembatas AI (AI Safety Rules)

Integrasi model kecerdasan buatan (*AI Assistant*) di PRONOIA bukan merupakan entitas otonom tanpa kendali, melainkan instrumen pendamping yang dibatasi pagar pembatas ketat:

### Kaidah Pagar Pembatas AI (*AI Safety Guardrails*)

* **Penghormatan Matriks Otorisasi**: Asisten AI hanya diizinkan membaca konteks kesehatan milik pengguna yang sedang aktif dalam sesi percakapan. Dilarang keras menginjeksi konteks data pengguna lain ke dalam *system prompt*.
* **Perlakuan Teks Luar sebagai Data Nir-Percaya (*Untrusted Input*)**: Teks masukan dari pengguna atau hasil ekstraksi OCR pemindai wajib disanitasi untuk mencegah serangan injeksi prompt (*Prompt Injection / Jailbreak*).
* **Anti-Halusinasi & Anti-Fabrikasi**: Jika data biometrik pengguna tidak tersedia dalam basis data, model AI dilarang mengarang atau mengasumsikan nilai metrik. AI wajib menyatakan secara transparan bahwa data belum tercatat.
* **Komunikasi Derajat Ketidakpastian**: Setiap analisis yang dihasilkan AI wajib dikomunikasikan dalam koridor probabilitas kebiasaan hidup, bukan kepastian klinis.

---

## 20. Kaidah Penanganan Situasi Gawat Darurat (Emergency Rules)

Penanganan situasi gawat darurat medis merupakan **Jalur Keselamatan Independen (*Independent Safety Path*)** yang terisolasi sepenuhnya dari ketergantungan komputasi sekunder:

```text
+-----------------------------------------------------------------------------------------+
|                  AKSI GAWAT DARURAT HARUS BERSIFAT DETERMINISTIK & BEBAS HAMBATAN       |
+-----------------------------------------------------------------------------------------+
```

### Larangan Ketergantungan Jalur Darurat

Alur akses tombol darurat dan pencarian fasilitas kesehatan terdekat **DILARANG KERAS** bergantung pada:
1. **Inferensi Model Bahasa AI (*LLM Inference*)**: Dilarang meminta AI melakukan triase gejala sebelum menampilkan tombol bantuan.
2. **Pemrosesan Pemindai OCR (*Scanner Processing*)**: Dilarang menunda akses darurat untuk menganalisis foto.
3. **Kalkulasi Kompleks HBE (*Behavioral Analysis*)**: Dilarang mengunci navigasi darurat demi menghitung baseline kesehatan.
4. **Ketersediaan Instruktur Manusia**: Tombol panggilan darurat nasional **119** dan rumah sakit rujukan harus dapat diakses secara instan tanpa menunggu persetujuan instruktur.
5. **Konektivitas Jaringan Stabil**: Antarmuka direktori fasilitas IGD dan tombol kontak 119 wajib dapat dibuka secara luring (*offline*) melalui cache lokal PWA.

---

## 21. Kaidah Rekayasa Antarmuka Pengguna (Frontend Rules)

Antarmuka pengguna PRONOIA dibangun dengan standar reaktivitas modern menggunakan Blade, Alpine.js, dan Tailwind CSS. Setiap komponen interaktif wajib menangani **5 Kondisi Status Antarmuka (*5 UI States*)**:

```text
+--------------+--------------------------------------------------------------------------+
| Status UI    | Ekspektasi Pengalaman Pengguna (UX Requirements)                         |
+--------------+--------------------------------------------------------------------------+
| 1. Loading   | Skeleton loader yang halus dan proporsional; tombol submit dinonaktifkan.|
| 2. Success   | Umpan balik visual yang jelas; pembaruan data reaktif tanpa reload penuh.|
| 3. Error     | Pesan ramah pengguna dalam Bahasa Indonesia; panduan langkah perbaikan.  |
| 4. Empty     | Ilustrasi kosong elegan disertai tombol ajakan bertindak (Call to Action)|
| 5. Offline   | Banner indikator luring halus; data lokal disajikan dengan badge "Luring"|
+--------------+--------------------------------------------------------------------------+
```

* **Aksesibilitas & Keterbacaan**: Mematuhi kontras warna WCAG 2.1 AA, ukuran target sentuh minimal 48x48 piksel pada layar ponsel, dan atribut ARIA untuk pembaca layar.

---

## 22. Kaidah Rekayasa Komponen Backend (Backend Rules)

Untuk menjaga keterbacaan kode, kemudahan pengujian, dan prinsip tanggung jawab tunggal (*Single Responsibility Principle*), kode backend Laravel wajib menerapkan pola arsitektur berlapis:

```text
[ Rute Web / API ]
        │
        ▼
[ HTTP Controller ] ────────> Tipis: Hanya memetakan request dan mendelegasikan tugas
        │
        ▼
[ Form Request ] ───────────> Mandatori: Validasi format, sanitasi tipe, dan otorisasi dasar
        │
        ▼
[ Application Service ] ────> Tebal: Seluruh logika bisnis HBE, kalkulasi, & transaksi ACID
        │
        ▼
[ Eloquent Models ] ────────> Representasi entitas data, relasi relasional, & attribute casting
        │
        ▼
[ JsonResource / View ] ────> Transformasi seragam data keluaran untuk klien
```

Dilarang keras menempatkan kueri basis data yang rumit, perhitungan formula baseline, atau pemanggilan API pihak ketiga secara langsung di dalam tubuh *Controller*.

---

## 23. Kaidah Pengelolaan Basis Data & Integritas Relasional (Database Rules)

Desain skema basis data MySQL 8.0 pada PRONOIA wajib mendukung tata kelola data kesehatan berstandar enterprise:

### Standar Rekayasa Skema Basis Data

* **Penegakan Integritas Relasional**: Setiap tabel turunan wajib memiliki *foreign key constraint* eksplisit dengan aturan kaskade yang aman (`onDelete('cascade')` atau `onDelete('restrict')`).
* **Kepemilikan & Keterlacakan (*Ownership & Traceability*)**: Setiap catatan metrik kesehatan wajib mencantumkan kolom `user_id` yang terindeks, kolom asal sumber data (`source`: manual, sensor, scanner), serta stempel waktu presisi (`created_at`, `updated_at`).
* **Pencatatan Transisi Status (*State Transitions*)**: Tabel yang memuat alur intervensi atau pesanan wajib merekam riwayat perubahan status beserta stempel waktu peralihan status.
* **Pencegahan Data Yatim (*No Orphan Rows*)**: Dilarang meninggalkan catatan data tanpa pemilik atau menghapus baris induk secara serampangan.

---

## 24. Kaidah Perancangan & Kontrak API (API Rules)

Seluruh antarmuka pemrograman aplikasi (RESTful API) wajib mematuhi format amplop (*envelope*) standar yang dapat diprediksi secara konsisten oleh klien web dan PWA:

### Amplop Respons Berhasil (HTTP 200 / 201)

```json
{
  "success": true,
  "data": {
    "signal_id": "sig_98127391",
    "type": "sleep_deficit",
    "status": "active",
    "confidence_score": 0.88,
    "evidence": {
      "metric": "sleep_duration_hours",
      "current_average": 5.4,
      "baseline_reference": 7.2,
      "observation_days": 7
    }
  },
  "meta": {
    "timestamp": "2026-09-17T22:30:00Z",
    "version": "v1.4"
  }
}
```

### Amplop Respons Galat Terstandar (HTTP 4xx / 5xx)

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_OBSERVATION_DATA",
    "message": "Data observasi belum mencukupi untuk menghitung garis pangkal personal (minimal 7 hari pencatatan aktif).",
    "details": [
      {
        "field": "observation_window",
        "issue": "Tercatat 3 hari dari syarat minimal 7 hari."
      }
    ]
  },
  "meta": {
    "timestamp": "2026-09-17T22:30:00Z"
  }
}
```

---

## 25. Penegakan Idempotensi Operasi Sensitif (Idempotency)

Operasi mutasi data sensitif yang berpotensi dikirimkan ulang akibat gangguan konektivitas jaringan (terutama sinkronisasi luring PWA) **wajib dirancang secara idempoten**:

```text
[ Klien PWA ] ──( HTTP POST /api/v1/health-records + Header X-Idempotency-Key )──> [ Backend ]
```

### Area Wajib Penegakan Idempotensi

1. **Pencatatan Rekam Metrik Kesehatan**: Mencegah penambahan ganda langkah harian atau asupan kalori saat pengguna menekan tombol simpan berulang kali.
2. **Penyimpanan Ekstraksi Pemindai Nutrisi**: Menghindari duplikasi log makanan dari satu pemindaian foto yang sama.
3. **Penyelesaian Misi Tantangan (*Challenge Completion*)**: Menjamin status misi selesai dan perolehan poin hanya dieksekusi satu kali untuk periode yang bersangkutan.
4. **Pemesanan Jadwal Konsultasi Instruktur**: Mencegah pemotongan kuota ganda atau pemesanan ganda pada slot waktu yang sama.

---

## 26. Kaidah Mesin Status Transisi Deterministik (State Machine Rules)

Siklus hidup entitas penting (seperti rencana intervensi, sesi konsultasi, dan tantangan) wajib dikendalikan oleh **Mesin Status Terbatas (*Finite State Machine*)** yang deterministik:

```text
[ DRAFT ] ──> [ ACTIVE ] ──┬──> [ COMPLETED ]
                           └──> [ CANCELLED ]
```

### Aturan Transisi Status

* **Larangan Mutasi Status Arbitrer**: Status tidak boleh diubah secara melompat bebas (misal: entitas berstatus `cancelled` dilarang langsung bermutasi menjadi `completed` tanpa alur pembukaan kembali yang sah).
* **Validasi Transisi Berbasis Kebijakan**: Setiap transisi status wajib memvalidasi prasyarat bisnis (misal: transisi ke `completed` mewajibkan adanya evaluasi progres pengguna).
* **Penerbitan Event Transisi**: Setiap perubahan status entitas wajib memicu penerbitan event domain Laravel (`InterventionStatusChanged`) untuk kebutuhan telemetri dan audit.

---

## 27. Standar Cakupan & Persyaratan Pengujian (Testing Requirements)

Setiap penambahan fitur atau modifikasi logika dalam repositori PRONOIA wajib disertai pengujian otomatis komprehensif yang mematuhi piramida pengujian:

```text
            /\
           /  \      [ End-to-End / Browser Tests: Playwright / Dusk ]
          / UI \     Verifikasi alur kritis PWA luring & responsivitas
         /------\
        /        \    [ Feature / Integration Tests: Pest / PHPUnit ]
       / Service  \   Verifikasi Controller, API Envelope, Policy RBAC, DB
      /------------\
     /              \  [ Unit Tests: PHPUnit ]
    / Pure Algorithms \ Logika HBE, Formula Baseline, Sanitasi Input
   /------------------\
```

### Persyaratan Uji Khusus Keselamatan Medis (*Safety Gates*)

* **Uji Pencegahan Diagnosis Palsu**: Verifikasi bahwa respons model atau rekomendasi sistem tidak pernah memuat diagnosis medis penyakit keras.
* **Uji Rute Darurat Terbuka**: Verifikasi bahwa rute `/emergency` dan pemanggilan nomor darurat 119 selalu mengembalikan status HTTP `200 OK` tanpa blokade otorisasi atau ketergantungan status login.

---

## 28. Definisi Ketuntasan Rekayasa Fitur (Definition of Complete)

Sebuah tugas rekayasa atau tiket fitur **DILARANG DINYATAKAN SELESAI (*NOT COMPLETE*)** hingga memenuhi 8 kriteria ketuntasan absolut:

1. **Implementasi Kode Bersih**: Kode ditulis rapi mematuhi arsitektur berlapis tanpa meninggalkan kode mati (*dead code*) atau komentar TODO usang.
2. **Otorisasi Peladen Aktif**: Seluruh rute dan aksi dilindungi kebijakan *Policy* dan *Gate* berbasis peran (Member, Instructor, Admin).
3. **Validasi & Penanganan Galat Lengkap**: Formulir memiliki validasi Form Request dan penanganan galat terstandar.
4. **5 Kondisi Antarmuka Terpenuhi**: Tampilan menangani status *Loading, Success, Error, Empty*, dan *Offline*.
5. **Rangkaian Uji Otomatis Lulus**: Uji Unit dan Feature yang relevan ditulis dan lulus 100% tanpa kegagalan.
6. **Tinjauan Keamanan & Privasi Dilakukan**: Memastikan tidak ada paparan PHI di log peladen dan tidak ada token rahasia bocor di klien.
7. **Tinjauan Keselamatan Medis Terpenuhi**: Memastikan tidak ada klaim diagnostik palsu dan rute darurat tetap independen.
8. **Dokumentasi Disinkronkan**: Dokumen spesifikasi di `docs/*` dan aturan di `.agents/rules/*` dimutakhirkan sesuai perubahan.

---

## 29. Standar Penanganan & Normalisasi Galat (Error Handling)

Sistem PRONOIA melarang keras mengekspos rincian teknis internal atau pesan galat basis data mentah kepada pengguna akhir:

```text
[ CONTOH SALAH (Mengekspos Detail Internal) ]:
"SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'sig_192' for key 'PRIMARY'"

[ CONTOH BENAR (Pesan Ramah Beretika) ]:
"Catatan metrik kesehatan ini telah tersimpan sebelumnya. Sistem mencegah duplikasi data."
```

### Kaidah Penanganan Galat

* **Pencatatan Detail Khusus Peladen**: Pesan galat teknis, jejak tumpukan (*stack trace*), dan galat PDO hanya boleh dicatat ke log internal peladen dengan menyertakan *Error Reference ID* unik.
* **Penyajian Pesan Ramah Pengguna**: Tampilkan pesan berbahasa Indonesia yang jelas, sopan, dan mengarahkan pengguna pada solusi praktis.
* **Status HTTP Semantik**: Kembalikan kode status HTTP yang tepat (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Entity`, `429 Too Many Requests`).

---

## 30. Telemetri, Audit Trail, & Observabilitas Sistem (Observability)

Seluruh alur kerja kritis dalam sistem wajib menghasilkan jejak telemetri yang memadai untuk memfasilitasi diagnosis insiden dan audit kepatuhan:

### Dimensi Pemantauan Wajib

* **Jejak Audit Akses Data Medis**: Setiap pembacaan atau ekspor data kesehatan oleh instruktur atau admin wajib dicatat dalam tabel `health_data_access_logs`.
* **Metrik Kegagalan Integrasi Eksternal**: Catat tingkat latensi, kegagalan jaringan, dan respons galat dari penyedia AI pihak ketiga atau gateway notifikasi push.
* **Kegagalan Antrean Latar Belakang (*Queue Failures*)**: Pantau pekerjaan antrean (*jobs*) yang gagal dieksekusi dan sediakan mekanisme coba ulang otomatis (*retry with exponential backoff*).
* **Korelasi Jejak (*Trace Correlation*)**: Sertakan header `X-Request-ID` unik pada setiap siklus permintaan HTTP untuk memudahkan penelusuran galat dari klien hingga ke basis data.

---

## 31. Kaidah Aplikasi Web Progresif & Dukungan Luring (PWA Rules)

Aplikasi PRONOIA mendukung *Progressive Web App (PWA)* dengan strategi *progressive enhancement* yang aman untuk penggunaan luring:

```text
+-----------------------------------------------------------------------------------------+
|                              PEMISAHAN PENGALAMAN LURING:                               |
|        [ Pengalaman Aman Ter-cache ]    vs    [ Pengalaman Berbahaya Jika Ter-cache ]   |
+-----------------------------------------------------------------------------------------+
```

### Pedoman Pengalaman Luring (*Offline UX*)

* **Pengalaman Aman Ter-cache (*Safe Cached Experience*)**:
  * Kerangka aplikasi (*App Shell*), aset antarmuka statis, ikon, dan berkas CSS/JS.
  * Halaman edukasi kesehatan preventif publik dan panduan pertolongan pertama darurat.
  * Formulir pencatatan metrik luring yang menyimpan draf input ke IndexedDB lokal.
* **Pengalaman Berbahaya Jika Ter-cache (*Unsafe Cached Experience*)**:
  * Dilarang keras menerapkan strategi *Cache-First* buta pada data rekam medis terotentikasi.
  * Status keanggotaan dan kuota konsultasi tidak boleh di-cache secara permanen untuk menghindari pemalsuan hak akses di sisi peramban.
* **Antrean Sinkronisasi Luring (*Background Sync*)**: Draf catatan kesehatan yang dibuat saat luring wajib ditandai secara visual (*badge "Menunggu Sinkronisasi"*) dan disinkronkan secara otomatis ketika jaringan pulih menggunakan kunci idempotensi.

---

## 32. Standar Anggaran Kinerja Sistem (Performance Rules)

Performa aplikasi berdampak langsung pada retensi pengguna dan kenyamanan pemantauan kesehatan. Utamakan solusi optimasi yang terukur dan terbukti:

### Aturan Anggaran Kinerja (*Performance Budgets*)

* **Pencegahan Kueri N+1 (*N+1 Query Elimination*)**: Seluruh pemanggilan relasi Eloquent pada koleksi data wajib menggunakan *Eager Loading* eksplisit (`with(['user', 'baseline', 'interventions'])`).
* **Pembatasan Kueri Tak Berbatas (*Pagination Enforcement*)**: Dilarang mengeksekusi kueri `Model::all()` tanpa batas. Setiap daftar riwayat atau log wajib menggunakan pembagian halaman (`paginate(20)`).
* **Ukuran Muatan Respons Ringkas**: Gunakan API Resource untuk membatasi kolom yang dikirimkan ke klien. Jangan memuat atribut teks besar jika tidak ditampilkan di antarmuka.
* **Standar Core Web Vitals**: Targetkan metrik produksi yang responsif (*Largest Contentful Paint / LCP < 2.0s*, *Interaction to Next Paint / INP < 100ms*, dan *Cumulative Layout Shift / CLS < 0.05*).
* **Kompresi Citra di Klien**: Pemrosesan gambar label makanan dari kamera wajib dikompresi di sisi peramban (format WebP, maks. 500 KB) sebelum diunggah ke peladen.

---

## 33. Tata Kelola & Disiplin Ketergantungan Eksternal (Dependency Rules)

Penambahan pustaka (*library*) atau paket eksternal (baik Composer maupun NPM) harus melalui pertimbangan teknis yang disiplin:

```text
[ Apakah Fitur Sudah Disediakan Bawaan oleh Laravel / Browser? ] ──( Ya )──> Gunakan Fitur Native
                             │ ( Tidak )
                             ▼
[ Apakah Paket Memiliki Reputasi Keamanan & Pemeliharaan Aktif? ] ──( Tidak )──> Tolak Paket
                             │ ( Ya )
                             ▼
[ Evaluasi Ukuran Bundle & Dampak Latensi Eksekusi Runtime ]
                             │ ( Aman )
                             ▼
[ Pasang Paket dengan Versi Terkunci (Composer/Package Lock) ]
```

Dilarang memasang pustaka JavaScript monolitik besar hanya untuk utilitas sepele yang dapat diselesaikan dengan 10 baris Vanilla JavaScript atau pustaka ringan yang sudah terpasang (Alpine.js).

---

## 34. Kaidah Idiom & Standar Rekayasa Laravel (Laravel Rules)

Sebelum merancang abstraksi arsitektur kustom yang rumit, prioritaskan konvensi dan fitur bawaan Laravel 11.x:

### Fitur Ekosistem Laravel yang Wajib Diutamakan

* **Eloquent ORM**: Manfaatkan mutator, casts, scopes, dan relasi resmi sebelum menulis kueri SQL mentah (*raw SQL*).
* **Form Request Validation**: Pusatkan seluruh logika validasi masukan dan otorisasi dasar ke dalam kelas Form Request mandiri.
* **Policies & Gates**: Standarkan seluruh aturan otorisasi berbasis peran dan kepemilikan data ke dalam Laravel Policies.
* **API Resources**: Gunakan `JsonResource` untuk mentransformasi model ke dalam payload JSON standar.
* **Jobs & Queues**: Delegasikan pemrosesan intensif (pengiriman email notifikasi, komputasi analitik berkala, inferensi AI eksternal) ke antrean latar belakang (*Queue*).
* **Database Transactions**: Bungkus seluruh operasi mutasi multi-tabel ke dalam `DB::transaction()` untuk menjamin atomisitas.

---

## 35. Standar Mutu & Kebersihan Kode Sumber (Code Quality)

Kode sumber yang bermutu tinggi adalah kode yang mudah dipahami oleh pengembang manusia lain enam bulan kemudian. Utamakan nilai-nilai berikut:

```text
[ KODE BERKUALITAS ENTERPRISE ]
Lebih memilih:  Eksplisit  +  Keterbacaan  +  Dapat Diuji  +  Dapat Diprediksi
Daripada:      Trik Cerdik +  Terlalu Padat +  Sihir Implisit +  Rapuh (*Fragile*)
```

### Pedoman Penulisan Kode

* **Pengetikan Ketat (*Strict Typing*)**: Selalu deklarasikan tipe parameter dan tipe kembalian metode (`declare(strict_types=1);`).
* **Pola Pengembalian Dini (*Early Return Pattern*)**: Hindari percabangan `if-else` bersarang yang dalam (*arrow anti-pattern*). Periksa kondisi kegagalan atau guard clause di awal metode.
* **Penamaan yang Deskriptif**: Berikan nama variabel, metode, dan kelas yang mencerminkan istilah domain kesehatan secara akurat (`calculateBaselineDeviation()` lebih baik daripada `calcDev()`).

---

## 36. Prinsip Memprioritaskan Kode Eksis (Existing Code First)

Sebelum memutuskan untuk merombak atau menulis ulang (*rewrite*) modul kode yang sudah ada, patuhi siklus evaluasi berikut:

```text
[ 1. Inspeksi Mendalam ] ──> Baca implementasi eksis dan pahami konteks historisnya
            │
            ▼
[ 2. Temukan Akar Masalah ] ──> Bedakan antara cacat fungsional nyata vs preferensi gaya subjektif
            │
            ▼
[ 3. Perbaikan Inkremental ] ──> Tambahkan uji regresi, perbaiki bug, dan pertahankan stabilitas
```

Dilarang keras merombak pengontrol atau modul layanan yang sudah terbukti bekerja secara stabil hanya karena preferensi pribadi agen koding yang menganggap struktur lain lebih estetis secara teoritis.

---

## 37. Kaidah Keselamatan Migrasi Skema Basis Data (Migration Safety)

Migrasi skema basis data adalah operasi permanen yang berisiko tinggi. Setiap berkas migrasi wajib mematuhi standar keselamatan berikut:

### Pedoman Keselamatan Migrasi

* **Larangan Operasi Destruktif Sembrono**: Dilarang menyertakan perintah `dropTable()` atau `dropColumn()` pada lingkungan produksi tanpa strategi pencadangan dan persetujuan formal.
* **Penambahan Kolom yang Bersifat Kompatibel Mundur**: Kolom baru wajib memiliki nilai baku (`default()`) atau bersifat opsional (`nullable()`) agar tidak merusak kode aplikasi yang sedang berjalan saat migrasi dieksekusi.
* **Penyertaan Metode Rollback (*down*)**: Setiap metode `up()` wajib memiliki metode `down()` yang simetris dan dapat dieksekusi secara mulus untuk membatalkan perubahan skema jika terjadi anomali saat penyebaran (*deployment*).
* **Pengindeksan Kunci Asing**: Seluruh kolom `foreignId()` wajib diberi indeks eksplisit untuk menjaga performa operasi *JOIN*.

---

## 38. Standar Konsistensi Pengalaman Pengguna (UI and UX Consistency)

Konsistensi antarmuka pengguna mencerminkan profesionalisme dan keandalan sistem kesehatan di mata pengguna. Seluruh halaman web wajib mematuhi panduan desain `docs/12-ux-ui.md`:

### Standar Keselarasan Antarmuka Pengguna

* **Palet Warna Terkurasi**: Gunakan tema warna *#0F172A* (*deep slate*) untuk fondasi gelap yang elegan, dipadukan dengan aksen *Emerald Green* untuk indikator kondisi stabil dan *Amber/Rose* untuk peringatan kewaspadaan.
* **Penggunaan Kembali Komponen Blade**: Manfaatkan komponen Blade yang sudah ada (`<x-card>`, `<x-button>`, `<x-badge>`, `<x-modal>`, `<x-navbar>`) daripada membuat markup kustom baru yang menyimpang.
* **Tipografi & Spasi Proporsional**: Gunakan skala tipografi yang konsisten (*Inter / Sans-serif*) dengan spasi padding dan margin yang berulang secara ritmis (kelipatan 4px / 8px).

---

## 39. Disiplin Batasan Ruang Lingkup Produk (Product Scope Discipline)

Repositori PRONOIA beroperasi di bawah disiplin ruang lingkup MVP (*Minimum Viable Product*) yang ketat. Fokus rekayasa wajib diprioritaskan pada alur preventif inti:

```text
+-----------------------------------------------------------------------------------------+
|                              PRIORITAS RUANG LINGKUP MVP:                               |
| Data Kesehatan -> Garis Pangkal -> Deteksi Sinyal -> Rekomendasi Bukti -> Intervensi    |
+-----------------------------------------------------------------------------------------+
```

### Batasan Ruang Lingkup Fitur Sekunder

* **Gamifikasi**: Poin, lencana, dan papan peringkat (*leaderboard*) hanyalah pemanis motivasi mikro. Jangan menghabiskan waktu merekayasa sistem lelang poin atau mini-game rumit yang mengalihkan fokus dari akurasi *Health Behavior Engine*.
* **Komunitas**: Fitur forum sosial dibatasi pada ruang diskusi positif dan saling dukung antar-anggota, bukan jejaring sosial monolitik dengan algoritma linimasa yang kompleks.
* **Kecerdasan Buatan**: AI difokuskan sebagai asisten percakapan kontekstual dan penerjemah narasi bukti, bukan agen otonom yang mengambil keputusan klinis sepihak.

---

## 40. Prinsip Kesiapan Demo & Kompetisi (Competition / Demo Principle)

Dalam konteks penilaian kompetisi teknologi, pameran produk (*product showcase*), atau demonstrasi dewan juri, kekuatan utama PRONOIA dinilai dari **keandalan alur preventif yang utuh dan bebas galat**:

```text
[ DEMO YANG MENANG DAN MEMIKAT ]
Bukan:   Puluhan halaman antarmuka setengah matang yang rentan rusak (*crash*)
Tetapi:  Satu siklus preventif terpadu yang bekerja sempurna dari hulu ke hilir,
         didukung data realistis, bukti transparan, dan navigasi yang sangat mulus.
```

### Standar Kesiapan Skenario Demo

1. **Jaminan Nol Kerusakan (*Zero-Crash Guarantee*)**: Setiap tombol, formulir, dan modal pada rute demo wajib berfungsi tanpa memicu galat layar putih (*blank page*), galat JavaScript di konsol, atau respons HTTP 500.
2. **Data Benih Realistis (*Realistic Seed Data*)**: Pastikan data seeder menyediakan profil pengguna dengan riwayat metrik 30 hari yang menunjukkan pergeseran tren yang nyata dan wawasan yang masuk akal secara fisiologis.

---

## 41. Standar Alur Kerja Eksekusi Implementasi (Implementation Workflow)

Setiap penugasan rekayasa kode di repositori PRONOIA wajib mengikuti 12 langkah alur kerja implementasi yang terstruktur:

```text
 1. Pahami Sasaran & Persyaratan Tiket
 2. Inspeksi Implementasi Kode Eksis Terkait
 3. Identifikasi Domain Sistem yang Terdampak
 4. Muat & Baca Aturan Kanonikal yang Berlaku
 5. Telaah Spesifikasi Fungsional pada Direktori docs/*
 6. Evaluasi Implikasi Keamanan, Otorisasi, & UU PDP
 7. Evaluasi Pagar Pembatas Keselamatan Medis & Rute Darurat
 8. Rumuskan Rencana Perubahan yang Inkremental & Minimalis
 9. Eksekusi Implementasi Kode Bersih
10. Tulis & Jalankan Rangkaian Pengujian Otomatis
11. Tinjau Perbedaan Kode (Git Diff) & Lakukan Sanitasi
12. Sinkronkan Dokumentasi Spesifikasi yang Terkait
```

Dilarang melompat langsung ke langkah implementasi (Langkah 9) tanpa menyelesaikan langkah pemahaman, inspeksi, dan penelaahan keselamatan (Langkah 1 s.d. 8).

---

## 42. Protokol Pemeriksaan Pra-Penyuntingan Kode (Before Editing)

Sebelum membuka penyunting teks dan mengubah berkas kode sumber, agen koding dan teknisi wajib menjawab 5 pertanyaan kunci pra-penyuntingan:

```text
[ CHECKLIST PRA-PENYUNTINGAN KODE ]
[ ] 1. Berkas spesifik apa saja yang perlu diubah?
[ ] 2. Mengapa berkas-berkas tersebut perlu diubah untuk mencapai tujuan tugas?
[ ] 3. Apakah perubahan ini mempengaruhi kontrak API atau skema basis data eksis?
[ ] 4. Pengujian otomatis apa yang perlu ditambahkan atau diperbarui?
[ ] 5. Berkas dokumentasi mana yang perlu disinkronkan pasca-perubahan?
```

Jika teknisi belum dapat menjawab kelima pertanyaan di atas dengan tegas dan jelas, proses pengkodean tidak boleh dimulai.

---

## 43. Protokol Verifikasi Pasca-Penyuntingan Kode (After Editing)

Setelah menyelesaikan penyuntingan kode, teknisi wajib melakukan protokol verifikasi mandiri sebelum mengajukan komit:

```text
[ KODE SELESAI DIUBAH ]
           │
           ▼
[ Periksa Git Diff ] ───────> Pastikan hanya berkas relevan yang diubah; hapus debug dump (dd)
           │
           ▼
[ Jalankan Test Suite ] ────> Pastikan 100% tes lokal (Unit, Feature) lulus tanpa regresi
           │
           ▼
[ Analisis Statis / Lint ] ─> Jalankan pint / phpstan untuk memastikan kepatuhan standar kode
           │
           ▼
[ Uji Visual di Peramban ] ─> Verifikasi kondisi Loading, Error, Empty, dan Offline di layar
           │
           ▼
[ Validasi Keamanan ] ──────> Pastikan tidak ada rahasia atau data pribadi tercatat di log
```

---

## 44. Protokol Sinkronisasi Dokumentasi Sistem (Documentation Synchronization)

Dokumentasi dan kode sumber adalah satu kesatuan yang tidak boleh terpisah (*Code-Doc Parity*). Keduanya wajib bergerak selaras dalam repositori:

### Matriks Pemicu Sinkronisasi Dokumentasi

* **Perubahan Struktur Arsitektur**: Wajib memperbarui `docs/01-architecture.md` dan `docs/10-system-architecture.md`.
* **Perubahan Skema Tabel / Kolom**: Wajib memperbarui `docs/08-data-model.md`.
* **Perubahan Kontrak Payload Endpoint**: Wajib memperbarui `docs/09-api-contracts.md` dan `docs/rules/07-api.md`.
* **Perubahan Alur UX & Navigasi Halaman**: Wajib memperbarui `docs/04-user-journeys.md` dan `docs/12-ux-ui.md`.
* **Perubahan Rumus Baseline / Sinyal**: Wajib memperbarui `docs/05-health-behavior-engine.md`.

Setiap *pull request* yang memodifikasi logika sistem tanpa menyinkronkan dokumen spesifikasi yang bersangkutan dianggap belum tuntas (*incomplete*).

---

## 45. Larangan Perubahan Kontrak Terselubung (No Silent Contract Changes)

Dilarang keras melakukan perubahan kontrak sistem secara terselubung atau diam-diam (*No Silent Contract Changes*):

### Larangan Modifikasi Terselubung

1. **Makna Kolom Basis Data**: Mengubah arti semantik kolom (misal: mengubah fungsi kolom `status` tanpa memperbarui enum dan kode konsumsi).
2. **Struktur Amplop Respons API**: Mengubah nama kunci JSON, membungkus data dengan array baru, atau mengubah format tanggal tanpa memperbarui versi API.
3. **Nilai Enum & Status**: Menambahkan atau menghapus status tanpa memperbarui mesin status dan skema basis data.
4. **Kebijakan Otorisasi**: Melonggarkan atau memperketat syarat otorisasi tanpa memperbarui pengujian integrasi terkait.
5. **Satuan Metrik Kesehatan**: Mengubah satuan dari kilogram ke pon, atau kilometer ke mil, tanpa logika konversi yang eksplisit.

Setiap perubahan kontrak wajib dikomunikasikan secara transparan, terdokumentasi, dan memiliki strategi migrasi yang aman bagi klien PWA dan pihak ketiga.

---

## 46. Prinsip Nilai Baku yang Aman secara Hakiki (Safe Defaults)

Ketika menghadapi ambiguitas informasi, data yang tidak lengkap, atau situasi perbatasan (*edge cases*), sistem PRONOIA wajib mengambil tindakan berdasarkan **Prinsip Nilai Baku yang Aman secara Hakiki (*Safe Defaults*)**:

```text
+-----------------------------------------------------------------------------------------+
|                  NILAI BAKU AMAN DALAM MENGHADAPI AMBIGUITAS SISTEM:                    |
+-----------------------------------------------------------------------------------------+
| 1. Validasi Eksplisit         > Asumsi Implisit Longgar                                 |
| 2. Tidak Mengambil Aksi       > Mengambil Aksi yang Berpotensi Membahayakan             |
| 3. Bukti Belum Cukup          > Kepastian Semu Hasil Fabrikasi Algoritma                |
| 4. Penolakan Otorisasi (Deny) > Pemberian Izin Akses Otomatis                           |
| 5. Konfirmasi Pengguna        > Eksekusi Sepihak pada Operasi yang Berdampak Besar      |
| 6. Logika Deterministik       > Inferensi Probabilistik AI untuk Keputusan Kritis       |
+-----------------------------------------------------------------------------------------+
```

---

## 47. Pencegahan Kompleksitas Rekayasa Berlebih (Avoid Overengineering)

Hindari kompleksitas arsitektur dini (*premature optimization & overengineering*). Fokus utama rekayasa adalah membangun sistem monolit modular yang bersih dan kokoh di atas Laravel 11:

### Larangan Kompleksitas Dini

* **Dilarang Memecah ke Microservices**: Tetap pertahankan arsitektur *Modular Monolith*. Pemecahan ke layanan mikro terdistribusi hanya akan menambah beban latensi jaringan dan kompleksitas transaksi tanpa faedah nyata bagi skala saat ini.
* **Dilarang Menggunakan Arsitektur Event Terdistribusi Rumit**: Gunakan *Laravel Events & Listeners* lokal. Jangan memasang broker pesan terdistribusi (seperti Kafka) jika antrean Redis atau basis data standar sudah mencukupi.
* **Dilarang Menumpuk Lapisan Abstraksi Tanpa Alasan**: Jangan membuat *Repository Pattern* kosong jika hanya memanggil `$this->model->find($id)`. Buatlah lapisan abstraksi hanya jika benar-benar ada logika pertukaran penyedia (*provider swapping*) atau kalkulasi domain yang kompleks.

---

## 48. Arsitektur Rujukan Sistem Berlapis (Recommended Architecture)

Arsitektur sistem PRONOIA mengadopsi pola **Modular Monolith Berlapis** yang memisahkan kanal antarmuka dari inti komputasi domain kesehatan:

```text
+-----------------------------------------------------------------------------------------+
|                               APLIKASI LARAVEL PRONOIA                                  |
+-----------------------------------------------------------------------------------------+
|  KANAL PRESENTASI:                                                                      |
|  - Web Blade + Alpine.js (Desktop & Mobile Browser)                                     |
|  - Progressive Web App (PWA Service Worker, CacheStorage, IndexedDB Sync Queue)         |
|  - RESTful API Endpoints (JSON Envelope / Laravel Sanctum)                              |
+-----------------------------------------------------------------------------------------+
|  LAPISAN APLIKASI & ORKESTRASI:                                                         |
|  - Form Request Validation & Input Sanitization                                         |
|  - Controllers (Tipis & Delegatif)                                                      |
|  - Laravel Authorization Policies (RBAC: Member, Instructor, Admin)                     |
+-----------------------------------------------------------------------------------------+
|  INTI DOMAIN KESEHATAN (CORE DOMAIN SERVICES):                                          |
|  - Health Behavior Engine (HBE: Baseline Calculator, Signal Detector, Evidence Builder) |
|  - Intervention Lifecycle Service (State Machine)                                       |
|  - User Baseline Calibration Service                                                    |
+-----------------------------------------------------------------------------------------+
|  LAPISAN INTEGRASI PENYEDIA (PROVIDER ADAPTERS):                                        |
|  - AiProviderInterface          <-- OpenAI / Claude / Local LLM / MockAiProvider        |
|  - ScannerProviderInterface     <-- Google Cloud Vision / Tesseract / MockScanner       |
|  - NotificationProviderInterface<-- WebPush / FCM / MailProvider                        |
+-----------------------------------------------------------------------------------------+
|  LAPISAN DATA & PERSISTENSI:                                                            |
|  - Eloquent ORM Entities (MySQL 8.0 ACID Transactions)                                  |
+-----------------------------------------------------------------------------------------+
```

---

## 49. Pola Desain Abstraksi Penyedia Layanan (Provider Abstraction)

Integrasi dengan layanan eksternal pihak ketiga (seperti penyedia model AI, mesin OCR, atau gateway notifikasi) **wajib diisolasi melalui antarmuka (*Interface Abstraction*)**:

```php
// app/Services/Ai/Contracts/AiProviderInterface.php
namespace App\Services\Ai\Contracts;

interface AiProviderInterface
{
    /**
     * Menghasilkan penjelasan berbasis bukti dengan pagar pembatas kesehatan.
     */
    public function generateEvidenceExplanation(array $biometricContext, string $userPrompt): string;
}
```

### Manfaat Penegakan Abstraksi Provider

1. **Pencegahan Kebocoran Domain (*No Vendor Leak*)**: Kode logika bisnis HBE tidak pernah memanggil SDK penyedia eksternal secara langsung.
2. **Kemudahan Pengujian Mandiri (*Testability & Mocking*)**: Pengujian otomatis dapat menggunakan `MockAiProvider` atau `MockScannerProvider` tanpa memerlukan koneksi internet aktif atau kuota API berbayar.
3. **Fleksibilitas Penggantian Vendor**: Sistem dapat berganti dari satu penyedia AI ke penyedia lain hanya dengan mengubah konfigurasi di `config/services.php` tanpa menyentuh satu baris pun kode bisnis.

---

## 50. Tata Kelola Saklar Fitur Dinamis (Feature Flags)

Fitur-fitur eksperimental, fitur yang memerlukan biaya API pihak ketiga, atau fitur yang memiliki risiko kegagalan eksternal wajib dikendalikan menggunakan **Saklar Fitur (*Feature Flags*)**:

### Daftar Saklar Fitur Utama (`.env` / `config/features.php`)

```text
FEATURE_AI_ASSISTANT_ENABLED=true       # Mengaktifkan obrolan asisten AI
FEATURE_NUTRITION_SCANNER_ENABLED=true  # Mengaktifkan modul pemindai label nutrisi
FEATURE_COMMUNITY_ENABLED=true          # Mengaktifkan forum interaksi komunitas
FEATURE_PWA_BACKGROUND_SYNC=true        # Mengaktifkan antrean sinkronisasi luring
FEATURE_EMERGENCY_DIRECT_CALL=true      # Menampilkan pintasan panggilan 119
```

Setiap komponen antarmuka dan pengontrol wajib memeriksa nilai saklar fitur ini. Jika dinonaktifkan, antarmuka harus melakukan degradasi anggun (*graceful fallback*) tanpa memicu galat sistem.

---

## 51. Pemisahan Lingkungan Demo, Pengujian, & Produksi (Demo and Production Separation)

Sistem PRONOIA menjamin bahwa mode demonstrasi (*demo mode*) yang memikat tidak pernah mengorbankan integritas arsitektur produksi:

```text
+-----------------------------------------------------------------------------------------+
|                               PENYEDIA BERBASIS LINGKUNGAN:                             |
|  - Lingkungan Produksi (Production)  --> ProductionAiProvider (API Riil Terenkripsi)   |
|  - Lingkungan Pengujian (Testing)    --> TestAiProvider (Deterministik Cepat Tanpa API)|
|  - Lingkungan Demonstrasi (Demo)     --> DemoAiProvider (Skenario Konsisten Bebas Kuota)|
+-----------------------------------------------------------------------------------------+
```

Dilarang keras menyisipkan kondisi pintas (*bypass code*) seperti `if (env('APP_ENV') === 'demo') return true;` di dalam kelas *Policy* otorisasi produksi.

---

## 52. Perlindungan Data Sensitif di Lingkungan Pengembangan (Sensitive Data in Development)

Lingkungan pengembangan lokal (*local development*) dan pengujian otomatis wajib menggunakan data sintetis murni:

### Kaidah Pengelolaan Data Sensitif Lokal

* **Penggunaan Benih Data Sintetis (*Synthetic Seeders*)**: Seluruh profil pengguna, catatan riwayat tidur, langkah, dan rekam makanan di lingkungan lokal wajib di-generate menggunakan `FakerPHP`.
* **Larangan Impor Data Pengguna Riil**: Dilarang menyalin basis data produksi yang memuat data pribadi atau rekam medis pengguna riil ke komputer lokal pengembang.
* **Kunci API Palsu di Git**: Gunakan nilai penampung (*dummy placeholders*) pada berkas `.env.example` (misal: `AI_API_KEY=pronoia_dummy_key_local`).

---

## 53. Disiplin Tata Kelola Git & Riwayat Komit (Git Discipline)

Seluruh agen koding dan pengembang wajib menerapkan disiplin tata kelola Git yang rapi dengan format *Conventional Commits*:

### Format Pesan Komit Standar

```text
[tipe]([cakupan]): [deskripsi ringkas dalam bentuk imperatif]

Contoh:
feat(hbe): implementasi formula deviasi baseline personal 7 hari
fix(auth): cegah eksploitasi IDOR pada endpoint rekam metrik kesehatan
test(safety): tambah uji pembatas pencegahan diagnosis klinis pada asisten AI
docs(api): sinkronkan amplop respons JSON sinyal perilaku pada dokumen 07-api
refactor(pwa): optimalkan strategi Stale-While-Revalidate untuk aset edukasi
```

### Kaidah Komit Repositori

* **Komit Atomik & Terfokus**: Setiap komit hanya boleh menyelesaikan satu sub-tugas logis yang utuh.
* **Larangan Komit Campuran (*No Mixed Junk*)**: Dilarang menggabungkan perbaikan bug otorisasi dengan pemformatan ulang CSS atau berkas log sementara dalam satu komit.

---

## 54. Ekspektasi & Standar Tinjauan Pull Request (Pull Request / Review Expectations)

Setiap pengajuan perubahan kode (*Pull Request*) wajib menyertakan deskripsi komprehensif yang menjawab 6 pertanyaan evaluasi teknis:

```text
[ FORMAT DESKRIPSI PULL REQUEST ]
1. Ringkasan Perubahan : Apa saja fitur atau perbaikan yang diimplementasikan?
2. Alasan & Motivasi   : Mengapa perubahan ini diperlukan oleh sistem?
3. Domain Terdampak    : Modul mana saja yang mengalami modifikasi (HBE/Auth/PWA/UI)?
4. Analisis Risiko     : Apakah ada risiko regresi performa, keamanan, atau keselamatan?
5. Rangkaian Pengujian : Uji otomatis apa saja yang ditambahkan dan bagaimana hasilnya?
6. Sinkronisasi Dokumen: Berkas spesifikasi docs/* mana yang telah dimutakhirkan?
```

---

## 55. Daftar Periksa Tinjauan Akhir Komprehensif (Final Review Checklist)

Sebelum sebuah penugasan rekayasa dinyatakan selesai, agen koding dan peninjau kode wajib memverifikasi **Daftar Periksa Tinjauan Akhir 7 Dimensi (*7-Dimensional Final Review Checklist*)**:

### Tinjauan Arsitektur Sistem (Architecture Review)

* [ ] Perubahan kode selaras dengan pola arsitektur *Modular Monolith* berlapis.
* [ ] Batas domain inti (Data, Baseline, Signal, Insight, Intervention) terjaga murni tanpa percampuran logika.
* [ ] Tidak ada abstraksi berlebih (*no overengineering*) yang tidak dibutuhkan.

### Tinjauan Keamanan & Kontrol Akses (Security Review)

* [ ] Seluruh endpoint dan aksi pengontrol dilindungi oleh otentikasi Sanctum dan otorisasi *Policy*.
* [ ] Tidak ada celah kerentanan *Insecure Direct Object Reference (IDOR)* pada data multi-tenant.
* [ ] Tidak ada data kesehatan sensitif (PHI) atau token kredensial yang tercatat di berkas log peladen.
* [ ] Seluruh masukan pengguna divalidasi dan disanitasi secara ketat pada sisi peladen backend.

### Tinjauan Keselamatan Medis (Health Safety Review)

* [ ] Batasan preventif terjaga murni: sistem tidak mengeluarkan vonis diagnosis medis penyakit klinis.
* [ ] Sistem tidak meresepkan obat-obatan keras atau terapi farmakologis mandiri.
* [ ] Alur gawat darurat (tombol 119 dan navigasi IGD) tetap independen dari inferensi AI dan jaringan luring.

### Tinjauan Integritas Data (Data Integrity Review)

* [ ] Nilai ekstrim biometrik yang tidak rasional ditolak oleh validasi Form Request.
* [ ] Operasi penyimpanan multi-tabel dibungkus dalam transaksi basis data ACID (`DB::transaction`).
* [ ] Operasi mutasi data yang berpotensi dikirim berulang dilindungi oleh kunci idempotensi.

### Tinjauan Pengalaman Pengguna (UX Review)

* [ ] Komponen antarmuka menangani kelima status (*Loading, Success, Error, Empty, Offline*).
* [ ] Pesan galat disajikan dalam Bahasa Indonesia yang sopan, ramah, dan solutif tanpa SQL mentah.
* [ ] Desain antarmuka mematuhi standar palet warna dan tipografi `docs/12-ux-ui.md`.

### Tinjauan Verifikasi & Pengujian (Testing Review)

* [ ] Uji unit dan fitur telah ditambahkan untuk mencakup seluruh skenario keberhasilan dan kegagalan.
* [ ] Seluruh rangkaian uji otomatis pada *test suite* lulus 100% tanpa ada yang dilewati secara ilegal.

### Tinjauan Sinkronisasi Dokumentasi (Documentation Review)

* [ ] Berkas spesifikasi di direktori `docs/*` dan aturan di `.agents/rules/*` telah disinkronkan.
* [ ] Kontrak payload API pada `docs/09-api-contracts.md` identik dengan keluaran respons kode backend.

---

## 56. Standar Ketuntasan Operasional (Completion Standard)

Sebuah modul atau fitur sistem PRONOIA diakui telah mencapai **Standar Ketuntasan Operasional (*Operational Completion Standard*)** hanya jika seluruh mata rantai berikut telah terpenuhi secara holistik:

```text
[ IMPLEMENTASI KODE BERSIH ]
             +
[ OTORISASI & KEAMANAN PELADEN ]
             +
[ VALIDASI INPUT & KUALITAS DATA ]
             +
[ 5 STATUS ANTARMUKA PENGGUNA ]
             +
[ RANGKAIAN UJI OTOMATIS LULUS ]
             +
[ TINJAUAN KESELAMATAN MEDIS ]
             +
[ KEPATUHAN PRIVASI UU PDP ]
             +
[ SINKRONISASI DOKUMENTASI ]
```

Jika salah satu mata rantai di atas belum tuntas, tiket rekayasa **belum boleh ditutup**.

---

## 57. 15 Kaidah Inti yang Tidak Dapat Dinegosiasikan (Core Non-Negotiable Rules)

Berikut adalah **15 Kaidah Inti yang Bersifat Absolut dan Tidak Dapat Dinegosiasikan (*Non-Negotiable Core Rules*)** bagi setiap agen koding dan pengembang yang berkontribusi pada repositori PRONOIA:

1. **Privasi secara Baku (*Privacy by Default*)**: Data pribadi dan metrik kesehatan selalu dilindungi dalam derajat kerahasiaan tertinggi secara otomatis.
2. **Hak Akses Minimal (*Least Privilege*)**: Akses ke data biometrik hanya diberikan kepada pihak yang memiliki legitimasi langsung.
3. **Otorisasi Sisi Peladen Mutlak (*Server-Authoritative Authorization*)**: Jangan pernah mempercayai pemeriksaan otorisasi di sisi peramban klien.
4. **Komputasi Deterministik untuk Keputusan Kritis**: Seluruh formula baseline, validasi, dan penentuan ambang batas sinyal dieksekusi dengan logika matematika pasti di backend.
5. **AI Bukan Sumber Kebenaran (*AI is Not Source of Truth*)**: Model AI tidak boleh menjadi pemutus hak akses, kuota, atau diagnosa kesehatan.
6. **Keluaran Pemindai Wajib Dikonfirmasi**: Ekstraksi OCR nutrisi hanyalah draf yang wajib disetujui pengguna sebelum disimpan.
7. **Garis Pangkal Personal Bukan Vonis Penyakit**: Deviasi baseline adalah sinyal kebiasaan gaya hidup, bukan diagnosa klinis.
8. **Sinyal Perilaku Wajib Didukung Bukti Eksplisit**: Dilarang menerbitkan rekomendasi tanpa data pendukung yang transparan.
9. **Jalur Darurat Independen dari Inferensi AI**: Akses tombol 119 dan direktori IGD tidak boleh dihambat oleh proses analitik sekunder.
10. **Minimisasi & Enkripsi Data Sensitif**: Hanya kumpulkan data yang relevan dan lindungi dengan enkripsi berstandar industri.
11. **Kedaulatan & Agensi Pengguna Terjaga**: Pengguna memegang kendali penuh atas data dan pilihan intervensi kesehatannya.
12. **Ketidakpastian Data Harus Dikomunikasikan**: Jangan pernah menyembunyikan keterbatasan data di balik persentase probabilitas semu.
13. **Jalur Kritis Wajib Memiliki Uji Otomatis**: Setiap alur yang menyangkut keselamatan dan keuangan wajib diuji secara mendalam.
14. **Dokumentasi Selalu Bergerak Selaras dengan Kode**: Kode dan dokumen spesifikasi tidak boleh mengalami pergeseran makna.
15. **Dilarang Mengorbankan Keselamatan Demi Estetika**: Keselamatan pengguna dan kepatuhan hukum mutlak mengalahkan kemudahan fitur semata.

---

## 58. Kaidah Perlindungan Integritas Karakter Produk (Product Integrity Rules)

Dalam seluruh proses ekspansi dan iterasi fitur, jaga agar karakter dan proposisi nilai sistem PRONOIA **tidak pernah bergeser (*Anti-Product Drift*)** menjadi:

```text
[ BUKAN "AI DOCTOR" ]             --> Kami tidak mendiagnosis penyakit atau menggantikan dokter.
[ BUKAN "GENERIC HEALTH TRACKER"] --> Kami tidak sekadar mencatat angka tanpa wawasan personal.
[ BUKAN "SCANNER APP" ]           --> Pemindai hanyalah pintu masuk data, bukan nilai utama produk.
[ BUKAN "GAMIFIED HEALTH SCORE" ] --> Kesehatan manusia bukan skor permainan yang dangkal.
```

### Karakter Hakiki Produk PRONOIA

> **"Sebuah platform kesehatan preventif personal dan intervensi dini yang mendeteksi perubahan bermakna dalam perilaku hidup sehari-hari, menjelaskannya secara transparan berbasis bukti, memandu intervensi mikro praktis, memantau kemajuan secara terukur, dan menghubungkan pengguna dengan dukungan manusia ahli ketika dibutuhkan."**

---

## 59. Prinsip Siklus Hidup Sistem Inti (Core System Principle)

Sistem PRONOIA dibangun untuk melestarikan dan menyempurnakan siklus hidup tindakan preventif dari ujung ke ujung:

```text
+-----------------------------------------------------------------------------------------+
|                              SIKLUS SISTEM PREVENTIF INTI:                              |
+-----------------------------------------------------------------------------------------+
|     Observe (Amati)  ──────>  Understand (Pahami)  ──────>  Detect Change (Deteksi)     |
|            │                                                          │                 |
|            ▼                                                          ▼                 |
|     Explain (Jelaskan) ────>  Intervene (Aksi Nyata) ────>  Monitor (Pantau Progres)   |
|            │                                                          │                 |
|            ▼                                                          ▼                 |
|     Escalate (Eskalasi Ahli) ────────────────────────────>  Improve (Evaluasi Dampak)   |
+-----------------------------------------------------------------------------------------+
```

### Rantai Keterlacakan Data Holistik (*End-to-End Traceability Chain*)

Setiap wawasan atau rekomendasi yang muncul di layar pengguna wajib dapat dilacak mundur hingga ke sumber data mentahnya:

```text
[ Rekam Kesehatan Mentah (Health Record) ]
                   │
                   ▼
[ Garis Pangkal Personal (Personal Baseline) ]
                   │
                   ▼
[ Fitur Perilaku Ekstraksi (Behavior Feature) ]
                   │
                   ▼
[ Sinyal Perilaku Terkualifikasi (Behavior Signal) ]
                   │
                   ▼
[ Bukti Metrik Terkait (Supporting Evidence) ]
                   │
                   ▼
[ Wawasan Kontekstual (Explainable Insight) ]
                   │
                   ▼
[ Rekomendasi Kebiasaan Mikro (Actionable Recommendation) ]
                   │
                   ▼
[ Rencana Intervensi Aktif (Personalized Intervention) ]
                   │
                   ▼
[ Pemantauan Kepatuhan Rutin (Progress Tracking) ]
                   │
                   ▼
[ Hasil Evaluasi Kebugaran (Health Outcome) ]
```

---

## 60. Prinsip Rekayasa Pamungkas (Final Engineering Principle)

Bangunlah sistem yang paling sederhana namun **benar, aman, dan bekerja sempurna terlebih dahulu** sebelum memikirkan ekspansi fitur yang rumit:

```text
+-----------------------------------------------------------------------------------------+
|                    PILIHAN UTAMA REKAYASA SISTEM PRONOIA:                               |
|                                                                                         |
|       BENAR  +  AMAN  +  JELAS TERBUKTI  +  DAPAT DIUJI  +  MUDAH DIPELIHARA            |
|                                                                                         |
|                                LEBIH DIUTAMAKAN DARIPADA                                |
|                                                                                         |
|                    RUMIT  +  MEMIKAT SECARA SEMU  +  RAPUH (*FRAGILE*)                  |
+-----------------------------------------------------------------------------------------+
```

Tujuan akhir dari repositori ini bukanlah memaksimalkan jumlah fitur atau baris kode yang ditulis. Tujuan mulia kita bersama adalah **membangun sistem kesehatan preventif yang paling terpercaya, aman secara etika medis, transparan perilakunya, dapat diaudit, dan memberikan dampak nyata bagi kualitas hidup manusia**.

> **"Bangun dan sempurnakan siklus preventif inti terlebih dahulu. Seluruh komponen lainnya hadir untuk melayani dan memperkuat siklus tersebut."**

---
