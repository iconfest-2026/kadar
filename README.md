# AEVYRA

**Personal Preventive Health Intelligence**

AEVYRA adalah platform kesehatan preventif berbasis Progressive Web App yang membangun garis acuan biologis personal setiap pengguna, mendeteksi pergeseran perilaku gaya hidup sejak dini, menghubungkan pengguna dengan tenaga kesehatan terverifikasi, dan menyediakan akses tanggap darurat medis 119 yang sepenuhnya independen dari AI.

```text
A E V Y R A
│ │ │ │ │ └─ Action
│ │ │ │ └─── Recognition
│ │ │ └───── Your
│ │ └─────── Vitality
│ └───────── Evolution
└─────────── Awareness
```

Laravel 12 &nbsp;·&nbsp; React 19 &nbsp;·&nbsp; Inertia.js &nbsp;·&nbsp; Tailwind CSS 4 &nbsp;·&nbsp; Vite 7 &nbsp;·&nbsp; PHP 8.2+ &nbsp;·&nbsp; MySQL

---

## Daftar Isi

1. [Konsep Brand dan Filosofi](#konsep-brand-dan-filosofi)
2. [Latar Belakang](#latar-belakang)
3. [Fitur dan Urgensi Masalah](#fitur-dan-urgensi-masalah)
4. [Ringkasan Fitur Teknis](#ringkasan-fitur-teknis)
5. [Peran Pengguna](#peran-pengguna)
6. [Health Behavior Engine](#health-behavior-engine)
7. [Asisten AI dan Pengaman Klinis](#asisten-ai-dan-pengaman-klinis)
8. [Protokol Darurat 119](#protokol-darurat-119)
9. [Paket Keanggotaan](#paket-keanggotaan)
10. [Teknologi](#teknologi)
11. [Struktur Proyek](#struktur-proyek)
12. [Instalasi](#instalasi)
13. [Konfigurasi Lingkungan](#konfigurasi-lingkungan)
14. [Akun Demo](#akun-demo)
15. [Pengujian](#pengujian)
16. [Identitas Visual](#identitas-visual)
17. [Privasi dan Keamanan Data](#privasi-dan-keamanan-data)
18. [Lisensi](#lisensi)

---

## Konsep Brand dan Filosofi

Nama **AEVYRA** merupakan akronim dari enam pilar kecerdasan kesehatan preventif:

| Huruf | Pilar | Makna Klinis & Perilaku |
| :--- | :--- | :--- |
| **A** | **Awareness** | Membangun kesadaran objektif melalui pemantauan garis acuan biologis personal (*Personal Baseline*). |
| **E** | **Evolution** | Mendukung evolusi gaya hidup sehat yang bertahap, realistis, dan berkesinambungan. |
| **V** | **Vitality** | Menjaga kebugaran metabolik, ritme sirkadian, serta keseimbangan hormonal jangka panjang. |
| **Y** | **Your** | Pendekatan terpersonalisasi penuh pada keunikan data biologis individu, bukan norma populasi generik. |
| **R** | **Recognition** | Pengenalan dini pergeseran pola perilaku metabolik serta deteksi cerdas nutrisi pangan. |
| **A** | **Action** | Mendorong aksi nyata melalui komitmen mikro-kebiasaan (*micro-habits*) dan intervensi terpandu. |

---

## Latar Belakang

Sebagian besar aplikasi kesehatan menilai pengguna dengan ambang batas populasi yang statis, misalnya 10.000 langkah atau 8 jam tidur untuk semua orang. Pendekatan ini sering memicu peringatan palsu dan justru melewatkan perubahan halus yang penting bagi individu.

AEVYRA mengambil pendekatan berbeda. Sistem membangun **Personal Baseline** dari jendela bergulir 14 hari data objektif milik pengguna sendiri, lalu membandingkan kondisi terkini terhadap pola normal orang tersebut. Ketika terjadi deviasi yang persisten, pengguna menerima wawasan yang transparan beserta data pendukungnya, rekomendasi kebiasaan mikro yang mudah dijalankan, dan jalur langsung ke instruktur kesehatan berlisensi.

Platform ini bersifat **non-diagnostik**. AEVYRA tidak pernah memberikan vonis penyakit maupun resep obat.

---

## Fitur dan Urgensi Masalah

AEVYRA dibangun sebagai platform Website (Progressive Web App) HealthCheck terpadu yang memadukan tiga peran pengguna: **Admin**, **Instruktur**, dan **Member**. Seluruh fitur dikembangkan untuk menjawab urgensi permasalahan kesehatan nyata:

### 1. Scanner Open Cam (Makanan, Minuman, Kesehatan, Obat)
- **Fungsi:** Pemindaian kamera langsung untuk mendeteksi makanan, minuman, parameter kesehatan fisik, serta kemasan obat BPOM.
- **Urgensi:** Mempercepat dan mempermudah pengguna memahami kandungan gizi dan obat tanpa perlu riset manual. Hal ini sangat penting karena tingkat literasi membaca label pangan dan obat kemasan di masyarakat masih rendah.

### 2. Konsultasi Chat (AI & Instruktur)
- **Fungsi:** Dialog kesehatan terpadu melalui edukasi asisten AI preventif dan sesi percakapan bimbingan langsung dengan instruktur klinis.
- **Urgensi:** Menjawab kebutuhan konsultasi cepat tanpa antre atau birokrasi rumah sakit, terutama untuk pertanyaan gaya hidup dan keluhan non-akut yang tidak memerlukan tatap muka langsung.

### 3. Riwayat & Tracker Kesehatan Pribadi
- **Fungsi:** Pencatatan metrik harian berkelanjutan yang dipetakan secara objektif terhadap garis acuan personal 14 hari.
- **Urgensi:** Pengguna sering kali tidak menyadari bahwa pola makan atau kebiasaan tidurnya memburuk karena tidak adanya pencatatan rutin. Fitur ini memungkinkan anomali kesehatan terdeteksi jauh lebih dini.

### 4. Rekomendasi Personal Berbasis Profil
- **Fungsi:** Kurasi rekomendasi kebiasaan mikro adaptif yang disesuaikan dengan profil biologis, riwayat biomarker, dan preferensi unik pengguna.
- **Urgensi:** Kondisi kesehatan setiap orang berbeda (seperti riwayat alergi, pra-diabetes, atau pola kerja). Rekomendasi generik berpotensi salah sasaran atau bahkan berbahaya, sehingga personalisasi menjadi krusial demi keamanan pengguna.

### 5. Program Challenge Kesehatan
- **Fungsi:** Program tantangan kesehatan terjadwal dengan target tugas harian bertahap untuk pembentukan rutinitas baru.
- **Urgensi:** Tanpa target terstruktur, masyarakat kesulitan menjaga konsistensi pola hidup sehat. Program dengan jadwal yang jelas meningkatkan tingkat keberhasilan perubahan perilaku jangka panjang.

### 6. Booking Konsultasi Terjadwal
- **Fungsi:** Penjadwalan janji temu telekonsultasi resmi bersama dokter spesialis dan instruktur kesehatan bersertifikasi.
- **Urgensi:** Memberikan kepastian waktu dan akses langsung ke tenaga ahli sungguhan, menumbuhkan kepercayaan klinis yang lebih tinggi dibandingkan hanya mengandalkan interaksi AI.

### 7. Komunitas / Forum Diskusi
- **Fungsi:** Wadah diskusi antar-pengguna dengan alur interaksi terarah, opsi pelaporan konten, dan moderasi admin.
- **Urgensi:** Dukungan sosial terbukti secara empiris meningkatkan motivasi menjaga kesehatan, memastikan pengguna merasa didampingi dan tidak berjuang sendirian.

### 8. Badge & Gamifikasi
- **Fungsi:** Sistem perolehan poin keaktifan, pencatatan konsisten (*daily streak*), lencana pencapaian, serta modul visual novel Metabolic Arcade.
- **Urgensi:** Menjawab permasalahan rendahnya retensi pada aplikasi kesehatan digital, di mana banyak aplikasi dihapus setelah beberapa hari pemakaian karena ketiadaan motivasi untuk kembali mencatat.

### 9. Laporan untuk Instruktur & Admin
- **Fungsi:** Dasbor visualisasi perkembangan kesehatan binaan bagi instruktur, serta ringkasan kepatuhan dan analitik sistem bagi admin.
- **Urgensi:** Instruktur memerlukan data objektif historis untuk memberikan bimbingan yang tepat sasaran dan bukan sekadar perkiraan. Admin membutuhkan wawasan operasional untuk menjaga mutu platform.

### 10. Tingkatan Member (Silver, Gold, Platinum)
- **Fungsi:** Struktur keanggotaan berjenjang yang mengatur batas kuota pemindai OCR, sesi konsultasi spesialis, dan hak akses fitur premium.
- **Urgensi:** Mendorong loyalitas dan keberlanjutan pemakaian jangka panjang, sekaligus membuka peluang monetisasi berkelanjutan melalui model freemium yang transparan.

### 11. Telepon Ambulans Berbasis Lokasi (Short)
- **Fungsi:** Panggilan darurat ambulans 119/112 instan beserta pemetaan direktori IGD dan rumah sakit rujukan terdekat dari posisi perangkat.
- **Urgensi:** Dalam kondisi gawat darurat medis, setiap detik sangat berharga. Fitur ini memangkas waktu pencarian kontak darurat yang sering memakan waktu dan memicu kepanikan di saat krisis.

---

## Ringkasan Fitur Teknis

### Pemantauan dan Wawasan

| Fitur | Deskripsi |
| :--- | :--- |
| Personal Baseline Tracker | Visualisasi metrik harian terhadap garis acuan personal 14 hari untuk tidur, hidrasi, aktivitas, dan glukosa. |
| Quick Health Log | Pencatatan metrik dalam satu ketukan yang otomatis dinormalisasi ke satuan kanonikal dan dinilai kualitas datanya. |
| Behavioral Insights | Kartu wawasan yang menampilkan nilai baseline, nilai saat ini, selisih, serta alasan mengapa perubahan tersebut penting. |
| Micro-Habit Recommendations | Rekomendasi kebiasaan bertingkat kesulitan rendah yang dapat diaktifkan langsung oleh member. |
| Unified Health Timeline | Linimasa kronologis yang menyatukan catatan metrik, sinyal perilaku, dan status intervensi. |

### Pemindai Nutrisi dan Obat

| Fitur | Deskripsi |
| :--- | :--- |
| Live Camera Scanner | Pemindaian makanan, minuman, dan kemasan obat langsung dari kamera perangkat. |
| OCR Label Gizi | Ekstraksi teks label menggunakan Tesseract.js di sisi klien, kemudian diurai menjadi data gizi terstruktur. |
| Food Vision Recognition | Pengenalan jenis makanan dengan basis data gizi yang mengacu pada Tabel Komposisi Pangan Indonesia. |
| Proyeksi Beban Glikemik | Estimasi indeks glikemik, beban glikemik, dan kurva respons glukosa dua jam setelah makan. |

### Kesehatan Spesifik

| Fitur | Deskripsi |
| :--- | :--- |
| Gender Vitality | Modul kesehatan yang menyesuaikan konteks biologis pengguna, termasuk skrining dan pencatatan metrik vitalitas. |
| Menstrual Tracker | Pencatatan siklus menstruasi, pengaturan siklus personal, dan ringkasan fase untuk konteks metabolik. |

### Konsultasi dan Pendampingan

| Fitur | Deskripsi |
| :--- | :--- |
| Direktori Instruktur | Daftar dokter dan instruktur terverifikasi lengkap dengan spesialisasi, nomor STR/SIP, dan institusi. |
| Consultations Hub | Pemesanan sesi, riwayat konsultasi, pembatalan, dan percakapan langsung dengan instruktur. |
| Kuota Konsultasi | Pembatasan sesi bulanan otomatis sesuai paket keanggotaan yang aktif. |

### Komunitas dan Gamifikasi

| Fitur | Deskripsi |
| :--- | :--- |
| Komunitas | Forum diskusi dengan unggahan, komentar, reaksi, pelaporan, dan moderasi oleh admin. |
| Challenges | Program tantangan kesehatan dengan tugas harian, progres partisipasi, dan pencapaian. |
| Poin dan Streak | Buku besar poin aktivitas serta penghitung konsistensi pencatatan harian. |
| Metabolic Arcade | Permainan edukasi berbentuk visual novel interaktif tentang kesehatan metabolik, lengkap dengan papan peringkat. |

### Platform

| Fitur | Deskripsi |
| :--- | :--- |
| Progressive Web App | Dapat dipasang di perangkat, dilengkapi service worker dan halaman luring. |
| Google Sign-In | Masuk dan menautkan akun menggunakan Google OAuth. |
| Pembayaran Midtrans | Checkout paket keanggotaan melalui Midtrans Snap, verifikasi status, serta penjadwalan downgrade. |
| Notifikasi | Pusat notifikasi per pengguna dan siaran notifikasi massal oleh admin. |

---

## Peran Pengguna

Akses dikendalikan melalui Role-Based Access Control dengan middleware `EnsureUserHasRole`. Instruktur juga melalui proses verifikasi oleh admin sebelum dapat mengakses ruang kerjanya (`EnsureInstructorIsVerified`).

| Peran | Dashboard | Kapabilitas Utama |
| :--- | :--- | :--- |
| Member | `/member/dashboard` | Memantau baseline personal, mencatat metrik harian, memindai makanan dan obat, menerima wawasan dan rekomendasi, berkonsultasi dengan instruktur, mengikuti tantangan dan komunitas, serta mengakses tombol darurat 119. |
| Instruktur | `/instructor/dashboard` | Meninjau daftar member binaan berdasarkan prioritas sinyal, melihat detail riwayat kesehatan member, menyusun rencana intervensi, mengelola jadwal dan percakapan konsultasi, serta menyusun laporan. |
| Admin | `/admin/dashboard` | Mengelola pengguna dan peran, memverifikasi instruktur, mengatur paket dan langganan, memoderasi komunitas, mengelola program dan tantangan, menyiarkan notifikasi, meninjau jejak audit, serta mengatur konfigurasi sistem. |

### Halaman Publik

| Rute | Keterangan |
| :--- | :--- |
| `/` | Halaman utama |
| `/paket` | Perbandingan paket keanggotaan |
| `/faq` | Pertanyaan yang sering diajukan |
| `/arcade` | Metabolic Arcade |
| `/privacy`, `/terms` | Kebijakan privasi dan syarat layanan |
| `/demo/*` | Pratinjau interaktif fitur: scanner, tracker, konsultasi, tantangan, komunitas, gender vitality, dan darurat |

---

## Health Behavior Engine

Health Behavior Engine adalah mesin komputasi deterministik yang berada di namespace `App\Services\HealthBehaviorEngine`. Setiap tahap dirancang modular dan dapat diuji secara terpisah.

```
Health Record
     |
     v
DataNormalizer  -->  DataQualityEvaluator  -->  BaselineBuilder
                                                      |
                                                      v
SignalQualifier  <--  ChangeDetector  <--  FeatureExtractor
     |
     v
InsightGenerator  -->  Recommendation  -->  OutcomeEvaluator
```

| Tahap | Tanggung Jawab |
| :--- | :--- |
| `DataNormalizerService` | Mengonversi satuan mentah ke representasi kanonikal, misalnya jam menjadi menit, gelas atau liter menjadi mililiter, dan mmol/L menjadi mg/dL. |
| `DataQualityEvaluatorService` | Memeriksa kewajaran biologis, menolak tanggal di masa depan, membobot sumber data, dan menghitung Data Quality Score antara 0 dan 1. |
| `BaselineBuilderService` | Menghitung statistik bergulir 14 hari (mean, median, simpangan baku, IQR). Status berubah dari `COLLECTING` menjadi `AVAILABLE` setelah data mencukupi. |
| `FeatureExtractorService` | Mengekstraksi fitur jendela pendek: rata-rata, variabilitas, rasio konsistensi, kemiringan tren, dan selisih deviasi. |
| `ChangeDetectorService` | Mengukur besar pergeseran berdasarkan rasio deviasi terhadap simpangan baku ke dalam kategori `NEGLIGIBLE`, `SMALL`, `MODERATE`, atau `LARGE`. |
| `SignalQualifierService` | Mengkualifikasi sinyal persisten seperti `SLEEP_DECLINE`, `ACTIVITY_DROP`, dan `WATER_DEFICIT` dengan skor prioritas 0 sampai 100 beserta data bukti. |
| `InsightGeneratorService` | Menyusun kartu wawasan non-diagnostik dengan perbandingan eksplisit antara nilai baseline, nilai saat ini, dan selisihnya. |
| `RecommendationService` | Memetakan wawasan menjadi rekomendasi kebiasaan mikro yang terkalibrasi tingkat kesulitannya. |
| `OutcomeEvaluatorService` | Membandingkan tren sebelum dan sesudah intervensi untuk mengukur keberhasilan perubahan perilaku. |

---

## Asisten AI dan Pengaman Klinis

Asisten AI dirancang terpisah dari logika inti melalui `AiDriverInterface`, dengan rantai failover berlapis agar layanan tetap tersedia meskipun salah satu penyedia gagal atau mencapai batas kuota.

| Urutan | Driver | Keterangan |
| :--- | :--- | :--- |
| 1 | `GeminiAiDriver` | Penyedia utama menggunakan Google Gemini. |
| 2 | `GroqAiDriver` | Penyedia cadangan berkecepatan tinggi, juga digunakan untuk mengurai hasil OCR label gizi. |
| 3 | `CloudflareAiDriver` | Penyedia cadangan ketiga melalui Cloudflare Workers AI. |
| 4 | `FallbackAiDriver` | Mesin aturan lokal yang selalu aktif tanpa API key, menjamin aplikasi tetap berjalan. |

Setiap penyedia dibatasi oleh `AiRateLimiter` per menit dan per hari sesuai nilai yang dikonfigurasi pada `.env`.

Sebelum pesan diteruskan ke model mana pun, `ClinicalSafetyGuardService` melakukan inspeksi terlebih dahulu:

| Pengaman | Perilaku |
| :--- | :--- |
| `DIAGNOSTIC_VERDICT_REFUSAL` | Menolak permintaan diagnosis penyakit secara aman. |
| `MEDICATION_DOSING_REFUSAL` | Menolak permintaan resep, dosis, atau perubahan regimen obat. |
| `PROMPT_INJECTION_DEFENSE` | Menangkal upaya jailbreak dan instruksi untuk mengabaikan batasan etika. |
| `ACUTE_EMERGENCY_REDIRECTION` | Mendeteksi keluhan akut kritis seperti nyeri dada hebat atau sesak napas berat, lalu menghentikan dialog dan mengarahkan pengguna ke 119. |

Setiap pemicu pengaman dicatat ke tabel `ai_safety_events` untuk keperluan audit.

---

## Protokol Darurat 119

Fitur darurat dikelola oleh `EmergencyService` dan sengaja dibuat **tidak bergantung pada AI maupun penyedia eksternal**.

- Tombol SOS langsung menampilkan akses panggilan ke 119 (Layanan Gawat Darurat Kemenkes) dan 112 (Panggilan Darurat Terpadu).
- Direktori hotline IGD dan pencarian rumah sakit terdekat dengan peta interaktif berbasis Leaflet.
- Setiap aktivasi dicatat ke `emergency_events` sebagai jejak audit, dengan lokasi yang hanya digunakan selama sesi darurat berlangsung.

---

## Paket Keanggotaan

Paket dikelola secara dinamis oleh admin. Nilai bawaan dari seeder adalah sebagai berikut.

| Paket | Harga | Konsultasi per Bulan | Pemindai | Ringkasan |
| :--- | :--- | :--- | :--- | :--- |
| Gratis (Basic) | Rp0, seumur hidup | Tidak termasuk | 10 kali per hari | Pemantauan baseline dasar, asisten AI edukasi, komunitas, dan akses darurat 119. |
| Gold Preventif | Rp49.000 per bulan | 2 sesi | Tanpa batas | Prediksi lonjakan glikemik, rencana intervensi gizi mingguan, program tantangan remisi, dan laporan bulanan. |
| Platinum Concierge | Rp149.000 per bulan | 6 sesi | Tanpa batas | Jalur prioritas dokter spesialis, analisis hasil laboratorium, personal health coach, dan hotline medis prioritas. |

Biaya administrasi sebesar Rp4.000 berlaku untuk paket berbayar.

---

## Teknologi

| Lapisan | Teknologi |
| :--- | :--- |
| Backend | Laravel 12, PHP 8.2+, Laravel Socialite |
| Frontend | React 19, Inertia.js, Tailwind CSS 4, Vite 7 |
| Basis Data | MySQL atau MariaDB |
| AI dan Visi | Google Gemini, Groq, Cloudflare Workers AI, Tesseract.js |
| Pembayaran | Midtrans Snap |
| Peta | Leaflet |
| PWA | ladumor/laravel-pwa, service worker kustom |
| Pengujian | PHPUnit 11 |

---

## Struktur Proyek

```
kadar/
├── app/
│   ├── Enums/                      Status baseline, jenis metrik, tingkat sinyal, peran
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              Tata kelola, pengguna, program, tantangan, laporan, audit
│   │   │   ├── Auth/               Login, registrasi, Google OAuth
│   │   │   ├── Instructor/         Caseload, konsultasi, intervensi, profil, laporan
│   │   │   ├── Member/             Dashboard, tracker, scanner, konsultasi, komunitas, darurat
│   │   │   └── Payment/            Integrasi Midtrans
│   │   └── Middleware/             RBAC, verifikasi instruktur, shared props Inertia
│   ├── Models/                     47 model Eloquent
│   └── Services/
│       ├── Ai/                     Asisten AI, driver, rate limiter, food vision
│       ├── HealthBehaviorEngine/   9 tahap komputasi HBE
│       ├── Membership/             Kuota konsultasi
│       ├── Ocr/                    Penguraian label gizi
│       ├── Safety/                 Pengaman klinis dan protokol darurat
│       └── MidtransService.php
├── database/
│   ├── migrations/                 20 migrasi skema
│   └── seeders/                    Peran, paket, tantangan, akun demo, notifikasi
├── public/
│   ├── image/                      Aset gambar dan logo
│   ├── manifest.json               Manifest PWA
│   ├── sw.js                       Service worker
│   └── offline.html                Halaman luring
├── resources/
│   ├── css/app.css                 Design token Tailwind
│   ├── views/                      Root template Inertia dan halaman error
│   └── js/
│       ├── Components/             Komponen fitur, Sidebar, UI, Admin
│       ├── Layouts/                App, Admin, Instructor, Auth, Marketing
│       └── Pages/                  Admin, Auth, Demo, Instructor, Member, Notifications, publik
├── routes/web.php                  Rute publik dan rute terproteksi per peran
└── tests/
    ├── Feature/                    Autentikasi, HBE, komunitas, notifikasi
    └── Unit/                       Normalizer, quality evaluator, safety guard
```

---

## Instalasi

### Prasyarat

- PHP 8.2 atau lebih baru dengan ekstensi `pdo_mysql`, `mbstring`, `curl`, dan `xml`
- Composer 2
- Node.js 20 atau lebih baru beserta NPM
- MySQL 8 atau MariaDB (Laragon atau XAMPP dapat digunakan)

### Langkah Instalasi

1. Kloning repositori dan pasang dependensi.

   ```bash
   git clone <repository-url> kadar
   cd kadar
   composer install
   npm install
   ```

2. Siapkan berkas lingkungan.

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. Buat basis data `kadar`, lalu sesuaikan koneksi pada `.env` (lihat bagian berikutnya).

4. Jalankan migrasi beserta data demo.

   ```bash
   php artisan migrate:fresh --seed
   ```

5. Hubungkan direktori penyimpanan publik.

   ```bash
   php artisan storage:link
   ```

6. Jalankan aplikasi.

   ```bash
   composer dev
   ```

   Perintah ini menjalankan server Laravel, queue worker, dan Vite secara bersamaan. Aplikasi dapat diakses di `http://127.0.0.1:8000`.

   Untuk build produksi, gunakan `npm run build`.

---

## Konfigurasi Lingkungan

### Basis Data

`.env.example` bawaan menggunakan SQLite. Untuk MySQL, ubah menjadi:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kadar
DB_USERNAME=root
DB_PASSWORD=
```

### Layanan Opsional

Seluruh layanan berikut bersifat opsional. Tanpa konfigurasi apa pun, asisten AI tetap berjalan menggunakan `FallbackAiDriver`.

```env
# Asisten AI
GEMINI_API_KEY=
GROQ_API_KEY=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=

# Pembayaran
MIDTRANS_MERCHANT_ID=
MIDTRANS_CLIENT_KEY=
MIDTRANS_SERVER_KEY=
MIDTRANS_IS_PRODUCTION=false

# Google Sign-In
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=${APP_URL}/auth/google/callback
```

Model dan batas kuota setiap penyedia AI dapat diatur melalui variabel seperti `GEMINI_MODEL`, `GEMINI_RPM_LIMIT`, `GEMINI_RPD_LIMIT`, serta padanannya untuk Groq dan Cloudflare. Daftar lengkap tersedia di `config/services.php`.

---

## Akun Demo

Seeder mengisi basis data dengan skenario klinis yang realistis. Seluruh akun menggunakan kata sandi `password`.

| Peran | Email | Profil |
| :--- | :--- | :--- |
| Admin | `admin@aevyra.health` | Administrator AEVYRA dengan akses penuh ke konsol tata kelola. |
| Instruktur | `instruktur@aevyra.health` | dr. Nabila Sarah, Sp.GK. Instruktur pendamping utama bagi member demo. |
| Member | `member@aevyra.health` | Reza Rahardian, member paket Gold. Lihat skenario di bawah. |

Instruktur terverifikasi tambahan:

| Email | Nama | Spesialisasi |
| :--- | :--- | :--- |
| `bramantyo@aevyra.health` | dr. H. Bramantyo, Sp.PD, K-EMD, FINASIM | Penyakit Dalam dan Endokrinologi |
| `sarah.nindya@aevyra.health` | dr. Sarah Nindya, M.Gizi, Sp.GK, AIFO-K | Gizi Klinis |
| `rayhan.pratama@aevyra.health` | dr. Rayhan Pratama, Sp.JP, FIHA | Kardiologi Preventif |
| `nadia.salsabila@aevyra.health` | dr. Nadia Salsabila, Sp.OG, Subsp.FER | Obstetri dan Ginekologi |

### Skenario Member Demo

- Riwayat pencatatan tidur dan hidrasi selama 18 hari.
- Baseline tidur 14 hari yang stabil di angka 7 jam 15 menit.
- Penurunan tidur selama 4 hari terakhir dengan rata-rata 5 jam 42 menit.
- Sinyal `SLEEP_DECLINE` terkualifikasi dengan skor prioritas 78,5.
- Kartu wawasan aktif yang membandingkan baseline dan kondisi terkini.
- Dua rekomendasi aktif: Digital Sunset 45 menit sebelum tidur dan jadwal evaluasi dengan instruktur.
- Streak pencatatan 5 hari (rekor 14 hari) dengan total 170 poin.

---

## Pengujian

```bash
php artisan test
```

Hasil terakhir: **26 test lulus dengan 145 assertion.**

| Suite | Cakupan |
| :--- | :--- |
| `Unit\ClinicalSafetyGuardServiceTest` | Penolakan diagnosis dan dosis obat, pertahanan prompt injection, deteksi keadaan darurat akut. |
| `Unit\DataNormalizerServiceTest` | Konversi satuan tidur dan asupan air ke bentuk kanonikal. |
| `Unit\DataQualityEvaluatorServiceTest` | Validasi batas biologis dan penolakan tanggal di masa depan. |
| `Feature\HealthBehaviorEngineTest` | Perhitungan baseline 14 hari, kualifikasi sinyal deviasi, dan independensi layanan darurat dari AI. |
| `Feature\AuthTest` | Tampilan login dan registrasi serta proses autentikasi. |
| `Feature\CommunityE2ETest` | Alur komunitas menyeluruh antara member dan admin. |
| `Feature\NotificationTest` | Isolasi notifikasi per pengguna, penandaan telah dibaca, penghapusan, dan shared props untuk semua peran. |

---

## Identitas Visual

Design token didefinisikan pada `resources/css/app.css` menggunakan direktif `@theme` Tailwind CSS 4.

| Token | Nilai | Penggunaan |
| :--- | :--- | :--- |
| Primary | `#00433e` | Warna merek utama, deep clinical teal |
| Secondary | `#835500` / `#feb958` | Aksen panduan dan sorotan |
| Tertiary | `#701d11` | Aksen peringatan dan darurat |
| Surface | `#f3fbf6` | Latar belakang netral |
| Error | `#ba1a1a` | Status galat |

| Peran Tipografi | Jenis Huruf |
| :--- | :--- |
| Judul dan tampilan | Newsreader |
| Antarmuka dan teks | IBM Plex Sans |
| Data dan angka | IBM Plex Mono |

---

## Privasi dan Keamanan Data

- **Anonimisasi jejak audit.** Alamat IP pada log audit disimpan sebagai hash SHA-256 satu arah sehingga tidak dapat dikembalikan ke nilai aslinya.
- **Minimisasi data lokasi.** Koordinat perangkat hanya digunakan saat fitur darurat diaktifkan dan tidak disimpan sebagai riwayat perjalanan.
- **Otorisasi berbasis penugasan.** Instruktur hanya dapat mengakses data kesehatan member yang secara aktif ditugaskan kepadanya.
- **Audit perubahan data kesehatan.** Setiap perubahan catatan kesehatan direkam pada tabel audit tersendiri.
- **Batasan non-diagnostik.** Seluruh keluaran sistem bersifat edukatif dan preventif, bukan pengganti pemeriksaan tenaga medis.

---

## Lisensi

Hak Cipta © 2026 AEVYRA. Seluruh hak cipta dilindungi.

Dikembangkan untuk menghadirkan pemantauan kesehatan preventif yang aman, berbasis bukti, dan bermanfaat bagi masyarakat.
