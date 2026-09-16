# Kadar — Progressive Web App (PWA) Kesehatan & Preventif

> **Platform PWA Cerdas untuk Scan Nutrisi & Obat, Bimbingan Instruktur, Tracker Mandiri, dan Tanggap Darurat Ambulan Berbasis Lokasi.**

---

## 📌 Daftar Isi
- [Tentang Project](#-tentang-project)
- [3 Peran Pengguna (Roles)](#-3-peran-pengguna-roles)
- [11 Fitur Utama & Urgensi](#-11-fitur-utama--urgensi)
- [Tech Stack](#-tech-stack)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Panduan Instalasi & Menjalankan Project](#-panduan-instalasi--menjalankan-project)
- [Struktur Direktori](#-struktur-direktori)
- [Design System & Token Warna](#-design-system--token-warna)
- [Perintah Development yang Tersedia](#-perintah-development-yang-tersedia)

---

## 📖 Tentang Project

**Kadar** adalah platform kesehatan berbasis Progressive Web App (PWA) dan single-page application yang bertujuan mempermudah masyarakat memahami kandungan nutrisi pangan dan obat-obatan secara instan melalui kamera smartphone (*Open Cam Scanner*), memberikan pendampingan kesehatan berkelanjutan bersama instruktur dan AI, serta memfasilitasi panggilan darurat ambulan terdekat berbasis GPS.

---

## 👥 3 Peran Pengguna (Roles)

1. **Member (Pengguna / Pasien):**
   - Menggunakan pemindai *Open Cam Scanner* untuk pangan/obat.
   - Mencatat riwayat & tracker biomarker (glukosa, tensi, dll).
   - Mengikuti program challenge kesehatan 14–90 hari berhadiah badge.
   - Mengakses konsultasi chat AI & booking sesi instruktur.
   - Memilih tingkatan member (*Silver, Gold, Platinum*).
2. **Instruktur (Tenaga Ahli / Konsultan / Nutritionist):**
   - Menerima jadwal konsultasi booking dari member.
   - Memantau laporan data objektif kesehatan member (bukan tebak-tebakan).
   - Memberikan bimbingan personalisasi nutrisi dan pola hidup terarah.
3. **Admin (Pengelola Platform):**
   - Memantau analitik makro pertumbuhan platform dan tren kesehatan.
   - Manajemen tata kelola instruktur dan verifikasi kredensial.
   - Manajemen tingkatan member dan integritas data sistem.

---

## 🚀 11 Fitur Utama & Urgensi

| No | Fitur | Urgensi / Masalah yang Diselesaikan |
| :---: | :--- | :--- |
| **1** | **Scanner Open Cam** | Mempercepat & mempermudah memahami kandungan gizi/obat tanpa riset manual karena literasi label makanan masih rendah. |
| **2** | **Konsultasi Chat (AI / Instruktur)** | Menjawab kebutuhan konsultasi cepat tanpa antre di RS untuk pertanyaan harian yang tidak butuh tatap muka. |
| **3** | **Riwayat & Tracker Kesehatan Pribadi** | Pencatatan berkelanjutan agar penurunan kondisi kesehatan dapat terdeteksi lebih dini. |
| **4** | **Rekomendasi Personal Berbasis Profile** | Menghindari bahaya rekomendasi generik dengan penyesuaian kondisi khusus (alergi, diabetes, dll). |
| **5** | **Program Challenge Kesehatan** | Target terstruktur 14–90 hari untuk meningkatkan konsistensi gaya hidup sehat. |
| **6** | **Booking Konsultasi Terjadwal** | Memberikan kepastian waktu dan akses ke tenaga ahli / instruktur sungguhan. |
| **7** | **Komunitas / Forum Diskusi** | Memberikan dukungan sosial positif agar member tidak merasa berjuang sendirian. |
| **8** | **Badge & Gamifikasi** | Mengapresiasi capaian hidup sehat untuk meningkatkan retensi dan motivasi kembali ke aplikasi. |
| **9** | **Laporan Untuk Instruktur & Admin** | Menyediakan data objektif untuk bimbingan terarah dan insight analitik platform. |
| **10** | **Tingkatan Member (Silver, Gold, Platinum)** | Mendorong loyalitas jangka panjang dengan model freemium dan tingkat manfaat yang jelas. |
| **11** | **Telepon Ambulan Berbasis Lokasi (119)** | Memangkas waktu pencarian kontak darurat saat panik via koordinat GPS ponsel. |

---

## 🛠 Tech Stack

- **Backend:** [Laravel 12](https://laravel.com) (PHP 8.2+)
- **Frontend SPA:** [Inertia.js v2](https://inertiajs.com) + [React 19](https://react.dev)
- **Styling & Theme:** [Tailwind CSS v4](https://tailwindcss.com) (dengan Custom Design Tokens `@theme`)
- **Build Tool:** [Vite 7](https://vitejs.dev)
- **Icons & Fonts:** Google Material Symbols Outlined, *Newsreader*, *IBM Plex Sans*, *IBM Plex Mono*

---

## 💻 Prasyarat Sistem

Sebelum menjalankan project di komputer lokal, pastikan telah terinstall:
- **PHP** >= 8.2 (dengan extension `php-curl`, `php-sqlite3`/`php-pdo_sqlite`, `php-mbstring`, `php-xml`)
- **Composer** >= 2.x ([Download Composer](https://getcomposer.org/))
- **Node.js** >= 20.x & **NPM** ([Download Node.js](https://nodejs.org/))

---

## ⚙️ Panduan Instalasi & Menjalankan Project

Ikuti langkah-langkah berikut untuk setup project dari awal:

### 1. Clone & Masuk ke Folder Project
```bash
git clone <repository-url> health-app
cd health-app
```

### 2. Install Dependensi Backend (Composer)
```bash
composer install
```

### 3. Setup File Environment (`.env`)
Salin file `.env.example` menjadi `.env`, lalu generate application key:
```bash
# Windows PowerShell / Command Prompt
copy .env.example .env

# Linux / macOS / Git Bash
cp .env.example .env
```
Generate app key Laravel:
```bash
php artisan key:generate
```

### 4. Setup Database SQLite (Default)
Pastikan file database SQLite dibuat (atau disesuaikan dengan koneksi database Anda di `.env`):
```bash
# Windows PowerShell
if (!(Test-Path database\database.sqlite)) { New-Item -ItemType File database\database.sqlite }

# Linux / macOS
touch database/database.sqlite
```
Jalankan migrasi database:
```bash
php artisan migrate
```

### 5. Install Dependensi Frontend (NPM)
```bash
npm install
```
*(Catatan di Windows PowerShell: jika ada issue Execution Policy pada script npm, gunakan `npm.cmd install`)*

---

### 6. Menjalankan Server Development

Jalankan dua terminal terpisah:

#### Terminal 1 — Menjalankan Vite Dev Server (Frontend):
```bash
npm run dev
```

#### Terminal 2 — Menjalankan Laravel Server (Backend):
```bash
php artisan serve
```

Buka browser dan akses aplikasi di:
```
http://localhost:8000
```

---

## 📁 Struktur Direktori Penting

```plaintext
health-app/
├── app/
│   └── Http/
│       └── Middleware/
│           └── HandleInertiaRequests.php   # Middleware Inertia
├── bootstrap/
│   └── app.php                             # Registrasi middleware
├── resources/
│   ├── css/
│   │   └── app.css                         # Tailwind CSS v4 Theme Tokens (@theme)
│   ├── js/
│   │   ├── app.jsx                         # Entry point Inertia React
│   │   ├── Components/
│   │   │   ├── Header.jsx                  # Navbar & Ambulan Lokasi
│   │   │   ├── HeroSection.jsx             # Hero & Live Scanner Simulator
│   │   │   ├── MemberFeaturesSection.jsx   # 8 Fitur Utama Member
│   │   │   ├── TiersAndAmbulanceSection.jsx# Silver, Gold, Platinum & Ambulan GPS
│   │   │   ├── PublicPromoSection.jsx      # Promo Peluncuran & Keuntungan PWA
│   │   │   ├── FaqSection.jsx              # Accordion FAQ
│   │   │   ├── CtaBanner.jsx               # Banner Registrasi
│   │   │   ├── QuickChatDialog.jsx         # Floating Chat Assistant Widget
│   │   │   └── Footer.jsx                  # Footer Resmi
│   │   ├── Layouts/
│   │   │   ├── MarketingLayout.jsx         # Layout Halaman Utama
│   │   │   └── AuthLayout.jsx              # Layout Login / Register
│   │   └── Pages/
│   │       ├── Welcome.jsx                 # Landing Page Utama
│   │       └── Auth/
│   │           ├── Login.jsx               # Login 3 Role (Member, Instruktur, Admin)
│   │           └── Register.jsx            # Register Member / Instruktur
│   └── views/
│       └── app.blade.php                   # Root HTML Template & Google Fonts
├── routes/
│   └── web.php                             # Rute Inertia (/, /login, /register)
├── vite.config.js                          # Konfigurasi Vite + React + Tailwind
└── package.json                            # Package dependencies
```

---

## 🎨 Design System & Token Warna

Project ini menggunakan token warna dan tipografi resmi yang dikonfigurasi di `resources/css/app.css`:

- **Warna Utama (Primary):** `#00433e` (Teal Medis Tua)
- **Primary Container:** `#0f5c56`
- **Secondary (Aksen Emas):** `#835500` / `#feb958`
- **Tertiary (Darurat / Ambulan):** `#701d11` / `#ffdad4`
- **Latar Belakang (Surface):** `#f3fbf6` (Soft Mint Neutral)
- **Tipografi:**
  - *Headline & Display:* `Newsreader, serif`
  - *Body Text:* `IBM Plex Sans, sans-serif`
  - *Data & Label:* `IBM Plex Mono, monospace`

---

## 📜 Perintah Development yang Tersedia

```bash
# Menjalankan frontend hot-reload
npm run dev

# Membangun aset bundle untuk produksi
npm run build

# Menjalankan server backend lokal
php artisan serve

# Menjalankan migrasi database
php artisan migrate

# Membersihkan cache konfigurasi
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## 🤝 Kolaborasi & Kontribusi

1. Buat branch baru untuk fitur yang dikerjakan: `git checkout -b fitur/nama-fitur`.
2. Pastikan komponen React diletakkan di `resources/js/Components/` jika reusable.
3. Lakukan pengujian tampilan di berbagai ukuran layar (responsif mobile & desktop).
4. Commit perubahan dengan pesan yang jelas dan lakukan pull request.

---

**© 2025 Kadar Health PWA Protocol. Hak Cipta Dilindungi.**
