# PRONOIA — Features Specification

> Spesifikasi fungsional seluruh fitur utama PRONOIA, hubungan hierarki antar-modul, prioritas implementasi teknis, aturan perilaku sistem, matriks otorisasi per-peran, batasan keselamatan medis (*health-safety boundary*), dan kriteria penerimaan tingkat produk.

## 1. Purpose

Dokumen ini mendefinisikan secara terstruktur seluruh spesifikasi fungsional fitur dalam platform **PRONOIA**, hierarki modul sistem, relasi ketergantungan antar-komponen, prioritas implementasi (*roadmap priority*), aturan perilaku antarmuka, batas kewenangan otorisasi, serta prinsip keselamatan medis preventif (*health-safety boundary*).

Dokumen ini memetakan:
- **Inventaris Fitur Lengkap (*Feature Inventory*):** Seluruh modul mulai dari Grup A (Autentikasi) hingga Grup Y (Kendali Akses).
- **Hierarki & Ketergantungan Modul:** Struktur pohon fitur dan graf ketergantungan data (*data dependency graph*).
- **Prioritas Rekayasa Produk:** Klasifikasi tingkat urgensi dari P0 (Fondasi MVP), P1 (Inti Sistem Perilaku), P2 (Dukungan Cerdas AI & Scanner), hingga P3 (Skalabilitas Ekosistem).
- **Batasan Keselamatan Klinis:** Standar non-diagnostik, penanganan krisis darurat, dan prinsip *human-in-the-loop*.

### Rujukan Arsitektur Produk
Spesifikasi ini menjadi pedoman utama rekayasa perangkat lunak untuk:
1. **Pengembang Backend:** Implementasi kontrak API, validasi data masukan, mesin kalkulasi analitik, dan aturan otorisasi per-peran.
2. **Pengembang Frontend & PWA:** Perancangan status komponen (*loading, empty, error*), cache luring, dan alur interaksi pengguna.
3. **Tim Jaminan Kualitas (QA):** Penyusunan skenario pengujian fungsional dan verifikasi kriteria keberimaan (*acceptance criteria*).

---

## 2. Product Feature Philosophy

PRONOIA menolak pendekatan fitur yang berdiri sendiri secara terfragmentasi (*feature silos*). Setiap fitur yang dikembangkan wajib berkontribusi langsung pada penguatan siklus perilaku hidup sehat preventif:

```text
Amati Pola (Observe)
        │
        ▼
Pahami Konteks (Understand)
        │
        ▼
Deteksi Deviasi (Detect)
        │
        ▼
Jelaskan Wawasan (Explain)
        │
        ▼
Berikan Intervensi (Intervene)
        │
        ▼
Pantau Kemajuan (Monitor)
        │
        ▼
Eskalasi Jika Diperlukan (Escalate)
        │
        ▼
Peningkatan Gaya Hidup (Improve)
```

> [!TIP]
> **Prinsip Evaluasi Fitur:** Jika sebuah usulan fitur baru tidak mendukung salah satu mata rantai dalam siklus di atas, maka fitur tersebut dikategorikan sebagai *feature bloat* dan tidak akan dimasukkan ke dalam basis kode PRONOIA.

---

## 3. Feature Hierarchy

Hierarki fitur PRONOIA diorganisasi ke dalam 6 domain fungsional utama:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                     ARSITEKTUR DOMAIN FITUR PRONOIA                    │
├────────────────────────────────────────────────────────────────────────┤
│ 1. IDENTITAS & KEAMANAN  : Autentikasi, Profiling, Otorisasi Multi-Peran│
│ 2. PENGALAMAN ANGGOTA    : Dasbor Harian, Quick Log, Timeline Aktivitas│
│ 3. MESIN PERILAKU CERDAS : Baseline Dinamis, Deteksi Tren, Wawasan AI  │
│ 4. INTERVENSI PREVENTIF  : Rekomendasi Mikro, Tantangan, Pindai Nutrisi│
│ 5. KOLABORASI PROFESIONAL: Portal Instruktur, Telekonsultasi, Rujukan  │
│ 6. OPERASIONAL & AUDIT   : Moderasi Komunitas, Dasbor Admin, Audit Log │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Feature Priority Model

PRONOIA mengklasifikasikan seluruh fitur ke dalam 4 tingkatan prioritas rekayasa yang ketat:

| Tingkat Prioritas | Definisi & Kriteria Kesiapan | Contoh Fitur dalam Sistem |
| :--- | :--- | :--- |
| **P0 — Fondasi Kritis (MVP)** | Fitur esensial yang wajib beroperasi agar siklus preventif dasar dapat berjalan. | Autentikasi aman, pencatatan harian dasar, kalkulasi baseline awal, dan tombol darurat. |
| **P1 — Inti Produk (Core)** | Fitur pembeda yang memberikan nilai analisis mendalam kepada pengguna. | Mesin deteksi deviasi tren, kartu wawasan otomatis, dan rekomendasi aksi mikro. |
| **P2 — Pengalaman Cerdas (Enhancement)** | Kapabilitas otomasi lanjutan untuk mempercepat proses pencatatan dan edukasi. | Pemindai label gizi via kamera (Scanner OCR) dan asisten AI edukatif terpandu. |
| **P3 — Ekosistem Terpadu (Scale)** | Fitur kolaborasi sosial dan pendampingan manusia skala luas. | Sistem pemesanan konsultasi instruktur, forum komunitas termoderasi, dan PWA luring. |

---

## 5. Feature Naming Convention

Penamaan fitur dalam antarmuka maupun kode wajib mematuhi standar kejelasan:
- **Intuitif & Ramah:** Menggunakan istilah yang mudah dipahami orang awam tanpa istilah teknis yang rumit.
- **Konsisten Antar-Platform:** Nama fitur di aplikasi web, PWA, dan dokumen teknis harus seragam.
- **Bebas Kesan Diagnostik Medis:** Dilarang menggunakan istilah medis klinis secara berlebihan yang dapat menimbulkan salah tafsir diagnosis.

| Praktik Penamaan yang Baik (✅ Direkomendasikan) | Praktik yang Harus Dihindari (❌ Hindari) |
| :--- | :--- |
| `Behavioral Insight` (Wawasan Perilaku) | `Disease Prediction` (Prediksi Penyakit) |
| `Sleep Consistency Score` (Skor Konsistensi Tidur) | `Insomnia Diagnosis Level` (Tingkat Diagnosis Insomnia) |
| `Nutrition Scanner` (Pemindai Nutrisi) | `Medical Diet Prescription` (Resep Diet Medis) |

---

## 6. Feature Group A — Authentication & Identity

Grup Fitur A menangani siklus hidup identitas pengguna secara aman, mematuhi standar otentikasi industri, dan memisahkan hak akses multi-peran secara tegas:

```text
Registrasi Mandiri ──▶ Verifikasi Email ──▶ Masuk Sesi (Login) ──▶ Kontrol Sesi Aktif ──▶ Keluar Aman (Logout)
```

Seluruh proses autentikasi dilindungi oleh enkripsi kata sandi standar *Argon2id / Bcrypt*, pembatasan laju (*rate limiting*), dan regenerasi token sesi otomatis.

---

## 7. Login

Alur masuk pengguna mendukung tiga peran resmi (*Member, Instructor, Admin*):

```text
Formulir Masuk ──▶ Validasi Format Email & Sandi ──▶ Pengecekan Kredensial Hash ──▶ Regenerasi ID Sesi ──▶ Verifikasi Status Peran di Server ──▶ Pengalihan ke Dasbor Peran
```

> [!IMPORTANT]
> **Pemisahan Autentikasi vs Otorisasi:**  
> Autentikasi hanya membuktikan keaslian identitas akun. Hak akses atas data dan fitur (*authorization*) selalu ditentukan dan diverifikasi ulang oleh server pada setiap permintaan API.

---

## 8. Logout

Proses keluar sesi (*logout*) memastikan sesi pengguna berakhir secara absolut:
- Menghapus sesi aktif dari basis data / Redis di sisi server (*server-side session invalidation*).
- Menghapus cookie sesi terenkripsi dari peramban klien.
- Membersihkan cache data sensitif di penyimpanan sementara peramban guna mencegah akses tidak sah pada perangkat bersama.

