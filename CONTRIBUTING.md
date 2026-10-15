# Panduan Kontribusi AEVYRA (Contributing Guide)

[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4.svg?logo=php&logoColor=white)](https://php.net)
[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20.svg?logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react&logoColor=black)](https://react.dev)
[![Inertia](https://img.shields.io/badge/Inertia.js-3.x-9553E9.svg?logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev)
[![Code Style](https://img.shields.io/badge/Code_Style-Laravel_Pint-blue.svg)](https://laravel.com/docs/12.x/pint)
[![Testing](https://img.shields.io/badge/Tests-PHPUnit_11-3E8E41.svg)](https://phpunit.de)

Terima kasih atas ketertarikan Anda untuk berkontribusi pada pengembangan **AEVYRA** (Personal Preventive Health Intelligence). Panduan ini dirancang untuk memastikan proses kolaborasi berlangsung tertib, bermutu tinggi, dan selaras dengan integritas klinis sistem kami.

---

## 1. Prinsip Inti dan Batasan Klinis

Sebelum menulis kode atau mengajukan perubahan, setiap kontributor wajib memahami batasan sistem AEVYRA:

> [!IMPORTANT]
> **Prinsip Non-Diagnostik:**
> AEVYRA dirancang khusus sebagai platform kecerdasan kesehatan preventif dan pemantauan garis acuan biologis personal (*Personal Baseline*). Sistem **dilarang keras** memunculkan diagnosis penyakit deterministik atau memberikan resep obat mandiri. Seluruh output AI dan algoritma harus bersifat edukatif, preventif, dan merujuk pada evaluasi tenaga kesehatan berwenang.

> [!CAUTION]
> **Independensi Tanggap Darurat 119:**
> Alur protokol darurat 119 dirancang untuk langsung menghubungkan pengguna ke layanan medis resmi tanpa jeda atau ketergantungan pada pemrosesan LLM/AI. Kode yang mengubah alur darurat tidak boleh menambahkan dependensi eksternal yang berpotensi menimbulkan latensi atau kegagalan transmisi.

> [!NOTE]
> **Kepatuhan Privasi Data Kesehatan (UU PDP No. 27/2022):**
> Setiap perubahan pada skema database atau API yang menyentuh data biomarker, lokasi, atau rekam medis pengguna harus mematuhi prinsip minimisasi data dan anonimisasi jejak audit (SHA-256 IP hashing).

---

## 2. Persyaratan Lingkungan Pengembang

Pastikan lingkungan lokal Anda memenuhi spesifikasi minimum berikut:

- **PHP:** Versi 8.2 atau lebih baru (dengan ekstensi: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`)
- **Composer:** Versi 2.6 atau lebih baru
- **Node.js:** Versi 20.x LTS atau lebih baru
- **NPM:** Versi 10.x atau lebih baru
- **Basis Data:** MySQL 8.0+ atau MariaDB 10.5+ (atau SQLite 3.35+ untuk pengujian lokal)
- **Git:** Versi 2.30+

---

## 3. Alur Kerja Kontribusi

### Langkah 1: Fork dan Kloning Repositori
Lakukan *fork* repositori ini ke akun GitHub pribadi Anda, kemudian klon ke mesin lokal:

```bash
git clone https://github.com/<username-anda>/kadar.git
cd kadar
```

### Langkah 2: Konfigurasi Lingkungan Lokal
Pasang dependensi backend dan frontend:

```bash
# Instal dependensi PHP
composer install

# Salin file konfigurasi lingkungan jika belum ada
cp .env.example .env

# Buat kunci enkripsi aplikasi
php artisan key:generate

# Jalankan migrasi dan seeder database
php artisan migrate --seed

# Instal dependensi JavaScript
npm install
```

### Langkah 3: Menjalankan Server Pengembangan
Gunakan skrip terpadu untuk menjalankan server Laravel, antrean worker, dan Vite dev server secara bersamaan:

```bash
# Opsi 1: Menjalankan via Composer
composer run dev

# Opsi 2: Menjalankan via NPM
npm run dev:all
```

Aplikasi dapat diakses melalui browser pada `http://localhost:8000`.

---

## 4. Strategi Percabangan (Branching Strategy)

Gunakan nama cabang yang terstruktur dan deskriptif dengan format:

`<tipe>/<deskripsi-singkat>`

Contoh cabang yang valid:
- `feature/scanner-ocr-enhancement`
- `feature/baseline-deviation-alert`
- `bugfix/119-geolocation-fallback`
- `bugfix/pint-formatting-rule`
- `docs/api-documentation-update`
- `refactor/consultation-chat-payload`

---

## 5. Standar Kode dan Gaya Penulisan

### Standar Backend (PHP & Laravel)
- Mengikuti pedoman **PSR-12** dan konvensi resmi Laravel.
- Gunakan tipe data eksplisit (*type hinting*) pada argumen fungsi dan nilai balik (*return types*).
- Jalankan pemformat kode otomatis **Laravel Pint** sebelum melakukan komit:

```bash
./vendor/bin/pint
```

Untuk memeriksa tanpa mengubah berkas:

```bash
./vendor/bin/pint --test
```

### Standar Frontend (React, Inertia.js, Tailwind CSS)
- Gunakan komponen berbasis fungsi (*functional components*) dengan React Hooks.
- Komponen harus memiliki struktur properti (*props*) yang jelas dan terdokumentasi.
- Gunakan sistem utilitas Tailwind CSS v4 untuk penataan gaya yang konsisten.
- Hindari penggunaan CSS sebaris (*inline styles*) kecuali untuk nilai dinamis yang dihitung saat *runtime*.
- Pastikan berkas aset berhasil dikompilasi tanpa kesalahan:

```bash
npm run build
```

---

## 6. Pengujian (Testing)

Setiap penambahan fitur atau perbaikan *bug* wajib disertai dengan pengujian otomatis yang relevan.

### Menjalankan Pengujian Backend
Jalankan rangkaian tes menggunakan PHPUnit / Artisan Test Runner:

```bash
# Bersihkan cache konfigurasi sebelum pengujian
php artisan config:clear --ansi

# Jalankan seluruh rangkaian tes
php artisan test
```

Pastikan semua skenario lulus uji (100% *pass*) sebelum mengajukan *Pull Request*.

---

## 7. Konvensi Pesan Komit (Commit Guidelines)

Kami menerapkan standar **Conventional Commits** agar riwayat komit tetap informatif dan mudah ditelusuri:

Format umum:
```text
<tipe>(<lingkup-opsional>): <deskripsi singkat dalam bentuk imperatif>
```

Tipe komit yang didukung:
- `feat`: Penambahan fitur fungsional baru.
- `fix`: Perbaikan kesalahan atau *bug*.
- `docs`: Pembaruan atau penambahan dokumentasi.
- `style`: Penyesuaian pemformatan kode tanpa memengaruhi logika bisnis (spasi, tanda baca).
- `refactor`: Restrukturisasi kode tanpa mengubah fungsionalitas eksternal.
- `perf`: Peningkatan performa komputasi atau kueri basis data.
- `test`: Penambahan atau perbaikan skenario tes.
- `chore`: Pemeliharaan dependensi, berkas build, atau konfigurasi *tooling*.

Contoh komit yang baik:
```text
feat(baseline): calculate 14-day rolling mean for glucose variance
fix(emergency): ensure emergency contact dispatched when coordinates missing
docs(readme): clarify non-diagnostic boundaries and license terms
style: apply laravel pint formatting to health controllers
```

---

## 8. Panduan Mengajukan Pull Request (PR)

Sebelum menekan tombol pembuatan Pull Request:
1. Pastikan cabang lokal Anda sudah disinkronkan dengan cabang `main` terbaru (`git pull origin main --rebase`).
2. Jalankan `./vendor/bin/pint` untuk memastikan keseragaman format kode PHP.
3. Jalankan `php artisan test` dan pastikan seluruh pengujian lulus.
4. Jalankan `npm run build` untuk memverifikasi proses bundling frontend.
5. Isi templat Pull Request secara lengkap dan sertakan konteks perubahan yang jelas.
6. Sertakan tangkapan layar (*screenshot*) atau demonstrasi singkat jika perubahan menyangkut antarmuka visual (UI).

---

## 9. Pertanyaan dan Bantuan

Apabila Anda memiliki pertanyaan terkait arsitektur sistem atau butuh panduan dalam menyelesaikan tugas kontribusi:
- Buka thread diskusi di [GitHub Discussions](https://github.com/iconfest-2026/kadar/discussions).
- Buat Issue baru dengan tipe pertanyaan teknis atau usulan arsitektur.
- Hubungi tim pengembang melalui kanal resmi repositori.
