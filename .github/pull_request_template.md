# Pengajuan Perubahan (Pull Request)

[![Code Review](https://img.shields.io/badge/Review-Required-yellow.svg)](https://github.com/iconfest-2026/kadar/pulls)
[![Quality Gate](https://img.shields.io/badge/Quality_Gate-Passed-brightgreen.svg)](https://github.com/iconfest-2026/kadar/actions)

> [!NOTE]
> Harap lengkapi formulir pengajuan ini secara rinci agar proses peninjauan kode (*code review*) dapat berjalan efektif dan terdokumentasi dengan baik.

---

## 1. Ringkasan Perubahan

Jelaskan secara ringkas perubahan teknis yang Anda terapkan dan alasan di balik pendekatan tersebut.

- **Tautan Masalah Terkait:** Menutup Issue `#` (contoh: `Closes #123` atau `Refs #456`)
- **Tujuan Perubahan:** [Jelaskan motivasi atau kebutuhan bisnis/teknis di balik PR ini]

---

## 2. Klasifikasi Perubahan

Tandai opsi yang relevan dengan `[x]`:

- [ ] **Perbaikan Bug (Bug Fix):** Perubahan tanpa efek samping yang menyelesaikan masalah pada fitur yang ada.
- [ ] **Fitur Baru (New Feature):** Penambahan fungsi baru yang tidak merusak kompatibilitas sebelumnya.
- [ ] **Perubahan Mayor (Breaking Change):** Perubahan arsitektur, migrasi database destruktif, atau modifikasi kontrak API yang mewajibkan penyesuaian kode lain.
- [ ] **Refaktor Kode (Refactoring):** Pembersihan atau restrukturisasi kode tanpa mengubah perilaku fungsional.
- [ ] **Optimalisasi Performa (Performance):** Pengurangan latensi pemrosesan, peningkatan efisiensi kueri database, atau reduksi ukuran berkas build.
- [ ] **Dokumentasi (Documentation):** Penambahan atau pembaruan panduan pengguna, dokumentasi kode, atau berkas panduan komunitas.
- [ ] **Pengujian (Testing):** Penambahan skenario unit test, feature test, atau perbaikan mock data.

---

## 3. Komponen dan Peran Terdampak

### Komponen Sistem:
- [ ] Personal Baseline & Health Behavior Engine
- [ ] Scanner Open Cam (Kamera, OCR Tesseract, Deteksi Label Obat/Nutrisi)
- [ ] Konsultasi Chat (Dialog Edukasi AI & Instruktur Klinis)
- [ ] Protokol Darurat 119 & Penanganan Koordinat
- [ ] Pelacak Metrik Harian & Riwayat Kesehatan
- [ ] Booking Sesi Konsultasi Terjadwal
- [ ] Program Challenge & Kebiasaan Mikro
- [ ] Komunitas & Moderasi Konten
- [ ] Panel Administrasi & Log Audit
- [ ] Skema Basis Data / Migrasi & Seeder

### Peran Pengguna Terdampak:
- [ ] Member (Pengguna Umum)
- [ ] Instruktur (Tenaga Kesehatan / Dokter / Pelatih)
- [ ] Administrator Sistem

---

## 4. Daftar Periksa Kualitas & Kepatuhan (Checklist)

Pastikan semua persyaratan berikut telah terpenuhi sebelum meminta peninjauan:

- [ ] Format kode PHP telah diselaraskan dengan standar proyek menggunakan `./vendor/bin/pint`.
- [ ] Seluruh pengujian backend berhasil dijalankan dan berstatus lulus 100% (`php artisan test`).
- [ ] Proses build aset frontend selesai tanpa peringatan kritis atau galat (`npm run build`).
- [ ] Tidak ada token rahasia, kunci privat API, atau kredensial `.env` yang tersimpan ke dalam repositori.
- [ ] **Prinsip Non-Diagnostik:** Perubahan tidak memberikan vonis penyakit pasti atau anjuran resep obat mandiri kepada member.
- [ ] **Independensi Darurat 119:** Jalur panggilan dan transmisi bantuan darurat 119 tidak terhambat oleh proses pihak ketiga atau dependensi AI.
- [ ] **Privasi Data:** Jejak log aktivitas mencatat hash alamat IP (SHA-256) dan tidak menyimpan koordinat geolokasi di luar kebutuhan sesi aktif.

---

## 5. Bukti Pengujian dan Demonstrasi Visual

Lampirkan tangkapan layar (*screenshot*), rekaman animasi GIF, atau cuplikan log pengujian terminal sebagai bukti verifikasi:

```text
[Tempelkan hasil uji 'php artisan test' atau tangkapan layar antarmuka di sini]
```

---

## 6. Catatan Khusus untuk Peninjau (Reviewer Notes)

Tuliskan pertimbangan arsitektur tertentu, dependensi baru yang ditambahkan, atau hal-hal yang perlu mendapat perhatian khusus dari tim peninjau.