---

## 9. Password Recovery

Alur pemulihan kata sandi dirancang aman dari kebocoran akun:

```text
Pengguna Meminta Reset ──▶ Pengecekan Keberadaan Akun (Tanpa Membocorkan Status) ──▶ Terbitkan Token Sekali Pakai (Kedaluwarsa 15 Menit) ──▶ Kirimkan Tautan ke Email Terdaftar ──▶ Pengguna Mengatur Sandi Baru ──▶ Seluruh Sesi Lama Otomatis Dicabut
```

Token pemulihan disimpan dalam bentuk hash di basis data dan tidak pernah dicatat dalam log sistem.

---

## 10. Multi-Role Access

Platform melarang keras penentuan hak akses peran hanya berdasarkan status di sisi klien (*client-side state*):

❌ **Kerentanan Fatal:** Mengubah nilai JavaScript `role = "admin"` di peramban untuk membuka fitur manajerial.  
✅ **Penegakan Server Otoritatif:** Backend selalu memverifikasi peran pengguna melalui lapisan *Middleware* dan *Policy* resmi di setiap *route* dan *controller*.

---

## 11. Feature Group B — Member Onboarding

Grup Fitur B memandu anggota baru melalui proses pengenalan yang ramah untuk mengumpulkan konteks hidup mendasar tanpa membebani:

```text
Selamat Datang ──▶ Profil Dasar ──▶ Konteks Gaya Hidup ──▶ Sasaran Kesehatan ──▶ Preferensi Privasi ──▶ Log Pertama (Opsional) ──▶ Dasbor Siap
```

Tujuan utama onboarding adalah menjawab 5 pertanyaan esensial: *Siapa Anda?*, *Bagaimana ritme harian Anda?*, *Apa yang ingin Anda perbaiki?*, *Data apa yang Anda izinkan kami proses?*, dan *Bantuan apa yang Anda harapkan?*

---

## 12. Onboarding Stages

Tahapan onboarding disusun berurutan dengan indikator kemajuan yang jelas:
1. **Identitas Panggilan:** Menyapa anggota secara manusiawi.
2. **Konteks Rutinitas:** Mengetahui beban kerja (mahasiswa, pekerja kantoran, pekerja shift).
3. **Fokus Sasaran:** Memilih 1–2 target awal (perbaikan tidur, hidrasi, atau kebugaran).
4. **Persetujuan Privasi:** Menyetujui batas pengolahan data dan penggunaan asisten AI.
5. **Inisialisasi Baseline:** Memulai jendela observasi 14 hari pertama.

---

## 13. Progressive Profiling

PRONOIA menolak pendekatan kuesioner panjang di hari pertama. Informasi dikumpulkan secara bertahap seiring berjalannya interaksi:

```text
Hari 1: Profil Esensial (Nama & Sasaran Utama)
Hari 3: Preferensi Jenis Aktivitas Fisik
Hari 7: Kebiasaan Rutinitas Menjelang Tidur
Hari 14: Pola Nutrisi & Preferensi Makanan
```

Pendekatan ini memangkas tingkat pembatalan (*drop-off*) pendaftaran hingga di bawah 15%.

---

## 14. Feature Group C — Health Profile

Grup Fitur C mengelola data profil kesehatan personal anggota:
- **Demografi Esensial:** Nama panggilan, kategori usia/tanggal lahir, jenis kelamin biologis (untuk kalibrasi metabolisme).
- **Konteks Pekerjaan:** Bidang pekerjaan dan pola jam kerja harian.
- **Preferensi Gaya Hidup:** Pola makan (vegetarian, rendah gula, dll.) dan preferensi waktu olahraga.
- **Kontrol Hak Akses:** Riwayat persetujuan pemrosesan data yang dapat diubah sewaktu-waktu.

---

## 15. Health Preferences

Pengaturan preferensi memberikan otonomi penuh kepada anggota untuk mengontrol interaksi:
- **Waktu Pengingat Utama:** Menentukan jam pengingat harian (misal: pukul 21.30 WIB).
- **Saluran Notifikasi:** Mengatur preferensi notifikasi dalam aplikasi, push PWA, atau email.
- **Minat Program:** Memilih topik tantangan kebiasaan yang diminati.
- **Preferensi Komunikasi:** Mengatur nada bicara asisten AI (santai, terstruktur, atau ringkas).

---

## 16. Health Goals

Sasaran kesehatan (*Health Goals*) menjadi kompas utama bagi Mesin Perilaku:
- Setiap anggota dapat mengaktifkan 1 sasaran primer dan maksimal 2 sasaran sekunder.
- Sasaran dirumuskan secara positif (misal: *"Mencapai 7 jam tidur berkualitas"* bukan *"Berhenti begadang"*).
- Anggota dapat meninjau dan memperbarui sasaran kapan saja saat prioritas hidupnya bergeser.

---

## 17. Goal Architecture

Struktur data sasaran kesehatan dalam sistem:

| Properti Sasaran | Tipe Data | Deskripsi Fungsi |
| :--- | :--- | :--- |
| `goal_type` | String | Kategori target (contoh: `SLEEP_OPTIMIZATION`, `HYDRATION_CONSISTENCY`). |
| `target_metric` | String | Pengenal metrik fisik yang dipantau (contoh: `sleep_duration`, `daily_water_ml`). |
| `target_value` | Float | Nilai patokan yang ingin dicapai (contoh: `420` menit, `2000` ml). |
| `status` | Enum | Status keaktifan sasaran (`ACTIVE`, `PAUSED`, `ACHIEVED`). |
| `started_at` | Timestamp | Waktu dimulainya komitmen sasaran. |

---

## 18. Feature Group D — Health Data Tracking

Grup Fitur D adalah instrumen utama pengumpulan data gaya hidup anggota secara berkesinambungan:

```text
Entri Manual Kilat (Quick Log) ──┐
Unggahan Hasil Scan Nutrisi   ──┼──▶ Lapisan Validasi ──▶ Simpan ke Linimasa ──▶ Pemicu Mesin Perilaku
Integrasi Perangkat Sandang    ──┘
```

Mendukung metrik durasi tidur, hidrasi, langkah kaki, latihan fisik, porsi nutrisi, dan suasana hati.

---

## 19. Manual Logging

Pencatatan manual dirancang untuk menghilangkan friksi mental pengguna:
- **Preset Satu Ketukan (*One-Tap Presets*):** Tombol cepat seperti `+1 Gelas Air (250ml)` atau `+15 Menit Jalan Kaki`.
- **Validasi Nilai Biologis:** Mencegah kesalahan ketik ekstrem secara instan tanpa mengosongkan formulir.
- **Konfirmasi Halus:** Memberikan umpan balik visual bahwa data telah tersimpan dalam < 200 milidetik.

---

## 20. Data Source

Setiap catatan peristiwa kesehatan wajib mencantumkan asal data (*provenance*):

| Kode Sumber | Keterangan Asal Data | Tingkat Kepercayaan |
| :--- | :--- | :---: |
| `manual` | Dimasukkan sendiri oleh anggota melalui antarmuka. | Tinggi (Subjektif) |
| `scanner` | Diekstraksi otomatis dari label gizi via kamera OCR. | Tinggi (Objektif) |
| `wearable` | Disinkronkan dari perangkat sandang pintar. | Sangat Tinggi |
| `instructor` | Dicatat oleh instruktur saat sesi bimbingan. | Sangat Tinggi (Verifikasi Ahli) |
| `system` | Dihasilkan secara komputasi oleh sistem PRONOIA. | Otoritatif Sistem |

---

## 21. Data Correction

Anggota memiliki hak untuk memperbaiki atau menghapus data yang keliru dimasukkan:
- Koreksi entri lama langsung memicu pembaruan pada tampilan Garis Waktu.
- Jika data yang dikoreksi berada di dalam jendela observasi sinyal aktif, *Behavioral Engine* akan mengevaluasi apakah wawasan terkait perlu direkalkulasi secara otomatis.

---

## 22. Feature Group E — Health Timeline

Garis Waktu Kesehatan (*Unified Health Timeline*) menyajikan seluruh rekam jejak gaya hidup pengguna dalam satu aliran kronologis yang terpadu:

