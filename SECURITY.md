# Kebijakan Keamanan AEVYRA (Security Policy)

[![Security Policy](https://img.shields.io/badge/Security-Policy_Active-success.svg)](SECURITY.md)
[![Vulnerability Reporting](https://img.shields.io/badge/Vulnerabilities-Coordinated_Disclosure-blue.svg)](https://github.com/iconfest-2026/kadar/security/advisories/new)
[![Data Protection](https://img.shields.io/badge/Data_Privacy-UU_PDP_No.27%2F2022-teal.svg)](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022)

Keamanan informasi dan perlindungan privasi data kesehatan merupakan prioritas fundamental bagi proyek **AEVYRA**. Kami menghargai peran komunitas riset keamanan dalam membantu kami mempertahankan standar keamanan tertinggi.

---

## 1. Versi yang Didukung (Supported Versions)

Kami secara aktif memelihara dan menyediakan pembaruan keamanan untuk versi-versi berikut:

| Versi Perangkat Lunak | Status Pemeliharaan Keamanan | Dukungan Patch |
| :--- | :--- | :--- |
| **1.x (Branch: main)** | Aktif Didukung | Menerima pembaruan keamanan dan perbaikan kritis berkala |
| **0.x (Prarilis)** | Tidak Didukung | Tidak menerima pembaruan; disarankan segera memperbarui ke versi utama |

---

## 2. Sensitivitas Data Kesehatan & Pertimbangan Arsitektur

Sebagai platform kecerdasan kesehatan preventif personal, arsitektur AEVYRA mengimplementasikan prinsip-prinsip proteksi berikut:

> [!IMPORTANT]
> **Privasi dan Anonimisasi Audit:**
> Alamat IP pada jejak log audit di-hash satu arah menggunakan SHA-256 dan tidak disimpan dalam bentuk teks polos (*plaintext*).
> Koordinat geolokasi darurat hanya ditransmisikan saat pemicu darurat 119 diaktifkan secara sadar dan tidak disimpan sebagai riwayat lokasi persisten.

> [!CAUTION]
> **Isolasi Hak Akses Data Klinis:**
> Instruktur dan dokter mitra hanya diizinkan membaca metrik kesehatan member yang secara eksplisit didelegasikan kepadanya. Kerentanan yang memungkinkan pembacaan lintas-member (*cross-tenant / IDOR*) diposisikan sebagai kerentanan berisiko kritis (*Critical Severity*).

---

## 3. Pelaporan Kerentanan Keamanan (Reporting a Vulnerability)

> [!WARNING]
> **Mohon TIDAK melaporkan kerentanan keamanan melalui *Public GitHub Issues*, *Pull Requests*, atau forum publik.**
> Pelaporan terbuka dapat membahayakan privasi dan data kesehatan pengguna aktif sebelum perbaikan selesai diluncurkan.

### Saluran Pelaporan Resmi:
Kami menyediakan dua jalur koordinasi pengungkapan kerentanan yang aman:

1. **GitHub Private Vulnerability Reporting (Direkomendasikan):**
   Kunjungi tab Keamanan repositori dan buat draf penasihat privat:
   [https://github.com/iconfest-2026/kadar/security/advisories/new](https://github.com/iconfest-2026/kadar/security/advisories/new)

2. **Surel Tim Keamanan:**
   Kirimkan enkripsi laporan Anda ke alamat surel:
   `security@aevyra.id`

---

## 4. Informasi yang Dibutuhkan dalam Laporan

Untuk mempercepat proses investigasi dan mitigasi, sertakan rincian berikut:
- **Judul dan Ringkasan:** Ringkasan singkat mengenai sifat kerentanan.
- **Komponen Terdampak:** Endpoint API, controller, skrip frontend, atau dependensi spesifik yang terlibat.
- **Langkah-Langkah Reproduksi (Steps to Reproduce):** Urutan instruksi yang jelas dan terstruktur untuk mereproduksi temuan.
- **Bukti Konsep (Proof of Concept - PoC):** Cuplikan permintaan HTTP, skrip uji coba, atau *payload* contoh (pastikan tidak merusak integritas data riil).
- **Analisis Dampak (Impact Analysis):** Estimasi dampak teknis (misal: pengambilalihan sesi, eskalasi hak istimewa, kebocoran data biomarker, manipulasi algoritma rekomendasi).
- **Rekomendasi Remediasi (Bila Ada):** Saran perbaikan kode atau pengaturan konfigurasi yang direkomendasikan.

---

## 5. Komitmen Penanganan & Service Level Agreement (SLA)

Tim keamanan kami berkomitmen pada lini masa respons koordinasi berikut:

- **Konfirmasi Penerimaan Awal:** Dalam waktu **48 jam** kerja sejak laporan diterima.
- **Validasi dan Penilaian Risiko (Triage):** Dalam kurun waktu **5 hari kerja** kerja untuk mengonfirmasi reproduktibilitas dan menentukan skor keparahan (CVSS).
- **Penyelesaian dan Pengujian Patch:** Bergantung pada tingkat keparahan, perbaikan kritis diupayakan selesai dalam waktu **7 hingga 14 hari kerja**.
- **Pengungkapan Terkoordinasi (Coordinated Disclosure):** Rilis publik dari laporan penasihat keamanan (*Security Advisory*) akan dipublikasikan secara transparan setelah *patch* berhasil diuji dan diterapkan pada sistem produksi.

---

## 6. Kebijakan Perlindungan Peneliti Etis (Safe Harbor)

Kami mengapresiasi upaya peneliti keamanan etis (*white hat*). Jika Anda melakukan riset keamanan dengan niat baik (*good faith*), mematuhi kebijakan ini, tidak mengakses atau mengubah data milik pengguna lain tanpa izin, dan tidak mengganggu ketersediaan layanan publik kami, maka:

- Kami tidak akan menempuh jalur hukum terhadap Anda terkait aktivitas pengujian yang dilaporkan.
- Kami akan bekerja sama secara kooperatif untuk memvalidasi dan memitigasi temuan Anda.
- Kami akan memberikan atribusi pengakuan publik pada catatan rilis penasihat keamanan kami (kecuali Anda memilih untuk tetap anonim).
