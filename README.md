<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>
# Kadar (AEVYRA) — Personal Preventive Health & Early Intervention Platform

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>
[![Laravel 12](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Inertia.js v2](https://img.shields.io/badge/Inertia.js-v2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PHP 8.2+](https://img.shields.io/badge/PHP-8.2%2B-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Tests Passing](https://img.shields.io/badge/Tests-19%20Passed-success?style=for-the-badge&logo=githubactions&logoColor=white)]()
[![Compliance](https://img.shields.io/badge/Compliance-UU%20PDP%20No.%2027%2F2022-00433e?style=for-the-badge)]()

## About Laravel
> **Platform PWA cerdas untuk pemantauan garis acuan biologis personal (*Personal Baseline*), deteksi dini pergeseran perilaku gaya hidup (*Health Behavior Engine*), bimbingan tenaga ahli terverifikasi, dan tanggap darurat medis SPGDT 119 mandiri.**

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:
---

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).
## 📌 Daftar Isi
1. [Tentang Platform & Visi](#-tentang-platform--visi)
2. [Arsitektur Inti: Health Behavior Engine (HBE)](#-arsitektur-inti-health-behavior-engine-hbe)
3. [Kerangka Keselamatan Klinis & Panggilan Darurat](#-kerangka-keselamatan-klinis--panggilan-darurat)
4. [Asisten AI Gaya Hidup (Gemini & Fallback Engine)](#-asisten-ai-gaya-hidup-gemini--fallback-engine)
5. [3 Peran Pengguna (Multi-Role RBAC)](#-3-peran-pengguna-multi-role-rbac)
6. [Akun & Kredensial Demo Siap Pakai](#-akun--kredensial-demo-siap-pakai)
7. [Fitur-Fitur Unggulan Sistem](#-fitur-fitur-unggulan-sistem)
8. [Struktur Proyek & Modul Arsitektur](#-struktur-proyek--modul-arsitektur)
9. [Panduan Instalasi & Menjalankan Aplikasi](#-panduan-instalasi--menjalankan-aplikasi)
10. [Verifikasi Pengujian Otomatis (Testing)](#-verifikasi-pengujian-otomatis-testing)
11. [Design Tokens & Identitas Visual](#-design-tokens--identitas-visual)
12. [Kepatuhan Regulasi & Perlindungan Data (UU PDP)](#-kepatuhan-regulasi--perlindungan-data-uu-pdp)

Laravel is accessible, powerful, and provides tools required for large, robust applications.
---

## Learning Laravel
## 📖 Tentang Platform & Visi

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.
Mayoritas aplikasi kesehatan konvensional mengandalkan ambang batas populasi umum statis (misal: semua orang harus 10.000 langkah atau 8 jam tidur) yang kerap memicu alarm palsu atau mengabaikan deviasi halus pada individu. 

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.
**Kadar (AEVYRA)** hadir sebagai platform kesehatan preventif berbasis perilaku dan intervensi dini yang membangun **Garis Acuan Personal (*Personal Baseline*)** berbasis jendela bergulir 14-hari data objektif pengguna. Melalui pendekatan non-diagnostik, Kadar mendeteksi pergeseran ritme biologis lebih awal, menyajikan wawasan empati yang didukung data bukti, serta menghubungkan pengguna dengan instruktur kesehatan berlisensi dan layanan ambulans gawat darurat nasional (SPGDT 119).

## Laravel Sponsors
---

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).
## 🧠 Arsitektur Inti: Health Behavior Engine (HBE)

### Premium Partners
Health Behavior Engine (HBE) adalah mesin komputasi deterministik modular di namespace `App\Services\HealthBehaviorEngine`:

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**
```
┌─────────────────┐     ┌───────────────────────┐     ┌──────────────────────┐
│  Health Record  │ ──> │ DataNormalizerService │ ──> │ DataQualityEvaluator │
│  (Input Mentah) │     │ (Konversi Kanonikal)  │     │ (Validasi & DQS)     │
└─────────────────┘     └───────────────────────┘     └──────────────────────┘
                                                                 │
                                                                 ▼
┌──────────────────────┐     ┌────────────────────────┐     ┌──────────────────────┐
│ SignalQualifier      │ <── │ ChangeDetectorService  │ <── │ BaselineBuilder      │
│ (Severity & Triase)  │     │ (Rasio Sigma & Arah)   │     │ (14-Hari Rolling)    │
└──────────────────────┘     └────────────────────────┘     └──────────────────────┘
          │
          ▼
┌──────────────────────┐     ┌────────────────────────┐     ┌──────────────────────┐
│ InsightGenerator     │ ──> │ RecommendationService  │ ──> │ OutcomeEvaluator     │
│ (Wawasan Komparasi)  │     │ (Mikro-Kebiasaan)      │     │ (Evaluasi Intervensi)│
└──────────────────────┘     └────────────────────────┘     └──────────────────────┘
```

## Contributing
1. **`DataNormalizerService`**: Menormalisasi unit input mentah ke representasi kanonikal standar (contoh: jam/detik $\rightarrow$ menit, gelas/botol/liter $\rightarrow$ ml, mmol/L $\rightarrow$ mg/dL).
2. **`DataQualityEvaluatorService`**: Evaluasi kewajaran biologis, pengecekan tanggal masa depan, pembobotan sumber data, dan kalkulasi skor komposit **DQS (*Data Quality Score*)** $0.0 - 1.0$.
3. **`BaselineBuilderService`**: Menghitung rata-rata bergulir 14-hari (*Mean, Median, Standard Deviation, IQR*). Status otomatis bertransisi dari `COLLECTING` (<7 hari) menjadi `AVAILABLE` ($\ge 7-14$ hari).
4. **`FeatureExtractorService`**: Ekstraksi vektor fitur 5-hari: Rata-rata, Variabilitas, Rasio Konsistensi, Kemiringan Regresi Linear, dan Selisih Deviasi.
5. **`ChangeDetectorService`**: Menghitung magnitudo pergeseran berdasarkan rasio deviasi terhadap standar deviasi ($\sigma$-ratio) ke dalam kategori `NEGLIGIBLE`, `SMALL`, `MODERATE`, atau `LARGE`.
6. **`SignalQualifierService`**: Mengkualifikasi sinyal anomali persisten (`SLEEP_DECLINE`, `ACTIVITY_DROP`, `WATER_DEFICIT`, dll) dengan skor prioritas triase $0 - 100$ dan asosiasi data bukti pendukung.
7. **`InsightGeneratorService`**: Menyusun kartu wawasan empati non-diagnostik disertai perbandingan eksplisit: `baseline_value`, `current_value`, dan `difference_value`.
8. **`RecommendationService`**: Memetakan wawasan ke dalam rekomendasi mikro-kebiasaan bertingkat kesulitan rendah (*low-friction micro-habits*) yang dapat diaktifkan member dengan 1 ketukan.
9. **`OutcomeEvaluatorService`**: Mengevaluasi tren pra- vs. pasca-intervensi untuk mengukur keberhasilan perubahan perilaku.

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).
---

## Code of Conduct
## 🛡️ Kerangka Keselamatan Klinis & Panggilan Darurat

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).
Platform Kadar menerapkan pembatas keselamatan berlapis (*clinical guardrails*) sesuai standar etika medis:

## Security Vulnerabilities
### 1. Pembatas Keselamatan Klinis (`ClinicalSafetyGuardService`)
- **Penolakan Vonis Diagnosis**: Sistem tidak pernah memberikan diagnosa penyakit medis. Permintaan diagnosis otomatis ditolak secara aman (`DIAGNOSTIC_VERDICT_REFUSAL`).
- **Pelarangan Dosis Obat & Farmakoterapi**: Dilarang keras meresepkan, menyarankan penyesuaian dosis obat, atau mengubah rejimen farmakoterapi (`MEDICATION_DOSING_REFUSAL`).
- **Pencegahan Injeksi Prompt**: Pertahanan terhadap teknik *jailbreak* atau instruksi pengabaian batasan etika (`PROMPT_INJECTION_DEFENSE`).
- **Redireksi Darurat Otomatis**: Mendeteksi keluhan akut kritis (nyeri dada hebat, sesak napas berat, bibir membiru, hilang kesadaran) dan seketika menghentikan dialog AI untuk mengarahkan ke 119 (`ACUTE_EMERGENCY_REDIRECTION`).

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.
### 2. Kedaulatan Protokol Darurat 119 (`EmergencyService`)
- **100% Independen dari AI**: Tombol darurat **SOS 119** merespons instan (< 200ms) tanpa menunggu respon LLM atau jaringan eksternal.
- **Integrasi SPGDT Nasional**: Menghubungkan langsung ke Panggilan Darurat Medis **119** (Kemenkes RI), Panggilan Darurat Terpadu **112**, serta direktori hotline IGD 24 Jam rumah sakit rujukan.
- **Pencatatan Audit Medis**: Setiap aktivasi tombol darurat mencatat log kejadian forensik (`emergency_events`) dengan izin lokasi yang diproses secara aman.

## License
---

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
## 🤖 Asisten AI Gaya Hidup (Gemini & Fallback Engine)

Arsitektur AI Kadar dirancang terisolasi (*decoupled*) melalui `AiDriverInterface`:
- **`FallbackAiDriver`**: Driver bawaan aktif tanpa perlu API key. Beroperasi secara cerdas dengan aturan preventif gaya hidup lokal, menjamin aplikasi tidak pernah crash atau terhambat saat evaluasi awal.
- **`GeminiAiDriver`**: Driver Google Gemini 2.5/Flash yang siap digunakan. Begitu parameter `GEMINI_API_KEY` diisi pada file `.env`, sistem akan otomatis mengalihkan inferensi ke Gemini AI dengan pengawalan ketat guardrail klinis.

---

## 👥 3 Peran Pengguna (Multi-Role RBAC)

| Peran | Akses Dashboard | Kapabilitas Utama |
| :--- | :--- | :--- |
| **Member** | `/member/dashboard` | Pantau status baseline personal (Tidur, Air, Langkah, Glukosa), catat metrik harian 1-tap, feed kronologis timeline kesehatan, terima rekomendasi kebiasaan mikro, tantangan gamifikasi, dan tombol SOS 119. |
| **Instruktur** | `/instructor/dashboard` | Tinjau caseload member bimbingan, pantau triase sinyal HBE aktif berdasarkan skor urgensi, tugaskan rencana intervensi terstruktur, dan simpan rekam catatan konsultasi gaya hidup. |
| **Admin** | `/admin/dashboard` | Monitor KPI kepatuhan & stabilitas sistem, lihat log jejak audit forensik dengan hashing satu arah SHA-256 (UU PDP), serta kelola aktivasi/penangguhan akun pengguna. |

---

## 🔑 Akun & Kredensial Demo Siap Pakai

Database demo telah diisi dengan skenario klinis nyata (*seeders*). Semua akun menggunakan password: `password`.

| Peran | Email Login | Profil Skenario Demo |
| :--- | :--- | :--- |
| **Member** | `member@kadar.id` | **Reza Rahardian (Gold Member)**<br>• Memiliki riwayat log 18 hari.<br>• Baseline tidur stabil 14-hari: **7 jam 15 menit**.<br>• Skenario aktif: penurunan tidur 4 hari berturut-turut (**5 jam 42 menit**).<br>• Terdeteksi sinyal `SLEEP_DECLINE` (Prioritas 78.50) & wawasan komparasi.<br>• Rekomendasi aktif: *Digital Sunset 45 menit sebelum tidur*.<br>• Streak: 5 hari, Poin: 170. |
| **Instruktur** | `instruktur@kadar.id` | **Coach Nabila Sp.GK (Health Coach)**<br>• Membimbing member `member@kadar.id`.<br>• Memiliki akses caseload, evaluasi deviasi tidur member, penugasan intervensi, dan log konsultasi. |
| **Admin** | `admin@kadar.id` | **Dr. Budi Pratama (Super Admin)**<br>• Akses metrik platform, log forensik audit sistem, dan tata kelola direktori pengguna. |

---

## 🚀 Fitur-Fitur Unggulan Sistem

1. **Personal Baseline Tracker**: Memvisualisasikan perbandingan metrik harian vs. garis acuan personal stabil 14-hari (bukan norma populasi generik).
2. **Behavioral Shift Insights**: Narasi empati yang menjelaskan fakta deviasi, implikasi kesehatan, dan data bukti secara transparan.
3. **Low-Friction Recommendations**: Komitmen kebiasaan mikro terukur dengan tingkat kesulitan terkalibrasi.
4. **1-Tap Quick Health Logger**: Pencatatan cepat metrik harian yang otomatis dinormalisasi dan dievaluasi kualitas biologisnya (DQS).
5. **Unified Health Timeline**: Feed kronologis yang menyatukan entri catatan metrik, kualifikasi sinyal HBE, dan status intervensi.
6. **Instruktur Caseload Workspace**: Antarmuka bagi tenaga ahli untuk memantau anggota binaan berdasarkan prioritas deviasi perilaku.
7. **Forensic Audit Logs**: Jejak audit tamper-evident dengan anonimisir IP berbasis SHA-256 untuk kepatuhan perlindungan data pribadi.
8. **Gamifikasi Berkelanjutan**: Poin aktivitas, pencatatan konsisten harian (*daily streak*), dan tantangan komunitas berhadiah badge.

---

## 📁 Struktur Proyek & Modul Arsitektur

```plaintext
kadar/
├── app/
│   ├── Enums/                              # Enums domain (MetricType, BaselineStatus, SignalSeverity, dll.)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/AuthController.php     # Autentikasi multi-role & redirect terarah
│   │   │   ├── Member/                     # Onboarding, Dashboard, QuickLog, Timeline, Insight, Emergency, AiChat
│   │   │   ├── Instructor/                 # Caseload management & intervensi
│   │   │   └── Admin/                      # Governance console & audit forensik
│   │   └── Middleware/
│   │       ├── EnsureUserHasRole.php       # Proteksi RBAC berbasis role
│   │       └── HandleInertiaRequests.php   # Berbagi data auth, profil, dan pesan flash
│   ├── Models/                             # 28 Eloquent Models mencakup 11 layer data
│   └── Services/
│       ├── HealthBehaviorEngine/           # 9 Service inti komputasi HBE
│       ├── Safety/                         # Clinical safety guard & emergency 119
│       └── Ai/                             # AiAssistantService, GeminiDriver, FallbackDriver
├── database/
│   ├── migrations/                         # 11 Migrasi terstruktur mencakup seluruh skema
│   └── seeders/                            # Seeders demo (Roles, Tiers, Challenges, DemoUserSeeder)
├── resources/
│   ├── css/app.css                         # Tailwind CSS v4 Theme Tokens & palet warna
│   └── js/
│       ├── Components/                     # EmergencyModal, QuickLogModal, Navbar, dll.
│       ├── Layouts/                        # AppLayout, AuthLayout, MarketingLayout
│       └── Pages/
│           ├── Auth/                       # Login & Register
│           ├── Member/                     # Dashboard, Onboarding, Timeline
│           ├── Instructor/                 # Dashboard Caseload & MemberDetail
│           └── Admin/                      # Governance & Audit Log Dashboard
├── routes/web.php                          # Rute terproteksi middleware role
└── tests/
    ├── Feature/                            # HealthBehaviorEngineTest, AuthTest
    └── Unit/                               # Normalizer, QualityEvaluator, SafetyGuardTest
```

---

## ⚙️ Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat Sistem
- **PHP** $\ge$ 8.2 (dengan extension `pdo_mysql`, `mbstring`, `curl`, `xml`)
- **Composer** $\ge$ 2.x
- **Node.js** $\ge$ 20.x & **NPM**
- **MySQL / MariaDB** (dapat menggunakan Laragon atau XAMPP)

### 2. Kloning & Setup Proyek
```bash
git clone <repository-url> kadar
cd kadar
composer install
npm install
```

### 3. Konfigurasi Lingkungan (`.env`)
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
php artisan key:generate
```

Sesuaikan konfigurasi database MySQL pada file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kadar
DB_USERNAME=root
DB_PASSWORD=
```

*(Opsional)* Jika Anda telah memiliki API key Gemini:
```env
GEMINI_API_KEY=kunci_api_gemini_anda
```
*(Catatan: Jika dikosongkan, aplikasi secara otomatis menggunakan Fallback AI Engine tanpa kendala).*

### 4. Migrasi & Pengisian Data Demo (*Seeding*)
Jalankan migrasi bersih beserta seeders untuk mengisi akun demo dan riwayat baseline:
```bash
php artisan migrate:fresh --seed
```

### 5. Kompilasi Aset Frontend
```bash
# Untuk kompilasi aset produksi:
npm run build

# Atau untuk mode hot-reload pengembangan:
npm run dev
```

### 6. Menjalankan Server Aplikasi
```bash
php artisan serve
```
Akses aplikasi melalui peramban di: **`http://127.0.0.1:8000`**

---

## 🧪 Verifikasi Pengujian Otomatis (Testing)

Proyek ini dilengkapi dengan suite pengujian komprehensif yang menguji validasi batas biologis, konversi unit kanonikal, pertahanan keamanan klinis, alur kalkulasi HBE 14-hari, independensi darurat 119, dan otentikasi login:

Jalankan perintah pengujian:
```bash
php artisan test
```

### Hasil Pengujian Suite:
```text
   PASS  Tests\Unit\ClinicalSafetyGuardServiceTest
  ✓ allows safe lifestyle inquiry
  ✓ blocks medical diagnostic requests
  ✓ blocks medication dosing alterations
  ✓ intercepts acute medical emergency
  ✓ neutralizes prompt injection attempts

   PASS  Tests\Unit\DataNormalizerServiceTest
  ✓ normalizes sleep duration from hours to minutes
  ✓ normalizes water intake from glasses to ml
  ✓ normalizes water intake from liters to ml
  ✓ keeps canonical units unchanged

   PASS  Tests\Unit\DataQualityEvaluatorServiceTest
  ✓ accepts valid sleep duration within bounds
  ✓ rejects future timestamp
  ✓ flags out of biological bounds

   PASS  Tests\Unit\ExampleTest
  ✓ that true is true

   PASS  Tests\Feature\AuthTest
  ✓ login screen can be rendered
  ✓ register screen can be rendered
  ✓ users can authenticate using the login screen

   PASS  Tests\Feature\ExampleTest
  ✓ the application returns a successful response

   PASS  Tests\Feature\HealthBehaviorEngineTest
  ✓ hbe calculates 14 day baseline and qualifies deviation signal
  ✓ emergency service executes independently of ai

  Tests:    19 passed (53 assertions)
  Duration: 0.38s
```

---

## 🎨 Design Tokens & Identitas Visual

Aplikasi mengadopsi standar visual medis premium modern yang dikonfigurasi pada `resources/css/app.css`:

- **Primary Brand (Deep Clinical Teal):** `#00433e`
- **Surface Background (Soft Mint Neutral):** `#f3fbf6`
- **Secondary Accent (Amber/Gold Guidance):** `#835500` / `#feb958`
- **Emergency Accent (SOS 119 Red):** `#dc2626` / `#701d11`
- **Tipografi:**
  - *Display & Headlines:* `Newsreader, serif` (Kredibilitas klinis & kehangatan jurnal kesehatan)
  - *Antarmuka & Body Text:* `IBM Plex Sans, sans-serif` (Keterbacaan optimal)
  - *Data & Metrik Numerik:* `IBM Plex Mono, monospace` (Presisi data objektif)

---

## ⚖️ Kepatuhan Regulasi & Perlindungan Data (UU PDP)

Kadar dirancang dengan mematuhi prinsip perlindungan data pribadi sesuai **Undang-Undang No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)**:
1. **Anonimisir Data Jejak Audit**: Alamat IP pengguna pada jejak audit forensik disamarkan menggunakan fungsi hash satu arah SHA-256 (`ip_reference`), sehingga tidak dapat didekripsi balik.
2. **Prinsip Minimisir Data Lokasi**: Koordinat GPS perangkat hanya digunakan secara temporer saat panggilan darurat 119 diaktifkan pengguna, tanpa disimpan permanen sebagai riwayat perjalanan.
3. **Pemisahan Peran Tegas**: Hak akses riwayat kesehatan dibatasi secara ketat antar peran melalui kebijakan otorisasi berbasis relasi penugasan aktif (*assignment-based authorization*).

---

## 📄 Lisensi
Hak Cipta © 2026 **Kadar (AEVYRA) Protocol**. Seluruh hak cipta dilindungi undang-undang.
Dikembangkan untuk menghadirkan pemantauan kesehatan preventif mandiri yang aman, ilmiah, dan berdaya guna bagi masyarakat.