```text
[Hari Ini 07.00] 🛌 Bangun Tidur • 7 Jam 15 Menit (Sesuai Baseline)
[Hari Ini 12.30] 🥗 Makan Siang • Pindai Label Gizi (Aman Gula)
[Hari Ini 14.00] 💡 Wawasan Baru: Konsistensi Tidur Meningkat 3 Hari Berturut-turut!
[Hari Ini 17.00] 🏃 Olahraga Sore • 30 Menit Peregangan Ringan
```

---

## 23. Timeline Requirements

Kriteria teknis Garis Waktu Kesehatan:
- **Pengurutan Kronologis Presisi:** Mengurutkan peristiwa berdasarkan waktu kejadian nyata (*event timestamp*).
- **Penyaringan Kategori Cepat:** Memfilter tampilan berdasarkan kategori (Tidur, Nutrisi, Aktivitas, Sinyal, Bimbingan).
- **Performa Responsif:** Menerapkan pemuatan bertahap (*infinite scrolling / cursor pagination*) untuk menjaga kelancaran antarmuka.

---

## 24. Timeline Event Types

Jenis peristiwa yang dicatat dalam Garis Waktu:
- `ACTIVITY_EVENT`: Sesi latihan fisik, jalan kaki, dan pergerakan aktif.
- `SLEEP_EVENT`: Durasi dan perkiraan kualitas tidur.
- `NUTRITION_EVENT`: Asupan makanan, minuman kemasan, dan hidrasi air.
- `INSIGHT_EVENT`: Wawasan tren yang diterbitkan oleh mesin perilaku.
- `INTERVENTION_EVENT`: Tindakan pencegahan yang diselesaikan anggota.
- `CONSULTATION_EVENT`: Catatan ringkasan bimbingan bersama instruktur.

---

## 25. Feature Group F — Personal Baseline

Grup Fitur F adalah fondasi diferensiasi PRONOIA: menghitung baseline kesehatan personal pengguna, bukan membandingkannya dengan rata-rata populasi umum yang kaku:

```text
14 Hari Pencatatan Data Rutin ──▶ Analisis Distribusi Statistik ──▶ Pembentukan Baseline Pribadi ──▶ Menjadi Acuan Deteksi Deviasi
```

---

## 26. Baseline Principle

Prinsip fundamental pembentukan baseline:

> [!IMPORTANT]
> **Tidak Ada Baseline Prematur:**  
> Sistem dilarang menampilkan baseline personal yang terlihat meyakinkan jika jumlah data observasi belum mencukupi batas minimum statistik (minimal 7 hari pencatatan valid dalam jendela 14 hari). Pada tahap awal, sistem dengan jujur menampilkan status `COLLECTING` (sedang dikumpulkan).

---

## 27. Feature Group G — Behavioral Engine

Grup Fitur G adalah mesin analitik otonom yang bekerja di latar belakang untuk mengidentifikasi anomali tren, menilai signifikansi perubahan, dan menerbitkan sinyal perilaku:

```text
Entri Data Baru ──▶ Bandingkan dengan Baseline ──▶ Uji Ambang Deviasi ──▶ Evaluasi Kualitas & Durasi ──▶ Terbitkan Sinyal Terkualifikasi
```

---

## 28. Behavioral Signal

Sinyal Perilaku (*Behavioral Signal*) adalah representasi data terstruktur yang menandakan adanya perubahan pola kebiasaan yang membutuhkan perhatian:
- Memuat bukti perbandingan numerik yang konkret (data aktual vs baseline).
- Menjelaskan arah tren (meningkat, menurun, atau tidak teratur).
- Dihubungkan langsung dengan sasaran kesehatan anggota yang relevan.

---

## 29. Signal Severity

Tingkat urgensi sinyal perilaku diatur dalam 3 tingkatan non-klinis:

| Tingkat Urgensi | Definisi Perilaku | Respon Antarmuka |
| :--- | :--- | :--- |
| `INFO` | Variasi kecil atau tren positif yang patut diapresiasi. | Tampilkan penanda lembut di linimasa. |
| `ATTENTION` | Deviasi konsisten selama 3–4 hari di luar ambang wajar. | Munculkan kartu wawasan edukasi di beranda. |
| `FOLLOW_UP` | Deviasi melebar berkelanjutan melebihi 7 hari berturut-turut. | Rekomendasikan penyesuaian program / konsultasi instruktur. |

---

## 30. Signal Lifecycle

Siklus hidup sinyal perilaku dikelola melalui status mesin yang deterministik:

```text
DETECTED (Terdeteksi) ──▶ VALIDATING (Uji Kelayakan) ──▶ QUALIFIED (Sah) ──▶ PRESENTED (Ditampilkan)
                                                                                  │
        ┌─────────────────────────────────────────────────────────────────────────┘
        ▼
ACTED_ON (Pengguna Bertindak) ──▶ MONITORING (Pemantauan Dampak) ──▶ RESOLVED (Pulih)
```

Jika pengguna memilih untuk mengabaikan wawasan, sinyal berpindah ke status `DISMISSED` dengan catatan pembelajaran sistem.

---

## 31. Signal Deduplication

Untuk mencegah banjir notifikasi (*alert spam*), sistem menerapkan aturan deduplikasi ketat:
- **Jeda Tenang (*Cooldown Period*):** Menahan pembuatan sinyal baru untuk kategori metrik yang sama dalam rentang 48 jam jika deviasi belum berubah signifikan.
- **Penggabungan Anomali (*Clustering*):** Mengelompokkan fluktuasi multi-metrik yang saling berhubungan (seperti penurunan tidur dan penurunan langkah kaki) ke dalam satu sinyal terintegrasi.

---

## 32. Feature Group H — Explainable Insights

Grup Fitur H menerjemahkan sinyal perilaku teknis menjadi narasi wawasan yang ramah, transparan, dan mudah dipahami dalam bahasa sehari-hari:

```text
Sinyal Perilaku Terkualifikasi ──▶ Formulasi Narasi Wawasan ──▶ Uji Bahasa Non-Diagnostik ──▶ Tampilkan Kartu Wawasan di Dasbor
```

Wawasan PRONOIA mematuhi prinsip kejujuran data: selalu menjelaskan fakta observasi tanpa bumbu klaim medis yang menyesatkan.

---

## 33. Insight Structure

Setiap kartu wawasan perilaku (*Insight Card*) memiliki struktur informasi standar:
1. **Judul Wawasan:** Pernyataan ringkas mengenai fenomena yang diamati (misal: *Perubahan Pola Waktu Istirahat*).
2. **Pernyataan Observasi:** Uraian perubahan numerik riil (misal: *Rata-rata tidur Anda turun 1 jam 15 menit selama 4 hari terakhir*).
3. **Konteks Pembanding:** Menunjukkan baseline acuan personal (misal: *Baseline tidur Anda: 7 jam 10 menit*).
4. **Alasan Relevansi:** Penjelasan mengapa hal tersebut berpengaruh terhadap energi dan kebugaran tubuh.
5. **Pilihan Aksi Preventif:** 1–2 tombol tindakan mikro yang dapat langsung diambil hari ini.

---

## 34. Insight Rules

Aturan baku dalam merumuskan wawasan kesehatan:
- Dilarang menyebutkan nama penyakit klinis atau diagnosis formal.
- Dilarang bernada menuduh, mempermalukan, atau memicu kecemasan pengguna (*no fear-based messaging*).
- Wajib menyertakan bukti numerik yang dapat diverifikasi oleh pengguna di halaman rincian.

---

## 35. Feature Group I — Recommendation Engine

Grup Fitur I bertugas memilih tindakan mikro pencegahan yang paling realistis dan efektif berdasarkan kondisi terkini anggota:

```text
Wawasan Perilaku Aktif ──▶ Cocokkan dengan Sasaran & Preferensi ──▶ Evaluasi Tingkat Kesulitan Aksi ──▶ Sajikan Opsi Intervensi Mikro
```

Rekomendasi dirancang berbobot ringan (*micro-actions*) agar pengguna merasa mampu melakukannya tanpa mengacaukan jadwal harian.

---

## 36. Recommendation Types

Klasifikasi jenis rekomendasi tindakan dalam PRONOIA:
- **Tindakan Kebiasaan Cepat (*Micro-Habit Action*):** Contoh: *"Lakukan peregangan 3 menit setelah duduk selama 2 jam."*
- **Pengingat Jadwal Kontekstual (*Contextual Reminder*):** Contoh: *"Nyalakan alarm persiapan tidur 30 menit lebih awal malam ini."*
- **Partisipasi Tantangan (*Challenge Recommendation*):** Contoh: *"Ikuti Tantangan 7 Hari Hidrasi Cukup."*
- **Eskalasi Konsultasi (*Consultation Referral*):** Menyarankan sesi bimbingan bersama instruktur saat deviasi membandel.

---

## 37. Recommendation Structure

Struktur data rekomendasi pencegahan:

| Atribut Rekomendasi | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `action_type` | String | Pengenal kategori aksi (contoh: `HABIT_ADJUSTMENT`, `REMINDER_SET`). |
| `title` | String | Judul aksi yang memotivasi dan terukur. |
| `description` | Text | Panduan ringkas cara menjalankan aksi preventif tersebut. |
| `difficulty_level` | Enum | Tingkat beban fisik (`EASY`, `MODERATE`). |
| `tracking_duration` | Integer | Durasi hari pemantauan dampak (contoh: 3 hari, 7 hari). |

---

## 38. Recommendation Constraints

Batasan mutlak sistem rekomendasi:
- Dilarang merekomendasikan obat-obatan farmasi, suplemen kimiawi keras, atau tindakan medis invasif.
- Dilarang memberikan dua rekomendasi aktif yang saling bertentangan secara bersamaan.
- Wajib mematuhi kendala fisik yang telah didaftarkan pengguna pada profilnya.

---

## 39. Feature Group J — Dashboard

Dasbor Anggota (*Member Dashboard*) adalah ruang kendali utama yang tenang dan menyajikan informasi esensial dalam satu pandangan (*at-a-glance*):

```text
Header Sapaan Ramah • Sasaran Aktif
┌───────────────────────────┐  ┌─────────────────────────────────────┐
│ Status Baseline Personal  │  │ Tombol Aksi Cepat (Quick Actions)   │
│ [Sedang Berjalan / Aktif] │  │ [➕ Tidur] [➕ Air] [📷 Scan Nutrisi] │
└───────────────────────────┘  └─────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────┐
│ Kartu Wawasan Terkini / Rencana Bimbingan Instruktur Aktif          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 40. Dashboard Principle

Prinsip dasar perancangan dasbor PRONOIA:
- **Bukan Tempat Menimbun Data (*No Data Dumping*):** Menolak grafik rumit yang membuat pengguna kewalahan (*cognitive overload*).
- **Aksi Lebih Penting dari Angka:** Memprioritaskan apa yang bisa dilakukan hari ini dibandingkan deretan statistik mati masa lalu.
- **Responsif & Tenang:** Memberikan rasa percaya diri dan ketenangan pikiran saat membuka aplikasi.

---

## 41. Quick Actions

Pintasan Aksi Cepat (*Quick Action Buttons*) di beranda memungkinkan pencatatan dalam 1–2 ketukan:
- `[➕ Catat Jam Tidur]`: Membuka dialog pemilih jam bangun dan estimasi kualitas.
- `[➕ Tambah Minum Air]`: Menambahkan takaran preset 250ml air langsung ke log harian.
- `[📷 Scan Label Gizi]`: Mengaktifkan jendela bidik kamera scanner nutrisi.
- `[➕ Catat Langkah]`: Memasukkan estimasi durasi jalan kaki atau langkah harian.

---

## 42. Feature Group K — Scanner

Grup Fitur K menghadirkan kapabilitas visi komputer cerdas (*Multimodal Vision Scanner*) untuk mendigitalkan informasi nutrisi dari kemasan makanan/minuman secara instan:

```text
Buka Kamera ──▶ Bidik Label Nutrisi / Kemasan ──▶ Ekstraksi OCR Cerdas ──▶ Pratinjau Nilai Terdeteksi ──▶ Konfirmasi Pengguna ──▶ Simpan ke Linimasa
```

---

## 43. Scanner Architecture

Arsitektur pipa pemrosesan visi scanner:
1. **Akuisisi Gambar:** Pengambilan citra dengan optimalisasi fokus dan pencahayaan otomatis di sisi peramban.
2. **Kompresi Aman:** Pengecilan resolusi gambar di peramban sebelum diunggah guna menghemat kuota pengguna.
3. **Pipeline OCR & Parser:** Mengekstraksi nilai kalori, gula (*sugars*), natrium (*sodium*), dan lemak total (*total fat*).
4. **Normalisasi Takaran Saji:** Menghitung total kandungan berdasarkan ukuran porsi nyata.

---

## 44. Scanner Safety

Prinsip keselamatan fitur pemindai:

> [!IMPORTANT]
> **Wajib Verifikasi Manusia (*Human Confirmation Mandate*):**  
> Sistem dilarang menyimpan hasil pembacaan pemindai secara otomatis ke riwayat kesehatan tanpa persetujuan pengguna. Pengguna selalu disodori layar pratinjau untuk memeriksa dan mengoreksi angka hasil ekstraksi sebelum tombol simpan ditekan.

---

## 45. Scanner Cannot

Batasan eksplisit kapabilitas pemindai:
- Pemindai **tidak dapat** mendeteksi racun kimia berbahaya, bakteri, atau status basi makanan.
- Pemindai **bukan alat diagnosis** alergi makanan klinis.
- Pemindai tidak menjamin keakuratan 100% pada kemasan yang sobek, kotor, atau buram.

---

## 46. Scanner Failure States

Penanganan kondisi kegagalan pemindaian kamera:

| Kondisi Kegagalan | Penyebab Teknis | Jalur Pemulihan Antarmuka |
| :--- | :--- | :--- |
| **Izin Kamera Ditolak** | Pengguna memblokir izin di browser/OS. | Sediakan tombol `[Buka Pengaturan]` dan jalur alternatif `[Unggah Foto dari Galeri]`. |
| **Gambar Terlalu Buram** | Skor keyakinan OCR < 70%. | Tampilkan panduan: *"Posisikan label nutrisi lebih dekat dengan pencahayaan cukup"* + tombol `[Foto Ulang]`. |
| **Bukan Label Makanan** | OCR tidak mendeteksi kata kunci nutrisi. | Berikan pesan ramah: *"Label informasi gizi tidak ditemukan"* + opsi `[Input Manual]`. |

---

## 47. Feature Group L — AI Assistant

Grup Fitur L menyediakan lapisan percakapan edukatif sadar konteks (*Context-Aware AI Assistant*):
- Menjelaskan makna statistik kesehatan dalam analogi yang mudah dipahami.
- Membantu merumuskan ide kebiasaan mikro sehat yang relevan dengan rutinitas anggota.
- Bekerja secara terisolasi dengan perlindungan privasi dan pembatasan keselamatan mutlak.

---

## 48. AI Context Layers

Lapisan data yang diizinkan untuk membangun konteks percakapan AI:

```text
[Lapisan 1: Kebijakan Keselamatan] ──▶ Batasan non-diagnostik & instruksi etika (Selalu Disertakan)
[Lapisan 2: Profil Terizinkan]     ──▶ Nama panggilan, kelompok usia, sasaran hidup (Atas Izin)
[Lapisan 3: Ringkasan Tren]        ──▶ Rata-rata tidur & aktivitas 7 hari terakhir (Data Agregat)
[Lapisan 4: Sinyal Deviasi Aktif]  ──▶ Wawasan deviasi yang sedang ditanyakan pengguna
```

---

## 49. AI Response Modes

Mode respons asisten AI disesuaikan dengan intensi pengguna:
- **Mode Penjelasan Wawasan (*Explain Mode*):** Menerangkan faktor-faktor yang memengaruhi tren deviasi tertentu.
- **Mode Tanya Jawab Edukatif (*Q&A Mode*):** Menjawab pertanyaan seputar nutrisi umum, ritme sirkadian, dan kebugaran.
- **Mode Bimbingan Aksi (*Action Coaching Mode*):** Membantu pengguna memecah sasaran besar menjadi langkah-langkah mikro.

---

## 50. AI Safety Boundary

Batasan keselamatan mutlak Asisten AI:

> [!WARNING]
> Asisten AI dilarang keras menegakkan diagnosis penyakit klinis, meresepkan atau mengubah dosis obat farmasi, memberikan klaim kesembuhan absolut, atau menginstruksikan pertolongan mandiri pada kondisi gawat darurat medis.

---

## 51. AI Fallback

Penanganan jika terjadi gangguan pada penyedia model AI (*LLM Provider Downtime*):
- Antarmuka tidak boleh mogok (*crash*) atau menampilkan galat teknis mentah (*raw JSON errors*).
- Menampilkan pesan santun: *"Asisten edukasi kami sedang dalam pemeliharaan berkala. Anda tetap dapat membaca ringkasan wawasan di Linimasa atau meninjau artikel di Pusat Panduan."*

---

## 52. Feature Group M — Instructor Support

Grup Fitur M menyediakan portal kerja profesional bagi instruktur kesehatan untuk mengelola bimbingan anggota secara terpadu:

```text
Daftar Caseload Binaan ──▶ Peninjauan Deviasi Aktif ──▶ Perancangan Rencana Intervensi ──▶ Sesi Temu Terjadwal ──▶ Evaluasi Hasil
```

---

## 53. Member Monitoring

Fitur pemantauan anggota binaan (*Caseload Monitoring*):
- Mengurutkan anggota berdasarkan status urgensi sinyal deviasi.
- Menyajikan grafik tren 14 hari terakhir tanpa mengekspos data pribadi di luar lingkup pembinaan yang disetujui.
- Memungkinkan instruktur menyematkan catatan internal pada profil anggota binaan.

---

## 54. Instructor Insight View

Tampilan wawasan instruktur menyajikan data analitik mendalam:
- Fluktuasi rata-rata harian dan deviasi standar aktivitas anggota.
- Riwayat respons anggota terhadap rencana intervensi sebelumnya.
- Rekam jejak kepatuhan check-in tantangan kebiasaan yang diikuti anggota.

---

## 55. Intervention

Instruktur dapat menerbitkan rencana tindakan preventif (*Intervention Plan*) resmi yang langsung terhubung ke dasbor anggota:
- Menentukan target kebiasaan mikro terukur.
- Menuliskan panduan motivasi personal.
- Menetapkan jadwal peninjauan evaluasi hasil (misal: 7 hari mendatang).

---

## 56. Intervention Types

Jenis rencana intervensi yang dapat dirancang oleh instruktur:
- **Intervensi Ritme Istirahat:** Penjadwalan jam tidur teratur dan panduan relaksasi malam.
- **Intervensi Kebugaran Adaptif:** Program latihan fisik bertahap sesuai tingkat mobilitas anggota.
- **Intervensi Nutrisi Terarah:** Panduan pembatasan konsumsi gula dan kecukupan hidrasi harian.
- **Rujukan Konsultasi Medis:** Rekomendasi formal untuk memeriksakan diri ke dokter spesialis saat ditemukan gejala klinis.

---

## 57. Intervention Lifecycle

Status siklus hidup rencana intervensi instruktur:

```text
DRAFT (Draf Rencana) ──▶ ACTIVE (Aktif Berjalan) ──▶ IN_REVIEW (Masa Peninjauan) ──▶ RESOLVED (Tuntas Pulih)
```

Jika anggota mengalami kendala fisik di tengah jalan, rencana dapat diubah ke status `ADJUSTED` (disesuaikan) oleh instruktur.

---

## 58. Feature Group N — Consultation

Grup Fitur N memfasilitasi penjadwalan dan pelaksanaan sesi temu bimbingan profesional (*Teleconsultation & Booking*):

```text
Pilih Instruktur ──▶ Pilih Slot Waktu ──▶ Lampirkan Konteks Tren Kesehatan ──▶ Konfirmasi Booking ──▶ Sesi Berlangsung ──▶ Rangkuman Sesi Terbit
```

---

## 59. Consultation Status

Status pelaksanaan sesi konsultasi:

| Status Sesi | Definisi Kondisi | Aksi Antarmuka |
| :--- | :--- | :--- |
| `PENDING_CONFIRMATION`| Menunggu konfirmasi ketersediaan instruktur. | Tampilkan tiket antrean di dasbor. |
| `SCHEDULED` | Jadwal telah terkonfirmasi dan terkunci. | Tampilkan hitung mundur & pengingat jadwal. |
| `IN_PROGRESS` | Sesi sedang berlangsung di ruang temu resmi. | Buka ruang interaksi daring. |
| `COMPLETED` | Sesi telah selesai dilaksanakan. | Instruktur menerbitkan ringkasan catatan temu. |
| `CANCELLED` | Sesi dibatalkan oleh salah satu pihak secara sah. | Kuota konsultasi dikembalikan utuh. |

---

## 60. Consultation Data

Setiap entitas rekam konsultasi menyimpan:
- Identitas Member dan Instruktur yang terlibat.
- Waktu pelaksanaan dan durasi sesi resmi.
- Topik fokus bimbingan yang disepakati.
- Ringkasan catatan panduan instruktur (*Instructor Notes*) yang dapat dibaca kembali oleh anggota.
- Catatan audit kepatuhan sesi bagi administrator.

---

## 61. Feature Group O — Health Challenges

Grup Fitur O memfasilitasi program tantangan kebiasaan terstruktur (*Habit Challenges*) untuk membantu anggota membangun kebiasaan sehat harian melalui komitmen terarah:

```text
Katalog Tantangan ──▶ Pelajari Sasaran & Beban ──▶ Gabung Tantangan ──▶ Check-in Harian Rutin ──▶ Evaluasi Capaian & Apresiasi
```

---

## 62. Challenge Structure

Struktur program tantangan kebiasaan:
- **Durasi Terukur:** Dirancang dalam rentang waktu yang realistis (3, 7, atau 14 hari).
- **Target Harian Konkret:** Tolok ukur yang mudah dinilai (misal: *Minum air 2 liter/hari* atau *Jalan kaki 6.000 langkah*).
- **Batas Kesiapan Profil:** Menyaring peserta agar tantangan tidak membebani kondisi fisik tertentu.

---

## 63. Challenge Rules

Kaidah partisipasi tantangan kebiasaan:
- Anggota disarankan hanya mengikuti maksimal 2 tantangan aktif secara bersamaan agar tetap fokus.
- Check-in harian wajib divalidasi oleh entri data riil pada Garis Waktu Kesehatan.
- Dilarang membuat tantangan ekstrem (seperti puasa air berhari-hari) yang membahayakan tubuh.

---

## 64. Challenge Progress

Pemantauan progres tantangan disajikan secara visual dan interaktif:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               TANTANGAN: 7 HARI MINUM AIR 2 LITER                      │
├────────────────────────────────────────────────────────────────────────┤
│ Progres Anda: Hari ke-5 dari 7 (71% Selesai)                           │
│ [ ■■■■■□□ ]                                                            │
│                                                                        │
│ • Hari 1..4: ✅ Tuntas      • Hari 5: ✅ Tuntas (2.2 L)                │
│ • Hari 6..7: ⏳ Mendatang                                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 65. Feature Group P — Gamification

Grup Fitur P mengelola sistem apresiasi intrinsik untuk merayakan kedisiplinan dan proses pembentukan kebiasaan sehat jangka panjang:

```text
Catat Data Rutin / Tuntas Tantangan ──▶ Dapatkan Poin Konsistensi ──▶ Buka Lencana Prestasi ──▶ Perpanjang Rentetan Kebiasaan
```

---

## 66. Gamification Rules

Aturan etis gamifikasi PRONOIA:
- Menghargai konsistensi proses, bukan angka ekstrem.
- Dilarang menggunakan pola manipulatif (*dark patterns*) yang memicu kecemasan pengguna saat target terlewat.
- Lencana dilarang menyiratkan status klinis atau vonis kesembuhan penyakit.

---

## 67. Points

Poin Konsistensi (*Consistency Points*) diberikan sebagai bentuk pengakuan atas usaha:
- `+10 Poin`: Menyelesaikan pencatatan kebiasaan harian pertama kali hari ini.
- `+20 Poin`: Menyelesaikan check-in tantangan kebiasaan aktif.
- `+50 Poin`: Menuntaskan seluruh rangkaian program tantangan 7 hari.

Poin murni berfungsi sebagai simbol kemajuan personal di dalam aplikasi.

---

## 68. Badges

Katalog Lencana Prestasi Gaya Hidup Sehat:
- **First Check-in:** Diberikan saat menyelesaikan pencatatan pertama kali.
- **Baseline Builder:** Diberikan saat menuntaskan 14 hari observasi baseline awal.
- **7-Day Streak Master:** Diberikan saat mencatat kebiasaan 7 hari berturut-turut.
- **Hydration Pioneer:** Diberikan saat menyelesaikan tantangan hidrasi 7 hari.
- **Consultation Milestone:** Diberikan saat menyelesaikan sesi bimbingan bersama instruktur.

---

## 69. Streaks

Rentetan hari berturut-turut (*Streaks*) memotivasi kontinuitas kebiasaan:
- **Masa Toleransi (*Grace Period*):** Jika pengguna terlewat mencatat satu hari, sistem memberikan tenggang waktu 24 jam untuk melanjutkan rentetan tanpa mereset hitungan ke nol.
- Menjaga semangat pengguna agar tidak putus asa hanya karena satu hari yang sangat padat.

---

## 70. Feature Group Q — Community

Grup Fitur Q menyediakan ruang sosial yang aman bagi sesama anggota untuk saling menguatkan, bertukar pengalaman, dan belajar gaya hidup sehat:

```text
Jelajahi Linimasa Diskusi ──▶ Baca Kisah Inspiratif ──▶ Berikan Reaksi Positif ──▶ Buat Unggahan Cerita Sehat
```

---

## 71. Community Categories

Topik diskusi dalam komunitas dipisahkan secara tertata:
- **Seputar Pola Tidur:** Diskusi tips relaksasi malam dan mengatasi rutinitas begadang.
- **Inspirasi Nutrisi:** Berbagi menu makanan sehat terjangkau dan resep hidrasi alami.
- **Aktivitas & Kebugaran:** Cerita olahraga santai harian dan kiat tetap bergerak di tempat kerja.
- **Tanya Instruktur:** Ruang interaksi terbuka untuk tips gaya hidup umum dari para ahli.

---

## 72. Community Privacy

Kontrol privasi dalam berinteraksi di komunitas:
- Anggota dapat memilih opsi **Berbagi Anonim (*Anonymous Posting*)** untuk menceritakan tantangan gaya hidup yang bersifat pribadi.
- Data riwayat kesehatan personal tidak pernah dipublikasikan ke komunitas secara otomatis tanpa izin sadar dari anggota.

---

## 73. Moderation

Tata kelola pengawasan konten komunitas:
- Filter kata kunci otomatis untuk memblokir ujaran kebencian, spam promosi suplemen ilegal, dan klaim medis palsu.
- Tombol lapor konten (*Report Post*) yang langsung mengalirkan unggahan mencurigakan ke antrean moderasi administrator.

---

## 74. Feature Group R — Membership

Grup Fitur R mengelola model paket keanggotaan langganan bagi pengguna yang membutuhkan fasilitas bernilai tambah:

```text
Pilih Paket Keanggotaan ──▶ Tinjau Fasilitas Tambahan ──▶ Transaksi Pembayaran Aman ──▶ Status Keanggotaan Aktif
```

---

## 75. Membership Capabilities

Matriks fasilitas paket keanggotaan PRONOIA:

| Paket Layanan | Fitur & Kapabilitas Tambahan | Jaminan Keselamatan |
| :--- | :--- | :---: |
| **Silver (Gratis)** | Akses penuh dasbor harian, baseline personal, pencatatan tak terbatas, pemindai gizi dasar, asisten AI edukatif, dan tombol darurat. | **100% Gratis** |
| **Gold (Reguler)** | Analisis tren multivariat mendalam, kuota scan dokumen tak terbatas, dan akses program tantangan eksklusif. | Standar Identik |
| **Platinum (Prioritas)**| Kuota sesi telekonsultasi instruktur bersertifikasi berkala, laporan kesehatan terpadu, dan dukungan prioritas. | Standar Identik |

> [!CAUTION]
> Seluruh fitur deteksi keselamatan preventif, ambang bahaya darurat medis, dan tombol bantuan ambulans wajib tersedia secara gratis bagi seluruh tingkatan pengguna tanpa terkecuali.

---

## 76. Feature Group S — Notifications

Grup Fitur S mengorkestrasi penyampaian pesan pengingat kontekstual yang tepat waktu dan tidak mengganggu kenyamanan pengguna:

```text
Pemicu Sistem (Jadwal Pengingat / Deviasi Terdeteksi) ──▶ Cek Jam Tenang (Do Not Disturb) ──▶ Evaluasi Kebijakan Anti-Kelelahan ──▶ Kirimkan Notifikasi Ringkas
```

---

## 77. Notification Preferences

Anggota memiliki kontrol penuh atas pengaturan notifikasi:
- Mengaktifkan atau menonaktifkan pengingat per kategori (Tidur, Minum Air, Aktivitas).
- Mengatur rentang jam tenang (*Do Not Disturb Hours*, misal: pukul 22.00–06.00 WIB).
- Memilih saluran pengiriman pesan (notifikasi peramban PWA, email ringkasan mingguan).

---

## 78. Notification Priority

Hirarki prioritas pengiriman notifikasi:

| Tingkat Prioritas | Kategori Pesan | Aturan Jam Tenang |
| :--- | :--- | :---: |
| **P0 (Kritis / Darurat)** | Peringatan bahaya darurat medis atau keamanan akun. | Mengabaikan Jam Tenang |
| **P1 (Penting / Terjadwal)** | Pengingat jadwal konsultasi instruktur (H-1 jam). | Menghormati Jam Tenang |
| **P2 (Kontekstual)** | Pengingat minum air siang hari atau tidur malam. | Menghormati Jam Tenang |
| **P3 (Informasi / Ringkasan)**| Ringkasan pencapaian mingguan dan lencana baru. | Menghormati Jam Tenang |

---

## 79. Notification Fatigue Prevention

Kebijakan pencegahan kelelahan notifikasi (*Anti-Alert Fatigue*):
- Membatasi maksimal 3 notifikasi preventif biasa dalam rentang 24 jam per pengguna.
- Menggabungkan beberapa pengingat mikro yang berdekatan ke dalam satu notifikasi rangkuman yang ringkas.

---

## 80. Feature Group T — Emergency Support

Grup Fitur T adalah protokol keselamatan khusus berkecepatan tinggi yang terpisah dari siklus pemantauan gaya hidup biasa:

```text
Tombol Darurat Merah di Antarmuka (< 1 Detik)
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
 [Panggil Ambulans / 112]   [Peta Fasilitas Kesehatan Terdekat]
```

---

## 81. Emergency Principles

Prinsip dasar perancangan antarmuka darurat:
- **Bukan Chatbot Percakapan:** Dilarang mengarahkan pengguna ke sesi tanya jawab AI saat tombol darurat ditekan.
- **Satu Ketukan Akses Langsung:** Menghubungkan ke nomor panggilan darurat nasional (112, 118, 119) seketika.
- **Kontras Visual Ekstrem:** Menggunakan warna merah tegas dan tombol besar yang ramah kondisi panik.

---

## 82. Location Permission

Alur permintaan izin lokasi geolokasi untuk pencarian fasilitas kesehatan:
- Izin GPS hanya diminta saat pengguna secara sadar menekan tombol pencarian faskes terdekat.
- Jika izin lokasi ditolak oleh pengguna, sistem langsung menampilkan daftar kontak pusat gawat darurat standar nasional tanpa menghambat akses bantuan.

---

## 83. Feature Group U — Reports

Grup Fitur U memfasilitasi pembuatan laporan kesehatan terstruktur (*Health Summary Reports*) yang dapat diunduh untuk dokumentasi pribadi maupun rujukan tenaga medis.

---

## 84. Instructor Report

Laporan evaluasi bimbingan instruktur (*Instructor Summary Report*):
- Menyajikan grafik tren kepatuhan kebiasaan anggota binaan selama periode bimbingan.
- Memuat catatan rekomendasi ahli dan sasaran gaya hidup berikutnya.
- Dapat diunduh dalam format PDF resmi bertandatangan digital instruktur.

---

## 85. Admin Report

Laporan agregat kesehatan komunitas (*Platform Aggregate Analytics*):
- Statistik tren kesehatan masyarakat tanpa identitas pribadi (*anonymized & aggregated*).
- Rasio keberhasilan intervensi preventif dan evaluasi kepuasan program bimbingan.

---

## 86. Feature Group V — Search

Grup Fitur V menyediakan mesin pencarian terpadu yang cepat dan akurat di dalam aplikasi:
- Pencarian direktori instruktur berdasarkan spesialisasi keahlian dan ulasan.
- Pencarian topik artikel panduan gaya hidup sehat di pusat bantuan.
- Pencarian entri riwayat lama pada Garis Waktu Kesehatan berdasarkan tanggal atau kategori.

---

## 87. Feature Group W — PWA

Grup Fitur W menghadirkan kapabilitas aplikasi web progresif (*Progressive Web App*):
- **Instalasi Mandiri:** Pengguna dapat memasang aplikasi langsung ke layar utama ponsel (*Add to Home Screen*) tanpa melalui toko aplikasi konvensional.
- **Pengalaman Layar Penuh (*Standalone Experience*):** Beroperasi tanpa bilah peramban dengan responsivitas tinggi seperti aplikasi bawaan.

---

## 88. Offline Capabilities

Kemampuan operasional aplikasi saat berada di area tanpa koneksi internet (*Offline-First*):
- Pengguna tetap dapat membuka dasbor, melihat baseline yang tersimpan, dan mencatat jam tidur, minum air, serta langkah kaki.
- Seluruh data baru disimpan secara aman di penyimpanan luring peramban (*IndexedDB*).

---

## 89. Sync

Mekanisme sinkronisasi data luring (*Background Data Sync*):
- Begitu koneksi internet pulih, layanan pekerja (*Service Worker*) otomatis mengirimkan antrean data lokal ke server di latar belakang.
- Dilengkapi kunci idempoten (*idempotency key*) guna menjamin tidak terjadi duplikasi entri data di basis data server.

---

## 90. Feature Group X — Audit Logs

Grup Fitur X menjamin akuntabilitas keamanan dan kepatuhan hukum melalui pencatatan rekam jejak abadi (*Immutable Audit Logs*):
- Mencatat seluruh peristiwa sensitif: pembuatan akun, perubahan izin berbagi data, akses profil anggota oleh instruktur, dan ekspor data.
- Setiap entri log menyimpan stempel waktu presisi, ID pengguna/admin, alamat IP, dan jenis tindakan resmi.

---

## 91. Audit Requirements

Kaidah integritas log audit:
- Log audit disimpan di tabel terpisah dengan hak akses hanya-tulis (*append-only*); tidak boleh ada operasi *UPDATE* atau *DELETE* pada tabel audit.
- Dilarang mencatat kata sandi mentah, token otentikasi rahasia, atau transkrip percakapan pribadi di dalam log audit.

---

## 92. Feature Group Y — Access Control

Grup Fitur Y menegakkan kebijakan otorisasi berbasis peran dan kepemilikan (*Role-Based Access Control & Ownership Policies*):

```text
[Permintaan API Masuk] ──▶ Verifikasi Token Autentikasi ──▶ Evaluasi Kebijakan Policy / Gate ──▶ Izinkan / Tolak (403)
```

- **Member:** Hanya dapat mengakses dan memodifikasi data milik profil pribadinya sendiri.
- **Instructor:** Hanya dapat mengakses ringkasan anggota yang telah resmi menyetujui pembagian data aktif.
- **Admin:** Memiliki wewenang manajerial platform tanpa izin membuka data medis pribadi.

---

## 93. Feature Dependency Graph

Grafik ketergantungan antar-modul fitur dalam sistem:

```text
               ┌───────────────────────┐
               │ Autentikasi & Profil  │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │  Pencatatan Harian    │ ◀─── [Scanner Nutrisi]
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │   Baseline Personal   │
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │    Mesin Perilaku     │ ────▶ [Asisten AI Edukatif]
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │ Rekomendasi & Aksi    │ ◀─── [Bimbingan Instruktur]
               └───────────┬───────────┘
                           │
                           ▼
               ┌───────────────────────┐
               │  Pemantauan Kemajuan  │
               └───────────────────────┘
```

---

## 94. Core Feature Loop

Mata rantai siklus fitur inti yang menggerakkan nilai produk:

```text
Catat Data Harian ──▶ Kalkulasi Baseline ──▶ Deteksi Sinyal Deviasi ──▶ Jelaskan Wawasan ──▶ Ambil Tindakan Mikro ──▶ Pantau Pemulihan Gaya Hidup
```

Siklus ini merupakan tulang punggung arsitektur produk yang membedakan PRONOIA dari aplikasi pelacak statis lainnya.

---

## 95. Feature State Model

Model status operasional setiap komponen fitur asinkron:
- `INITIAL`: Layar baru dibuka, menunggu inisiasi aksi pengguna.
- `LOADING`: Permintaan sedang diproses, menampilkan kerangka animasi (*skeleton*).
- `SUCCESS`: Tindakan berhasil, menyajikan konfirmasi visual instan.
- `EMPTY`: Belum ada data tersimpan, menampilkan panduan ramah untuk memulai.
- `ERROR`: Terjadi gangguan sistem, menyediakan tombol coba lagi (*retry button*).

---

## 96. Feature Failure Principles

Prinsip penanganan kegagalan fitur:
- **Degradasi Anggun (*Graceful Degradation*):** Jika layanan pihak ketiga (seperti OCR atau LLM) mengalami *downtime*, fungsi pencatatan manual utama tidak boleh ikut mogok.
- **Pesan Bersahabat:** Menggunakan kalimat manusiawi yang menerangkan cara pemulihan, bukan kode galat teknis yang membingungkan pengguna.

---

## 97. Empty State Principles

Prinsip perancangan layar tanpa data (*Empty States*):
- Layar kosong tidak boleh menjadi jalan buntu (*dead end*).
- Selalu menyertakan ilustrasi kontekstual, pesan yang memotivasi, dan satu tombol ajakan bertindak utama (*CTA*) untuk memulai pencatatan pertama.

---

## 98. Loading State Principles

Prinsip perancangan tampilan pemuatan (*Loading States*):
- Menggunakan animasi kerangka (*skeleton loaders*) yang mencerminkan tata letak konten akhir, bukan sekadar pemutar roda putar (*spinner*) di layar putih.
- Menampilkan pesan progres bertahap untuk operasi yang memakan waktu lebih dari 3 detik.

---

## 99. Error State Principles

Prinsip perancangan layar galat (*Error States*):
- Menjelaskan apa yang terjadi dalam bahasa sehari-hari tanpa menyalahkan pengguna.
- Menjaga data yang telah diketik pengguna di formulir agar tidak hilang saat terjadi galat jaringan.
- Menyediakan tombol pemulihan langsung (*Coba Kirim Ulang*).

---

## 100. Feature Analytics

Telemetri pengukuran keterlibatan fitur (*Feature Instrumentation*):
- Mencatat tingkat konversi alur onboarding, rasio keberhasilan pencatatan cepat, dan tingkat penyelesaian tantangan.
- Seluruh data telemetri bersifat anonim dan tidak mencatat informasi identitas pribadi pengguna (*privacy-preserving telemetry*).

---

## 101. North-Star Feature Metric

Metrik Bintang Kejora (*North-Star Metric*) produk PRONOIA:

> **Persentase Anggota Aktif Mingguan yang Berhasil Menyelesaikan Siklus Pencegahan Tertutup (Mencatat ──▶ Menerima Wawasan ──▶ Mengambil Tindakan Mikro).**

Metrik ini mengukur seberapa efektif produk dalam menciptakan perubahan perilaku hidup sehat yang nyata, bukan sekadar jumlah unduhan aplikasi.

---

## 102. Feature Quality Metrics

Indikator mutu operasional fitur:
- Waktu simpan pencatatan cepat (*Quick Log latency*): < 200 milidetik.
- Rasio keberhasilan ekstraksi label gizi scanner: > 85% pada gambar berkualitas cukup.
- Waktu muat antarmuka utama (*First Contentful Paint*): < 1.5 detik pada jaringan 4G.

---

## 103. Feature Addition Criteria

Kriteria wajib sebelum sebuah fitur baru disetujui untuk dikembangkan:
1. Apakah fitur ini memperkuat salah satu mata rantai siklus kesehatan preventif?
2. Apakah fitur ini dapat dioperasikan secara aman tanpa risiko vonis medis klinis yang keliru?
3. Apakah fitur ini mematuhi standar kedaulatan data dan privasi pengguna?

---

## 104. Feature Removal Criteria

Kriteria penghapusan fitur yang ada (*Feature Deprecation*):
- Fitur membingungkan pengguna atau memiliki tingkat galat input di atas 30%.
- Fitur tidak digunakan oleh lebih dari 95% anggota selama 3 bulan berturut-turut.
- Fitur memicu ketergantungan layar negatif yang bertentangan dengan etika kesehatan mental.

---

## 105. Anti-Feature-Sprawl Rule

Kebijakan pencegahan pembengkakan fitur (*Anti-Feature-Sprawl*):

> [!TIP]
> **Hukum Kesederhanaan PRONOIA:**  
> *"PRONOIA tidak bercita-cita menjadi jejaring sosial raksasa, platform e-commerce suplemen, atau sistem rekam medis rumah sakit yang rumit. PRONOIA tetap setia pada identitas intinya: pendamping gaya hidup preventif berbasis siklus perilaku tertutup."*

---

## 106. MVP Feature Set

Daftar fitur minimum yang wajib siap pada rilis perdana (*MVP Scope*):
- Autentikasi multi-peran (Member, Instructor, Admin).
- Onboarding progresif dan formulir sasaran kesehatan.
- Pencatatan cepat (*Quick Log*) tidur, hidrasi, dan aktivitas.
- Mesin kalkulasi baseline bergulir 14 hari.
- Deteksi deviasi tren dan kartu wawasan ramah non-diagnostik.
- Tombol darurat medis satu ketukan.

---

## 107. Post-MVP Feature Set

Fitur yang dijadwalkan pada rilis tahap kedua (*Phase 2 / Core*):
- Pemindai label nutrisi cerdas via kamera (*Vision Scanner OCR*).
- Asisten AI edukatif sadar konteks dengan *safety guardrails*.
- Sistem tantangan kebiasaan terstruktur (*Habit Challenges*).
- Portal pemantauan caseload dan rencana intervensi instruktur.

---

## 108. Future Feature Set

Fitur eksplorasi masa depan (*Phase 3 & Scale*):
- Integrasi otomatis dengan sensor perangkat sandang pintar (*Wearables API*).
- Pemesanan telekonsultasi instruktur dengan ruang video terenkripsi end-to-end.
- Forum komunitas terkurasi dan sistem penghargaan lencana lanjutan.

---

## 109. Feature Security Checklist

Daftar periksa verifikasi keamanan wajib sebelum fitur dirilis:
- [ ] Otorisasi kepemilikan data diverifikasi di tingkat server (*Policy / Gate*).
- [ ] Validasi input biologis mencegah nilai negatif atau di luar rentang wajar.
- [ ] Seluruh endpoint terlindungi dari serangan *brute-force* via *Rate Limiter*.
- [ ] Data sensitif terenkripsi saat diam dan saat transit.
- [ ] Peristiwa penting terekam dalam log audit yang tidak dapat diubah.

---

## 110. Feature Health-Safety Checklist

Daftar periksa verifikasi keselamatan medis wajib:
- [ ] Seluruh narasi wawasan bebas dari nama penyakit klinis definitif.
- [ ] Asisten AI dilarang keras meresepkan obat atau takaran zat kimiawi.
- [ ] Tombol darurat terpisah sepenuhnya dari percakapan AI biasa.
- [ ] Klausul sangkalan medis (*medical disclaimer*) terpasang secara transparan.

---

## 111. Feature Acceptance Template

Format standar penulisan kriteria keberimaan (*Acceptance Criteria Template*):

```text
Skenario    : [Nama Skenario Fitur]
Konteks     : Diberikan seorang pengguna dengan peran [Member / Instructor / Admin]
Tindakan    : Ketika pengguna melakukan aksi [Aksi Tertentu] dengan data masukan valid
Hasil Akhir : Maka sistem merespons dengan [Status Berhasil], data tersimpan aman di [Tabel],
              dan antarmuka menampilkan [Konfirmasi Visual].
```

---

## 112. Recommended Implementation Order

Urutan rekayasa implementasi modul fitur yang direkomendasikan:
1. **Pondasi Keamanan:** Autentikasi, otorisasi peran, dan skema database inti.
2. **Pengalaman Anggota Dasar:** Onboarding, pencatatan manual cepat, dan linimasa aktivitas.
3. **Kecerdasan Sistem:** Mesin kalkulasi baseline, deteksi sinyal, dan kartu wawasan.
4. **Otomasi Lanjutan:** Pemindai nutrisi OCR dan Asisten AI ber-guardrails.
5. **Kolaborasi Manusia:** Portal instruktur, intervensi bimbingan, dan konsultasi.

---

## 113. Competition Demo Feature Path

Jalur fitur yang wajib didemonstrasikan dalam pengujian juri kompetisi:

```text
Registrasi & Onboarding Singkat (< 2 Menit)
                   │
                   ▼
  Tampilan Linimasa & Baseline 14 Hari yang Sudah Siap
                   │
                   ▼
 Pindai Minuman Manis via Scanner OCR ──▶ Catat Deviasi Jam Tidur
                   │
                   ▼
 Mesin Perilaku Mendeteksi Deviasi Pola ──▶ Munculkan Kartu Wawasan
                   │
                   ▼
 Diskusi Singkat Bersama AI Edukatif ──▶ Ambil Tindakan Mikro Pencegahan
                   │
                   ▼
Dasbor Instruktur Menerima Pembaruan Progres & Beri Catatan Penguatan
```

---

## 114. Recommended Demo Scenario

Skenario demonstrasi realistis:
- **Profil:** Budi, mahasiswa tingkat akhir yang mengalami penurunan jam tidur akibat tugas skripsi dan konsumsi minuman manis malam hari.
- **Deteksi:** Sistem PRONOIA mendeteksi bahwa durasi tidur Budi turun dari 7 jam 15 menit menjadi 5 jam 30 menit selama 4 hari berturut-turut.
- **Intervensi:** Sistem menyajikan kartu wawasan edukatif yang ramah dan menawarkan tantangan *"7 Hari Bebas Minuman Manis Setelah Pukul 19.00"*.
- **Kolaborasi:** Coach Sarah memeriksa progres Budi dari dasbor instruktur dan memberikan catatan bimbingan personal.

---

## 115. Final Feature Principle

PRONOIA bukan sekadar perpaduan dasbor statis, pemindai kamera, atau chatbot percakapan yang berdiri sendiri.

```text
PRONOIA = Data Riil + Konteks Hidup + Kecerdasan Perilaku + Transparansi Wawasan + Tindakan Nyata + Dukungan Manusia
```

---

## 116. Final Definition

> [!IMPORTANT]
> **Definisi Nilai Fitur PRONOIA:**  
> *"Sebuah fitur di dalam PRONOIA dianggap bernilai apabila fitur tersebut membantu pengguna memahami pola perilaku kesehatannya secara lebih jernih, mengambil tindakan pencegahan yang aman dan realistis, memantau dampak nyata dari kebiasaan tersebut, atau memperoleh bimbingan manusiawi yang tepat pada waktunya."*

Seluruh fitur PRONOIA wajib senantiasa memegang teguh 6 pilar kehormatan: **Bermanfaat (*Useful*)**, **Aman (*Safe*)**, **Transparan (*Explainable*)**, **Terlindungi (*Private*)**, **Dapat Ditindaklanjuti (*Actionable*)**, dan **Terukur (*Measurable*)**—dengan menjunjung tinggi batas mulia: **Pendampingan preventif, bukan diagnosis medis.**
